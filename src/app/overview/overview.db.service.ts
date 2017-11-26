import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from '../models/product';
import {Injectable} from '@angular/core';


@Injectable()
export class OverviewDbService {
  constructor(private db: AngularFireDatabase) {
  }

/*
  getProducts(product: Product): PromiseLike<Product[]> {

  }*/
}
