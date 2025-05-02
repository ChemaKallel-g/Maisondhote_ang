import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/Services/api-service.service';
import { Maisondhote } from 'src/Modeles/Maisondhote';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-maisondhote-form',
  templateUrl: './maisondhote-form.component.html',
  styleUrls: ['./maisondhote-form.component.css'],
})
export class MaisondhoteFormComponent implements OnInit {
  maisondhote: Maisondhote | null = null;
  isAddMode: boolean = true;

  form!: FormGroup;

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<MaisondhoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isAddMode: boolean; maisondhote: Maisondhote }
  ) {}

  ngOnInit(): void {
    this.isAddMode = this.data.isAddMode;
    this.maisondhote = this.data.maisondhote;

    this.form = new FormGroup({
      nomMaisondhote: new FormControl(this.maisondhote?.nomMaisondhote || '', [Validators.required]),
      adress: new FormControl(this.maisondhote?.adress || '', [Validators.required]),
      ville: new FormControl(this.maisondhote?.ville || '', [Validators.required]),
      nbVisiteur: new FormControl(this.maisondhote?.nbVisiteur || 0, [Validators.required, Validators.min(1)]),
    });
  }

  submitForm() {
    if (this.form.invalid) return;

    const formData = this.form.value;
    const newOrUpdatedMaisondhote: Maisondhote = { ...this.maisondhote, ...formData } as Maisondhote;

    if (this.isAddMode) {
      this.api.postData('Maisondhotes', newOrUpdatedMaisondhote).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.api.putData('Maisondhotes', this.maisondhote!.id.toString(), newOrUpdatedMaisondhote).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}