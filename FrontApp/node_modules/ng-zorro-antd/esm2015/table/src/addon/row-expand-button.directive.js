/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
export class NzRowExpandButtonDirective {
    constructor() {
        this.expand = false;
        this.spaceMode = false;
        this.expandChange = new EventEmitter();
    }
    onHostClick() {
        if (!this.spaceMode) {
            this.expand = !this.expand;
            this.expandChange.next(this.expand);
        }
    }
}
NzRowExpandButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'button[nz-row-expand-button]',
                host: {
                    '[type]': `'button'`,
                    '[class.ant-table-row-expand-icon]': 'true',
                    '[class.ant-table-row-expand-icon-expanded]': `!spaceMode && expand === true`,
                    '[class.ant-table-row-expand-icon-collapsed]': `!spaceMode && expand === false`,
                    '[class.ant-table-row-expand-icon-spaced]': 'spaceMode',
                    '(click)': 'onHostClick()'
                }
            },] }
];
NzRowExpandButtonDirective.propDecorators = {
    expand: [{ type: Input }],
    spaceMode: [{ type: Input }],
    expandChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWV4cGFuZC1idXR0b24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9hZGRvbi9yb3ctZXhwYW5kLWJ1dHRvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWF2RSxNQUFNLE9BQU8sMEJBQTBCO0lBWHZDO1FBWVcsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDUixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFPdkQsQ0FBQztJQU5DLFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7WUFwQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLElBQUksRUFBRTtvQkFDSixRQUFRLEVBQUUsVUFBVTtvQkFDcEIsbUNBQW1DLEVBQUUsTUFBTTtvQkFDM0MsNENBQTRDLEVBQUUsK0JBQStCO29CQUM3RSw2Q0FBNkMsRUFBRSxnQ0FBZ0M7b0JBQy9FLDBDQUEwQyxFQUFFLFdBQVc7b0JBQ3ZELFNBQVMsRUFBRSxlQUFlO2lCQUMzQjthQUNGOzs7cUJBRUUsS0FBSzt3QkFDTCxLQUFLOzJCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdidXR0b25bbnotcm93LWV4cGFuZC1idXR0b25dJyxcbiAgaG9zdDoge1xuICAgICdbdHlwZV0nOiBgJ2J1dHRvbidgLFxuICAgICdbY2xhc3MuYW50LXRhYmxlLXJvdy1leHBhbmQtaWNvbl0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtcm93LWV4cGFuZC1pY29uLWV4cGFuZGVkXSc6IGAhc3BhY2VNb2RlICYmIGV4cGFuZCA9PT0gdHJ1ZWAsXG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtcm93LWV4cGFuZC1pY29uLWNvbGxhcHNlZF0nOiBgIXNwYWNlTW9kZSAmJiBleHBhbmQgPT09IGZhbHNlYCxcbiAgICAnW2NsYXNzLmFudC10YWJsZS1yb3ctZXhwYW5kLWljb24tc3BhY2VkXSc6ICdzcGFjZU1vZGUnLFxuICAgICcoY2xpY2spJzogJ29uSG9zdENsaWNrKCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpSb3dFeHBhbmRCdXR0b25EaXJlY3RpdmUge1xuICBASW5wdXQoKSBleHBhbmQgPSBmYWxzZTtcbiAgQElucHV0KCkgc3BhY2VNb2RlID0gZmFsc2U7XG4gIEBPdXRwdXQoKSByZWFkb25seSBleHBhbmRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIG9uSG9zdENsaWNrKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zcGFjZU1vZGUpIHtcbiAgICAgIHRoaXMuZXhwYW5kID0gIXRoaXMuZXhwYW5kO1xuICAgICAgdGhpcy5leHBhbmRDaGFuZ2UubmV4dCh0aGlzLmV4cGFuZCk7XG4gICAgfVxuICB9XG59XG4iXX0=