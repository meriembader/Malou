/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
export class NzToCssUnitPipe {
    transform(value, defaultUnit = 'px') {
        const absoluteLengthUnit = ['cm', 'mm', 'Q', 'in', 'pc', 'pt', 'px'];
        const relativeLengthUnit = ['em', 'ex', 'ch', 'rem', '1h', 'vw', 'vh', 'vmin', 'vmax'];
        const percentagesUnit = ['%'];
        const listOfUnit = [...absoluteLengthUnit, ...relativeLengthUnit, ...percentagesUnit];
        let unit = 'px';
        if (listOfUnit.some(u => u === defaultUnit)) {
            unit = defaultUnit;
        }
        return typeof value === 'number' ? `${value}${unit}` : `${value}`;
    }
}
NzToCssUnitPipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzToCssUnit'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotY3NzLXVuaXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvcGlwZXMvIiwic291cmNlcyI6WyJuei1jc3MtdW5pdC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BELE1BQU0sT0FBTyxlQUFlO0lBQzFCLFNBQVMsQ0FBQyxLQUFzQixFQUFFLGNBQXNCLElBQUk7UUFDMUQsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sZUFBZSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLGtCQUFrQixFQUFFLEdBQUcsa0JBQWtCLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQztRQUN0RixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxFQUFFO1lBQzNDLElBQUksR0FBRyxXQUFXLENBQUM7U0FDcEI7UUFDRCxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDcEUsQ0FBQzs7O1lBZEYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxhQUFhO2FBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICduelRvQ3NzVW5pdCdcbn0pXG5leHBvcnQgY2xhc3MgTnpUb0Nzc1VuaXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nLCBkZWZhdWx0VW5pdDogc3RyaW5nID0gJ3B4Jyk6IHN0cmluZyB7XG4gICAgY29uc3QgYWJzb2x1dGVMZW5ndGhVbml0ID0gWydjbScsICdtbScsICdRJywgJ2luJywgJ3BjJywgJ3B0JywgJ3B4J107XG4gICAgY29uc3QgcmVsYXRpdmVMZW5ndGhVbml0ID0gWydlbScsICdleCcsICdjaCcsICdyZW0nLCAnMWgnLCAndncnLCAndmgnLCAndm1pbicsICd2bWF4J107XG4gICAgY29uc3QgcGVyY2VudGFnZXNVbml0ID0gWyclJ107XG4gICAgY29uc3QgbGlzdE9mVW5pdCA9IFsuLi5hYnNvbHV0ZUxlbmd0aFVuaXQsIC4uLnJlbGF0aXZlTGVuZ3RoVW5pdCwgLi4ucGVyY2VudGFnZXNVbml0XTtcbiAgICBsZXQgdW5pdCA9ICdweCc7XG4gICAgaWYgKGxpc3RPZlVuaXQuc29tZSh1ID0+IHUgPT09IGRlZmF1bHRVbml0KSkge1xuICAgICAgdW5pdCA9IGRlZmF1bHRVbml0O1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/IGAke3ZhbHVlfSR7dW5pdH1gIDogYCR7dmFsdWV9YDtcbiAgfVxufVxuIl19