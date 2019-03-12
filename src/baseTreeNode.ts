import * as vscode from 'vscode';

export type IconPath = string | vscode.Uri | { light: string | vscode.Uri; dark: string | vscode.Uri } | vscode.ThemeIcon;

export abstract class BaseTreeNode {
    public readonly label: string;
    public abstract readonly contextValue: string;

    protected constructor(label: string) {
        this.label = label;
    }

    public getTreeItem(): vscode.TreeItem {
        return {
            label: this.label,
            collapsibleState: vscode.TreeItemCollapsibleState.None,
            contextValue: this.contextValue,
            iconPath: this.iconPath
        };
    }

    public async getChildren(element: BaseTreeNode): Promise<BaseTreeNode[]> {
        return [];
    }

    public iconPath?: IconPath;
}