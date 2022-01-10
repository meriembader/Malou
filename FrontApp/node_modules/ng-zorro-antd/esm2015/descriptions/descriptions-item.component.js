/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { InputNumber } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
export class NzDescriptionsItemComponent {
    constructor() {
        this.nzSpan = 1;
        this.nzTitle = '';
        this.inputChange$ = new Subject();
    }
    ngOnChanges() {
        this.inputChange$.next();
    }
    ngOnDestroy() {
        this.inputChange$.complete();
    }
}
NzDescriptionsItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-descriptions-item',
                template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
                exportAs: 'nzDescriptionsItem',
                preserveWhitespaces: false
            },] }
];
NzDescriptionsItemComponent.propDecorators = {
    content: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
    nzSpan: [{ type: Input }],
    nzTitle: [{ type: Input }]
};
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzDescriptionsItemComponent.prototype, "nzSpan", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRpb25zLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9kZXNjcmlwdGlvbnMvIiwic291cmNlcyI6WyJkZXNjcmlwdGlvbnMtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QixXQUFXLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNJLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBYy9CLE1BQU0sT0FBTywyQkFBMkI7SUFaeEM7UUFpQjBCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDMUIsWUFBTyxHQUErQixFQUFFLENBQUM7UUFFekMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBUzlDLENBQUM7SUFQQyxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7O1lBNUJGLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLG1CQUFtQixFQUFFLEtBQUs7YUFDM0I7OztzQkFJRSxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtxQkFFdkMsS0FBSztzQkFDTCxLQUFLOztBQURrQjtJQUFkLFdBQVcsRUFBRTs7MkRBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOdW1iZXJJbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dE51bWJlciB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotZGVzY3JpcHRpb25zLWl0ZW0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBleHBvcnRBczogJ256RGVzY3JpcHRpb25zSXRlbScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE56RGVzY3JpcHRpb25zSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U3BhbjogTnVtYmVySW5wdXQ7XG5cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IHRydWUgfSkgY29udGVudCE6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuXG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56U3BhbiA9IDE7XG4gIEBJbnB1dCgpIG56VGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+ID0gJyc7XG5cbiAgcmVhZG9ubHkgaW5wdXRDaGFuZ2UkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0Q2hhbmdlJC5uZXh0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0Q2hhbmdlJC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=