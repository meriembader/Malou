/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { formatDate } from '@angular/common';
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import fnsFormat from 'date-fns/format';
import fnsGetISOWeek from 'date-fns/getISOWeek';
import fnsParse from 'date-fns/parse';
import { ɵNgTimeParser } from 'ng-zorro-antd/core/time';
import { mergeDateConfig, NZ_DATE_CONFIG } from './date-config';
import { NzI18nService } from './nz-i18n.service';
import * as i0 from "@angular/core";
import * as i1 from "./date-config";
export function DATE_HELPER_SERVICE_FACTORY(injector, config) {
    const i18n = injector.get(NzI18nService);
    return i18n.getDateLocale() ? new DateHelperByDateFns(i18n, config) : new DateHelperByDatePipe(i18n, config);
}
/**
 * Abstract DateHelperService(Token via Class)
 * Compatibility: compact for original usage by default which using DatePipe
 */
export class DateHelperService {
    constructor(i18n, config) {
        this.i18n = i18n;
        this.config = config;
        this.config = mergeDateConfig(this.config);
    }
}
DateHelperService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DateHelperService_Factory() { return DATE_HELPER_SERVICE_FACTORY(i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.NZ_DATE_CONFIG, 8)); }, token: DateHelperService, providedIn: "root" });
DateHelperService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                useFactory: DATE_HELPER_SERVICE_FACTORY,
                deps: [Injector, [new Optional(), NZ_DATE_CONFIG]]
            },] }
];
DateHelperService.ctorParameters = () => [
    { type: NzI18nService },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_DATE_CONFIG,] }] }
];
/**
 * DateHelper that handles date formats with date-fns
 */
export class DateHelperByDateFns extends DateHelperService {
    getISOWeek(date) {
        return fnsGetISOWeek(date);
    }
    // Use date-fns's "weekStartsOn" to support different locale when "config.firstDayOfWeek" is null
    // https://github.com/date-fns/date-fns/blob/v2.0.0-alpha.27/src/locale/en-US/index.js#L23
    getFirstDayOfWeek() {
        let defaultWeekStartsOn;
        try {
            defaultWeekStartsOn = this.i18n.getDateLocale().options.weekStartsOn;
        }
        catch (e) {
            defaultWeekStartsOn = 1;
        }
        return this.config.firstDayOfWeek == null ? defaultWeekStartsOn : this.config.firstDayOfWeek;
    }
    /**
     * Format a date
     * @see https://date-fns.org/docs/format#description
     * @param date Date
     * @param formatStr format string
     */
    format(date, formatStr) {
        return date ? fnsFormat(date, formatStr, { locale: this.i18n.getDateLocale() }) : '';
    }
    parseDate(text, formatStr) {
        return fnsParse(text, formatStr, new Date(), {
            locale: this.i18n.getDateLocale(),
            weekStartsOn: this.getFirstDayOfWeek()
        });
    }
    parseTime(text, formatStr) {
        return this.parseDate(text, formatStr);
    }
}
DateHelperByDateFns.ɵprov = i0.ɵɵdefineInjectable({ factory: function DateHelperByDateFns_Factory() { return DATE_HELPER_SERVICE_FACTORY(i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.NZ_DATE_CONFIG, 8)); }, token: DateHelperByDateFns, providedIn: "root" });
/**
 * DateHelper that handles date formats with angular's date-pipe
 *
 * @see https://github.com/NG-ZORRO/ng-zorro-antd/issues/2406 - DatePipe may cause non-standard week bug, see:
 *
 */
