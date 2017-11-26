import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from '../models/product';
import {Injectable} from '@angular/core';


@Injectable()
export class AdminDbService {
  constructor(private db: AngularFireDatabase) {
  }


  addProduct(product: Product): PromiseLike<string> {
    return this.db.list('products').push(product).then(response => {
      return response.key;
    });
  }
}
