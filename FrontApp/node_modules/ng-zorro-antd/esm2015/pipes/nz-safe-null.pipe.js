/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import { isNil } from 'ng-zorro-antd/core/util';
export class NzSafeNullPipe {
    transform(value, replace = '') {
        if (isNil(value)) {
            return replace;
        }
        return value;
    }
}
NzSafeNullPipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzSafeNull'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc2FmZS1udWxsLnBpcGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3BpcGVzLyIsInNvdXJjZXMiOlsibnotc2FmZS1udWxsLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBS2hELE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFNBQVMsQ0FBSSxLQUFRLEVBQUUsVUFBa0IsRUFBRTtRQUN6QyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoQixPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7O1lBVEYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxZQUFZO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNOaWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ256U2FmZU51bGwnXG59KVxuZXhwb3J0IGNsYXNzIE56U2FmZU51bGxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybTxUPih2YWx1ZTogVCwgcmVwbGFjZTogc3RyaW5nID0gJycpOiBUIHwgc3RyaW5nIHtcbiAgICBpZiAoaXNOaWwodmFsdWUpKSB7XG4gICAgICByZXR1cm4gcmVwbGFjZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXX0=