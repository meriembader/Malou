/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import { sum } from 'ng-zorro-antd/core/util';
export class NzAggregatePipe {
    transform(value, method) {
        if (!Array.isArray(value)) {
            return value;
        }
        if (value.length === 0) {
            return undefined;
        }
        switch (method) {
            case 'sum':
                return sum(value);
            case 'avg':
                return sum(value) / value.length;
            case 'max':
                return Math.max(...value);
            case 'min':
                return Math.min(...value);
            default:
                throw Error(`Invalid Pipe Arguments: Aggregate pipe doesn't support this type`);
        }
    }
}
NzAggregatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzAggregate'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotYWdncmVnYXRlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3BpcGVzLyIsInNvdXJjZXMiOlsibnotYWdncmVnYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTzlDLE1BQU0sT0FBTyxlQUFlO0lBQzFCLFNBQVMsQ0FBQyxLQUFlLEVBQUUsTUFBdUI7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFFRCxRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssS0FBSztnQkFDUixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNuQyxLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDNUIsS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQzVCO2dCQUNFLE1BQU0sS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7U0FDbkY7SUFDSCxDQUFDOzs7WUF6QkYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxhQUFhO2FBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc3VtIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5leHBvcnQgdHlwZSBBZ2dyZWdhdGVNZXRob2QgPSAnc3VtJyB8ICdtYXgnIHwgJ21pbicgfCAnYXZnJztcblxuQFBpcGUoe1xuICBuYW1lOiAnbnpBZ2dyZWdhdGUnXG59KVxuZXhwb3J0IGNsYXNzIE56QWdncmVnYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IG51bWJlcltdLCBtZXRob2Q6IEFnZ3JlZ2F0ZU1ldGhvZCk6IHVuZGVmaW5lZCB8IG51bWJlciB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgIGNhc2UgJ3N1bSc6XG4gICAgICAgIHJldHVybiBzdW0odmFsdWUpO1xuICAgICAgY2FzZSAnYXZnJzpcbiAgICAgICAgcmV0dXJuIHN1bSh2YWx1ZSkgLyB2YWx1ZS5sZW5ndGg7XG4gICAgICBjYXNlICdtYXgnOlxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoLi4udmFsdWUpO1xuICAgICAgY2FzZSAnbWluJzpcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKC4uLnZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIFBpcGUgQXJndW1lbnRzOiBBZ2dyZWdhdGUgcGlwZSBkb2Vzbid0IHN1cHBvcnQgdGhpcyB0eXBlYCk7XG4gICAgfVxuICB9XG59XG4iXX0=