import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';
import { IContactValues } from '../interfaces/icontact-list-values.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactListService {
  private baseUrl = `${environment.API_URL}/scheduling`;

  constructor(private http: HttpClient) {}

  createContactList(data: IContactValues): Observable<IContactValues> {
    return this.http.post<IContactValues>(this.baseUrl, data);
  }

  getContactList(): Observable<IContactValues[]> {
    return this.http.get<IContactValues[]>(this.baseUrl);
  }

  getContactListByName(name: string): Observable<IContactValues[]> {
    const url = `${this.baseUrl}/searchByName?name=${name}`;
    return this.http.get<IContactValues[]>(url);
  }

  updateContactList(id: number, data: IContactValues): Observable<IContactValues> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<IContactValues>(url, data);
  }
}
