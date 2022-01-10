/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { merge, Subject } from 'rxjs';
import { flatMap, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NzInputDirective } from './input.directive';
export class NzInputGroupWhitSuffixOrPrefixDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
NzInputGroupWhitSuffixOrPrefixDirective.decorators = [
    { type: Directive, args: [{
                selector: `nz-input-group[nzSuffix], nz-input-group[nzPrefix]`
            },] }
];
NzInputGroupWhitSuffixOrPrefixDirective.ctorParameters = () => [
    { type: ElementRef }
];
export class NzInputGroupComponent {
    constructor(focusMonitor, elementRef, cdr) {
        this.focusMonitor = focusMonitor;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.nzAddOnBeforeIcon = null;
        this.nzAddOnAfterIcon = null;
        this.nzPrefixIcon = null;
        this.nzSuffixIcon = null;
        this.nzSize = 'default';
        this.nzSearch = false;
        this.nzCompact = false;
        this.isLarge = false;
        this.isSmall = false;
        this.isAffix = false;
        this.isAddOn = false;
        this.focused = false;
        this.disabled = false;
        this.destroy$ = new Subject();
    }
    updateChildrenInputSize() {
        if (this.listOfNzInputDirective) {
            this.listOfNzInputDirective.forEach(item => (item.nzSize = this.nzSize));
        }
    }
    ngOnInit() {
        this.focusMonitor
            .monitor(this.elementRef, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(focusOrigin => {
            this.focused = !!focusOrigin;
            this.cdr.markForCheck();
        });
    }
    ngAfterContentInit() {
        this.updateChildrenInputSize();
        const listOfInputChange$ = this.listOfNzInputDirective.changes.pipe(startWith(this.listOfNzInputDirective));
        listOfInputChange$
            .pipe(switchMap(list => {
            return merge(...[listOfInputChange$, ...list.map((input) => input.disabled$)]);
        }), flatMap(() => listOfInputChange$), map(list => list.some((input) => input.disabled)), takeUntil(this.destroy$))
            .subscribe(disabled => {
            this.disabled = disabled;
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzSize, nzSuffix, nzPrefix, nzPrefixIcon, nzSuffixIcon, nzAddOnAfter, nzAddOnBefore, nzAddOnAfterIcon, nzAddOnBeforeIcon } = changes;
        if (nzSize) {
            this.updateChildrenInputSize();
            this.isLarge = this.nzSize === 'large';
            this.isSmall = this.nzSize === 'small';
        }
        if (nzSuffix || nzPrefix || nzPrefixIcon || nzSuffixIcon) {
            this.isAffix = !!(this.nzSuffix || this.nzPrefix || this.nzPrefixIcon || this.nzSuffixIcon);
        }
        if (nzAddOnAfter || nzAddOnBefore || nzAddOnAfterIcon || nzAddOnBeforeIcon) {
            this.isAddOn = !!(this.nzAddOnAfter || this.nzAddOnBefore || this.nzAddOnAfterIcon || this.nzAddOnBeforeIcon);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzInputGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-input-group',
                exportAs: 'nzInputGroup',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <span class="ant-input-wrapper ant-input-group" *ngIf="isAddOn; else noAddOnTemplate">
      <span
        *ngIf="nzAddOnBefore || nzAddOnBeforeIcon"
        nz-input-group-slot
        type="addon"
        [icon]="nzAddOnBeforeIcon"
        [template]="nzAddOnBefore"
      >
      </span>
      <span
        *ngIf="isAffix; else contentTemplate"
        class="ant-input-affix-wrapper"
        [class.ant-input-affix-wrapper-sm]="isSmall"
        [class.ant-input-affix-wrapper-lg]="isLarge"
      >
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </span>
      <span
        *ngIf="nzAddOnAfter || nzAddOnAfterIcon"
        nz-input-group-slot
        type="addon"
        [icon]="nzAddOnAfterIcon"
        [template]="nzAddOnAfter"
      ></span>
    </span>
    <ng-template #noAddOnTemplate>
      <ng-template [ngIf]="isAffix" [ngIfElse]="contentTemplate">
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </ng-template>
    </ng-template>
    <ng-template #affixTemplate>
      <span *ngIf="nzPrefix || nzPrefixIcon" nz-input-group-slot type="prefix" [icon]="nzPrefixIcon" [template]="nzPrefix"></span>
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      <span *ngIf="nzSuffix || nzSuffixIcon" nz-input-group-slot type="suffix" [icon]="nzSuffixIcon" [template]="nzSuffix"></span>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                host: {
                    '[class.ant-input-group-compact]': `nzCompact`,
                    '[class.ant-input-search-enter-button]': `nzSearch`,
                    '[class.ant-input-search]': `nzSearch`,
                    '[class.ant-input-search-sm]': `nzSearch && isSmall`,
                    '[class.ant-input-search-large]': `nzSearch && isLarge`,
                    '[class.ant-input-group-wrapper]': `isAddOn`,
                    '[class.ant-input-group-wrapper-lg]': `isAddOn && isLarge`,
                    '[class.ant-input-group-wrapper-sm]': `isAddOn && isSmall`,
                    '[class.ant-input-affix-wrapper]': `isAffix && !isAddOn`,
                    '[class.ant-input-affix-wrapper-focused]': `isAffix && focused`,
                    '[class.ant-input-affix-wrapper-disabled]': `isAffix && disabled`,
                    '[class.ant-input-affix-wrapper-lg]': `isAffix && !isAddOn && isLarge`,
                    '[class.ant-input-affix-wrapper-sm]': `isAffix && !isAddOn && isSmall`,
                    '[class.ant-input-group]': `!isAffix && !isAddOn`,
                    '[class.ant-input-group-lg]': `!isAffix && !isAddOn && isLarge`,
                    '[class.ant-input-group-sm]': `!isAffix && !isAddOn && isSmall`
                }
            },] }
];
NzInputGroupComponent.ctorParameters = () => [
    { type: FocusMonitor },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
NzInputGroupComponent.propDecorators = {
    listOfNzInputDirective: [{ type: ContentChildren, args: [NzInputDirective,] }],
    nzAddOnBeforeIcon: [{ type: Input }],
    nzAddOnAfterIcon: [{ type: Input }],
    nzPrefixIcon: [{ type: Input }],
    nzSuffixIcon: [{ type: Input }],
    nzAddOnBefore: [{ type: Input }],
    nzAddOnAfter: [{ type: Input }],
    nzPrefix: [{ type: Input }],
    nzSuffix: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzSearch: [{ type: Input }],
    nzCompact: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzInputGroupComponent.prototype, "nzSearch", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzInputGroupComponent.prototype, "nzCompact", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9pbnB1dC8iLCJzb3VyY2VzIjpbImlucHV0LWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBSUwsU0FBUyxFQUdULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUtyRCxNQUFNLE9BQU8sdUNBQXVDO0lBQ2xELFlBQW1CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDOzs7WUFKOUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvREFBb0Q7YUFDL0Q7OztZQWxCQyxVQUFVOztBQXdGWixNQUFNLE9BQU8scUJBQXFCO0lBd0JoQyxZQUFvQixZQUEwQixFQUFVLFVBQXNCLEVBQVUsR0FBc0I7UUFBMUYsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFuQnJHLHNCQUFpQixHQUFtQixJQUFJLENBQUM7UUFDekMscUJBQWdCLEdBQW1CLElB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QkFBb0I7b0JBQzFELGlDQUFpQyxFQUFFLHFCQUFxQjtvQkFDeEQseUNBQXlDLEVBQUUsb0JBQW9CO29CQUMvRCwwQ0FBMEMsRUFBRSxxQkFBcUI7b0JBQ2pFLG9DQUFvQyxFQUFFLGdDQUFnQztvQkFDdEUsb0NBQW9DLEVBQUUsZ0NBQWdDO29CQUN0RSx5QkFBeUIsRUFBRSxzQkFBc0I7b0JBQ2pELDRCQUE0QixFQUFFLGlDQUFpQztvQkFDL0QsNEJBQTRCLEVBQUUsaUNBQWlDO2lCQUNoRTthQUNGOzs7WUEvRlEsWUFBWTtZQVFuQixVQUFVO1lBSlYsaUJBQWlCOzs7cUNBZ0doQixlQUFlLFNBQUMsZ0JBQWdCO2dDQUNoQyxLQUFLOytCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3dCQUNMLEtBQUs7O0FBRG1CO0lBQWYsWUFBWSxFQUFFOzt1REFBa0I7QUFDakI7SUFBZixZQUFZLEVBQUU7O3dEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNpemVMRFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmbGF0TWFwLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOeklucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9pbnB1dC5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBuei1pbnB1dC1ncm91cFtuelN1ZmZpeF0sIG56LWlucHV0LWdyb3VwW256UHJlZml4XWBcbn0pXG5leHBvcnQgY2xhc3MgTnpJbnB1dEdyb3VwV2hpdFN1ZmZpeE9yUHJlZml4RGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWlucHV0LWdyb3VwJyxcbiAgZXhwb3J0QXM6ICdueklucHV0R3JvdXAnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gY2xhc3M9XCJhbnQtaW5wdXQtd3JhcHBlciBhbnQtaW5wdXQtZ3JvdXBcIiAqbmdJZj1cImlzQWRkT247IGVsc2Ugbm9BZGRPblRlbXBsYXRlXCI+XG4gICAgICA8c3BhblxuICAgICAgICAqbmdJZj1cIm56QWRkT25CZWZvcmUgfHwgbnpBZGRPbkJlZm9yZUljb25cIlxuICAgICAgICBuei1pbnB1dC1ncm91cC1zbG90XG4gICAgICAgIHR5cGU9XCJhZGRvblwiXG4gICAgICAgIFtpY29uXT1cIm56QWRkT25CZWZvcmVJY29uXCJcbiAgICAgICAgW3RlbXBsYXRlXT1cIm56QWRkT25CZWZvcmVcIlxuICAgICAgPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW5cbiAgICAgICAgKm5nSWY9XCJpc0FmZml4OyBlbHNlIGNvbnRlbnRUZW1wbGF0ZVwiXG4gICAgICAgIGNsYXNzPVwiYW50LWlucHV0LWFmZml4LXdyYXBwZXJcIlxuICAgICAgICBbY2xhc3MuYW50LWlucHV0LWFmZml4LXdyYXBwZXItc21dPVwiaXNTbWFsbFwiXG4gICAgICAgIFtjbGFzcy5hbnQtaW5wdXQtYWZmaXgtd3JhcHBlci1sZ109XCJpc0xhcmdlXCJcbiAgICAgID5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImFmZml4VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW5cbiAgICAgICAgKm5nSWY9XCJuekFkZE9uQWZ0ZXIgfHwgbnpBZGRPbkFmdGVySWNvblwiXG4gICAgICAgIG56LWlucHV0LWdyb3VwLXNsb3RcbiAgICAgICAgdHlwZT1cImFkZG9uXCJcbiAgICAgICAgW2ljb25dPVwibnpBZGRPbkFmdGVySWNvblwiXG4gICAgICAgIFt0ZW1wbGF0ZV09XCJuekFkZE9uQWZ0ZXJcIlxuICAgICAgPjwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gICAgPG5nLXRlbXBsYXRlICNub0FkZE9uVGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNBZmZpeFwiIFtuZ0lmRWxzZV09XCJjb250ZW50VGVtcGxhdGVcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImFmZml4VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjYWZmaXhUZW1wbGF0ZT5cbiAgICAgIDxzcGFuICpuZ0lmPVwibnpQcmVmaXggfHwgbnpQcmVmaXhJY29uXCIgbnotaW5wdXQtZ3JvdXAtc2xvdCB0eXBlPVwicHJlZml4XCIgW2ljb25dPVwibnpQcmVmaXhJY29uXCIgW3RlbXBsYXRlXT1cIm56UHJlZml4XCI+PC9zcGFuPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8c3BhbiAqbmdJZj1cIm56U3VmZml4IHx8IG56U3VmZml4SWNvblwiIG56LWlucHV0LWdyb3VwLXNsb3QgdHlwZT1cInN1ZmZpeFwiIFtpY29uXT1cIm56U3VmZml4SWNvblwiIFt0ZW1wbGF0ZV09XCJuelN1ZmZpeFwiPjwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudFRlbXBsYXRlPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1ncm91cC1jb21wYWN0XSc6IGBuekNvbXBhY3RgLFxuICAgICdbY2xhc3MuYW50LWlucHV0LXNlYXJjaC1lbnRlci1idXR0b25dJzogYG56U2VhcmNoYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1zZWFyY2hdJzogYG56U2VhcmNoYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1zZWFyY2gtc21dJzogYG56U2VhcmNoICYmIGlzU21hbGxgLFxuICAgICdbY2xhc3MuYW50LWlucHV0LXNlYXJjaC1sYXJnZV0nOiBgbnpTZWFyY2ggJiYgaXNMYXJnZWAsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtZ3JvdXAtd3JhcHBlcl0nOiBgaXNBZGRPbmAsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtZ3JvdXAtd3JhcHBlci1sZ10nOiBgaXNBZGRPbiAmJiBpc0xhcmdlYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1ncm91cC13cmFwcGVyLXNtXSc6IGBpc0FkZE9uICYmIGlzU21hbGxgLFxuICAgICdbY2xhc3MuYW50LWlucHV0LWFmZml4LXdyYXBwZXJdJzogYGlzQWZmaXggJiYgIWlzQWRkT25gLFxuICAgICdbY2xhc3MuYW50LWlucHV0LWFmZml4LXdyYXBwZXItZm9jdXNlZF0nOiBgaXNBZmZpeCAmJiBmb2N1c2VkYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1hZmZpeC13cmFwcGVyLWRpc2FibGVkXSc6IGBpc0FmZml4ICYmIGRpc2FibGVkYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1hZmZpeC13cmFwcGVyLWxnXSc6IGBpc0FmZml4ICYmICFpc0FkZE9uICYmIGlzTGFyZ2VgLFxuICAgICdbY2xhc3MuYW50LWlucHV0LWFmZml4LXdyYXBwZXItc21dJzogYGlzQWZmaXggJiYgIWlzQWRkT24gJiYgaXNTbWFsbGAsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtZ3JvdXBdJzogYCFpc0FmZml4ICYmICFpc0FkZE9uYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1ncm91cC1sZ10nOiBgIWlzQWZmaXggJiYgIWlzQWRkT24gJiYgaXNMYXJnZWAsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtZ3JvdXAtc21dJzogYCFpc0FmZml4ICYmICFpc0FkZE9uICYmIGlzU21hbGxgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpJbnB1dEdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNlYXJjaDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpDb21wYWN0OiBCb29sZWFuSW5wdXQ7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOeklucHV0RGlyZWN0aXZlKSBsaXN0T2ZOeklucHV0RGlyZWN0aXZlITogUXVlcnlMaXN0PE56SW5wdXREaXJlY3RpdmU+O1xuICBASW5wdXQoKSBuekFkZE9uQmVmb3JlSWNvbj86IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekFkZE9uQWZ0ZXJJY29uPzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56UHJlZml4SWNvbj86IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelN1ZmZpeEljb24/OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpBZGRPbkJlZm9yZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuekFkZE9uQWZ0ZXI/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpQcmVmaXg/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpTdWZmaXg/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpTaXplOiBOelNpemVMRFNUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTZWFyY2ggPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q29tcGFjdCA9IGZhbHNlO1xuICBpc0xhcmdlID0gZmFsc2U7XG4gIGlzU21hbGwgPSBmYWxzZTtcbiAgaXNBZmZpeCA9IGZhbHNlO1xuICBpc0FkZE9uID0gZmFsc2U7XG4gIGZvY3VzZWQgPSBmYWxzZTtcbiAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvciwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgdXBkYXRlQ2hpbGRyZW5JbnB1dFNpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdE9mTnpJbnB1dERpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5saXN0T2ZOeklucHV0RGlyZWN0aXZlLmZvckVhY2goaXRlbSA9PiAoaXRlbS5uelNpemUgPSB0aGlzLm56U2l6ZSkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNNb25pdG9yXG4gICAgICAubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYsIHRydWUpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKGZvY3VzT3JpZ2luID0+IHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gISFmb2N1c09yaWdpbjtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUNoaWxkcmVuSW5wdXRTaXplKCk7XG4gICAgY29uc3QgbGlzdE9mSW5wdXRDaGFuZ2UkID0gdGhpcy5saXN0T2ZOeklucHV0RGlyZWN0aXZlLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy5saXN0T2ZOeklucHV0RGlyZWN0aXZlKSk7XG4gICAgbGlzdE9mSW5wdXRDaGFuZ2UkXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGxpc3QgPT4ge1xuICAgICAgICAgIHJldHVybiBtZXJnZSguLi5bbGlzdE9mSW5wdXRDaGFuZ2UkLCAuLi5saXN0Lm1hcCgoaW5wdXQ6IE56SW5wdXREaXJlY3RpdmUpID0+IGlucHV0LmRpc2FibGVkJCldKTtcbiAgICAgICAgfSksXG4gICAgICAgIGZsYXRNYXAoKCkgPT4gbGlzdE9mSW5wdXRDaGFuZ2UkKSxcbiAgICAgICAgbWFwKGxpc3QgPT4gbGlzdC5zb21lKChpbnB1dDogTnpJbnB1dERpcmVjdGl2ZSkgPT4gaW5wdXQuZGlzYWJsZWQpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGRpc2FibGVkID0+IHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7XG4gICAgICBuelNpemUsXG4gICAgICBuelN1ZmZpeCxcbiAgICAgIG56UHJlZml4LFxuICAgICAgbnpQcmVmaXhJY29uLFxuICAgICAgbnpTdWZmaXhJY29uLFxuICAgICAgbnpBZGRPbkFmdGVyLFxuICAgICAgbnpBZGRPbkJlZm9yZSxcbiAgICAgIG56QWRkT25BZnRlckljb24sXG4gICAgICBuekFkZE9uQmVmb3JlSWNvblxuICAgIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuelNpemUpIHtcbiAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW5JbnB1dFNpemUoKTtcbiAgICAgIHRoaXMuaXNMYXJnZSA9IHRoaXMubnpTaXplID09PSAnbGFyZ2UnO1xuICAgICAgdGhpcy5pc1NtYWxsID0gdGhpcy5uelNpemUgPT09ICdzbWFsbCc7XG4gICAgfVxuICAgIGlmIChuelN1ZmZpeCB8fCBuelByZWZpeCB8fCBuelByZWZpeEljb24gfHwgbnpTdWZmaXhJY29uKSB7XG4gICAgICB0aGlzLmlzQWZmaXggPSAhISh0aGlzLm56U3VmZml4IHx8IHRoaXMubnpQcmVmaXggfHwgdGhpcy5uelByZWZpeEljb24gfHwgdGhpcy5uelN1ZmZpeEljb24pO1xuICAgIH1cbiAgICBpZiAobnpBZGRPbkFmdGVyIHx8IG56QWRkT25CZWZvcmUgfHwgbnpBZGRPbkFmdGVySWNvbiB8fCBuekFkZE9uQmVmb3JlSWNvbikge1xuICAgICAgdGhpcy5pc0FkZE9uID0gISEodGhpcy5uekFkZE9uQWZ0ZXIgfHwgdGhpcy5uekFkZE9uQmVmb3JlIHx8IHRoaXMubnpBZGRPbkFmdGVySWNvbiB8fCB0aGlzLm56QWRkT25CZWZvcmVJY29uKTtcbiAgICB9XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=