import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disponibilite } from 'src/Modeles/Disponibilite';
import { Maisondhote } from 'src/Modeles/Maisondhote';
import { Photo } from 'src/Modeles/Photo';
import { ApiService } from 'src/Services/api-service.service';

@Component({
  selector: 'app-Maisondhotelist',
  templateUrl: './Maisondhotelist.component.html',
  styleUrls: ['./Maisondhotelist.component.css'],
})
export class MaisondhotelistComponent {
  availableMaisondhotes: Maisondhote[] = [];
  Maisondhotes: Maisondhote[] = [];
  disponibilites: Disponibilite[] = [];
  photos: Photo[] = [];
  destination: String = '';
  selectedPerson: String = '';
  checkInDate: string = '';
  checkOutDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getData('photos').subscribe((data: Photo[]) => {
      this.photos = data;
    });

    this.route.queryParams.subscribe((params) => {
      this.destination = params['destination'];
      this.selectedPerson = params['selectedPerson'];
      this.checkInDate = params['checkInDate'];
      this.checkOutDate = params['checkOutDate'];

      this.api.getData('Maisondhotes').subscribe((MaisondhotesData: Maisondhote[]) => {
        this.Maisondhotes = MaisondhotesData;
        console.log(this.Maisondhotes);

        this.api.getData('disponibilites').subscribe((disponibilitesData: Disponibilite[]) => {
          this.disponibilites = disponibilitesData;
          console.log(this.disponibilites);
          this.filterAvailableMaisondhotes();
        });
      });
    });
  }

  filterAvailableMaisondhotes(): void {
    this.availableMaisondhotes = [];
    this.Maisondhotes.forEach((Maisondhote) => {
      this.disponibilites.forEach((dispo) => {
        if (
          dispo.Maisondhote_id == Maisondhote.id &&
          new Date(dispo.dateDebut) <= new Date(this.checkInDate) &&
          new Date(dispo.dateFin) >= new Date(this.checkOutDate) &&
          (dispo.nbChambreRestantes2 > 0 ||
            dispo.nbChambreRestantes3 > 0 ||
            dispo.nbChambreRestantes4 > 0)
        ) {
          if (!this.availableMaisondhotes.some((m) => m.id === Maisondhote.id)) {
            this.availableMaisondhotes.push(Maisondhote);
          }
        }
      });
    });
  }

  goToReservPage(Maisondhote: Maisondhote) {
    const serializedMaisondhote = JSON.stringify(Maisondhote);
    const serializedphotos = JSON.stringify(
      this.photos.find((photo) => photo.Maisondhote_id == Maisondhote.id)
    );
    this.router.navigate(['/Maisondhotebook'], {
      queryParams: {
        ['photo']: serializedphotos,
        ['MaisondhoteaReserver']: serializedMaisondhote,
        destination: this.destination,
        selectedPerson: this.selectedPerson,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
      },
    });
  }

  getMaisondhotephoto(id: number): string {
    const photo = this.photos.find(
      (item) => item.Maisondhote_id.toString() == id.toString()
    );
    return photo ? photo.photo1 : '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); // par exemple
  }
}