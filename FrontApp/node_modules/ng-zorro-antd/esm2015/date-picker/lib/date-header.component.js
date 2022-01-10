/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { AbstractPanelHeader } from './abstract-panel-header';
import { transCompatFormat } from './util';
export class DateHeaderComponent extends AbstractPanelHeader {
    constructor(dateHelper) {
        super();
        this.dateHelper = dateHelper;
    }
    getSelectors() {
        return [
            {
                className: `${this.prefixCls}-year-btn`,
                title: this.locale.yearSelect,
                onClick: () => this.changeMode('year'),
                label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
            },
            {
                className: `${this.prefixCls}-month-btn`,
                title: this.locale.monthSelect,
                onClick: () => this.changeMode('month'),
                label: this.dateHelper.format(this.value.nativeDate, this.locale.monthFormat || 'MMM')
            }
        ];
    }
}
DateHeaderComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'date-header',
                exportAs: 'dateHeader',
                template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    <ng-container *ngFor=\"let selector of selectors\">\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    </ng-container>\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n"
            },] }
];
DateHeaderComponent.ctorParameters = () => [
    { type: DateHelperService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFTM0MsTUFBTSxPQUFPLG1CQUFvQixTQUFRLG1CQUFtQjtJQUMxRCxZQUFvQixVQUE2QjtRQUMvQyxLQUFLLEVBQUUsQ0FBQztRQURVLGVBQVUsR0FBVixVQUFVLENBQW1CO0lBRWpELENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTztZQUNMO2dCQUNFLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLFdBQVc7Z0JBQ3ZDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVU7Z0JBQzdCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztnQkFDdEMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEc7WUFDRDtnQkFDRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxZQUFZO2dCQUN4QyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO2dCQUM5QixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUM7YUFDdkY7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBM0JGLFNBQVMsU0FBQztnQkFDVCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUUsWUFBWTtnQkFDdEIsNGxEQUEyQzthQUM1Qzs7O1lBWFEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGF0ZUhlbHBlclNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgQWJzdHJhY3RQYW5lbEhlYWRlciB9IGZyb20gJy4vYWJzdHJhY3QtcGFuZWwtaGVhZGVyJztcbmltcG9ydCB7IFBhbmVsU2VsZWN0b3IgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyB0cmFuc0NvbXBhdEZvcm1hdCB9IGZyb20gJy4vdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdkYXRlLWhlYWRlcicsIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIGV4cG9ydEFzOiAnZGF0ZUhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9hYnN0cmFjdC1wYW5lbC1oZWFkZXIuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZUhlYWRlckNvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0UGFuZWxIZWFkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVIZWxwZXI6IERhdGVIZWxwZXJTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGdldFNlbGVjdG9ycygpOiBQYW5lbFNlbGVjdG9yW10ge1xuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIGNsYXNzTmFtZTogYCR7dGhpcy5wcmVmaXhDbHN9LXllYXItYnRuYCxcbiAgICAgICAgdGl0bGU6IHRoaXMubG9jYWxlLnllYXJTZWxlY3QsXG4gICAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuY2hhbmdlTW9kZSgneWVhcicpLFxuICAgICAgICBsYWJlbDogdGhpcy5kYXRlSGVscGVyLmZvcm1hdCh0aGlzLnZhbHVlLm5hdGl2ZURhdGUsIHRyYW5zQ29tcGF0Rm9ybWF0KHRoaXMubG9jYWxlLnllYXJGb3JtYXQpKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY2xhc3NOYW1lOiBgJHt0aGlzLnByZWZpeENsc30tbW9udGgtYnRuYCxcbiAgICAgICAgdGl0bGU6IHRoaXMubG9jYWxlLm1vbnRoU2VsZWN0LFxuICAgICAgICBvbkNsaWNrOiAoKSA9PiB0aGlzLmNoYW5nZU1vZGUoJ21vbnRoJyksXG4gICAgICAgIGxhYmVsOiB0aGlzLmRhdGVIZWxwZXIuZm9ybWF0KHRoaXMudmFsdWUubmF0aXZlRGF0ZSwgdGhpcy5sb2NhbGUubW9udGhGb3JtYXQgfHwgJ01NTScpXG4gICAgICB9XG4gICAgXTtcbiAgfVxufVxuIl19