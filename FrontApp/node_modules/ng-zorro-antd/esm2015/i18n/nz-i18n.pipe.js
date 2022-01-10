/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import { NzI18nService } from './nz-i18n.service';
export class NzI18nPipe {
    constructor(_locale) {
        this._locale = _locale;
    }
    transform(path, keyValue) {
        return this._locale.translate(path, keyValue);
    }
}
NzI18nPipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzI18n'
            },] }
];
NzI18nPipe.ctorParameters = () => [
    { type: NzI18nService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotaTE4bi5waXBlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9pMThuLyIsInNvdXJjZXMiOlsibnotaTE4bi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUtsRCxNQUFNLE9BQU8sVUFBVTtJQUNyQixZQUFvQixPQUFzQjtRQUF0QixZQUFPLEdBQVAsT0FBTyxDQUFlO0lBQUcsQ0FBQztJQUU5QyxTQUFTLENBQUMsSUFBWSxFQUFFLFFBQWlCO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7OztZQVJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNmOzs7WUFKUSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlIH0gZnJvbSAnLi9uei1pMThuLnNlcnZpY2UnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICduekkxOG4nXG59KVxuZXhwb3J0IGNsYXNzIE56STE4blBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9jYWxlOiBOekkxOG5TZXJ2aWNlKSB7fVxuXG4gIHRyYW5zZm9ybShwYXRoOiBzdHJpbmcsIGtleVZhbHVlPzogb2JqZWN0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlLnRyYW5zbGF0ZShwYXRoLCBrZXlWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==