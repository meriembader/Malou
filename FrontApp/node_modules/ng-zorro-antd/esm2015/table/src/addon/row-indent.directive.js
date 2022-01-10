/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input } from '@angular/core';
export class NzRowIndentDirective {
    constructor() {
        this.indentSize = 0;
    }
}
NzRowIndentDirective.decorators = [
    { type: Directive, args: [{
                selector: 'nz-row-indent',
                host: {
                    '[class.ant-table-row-indent]': 'true',
                    '[style.padding-left.px]': 'indentSize'
                }
            },] }
];
NzRowIndentDirective.propDecorators = {
    indentSize: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWluZGVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RhYmxlLyIsInNvdXJjZXMiOlsic3JjL2FkZG9uL3Jvdy1pbmRlbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU2pELE1BQU0sT0FBTyxvQkFBb0I7SUFQakM7UUFRVyxlQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7OztZQVRBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsSUFBSSxFQUFFO29CQUNKLDhCQUE4QixFQUFFLE1BQU07b0JBQ3RDLHlCQUF5QixFQUFFLFlBQVk7aUJBQ3hDO2FBQ0Y7Ozt5QkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduei1yb3ctaW5kZW50JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRhYmxlLXJvdy1pbmRlbnRdJzogJ3RydWUnLFxuICAgICdbc3R5bGUucGFkZGluZy1sZWZ0LnB4XSc6ICdpbmRlbnRTaXplJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56Um93SW5kZW50RGlyZWN0aXZlIHtcbiAgQElucHV0KCkgaW5kZW50U2l6ZSA9IDA7XG59XG4iXX0=