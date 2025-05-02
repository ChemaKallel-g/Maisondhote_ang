import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: firebase.default.User | null = null;
  displayName: string | null | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.displayName = user?.displayName || user?.email;
      console.log('Nom d\'utilisateur actuel:', this.displayName);
    });
  }

  signout(): void {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/Login']);
    });
  }
}