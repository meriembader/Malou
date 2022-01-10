/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
export class NzCascaderOptionComponent {
    constructor(cdr, elementRef, renderer) {
        this.cdr = cdr;
        this.optionTemplate = null;
        this.activated = false;
        this.nzLabelProperty = 'label';
        this.expandIcon = 'right';
        renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item');
    }
    get optionLabel() {
        return this.option[this.nzLabelProperty];
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
}
NzCascaderOptionComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: '[nz-cascader-option]',
                exportAs: 'nzCascaderOption',
                template: `
    <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
      <ng-template [ngTemplateOutlet]="optionTemplate" [ngTemplateOutletContext]="{ $implicit: option, index: columnIndex }"></ng-template>
    </ng-container>
    <ng-template #defaultOptionTemplate>
      <span [innerHTML]="optionLabel | nzHighlight: highlightText:'g':'ant-cascader-menu-item-keyword'"></span>
    </ng-template>
    <span *ngIf="!option.isLeaf || option.children?.length || option.loading" class="ant-cascader-menu-item-expand-icon">
      <i *ngIf="option.loading; else icon" nz-icon nzType="loading"></i>
      <ng-template #icon>
        <ng-container *nzStringTemplateOutlet="expandIcon">
          <i nz-icon [nzType]="$any(expandIcon)"></i>
        </ng-container>
      </ng-template>
    </span>
  `,
                host: {
                    '[attr.title]': 'option.title || optionLabel',
                    '[class.ant-cascader-menu-item-active]': 'activated',
                    '[class.ant-cascader-menu-item-expand]': '!option.isLeaf',
                    '[class.ant-cascader-menu-item-disabled]': 'option.disabled'
                }
            },] }
];
NzCascaderOptionComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: Renderer2 }
];
NzCascaderOptionComponent.propDecorators = {
    optionTemplate: [{ type: Input }],
    option: [{ type: Input }],
    activated: [{ type: Input }],
    highlightText: [{ type: Input }],
    nzLabelProperty: [{ type: Input }],
    columnIndex: [{ type: Input }],
    expandIcon: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzY2FkZXItbGkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jYXNjYWRlci8iLCJzb3VyY2VzIjpbImNhc2NhZGVyLWxpLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBZ0N2QixNQUFNLE9BQU8seUJBQXlCO0lBVXBDLFlBQW9CLEdBQXNCLEVBQUUsVUFBc0IsRUFBRSxRQUFtQjtRQUFuRSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVRqQyxtQkFBYyxHQUF5QyxJQUFJLENBQUM7UUFFNUQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixvQkFBZSxHQUFHLE9BQU8sQ0FBQztRQUcxQixlQUFVLEdBQStCLE9BQU8sQ0FBQztRQUd4RCxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7O1lBaERGLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLGNBQWMsRUFBRSw2QkFBNkI7b0JBQzdDLHVDQUF1QyxFQUFFLFdBQVc7b0JBQ3BELHVDQUF1QyxFQUFFLGdCQUFnQjtvQkFDekQseUNBQXlDLEVBQUUsaUJBQWlCO2lCQUM3RDthQUNGOzs7WUF0Q0MsaUJBQWlCO1lBRWpCLFVBQVU7WUFFVixTQUFTOzs7NkJBb0NSLEtBQUs7cUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7OEJBQ0wsS0FBSzswQkFDTCxLQUFLO3lCQUVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekNhc2NhZGVyT3B0aW9uIH0gZnJvbSAnLi90eXBpbmdzJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ1tuei1jYXNjYWRlci1vcHRpb25dJyxcbiAgZXhwb3J0QXM6ICduekNhc2NhZGVyT3B0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwib3B0aW9uVGVtcGxhdGU7IGVsc2UgZGVmYXVsdE9wdGlvblRlbXBsYXRlXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwib3B0aW9uVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG9wdGlvbiwgaW5kZXg6IGNvbHVtbkluZGV4IH1cIj48L25nLXRlbXBsYXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdE9wdGlvblRlbXBsYXRlPlxuICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJvcHRpb25MYWJlbCB8IG56SGlnaGxpZ2h0OiBoaWdobGlnaHRUZXh0OidnJzonYW50LWNhc2NhZGVyLW1lbnUtaXRlbS1rZXl3b3JkJ1wiPjwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxzcGFuICpuZ0lmPVwiIW9wdGlvbi5pc0xlYWYgfHwgb3B0aW9uLmNoaWxkcmVuPy5sZW5ndGggfHwgb3B0aW9uLmxvYWRpbmdcIiBjbGFzcz1cImFudC1jYXNjYWRlci1tZW51LWl0ZW0tZXhwYW5kLWljb25cIj5cbiAgICAgIDxpICpuZ0lmPVwib3B0aW9uLmxvYWRpbmc7IGVsc2UgaWNvblwiIG56LWljb24gbnpUeXBlPVwibG9hZGluZ1wiPjwvaT5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjaWNvbj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cImV4cGFuZEljb25cIj5cbiAgICAgICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwiJGFueShleHBhbmRJY29uKVwiPjwvaT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvc3Bhbj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbYXR0ci50aXRsZV0nOiAnb3B0aW9uLnRpdGxlIHx8IG9wdGlvbkxhYmVsJyxcbiAgICAnW2NsYXNzLmFudC1jYXNjYWRlci1tZW51LWl0ZW0tYWN0aXZlXSc6ICdhY3RpdmF0ZWQnLFxuICAgICdbY2xhc3MuYW50LWNhc2NhZGVyLW1lbnUtaXRlbS1leHBhbmRdJzogJyFvcHRpb24uaXNMZWFmJyxcbiAgICAnW2NsYXNzLmFudC1jYXNjYWRlci1tZW51LWl0ZW0tZGlzYWJsZWRdJzogJ29wdGlvbi5kaXNhYmxlZCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekNhc2NhZGVyT3B0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgb3B0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPE56Q2FzY2FkZXJPcHRpb24+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG9wdGlvbiE6IE56Q2FzY2FkZXJPcHRpb247XG4gIEBJbnB1dCgpIGFjdGl2YXRlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBoaWdobGlnaHRUZXh0ITogc3RyaW5nO1xuICBASW5wdXQoKSBuekxhYmVsUHJvcGVydHkgPSAnbGFiZWwnO1xuICBASW5wdXQoKSBjb2x1bW5JbmRleCE6IG51bWJlcjtcblxuICBASW5wdXQoKSBleHBhbmRJY29uOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiA9ICdyaWdodCc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LWNhc2NhZGVyLW1lbnUtaXRlbScpO1xuICB9XG5cbiAgZ2V0IG9wdGlvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uW3RoaXMubnpMYWJlbFByb3BlcnR5XTtcbiAgfVxuXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19