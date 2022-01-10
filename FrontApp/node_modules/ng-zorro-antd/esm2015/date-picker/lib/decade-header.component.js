/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractPanelHeader } from './abstract-panel-header';
export class DecadeHeaderComponent extends AbstractPanelHeader {
    previous() { }
    next() { }
    get startYear() {
        return parseInt(`${this.value.getYear() / 100}`, 10) * 100;
    }
    get endYear() {
        return this.startYear + 99;
    }
    superPrevious() {
        this.changeValue(this.value.addYears(-100));
    }
    superNext() {
        this.changeValue(this.value.addYears(100));
    }
    getSelectors() {
        return [
            {
                className: `${this.prefixCls}-decade-btn`,
                title: '',
                onClick: () => {
                    // noop
                },
                label: `${this.startYear}-${this.endYear}`
            }
        ];
    }
}
DecadeHeaderComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'decade-header',
                exportAs: 'decadeHeader',
                template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    <ng-container *ngFor=\"let selector of selectors\">\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    </ng-container>\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n"
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjYWRlLWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2RhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RlY2FkZS1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFVOUQsTUFBTSxPQUFPLHFCQUFzQixTQUFRLG1CQUFtQjtJQUM1RCxRQUFRLEtBQVUsQ0FBQztJQUNuQixJQUFJLEtBQVUsQ0FBQztJQUVmLElBQUksU0FBUztRQUNYLE9BQU8sUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDN0QsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU87WUFDTDtnQkFDRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxhQUFhO2dCQUN6QyxLQUFLLEVBQUUsRUFBRTtnQkFDVCxPQUFPLEVBQUUsR0FBRyxFQUFFO29CQUNaLE9BQU87Z0JBQ1QsQ0FBQztnQkFDRCxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7YUFDM0M7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBdENGLFNBQVMsU0FBQztnQkFDVCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUUsY0FBYztnQkFDeEIsNGxEQUEyQzthQUM1QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFBhbmVsSGVhZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1wYW5lbC1oZWFkZXInO1xuaW1wb3J0IHsgUGFuZWxTZWxlY3RvciB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ2RlY2FkZS1oZWFkZXInLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBleHBvcnRBczogJ2RlY2FkZUhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9hYnN0cmFjdC1wYW5lbC1oZWFkZXIuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgRGVjYWRlSGVhZGVyQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RQYW5lbEhlYWRlciB7XG4gIHByZXZpb3VzKCk6IHZvaWQge31cbiAgbmV4dCgpOiB2b2lkIHt9XG5cbiAgZ2V0IHN0YXJ0WWVhcigpOiBudW1iZXIge1xuICAgIHJldHVybiBwYXJzZUludChgJHt0aGlzLnZhbHVlLmdldFllYXIoKSAvIDEwMH1gLCAxMCkgKiAxMDA7XG4gIH1cblxuICBnZXQgZW5kWWVhcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0WWVhciArIDk5O1xuICB9XG5cbiAgc3VwZXJQcmV2aW91cygpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZVZhbHVlKHRoaXMudmFsdWUuYWRkWWVhcnMoLTEwMCkpO1xuICB9XG5cbiAgc3VwZXJOZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlVmFsdWUodGhpcy52YWx1ZS5hZGRZZWFycygxMDApKTtcbiAgfVxuXG4gIGdldFNlbGVjdG9ycygpOiBQYW5lbFNlbGVjdG9yW10ge1xuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIGNsYXNzTmFtZTogYCR7dGhpcy5wcmVmaXhDbHN9LWRlY2FkZS1idG5gLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAvLyBub29wXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiBgJHt0aGlzLnN0YXJ0WWVhcn0tJHt0aGlzLmVuZFllYXJ9YFxuICAgICAgfVxuICAgIF07XG4gIH1cbn1cbiJdfQ==