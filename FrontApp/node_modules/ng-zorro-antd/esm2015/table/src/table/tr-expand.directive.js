/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input } from '@angular/core';
export class NzTrExpandDirective {
    constructor() {
        this.nzExpand = true;
    }
}
NzTrExpandDirective.decorators = [
    { type: Directive, args: [{
                selector: 'tr[nzExpand]',
                host: {
                    '[class.ant-table-expanded-row]': 'true',
                    '[hidden]': `!nzExpand`
                }
            },] }
];
NzTrExpandDirective.propDecorators = {
    nzExpand: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHItZXhwYW5kLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdGFibGUvIiwic291cmNlcyI6WyJzcmMvdGFibGUvdHItZXhwYW5kLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVNqRCxNQUFNLE9BQU8sbUJBQW1CO0lBUGhDO1FBUVcsYUFBUSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDOzs7WUFUQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLElBQUksRUFBRTtvQkFDSixnQ0FBZ0MsRUFBRSxNQUFNO29CQUN4QyxVQUFVLEVBQUUsV0FBVztpQkFDeEI7YUFDRjs7O3VCQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RyW256RXhwYW5kXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10YWJsZS1leHBhbmRlZC1yb3ddJzogJ3RydWUnLFxuICAgICdbaGlkZGVuXSc6IGAhbnpFeHBhbmRgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUckV4cGFuZERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIG56RXhwYW5kID0gdHJ1ZTtcbn1cbiJdfQ==