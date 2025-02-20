import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IContactValues } from '../../interfaces/icontact-list-values.interface';
import { CONTACTS } from '../../contacts.mock';

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
      contato_nome: [this.data?.contato_nome || '', Validators.required],
      contato_email: [this.data?.contato_email || '', [Validators.required, Validators.email]],
      contato_celular: [this.data?.contato_celular || '', Validators.required],
      contato_telefone: [this.data?.contato_telefone || '', Validators.required],
      contato_sn_favorito: [this.data?.contato_sn_favorito || false],
      contato_sn_ativo: [this.data?.contato_sn_ativo || false],
      contato_dh_cad: [this.data?.contato_dh_cad || ''],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      if (!this.data) {
        const newId = CONTACTS.length > 0 ? Math.max(...CONTACTS.map(c => c.contato_id)) + 1 : 1;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('.')[0];
        const newContact: IContactValues = {
          contato_id: newId,
          ...formData,
          contato_dh_cad: formattedDate,
        };

        this.dialogRef.close(newContact);
      } else {
        const updatedContact: IContactValues = {
          ...this.data,
          ...formData,
        };

        this.dialogRef.close(updatedContact);
      }
    }
  }
}
