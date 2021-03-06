
import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {AdminDbService} from './admin.db.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminDbService]
})
export class AdminComponent implements OnInit {

  newProduct: Product;


  constructor(private dbService: AdminDbService) {}

  ngOnInit(): void {
    this.newProduct = new Product();
  }


  addProduct() {
    this.newProduct.imageUrl = this.newProduct.imageUrl === undefined ? 'assets/sample.png' : this.newProduct.imageUrl;
    this.newProduct.isDeleted = false;
    this.dbService.addProduct(this.newProduct);
  }

  migrate() {
    this.dbService.migrate('/articles', '/products');
  }
}
