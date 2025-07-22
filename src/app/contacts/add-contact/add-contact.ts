import { Component } from '@angular/core';
import { ContactService } from '../../common/services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.css'
})
export class AddContactComponent {
  name = '';
  address = '';
  phone = '';

  constructor(private contactService: ContactService) {}

  onSubmit() {
    if (!this.name || !this.address || !this.phone) return;
    console.log('AddContactComponent onSubmit called');

    this.contactService.addContact({ name: this.name, address: this.address, phone: this.phone }).subscribe(() => {
      alert('Contact added!');
      this.name = this.address = this.phone = '';
      
    });
  }
}