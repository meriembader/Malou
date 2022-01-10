/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzTdAddOnComponent {
    constructor() {
        this.nzChecked = false;
        this.nzDisabled = false;
        this.nzIndeterminate = false;
        this.nzIndentSize = 0;
        this.nzShowExpand = false;
        this.nzShowCheckbox = false;
        this.nzExpand = false;
        this.nzCheckedChange = new EventEmitter();
        this.nzExpandChange = new EventEmitter();
        this.isNzShowExpandChanged = false;
        this.isNzShowCheckboxChanged = false;
    }
    onCheckedChange(checked) {
        this.nzChecked = checked;
        this.nzCheckedChange.emit(checked);
    }
    onExpandChange(expand) {
        this.nzExpand = expand;
        this.nzExpandChange.emit(expand);
    }
    ngOnChanges(changes) {
        const isFirstChange = (value) => value && value.firstChange && value.currentValue !== undefined;
        const { nzExpand, nzChecked, nzShowExpand, nzShowCheckbox } = changes;
        if (nzShowExpand) {
            this.isNzShowExpandChanged = true;
        }
        if (nzShowCheckbox) {
            this.isNzShowCheckboxChanged = true;
        }
        if (isFirstChange(nzExpand) && !this.isNzShowExpandChanged) {
            this.nzShowExpand = true;
        }
        if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
            this.nzShowCheckbox = true;
        }
    }
}
NzTdAddOnComponent.decorators = [
    { type: Component, args: [{
                selector: 'td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *ngIf="nzShowExpand || nzIndentSize > 0">
      <nz-row-indent [indentSize]="nzIndentSize"></nz-row-indent>
      <button nz-row-expand-button [expand]="nzExpand" (expandChange)="onExpandChange($event)" [spaceMode]="!nzShowExpand"></button>
    </ng-container>
    <label
      nz-checkbox
      *ngIf="nzShowCheckbox"
      [nzDisabled]="nzDisabled"
      [ngModel]="nzChecked"
      [nzIndeterminate]="nzIndeterminate"
      (ngModelChange)="onCheckedChange($event)"
    >
    </label>
    <ng-content></ng-content>
  `,
                host: {
                    '[class.ant-table-cell-with-append]': `nzShowExpand || nzIndentSize > 0`,
                    '[class.ant-table-selection-column]': `nzShowCheckbox`
                }
            },] }
];
NzTdAddOnComponent.propDecorators = {
    nzChecked: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzIndeterminate: [{ type: Input }],
    nzIndentSize: [{ type: Input }],
    nzShowExpand: [{ type: Input }],
    nzShowCheckbox: [{ type: Input }],
    nzExpand: [{ type: Input }],
    nzCheckedChange: [{ type: Output }],
    nzExpandChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTdAddOnComponent.prototype, "nzShowExpand", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTdAddOnComponent.prototype, "nzShowCheckbox", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTdAddOnComponent.prototype, "nzExpand", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGQtYWRkb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9jZWxsL3RkLWFkZG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCx1Q0FBdUM7O0FBRXZDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUdOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUE0QnZELE1BQU0sT0FBTyxrQkFBa0I7SUExQi9CO1FBK0JXLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNELGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdkIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQzlDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN4RCwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIsNEJBQXVCLEdBQUcsS0FBSyxDQUFDO0lBMkIxQyxDQUFDO0lBekJDLGVBQWUsQ0FBQyxPQUFnQjtRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQWU7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQW1CLEVBQUUsRUFBRSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDO1FBQzlHLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDdEUsSUFBSSxZQUFZLEVBQUU7WUFDaEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztTQUNuQztRQUNELElBQUksY0FBYyxFQUFFO1lBQ2xCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7U0FDckM7UUFDRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUNELElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQzdELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7O1lBbkVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEhBQTBIO2dCQUNwSSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLG9DQUFvQyxFQUFFLGtDQUFrQztvQkFDeEUsb0NBQW9DLEVBQUUsZ0JBQWdCO2lCQUN2RDthQUNGOzs7d0JBTUUsS0FBSzt5QkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzZCQUNMLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxNQUFNOzZCQUNOLE1BQU07O0FBSmtCO0lBQWYsWUFBWSxFQUFFOzt3REFBc0I7QUFDckI7SUFBZixZQUFZLEVBQUU7OzBEQUF3QjtBQUN2QjtJQUFmLFlBQVksRUFBRTs7b0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbi8qIHRzbGludDpkaXNhYmxlOmNvbXBvbmVudC1zZWxlY3RvciAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RkW256Q2hlY2tlZF0sIHRkW256RGlzYWJsZWRdLCB0ZFtuekluZGV0ZXJtaW5hdGVdLCB0ZFtuekluZGVudFNpemVdLCB0ZFtuekV4cGFuZF0sIHRkW256U2hvd0V4cGFuZF0sIHRkW256U2hvd0NoZWNrYm94XScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpTaG93RXhwYW5kIHx8IG56SW5kZW50U2l6ZSA+IDBcIj5cbiAgICAgIDxuei1yb3ctaW5kZW50IFtpbmRlbnRTaXplXT1cIm56SW5kZW50U2l6ZVwiPjwvbnotcm93LWluZGVudD5cbiAgICAgIDxidXR0b24gbnotcm93LWV4cGFuZC1idXR0b24gW2V4cGFuZF09XCJuekV4cGFuZFwiIChleHBhbmRDaGFuZ2UpPVwib25FeHBhbmRDaGFuZ2UoJGV2ZW50KVwiIFtzcGFjZU1vZGVdPVwiIW56U2hvd0V4cGFuZFwiPjwvYnV0dG9uPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxsYWJlbFxuICAgICAgbnotY2hlY2tib3hcbiAgICAgICpuZ0lmPVwibnpTaG93Q2hlY2tib3hcIlxuICAgICAgW256RGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXG4gICAgICBbbmdNb2RlbF09XCJuekNoZWNrZWRcIlxuICAgICAgW256SW5kZXRlcm1pbmF0ZV09XCJuekluZGV0ZXJtaW5hdGVcIlxuICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25DaGVja2VkQ2hhbmdlKCRldmVudClcIlxuICAgID5cbiAgICA8L2xhYmVsPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRhYmxlLWNlbGwtd2l0aC1hcHBlbmRdJzogYG56U2hvd0V4cGFuZCB8fCBuekluZGVudFNpemUgPiAwYCxcbiAgICAnW2NsYXNzLmFudC10YWJsZS1zZWxlY3Rpb24tY29sdW1uXSc6IGBuelNob3dDaGVja2JveGBcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRkQWRkT25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93RXhwYW5kOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dDaGVja2JveDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpFeHBhbmQ6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuekNoZWNrZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBuekluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpJbmRlbnRTaXplID0gMDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd0V4cGFuZCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93Q2hlY2tib3ggPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RXhwYW5kID0gZmFsc2U7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNoZWNrZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekV4cGFuZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgcHJpdmF0ZSBpc056U2hvd0V4cGFuZENoYW5nZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc056U2hvd0NoZWNrYm94Q2hhbmdlZCA9IGZhbHNlO1xuXG4gIG9uQ2hlY2tlZENoYW5nZShjaGVja2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uekNoZWNrZWQgPSBjaGVja2VkO1xuICAgIHRoaXMubnpDaGVja2VkQ2hhbmdlLmVtaXQoY2hlY2tlZCk7XG4gIH1cblxuICBvbkV4cGFuZENoYW5nZShleHBhbmQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm56RXhwYW5kID0gZXhwYW5kO1xuICAgIHRoaXMubnpFeHBhbmRDaGFuZ2UuZW1pdChleHBhbmQpO1xuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCBpc0ZpcnN0Q2hhbmdlID0gKHZhbHVlOiBTaW1wbGVDaGFuZ2UpID0+IHZhbHVlICYmIHZhbHVlLmZpcnN0Q2hhbmdlICYmIHZhbHVlLmN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHsgbnpFeHBhbmQsIG56Q2hlY2tlZCwgbnpTaG93RXhwYW5kLCBuelNob3dDaGVja2JveCB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpTaG93RXhwYW5kKSB7XG4gICAgICB0aGlzLmlzTnpTaG93RXhwYW5kQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChuelNob3dDaGVja2JveCkge1xuICAgICAgdGhpcy5pc056U2hvd0NoZWNrYm94Q2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChpc0ZpcnN0Q2hhbmdlKG56RXhwYW5kKSAmJiAhdGhpcy5pc056U2hvd0V4cGFuZENoYW5nZWQpIHtcbiAgICAgIHRoaXMubnpTaG93RXhwYW5kID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzRmlyc3RDaGFuZ2UobnpDaGVja2VkKSAmJiAhdGhpcy5pc056U2hvd0NoZWNrYm94Q2hhbmdlZCkge1xuICAgICAgdGhpcy5uelNob3dDaGVja2JveCA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=