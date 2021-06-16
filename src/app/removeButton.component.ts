import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ModalService} from './modal.service';
import { ApiService } from './api.service';
import { StorageService } from'./storage.service';
@Component({
  selector: 'remove-button-cell',
  template: `<div  *ngIf=" storage.buy== 1"  (click)="onClick()" class="trash {{(isBlank?'blank':'')}}"></div>`,
  styles: [
    `    
      .trash {
        display: table;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH9SURBVFjD7ZjPbtswDIc/0rKbon/QotuLbJe9/xPsuIcY1lvaSLK4gxUXqJ1Ky7J02CTDl4jQxx8pMZTFeJ+h78Rt4Ab+B8Gu3tQwQApWpflqxTsiNhufLkBSqlwpw0ZGQOnOpXhvYOdWHBFAkKwlFuxrN00RPG0qQTA8nptzKX4ZW77bI08Fqy+VSS5GxhgROiCx5ZHbEylegCOOCDg8DkXQnN0OpeNU/98LcJoP0EBAEJSEYCQGbkgnAq/k2DOwxTHyzQxIGIpieAJXvwj4dCDnKzl+ZkAZMjLlg2R0XKM8F0C1qShurqloJAIJRen/HHgDJDwjijHmQHdMZcQXFiw5th+LHPvsiwIBR6Ar1udjxkKxokRA8TgEN5d9qwplbTWvrFzGV6s7SAZ8FsGI9MSDm+j/a30auIEbuIEbuIF/B5zYIWxR1jqlBAg6P5JvWzt6nt5o6SruWJNvgjGuLmC51xYM6Oe71ttX1qpQC9AfWEoxEimrBhjyTXqaOxqcclguIHfbr+enm7PD0aH47OI+TkeDQ/b8gsS4oiDx0ntHIoHLotoq8OTzyBUOI6wuoUDEE0lcciuCMb2HR3Fz9VnVBxH7kb+EvHZN8u8DPXfcYwSGguYKxUZE2PBR7tgs5m2267nmngcRUo6Mrp6DbN++VzdwAzdwA//14J+LCZZepk9M/wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNS0wM1QyMjoxNTo1NS0wNDowMDEOcGwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDUtMDNUMjI6MTU6NTUtMDQ6MDBAU8jQAAAAEXRFWHRqcGVnOmNvbG9yc3BhY2UAMbV8BCUAAAAYdEVYdGpwZWc6c2FtcGxpbmctZmFjdG9yADF4MRaug9sAAAAASUVORK5CYII=');
        /* background-image: url('../../assets/btn_trash.png'); */
        background-size: cover;
        background-position: center center;  
        width: 30px;
        height: 30px;  
      }

      .blank{
        display: none !important;
      }
    `
  ]
})
export class RemoveButtonComponent implements ICellRendererAngularComp {
  public params: any;
  private message;
  private readonlyMessage;
  private buttonText;
  private callbackText;
  public isBlank:boolean = false;
  constructor(public modalService:ModalService,  public storage: StorageService, public api:ApiService){
    this.message = api.lang=='b5'?'確定刪除題目?':'Are you sure to delete?';
    this.readonlyMessage = api.lang=='b5'?'文件為唯讀':'Are you sure to delete?';
  }

  agInit(params: any): void {
    this.params = params;
    this.isBlank = params.eGridCell.classList.contains('blank');
  }

  public onClick() {
  
    let grid = this.params.context;
    if (this.params.node.childIndex == 0) {
      let rowData = grid.componentParent.rowData;
      let noData = true;
      for (let i = 1; i < rowData.length; i++){
        if (rowData[i].validColumn() != 'blank') {
          noData = false;
          console.log('not blank')
          break;
        }
      }
      if (noData) {
        let message = this.api.lang == 'b5' ? '這是唯一的題目,所以不能刪除' : 'It is last question.Therefore it can\'t be deleted.';
        this.modalService.create({ message: message, type: 'alert', execAfter: () => { } });
        console.log('only 1 question')
        return;
      }
    }
    //   return;
    if (this.api.readonly == 'true' || this.api.readonly == '1'){
      console.log('in')
      this.modalService.create({
        message: this.readonlyMessage, type: 'alert'
      });
    } else {
      console.log('out')
      this.modalService.create({
        
        message: this.message, type: 'confirm', callback: () => {
          let grid = this.params.context.componentParent;
          let rowData = grid.dataService.rowData;
          let data = this.params.data;
          data.clean();
          let index = rowData.indexOf(data);
          rowData.splice(index,1);
          rowData.push(data);
          grid.dataService.reindexData();
          grid.gridApi.setRowData(rowData);
          // this.params.api.updateRowData({update: [this.params.data]});
        },
        callbackText: this.callbackText
      });
    }
  }

  refresh(): boolean {
    return false;
  }
}