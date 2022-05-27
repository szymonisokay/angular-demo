import { Component, OnInit } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isError: boolean = false;
  errorMsg: string = '';
  errorIcon = faExclamationCircle;
  subscription: Subscription;

  constructor(private auth: AuthService) {
    this.subscription = this.auth
      .getUser()
      .subscribe(({ isError, errorMsg }) => {
        this.isError = isError;
        this.errorMsg = errorMsg;
      });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.isError = true;
      this.errorMsg = 'Fields must not be empty';
      return;
    }

    this.auth.login(this.email, this.password, this.rememberMe);

    this.email = '';
    this.password = '';
    this.rememberMe = false;
  }

  clearError() {
    this.isError = false;
    this.errorMsg = '';
  }
}
