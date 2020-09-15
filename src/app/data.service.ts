import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Row } from './row.class';
import { DebugHelper } from 'protractor/built/debugger';

import { ApiService } from './api.service';

type AOA = any[][];
@Injectable()

export class DataService {
  rowData: Row[] = [];
  dataUrl: string;

  constructor(private httpClient: HttpClient,public api: ApiService) {
    this.dataUrl = environment.dataUrl;
  }

  public dataId;
  public token;

  trimData() {
    let filterData = this.rowData.filter((row) => {
      return row.validColumn() != 'blank';
    });
    return filterData;
  }

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();


  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  setData(callBack: any = null) {
    this.initData();
    this.loadData().subscribe((res: any) => {
      if (res.body) {
        if (res.body.data) {
          res.body.data.forEach((row) => {
            this.rowData[row.question_no - 1] = new Row(row);
          });
        }        
      }
      callBack();
    });
  }




  public loadData(): Observable< any > {
    let path = this.dataUrl + 'read';
    
    let time = Math.floor(new Date().getTime() / 1000);
    let object = {
      id: this.api.dataId,
      token: this.api.token,
      key: time,
      hash: Md5.hashStr(this.api.dataId + "/" + time + "/" + this.api.token),
    };
   
    const formData = new FormData();
    formData.append('json', JSON.stringify(object));
    
    let options: any = {};
    options.observe = 'response';
    options.responseType = 'json';
    options.headers = new HttpHeaders(); 
    return this.httpClient.post(path, formData, options)
  }

  public saveData(): Observable<any> {
    let path = this.dataUrl + 'update';
    let time = Math.floor(new Date().getTime() / 1000);
    let object = {
      id: this.api.dataId,
      token: this.api.token,
      key: time,
      hash: Md5.hashStr(this.api.dataId + "/" + time + "/" + this.api.token),
      data: this.trimData()
    };
    const formData = new FormData();
    
    formData.append('json', JSON.stringify(object));
    
    let options: any = {};
    options.observe = 'response';
    options.responseType = 'json';
    options.headers = new HttpHeaders();
    return this.httpClient.post(path, formData, options);
    
  }
  initData() {
    let sampleQuestion: Row[] = [];
    sampleQuestion['b5'] = new Row({ question_no: "1", question: ""});
    sampleQuestion['en'] = new Row({ question_no: "1", question: ""});
    this.rowData[0] = sampleQuestion[this.api.lang];
    for (let i = 1; i <= 20; i++) {
      this.rowData[i - 1] = new Row({ question_no: i });
    }

  }

  public mergeData() {
    let trimData = this.trimData();
    this.initData();
    trimData.forEach((row, index) => {
      row.question_no = index + 1;
      this.rowData[index] = row;
    });
  }
  public reindexData() {
    let rows = this.rowData;
    this.rowData.forEach((row) => {
      row.question_no = rows.indexOf(row) + 1;
    });
  }
  
  public importData(importData: any = []) {
    this.initData();
    let rowData = this.rowData;
    let filterData = importData.filter((row) => (row.length > 1 || !!row[0]));

    if (filterData.length) {
      for (let i = 0; i < filterData.length; i++) {
        rowData[i].question = filterData[i][0] || '';
        rowData[i].answer1 = filterData[i][1] || '';
        console.log("import");
        console.log(filterData[i][0]);
        console.log(filterData[i][1]);
        //let answer_index = ['', 'A', 'B', 'C', 'D'].indexOf(filterData[i][filterData[i].length - 1]);
       
      }
    }
    return filterData.length;
  }
  public rowData2Array() {
    let exportArray: AOA = [];
    let rows = this.trimData();
    for (let i = 0; i < rows.length; i++) {
      exportArray[i] = [];
      exportArray[i][0] = rows[i].question;
      exportArray[i][1] = rows[i].answer1;
    }
    return exportArray;
  }
  public getXlsx(url){
    return this.httpClient.get(url,{responseType: 'blob'});
  }

}
