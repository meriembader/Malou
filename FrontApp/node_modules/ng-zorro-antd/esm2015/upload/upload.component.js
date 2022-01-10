/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { InputBoolean, InputNumber, toBoolean } from 'ng-zorro-antd/core/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzUploadBtnComponent } from './upload-btn.component';
import { NzUploadListComponent } from './upload-list.component';
export class NzUploadComponent {
    // #endregion
    constructor(cdr, i18n) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.destroy$ = new Subject();
        // #region fields
        this.nzType = 'select';
        this.nzLimit = 0;
        this.nzSize = 0;
        this.nzDirectory = false;
        this.nzOpenFileDialogOnClick = true;
        this.nzFilter = [];
        this.nzFileList = [];
        this.nzDisabled = false;
        this.nzListType = 'text';
        this.nzMultiple = false;
        this.nzName = 'file';
        this._showUploadList = true;
        this.nzShowButton = true;
        this.nzWithCredentials = false;
        this.nzIconRender = null;
        this.nzFileListRender = null;
        this.nzChange = new EventEmitter();
        this.nzFileListChange = new EventEmitter();
        this.onStart = (file) => {
            if (!this.nzFileList) {
                this.nzFileList = [];
            }
            const targetItem = this.fileToObject(file);
            targetItem.status = 'uploading';
            this.nzFileList = this.nzFileList.concat(targetItem);
            this.nzFileListChange.emit(this.nzFileList);
            this.nzChange.emit({ file: targetItem, fileList: this.nzFileList, type: 'start' });
            this.detectChangesList();
        };
        this.onProgress = (e, file) => {
            const fileList = this.nzFileList;
            const targetItem = this.getFileItem(file, fileList);
            targetItem.percent = e.percent;
            this.nzChange.emit({
                event: e,
                file: Object.assign({}, targetItem),
                fileList: this.nzFileList,
                type: 'progress'
            });
            this.detectChangesList();
        };
        this.onSuccess = (res, file) => {
            const fileList = this.nzFileList;
            const targetItem = this.getFileItem(file, fileList);
            targetItem.status = 'done';
            targetItem.response = res;
            this.nzChange.emit({
                file: Object.assign({}, targetItem),
                fileList,
                type: 'success'
            });
            this.detectChangesList();
        };
        this.onError = (err, file) => {
            const fileList = this.nzFileList;
            const targetItem = this.getFileItem(file, fileList);
            targetItem.error = err;
            targetItem.status = 'error';
            this.nzChange.emit({
                file: Object.assign({}, targetItem),
                fileList,
                type: 'error'
            });
            this.detectChangesList();
        };
        this.onRemove = (file) => {
            this.uploadComp.abort(file);
            file.status = 'removed';
            const fnRes = typeof this.nzRemove === 'function' ? this.nzRemove(file) : this.nzRemove == null ? true : this.nzRemove;
            (fnRes instanceof Observable ? fnRes : of(fnRes)).pipe(filter((res) => res)).subscribe(() => {
                this.nzFileList = this.removeFileItem(file, this.nzFileList);
                this.nzChange.emit({
                    file,
                    fileList: this.nzFileList,
                    type: 'removed'
                });
                this.nzFileListChange.emit(this.nzFileList);
                this.cdr.detectChanges();
            });
        };
        // #endregion
        // #region styles
        this.prefixCls = 'ant-upload';
        this.classList = [];
    }
    set nzShowUploadList(value) {
        this._showUploadList = typeof value === 'boolean' ? toBoolean(value) : value;
    }
    get nzShowUploadList() {
        return this._showUploadList;
    }
    zipOptions() {
        if (typeof this.nzShowUploadList === 'boolean' && this.nzShowUploadList) {
            this.nzShowUploadList = {
                showPreviewIcon: true,
                showRemoveIcon: true,
                showDownloadIcon: true
            };
        }
        // filters
        const filters = this.nzFilter.slice();
        if (this.nzMultiple && this.nzLimit > 0 && filters.findIndex(w => w.name === 'limit') === -1) {
            filters.push({
                name: 'limit',
                fn: (fileList) => fileList.slice(-this.nzLimit)
            });
        }
        if (this.nzSize > 0 && filters.findIndex(w => w.name === 'size') === -1) {
            filters.push({
                name: 'size',
                fn: (fileList) => fileList.filter(w => w.size / 1024 <= this.nzSize)
            });
        }
        if (this.nzFileType && this.nzFileType.length > 0 && filters.findIndex(w => w.name === 'type') === -1) {
            const types = this.nzFileType.split(',');
            filters.push({
                name: 'type',
                fn: (fileList) => fileList.filter(w => ~types.indexOf(w.type))
            });
        }
        this._btnOptions = {
            disabled: this.nzDisabled,
            accept: this.nzAccept,
            action: this.nzAction,
            directory: this.nzDirectory,
            openFileDialogOnClick: this.nzOpenFileDialogOnClick,
            beforeUpload: this.nzBeforeUpload,
            customRequest: this.nzCustomRequest,
            data: this.nzData,
            headers: this.nzHeaders,
            name: this.nzName,
            multiple: this.nzMultiple,
            withCredentials: this.nzWithCredentials,
            filters,
            transformFile: this.nzTransformFile,
            onStart: this.onStart,
            onProgress: this.onProgress,
            onSuccess: this.onSuccess,
            onError: this.onError
        };
        return this;
    }
    // #region upload
    fileToObject(file) {
        return {
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.filename || file.name,
            size: file.size,
            type: file.type,
            uid: file.uid,
            response: file.response,
            error: file.error,
            percent: 0,
            originFileObj: file
        };
    }
    getFileItem(file, fileList) {
        return fileList.filter(item => item.uid === file.uid)[0];
    }
    removeFileItem(file, fileList) {
        return fileList.filter(item => item.uid !== file.uid);
    }
    // skip safari bug
    fileDrop(e) {
        if (e.type === this.dragState) {
            return;
        }
        this.dragState = e.type;
        this.setClassMap();
    }
    // #endregion
    // #region list
    detectChangesList() {
        var _a;
        this.cdr.detectChanges();
        (_a = this.listComp) === null || _a === void 0 ? void 0 : _a.detectChanges();
    }
    setClassMap() {
        let subCls = [];
        if (this.nzType === 'drag') {
            if (this.nzFileList.some(file => file.status === 'uploading')) {
                subCls.push(`${this.prefixCls}-drag-uploading`);
            }
            if (this.dragState === 'dragover') {
                subCls.push(`${this.prefixCls}-drag-hover`);
            }
        }
        else {
            subCls = [`${this.prefixCls}-select-${this.nzListType}`];
        }
        this.classList = [
            this.prefixCls,
            `${this.prefixCls}-${this.nzType}`,
            ...subCls,
            (this.nzDisabled && `${this.prefixCls}-disabled`) || ''
        ].filter(item => !!item);
        this.cdr.detectChanges();
    }
    // #endregion
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Upload');
            this.detectChangesList();
        });
    }
    ngOnChanges() {
        this.zipOptions().setClassMap();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-upload',
                exportAs: 'nzUpload',
                template: "<ng-template #list>\n  <nz-upload-list\n    *ngIf=\"locale && !nzFileListRender\"\n    #listComp\n    [style.display]=\"nzShowUploadList ? '' : 'none'\"\n    [locale]=\"locale\"\n    [listType]=\"nzListType\"\n    [items]=\"nzFileList || []\"\n    [icons]=\"$any(nzShowUploadList)\"\n    [iconRender]=\"nzIconRender\"\n    [previewFile]=\"nzPreviewFile\"\n    [previewIsImage]=\"nzPreviewIsImage\"\n    [onPreview]=\"nzPreview\"\n    [onRemove]=\"onRemove\"\n    [onDownload]=\"nzDownload\"\n  ></nz-upload-list>\n  <ng-container *ngIf=\"nzFileListRender\">\n    <ng-container\n      *ngTemplateOutlet=\"nzFileListRender; context: { $implicit: nzFileList }\"\n    ></ng-container>\n  </ng-container>\n</ng-template>\n<ng-template #con><ng-content></ng-content></ng-template>\n<ng-template #btn>\n  <div [ngClass]=\"classList\" [style.display]=\"nzShowButton ? '' : 'none'\">\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\">\n      <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n    </div>\n  </div>\n</ng-template>\n<ng-container *ngIf=\"nzType === 'drag'; else select\">\n  <div\n    [ngClass]=\"classList\"\n    (drop)=\"fileDrop($event)\"\n    (dragover)=\"fileDrop($event)\"\n    (dragleave)=\"fileDrop($event)\"\n  >\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\" class=\"ant-upload-btn\">\n      <div class=\"ant-upload-drag-container\">\n        <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n      </div>\n    </div>\n  </div>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-container>\n<ng-template #select>\n  <ng-container *ngIf=\"nzListType === 'picture-card'; else pic\">\n    <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n    <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  </ng-container>\n</ng-template>\n<ng-template #pic>\n  <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-template>\n",
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.ant-upload-picture-card-wrapper]': 'nzListType === "picture-card"'
                }
            },] }
];
NzUploadComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzI18nService }
];
NzUploadComponent.propDecorators = {
    uploadComp: [{ type: ViewChild, args: ['uploadComp', { static: false },] }],
    listComp: [{ type: ViewChild, args: ['listComp', { static: false },] }],
    nzType: [{ type: Input }],
    nzLimit: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzFileType: [{ type: Input }],
    nzAccept: [{ type: Input }],
    nzAction: [{ type: Input }],
    nzDirectory: [{ type: Input }],
    nzOpenFileDialogOnClick: [{ type: Input }],
    nzBeforeUpload: [{ type: Input }],
    nzCustomRequest: [{ type: Input }],
    nzData: [{ type: Input }],
    nzFilter: [{ type: Input }],
    nzFileList: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzHeaders: [{ type: Input }],
    nzListType: [{ type: Input }],
    nzMultiple: [{ type: Input }],
    nzName: [{ type: Input }],
    nzShowUploadList: [{ type: Input }],
    nzShowButton: [{ type: Input }],
    nzWithCredentials: [{ type: Input }],
    nzRemove: [{ type: Input }],
    nzPreview: [{ type: Input }],
    nzPreviewFile: [{ type: Input }],
    nzPreviewIsImage: [{ type: Input }],
    nzTransformFile: [{ type: Input }],
    nzDownload: [{ type: Input }],
    nzIconRender: [{ type: Input }],
    nzFileListRender: [{ type: Input }],
    nzChange: [{ type: Output }],
    nzFileListChange: [{ type: Output }]
};
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzLimit", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzSize", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzDirectory", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzOpenFileDialogOnClick", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzMultiple", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzShowButton", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzWithCredentials", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdXBsb2FkLyIsInNvdXJjZXMiOlsidXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQXlCLE1BQU0sb0JBQW9CLENBQUM7QUFhMUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFhaEUsTUFBTSxPQUFPLGlCQUFpQjtJQXVINUIsYUFBYTtJQUViLFlBQW9CLEdBQXNCLEVBQVUsSUFBbUI7UUFBbkQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBOUcvRCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQU12QyxpQkFBaUI7UUFFUixXQUFNLEdBQWlCLFFBQVEsQ0FBQztRQUNqQixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osV0FBTSxHQUFHLENBQUMsQ0FBQztRQUtWLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLDRCQUF1QixHQUFHLElBQUksQ0FBQztRQUkvQyxh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LENBQUMsSUFBSSxDQUFDO2dCQUNYLElBQUksRUFBRSxPQUFPO2dCQUNiLEVBQUUsRUFBRSxDQUFDLFFBQXdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ2hFLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNYLElBQUksRUFBRSxNQUFNO2dCQUNaLEVBQUUsRUFBRSxDQUFDLFFBQXdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3RGLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNyRyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNYLElBQUksRUFBRSxNQUFNO2dCQUNaLEVBQUUsRUFBRSxDQUFDLFFBQXdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxDQUFDO2FBQ2hGLENBQUMsQ0FBQztTQUNK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O3FEQUFvQjtBQUduQjtJQUFmLFlBQVksRUFBRTs7cURBQW9CO0FBY25CO0lBQWYsWUFBWSxFQUFFOzt1REFBcUI7QUFDcEI7SUFBZixZQUFZLEVBQUU7OzREQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOdW1iZXJJbnB1dCwgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIElucHV0TnVtYmVyLCB0b0Jvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlLCBOelVwbG9hZEkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5pbXBvcnQge1xuICBOelNob3dVcGxvYWRMaXN0LFxuICBOelVwbG9hZENoYW5nZVBhcmFtLFxuICBOelVwbG9hZEZpbGUsXG4gIE56VXBsb2FkTGlzdFR5cGUsXG4gIE56VXBsb2FkVHJhbnNmb3JtRmlsZVR5cGUsXG4gIE56VXBsb2FkVHlwZSxcbiAgTnpVcGxvYWRYSFJBcmdzLFxuICBVcGxvYWRGaWx0ZXIsXG4gIFppcEJ1dHRvbk9wdGlvbnNcbn0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTnpVcGxvYWRCdG5Db21wb25lbnQgfSBmcm9tICcuL3VwbG9hZC1idG4uY29tcG9uZW50JztcbmltcG9ydCB7IE56VXBsb2FkTGlzdENvbXBvbmVudCB9IGZyb20gJy4vdXBsb2FkLWxpc3QuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdXBsb2FkJyxcbiAgZXhwb3J0QXM6ICduelVwbG9hZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi91cGxvYWQuY29tcG9uZW50Lmh0bWwnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC11cGxvYWQtcGljdHVyZS1jYXJkLXdyYXBwZXJdJzogJ256TGlzdFR5cGUgPT09IFwicGljdHVyZS1jYXJkXCInXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TGltaXQ6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaXplOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlyZWN0b3J5OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek9wZW5GaWxlRGlhbG9nT25DbGljazogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpNdWx0aXBsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93VXBsb2FkTGlzdDogQm9vbGVhbklucHV0IHwgTnpTaG93VXBsb2FkTGlzdDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd0J1dHRvbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpXaXRoQ3JlZGVudGlhbHM6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgQFZpZXdDaGlsZCgndXBsb2FkQ29tcCcsIHsgc3RhdGljOiBmYWxzZSB9KSB1cGxvYWRDb21wITogTnpVcGxvYWRCdG5Db21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ2xpc3RDb21wJywgeyBzdGF0aWM6IGZhbHNlIH0pIGxpc3RDb21wITogTnpVcGxvYWRMaXN0Q29tcG9uZW50O1xuXG4gIGxvY2FsZSE6IE56VXBsb2FkSTE4bkludGVyZmFjZTtcblxuICAvLyAjcmVnaW9uIGZpZWxkc1xuXG4gIEBJbnB1dCgpIG56VHlwZTogTnpVcGxvYWRUeXBlID0gJ3NlbGVjdCc7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56TGltaXQgPSAwO1xuICBASW5wdXQoKSBASW5wdXROdW1iZXIoKSBuelNpemUgPSAwO1xuXG4gIEBJbnB1dCgpIG56RmlsZVR5cGU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG56QWNjZXB0Pzogc3RyaW5nIHwgc3RyaW5nW107XG4gIEBJbnB1dCgpIG56QWN0aW9uPzogc3RyaW5nIHwgKChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHN0cmluZyB8IE9ic2VydmFibGU8c3RyaW5nPik7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpcmVjdG9yeSA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpPcGVuRmlsZURpYWxvZ09uQ2xpY2sgPSB0cnVlO1xuICBASW5wdXQoKSBuekJlZm9yZVVwbG9hZD86IChmaWxlOiBOelVwbG9hZEZpbGUsIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSkgPT4gYm9vbGVhbiB8IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIEBJbnB1dCgpIG56Q3VzdG9tUmVxdWVzdD86IChpdGVtOiBOelVwbG9hZFhIUkFyZ3MpID0+IFN1YnNjcmlwdGlvbjtcbiAgQElucHV0KCkgbnpEYXRhPzoge30gfCAoKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4ge30gfCBPYnNlcnZhYmxlPHt9Pik7XG4gIEBJbnB1dCgpIG56RmlsdGVyOiBVcGxvYWRGaWx0ZXJbXSA9IFtdO1xuICBASW5wdXQoKSBuekZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSA9IFtdO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBuekhlYWRlcnM/OiB7fSB8ICgoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB7fSB8IE9ic2VydmFibGU8e30+KTtcbiAgQElucHV0KCkgbnpMaXN0VHlwZTogTnpVcGxvYWRMaXN0VHlwZSA9ICd0ZXh0JztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56TXVsdGlwbGUgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpOYW1lID0gJ2ZpbGUnO1xuXG4gIHByaXZhdGUgX3Nob3dVcGxvYWRMaXN0OiBib29sZWFuIHwgTnpTaG93VXBsb2FkTGlzdCA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IG56U2hvd1VwbG9hZExpc3QodmFsdWU6IGJvb2xlYW4gfCBOelNob3dVcGxvYWRMaXN0KSB7XG4gICAgdGhpcy5fc2hvd1VwbG9hZExpc3QgPSB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyA/IHRvQm9vbGVhbih2YWx1ZSkgOiB2YWx1ZTtcbiAgfVxuXG4gIGdldCBuelNob3dVcGxvYWRMaXN0KCk6IGJvb2xlYW4gfCBOelNob3dVcGxvYWRMaXN0IHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd1VwbG9hZExpc3Q7XG4gIH1cblxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93QnV0dG9uID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56V2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbnpSZW1vdmU/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBib29sZWFuIHwgT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgQElucHV0KCkgbnpQcmV2aWV3PzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gdm9pZDtcbiAgQElucHV0KCkgbnpQcmV2aWV3RmlsZT86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgQElucHV0KCkgbnpQcmV2aWV3SXNJbWFnZT86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIG56VHJhbnNmb3JtRmlsZT86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IE56VXBsb2FkVHJhbnNmb3JtRmlsZVR5cGU7XG4gIEBJbnB1dCgpIG56RG93bmxvYWQ/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB2b2lkO1xuICBASW5wdXQoKSBuekljb25SZW5kZXI6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpGaWxlTGlzdFJlbmRlcjogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDaGFuZ2U6IEV2ZW50RW1pdHRlcjxOelVwbG9hZENoYW5nZVBhcmFtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TnpVcGxvYWRDaGFuZ2VQYXJhbT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RmlsZUxpc3RDaGFuZ2U6IEV2ZW50RW1pdHRlcjxOelVwbG9hZEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPE56VXBsb2FkRmlsZVtdPigpO1xuXG4gIF9idG5PcHRpb25zPzogWmlwQnV0dG9uT3B0aW9ucztcblxuICBwcml2YXRlIHppcE9wdGlvbnMoKTogdGhpcyB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm56U2hvd1VwbG9hZExpc3QgPT09ICdib29sZWFuJyAmJiB0aGlzLm56U2hvd1VwbG9hZExpc3QpIHtcbiAgICAgIHRoaXMubnpTaG93VXBsb2FkTGlzdCA9IHtcbiAgICAgICAgc2hvd1ByZXZpZXdJY29uOiB0cnVlLFxuICAgICAgICBzaG93UmVtb3ZlSWNvbjogdHJ1ZSxcbiAgICAgICAgc2hvd0Rvd25sb2FkSWNvbjogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gZmlsdGVyc1xuICAgIGNvbnN0IGZpbHRlcnM6IFVwbG9hZEZpbHRlcltdID0gdGhpcy5uekZpbHRlci5zbGljZSgpO1xuICAgIGlmICh0aGlzLm56TXVsdGlwbGUgJiYgdGhpcy5uekxpbWl0ID4gMCAmJiBmaWx0ZXJzLmZpbmRJbmRleCh3ID0+IHcubmFtZSA9PT0gJ2xpbWl0JykgPT09IC0xKSB7XG4gICAgICBmaWx0ZXJzLnB1c2goe1xuICAgICAgICBuYW1lOiAnbGltaXQnLFxuICAgICAgICBmbjogKGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSkgPT4gZmlsZUxpc3Quc2xpY2UoLXRoaXMubnpMaW1pdClcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5uelNpemUgPiAwICYmIGZpbHRlcnMuZmluZEluZGV4KHcgPT4gdy5uYW1lID09PSAnc2l6ZScpID09PSAtMSkge1xuICAgICAgZmlsdGVycy5wdXNoKHtcbiAgICAgICAgbmFtZTogJ3NpemUnLFxuICAgICAgICBmbjogKGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSkgPT4gZmlsZUxpc3QuZmlsdGVyKHcgPT4gdy5zaXplISAvIDEwMjQgPD0gdGhpcy5uelNpemUpXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMubnpGaWxlVHlwZSAmJiB0aGlzLm56RmlsZVR5cGUubGVuZ3RoID4gMCAmJiBmaWx0ZXJzLmZpbmRJbmRleCh3ID0+IHcubmFtZSA9PT0gJ3R5cGUnKSA9PT0gLTEpIHtcbiAgICAgIGNvbnN0IHR5cGVzID0gdGhpcy5uekZpbGVUeXBlLnNwbGl0KCcsJyk7XG4gICAgICBmaWx0ZXJzLnB1c2goe1xuICAgICAgICBuYW1lOiAndHlwZScsXG4gICAgICAgIGZuOiAoZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdKSA9PiBmaWxlTGlzdC5maWx0ZXIodyA9PiB+dHlwZXMuaW5kZXhPZih3LnR5cGUhKSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9idG5PcHRpb25zID0ge1xuICAgICAgZGlzYWJsZWQ6IHRoaXMubnpEaXNhYmxlZCxcbiAgICAgIGFjY2VwdDogdGhpcy5uekFjY2VwdCxcbiAgICAgIGFjdGlvbjogdGhpcy5uekFjdGlvbixcbiAgICAgIGRpcmVjdG9yeTogdGhpcy5uekRpcmVjdG9yeSxcbiAgICAgIG9wZW5GaWxlRGlhbG9nT25DbGljazogdGhpcy5uek9wZW5GaWxlRGlhbG9nT25DbGljayxcbiAgICAgIGJlZm9yZVVwbG9hZDogdGhpcy5uekJlZm9yZVVwbG9hZCxcbiAgICAgIGN1c3RvbVJlcXVlc3Q6IHRoaXMubnpDdXN0b21SZXF1ZXN0LFxuICAgICAgZGF0YTogdGhpcy5uekRhdGEsXG4gICAgICBoZWFkZXJzOiB0aGlzLm56SGVhZGVycyxcbiAgICAgIG5hbWU6IHRoaXMubnpOYW1lLFxuICAgICAgbXVsdGlwbGU6IHRoaXMubnpNdWx0aXBsZSxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy5ueldpdGhDcmVkZW50aWFscyxcbiAgICAgIGZpbHRlcnMsXG4gICAgICB0cmFuc2Zvcm1GaWxlOiB0aGlzLm56VHJhbnNmb3JtRmlsZSxcbiAgICAgIG9uU3RhcnQ6IHRoaXMub25TdGFydCxcbiAgICAgIG9uUHJvZ3Jlc3M6IHRoaXMub25Qcm9ncmVzcyxcbiAgICAgIG9uU3VjY2VzczogdGhpcy5vblN1Y2Nlc3MsXG4gICAgICBvbkVycm9yOiB0aGlzLm9uRXJyb3JcbiAgICB9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBpMThuOiBOekkxOG5TZXJ2aWNlKSB7fVxuXG4gIC8vICNyZWdpb24gdXBsb2FkXG5cbiAgcHJpdmF0ZSBmaWxlVG9PYmplY3QoZmlsZTogTnpVcGxvYWRGaWxlKTogTnpVcGxvYWRGaWxlIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGFzdE1vZGlmaWVkOiBmaWxlLmxhc3RNb2RpZmllZCxcbiAgICAgIGxhc3RNb2RpZmllZERhdGU6IGZpbGUubGFzdE1vZGlmaWVkRGF0ZSxcbiAgICAgIG5hbWU6IGZpbGUuZmlsZW5hbWUgfHwgZmlsZS5uYW1lLFxuICAgICAgc2l6ZTogZmlsZS5zaXplLFxuICAgICAgdHlwZTogZmlsZS50eXBlLFxuICAgICAgdWlkOiBmaWxlLnVpZCxcbiAgICAgIHJlc3BvbnNlOiBmaWxlLnJlc3BvbnNlLFxuICAgICAgZXJyb3I6IGZpbGUuZXJyb3IsXG4gICAgICBwZXJjZW50OiAwLFxuICAgICAgb3JpZ2luRmlsZU9iajogZmlsZSBhcyBOelNhZmVBbnlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWxlSXRlbShmaWxlOiBOelVwbG9hZEZpbGUsIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSk6IE56VXBsb2FkRmlsZSB7XG4gICAgcmV0dXJuIGZpbGVMaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0udWlkID09PSBmaWxlLnVpZClbMF07XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUZpbGVJdGVtKGZpbGU6IE56VXBsb2FkRmlsZSwgZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdKTogTnpVcGxvYWRGaWxlW10ge1xuICAgIHJldHVybiBmaWxlTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLnVpZCAhPT0gZmlsZS51aWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblN0YXJ0ID0gKGZpbGU6IE56VXBsb2FkRmlsZSk6IHZvaWQgPT4ge1xuICAgIGlmICghdGhpcy5uekZpbGVMaXN0KSB7XG4gICAgICB0aGlzLm56RmlsZUxpc3QgPSBbXTtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0SXRlbSA9IHRoaXMuZmlsZVRvT2JqZWN0KGZpbGUpO1xuICAgIHRhcmdldEl0ZW0uc3RhdHVzID0gJ3VwbG9hZGluZyc7XG4gICAgdGhpcy5uekZpbGVMaXN0ID0gdGhpcy5uekZpbGVMaXN0LmNvbmNhdCh0YXJnZXRJdGVtKTtcbiAgICB0aGlzLm56RmlsZUxpc3RDaGFuZ2UuZW1pdCh0aGlzLm56RmlsZUxpc3QpO1xuICAgIHRoaXMubnpDaGFuZ2UuZW1pdCh7IGZpbGU6IHRhcmdldEl0ZW0sIGZpbGVMaXN0OiB0aGlzLm56RmlsZUxpc3QsIHR5cGU6ICdzdGFydCcgfSk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzTGlzdCgpO1xuICB9O1xuXG4gIHByaXZhdGUgb25Qcm9ncmVzcyA9IChlOiB7IHBlcmNlbnQ6IG51bWJlciB9LCBmaWxlOiBOelVwbG9hZEZpbGUpOiB2b2lkID0+IHtcbiAgICBjb25zdCBmaWxlTGlzdCA9IHRoaXMubnpGaWxlTGlzdDtcbiAgICBjb25zdCB0YXJnZXRJdGVtID0gdGhpcy5nZXRGaWxlSXRlbShmaWxlLCBmaWxlTGlzdCk7XG4gICAgdGFyZ2V0SXRlbS5wZXJjZW50ID0gZS5wZXJjZW50O1xuICAgIHRoaXMubnpDaGFuZ2UuZW1pdCh7XG4gICAgICBldmVudDogZSxcbiAgICAgIGZpbGU6IHsgLi4udGFyZ2V0SXRlbSB9LFxuICAgICAgZmlsZUxpc3Q6IHRoaXMubnpGaWxlTGlzdCxcbiAgICAgIHR5cGU6ICdwcm9ncmVzcydcbiAgICB9KTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXNMaXN0KCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBvblN1Y2Nlc3MgPSAocmVzOiB7fSwgZmlsZTogTnpVcGxvYWRGaWxlKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZmlsZUxpc3QgPSB0aGlzLm56RmlsZUxpc3Q7XG4gICAgY29uc3QgdGFyZ2V0SXRlbSA9IHRoaXMuZ2V0RmlsZUl0ZW0oZmlsZSwgZmlsZUxpc3QpO1xuICAgIHRhcmdldEl0ZW0uc3RhdHVzID0gJ2RvbmUnO1xuICAgIHRhcmdldEl0ZW0ucmVzcG9uc2UgPSByZXM7XG4gICAgdGhpcy5uekNoYW5nZS5lbWl0KHtcbiAgICAgIGZpbGU6IHsgLi4udGFyZ2V0SXRlbSB9LFxuICAgICAgZmlsZUxpc3QsXG4gICAgICB0eXBlOiAnc3VjY2VzcydcbiAgICB9KTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXNMaXN0KCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBvbkVycm9yID0gKGVycjoge30sIGZpbGU6IE56VXBsb2FkRmlsZSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gdGhpcy5uekZpbGVMaXN0O1xuICAgIGNvbnN0IHRhcmdldEl0ZW0gPSB0aGlzLmdldEZpbGVJdGVtKGZpbGUsIGZpbGVMaXN0KTtcbiAgICB0YXJnZXRJdGVtLmVycm9yID0gZXJyO1xuICAgIHRhcmdldEl0ZW0uc3RhdHVzID0gJ2Vycm9yJztcbiAgICB0aGlzLm56Q2hhbmdlLmVtaXQoe1xuICAgICAgZmlsZTogeyAuLi50YXJnZXRJdGVtIH0sXG4gICAgICBmaWxlTGlzdCxcbiAgICAgIHR5cGU6ICdlcnJvcidcbiAgICB9KTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXNMaXN0KCk7XG4gIH07XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gZHJhZ1xuXG4gIHByaXZhdGUgZHJhZ1N0YXRlPzogc3RyaW5nO1xuXG4gIC8vIHNraXAgc2FmYXJpIGJ1Z1xuICBmaWxlRHJvcChlOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZS50eXBlID09PSB0aGlzLmRyYWdTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRyYWdTdGF0ZSA9IGUudHlwZTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBsaXN0XG5cbiAgcHJpdmF0ZSBkZXRlY3RDaGFuZ2VzTGlzdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5saXN0Q29tcD8uZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgb25SZW1vdmUgPSAoZmlsZTogTnpVcGxvYWRGaWxlKTogdm9pZCA9PiB7XG4gICAgdGhpcy51cGxvYWRDb21wLmFib3J0KGZpbGUpO1xuICAgIGZpbGUuc3RhdHVzID0gJ3JlbW92ZWQnO1xuICAgIGNvbnN0IGZuUmVzID0gdHlwZW9mIHRoaXMubnpSZW1vdmUgPT09ICdmdW5jdGlvbicgPyB0aGlzLm56UmVtb3ZlKGZpbGUpIDogdGhpcy5uelJlbW92ZSA9PSBudWxsID8gdHJ1ZSA6IHRoaXMubnpSZW1vdmU7XG4gICAgKGZuUmVzIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSA/IGZuUmVzIDogb2YoZm5SZXMpKS5waXBlKGZpbHRlcigocmVzOiBib29sZWFuKSA9PiByZXMpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5uekZpbGVMaXN0ID0gdGhpcy5yZW1vdmVGaWxlSXRlbShmaWxlLCB0aGlzLm56RmlsZUxpc3QpO1xuICAgICAgdGhpcy5uekNoYW5nZS5lbWl0KHtcbiAgICAgICAgZmlsZSxcbiAgICAgICAgZmlsZUxpc3Q6IHRoaXMubnpGaWxlTGlzdCxcbiAgICAgICAgdHlwZTogJ3JlbW92ZWQnXG4gICAgICB9KTtcbiAgICAgIHRoaXMubnpGaWxlTGlzdENoYW5nZS5lbWl0KHRoaXMubnpGaWxlTGlzdCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gc3R5bGVzXG5cbiAgcHJpdmF0ZSBwcmVmaXhDbHMgPSAnYW50LXVwbG9hZCc7XG4gIGNsYXNzTGlzdDogc3RyaW5nW10gPSBbXTtcblxuICBwcml2YXRlIHNldENsYXNzTWFwKCk6IHZvaWQge1xuICAgIGxldCBzdWJDbHM6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKHRoaXMubnpUeXBlID09PSAnZHJhZycpIHtcbiAgICAgIGlmICh0aGlzLm56RmlsZUxpc3Quc29tZShmaWxlID0+IGZpbGUuc3RhdHVzID09PSAndXBsb2FkaW5nJykpIHtcbiAgICAgICAgc3ViQ2xzLnB1c2goYCR7dGhpcy5wcmVmaXhDbHN9LWRyYWctdXBsb2FkaW5nYCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kcmFnU3RhdGUgPT09ICdkcmFnb3ZlcicpIHtcbiAgICAgICAgc3ViQ2xzLnB1c2goYCR7dGhpcy5wcmVmaXhDbHN9LWRyYWctaG92ZXJgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3ViQ2xzID0gW2Ake3RoaXMucHJlZml4Q2xzfS1zZWxlY3QtJHt0aGlzLm56TGlzdFR5cGV9YF07XG4gICAgfVxuXG4gICAgdGhpcy5jbGFzc0xpc3QgPSBbXG4gICAgICB0aGlzLnByZWZpeENscyxcbiAgICAgIGAke3RoaXMucHJlZml4Q2xzfS0ke3RoaXMubnpUeXBlfWAsXG4gICAgICAuLi5zdWJDbHMsXG4gICAgICAodGhpcy5uekRpc2FibGVkICYmIGAke3RoaXMucHJlZml4Q2xzfS1kaXNhYmxlZGApIHx8ICcnXG4gICAgXS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0pO1xuXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaTE4bi5sb2NhbGVDaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsZSA9IHRoaXMuaTE4bi5nZXRMb2NhbGVEYXRhKCdVcGxvYWQnKTtcbiAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc0xpc3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuemlwT3B0aW9ucygpLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==