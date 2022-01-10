/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
export class NzBadgeSupComponent {
    constructor() {
        this.nzStyle = null;
        this.nzDot = false;
        this.nzOverflowCount = 99;
        this.disableAnimation = false;
        this.maxNumberArray = [];
        this.countArray = [];
        this.count = 0;
        this.countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    generateMaxNumberArray() {
        this.maxNumberArray = this.nzOverflowCount.toString().split('');
    }
    ngOnInit() {
        this.generateMaxNumberArray();
    }
    ngOnChanges(changes) {
        const { nzOverflowCount, nzCount } = changes;
        if (nzCount && typeof nzCount.currentValue === 'number') {
            this.count = Math.max(0, nzCount.currentValue);
            this.countArray = this.count
                .toString()
                .split('')
                .map(item => +item);
        }
        if (nzOverflowCount) {
            this.generateMaxNumberArray();
        }
    }
}
NzBadgeSupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-badge-sup',
                exportAs: 'nzBadgeSup',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [zoomBadgeMotion],
                template: `
    <ng-container *ngIf="count <= nzOverflowCount; else overflowTemplate">
      <span
        *ngFor="let n of maxNumberArray; let i = index"
        class="ant-scroll-number-only"
        [style.transform]="'translateY(' + -countArray[i] * 100 + '%)'"
      >
        <ng-container *ngIf="!nzDot && countArray[i] !== undefined">
          <p *ngFor="let p of countSingleArray" class="ant-scroll-number-only-unit" [class.current]="p === countArray[i]">
            {{ p }}
          </p>
        </ng-container>
      </span>
    </ng-container>
    <ng-template #overflowTemplate>{{ nzOverflowCount }}+</ng-template>
  `,
                host: {
                    '[@.disabled]': `disableAnimation`,
                    '[@zoomBadgeMotion]': '',
                    '[attr.title]': `nzTitle === null ? '' : nzTitle || nzCount`,
                    '[style]': `nzStyle`,
                    '[style.right.px]': `nzOffset && nzOffset[0] ? -nzOffset[0] : null`,
                    '[style.margin-top.px]': `nzOffset && nzOffset[1] ? nzOffset[1] : null`,
                    '[class.ant-scroll-number]': 'true',
                    '[class.ant-badge-count]': `!nzDot`,
                    '[class.ant-badge-dot]': `nzDot`,
                    '[class.ant-badge-multiple-words]': `countArray.length >= 2`
                }
            },] }
];
NzBadgeSupComponent.propDecorators = {
    nzOffset: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzStyle: [{ type: Input }],
    nzDot: [{ type: Input }],
    nzOverflowCount: [{ type: Input }],
    disableAnimation: [{ type: Input }],
    nzCount: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2Utc3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvYmFkZ2UvIiwic291cmNlcyI6WyJiYWRnZS1zdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFpRCxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1SSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUF1Qy9ELE1BQU0sT0FBTyxtQkFBbUI7SUFwQ2hDO1FBdUNXLFlBQU8sR0FBcUMsSUFBSSxDQUFDO1FBQ2pELFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxvQkFBZSxHQUFXLEVBQUUsQ0FBQztRQUM3QixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFbEMsbUJBQWMsR0FBYSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUMxQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLHFCQUFnQixHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUF1QnBELENBQUM7SUFyQkMsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQzdDLElBQUksT0FBTyxJQUFJLE9BQU8sT0FBTyxDQUFDLFlBQVksS0FBSyxRQUFRLEVBQUU7WUFDdkQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSztpQkFDekIsUUFBUSxFQUFFO2lCQUNWLEtBQUssQ0FBQyxFQUFFLENBQUM7aUJBQ1QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtRQUNELElBQUksZUFBZSxFQUFFO1lBQ25CLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7O1lBckVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsVUFBVSxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO2dCQUNELElBQUksRUFBRTtvQkFDSixjQUFjLEVBQUUsa0JBQWtCO29CQUNsQyxvQkFBb0IsRUFBRSxFQUFFO29CQUN4QixjQUFjLEVBQUUsNENBQTRDO29CQUM1RCxTQUFTLEVBQUUsU0FBUztvQkFDcEIsa0JBQWtCLEVBQUUsK0NBQStDO29CQUNuRSx1QkFBdUIsRUFBRSw4Q0FBOEM7b0JBQ3ZFLDJCQUEyQixFQUFFLE1BQU07b0JBQ25DLHlCQUF5QixFQUFFLFFBQVE7b0JBQ25DLHVCQUF1QixFQUFFLE9BQU87b0JBQ2hDLGtDQUFrQyxFQUFFLHdCQUF3QjtpQkFDN0Q7YUFDRjs7O3VCQUVFLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO29CQUNMLEtBQUs7OEJBQ0wsS0FBSzsrQkFDTCxLQUFLO3NCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgem9vbUJhZGdlTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1iYWRnZS1zdXAnLFxuICBleHBvcnRBczogJ256QmFkZ2VTdXAnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFt6b29tQmFkZ2VNb3Rpb25dLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb3VudCA8PSBuek92ZXJmbG93Q291bnQ7IGVsc2Ugb3ZlcmZsb3dUZW1wbGF0ZVwiPlxuICAgICAgPHNwYW5cbiAgICAgICAgKm5nRm9yPVwibGV0IG4gb2YgbWF4TnVtYmVyQXJyYXk7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICBjbGFzcz1cImFudC1zY3JvbGwtbnVtYmVyLW9ubHlcIlxuICAgICAgICBbc3R5bGUudHJhbnNmb3JtXT1cIid0cmFuc2xhdGVZKCcgKyAtY291bnRBcnJheVtpXSAqIDEwMCArICclKSdcIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW56RG90ICYmIGNvdW50QXJyYXlbaV0gIT09IHVuZGVmaW5lZFwiPlxuICAgICAgICAgIDxwICpuZ0Zvcj1cImxldCBwIG9mIGNvdW50U2luZ2xlQXJyYXlcIiBjbGFzcz1cImFudC1zY3JvbGwtbnVtYmVyLW9ubHktdW5pdFwiIFtjbGFzcy5jdXJyZW50XT1cInAgPT09IGNvdW50QXJyYXlbaV1cIj5cbiAgICAgICAgICAgIHt7IHAgfX1cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy10ZW1wbGF0ZSAjb3ZlcmZsb3dUZW1wbGF0ZT57eyBuek92ZXJmbG93Q291bnQgfX0rPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbQC5kaXNhYmxlZF0nOiBgZGlzYWJsZUFuaW1hdGlvbmAsXG4gICAgJ1tAem9vbUJhZGdlTW90aW9uXSc6ICcnLFxuICAgICdbYXR0ci50aXRsZV0nOiBgbnpUaXRsZSA9PT0gbnVsbCA/ICcnIDogbnpUaXRsZSB8fCBuekNvdW50YCxcbiAgICAnW3N0eWxlXSc6IGBuelN0eWxlYCxcbiAgICAnW3N0eWxlLnJpZ2h0LnB4XSc6IGBuek9mZnNldCAmJiBuek9mZnNldFswXSA/IC1uek9mZnNldFswXSA6IG51bGxgLFxuICAgICdbc3R5bGUubWFyZ2luLXRvcC5weF0nOiBgbnpPZmZzZXQgJiYgbnpPZmZzZXRbMV0gPyBuek9mZnNldFsxXSA6IG51bGxgLFxuICAgICdbY2xhc3MuYW50LXNjcm9sbC1udW1iZXJdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuYW50LWJhZGdlLWNvdW50XSc6IGAhbnpEb3RgLFxuICAgICdbY2xhc3MuYW50LWJhZGdlLWRvdF0nOiBgbnpEb3RgLFxuICAgICdbY2xhc3MuYW50LWJhZGdlLW11bHRpcGxlLXdvcmRzXSc6IGBjb3VudEFycmF5Lmxlbmd0aCA+PSAyYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56QmFkZ2VTdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG56T2Zmc2V0PzogW251bWJlciwgbnVtYmVyXTtcbiAgQElucHV0KCkgbnpUaXRsZT86IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG56U3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpEb3QgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpPdmVyZmxvd0NvdW50OiBudW1iZXIgPSA5OTtcbiAgQElucHV0KCkgZGlzYWJsZUFuaW1hdGlvbiA9IGZhbHNlO1xuICBASW5wdXQoKSBuekNvdW50PzogbnVtYmVyIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PjtcbiAgbWF4TnVtYmVyQXJyYXk6IHN0cmluZ1tdID0gW107XG4gIGNvdW50QXJyYXk6IG51bWJlcltdID0gW107XG4gIGNvdW50OiBudW1iZXIgPSAwO1xuICBjb3VudFNpbmdsZUFycmF5ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldO1xuXG4gIGdlbmVyYXRlTWF4TnVtYmVyQXJyYXkoKTogdm9pZCB7XG4gICAgdGhpcy5tYXhOdW1iZXJBcnJheSA9IHRoaXMubnpPdmVyZmxvd0NvdW50LnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5nZW5lcmF0ZU1heE51bWJlckFycmF5KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuek92ZXJmbG93Q291bnQsIG56Q291bnQgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56Q291bnQgJiYgdHlwZW9mIG56Q291bnQuY3VycmVudFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5jb3VudCA9IE1hdGgubWF4KDAsIG56Q291bnQuY3VycmVudFZhbHVlKTtcbiAgICAgIHRoaXMuY291bnRBcnJheSA9IHRoaXMuY291bnRcbiAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAubWFwKGl0ZW0gPT4gK2l0ZW0pO1xuICAgIH1cbiAgICBpZiAobnpPdmVyZmxvd0NvdW50KSB7XG4gICAgICB0aGlzLmdlbmVyYXRlTWF4TnVtYmVyQXJyYXkoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==