import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL = 'http://localhost:5000/users';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = {
    email: '',
    password: '',
  };
  private userSubject = new Subject<any>();

  constructor(private router: Router, private http: HttpClient) {}

  login = (email: string, password: string, rememberMe: boolean) => {
    this.http
      .post(URL, { email, password }, httpOptions)
      .subscribe((user) => console.log(user));
    // this.userSubject.next(this.user);
    // this.router.navigate(['/']);
  };

  getUser = () => {
    return this.userSubject.asObservable();
  };
}
