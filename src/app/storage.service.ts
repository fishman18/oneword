import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()

export class StorageService {
  public dev: any = {};
  public isMobile: boolean = false;

  constructor(private device: DeviceDetectorService) {
    this.dev = device.getDeviceInfo();
    this.isMobile = device.isMobile() || device.isTablet();
    console.log(this.dev);
    
    if (this.isMobile) {
      this.fixIosScroll();
    }
  }

  fixIosScroll() {
      document.ontouchstart = function (e) {
        document.body.scrollTop = 0;
      };
      document.ontouchend = function (e) {
        document.body.scrollTop = 0;
      };
  }

}