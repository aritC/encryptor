import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-decryptor',
  templateUrl: './decryptor.component.html',
  styleUrls: ['./decryptor.component.css'],
})
export class DecryptorComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiserviceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.uid = '';
    this.isLoading = false;
    this.isDecrypted = false;
    this.decryptionForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
    this.isError = false;
  }

  decryptionForm!: FormGroup;
  uid!: string;
  isExpired!: boolean;
  isLoading!: boolean;
  isDecrypted!: boolean;
  decryptedText!: string;
  isError!: boolean;
  errorMessage!: string;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.uid = params.get('uid')!;
      this.checkLink();
    });
  }

  decrypt(): void {
    this.isLoading = true;
    if (this.decryptionForm.valid) {
      let { password } = this.decryptionForm.value;
      this.api.decrypt(password, this.uid).subscribe({
        next: (res) => {
          this.isDecrypted = true;
          this.isLoading = false;
          this.decryptedText = res.decryptedText;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          if (err.status === 500 || err.status === 0)
            this.router.navigateByUrl('/500');
          this.isError = true;
          this.errorMessage = err.error.toString();
        },
      });
    } else {
      this.errorMessage = 'Form Data is Invalid';
    }
  }

  toastHidden(): void {
    this.isError = false;
    this.decryptionForm.reset();
  }

  reset() {
    this.decryptionForm.reset();
    this.isDecrypted = false;
    this.decryptedText = '';
    this.checkLink();
  }

  checkLink(): void {
    this.api.checkLink(this.uid).subscribe({
      next: (res) => {
        this.isExpired = false;
      },
      error: (err) => {
        if (err.status === 400) {
          this.isExpired = true;
        } else {
          this.router.navigateByUrl('/500');
        }
      },
    });
  }
}
