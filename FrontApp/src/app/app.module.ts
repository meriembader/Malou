import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import {DatePipe, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductCategoryChartComponent } from './component/product-category-chart/product-category-chart.component';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import { ChartsModule } from 'ng2-charts';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzTabsModule,
    NzIconModule,
    NzCalendarModule,
    NzCardModule,
    NzSpinModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    NzBadgeModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule,
    ChartsModule

  ],
  providers: [DatePipe,{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
