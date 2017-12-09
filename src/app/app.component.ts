import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import {User} from './models/user';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fireUser: firebase.User;
  user: User;
  search: string;

  constructor(private route: Router, public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    /* TODO may we implement a loading spinner
    route.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log('Nav started');
      } else if (event instanceof NavigationEnd) {
        console.log('Nav ended');
      }
      // NavigationStart
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });*/
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(authUser => {
      this.fireUser = authUser;

      // Check if user is signed in
      if (this.fireUser) {
        // Get user profile
        const userRef = this.db.database.ref('users/' + this.fireUser.uid);
        userRef.once('value').then(userData => {
          if (userData.val()) {
            this.user = userData.val();
          } else {
            // Create new user profile
            this.user = new User();
            this.user.name = this.fireUser.displayName;
            userRef.set(this.user);
          }
        });
      } else {
        this.user = null;
      }
    });

    this.search = '';
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  successCallback(data: FirebaseUISignInSuccess) {
    console.log(data);
  }

  onProductSearch() {
    this.route.navigate(['/overview', this.search]);
  }
}
