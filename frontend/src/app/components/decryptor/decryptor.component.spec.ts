import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecryptorComponent } from './decryptor.component';

describe('DecryptorComponent', () => {
  let component: DecryptorComponent;
  let fixture: ComponentFixture<DecryptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecryptorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecryptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
