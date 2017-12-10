import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AuthMethods, AuthProvider, FirebaseUIAuthConfig, FirebaseUIModule, CredentialHelper} from 'firebaseui-angular';
import {AppRoutingModule} from './app-routing.module';
import {AdminModule} from './admin/admin.module';
import {OverviewModule} from './overview/overview.module';
import {HomeModule} from './home/home.module';
import {FormsModule} from '@angular/forms';
import {ProductModule} from './product/product.module';
import {AppGlobalService} from './app.global.service';


const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Password
  ],
  method: AuthMethods.Popup,
  credentialHelper: CredentialHelper.None
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    FormsModule,
    HomeModule,
    AdminModule,
    OverviewModule,
    ProductModule
  ],
  providers: [
    AppGlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
