
import {Component} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from '../models/product';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  products;

  constructor(db: AngularFireDatabase) {
    this.products = db.list<Product>('products');
  }
}
