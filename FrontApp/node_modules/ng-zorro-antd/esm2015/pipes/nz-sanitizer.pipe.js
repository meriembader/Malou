/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class NzSanitizerPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, type = 'html') {
        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Invalid safe type specified`);
        }
    }
}
NzSanitizerPipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzSanitizer'
            },] }
];
NzSanitizerPipe.ctorParameters = () => [
    { type: DomSanitizer }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc2FuaXRpemVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3BpcGVzLyIsInNvdXJjZXMiOlsibnotc2FuaXRpemVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBaUQsTUFBTSwyQkFBMkIsQ0FBQztBQVF4RyxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFzQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQUcsQ0FBQztJQUtqRCxTQUFTLENBQUMsS0FBZ0IsRUFBRSxPQUF5QixNQUFNO1FBQ3pELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxNQUFNO2dCQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxLQUFLLE9BQU87Z0JBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELEtBQUssS0FBSztnQkFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsS0FBSyxhQUFhO2dCQUNoQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUQ7Z0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7O1lBdEJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsYUFBYTthQUNwQjs7O1lBUFEsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwsIFNhZmVSZXNvdXJjZVVybCwgU2FmZVN0eWxlLCBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG50eXBlIERvbVNhbml0aXplclR5cGUgPSAnaHRtbCcgfCAnc3R5bGUnIHwgJ3VybCcgfCAncmVzb3VyY2VVcmwnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICduelNhbml0aXplcidcbn0pXG5leHBvcnQgY2xhc3MgTnpTYW5pdGl6ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cbiAgdHJhbnNmb3JtKHZhbHVlOiBOelNhZmVBbnksIHR5cGU6ICdodG1sJyk6IFNhZmVIdG1sO1xuICB0cmFuc2Zvcm0odmFsdWU6IE56U2FmZUFueSwgdHlwZTogJ3N0eWxlJyk6IFNhZmVTdHlsZTtcbiAgdHJhbnNmb3JtKHZhbHVlOiBOelNhZmVBbnksIHR5cGU6ICd1cmwnKTogU2FmZVVybDtcbiAgdHJhbnNmb3JtKHZhbHVlOiBOelNhZmVBbnksIHR5cGU6ICdyZXNvdXJjZVVybCcpOiBTYWZlUmVzb3VyY2VVcmw7XG4gIHRyYW5zZm9ybSh2YWx1ZTogTnpTYWZlQW55LCB0eXBlOiBEb21TYW5pdGl6ZXJUeXBlID0gJ2h0bWwnKTogU2FmZUh0bWwgfCBTYWZlU3R5bGUgfCBTYWZlVXJsIHwgU2FmZVJlc291cmNlVXJsIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodmFsdWUpO1xuICAgICAgY2FzZSAnc3R5bGUnOlxuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHZhbHVlKTtcbiAgICAgIGNhc2UgJ3VybCc6XG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0VXJsKHZhbHVlKTtcbiAgICAgIGNhc2UgJ3Jlc291cmNlVXJsJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh2YWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc2FmZSB0eXBlIHNwZWNpZmllZGApO1xuICAgIH1cbiAgfVxufVxuIl19