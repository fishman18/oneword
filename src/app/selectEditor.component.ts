import {Component,ViewChild,ElementRef,HostListener,Renderer2} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ModalService} from './modal.service';
import { ApiService } from './api.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({ 
  selector: 'select-editor',
  template: `
  <div class="select-editor" (click)="layerClick($event)" >
    <div class="drop-down" #dropdown [ngStyle]="{top: top, left: left, width: width}" (blur)="remove()">
      <a class="optgroup">{{"1劃:"}}</a><br>
      <a *ngFor="let radical of radical1; let i=index; last as isLast" (click)="itemClick($event, radical)" >      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"2劃:"}}</a><br>
      <a *ngFor="let radical of radical2; let i=index; last as isLast" (click)="itemClick($event, radical)" >      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"3劃:"}}</a><br>
      <a *ngFor="let radical of radical3; let i=index" (click)="itemClick($event, radical)">      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"4劃:"}}</a><br>
      <a *ngFor="let radical of radical4; let i=index" (click)="itemClick($event, radical)">      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"5劃:"}}</a><br>
      <a *ngFor="let radical of radical5; let i=index" (click)="itemClick($event, radical)">      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"6劃:"}}</a><br>
      <a *ngFor="let radical of radical6; let i=index" (click)="itemClick($event, radical)">      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"7劃:"}}</a><br>
      <a *ngFor="let radical of radical7; let i=index" (click)="itemClick($event, radical)">      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"8劃:"}}</a><br>
      <a *ngFor="let radical of radical8; let i=index" (click)="itemClick($event, radical)">      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"9劃:"}}</a><br>
      <a *ngFor="let radical of radical9; let i=index" (click)="itemClick($event, radical)">      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"10劃:"}}</a><br>
      <a  *ngFor="let radical of radical10; let i=index" (click)="itemClick($event, radical)">      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"11劃:"}}</a><br>
      <a  *ngFor="let radical of radical11; let i=index" (click)="itemClick($event, radical)">      
       <span >{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"12劃:"}}</a><br>
      <a *ngFor="let radical of radical12; let i=index; last as isLast" (click)="itemClick($event, radical)" >      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"13劃:"}}</a><br>
      <a *ngFor="let radical of radical13; let i=index; last as isLast" (click)="itemClick($event, radical)" >      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"14劃:"}}</a><br>
      <a *ngFor="let radical of radical14; let i=index; last as isLast" (click)="itemClick($event, radical)" >      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"15劃:"}}</a><br>
      <a *ngFor="let radical of radical15; let i=index; last as isLast" (click)="itemClick($event, radical)" >      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"16劃:"}}</a><br>
      <a *ngFor="let radical of radical16; let i=index; last as isLast" (click)="itemClick($event, radical)" >      
       <span>{{radical.label}}</span>
      </a><br>
      <a class="optgroup">{{"17劃:"}}</a><br>
      <a *ngFor="let radical of radical17; let i=index; last as isLast" (click)="itemClick($event, radical)" >      
       <span>{{radical.label}}</span>
      </a><br>
    </div>
  </div>
  `,
  styleUrls: ['./selectEditor.component.scss']
})

export class SelectEditorComponent implements ICellRendererAngularComp {
  public params: any;
  @ViewChild('dropdown',{static:true}) dropdown;
  
  public choices:any = [];
  public radical1:any=[];
  public radical2:any=[];
  public radical3:any=[];
  public radical4:any=[];
  public radical5:any=[];
  public radical6:any=[];
  public radical7:any=[];
  public radical8:any=[];
  public radical9:any=[];
  public radical10:any=[];
  public radical11:any=[];
  public radical12:any=[];
  public radical13:any=[];
  public radical14:any=[];
  public radical15:any=[];
  public radical16:any=[];
  public radical17:any=[];
  public loop=0;
  public value:any = null;
  public top :any = '';
  public left:any = '';
  public width = 100;
  public key = '';
  public body;
  public el;
  public nofirstclick = 0;
  constructor(public modalService:ModalService,public api:ApiService, private render:Renderer2,private eRef: ElementRef){

  }

