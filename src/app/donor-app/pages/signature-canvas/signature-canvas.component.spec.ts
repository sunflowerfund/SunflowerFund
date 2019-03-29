import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureCanvasComponent } from './signature-canvas.component';

describe('SignatureCanvasComponent', () => {
  let component: SignatureCanvasComponent;
  let fixture: ComponentFixture<SignatureCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatureCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
