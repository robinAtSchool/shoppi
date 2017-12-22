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
  variants: { key: string, value: Product }[];


  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, public globalService: AppGlobalService) { }

  ngOnInit() {
    this.product = new Product();
    this.variants = [];

    this.route.params.subscribe(params => {
      this.productKey = params['key'];
      const productRef = this.db.database.ref('products/' + this.productKey);

      productRef.on('value', snapshot => {
        this.product = <Product> snapshot.val();
        this.variants = [];

        if (this.product.variantOf) {
          console.log(this.product.variantOf);
          const variantsRef = this.db.database.ref('variants/' + this.product.variantOf);
          variantsRef.on('value', variantSnap => {
            console.log(variantSnap.val());
            const variantProductKeys: Array<string> = variantSnap.val();

            variantProductKeys.forEach((item, index) => {
              const variantProductRef = this.db.database.ref('products/' + item);
              variantProductRef.on('value', productSnap => {
                const variantProduct: Product = <Product>productSnap.val();
                this.variants.push({key: item, value: variantProduct});
                console.log(this.variants);
              });
            });
          });
        }
      });
    });
  }


  buy() {
    this.globalService.addToCart(this.productKey);
  }

  update() {
    this.globalService.updateProduct(this.productKey, this.product);
  }

  delete() {
    this.globalService.deleteProduct(this.productKey, this.product);
  }
}
