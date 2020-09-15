import { Component, Input } from '@angular/core';
import { StorageService } from './storage.service';

@Component({
  selector: 'rainbow-loading',
  template: `
  <div [ngClass]="[(inCenter?'layer':'non-center'),(isIe?'ie': '')]">
    <div class="wheel"></div>
    <div class="color-container"></div>
    <div class="fan-container">
      <div class="umbrella-fan">
        <div class="fan">
          <div class="fan__inside"></div>
        </div>
      </div>
    </div>
    <div class="center"></div>
  </div>
  `,
  styleUrls: ['./rainbowLoading.component.scss']
})

export class RainbowLoadingComponent {
  @Input() inCenter = true;
  public isIe: boolean = false;
  constructor(private storage:StorageService) {
    if (storage.dev.os == 'windows' && storage.dev.browser == 'ie')
      this.isIe = true;
  }
}
