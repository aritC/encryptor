import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  apiUrl = '';
  constructor(private _http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  encrypt(text: string, password: string, viewCount: number): Observable<any> {
    return this._http.post(`${this.apiUrl}/api/encrypt`, {
      password,
      viewCount,
      text,
    });
  }

  decrypt(password: string, uid: string): Observable<any> {
    return this._http.post(`${this.apiUrl}/api/decrypt`, { password, uid });
  }

  checkLink(uid: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/api/${uid}`);
  }
}
