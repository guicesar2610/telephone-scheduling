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
      contato_nome: [
        this.data ? this.data.contato_nome : '',
        [Validators.required, Validators.minLength(2)],
      ],
      contato_email: [
        this.data ? this.data.contato_email : '',
        [Validators.required, Validators.email],
      ],
      contato_celular: [
        this.data ? this.data.contato_celular : '',
        [Validators.required, Validators.pattern(/^\d{11}$/)],
      ],
      contato_telefone: [
        this.data ? this.data.contato_telefone : '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      contato_sn_favorito: [this.data ? this.data.contato_sn_favorito : false],
      contato_sn_ativo: [this.data ? this.data.contato_sn_ativo : false],
      contato_dh_cad: [this.data ? this.data.contato_dh_cad : ''],
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

  getErrorMessage(formControlName: string): string {
    const control = this.contactForm.get(formControlName);

    if (control?.hasError('required')) {
      return 'Campo obrigatório.';
    }
    if (control?.hasError('email')) {
      return 'Formato de e-mail inválido.';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control?.errors?.['minlength']?.requiredLength;
      return `Mínimo de ${requiredLength} caracteres.`;
    }
    if (control?.hasError('pattern')) {
      if (formControlName === 'contato_celular') {
        return 'Celular deve ter 11 dígitos numéricos.';
      }
      if (formControlName === 'contato_telefone') {
        return 'Telefone deve ter 10 dígitos numéricos.';
      }
    }

    return '';
  }
}
