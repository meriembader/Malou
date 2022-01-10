import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {Product} from '../../model/product.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {DatePipe} from '@angular/common';
import {ApiCallService} from '../../service/api-call.service';

@Component({
  selector: 'app-product-category-chart',
  templateUrl: './product-category-chart.component.html',
  styleUrls: ['./product-category-chart.component.css']
})
export class ProductCategoryChartComponent implements  OnInit {
  @Input() public date: any;
  topics = new Map();
  pieChartLabels: Label[] = [];

  pieChartData: number[] = [];

  pieChartType: ChartType = 'pie';

  pieChartLegend = true;

  pieChartPlugins = [];

  pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
        '#3f51b5',
        '#ff4081',
        '#a34698',
        '#fff940',
        '#ff5240',
        '#46a35e',
        '#a34698'
      ],
    },
  ];
  constructor(private spinner: NgxSpinnerService,
              private datepipe: DatePipe,
              private  apiCallService: ApiCallService) { }

  ngOnInit(): void {
    this.date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.getProductsByCategory();
  }

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return data.datasets[0].data[tooltipItems.index] + ' %';
        }
      }
    },
  };


  getProductsByCategory(): void{
    this.spinner.show();
    this.apiCallService.getPostByDay(this.date).then((data: any) => {
      let products: Product[];
      products = data.map((product: any) => {
        // tslint:disable-next-line:max-line-length
        return new Product(product.id, product.name, product.tagline, product.product_state, product.thumbnail.image_url, product.comments_count, product.votes_count, product.topics);

      });
      this.spinner.hide();
      if (products != null){
      this.topics = new Map();
      for (const product of products) {
        for (const topic of product.topics) {
          if (this.topics.has(topic.name)) {
            this.topics.set(topic.name, this.topics.get(topic.name) + 1);
          } else {
            this.topics.set(topic.name, 1);
          }
        }

      }
      this.topics = new Map([...this.topics.entries()].sort((a, b) => b[1] - a[1]));
        let labels: Label[] = [];
        let data: number[] = [];
        this.topics.forEach((value: number, key: string) => {
          labels.push(key);
          data.push(value);
        });
        labels = labels.slice(0, 9);
        data = data.slice(0, 9);
        this.pieChartLabels = labels;
        this.pieChartData = data;
    }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getProductsByCategory();
  }
}
