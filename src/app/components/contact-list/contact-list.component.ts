import { Component, OnInit } from '@angular/core';
import { IContactValues } from './interfaces/icontact-list-values.interface';
import { CONTACTS } from './contacts.mock';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent implements OnInit {
  contacts: IContactValues[] = [];

  ngOnInit() {
    this.contacts = CONTACTS.sort((a, b) => (a.contato_sn_favorito === true ? -1 : 1));
  }
}
