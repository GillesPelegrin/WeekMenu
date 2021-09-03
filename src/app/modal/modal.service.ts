import {BehaviorSubject, Observable} from "rxjs";
import {Component, Injectable} from "@angular/core";
import {ConfigModalComponent} from "../config/config-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private display: BehaviorSubject<ModalConfig> =
    new BehaviorSubject<ModalConfig>({modalState: 'close', component: ConfigModalComponent} as ModalConfig);

  public watch(): Observable<ModalConfig> {
    return this.display.asObservable();
  }

  public open(component: any) {
    this.display.next({modalState: 'open', component: component} as ModalConfig);
  }

  public close() {
    this.display.next({modalState: 'close'} as ModalConfig);
  }
}

export type ModalState = 'open' | 'close'

export interface ModalConfig {
  modalState: ModalState,
  component: any
}
