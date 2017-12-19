import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import {AppGlobalService} from './app.global.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  search: string;
  loggedIn: boolean;

  constructor(private route: Router, public afAuth: AngularFireAuth, private db: AngularFireDatabase, public globalService: AppGlobalService) {
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
    // TODO move auth into globalService
    /*this.afAuth.authState.subscribe(authUser => {
      this.globalService.auth(authUser).then(response => this.loggedIn = response);
    });*/

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
