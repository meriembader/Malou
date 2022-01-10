/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Host, Optional } from '@angular/core';
import { NzDatePickerComponent } from './date-picker.component';
// tslint:disable-next-line:directive-class-suffix
export class NzRangePickerComponent {
    constructor(datePicker) {
        this.datePicker = datePicker;
        this.datePicker.isRange = true;
    }
}
NzRangePickerComponent.decorators = [
    { type: Directive, args: [{
                selector: 'nz-range-picker',
                exportAs: 'nzRangePicker'
            },] }
];
NzRangePickerComponent.ctorParameters = () => [
    { type: NzDatePickerComponent, decorators: [{ type: Optional }, { type: Host }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJyYW5nZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQU1oRSxrREFBa0Q7QUFDbEQsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUF1QyxVQUFpQztRQUFqQyxlQUFVLEdBQVYsVUFBVSxDQUF1QjtRQUN0RSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDakMsQ0FBQzs7O1lBUkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSxlQUFlO2FBQzFCOzs7WUFMUSxxQkFBcUIsdUJBUWYsUUFBUSxZQUFJLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOekRhdGVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtcGlja2VyLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ256LXJhbmdlLXBpY2tlcicsXG4gIGV4cG9ydEFzOiAnbnpSYW5nZVBpY2tlcidcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE56UmFuZ2VQaWNrZXJDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASG9zdCgpIHB1YmxpYyBkYXRlUGlja2VyOiBOekRhdGVQaWNrZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLmRhdGVQaWNrZXIuaXNSYW5nZSA9IHRydWU7XG4gIH1cbn1cbiJdfQ==