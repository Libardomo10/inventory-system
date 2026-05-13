import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SignInModel } from '../models/sign-in.model';
import { TokenResponse } from '../models/token.model';
import { Response } from '../../../core/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  signIn(signInData: SignInModel): Observable<Response<TokenResponse>> {
    return this.http.post<Response<TokenResponse>>(`${this.apiUrl}/Auth/login`, signInData);
  }
}
