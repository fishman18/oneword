import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()

export class ApiService {
  private url;
  public lang: string;
  public dataId: string;
  public token: string;
  public readonly: string;
  public isDebug: string;
  
  constructor(private http: HttpClient) {
    this.url = environment.dataUrl;
  }

  get(params: any) {
    let url = this.url + '?';
    for (let key in params) {
      url = url + key + '=' + params[key] + '&';
    }

    url = url.substr(0, url.length - 1);
    let ob = this.http.get(url);
    return ob;
  }

  post(path, fd: FormData) {
    let url = this.url + '?r=' + path;
    let ob = this.http.post(url, fd);
    return ob;
  }

  handleError(some, error) {
  }

  // public loadData(){
  //   let path = this.url + 'read';
  //   let time = Math.floor(new Date().getTime() / 1000);
  //   let object = {
  //     id: this.dataId,
  //     token: this.token,
  //     key: time,
  //     hash: Md5.hashStr(this.dataId + "/" + time + "/" + this.token),
  //   };
  //   const formData = new FormData();
  //   formData.append('json', JSON.stringify(object));
  //   let options: any = {};
  //   options.observe = 'response';
  //   options.responseType = 'json';
  //   options.headers = new HttpHeaders();
  //   return this.http.post(path, formData, options)
  // }


}