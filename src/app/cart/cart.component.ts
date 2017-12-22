import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppGlobalService} from '../app.global.service';
import {CartItem} from '../models/cart-item';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  cartItems: CartItem[];


  constructor(private db: AngularFireDatabase, private globalService: AppGlobalService) {
  }


  ngOnInit() {
    this.db.database.ref('users/' + this.globalService.fireUser.uid + '/cart').on('value', cart => {
      const cartItems = cart.val();
      this.cartItems = [];

      for (const k of Object.keys(cartItems)) {
        this.db.database.ref('products/' + k).once('value').then(productRes => {
          const product: Product = productRes.val();
          this.cartItems.push({productKey: k, qty: cartItems[k], product: product});
        });
      }
    });
  }


  increaseQty(item: CartItem) {
    const newQty = item.qty + 1;
    this.globalService.setCartItemQty(item.productKey, newQty);
  }

  decreaseQty(item: CartItem) {
    const newQty = item.qty - 1;

    // Remove product form cart if quantity hits 0
    if (newQty <= 0) {
      this.db.database.ref('/users/' + this.globalService.fireUser.uid + '/cart/' + item.productKey).remove(error => {
        if (error) {
          console.error(error);
        }
      });
    } else {
      this.globalService.setCartItemQty(item.productKey, newQty);
    }
  }
}
