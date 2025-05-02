import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/Services/api-service.service';
import { Disponibilite } from 'src/Modeles/Disponibilite';
// Import the form component

import { DisponibiliteFormComponent } from '../disponibilite-form/disponibilite-form.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-disponibilite-admin',
  templateUrl: './disponibilite-admin.component.html',
  styleUrls: ['./disponibilite-admin.component.css'],
})
export class DisponibiliteAdminComponent implements OnInit {
  disponibilites: Disponibilite[] = [];

  constructor(private api: ApiService, public dialog: MatDialog) {}

  refreshData() {
    this.api.getData('disponibilites').subscribe((data: Disponibilite[]) => {
      this.disponibilites = data;
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  AddDisponibilite(): void {
    const dialogRef = this.dialog.open(DisponibiliteFormComponent, {
      data: { isAddMode: true, disponibilite: {} }, // Pass empty object for new disponibilité
    });

    dialogRef.afterClosed().subscribe((result: Disponibilite | null) => {
      if (result) {
        // Add the new disponibilité to the list and the database
        this.api.postData('disponibilites', result).subscribe(() => {
          this.disponibilites.push(result);
          this.refreshData();
        });
      }
    });
  }

  EditDisponibilite(disponibilite: Disponibilite): void {
    const dialogRef = this.dialog.open(DisponibiliteFormComponent, {
      data: { isAddMode: false, disponibilite: disponibilite }, // Pass the disponibilité to be edited
    });

    dialogRef.afterClosed().subscribe((result: Disponibilite | null) => {
      if (result) {
        // Update the disponibilité in the list and the database
        const index = this.disponibilites.findIndex((d) => d.id === result.id);
        if (index !== -1) {
          this.disponibilites[index] = result;
          this.api
            .putData('disponibilites', result.id.toString(), result)
            .subscribe(() => {
              this.refreshData();
            });
        }
      }
    });
  }

  DeleteDisponibilite(disponibilite: Disponibilite): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Disponibilite',
        content: 'Are you sure you want to delete this disponibilité?',
        Cancel: 'Cancel',
        Delete: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Delete the disponibilité
        this.api.deleteData('disponibilites', disponibilite.id.toString()).subscribe(() => {
          this.refreshData();
        });
      }
    });
  }
}