  agInit(params: any): void {
    for(let i =0; i<18;i++){
      if(i==0){this.radical1=params.values[0]};
      if(i==1){this.radical2=params.values[1]};
      if(i==2){this.radical3=params.values[2]};
      if(i==3){this.radical4=params.values[3]};
      if(i==4){this.radical5=params.values[4]};
      if(i==5){this.radical6=params.values[5]};
      if(i==6){this.radical7=params.values[6]};
      if(i==7){this.radical8=params.values[7]};
      if(i==8){this.radical9=params.values[8]};
      if(i==9){this.radical10=params.values[9]};
      if(i==10){this.radical11=params.values[10]};
      if(i==11){this.radical12=params.values[11]};
      if(i==12){this.radical13=params.values[12]};
      if(i==13){this.radical14=params.values[13]};
      if(i==14){this.radical15=params.values[14]};
      if(i==15){this.radical16=params.values[15]};
      if(i==16){this.radical17=params.values[16]};

      this.body = document.body;
      this.el = this.dropdown.nativeElement;
      this.render.appendChild(this.body, this.el);
    
      
    }
    this.nofirstclick=0;
    this.params = params;
    this.choices = params.values.filter(c=>c.value !='');
    this.value = params.value;
    this.getPosition(params.eGridCell);
   
    // this.isBlank = params.eGridCell.classList.contains('blank');
  }
  
  getPosition(element){
    this.width = element.offsetWidth;
    this.top = element.getBoundingClientRect().top-1 + 'px';
    this.left = element.getBoundingClientRect().left-1 + 'px';
  }
  /*@HostListener('document:click', ['$event'])
  clickout(event){
   
    console.log(this.nofirstclick)
    console.log(event.target)
    console.log(this.dropdown.nativeElement)
    if(this.dropdown.nativeElement.contains(event.target)) {
      
      console.log('good')
    } else {
      //this.render.removeChild(this.body,this.el)
      console.log('not')
     
      
    }
  }*/
  remove(){
    console.log(33333333)
    this.render.removeChild(this.body,this.el)
  }
  layerClick($event){
   
    this.render.removeChild(this.body,this.el)
    $event.stopPropagation();
    this.params.api.stopEditing();
    
  }

  itemClick($event, item){
    $event.stopPropagation();
    this.value = item.value;
    this.render.removeChild(this.body,this.el)
    console.log(event)
    console.log(item)
    this.params.api.stopEditing();
  }

  getValue(){
    return this.value;
  }

  // public onClick() {
  //   let grid = this.params.context;
  //   if (this.params.node.childIndex == 0) {
  //     let rowData = grid.componentParent.rowData;
  //     let noData = true;
  //     for (let i = 1; i < rowData.length; i++){
  //       if (rowData[i].validColumn() != 'blank') {
  //         noData = false;
  //         break;
  //       }
  //     }
  //     if (noData) {
  //       let message = this.api.lang == 'b5' ? '這是唯一的題目,所以不能刪除' : 'It is last question.Therefore it can\'t be deleted.';
  //       this.modalService.create({ message: message, type: 'alert', execAfter: () => { } });
  //       return;
  //     }
  //   }
  //   //   return;
  //   if (this.api.readonly == 'true' || this.api.readonly == '1'){
  //     this.modalService.create({
  //       message: this.readonlyMessage, type: 'alert'
  //     });
  //   } else {
  //     this.modalService.create({
  //       message: this.message, type: 'confirm', callback: () => {
  //         let grid = this.params.context.componentParent;
  //         let rowData = grid.dataService.rowData;
  //         let data = this.params.data;
  //         data.clean();
  //         let index = rowData.indexOf(data);
  //         rowData.splice(index,1);
  //         rowData.push(data);
  //         grid.dataService.reindexData();
  //         grid.gridApi.setRowData(rowData);
  //         // this.params.api.updateRowData({update: [this.params.data]});
  //       },
  //       callbackText: this.callbackText
  //     });
  //   }
  // }

  refresh(): boolean {
    return false;
  }
 
}
