import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProductsService } from './services/products.service';
import { Product } from './interfaces/product.interface';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: Product[];
  constructor(private productService: ProductsService, private shoppingService: ShoppingCartService ) { }

  ngOnInit(): void {
     this.productService.getProducts().pipe(
       tap((products: Product[]) => this.products = products)
     ).subscribe();
  }

  addToCard(prodcut: Product){
    this.shoppingService.updateCart(prodcut);
  }

}
