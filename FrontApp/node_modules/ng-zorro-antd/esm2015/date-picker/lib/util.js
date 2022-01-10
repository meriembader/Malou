/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Compatible translate the moment-like format pattern to angular's pattern
 * Why? For now, we need to support the existing language formats in AntD, and AntD uses the default temporal syntax.
 *
 * TODO: compare and complete all format patterns
 * Each format docs as below:
 * @link https://momentjs.com/docs/#/displaying/format/
 * @link https://angular.io/api/common/DatePipe#description
 * @param format input format pattern
 */
export function transCompatFormat(format) {
    return (format &&
        format
            .replace(/Y/g, 'y') // only support y, yy, yyy, yyyy
            .replace(/D/g, 'd')); // d, dd represent of D, DD for momentjs, others are not support
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsTUFBYztJQUM5QyxPQUFPLENBQ0wsTUFBTTtRQUNOLE1BQU07YUFDSCxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLGdDQUFnQzthQUNuRCxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUN0QixDQUFDLENBQUMsZ0VBQWdFO0FBQ3JFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4vKipcbiAqIENvbXBhdGlibGUgdHJhbnNsYXRlIHRoZSBtb21lbnQtbGlrZSBmb3JtYXQgcGF0dGVybiB0byBhbmd1bGFyJ3MgcGF0dGVyblxuICogV2h5PyBGb3Igbm93LCB3ZSBuZWVkIHRvIHN1cHBvcnQgdGhlIGV4aXN0aW5nIGxhbmd1YWdlIGZvcm1hdHMgaW4gQW50RCwgYW5kIEFudEQgdXNlcyB0aGUgZGVmYXVsdCB0ZW1wb3JhbCBzeW50YXguXG4gKlxuICogVE9ETzogY29tcGFyZSBhbmQgY29tcGxldGUgYWxsIGZvcm1hdCBwYXR0ZXJuc1xuICogRWFjaCBmb3JtYXQgZG9jcyBhcyBiZWxvdzpcbiAqIEBsaW5rIGh0dHBzOi8vbW9tZW50anMuY29tL2RvY3MvIy9kaXNwbGF5aW5nL2Zvcm1hdC9cbiAqIEBsaW5rIGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29tbW9uL0RhdGVQaXBlI2Rlc2NyaXB0aW9uXG4gKiBAcGFyYW0gZm9ybWF0IGlucHV0IGZvcm1hdCBwYXR0ZXJuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc0NvbXBhdEZvcm1hdChmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiAoXG4gICAgZm9ybWF0ICYmXG4gICAgZm9ybWF0XG4gICAgICAucmVwbGFjZSgvWS9nLCAneScpIC8vIG9ubHkgc3VwcG9ydCB5LCB5eSwgeXl5LCB5eXl5XG4gICAgICAucmVwbGFjZSgvRC9nLCAnZCcpXG4gICk7IC8vIGQsIGRkIHJlcHJlc2VudCBvZiBELCBERCBmb3IgbW9tZW50anMsIG90aGVycyBhcmUgbm90IHN1cHBvcnRcbn1cbiJdfQ==