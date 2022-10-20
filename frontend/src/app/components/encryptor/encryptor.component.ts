import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-encryptor',
  templateUrl: './encryptor.component.html',
  styleUrls: ['./encryptor.component.css'],
})
export class EncryptorComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiserviceService,
    private router: Router
  ) {
    this.isLoading = false;
    this.isEncrypted = false;
    this.password = '';
    this.link = '';
    this.errorMessage = '';
    this.isError = false;
  }

  encryptionForm!: FormGroup;
  isLoading!: boolean;
  isEncrypted!: boolean;
  password!: string;
  link!: string;
  isError!: boolean;
  errorMessage!: string;

  ngOnInit(): void {
    this.encryptionForm = this.formBuilder.group({
      password: ['', Validators.required],
      viewCount: [
        null,
        [Validators.required, Validators.pattern('^(-1|[1-9][0-9]*)$')],
      ],
      text: ['', Validators.required],
    });
  }

  encrypt() {
    this.isLoading = true;
    if (this.encryptionForm.valid) {
      let { password, text, viewCount } = this.encryptionForm.value;
      this.api.encrypt(text, password, viewCount).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.isEncrypted = true;
          this.password = res.password;
          this.link = res.link;
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status === 500) this.router.navigateByUrl('/500');
          this.isError = true;
          this.errorMessage = err.error.toString();
        },
      });
    } else {
      console.log(this.isError, 'adsasadasdsa');
      this.isError = true;
      this.errorMessage = 'Form Data is Invalid';
      this.isLoading = false;
    }
  }

  reset() {
    this.isEncrypted = false;
    this.password = '';
    this.link = '';
    this.encryptionForm.reset();
  }

  toastHidden() {
    this.isError = false;
    this.errorMessage = '';
  }
}
