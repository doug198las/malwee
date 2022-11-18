import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly baseUrl : string = 'https://localhost:44300/api/';

  constructor(private httpClient : HttpClient) {
  
  }

  public get(url : string) : Promise<any> {
    return this.httpClient.get(this.baseUrl + url).toPromise();
  }

  public post(url : string, data : any) : Promise<any> {
    const headers = { 'content-type': 'application/json'};

    // Logica para adicionar o token no header

    return this.httpClient.post(this.baseUrl + url, data, {
      headers: headers
    }).toPromise();
  }
}
