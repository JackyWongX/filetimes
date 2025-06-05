import * as vscode from 'vscode';
import { FileStatsManager, FileStats } from './FileStatsManager';

export class FileStatsItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly filePath: string,
        public readonly stats: FileStats,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
        this.tooltip = `${filePath}\n打开次数: ${stats.openCount}\n总访问时间: ${Math.round(stats.totalTime)}秒`;
        this.description = `${stats.openCount}次 | ${Math.round(stats.totalTime)}秒`;
    }

    contextValue = 'fileStatsItem';
}

export class FileStatsViewProvider implements vscode.TreeDataProvider<FileStatsItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<FileStatsItem | undefined | null | void> = new vscode.EventEmitter<FileStatsItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<FileStatsItem | undefined | null | void> = this._onDidChangeTreeData.event;

    private sortBy: 'time' | 'count' = 'time';

    constructor(private statsManager: FileStatsManager) {
        // 监听文件统计变化
        vscode.window.onDidChangeActiveTextEditor(() => {
            this.refresh();
        });
    }

    public setSortBy(sortBy: 'time' | 'count'): void {
        this.sortBy = sortBy;
        this.refresh();
    }

    public refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: FileStatsItem): vscode.TreeItem {
        return element;
    }

    getChildren(): FileStatsItem[] {
        const stats = this.statsManager.getAllStats();
        const items: FileStatsItem[] = [];

        stats.forEach((fileStats, filePath) => {
            const fileName = filePath.split(/[\\/]/).pop() || filePath;
            items.push(new FileStatsItem(
                fileName,
                filePath,
                fileStats,
                vscode.TreeItemCollapsibleState.None
            ));
        });

        // 排序
        items.sort((a, b) => {
            if (this.sortBy === 'time') {
                return b.stats.lastAccess - a.stats.lastAccess;
            } else {
                return b.stats.openCount - a.stats.openCount;
            }
        });

        return items;
    }
}