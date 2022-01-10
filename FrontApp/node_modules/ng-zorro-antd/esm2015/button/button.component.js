/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
const NZ_CONFIG_MODULE_NAME = 'button';
export class NzButtonComponent {
    constructor(elementRef, cdr, renderer, nzConfigService) {
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.renderer = renderer;
        this.nzConfigService = nzConfigService;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzBlock = false;
        this.nzGhost = false;
        this.nzSearch = false;
        this.nzLoading = false;
        this.nzDanger = false;
        this.disabled = false;
        this.tabIndex = null;
        this.nzType = null;
        this.nzShape = null;
        this.nzSize = 'default';
        this.destroy$ = new Subject();
        this.loading$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    insertSpan(nodes, renderer) {
        nodes.forEach(node => {
            if (node.nodeName === '#text') {
                const span = renderer.createElement('span');
                const parent = renderer.parentNode(node);
                renderer.insertBefore(parent, span, node);
                renderer.appendChild(span, node);
            }
        });
    }
    assertIconOnly(element, renderer) {
        const listOfNode = Array.from(element.childNodes);
        const iconCount = listOfNode.filter(node => node.nodeName === 'I').length;
        const noText = listOfNode.every(node => node.nodeName !== '#text');
        const noSpan = listOfNode.every(node => node.nodeName !== 'SPAN');
        const isIconOnly = noSpan && noText && iconCount >= 1;
        if (isIconOnly) {
            renderer.addClass(element, 'ant-btn-icon-only');
        }
    }
    ngOnChanges(changes) {
        const { nzLoading } = changes;
        if (nzLoading) {
            this.loading$.next(this.nzLoading);
        }
    }
    ngAfterViewInit() {
        this.assertIconOnly(this.elementRef.nativeElement, this.renderer);
        this.insertSpan(this.elementRef.nativeElement.childNodes, this.renderer);
    }
    ngAfterContentInit() {
        this.loading$
            .pipe(startWith(this.nzLoading), filter(() => !!this.nzIconDirectiveElement), takeUntil(this.destroy$))
            .subscribe(loading => {
            const nativeElement = this.nzIconDirectiveElement.nativeElement;
            if (loading) {
                this.renderer.setStyle(nativeElement, 'display', 'none');
            }
            else {
                this.renderer.removeStyle(nativeElement, 'display');
            }
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'button[nz-button], a[nz-button]',
                exportAs: 'nzButton',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <i nz-icon nzType="loading" *ngIf="nzLoading"></i>
    <ng-content></ng-content>
  `,
                host: {
                    '[class.ant-btn]': `true`,
                    '[class.ant-btn-primary]': `nzType === 'primary'`,
                    '[class.ant-btn-dashed]': `nzType === 'dashed'`,
                    '[class.ant-btn-link]': `nzType === 'link'`,
                    '[class.ant-btn-text]': `nzType === 'text'`,
                    '[class.ant-btn-danger]': `nzType === 'danger'`,
                    '[class.ant-btn-circle]': `nzShape === 'circle'`,
                    '[class.ant-btn-round]': `nzShape === 'round'`,
                    '[class.ant-btn-lg]': `nzSize === 'large'`,
                    '[class.ant-btn-sm]': `nzSize === 'small'`,
                    '[class.ant-btn-dangerous]': `nzDanger`,
                    '[class.ant-btn-loading]': `nzLoading`,
                    '[class.ant-btn-background-ghost]': `nzGhost`,
                    '[class.ant-btn-block]': `nzBlock`,
                    '[class.ant-input-search-button]': `nzSearch`,
                    '[attr.tabindex]': 'disabled ? -1 : (tabIndex === null ? null : tabIndex)',
                    '[attr.disabled]': 'disabled || null'
                }
            },] }
];
NzButtonComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: NzConfigService }
];
NzButtonComponent.propDecorators = {
    nzIconDirectiveElement: [{ type: ContentChild, args: [NzIconDirective, { read: ElementRef },] }],
    nzBlock: [{ type: Input }],
    nzGhost: [{ type: Input }],
    nzSearch: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzDanger: [{ type: Input }],
    disabled: [{ type: Input }],
    tabIndex: [{ type: Input }],
    nzType: [{ type: Input }],
    nzShape: [{ type: Input }],
    nzSize: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "nzBlock", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "nzGhost", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "nzSearch", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "nzDanger", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "disabled", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzButtonComponent.prototype, "nzSize", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvYnV0dG9uLyIsInNvdXJjZXMiOlsiYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLFNBQVMsRUFFVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNOUQsTUFBTSxxQkFBcUIsR0FBZ0IsUUFBUSxDQUFDO0FBZ0NwRCxNQUFNLE9BQU8saUJBQWlCO0lBNkM1QixZQUNVLFVBQXNCLEVBQ3RCLEdBQXNCLEVBQ3RCLFFBQW1CLEVBQ3BCLGVBQWdDO1FBSC9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNwQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFoRGhDLGtCQUFhLEdBQWdCLHFCQUFxQixDQUFDO1FBU25DLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsYUFBUSxHQUFZLEtB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QUFFLG9CQUFvQjtvQkFDMUMsMkJBQTJCLEVBQUUsVUFBVTtvQkFDdkMseUJBQXlCLEVBQUUsV0FBVztvQkFDdEMsa0NBQWtDLEVBQUUsU0FBUztvQkFDN0MsdUJBQXVCLEVBQUUsU0FBUztvQkFDbEMsaUNBQWlDLEVBQUUsVUFBVTtvQkFDN0MsaUJBQWlCLEVBQUUsdURBQXVEO29CQUMxRSxpQkFBaUIsRUFBRSxrQkFBa0I7aUJBQ3RDO2FBQ0Y7OztZQW5EQyxVQUFVO1lBSFYsaUJBQWlCO1lBT2pCLFNBQVM7WUFJVyxlQUFlOzs7cUNBcURsQyxZQUFZLFNBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtzQkFDbEQsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLO3NCQUNMLEtBQUs7cUJBQ0wsS0FBSzs7QUFUbUI7SUFBZixZQUFZLEVBQUU7O2tEQUEwQjtBQUN6QjtJQUFmLFlBQVksRUFBRTs7a0RBQTBCO0FBQ3pCO0lBQWYsWUFBWSxFQUFFOzttREFBMkI7QUFDMUI7SUFBZixZQUFZLEVBQUU7O29EQUE0QjtBQUMzQjtJQUFmLFlBQVksRUFBRTs7bURBQTJCO0FBQzFCO0lBQWYsWUFBWSxFQUFFOzttREFBMkI7QUFJNUI7SUFBYixVQUFVLEVBQUU7O2lEQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56SWNvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN0YXJ0V2l0aCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgdHlwZSBOekJ1dHRvblR5cGUgPSAncHJpbWFyeScgfCAnZGVmYXVsdCcgfCAnZGFzaGVkJyB8ICdkYW5nZXInIHwgJ2xpbmsnIHwgJ3RleHQnIHwgbnVsbDtcbmV4cG9ydCB0eXBlIE56QnV0dG9uU2hhcGUgPSAnY2lyY2xlJyB8ICdyb3VuZCcgfCBudWxsO1xuZXhwb3J0IHR5cGUgTnpCdXR0b25TaXplID0gJ2xhcmdlJyB8ICdkZWZhdWx0JyB8ICdzbWFsbCc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnYnV0dG9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW256LWJ1dHRvbl0sIGFbbnotYnV0dG9uXScsXG4gIGV4cG9ydEFzOiAnbnpCdXR0b24nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgbnotaWNvbiBuelR5cGU9XCJsb2FkaW5nXCIgKm5nSWY9XCJuekxvYWRpbmdcIj48L2k+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtYnRuXSc6IGB0cnVlYCxcbiAgICAnW2NsYXNzLmFudC1idG4tcHJpbWFyeV0nOiBgbnpUeXBlID09PSAncHJpbWFyeSdgLFxuICAgICdbY2xhc3MuYW50LWJ0bi1kYXNoZWRdJzogYG56VHlwZSA9PT0gJ2Rhc2hlZCdgLFxuICAgICdbY2xhc3MuYW50LWJ0bi1saW5rXSc6IGBuelR5cGUgPT09ICdsaW5rJ2AsXG4gICAgJ1tjbGFzcy5hbnQtYnRuLXRleHRdJzogYG56VHlwZSA9PT0gJ3RleHQnYCxcbiAgICAnW2NsYXNzLmFudC1idG4tZGFuZ2VyXSc6IGBuelR5cGUgPT09ICdkYW5nZXInYCxcbiAgICAnW2NsYXNzLmFudC1idG4tY2lyY2xlXSc6IGBuelNoYXBlID09PSAnY2lyY2xlJ2AsXG4gICAgJ1tjbGFzcy5hbnQtYnRuLXJvdW5kXSc6IGBuelNoYXBlID09PSAncm91bmQnYCxcbiAgICAnW2NsYXNzLmFudC1idG4tbGddJzogYG56U2l6ZSA9PT0gJ2xhcmdlJ2AsXG4gICAgJ1tjbGFzcy5hbnQtYnRuLXNtXSc6IGBuelNpemUgPT09ICdzbWFsbCdgLFxuICAgICdbY2xhc3MuYW50LWJ0bi1kYW5nZXJvdXNdJzogYG56RGFuZ2VyYCxcbiAgICAnW2NsYXNzLmFudC1idG4tbG9hZGluZ10nOiBgbnpMb2FkaW5nYCxcbiAgICAnW2NsYXNzLmFudC1idG4tYmFja2dyb3VuZC1naG9zdF0nOiBgbnpHaG9zdGAsXG4gICAgJ1tjbGFzcy5hbnQtYnRuLWJsb2NrXSc6IGBuekJsb2NrYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1zZWFyY2gtYnV0dG9uXSc6IGBuelNlYXJjaGAsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IC0xIDogKHRhYkluZGV4ID09PSBudWxsID8gbnVsbCA6IHRhYkluZGV4KScsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56QnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QmxvY2s6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256R2hvc3Q6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2VhcmNoOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekxvYWRpbmc6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGFuZ2VyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuXG4gIEBDb250ZW50Q2hpbGQoTnpJY29uRGlyZWN0aXZlLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgbnpJY29uRGlyZWN0aXZlRWxlbWVudCE6IEVsZW1lbnRSZWY7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekJsb2NrOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekdob3N0OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNlYXJjaDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRhbmdlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlciB8IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelR5cGU6IE56QnV0dG9uVHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIG56U2hhcGU6IE56QnV0dG9uU2hhcGUgPSBudWxsO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56U2l6ZTogTnpCdXR0b25TaXplID0gJ2RlZmF1bHQnO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBsb2FkaW5nJCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgaW5zZXJ0U3Bhbihub2RlczogTm9kZUxpc3QsIHJlbmRlcmVyOiBSZW5kZXJlcjIpOiB2b2lkIHtcbiAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09ICcjdGV4dCcpIHtcbiAgICAgICAgY29uc3Qgc3BhbiA9IHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gcmVuZGVyZXIucGFyZW50Tm9kZShub2RlKTtcbiAgICAgICAgcmVuZGVyZXIuaW5zZXJ0QmVmb3JlKHBhcmVudCwgc3Bhbiwgbm9kZSk7XG4gICAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKHNwYW4sIG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXNzZXJ0SWNvbk9ubHkoZWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQsIHJlbmRlcmVyOiBSZW5kZXJlcjIpOiB2b2lkIHtcbiAgICBjb25zdCBsaXN0T2ZOb2RlID0gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpO1xuICAgIGNvbnN0IGljb25Db3VudCA9IGxpc3RPZk5vZGUuZmlsdGVyKG5vZGUgPT4gbm9kZS5ub2RlTmFtZSA9PT0gJ0knKS5sZW5ndGg7XG4gICAgY29uc3Qgbm9UZXh0ID0gbGlzdE9mTm9kZS5ldmVyeShub2RlID0+IG5vZGUubm9kZU5hbWUgIT09ICcjdGV4dCcpO1xuICAgIGNvbnN0IG5vU3BhbiA9IGxpc3RPZk5vZGUuZXZlcnkobm9kZSA9PiBub2RlLm5vZGVOYW1lICE9PSAnU1BBTicpO1xuICAgIGNvbnN0IGlzSWNvbk9ubHkgPSBub1NwYW4gJiYgbm9UZXh0ICYmIGljb25Db3VudCA+PSAxO1xuICAgIGlmIChpc0ljb25Pbmx5KSB7XG4gICAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50LCAnYW50LWJ0bi1pY29uLW9ubHknKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5uekNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXRDb25maWdDaGFuZ2VFdmVudEZvckNvbXBvbmVudChOWl9DT05GSUdfTU9EVUxFX05BTUUpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56TG9hZGluZyB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpMb2FkaW5nKSB7XG4gICAgICB0aGlzLmxvYWRpbmckLm5leHQodGhpcy5uekxvYWRpbmcpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFzc2VydEljb25Pbmx5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnJlbmRlcmVyKTtcbiAgICB0aGlzLmluc2VydFNwYW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2RlcywgdGhpcy5yZW5kZXJlcik7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLm56TG9hZGluZyksXG4gICAgICAgIGZpbHRlcigoKSA9PiAhIXRoaXMubnpJY29uRGlyZWN0aXZlRWxlbWVudCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShsb2FkaW5nID0+IHtcbiAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMubnpJY29uRGlyZWN0aXZlRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAobG9hZGluZykge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUobmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==