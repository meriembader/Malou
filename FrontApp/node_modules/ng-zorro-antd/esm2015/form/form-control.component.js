/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Host, Input, Optional, Renderer2, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';
import { helpMotion } from 'ng-zorro-antd/core/animation';
import { toBoolean } from 'ng-zorro-antd/core/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject, Subscription } from 'rxjs';
import { filter, startWith, takeUntil, tap } from 'rxjs/operators';
import { NzFormDirective } from './form.directive';
import { NzFormItemComponent } from './form-item.component';
const iconTypeMap = {
    error: 'close-circle-fill',
    validating: 'loading',
    success: 'check-circle-fill',
    warning: 'exclamation-circle-fill'
};
export class NzFormControlComponent {
    constructor(elementRef, nzFormItemComponent, cdr, renderer, i18n, nzFormDirective) {
        var _a, _b;
        this.nzFormItemComponent = nzFormItemComponent;
        this.cdr = cdr;
        this.nzFormDirective = nzFormDirective;
        this._hasFeedback = false;
        this.validateChanges = Subscription.EMPTY;
        this.validateString = null;
        this.destroyed$ = new Subject();
        this.status = null;
        this.validateControl = null;
        this.iconType = null;
        this.innerTip = null;
        this.nzAutoTips = {};
        this.nzDisableAutoTips = 'default';
        renderer.addClass(elementRef.nativeElement, 'ant-form-item-control');
        this.subscribeAutoTips(i18n.localeChange.pipe(tap(locale => (this.localeId = locale.locale))));
        this.subscribeAutoTips((_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.getInputObservable('nzAutoTips'));
        this.subscribeAutoTips((_b = this.nzFormDirective) === null || _b === void 0 ? void 0 : _b.getInputObservable('nzDisableAutoTips').pipe(filter(() => this.nzDisableAutoTips === 'default')));
    }
    get disableAutoTips() {
        var _a;
        return this.nzDisableAutoTips !== 'default' ? toBoolean(this.nzDisableAutoTips) : (_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.nzDisableAutoTips;
    }
    set nzHasFeedback(value) {
        this._hasFeedback = toBoolean(value);
        if (this.nzFormItemComponent) {
            this.nzFormItemComponent.setHasFeedback(this._hasFeedback);
        }
    }
    get nzHasFeedback() {
        return this._hasFeedback;
    }
    set nzValidateStatus(value) {
        if (value instanceof AbstractControl || value instanceof NgModel) {
            this.validateControl = value;
            this.validateString = null;
            this.watchControl();
        }
        else if (value instanceof FormControlName) {
            this.validateControl = value.control;
            this.validateString = null;
            this.watchControl();
        }
        else {
            this.validateString = value;
            this.validateControl = null;
            this.setStatus();
        }
    }
    watchControl() {
        this.validateChanges.unsubscribe();
        /** miss detect https://github.com/angular/angular/issues/10887 **/
        if (this.validateControl && this.validateControl.statusChanges) {
            this.validateChanges = this.validateControl.statusChanges.pipe(startWith(null), takeUntil(this.destroyed$)).subscribe(_ => {
                if (!this.disableAutoTips) {
                    this.updateAutoErrorTip();
                }
                this.setStatus();
                this.cdr.markForCheck();
            });
        }
    }
    setStatus() {
        this.status = this.getControlStatus(this.validateString);
        this.iconType = this.status ? iconTypeMap[this.status] : null;
        this.innerTip = this.getInnerTip(this.status);
        if (this.nzFormItemComponent) {
            this.nzFormItemComponent.setWithHelpViaTips(!!this.innerTip);
            this.nzFormItemComponent.setStatus(this.status);
        }
    }
    getControlStatus(validateString) {
        let status;
        if (validateString === 'warning' || this.validateControlStatus('INVALID', 'warning')) {
            status = 'warning';
        }
        else if (validateString === 'error' || this.validateControlStatus('INVALID')) {
            status = 'error';
        }
        else if (validateString === 'validating' || validateString === 'pending' || this.validateControlStatus('PENDING')) {
            status = 'validating';
        }
        else if (validateString === 'success' || this.validateControlStatus('VALID')) {
            status = 'success';
        }
        else {
            status = null;
        }
        return status;
    }
    validateControlStatus(validStatus, statusType) {
        if (!this.validateControl) {
            return false;
        }
        else {
            const { dirty, touched, status } = this.validateControl;
            return (!!dirty || !!touched) && (statusType ? this.validateControl.hasError(statusType) : status === validStatus);
        }
    }
    getInnerTip(status) {
        switch (status) {
            case 'error':
                return (!this.disableAutoTips && this.autoErrorTip) || this.nzErrorTip || null;
            case 'validating':
                return this.nzValidatingTip || null;
            case 'success':
                return this.nzSuccessTip || null;
            case 'warning':
                return this.nzWarningTip || null;
            default:
                return null;
        }
    }
    updateAutoErrorTip() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        if (this.validateControl) {
            const errors = this.validateControl.errors || {};
            let autoErrorTip = '';
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    autoErrorTip = (_l = (_g = (_e = (_b = (_a = errors[key]) === null || _a === void 0 ? void 0 : _a[this.localeId]) !== null && _b !== void 0 ? _b : (_d = (_c = this.nzAutoTips) === null || _c === void 0 ? void 0 : _c[this.localeId]) === null || _d === void 0 ? void 0 : _d[key]) !== null && _e !== void 0 ? _e : (_f = this.nzAutoTips.default) === null || _f === void 0 ? void 0 : _f[key]) !== null && _g !== void 0 ? _g : (_k = (_j = (_h = this.nzFormDirective) === null || _h === void 0 ? void 0 : _h.nzAutoTips) === null || _j === void 0 ? void 0 : _j[this.localeId]) === null || _k === void 0 ? void 0 : _k[key]) !== null && _l !== void 0 ? _l : (_o = (_m = this.nzFormDirective) === null || _m === void 0 ? void 0 : _m.nzAutoTips.default) === null || _o === void 0 ? void 0 : _o[key];
                }
                if (!!autoErrorTip) {
                    break;
                }
            }
            this.autoErrorTip = autoErrorTip;
        }
    }
    subscribeAutoTips(observable) {
        observable === null || observable === void 0 ? void 0 : observable.pipe(takeUntil(this.destroyed$)).subscribe(() => {
            if (!this.disableAutoTips) {
                this.updateAutoErrorTip();
                this.setStatus();
                this.cdr.markForCheck();
            }
        });
    }
    ngOnChanges(changes) {
        const { nzDisableAutoTips, nzAutoTips, nzSuccessTip, nzWarningTip, nzErrorTip, nzValidatingTip } = changes;
        if (nzDisableAutoTips || nzAutoTips) {
            this.updateAutoErrorTip();
            this.setStatus();
        }
        else if (nzSuccessTip || nzWarningTip || nzErrorTip || nzValidatingTip) {
            this.setStatus();
        }
    }
    ngOnInit() {
        this.setStatus();
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    ngAfterContentInit() {
        if (!this.validateControl && !this.validateString) {
            if (this.defaultValidateControl instanceof FormControlDirective) {
                this.nzValidateStatus = this.defaultValidateControl.control;
            }
            else {
                this.nzValidateStatus = this.defaultValidateControl;
            }
        }
    }
}
NzFormControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-form-control',
                exportAs: 'nzFormControl',
                preserveWhitespaces: false,
                animations: [helpMotion],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="ant-form-item-control-input">
      <div class="ant-form-item-control-input-content">
        <ng-content></ng-content>
      </div>
      <span class="ant-form-item-children-icon">
        <i *ngIf="nzHasFeedback && iconType" nz-icon [nzType]="iconType"></i>
      </span>
    </div>
    <div [ngClass]="['ant-form-item-explain', 'ant-form-item-explain-' + status]" *ngIf="innerTip">
      <div @helpMotion>
        <ng-container *nzStringTemplateOutlet="innerTip; context: { $implicit: validateControl }">{{ innerTip }}</ng-container>
      </div>
    </div>
    <div class="ant-form-item-extra" *ngIf="nzExtra">
      <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
    </div>
  `
            },] }
];
NzFormControlComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NzFormItemComponent, decorators: [{ type: Optional }, { type: Host }] },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: NzI18nService },
    { type: NzFormDirective, decorators: [{ type: Optional }] }
];
NzFormControlComponent.propDecorators = {
    defaultValidateControl: [{ type: ContentChild, args: [NgControl, { static: false },] }],
    nzSuccessTip: [{ type: Input }],
    nzWarningTip: [{ type: Input }],
    nzErrorTip: [{ type: Input }],
    nzValidatingTip: [{ type: Input }],
    nzExtra: [{ type: Input }],
    nzAutoTips: [{ type: Input }],
    nzDisableAutoTips: [{ type: Input }],
    nzHasFeedback: [{ type: Input }],
    nzValidateStatus: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvZm9ybS8iLCJzb3VyY2VzIjpbImZvcm0tY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsSUFBSSxFQUNKLEtBQUssRUFJTCxRQUFRLEVBQ1IsU0FBUyxFQUdULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVuRCxPQUFPLEVBQTJCLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFckYsTUFBTSxXQUFXLEdBQUc7SUFDbEIsS0FBSyxFQUFFLG1CQUFtQjtJQUMxQixVQUFVLEVBQUUsU0FBUztJQUNyQixPQUFPLEVBQUUsbUJBQW1CO0lBQzVCLE9BQU8sRUFBRSx5QkFBeUI7Q0FDMUIsQ0FBQztBQTRCWCxNQUFNLE9BQU8sc0JBQXNCO0lBNkpqQyxZQUNFLFVB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QUNqRCxJQUFJLElBQUksQ0FBQyxzQkFBc0IsWUFBWSxvQkFBb0IsRUFBRTtnQkFDL0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUM7YUFDN0Q7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxzQkFBdUIsQ0FBQzthQUN0RDtTQUNGO0lBQ0gsQ0FBQzs7O1lBcE9GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsZUFBZTtnQkFDekIsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUN4QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7YUFDRjs7O1lBeERDLFVBQVU7WUFzQnNCLG1CQUFtQix1QkFrTWhELFFBQVEsWUFBSSxJQUFJO1lBM05uQixpQkFBaUI7WUFVakIsU0FBUztZQVVGLGFBQWE7WUFHYixlQUFlLHVCQXdNbkIsUUFBUTs7O3FDQTdJVixZQUFZLFNBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTsyQkFDekMsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7OEJBQ0wsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUs7Z0NBQ0wsS0FBSzs0QkFFTCxLQUFLOytCQVlMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbERpcmVjdGl2ZSwgRm9ybUNvbnRyb2xOYW1lLCBOZ0NvbnRyb2wsIE5nTW9kZWwgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBoZWxwTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IHRvQm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN0YXJ0V2l0aCwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOekZvcm1EaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0uZGlyZWN0aXZlJztcblxuaW1wb3J0IHsgTnpGb3JtQ29udHJvbFN0YXR1c1R5cGUsIE56Rm9ybUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2Zvcm0taXRlbS5jb21wb25lbnQnO1xuXG5jb25zdCBpY29uVHlwZU1hcCA9IHtcbiAgZXJyb3I6ICdjbG9zZS1jaXJjbGUtZmlsbCcsXG4gIHZhbGlkYXRpbmc6ICdsb2FkaW5nJyxcbiAgc3VjY2VzczogJ2NoZWNrLWNpcmNsZS1maWxsJyxcbiAgd2FybmluZzogJ2V4Y2xhbWF0aW9uLWNpcmNsZS1maWxsJ1xufSBhcyBjb25zdDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotZm9ybS1jb250cm9sJyxcbiAgZXhwb3J0QXM6ICduekZvcm1Db250cm9sJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGFuaW1hdGlvbnM6IFtoZWxwTW90aW9uXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1mb3JtLWl0ZW0tY29udHJvbC1pbnB1dFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1mb3JtLWl0ZW0tY29udHJvbC1pbnB1dC1jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtZm9ybS1pdGVtLWNoaWxkcmVuLWljb25cIj5cbiAgICAgICAgPGkgKm5nSWY9XCJuekhhc0ZlZWRiYWNrICYmIGljb25UeXBlXCIgbnotaWNvbiBbbnpUeXBlXT1cImljb25UeXBlXCI+PC9pPlxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgW25nQ2xhc3NdPVwiWydhbnQtZm9ybS1pdGVtLWV4cGxhaW4nLCAnYW50LWZvcm0taXRlbS1leHBsYWluLScgKyBzdGF0dXNdXCIgKm5nSWY9XCJpbm5lclRpcFwiPlxuICAgICAgPGRpdiBAaGVscE1vdGlvbj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cImlubmVyVGlwOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogdmFsaWRhdGVDb250cm9sIH1cIj57eyBpbm5lclRpcCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFudC1mb3JtLWl0ZW0tZXh0cmFcIiAqbmdJZj1cIm56RXh0cmFcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekV4dHJhXCI+e3sgbnpFeHRyYSB9fTwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56Rm9ybUNvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpIYXNGZWVkYmFjazogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpSZXF1aXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpOb0NvbG9uOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVBdXRvVGlwczogQm9vbGVhbklucHV0O1xuXG4gIHByaXZhdGUgX2hhc0ZlZWRiYWNrID0gZmFsc2U7XG4gIHByaXZhdGUgdmFsaWRhdGVDaGFuZ2VzOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgdmFsaWRhdGVTdHJpbmc6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGRlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGxvY2FsZUlkITogc3RyaW5nO1xuICBwcml2YXRlIGF1dG9FcnJvclRpcD86IHN0cmluZztcblxuICBwcml2YXRlIGdldCBkaXNhYmxlQXV0b1RpcHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubnpEaXNhYmxlQXV0b1RpcHMgIT09ICdkZWZhdWx0JyA/IHRvQm9vbGVhbih0aGlzLm56RGlzYWJsZUF1dG9UaXBzKSA6IHRoaXMubnpGb3JtRGlyZWN0aXZlPy5uekRpc2FibGVBdXRvVGlwcztcbiAgfVxuXG4gIHN0YXR1czogTnpGb3JtQ29udHJvbFN0YXR1c1R5cGUgPSBudWxsO1xuICB2YWxpZGF0ZUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCB8IE5nTW9kZWwgfCBudWxsID0gbnVsbDtcbiAgaWNvblR5cGU6IHR5cGVvZiBpY29uVHlwZU1hcFtrZXlvZiB0eXBlb2YgaWNvblR5cGVNYXBdIHwgbnVsbCA9IG51bGw7XG4gIGlubmVyVGlwOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogQWJzdHJhY3RDb250cm9sIHwgTmdNb2RlbCB9PiB8IG51bGwgPSBudWxsO1xuXG4gIEBDb250ZW50Q2hpbGQoTmdDb250cm9sLCB7IHN0YXRpYzogZmFsc2UgfSkgZGVmYXVsdFZhbGlkYXRlQ29udHJvbD86IEZvcm1Db250cm9sTmFtZSB8IEZvcm1Db250cm9sRGlyZWN0aXZlO1xuICBASW5wdXQoKSBuelN1Y2Nlc3NUaXA/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogQWJzdHJhY3RDb250cm9sIHwgTmdNb2RlbCB9PjtcbiAgQElucHV0KCkgbnpXYXJuaW5nVGlwPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IEFic3RyYWN0Q29udHJvbCB8IE5nTW9kZWwgfT47XG4gIEBJbnB1dCgpIG56RXJyb3JUaXA/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogQWJzdHJhY3RDb250cm9sIHwgTmdNb2RlbCB9PjtcbiAgQElucHV0KCkgbnpWYWxpZGF0aW5nVGlwPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IEFic3RyYWN0Q29udHJvbCB8IE5nTW9kZWwgfT47XG4gIEBJbnB1dCgpIG56RXh0cmE/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpBdXRvVGlwczogUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgc3RyaW5nPj4gPSB7fTtcbiAgQElucHV0KCkgbnpEaXNhYmxlQXV0b1RpcHM6IGJvb2xlYW4gfCAnZGVmYXVsdCcgPSAnZGVmYXVsdCc7XG5cbiAgQElucHV0KClcbiAgc2V0IG56SGFzRmVlZGJhY2sodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNGZWVkYmFjayA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKHRoaXMubnpGb3JtSXRlbUNvbXBvbmVudCkge1xuICAgICAgdGhpcy5uekZvcm1JdGVtQ29tcG9uZW50LnNldEhhc0ZlZWRiYWNrKHRoaXMuX2hhc0ZlZWRiYWNrKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpIYXNGZWVkYmFjaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzRmVlZGJhY2s7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpWYWxpZGF0ZVN0YXR1cyh2YWx1ZTogc3RyaW5nIHwgQWJzdHJhY3RDb250cm9sIHwgRm9ybUNvbnRyb2xOYW1lIHwgTmdNb2RlbCkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFic3RyYWN0Q29udHJvbCB8fCB2YWx1ZSBpbnN0YW5jZW9mIE5nTW9kZWwpIHtcbiAgICAgIHRoaXMudmFsaWRhdGVDb250cm9sID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbGlkYXRlU3RyaW5nID0gbnVsbDtcbiAgICAgIHRoaXMud2F0Y2hDb250cm9sKCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZvcm1Db250cm9sTmFtZSkge1xuICAgICAgdGhpcy52YWxpZGF0ZUNvbnRyb2wgPSB2YWx1ZS5jb250cm9sO1xuICAgICAgdGhpcy52YWxpZGF0ZVN0cmluZyA9IG51bGw7XG4gICAgICB0aGlzLndhdGNoQ29udHJvbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkYXRlU3RyaW5nID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbGlkYXRlQ29udHJvbCA9IG51bGw7XG4gICAgICB0aGlzLnNldFN0YXR1cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hDb250cm9sKCk6IHZvaWQge1xuICAgIHRoaXMudmFsaWRhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgLyoqIG1pc3MgZGV0ZWN0IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEwODg3ICoqL1xuICAgIGlmICh0aGlzLnZhbGlkYXRlQ29udHJvbCAmJiB0aGlzLnZhbGlkYXRlQ29udHJvbC5zdGF0dXNDaGFuZ2VzKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlQ2hhbmdlcyA9IHRoaXMudmFsaWRhdGVDb250cm9sLnN0YXR1c0NoYW5nZXMucGlwZShzdGFydFdpdGgobnVsbCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpKS5zdWJzY3JpYmUoXyA9PiB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlQXV0b1RpcHMpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUF1dG9FcnJvclRpcCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdHVzKCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdGF0dXMoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0dXMgPSB0aGlzLmdldENvbnRyb2xTdGF0dXModGhpcy52YWxpZGF0ZVN0cmluZyk7XG4gICAgdGhpcy5pY29uVHlwZSA9IHRoaXMuc3RhdHVzID8gaWNvblR5cGVNYXBbdGhpcy5zdGF0dXNdIDogbnVsbDtcbiAgICB0aGlzLmlubmVyVGlwID0gdGhpcy5nZXRJbm5lclRpcCh0aGlzLnN0YXR1cyk7XG4gICAgaWYgKHRoaXMubnpGb3JtSXRlbUNvbXBvbmVudCkge1xuICAgICAgdGhpcy5uekZvcm1JdGVtQ29tcG9uZW50LnNldFdpdGhIZWxwVmlhVGlwcyghIXRoaXMuaW5uZXJUaXApO1xuICAgICAgdGhpcy5uekZvcm1JdGVtQ29tcG9uZW50LnNldFN0YXR1cyh0aGlzLnN0YXR1cyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb250cm9sU3RhdHVzKHZhbGlkYXRlU3RyaW5nOiBzdHJpbmcgfCBudWxsKTogTnpGb3JtQ29udHJvbFN0YXR1c1R5cGUge1xuICAgIGxldCBzdGF0dXM6IE56Rm9ybUNvbnRyb2xTdGF0dXNUeXBlO1xuXG4gICAgaWYgKHZhbGlkYXRlU3RyaW5nID09PSAnd2FybmluZycgfHwgdGhpcy52YWxpZGF0ZUNvbnRyb2xTdGF0dXMoJ0lOVkFMSUQnLCAnd2FybmluZycpKSB7XG4gICAgICBzdGF0dXMgPSAnd2FybmluZyc7XG4gICAgfSBlbHNlIGlmICh2YWxpZGF0ZVN0cmluZyA9PT0gJ2Vycm9yJyB8fCB0aGlzLnZhbGlkYXRlQ29udHJvbFN0YXR1cygnSU5WQUxJRCcpKSB7XG4gICAgICBzdGF0dXMgPSAnZXJyb3InO1xuICAgIH0gZWxzZSBpZiAodmFsaWRhdGVTdHJpbmcgPT09ICd2YWxpZGF0aW5nJyB8fCB2YWxpZGF0ZVN0cmluZyA9PT0gJ3BlbmRpbmcnIHx8IHRoaXMudmFsaWRhdGVDb250cm9sU3RhdHVzKCdQRU5ESU5HJykpIHtcbiAgICAgIHN0YXR1cyA9ICd2YWxpZGF0aW5nJztcbiAgICB9IGVsc2UgaWYgKHZhbGlkYXRlU3RyaW5nID09PSAnc3VjY2VzcycgfHwgdGhpcy52YWxpZGF0ZUNvbnRyb2xTdGF0dXMoJ1ZBTElEJykpIHtcbiAgICAgIHN0YXR1cyA9ICdzdWNjZXNzJztcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdHVzO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZUNvbnRyb2xTdGF0dXModmFsaWRTdGF0dXM6IHN0cmluZywgc3RhdHVzVHlwZT86IE56Rm9ybUNvbnRyb2xTdGF0dXNUeXBlKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlQ29udHJvbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7IGRpcnR5LCB0b3VjaGVkLCBzdGF0dXMgfSA9IHRoaXMudmFsaWRhdGVDb250cm9sO1xuICAgICAgcmV0dXJuICghIWRpcnR5IHx8ICEhdG91Y2hlZCkgJiYgKHN0YXR1c1R5cGUgPyB0aGlzLnZhbGlkYXRlQ29udHJvbC5oYXNFcnJvcihzdGF0dXNUeXBlKSA6IHN0YXR1cyA9PT0gdmFsaWRTdGF0dXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW5uZXJUaXAoc3RhdHVzOiBOekZvcm1Db250cm9sU3RhdHVzVHlwZSk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBBYnN0cmFjdENvbnRyb2wgfCBOZ01vZGVsIH0+IHwgbnVsbCB7XG4gICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgcmV0dXJuICghdGhpcy5kaXNhYmxlQXV0b1RpcHMgJiYgdGhpcy5hdXRvRXJyb3JUaXApIHx8IHRoaXMubnpFcnJvclRpcCB8fCBudWxsO1xuICAgICAgY2FzZSAndmFsaWRhdGluZyc6XG4gICAgICAgIHJldHVybiB0aGlzLm56VmFsaWRhdGluZ1RpcCB8fCBudWxsO1xuICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgIHJldHVybiB0aGlzLm56U3VjY2Vzc1RpcCB8fCBudWxsO1xuICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgIHJldHVybiB0aGlzLm56V2FybmluZ1RpcCB8fCBudWxsO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBdXRvRXJyb3JUaXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVDb250cm9sKSB7XG4gICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLnZhbGlkYXRlQ29udHJvbC5lcnJvcnMgfHwge307XG4gICAgICBsZXQgYXV0b0Vycm9yVGlwID0gJyc7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBlcnJvcnMpIHtcbiAgICAgICAgaWYgKGVycm9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgYXV0b0Vycm9yVGlwID1cbiAgICAgICAgICAgIGVycm9yc1trZXldPy5bdGhpcy5sb2NhbGVJZF0gPz9cbiAgICAgICAgICAgIHRoaXMubnpBdXRvVGlwcz8uW3RoaXMubG9jYWxlSWRdPy5ba2V5XSA/P1xuICAgICAgICAgICAgdGhpcy5uekF1dG9UaXBzLmRlZmF1bHQ/LltrZXldID8/XG4gICAgICAgICAgICB0aGlzLm56Rm9ybURpcmVjdGl2ZT8ubnpBdXRvVGlwcz8uW3RoaXMubG9jYWxlSWRdPy5ba2V5XSA/P1xuICAgICAgICAgICAgdGhpcy5uekZvcm1EaXJlY3RpdmU/Lm56QXV0b1RpcHMuZGVmYXVsdD8uW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhYXV0b0Vycm9yVGlwKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuYXV0b0Vycm9yVGlwID0gYXV0b0Vycm9yVGlwO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlQXV0b1RpcHMob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxOelNhZmVBbnk+KTogdm9pZCB7XG4gICAgb2JzZXJ2YWJsZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5kaXNhYmxlQXV0b1RpcHMpIHtcbiAgICAgICAgdGhpcy51cGRhdGVBdXRvRXJyb3JUaXAoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0dXMoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBuekZvcm1JdGVtQ29tcG9uZW50OiBOekZvcm1JdGVtQ29tcG9uZW50LFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGkxOG46IE56STE4blNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuekZvcm1EaXJlY3RpdmU6IE56Rm9ybURpcmVjdGl2ZVxuICApIHtcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhbnQtZm9ybS1pdGVtLWNvbnRyb2wnKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlQXV0b1RpcHMoaTE4bi5sb2NhbGVDaGFuZ2UucGlwZSh0YXAobG9jYWxlID0+ICh0aGlzLmxvY2FsZUlkID0gbG9jYWxlLmxvY2FsZSkpKSk7XG4gICAgdGhpcy5zdWJzY3JpYmVBdXRvVGlwcyh0aGlzLm56Rm9ybURpcmVjdGl2ZT8uZ2V0SW5wdXRPYnNlcnZhYmxlKCduekF1dG9UaXBzJykpO1xuICAgIHRoaXMuc3Vic2NyaWJlQXV0b1RpcHMoXG4gICAgICB0aGlzLm56Rm9ybURpcmVjdGl2ZT8uZ2V0SW5wdXRPYnNlcnZhYmxlKCduekRpc2FibGVBdXRvVGlwcycpLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMubnpEaXNhYmxlQXV0b1RpcHMgPT09ICdkZWZhdWx0JykpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56RGlzYWJsZUF1dG9UaXBzLCBuekF1dG9UaXBzLCBuelN1Y2Nlc3NUaXAsIG56V2FybmluZ1RpcCwgbnpFcnJvclRpcCwgbnpWYWxpZGF0aW5nVGlwIH0gPSBjaGFuZ2VzO1xuXG4gICAgaWYgKG56RGlzYWJsZUF1dG9UaXBzIHx8IG56QXV0b1RpcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlQXV0b0Vycm9yVGlwKCk7XG4gICAgICB0aGlzLnNldFN0YXR1cygpO1xuICAgIH0gZWxzZSBpZiAobnpTdWNjZXNzVGlwIHx8IG56V2FybmluZ1RpcCB8fCBuekVycm9yVGlwIHx8IG56VmFsaWRhdGluZ1RpcCkge1xuICAgICAgdGhpcy5zZXRTdGF0dXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFN0YXR1cygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95ZWQkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3llZCQuY29tcGxldGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVDb250cm9sICYmICF0aGlzLnZhbGlkYXRlU3RyaW5nKSB7XG4gICAgICBpZiAodGhpcy5kZWZhdWx0VmFsaWRhdGVDb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2xEaXJlY3RpdmUpIHtcbiAgICAgICAgdGhpcy5uelZhbGlkYXRlU3RhdHVzID0gdGhpcy5kZWZhdWx0VmFsaWRhdGVDb250cm9sLmNvbnRyb2w7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm56VmFsaWRhdGVTdGF0dXMgPSB0aGlzLmRlZmF1bHRWYWxpZGF0ZUNvbnRyb2whO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19