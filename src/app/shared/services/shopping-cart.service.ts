import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../../pages/products/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products: Product[]= [];
  cartSubject = new BehaviorSubject<Product[]>([]);
  totalSubject = new BehaviorSubject<number>(0);
  quantitySubject = new BehaviorSubject<number>(0);


  constructor() { }

  resetCart(): void{
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
  }

  //Devuelven el valor que tengan los observables

  get totalAction$(): Observable<number>{
    return this.totalSubject.asObservable();
  }

  get quanityAction$(): Observable<number>{
    return this.quantitySubject.asObservable();
  }

  get carAction$(): Observable<Product[]>{
    return this.cartSubject.asObservable();
  }

  public updateCart(product: Product){
    this.addToCart(product);
    this.quantityProducts();
    this.calcularTotal();
  }

   private addToCart(product: Product): void{

    let isProductIncart = this.products.find(({id}) => id === product.id);

    if(isProductIncart){
       isProductIncart.quantity += 1; 
    }else{
      this.products.push({...product, quantity:1})
    }
    this.cartSubject.next(this.products);
   }

   private quantityProducts(): void{
    const quantity = this.products.reduce((actual, prodcuto) => actual += prodcuto.quantity, 0);
    this.quantitySubject.next(quantity);
   }

   private calcularTotal(): void{
     const total = this.products.reduce((actual, prodcuto) => actual += (prodcuto.price * prodcuto.quantity), 0);
     this.totalSubject.next(total);
   }

}
