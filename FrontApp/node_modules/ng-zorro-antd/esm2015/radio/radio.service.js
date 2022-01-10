/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
export class NzRadioService {
    constructor() {
        this.selected$ = new ReplaySubject(1);
        this.touched$ = new Subject();
        this.disabled$ = new ReplaySubject(1);
        this.name$ = new ReplaySubject(1);
    }
    touch() {
        this.touched$.next();
    }
    select(value) {
        this.selected$.next(value);
    }
    setDisabled(value) {
        this.disabled$.next(value);
    }
    setName(value) {
        this.name$.next(value);
    }
}
NzRadioService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvcmFkaW8vIiwic291cmNlcyI6WyJyYWRpby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHOUMsTUFBTSxPQUFPLGNBQWM7SUFEM0I7UUFFRSxjQUFTLEdBQUcsSUFBSSxhQUFhLENBQVksQ0FBQyxDQUFDLENBQUM7UUFDNUMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDL0IsY0FBUyxHQUFHLElBQUksYUFBYSxDQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzFDLFVBQUssR0FBRyxJQUFJLGFBQWEsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQWF2QyxDQUFDO0lBWkMsS0FBSztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFnQjtRQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsV0FBVyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELE9BQU8sQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7OztZQWpCRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOelJhZGlvU2VydmljZSB7XG4gIHNlbGVjdGVkJCA9IG5ldyBSZXBsYXlTdWJqZWN0PE56U2FmZUFueT4oMSk7XG4gIHRvdWNoZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgZGlzYWJsZWQkID0gbmV3IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4oMSk7XG4gIG5hbWUkID0gbmV3IFJlcGxheVN1YmplY3Q8c3RyaW5nPigxKTtcbiAgdG91Y2goKTogdm9pZCB7XG4gICAgdGhpcy50b3VjaGVkJC5uZXh0KCk7XG4gIH1cbiAgc2VsZWN0KHZhbHVlOiBOelNhZmVBbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkJC5uZXh0KHZhbHVlKTtcbiAgfVxuICBzZXREaXNhYmxlZCh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQkLm5leHQodmFsdWUpO1xuICB9XG4gIHNldE5hbWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubmFtZSQubmV4dCh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==