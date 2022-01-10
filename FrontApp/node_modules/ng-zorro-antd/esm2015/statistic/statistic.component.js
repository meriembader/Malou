/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
export class NzStatisticComponent {
    constructor() {
        this.nzValueStyle = {};
    }
}
NzStatisticComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-statistic',
                exportAs: 'nzStatistic',
                template: `
    <div class="ant-statistic">
      <div class="ant-statistic-title">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </div>
      <div class="ant-statistic-content" [ngStyle]="nzValueStyle">
        <span *ngIf="nzPrefix" class="ant-statistic-content-prefix">
          <ng-container *nzStringTemplateOutlet="nzPrefix">{{ nzPrefix }}</ng-container>
        </span>
        <nz-statistic-number [nzValue]="nzValue" [nzValueTemplate]="nzValueTemplate"> </nz-statistic-number>
        <span *ngIf="nzSuffix" class="ant-statistic-content-suffix">
          <ng-container *nzStringTemplateOutlet="nzSuffix">{{ nzSuffix }}</ng-container>
        </span>
      </div>
    </div>
  `
            },] }
];
NzStatisticComponent.propDecorators = {
    nzPrefix: [{ type: Input }],
    nzSuffix: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzValue: [{ type: Input }],
    nzValueStyle: [{ type: Input }],
    nzValueTemplate: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGlzdGljLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvc3RhdGlzdGljLyIsInNvdXJjZXMiOlsic3RhdGlzdGljLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUEwQjFHLE1BQU0sT0FBTyxvQkFBb0I7SUF0QmpDO1FBMkJXLGlCQUFZLEdBQXFCLEVBQUUsQ0FBQztJQUUvQyxDQUFDOzs7WUE3QkEsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO2FBQ0Y7Ozt1QkFFRSxLQUFLO3VCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nU3R5bGVJbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpTdGF0aXN0aWNWYWx1ZVR5cGUgfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotc3RhdGlzdGljJyxcbiAgZXhwb3J0QXM6ICduelN0YXRpc3RpYycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1zdGF0aXN0aWNcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtc3RhdGlzdGljLXRpdGxlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+e3sgbnpUaXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LXN0YXRpc3RpYy1jb250ZW50XCIgW25nU3R5bGVdPVwibnpWYWx1ZVN0eWxlXCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwibnpQcmVmaXhcIiBjbGFzcz1cImFudC1zdGF0aXN0aWMtY29udGVudC1wcmVmaXhcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpQcmVmaXhcIj57eyBuelByZWZpeCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxuei1zdGF0aXN0aWMtbnVtYmVyIFtuelZhbHVlXT1cIm56VmFsdWVcIiBbbnpWYWx1ZVRlbXBsYXRlXT1cIm56VmFsdWVUZW1wbGF0ZVwiPiA8L256LXN0YXRpc3RpYy1udW1iZXI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwibnpTdWZmaXhcIiBjbGFzcz1cImFudC1zdGF0aXN0aWMtY29udGVudC1zdWZmaXhcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpTdWZmaXhcIj57eyBuelN1ZmZpeCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelN0YXRpc3RpY0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG56UHJlZml4Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56U3VmZml4Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56VGl0bGU/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpWYWx1ZT86IE56U3RhdGlzdGljVmFsdWVUeXBlO1xuICBASW5wdXQoKSBuelZhbHVlU3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgPSB7fTtcbiAgQElucHV0KCkgbnpWYWx1ZVRlbXBsYXRlPzogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IE56U3RhdGlzdGljVmFsdWVUeXBlIH0+O1xufVxuIl19