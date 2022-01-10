/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzRateItemComponent {
    constructor() {
        this.allowHalf = false;
        this.itemHover = new EventEmitter();
        this.itemClick = new EventEmitter();
    }
    hoverRate(isHalf) {
        this.itemHover.next(isHalf && this.allowHalf);
    }
    clickRate(isHalf) {
        this.itemClick.next(isHalf && this.allowHalf);
    }
}
NzRateItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: '[nz-rate-item]',
                exportAs: 'nzRateItem',
                template: `
    <div class="ant-rate-star-second" (mouseover)="hoverRate(false); $event.stopPropagation()" (click)="clickRate(false)">
      <ng-template [ngTemplateOutlet]="character || defaultCharacter"></ng-template>
    </div>
    <div class="ant-rate-star-first" (mouseover)="hoverRate(true); $event.stopPropagation()" (click)="clickRate(true)">
      <ng-template [ngTemplateOutlet]="character || defaultCharacter"></ng-template>
    </div>

    <ng-template #defaultCharacter>
      <i nz-icon nzType="star" nzTheme="fill"></i>
    </ng-template>
  `
            },] }
];
NzRateItemComponent.propDecorators = {
    character: [{ type: Input }],
    allowHalf: [{ type: Input }],
    itemHover: [{ type: Output }],
    itemClick: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzRateItemComponent.prototype, "allowHalf", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0ZS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvcmF0ZS8iLCJzb3VyY2VzIjpbInJhdGUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhJLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQW9CdkQsTUFBTSxPQUFPLG1CQUFtQjtJQWxCaEM7UUFzQjJCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDakMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDeEMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFTN0QsQ0FBQztJQVBDLFNBQVMsQ0FBQyxNQUFlO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFlO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7O1lBaENGLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0dBV1Q7YUFDRjs7O3dCQUlFLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxNQUFNO3dCQUNOLE1BQU07O0FBRmtCO0lBQWYsWUFBWSxFQUFFOztzREFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ1tuei1yYXRlLWl0ZW1dJyxcbiAgZXhwb3J0QXM6ICduelJhdGVJdGVtJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LXJhdGUtc3Rhci1zZWNvbmRcIiAobW91c2VvdmVyKT1cImhvdmVyUmF0ZShmYWxzZSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIChjbGljayk9XCJjbGlja1JhdGUoZmFsc2UpXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY2hhcmFjdGVyIHx8IGRlZmF1bHRDaGFyYWN0ZXJcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtcmF0ZS1zdGFyLWZpcnN0XCIgKG1vdXNlb3Zlcik9XCJob3ZlclJhdGUodHJ1ZSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIChjbGljayk9XCJjbGlja1JhdGUodHJ1ZSlcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjaGFyYWN0ZXIgfHwgZGVmYXVsdENoYXJhY3RlclwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG5cbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRDaGFyYWN0ZXI+XG4gICAgICA8aSBuei1pY29uIG56VHlwZT1cInN0YXJcIiBuelRoZW1lPVwiZmlsbFwiPjwvaT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56UmF0ZUl0ZW1Db21wb25lbnQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYWxsb3dIYWxmOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgY2hhcmFjdGVyITogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBhbGxvd0hhbGY6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGl0ZW1Ib3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGl0ZW1DbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBob3ZlclJhdGUoaXNIYWxmOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtSG92ZXIubmV4dChpc0hhbGYgJiYgdGhpcy5hbGxvd0hhbGYpO1xuICB9XG5cbiAgY2xpY2tSYXRlKGlzSGFsZjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXRlbUNsaWNrLm5leHQoaXNIYWxmICYmIHRoaXMuYWxsb3dIYWxmKTtcbiAgfVxufVxuIl19