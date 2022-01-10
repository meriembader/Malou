/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Optional, Output, Renderer2, ViewChild } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { takeUntil } from 'rxjs/operators';
import { nzModalAnimations } from './modal-animations';
import { BaseModalContainerComponent } from './modal-container';
import { ModalOptions } from './modal-types';
export class NzModalConfirmContainerComponent extends BaseModalContainerComponent {
    constructor(i18n, elementRef, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType) {
        super(elementRef, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType);
        this.i18n = i18n;
        this.config = config;
        this.cancelTriggered = new EventEmitter();
        this.okTriggered = new EventEmitter();
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Modal');
        });
    }
    onCancel() {
        this.cancelTriggered.emit();
    }
    onOk() {
        this.okTriggered.emit();
    }
}
NzModalConfirmContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-modal-confirm-container',
                exportAs: 'nzModalConfirmContainer',
                template: `
    <div
      #modalElement
      role="document"
      class="ant-modal"
      (mousedown)="onMousedown()"
      [ngClass]="config.nzClassName!"
      [ngStyle]="config.nzStyle!"
      [style.width]="config?.nzWidth! | nzToCssUnit"
    >
      <div class="ant-modal-content">
        <button *ngIf="config.nzClosable" nz-modal-close (click)="onCloseClick()"></button>
        <div class="ant-modal-body" [ngStyle]="config.nzBodyStyle!">
          <div class="ant-modal-confirm-body-wrapper">
            <div class="ant-modal-confirm-body">
              <i nz-icon [nzType]="config.nzIconType!"></i>
              <span class="ant-modal-confirm-title">
                <ng-container *nzStringTemplateOutlet="config.nzTitle">
                  <span [innerHTML]="config.nzTitle"></span>
                </ng-container>
              </span>
              <div class="ant-modal-confirm-content">
                <ng-template cdkPortalOutlet></ng-template>
                <div *ngIf="isStringContent" [innerHTML]="config.nzContent"></div>
              </div>
            </div>
            <div class="ant-modal-confirm-btns">
              <button
                *ngIf="config.nzCancelText !== null"
                [attr.cdkFocusInitial]="config.nzAutofocus === 'cancel' || null"
                nz-button
                (click)="onCancel()"
                [nzLoading]="!!config.nzCancelLoading"
                [disabled]="config.nzCancelDisabled"
              >
                {{ config.nzCancelText || locale.cancelText }}
              </button>
              <button
                *ngIf="config.nzOkText !== null"
                [attr.cdkFocusInitial]="config.nzAutofocus === 'ok' || null"
                nz-button
                [nzType]="config.nzOkType!"
                (click)="onOk()"
                [nzLoading]="!!config.nzOkLoading"
                [disabled]="config.nzOkDisabled"
              >
                {{ config.nzOkText || locale.okText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
                animations: [nzModalAnimations.modalContainer],
                // Using OnPush for modal caused footer can not to detect changes. we can fix it when 8.x.
                changeDetection: ChangeDetectionStrategy.Default,
                host: {
                    tabindex: '-1',
                    role: 'dialog',
                    '[class]': 'config.nzWrapClassName ? "ant-modal-wrap " + config.nzWrapClassName : "ant-modal-wrap"',
                    '[style.zIndex]': 'config.nzZIndex',
                    '[@.disabled]': 'config.nzNoAnimation',
                    '[@modalContainer]': 'state',
                    '(@modalContainer.start)': 'onAnimationStart($event)',
                    '(@modalContainer.done)': 'onAnimationDone($event)',
                    '(click)': 'onContainerClick($event)',
                    '(mouseup)': 'onMouseup()'
                }
            },] }
];
NzModalConfirmContainerComponent.ctorParameters = () => [
    { type: NzI18nService },
    { type: ElementRef },
    { type: FocusTrapFactory },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: OverlayRef },
    { type: NzConfigService },
    { type: ModalOptions },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
NzModalConfirmContainerComponent.propDecorators = {
    portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }],
    modalElementRef: [{ type: ViewChild, args: ['modalElement', { static: true },] }],
    cancelTriggered: [{ type: Output }],
    okTriggered: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29uZmlybS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9tb2RhbC8iLCJzb3VyY2VzIjpbIm1vZGFsLWNvbmZpcm0tY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUc1RCxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLG9CQUFvQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBMkU3QyxNQUFNLE9BQU8sZ0NBQWlDLFNBQVEsMkJBQTJCO0lBTy9FLFlBQ1UsSUFBbUIsRUFDM0IsVUFBc0IsRUFDdEIsZ0JBQWtDLEVBQ2xDLEdBQXNCLEVBQ3RCLE1BQWlCLEVBQ2pCLFVBQXNCLEVBQ3RCLGVBQWdDLEVBQ3pCLE1BQW9CLEVBQ0csUUFBbUIsRUFDTixhQUFxQjtRQUVoRSxLQUFLLENBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBWHZHLFNBQUksR0FBSixJQUFJLENBQWU7UUFPcEIsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQVpWLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUMzQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFnQnhELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNuRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7WUF4R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxRFQ7Z0JBQ0QsVUFBVSxFQUFFLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDO2dCQUM5QywwRkFBMEY7Z0JBQzFGLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2dCQUNoRCxJQUFJLEVBQUU7b0JBQ0osUUFBUSxFQUFFLElBQUk7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsU0FBUyxFQUFFLHdGQUF3RjtvQkFDbkcsZ0JBQWdCLEVBQUUsaUJBQWlCO29CQUNuQyxjQUFjLEVBQUUsc0JBQXNCO29CQUN0QyxtQkFBbUIsRUFBRSxPQUFPO29CQUM1Qix5QkFBeUIsRUFBRSwwQkFBMEI7b0JBQ3JELHdCQUF3QixFQUFFLHlCQUF5QjtvQkFDbkQsU0FBUyxFQUFFLDBCQUEwQjtvQkFDckMsV0FBVyxFQUFFLGFBQWE7aUJBQzNCO2FBQ0Y7OztZQWhGUSxhQUFhO1lBWnBCLFVBQVU7WUFSSCxnQkFBZ0I7WUFNdkIsaUJBQWlCO1lBT2pCLFNBQVM7WUFaRixVQUFVO1lBZ0JWLGVBQWU7WUFTZixZQUFZOzRDQTJGaEIsUUFBUSxZQUFJLE1BQU0sU0FBQyxRQUFRO3lDQUMzQixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7OzJCQWhCMUMsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7OEJBQzNDLFNBQVMsU0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzhCQUMxQyxNQUFNOzBCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBGb2N1c1RyYXBGYWN0b3J5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENka1BvcnRhbE91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFOSU1BVElPTl9NT0RVTEVfVFlQRSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBOekNvbmZpZ1NlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56STE4blNlcnZpY2UsIE56TW9kYWxJMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcblxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBuek1vZGFsQW5pbWF0aW9ucyB9IGZyb20gJy4vbW9kYWwtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBCYXNlTW9kYWxDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBNb2RhbE9wdGlvbnMgfSBmcm9tICcuL21vZGFsLXR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotbW9kYWwtY29uZmlybS1jb250YWluZXInLFxuICBleHBvcnRBczogJ256TW9kYWxDb25maXJtQ29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAjbW9kYWxFbGVtZW50XG4gICAgICByb2xlPVwiZG9jdW1lbnRcIlxuICAgICAgY2xhc3M9XCJhbnQtbW9kYWxcIlxuICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlZG93bigpXCJcbiAgICAgIFtuZ0NsYXNzXT1cImNvbmZpZy5uekNsYXNzTmFtZSFcIlxuICAgICAgW25nU3R5bGVdPVwiY29uZmlnLm56U3R5bGUhXCJcbiAgICAgIFtzdHlsZS53aWR0aF09XCJjb25maWc/Lm56V2lkdGghIHwgbnpUb0Nzc1VuaXRcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtbW9kYWwtY29udGVudFwiPlxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiY29uZmlnLm56Q2xvc2FibGVcIiBuei1tb2RhbC1jbG9zZSAoY2xpY2spPVwib25DbG9zZUNsaWNrKClcIj48L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1tb2RhbC1ib2R5XCIgW25nU3R5bGVdPVwiY29uZmlnLm56Qm9keVN0eWxlIVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtbW9kYWwtY29uZmlybS1ib2R5LXdyYXBwZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtbW9kYWwtY29uZmlybS1ib2R5XCI+XG4gICAgICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJjb25maWcubnpJY29uVHlwZSFcIj48L2k+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LW1vZGFsLWNvbmZpcm0tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiY29uZmlnLm56VGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiY29uZmlnLm56VGl0bGVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1tb2RhbC1jb25maXJtLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgY2RrUG9ydGFsT3V0bGV0PjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImlzU3RyaW5nQ29udGVudFwiIFtpbm5lckhUTUxdPVwiY29uZmlnLm56Q29udGVudFwiPjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1tb2RhbC1jb25maXJtLWJ0bnNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLm56Q2FuY2VsVGV4dCAhPT0gbnVsbFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuY2RrRm9jdXNJbml0aWFsXT1cImNvbmZpZy5uekF1dG9mb2N1cyA9PT0gJ2NhbmNlbCcgfHwgbnVsbFwiXG4gICAgICAgICAgICAgICAgbnotYnV0dG9uXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2FuY2VsKClcIlxuICAgICAgICAgICAgICAgIFtuekxvYWRpbmddPVwiISFjb25maWcubnpDYW5jZWxMb2FkaW5nXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29uZmlnLm56Q2FuY2VsRGlzYWJsZWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3sgY29uZmlnLm56Q2FuY2VsVGV4dCB8fCBsb2NhbGUuY2FuY2VsVGV4dCB9fVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLm56T2tUZXh0ICE9PSBudWxsXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5jZGtGb2N1c0luaXRpYWxdPVwiY29uZmlnLm56QXV0b2ZvY3VzID09PSAnb2snIHx8IG51bGxcIlxuICAgICAgICAgICAgICAgIG56LWJ1dHRvblxuICAgICAgICAgICAgICAgIFtuelR5cGVdPVwiY29uZmlnLm56T2tUeXBlIVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uT2soKVwiXG4gICAgICAgICAgICAgICAgW256TG9hZGluZ109XCIhIWNvbmZpZy5uek9rTG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbmZpZy5uek9rRGlzYWJsZWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3sgY29uZmlnLm56T2tUZXh0IHx8IGxvY2FsZS5va1RleHQgfX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgYW5pbWF0aW9uczogW256TW9kYWxBbmltYXRpb25zLm1vZGFsQ29udGFpbmVyXSxcbiAgLy8gVXNpbmcgT25QdXNoIGZvciBtb2RhbCBjYXVzZWQgZm9vdGVyIGNhbiBub3QgdG8gZGV0ZWN0IGNoYW5nZXMuIHdlIGNhbiBmaXggaXQgd2hlbiA4LnguXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgaG9zdDoge1xuICAgIHRhYmluZGV4OiAnLTEnLFxuICAgIHJvbGU6ICdkaWFsb2cnLFxuICAgICdbY2xhc3NdJzogJ2NvbmZpZy5ueldyYXBDbGFzc05hbWUgPyBcImFudC1tb2RhbC13cmFwIFwiICsgY29uZmlnLm56V3JhcENsYXNzTmFtZSA6IFwiYW50LW1vZGFsLXdyYXBcIicsXG4gICAgJ1tzdHlsZS56SW5kZXhdJzogJ2NvbmZpZy5uelpJbmRleCcsXG4gICAgJ1tALmRpc2FibGVkXSc6ICdjb25maWcubnpOb0FuaW1hdGlvbicsXG4gICAgJ1tAbW9kYWxDb250YWluZXJdJzogJ3N0YXRlJyxcbiAgICAnKEBtb2RhbENvbnRhaW5lci5zdGFydCknOiAnb25BbmltYXRpb25TdGFydCgkZXZlbnQpJyxcbiAgICAnKEBtb2RhbENvbnRhaW5lci5kb25lKSc6ICdvbkFuaW1hdGlvbkRvbmUoJGV2ZW50KScsXG4gICAgJyhjbGljayknOiAnb25Db250YWluZXJDbGljaygkZXZlbnQpJyxcbiAgICAnKG1vdXNldXApJzogJ29uTW91c2V1cCgpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TW9kYWxDb25maXJtQ29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZU1vZGFsQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQsIHsgc3RhdGljOiB0cnVlIH0pIHBvcnRhbE91dGxldCE6IENka1BvcnRhbE91dGxldDtcbiAgQFZpZXdDaGlsZCgnbW9kYWxFbGVtZW50JywgeyBzdGF0aWM6IHRydWUgfSkgbW9kYWxFbGVtZW50UmVmITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gIEBPdXRwdXQoKSByZWFkb25seSBjYW5jZWxUcmlnZ2VyZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBva1RyaWdnZXJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgbG9jYWxlITogTnpNb2RhbEkxOG5JbnRlcmZhY2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpMThuOiBOekkxOG5TZXJ2aWNlLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgZm9jdXNUcmFwRmFjdG9yeTogRm9jdXNUcmFwRmFjdG9yeSxcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHJlbmRlcjogUmVuZGVyZXIyLFxuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHVibGljIGNvbmZpZzogTW9kYWxPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBOelNhZmVBbnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvblR5cGU6IHN0cmluZ1xuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBmb2N1c1RyYXBGYWN0b3J5LCBjZHIsIHJlbmRlciwgb3ZlcmxheVJlZiwgbnpDb25maWdTZXJ2aWNlLCBjb25maWcsIGRvY3VtZW50LCBhbmltYXRpb25UeXBlKTtcbiAgICB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnTW9kYWwnKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMuY2FuY2VsVHJpZ2dlcmVkLmVtaXQoKTtcbiAgfVxuXG4gIG9uT2soKTogdm9pZCB7XG4gICAgdGhpcy5va1RyaWdnZXJlZC5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==