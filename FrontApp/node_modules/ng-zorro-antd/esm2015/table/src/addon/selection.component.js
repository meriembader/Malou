/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
export class NzTableSelectionComponent {
    constructor() {
        this.listOfSelections = [];
        this.checked = false;
        this.disabled = false;
        this.indeterminate = false;
        this.showCheckbox = false;
        this.showRowSelection = false;
        this.checkedChange = new EventEmitter();
    }
    onCheckedChange(checked) {
        this.checked = checked;
        this.checkedChange.emit(checked);
    }
}
NzTableSelectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table-selection',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <label
      *ngIf="showCheckbox"
      nz-checkbox
      [class.ant-table-selection-select-all-custom]="showRowSelection"
      [ngModel]="checked"
      [nzDisabled]="disabled"
      [nzIndeterminate]="indeterminate"
      (ngModelChange)="onCheckedChange($event)"
    >
    </label>
    <div class="ant-table-selection-extra" *ngIf="showRowSelection">
      <span nz-dropdown class="ant-table-selection-down" nzPlacement="bottomLeft" [nzDropdownMenu]="selectionMenu">
        <i nz-icon nzType="down"></i>
      </span>
      <nz-dropdown-menu #selectionMenu="nzDropdownMenu">
        <ul nz-menu class="ant-table-selection-menu">
          <li nz-menu-item *ngFor="let selection of listOfSelections" (click)="selection.onSelect()">
            {{ selection.text }}
          </li>
        </ul>
      </nz-dropdown-menu>
    </div>
  `,
                host: {
                    '[class.ant-table-selection]': 'true'
                }
            },] }
];
NzTableSelectionComponent.propDecorators = {
    listOfSelections: [{ type: Input }],
    checked: [{ type: Input }],
    disabled: [{ type: Input }],
    indeterminate: [{ type: Input }],
    showCheckbox: [{ type: Input }],
    showRowSelection: [{ type: Input }],
    checkedChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdGFibGUvIiwic291cmNlcyI6WyJzcmMvYWRkb24vc2VsZWN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBb0NuSCxNQUFNLE9BQU8seUJBQXlCO0lBakN0QztRQWtDVyxxQkFBZ0IsR0FBdUUsRUFBRSxDQUFDO1FBQzFGLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDZixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFLakUsQ0FBQztJQUpDLGVBQWUsQ0FBQyxPQUFnQjtRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7WUE1Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osNkJBQTZCLEVBQUUsTUFBTTtpQkFDdEM7YUFDRjs7OytCQUVFLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsS0FBSzsrQkFDTCxLQUFLOzRCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10YWJsZS1zZWxlY3Rpb24nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxhYmVsXG4gICAgICAqbmdJZj1cInNob3dDaGVja2JveFwiXG4gICAgICBuei1jaGVja2JveFxuICAgICAgW2NsYXNzLmFudC10YWJsZS1zZWxlY3Rpb24tc2VsZWN0LWFsbC1jdXN0b21dPVwic2hvd1Jvd1NlbGVjdGlvblwiXG4gICAgICBbbmdNb2RlbF09XCJjaGVja2VkXCJcbiAgICAgIFtuekRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIFtuekluZGV0ZXJtaW5hdGVdPVwiaW5kZXRlcm1pbmF0ZVwiXG4gICAgICAobmdNb2RlbENoYW5nZSk9XCJvbkNoZWNrZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgPlxuICAgIDwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cImFudC10YWJsZS1zZWxlY3Rpb24tZXh0cmFcIiAqbmdJZj1cInNob3dSb3dTZWxlY3Rpb25cIj5cbiAgICAgIDxzcGFuIG56LWRyb3Bkb3duIGNsYXNzPVwiYW50LXRhYmxlLXNlbGVjdGlvbi1kb3duXCIgbnpQbGFjZW1lbnQ9XCJib3R0b21MZWZ0XCIgW256RHJvcGRvd25NZW51XT1cInNlbGVjdGlvbk1lbnVcIj5cbiAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJkb3duXCI+PC9pPlxuICAgICAgPC9zcGFuPlxuICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI3NlbGVjdGlvbk1lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICA8dWwgbnotbWVudSBjbGFzcz1cImFudC10YWJsZS1zZWxlY3Rpb24tbWVudVwiPlxuICAgICAgICAgIDxsaSBuei1tZW51LWl0ZW0gKm5nRm9yPVwibGV0IHNlbGVjdGlvbiBvZiBsaXN0T2ZTZWxlY3Rpb25zXCIgKGNsaWNrKT1cInNlbGVjdGlvbi5vblNlbGVjdCgpXCI+XG4gICAgICAgICAgICB7eyBzZWxlY3Rpb24udGV4dCB9fVxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10YWJsZS1zZWxlY3Rpb25dJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZVNlbGVjdGlvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGxpc3RPZlNlbGVjdGlvbnM6IEFycmF5PHsgdGV4dDogc3RyaW5nOyBvblNlbGVjdCguLi5hcmdzOiBOelNhZmVBbnlbXSk6IE56U2FmZUFueSB9PiA9IFtdO1xuICBASW5wdXQoKSBjaGVja2VkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd0NoZWNrYm94ID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dSb3dTZWxlY3Rpb24gPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoZWNrZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIG9uQ2hlY2tlZENoYW5nZShjaGVja2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2VkID0gY2hlY2tlZDtcbiAgICB0aGlzLmNoZWNrZWRDaGFuZ2UuZW1pdChjaGVja2VkKTtcbiAgfVxufVxuIl19