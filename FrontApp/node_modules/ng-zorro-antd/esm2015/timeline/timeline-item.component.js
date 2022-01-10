/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { TimelineService } from './timeline.service';
import { TimelineTimeDefaultColors } from './typings';
function isDefaultColor(color) {
    return TimelineTimeDefaultColors.findIndex(i => i === color) !== -1;
}
export class NzTimelineItemComponent {
    constructor(cdr, timelineService) {
        this.cdr = cdr;
        this.timelineService = timelineService;
        this.nzColor = 'blue';
        this.isLast = false;
        this.borderColor = null;
    }
    ngOnChanges(changes) {
        this.timelineService.markForCheck();
        if (changes.nzColor) {
            this.updateCustomColor();
        }
    }
    detectChanges() {
        this.cdr.detectChanges();
    }
    updateCustomColor() {
        this.borderColor = isDefaultColor(this.nzColor) ? null : this.nzColor;
    }
}
NzTimelineItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                selector: 'nz-timeline-item, [nz-timeline-item]',
                exportAs: 'nzTimelineItem',
                template: `
    <ng-template #template>
      <li
        class="ant-timeline-item"
        [class.ant-timeline-item-right]="(nzPosition || position) === 'right'"
        [class.ant-timeline-item-left]="(nzPosition || position) === 'left'"
        [class.ant-timeline-item-last]="isLast"
      >
        <div class="ant-timeline-item-tail"></div>
        <div
          class="ant-timeline-item-head"
          [class.ant-timeline-item-head-red]="nzColor === 'red'"
          [class.ant-timeline-item-head-blue]="nzColor === 'blue'"
          [class.ant-timeline-item-head-green]="nzColor === 'green'"
          [class.ant-timeline-item-head-gray]="nzColor === 'gray'"
          [class.ant-timeline-item-head-custom]="!!nzDot"
          [style.border-color]="borderColor"
        >
          <ng-container *nzStringTemplateOutlet="nzDot">{{ nzDot }}</ng-container>
        </div>
        <div class="ant-timeline-item-content">
          <ng-content></ng-content>
        </div>
      </li>
    </ng-template>
  `
            },] }
];
NzTimelineItemComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: TimelineService }
];
NzTimelineItemComponent.propDecorators = {
    template: [{ type: ViewChild, args: ['template', { static: false },] }],
    nzPosition: [{ type: Input }],
    nzColor: [{ type: Input }],
    nzDot: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RpbWVsaW5lLyIsInNvdXJjZXMiOlsidGltZWxpbmUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFHTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUEyQyx5QkFBeUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUvRixTQUFTLGNBQWMsQ0FBQyxLQUFjO0lBQ3BDLE9BQU8seUJBQXlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUFtQ0QsTUFBTSxPQUFPLHVCQUF1QjtJQVdsQyxZQUFvQixHQUFzQixFQUFVLGVBQWdDO1FBQWhFLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBUDNFLFlBQU8sR0FBd0IsTUFBTSxDQUFDO1FBRy9DLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixnQkFBVyxHQUFrQixJQUFJLENBQUM7SUFHcUQsQ0FBQztJQUV4RixXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4RSxDQUFDOzs7WUEzREYsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJUO2FBQ0Y7OztZQWpEQyxpQkFBaUI7WUFVVixlQUFlOzs7dUJBeUNyQixTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt5QkFFdkMsS0FBSztzQkFDTCxLQUFLO29CQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRpbWVsaW5lU2VydmljZSB9IGZyb20gJy4vdGltZWxpbmUuc2VydmljZSc7XG5pbXBvcnQgeyBOelRpbWVsaW5lSXRlbUNvbG9yLCBOelRpbWVsaW5lUG9zaXRpb24sIFRpbWVsaW5lVGltZURlZmF1bHRDb2xvcnMgfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5mdW5jdGlvbiBpc0RlZmF1bHRDb2xvcihjb2xvcj86IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gVGltZWxpbmVUaW1lRGVmYXVsdENvbG9ycy5maW5kSW5kZXgoaSA9PiBpID09PSBjb2xvcikgIT09IC0xO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBzZWxlY3RvcjogJ256LXRpbWVsaW5lLWl0ZW0sIFtuei10aW1lbGluZS1pdGVtXScsXG4gIGV4cG9ydEFzOiAnbnpUaW1lbGluZUl0ZW0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjdGVtcGxhdGU+XG4gICAgICA8bGlcbiAgICAgICAgY2xhc3M9XCJhbnQtdGltZWxpbmUtaXRlbVwiXG4gICAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtaXRlbS1yaWdodF09XCIobnpQb3NpdGlvbiB8fCBwb3NpdGlvbikgPT09ICdyaWdodCdcIlxuICAgICAgICBbY2xhc3MuYW50LXRpbWVsaW5lLWl0ZW0tbGVmdF09XCIobnpQb3NpdGlvbiB8fCBwb3NpdGlvbikgPT09ICdsZWZ0J1wiXG4gICAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtaXRlbS1sYXN0XT1cImlzTGFzdFwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtdGltZWxpbmUtaXRlbS10YWlsXCI+PC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLWhlYWRcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtaXRlbS1oZWFkLXJlZF09XCJuekNvbG9yID09PSAncmVkJ1wiXG4gICAgICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1pdGVtLWhlYWQtYmx1ZV09XCJuekNvbG9yID09PSAnYmx1ZSdcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtaXRlbS1oZWFkLWdyZWVuXT1cIm56Q29sb3IgPT09ICdncmVlbidcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtaXRlbS1oZWFkLWdyYXldPVwibnpDb2xvciA9PT0gJ2dyYXknXCJcbiAgICAgICAgICBbY2xhc3MuYW50LXRpbWVsaW5lLWl0ZW0taGVhZC1jdXN0b21dPVwiISFuekRvdFwiXG4gICAgICAgICAgW3N0eWxlLmJvcmRlci1jb2xvcl09XCJib3JkZXJDb2xvclwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpEb3RcIj57eyBuekRvdCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLWNvbnRlbnRcIj5cbiAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9saT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56VGltZWxpbmVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZCgndGVtcGxhdGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgdGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBASW5wdXQoKSBuelBvc2l0aW9uPzogTnpUaW1lbGluZVBvc2l0aW9uO1xuICBASW5wdXQoKSBuekNvbG9yOiBOelRpbWVsaW5lSXRlbUNvbG9yID0gJ2JsdWUnO1xuICBASW5wdXQoKSBuekRvdD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuXG4gIGlzTGFzdCA9IGZhbHNlO1xuICBib3JkZXJDb2xvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHBvc2l0aW9uPzogTnpUaW1lbGluZVBvc2l0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSB0aW1lbGluZVNlcnZpY2U6IFRpbWVsaW5lU2VydmljZSkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy50aW1lbGluZVNlcnZpY2UubWFya0ZvckNoZWNrKCk7XG4gICAgaWYgKGNoYW5nZXMubnpDb2xvcikge1xuICAgICAgdGhpcy51cGRhdGVDdXN0b21Db2xvcigpO1xuICAgIH1cbiAgfVxuXG4gIGRldGVjdENoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDdXN0b21Db2xvcigpOiB2b2lkIHtcbiAgICB0aGlzLmJvcmRlckNvbG9yID0gaXNEZWZhdWx0Q29sb3IodGhpcy5uekNvbG9yKSA/IG51bGwgOiB0aGlzLm56Q29sb3I7XG4gIH1cbn1cbiJdfQ==