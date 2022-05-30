import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/UserInterface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User;
  isAuth: boolean;
  subscription: Subscription;

  constructor(private auth: AuthService) {
    this.subscription = this.auth.getUser().subscribe(({ user, isAuth }) => {
      this.user = user;
      this.isAuth = isAuth;
    });
  }

  ngOnInit(): void {
    this.auth.getUserFromStorage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
