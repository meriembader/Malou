/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Optional } from '@angular/core';
import { NzTableStyleService } from '../table-style.service';
export class NzTableCellDirective {
    constructor(nzTableStyleService) {
        this.isInsideTable = false;
        this.isInsideTable = !!nzTableStyleService;
    }
}
NzTableCellDirective.decorators = [
    { type: Directive, args: [{
                selector: 'th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])',
                host: {
                    '[class.ant-table-cell]': 'isInsideTable'
                }
            },] }
];
NzTableCellDirective.ctorParameters = () => [
    { type: NzTableStyleService, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RhYmxlLyIsInNvdXJjZXMiOlsic3JjL2NlbGwvY2VsbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRN0QsTUFBTSxPQUFPLG9CQUFvQjtJQUUvQixZQUF3QixtQkFBd0M7UUFEaEUsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsbUJBQW1CLENBQUM7SUFDN0MsQ0FBQzs7O1lBVkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnRkFBZ0Y7Z0JBQzFGLElBQUksRUFBRTtvQkFDSix3QkFBd0IsRUFBRSxlQUFlO2lCQUMxQzthQUNGOzs7WUFQUSxtQkFBbUIsdUJBVWIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelRhYmxlU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vdGFibGUtc3R5bGUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RoOm5vdCgubnotZGlzYWJsZS10aCk6bm90KFttYXQtY2VsbF0pLCB0ZDpub3QoLm56LWRpc2FibGUtdGQpOm5vdChbbWF0LWNlbGxdKScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10YWJsZS1jZWxsXSc6ICdpc0luc2lkZVRhYmxlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VGFibGVDZWxsRGlyZWN0aXZlIHtcbiAgaXNJbnNpZGVUYWJsZSA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBuelRhYmxlU3R5bGVTZXJ2aWNlOiBOelRhYmxlU3R5bGVTZXJ2aWNlKSB7XG4gICAgdGhpcy5pc0luc2lkZVRhYmxlID0gISFuelRhYmxlU3R5bGVTZXJ2aWNlO1xuICB9XG59XG4iXX0=