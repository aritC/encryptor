import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private api: ApiserviceService
  ) {
    this.isLoading = false;
    this.isEncrypted = false;
    this.password = '';
    this.link = '';
  }

  encryptionForm!: FormGroup;
  isLoading!: boolean;
  isEncrypted!: boolean;
  password!: string;
  link!: string;

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
          console.log(res);
          this.isLoading = false;
          this.isEncrypted = true;
          this.password = res.password;
          this.link = res.link;
        },
        error: (err) => {
          console.log('weoe', err);
          this.isLoading = false;
        },
      });
    }
  }

  reset() {
    this.isEncrypted = false;
    this.password = '';
    this.link = '';
    this.encryptionForm.reset();
  }
}
