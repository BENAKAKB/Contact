import { Component } from '@angular/core';
import { AddContactComponent } from '../contacts/add-contact/add-contact';
import { ContactListComponent } from '../contacts/contact-list/contact-list';

@Component({
  selector: 'app-dashboard',
  imports: [AddContactComponent,ContactListComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
