import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact, ContactService } from '../../common/services/contact.service';
import { EditContact } from '../edit-contact/edit-contact';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, EditContact],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  
    // 🔄 Subscribe to new contact added event
    this.contactService.contactAdded$.subscribe(() => {
      this.loadContacts(); // reload contacts
    });
  }
  

  loadContacts() {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.contacts = this.contacts.filter((contact) => contact.id !== id);
    });
  }

  editContact(contact: Contact) {
    this.selectedContact = { ...contact }; // clone to avoid modifying directly
  }

  onContactUpdated(updated: Contact) {
    const index = this.contacts.findIndex(c => c.id === updated.id);
    if (index > -1) {
      this.contacts[index] = updated;
    }
    this.selectedContact = null;
  }

  onEditCancelled() {
    this.selectedContact = null;
  }
}
