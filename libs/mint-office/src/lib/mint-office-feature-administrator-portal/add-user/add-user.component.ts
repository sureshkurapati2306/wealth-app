import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserRole } from '../../core/models/administrator-portal.models';
import { getRole } from '../+state/administrator-portal.selectors';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { CreateUser } from '../+state/administrator-portal.actions';

@Component({
  selector: 'cimb-office-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'ADMINISTRATOR PORTAL',
      url: '/administrator-portal'
    },
    {
      label: 'ADD USER',
      url: null
    }
  ];

  addUserFb: FormGroup = this.fb.group({
    lanId: ['', Validators.required],
    userRoleType: ['', Validators.required]
  });

  roles: UserRole[];

  @ViewChild('addUserForm') addUserForm: FormGroupDirective;

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store
      .select(getRole)
      .pipe(
        tap((data) => {
          if (data) {
            this.roles = data;
          }
        })
      ).subscribe();
  }

  submit() {
    this.store.dispatch(CreateUser({ username: this.addUserFb.value.lanId, role: this.addUserFb.value.userRoleType}));
  }

  clear() {
    this.addUserForm.resetForm();
  }

}
