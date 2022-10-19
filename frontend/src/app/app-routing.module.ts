import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecryptorComponent } from './components/decryptor/decryptor.component';
import { EncryptorComponent } from './components/encryptor/encryptor.component';

const routes: Routes = [
  { path: '/', component: EncryptorComponent },
  { path: '/decrpytor', component: DecryptorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
