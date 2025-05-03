import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disponibilite } from 'src/Modeles/Disponibilite';
import { Maisondhote } from 'src/Modeles/Maisondhote';
import { Photo } from 'src/Modeles/Photo';
import { ApiService } from 'src/Services/api-service.service';

@Component({
  selector: 'app-reservationpage',
  templateUrl: './reservationpage.component.html',
  styleUrls: ['./reservationpage.component.css'],
})
export class ReservationpageComponent {
  responseData: any;
  photo: Photo | undefined;
  myMaisondhote: Maisondhote | undefined;
  destination: String = '';
  selectedPerson: String = '';
  checkInDate: String = '';
  checkOutDate: String = '';
  disponibilites: Disponibilite[] = [];
  total: number = 0;
  

  selectedChambre2: string = '0';
  selectedChambre3: string = '0';
  selectedChambre4: string = '0';
  pricePerNight: number = 0;
  priceTotal: number = 0;
  Chambre: string[] = ['0', '1', '2', '3'];

  verif: boolean = true;
  aux: number = 0;
  chambre2ToCheck: number = 0;
  chambre3ToCheck: number = 0;
  chambre4ToCheck: number = 0;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const destination = params['destination'];
      const selectedPerson = params['selectedPerson'];
      const checkInDate = params['checkInDate'];
      const checkOutDate = params['checkOutDate'];
  
      this.destination = destination;
      this.selectedPerson = selectedPerson;
      this.checkInDate = checkInDate;
      this.checkOutDate = checkOutDate;
  
      if (params['MaisondhoteaReserver']) {
        this.myMaisondhote = JSON.parse(params['MaisondhoteaReserver']);
        console.log(this.myMaisondhote);
      }
      if (params['photo']) {
        this.photo = JSON.parse(params['photo']);
        console.log(this.photo);
      }
      this.apiService
        .getData('disponibilites')
        .subscribe((data: Disponibilite[]) => {
          this.disponibilites = data.filter((item) => {
            let itemStartDate: Date = new Date(item.dateDebut);
            let itemEndDate: Date = new Date(item.dateFin);
            return (
              item.Maisondhote_id == this.myMaisondhote?.id &&
              itemStartDate <= new Date(checkInDate) &&
              itemEndDate >= new Date(checkOutDate)
            );
          });
        });
    });
  }

  onChambreChanged() {
    this.disponibilites.forEach((dispo) => {
      this.pricePerNight =
        dispo.prixChambre2 * parseInt(this.selectedChambre2) +
        dispo.prixChambre3 * parseInt(this.selectedChambre3) +
        dispo.prixChambre4 * parseInt(this.selectedChambre4);

      console.log();

      this.priceTotal =
        this.pricePerNight *
        (parseInt(this.checkOutDate.split('-')[2]) -
          parseInt(this.checkInDate.split('-')[2]));
    });
  }
  makeReservation() {
    this.chambre2ToCheck = parseInt(this.selectedChambre2);
    this.chambre3ToCheck = parseInt(this.selectedChambre3);
    this.chambre4ToCheck = parseInt(this.selectedChambre4);
    this.disponibilites.forEach((dispo) => {
      console.log(dispo);
      if (dispo.nbChambreRestantes2 > 0 && this.chambre2ToCheck > 0) {
        this.chambre2ToCheck = this.chambre2ToCheck - dispo.nbChambreRestantes2;
      }
      if (dispo.nbChambreRestantes3 > 0 && this.chambre3ToCheck > 0) {
        this.chambre3ToCheck = this.chambre3ToCheck - dispo.nbChambreRestantes3;
      }
      if (dispo.nbChambreRestantes4 > 0 && this.chambre4ToCheck > 0) {
        this.chambre4ToCheck = this.chambre4ToCheck - dispo.nbChambreRestantes4;
      }
    });
    if (
      this.chambre2ToCheck > 0 ||
      this.chambre3ToCheck > 0 ||
      this.chambre4ToCheck > 0 ||
      (this.selectedChambre2 == '0' &&
        this.selectedChambre3 == '0' &&
        this.selectedChambre4 == '0')
    ) {
      this.verif = false;
      alert('Pas de places disponibles');
    } else {
      this.verif = true;
    }
    console.log('verif = ' + this.verif);

    if (this.verif == true) {
      this.chambre2ToCheck = parseInt(this.selectedChambre2);
      this.chambre3ToCheck = parseInt(this.selectedChambre3);
      this.chambre4ToCheck = parseInt(this.selectedChambre4);
      this.disponibilites.forEach((dispo) => {
        if (dispo.nbChambreRestantes2 > 0 && this.chambre2ToCheck > 0) {
          this.aux = this.chambre2ToCheck;
          this.chambre2ToCheck =
            this.chambre2ToCheck - dispo.nbChambreRestantes2;
          dispo.nbChambreRestantes2 = dispo.nbChambreRestantes2 - this.aux;

          if (dispo.nbChambreRestantes2 < 0) {
            dispo.nbChambreRestantes2 = 0;
          }
          this.apiService
            .putData('disponibilites', dispo.id.toString(), {
              nbChambreRestantes2: dispo.nbChambreRestantes2,
            })
            .subscribe(() => {});
        }
        if (dispo.nbChambreRestantes3 > 0 && this.chambre3ToCheck > 0) {
          this.aux = this.chambre3ToCheck;
          this.chambre3ToCheck =
            this.chambre3ToCheck - dispo.nbChambreRestantes3;
          dispo.nbChambreRestantes3 = dispo.nbChambreRestantes3 - this.aux;
          if (dispo.nbChambreRestantes3 < 0) {
            dispo.nbChambreRestantes3 = 0;
          }
          this.apiService
            .putData('disponibilites', dispo.id.toString(), {
              nbChambreRestantes3: dispo.nbChambreRestantes3,
            })
            .subscribe(() => {});
        }
        if (dispo.nbChambreRestantes4 > 0 && this.chambre4ToCheck > 0) {
          this.aux = this.chambre4ToCheck;
          this.chambre4ToCheck =
            this.chambre4ToCheck - dispo.nbChambreRestantes4;
          dispo.nbChambreRestantes4 = dispo.nbChambreRestantes4 - this.aux;
          if (dispo.nbChambreRestantes4 < 0) {
            dispo.nbChambreRestantes4 = 0;
          }
          this.apiService
            .putData('disponibilites', dispo.id.toString(), {
              nbChambreRestantes4: dispo.nbChambreRestantes4,
            })
            .subscribe(() => {});
        }
      });
      this.apiService
        .postData('reservations', {
          checkin: this.checkInDate,
          checkout: this.checkOutDate,
          PrixTotal: this.priceTotal,
          nbPerson: this.selectedPerson,
          client_email: localStorage.getItem('email'),   //<--- this is null , fix me ,
          Maisondhote_id: this.myMaisondhote!.id,
        })
        .subscribe(() => {});
      alert('Place refservé avec succées');
      console.log('Email enregistré dans localStorage :', localStorage.getItem('email'));
    }
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); // par exemple
  }
}