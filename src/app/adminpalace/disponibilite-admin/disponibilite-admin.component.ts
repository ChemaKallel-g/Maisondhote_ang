import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/Services/api-service.service';
import { Disponibilite } from 'src/Modeles/Disponibilite';
// Import the form component
import { DisponibiliteFormComponent } from '../disponibilite-form/disponibilite-form.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-disponibilite-admin',
  templateUrl: './disponibilite-admin.component.html',
  styleUrls: ['./disponibilite-admin.component.css'],
})
export class DisponibiliteAdminComponent implements OnInit {
  disponibilites: Disponibilite[] = [];

  constructor(private api: ApiService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

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
          this.refreshData();
          this.showSuccess('Disponibilité ajoutée avec succès');
        }, error => this.showError('Erreur lors de l\'ajout de la disponibilité'));
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
        this.api
          .putData('disponibilites', result.id!.toString(), result)
          .subscribe(() => {
            this.refreshData();
            this.showSuccess('Disponibilité modifiée avec succès');
          }, error => this.showError('Erreur lors de la modification de la disponibilité'));
      }
    });
  }

  DeleteDisponibilite(disponibilite: Disponibilite): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Supprimer la Disponibilité',
        content: 'Êtes-vous sûr de vouloir supprimer cette disponibilité ?',
        Cancel: 'Annuler',
        Delete: 'Supprimer',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Delete the disponibilité
        this.api.deleteData('disponibilites', disponibilite.id!.toString()).subscribe(() => {
          this.refreshData();
          this.showSuccess('Disponibilité supprimée avec succès');
        }, error => this.showError('Erreur lors de la suppression de la disponibilité'));
      }
    });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}