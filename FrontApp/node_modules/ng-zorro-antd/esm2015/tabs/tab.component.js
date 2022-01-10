/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Inject, InjectionToken, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTabLinkDirective, NzTabLinkTemplateDirective } from './tab-link.directive';
import { NzTabDirective } from './tab.directive';
/**
 * Used to provide a tab set to a tab without causing a circular dependency.
 */
export const NZ_TAB_SET = new InjectionToken('NZ_TAB_SET');
export class NzTabComponent {
    constructor(closestTabSet) {
        this.closestTabSet = closestTabSet;
        this.nzTitle = '';
        this.nzClosable = false;
        this.nzCloseIcon = 'close';
        this.nzDisabled = false;
        this.nzForceRender = false;
        this.nzSelect = new EventEmitter();
        this.nzDeselect = new EventEmitter();
        this.nzClick = new EventEmitter();
        this.nzContextmenu = new EventEmitter();
        this.template = null;
        this.isActive = false;
        this.position = null;
        this.origin = null;
        this.stateChanges = new Subject();
    }
    get content() {
        return this.template || this.contentTemplate;
    }
    get label() {
        var _a;
        return this.nzTitle || ((_a = this.nzTabLinkTemplateDirective) === null || _a === void 0 ? void 0 : _a.templateRef) || this.tabLinkTemplate;
    }
    ngOnChanges(changes) {
        const { nzTitle, nzDisabled, nzForceRender } = changes;
        if (nzTitle || nzDisabled || nzForceRender) {
            this.stateChanges.next();
        }
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    ngOnInit() { }
}
NzTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tab',
                exportAs: 'nzTab',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-template #tabLinkTemplate>
      <ng-content select="[nz-tab-link]"></ng-content>
    </ng-template>
    <ng-template #contentTemplate><ng-content></ng-content></ng-template>
  `
            },] }
];
NzTabComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NZ_TAB_SET,] }] }
];
NzTabComponent.propDecorators = {
    nzTitle: [{ type: Input }],
    nzClosable: [{ type: Input }],
    nzCloseIcon: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzForceRender: [{ type: Input }],
    nzSelect: [{ type: Output }],
    nzDeselect: [{ type: Output }],
    nzClick: [{ type: Output }],
    nzContextmenu: [{ type: Output }],
    tabLinkTemplate: [{ type: ViewChild, args: ['tabLinkTemplate', { static: true },] }],
    nzTabLinkTemplateDirective: [{ type: ContentChild, args: [NzTabLinkTemplateDirective, { static: false },] }],
    template: [{ type: ContentChild, args: [NzTabDirective, { static: false, read: TemplateRef },] }],
    linkDirective: [{ type: ContentChild, args: [NzTabLinkDirective, { static: false },] }],
    contentTemplate: [{ type: ViewChild, args: ['contentTemplate', { static: true },] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTabComponent.prototype, "nzClosable", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTabComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTabComponent.prototype, "nzForceRender", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdGFicy8iLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBSUwsTUFBTSxFQUVOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBWSxZQUFZLENBQUMsQ0FBQztBQWV0RSxNQUFNLE9BQU8sY0FBYztJQXNDekIsWUFBdUMsYUFBd0I7UUFBeEIsa0JBQWEsR0FBYixhQUFhLENBQVc7UUFqQ3RELFlBQU8sR0FBNkMsRUFBRSxDQUFDO1FBQ3ZDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkMsZ0JBQVcsR0FBb0MsT0FBTyxDQUFDO1FBQ3ZDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDcEMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDdEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbkMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBUUUsYUFBUSxHQUE2QixJQUFJLENBQUM7UUFJOUcsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixhQUFRLEdBQWtCLElBQUksQ0FBQztRQUMvQixXQUFNLEdBQWtCLElBQUksQ0FBQztRQUNwQixpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFVc0IsQ0FBQztJQVJuRSxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsSUFBSSxLQUFLOztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sV0FBSSxJQUFJLENBQUMsMEJBQTBCLDBDQUFFLFdBQVcsQ0FBQSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUYsQ0FBQztJQUlELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDdkQsSUFBSSxPQUFPLElBQUksVUFBVSxJQUFJLGFBQWEsRUFBRTtZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRLEtBQVUsQ0FBQzs7O1lBaEVwQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7R0FLVDthQUNGOzs7NENBdUNjLE1BQU0sU0FBQyxVQUFVOzs7c0JBakM3QixLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsTUFBTTt5QkFDTixNQUFNO3NCQUNOLE1BQU07NEJBQ04sTUFBTTs4QkFNTixTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3lDQUM3QyxZQUFZLFNBQUMsMEJBQTBCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3VCQUMxRCxZQUFZLFNBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOzRCQUNqRSxZQUFZLFNBQUMsa0JBQWtCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzhCQUNsRCxTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztBQWpCckI7SUFBZixZQUFZLEVBQUU7O2tEQUFvQjtBQUVuQjtJQUFmLFlBQVksRUFBRTs7a0RBQW9CO0FBQ25CO0lBQWYsWUFBWSxFQUFFOztxREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJUZW1wbGF0ZUNvbnRleHQgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTnpUYWJMaW5rRGlyZWN0aXZlLCBOelRhYkxpbmtUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiLWxpbmsuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56VGFiRGlyZWN0aXZlIH0gZnJvbSAnLi90YWIuZGlyZWN0aXZlJztcblxuLyoqXG4gKiBVc2VkIHRvIHByb3ZpZGUgYSB0YWIgc2V0IHRvIGEgdGFiIHdpdGhvdXQgY2F1c2luZyBhIGNpcmN1bGFyIGRlcGVuZGVuY3kuXG4gKi9cbmV4cG9ydCBjb25zdCBOWl9UQUJfU0VUID0gbmV3IEluamVjdGlvblRva2VuPE56U2FmZUFueT4oJ05aX1RBQl9TRVQnKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdGFiJyxcbiAgZXhwb3J0QXM6ICduelRhYicsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3RhYkxpbmtUZW1wbGF0ZT5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltuei10YWItbGlua11cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnRUZW1wbGF0ZT48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelRhYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpDbG9zYWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpGb3JjZVJlbmRlcjogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIG56VGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPFRhYlRlbXBsYXRlQ29udGV4dD4gPSAnJztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q2xvc2FibGUgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpDbG9zZUljb246IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gPSAnY2xvc2UnO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpGb3JjZVJlbmRlciA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekRlc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFdpbGwgYmUgcmVtb3ZlZCBpbiAxMS4wLjBcbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMS4wLjBcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3RhYkxpbmtUZW1wbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIHRhYkxpbmtUZW1wbGF0ZSE6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBAQ29udGVudENoaWxkKE56VGFiTGlua1RlbXBsYXRlRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSkgbnpUYWJMaW5rVGVtcGxhdGVEaXJlY3RpdmUhOiBOelRhYkxpbmtUZW1wbGF0ZURpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChOelRhYkRpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBUZW1wbGF0ZVJlZiB9KSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQENvbnRlbnRDaGlsZChOelRhYkxpbmtEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KSBsaW5rRGlyZWN0aXZlITogTnpUYWJMaW5rRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKCdjb250ZW50VGVtcGxhdGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250ZW50VGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xuXG4gIGlzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHBvc2l0aW9uOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgb3JpZ2luOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBnZXQgY29udGVudCgpOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHtcbiAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZSB8fCB0aGlzLmNvbnRlbnRUZW1wbGF0ZTtcbiAgfVxuXG4gIGdldCBsYWJlbCgpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHtcbiAgICByZXR1cm4gdGhpcy5uelRpdGxlIHx8IHRoaXMubnpUYWJMaW5rVGVtcGxhdGVEaXJlY3RpdmU/LnRlbXBsYXRlUmVmIHx8IHRoaXMudGFiTGlua1RlbXBsYXRlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChOWl9UQUJfU0VUKSBwdWJsaWMgY2xvc2VzdFRhYlNldDogTnpTYWZlQW55KSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56VGl0bGUsIG56RGlzYWJsZWQsIG56Rm9yY2VSZW5kZXIgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56VGl0bGUgfHwgbnpEaXNhYmxlZCB8fCBuekZvcmNlUmVuZGVyKSB7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cbn1cbiJdfQ==