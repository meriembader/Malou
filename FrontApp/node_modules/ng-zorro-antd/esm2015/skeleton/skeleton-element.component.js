/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Directive, Input } from '@angular/core';
export class NzSkeletonElementDirective {
    constructor() {
        this.nzActive = false;
    }
}
NzSkeletonElementDirective.decorators = [
    { type: Directive, args: [{
                selector: 'nz-skeleton-element',
                host: {
                    '[class.ant-skeleton]': 'true',
                    '[class.ant-skeleton-element]': 'true',
                    '[class.ant-skeleton-active]': 'nzActive'
                }
            },] }
];
NzSkeletonElementDirective.propDecorators = {
    nzActive: [{ type: Input }],
    nzType: [{ type: Input }]
};
export class NzSkeletonElementButtonComponent {
    constructor() {
        this.nzShape = 'default';
        this.nzSize = 'default';
    }
}
NzSkeletonElementButtonComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'nz-skeleton-element[nzType="button"]',
                template: `
    <span
      class="ant-skeleton-button"
      [class.ant-skeleton-button-round]="nzShape === 'round'"
      [class.ant-skeleton-button-circle]="nzShape === 'circle'"
      [class.ant-skeleton-button-lg]="nzSize === 'large'"
      [class.ant-skeleton-button-sm]="nzSize === 'small'"
    ></span>
  `
            },] }
];
NzSkeletonElementButtonComponent.propDecorators = {
    nzShape: [{ type: Input }],
    nzSize: [{ type: Input }]
};
export class NzSkeletonElementAvatarComponent {
    constructor() {
        this.nzShape = 'circle';
        this.nzSize = 'default';
        this.styleMap = {};
    }
    ngOnChanges(changes) {
        if (changes.nzSize && typeof this.nzSize === 'number') {
            const sideLength = `${this.nzSize}px`;
            this.styleMap = { width: sideLength, height: sideLength, 'line-height': sideLength };
        }
        else {
            this.styleMap = {};
        }
    }
}
NzSkeletonElementAvatarComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'nz-skeleton-element[nzType="avatar"]',
                template: `
    <span
      class="ant-skeleton-avatar"
      [class.ant-skeleton-avatar-square]="nzShape === 'square'"
      [class.ant-skeleton-avatar-circle]="nzShape === 'circle'"
      [class.ant-skeleton-avatar-lg]="nzSize === 'large'"
      [class.ant-skeleton-avatar-sm]="nzSize === 'small'"
      [ngStyle]="styleMap"
    ></span>
  `
            },] }
];
NzSkeletonElementAvatarComponent.propDecorators = {
    nzShape: [{ type: Input }],
    nzSize: [{ type: Input }]
};
export class NzSkeletonElementInputComponent {
    constructor() {
        this.nzSize = 'default';
    }
}
NzSkeletonElementInputComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'nz-skeleton-element[nzType="input"]',
                template: `
    <span
      class="ant-skeleton-input"
      [class.ant-skeleton-input-lg]="nzSize === 'large'"
      [class.ant-skeleton-input-sm]="nzSize === 'small'"
    ></span>
  `
            },] }
];
NzSkeletonElementInputComponent.propDecorators = {
    nzSize: [{ type: Input }]
};
export class NzSkeletonElementImageComponent {
}
NzSkeletonElementImageComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'nz-skeleton-element[nzType="image"]',
                template: `
    <span class="ant-skeleton-image">
      <svg class="ant-skeleton-image-svg" viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
          class="ant-skeleton-image-path"
        />
      </svg>
    </span>
  `
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24tZWxlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3NrZWxldG9uLyIsInNvdXJjZXMiOlsic2tlbGV0b24tZWxlbWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQWlCL0csTUFBTSxPQUFPLDBCQUEwQjtJQVJ2QztRQVNXLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFFckMsQ0FBQzs7O1lBWEEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLElBQUksRUFBRTtvQkFDSixzQkFBc0IsRUFBRSxNQUFNO29CQUM5Qiw4QkFBOEIsRUFBRSxNQUFNO29CQUN0Qyw2QkFBNkIsRUFBRSxVQUFVO2lCQUMxQzthQUNGOzs7dUJBRUUsS0FBSztxQkFDTCxLQUFLOztBQWdCUixNQUFNLE9BQU8sZ0NBQWdDO0lBYjdDO1FBY1csWUFBTyxHQUEwQixTQUFTLENBQUM7UUFDM0MsV0FBTSxHQUF5QixTQUFTLENBQUM7SUFDcEQsQ0FBQzs7O1lBaEJBLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsUUFBUSxFQUFFOzs7Ozs7OztHQVFUO2FBQ0Y7OztzQkFFRSxLQUFLO3FCQUNMLEtBQUs7O0FBaUJSLE1BQU0sT0FBTyxnQ0FBZ0M7SUFkN0M7UUFlVyxZQUFPLEdBQTBCLFFBQVEsQ0FBQztRQUMxQyxXQUFNLEdBQXlCLFNBQVMsQ0FBQztRQUVsRCxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBVWhCLENBQUM7SUFSQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDckQsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUM7U0FDdEY7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzs7O1lBM0JGLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDthQUNGOzs7c0JBRUUsS0FBSztxQkFDTCxLQUFLOztBQXlCUixNQUFNLE9BQU8sK0JBQStCO0lBWDVDO1FBWVcsV0FBTSxHQUF3QixTQUFTLENBQUM7SUFDbkQsQ0FBQzs7O1lBYkEsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUUscUNBQXFDO2dCQUMvQyxRQUFRLEVBQUU7Ozs7OztHQU1UO2FBQ0Y7OztxQkFFRSxLQUFLOztBQWlCUixNQUFNLE9BQU8sK0JBQStCOzs7WUFkM0MsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUUscUNBQXFDO2dCQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBEaXJlY3RpdmUsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE56U2tlbGV0b25BdmF0YXJTaGFwZSxcbiAgTnpTa2VsZXRvbkF2YXRhclNpemUsXG4gIE56U2tlbGV0b25CdXR0b25TaGFwZSxcbiAgTnpTa2VsZXRvbkJ1dHRvblNpemUsXG4gIE56U2tlbGV0b25JbnB1dFNpemVcbn0gZnJvbSAnLi9za2VsZXRvbi50eXBlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbnotc2tlbGV0b24tZWxlbWVudCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1za2VsZXRvbl0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbnQtc2tlbGV0b24tZWxlbWVudF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbnQtc2tlbGV0b24tYWN0aXZlXSc6ICduekFjdGl2ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelNrZWxldG9uRWxlbWVudERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIG56QWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56VHlwZSE6ICdidXR0b24nIHwgJ2lucHV0JyB8ICdhdmF0YXInIHwgJ2ltYWdlJztcbn1cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ256LXNrZWxldG9uLWVsZW1lbnRbbnpUeXBlPVwiYnV0dG9uXCJdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhblxuICAgICAgY2xhc3M9XCJhbnQtc2tlbGV0b24tYnV0dG9uXCJcbiAgICAgIFtjbGFzcy5hbnQtc2tlbGV0b24tYnV0dG9uLXJvdW5kXT1cIm56U2hhcGUgPT09ICdyb3VuZCdcIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1idXR0b24tY2lyY2xlXT1cIm56U2hhcGUgPT09ICdjaXJjbGUnXCJcbiAgICAgIFtjbGFzcy5hbnQtc2tlbGV0b24tYnV0dG9uLWxnXT1cIm56U2l6ZSA9PT0gJ2xhcmdlJ1wiXG4gICAgICBbY2xhc3MuYW50LXNrZWxldG9uLWJ1dHRvbi1zbV09XCJuelNpemUgPT09ICdzbWFsbCdcIlxuICAgID48L3NwYW4+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpTa2VsZXRvbkVsZW1lbnRCdXR0b25Db21wb25lbnQge1xuICBASW5wdXQoKSBuelNoYXBlOiBOelNrZWxldG9uQnV0dG9uU2hhcGUgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIG56U2l6ZTogTnpTa2VsZXRvbkJ1dHRvblNpemUgPSAnZGVmYXVsdCc7XG59XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICduei1za2VsZXRvbi1lbGVtZW50W256VHlwZT1cImF2YXRhclwiXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW5cbiAgICAgIGNsYXNzPVwiYW50LXNrZWxldG9uLWF2YXRhclwiXG4gICAgICBbY2xhc3MuYW50LXNrZWxldG9uLWF2YXRhci1zcXVhcmVdPVwibnpTaGFwZSA9PT0gJ3NxdWFyZSdcIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1hdmF0YXItY2lyY2xlXT1cIm56U2hhcGUgPT09ICdjaXJjbGUnXCJcbiAgICAgIFtjbGFzcy5hbnQtc2tlbGV0b24tYXZhdGFyLWxnXT1cIm56U2l6ZSA9PT0gJ2xhcmdlJ1wiXG4gICAgICBbY2xhc3MuYW50LXNrZWxldG9uLWF2YXRhci1zbV09XCJuelNpemUgPT09ICdzbWFsbCdcIlxuICAgICAgW25nU3R5bGVdPVwic3R5bGVNYXBcIlxuICAgID48L3NwYW4+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpTa2VsZXRvbkVsZW1lbnRBdmF0YXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBuelNoYXBlOiBOelNrZWxldG9uQXZhdGFyU2hhcGUgPSAnY2lyY2xlJztcbiAgQElucHV0KCkgbnpTaXplOiBOelNrZWxldG9uQXZhdGFyU2l6ZSA9ICdkZWZhdWx0JztcblxuICBzdHlsZU1hcCA9IHt9O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5uelNpemUgJiYgdHlwZW9mIHRoaXMubnpTaXplID09PSAnbnVtYmVyJykge1xuICAgICAgY29uc3Qgc2lkZUxlbmd0aCA9IGAke3RoaXMubnpTaXplfXB4YDtcbiAgICAgIHRoaXMuc3R5bGVNYXAgPSB7IHdpZHRoOiBzaWRlTGVuZ3RoLCBoZWlnaHQ6IHNpZGVMZW5ndGgsICdsaW5lLWhlaWdodCc6IHNpZGVMZW5ndGggfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdHlsZU1hcCA9IHt9O1xuICAgIH1cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnbnotc2tlbGV0b24tZWxlbWVudFtuelR5cGU9XCJpbnB1dFwiXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW5cbiAgICAgIGNsYXNzPVwiYW50LXNrZWxldG9uLWlucHV0XCJcbiAgICAgIFtjbGFzcy5hbnQtc2tlbGV0b24taW5wdXQtbGddPVwibnpTaXplID09PSAnbGFyZ2UnXCJcbiAgICAgIFtjbGFzcy5hbnQtc2tlbGV0b24taW5wdXQtc21dPVwibnpTaXplID09PSAnc21hbGwnXCJcbiAgICA+PC9zcGFuPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56U2tlbGV0b25FbGVtZW50SW5wdXRDb21wb25lbnQge1xuICBASW5wdXQoKSBuelNpemU6IE56U2tlbGV0b25JbnB1dFNpemUgPSAnZGVmYXVsdCc7XG59XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICduei1za2VsZXRvbi1lbGVtZW50W256VHlwZT1cImltYWdlXCJdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBjbGFzcz1cImFudC1za2VsZXRvbi1pbWFnZVwiPlxuICAgICAgPHN2ZyBjbGFzcz1cImFudC1za2VsZXRvbi1pbWFnZS1zdmdcIiB2aWV3Qm94PVwiMCAwIDEwOTggMTAyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICBkPVwiTTM2NS43MTQyODYgMzI5LjE0Mjg1N3EwIDQ1LjcxNDI4Ni0zMi4wMzY1NzEgNzcuNjc3NzE0dC03Ny42Nzc3MTQgMzIuMDM2NTcxLTc3LjY3NzcxNC0zMi4wMzY1NzEtMzIuMDM2NTcxLTc3LjY3NzcxNCAzMi4wMzY1NzEtNzcuNjc3NzE0IDc3LjY3NzcxNC0zMi4wMzY1NzEgNzcuNjc3NzE0IDMyLjAzNjU3MSAzMi4wMzY1NzEgNzcuNjc3NzE0ek05NTAuODU3MTQzIDU0OC41NzE0MjlsMCAyNTYtODA0LjU3MTQyOSAwIDAtMTA5LjcxNDI4NiAxODIuODU3MTQzLTE4Mi44NTcxNDMgOTEuNDI4NTcxIDkxLjQyODU3MSAyOTIuNTcxNDI5LTI5Mi41NzE0Mjl6TTEwMDUuNzE0Mjg2IDE0Ni4yODU3MTRsLTkxNC4yODU3MTQgMHEtNy40NjA1NzEgMC0xMi44NzMxNDMgNS40MTI1NzF0LTUuNDEyNTcxIDEyLjg3MzE0M2wwIDY5NC44NTcxNDNxMCA3LjQ2MDU3MSA1LjQxMjU3MSAxMi44NzMxNDN0MTIuODczMTQzIDUuNDEyNTcxbDkxNC4yODU3MTQgMHE3LjQ2MDU3MSAwIDEyLjg3MzE0My01LjQxMjU3MXQ1LjQxMjU3MS0xMi44NzMxNDNsMC02OTQuODU3MTQzcTAtNy40NjA1NzEtNS40MTI1NzEtMTIuODczMTQzdC0xMi44NzMxNDMtNS40MTI1NzF6TTEwOTcuMTQyODU3IDE2NC41NzE0MjlsMCA2OTQuODU3MTQzcTAgMzcuNzQxNzE0LTI2Ljg0MzQyOSA2NC41ODUxNDN0LTY0LjU4NTE0MyAyNi44NDM0MjlsLTkxNC4yODU3MTQgMHEtMzcuNzQxNzE0IDAtNjQuNTg1MTQzLTI2Ljg0MzQyOXQtMjYuODQzNDI5LTY0LjU4NTE0M2wwLTY5NC44NTcxNDNxMC0zNy43NDE3MTQgMjYuODQzNDI5LTY0LjU4NTE0M3Q2NC41ODUxNDMtMjYuODQzNDI5bDkxNC4yODU3MTQgMHEzNy43NDE3MTQgMCA2NC41ODUxNDMgMjYuODQzNDI5dDI2Ljg0MzQyOSA2NC41ODUxNDN6XCJcbiAgICAgICAgICBjbGFzcz1cImFudC1za2VsZXRvbi1pbWFnZS1wYXRoXCJcbiAgICAgICAgLz5cbiAgICAgIDwvc3ZnPlxuICAgIDwvc3Bhbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelNrZWxldG9uRWxlbWVudEltYWdlQ29tcG9uZW50IHt9XG4iXX0=