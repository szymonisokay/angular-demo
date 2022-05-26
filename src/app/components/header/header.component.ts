import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any = {};
  isAuth: boolean = false;
  subscription: Subscription;

  constructor(private auth: AuthService) {
    this.subscription = this.auth.getUser().subscribe((value) => {
      this.user = { ...value };
      this.isAuth = true;
    });
  }

  ngOnInit(): void {}
}
