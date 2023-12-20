import { Injectable } from "@angular/core";
import { BehaviorSubject, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private _infoNotification$ = new BehaviorSubject("");
  private _errorNotification$ = new BehaviorSubject("");
  public infoNotification$ = this._infoNotification$.asObservable();
  public errorNotification$ = this._errorNotification$.asObservable();

  public setInfoNotification(info: string) {
    this._infoNotification$.next(info);
    this.clearNotificationAfterDelay(this._infoNotification$);
  }

  public setErrorNotification(err: string) {
    this._errorNotification$.next(err);
    this.clearNotificationAfterDelay(this._errorNotification$);
  }

  public clearErrorNotification() {
    this._errorNotification$.next("");
  }

  public clearInfoNotification() {
    this._infoNotification$.next("");
  }

  private clearNotificationAfterDelay(notificationType: BehaviorSubject<string>) {
    timer(5000)
      .pipe(
        switchMap(() => {
          notificationType.next("");
          return notificationType;
        })
      )
      .subscribe();
  }
}
