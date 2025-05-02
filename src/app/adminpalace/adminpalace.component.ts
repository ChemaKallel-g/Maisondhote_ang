import { Component } from '@angular/core';

@Component({
  selector: 'app-adminpalace',
  templateUrl: './adminpalace.component.html',
  styleUrls: ['./adminpalace.component.css']
})
export class AdminpalaceComponent {
  tablenb: number = 3;  // Par défaut, afficher la section Client
  
  changetable(tableNumber: number): void {
    this.tablenb = tableNumber;  // Mettre à jour la valeur de tablenb en fonction de l'onglet cliqué
  }
}
