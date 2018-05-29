
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TriggerScrollService {
  private onScrollTriggered: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public triggerScroll: Observable<any> = this.onScrollTriggered.asObservable();

  public onTriggerScroll(item: string): void {
    this.onScrollTriggered.next(item);
  }
}
