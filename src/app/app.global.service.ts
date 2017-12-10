import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {User} from './models/user';
import {AngularFireDatabase} from 'angularfire2/database';


@Injectable()
export class AppGlobalService {
  public fireUser: firebase.User;
  public user: User;


  constructor (private db: AngularFireDatabase) {}


  public auth(authUser: firebase.User): Promise<boolean> {
    this.fireUser = authUser;

    // Check if user is signed in
    if (this.fireUser) {
      // Get user profile
      const userRef = this.db.database.ref('users/' + this.fireUser.uid);
      return userRef.once('value').then(userData => {
        if (userData.val()) {
          this.user = userData.val();
        } else {
          // Create new user profile
          this.user = new User();
          this.user.name = this.fireUser.displayName;
          userRef.set(this.user);
        }
        return true;
      });
    } else {
      this.user = null;
      return new Promise(resolve => false);
    }
  }

  public addToCart(productKey: string) {
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
  }
}
