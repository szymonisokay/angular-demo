import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  password2: string;
  isError: boolean;
  errorMsg: string;
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

  onSubmit = () => {
    if (!this.username || !this.email || !this.password || !this.password2) {
      this.isError = true;
      this.errorMsg = 'Fields must not be empty';
      return;
    }

    if (this.password !== this.password2) {
      this.isError = true;
      this.errorMsg = 'password do not match';
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.auth.register(userData);

    this.username = '';
    this.email = '';
    this.password = '';
    this.password2 = '';
  };

  clearError = () => {
    this.isError = false;
    this.errorMsg = '';
  };
}
