import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';
import {AppGlobalService} from '../app.global.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {

  product: Product;
  productKey: string;


  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private globalService: AppGlobalService) { }

  ngOnInit() {
    this.product = new Product();

    this.route.params.subscribe(params => {
      this.productKey = params['key'];
      const productRef = this.db.database.ref('products/' + this.productKey);

      productRef.on('value', snapshot => {
        this.product = <Product> snapshot.val();
      });
    });
  }


  buy() {
    this.globalService.addToCart(this.productKey);
  }
}
