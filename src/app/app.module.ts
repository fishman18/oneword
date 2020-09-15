import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QOnlyGrid } from './q-only-grid';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { ApiService} from './api.service';
import { DataService } from './data.service';
import { CommonService } from '../app/common.service';
import { ModalService } from 'src/app/modal.service';
import { AgGridModule } from 'ag-grid-angular';
import { RemoveButtonComponent } from './removeButton.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { StorageService } from './storage.service';
import { RainbowLoadingComponent } from './rainbowLoading.component';
import { RoService } from './ro.service';
import { SelectEditorComponent } from './selectEditor.component';
@NgModule({
  declarations: [
    AppComponent,
    QOnlyGrid
   
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot(),
    AgGridModule.withComponents([RemoveButtonComponent,SelectEditorComponent]),
  ],
  providers: [CommonService, DataService, ModalService, ApiService,StorageService,RoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
