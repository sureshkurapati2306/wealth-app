import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './../../core/state/reducers';
import { User } from './../../core/model/user.model';
import { Observable, Subscription } from 'rxjs';
import * as UserAction from './../../core/state/user/user.actions';
import * as LogoutAction from './../../core/state/logout/logout.action';

@Component({
  selector: 'cimb-redirect-to-clicks',
  templateUrl: './redirect-to-clicks.component.html',
  styleUrls: ['./redirect-to-clicks.component.scss'],
})
export class RedirectToClicksComponent implements OnInit {
  private userObservable: Observable<any>;
  private userSubscription: Subscription;
  userDatas: any;
  logoutParams: any;
  userData = new User(
    '',
    '',
    '',
    501212001212,
    1,
    '',
    "",
    'P',
    'N',
    'N',
    '',
    "",
    'Y',
    'N',
    'N',
  );
  constructor(
    private store: Store<fromStore.AppState> 
  ) { }

  ngOnInit(): void {
    this.logoutEvent();
  }

  logoutEvent() {
    const user = this.userData;
    this.store.dispatch(new UserAction.AddUser(user));
    this.userObservable = this.store.select('userReducer');
    this.userSubscription = this.userObservable.subscribe((users) => {
      this.userDatas = users.user;
    });

    this.store.dispatch(new LogoutAction.LogoutTransaction());

    window.location.href = "https://www.cimbclicks.com.my";
  }
}
