import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import {User} from "./models/user";
import {AngularFireDatabase} from "angularfire2/database";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn;
  user: User;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(response => {
      this.loggedIn = !!response;

      if (this.loggedIn) {
        console.log('auth listener: logged in');
        const users = this.db.list('users');
        console.log(users);
      } else {
        this.user = null;
        console.log('auth listener: logged out');
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  successCallback(data: FirebaseUISignInSuccess) {
    console.log(data);
  }
}
