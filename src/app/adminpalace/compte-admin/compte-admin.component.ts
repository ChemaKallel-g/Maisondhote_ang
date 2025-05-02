// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Compte } from 'src/Modeles/Compte';
// import { ApiService } from 'src/Services/api-service.service';
// import { MatDialog } from '@angular/material/dialog';
// import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
// import { CompteFormComponent } from '../compte-form/compte-form.component'; // Assure-toi que le chemin est correct

// @Component({
//   selector: 'app-compte-admin',
//   templateUrl: './compte-admin.component.html',
//   styleUrls: ['./compte-admin.component.css'],
// })
// export class CompteAdminComponent implements OnInit {
//   formEdit!: FormGroup;
//   addVerif: number = 0;
//   comptes: Compte[] = [];
//   newCompte: Compte = {
//     id: 0,
//     Email: '',
//     Password: '',
//     administrator_id: null,
//     client_id: null,
    
//   };
//   editedCompte: Compte = {
//     id: 0,
//     Email: '',
//     Password: '',
//     administrator_id: null,
//     client_id: null,
//   };
//   addCompteModalVisible: boolean = false;
//   editCompteModalVisible: boolean = false;

//   constructor(private api: ApiService, private dialog: MatDialog) {}

//   refreshData() {
//     this.api.getData('comptes').subscribe((data: Compte[]) => {
//       this.comptes = data;
//     });
//   }

//   ngOnInit(): void {
//     this.refreshData();
//   }

//   openAddCompteDialog() {
//     const dialogRef = this.dialog.open(CompteFormComponent, {
//       width: '500px',
//       data: { isAddMode: true, compte: null },
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         this.api.postData('comptes', result).subscribe(() => {
//           this.refreshData();
//         });
//       }
//     });
//     this.addVerif = 0; // Cacher l'ancien popup
//   }

//   openEditCompteDialog(compte: Compte) {
//     const dialogRef = this.dialog.open(CompteFormComponent, {
//       width: '500px',
//       data: { isAddMode: false, compte: compte },
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         this.api.putData('comptes', compte.id.toString(), result).subscribe(() => {
//           this.refreshData();
//         });
//       }
//     });
//     this.addVerif = 0; // Cacher l'ancien popup
//   }

//   deleteCompte(idToDelete: number) {
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       width: '400px',
//       data: { title: 'Confirmation', content: 'Êtes-vous sûr de vouloir supprimer ce compte ?' },
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         this.api.deleteData('comptes', idToDelete.toString()).subscribe(() => {
//           this.comptes = this.comptes.filter((item) => item.id != idToDelete);
//         });
//       }
//     });
//   }

//   toggleAddCompteModal() {
//     this.openAddCompteDialog(); // Utiliser la nouvelle fonction de dialogue
//   }

//   toggleEditCompteModal(compte: Compte) {
//     this.openEditCompteDialog(compte); // Utiliser la nouvelle fonction de dialogue
//   }
// // }