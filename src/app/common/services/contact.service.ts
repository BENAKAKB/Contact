// contact.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Contact {
  id: number;
  name: string;
  address: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:5091/api/contacts';
  private contactAddedSource = new Subject<void>(); // 🔔 notify listeners

  contactAdded$ = this.contactAddedSource.asObservable();

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  addContact(contact: Omit<Contact, 'id'>): Observable<Contact> {
    return new Observable((observer) => {
      this.http.post<Contact>(this.apiUrl, contact).subscribe({
        next: (res) => {
          this.contactAddedSource.next(); // 🔔 emit event
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateContact(id: number, contact: Omit<Contact, 'id'>): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  }
}
