/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Host, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { getPlacementName, POSITION_MAP } from 'ng-zorro-antd/core/overlay';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { combineLatest, merge, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NzMenuItemDirective } from './menu-item.directive';
import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken } from './menu.token';
import { NzSubmenuService } from './submenu.service';
const listOfVerticalPositions = [
    POSITION_MAP.rightTop,
    POSITION_MAP.right,
    POSITION_MAP.rightBottom,
    POSITION_MAP.leftTop,
    POSITION_MAP.left,
    POSITION_MAP.leftBottom
];
const listOfHorizontalPositions = [POSITION_MAP.bottomLeft];
export class NzSubMenuComponent {
    constructor(nzMenuService, cdr, nzSubmenuService, platform, isMenuInsideDropDown, noAnimation) {
        this.nzMenuService = nzMenuService;
        this.cdr = cdr;
        this.nzSubmenuService = nzSubmenuService;
        this.platform = platform;
        this.isMenuInsideDropDown = isMenuInsideDropDown;
        this.noAnimation = noAnimation;
        this.nzMenuClassName = '';
        this.nzPaddingLeft = null;
        this.nzTitle = null;
        this.nzIcon = null;
        this.nzOpen = false;
        this.nzDisabled = false;
        this.nzOpenChange = new EventEmitter();
        this.cdkOverlayOrigin = null;
        this.listOfNzSubMenuComponent = null;
        this.listOfNzMenuItemDirective = null;
        this.level = this.nzSubmenuService.level;
        this.destroy$ = new Subject();
        this.position = 'right';
        this.triggerWidth = null;
        this.theme = 'light';
        this.mode = 'vertical';
        this.inlinePaddingLeft = null;
        this.overlayPositions = listOfVerticalPositions;
        this.isSelected = false;
        this.isActive = false;
    }
    /** set the submenu host open status directly **/
    setOpenStateWithoutDebounce(open) {
        this.nzSubmenuService.setOpenStateWithoutDebounce(open);
    }
    toggleSubMenu() {
        this.setOpenStateWithoutDebounce(!this.nzOpen);
    }
    setMouseEnterState(value) {
        this.isActive = value;
        if (this.mode !== 'inline') {
            this.nzSubmenuService.setMouseEnterTitleOrOverlayState(value);
        }
    }
    setTriggerWidth() {
        if (this.mode === 'horizontal' && this.platform.isBrowser && this.cdkOverlayOrigin) {
            /** TODO: fast dom **/
            this.triggerWidth = this.cdkOverlayOrigin.nativeElement.getBoundingClientRect().width;
        }
    }
    onPositionChange(position) {
        const placement = getPlacementName(position);
        if (placement === 'rightTop' || placement === 'rightBottom' || placement === 'right') {
            this.position = 'right';
        }
        else if (placement === 'leftTop' || placement === 'leftBottom' || placement === 'left') {
            this.position = 'left';
        }
        this.cdr.markForCheck();
    }
    ngOnInit() {
        /** submenu theme update **/
        this.nzMenuService.theme$.pipe(takeUntil(this.destroy$)).subscribe(theme => {
            this.theme = theme;
            this.cdr.markForCheck();
        });
        /** submenu mode update **/
        this.nzSubmenuService.mode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
            this.mode = mode;
            if (mode === 'horizontal') {
                this.overlayPositions = listOfHorizontalPositions;
            }
            else if (mode === 'vertical') {
                this.overlayPositions = listOfVerticalPositions;
            }
            this.cdr.markForCheck();
        });
        /** inlineIndent update **/
        combineLatest([this.nzSubmenuService.mode$, this.nzMenuService.inlineIndent$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([mode, inlineIndent]) => {
            this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
            this.cdr.markForCheck();
        });
        /** current submenu open status **/
        this.nzSubmenuService.isCurrentSubMenuOpen$.pipe(takeUntil(this.destroy$)).subscribe(open => {
            this.isActive = open;
            if (open !== this.nzOpen) {
                this.setTriggerWidth();
                this.nzOpen = open;
                this.nzOpenChange.emit(this.nzOpen);
                this.cdr.markForCheck();
            }
        });
    }
    ngAfterContentInit() {
        this.setTriggerWidth();
        const listOfNzMenuItemDirective = this.listOfNzMenuItemDirective;
        const changes = listOfNzMenuItemDirective.changes;
        const mergedObservable = merge(...[changes, ...listOfNzMenuItemDirective.map(menu => menu.selected$)]);
        changes
            .pipe(startWith(listOfNzMenuItemDirective), switchMap(() => mergedObservable), startWith(true), map(() => listOfNzMenuItemDirective.some(e => e.nzSelected)), takeUntil(this.destroy$))
            .subscribe(selected => {
            this.isSelected = selected;
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzOpen } = changes;
        if (nzOpen) {
            this.nzSubmenuService.setOpenStateWithoutDebounce(this.nzOpen);
            this.setTriggerWidth();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSubMenuComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-submenu]',
                exportAs: 'nzSubmenu',
                providers: [NzSubmenuService],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                template: `
    <div
      nz-submenu-title
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [nzIcon]="nzIcon"
      [nzTitle]="nzTitle"
      [mode]="mode"
      [nzDisabled]="nzDisabled"
      [isMenuInsideDropDown]="isMenuInsideDropDown"
      [paddingLeft]="nzPaddingLeft || inlinePaddingLeft"
      (subMenuMouseState)="setMouseEnterState($event)"
      (toggleSubMenu)="toggleSubMenu()"
    >
      <ng-content select="[title]" *ngIf="!nzTitle"></ng-content>
    </div>
    <div
      *ngIf="mode === 'inline'; else nonInlineTemplate"
      nz-submenu-inline-child
      [mode]="mode"
      [nzOpen]="nzOpen"
      [@.disabled]="noAnimation?.nzNoAnimation"
      [nzNoAnimation]="noAnimation?.nzNoAnimation"
      [menuClass]="nzMenuClassName"
      [templateOutlet]="subMenuTemplate"
    ></div>
    <ng-template #nonInlineTemplate>
      <ng-template
        cdkConnectedOverlay
        (positionChange)="onPositionChange($event)"
        [cdkConnectedOverlayPositions]="overlayPositions"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayWidth]="triggerWidth!"
        [cdkConnectedOverlayOpen]="nzOpen"
        [cdkConnectedOverlayTransformOriginOn]="'.ant-menu-submenu'"
      >
        <div
          nz-submenu-none-inline-child
          [theme]="theme"
          [mode]="mode"
          [nzOpen]="nzOpen"
          [position]="position"
          [nzDisabled]="nzDisabled"
          [isMenuInsideDropDown]="isMenuInsideDropDown"
          [templateOutlet]="subMenuTemplate"
          [menuClass]="nzMenuClassName"
          [@.disabled]="noAnimation?.nzNoAnimation"
          [nzNoAnimation]="noAnimation?.nzNoAnimation"
          (subMenuMouseState)="setMouseEnterState($event)"
        ></div>
      </ng-template>
    </ng-template>

    <ng-template #subMenuTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                host: {
                    '[class.ant-dropdown-menu-submenu]': `isMenuInsideDropDown`,
                    '[class.ant-dropdown-menu-submenu-disabled]': `isMenuInsideDropDown && nzDisabled`,
                    '[class.ant-dropdown-menu-submenu-open]': `isMenuInsideDropDown && nzOpen`,
                    '[class.ant-dropdown-menu-submenu-selected]': `isMenuInsideDropDown && isSelected`,
                    '[class.ant-dropdown-menu-submenu-vertical]': `isMenuInsideDropDown && mode === 'vertical'`,
                    '[class.ant-dropdown-menu-submenu-horizontal]': `isMenuInsideDropDown && mode === 'horizontal'`,
                    '[class.ant-dropdown-menu-submenu-inline]': `isMenuInsideDropDown && mode === 'inline'`,
                    '[class.ant-dropdown-menu-submenu-active]': `isMenuInsideDropDown && isActive`,
                    '[class.ant-menu-submenu]': `!isMenuInsideDropDown`,
                    '[class.ant-menu-submenu-disabled]': `!isMenuInsideDropDown && nzDisabled`,
                    '[class.ant-menu-submenu-open]': `!isMenuInsideDropDown && nzOpen`,
                    '[class.ant-menu-submenu-selected]': `!isMenuInsideDropDown && isSelected`,
                    '[class.ant-menu-submenu-vertical]': `!isMenuInsideDropDown && mode === 'vertical'`,
                    '[class.ant-menu-submenu-horizontal]': `!isMenuInsideDropDown && mode === 'horizontal'`,
                    '[class.ant-menu-submenu-inline]': `!isMenuInsideDropDown && mode === 'inline'`,
                    '[class.ant-menu-submenu-active]': `!isMenuInsideDropDown && isActive`
                }
            },] }
];
NzSubMenuComponent.ctorParameters = () => [
    { type: MenuService },
    { type: ChangeDetectorRef },
    { type: NzSubmenuService },
    { type: Platform },
    { type: Boolean, decorators: [{ type: Inject, args: [NzIsMenuInsideDropDownToken,] }] },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
NzSubMenuComponent.propDecorators = {
    nzMenuClassName: [{ type: Input }],
    nzPaddingLeft: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzIcon: [{ type: Input }],
    nzOpen: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzOpenChange: [{ type: Output }],
    cdkOverlayOrigin: [{ type: ViewChild, args: [CdkOverlayOrigin, { static: true, read: ElementRef },] }],
    listOfNzSubMenuComponent: [{ type: ContentChildren, args: [NzSubMenuComponent, { descendants: true },] }],
    listOfNzMenuItemDirective: [{ type: ContentChildren, args: [NzMenuItemDirective, { descendants: true },] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSubMenuComponent.prototype, "nzOpen", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSubMenuComponent.prototype, "nzDisabled", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL21lbnUvIiwic291cmNlcyI6WyJzdWJtZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLGdCQUFnQixFQUFrQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osSUFBSSxFQUNKLE1BQU0sRUFDTixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFJTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXJELE1BQU0sdUJBQXVCLEdBQUc7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QUUsSUFBSSxFQUFFOztBQU5sQztJQUFmLFlBQVksRUFBRTs7a0RBQWdCO0FBQ2Y7SUFBZixZQUFZLEVBQUU7O3NEQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENka092ZXJsYXlPcmlnaW4sIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdCxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56Tm9BbmltYXRpb25EaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IGdldFBsYWNlbWVudE5hbWUsIFBPU0lUSU9OX01BUCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdmVybGF5JztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51U2VydmljZSB9IGZyb20gJy4vbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbiB9IGZyb20gJy4vbWVudS50b2tlbic7XG5pbXBvcnQgeyBOek1lbnVNb2RlVHlwZSwgTnpNZW51VGhlbWVUeXBlIH0gZnJvbSAnLi9tZW51LnR5cGVzJztcbmltcG9ydCB7IE56U3VibWVudVNlcnZpY2UgfSBmcm9tICcuL3N1Ym1lbnUuc2VydmljZSc7XG5cbmNvbnN0IGxpc3RPZlZlcnRpY2FsUG9zaXRpb25zID0gW1xuICBQT1NJVElPTl9NQVAucmlnaHRUb3AsXG4gIFBPU0lUSU9OX01BUC5yaWdodCxcbiAgUE9TSVRJT05fTUFQLnJpZ2h0Qm90dG9tLFxuICBQT1NJVElPTl9NQVAubGVmdFRvcCxcbiAgUE9TSVRJT05fTUFQLmxlZnQsXG4gIFBPU0lUSU9OX01BUC5sZWZ0Qm90dG9tXG5dO1xuY29uc3QgbGlzdE9mSG9yaXpvbnRhbFBvc2l0aW9ucyA9IFtQT1NJVElPTl9NQVAuYm90dG9tTGVmdF07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tuei1zdWJtZW51XScsXG4gIGV4cG9ydEFzOiAnbnpTdWJtZW51JyxcbiAgcHJvdmlkZXJzOiBbTnpTdWJtZW51U2VydmljZV0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBuei1zdWJtZW51LXRpdGxlXG4gICAgICBjZGtPdmVybGF5T3JpZ2luXG4gICAgICAjb3JpZ2luPVwiY2RrT3ZlcmxheU9yaWdpblwiXG4gICAgICBbbnpJY29uXT1cIm56SWNvblwiXG4gICAgICBbbnpUaXRsZV09XCJuelRpdGxlXCJcbiAgICAgIFttb2RlXT1cIm1vZGVcIlxuICAgICAgW256RGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXG4gICAgICBbaXNNZW51SW5zaWRlRHJvcERvd25dPVwiaXNNZW51SW5zaWRlRHJvcERvd25cIlxuICAgICAgW3BhZGRpbmdMZWZ0XT1cIm56UGFkZGluZ0xlZnQgfHwgaW5saW5lUGFkZGluZ0xlZnRcIlxuICAgICAgKHN1Yk1lbnVNb3VzZVN0YXRlKT1cInNldE1vdXNlRW50ZXJTdGF0ZSgkZXZlbnQpXCJcbiAgICAgICh0b2dnbGVTdWJNZW51KT1cInRvZ2dsZVN1Yk1lbnUoKVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3RpdGxlXVwiICpuZ0lmPVwiIW56VGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdlxuICAgICAgKm5nSWY9XCJtb2RlID09PSAnaW5saW5lJzsgZWxzZSBub25JbmxpbmVUZW1wbGF0ZVwiXG4gICAgICBuei1zdWJtZW51LWlubGluZS1jaGlsZFxuICAgICAgW21vZGVdPVwibW9kZVwiXG4gICAgICBbbnpPcGVuXT1cIm56T3BlblwiXG4gICAgICBbQC5kaXNhYmxlZF09XCJub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICBbbnpOb0FuaW1hdGlvbl09XCJub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICBbbWVudUNsYXNzXT1cIm56TWVudUNsYXNzTmFtZVwiXG4gICAgICBbdGVtcGxhdGVPdXRsZXRdPVwic3ViTWVudVRlbXBsYXRlXCJcbiAgICA+PC9kaXY+XG4gICAgPG5nLXRlbXBsYXRlICNub25JbmxpbmVUZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgICAgIChwb3NpdGlvbkNoYW5nZSk9XCJvblBvc2l0aW9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uc109XCJvdmVybGF5UG9zaXRpb25zXCJcbiAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwib3JpZ2luXCJcbiAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlXaWR0aF09XCJ0cmlnZ2VyV2lkdGghXCJcbiAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cIm56T3BlblwiXG4gICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5VHJhbnNmb3JtT3JpZ2luT25dPVwiJy5hbnQtbWVudS1zdWJtZW51J1wiXG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBuei1zdWJtZW51LW5vbmUtaW5saW5lLWNoaWxkXG4gICAgICAgICAgW3RoZW1lXT1cInRoZW1lXCJcbiAgICAgICAgICBbbW9kZV09XCJtb2RlXCJcbiAgICAgICAgICBbbnpPcGVuXT1cIm56T3BlblwiXG4gICAgICAgICAgW3Bvc2l0aW9uXT1cInBvc2l0aW9uXCJcbiAgICAgICAgICBbbnpEaXNhYmxlZF09XCJuekRpc2FibGVkXCJcbiAgICAgICAgICBbaXNNZW51SW5zaWRlRHJvcERvd25dPVwiaXNNZW51SW5zaWRlRHJvcERvd25cIlxuICAgICAgICAgIFt0ZW1wbGF0ZU91dGxldF09XCJzdWJNZW51VGVtcGxhdGVcIlxuICAgICAgICAgIFttZW51Q2xhc3NdPVwibnpNZW51Q2xhc3NOYW1lXCJcbiAgICAgICAgICBbQC5kaXNhYmxlZF09XCJub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICAgICAgW256Tm9BbmltYXRpb25dPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgICAgIChzdWJNZW51TW91c2VTdGF0ZSk9XCJzZXRNb3VzZUVudGVyU3RhdGUoJGV2ZW50KVwiXG4gICAgICAgID48L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjc3ViTWVudVRlbXBsYXRlPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnVdJzogYGlzTWVudUluc2lkZURyb3BEb3duYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnUtZGlzYWJsZWRdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIG56RGlzYWJsZWRgLFxuICAgICdbY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtc3VibWVudS1vcGVuXSc6IGBpc01lbnVJbnNpZGVEcm9wRG93biAmJiBuek9wZW5gLFxuICAgICdbY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtc3VibWVudS1zZWxlY3RlZF0nOiBgaXNNZW51SW5zaWRlRHJvcERvd24gJiYgaXNTZWxlY3RlZGAsXG4gICAgJ1tjbGFzcy5hbnQtZHJvcGRvd24tbWVudS1zdWJtZW51LXZlcnRpY2FsXSc6IGBpc01lbnVJbnNpZGVEcm9wRG93biAmJiBtb2RlID09PSAndmVydGljYWwnYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnUtaG9yaXpvbnRhbF0nOiBgaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbW9kZSA9PT0gJ2hvcml6b250YWwnYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnUtaW5saW5lXSc6IGBpc01lbnVJbnNpZGVEcm9wRG93biAmJiBtb2RlID09PSAnaW5saW5lJ2AsXG4gICAgJ1tjbGFzcy5hbnQtZHJvcGRvd24tbWVudS1zdWJtZW51LWFjdGl2ZV0nOiBgaXNNZW51SW5zaWRlRHJvcERvd24gJiYgaXNBY3RpdmVgLFxuICAgICdbY2xhc3MuYW50LW1lbnUtc3VibWVudV0nOiBgIWlzTWVudUluc2lkZURyb3BEb3duYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LXN1Ym1lbnUtZGlzYWJsZWRdJzogYCFpc01lbnVJbnNpZGVEcm9wRG93biAmJiBuekRpc2FibGVkYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LXN1Ym1lbnUtb3Blbl0nOiBgIWlzTWVudUluc2lkZURyb3BEb3duICYmIG56T3BlbmAsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1zdWJtZW51LXNlbGVjdGVkXSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd24gJiYgaXNTZWxlY3RlZGAsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1zdWJtZW51LXZlcnRpY2FsXSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbW9kZSA9PT0gJ3ZlcnRpY2FsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1zdWJtZW51LWhvcml6b250YWxdJzogYCFpc01lbnVJbnNpZGVEcm9wRG93biAmJiBtb2RlID09PSAnaG9yaXpvbnRhbCdgLFxuICAgICdbY2xhc3MuYW50LW1lbnUtc3VibWVudS1pbmxpbmVdJzogYCFpc01lbnVJbnNpZGVEcm9wRG93biAmJiBtb2RlID09PSAnaW5saW5lJ2AsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1zdWJtZW51LWFjdGl2ZV0nOiBgIWlzTWVudUluc2lkZURyb3BEb3duICYmIGlzQWN0aXZlYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56U3ViTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpPcGVuOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpNZW51Q2xhc3NOYW1lOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgbnpQYWRkaW5nTGVmdDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56VGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56SWNvbjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek9wZW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T3BlbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAVmlld0NoaWxkKENka092ZXJsYXlPcmlnaW4sIHsgc3RhdGljOiB0cnVlLCByZWFkOiBFbGVtZW50UmVmIH0pIGNka092ZXJsYXlPcmlnaW46IEVsZW1lbnRSZWYgfCBudWxsID0gbnVsbDtcbiAgQENvbnRlbnRDaGlsZHJlbihOelN1Yk1lbnVDb21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgbGlzdE9mTnpTdWJNZW51Q29tcG9uZW50OiBRdWVyeUxpc3Q8TnpTdWJNZW51Q29tcG9uZW50PiB8IG51bGwgPSBudWxsO1xuICBAQ29udGVudENoaWxkcmVuKE56TWVudUl0ZW1EaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgbGlzdE9mTnpNZW51SXRlbURpcmVjdGl2ZTogUXVlcnlMaXN0PE56TWVudUl0ZW1EaXJlY3RpdmU+IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbGV2ZWwgPSB0aGlzLm56U3VibWVudVNlcnZpY2UubGV2ZWw7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwb3NpdGlvbiA9ICdyaWdodCc7XG4gIHRyaWdnZXJXaWR0aDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHRoZW1lOiBOek1lbnVUaGVtZVR5cGUgPSAnbGlnaHQnO1xuICBtb2RlOiBOek1lbnVNb2RlVHlwZSA9ICd2ZXJ0aWNhbCc7XG4gIGlubGluZVBhZGRpbmdMZWZ0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgb3ZlcmxheVBvc2l0aW9ucyA9IGxpc3RPZlZlcnRpY2FsUG9zaXRpb25zO1xuICBpc1NlbGVjdGVkID0gZmFsc2U7XG4gIGlzQWN0aXZlID0gZmFsc2U7XG5cbiAgLyoqIHNldCB0aGUgc3VibWVudSBob3N0IG9wZW4gc3RhdHVzIGRpcmVjdGx5ICoqL1xuICBzZXRPcGVuU3RhdGVXaXRob3V0RGVib3VuY2Uob3BlbjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubnpTdWJtZW51U2VydmljZS5zZXRPcGVuU3RhdGVXaXRob3V0RGVib3VuY2Uob3Blbik7XG4gIH1cblxuICB0b2dnbGVTdWJNZW51KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0T3BlblN0YXRlV2l0aG91dERlYm91bmNlKCF0aGlzLm56T3Blbik7XG4gIH1cblxuICBzZXRNb3VzZUVudGVyU3RhdGUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzQWN0aXZlID0gdmFsdWU7XG4gICAgaWYgKHRoaXMubW9kZSAhPT0gJ2lubGluZScpIHtcbiAgICAgIHRoaXMubnpTdWJtZW51U2VydmljZS5zZXRNb3VzZUVudGVyVGl0bGVPck92ZXJsYXlTdGF0ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VHJpZ2dlcldpZHRoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdob3Jpem9udGFsJyAmJiB0aGlzLnBsYXRmb3JtLmlzQnJvd3NlciAmJiB0aGlzLmNka092ZXJsYXlPcmlnaW4pIHtcbiAgICAgIC8qKiBUT0RPOiBmYXN0IGRvbSAqKi9cbiAgICAgIHRoaXMudHJpZ2dlcldpZHRoID0gdGhpcy5jZGtPdmVybGF5T3JpZ2luIS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIH1cbiAgfVxuXG4gIG9uUG9zaXRpb25DaGFuZ2UocG9zaXRpb246IENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSk6IHZvaWQge1xuICAgIGNvbnN0IHBsYWNlbWVudCA9IGdldFBsYWNlbWVudE5hbWUocG9zaXRpb24pO1xuICAgIGlmIChwbGFjZW1lbnQgPT09ICdyaWdodFRvcCcgfHwgcGxhY2VtZW50ID09PSAncmlnaHRCb3R0b20nIHx8IHBsYWNlbWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgdGhpcy5wb3NpdGlvbiA9ICdyaWdodCc7XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09ICdsZWZ0VG9wJyB8fCBwbGFjZW1lbnQgPT09ICdsZWZ0Qm90dG9tJyB8fCBwbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgICAgdGhpcy5wb3NpdGlvbiA9ICdsZWZ0JztcbiAgICB9XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbnpNZW51U2VydmljZTogTWVudVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHB1YmxpYyBuelN1Ym1lbnVTZXJ2aWNlOiBOelN1Ym1lbnVTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIEBJbmplY3QoTnpJc01lbnVJbnNpZGVEcm9wRG93blRva2VuKSBwdWJsaWMgaXNNZW51SW5zaWRlRHJvcERvd246IGJvb2xlYW4sXG4gICAgQEhvc3QoKSBAT3B0aW9uYWwoKSBwdWJsaWMgbm9BbmltYXRpb24/OiBOek5vQW5pbWF0aW9uRGlyZWN0aXZlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvKiogc3VibWVudSB0aGVtZSB1cGRhdGUgKiovXG4gICAgdGhpcy5uek1lbnVTZXJ2aWNlLnRoZW1lJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHRoZW1lID0+IHtcbiAgICAgIHRoaXMudGhlbWUgPSB0aGVtZTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICAgIC8qKiBzdWJtZW51IG1vZGUgdXBkYXRlICoqL1xuICAgIHRoaXMubnpTdWJtZW51U2VydmljZS5tb2RlJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKG1vZGUgPT4ge1xuICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgIGlmIChtb2RlID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UG9zaXRpb25zID0gbGlzdE9mSG9yaXpvbnRhbFBvc2l0aW9ucztcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICB0aGlzLm92ZXJsYXlQb3NpdGlvbnMgPSBsaXN0T2ZWZXJ0aWNhbFBvc2l0aW9ucztcbiAgICAgIH1cbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICAgIC8qKiBpbmxpbmVJbmRlbnQgdXBkYXRlICoqL1xuICAgIGNvbWJpbmVMYXRlc3QoW3RoaXMubnpTdWJtZW51U2VydmljZS5tb2RlJCwgdGhpcy5uek1lbnVTZXJ2aWNlLmlubGluZUluZGVudCRdKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoW21vZGUsIGlubGluZUluZGVudF0pID0+IHtcbiAgICAgICAgdGhpcy5pbmxpbmVQYWRkaW5nTGVmdCA9IG1vZGUgPT09ICdpbmxpbmUnID8gdGhpcy5sZXZlbCAqIGlubGluZUluZGVudCA6IG51bGw7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgLyoqIGN1cnJlbnQgc3VibWVudSBvcGVuIHN0YXR1cyAqKi9cbiAgICB0aGlzLm56U3VibWVudVNlcnZpY2UuaXNDdXJyZW50U3ViTWVudU9wZW4kLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUob3BlbiA9PiB7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gb3BlbjtcbiAgICAgIGlmIChvcGVuICE9PSB0aGlzLm56T3Blbikge1xuICAgICAgICB0aGlzLnNldFRyaWdnZXJXaWR0aCgpO1xuICAgICAgICB0aGlzLm56T3BlbiA9IG9wZW47XG4gICAgICAgIHRoaXMubnpPcGVuQ2hhbmdlLmVtaXQodGhpcy5uek9wZW4pO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFRyaWdnZXJXaWR0aCgpO1xuICAgIGNvbnN0IGxpc3RPZk56TWVudUl0ZW1EaXJlY3RpdmUgPSB0aGlzLmxpc3RPZk56TWVudUl0ZW1EaXJlY3RpdmU7XG4gICAgY29uc3QgY2hhbmdlcyA9IGxpc3RPZk56TWVudUl0ZW1EaXJlY3RpdmUhLmNoYW5nZXM7XG4gICAgY29uc3QgbWVyZ2VkT2JzZXJ2YWJsZSA9IG1lcmdlKC4uLltjaGFuZ2VzLCAuLi5saXN0T2ZOek1lbnVJdGVtRGlyZWN0aXZlIS5tYXAobWVudSA9PiBtZW51LnNlbGVjdGVkJCldKTtcbiAgICBjaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKGxpc3RPZk56TWVudUl0ZW1EaXJlY3RpdmUpLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gbWVyZ2VkT2JzZXJ2YWJsZSksXG4gICAgICAgIHN0YXJ0V2l0aCh0cnVlKSxcbiAgICAgICAgbWFwKCgpID0+IGxpc3RPZk56TWVudUl0ZW1EaXJlY3RpdmUhLnNvbWUoZSA9PiBlLm56U2VsZWN0ZWQpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHNlbGVjdGVkID0+IHtcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuek9wZW4gfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56T3Blbikge1xuICAgICAgdGhpcy5uelN1Ym1lbnVTZXJ2aWNlLnNldE9wZW5TdGF0ZVdpdGhvdXREZWJvdW5jZSh0aGlzLm56T3Blbik7XG4gICAgICB0aGlzLnNldFRyaWdnZXJXaWR0aCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19