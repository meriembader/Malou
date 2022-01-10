/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { PREFIX } from 'ng-zorro-antd/core/logger';
import { NzResizeObserver } from 'ng-zorro-antd/core/resize-observers';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { NzPageHeaderBreadcrumbDirective, NzPageHeaderFooterDirective } from './page-header-cells';
const NZ_CONFIG_MODULE_NAME = 'pageHeader';
export class NzPageHeaderComponent {
    constructor(location, nzConfigService, elementRef, nzResizeObserver, cdr) {
        this.location = location;
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.nzResizeObserver = nzResizeObserver;
        this.cdr = cdr;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzBackIcon = null;
        this.nzGhost = true;
        this.nzBack = new EventEmitter();
        this.compact = false;
        this.destroy$ = new Subject();
    }
    ngAfterViewInit() {
        this.nzResizeObserver
            .observe(this.elementRef)
            .pipe(map(([entry]) => entry.contentRect.width), takeUntil(this.destroy$))
            .subscribe((width) => {
            this.compact = width < 768;
            this.cdr.markForCheck();
        });
    }
    onBack() {
        if (this.nzBack.observers.length) {
            this.nzBack.emit();
        }
        else {
            if (!this.location) {
                throw new Error(`${PREFIX} you should import 'RouterModule' or register 'Location' if you want to use 'nzBack' default event!`);
            }
            this.location.back();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzPageHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-page-header',
                exportAs: 'nzPageHeader',
                template: `
    <ng-content select="nz-breadcrumb[nz-page-header-breadcrumb]"></ng-content>

    <div class="ant-page-header-heading">
      <div class="ant-page-header-heading-left">
        <!--back-->
        <div *ngIf="nzBackIcon !== null" (click)="onBack()" class="ant-page-header-back">
          <div role="button" tabindex="0" class="ant-page-header-back-button">
            <ng-container *nzStringTemplateOutlet="nzBackIcon; let backIcon">
              <i nz-icon [nzType]="backIcon || 'arrow-left'" nzTheme="outline"></i>
            </ng-container>
          </div>
        </div>
        <!--avatar-->
        <ng-content select="nz-avatar[nz-page-header-avatar]"></ng-content>
        <!--title-->
        <span class="ant-page-header-heading-title" *ngIf="nzTitle">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
        </span>
        <ng-content *ngIf="!nzTitle" select="nz-page-header-title, [nz-page-header-title]"></ng-content>
        <!--subtitle-->
        <span class="ant-page-header-heading-sub-title" *ngIf="nzSubtitle">
          <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
        </span>
        <ng-content *ngIf="!nzSubtitle" select="nz-page-header-subtitle, [nz-page-header-subtitle]"></ng-content>
        <ng-content select="nz-page-header-tags, [nz-page-header-tags]"></ng-content>
      </div>

      <ng-content select="nz-page-header-extra, [nz-page-header-extra]"></ng-content>
    </div>

    <ng-content select="nz-page-header-content, [nz-page-header-content]"></ng-content>
    <ng-content select="nz-page-header-footer, [nz-page-header-footer]"></ng-content>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    class: 'ant-page-header',
                    '[class.has-footer]': 'nzPageHeaderFooter',
                    '[class.ant-page-header-ghost]': 'nzGhost',
                    '[class.has-breadcrumb]': 'nzPageHeaderBreadcrumb',
                    '[class.ant-page-header-compact]': 'compact'
                }
            },] }
];
NzPageHeaderComponent.ctorParameters = () => [
    { type: Location, decorators: [{ type: Optional }] },
    { type: NzConfigService },
    { type: ElementRef },
    { type: NzResizeObserver },
    { type: ChangeDetectorRef }
];
NzPageHeaderComponent.propDecorators = {
    nzBackIcon: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzSubtitle: [{ type: Input }],
    nzGhost: [{ type: Input }],
    nzBack: [{ type: Output }],
    nzPageHeaderFooter: [{ type: ContentChild, args: [NzPageHeaderFooterDirective, { static: false },] }],
    nzPageHeaderBreadcrumb: [{ type: ContentChild, args: [NzPageHeaderBreadcrumbDirective, { static: false },] }]
};
__decorate([
    WithConfig(),
    __metadata("design:type", Boolean)
], NzPageHeaderComponent.prototype, "nzGhost", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9wYWdlLWhlYWRlci8iLCJzb3VyY2VzIjpbInBhZ2UtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRW5HLE1BQU0scUJBQXFCLEdBQWdCLFlBQVksQ0FBQztBQWlEeEQsTUFBTSxPQUFPLHFCQUFxQjtJQWVoQyxZQUNzQixRQUFrQixFQUMvQixlQUFnQyxFQUMvQixVQUFzQixFQUN0QixnQkFBa0MsRUFDbEMsR0FBc0I7UUFKVixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQy9CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFuQnZCLGtCQUFhLEdBQWdCLHFCQUFxQixDQUFDO1FBRW5ELGVBQVUsR0FBc0MsSUFBSSxDQUFDO1FBR3ZDLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDNUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFLckQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQVE1QixDQUFDO0lBRUosZUFBZTtRQUNiLElBQUksQ0FBQyxnQkFBZ0I7YUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDeEIsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQ3pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ3pCO2FBQ0EsU0FBUyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEI7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsTUFBTSxxR0FBcUcsQ0FBQyxDQUFDO2FBQ2pJO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQWpHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxpQkFBaUI7b0JBQ3hCLG9CQUFvQixFQUFFLG9CQUFvQjtvQkFDMUMsK0JBQStCLEVBQUUsU0FBUztvQkFDMUMsd0JBQXdCLEVBQUUsd0JBQXdCO29CQUNsRCxpQ0FBaUMsRUFBRSxTQUFTO2lCQUM3QzthQUNGOzs7WUF4RFEsUUFBUSx1QkF5RVosUUFBUTtZQXhFUyxlQUFlO1lBWG5DLFVBQVU7WUFhSCxnQkFBZ0I7WUFoQnZCLGlCQUFpQjs7O3lCQXlFaEIsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUs7c0JBQ0wsS0FBSztxQkFDTCxNQUFNO2lDQUVOLFlBQVksU0FBQywyQkFBMkIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7cUNBQzNELFlBQVksU0FBQywrQkFBK0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0FBSnpDO0lBQWIsVUFBVSxFQUFFOztzREFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgUFJFRklYIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2xvZ2dlcic7XG5pbXBvcnQgeyBOelJlc2l6ZU9ic2VydmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3Jlc2l6ZS1vYnNlcnZlcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOelBhZ2VIZWFkZXJCcmVhZGNydW1iRGlyZWN0aXZlLCBOelBhZ2VIZWFkZXJGb290ZXJEaXJlY3RpdmUgfSBmcm9tICcuL3BhZ2UtaGVhZGVyLWNlbGxzJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdwYWdlSGVhZGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotcGFnZS1oZWFkZXInLFxuICBleHBvcnRBczogJ256UGFnZUhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotYnJlYWRjcnVtYltuei1wYWdlLWhlYWRlci1icmVhZGNydW1iXVwiPjwvbmctY29udGVudD5cblxuICAgIDxkaXYgY2xhc3M9XCJhbnQtcGFnZS1oZWFkZXItaGVhZGluZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1wYWdlLWhlYWRlci1oZWFkaW5nLWxlZnRcIj5cbiAgICAgICAgPCEtLWJhY2stLT5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm56QmFja0ljb24gIT09IG51bGxcIiAoY2xpY2spPVwib25CYWNrKClcIiBjbGFzcz1cImFudC1wYWdlLWhlYWRlci1iYWNrXCI+XG4gICAgICAgICAgPGRpdiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJhbnQtcGFnZS1oZWFkZXItYmFjay1idXR0b25cIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekJhY2tJY29uOyBsZXQgYmFja0ljb25cIj5cbiAgICAgICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cImJhY2tJY29uIHx8ICdhcnJvdy1sZWZ0J1wiIG56VGhlbWU9XCJvdXRsaW5lXCI+PC9pPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tYXZhdGFyLS0+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWF2YXRhcltuei1wYWdlLWhlYWRlci1hdmF0YXJdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8IS0tdGl0bGUtLT5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtcGFnZS1oZWFkZXItaGVhZGluZy10aXRsZVwiICpuZ0lmPVwibnpUaXRsZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+e3sgbnpUaXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIW56VGl0bGVcIiBzZWxlY3Q9XCJuei1wYWdlLWhlYWRlci10aXRsZSwgW256LXBhZ2UtaGVhZGVyLXRpdGxlXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPCEtLXN1YnRpdGxlLS0+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXBhZ2UtaGVhZGVyLWhlYWRpbmctc3ViLXRpdGxlXCIgKm5nSWY9XCJuelN1YnRpdGxlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56U3VidGl0bGVcIj57eyBuelN1YnRpdGxlIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPG5nLWNvbnRlbnQgKm5nSWY9XCIhbnpTdWJ0aXRsZVwiIHNlbGVjdD1cIm56LXBhZ2UtaGVhZGVyLXN1YnRpdGxlLCBbbnotcGFnZS1oZWFkZXItc3VidGl0bGVdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuei1wYWdlLWhlYWRlci10YWdzLCBbbnotcGFnZS1oZWFkZXItdGFnc11cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotcGFnZS1oZWFkZXItZXh0cmEsIFtuei1wYWdlLWhlYWRlci1leHRyYV1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuei1wYWdlLWhlYWRlci1jb250ZW50LCBbbnotcGFnZS1oZWFkZXItY29udGVudF1cIj48L25nLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotcGFnZS1oZWFkZXItZm9vdGVyLCBbbnotcGFnZS1oZWFkZXItZm9vdGVyXVwiPjwvbmctY29udGVudD5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1wYWdlLWhlYWRlcicsXG4gICAgJ1tjbGFzcy5oYXMtZm9vdGVyXSc6ICduelBhZ2VIZWFkZXJGb290ZXInLFxuICAgICdbY2xhc3MuYW50LXBhZ2UtaGVhZGVyLWdob3N0XSc6ICduekdob3N0JyxcbiAgICAnW2NsYXNzLmhhcy1icmVhZGNydW1iXSc6ICduelBhZ2VIZWFkZXJCcmVhZGNydW1iJyxcbiAgICAnW2NsYXNzLmFudC1wYWdlLWhlYWRlci1jb21wYWN0XSc6ICdjb21wYWN0J1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56UGFnZUhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuXG4gIEBJbnB1dCgpIG56QmFja0ljb246IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56VGl0bGU/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpTdWJ0aXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56R2hvc3Q6IGJvb2xlYW4gPSB0cnVlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpCYWNrID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBDb250ZW50Q2hpbGQoTnpQYWdlSGVhZGVyRm9vdGVyRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSkgbnpQYWdlSGVhZGVyRm9vdGVyPzogRWxlbWVudFJlZjxOelBhZ2VIZWFkZXJGb290ZXJEaXJlY3RpdmU+O1xuICBAQ29udGVudENoaWxkKE56UGFnZUhlYWRlckJyZWFkY3J1bWJEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KSBuelBhZ2VIZWFkZXJCcmVhZGNydW1iPzogRWxlbWVudFJlZjxOelBhZ2VIZWFkZXJCcmVhZGNydW1iRGlyZWN0aXZlPjtcblxuICBjb21wYWN0ID0gZmFsc2U7XG4gIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgbnpSZXNpemVPYnNlcnZlcjogTnpSZXNpemVPYnNlcnZlcixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm56UmVzaXplT2JzZXJ2ZXJcbiAgICAgIC5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZilcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKFtlbnRyeV0pID0+IGVudHJ5LmNvbnRlbnRSZWN0LndpZHRoKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh3aWR0aDogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMuY29tcGFjdCA9IHdpZHRoIDwgNzY4O1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25CYWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56QmFjay5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm56QmFjay5lbWl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5sb2NhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7UFJFRklYfSB5b3Ugc2hvdWxkIGltcG9ydCAnUm91dGVyTW9kdWxlJyBvciByZWdpc3RlciAnTG9jYXRpb24nIGlmIHlvdSB3YW50IHRvIHVzZSAnbnpCYWNrJyBkZWZhdWx0IGV2ZW50IWApO1xuICAgICAgfVxuICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=