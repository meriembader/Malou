/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzCardMetaComponent {
    constructor() {
        this.nzTitle = null;
        this.nzDescription = null;
        this.nzAvatar = null;
    }
}
NzCardMetaComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-card-meta',
                exportAs: 'nzCardMeta',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="ant-card-meta-avatar" *ngIf="nzAvatar">
      <ng-template [ngTemplateOutlet]="nzAvatar"></ng-template>
    </div>
    <div class="ant-card-meta-detail" *ngIf="nzTitle || nzDescription">
      <div class="ant-card-meta-title" *ngIf="nzTitle">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </div>
      <div class="ant-card-meta-description" *ngIf="nzDescription">
        <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
      </div>
    </div>
  `,
                host: {
                    '[class.ant-card-meta]': 'true'
                }
            },] }
];
NzCardMetaComponent.propDecorators = {
    nzTitle: [{ type: Input }],
    nzDescription: [{ type: Input }],
    nzAvatar: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1tZXRhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvY2FyZC8iLCJzb3VyY2VzIjpbImNhcmQtbWV0YS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUF5QjFHLE1BQU0sT0FBTyxtQkFBbUI7SUF2QmhDO1FBd0JXLFlBQU8sR0FBc0MsSUFBSSxDQUFDO1FBQ2xELGtCQUFhLEdBQXNDLElBQUksQ0FBQztRQUN4RCxhQUFRLEdBQTZCLElBQUksQ0FBQztJQUNyRCxDQUFDOzs7WUEzQkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsWUFBWTtnQkFDdEIsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO2dCQUNELElBQUksRUFBRTtvQkFDSix1QkFBdUIsRUFBRSxNQUFNO2lCQUNoQzthQUNGOzs7c0JBRUUsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWNhcmQtbWV0YScsXG4gIGV4cG9ydEFzOiAnbnpDYXJkTWV0YScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LWNhcmQtbWV0YS1hdmF0YXJcIiAqbmdJZj1cIm56QXZhdGFyXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpBdmF0YXJcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtY2FyZC1tZXRhLWRldGFpbFwiICpuZ0lmPVwibnpUaXRsZSB8fCBuekRlc2NyaXB0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LWNhcmQtbWV0YS10aXRsZVwiICpuZ0lmPVwibnpUaXRsZVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpUaXRsZVwiPnt7IG56VGl0bGUgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1jYXJkLW1ldGEtZGVzY3JpcHRpb25cIiAqbmdJZj1cIm56RGVzY3JpcHRpb25cIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56RGVzY3JpcHRpb25cIj57eyBuekRlc2NyaXB0aW9uIH19PC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LWNhcmQtbWV0YV0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekNhcmRNZXRhQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbnpUaXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpEZXNjcmlwdGlvbjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpBdmF0YXI6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG59XG4iXX0=