import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable()
export class RoService {

    private callId:number = 1;
    private checkMultipartSupport:boolean = false;
    private supportMutipart:boolean = false;

    constructor() {
        window['ro'] = {
            calls: {},
            callback: (callId:number, status:any, data:string) => {
                if (status=='ack') {
                    if (this.callingId == callId) {
                        this.callingId = null;
                        this.nextHash();
                    };
                } else {
                    let call = window['ro'].calls[callId];
                    if (call) {
                        (status == 200) ? call.resolve(data) : call.reject(data);
                        delete window['ro'].calls[callId];
                    }
                }
            }
        }
    }
    //---------------------------------------------------------------------------------------------
    private lastRequestTime:number = 0;
    //---------------------------------------------------------------------------------------------
	private prepareResponse(resolve:Function, reject:Function):any {
		let callId:number = this.callId++;
		var response = { id:callId, resolve:resolve, reject:reject };
		window['ro'].calls[callId] = response;
		return response;
	}
    //---------------------------------------------------------------------------------------------
    public request(name:string, data:any={}, timeoutRejct:boolean=true):any{
        return new Promise((resolve, reject)=>{
			var response:any = this.prepareResponse(resolve, reject);
            this.callRo(name, data, response, timeoutRejct);
        });
    }
    //---------------------------------------------------------------------------------------------
    private callRo(name:string, data:any={}, response:any={}, timeoutRejct:boolean):void
	{
		if(!this.checkMultipartSupport)
		{
            let supportMultiPartResponse:any = this.prepareResponse(
                ()=>{
                    this.checkMultipartSupport = true;
                    this.supportMutipart = true;
                    this.callRo(name, data, response, timeoutRejct);
                },
                ()=>{
                    this.checkMultipartSupport = true;
                    this.callRo(name, data, response, timeoutRejct);
                }
            );
            this.simpleCall("supportMultiPart", "", supportMultiPartResponse, true);
            /*setTimeout(()=>{
                if (!this.checkMultipartSupport) supportMultiPartResponse.reject();
            },6000);*/
		} else {
			this.middleWareCall(name, data, response, timeoutRejct);
		}
    }
    //---------------------------------------------------------------------------------------------
	private middleWareCall(name:string, data:any = {}, response:any={}, timeoutRejct:boolean):void
	{
		if(this.supportMutipart)
		{
			this.multiplePartRequest(name, data, response, timeoutRejct);
		} else {
			this.encodedRequest(name, data, response, timeoutRejct);
		}
	}
    //---------------------------------------------------------------------------------------------
	private toHex(tmp:String):String
	{
		var tmp_len = tmp.length;
		var parts = [];
		for (var i = 0; i < tmp_len; i += 1) {
			var charCode = tmp.charCodeAt(i);
			parts.push(charCode.toString(16));
		}
		return parts.join(",");
	}
	private splitHex(hex:String):string[]
	{
		var out = [];
		while (hex.length > 0)
		{
			out.push(hex.substr(0, 1024));
			hex = hex.substring(1024);
		}
		return out;
	}
	private multiplePartRequest(name:string, data:any = {}, response:any = {}, timeoutRejct):void
	{
		let json:String = JSON.stringify(data);
		if(json.length > 1024 )
		{
			let hexJSON = this.toHex(json);
			let array = this.splitHex(hexJSON);
            var len = array.length;

            let curIndex:number = 0;
            let loopFn:Function = ()=>{
                if (curIndex<len){
                    this.simpleCall(
                        "append",
                        "id("+response.id+")-index("+curIndex+")-total("+(len-1)+")-hex("+array[curIndex]+")",
                        this.prepareResponse(
                            ()=>{
                                curIndex++;
                                loopFn();
                            }, ()=>{
                                //error
                                response.reject();
                            }
                        ),
                        false
                    );
                } else {
                    //Last call
                    this.simpleCall( name, "", response, timeoutRejct);
                }
            };
            loopFn();
		} else {
			this.encodedRequest(name, data, response, timeoutRejct);
		}
	}

	// this behavior is different from original Jimmy's version
	private encodedRequest(name:string, data:any = {}, response:any = {}, timeoutRejct:boolean):void
	{
		this.simpleCall(name, encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(data))))), response, timeoutRejct);
	}
	// final call to RO
	private simpleCall(name:string, data:string = '', response:any = {}, timeoutRejct):void
	{
		let hash:string = [ "ro/request", name, "window.ro.callback", response.id, data, this.now() ].join("/");
		this.assignHash2(hash, response.id, name, timeoutRejct);
    }

    private hashQueue:any[] = [];
    private callingId:number = null;
    private assignHash2(hash:string, callId:number, name:string, timeoutRejct:boolean):void {
        this.hashQueue.push({
            id: callId,
            hash: hash,
            name: name,
            timeoutRejct: timeoutRejct
        });

        this.nextHash();
    }

    private nextHash():void {
        if (this.callingId!=null || this.hashQueue.length<1) return;
        let hashObj:any = this.hashQueue.shift();
        this.callingId = hashObj.id;
        window.location.hash = hashObj.hash;
        setTimeout(()=>{
            if (this.callingId == hashObj.id) {
                if (hashObj.timeoutRejct) window['ro'].callback(hashObj.id, 408, 'Request Timeout.');
                this.callingId = null;
                this.nextHash();
            }
        },1000);
    }

	private assignHash(hash)
	{
		this.delay(()=>{
			this.lastRequestTime = this.now();
			window.location.hash = hash;
		});
	}

	private now()
	{
		return new Date().getTime();
	}

	private delay(fn:Function)
	{
		if (new Date().getTime() > this.lastRequestTime + 500) {
            fn();
        } else {
            setTimeout(()=>{this.delay(fn)}, 500);
        }
	}
    //---------------------------------------------------------------------------------------------


}
