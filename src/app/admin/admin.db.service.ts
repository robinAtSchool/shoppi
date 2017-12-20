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

  migrate(currentPath: string, newPath: string) {
    // Get values of current path
    this.db.database.ref(currentPath).once('value', snap => {
      const values = snap.val();

      // Create new node from given newPath and set values
      this.db.database.ref(newPath).set(values, res => {
        if (res) {
          console.error('There was an error setting node ' + newPath);
          console.error(res);
        } else {
          console.log('new node ' + newPath + ' set successfully');
        }
      });

      // Delete the current path node
      this.db.database.ref(currentPath).remove(res => {
        if (res) {
          console.error('There was an error deleting node ' + currentPath);
          console.error(res);
        } else {
          console.log(currentPath + ' deleted successfully');
        }
      });

      console.log('Migration done');
    });
  }
}
