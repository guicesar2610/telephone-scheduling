import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IContactValues } from '../../interfaces/icontact-list-values.interface';
import { ContactListService } from '../../services/contact-list.service';

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
    private contactListService: ContactListService,
    @Inject(MAT_DIALOG_DATA) public data: IContactValues
  ) {}

  ngOnInit() {
    this.title = this.data ? 'modal.title-update' : 'modal.title-add';
    this.contactForm = this.formBuilder.group({
      name: [this.data ? this.data.name : '', [Validators.required, Validators.minLength(2)]],
      email: [this.data ? this.data.email : '', [Validators.required, Validators.email]],
      cellphone: [
        this.data ? this.data.cellphone : '',
        [Validators.required, Validators.pattern(/^\d{11}$/)],
      ],
      telephone: [
        this.data ? this.data.telephone : '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      favorite: [this.data ? this.data.favorite : false],
      active: [this.data ? this.data.active : false],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      if (!this.data) {
        this.contactListService.createContactList(formData).subscribe({
          next: () => {
            this.dialogRef.close();
          },
          error: error => {
            console.error('Erro ao criar contato', error);
          },
        });
      } else {
        const updatedContact: IContactValues = {
          ...this.data,
          ...formData,
        };

        this.contactListService.updateContactList(updatedContact.id, updatedContact).subscribe({
          next: () => {
            this.dialogRef.close(updatedContact);
          },
          error: error => {
            console.error('Erro ao atualizar contato', error);
          },
        });
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
      if (formControlName === 'cellphone') {
        return 'Celular deve ter 11 dígitos numéricos.';
      }
      if (formControlName === 'telephone') {
        return 'Telefone deve ter 10 dígitos numéricos.';
      }
    }

    return '';
  }
}
