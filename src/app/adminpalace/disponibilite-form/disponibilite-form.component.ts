import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Disponibilite } from 'src/Modeles/Disponibilite';

@Component({
  selector: 'app-disponibilite-form',
  templateUrl: './disponibilite-form.component.html',
  styleUrls: ['./disponibilite-form.component.css']
})
export class DisponibiliteFormComponent implements OnInit {
  form: FormGroup;
  isAddMode: boolean;
  disponibilite: Disponibilite;

  constructor(
    public dialogRef: MatDialogRef<DisponibiliteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isAddMode: boolean; disponibilite: Disponibilite }
  ) {
    this.isAddMode = data.isAddMode;
    this.disponibilite = data.disponibilite || {
      id: 0,
      dateDebut: '',
      dateFin: '',
      nbChambre2: 0,
      nbChambreRestantes2: 0,
      prixChambre2: 0,
      nbChambre3: 0,
      nbChambreRestantes3: 0,
      prixChambre3: 0,
      nbChambre4: 0,
      nbChambreRestantes4: 0,
      prixChambre4: 0,
      Maisondhote_id: 0,
    };

    this.form = new FormGroup({
      dateDebut: new FormControl(this.disponibilite.dateDebut, Validators.required),
      dateFin: new FormControl(this.disponibilite.dateFin, Validators.required),
      nbChambre2: new FormControl(this.disponibilite.nbChambre2, Validators.required),
      nbChambreRestantes2: new FormControl(this.disponibilite.nbChambreRestantes2, Validators.required),
      prixChambre2: new FormControl(this.disponibilite.prixChambre2, Validators.required),
      nbChambre3: new FormControl(this.disponibilite.nbChambre3, Validators.required),
      nbChambreRestantes3: new FormControl(this.disponibilite.nbChambreRestantes3, Validators.required),
      prixChambre3: new FormControl(this.disponibilite.prixChambre3, Validators.required),
      nbChambre4: new FormControl(this.disponibilite.nbChambre4, Validators.required),
      nbChambreRestantes4: new FormControl(this.disponibilite.nbChambreRestantes4, Validators.required),
      prixChambre4: new FormControl(this.disponibilite.prixChambre4, Validators.required),
      Maisondhote_id: new FormControl(this.disponibilite.Maisondhote_id, Validators.required),
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onYesClick(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      const result: Disponibilite = {
        ...formData, // Spread the form values
        id: this.data.disponibilite.id, // **Include the ID from the injected data**
      };
      this.dialogRef.close(result);
    }
  }
  
}