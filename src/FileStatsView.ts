import * as vscode from 'vscode';
import { FileStatsManager, FileStats } from './FileStatsManager';

export class FileStatsItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly filePath: string,
        public readonly stats: FileStats,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly isCurrentFile: boolean
    ) {
        super(label, collapsibleState);

        // 格式化最后访问时间
        const lastAccess = new Date(stats.lastAccess);
        const formattedTime = lastAccess.toLocaleString();

        this.tooltip = `${filePath}\n打开次数: ${stats.openCount}\n总访问时间: ${Math.round(stats.totalTime)}秒\n最后访问: ${formattedTime}`;
        this.description = `${stats.openCount}次 | ${Math.round(stats.totalTime)}秒 | ${formattedTime}`;

        // 如果是当前文件，设置高亮样式
        if (isCurrentFile) {
            this.iconPath = new vscode.ThemeIcon('file', new vscode.ThemeColor('charts.blue'));
        } else {
            this.iconPath = new vscode.ThemeIcon('file');
        }
    }

    contextValue = 'fileStatsItem';
}

export class FileStatsViewProvider implements vscode.TreeDataProvider<FileStatsItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<FileStatsItem | undefined | null | void> = new vscode.EventEmitter<FileStatsItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<FileStatsItem | undefined | null | void> = this._onDidChangeTreeData.event;

    private sortBy: 'time' | 'count' = 'time';
    private currentFile: string | undefined;

    constructor(private statsManager: FileStatsManager) {
        // 监听文件统计变化
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                this.currentFile = editor.document.uri.fsPath;
                this.refresh();
            }
        });

        // 初始化时立即刷新视图
        this.refresh();
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
                vscode.TreeItemCollapsibleState.None,
                filePath === this.currentFile
            ));
        });

        // 排序
        items.sort((a, b) => {
            if (this.sortBy === 'time') {
                // 按最后访问时间降序排列
                return b.stats.lastAccess - a.stats.lastAccess;
            } else {
                // 按打开次数降序排列
                return b.stats.openCount - a.stats.openCount;
            }
        });

        return items;
    }
}