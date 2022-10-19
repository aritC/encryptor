import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncryptorComponent } from './components/encryptor/encryptor.component';
import { DecryptorComponent } from './components/decryptor/decryptor.component';

@NgModule({
  declarations: [
    AppComponent,
    EncryptorComponent,
    DecryptorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
