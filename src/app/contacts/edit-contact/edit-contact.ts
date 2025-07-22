import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact, ContactService } from '../../common/services/contact.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.html',
  styleUrls: ['./edit-contact.css'],
  standalone: true,
  imports:[FormsModule]
})
export class EditContact {
  @Input() contact!: Contact;
  @Output() updated = new EventEmitter<Contact>();
  @Output() cancelled = new EventEmitter<void>();

  name = '';
  address = '';
  phone = '';

  constructor(private contactService: ContactService) {}

  ngOnChanges() {
    if (this.contact) {
      this.name = this.contact.name;
      this.address = this.contact.address;
      this.phone = this.contact.phone;
    }
  }

  onSave() {
    if (!this.name || !this.address || !this.phone) return;

    const updatedContact: Omit<Contact, 'id'> = {
      name: this.name,
      address: this.address,
      phone: this.phone
    };

    this.contactService.updateContact(this.contact.id, updatedContact).subscribe(() => {
      this.updated.emit({ ...this.contact, ...updatedContact });
    });
  }

  onCancel() {
    this.cancelled.emit();
  }
}
