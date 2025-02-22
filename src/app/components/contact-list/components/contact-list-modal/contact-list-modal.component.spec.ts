import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListModalComponent } from './contact-list-modal.component';

describe('ContactListModalComponent', () => {
  let component: ContactListModalComponent;
  let fixture: ComponentFixture<ContactListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
