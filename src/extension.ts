import * as vscode from 'vscode';
import { FileStatsManager } from './FileStatsManager';
import { FileStatsViewProvider, FileStatsItem } from './FileStatsView';

export function activate(context: vscode.ExtensionContext) {
    // 创建文件统计管理器
    const statsManager = new FileStatsManager(context);

    // 创建视图提供者
    const viewProvider = new FileStatsViewProvider(statsManager);
    const view = vscode.window.createTreeView('filetimes-view', {
        treeDataProvider: viewProvider,
        showCollapseAll: false
    });

    // 从全局状态恢复排序方式
    const savedSortBy = context.globalState.get<string>('filetimes.sortBy') || 'time';
    viewProvider.setSortBy(savedSortBy as any);

    // 注册命令
    context.subscriptions.push(
        vscode.commands.registerCommand('filetimes.showSortOptions', () => {
            vscode.window.showQuickPick([
                { label: '$(watch) 按总时间排序', description: '按文件总访问时间排序', command: 'filetimes.sortByTime' },
                { label: '$(list-ordered) 按打开次数排序', description: '按文件打开次数排序', command: 'filetimes.sortByCount' },
                { label: '$(file-text) 按文件名排序', description: '按文件名排序', command: 'filetimes.sortByName' },
                { label: '$(calendar) 按最后访问时间排序', description: '按最后访问时间排序', command: 'filetimes.sortByLastAccess' }
            ]).then(selection => {
                if (selection) {
                    vscode.commands.executeCommand(selection.command);
                }
            });
        }),
        vscode.commands.registerCommand('filetimes.sortByTime', () => {
            viewProvider.setSortBy('time');
            context.globalState.update('filetimes.sortBy', 'time');
        }),
        vscode.commands.registerCommand('filetimes.sortByCount', () => {
            viewProvider.setSortBy('count');
            context.globalState.update('filetimes.sortBy', 'count');
        }),
        vscode.commands.registerCommand('filetimes.sortByName', () => {
            viewProvider.setSortBy('name');
            context.globalState.update('filetimes.sortBy', 'name');
        }),
        vscode.commands.registerCommand('filetimes.sortByLastAccess', () => {
            viewProvider.setSortBy('lastAccess');
            context.globalState.update('filetimes.sortBy', 'lastAccess');
        }),
        vscode.commands.registerCommand('filetimes.removeFile', (item: FileStatsItem) => {
            statsManager.removeFile(item.filePath);
            viewProvider.refresh();
        }),
        vscode.commands.registerCommand('filetimes.removeAllFiles', () => {
            statsManager.removeAllFiles();
            viewProvider.refresh();
        })
    );

    // 注册视图选择事件
    view.onDidChangeSelection(e => {
        if (e.selection.length > 0) {
            const item = e.selection[0];
            vscode.workspace.openTextDocument(item.filePath).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        }
    });
}

export function deactivate() {}