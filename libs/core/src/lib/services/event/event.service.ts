import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EventService {
   private _subject: ReplaySubject<any> = new ReplaySubject<any>(1);
  // private _subject = new Subject<any>()
   private errorSubject = new Subject<any>();

   private _subjectutAcc: ReplaySubject<any> = new ReplaySubject<any>(1);
   private _subjectUserName: ReplaySubject<any> = new ReplaySubject<any>(1);
   private _subjectQuestionnaireToogle: ReplaySubject<any> = new ReplaySubject<any>(1);

    onSend<T>(data: T) {
      this._subject.next(data);
    }

    onSendUtAcc<T>(data: T) {
        this._subjectutAcc.next(data);
    }

    onSendUserName<T>(data: T) {
        this._subjectUserName.next(data);
    }

    onSendQuestionnaireToogle<T>(data: T) {
        this._subjectQuestionnaireToogle.next(data);
    }

    onClearDataonError<T>(data: T) {
        this.errorSubject.next(data);
    }
    onReceivedError(): Observable<any> {
        return this.errorSubject.asObservable();
    }

    onReceived(): Observable<any> {
        return this._subject.asObservable();
    }

    onReceivedUtAcc(): Observable<any> {
        return this._subjectutAcc.asObservable();
    }

    onReceivedUserName(): Observable<any> {
        return this._subjectUserName.asObservable();
    }

    onReceivedQuestionnaireToogle(): Observable<any> {
        return this._subjectQuestionnaireToogle.asObservable();
    }
}
