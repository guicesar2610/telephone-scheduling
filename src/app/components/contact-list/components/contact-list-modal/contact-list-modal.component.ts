import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IContactValues } from '../../interfaces/icontact-list-values.interface';
import { ContactListService } from '../../services/contact-list.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

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
    private toast: ToastrService,
    private translate: TranslateService,
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

  handleSuccess(updatedContact?: IContactValues) {
    this.translate.get('success.message-generic').subscribe((message: string) => {
      this.translate.get('success.title-generic').subscribe((title: string) => {
        this.toast.success(message, title, {
          closeButton: true,
        });
        this.dialogRef.close(updatedContact || null);
      });
    });
  }

  handleError() {
    this.translate.get('error.message-generic').subscribe((message: string) => {
      this.translate.get('error.title-generic').subscribe((title: string) => {
        this.toast.error(message, title, {
          closeButton: true,
        });
      });
    });
  }

  onCreate(formData: IContactValues) {
    this.contactListService.createContactList(formData).subscribe({
      next: () => this.handleSuccess(),
      error: () => this.handleError(),
    });
  }

  onEdit(formData: IContactValues) {
    const updatedContact: IContactValues = {
      ...this.data,
      ...formData,
    };

    this.contactListService.updateContactList(updatedContact.id, updatedContact).subscribe({
      next: () => this.handleSuccess(updatedContact),
      error: () => this.handleError(),
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      if (!this.data) {
        this.onCreate(formData);
      } else {
        this.onEdit(formData);
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

  onKeyPress(event: KeyboardEvent) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
}
