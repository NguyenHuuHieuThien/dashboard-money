import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class Mainservice {
  baseURL = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
  ) { }

  callApi(url: string, payload: any = null) {
    if (payload) {
      return this.http.post(`${this.baseURL}${url}`, payload);
    }
    return this.http.get(`${this.baseURL}${url}`)
  }
}
