// import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ApiService } from 'src/Services/api-service.service';
// import { Promotion } from 'src/Modeles/Promotion'; // Assurez-vous que le chemin est correct
// import { PromotionFormComponent } from '../promotion-form/promotion-form.component';
// import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';



// @Component({
//   selector: 'app-promotion-admin',
//   templateUrl: './promotion-admin.component.html',
//   styleUrls: ['./promotion-admin.component.css'],
// })
// export class PromotionAdminComponent implements OnInit {
//   promotions: Promotion[] = [];

//   constructor(private api: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

//   ngOnInit(): void {
//     this.getPromotions();
//   }

//   getPromotions() {
//     this.api.getData('promotions').subscribe((data: Promotion[]) => {
//       this.promotions = data;
//     });
//   }

//   AddPromotion(): void {
//     const dialogRef = this.dialog.open(PromotionFormComponent, {
//       width: '600px',
//       data: { promotion: null } // Pour indiquer l'ajout
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.api.postData('promotions', result).subscribe(() => {
//           this.getPromotions();
//           this.showSuccess('Promotion ajoutée avec succès');
//         }, error => this.showError('Erreur lors de l\'ajout de la promotion'));
//       }
//     });
//   }

//   EditPromotion(promotion: Promotion): void {
//     const dialogRef = this.dialog.open(PromotionFormComponent, {
//       width: '600px',
//       data: { promotion: promotion } // Passer la promotion à éditer
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.api.putData('promotions', result.id.toString(), result).subscribe(() => {
//           this.getPromotions();
//           this.showSuccess('Promotion modifiée avec succès');
//         }, error => this.showError('Erreur lors de la modification de la promotion'));
//       }
//     });
//   }

//   deletePromotion(id: number): void {
//     // Utilisez votre composant ConfirmDialogComponent
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       width: '400px',
//       data: {
//         title: 'Êtes-vous sûr ?',
//         content: 'Êtes-vous sûr de vouloir supprimer cette promotion ?',
//         Cancel: 'Annuler',
//         Delete: 'Supprimer'
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.api.deleteData('promotions', id.toString()).subscribe(() => {
//           this.getPromotions();
//           this.showSuccess('Promotion supprimée avec succès');
//         }, error => this.showError('Erreur lors de la suppression de la promotion'));
//       }
//     });
//   }

//   private showSuccess(message: string) {
//     this.snackBar.open(message, 'Fermer', {
//       duration: 3000,
//       panelClass: ['success-snackbar'],
//     });
//   }

//   private showError(message: string) {
//     this.snackBar.open(message, 'Fermer', {
//       duration: 5000,
//       panelClass: ['error-snackbar'],
//     });
//   }
// }