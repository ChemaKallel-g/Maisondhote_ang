import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/Services/api-service.service';
import { Client } from 'src/Modeles/Clients';
import { Inject } from '@angular/core';


// N'oublie pas de les ajouter aux imports de ton module Angular également.

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  client: Client | null = null;
  isAddMode: boolean = true;

  form!: FormGroup;

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isAddMode: boolean; client: Client }
  ) {}

  ngOnInit(): void {
    this.isAddMode = this.data.isAddMode;
    this.client = this.data.client;

    this.form = new FormGroup({
      nomClient: new FormControl(this.client?.nomClient || '', [Validators.required]),
      cin: new FormControl(this.client?.cin || '', [Validators.required]),
      numTel: new FormControl(this.client?.numTel || '', [Validators.required]),
    });
  }

  submitForm() {
    if (this.form.invalid) return;

    const formData = this.form.value;
    const newOrUpdatedClient: Client = { ...this.client, ...formData } as Client;

    if (this.isAddMode) {
      this.api.postData('clients', newOrUpdatedClient).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.api.putData('clients', this.client!.id.toString(), newOrUpdatedClient).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}