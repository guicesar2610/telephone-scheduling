import { Component, OnInit } from '@angular/core';
import { IContactValues } from './interfaces/icontact-list-values.interface';
import { CONTACTS } from './contacts.mock';
import { MatDialog } from '@angular/material/dialog';
import { ContactListModalComponent } from './components/contact-list-modal/contact-list-modal.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent implements OnInit {
  contacts: IContactValues[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.contacts = CONTACTS.sort(a => (a.contato_sn_favorito === true ? -1 : 1));
  }

  onAdd() {
    this.dialog.open(ContactListModalComponent, {
      disableClose: true,
    });
  }

  onEdit(contact: IContactValues) {
    this.dialog.open(ContactListModalComponent, {
      disableClose: true,
      data: contact,
    });
  }
}
