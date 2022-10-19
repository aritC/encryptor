import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptorComponent } from './encryptor.component';

describe('EncryptorComponent', () => {
  let component: EncryptorComponent;
  let fixture: ComponentFixture<EncryptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncryptorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncryptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
