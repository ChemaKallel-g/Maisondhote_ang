import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Maisondhote } from 'src/Modeles/Maisondhote';
import { ApiService } from 'src/Services/api-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MaisondhoteFormComponent } from '../maisondhote-form/maisondhote-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-Maisondhote-admin',
  templateUrl: './Maisondhote-admin.component.html',
  styleUrls: ['./Maisondhote-admin.component.css'],
})
export class MaisondhoteAdminComponent implements OnInit {
  formEdit!: FormGroup;
  addVerif: number = 0;
  Maisondhotes: Maisondhote[] = [];
  newMaisondhote: Maisondhote = {
    id: 0,
    nomMaisondhote: '',
    adress: '',
    ville: '',
    nbVisiteur: 0,
  };
  editedMaisondhote: Maisondhote = {
    id: 0,
    nomMaisondhote: '',
    adress: '',
    ville: '',
    nbVisiteur: 0,
  };
  addMaisondhoteModalVisible: boolean = false;
  editMaisondhoteModalVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  refreshData() {
    this.api.getData('Maisondhotes').subscribe({
      next: (data: Maisondhote[]) => {
        this.Maisondhotes = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des maisons d\'hôte:', error);
        this.snackBar.open('Erreur lors de la récupération des données.', 'Fermer', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  AddMaisondhote() {
    const dialogRef = this.dialog.open(MaisondhoteFormComponent, {
      width: '500px',
      data: { isAddMode: true, maisondhote: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshData();
        this.api.postData('Maisondhotes', result).subscribe({
          next: () => {
            this.refreshData();
            
            this.snackBar.open('Maison d\'hôte ajoutée avec succès!', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
          error: (error) => {
            
            
          },
        });
      }
    });
    this.addVerif = 0;
  }
  

  EditMaisondhote(maisondhote: Maisondhote) {
    const dialogRef = this.dialog.open(MaisondhoteFormComponent, {
      width: '500px',
      data: { isAddMode: false, maisondhote: maisondhote },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.putData('Maisondhotes', maisondhote.id.toString(), result).subscribe({
          next: () => {
            this.refreshData();
            this.snackBar.open('Maison d\'hôte modifiée avec succès!', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
          error: (error) => {
            console.error('Erreur lors de la modification de la maison d\'hôte:', error);
            this.snackBar.open('Erreur lors de la modification de la maison d\'hôte.', 'Fermer', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          },
        });
      }
    });
    this.addVerif = 0;
  }

  deleteMaisondhote(idToDelete: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirmation', content: 'Êtes-vous sûr de vouloir supprimer cette maison d\'hôte ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.deleteData('Maisondhotes', idToDelete.toString()).subscribe({
          next: () => {
            this.Maisondhotes = this.Maisondhotes.filter((item) => item.id != idToDelete);
            this.snackBar.open('Maison d\'hôte supprimée avec succès!', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de la maison d\'hôte:', error);
            this.snackBar.open('Erreur lors de la suppression de la maison d\'hôte.', 'Fermer', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          },
        });
      }
    });
  }

  AddMaisondhoteModal() {
    this.AddMaisondhote();
    
  }

  EditMaisondhoteModal(maisondhote: Maisondhote) {
    this.EditMaisondhote(maisondhote);
  }
}