import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  total$ = this.cartShoppingService.totalAction$;
  cart$ = this.cartShoppingService.carAction$;

  constructor(private cartShoppingService: ShoppingCartService) { 
    
  }

  ngOnInit(): void {
  }

}
