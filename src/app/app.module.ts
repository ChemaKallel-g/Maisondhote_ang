import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FirebaseModule } from './Firebase.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { LayoutComponent } from './layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { ReservationpageComponent } from './reservationpage/reservationpage.component';
import { MaisondhotelistComponent } from './Maisondhotelist/Maisondhotelist.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminpalaceComponent } from './adminpalace/adminpalace.component';
import { MaisondhoteAdminComponent } from './adminpalace/maisondhote-admin/maisondhote-admin.component';
import { ClientAdminComponent } from './adminpalace/client-admin/client-admin.component';

import { DisponibiliteAdminComponent } from './adminpalace/disponibilite-admin/disponibilite-admin.component';
import { PhotoAdminComponent } from './adminpalace/photo-admin/photo-admin.component';
import { ReservationAdminComponent } from './adminpalace/reservation-admin/reservation-admin.component';
import { ClientFormComponent } from './adminpalace/client-form/client-form.component';
import { LayoutAdminComponent } from './adminpalace/layout-admin/layout-admin.component';
import { CommonModule } from '@angular/common';


import { RegisterComponent } from './register/register.component';
import { MaisondhoteFormComponent } from './adminpalace/maisondhote-form/maisondhote-form.component';
import { DisponibiliteFormComponent } from './adminpalace/disponibilite-form/disponibilite-form.component';
import { PhotoFormComponent } from './adminpalace/photo-form/photo-form.component';

import { ReservationFormComponent } from './adminpalace/reservation-form/reservation-form.component';
import { RouterModule } from '@angular/router';







@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    CustomSnackbarComponent,
    ReservationpageComponent,
    MaisondhotelistComponent,
    AdminpalaceComponent,
  
    ClientAdminComponent,

    DisponibiliteAdminComponent,
    PhotoAdminComponent,
    
    ReservationAdminComponent,
    ClientFormComponent,
    LayoutAdminComponent,
 
    RegisterComponent,
    MaisondhoteAdminComponent,
    MaisondhoteFormComponent,
    DisponibiliteFormComponent,
    PhotoFormComponent,
   
    ReservationFormComponent,
    MaisondhotelistComponent,
   
    


    
    
  ],
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSnackBarModule,
  
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    FirebaseModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
   
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
