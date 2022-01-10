/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Directive, Input } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzCellBreakWordDirective {
    constructor() {
        this.nzBreakWord = true;
    }
}
NzCellBreakWordDirective.decorators = [
    { type: Directive, args: [{
                selector: 'th[nzBreakWord],td[nzBreakWord]',
                host: {
                    '[style.word-break]': `nzBreakWord ? 'break-all' : ''`
                }
            },] }
];
NzCellBreakWordDirective.propDecorators = {
    nzBreakWord: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCellBreakWordDirective.prototype, "nzBreakWord", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZC1icmVhay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RhYmxlLyIsInNvdXJjZXMiOlsic3JjL3N0eWxlZC93b3JkLWJyZWFrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBUXZELE1BQU0sT0FBTyx3QkFBd0I7SUFOckM7UUFTMkIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7SUFDOUMsQ0FBQzs7O1lBVkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLElBQUksRUFBRTtvQkFDSixvQkFBb0IsRUFBRSxnQ0FBZ0M7aUJBQ3ZEO2FBQ0Y7OzswQkFJRSxLQUFLOztBQUFtQjtJQUFmLFlBQVksRUFBRTs7NkRBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhbbnpCcmVha1dvcmRdLHRkW256QnJlYWtXb3JkXScsXG4gIGhvc3Q6IHtcbiAgICAnW3N0eWxlLndvcmQtYnJlYWtdJzogYG56QnJlYWtXb3JkID8gJ2JyZWFrLWFsbCcgOiAnJ2BcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekNlbGxCcmVha1dvcmREaXJlY3RpdmUge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpCcmVha1dvcmQ6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpCcmVha1dvcmQgPSB0cnVlO1xufVxuIl19