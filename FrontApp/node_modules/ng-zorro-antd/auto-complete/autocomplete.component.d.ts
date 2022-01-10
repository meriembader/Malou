/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, CompareWith, NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable } from 'rxjs';
import { NzAutocompleteOptionComponent, NzOptionSelectionChange } from './autocomplete-option.component';
export interface AutocompleteDataSourceItem {
    value: string;
    label: string;
}
export declare type AutocompleteDataSource = Array<AutocompleteDataSourceItem | string | number>;
export declare class NzAutocompleteComponent implements AfterContentInit, AfterViewInit, OnDestroy {
    private changeDetectorRef;
    private ngZone;
    noAnimation?: NzNoAnimationDirective | undefined;
    static ngAcceptInputType_nzDefaultActiveFirstOption: BooleanInput;
    static ngAcceptInputType_nzBackfill: BooleanInput;
    nzWidth?: number;
    nzOverlayClassName: string;
    nzOverlayStyle: {
        [key: string]: string;
    };
    nzDefaultActiveFirstOption: boolean;
    nzBackfill: boolean;
    compareWith: CompareWith;
    nzDataSource?: AutocompleteDataSource;
    readonly selectionChange: EventEmitter<NzAutocompleteOptionComponent>;
    showPanel: boolean;
    isOpen: boolean;
    activeItem: NzAutocompleteOptionComponent;
    /**
     * Options accessor, its source may be content or dataSource
     */
    get options(): QueryList<NzAutocompleteOptionComponent>;
    /** Provided by content */
    fromContentOptions: QueryList<NzAutocompleteOptionComponent>;
    /** Provided by dataSource */
    fromDataSourceOptions: QueryList<NzAutocompleteOptionComponent>;
    /** cdk-overlay */
    template?: TemplateRef<{}>;
    panel?: ElementRef;
    content?: ElementRef;
    private activeItemIndex;
    private selectionChangeSubscription;
    private optionMouseEnterSubscription;
    private dataSourceChangeSubscription;
    /** Options changes listener */
    readonly optionSelectionChanges: Observable<NzOptionSelectionChange>;
    readonly optionMouseEnter: Observable<NzAutocompleteOptionComponent>;
    constructor(changeDetectorRef: ChangeDetectorRef, ngZone: NgZone, noAnimation?: NzNoAnimationDirective | undefined);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    setVisibility(): void;
    setActiveItem(index: number): void;
    setNextItemActive(): void;
    setPreviousItemActive(): void;
    getOptionIndex(value: NzSafeAny): number;
    getOption(value: NzSafeAny): NzAutocompleteOptionComponent | null;
    private optionsInit;
    /**
     * Clear the status of options
     */
    clearSelectedOptions(skip?: NzAutocompleteOptionComponent | null, deselect?: boolean): void;
    private subscribeOptionChanges;
}
