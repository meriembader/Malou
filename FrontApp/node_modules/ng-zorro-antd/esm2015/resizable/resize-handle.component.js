/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzResizableService } from './resizable.service';
export class NzResizeHandleMouseDownEvent {
    constructor(direction, mouseEvent) {
        this.direction = direction;
        this.mouseEvent = mouseEvent;
    }
}
export class NzResizeHandleComponent {
    constructor(nzResizableService, cdr) {
        this.nzResizableService = nzResizableService;
        this.cdr = cdr;
        this.nzDirection = 'bottomRight';
        this.nzMouseDown = new EventEmitter();
        this.entered = false;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.nzResizableService.mouseEntered$.pipe(takeUntil(this.destroy$)).subscribe(entered => {
            this.entered = entered;
            this.cdr.markForCheck();
        });
    }
    onMousedown(event) {
        this.nzResizableService.handleMouseDown$.next(new NzResizeHandleMouseDownEvent(this.nzDirection, event));
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzResizeHandleComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-resize-handle, [nz-resize-handle]',
                exportAs: 'nzResizeHandle',
                template: ` <ng-content></ng-content> `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.nz-resizable-handle]': 'true',
                    '[class.nz-resizable-handle-top]': `nzDirection === 'top'`,
                    '[class.nz-resizable-handle-right]': `nzDirection === 'right'`,
                    '[class.nz-resizable-handle-bottom]': `nzDirection === 'bottom'`,
                    '[class.nz-resizable-handle-left]': `nzDirection === 'left'`,
                    '[class.nz-resizable-handle-topRight]': `nzDirection === 'topRight'`,
                    '[class.nz-resizable-handle-bottomRight]': `nzDirection === 'bottomRight'`,
                    '[class.nz-resizable-handle-bottomLeft]': `nzDirection === 'bottomLeft'`,
                    '[class.nz-resizable-handle-topLeft]': `nzDirection === 'topLeft'`,
                    '[class.nz-resizable-handle-box-hover]': 'entered',
                    '(mousedown)': 'onMousedown($event)',
                    '(touchstart)': 'onMousedown($event)'
                }
            },] }
];
NzResizeHandleComponent.ctorParameters = () => [
    { type: NzResizableService },
    { type: ChangeDetectorRef }
];
NzResizeHandleComponent.propDecorators = {
    nzDirection: [{ type: Input }],
    nzMouseDown: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLWhhbmRsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3Jlc2l6YWJsZS8iLCJzb3VyY2VzIjpbInJlc2l6ZS1oYW5kbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RJLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSXpELE1BQU0sT0FBTyw0QkFBNEI7SUFDdkMsWUFBbUIsU0FBNEIsRUFBUyxVQUFtQztRQUF4RSxjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUFTLGVBQVUsR0FBVixVQUFVLENBQXlCO0lBQUcsQ0FBQztDQUNoRztBQXNCRCxNQUFNLE9BQU8sdUJBQXVCO0lBT2xDLFlBQW9CLGtCQUFzQyxFQUFVLEdBQXNCO1FBQXRFLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQU5qRixnQkFBVyxHQUFzQixhQUFhLENBQUM7UUFDckMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBZ0MsQ0FBQztRQUVsRixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ1IsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFFc0QsQ0FBQztJQUU5RixRQUFRO1FBQ04sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2RixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUE4QjtRQUN4QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNEJBQTRCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQTNDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSiw2QkFBNkIsRUFBRSxNQUFNO29CQUNyQyxpQ0FBaUMsRUFBRSx1QkFBdUI7b0JBQzFELG1DQUFtQyxFQUFFLHlCQUF5QjtvQkFDOUQsb0NBQW9DLEVBQUUsMEJBQTBCO29CQUNoRSxrQ0FBa0MsRUFBRSx3QkFBd0I7b0JBQzVELHNDQUFzQyxFQUFFLDRCQUE0QjtvQkFDcEUseUNBQXlDLEVBQUUsK0JBQStCO29CQUMxRSx3Q0FBd0MsRUFBRSw4QkFBOEI7b0JBQ3hFLHFDQUFxQyxFQUFFLDJCQUEyQjtvQkFDbEUsdUNBQXVDLEVBQUUsU0FBUztvQkFDbEQsYUFBYSxFQUFFLHFCQUFxQjtvQkFDcEMsY0FBYyxFQUFFLHFCQUFxQjtpQkFDdEM7YUFDRjs7O1lBM0JRLGtCQUFrQjtZQUpPLGlCQUFpQjs7OzBCQWlDaEQsS0FBSzswQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpSZXNpemFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZXNpemFibGUuc2VydmljZSc7XG5cbmV4cG9ydCB0eXBlIE56UmVzaXplRGlyZWN0aW9uID0gJ3RvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAndG9wUmlnaHQnIHwgJ2JvdHRvbVJpZ2h0JyB8ICdib3R0b21MZWZ0JyB8ICd0b3BMZWZ0JztcblxuZXhwb3J0IGNsYXNzIE56UmVzaXplSGFuZGxlTW91c2VEb3duRXZlbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlyZWN0aW9uOiBOelJlc2l6ZURpcmVjdGlvbiwgcHVibGljIG1vdXNlRXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7fVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1yZXNpemUtaGFuZGxlLCBbbnotcmVzaXplLWhhbmRsZV0nLFxuICBleHBvcnRBczogJ256UmVzaXplSGFuZGxlJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubnotcmVzaXphYmxlLWhhbmRsZV0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5uei1yZXNpemFibGUtaGFuZGxlLXRvcF0nOiBgbnpEaXJlY3Rpb24gPT09ICd0b3AnYCxcbiAgICAnW2NsYXNzLm56LXJlc2l6YWJsZS1oYW5kbGUtcmlnaHRdJzogYG56RGlyZWN0aW9uID09PSAncmlnaHQnYCxcbiAgICAnW2NsYXNzLm56LXJlc2l6YWJsZS1oYW5kbGUtYm90dG9tXSc6IGBuekRpcmVjdGlvbiA9PT0gJ2JvdHRvbSdgLFxuICAgICdbY2xhc3MubnotcmVzaXphYmxlLWhhbmRsZS1sZWZ0XSc6IGBuekRpcmVjdGlvbiA9PT0gJ2xlZnQnYCxcbiAgICAnW2NsYXNzLm56LXJlc2l6YWJsZS1oYW5kbGUtdG9wUmlnaHRdJzogYG56RGlyZWN0aW9uID09PSAndG9wUmlnaHQnYCxcbiAgICAnW2NsYXNzLm56LXJlc2l6YWJsZS1oYW5kbGUtYm90dG9tUmlnaHRdJzogYG56RGlyZWN0aW9uID09PSAnYm90dG9tUmlnaHQnYCxcbiAgICAnW2NsYXNzLm56LXJlc2l6YWJsZS1oYW5kbGUtYm90dG9tTGVmdF0nOiBgbnpEaXJlY3Rpb24gPT09ICdib3R0b21MZWZ0J2AsXG4gICAgJ1tjbGFzcy5uei1yZXNpemFibGUtaGFuZGxlLXRvcExlZnRdJzogYG56RGlyZWN0aW9uID09PSAndG9wTGVmdCdgLFxuICAgICdbY2xhc3MubnotcmVzaXphYmxlLWhhbmRsZS1ib3gtaG92ZXJdJzogJ2VudGVyZWQnLFxuICAgICcobW91c2Vkb3duKSc6ICdvbk1vdXNlZG93bigkZXZlbnQpJyxcbiAgICAnKHRvdWNoc3RhcnQpJzogJ29uTW91c2Vkb3duKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpSZXNpemVIYW5kbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG56RGlyZWN0aW9uOiBOelJlc2l6ZURpcmVjdGlvbiA9ICdib3R0b21SaWdodCc7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek1vdXNlRG93biA9IG5ldyBFdmVudEVtaXR0ZXI8TnpSZXNpemVIYW5kbGVNb3VzZURvd25FdmVudD4oKTtcblxuICBlbnRlcmVkID0gZmFsc2U7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbnpSZXNpemFibGVTZXJ2aWNlOiBOelJlc2l6YWJsZVNlcnZpY2UsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm56UmVzaXphYmxlU2VydmljZS5tb3VzZUVudGVyZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZW50ZXJlZCA9PiB7XG4gICAgICB0aGlzLmVudGVyZWQgPSBlbnRlcmVkO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBvbk1vdXNlZG93bihldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm56UmVzaXphYmxlU2VydmljZS5oYW5kbGVNb3VzZURvd24kLm5leHQobmV3IE56UmVzaXplSGFuZGxlTW91c2VEb3duRXZlbnQodGhpcy5uekRpcmVjdGlvbiwgZXZlbnQpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19