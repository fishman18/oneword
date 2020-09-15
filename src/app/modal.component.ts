import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { ApiService } from './api.service';

@Component({
  selector: 'modal',
  template: `
	<div class="grey-layer">
    <div class="modal">
      <div class="message">{{config.message}}</div>
      <div class="panel alert" *ngIf="config.type=='alert'">
        <a (click)="closeModal()">{{confirmText[lang]}}</a>
      </div>
      <div class="panel confirm" *ngIf="config.type=='confirm'">
      <a (click)="execFunc()">
            <i class="confirm__yes__icon"></i>
            <span>{{confirmText[lang]}}</span>
          </a>
          <a class="confirm__no" (click)="closeModal()">
            <i class="confirm__no__icon"></i>
            <span>{{cancelText[lang]}}</span>
          </a>
        </div>
    </div>
  </div>
	`,
  styleUrls: ['./modal.component.scss']
})


export class ModalComponent implements OnInit{
  @Input() config:any = {};
  public lang;
  public confirmText = {b5:'確定',en:'Confirm'};
  public cancelText = {b5:'取消',en:'Cancel'};
  constructor(public modalService: ModalService, private api: ApiService) {
    this.lang = api.lang;
  }

  ngOnInit(){
    window.location.hash='#ro/showDialog';
  }

  closeModal(){
    let index = this.modalService.modalList.indexOf(this.config);
    this.modalService.modalList.splice(index,1);
    if (this.config.execAfter) {
      this.config.execAfter();
    }
    window.location.hash='#ro/hideDialog';
  }

  execFunc(){
    this.config.callback();
    this.closeModal();
  }

}

