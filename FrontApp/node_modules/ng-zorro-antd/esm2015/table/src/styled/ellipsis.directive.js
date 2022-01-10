/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Directive, Input } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzCellEllipsisDirective {
    constructor() {
        this.nzEllipsis = true;
    }
}
NzCellEllipsisDirective.decorators = [
    { type: Directive, args: [{
                selector: 'th[nzEllipsis],td[nzEllipsis]',
                host: {
                    '[class.ant-table-cell-ellipsis]': 'nzEllipsis'
                }
            },] }
];
NzCellEllipsisDirective.propDecorators = {
    nzEllipsis: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCellEllipsisDirective.prototype, "nzEllipsis", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxsaXBzaXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9zdHlsZWQvZWxsaXBzaXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFRdkQsTUFBTSxPQUFPLHVCQUF1QjtJQU5wQztRQVMyQixlQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzdDLENBQUM7OztZQVZBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6QyxJQUFJLEVBQUU7b0JBQ0osaUNBQWlDLEVBQUUsWUFBWTtpQkFDaEQ7YUFDRjs7O3lCQUlFLEtBQUs7O0FBQW1CO0lBQWYsWUFBWSxFQUFFOzsyREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aFtuekVsbGlwc2lzXSx0ZFtuekVsbGlwc2lzXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10YWJsZS1jZWxsLWVsbGlwc2lzXSc6ICduekVsbGlwc2lzJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56Q2VsbEVsbGlwc2lzRGlyZWN0aXZlIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RWxsaXBzaXM6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpFbGxpcHNpcyA9IHRydWU7XG59XG4iXX0=