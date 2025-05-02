// import { Component, Input, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';
// import { ApiService } from 'src/Services/api-service.service';
// import { Compte } from 'src/Modeles/Compte';

// @Component({
//   selector: 'app-compte-form',
//   templateUrl: './compte-form.component.html',
//   styleUrls: ['./compte-form.component.css'],
// })
// export class CompteFormComponent implements OnInit {
//   @Input() compte: Compte | null = null;
//   @Input() isAddMode: boolean = true;

//   form!: FormGroup;

//   constructor(private api: ApiService, public dialogRef: MatDialogRef<CompteFormComponent>) {}

//   ngOnInit(): void {
//     this.form = new FormGroup({
//       Email: new FormControl(this.compte?.Email || '', [Validators.required, Validators.email]), // Exemple de validation d'email
//       Password: new FormControl(this.compte?.Password || '', [Validators.required]),
//       administrator_id: new FormControl(this.compte?.administrator_id || null),
//       client_id: new FormControl(this.compte?.client_id || null),
//       // Ajoute ici d'autres FormControl si ton formulaire a plus de champs
//     });
//   }

//   submitForm() {
//     if (this.form.invalid) return;

//     const formData = this.form.value;
//     const newOrUpdatedCompte: Compte = { ...this.compte, ...formData } as Compte; // Combine les données

//     if (this.isAddMode) {
//       this.api.postData('comptes', newOrUpdatedCompte).subscribe(() => {
//         this.dialogRef.close(true); // Retourne true pour indiquer le succès
//       });
//     } else {
//       this.api.putData('comptes', this.compte!.id.toString(), newOrUpdatedCompte).subscribe(() => {
//         this.dialogRef.close(true); // Retourne true pour indiquer le succès
//       });
//     }
//   }

//   cancel() {
//     this.dialogRef.close(false); // Retourne false pour indiquer l'annulation
//   }
// }