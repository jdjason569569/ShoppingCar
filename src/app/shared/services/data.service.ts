import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../interfaces/stores.interfaces';
import { Order, Details, DetailsOrders } from '../interfaces/order.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {

    apiUrl : string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getStores(): Observable<Store[]>{
      return this.http.get<Store[]>(`${this.apiUrl}/stores`);
  }

  saveOrder(order: Order): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/orders`, order);
  }

  saveDetailOrder(details: DetailsOrders): Observable<DetailsOrders>{
    return this.http.post<DetailsOrders>(`${this.apiUrl}/detailsOrders`, details);
  }

}
