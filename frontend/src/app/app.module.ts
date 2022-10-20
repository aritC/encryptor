import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncryptorComponent } from './components/encryptor/encryptor.component';
import { DecryptorComponent } from './components/decryptor/decryptor.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ApiserviceService } from './services/apiservice.service';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    EncryptorComponent,
    DecryptorComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
