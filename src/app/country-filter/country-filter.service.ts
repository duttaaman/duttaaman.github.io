import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpRequestService {

  constructor(private httpClient: HttpClient) {

  }

  public getAll(){
    return this.httpClient
    .get(`https://restcountries.eu/rest/v2/all`);
  }

  public getCountryName(name:string){
    return this.httpClient
    .get(`https://restcountries.eu/rest/v2/name/${name}`);
  }

  public getCountryDetails(name:string){
    return this.httpClient.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
  }

  

}