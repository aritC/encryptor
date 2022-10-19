import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncryptorComponent } from './components/encryptor/encryptor.component';
import { DecryptorComponent } from './components/decryptor/decryptor.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ApiserviceService } from './services/apiservice.service';

@NgModule({
  declarations: [
    AppComponent,
    EncryptorComponent,
    DecryptorComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [ApiserviceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
