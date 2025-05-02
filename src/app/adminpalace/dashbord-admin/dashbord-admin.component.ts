// import { Component, OnInit } from '@angular/core';
// import { ApiService } from 'src/Services/api-service.service';
// import { ChartOptions, ChartDataset } from 'chart.js';
// import { Maisondhote } from 'src/Modeles/Maisondhote';
// import { Reservation } from 'src/Modeles/Reservation';

// @Component({
//   selector: 'app-dashbord-admin',
//   templateUrl: './dashbord-admin.component.html',
//   styleUrls: ['./dashbord-admin.component.css']
// })
// export class DashbordAdminComponent implements OnInit {
//   totalMaisondhotes: number = 0;
//   totalReservations: number = 0;
//   totalUsers: number = 0;
//   totalDisponibilites: number = 0;

//   reservationsByMonth: { [month: string]: number } = {};
//   reservationMonths: string[] = [];
//   reservationCounts: number[] = [];

//   chartDataReservations: ChartDataset[] = [{ label: 'Nombre de réservations', data: [] }];
//   chartLabelsReservations: string[] = [];
//   chartDataHousesByCity: ChartDataset[] = [];
//   chartLabelsHousesByCity: string[] = [];

//   chartDataComparison: ChartDataset[] = [];
//   chartLabelsComparison: string[] = [];

//   chartDataAvgNightsByCity: ChartDataset[] = [];
//   chartLabelsAvgNightsByCity: string[] = [];

//   chartDataLineOptional: ChartDataset[] = [];
//   chartLabelsLineOptional: string[] = [];

//   chartOptions: ChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       }
//     }
//   };

//   constructor(private apiService: ApiService) {}

//   ngOnInit(): void {
//     this.loadMaisondhotes();
//     this.loadReservations();
//     // Tu peux appeler ici loadUsers() et loadDisponibilites() si tu les implémentes
//   }

//   loadMaisondhotes(): void {
//     this.apiService.getData('Maisondhotes').subscribe((data: Maisondhote[]) => {
//       this.totalMaisondhotes = data.length;

//       const housesByCity: { [city: string]: number } = {};
//       data.forEach(h => {
//         const city = h.ville;
//         housesByCity[city] = (housesByCity[city] || 0) + 1;
//       });

//       this.chartLabelsHousesByCity = Object.keys(housesByCity);
//       this.chartDataHousesByCity = [{
//         label: 'Maisons par ville',
//         data: Object.values(housesByCity),
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
//       }];
//     });
//   }

//   loadReservations(): void {
//     this.apiService.getData('reservations').subscribe((data: Reservation[]) => {
//       this.totalReservations = data.length;
//       this.processReservationData(data);
//     });
//   }

//   processReservationData(reservations: Reservation[]): void {
//     reservations.forEach(reservation => {
//       const monthYear = new Date(reservation.checkin).toLocaleDateString('default', { month: 'long', year: 'numeric' });
//       this.reservationsByMonth[monthYear] = (this.reservationsByMonth[monthYear] || 0) + 1;
//     });

//     this.reservationMonths = Object.keys(this.reservationsByMonth);
//     this.reservationCounts = Object.values(this.reservationsByMonth);

//     this.chartLabelsReservations = this.reservationMonths;
//     this.chartDataReservations = [{
//       label: 'Nombre de réservations',
//       data: this.reservationCounts,
//       borderColor: '#42A5F5',
//       fill: false
//     }];
//   }
// }
