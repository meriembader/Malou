import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductCategoryChartComponent } from './product-category-chart.component';
import {DatePipe} from '@angular/common';
describe('ProductCategoryChartComponent', () => {
  let component: ProductCategoryChartComponent;
  let fixture: ComponentFixture<ProductCategoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCategoryChartComponent],
      imports: [HttpClientTestingModule],
      providers: [DatePipe]
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
