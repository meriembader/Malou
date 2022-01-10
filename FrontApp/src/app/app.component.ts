import {Component, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-frontend';
  tabs = [
    {
      name: 'Liste des Produits',
      icon: 'unordered-list'
    },
    {
      name: 'Pie Chart Produit/Catégorie',
      icon: 'pie-chart'
    }
  ];
  public date: any;
  constructor(public datepipe: DatePipe) { }

  onValueChange(value: Date): void {
    this.date = this.datepipe.transform(value, 'yyyy-MM-dd');
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }
  disabledDate = (current: Date): boolean => {
    // Can not select days after today and today
    return differenceInCalendarDays(Date.now(), current) < 0 || current < new Date(2016, 0, 1);
  };

}
