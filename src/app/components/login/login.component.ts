import { Component, OnInit } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
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

  constructor(private auth: AuthService) {}

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
