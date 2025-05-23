import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Services/api-service.service';
import { Reservation } from 'src/Modeles/Reservation';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservation-admin',
  templateUrl: './reservation-admin.component.html',
  styleUrls: ['./reservation-admin.component.css'],
})
export class ReservationAdminComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(
    private api: ApiService, 
    private dialog: MatDialog, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.api.getData('reservations').subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data;
      },
      error: (error) => {
        console.error('Error fetching reservations:', error);
        this.showError('Erreur lors du chargement des réservations');
      }
    });
  }

  AddReservation(): void {
    const dialogRef = this.dialog.open(ReservationFormComponent, {
      width: '600px',
      data: { reservation: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.postData('reservations', result).subscribe({
          next: () => {
            this.getReservations();
            this.showSuccess('Réservation ajoutée avec succès');
          },
          error: (error) => {
            console.error('Error adding reservation:', error);
            this.showError('Erreur lors de l\'ajout de la réservation');
          }
        });
      }
    });
  }

  EditReservation(reservation: Reservation): void {
    const dialogRef = this.dialog.open(ReservationFormComponent, {
      width: '600px',
      data: { reservation: {...reservation} } // Copie profonde de l'objet
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Data to update:', result); // Pour débogage
        this.api.putData('reservations', result.id.toString(), result).subscribe({
          next: () => {
            this.getReservations();
            this.showSuccess('Réservation modifiée avec succès');
          },
          error: (error) => {
            console.error('Error updating reservation:', error);
            this.showError('Erreur lors de la modification de la réservation');
          }
        });
      }
    });
  }

  deleteReservation(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Êtes-vous sûr ?',
        content: 'Êtes-vous sûr de vouloir supprimer cette réservation ?',
        Cancel: 'Annuler',
        Delete: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.deleteData('reservations', id.toString()).subscribe({
          next: () => {
            this.getReservations();
            this.showSuccess('Réservation supprimée avec succès');
          },
          error: (error) => {
            console.error('Error deleting reservation:', error);
            this.showError('Erreur lors de la suppression de la réservation');
          }
        });
      }
    });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
}