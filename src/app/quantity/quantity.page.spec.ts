import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityPage } from './quantity.page';

describe('QuantityPage', () => {
  let component: QuantityPage;
  let fixture: ComponentFixture<QuantityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
