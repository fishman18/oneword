import { Injectable } from '@angular/core';


@Injectable()
export class CommonService {
  public curMenuTitle = '';
///////////////////////////////////////////////////////////////////////////////////////////////////
  public getProperty = function(obj, path){
    path = path.split('.');
    var current = obj;
    while(path.length) {
      if(typeof current !== 'object') return undefined;
      current = current[path.shift()];
    }
    return current;
  };
///////////////////////////////////////////////////////////////////////////////////////////////////
  public print = function():void {
    window.print();
  };
///////////////////////////////////////////////////////////////////////////////////////////////////
  public objectKeys = function(obj:any):string[] {
    return Object.keys(obj);
  };
///////////////////////////////////////////////////////////////////////////////////////////////////
  //This is to filter out element of array
  public arrayFilter = function(arr:any[], key:string, value:any):any[] {
    return arr.filter(ele => ele[key] == value);
  }
  public arrayFilterOne = function(arr:any[], key:string, value:any):any {
    for (let i in arr) {
      if (arr[i][key] == value) {
        return arr[i];
      }
    }
    return null;
  }

  private curZIndex:number = 2000;
  public getZIndex = function():number {
    return 1050;
    //return this.curZIndex++;
  }
///////////////////////////////////////////////////////////////////////////////////////////////////
  private uniqueNum:number = 0;
  public getUniqueNum = function():number {
    return this.uniqueNum++;
    //return this.uniqueNum;
  }

  public loading:string[] = [];
  public getLoading = function():string[] {
    return this.loading;
  }
  public addLoading = function(appName:string):void {
    this.loading.push(appName);
  }
  public removeLoading = function(appName:string):void {
    console.log('remove logle');
    let position:number = this.loading.indexOf(appName);
    if (position > -1) this.loading.splice(position, 1);
  }
  public clearAllLoading = function():void {
    this.loading = [];
  }
///////////////////////////////////////////////////////////////////////////////////////////////////
  public showPopUpMenu = function(menuEle:any):void {
    if (menuEle.getAttribute("closing") == "true") return;
    menuEle.style.display = "block";
    let timer = setInterval(() => {
      if (menuEle.clientHeight && menuEle.clientWidth){// && menuEle.innerText && menuEle.innerHTML) {
        clearInterval(timer);
        menuEle.focus();
      }
    },10);
  };

  public hidePopUpMenu = function(menuEle:any):void {
    menuEle.setAttribute('closing', "true");
    menuEle.style.display = "none";
    let timer = setTimeout(() => {
      menuEle.removeAttribute('closing');
    },500);
  };

  constructor(){}

}

