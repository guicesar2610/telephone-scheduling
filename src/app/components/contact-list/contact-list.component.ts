import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IContactValues } from './interfaces/icontact-list-values.interface';
import { CONTACTS } from './contacts.mock';
import { MatDialog } from '@angular/material/dialog';
import { ContactListModalComponent } from './components/contact-list-modal/contact-list-modal.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent implements OnInit, OnChanges {
  contacts: IContactValues[] = [];
  filteredContacts: IContactValues[] = [];

  @Input() filter!: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.contacts = CONTACTS.sort(a => (a.contato_sn_favorito === true ? -1 : 1));
    this.filteredContacts = [...this.contacts];
  }

  ngOnChanges() {
    this.applyFilter();
  }

  applyFilter() {
    if (this.filter) {
      this.filteredContacts = this.contacts.filter(contact =>
        contact.contato_nome.toLowerCase().includes(this.filter.toLowerCase())
      );
    } else {
      this.filteredContacts = [...this.contacts];
    }
  }

  onAdd() {
    const dialogRef = this.dialog.open(ContactListModalComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newContact: IContactValues) => {
      if (newContact) {
        CONTACTS.push(newContact);

        this.contacts = CONTACTS.sort(a => (a.contato_sn_favorito === true ? -1 : 1));
        this.applyFilter();
      }
    });
  }

  onEdit(contact: IContactValues) {
    const dialogRef = this.dialog.open(ContactListModalComponent, {
      disableClose: true,
      data: contact,
    });

    dialogRef.afterClosed().subscribe((updatedContact: IContactValues) => {
      if (updatedContact) {
        const index = CONTACTS.findIndex(c => c.contato_id === updatedContact.contato_id);
        if (index > -1) {
          CONTACTS[index] = updatedContact;
          this.contacts = CONTACTS.sort(a => (a.contato_sn_favorito === true ? -1 : 1));
          this.applyFilter();
        }
      }
    });
  }
}
