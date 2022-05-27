import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/UserInterface';

const URL = 'http://localhost:5000/api/auth/login';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const initialState = {
  _id: '',
  username: '',
  email: '',
  image: '',
  token: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User = initialState;
  private userSubject = new Subject<any>();
  private errorSubject = new Subject<any>();
  private isAuth: boolean = false;
  private isError: boolean = false;
  private errorMsg: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  storeUserData = (data: User) => {
    localStorage.setItem('user', JSON.stringify(data));
  };

  getUserFromStorage = () => {
    const user = localStorage.getItem('user');

    if (!user) return;

    this.isAuth = true;
    this.userSubject.next({ user: JSON.parse(user), isAuth: this.isAuth });
  };

  login = (email: string, password: string, rememberMe: boolean) => {
    this.http.post<User>(URL, { email, password }, httpOptions).subscribe(
      (user) => {
        this.user = user;
        this.isAuth = true;
        this.storeUserData(this.user);
        this.router.navigate(['/']);

        this.userSubject.next({ user: this.user, isAuth: this.isAuth });
      },
      (error) => {
        this.errorMsg = error.error.message;
        this.isError = true;
        this.userSubject.next({
          errorMsg: this.errorMsg,
          isError: this.isError,
        });
      }
    );
  };

  logout = () => {
    if (!localStorage.getItem('user')) return;

    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.user = initialState;
    this.isAuth = false;

    this.userSubject.next({ user: initialState, isAuth: this.isAuth });
  };

  getUser = () => {
    return this.userSubject.asObservable();
  };
}
