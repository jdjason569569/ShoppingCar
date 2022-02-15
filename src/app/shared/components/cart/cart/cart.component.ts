import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  quantity$ = this.shoppingService.quanityAction$;
  total$ = this.shoppingService.totalAction$;
  car$ = this.shoppingService.carAction$;

  constructor(private shoppingService: ShoppingCartService) { }

  ngOnInit(): void {
  }

}
