/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzTableStyleService } from '../table-style.service';
export class NzTableFixedRowComponent {
    constructor(nzTableStyleService, renderer) {
        this.nzTableStyleService = nzTableStyleService;
        this.renderer = renderer;
        this.hostWidth$ = new BehaviorSubject(null);
        this.enableAutoMeasure$ = new BehaviorSubject(false);
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        if (this.nzTableStyleService) {
            const { enableAutoMeasure$, hostWidth$ } = this.nzTableStyleService;
            enableAutoMeasure$.subscribe(this.enableAutoMeasure$);
            hostWidth$.subscribe(this.hostWidth$);
        }
    }
    ngAfterViewInit() {
        this.nzTableStyleService.columnCount$.pipe(takeUntil(this.destroy$)).subscribe(count => {
            this.renderer.setAttribute(this.tdElement.nativeElement, 'colspan', `${count}`);
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTableFixedRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'tr[nz-table-fixed-row], tr[nzExpand]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <td class="nz-disable-td ant-table-cell" #tdElement>
      <div
        class="ant-table-expanded-row-fixed"
        *ngIf="enableAutoMeasure$ | async; else contentTemplate"
        style="position: sticky; left: 0px; overflow: hidden;"
        [style.width.px]="hostWidth$ | async"
      >
        <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      </div>
    </td>
    <ng-template #contentTemplate><ng-content></ng-content></ng-template>
  `
            },] }
];
NzTableFixedRowComponent.ctorParameters = () => [
    { type: NzTableStyleService },
    { type: Renderer2 }
];
NzTableFixedRowComponent.propDecorators = {
    tdElement: [{ type: ViewChild, args: ['tdElement',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZml4ZWQtcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdGFibGUvIiwic291cmNlcyI6WyJzcmMvdGFibGUvdGFibGUtZml4ZWQtcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBR1YsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBb0I3RCxNQUFNLE9BQU8sd0JBQXdCO0lBS25DLFlBQW9CLG1CQUF3QyxFQUFVLFFBQW1CO1FBQXJFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBSHpGLGVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFDdEQsdUJBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDakQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDMkQsQ0FBQztJQUM3RixRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsTUFBTSxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUNwRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBQ0QsZUFBZTtRQUNiLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNsRixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQXZDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO2FBQ0Y7OztZQW5CUSxtQkFBbUI7WUFOMUIsU0FBUzs7O3dCQTJCUixTQUFTLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56VGFibGVTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi90YWJsZS1zdHlsZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHJbbnotdGFibGUtZml4ZWQtcm93XSwgdHJbbnpFeHBhbmRdJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRkIGNsYXNzPVwibnotZGlzYWJsZS10ZCBhbnQtdGFibGUtY2VsbFwiICN0ZEVsZW1lbnQ+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiYW50LXRhYmxlLWV4cGFuZGVkLXJvdy1maXhlZFwiXG4gICAgICAgICpuZ0lmPVwiZW5hYmxlQXV0b01lYXN1cmUkIHwgYXN5bmM7IGVsc2UgY29udGVudFRlbXBsYXRlXCJcbiAgICAgICAgc3R5bGU9XCJwb3NpdGlvbjogc3RpY2t5OyBsZWZ0OiAwcHg7IG92ZXJmbG93OiBoaWRkZW47XCJcbiAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cImhvc3RXaWR0aCQgfCBhc3luY1wiXG4gICAgICA+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG4gICAgPC90ZD5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnRUZW1wbGF0ZT48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelRhYmxlRml4ZWRSb3dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3RkRWxlbWVudCcpIHRkRWxlbWVudCE6IEVsZW1lbnRSZWY7XG4gIGhvc3RXaWR0aCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlciB8IG51bGw+KG51bGwpO1xuICBlbmFibGVBdXRvTWVhc3VyZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbnpUYWJsZVN0eWxlU2VydmljZTogTnpUYWJsZVN0eWxlU2VydmljZSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlKSB7XG4gICAgICBjb25zdCB7IGVuYWJsZUF1dG9NZWFzdXJlJCwgaG9zdFdpZHRoJCB9ID0gdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlO1xuICAgICAgZW5hYmxlQXV0b01lYXN1cmUkLnN1YnNjcmliZSh0aGlzLmVuYWJsZUF1dG9NZWFzdXJlJCk7XG4gICAgICBob3N0V2lkdGgkLnN1YnNjcmliZSh0aGlzLmhvc3RXaWR0aCQpO1xuICAgIH1cbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlLmNvbHVtbkNvdW50JC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGNvdW50ID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMudGRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdjb2xzcGFuJywgYCR7Y291bnR9YCk7XG4gICAgfSk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=