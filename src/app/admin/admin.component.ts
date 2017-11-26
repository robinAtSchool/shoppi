
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
    /*
    this.newProduct.available = 123;
    this.newProduct.brand = 'theBrand';
    this.newProduct.description = 'My first product';
    this.newProduct.labels = {label1: true};
    this.newProduct.specs = {length: 34};
    this.newProduct.name = 'The real product';*/
    this.dbService.addProduct(this.newProduct).then();
  }
}
