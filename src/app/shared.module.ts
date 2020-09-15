import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ModalComponent } from './modal.component';
import { RainbowLoadingComponent } from './rainbowLoading.component';
import { RemoveButtonComponent } from './removeButton.component';
import { ModalService } from './modal.service';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { RoService } from './ro.service';
import { SelectEditorComponent } from './selectEditor.component';

@NgModule({
  declarations: [
    ModalComponent,
    RainbowLoadingComponent,
    RemoveButtonComponent,SelectEditorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    RainbowLoadingComponent,
    RemoveButtonComponent,
    SelectEditorComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ApiService,ModalService,StorageService,RoService]
    };
  }
}
