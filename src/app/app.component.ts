import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/data.service';
import { ModalService } from 'src/app/modal.service';
import { Row } from 'src/app/row.class';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { getUrlVars } from './getUrlVars.function';
import { StorageService } from './storage.service';

type AOA = any[][];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public params: string[] = [];
  public module: string = '';
  title = 'project';
  editField: string;
  public rowData: Row[] = [];
  protected gridApi;
  message:string;
  @Input() myVar: string;
  public search=[];
  public result =[];
  public radi  =[];
  public lang: string;
  public value = '';
  public text;
  public text1;
  public text2;
  public text3;
  public wrong = 0;
  public information = [];
    constructor(public dataService: DataService, public commonService: CommonService, public storage: StorageService, public api: ApiService, public modalService: ModalService, protected route: ActivatedRoute)
     {
    
        route.params.subscribe(param => {
            this.module = param['module'];
          });
          this.loadParams();
    let href = decodeURIComponent(window.location.href);
    console.log(decodeURIComponent(href))
    let url = [], hash;
    let jwtarr =[];
    let uri = window.location.href.split('#')[0];
    let hashes = uri.slice(window.location.href.indexOf('?') + 1).split('&');
    for(let i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      let jwtdecode = hashes[i].split('%3D');
      jwtarr.push(jwtdecode[0]);
      jwtarr[jwtdecode[0]] = jwtdecode[1];
      url.push(hash[0]);
      url[hash[0]] = hash[1];
    }
    console.log(url)
    /*for(let i=0; i<url.length; i++)
    { 
      let w = url[i].split("=")
      url[i] = w;
      console.log(url)
    }*/
    if (href.indexOf('/en/') > -1) {
      this.storage.lang = 'en';
      this.api.lang = 'en';
    } else if (href.indexOf('/sc/') > -1){
      this.storage.lang = 'sc';
      this.api.lang = 'sc'
    } else {
      this.storage.lang = 'b5';
      this.api.lang = 'b5'
    }
    
    
    let jwt:string = url['jwt'] ;
    let id = url['id'];
    let time = url['time'];
    let token = url['token'];
    
    this.storage.id = id;
    this.storage.time = time;
    this.storage.token = token;
    console.log('lang'+this.api.lang)
    if (jwt) {
        this.storage.jwt = jwt;
        let jwts:string[] = jwt.split('.');
        console.log(jwts)
        if (jwts[1]) {
            try {
                this.storage.jwtObj = JSON.parse(atob(jwts[1]));
                console.log(this.storage.jwtObj);
            } catch (e) {}
        }
    } else if (!this.storage.jwt){
      this.storage.jwt = environment.jwt;
      console.log(this.storage.jwt)
    }
    this.commonService.addLoading('gameaddon');
    console.log(this.storage.jwtObj.school_id)

          console.log(this.api.token)
          
      }
      
      loadParams() {
        let params = getUrlVars();
        
        this.api.dataId = params['id'] || environment.defaultDataId;
        this.api.token = params['token'] || environment.defaultToken;
        this.api.readonly = params['readonly'] || 'false';
        this.api.isDebug = params['isDebug'] || 'false';
      }

    
 
ngOnInit() {
    
     
   
      
}







}
