import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvarComponent } from './nvar.component';

describe('NvarComponent', () => {
  let component: NvarComponent;
  let fixture: ComponentFixture<NvarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NvarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
