import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from 'src/Modeles/Reservation'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  form!: FormGroup;
  isAddMode: boolean;
  reservation: Reservation;

  constructor(
    public dialogRef: MatDialogRef<ReservationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation },
    private fb: FormBuilder
  ) {
    // Vérification si on est en mode "ajout" ou "modification"
    this.isAddMode = !data?.reservation;
    this.reservation = data?.reservation || {
      id: 0, checkin: '', checkout: '', PrixTotal: 0, nbPerson: 0, client_id: null, Maisondhote_id: null, etat: ''
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      checkin: [this.reservation.checkin, Validators.required],
      checkout: [this.reservation.checkout, Validators.required],
      PrixTotal: [this.reservation.PrixTotal, Validators.required],
      nbPerson: [this.reservation.nbPerson, Validators.required],
      client_id: [this.reservation.client_id],
      Maisondhote_id: [this.reservation.Maisondhote_id],
      etat: [this.reservation.etat, Validators.required],
    });
  }

  onSaveClick() {
    if (this.form.valid) {
      const result = {
        ...this.reservation,
        ...this.form.value
      };
      this.dialogRef.close(result); // Fermeture de la boîte de dialogue avec les données mises à jour
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Fermeture sans envoi de données
  }
}
