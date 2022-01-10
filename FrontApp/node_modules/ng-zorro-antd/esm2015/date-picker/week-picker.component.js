/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Host, Optional } from '@angular/core';
import { NzDatePickerComponent } from './date-picker.component';
// tslint:disable-next-line:directive-class-suffix
export class NzWeekPickerComponent {
    constructor(datePicker) {
        this.datePicker = datePicker;
        this.datePicker.nzMode = 'week';
    }
}
NzWeekPickerComponent.decorators = [
    { type: Directive, args: [{
                selector: 'nz-week-picker',
                exportAs: 'nzWeekPicker'
            },] }
];
NzWeekPickerComponent.ctorParameters = () => [
    { type: NzDatePickerComponent, decorators: [{ type: Optional }, { type: Host }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vlay1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbIndlZWstcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFNaEUsa0RBQWtEO0FBQ2xELE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFBdUMsVUFBaUM7UUFBakMsZUFBVSxHQUFWLFVBQVUsQ0FBdUI7UUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ2xDLENBQUM7OztZQVJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsY0FBYzthQUN6Qjs7O1lBTFEscUJBQXFCLHVCQVFmLFFBQVEsWUFBSSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpEYXRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXBpY2tlci5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduei13ZWVrLXBpY2tlcicsXG4gIGV4cG9ydEFzOiAnbnpXZWVrUGlja2VyJ1xufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTnpXZWVrUGlja2VyQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEhvc3QoKSBwdWJsaWMgZGF0ZVBpY2tlcjogTnpEYXRlUGlja2VyQ29tcG9uZW50KSB7XG4gICAgdGhpcy5kYXRlUGlja2VyLm56TW9kZSA9ICd3ZWVrJztcbiAgfVxufVxuIl19