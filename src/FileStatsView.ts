import * as vscode from 'vscode';
import { FileStatsManager, FileStats } from './FileStatsManager';

export class FileStatsItem extends vscode.TreeItem {
    constructor(
        public readonly fileLabel: string,
        public readonly filePath: string,
        public readonly stats: FileStats,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly isCurrentFile: boolean
    ) {
        super(fileLabel, collapsibleState);

        // 设置 resourceUri 让 VSCode 显示文件图标
        this.resourceUri = vscode.Uri.file(filePath);

        // 格式化最后访问时间
        const lastAccess = new Date(stats.lastAccess);
        const formattedTime = lastAccess.toLocaleString();

        this.tooltip = `${filePath}\n打开次数: ${stats.openCount}\n总访问时间: ${Math.round(stats.totalTime)}秒\n最后访问: ${formattedTime}`;
        // 修改description，使其更紧凑
        this.description = ` ${stats.openCount}次 | ${Math.round(stats.totalTime)}秒 | ${formattedTime}`;

        // 如果是当前文件，设置高亮样式
        if (isCurrentFile) {
             // 创建 TreeItemLabel 对象，包含 label 和 highlights
             const highligtedLabel: vscode.TreeItemLabel = {
                label: fileLabel,
                // highlight the entire label
                highlights: [[0, fileLabel.length]]
             };
             // 直接设置 color 属性在 TreeItemLabel 对象上
             // 使用类型断言来绕过 linter 错误
             (highligtedLabel as any).color = new vscode.ThemeColor('charts.blue');

             // 将高亮的 label 对象赋值给 this.label
             this.label = highligtedLabel;
        }
    }

    contextValue = 'fileStatsItem';
}

export class FileStatsViewProvider implements vscode.TreeDataProvider<FileStatsItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<FileStatsItem | undefined | null | void> = new vscode.EventEmitter<FileStatsItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<FileStatsItem | undefined | null | void> = this._onDidChangeTreeData.event;

    private sortBy: 'time' | 'count' | 'name' | 'lastAccess' = 'time';
    private currentFile: string | undefined;

    constructor(private statsManager: FileStatsManager) {
        // 监听文件统计变化（活动编辑器变化），触发视图刷新以更新高亮和排序
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                this.currentFile = editor.document.uri.fsPath;
            } else {
                this.currentFile = undefined;
            }
            this.refresh();
        });

         // 监听窗口焦点变化，确保在窗口失去焦点时也保存统计信息并刷新视图
         vscode.window.onDidChangeWindowState(e => {
             if (!e.focused) {
                 // 当窗口失去焦点时，FileStatsManager 会保存统计，但可能不会立即触发视图刷新
                 // 我们在这里手动触发一次视图刷新
                 this.refresh();
             }
         });


        // 初始化时立即刷新视图
        this.refresh();
    }

    public setSortBy(sortBy: 'time' | 'count' | 'name' | 'lastAccess'): void {
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
                fileName, // 使用文件名作为 label
                filePath,
                fileStats,
                vscode.TreeItemCollapsibleState.None,
                filePath === this.currentFile
            ));
        });

        // 排序
        items.sort((a, b) => {
            switch (this.sortBy) {
                case 'time':
                    // 按总访问时间降序排列
                    return b.stats.totalTime - a.stats.totalTime;
                case 'count':
                    // 按打开次数降序排列
                    return b.stats.openCount - a.stats.openCount;
                case 'name':
                    // 按文件名升序排列
                    return a.fileLabel.localeCompare(b.fileLabel);
                case 'lastAccess':
                    // 按最后访问时间降序排列
                    return b.stats.lastAccess - a.stats.lastAccess;
                default:
                    return 0;
            }
        });

        return items;
    }
}