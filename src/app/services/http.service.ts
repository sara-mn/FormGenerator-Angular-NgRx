import {Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { KeyValue } from '../dbManaging/types';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  options = {};

  constructor(private http: HttpClient) {
  }

  get<T>(url: string, data?: any, options?: IRequest): Observable<T> {
    this.options = {
      params: this.getParams(data),
      headers: this.getHeaders(options?.headers)
    }
    return this.http.get<T>(url, options)
  }

  post<T>(url: string, data: any, options?: IRequest): Observable<T> {
    this.options = {
      params: {},
      headers: this.getHeaders(options?.headers)
    };
    return this.http.post<T>(url, data,this.options);
  }

  put<T>(url: string, data: any, options?: IRequest): Observable<T> {
    this.options = {
      params: {},
      headers: this.getHeaders(options?.headers),
      body: data,
    };
    return this.http.put<T>(url, data, this.options);
  }

   patch<T>(url: string, data: any, options?: IRequest): Observable<T> {
    this.options = {
      params: {},
      headers: this.getHeaders(options?.headers),
      body: data,
    };
    return this.http.patch<T>(url, data, this.options);
  }

  delete<T>(url: string, options?: IRequest): Observable<T> {
    this.options = {
      params: {},
      headers: this.getHeaders(options?.headers),
    };
    return this.http.delete<T>(url, this.options)
  }

  getHeaders(headers?: KeyValue) {
    const _headers = new HttpHeaders(headers);
    _headers.append("Content-Type", "application/json");
    // _headers.append("Access-Control-Allow-Origin", "http://localhost:8000");
    // _headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // _headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    return _headers;
  }

  getParams(params?: any) {
    return new HttpParams(Object.assign({}, params));
  }
}

interface IRequest {
  headers?: KeyValue;
  params?: KeyValue;
}

interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  params?: HttpParams | { [param: string]: string | number | boolean | readonly(string | number | boolean)[] };
  context?: HttpContext;
  observe?: "body" | "events" | "response";
  reportProgress?: boolean;
  responseType?: "arraybuffer" | "blob" | "text" | "json";
  withCredentials?: boolean;
}
