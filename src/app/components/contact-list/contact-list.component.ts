import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IContactValues } from './interfaces/icontact-list-values.interface';
import { MatDialog } from '@angular/material/dialog';
import { ContactListModalComponent } from './components/contact-list-modal/contact-list-modal.component';
import { ContactListService } from './services/contact-list.service';

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
    private contactListService: ContactListService
  ) {}

  ngOnInit() {
    this.handleConsultList();
  }

  handleConsultList() {
    this.contactListService.getContactList().subscribe((data: IContactValues[]) => {
      this.contacts = data.sort(a => (a.favorite === true ? -1 : 1));
    });
  }

  ngOnChanges() {
    this.applyFilter();
  }

  applyFilter() {
    console.log('this.filter', this.filter);
    if (this.filter) {
      this.contactListService.getContactListByName(this.filter).subscribe(
        contacts => {
          this.contacts = contacts;
        },
        () => {
          this.contacts = [];
        }
      );
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
