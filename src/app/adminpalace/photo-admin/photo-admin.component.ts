import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/Services/api-service.service';
import { Photo } from 'src/Modeles/Photo';
import { PhotoFormComponent } from '../photo-form/photo-form.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-photo-admin',
  templateUrl: './photo-admin.component.html',
  styleUrls: ['./photo-admin.component.css'],
})
export class PhotoAdminComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private api: ApiService, public dialog: MatDialog) {}

  refreshData() {
    this.api.getData('photos').subscribe((data: Photo[]) => {
      this.photos = data;
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  AddPhoto(): void {
    const dialogRef = this.dialog.open(PhotoFormComponent, {
      data: { isAddMode: true, photo: {} }, // Pass empty object for new photo
    });

    dialogRef.afterClosed().subscribe((result: Photo | null) => {
      if (result) {
        // Add the new photo to the list and the database
        this.api.postData('photos', result).subscribe(() => {
          this.refreshData();
        });
      }
    });
  }

  EditPhoto(photo: Photo): void {
    const dialogRef = this.dialog.open(PhotoFormComponent, {
      data: { isAddMode: false, photo: photo }, // Pass the photo to be edited
    });

    dialogRef.afterClosed().subscribe((result: Photo | null) => {
      if (result) {
        // Update the photo in the list and the database
        const index = this.photos.findIndex((p) => p.id === result.id);
        if (index !== -1) {
          this.photos[index] = result;
          this.api
            .putData('photos', result.id.toString(), result)
            .subscribe(() => {
              this.refreshData();
            });
        }
      }
    });
  }

  DeletePhoto(photo: Photo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Photo',
        content: 'Are you sure you want to delete this photo?',
        Cancel: 'Cancel',
        Delete: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Delete the photo
        this.api.deleteData('photos', photo.id.toString()).subscribe(() => {
          this.refreshData();
        });
      }
    });
  }
}
