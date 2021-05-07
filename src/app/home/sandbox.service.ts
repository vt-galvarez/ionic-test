import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';

@Injectable()
export class SandboxService {

  OMS_URL = 'sandbox-oms.vantek.io';

  private token: string;
  private interval: NodeJS.Timeout;

  constructor(private http: HttpClient) {
    // disable SSL cert checking, only meant for testing purposes, do NOT use in production!
    
    this.interval = setInterval(()=> {
      this.refreshToken();
    }, 60000);
  }

  public refreshToken(){
    this.getToken().subscribe( t => {
      console.log('token: ' + t);
      this.token = t.access_token;
    });
  }

  public getToken() : Observable<TokenResponse>{

    const body = new HttpParams()
    .set('grant_type', 'password')
    .set('username', 'jrvantek1')
    .set('password', 'vanguard');

    return this.http.post<TokenResponse>('https://demo.ahorapago.com/generic-oauth-core/oauth/token',body,
    {
      headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Authorization', 'Basic YnltYWRhdGFfYXBwOnZhbmd1YXJk'),
      withCredentials: true
    });
  }

  public getTitulosPublicos(isCI: boolean, is24hs: boolean, is48hs: boolean) : Observable<any> {
    
    return this.http.post<any>('https://uat.bymadata.vantek.io/vanoms-be-core/rest/api/byma/data/getTitulosPublicos', { 
      "T0": isCI,
      "T1": is24hs,
      "T2": is48hs
    }, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', "Bearer "+this.token),
      withCredentials: true
    });
  }

}

export interface TokenResponse {
  access_token : string;
  token_type : string;
  refresh_token : string;
  expires_in : number;
  scope : string;
}