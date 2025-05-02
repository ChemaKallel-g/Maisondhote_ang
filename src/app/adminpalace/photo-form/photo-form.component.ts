import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Photo } from 'src/Modeles/Photo';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PhotoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isAddMode: boolean; photo: Photo }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.data.photo?.id || null],
      photo1: [this.data.photo?.photo1 || ''],
      photo2: [this.data.photo?.photo2 || ''],
      photo3: [this.data.photo?.photo3 || ''],
      photo4: [this.data.photo?.photo4 || ''],
      photo5: [this.data.photo?.photo5 || ''],
      Maisondhote_id: [this.data.photo?.Maisondhote_id || '' , Validators.required]
    });
  }
 
  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onYesClick(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
