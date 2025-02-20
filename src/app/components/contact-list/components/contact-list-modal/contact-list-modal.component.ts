import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IContactValues } from '../../interfaces/icontact-list-values.interface';

@Component({
  selector: 'app-contact-list-modal',
  templateUrl: './contact-list-modal.component.html',
  styleUrls: ['./contact-list-modal.component.scss'],
})
export class ContactListModalComponent implements OnInit {
  contactForm!: FormGroup;
  title!: string;

  constructor(
    private dialogRef: MatDialogRef<ContactListModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IContactValues
  ) {}

  ngOnInit() {
    this.title = this.data ? 'modal.title-update' : 'modal.title-add';
    this.contactForm = this.formBuilder.group({
      name: [this.data?.contato_nome || '', Validators.required],
      email: [this.data?.contato_email || '', [Validators.required, Validators.email]],
      cellPhone: [this.data?.contato_celular || '', Validators.required],
      telephone: [this.data?.contato_telefone || '', Validators.required],
      favorite: [this.data?.contato_sn_favorito || false],
      active: [this.data?.contato_sn_ativo || false],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.dialogRef.close(this.contactForm.value);
    }
  }
}
