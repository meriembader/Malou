"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyNames = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.propertyNames = {
    [schematics_1.TargetVersion.V10]: [
        {
            pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5779',
            changes: [
                {
                    replace: 'nzPosition',
                    replaceWith: 'nzPlacement',
                    limitedTo: { classes: ['NzNotificationDataOptions'] }
                }
            ]
        },
        {
            pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5789',
            changes: [
                {
                    replace: 'isAllChecked',
                    replaceWith: 'isChecked',
                    limitedTo: { classes: ['NzTreeNode'] }
                },
                {
                    replace: 'setSelected',
                    replaceWith: '/** TODO(NG-ZORRO V10) setSelected is deprecated, use `isSelected` instead **/setSelected',
                    limitedTo: { classes: ['NzTreeNode'] }
                }
            ]
        },
        {
            pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5798',
            changes: [
                {
                    replace: 'updateDefaultOption',
                    replaceWith: '/** TODO(NG-ZORRO V10) updateDefaultOption is deprecated, Please use `set` of `NzConfigService` instead. **/updateDefaultOption',
                    limitedTo: { classes: ['NzCodeEditorService'] }
                }
            ]
        }
    ]
};
//# sourceMappingURL=property-names.js.map