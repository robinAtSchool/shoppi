import {Injectable, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {User} from './models/user';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Product} from './models/product';


@Injectable()
export class AppGlobalService {
  public fireUser: firebase.User;
  public user: User;


  constructor (private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(authUser => {
      this.fireUser = authUser;

      // Check if user is signed in
      if (this.fireUser) {
        // Get user profile
        const userRef = this.db.database.ref('users/' + this.fireUser.uid);
        userRef.on('value', userData => {
          if (userData.val()) {
            this.user = userData.val();
          } else {
            // Create new user profile
            this.user = new User();
            this.user.name = this.fireUser.displayName;
            this.user.isAdmin = false;
            userRef.set(this.user);
          }
        });
      } else {
        // TODO unsubscribe from userRef listener
        this.user = null;
      }
    });
  }


  public addToCart(productKey: string) {
    if (this.user) {
      // Make sure cart property exists
      if (!this.user.cart) {
        this.user.cart = {};
        console.log('cart property created');
      }

      if (this.user.cart.hasOwnProperty(productKey)) {
        // If product is already in cart, count nr of item up
        this.user.cart[productKey]++;
      } else {
        // Add new product to cart
        this.user.cart[productKey] = 1;
      }

      const userRef = this.db.database.ref('users/' + this.fireUser.uid);
      userRef.update(this.user);
    } else {
      console.error('Tried to add a product to cart while no user was logged in');
    }
  }

  public updateProduct(productKey: string, product: Product) {
    const productRef = this.db.database.ref('products/' + productKey);
    productRef.update(product, error => {
      if (error) {
        console.error(error);
      }
    });
  }

  public deleteProduct(productKey: string) {
    this.db.database.ref('products/' + productKey).remove(error => {
      if (error) {
        console.error(error);
      }
    });
  }
}
