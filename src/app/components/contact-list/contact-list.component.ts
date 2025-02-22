import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IContactValues } from './interfaces/icontact-list-values.interface';
import { MatDialog } from '@angular/material/dialog';
import { ContactListModalComponent } from './components/contact-list-modal/contact-list-modal.component';
import { ContactListService } from './services/contact-list.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent implements OnInit, OnChanges {
  contacts: IContactValues[] = [];

  @Input() filter!: string;

  constructor(
    public dialog: MatDialog,
    private toast: ToastrService,
    private translate: TranslateService,
    private contactListService: ContactListService
  ) {}

  ngOnInit() {
    this.handleConsultList();
  }

  ngOnChanges() {
    this.applyFilter();
  }

  getPriority(contact: IContactValues): number {
    if (contact.favorite && contact.active) {
      return 1;
    }
    if (contact.favorite && !contact.active) {
      return 2;
    }
    if (!contact.favorite && contact.active) {
      return 3;
    }
    return 4;
  }

  handleConsultList() {
    this.contactListService.getContactList().subscribe((data: IContactValues[]) => {
      this.contacts = data.sort((a, b) => {
        const priorityA = this.getPriority(a);
        const priorityB = this.getPriority(b);

        return priorityA - priorityB;
      });
    });
  }

  sortContactsByPriority(contacts: IContactValues[]): IContactValues[] {
    return contacts.sort((a, b) => {
      const priorityA = this.getPriority(a);
      const priorityB = this.getPriority(b);
      return priorityA - priorityB;
    });
  }

  handleSuccess(contacts: IContactValues[]) {
    this.contacts = this.sortContactsByPriority(contacts);
    this.translate.get('success.message-generic').subscribe((message: string) => {
      this.translate.get('success.title-generic').subscribe((title: string) => {
        this.toast.success(message, title, { closeButton: true });
      });
    });
  }

  handleError() {
    this.contacts = [];
    this.translate.get('error.message-generic').subscribe((message: string) => {
      this.translate.get('error.title-generic').subscribe((title: string) => {
        this.toast.error(message, title, { closeButton: true });
      });
    });
  }

  searchContactsByName(filter: string) {
    this.contactListService
      .getContactListByName(filter)
      .pipe(
        tap(contacts => this.handleSuccess(contacts)),
        catchError(() => {
          this.handleError();
          return of([]);
        })
      )
      .subscribe({
        next: contacts => this.handleSuccess(contacts),
        error: () => this.handleError(),
      });
  }

  applyFilter() {
    if (this.filter) {
      this.searchContactsByName(this.filter);
    } else {
      this.handleConsultList();
    }
  }

  onAdd() {
    const dialogRef = this.dialog.open(ContactListModalComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.handleConsultList();
    });
  }

  onEdit(contact: IContactValues) {
    const dialogRef = this.dialog.open(ContactListModalComponent, {
      disableClose: true,
      data: contact,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.handleConsultList();
    });
  }
}
