import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryChartComponent } from './product-category-chart.component';

describe('ProductCategoryChartComponent', () => {
  let component: ProductCategoryChartComponent;
  let fixture: ComponentFixture<ProductCategoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
