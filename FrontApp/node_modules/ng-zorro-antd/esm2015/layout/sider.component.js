/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NzBreakpointService, siderResponsiveMap } from 'ng-zorro-antd/core/services';
import { inNextTick, InputBoolean, toCssPixel } from 'ng-zorro-antd/core/util';
import { NzMenuDirective } from 'ng-zorro-antd/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzSiderComponent {
    constructor(platform, cdr, breakpointService) {
        this.platform = platform;
        this.cdr = cdr;
        this.breakpointService = breakpointService;
        this.destroy$ = new Subject();
        this.nzMenuDirective = null;
        this.nzCollapsedChange = new EventEmitter();
        this.nzWidth = 200;
        this.nzTheme = 'dark';
        this.nzCollapsedWidth = 80;
        this.nzBreakpoint = null;
        this.nzZeroTrigger = null;
        this.nzTrigger = undefined;
        this.nzReverseArrow = false;
        this.nzCollapsible = false;
        this.nzCollapsed = false;
        this.matchBreakPoint = false;
        this.flexSetting = null;
        this.widthSetting = null;
    }
    updateStyleMap() {
        this.widthSetting = this.nzCollapsed ? `${this.nzCollapsedWidth}px` : toCssPixel(this.nzWidth);
        this.flexSetting = `0 0 ${this.widthSetting}`;
        this.cdr.markForCheck();
    }
    updateMenuInlineCollapsed() {
        if (this.nzMenuDirective && this.nzMenuDirective.nzMode === 'inline' && this.nzCollapsedWidth !== 0) {
            this.nzMenuDirective.setInlineCollapsed(this.nzCollapsed);
        }
    }
    setCollapsed(collapsed) {
        if (collapsed !== this.nzCollapsed) {
            this.nzCollapsed = collapsed;
            this.nzCollapsedChange.emit(collapsed);
            this.updateMenuInlineCollapsed();
            this.updateStyleMap();
            this.cdr.markForCheck();
        }
    }
    ngOnInit() {
        this.updateStyleMap();
        if (this.platform.isBrowser) {
            this.breakpointService
                .subscribe(siderResponsiveMap, true)
                .pipe(takeUntil(this.destroy$))
                .subscribe(map => {
                const breakpoint = this.nzBreakpoint;
                if (breakpoint) {
                    inNextTick().subscribe(() => {
                        this.matchBreakPoint = !map[breakpoint];
                        this.setCollapsed(this.matchBreakPoint);
                        this.cdr.markForCheck();
                    });
                }
            });
        }
    }
    ngOnChanges(changes) {
        const { nzCollapsed, nzCollapsedWidth, nzWidth } = changes;
        if (nzCollapsed || nzCollapsedWidth || nzWidth) {
            this.updateStyleMap();
        }
        if (nzCollapsed) {
            this.updateMenuInlineCollapsed();
        }
    }
    ngAfterContentInit() {
        this.updateMenuInlineCollapsed();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSiderComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-sider',
                exportAs: 'nzSider',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="ant-layout-sider-children">
      <ng-content></ng-content>
    </div>
    <div
      *ngIf="nzCollapsible && nzTrigger !== null"
      nz-sider-trigger
      [matchBreakPoint]="matchBreakPoint"
      [nzCollapsedWidth]="nzCollapsedWidth"
      [nzCollapsed]="nzCollapsed"
      [nzBreakpoint]="nzBreakpoint"
      [nzReverseArrow]="nzReverseArrow"
      [nzTrigger]="nzTrigger"
      [nzZeroTrigger]="nzZeroTrigger"
      [siderWidth]="widthSetting"
      (click)="setCollapsed(!nzCollapsed)"
    ></div>
  `,
                host: {
                    '[class.ant-layout-sider]': 'true',
                    '[class.ant-layout-sider-zero-width]': `nzCollapsed && nzCollapsedWidth === 0`,
                    '[class.ant-layout-sider-light]': `nzTheme === 'light'`,
                    '[class.ant-layout-sider-dark]': `nzTheme === 'dark'`,
                    '[class.ant-layout-sider-collapsed]': `nzCollapsed`,
                    '[style.flex]': 'flexSetting',
                    '[style.maxWidth]': 'widthSetting',
                    '[style.minWidth]': 'widthSetting',
                    '[style.width]': 'widthSetting'
                }
            },] }
];
NzSiderComponent.ctorParameters = () => [
    { type: Platform },
    { type: ChangeDetectorRef },
    { type: NzBreakpointService }
];
NzSiderComponent.propDecorators = {
    nzMenuDirective: [{ type: ContentChild, args: [NzMenuDirective,] }],
    nzCollapsedChange: [{ type: Output }],
    nzWidth: [{ type: Input }],
    nzTheme: [{ type: Input }],
    nzCollapsedWidth: [{ type: Input }],
    nzBreakpoint: [{ type: Input }],
    nzZeroTrigger: [{ type: Input }],
    nzTrigger: [{ type: Input }],
    nzReverseArrow: [{ type: Input }],
    nzCollapsible: [{ type: Input }],
    nzCollapsed: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSiderComponent.prototype, "nzReverseArrow", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSiderComponent.prototype, "nzCollapsible", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSiderComponent.prototype, "nzCollapsed", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9sYXlvdXQvIiwic291cmNlcyI6WyJzaWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUdOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQW1CLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdkcsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBc0MzQyxNQUFNLE9BQU8sZ0JBQWdCO0lBMkMzQixZQUFvQixRQUFrQixFQUFVLEdBQXNCLEVBQVUsaUJBQXNDO1FBQWxHLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBcUI7UUF0QzlHLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ0Ysb0JBQWUsR0FBMkIsSUFBSSxDQUFDO1FBQzNELHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsWUFBTyxHQUFvQixHQUFHLENBQUM7UUFDL0IsWUFBTyxHQUFxQixNQUFNLENBQUM7UUFDbkMscUJBQWdCLEdBQUcsRUFB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LENBQUM7SUFDbkMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBdEhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osMEJBQTBCLEVBQUUsTUFBTTtvQkFDbEMscUNBQXFDLEVBQUUsdUNBQXVDO29CQUM5RSxnQ0FBZ0MsRUFBRSxxQkFBcUI7b0JBQ3ZELCtCQUErQixFQUFFLG9CQUFvQjtvQkFDckQsb0NBQW9DLEVBQUUsYUFBYTtvQkFDbkQsY0FBYyxFQUFFLGFBQWE7b0JBQzdCLGtCQUFrQixFQUFFLGNBQWM7b0JBQ2xDLGtCQUFrQixFQUFFLGNBQWM7b0JBQ2xDLGVBQWUsRUFBRSxjQUFjO2lCQUNoQzthQUNGOzs7WUEzRFEsUUFBUTtZQUlmLGlCQUFpQjtZQWFPLG1CQUFtQjs7OzhCQWlEMUMsWUFBWSxTQUFDLGVBQWU7Z0NBQzVCLE1BQU07c0JBQ04sS0FBSztzQkFDTCxLQUFLOytCQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7O0FBRm1CO0lBQWYsWUFBWSxFQUFFOzt3REFBd0I7QUFDdkI7SUFBZixZQUFZLEVBQUU7O3VEQUF1QjtBQUN0QjtJQUFmLFlBQVksRUFBRTs7cURBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOekJyZWFrcG9pbnRLZXksIE56QnJlYWtwb2ludFNlcnZpY2UsIHNpZGVyUmVzcG9uc2l2ZU1hcCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgaW5OZXh0VGljaywgSW5wdXRCb29sZWFuLCB0b0Nzc1BpeGVsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgTnpNZW51RGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZW51JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotc2lkZXInLFxuICBleHBvcnRBczogJ256U2lkZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1sYXlvdXQtc2lkZXItY2hpbGRyZW5cIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cIm56Q29sbGFwc2libGUgJiYgbnpUcmlnZ2VyICE9PSBudWxsXCJcbiAgICAgIG56LXNpZGVyLXRyaWdnZXJcbiAgICAgIFttYXRjaEJyZWFrUG9pbnRdPVwibWF0Y2hCcmVha1BvaW50XCJcbiAgICAgIFtuekNvbGxhcHNlZFdpZHRoXT1cIm56Q29sbGFwc2VkV2lkdGhcIlxuICAgICAgW256Q29sbGFwc2VkXT1cIm56Q29sbGFwc2VkXCJcbiAgICAgIFtuekJyZWFrcG9pbnRdPVwibnpCcmVha3BvaW50XCJcbiAgICAgIFtuelJldmVyc2VBcnJvd109XCJuelJldmVyc2VBcnJvd1wiXG4gICAgICBbbnpUcmlnZ2VyXT1cIm56VHJpZ2dlclwiXG4gICAgICBbbnpaZXJvVHJpZ2dlcl09XCJuelplcm9UcmlnZ2VyXCJcbiAgICAgIFtzaWRlcldpZHRoXT1cIndpZHRoU2V0dGluZ1wiXG4gICAgICAoY2xpY2spPVwic2V0Q29sbGFwc2VkKCFuekNvbGxhcHNlZClcIlxuICAgID48L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LWxheW91dC1zaWRlcl0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0LXNpZGVyLXplcm8td2lkdGhdJzogYG56Q29sbGFwc2VkICYmIG56Q29sbGFwc2VkV2lkdGggPT09IDBgLFxuICAgICdbY2xhc3MuYW50LWxheW91dC1zaWRlci1saWdodF0nOiBgbnpUaGVtZSA9PT0gJ2xpZ2h0J2AsXG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0LXNpZGVyLWRhcmtdJzogYG56VGhlbWUgPT09ICdkYXJrJ2AsXG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0LXNpZGVyLWNvbGxhcHNlZF0nOiBgbnpDb2xsYXBzZWRgLFxuICAgICdbc3R5bGUuZmxleF0nOiAnZmxleFNldHRpbmcnLFxuICAgICdbc3R5bGUubWF4V2lkdGhdJzogJ3dpZHRoU2V0dGluZycsXG4gICAgJ1tzdHlsZS5taW5XaWR0aF0nOiAnd2lkdGhTZXR0aW5nJyxcbiAgICAnW3N0eWxlLndpZHRoXSc6ICd3aWR0aFNldHRpbmcnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpTaWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpSZXZlcnNlQXJyb3c6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q29sbGFwc2libGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q29sbGFwc2VkOiBCb29sZWFuSW5wdXQ7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIEBDb250ZW50Q2hpbGQoTnpNZW51RGlyZWN0aXZlKSBuek1lbnVEaXJlY3RpdmU6IE56TWVudURpcmVjdGl2ZSB8IG51bGwgPSBudWxsO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDb2xsYXBzZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIG56V2lkdGg6IHN0cmluZyB8IG51bWJlciA9IDIwMDtcbiAgQElucHV0KCkgbnpUaGVtZTogJ2xpZ2h0JyB8ICdkYXJrJyA9ICdkYXJrJztcbiAgQElucHV0KCkgbnpDb2xsYXBzZWRXaWR0aCA9IDgwO1xuICBASW5wdXQoKSBuekJyZWFrcG9pbnQ6IE56QnJlYWtwb2ludEtleSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelplcm9UcmlnZ2VyOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelRyaWdnZXI6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgdW5kZWZpbmVkIHwgbnVsbCA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56UmV2ZXJzZUFycm93ID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekNvbGxhcHNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekNvbGxhcHNlZCA9IGZhbHNlO1xuICBtYXRjaEJyZWFrUG9pbnQgPSBmYWxzZTtcbiAgZmxleFNldHRpbmc6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICB3aWR0aFNldHRpbmc6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIHVwZGF0ZVN0eWxlTWFwKCk6IHZvaWQge1xuICAgIHRoaXMud2lkdGhTZXR0aW5nID0gdGhpcy5uekNvbGxhcHNlZCA/IGAke3RoaXMubnpDb2xsYXBzZWRXaWR0aH1weGAgOiB0b0Nzc1BpeGVsKHRoaXMubnpXaWR0aCk7XG4gICAgdGhpcy5mbGV4U2V0dGluZyA9IGAwIDAgJHt0aGlzLndpZHRoU2V0dGluZ31gO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgdXBkYXRlTWVudUlubGluZUNvbGxhcHNlZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uek1lbnVEaXJlY3RpdmUgJiYgdGhpcy5uek1lbnVEaXJlY3RpdmUubnpNb2RlID09PSAnaW5saW5lJyAmJiB0aGlzLm56Q29sbGFwc2VkV2lkdGggIT09IDApIHtcbiAgICAgIHRoaXMubnpNZW51RGlyZWN0aXZlLnNldElubGluZUNvbGxhcHNlZCh0aGlzLm56Q29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBzZXRDb2xsYXBzZWQoY29sbGFwc2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGNvbGxhcHNlZCAhPT0gdGhpcy5uekNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5uekNvbGxhcHNlZCA9IGNvbGxhcHNlZDtcbiAgICAgIHRoaXMubnpDb2xsYXBzZWRDaGFuZ2UuZW1pdChjb2xsYXBzZWQpO1xuICAgICAgdGhpcy51cGRhdGVNZW51SW5saW5lQ29sbGFwc2VkKCk7XG4gICAgICB0aGlzLnVwZGF0ZVN0eWxlTWFwKCk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGJyZWFrcG9pbnRTZXJ2aWNlOiBOekJyZWFrcG9pbnRTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlU3R5bGVNYXAoKTtcblxuICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5icmVha3BvaW50U2VydmljZVxuICAgICAgICAuc3Vic2NyaWJlKHNpZGVyUmVzcG9uc2l2ZU1hcCwgdHJ1ZSlcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKG1hcCA9PiB7XG4gICAgICAgICAgY29uc3QgYnJlYWtwb2ludCA9IHRoaXMubnpCcmVha3BvaW50O1xuICAgICAgICAgIGlmIChicmVha3BvaW50KSB7XG4gICAgICAgICAgICBpbk5leHRUaWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5tYXRjaEJyZWFrUG9pbnQgPSAhbWFwW2JyZWFrcG9pbnRdO1xuICAgICAgICAgICAgICB0aGlzLnNldENvbGxhcHNlZCh0aGlzLm1hdGNoQnJlYWtQb2ludCk7XG4gICAgICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuekNvbGxhcHNlZCwgbnpDb2xsYXBzZWRXaWR0aCwgbnpXaWR0aCB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpDb2xsYXBzZWQgfHwgbnpDb2xsYXBzZWRXaWR0aCB8fCBueldpZHRoKSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0eWxlTWFwKCk7XG4gICAgfVxuICAgIGlmIChuekNvbGxhcHNlZCkge1xuICAgICAgdGhpcy51cGRhdGVNZW51SW5saW5lQ29sbGFwc2VkKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlTWVudUlubGluZUNvbGxhcHNlZCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=