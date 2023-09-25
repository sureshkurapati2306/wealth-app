import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as Forge from 'node-forge';

import * as AuthActions from './+state/auth.actions';

import * as authSelector from '../mint-office-feature-login/+state/auth.selectors';
import { Auth, AuthKey } from '../core/models/auth.model';
import { ErrorHandlingService } from '../core/services/error-handling.service'

@Component({
    selector: 'cimb-office-mint-office-feature-login',
    templateUrl: './mint-office-feature-login.component.html',
    styleUrls: ['./mint-office-feature-login.component.scss'],
})
export class MintOfficeFeatureLoginComponent implements OnInit {
    authForm: FormGroup;

    errorMessage$ = this.store.select(authSelector.getErrorMessage);

  keyData: AuthKey;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private action$: Actions,
        private cdr: ChangeDetectorRef,
        private errorHandling: ErrorHandlingService,
    ) {}

    ngOnInit() {
        this.errorHandling.popupCloseAfterLogout();
        this.store.dispatch(AuthActions.getKey());

        this.authForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.store.select(authSelector.getkey).subscribe((data) => {
            this.keyData = data;
        });
    }

    encryptWithPublicKey(valueToEncrypt: string): string {
        const pem =
            '-----BEGIN RSA PUBLIC KEY-----\n' +
            this.keyData.encodedPublicKey +
            '\n-----END RSA PUBLIC KEY-----';
        const pubkeyForge = Forge.pki.publicKeyFromPem(pem);

        // Encrypt data with RSAES-OAEP/SHA-256/MGF1-SHA-1
        // compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
        const encrypt = pubkeyForge.encrypt(valueToEncrypt, 'RSA-OAEP', {
            md: Forge.md.sha256.create(),
            mgf1: {
                md: Forge.md.sha256.create(),
            },
        });
        return Forge.util.encode64(encrypt);
    }

    login() {
        const formData: Auth = {
            authenticationId: this.keyData.preAuthenticationId,
            grantType: 'password',
            username: this.authForm.value.username,
            password: this.encryptWithPublicKey(this.authForm.value.password),
        };

        this.store.dispatch(AuthActions.authStart({ data: formData }));
    }
}
