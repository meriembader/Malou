/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { PREFIX, warn } from 'ng-zorro-antd/core/logger';
import { BehaviorSubject, of as observableOf, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NzCodeEditorLoadingStatus } from './typings';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/common";
const NZ_CONFIG_MODULE_NAME = 'codeEditor';
function tryTriggerFunc(fn) {
    return (...args) => {
        if (fn) {
            fn(...args);
        }
    };
}
export class NzCodeEditorService {
    constructor(nzConfigService, _document) {
        this.nzConfigService = nzConfigService;
        this.firstEditorInitialized = false;
        this.loaded$ = new Subject();
        this.loadingStatus = NzCodeEditorLoadingStatus.UNLOAD;
        this.option = {};
        this.option$ = new BehaviorSubject(this.option);
        const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
        this.document = _document;
        this.config = Object.assign({}, globalConfig);
        this.option = this.config.defaultEditorOption || {};
        this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME).subscribe(() => {
            const newGlobalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
            if (newGlobalConfig) {
                this._updateDefaultOption(newGlobalConfig.defaultEditorOption);
            }
        });
    }
    _updateDefaultOption(option) {
        this.option = Object.assign(Object.assign({}, this.option), option);
        this.option$.next(this.option);
        if (option.theme) {
            monaco.editor.setTheme(option.theme);
        }
    }
    requestToInit() {
        if (this.loadingStatus === NzCodeEditorLoadingStatus.LOADED) {
            this.onInit();
            return observableOf(this.getLatestOption());
        }
        if (this.loadingStatus === NzCodeEditorLoadingStatus.UNLOAD) {
            if (this.config.useStaticLoading && typeof monaco === 'undefined') {
                warn('You choose to use static loading but it seems that you forget ' +
                    'to config webpack plugin correctly. Please refer to our official website' +
                    'for more details about static loading.');
            }
            else {
                this.loadMonacoScript();
            }
        }
        return this.loaded$.asObservable().pipe(tap(() => this.onInit()), map(() => this.getLatestOption()));
    }
    loadMonacoScript() {
        if (this.config.useStaticLoading) {
            Promise.resolve().then(() => this.onLoad());
            return;
        }
        if (this.loadingStatus === NzCodeEditorLoadingStatus.LOADING) {
            return;
        }
        this.loadingStatus = NzCodeEditorLoadingStatus.LOADING;
        const assetsRoot = this.config.assetsRoot;
        const vs = assetsRoot ? `${assetsRoot}/vs` : 'assets/vs';
        const windowAsAny = window;
        const loadScript = this.document.createElement('script');
        loadScript.type = 'text/javascript';
        loadScript.src = `${vs}/loader.js`;
        loadScript.onload = () => {
            windowAsAny.require.config({
                paths: { vs }
            });
            windowAsAny.require(['vs/editor/editor.main'], () => {
                this.onLoad();
            });
        };
        loadScript.onerror = () => {
            throw new Error(`${PREFIX} cannot load assets of monaco editor from source "${vs}".`);
        };
        this.document.documentElement.appendChild(loadScript);
    }
    onLoad() {
        this.loadingStatus = NzCodeEditorLoadingStatus.LOADED;
        this.loaded$.next(true);
        this.loaded$.complete();
        tryTriggerFunc(this.config.onLoad)();
    }
    onInit() {
        if (!this.firstEditorInitialized) {
            this.firstEditorInitialized = true;
            tryTriggerFunc(this.config.onFirstEditorInit)();
        }
        tryTriggerFunc(this.config.onInit)();
    }
    getLatestOption() {
        return Object.assign({}, this.option);
    }
}
NzCodeEditorService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzCodeEditorService_Factory() { return new NzCodeEditorService(i0.ɵɵinject(i1.NzConfigService), i0.ɵɵinject(i2.DOCUMENT)); }, token: NzCodeEditorService, providedIn: "root" });
NzCodeEditorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzCodeEditorService.ctorParameters = () => [
    { type: NzConfigService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1lZGl0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvY29kZS1lZGl0b3IvIiwic291cmNlcyI6WyJjb2RlLWVkaXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQW9CLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQsT0FBTyxFQUFFLGVBQWUsRUFBYyxFQUFFLElBQUksWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRixPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBdUIseUJBQXlCLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUFJM0UsTUFBTSxxQkFBcUIsR0FBRyxZQUFZLENBQUM7QUFFM0MsU0FBUyxjQUFjLENBQUMsRUFBd0M7SUFDOUQsT0FBTyxDQUFDLEdBQUcsSUFBaUIsRUFBRSxFQUFFO1FBQzlCLElBQUksRUFBRSxFQUFFO1lBQ04sRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDYjtJQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFLRCxNQUFNLE9BQU8sbUJBQW1CO0lBVTlCLFlBQTZCLGVBQWdDLEVBQW9CLFNBQW9CO1FBQXhFLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVJyRCwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDL0IsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFDakMsa0JBQWEsR0FBRyx5QkFBeUIsQ0FBQyxNQUFNLENB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O1lBQ25DLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztTQUNqRDtRQUVELGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVPLGVBQWU7UUFDckIseUJBQVksSUFBSSxDQUFDLE1BQU0sRUFBRztJQUM1QixDQUFDOzs7O1lBbEhGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBckIwQixlQUFlOzRDQWdDd0IsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvZGVFZGl0b3JDb25maWcsIE56Q29uZmlnU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgUFJFRklYLCB3YXJuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2xvZ2dlcic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSm9pbmVkRWRpdG9yT3B0aW9ucywgTnpDb2RlRWRpdG9yTG9hZGluZ1N0YXR1cyB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbmRlY2xhcmUgY29uc3QgbW9uYWNvOiBOelNhZmVBbnk7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRSA9ICdjb2RlRWRpdG9yJztcblxuZnVuY3Rpb24gdHJ5VHJpZ2dlckZ1bmMoZm4/OiAoLi4uYXJnczogTnpTYWZlQW55W10pID0+IE56U2FmZUFueSk6ICguLi5hcmdzOiBOelNhZmVBbnkpID0+IHZvaWQge1xuICByZXR1cm4gKC4uLmFyZ3M6IE56U2FmZUFueVtdKSA9PiB7XG4gICAgaWYgKGZuKSB7XG4gICAgICBmbiguLi5hcmdzKTtcbiAgICB9XG4gIH07XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE56Q29kZUVkaXRvclNlcnZpY2Uge1xuICBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudDtcbiAgcHJpdmF0ZSBmaXJzdEVkaXRvckluaXRpYWxpemVkID0gZmFsc2U7XG4gIHByaXZhdGUgbG9hZGVkJCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gIHByaXZhdGUgbG9hZGluZ1N0YXR1cyA9IE56Q29kZUVkaXRvckxvYWRpbmdTdGF0dXMuVU5MT0FEO1xuICBwcml2YXRlIG9wdGlvbjogSm9pbmVkRWRpdG9yT3B0aW9ucyA9IHt9O1xuICBwcml2YXRlIGNvbmZpZzogQ29kZUVkaXRvckNvbmZpZztcblxuICBvcHRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxKb2luZWRFZGl0b3JPcHRpb25zPih0aGlzLm9wdGlvbik7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSwgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBOelNhZmVBbnkpIHtcbiAgICBjb25zdCBnbG9iYWxDb25maWcgPSB0aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKTtcblxuICAgIHRoaXMuZG9jdW1lbnQgPSBfZG9jdW1lbnQ7XG4gICAgdGhpcy5jb25maWcgPSB7IC4uLmdsb2JhbENvbmZpZyB9O1xuICAgIHRoaXMub3B0aW9uID0gdGhpcy5jb25maWcuZGVmYXVsdEVkaXRvck9wdGlvbiB8fCB7fTtcblxuICAgIHRoaXMubnpDb25maWdTZXJ2aWNlLmdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IG5ld0dsb2JhbENvbmZpZzogTnpTYWZlQW55ID0gdGhpcy5uekNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnRm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSk7XG4gICAgICBpZiAobmV3R2xvYmFsQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZURlZmF1bHRPcHRpb24obmV3R2xvYmFsQ29uZmlnLmRlZmF1bHRFZGl0b3JPcHRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRGVmYXVsdE9wdGlvbihvcHRpb246IEpvaW5lZEVkaXRvck9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLm9wdGlvbiA9IHsgLi4udGhpcy5vcHRpb24sIC4uLm9wdGlvbiB9O1xuICAgIHRoaXMub3B0aW9uJC5uZXh0KHRoaXMub3B0aW9uKTtcblxuICAgIGlmIChvcHRpb24udGhlbWUpIHtcbiAgICAgIG1vbmFjby5lZGl0b3Iuc2V0VGhlbWUob3B0aW9uLnRoZW1lKTtcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0VG9Jbml0KCk6IE9ic2VydmFibGU8Sm9pbmVkRWRpdG9yT3B0aW9ucz4ge1xuICAgIGlmICh0aGlzLmxvYWRpbmdTdGF0dXMgPT09IE56Q29kZUVkaXRvckxvYWRpbmdTdGF0dXMuTE9BREVEKSB7XG4gICAgICB0aGlzLm9uSW5pdCgpO1xuICAgICAgcmV0dXJuIG9ic2VydmFibGVPZih0aGlzLmdldExhdGVzdE9wdGlvbigpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2FkaW5nU3RhdHVzID09PSBOekNvZGVFZGl0b3JMb2FkaW5nU3RhdHVzLlVOTE9BRCkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLnVzZVN0YXRpY0xvYWRpbmcgJiYgdHlwZW9mIG1vbmFjbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnWW91IGNob29zZSB0byB1c2Ugc3RhdGljIGxvYWRpbmcgYnV0IGl0IHNlZW1zIHRoYXQgeW91IGZvcmdldCAnICtcbiAgICAgICAgICAgICd0byBjb25maWcgd2VicGFjayBwbHVnaW4gY29ycmVjdGx5LiBQbGVhc2UgcmVmZXIgdG8gb3VyIG9mZmljaWFsIHdlYnNpdGUnICtcbiAgICAgICAgICAgICdmb3IgbW9yZSBkZXRhaWxzIGFib3V0IHN0YXRpYyBsb2FkaW5nLidcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZE1vbmFjb1NjcmlwdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmxvYWRlZCQuYXNPYnNlcnZhYmxlKCkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB0aGlzLm9uSW5pdCgpKSxcbiAgICAgIG1hcCgoKSA9PiB0aGlzLmdldExhdGVzdE9wdGlvbigpKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRNb25hY29TY3JpcHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnVzZVN0YXRpY0xvYWRpbmcpIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5vbkxvYWQoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9hZGluZ1N0YXR1cyA9PT0gTnpDb2RlRWRpdG9yTG9hZGluZ1N0YXR1cy5MT0FESU5HKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkaW5nU3RhdHVzID0gTnpDb2RlRWRpdG9yTG9hZGluZ1N0YXR1cy5MT0FESU5HO1xuXG4gICAgY29uc3QgYXNzZXRzUm9vdCA9IHRoaXMuY29uZmlnLmFzc2V0c1Jvb3Q7XG4gICAgY29uc3QgdnMgPSBhc3NldHNSb290ID8gYCR7YXNzZXRzUm9vdH0vdnNgIDogJ2Fzc2V0cy92cyc7XG4gICAgY29uc3Qgd2luZG93QXNBbnkgPSB3aW5kb3cgYXMgTnpTYWZlQW55O1xuICAgIGNvbnN0IGxvYWRTY3JpcHQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgbG9hZFNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgbG9hZFNjcmlwdC5zcmMgPSBgJHt2c30vbG9hZGVyLmpzYDtcbiAgICBsb2FkU2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHdpbmRvd0FzQW55LnJlcXVpcmUuY29uZmlnKHtcbiAgICAgICAgcGF0aHM6IHsgdnMgfVxuICAgICAgfSk7XG4gICAgICB3aW5kb3dBc0FueS5yZXF1aXJlKFsndnMvZWRpdG9yL2VkaXRvci5tYWluJ10sICgpID0+IHtcbiAgICAgICAgdGhpcy5vbkxvYWQoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgbG9hZFNjcmlwdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke1BSRUZJWH0gY2Fubm90IGxvYWQgYXNzZXRzIG9mIG1vbmFjbyBlZGl0b3IgZnJvbSBzb3VyY2UgXCIke3ZzfVwiLmApO1xuICAgIH07XG5cbiAgICB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChsb2FkU2NyaXB0KTtcbiAgfVxuXG4gIHByaXZhdGUgb25Mb2FkKCk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9IE56Q29kZUVkaXRvckxvYWRpbmdTdGF0dXMuTE9BREVEO1xuICAgIHRoaXMubG9hZGVkJC5uZXh0KHRydWUpO1xuICAgIHRoaXMubG9hZGVkJC5jb21wbGV0ZSgpO1xuXG4gICAgdHJ5VHJpZ2dlckZ1bmModGhpcy5jb25maWcub25Mb2FkKSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmZpcnN0RWRpdG9ySW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuZmlyc3RFZGl0b3JJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICB0cnlUcmlnZ2VyRnVuYyh0aGlzLmNvbmZpZy5vbkZpcnN0RWRpdG9ySW5pdCkoKTtcbiAgICB9XG5cbiAgICB0cnlUcmlnZ2VyRnVuYyh0aGlzLmNvbmZpZy5vbkluaXQpKCk7XG4gIH1cblxuICBwcml2YXRlIGdldExhdGVzdE9wdGlvbigpOiBKb2luZWRFZGl0b3JPcHRpb25zIHtcbiAgICByZXR1cm4geyAuLi50aGlzLm9wdGlvbiB9O1xuICB9XG59XG4iXX0=