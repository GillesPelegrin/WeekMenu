import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {ModalConfig, ModalService} from "./modal.service";
import {ConfigModalComponent} from "../config/config-modal.component";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnDestroy, AfterViewInit {

  display: ModalConfig;
  componentRef: ComponentRef<any>;
  @ViewChild("viewComponent", {read: ViewContainerRef}) container;

  constructor(
    private modalService: ModalService,
    private resolver: ComponentFactoryResolver) {

  }

  ngAfterViewInit() {
    this.modalService.watch().subscribe(modalConfig => {
      this.display = modalConfig;

      if (modalConfig.modalState === 'open') {
        this.createComponent(modalConfig.component);
      }
    });
  }


  createComponent(component: any) {
    this.container.clear();
    const factory: ComponentFactory<Component> = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(factory);
  }

  close() {
    this.modalService.close();
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
