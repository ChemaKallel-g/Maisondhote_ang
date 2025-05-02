// import { Component, OnInit, Inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Promotion } from 'src/Modeles/Promotion'; // Assurez-vous que le chemin est correct

// @Component({
//   selector: 'app-promotion-form',
//   templateUrl: './promotion-form.component.html',
//   styleUrls: ['./promotion-form.component.css']
// })
// export class PromotionFormComponent implements OnInit {
//   form!: FormGroup;
//   isAddMode: boolean;
//   promotion: Promotion;

//   constructor(
//     public dialogRef: MatDialogRef<PromotionFormComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { promotion: Promotion },
//     private fb: FormBuilder
//   ) {
//     this.isAddMode = !data?.promotion;
//     this.promotion = data?.promotion || { id: 0, dateDebut: '', dateFin: '', pourcentage: 0, Maisondhote_id: null };
//   }

//   ngOnInit() {
//     this.form = this.fb.group({
//       dateDebut: [this.promotion.dateDebut, Validators.required],
//       dateFin: [this.promotion.dateFin, Validators.required],
//       pourcentage: [this.promotion.pourcentage, Validators.required],
//       Maisondhote_id: [this.promotion.Maisondhote_id],
//     });
//   }

//   onSaveClick() {
//     if (this.form.valid) {
//       const result = {
//         ...this.promotion,
//         ...this.form.value
//       };
//       this.dialogRef.close(result);
//     }
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }