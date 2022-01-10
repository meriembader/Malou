/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, HostBinding, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzListItemExtraComponent } from './list-item-cell';
import { NzListComponent } from './list.component';
export class NzListItemComponent {
    constructor(elementRef, renderer, parentComp, cdr) {
        this.parentComp = parentComp;
        this.cdr = cdr;
        this.nzActions = [];
        this.nzExtra = null;
        this.nzNoFlex = false;
        renderer.addClass(elementRef.nativeElement, 'ant-list-item');
    }
    get isVerticalAndExtra() {
        return this.itemLayout === 'vertical' && (!!this.listItemExtraDirective || !!this.nzExtra);
    }
    ngAfterViewInit() {
        this.itemLayout$ = this.parentComp.itemLayoutNotify$.subscribe(val => {
            this.itemLayout = val;
            this.cdr.detectChanges();
        });
    }
    ngOnDestroy() {
        if (this.itemLayout$) {
            this.itemLayout$.unsubscribe();
        }
    }
}
NzListItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list-item, [nz-list-item]',
                exportAs: 'nzListItem',
                template: `
    <ng-template #actionsTpl>
      <ul nz-list-item-actions *ngIf="nzActions && nzActions.length > 0" [nzActions]="nzActions"></ul>
      <ng-content select="nz-list-item-actions, [nz-list-item-actions]"></ng-content>
    </ng-template>
    <ng-template #contentTpl>
      <ng-content select="nz-list-item-meta, [nz-list-item-meta]"></ng-content>
      <ng-content></ng-content>
      <ng-container *ngIf="nzContent">
        <ng-container *nzStringTemplateOutlet="nzContent">{{ nzContent }}</ng-container>
      </ng-container>
    </ng-template>
    <ng-template #extraTpl>
      <ng-content select="nz-list-item-extra, [nz-list-item-extra]"></ng-content>
    </ng-template>
    <ng-template #simpleTpl>
      <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="nzExtra"></ng-template>
      <ng-template [ngTemplateOutlet]="extraTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
    </ng-template>

    <ng-container *ngIf="isVerticalAndExtra; else simpleTpl">
      <div class="ant-list-item-main">
        <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
        <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
      </div>
      <nz-list-item-extra *ngIf="nzExtra">
        <ng-template [ngTemplateOutlet]="nzExtra"></ng-template>
      </nz-list-item-extra>
      <ng-template [ngTemplateOutlet]="extraTpl"></ng-template>
    </ng-container>
  `,
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NzListItemComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NzListComponent },
    { type: ChangeDetectorRef }
];
NzListItemComponent.propDecorators = {
    nzActions: [{ type: Input }],
    nzContent: [{ type: Input }],
    nzExtra: [{ type: Input }],
    nzNoFlex: [{ type: Input }, { type: HostBinding, args: ['class.ant-list-item-no-flex',] }],
    listItemExtraDirective: [{ type: ContentChild, args: [NzListItemExtraComponent,] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzListItemComponent.prototype, "nzNoFlex", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvbGlzdC8iLCJzb3VyY2VzIjpbImxpc3QtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFdBQVcsRUFDWCxLQUFLLEVBRUwsU0FBUyxFQUVULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBMENuRCxNQUFNLE9BQU8sbUJBQW1CO0lBaUI5QixZQUFZLFVBQXNCLEVBQUUsUUFBbUIsRUFBVSxVQUEyQixFQUFVLEdBQXNCO1FBQTNELGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFkbkgsY0FBUyxHQUE2QixFQUFFLENBQUM7UUFFekMsWUFBTyxHQUE2QixJQUFJLENBQUM7UUFDbUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQVk3RixRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQU5ELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQU1ELGVBQWU7UUFDYixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ25FLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7O1lBeEVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsOEJBQThCO2dCQUN4QyxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDVDtnQkFDRCxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQXREQyxVQUFVO1lBSVYsU0FBUztZQVNGLGVBQWU7WUFoQnRCLGlCQUFpQjs7O3dCQTZEaEIsS0FBSzt3QkFDTCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSyxZQUFvQixXQUFXLFNBQUMsNkJBQTZCO3FDQUVsRSxZQUFZLFNBQUMsd0JBQXdCOztBQUYrQjtJQUEzRCxZQUFZLEVBQUU7O3FEQUF1RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnpEaXJlY3Rpb25WSFR5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE56TGlzdEl0ZW1FeHRyYUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1pdGVtLWNlbGwnO1xuaW1wb3J0IHsgTnpMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9saXN0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWxpc3QtaXRlbSwgW256LWxpc3QtaXRlbV0nLFxuICBleHBvcnRBczogJ256TGlzdEl0ZW0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjYWN0aW9uc1RwbD5cbiAgICAgIDx1bCBuei1saXN0LWl0ZW0tYWN0aW9ucyAqbmdJZj1cIm56QWN0aW9ucyAmJiBuekFjdGlvbnMubGVuZ3RoID4gMFwiIFtuekFjdGlvbnNdPVwibnpBY3Rpb25zXCI+PC91bD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWxpc3QtaXRlbS1hY3Rpb25zLCBbbnotbGlzdC1pdGVtLWFjdGlvbnNdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNjb250ZW50VHBsPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotbGlzdC1pdGVtLW1ldGEsIFtuei1saXN0LWl0ZW0tbWV0YV1cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpDb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekNvbnRlbnRcIj57eyBuekNvbnRlbnQgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNleHRyYVRwbD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWxpc3QtaXRlbS1leHRyYSwgW256LWxpc3QtaXRlbS1leHRyYV1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI3NpbXBsZVRwbD5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50VHBsXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJuekV4dHJhXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJleHRyYVRwbFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiYWN0aW9uc1RwbFwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1ZlcnRpY2FsQW5kRXh0cmE7IGVsc2Ugc2ltcGxlVHBsXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LWxpc3QtaXRlbS1tYWluXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50VHBsXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImFjdGlvbnNUcGxcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG4gICAgICA8bnotbGlzdC1pdGVtLWV4dHJhICpuZ0lmPVwibnpFeHRyYVwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpFeHRyYVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L256LWxpc3QtaXRlbS1leHRyYT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJleHRyYVRwbFwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOekxpc3RJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Tm9GbGV4OiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpBY3Rpb25zOiBBcnJheTxUZW1wbGF0ZVJlZjx2b2lkPj4gPSBbXTtcbiAgQElucHV0KCkgbnpDb250ZW50Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56RXh0cmE6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1saXN0LWl0ZW0tbm8tZmxleCcpIG56Tm9GbGV4OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQENvbnRlbnRDaGlsZChOekxpc3RJdGVtRXh0cmFDb21wb25lbnQpIGxpc3RJdGVtRXh0cmFEaXJlY3RpdmU/OiBOekxpc3RJdGVtRXh0cmFDb21wb25lbnQ7XG5cbiAgcHJpdmF0ZSBpdGVtTGF5b3V0PzogTnpEaXJlY3Rpb25WSFR5cGU7XG4gIHByaXZhdGUgaXRlbUxheW91dCQ/OiBTdWJzY3JpcHRpb247XG5cbiAgZ2V0IGlzVmVydGljYWxBbmRFeHRyYSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtTGF5b3V0ID09PSAndmVydGljYWwnICYmICghIXRoaXMubGlzdEl0ZW1FeHRyYURpcmVjdGl2ZSB8fCAhIXRoaXMubnpFeHRyYSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHBhcmVudENvbXA6IE56TGlzdENvbXBvbmVudCwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LWxpc3QtaXRlbScpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbUxheW91dCQgPSB0aGlzLnBhcmVudENvbXAuaXRlbUxheW91dE5vdGlmeSQuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICB0aGlzLml0ZW1MYXlvdXQgPSB2YWw7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pdGVtTGF5b3V0JCkge1xuICAgICAgdGhpcy5pdGVtTGF5b3V0JC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19