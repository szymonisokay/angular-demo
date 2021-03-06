import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/UserInterface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User;
  isAuth: boolean;
  subscription: Subscription;

  constructor(private auth: AuthService) {
    this.subscription = this.auth.getUser().subscribe(({ user, isAuth }) => {
      this.user = user;
      this.isAuth = isAuth;
    });
  }

  logout = () => {
    this.auth.logout();
    this.isAuth = false;
  };

  ngOnInit(): void {
    this.auth.getUserFromStorage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
