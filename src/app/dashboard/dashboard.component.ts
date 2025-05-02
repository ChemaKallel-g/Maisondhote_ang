import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Maisondhote } from 'src/Modeles/Maisondhote';
import { ApiService } from 'src/Services/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router, private api: ApiService) {}
  destination: string | undefined;
  selectedPerson: number | undefined;
  checkInDate: string | undefined;
  checkOutDate: string | undefined;
  Maisondhote_count = '';
  Maisondhotes: Maisondhote[] = [];

  ngOnInit(): void {
    this.api.getData('Maisondhotes').subscribe((data) => {
      this.Maisondhotes = data;
      console.log(this.Maisondhotes);
    });
  }
  

  searchMaisondhote() {
    const serializedMaisondhotes = JSON.stringify(this.Maisondhotes);
    this.router.navigate(['/Maisondhotelist'], {
      queryParams: {
        destination: this.destination,
        selectedPerson: this.selectedPerson,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        ['Maisondhotes']: serializedMaisondhotes,
      },
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); // par exemple
  }
  
}
