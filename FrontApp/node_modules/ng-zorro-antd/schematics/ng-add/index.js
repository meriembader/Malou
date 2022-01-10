"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("@angular-devkit/schematics/tasks");
const schematics_1 = require("@angular/cdk/schematics");
const config_1 = require("@schematics/angular/utility/config");
const package_config_1 = require("../utils/package-config");
const project_style_1 = require("../utils/project-style");
const version_names_1 = require("../utils/version-names");
function default_1(options) {
    return (host, context) => {
        if (!options.skipPackageJson) {
            package_config_1.addPackageToPackageJson(host, 'ng-zorro-antd', version_names_1.zorroVersion);
            if (options.gestures) {
                package_config_1.addPackageToPackageJson(host, 'hammerjs', version_names_1.hammerjsVersion);
            }
        }
        const installTaskId = context.addTask(new tasks_1.NodePackageInstallTask());
        context.addTask(new tasks_1.RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
        if (options.template) {
            const workspace = config_1.getWorkspace(host);
            const project = schematics_1.getProjectFromWorkspace(workspace, options.project);
            const style = project_style_1.getProjectStyle(project);
            context.addTask(new tasks_1.RunSchematicTask(options.template, Object.assign(Object.assign({}, options), { style: style })));
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map