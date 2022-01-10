/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isValid } from 'date-fns';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { InputBoolean, isNil } from 'ng-zorro-antd/core/util';
import { DateHelperService } from 'ng-zorro-antd/i18n';
const NZ_CONFIG_MODULE_NAME = 'timePicker';
export class NzTimePickerComponent {
    constructor(nzConfigService, element, renderer, cdr, dateHelper, platform) {
        this.nzConfigService = nzConfigService;
        this.element = element;
        this.renderer = renderer;
        this.cdr = cdr;
        this.dateHelper = dateHelper;
        this.platform = platform;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.isInit = false;
        this.focused = false;
        this.inputValue = '';
        this.value = null;
        this.preValue = null;
        this.overlayPositions = [
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: 3
            }
        ];
        this.nzSize = null;
        this.nzHourStep = 1;
        this.nzMinuteStep = 1;
        this.nzSecondStep = 1;
        this.nzClearText = 'clear';
        this.nzPopupClassName = '';
        this.nzPlaceHolder = '';
        this.nzFormat = 'HH:mm:ss';
        this.nzOpen = false;
        this.nzUse12Hours = false;
        this.nzSuffixIcon = 'clock-circle';
        this.nzOpenChange = new EventEmitter();
        this.nzHideDisabledOptions = false;
        this.nzAllowEmpty = true;
        this.nzDisabled = false;
        this.nzAutoFocus = false;
    }
    emitValue(value) {
        this.setValue(value, true);
        if (this._onChange) {
            this._onChange(this.value);
        }
        if (this._onTouched) {
            this._onTouched();
        }
    }
    setValue(value, syncPreValue = false) {
        if (syncPreValue) {
            this.preValue = isValid(value) ? new Date(value) : null;
        }
        this.value = isValid(value) ? new Date(value) : null;
        this.inputValue = this.dateHelper.format(value, this.nzFormat);
        this.cdr.markForCheck();
    }
    open() {
        if (this.nzDisabled || this.nzOpen) {
            return;
        }
        this.focus();
        this.nzOpen = true;
        this.nzOpenChange.emit(this.nzOpen);
    }
    close() {
        this.nzOpen = false;
        this.cdr.markForCheck();
        this.nzOpenChange.emit(this.nzOpen);
    }
    updateAutoFocus() {
        if (this.isInit && !this.nzDisabled) {
            if (this.nzAutoFocus) {
                this.renderer.setAttribute(this.inputRef.nativeElement, 'autofocus', 'autofocus');
            }
            else {
                this.renderer.removeAttribute(this.inputRef.nativeElement, 'autofocus');
            }
        }
    }
    onClickClearBtn(event) {
        event.stopPropagation();
        this.emitValue(null);
    }
    onClickOutside(event) {
        if (!this.element.nativeElement.contains(event.target)) {
            this.setCurrentValueAndClose();
        }
    }
    onFocus(value) {
        this.focused = value;
    }
    focus() {
        if (this.inputRef.nativeElement) {
            this.inputRef.nativeElement.focus();
        }
    }
    blur() {
        if (this.inputRef.nativeElement) {
            this.inputRef.nativeElement.blur();
        }
    }
    onKeyupEsc() {
        this.setValue(this.preValue);
    }
    onKeyupEnter() {
        if (this.nzOpen && isValid(this.value)) {
            this.setCurrentValueAndClose();
        }
        else if (!this.nzOpen) {
            this.open();
        }
    }
    onInputChange(str) {
        if (!this.platform.TRIDENT && document.activeElement === this.inputRef.nativeElement) {
            this.open();
            this.parseTimeString(str);
        }
    }
    onPanelValueChange(value) {
        this.setValue(value);
        this.focus();
    }
    setCurrentValueAndClose() {
        this.emitValue(this.value);
        this.close();
    }
    ngOnInit() {
        this.inputSize = Math.max(8, this.nzFormat.length) + 2;
        this.origin = new CdkOverlayOrigin(this.element);
    }
    ngOnChanges(changes) {
        const { nzUse12Hours, nzFormat, nzDisabled, nzAutoFocus } = changes;
        if (nzUse12Hours && !nzUse12Hours.previousValue && nzUse12Hours.currentValue && !nzFormat) {
            this.nzFormat = 'h:mm:ss a';
        }
        if (nzDisabled) {
            const value = nzDisabled.currentValue;
            const input = this.inputRef.nativeElement;
            if (value) {
                this.renderer.setAttribute(input, 'disabled', '');
            }
            else {
                this.renderer.removeAttribute(input, 'disabled');
            }
        }
        if (nzAutoFocus) {
            this.updateAutoFocus();
        }
    }
    parseTimeString(str) {
        const value = this.dateHelper.parseTime(str, this.nzFormat) || null;
        if (isValid(value)) {
            this.value = value;
            this.cdr.markForCheck();
        }
    }
    ngAfterViewInit() {
        this.isInit = true;
        this.updateAutoFocus();
    }
    writeValue(time) {
        let result;
        if (time instanceof Date) {
            result = time;
        }
        else if (isNil(time)) {
            result = null;
        }
        else {
            warn('Non-Date type is not recommended for time-picker, use "Date" type.');
            result = new Date(time);
        }
        this.setValue(result, true);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
        this.cdr.markForCheck();
    }
}
NzTimePickerComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'nz-time-picker',
                exportAs: 'nzTimePicker',
                template: `
    <div class="ant-picker-input">
      <input
        #inputElement
        type="text"
        [size]="inputSize"
        [placeholder]="nzPlaceHolder || ('TimePicker.placeholder' | nzI18n)"
        [(ngModel)]="inputValue"
        [disabled]="nzDisabled"
        (focus)="onFocus(true)"
        (blur)="onFocus(false)"
        (keyup.enter)="onKeyupEnter()"
        (keyup.escape)="onKeyupEsc()"
        (ngModelChange)="onInputChange($event)"
      />
      <span class="ant-picker-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <i nz-icon [nzType]="suffixIcon"></i>
        </ng-container>
      </span>
      <span *ngIf="nzAllowEmpty && !nzDisabled && value" class="ant-picker-clear" (click)="onClickClearBtn($event)">
        <i nz-icon nzType="close-circle" nzTheme="fill" [attr.aria-label]="nzClearText" [attr.title]="nzClearText"></i>
      </span>
    </div>

    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayOffsetY]="-2"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-dropdown'"
      (detach)="close()"
      (overlayOutsideClick)="onClickOutside($event)"
    >
      <div [@slideMotion]="'enter'" class="ant-picker-dropdown">
        <div class="ant-picker-panel-container">
          <div tabindex="-1" class="ant-picker-panel">
            <nz-time-picker-panel
              [ngClass]="nzPopupClassName"
              [format]="nzFormat"
              [nzHourStep]="nzHourStep"
              [nzMinuteStep]="nzMinuteStep"
              [nzSecondStep]="nzSecondStep"
              [nzDisabledHours]="nzDisabledHours"
              [nzDisabledMinutes]="nzDisabledMinutes"
              [nzDisabledSeconds]="nzDisabledSeconds"
              [nzPlaceHolder]="nzPlaceHolder || ('TimePicker.placeholder' | nzI18n)"
              [nzHideDisabledOptions]="nzHideDisabledOptions"
              [nzUse12Hours]="nzUse12Hours"
              [nzDefaultOpenValue]="nzDefaultOpenValue"
              [nzAddOn]="nzAddOn"
              [nzClearText]="nzClearText"
              [nzAllowEmpty]="nzAllowEmpty"
              [(ngModel)]="value"
              (ngModelChange)="onPanelValueChange($event)"
              (closePanel)="setCurrentValueAndClose()"
            ></nz-time-picker-panel>
          </div>
        </div>
      </div>
    </ng-template>
  `,
                host: {
                    '[class.ant-picker]': `true`,
                    '[class.ant-picker-large]': `nzSize === 'large'`,
                    '[class.ant-picker-small]': `nzSize === 'small'`,
                    '[class.ant-picker-disabled]': `nzDisabled`,
                    '[class.ant-picker-focused]': `focused`,
                    '(click)': 'open()'
                },
                animations: [slideMotion],
                providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerComponent, multi: true }]
            },] }
];
NzTimePickerComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: DateHelperService },
    { type: Platform }
];
NzTimePickerComponent.propDecorators = {
    inputRef: [{ type: ViewChild, args: ['inputElement', { static: true },] }],
    nzSize: [{ type: Input }],
    nzHourStep: [{ type: Input }],
    nzMinuteStep: [{ type: Input }],
    nzSecondStep: [{ type: Input }],
    nzClearText: [{ type: Input }],
    nzPopupClassName: [{ type: Input }],
    nzPlaceHolder: [{ type: Input }],
    nzAddOn: [{ type: Input }],
    nzDefaultOpenValue: [{ type: Input }],
    nzDisabledHours: [{ type: Input }],
    nzDisabledMinutes: [{ type: Input }],
    nzDisabledSeconds: [{ type: Input }],
    nzFormat: [{ type: Input }],
    nzOpen: [{ type: Input }],
    nzUse12Hours: [{ type: Input }],
    nzSuffixIcon: [{ type: Input }],
    nzOpenChange: [{ type: Output }],
    nzHideDisabledOptions: [{ type: Input }],
    nzAllowEmpty: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzAutoFocus: [{ type: Input }]
};
__decorate([
    WithConfig(),
    __metadata("design:type", Number)
], NzTimePickerComponent.prototype, "nzHourStep", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Number)
], NzTimePickerComponent.prototype, "nzMinuteStep", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Number)
], NzTimePickerComponent.prototype, "nzSecondStep", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzTimePickerComponent.prototype, "nzClearText", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzTimePickerComponent.prototype, "nzPopupClassName", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzTimePickerComponent.prototype, "nzFormat", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTimePickerComponent.prototype, "nzUse12Hours", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzTimePickerComponent.prototype, "nzSuffixIcon", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTimePickerComponent.prototype, "nzHideDisabledOptions", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTimePickerComponent.prototype, "nzAllowEmpty", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTimePickerComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTimePickerComponent.prototype, "nzAutoFocus", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbInRpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLGdCQUFnQixFQUEwQixNQUFNLHNCQUFzQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFFVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNuQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFM0QsT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFakQsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RCxNQUFNLHFCQUFxQixHQUFnQixZQUFZLENBQUM7QUFrRnhELE1BQU0sT0FBTyxxQkFBcUI7SUEySmhDLFlBQ1MsZUFBZ0MsRUFDL0IsT0FBbUIsRUFDbkIsUUFBbUIsRUFDbkIsR0FBc0IsRUFDdEIsVUFBNkIsRUFDN0IsUUFBa0I7UUFMbkIsb0JBQWUsR0FBZixlQUFl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VSxFQUFFO0lBQUUsWUFBWSxFQUFFOzsyREFBOEI7QUFDM0M7SUFBZixZQUFZLEVBQUU7O3lEQUFvQjtBQUNuQjtJQUFmLFlBQVksRUFBRTs7MERBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2RrT3ZlcmxheU9yaWdpbiwgQ29ubmVjdGlvblBvc2l0aW9uUGFpciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IHNsaWRlTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5cbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IHdhcm4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbG9nZ2VyJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgaXNOaWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBEYXRlSGVscGVyU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAndGltZVBpY2tlcic7XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICduei10aW1lLXBpY2tlcicsXG4gIGV4cG9ydEFzOiAnbnpUaW1lUGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LXBpY2tlci1pbnB1dFwiPlxuICAgICAgPGlucHV0XG4gICAgICAgICNpbnB1dEVsZW1lbnRcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBbc2l6ZV09XCJpbnB1dFNpemVcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwibnpQbGFjZUhvbGRlciB8fCAoJ1RpbWVQaWNrZXIucGxhY2Vob2xkZXInIHwgbnpJMThuKVwiXG4gICAgICAgIFsobmdNb2RlbCldPVwiaW5wdXRWYWx1ZVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJuekRpc2FibGVkXCJcbiAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXModHJ1ZSlcIlxuICAgICAgICAoYmx1cik9XCJvbkZvY3VzKGZhbHNlKVwiXG4gICAgICAgIChrZXl1cC5lbnRlcik9XCJvbktleXVwRW50ZXIoKVwiXG4gICAgICAgIChrZXl1cC5lc2NhcGUpPVwib25LZXl1cEVzYygpXCJcbiAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAgIC8+XG4gICAgICA8c3BhbiBjbGFzcz1cImFudC1waWNrZXItc3VmZml4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelN1ZmZpeEljb247IGxldCBzdWZmaXhJY29uXCI+XG4gICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cInN1ZmZpeEljb25cIj48L2k+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJuekFsbG93RW1wdHkgJiYgIW56RGlzYWJsZWQgJiYgdmFsdWVcIiBjbGFzcz1cImFudC1waWNrZXItY2xlYXJcIiAoY2xpY2spPVwib25DbGlja0NsZWFyQnRuKCRldmVudClcIj5cbiAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJjbG9zZS1jaXJjbGVcIiBuelRoZW1lPVwiZmlsbFwiIFthdHRyLmFyaWEtbGFiZWxdPVwibnpDbGVhclRleHRcIiBbYXR0ci50aXRsZV09XCJuekNsZWFyVGV4dFwiPjwvaT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgICAgbnpDb25uZWN0ZWRPdmVybGF5XG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uc109XCJvdmVybGF5UG9zaXRpb25zXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cIm9yaWdpblwiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwibnpPcGVuXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T2Zmc2V0WV09XCItMlwiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVRyYW5zZm9ybU9yaWdpbk9uXT1cIicuYW50LXBpY2tlci1kcm9wZG93bidcIlxuICAgICAgKGRldGFjaCk9XCJjbG9zZSgpXCJcbiAgICAgIChvdmVybGF5T3V0c2lkZUNsaWNrKT1cIm9uQ2xpY2tPdXRzaWRlKCRldmVudClcIlxuICAgID5cbiAgICAgIDxkaXYgW0BzbGlkZU1vdGlvbl09XCInZW50ZXInXCIgY2xhc3M9XCJhbnQtcGlja2VyLWRyb3Bkb3duXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcGlja2VyLXBhbmVsLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiYW50LXBpY2tlci1wYW5lbFwiPlxuICAgICAgICAgICAgPG56LXRpbWUtcGlja2VyLXBhbmVsXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIm56UG9wdXBDbGFzc05hbWVcIlxuICAgICAgICAgICAgICBbZm9ybWF0XT1cIm56Rm9ybWF0XCJcbiAgICAgICAgICAgICAgW256SG91clN0ZXBdPVwibnpIb3VyU3RlcFwiXG4gICAgICAgICAgICAgIFtuek1pbnV0ZVN0ZXBdPVwibnpNaW51dGVTdGVwXCJcbiAgICAgICAgICAgICAgW256U2Vjb25kU3RlcF09XCJuelNlY29uZFN0ZXBcIlxuICAgICAgICAgICAgICBbbnpEaXNhYmxlZEhvdXJzXT1cIm56RGlzYWJsZWRIb3Vyc1wiXG4gICAgICAgICAgICAgIFtuekRpc2FibGVkTWludXRlc109XCJuekRpc2FibGVkTWludXRlc1wiXG4gICAgICAgICAgICAgIFtuekRpc2FibGVkU2Vjb25kc109XCJuekRpc2FibGVkU2Vjb25kc1wiXG4gICAgICAgICAgICAgIFtuelBsYWNlSG9sZGVyXT1cIm56UGxhY2VIb2xkZXIgfHwgKCdUaW1lUGlja2VyLnBsYWNlaG9sZGVyJyB8IG56STE4bilcIlxuICAgICAgICAgICAgICBbbnpIaWRlRGlzYWJsZWRPcHRpb25zXT1cIm56SGlkZURpc2FibGVkT3B0aW9uc1wiXG4gICAgICAgICAgICAgIFtuelVzZTEySG91cnNdPVwibnpVc2UxMkhvdXJzXCJcbiAgICAgICAgICAgICAgW256RGVmYXVsdE9wZW5WYWx1ZV09XCJuekRlZmF1bHRPcGVuVmFsdWVcIlxuICAgICAgICAgICAgICBbbnpBZGRPbl09XCJuekFkZE9uXCJcbiAgICAgICAgICAgICAgW256Q2xlYXJUZXh0XT1cIm56Q2xlYXJUZXh0XCJcbiAgICAgICAgICAgICAgW256QWxsb3dFbXB0eV09XCJuekFsbG93RW1wdHlcIlxuICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25QYW5lbFZhbHVlQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAoY2xvc2VQYW5lbCk9XCJzZXRDdXJyZW50VmFsdWVBbmRDbG9zZSgpXCJcbiAgICAgICAgICAgID48L256LXRpbWUtcGlja2VyLXBhbmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1waWNrZXJdJzogYHRydWVgLFxuICAgICdbY2xhc3MuYW50LXBpY2tlci1sYXJnZV0nOiBgbnpTaXplID09PSAnbGFyZ2UnYCxcbiAgICAnW2NsYXNzLmFudC1waWNrZXItc21hbGxdJzogYG56U2l6ZSA9PT0gJ3NtYWxsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyLWRpc2FibGVkXSc6IGBuekRpc2FibGVkYCxcbiAgICAnW2NsYXNzLmFudC1waWNrZXItZm9jdXNlZF0nOiBgZm9jdXNlZGAsXG4gICAgJyhjbGljayknOiAnb3BlbigpJ1xuICB9LFxuICBhbmltYXRpb25zOiBbc2xpZGVNb3Rpb25dLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogTnpUaW1lUGlja2VyQ29tcG9uZW50LCBtdWx0aTogdHJ1ZSB9XVxufSlcbmV4cG9ydCBjbGFzcyBOelRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpVc2UxMkhvdXJzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekhpZGVEaXNhYmxlZE9wdGlvbnM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QWxsb3dFbXB0eTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBdXRvRm9jdXM6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIF9vbkNoYW5nZT86ICh2YWx1ZTogRGF0ZSB8IG51bGwpID0+IHZvaWQ7XG4gIHByaXZhdGUgX29uVG91Y2hlZD86ICgpID0+IHZvaWQ7XG4gIGlzSW5pdCA9IGZhbHNlO1xuICBmb2N1c2VkID0gZmFsc2U7XG4gIGlucHV0VmFsdWU6IHN0cmluZyA9ICcnO1xuICB2YWx1ZTogRGF0ZSB8IG51bGwgPSBudWxsO1xuICBwcmVWYWx1ZTogRGF0ZSB8IG51bGwgPSBudWxsO1xuICBvcmlnaW4hOiBDZGtPdmVybGF5T3JpZ2luO1xuICBpbnB1dFNpemU/OiBudW1iZXI7XG4gIG92ZXJsYXlQb3NpdGlvbnM6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSA9IFtcbiAgICB7XG4gICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgIG9mZnNldFk6IDNcbiAgICB9XG4gIF07XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXRFbGVtZW50JywgeyBzdGF0aWM6IHRydWUgfSkgaW5wdXRSZWYhOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuICBASW5wdXQoKSBuelNpemU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56SG91clN0ZXA6IG51bWJlciA9IDE7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpNaW51dGVTdGVwOiBudW1iZXIgPSAxO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56U2Vjb25kU3RlcDogbnVtYmVyID0gMTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuekNsZWFyVGV4dDogc3RyaW5nID0gJ2NsZWFyJztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelBvcHVwQ2xhc3NOYW1lOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgbnpQbGFjZUhvbGRlciA9ICcnO1xuICBASW5wdXQoKSBuekFkZE9uPzogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56RGVmYXVsdE9wZW5WYWx1ZT86IERhdGU7XG4gIEBJbnB1dCgpIG56RGlzYWJsZWRIb3Vycz86ICgpID0+IG51bWJlcltdO1xuICBASW5wdXQoKSBuekRpc2FibGVkTWludXRlcz86IChob3VyOiBudW1iZXIpID0+IG51bWJlcltdO1xuICBASW5wdXQoKSBuekRpc2FibGVkU2Vjb25kcz86IChob3VyOiBudW1iZXIsIG1pbnV0ZTogbnVtYmVyKSA9PiBudW1iZXJbXTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuekZvcm1hdDogc3RyaW5nID0gJ0hIOm1tOnNzJztcbiAgQElucHV0KCkgbnpPcGVuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56VXNlMTJIb3VyczogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56U3VmZml4SWNvbjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiA9ICdjbG9jay1jaXJjbGUnO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56SGlkZURpc2FibGVkT3B0aW9ucyA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekFsbG93RW1wdHk6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpBdXRvRm9jdXMgPSBmYWxzZTtcblxuICBlbWl0VmFsdWUodmFsdWU6IERhdGUgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSwgdHJ1ZSk7XG5cbiAgICBpZiAodGhpcy5fb25DaGFuZ2UpIHtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vblRvdWNoZWQpIHtcbiAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlOiBEYXRlIHwgbnVsbCwgc3luY1ByZVZhbHVlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoc3luY1ByZVZhbHVlKSB7XG4gICAgICB0aGlzLnByZVZhbHVlID0gaXNWYWxpZCh2YWx1ZSkgPyBuZXcgRGF0ZSh2YWx1ZSEpIDogbnVsbDtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IGlzVmFsaWQodmFsdWUpID8gbmV3IERhdGUodmFsdWUhKSA6IG51bGw7XG4gICAgdGhpcy5pbnB1dFZhbHVlID0gdGhpcy5kYXRlSGVscGVyLmZvcm1hdCh2YWx1ZSwgdGhpcy5uekZvcm1hdCk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBvcGVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56RGlzYWJsZWQgfHwgdGhpcy5uek9wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5mb2N1cygpO1xuICAgIHRoaXMubnpPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLm56T3BlbkNoYW5nZS5lbWl0KHRoaXMubnpPcGVuKTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMubnpPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5uek9wZW5DaGFuZ2UuZW1pdCh0aGlzLm56T3Blbik7XG4gIH1cblxuICB1cGRhdGVBdXRvRm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNJbml0ICYmICF0aGlzLm56RGlzYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLm56QXV0b0ZvY3VzKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuaW5wdXRSZWYubmF0aXZlRWxlbWVudCwgJ2F1dG9mb2N1cycsICdhdXRvZm9jdXMnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuaW5wdXRSZWYubmF0aXZlRWxlbWVudCwgJ2F1dG9mb2N1cycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2tDbGVhckJ0bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuZW1pdFZhbHVlKG51bGwpO1xuICB9XG5cbiAgb25DbGlja091dHNpZGUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2V0Q3VycmVudFZhbHVlQW5kQ2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBvbkZvY3VzKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c2VkID0gdmFsdWU7XG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbnB1dFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICB0aGlzLmlucHV0UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBibHVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlucHV0UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuaW5wdXRSZWYubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgfVxuICB9XG5cbiAgb25LZXl1cEVzYygpOiB2b2lkIHtcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMucHJlVmFsdWUpO1xuICB9XG5cbiAgb25LZXl1cEVudGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56T3BlbiAmJiBpc1ZhbGlkKHRoaXMudmFsdWUpKSB7XG4gICAgICB0aGlzLnNldEN1cnJlbnRWYWx1ZUFuZENsb3NlKCk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5uek9wZW4pIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5wdXRDaGFuZ2Uoc3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uVFJJREVOVCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLmlucHV0UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgICAgdGhpcy5wYXJzZVRpbWVTdHJpbmcoc3RyKTtcbiAgICB9XG4gIH1cblxuICBvblBhbmVsVmFsdWVDaGFuZ2UodmFsdWU6IERhdGUpOiB2b2lkIHtcbiAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cblxuICBzZXRDdXJyZW50VmFsdWVBbmRDbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmVtaXRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBkYXRlSGVscGVyOiBEYXRlSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dFNpemUgPSBNYXRoLm1heCg4LCB0aGlzLm56Rm9ybWF0Lmxlbmd0aCkgKyAyO1xuICAgIHRoaXMub3JpZ2luID0gbmV3IENka092ZXJsYXlPcmlnaW4odGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56VXNlMTJIb3VycywgbnpGb3JtYXQsIG56RGlzYWJsZWQsIG56QXV0b0ZvY3VzIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuelVzZTEySG91cnMgJiYgIW56VXNlMTJIb3Vycy5wcmV2aW91c1ZhbHVlICYmIG56VXNlMTJIb3Vycy5jdXJyZW50VmFsdWUgJiYgIW56Rm9ybWF0KSB7XG4gICAgICB0aGlzLm56Rm9ybWF0ID0gJ2g6bW06c3MgYSc7XG4gICAgfVxuICAgIGlmIChuekRpc2FibGVkKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG56RGlzYWJsZWQuY3VycmVudFZhbHVlO1xuICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmlucHV0UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpbnB1dCwgJ2Rpc2FibGVkJywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUoaW5wdXQsICdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobnpBdXRvRm9jdXMpIHtcbiAgICAgIHRoaXMudXBkYXRlQXV0b0ZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VUaW1lU3RyaW5nKHN0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmRhdGVIZWxwZXIucGFyc2VUaW1lKHN0ciwgdGhpcy5uekZvcm1hdCkgfHwgbnVsbDtcbiAgICBpZiAoaXNWYWxpZCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzSW5pdCA9IHRydWU7XG4gICAgdGhpcy51cGRhdGVBdXRvRm9jdXMoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodGltZTogRGF0ZSB8IG51bGwgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBsZXQgcmVzdWx0OiBEYXRlIHwgbnVsbDtcblxuICAgIGlmICh0aW1lIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmVzdWx0ID0gdGltZTtcbiAgICB9IGVsc2UgaWYgKGlzTmlsKHRpbWUpKSB7XG4gICAgICByZXN1bHQgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuKCdOb24tRGF0ZSB0eXBlIGlzIG5vdCByZWNvbW1lbmRlZCBmb3IgdGltZS1waWNrZXIsIHVzZSBcIkRhdGVcIiB0eXBlLicpO1xuICAgICAgcmVzdWx0ID0gbmV3IERhdGUodGltZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRWYWx1ZShyZXN1bHQsIHRydWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHRpbWU6IERhdGUgfCBudWxsKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm56RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=