export class DateHelperByDatePipe extends DateHelperService {
    getISOWeek(date) {
        return +this.format(date, 'w');
    }
    getFirstDayOfWeek() {
        if (this.config.firstDayOfWeek === undefined) {
            const locale = this.i18n.getLocaleId();
            return locale && ['zh-cn', 'zh-tw'].indexOf(locale.toLowerCase()) > -1 ? 1 : 0;
        }
        return this.config.firstDayOfWeek;
    }
    format(date, formatStr) {
        return date ? formatDate(date, formatStr, this.i18n.getLocaleId()) : '';
    }
    parseDate(text) {
        return new Date(text);
    }
    parseTime(text, formatStr) {
        const parser = new ɵNgTimeParser(formatStr, this.i18n.getLocaleId());
        return parser.toDate(text);
    }
}
DateHelperByDatePipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function DateHelperByDatePipe_Factory() { return DATE_HELPER_SERVICE_FACTORY(i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.NZ_DATE_CONFIG, 8)); }, token: DateHelperByDatePipe, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1oZWxwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvaTE4bi8iLCJzb3VyY2VzIjpbImRhdGUtaGVscGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxhQUFhLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxRQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFnQixjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFFbEQsTUFBTSxVQUFVLDJCQUEyQixDQUFDLFFBQWtCLEVBQUUsTUFBb0I7SUFDbEYsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6QyxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksb0JBQW9CLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9HLENBQUM7QUFFRDs7O0dBR0c7QUFNSCxNQUFNLE9BQWdCLGlCQUFpQjtJQUNyQyxZQUFzQixJQUFtQixFQUFnRCxNQUFvQjtRQUF2RixTQUFJLEdBQUosSUFBSSxDQUFlO1FBQWdELFdBQU0sR0FBTixNQUFNLENBQWM7UUFDM0csSUFB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QUM7SUFDM0UsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZLEVBQUUsU0FBaUI7UUFDdkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNyRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3RvciwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBmbnNGb3JtYXQgZnJvbSAnZGF0ZS1mbnMvZm9ybWF0JztcbmltcG9ydCBmbnNHZXRJU09XZWVrIGZyb20gJ2RhdGUtZm5zL2dldElTT1dlZWsnO1xuaW1wb3J0IGZuc1BhcnNlIGZyb20gJ2RhdGUtZm5zL3BhcnNlJztcblxuaW1wb3J0IHsgV2Vla0RheUluZGV4LCDJtU5nVGltZVBhcnNlciB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90aW1lJztcbmltcG9ydCB7IG1lcmdlRGF0ZUNvbmZpZywgTnpEYXRlQ29uZmlnLCBOWl9EQVRFX0NPTkZJRyB9IGZyb20gJy4vZGF0ZS1jb25maWcnO1xuaW1wb3J0IHsgTnpJMThuU2VydmljZSB9IGZyb20gJy4vbnotaTE4bi5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIERBVEVfSEVMUEVSX1NFUlZJQ0VfRkFDVE9SWShpbmplY3RvcjogSW5qZWN0b3IsIGNvbmZpZzogTnpEYXRlQ29uZmlnKTogRGF0ZUhlbHBlclNlcnZpY2Uge1xuICBjb25zdCBpMThuID0gaW5qZWN0b3IuZ2V0KE56STE4blNlcnZpY2UpO1xuICByZXR1cm4gaTE4bi5nZXREYXRlTG9jYWxlKCkgPyBuZXcgRGF0ZUhlbHBlckJ5RGF0ZUZucyhpMThuLCBjb25maWcpIDogbmV3IERhdGVIZWxwZXJCeURhdGVQaXBlKGkxOG4sIGNvbmZpZyk7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgRGF0ZUhlbHBlclNlcnZpY2UoVG9rZW4gdmlhIENsYXNzKVxuICogQ29tcGF0aWJpbGl0eTogY29tcGFjdCBmb3Igb3JpZ2luYWwgdXNhZ2UgYnkgZGVmYXVsdCB3aGljaCB1c2luZyBEYXRlUGlwZVxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogREFURV9IRUxQRVJfU0VSVklDRV9GQUNUT1JZLFxuICBkZXBzOiBbSW5qZWN0b3IsIFtuZXcgT3B0aW9uYWwoKSwgTlpfREFURV9DT05GSUddXVxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRlSGVscGVyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBpMThuOiBOekkxOG5TZXJ2aWNlLCBAT3B0aW9uYWwoKSBASW5qZWN0KE5aX0RBVEVfQ09ORklHKSBwcm90ZWN0ZWQgY29uZmlnOiBOekRhdGVDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IG1lcmdlRGF0ZUNvbmZpZyh0aGlzLmNvbmZpZyk7XG4gIH1cblxuICBhYnN0cmFjdCBnZXRJU09XZWVrKGRhdGU6IERhdGUpOiBudW1iZXI7XG4gIGFic3RyYWN0IGdldEZpcnN0RGF5T2ZXZWVrKCk6IFdlZWtEYXlJbmRleDtcbiAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IERhdGUgfCBudWxsLCBmb3JtYXRTdHI6IHN0cmluZyk6IHN0cmluZztcbiAgYWJzdHJhY3QgcGFyc2VEYXRlKHRleHQ6IHN0cmluZywgZm9ybWF0U3RyPzogc3RyaW5nKTogRGF0ZTtcbiAgYWJzdHJhY3QgcGFyc2VUaW1lKHRleHQ6IHN0cmluZywgZm9ybWF0U3RyPzogc3RyaW5nKTogRGF0ZSB8IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBEYXRlSGVscGVyIHRoYXQgaGFuZGxlcyBkYXRlIGZvcm1hdHMgd2l0aCBkYXRlLWZuc1xuICovXG5leHBvcnQgY2xhc3MgRGF0ZUhlbHBlckJ5RGF0ZUZucyBleHRlbmRzIERhdGVIZWxwZXJTZXJ2aWNlIHtcbiAgZ2V0SVNPV2VlayhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZm5zR2V0SVNPV2VlayhkYXRlKTtcbiAgfVxuXG4gIC8vIFVzZSBkYXRlLWZucydzIFwid2Vla1N0YXJ0c09uXCIgdG8gc3VwcG9ydCBkaWZmZXJlbnQgbG9jYWxlIHdoZW4gXCJjb25maWcuZmlyc3REYXlPZldlZWtcIiBpcyBudWxsXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL3YyLjAuMC1hbHBoYS4yNy9zcmMvbG9jYWxlL2VuLVVTL2luZGV4LmpzI0wyM1xuICBnZXRGaXJzdERheU9mV2VlaygpOiBXZWVrRGF5SW5kZXgge1xuICAgIGxldCBkZWZhdWx0V2Vla1N0YXJ0c09uOiBXZWVrRGF5SW5kZXg7XG4gICAgdHJ5IHtcbiAgICAgIGRlZmF1bHRXZWVrU3RhcnRzT24gPSB0aGlzLmkxOG4uZ2V0RGF0ZUxvY2FsZSgpLm9wdGlvbnMhLndlZWtTdGFydHNPbiE7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZGVmYXVsdFdlZWtTdGFydHNPbiA9IDE7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5maXJzdERheU9mV2VlayA9PSBudWxsID8gZGVmYXVsdFdlZWtTdGFydHNPbiA6IHRoaXMuY29uZmlnLmZpcnN0RGF5T2ZXZWVrO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBhIGRhdGVcbiAgICogQHNlZSBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL2Zvcm1hdCNkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0gZGF0ZSBEYXRlXG4gICAqIEBwYXJhbSBmb3JtYXRTdHIgZm9ybWF0IHN0cmluZ1xuICAgKi9cbiAgZm9ybWF0KGRhdGU6IERhdGUsIGZvcm1hdFN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0ZSA/IGZuc0Zvcm1hdChkYXRlLCBmb3JtYXRTdHIsIHsgbG9jYWxlOiB0aGlzLmkxOG4uZ2V0RGF0ZUxvY2FsZSgpIH0pIDogJyc7XG4gIH1cblxuICBwYXJzZURhdGUodGV4dDogc3RyaW5nLCBmb3JtYXRTdHI6IHN0cmluZyk6IERhdGUge1xuICAgIHJldHVybiBmbnNQYXJzZSh0ZXh0LCBmb3JtYXRTdHIsIG5ldyBEYXRlKCksIHtcbiAgICAgIGxvY2FsZTogdGhpcy5pMThuLmdldERhdGVMb2NhbGUoKSxcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy5nZXRGaXJzdERheU9mV2VlaygpXG4gICAgfSk7XG4gIH1cblxuICBwYXJzZVRpbWUodGV4dDogc3RyaW5nLCBmb3JtYXRTdHI6IHN0cmluZyk6IERhdGUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnBhcnNlRGF0ZSh0ZXh0LCBmb3JtYXRTdHIpO1xuICB9XG59XG5cbi8qKlxuICogRGF0ZUhlbHBlciB0aGF0IGhhbmRsZXMgZGF0ZSBmb3JtYXRzIHdpdGggYW5ndWxhcidzIGRhdGUtcGlwZVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvaXNzdWVzLzI0MDYgLSBEYXRlUGlwZSBtYXkgY2F1c2Ugbm9uLXN0YW5kYXJkIHdlZWsgYnVnLCBzZWU6XG4gKlxuICovXG5leHBvcnQgY2xhc3MgRGF0ZUhlbHBlckJ5RGF0ZVBpcGUgZXh0ZW5kcyBEYXRlSGVscGVyU2VydmljZSB7XG4gIGdldElTT1dlZWsoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuICt0aGlzLmZvcm1hdChkYXRlLCAndycpO1xuICB9XG5cbiAgZ2V0Rmlyc3REYXlPZldlZWsoKTogV2Vla0RheUluZGV4IHtcbiAgICBpZiAodGhpcy5jb25maWcuZmlyc3REYXlPZldlZWsgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgbG9jYWxlID0gdGhpcy5pMThuLmdldExvY2FsZUlkKCk7XG4gICAgICByZXR1cm4gbG9jYWxlICYmIFsnemgtY24nLCAnemgtdHcnXS5pbmRleE9mKGxvY2FsZS50b0xvd2VyQ2FzZSgpKSA+IC0xID8gMSA6IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5maXJzdERheU9mV2VlaztcbiAgfVxuXG4gIGZvcm1hdChkYXRlOiBEYXRlIHwgbnVsbCwgZm9ybWF0U3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBkYXRlID8gZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXRTdHIsIHRoaXMuaTE4bi5nZXRMb2NhbGVJZCgpKSEgOiAnJztcbiAgfVxuXG4gIHBhcnNlRGF0ZSh0ZXh0OiBzdHJpbmcpOiBEYXRlIHtcbiAgICByZXR1cm4gbmV3IERhdGUodGV4dCk7XG4gIH1cblxuICBwYXJzZVRpbWUodGV4dDogc3RyaW5nLCBmb3JtYXRTdHI6IHN0cmluZyk6IERhdGUge1xuICAgIGNvbnN0IHBhcnNlciA9IG5ldyDJtU5nVGltZVBhcnNlcihmb3JtYXRTdHIsIHRoaXMuaTE4bi5nZXRMb2NhbGVJZCgpKTtcbiAgICByZXR1cm4gcGFyc2VyLnRvRGF0ZSh0ZXh0KTtcbiAgfVxufVxuIl19