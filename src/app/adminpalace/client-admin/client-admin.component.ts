import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/Modeles/Clients';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ApiService } from 'src/Services/api-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-client-admin',
  templateUrl: './client-admin.component.html',
  styleUrls: ['./client-admin.component.css'],
})

export class ClientAdminComponent implements OnInit { 
  formEdit!: FormGroup;
  addVerif: number = 0;

  clients: Client[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  refreshData() {
    this.api.getData('clients').subscribe({
      next: (data: Client[]) => {
        this.clients = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des clients:', error);
        this.snackBar.open('Erreur lors du chargement des clients.', 'Fermer', { duration: 5000 });
      }
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  AddClientModal() {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '500px',
      data: { isAddMode: true, client: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.postData('clients', result).subscribe({
          next: () => {
            this.refreshData(); // Recharger les données après l'ajout
            this.snackBar.open('Client ajouté avec succès!', 'Fermer', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du client:', error);
            this.snackBar.open('Erreur lors de l\'ajout du client.', 'Fermer', { duration: 5000 });
          }
        });
      }
    });
    this.addVerif = 0;
  }

  EditClientModal(clientToEdit: Client) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '500px',
      data: {
        isAddMode: false, // Indique au formulaire que c'est le mode édition
        client: clientToEdit // Passe l'objet client à éditer
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.putData('clients', clientToEdit.id.toString(), result).subscribe({
          next: () => {
            const index = this.clients.findIndex(c => c.id === clientToEdit.id);
            if (index !== -1) {
              this.clients[index] = result;
            }
            this.snackBar.open('Client mis à jour avec succès!', 'Fermer', { duration: 3000 });
            this.refreshData();
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du client:', error);
            this.snackBar.open('Erreur lors de la mise à jour du client.', 'Fermer', { duration: 5000 });
          }
        });
      }
    });
    this.addVerif = 0;
  }

  deleteClient(idToDelete: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirmation', content: 'Êtes-vous sûr de vouloir supprimer ce client ?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.deleteData('clients', idToDelete.toString()).subscribe({
          next: () => {
            this.clients = this.clients.filter((item) => item.id != idToDelete);
            this.snackBar.open('Client supprimé avec succès!', 'Fermer', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du client:', error);
            this.snackBar.open('Erreur lors de la suppression du client.', 'Fermer', { duration: 5000 });
          }
        });
      }
    });
  }
  
}