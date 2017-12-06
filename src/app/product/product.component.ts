import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {

  product: Product;


  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.product = new Product();

    this.route.params.subscribe(params => {
      const productKey: string = params['key'];
      const productRef = this.db.database.ref('products/' + productKey);

      productRef.on('value', snapshot => {
        this.product = <Product> snapshot.val();
      });
    });
  }

}
