import { __decorate, __metadata } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzThSelectionComponent {
    constructor() {
        this.nzSelections = [];
        this.nzChecked = false;
        this.nzDisabled = false;
        this.nzIndeterminate = false;
        this.nzShowCheckbox = false;
        this.nzShowRowSelection = false;
        this.nzCheckedChange = new EventEmitter();
        this.isNzShowExpandChanged = false;
        this.isNzShowCheckboxChanged = false;
    }
    onCheckedChange(checked) {
        this.nzChecked = checked;
        this.nzCheckedChange.emit(checked);
    }
    ngOnChanges(changes) {
        const isFirstChange = (value) => value && value.firstChange && value.currentValue !== undefined;
        const { nzChecked, nzSelections, nzShowExpand, nzShowCheckbox } = changes;
        if (nzShowExpand) {
            this.isNzShowExpandChanged = true;
        }
        if (nzShowCheckbox) {
            this.isNzShowCheckboxChanged = true;
        }
        if (isFirstChange(nzSelections) && !this.isNzShowExpandChanged) {
            this.nzShowRowSelection = true;
        }
        if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
            this.nzShowCheckbox = true;
        }
    }
}
NzThSelectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <nz-table-selection
      [checked]="nzChecked"
      [disabled]="nzDisabled"
      [indeterminate]="nzIndeterminate"
      [listOfSelections]="nzSelections"
      [showCheckbox]="nzShowCheckbox"
      [showRowSelection]="nzShowRowSelection"
      (checkedChange)="onCheckedChange($event)"
    ></nz-table-selection>
    <ng-content></ng-content>
  `,
                host: {
                    '[class.ant-table-selection-column]': 'true'
                }
            },] }
];
NzThSelectionComponent.propDecorators = {
    nzSelections: [{ type: Input }],
    nzChecked: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzIndeterminate: [{ type: Input }],
    nzShowCheckbox: [{ type: Input }],
    nzShowRowSelection: [{ type: Input }],
    nzCheckedChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThSelectionComponent.prototype, "nzShowCheckbox", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThSelectionComponent.prototype, "nzShowRowSelection", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGgtc2VsZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdGFibGUvIiwic291cmNlcyI6WyJzcmMvY2VsbC90aC1zZWxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFDSCx1Q0FBdUM7QUFDdkMsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQXVCdkQsTUFBTSxPQUFPLHNCQUFzQjtJQXJCbkM7UUF5QlcsaUJBQVksR0FBdUUsRUFBRSxDQUFDO1FBQ3RGLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUNSLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNqQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFekQsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLDRCQUF1QixHQUFHLEtBQUssQ0FBQztJQXVCMUMsQ0FBQztJQXJCQyxlQUFlLENBQUMsT0FBZ0I7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQW1CLEVBQUUsRUFBRSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDO1FBQzlHLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDMUUsSUFBSSxZQUFZLEVBQUU7WUFDaEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztTQUNuQztRQUNELElBQUksY0FBYyxFQUFFO1lBQ2xCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7U0FDckM7UUFDRCxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDN0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs7WUF4REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwRUFBMEU7Z0JBQ3BGLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO2dCQUNELElBQUksRUFBRTtvQkFDSixvQ0FBb0MsRUFBRSxNQUFNO2lCQUM3QzthQUNGOzs7MkJBS0UsS0FBSzt3QkFDTCxLQUFLO3lCQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFDTCxLQUFLO2lDQUNMLEtBQUs7OEJBQ0wsTUFBTTs7QUFGa0I7SUFBZixZQUFZLEVBQUU7OzhEQUF3QjtBQUN2QjtJQUFmLFlBQVksRUFBRTs7a0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbi8qIHRzbGludDpkaXNhYmxlOmNvbXBvbmVudC1zZWxlY3RvciAqL1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoW256U2VsZWN0aW9uc10sdGhbbnpDaGVja2VkXSx0aFtuelNob3dDaGVja2JveF0sdGhbbnpTaG93Um93U2VsZWN0aW9uXScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotdGFibGUtc2VsZWN0aW9uXG4gICAgICBbY2hlY2tlZF09XCJuekNoZWNrZWRcIlxuICAgICAgW2Rpc2FibGVkXT1cIm56RGlzYWJsZWRcIlxuICAgICAgW2luZGV0ZXJtaW5hdGVdPVwibnpJbmRldGVybWluYXRlXCJcbiAgICAgIFtsaXN0T2ZTZWxlY3Rpb25zXT1cIm56U2VsZWN0aW9uc1wiXG4gICAgICBbc2hvd0NoZWNrYm94XT1cIm56U2hvd0NoZWNrYm94XCJcbiAgICAgIFtzaG93Um93U2VsZWN0aW9uXT1cIm56U2hvd1Jvd1NlbGVjdGlvblwiXG4gICAgICAoY2hlY2tlZENoYW5nZSk9XCJvbkNoZWNrZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgPjwvbnotdGFibGUtc2VsZWN0aW9uPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRhYmxlLXNlbGVjdGlvbi1jb2x1bW5dJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUaFNlbGVjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dDaGVja2JveDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93Um93U2VsZWN0aW9uOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpTZWxlY3Rpb25zOiBBcnJheTx7IHRleHQ6IHN0cmluZzsgb25TZWxlY3QoLi4uYXJnczogTnpTYWZlQW55W10pOiBOelNhZmVBbnkgfT4gPSBbXTtcbiAgQElucHV0KCkgbnpDaGVja2VkID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpJbmRldGVybWluYXRlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dDaGVja2JveCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93Um93U2VsZWN0aW9uID0gZmFsc2U7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNoZWNrZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgcHJpdmF0ZSBpc056U2hvd0V4cGFuZENoYW5nZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc056U2hvd0NoZWNrYm94Q2hhbmdlZCA9IGZhbHNlO1xuXG4gIG9uQ2hlY2tlZENoYW5nZShjaGVja2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uekNoZWNrZWQgPSBjaGVja2VkO1xuICAgIHRoaXMubnpDaGVja2VkQ2hhbmdlLmVtaXQoY2hlY2tlZCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgaXNGaXJzdENoYW5nZSA9ICh2YWx1ZTogU2ltcGxlQ2hhbmdlKSA9PiB2YWx1ZSAmJiB2YWx1ZS5maXJzdENoYW5nZSAmJiB2YWx1ZS5jdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7IG56Q2hlY2tlZCwgbnpTZWxlY3Rpb25zLCBuelNob3dFeHBhbmQsIG56U2hvd0NoZWNrYm94IH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuelNob3dFeHBhbmQpIHtcbiAgICAgIHRoaXMuaXNOelNob3dFeHBhbmRDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG56U2hvd0NoZWNrYm94KSB7XG4gICAgICB0aGlzLmlzTnpTaG93Q2hlY2tib3hDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzRmlyc3RDaGFuZ2UobnpTZWxlY3Rpb25zKSAmJiAhdGhpcy5pc056U2hvd0V4cGFuZENoYW5nZWQpIHtcbiAgICAgIHRoaXMubnpTaG93Um93U2VsZWN0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzRmlyc3RDaGFuZ2UobnpDaGVja2VkKSAmJiAhdGhpcy5pc056U2hvd0NoZWNrYm94Q2hhbmdlZCkge1xuICAgICAgdGhpcy5uelNob3dDaGVja2JveCA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=