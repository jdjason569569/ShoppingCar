import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { Store } from '../../shared/interfaces/stores.interfaces';
import { Order, Details } from '../../shared/interfaces/order.interface';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Product } from '../products/interfaces/product.interface';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''

  }

  cart: Product[] = [];
  stores: Store[] = [];
  isDelivery: boolean = true;

  constructor(private dataService:DataService, private shoppingCart: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
    this.getStore();
    this.getDataCart();
  }

  getStore(): void {
    this.dataService.getStores().subscribe((stores: Store[])=>{
    this.stores = stores
    })
  }

  onPickupOrDelivery(value: boolean){
    this.isDelivery = value;
  }

  onSubmit({value}: NgForm):void{
    let data: Order = {
      ... value,   //Agrego los valores que vienen en la data
      date: this.getCurrentDay(),
      pickup: this.isDelivery
    }
    this.dataService.saveOrder(data)
    .pipe(
       switchMap((order)=>{
         const details = this.prepareDetails();
         const orderId = order.id;
         return this.dataService.saveDetailOrder({details, orderId});
       }),
       tap(()=>{
         this.router.navigate(['/checkout/thank-you-page'])
       }),
       delay(2000),
       tap(()=>{
         this.shoppingCart.resetCart()
       })
    ).subscribe();
  }

  getCurrentDay(): string{
   return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[]{
     const details: Details[] = [];
     this.cart.forEach((product:Product)=>{
        const {id:productId, name:productName, quantity:quantity, stock} = product;
        details.push({productId, productName, quantity});
     })
      return details;
  }

  private getDataCart(): void{
   this.shoppingCart.carAction$.pipe(
     tap((products: Product[]) =>this.cart = products)
   ).subscribe();
  }
  

}
