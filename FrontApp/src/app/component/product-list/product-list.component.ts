import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import {ApiCallService} from '../../service/api-call.service';
import {Product} from '../../model/product.model';
import { NgxSpinnerService } from 'ngx-spinner';
import {DatePipe} from '@angular/common';
// @ts-ignore
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges{
  public products: Product[];
  @Input() public date: any;
  public page = 1;
  public pageSize = 5;
  public total: any;
  gridStyleImg = {
    width: '10%',
    height: '100%'
  };
  gridStyleContent = {
    width: '90%',
    height: '100%'
  };
  constructor(private apiCallService: ApiCallService,
              private spinner: NgxSpinnerService,
              private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.getProductsByDay();

  }

  getProductsByDay(): void{
    this.spinner.show();
    this.apiCallService.getPostByDay(this.date).then((data: any) => {
      this.products = data.map((product: any) => {
        return new Product(product.id, product.name, product.tagline, product.product_state, product.thumbnail.image_url,
          product.comments_count, product.votes_count, product.topics);

      });
      this.total = this.products.length;
      this.spinner.hide();
    });
  }
  ngOnChanges(changes: SimpleChanges) {
 this.getProductsByDay();
  }

  handlePageChange(event): void {
    this.page = event;
  }


}
