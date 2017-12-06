
import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from '../models/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  products: { key: string, value: Product }[];

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {}

  ngOnInit() {
    this.products = [];

    this.route.params.subscribe(params => {
      // TODO search query against Firebase (ask jenni)
      const searchKey: string = params['search'];
      const productRef = this.db.database.ref('products');

      // onValueChange listener
      productRef.on('value', snapshot => {
        this.products = [];
        const dbValues = snapshot.val();

        for (const k of Object.keys(dbValues)) {
          this.products.push({key: k, value: dbValues[k]});
        }
      });
    });
  }
}
