/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class NzTreeNodeCheckboxComponent {
    constructor() {
        this.nzSelectMode = false;
    }
}
NzTreeNodeCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-node-checkbox',
                template: ` <span [class.ant-tree-checkbox-inner]="!nzSelectMode" [class.ant-select-tree-checkbox-inner]="nzSelectMode"></span> `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                host: {
                    '[class.ant-select-tree-checkbox]': `nzSelectMode`,
                    '[class.ant-select-tree-checkbox-checked]': `nzSelectMode && isChecked`,
                    '[class.ant-select-tree-checkbox-indeterminate]': `nzSelectMode && isHalfChecked`,
                    '[class.ant-select-tree-checkbox-disabled]': `nzSelectMode && (isDisabled || isDisableCheckbox)`,
                    '[class.ant-tree-checkbox]': `!nzSelectMode`,
                    '[class.ant-tree-checkbox-checked]': `!nzSelectMode && isChecked`,
                    '[class.ant-tree-checkbox-indeterminate]': `!nzSelectMode && isHalfChecked`,
                    '[class.ant-tree-checkbox-disabled]': `!nzSelectMode && (isDisabled || isDisableCheckbox)`
                }
            },] }
];
NzTreeNodeCheckboxComponent.propDecorators = {
    nzSelectMode: [{ type: Input }],
    isChecked: [{ type: Input }],
    isHalfChecked: [{ type: Input }],
    isDisabled: [{ type: Input }],
    isDisableCheckbox: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNoZWNrYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdHJlZS8iLCJzb3VyY2VzIjpbInRyZWUtbm9kZS1jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFrQjFFLE1BQU0sT0FBTywyQkFBMkI7SUFoQnhDO1FBaUJXLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBS2hDLENBQUM7OztZQXRCQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFLHVIQUF1SDtnQkFDakksZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLElBQUksRUFBRTtvQkFDSixrQ0FBa0MsRUFBRSxjQUFjO29CQUNsRCwwQ0FBMEMsRUFBRSwyQkFBMkI7b0JBQ3ZFLGdEQUFnRCxFQUFFLCtCQUErQjtvQkFDakYsMkNBQTJDLEVBQUUsbURBQW1EO29CQUNoRywyQkFBMkIsRUFBRSxlQUFlO29CQUM1QyxtQ0FBbUMsRUFBRSw0QkFBNEI7b0JBQ2pFLHlDQUF5QyxFQUFFLGdDQUFnQztvQkFDM0Usb0NBQW9DLEVBQUUsb0RBQW9EO2lCQUMzRjthQUNGOzs7MkJBRUUsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSztnQ0FDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS1ub2RlLWNoZWNrYm94JyxcbiAgdGVtcGxhdGU6IGAgPHNwYW4gW2NsYXNzLmFudC10cmVlLWNoZWNrYm94LWlubmVyXT1cIiFuelNlbGVjdE1vZGVcIiBbY2xhc3MuYW50LXNlbGVjdC10cmVlLWNoZWNrYm94LWlubmVyXT1cIm56U2VsZWN0TW9kZVwiPjwvc3Bhbj4gYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtY2hlY2tib3hdJzogYG56U2VsZWN0TW9kZWAsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtY2hlY2tib3gtY2hlY2tlZF0nOiBgbnpTZWxlY3RNb2RlICYmIGlzQ2hlY2tlZGAsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtY2hlY2tib3gtaW5kZXRlcm1pbmF0ZV0nOiBgbnpTZWxlY3RNb2RlICYmIGlzSGFsZkNoZWNrZWRgLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLWNoZWNrYm94LWRpc2FibGVkXSc6IGBuelNlbGVjdE1vZGUgJiYgKGlzRGlzYWJsZWQgfHwgaXNEaXNhYmxlQ2hlY2tib3gpYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLWNoZWNrYm94XSc6IGAhbnpTZWxlY3RNb2RlYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLWNoZWNrYm94LWNoZWNrZWRdJzogYCFuelNlbGVjdE1vZGUgJiYgaXNDaGVja2VkYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLWNoZWNrYm94LWluZGV0ZXJtaW5hdGVdJzogYCFuelNlbGVjdE1vZGUgJiYgaXNIYWxmQ2hlY2tlZGAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1jaGVja2JveC1kaXNhYmxlZF0nOiBgIW56U2VsZWN0TW9kZSAmJiAoaXNEaXNhYmxlZCB8fCBpc0Rpc2FibGVDaGVja2JveClgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlTm9kZUNoZWNrYm94Q29tcG9uZW50IHtcbiAgQElucHV0KCkgbnpTZWxlY3RNb2RlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGlzQ2hlY2tlZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzSGFsZkNoZWNrZWQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBpc0Rpc2FibGVkPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNEaXNhYmxlQ2hlY2tib3g/OiBib29sZWFuO1xufVxuIl19