import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
@Injectable()

export class ModalService {
  public modalList:any[] = [];

  constructor(public commonService:CommonService){}

  create(obj:Object){
    console.log('modal')
    this.modalList.push(obj);
  }

}
