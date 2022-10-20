import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecryptorComponent } from './components/decryptor/decryptor.component';
import { EncryptorComponent } from './components/encryptor/encryptor.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

const routes: Routes = [
  { path: 'encrypt', component: EncryptorComponent },
  { path: 'decrypt/:uid', component: DecryptorComponent },
  { path: '', pathMatch: 'full', redirectTo: 'encrypt' },
  { path: '500', pathMatch: 'full', component: ServerErrorComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
