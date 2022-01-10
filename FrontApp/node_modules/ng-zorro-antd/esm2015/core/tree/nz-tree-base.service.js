/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzTreeNode } from './nz-tree-base-node';
import { flattenTreeData, isCheckDisabled, isInArray } from './nz-tree-base-util';
export class NzTreeBaseService {
    constructor() {
        this.DRAG_SIDE_RANGE = 0.25;
        this.DRAG_MIN_GAP = 2;
        this.isCheckStrictly = false;
        this.isMultiple = false;
        this.rootNodes = [];
        this.flattenNodes$ = new BehaviorSubject([]);
        this.selectedNodeList = [];
        this.expandedNodeList = [];
        this.checkedNodeList = [];
        this.halfCheckedNodeList = [];
        this.matchedNodeList = [];
    }
    /**
     * reset tree nodes will clear default node list
     */
    initTree(nzNodes) {
        this.rootNodes = nzNodes;
        this.expandedNodeList = [];
        this.selectedNodeList = [];
        this.halfCheckedNodeList = [];
        this.checkedNodeList = [];
        this.matchedNodeList = [];
    }
    flattenTreeData(nzNodes, expandedKeys = []) {
        this.flattenNodes$.next(flattenTreeData(nzNodes, expandedKeys).map(item => item.data));
    }
    getSelectedNode() {
        return this.selectedNode;
    }
    /**
     * get some list
     */
    getSelectedNodeList() {
        return this.conductNodeState('select');
    }
    /**
     * return checked nodes
     */
    getCheckedNodeList() {
        return this.conductNodeState('check');
    }
    getHalfCheckedNodeList() {
        return this.conductNodeState('halfCheck');
    }
    /**
     * return expanded nodes
     */
    getExpandedNodeList() {
        return this.conductNodeState('expand');
    }
    /**
     * return search matched nodes
     */
    getMatchedNodeList() {
        return this.conductNodeState('match');
    }
    isArrayOfNzTreeNode(value) {
        return value.every(item => item instanceof NzTreeNode);
    }
    /**
     * set drag node
     */
    setSelectedNode(node) {
        this.selectedNode = node;
    }
    /**
     * set node selected status
     */
    setNodeActive(node) {
        if (!this.isMultiple && node.isSelected) {
            this.selectedNodeList.forEach(n => {
                if (node.key !== n.key) {
                    // reset other nodes
                    n.isSelected = false;
                }
            });
            // single mode: remove pre node
            this.selectedNodeList = [];
        }
        this.setSelectedNodeList(node, this.isMultiple);
    }
    /**
     * add or remove node to selectedNodeList
     */
    setSelectedNodeList(node, isMultiple = false) {
        const index = this.getIndexOfArray(this.selectedNodeList, node.key);
        if (isMultiple) {
            if (node.isSelected && index === -1) {
                this.selectedNodeList.push(node);
            }
        }
        else {
            if (node.isSelected && index === -1) {
                this.selectedNodeList = [node];
            }
        }
        if (!node.isSelected) {
            this.selectedNodeList = this.selectedNodeList.filter(n => n.key !== node.key);
        }
    }
    /**
     * merge checked nodes
     */
    setHalfCheckedNodeList(node) {
        const index = this.getIndexOfArray(this.halfCheckedNodeList, node.key);
        if (node.isHalfChecked && index === -1) {
            this.halfCheckedNodeList.push(node);
        }
        else if (!node.isHalfChecked && index > -1) {
            this.halfCheckedNodeList = this.halfCheckedNodeList.filter(n => node.key !== n.key);
        }
    }
    setCheckedNodeList(node) {
        const index = this.getIndexOfArray(this.checkedNodeList, node.key);
        if (node.isChecked && index === -1) {
            this.checkedNodeList.push(node);
        }
        else if (!node.isChecked && index > -1) {
            this.checkedNodeList = this.checkedNodeList.filter(n => node.key !== n.key);
        }
    }
    /**
     * conduct checked/selected/expanded keys
     */
    conductNodeState(type = 'check') {
        let resultNodesList = [];
        switch (type) {
            case 'select':
                resultNodesList = this.selectedNodeList;
                break;
            case 'expand':
                resultNodesList = this.expandedNodeList;
                break;
            case 'match':
                resultNodesList = this.matchedNodeList;
                break;
            case 'check':
                resultNodesList = this.checkedNodeList;
                const isIgnore = (node) => {
                    const parentNode = node.getParentNode();
                    if (parentNode) {
                        if (this.checkedNodeList.findIndex(n => n.key === parentNode.key) > -1) {
                            return true;
                        }
                        else {
                            return isIgnore(parentNode);
                        }
                    }
                    return false;
                };
                // merge checked
                if (!this.isCheckStrictly) {
                    resultNodesList = this.checkedNodeList.filter(n => !isIgnore(n));
                }
                break;
            case 'halfCheck':
                if (!this.isCheckStrictly) {
                    resultNodesList = this.halfCheckedNodeList;
                }
                break;
        }
        return resultNodesList;
    }
    /**
     * set expanded nodes
     */
    setExpandedNodeList(node) {
        if (node.isLeaf) {
            return;
        }
        const index = this.getIndexOfArray(this.expandedNodeList, node.key);
        if (node.isExpanded && index === -1) {
            this.expandedNodeList.push(node);
        }
        else if (!node.isExpanded && index > -1) {
            this.expandedNodeList.splice(index, 1);
        }
    }
    setMatchedNodeList(node) {
        const index = this.getIndexOfArray(this.matchedNodeList, node.key);
        if (node.isMatched && index === -1) {
            this.matchedNodeList.push(node);
        }
        else if (!node.isMatched && index > -1) {
            this.matchedNodeList.splice(index, 1);
        }
    }
    /**
     * check state
     * @param isCheckStrictly
     */
    refreshCheckState(isCheckStrictly = false) {
        if (isCheckStrictly) {
            return;
        }
        this.checkedNodeList.forEach(node => {
            this.conduct(node, isCheckStrictly);
        });
    }
    // reset other node checked state based current node
    conduct(node, isCheckStrictly = false) {
        const isChecked = node.isChecked;
        if (node && !isCheckStrictly) {
            this.conductUp(node);
            this.conductDown(node, isChecked);
        }
    }
    /**
     * 1、children half checked
     * 2、children all checked, parent checked
     * 3、no children checked
     */
    conductUp(node) {
        const parentNode = node.getParentNode();
        if (parentNode) {
            if (!isCheckDisabled(parentNode)) {
                if (parentNode.children.every(child => isCheckDisabled(child) || (!child.isHalfChecked && child.isChecked))) {
                    parentNode.isChecked = true;
                    parentNode.isHalfChecked = false;
                }
                else if (parentNode.children.some(child => child.isHalfChecked || child.isChecked)) {
                    parentNode.isChecked = false;
                    parentNode.isHalfChecked = true;
                }
                else {
                    parentNode.isChecked = false;
                    parentNode.isHalfChecked = false;
                }
            }
            this.setCheckedNodeList(parentNode);
            this.setHalfCheckedNodeList(parentNode);
            this.conductUp(parentNode);
        }
    }
    /**
     * reset child check state
     */
    conductDown(node, value) {
        if (!isCheckDisabled(node)) {
            node.isChecked = value;
            node.isHalfChecked = false;
            this.setCheckedNodeList(node);
            this.setHalfCheckedNodeList(node);
            node.children.forEach(n => {
                this.conductDown(n, value);
            });
        }
    }
    /**
     * flush after delete node
     */
    afterRemove(nodes) {
        // to reset selectedNodeList & expandedNodeList
        const loopNode = (node) => {
            // remove selected node
            this.selectedNodeList = this.selectedNodeList.filter(n => n.key !== node.key);
            // remove expanded node
            this.expandedNodeList = this.expandedNodeList.filter(n => n.key !== node.key);
            // remove checked node
            this.checkedNodeList = this.checkedNodeList.filter(n => n.key !== node.key);
            if (node.children) {
                node.children.forEach(child => {
                    loopNode(child);
                });
            }
        };
        nodes.forEach(n => {
            loopNode(n);
        });
        this.refreshCheckState(this.isCheckStrictly);
    }
    /**
     * drag event
     */
    refreshDragNode(node) {
        if (node.children.length === 0) {
            // until root
            this.conductUp(node);
        }
        else {
            node.children.forEach(child => {
                this.refreshDragNode(child);
            });
        }
    }
    // reset node level
    resetNodeLevel(node) {
        const parentNode = node.getParentNode();
        if (parentNode) {
            node.level = parentNode.level + 1;
        }
        else {
            node.level = 0;
        }
        for (const child of node.children) {
            this.resetNodeLevel(child);
        }
    }
    calcDropPosition(event) {
        const { clientY } = event;
        // to fix firefox undefined
        const { top, bottom, height } = event.target.getBoundingClientRect();
        const des = Math.max(height * this.DRAG_SIDE_RANGE, this.DRAG_MIN_GAP);
        if (clientY <= top + des) {
            return -1;
        }
        else if (clientY >= bottom - des) {
            return 1;
        }
        return 0;
    }
    /**
     * drop
     * 0: inner -1: pre 1: next
     */
    dropAndApply(targetNode, dragPos = -1) {
        if (!targetNode || dragPos > 1) {
            return;
        }
        const treeService = targetNode.treeService;
        const targetParent = targetNode.getParentNode();
        const isSelectedRootNode = this.selectedNode.getParentNode();
        // remove the dragNode
        if (isSelectedRootNode) {
            isSelectedRootNode.children = isSelectedRootNode.children.filter(n => n.key !== this.selectedNode.key);
        }
        else {
            this.rootNodes = this.rootNodes.filter(n => n.key !== this.selectedNode.key);
        }
        switch (dragPos) {
            case 0:
                targetNode.addChildren([this.selectedNode]);
                this.resetNodeLevel(targetNode);
                break;
            case -1:
            case 1:
                const tIndex = dragPos === 1 ? 1 : 0;
                if (targetParent) {
                    targetParent.addChildren([this.selectedNode], targetParent.children.indexOf(targetNode) + tIndex);
                    const parentNode = this.selectedNode.getParentNode();
                    if (parentNode) {
                        this.resetNodeLevel(parentNode);
                    }
                }
                else {
                    const targetIndex = this.rootNodes.indexOf(targetNode) + tIndex;
                    // Insert root node.
                    this.rootNodes.splice(targetIndex, 0, this.selectedNode);
                    this.rootNodes[targetIndex].parentNode = null;
                    this.resetNodeLevel(this.rootNodes[targetIndex]);
                }
                break;
        }
        // flush all nodes
        this.rootNodes.forEach(child => {
            if (!child.treeService) {
                child.service = treeService;
            }
            this.refreshDragNode(child);
        });
    }
    /**
     * emit Structure
     * eventName
     * node
     * event: MouseEvent / DragEvent
     * dragNode
     */
    formatEvent(eventName, node, event) {
        const emitStructure = {
            eventName: eventName,
            node: node,
            event: event
        };
        switch (eventName) {
            case 'dragstart':
            case 'dragenter':
            case 'dragover':
            case 'dragleave':
            case 'drop':
            case 'dragend':
                Object.assign(emitStructure, { dragNode: this.getSelectedNode() });
                break;
            case 'click':
            case 'dblclick':
                Object.assign(emitStructure, { selectedKeys: this.selectedNodeList });
                Object.assign(emitStructure, { nodes: this.selectedNodeList });
                Object.assign(emitStructure, { keys: this.selectedNodeList.map(n => n.key) });
                break;
            case 'check':
                const checkedNodeList = this.getCheckedNodeList();
                Object.assign(emitStructure, { checkedKeys: checkedNodeList });
                Object.assign(emitStructure, { nodes: checkedNodeList });
                Object.assign(emitStructure, { keys: checkedNodeList.map(n => n.key) });
                break;
            case 'search':
                Object.assign(emitStructure, { matchedKeys: this.getMatchedNodeList() });
                Object.assign(emitStructure, { nodes: this.getMatchedNodeList() });
                Object.assign(emitStructure, { keys: this.getMatchedNodeList().map(n => n.key) });
                break;
            case 'expand':
                Object.assign(emitStructure, { nodes: this.expandedNodeList });
                Object.assign(emitStructure, { keys: this.expandedNodeList.map(n => n.key) });
                break;
        }
        return emitStructure;
    }
    /**
     * New functions for flatten nodes
     */
    getIndexOfArray(list, key) {
        return list.findIndex(v => v.key === key);
    }
    /**
     * Render by nzCheckedKeys
     * When keys equals null, just render with checkStrictly
     * @param keys
     * @param checkStrictly
     */
    conductCheck(keys, checkStrictly) {
        this.checkedNodeList = [];
        this.halfCheckedNodeList = [];
        const calc = (nodes) => {
            nodes.forEach(node => {
                if (keys === null) {
                    // render tree if no default checked keys found
                    node.isChecked = !!node.origin.checked;
                }
                else {
                    if (isInArray(node.key, keys || [])) {
                        node.isChecked = true;
                        node.isHalfChecked = false;
                    }
                    else {
                        node.isChecked = false;
                        node.isHalfChecked = false;
                    }
                }
                if (node.children.length > 0) {
                    calc(node.children);
                }
            });
        };
        calc(this.rootNodes);
        this.refreshCheckState(checkStrictly);
    }
    conductExpandedKeys(keys = []) {
        const expandedKeySet = new Set(keys === true ? [] : keys);
        this.expandedNodeList = [];
        const calc = (nodes) => {
            nodes.forEach(node => {
                node.setExpanded(keys === true || expandedKeySet.has(node.key) || node.isExpanded === true);
                if (node.isExpanded) {
                    this.setExpandedNodeList(node);
                }
                if (node.children.length > 0) {
                    calc(node.children);
                }
            });
        };
        calc(this.rootNodes);
    }
    conductSelectedKeys(keys, isMulti) {
        this.selectedNodeList.forEach(node => (node.isSelected = false));
        this.selectedNodeList = [];
        const calc = (nodes) => {
            return nodes.every(node => {
                if (isInArray(node.key, keys)) {
                    node.isSelected = true;
                    this.setSelectedNodeList(node);
                    if (!isMulti) {
                        // if not support multi select
                        return false;
                    }
                }
                else {
                    node.isSelected = false;
                }
                if (node.children.length > 0) {
                    // Recursion
                    return calc(node.children);
                }
                return true;
            });
        };
        calc(this.rootNodes);
    }
    /**
     * Expand parent nodes by child node
     * @param node
     */
    expandNodeAllParentBySearch(node) {
        const calc = (n) => {
            if (n) {
                n.canHide = false;
                n.setExpanded(true);
                this.setExpandedNodeList(n);
                if (n.getParentNode()) {
                    return calc(n.getParentNode());
                }
            }
        };
        calc(node.getParentNode());
    }
}
NzTreeBaseService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdHJlZS1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2NvcmUvdHJlZS8iLCJzb3VyY2VzIjpbIm56LXRyZWUtYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSWxGLE1BQU0sT0FBTyxpQkFBaUI7SUFEOUI7UUFFRSxvQkFBZSxHQUFHLElBQUksQ0FBQztRQUN2QixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUVqQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBRTVCLGNBQVMsR0FBaUIsRUFBRSxDQUFDO1FBQzdCLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQWUsRUFBRSxDQUFDLENBQUM7UUFDdEQscUJBQWdCLEdBQWlCLEVBQUUsQ0FBQztRQUNwQyxxQkFBZ0IsR0FBaUIsRUFBRSxDQUFDO1FBQ3BDLG9CQUFlLEdBQWlCLEVBQUUsQ0FBQztRQUNuQyx3QkFBbUIsR0FBaUIsRUFBRSxDQUFDO1FBQ3ZDLG9CQUFlLEdBQWlCLEVBQUUsQ0FBQztJQWdnQnJDLENBQUM7SUE5ZkM7O09BRUc7SUFDSCxRQUFRLENBQUMsT0FBcUI7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFxQixFQUFFLGVBQXVDLEVBQUU7UUFDOUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0JBQWtCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBa0I7UUFDcEMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxZQUFZLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWUsQ0FBQyxJQUFnQjtRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhLENBQUMsSUFBZ0I7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRTtvQkFDdEIsb0JBQW9CO29CQUNwQixDQUFDLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztpQkFDdEI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILCtCQUErQjtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CLENBQUMsSUFBZ0IsRUFBRSxhQUFzQixLQUFLO1FBQy9ELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRSxJQUFJLFVBQVUsRUFBRTtZQUNkLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEM7U0FDRjthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEM7U0FDRjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0U7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQkFBc0IsQ0FBQyxJQUFnQjtRQUNyQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkUsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckY7SUFDSCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsSUFBZ0I7UUFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3RTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQixDQUFDLE9BQWUsT0FBTztRQUNyQyxJQUFJLGVBQWUsR0FBaUIsRUFBRSxDQUFDO1FBQ3ZDLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxRQUFRO2dCQUNYLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3hDLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDeEMsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDdkMsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDdkMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFnQixFQUFXLEVBQUU7b0JBQzdDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDeEMsSUFBSSxVQUFVLEVBQUU7d0JBQ2QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFOzRCQUN0RSxPQUFPLElBQUksQ0FBQzt5QkFDYjs2QkFBTTs0QkFDTCxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzt5QkFDN0I7cUJBQ0Y7b0JBQ0QsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDO2dCQUNGLGdCQUFnQjtnQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3pCLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2xFO2dCQUNELE1BQU07WUFDUixLQUFLLFdBQVc7Z0JBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3pCLGVBQWUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7aUJBQzVDO2dCQUNELE1BQU07U0FDVDtRQUNELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILG1CQUFtQixDQUFDLElBQWdCO1FBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU87U0FDUjtRQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsSUFBZ0I7UUFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxpQkFBaUIsQ0FBQyxrQkFBMkIsS0FBSztRQUNoRCxJQUFJLGVBQWUsRUFBRTtZQUNuQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxvREFBb0Q7SUFDcEQsT0FBTyxDQUFDLElBQWdCLEVBQUUsa0JBQTJCLEtBQUs7UUFDeEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxTQUFTLENBQUMsSUFBZ0I7UUFDeEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hDLElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRTtvQkFDM0csVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQzVCLFVBQVUsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2lCQUNsQztxQkFBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3BGLFVBQVUsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUM3QixVQUFVLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztpQkFDakM7cUJBQU07b0JBQ0wsVUFBVSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQzdCLFVBQVUsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2lCQUNsQzthQUNGO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLElBQWdCLEVBQUUsS0FBYztRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBbUI7UUFDN0IsK0NBQStDO1FBQy9DLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBZ0IsRUFBRSxFQUFFO1lBQ3BDLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlFLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlFLHNCQUFzQjtZQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDNUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDO1FBQ0YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZSxDQUFDLElBQWdCO1FBQzlCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzlCLGFBQWE7WUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELG1CQUFtQjtJQUNuQixjQUFjLENBQUMsSUFBZ0I7UUFDN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hDLElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDaEI7UUFDRCxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFnQjtRQUMvQixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQzFCLDJCQUEyQjtRQUMzQixNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBSSxLQUFLLENBQUMsTUFBa0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2xGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZFLElBQUksT0FBTyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUU7WUFDeEIsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNYO2FBQU0sSUFBSSxPQUFPLElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNsQyxPQUFPLENBQUMsQ0FBQztTQUNWO1FBRUQsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsWUFBWSxDQUFDLFVBQXNCLEVBQUUsVUFBa0IsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtZQUM5QixPQUFPO1NBQ1I7UUFDRCxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQzNDLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNoRCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0Qsc0JBQXNCO1FBQ3RCLElBQUksa0JBQWtCLEVBQUU7WUFDdEIsa0JBQWtCLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEc7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUU7UUFDRCxRQUFRLE9BQU8sRUFBRTtZQUNmLEtBQUssQ0FBQztnQkFDSixVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2hDLE1BQU07WUFDUixLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsS0FBSyxDQUFDO2dCQUNKLE1BQU0sTUFBTSxHQUFHLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLFlBQVksRUFBRTtvQkFDaEIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztvQkFDbEcsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckQsSUFBSSxVQUFVLEVBQUU7d0JBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDakM7aUJBQ0Y7cUJBQU07b0JBQ0wsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDO29CQUNoRSxvQkFBb0I7b0JBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN6RCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUNsRDtnQkFDRCxNQUFNO1NBQ1Q7UUFDRCxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxXQUFXLENBQUMsU0FBaUIsRUFBRSxJQUF1QixFQUFFLEtBQW9DO1FBQzFGLE1BQU0sYUFBYSxHQUFzQjtZQUN2QyxTQUFTLEVBQUUsU0FBUztZQUNwQixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQztRQUNGLFFBQVEsU0FBUyxFQUFFO1lBQ2pCLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxTQUFTO2dCQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ25FLE1BQU07WUFDUixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssVUFBVTtnQkFDYixNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUUsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztnQkFDL0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztnQkFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3hFLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ25FLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xGLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztnQkFDL0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlFLE1BQU07U0FDVDtRQUNELE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUVILGVBQWUsQ0FBQyxJQUFrQixFQUFFLEdBQVc7UUFDN0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxZQUFZLENBQUMsSUFBNEIsRUFBRSxhQUFzQjtRQUMvRCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzlCLE1BQU0sSUFBSSxHQUFHLENBQUMsS0FBbUIsRUFBRSxFQUFFO1lBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtvQkFDakIsK0NBQStDO29CQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQkFDeEM7cUJBQU07b0JBQ0wsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLEVBQUU7d0JBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztxQkFDNUI7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO3FCQUM1QjtpQkFDRjtnQkFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDckI7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxPQUErQixFQUFFO1FBQ25ELE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMzQixNQUFNLElBQUksR0FBRyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtZQUNuQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDNUYsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNuQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2hDO2dCQUNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNyQjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsbUJBQW1CLENBQUMsSUFBcUIsRUFBRSxPQUFnQjtRQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMzQixNQUFNLElBQUksR0FBRyxDQUFDLEtBQW1CLEVBQVcsRUFBRTtZQUM1QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQ1osOEJBQThCO3dCQUM5QixPQUFPLEtBQUssQ0FBQztxQkFDZDtpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztpQkFDekI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzVCLFlBQVk7b0JBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM1QjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMkJBQTJCLENBQUMsSUFBZ0I7UUFDMUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFvQixFQUFRLEVBQUU7WUFDMUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ0wsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7b0JBQ3JCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2lCQUNoQzthQUNGO1FBQ0gsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7OztZQTdnQkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTnpUcmVlTm9kZSwgTnpUcmVlTm9kZUtleSB9IGZyb20gJy4vbnotdHJlZS1iYXNlLW5vZGUnO1xuaW1wb3J0IHsgZmxhdHRlblRyZWVEYXRhLCBpc0NoZWNrRGlzYWJsZWQsIGlzSW5BcnJheSB9IGZyb20gJy4vbnotdHJlZS1iYXNlLXV0aWwnO1xuaW1wb3J0IHsgTnpGb3JtYXRFbWl0RXZlbnQgfSBmcm9tICcuL256LXRyZWUtYmFzZS5kZWZpbml0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOelRyZWVCYXNlU2VydmljZSB7XG4gIERSQUdfU0lERV9SQU5HRSA9IDAuMjU7XG4gIERSQUdfTUlOX0dBUCA9IDI7XG5cbiAgaXNDaGVja1N0cmljdGx5OiBib29sZWFuID0gZmFsc2U7XG4gIGlzTXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc2VsZWN0ZWROb2RlITogTnpUcmVlTm9kZTtcbiAgcm9vdE5vZGVzOiBOelRyZWVOb2RlW10gPSBbXTtcbiAgZmxhdHRlbk5vZGVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TnpUcmVlTm9kZVtdPihbXSk7XG4gIHNlbGVjdGVkTm9kZUxpc3Q6IE56VHJlZU5vZGVbXSA9IFtdO1xuICBleHBhbmRlZE5vZGVMaXN0OiBOelRyZWVOb2RlW10gPSBbXTtcbiAgY2hlY2tlZE5vZGVMaXN0OiBOelRyZWVOb2RlW10gPSBbXTtcbiAgaGFsZkNoZWNrZWROb2RlTGlzdDogTnpUcmVlTm9kZVtdID0gW107XG4gIG1hdGNoZWROb2RlTGlzdDogTnpUcmVlTm9kZVtdID0gW107XG5cbiAgLyoqXG4gICAqIHJlc2V0IHRyZWUgbm9kZXMgd2lsbCBjbGVhciBkZWZhdWx0IG5vZGUgbGlzdFxuICAgKi9cbiAgaW5pdFRyZWUobnpOb2RlczogTnpUcmVlTm9kZVtdKTogdm9pZCB7XG4gICAgdGhpcy5yb290Tm9kZXMgPSBuek5vZGVzO1xuICAgIHRoaXMuZXhwYW5kZWROb2RlTGlzdCA9IFtdO1xuICAgIHRoaXMuc2VsZWN0ZWROb2RlTGlzdCA9IFtdO1xuICAgIHRoaXMuaGFsZkNoZWNrZWROb2RlTGlzdCA9IFtdO1xuICAgIHRoaXMuY2hlY2tlZE5vZGVMaXN0ID0gW107XG4gICAgdGhpcy5tYXRjaGVkTm9kZUxpc3QgPSBbXTtcbiAgfVxuXG4gIGZsYXR0ZW5UcmVlRGF0YShuek5vZGVzOiBOelRyZWVOb2RlW10sIGV4cGFuZGVkS2V5czogTnpUcmVlTm9kZUtleVtdIHwgdHJ1ZSA9IFtdKTogdm9pZCB7XG4gICAgdGhpcy5mbGF0dGVuTm9kZXMkLm5leHQoZmxhdHRlblRyZWVEYXRhKG56Tm9kZXMsIGV4cGFuZGVkS2V5cykubWFwKGl0ZW0gPT4gaXRlbS5kYXRhKSk7XG4gIH1cblxuICBnZXRTZWxlY3RlZE5vZGUoKTogTnpUcmVlTm9kZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkTm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgc29tZSBsaXN0XG4gICAqL1xuICBnZXRTZWxlY3RlZE5vZGVMaXN0KCk6IE56VHJlZU5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZHVjdE5vZGVTdGF0ZSgnc2VsZWN0Jyk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIGNoZWNrZWQgbm9kZXNcbiAgICovXG4gIGdldENoZWNrZWROb2RlTGlzdCgpOiBOelRyZWVOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLmNvbmR1Y3ROb2RlU3RhdGUoJ2NoZWNrJyk7XG4gIH1cblxuICBnZXRIYWxmQ2hlY2tlZE5vZGVMaXN0KCk6IE56VHJlZU5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZHVjdE5vZGVTdGF0ZSgnaGFsZkNoZWNrJyk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIGV4cGFuZGVkIG5vZGVzXG4gICAqL1xuICBnZXRFeHBhbmRlZE5vZGVMaXN0KCk6IE56VHJlZU5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZHVjdE5vZGVTdGF0ZSgnZXhwYW5kJyk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIHNlYXJjaCBtYXRjaGVkIG5vZGVzXG4gICAqL1xuICBnZXRNYXRjaGVkTm9kZUxpc3QoKTogTnpUcmVlTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5jb25kdWN0Tm9kZVN0YXRlKCdtYXRjaCcpO1xuICB9XG5cbiAgaXNBcnJheU9mTnpUcmVlTm9kZSh2YWx1ZTogTnpTYWZlQW55W10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWUuZXZlcnkoaXRlbSA9PiBpdGVtIGluc3RhbmNlb2YgTnpUcmVlTm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0IGRyYWcgbm9kZVxuICAgKi9cbiAgc2V0U2VsZWN0ZWROb2RlKG5vZGU6IE56VHJlZU5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkTm9kZSA9IG5vZGU7XG4gIH1cblxuICAvKipcbiAgICogc2V0IG5vZGUgc2VsZWN0ZWQgc3RhdHVzXG4gICAqL1xuICBzZXROb2RlQWN0aXZlKG5vZGU6IE56VHJlZU5vZGUpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNNdWx0aXBsZSAmJiBub2RlLmlzU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWROb2RlTGlzdC5mb3JFYWNoKG4gPT4ge1xuICAgICAgICBpZiAobm9kZS5rZXkgIT09IG4ua2V5KSB7XG4gICAgICAgICAgLy8gcmVzZXQgb3RoZXIgbm9kZXNcbiAgICAgICAgICBuLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBzaW5nbGUgbW9kZTogcmVtb3ZlIHByZSBub2RlXG4gICAgICB0aGlzLnNlbGVjdGVkTm9kZUxpc3QgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5zZXRTZWxlY3RlZE5vZGVMaXN0KG5vZGUsIHRoaXMuaXNNdWx0aXBsZSk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIG9yIHJlbW92ZSBub2RlIHRvIHNlbGVjdGVkTm9kZUxpc3RcbiAgICovXG4gIHNldFNlbGVjdGVkTm9kZUxpc3Qobm9kZTogTnpUcmVlTm9kZSwgaXNNdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZBcnJheSh0aGlzLnNlbGVjdGVkTm9kZUxpc3QsIG5vZGUua2V5KTtcbiAgICBpZiAoaXNNdWx0aXBsZSkge1xuICAgICAgaWYgKG5vZGUuaXNTZWxlY3RlZCAmJiBpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGVMaXN0LnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChub2RlLmlzU2VsZWN0ZWQgJiYgaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlTGlzdCA9IFtub2RlXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFub2RlLmlzU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWROb2RlTGlzdCA9IHRoaXMuc2VsZWN0ZWROb2RlTGlzdC5maWx0ZXIobiA9PiBuLmtleSAhPT0gbm9kZS5rZXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBtZXJnZSBjaGVja2VkIG5vZGVzXG4gICAqL1xuICBzZXRIYWxmQ2hlY2tlZE5vZGVMaXN0KG5vZGU6IE56VHJlZU5vZGUpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFycmF5KHRoaXMuaGFsZkNoZWNrZWROb2RlTGlzdCwgbm9kZS5rZXkpO1xuICAgIGlmIChub2RlLmlzSGFsZkNoZWNrZWQgJiYgaW5kZXggPT09IC0xKSB7XG4gICAgICB0aGlzLmhhbGZDaGVja2VkTm9kZUxpc3QucHVzaChub2RlKTtcbiAgICB9IGVsc2UgaWYgKCFub2RlLmlzSGFsZkNoZWNrZWQgJiYgaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5oYWxmQ2hlY2tlZE5vZGVMaXN0ID0gdGhpcy5oYWxmQ2hlY2tlZE5vZGVMaXN0LmZpbHRlcihuID0+IG5vZGUua2V5ICE9PSBuLmtleSk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q2hlY2tlZE5vZGVMaXN0KG5vZGU6IE56VHJlZU5vZGUpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFycmF5KHRoaXMuY2hlY2tlZE5vZGVMaXN0LCBub2RlLmtleSk7XG4gICAgaWYgKG5vZGUuaXNDaGVja2VkICYmIGluZGV4ID09PSAtMSkge1xuICAgICAgdGhpcy5jaGVja2VkTm9kZUxpc3QucHVzaChub2RlKTtcbiAgICB9IGVsc2UgaWYgKCFub2RlLmlzQ2hlY2tlZCAmJiBpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmNoZWNrZWROb2RlTGlzdCA9IHRoaXMuY2hlY2tlZE5vZGVMaXN0LmZpbHRlcihuID0+IG5vZGUua2V5ICE9PSBuLmtleSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNvbmR1Y3QgY2hlY2tlZC9zZWxlY3RlZC9leHBhbmRlZCBrZXlzXG4gICAqL1xuICBjb25kdWN0Tm9kZVN0YXRlKHR5cGU6IHN0cmluZyA9ICdjaGVjaycpOiBOelRyZWVOb2RlW10ge1xuICAgIGxldCByZXN1bHROb2Rlc0xpc3Q6IE56VHJlZU5vZGVbXSA9IFtdO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmVzdWx0Tm9kZXNMaXN0ID0gdGhpcy5zZWxlY3RlZE5vZGVMaXN0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2V4cGFuZCc6XG4gICAgICAgIHJlc3VsdE5vZGVzTGlzdCA9IHRoaXMuZXhwYW5kZWROb2RlTGlzdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtYXRjaCc6XG4gICAgICAgIHJlc3VsdE5vZGVzTGlzdCA9IHRoaXMubWF0Y2hlZE5vZGVMaXN0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoZWNrJzpcbiAgICAgICAgcmVzdWx0Tm9kZXNMaXN0ID0gdGhpcy5jaGVja2VkTm9kZUxpc3Q7XG4gICAgICAgIGNvbnN0IGlzSWdub3JlID0gKG5vZGU6IE56VHJlZU5vZGUpOiBib29sZWFuID0+IHtcbiAgICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gbm9kZS5nZXRQYXJlbnROb2RlKCk7XG4gICAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWROb2RlTGlzdC5maW5kSW5kZXgobiA9PiBuLmtleSA9PT0gcGFyZW50Tm9kZS5rZXkpID4gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gaXNJZ25vcmUocGFyZW50Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gbWVyZ2UgY2hlY2tlZFxuICAgICAgICBpZiAoIXRoaXMuaXNDaGVja1N0cmljdGx5KSB7XG4gICAgICAgICAgcmVzdWx0Tm9kZXNMaXN0ID0gdGhpcy5jaGVja2VkTm9kZUxpc3QuZmlsdGVyKG4gPT4gIWlzSWdub3JlKG4pKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2hhbGZDaGVjayc6XG4gICAgICAgIGlmICghdGhpcy5pc0NoZWNrU3RyaWN0bHkpIHtcbiAgICAgICAgICByZXN1bHROb2Rlc0xpc3QgPSB0aGlzLmhhbGZDaGVja2VkTm9kZUxpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHROb2Rlc0xpc3Q7XG4gIH1cblxuICAvKipcbiAgICogc2V0IGV4cGFuZGVkIG5vZGVzXG4gICAqL1xuICBzZXRFeHBhbmRlZE5vZGVMaXN0KG5vZGU6IE56VHJlZU5vZGUpOiB2b2lkIHtcbiAgICBpZiAobm9kZS5pc0xlYWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZBcnJheSh0aGlzLmV4cGFuZGVkTm9kZUxpc3QsIG5vZGUua2V5KTtcbiAgICBpZiAobm9kZS5pc0V4cGFuZGVkICYmIGluZGV4ID09PSAtMSkge1xuICAgICAgdGhpcy5leHBhbmRlZE5vZGVMaXN0LnB1c2gobm9kZSk7XG4gICAgfSBlbHNlIGlmICghbm9kZS5pc0V4cGFuZGVkICYmIGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWROb2RlTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHNldE1hdGNoZWROb2RlTGlzdChub2RlOiBOelRyZWVOb2RlKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZBcnJheSh0aGlzLm1hdGNoZWROb2RlTGlzdCwgbm9kZS5rZXkpO1xuICAgIGlmIChub2RlLmlzTWF0Y2hlZCAmJiBpbmRleCA9PT0gLTEpIHtcbiAgICAgIHRoaXMubWF0Y2hlZE5vZGVMaXN0LnB1c2gobm9kZSk7XG4gICAgfSBlbHNlIGlmICghbm9kZS5pc01hdGNoZWQgJiYgaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5tYXRjaGVkTm9kZUxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgc3RhdGVcbiAgICogQHBhcmFtIGlzQ2hlY2tTdHJpY3RseVxuICAgKi9cbiAgcmVmcmVzaENoZWNrU3RhdGUoaXNDaGVja1N0cmljdGx5OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoaXNDaGVja1N0cmljdGx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2hlY2tlZE5vZGVMaXN0LmZvckVhY2gobm9kZSA9PiB7XG4gICAgICB0aGlzLmNvbmR1Y3Qobm9kZSwgaXNDaGVja1N0cmljdGx5KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlc2V0IG90aGVyIG5vZGUgY2hlY2tlZCBzdGF0ZSBiYXNlZCBjdXJyZW50IG5vZGVcbiAgY29uZHVjdChub2RlOiBOelRyZWVOb2RlLCBpc0NoZWNrU3RyaWN0bHk6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzQ2hlY2tlZCA9IG5vZGUuaXNDaGVja2VkO1xuICAgIGlmIChub2RlICYmICFpc0NoZWNrU3RyaWN0bHkpIHtcbiAgICAgIHRoaXMuY29uZHVjdFVwKG5vZGUpO1xuICAgICAgdGhpcy5jb25kdWN0RG93bihub2RlLCBpc0NoZWNrZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAx44CBY2hpbGRyZW4gaGFsZiBjaGVja2VkXG4gICAqIDLjgIFjaGlsZHJlbiBhbGwgY2hlY2tlZCwgcGFyZW50IGNoZWNrZWRcbiAgICogM+OAgW5vIGNoaWxkcmVuIGNoZWNrZWRcbiAgICovXG4gIGNvbmR1Y3RVcChub2RlOiBOelRyZWVOb2RlKTogdm9pZCB7XG4gICAgY29uc3QgcGFyZW50Tm9kZSA9IG5vZGUuZ2V0UGFyZW50Tm9kZSgpO1xuICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICBpZiAoIWlzQ2hlY2tEaXNhYmxlZChwYXJlbnROb2RlKSkge1xuICAgICAgICBpZiAocGFyZW50Tm9kZS5jaGlsZHJlbi5ldmVyeShjaGlsZCA9PiBpc0NoZWNrRGlzYWJsZWQoY2hpbGQpIHx8ICghY2hpbGQuaXNIYWxmQ2hlY2tlZCAmJiBjaGlsZC5pc0NoZWNrZWQpKSkge1xuICAgICAgICAgIHBhcmVudE5vZGUuaXNDaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICBwYXJlbnROb2RlLmlzSGFsZkNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJlbnROb2RlLmNoaWxkcmVuLnNvbWUoY2hpbGQgPT4gY2hpbGQuaXNIYWxmQ2hlY2tlZCB8fCBjaGlsZC5pc0NoZWNrZWQpKSB7XG4gICAgICAgICAgcGFyZW50Tm9kZS5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICBwYXJlbnROb2RlLmlzSGFsZkNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmVudE5vZGUuaXNDaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgcGFyZW50Tm9kZS5pc0hhbGZDaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0Q2hlY2tlZE5vZGVMaXN0KHBhcmVudE5vZGUpO1xuICAgICAgdGhpcy5zZXRIYWxmQ2hlY2tlZE5vZGVMaXN0KHBhcmVudE5vZGUpO1xuICAgICAgdGhpcy5jb25kdWN0VXAocGFyZW50Tm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlc2V0IGNoaWxkIGNoZWNrIHN0YXRlXG4gICAqL1xuICBjb25kdWN0RG93bihub2RlOiBOelRyZWVOb2RlLCB2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghaXNDaGVja0Rpc2FibGVkKG5vZGUpKSB7XG4gICAgICBub2RlLmlzQ2hlY2tlZCA9IHZhbHVlO1xuICAgICAgbm9kZS5pc0hhbGZDaGVja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnNldENoZWNrZWROb2RlTGlzdChub2RlKTtcbiAgICAgIHRoaXMuc2V0SGFsZkNoZWNrZWROb2RlTGlzdChub2RlKTtcbiAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChuID0+IHtcbiAgICAgICAgdGhpcy5jb25kdWN0RG93bihuLCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZmx1c2ggYWZ0ZXIgZGVsZXRlIG5vZGVcbiAgICovXG4gIGFmdGVyUmVtb3ZlKG5vZGVzOiBOelRyZWVOb2RlW10pOiB2b2lkIHtcbiAgICAvLyB0byByZXNldCBzZWxlY3RlZE5vZGVMaXN0ICYgZXhwYW5kZWROb2RlTGlzdFxuICAgIGNvbnN0IGxvb3BOb2RlID0gKG5vZGU6IE56VHJlZU5vZGUpID0+IHtcbiAgICAgIC8vIHJlbW92ZSBzZWxlY3RlZCBub2RlXG4gICAgICB0aGlzLnNlbGVjdGVkTm9kZUxpc3QgPSB0aGlzLnNlbGVjdGVkTm9kZUxpc3QuZmlsdGVyKG4gPT4gbi5rZXkgIT09IG5vZGUua2V5KTtcbiAgICAgIC8vIHJlbW92ZSBleHBhbmRlZCBub2RlXG4gICAgICB0aGlzLmV4cGFuZGVkTm9kZUxpc3QgPSB0aGlzLmV4cGFuZGVkTm9kZUxpc3QuZmlsdGVyKG4gPT4gbi5rZXkgIT09IG5vZGUua2V5KTtcbiAgICAgIC8vIHJlbW92ZSBjaGVja2VkIG5vZGVcbiAgICAgIHRoaXMuY2hlY2tlZE5vZGVMaXN0ID0gdGhpcy5jaGVja2VkTm9kZUxpc3QuZmlsdGVyKG4gPT4gbi5rZXkgIT09IG5vZGUua2V5KTtcbiAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgbG9vcE5vZGUoY2hpbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICBsb29wTm9kZShuKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlZnJlc2hDaGVja1N0YXRlKHRoaXMuaXNDaGVja1N0cmljdGx5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkcmFnIGV2ZW50XG4gICAqL1xuICByZWZyZXNoRHJhZ05vZGUobm9kZTogTnpUcmVlTm9kZSk6IHZvaWQge1xuICAgIGlmIChub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gdW50aWwgcm9vdFxuICAgICAgdGhpcy5jb25kdWN0VXAobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaERyYWdOb2RlKGNoaWxkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIHJlc2V0IG5vZGUgbGV2ZWxcbiAgcmVzZXROb2RlTGV2ZWwobm9kZTogTnpUcmVlTm9kZSk6IHZvaWQge1xuICAgIGNvbnN0IHBhcmVudE5vZGUgPSBub2RlLmdldFBhcmVudE5vZGUoKTtcbiAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgbm9kZS5sZXZlbCA9IHBhcmVudE5vZGUubGV2ZWwgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlLmxldmVsID0gMDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICB0aGlzLnJlc2V0Tm9kZUxldmVsKGNoaWxkKTtcbiAgICB9XG4gIH1cblxuICBjYWxjRHJvcFBvc2l0aW9uKGV2ZW50OiBEcmFnRXZlbnQpOiBudW1iZXIge1xuICAgIGNvbnN0IHsgY2xpZW50WSB9ID0gZXZlbnQ7XG4gICAgLy8gdG8gZml4IGZpcmVmb3ggdW5kZWZpbmVkXG4gICAgY29uc3QgeyB0b3AsIGJvdHRvbSwgaGVpZ2h0IH0gPSAoZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGRlcyA9IE1hdGgubWF4KGhlaWdodCAqIHRoaXMuRFJBR19TSURFX1JBTkdFLCB0aGlzLkRSQUdfTUlOX0dBUCk7XG5cbiAgICBpZiAoY2xpZW50WSA8PSB0b3AgKyBkZXMpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2UgaWYgKGNsaWVudFkgPj0gYm90dG9tIC0gZGVzKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBkcm9wXG4gICAqIDA6IGlubmVyIC0xOiBwcmUgMTogbmV4dFxuICAgKi9cbiAgZHJvcEFuZEFwcGx5KHRhcmdldE5vZGU6IE56VHJlZU5vZGUsIGRyYWdQb3M6IG51bWJlciA9IC0xKTogdm9pZCB7XG4gICAgaWYgKCF0YXJnZXROb2RlIHx8IGRyYWdQb3MgPiAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRyZWVTZXJ2aWNlID0gdGFyZ2V0Tm9kZS50cmVlU2VydmljZTtcbiAgICBjb25zdCB0YXJnZXRQYXJlbnQgPSB0YXJnZXROb2RlLmdldFBhcmVudE5vZGUoKTtcbiAgICBjb25zdCBpc1NlbGVjdGVkUm9vdE5vZGUgPSB0aGlzLnNlbGVjdGVkTm9kZS5nZXRQYXJlbnROb2RlKCk7XG4gICAgLy8gcmVtb3ZlIHRoZSBkcmFnTm9kZVxuICAgIGlmIChpc1NlbGVjdGVkUm9vdE5vZGUpIHtcbiAgICAgIGlzU2VsZWN0ZWRSb290Tm9kZS5jaGlsZHJlbiA9IGlzU2VsZWN0ZWRSb290Tm9kZS5jaGlsZHJlbi5maWx0ZXIobiA9PiBuLmtleSAhPT0gdGhpcy5zZWxlY3RlZE5vZGUua2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb290Tm9kZXMgPSB0aGlzLnJvb3ROb2Rlcy5maWx0ZXIobiA9PiBuLmtleSAhPT0gdGhpcy5zZWxlY3RlZE5vZGUua2V5KTtcbiAgICB9XG4gICAgc3dpdGNoIChkcmFnUG9zKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHRhcmdldE5vZGUuYWRkQ2hpbGRyZW4oW3RoaXMuc2VsZWN0ZWROb2RlXSk7XG4gICAgICAgIHRoaXMucmVzZXROb2RlTGV2ZWwodGFyZ2V0Tm9kZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAtMTpcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgY29uc3QgdEluZGV4ID0gZHJhZ1BvcyA9PT0gMSA/IDEgOiAwO1xuICAgICAgICBpZiAodGFyZ2V0UGFyZW50KSB7XG4gICAgICAgICAgdGFyZ2V0UGFyZW50LmFkZENoaWxkcmVuKFt0aGlzLnNlbGVjdGVkTm9kZV0sIHRhcmdldFBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRhcmdldE5vZGUpICsgdEluZGV4KTtcbiAgICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5zZWxlY3RlZE5vZGUuZ2V0UGFyZW50Tm9kZSgpO1xuICAgICAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Tm9kZUxldmVsKHBhcmVudE5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB0YXJnZXRJbmRleCA9IHRoaXMucm9vdE5vZGVzLmluZGV4T2YodGFyZ2V0Tm9kZSkgKyB0SW5kZXg7XG4gICAgICAgICAgLy8gSW5zZXJ0IHJvb3Qgbm9kZS5cbiAgICAgICAgICB0aGlzLnJvb3ROb2Rlcy5zcGxpY2UodGFyZ2V0SW5kZXgsIDAsIHRoaXMuc2VsZWN0ZWROb2RlKTtcbiAgICAgICAgICB0aGlzLnJvb3ROb2Rlc1t0YXJnZXRJbmRleF0ucGFyZW50Tm9kZSA9IG51bGw7XG4gICAgICAgICAgdGhpcy5yZXNldE5vZGVMZXZlbCh0aGlzLnJvb3ROb2Rlc1t0YXJnZXRJbmRleF0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBmbHVzaCBhbGwgbm9kZXNcbiAgICB0aGlzLnJvb3ROb2Rlcy5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICghY2hpbGQudHJlZVNlcnZpY2UpIHtcbiAgICAgICAgY2hpbGQuc2VydmljZSA9IHRyZWVTZXJ2aWNlO1xuICAgICAgfVxuICAgICAgdGhpcy5yZWZyZXNoRHJhZ05vZGUoY2hpbGQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGVtaXQgU3RydWN0dXJlXG4gICAqIGV2ZW50TmFtZVxuICAgKiBub2RlXG4gICAqIGV2ZW50OiBNb3VzZUV2ZW50IC8gRHJhZ0V2ZW50XG4gICAqIGRyYWdOb2RlXG4gICAqL1xuICBmb3JtYXRFdmVudChldmVudE5hbWU6IHN0cmluZywgbm9kZTogTnpUcmVlTm9kZSB8IG51bGwsIGV2ZW50OiBNb3VzZUV2ZW50IHwgRHJhZ0V2ZW50IHwgbnVsbCk6IE56Rm9ybWF0RW1pdEV2ZW50IHtcbiAgICBjb25zdCBlbWl0U3RydWN0dXJlOiBOekZvcm1hdEVtaXRFdmVudCA9IHtcbiAgICAgIGV2ZW50TmFtZTogZXZlbnROYW1lLFxuICAgICAgbm9kZTogbm9kZSxcbiAgICAgIGV2ZW50OiBldmVudFxuICAgIH07XG4gICAgc3dpdGNoIChldmVudE5hbWUpIHtcbiAgICAgIGNhc2UgJ2RyYWdzdGFydCc6XG4gICAgICBjYXNlICdkcmFnZW50ZXInOlxuICAgICAgY2FzZSAnZHJhZ292ZXInOlxuICAgICAgY2FzZSAnZHJhZ2xlYXZlJzpcbiAgICAgIGNhc2UgJ2Ryb3AnOlxuICAgICAgY2FzZSAnZHJhZ2VuZCc6XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZW1pdFN0cnVjdHVyZSwgeyBkcmFnTm9kZTogdGhpcy5nZXRTZWxlY3RlZE5vZGUoKSB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjbGljayc6XG4gICAgICBjYXNlICdkYmxjbGljayc6XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZW1pdFN0cnVjdHVyZSwgeyBzZWxlY3RlZEtleXM6IHRoaXMuc2VsZWN0ZWROb2RlTGlzdCB9KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbWl0U3RydWN0dXJlLCB7IG5vZGVzOiB0aGlzLnNlbGVjdGVkTm9kZUxpc3QgfSk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZW1pdFN0cnVjdHVyZSwgeyBrZXlzOiB0aGlzLnNlbGVjdGVkTm9kZUxpc3QubWFwKG4gPT4gbi5rZXkpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoZWNrJzpcbiAgICAgICAgY29uc3QgY2hlY2tlZE5vZGVMaXN0ID0gdGhpcy5nZXRDaGVja2VkTm9kZUxpc3QoKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbWl0U3RydWN0dXJlLCB7IGNoZWNrZWRLZXlzOiBjaGVja2VkTm9kZUxpc3QgfSk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZW1pdFN0cnVjdHVyZSwgeyBub2RlczogY2hlY2tlZE5vZGVMaXN0IH0pO1xuICAgICAgICBPYmplY3QuYXNzaWduKGVtaXRTdHJ1Y3R1cmUsIHsga2V5czogY2hlY2tlZE5vZGVMaXN0Lm1hcChuID0+IG4ua2V5KSB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzZWFyY2gnOlxuICAgICAgICBPYmplY3QuYXNzaWduKGVtaXRTdHJ1Y3R1cmUsIHsgbWF0Y2hlZEtleXM6IHRoaXMuZ2V0TWF0Y2hlZE5vZGVMaXN0KCkgfSk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZW1pdFN0cnVjdHVyZSwgeyBub2RlczogdGhpcy5nZXRNYXRjaGVkTm9kZUxpc3QoKSB9KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbWl0U3RydWN0dXJlLCB7IGtleXM6IHRoaXMuZ2V0TWF0Y2hlZE5vZGVMaXN0KCkubWFwKG4gPT4gbi5rZXkpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2V4cGFuZCc6XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZW1pdFN0cnVjdHVyZSwgeyBub2RlczogdGhpcy5leHBhbmRlZE5vZGVMaXN0IH0pO1xuICAgICAgICBPYmplY3QuYXNzaWduKGVtaXRTdHJ1Y3R1cmUsIHsga2V5czogdGhpcy5leHBhbmRlZE5vZGVMaXN0Lm1hcChuID0+IG4ua2V5KSB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBlbWl0U3RydWN0dXJlO1xuICB9XG5cbiAgLyoqXG4gICAqIE5ldyBmdW5jdGlvbnMgZm9yIGZsYXR0ZW4gbm9kZXNcbiAgICovXG5cbiAgZ2V0SW5kZXhPZkFycmF5KGxpc3Q6IE56VHJlZU5vZGVbXSwga2V5OiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiBsaXN0LmZpbmRJbmRleCh2ID0+IHYua2V5ID09PSBrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBieSBuekNoZWNrZWRLZXlzXG4gICAqIFdoZW4ga2V5cyBlcXVhbHMgbnVsbCwganVzdCByZW5kZXIgd2l0aCBjaGVja1N0cmljdGx5XG4gICAqIEBwYXJhbSBrZXlzXG4gICAqIEBwYXJhbSBjaGVja1N0cmljdGx5XG4gICAqL1xuICBjb25kdWN0Q2hlY2soa2V5czogTnpUcmVlTm9kZUtleVtdIHwgbnVsbCwgY2hlY2tTdHJpY3RseTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZE5vZGVMaXN0ID0gW107XG4gICAgdGhpcy5oYWxmQ2hlY2tlZE5vZGVMaXN0ID0gW107XG4gICAgY29uc3QgY2FsYyA9IChub2RlczogTnpUcmVlTm9kZVtdKSA9PiB7XG4gICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBpZiAoa2V5cyA9PT0gbnVsbCkge1xuICAgICAgICAgIC8vIHJlbmRlciB0cmVlIGlmIG5vIGRlZmF1bHQgY2hlY2tlZCBrZXlzIGZvdW5kXG4gICAgICAgICAgbm9kZS5pc0NoZWNrZWQgPSAhIW5vZGUub3JpZ2luLmNoZWNrZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGlzSW5BcnJheShub2RlLmtleSwga2V5cyB8fCBbXSkpIHtcbiAgICAgICAgICAgIG5vZGUuaXNDaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIG5vZGUuaXNIYWxmQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbm9kZS5pc0hhbGZDaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjYWxjKG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGNhbGModGhpcy5yb290Tm9kZXMpO1xuICAgIHRoaXMucmVmcmVzaENoZWNrU3RhdGUoY2hlY2tTdHJpY3RseSk7XG4gIH1cblxuICBjb25kdWN0RXhwYW5kZWRLZXlzKGtleXM6IE56VHJlZU5vZGVLZXlbXSB8IHRydWUgPSBbXSk6IHZvaWQge1xuICAgIGNvbnN0IGV4cGFuZGVkS2V5U2V0ID0gbmV3IFNldChrZXlzID09PSB0cnVlID8gW10gOiBrZXlzKTtcbiAgICB0aGlzLmV4cGFuZGVkTm9kZUxpc3QgPSBbXTtcbiAgICBjb25zdCBjYWxjID0gKG5vZGVzOiBOelRyZWVOb2RlW10pID0+IHtcbiAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIG5vZGUuc2V0RXhwYW5kZWQoa2V5cyA9PT0gdHJ1ZSB8fCBleHBhbmRlZEtleVNldC5oYXMobm9kZS5rZXkpIHx8IG5vZGUuaXNFeHBhbmRlZCA9PT0gdHJ1ZSk7XG4gICAgICAgIGlmIChub2RlLmlzRXhwYW5kZWQpIHtcbiAgICAgICAgICB0aGlzLnNldEV4cGFuZGVkTm9kZUxpc3Qobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNhbGMobm9kZS5jaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgY2FsYyh0aGlzLnJvb3ROb2Rlcyk7XG4gIH1cblxuICBjb25kdWN0U2VsZWN0ZWRLZXlzKGtleXM6IE56VHJlZU5vZGVLZXlbXSwgaXNNdWx0aTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWROb2RlTGlzdC5mb3JFYWNoKG5vZGUgPT4gKG5vZGUuaXNTZWxlY3RlZCA9IGZhbHNlKSk7XG4gICAgdGhpcy5zZWxlY3RlZE5vZGVMaXN0ID0gW107XG4gICAgY29uc3QgY2FsYyA9IChub2RlczogTnpUcmVlTm9kZVtdKTogYm9vbGVhbiA9PiB7XG4gICAgICByZXR1cm4gbm9kZXMuZXZlcnkobm9kZSA9PiB7XG4gICAgICAgIGlmIChpc0luQXJyYXkobm9kZS5rZXksIGtleXMpKSB7XG4gICAgICAgICAgbm9kZS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkTm9kZUxpc3Qobm9kZSk7XG4gICAgICAgICAgaWYgKCFpc011bHRpKSB7XG4gICAgICAgICAgICAvLyBpZiBub3Qgc3VwcG9ydCBtdWx0aSBzZWxlY3RcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9kZS5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIC8vIFJlY3Vyc2lvblxuICAgICAgICAgIHJldHVybiBjYWxjKG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBjYWxjKHRoaXMucm9vdE5vZGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBhbmQgcGFyZW50IG5vZGVzIGJ5IGNoaWxkIG5vZGVcbiAgICogQHBhcmFtIG5vZGVcbiAgICovXG4gIGV4cGFuZE5vZGVBbGxQYXJlbnRCeVNlYXJjaChub2RlOiBOelRyZWVOb2RlKTogdm9pZCB7XG4gICAgY29uc3QgY2FsYyA9IChuOiBOelRyZWVOb2RlIHwgbnVsbCk6IHZvaWQgPT4ge1xuICAgICAgaWYgKG4pIHtcbiAgICAgICAgbi5jYW5IaWRlID0gZmFsc2U7XG4gICAgICAgIG4uc2V0RXhwYW5kZWQodHJ1ZSk7XG4gICAgICAgIHRoaXMuc2V0RXhwYW5kZWROb2RlTGlzdChuKTtcbiAgICAgICAgaWYgKG4uZ2V0UGFyZW50Tm9kZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGMobi5nZXRQYXJlbnROb2RlKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBjYWxjKG5vZGUuZ2V0UGFyZW50Tm9kZSgpKTtcbiAgfVxufVxuIl19