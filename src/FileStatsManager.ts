import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface FileStats {
    openCount: number;
    totalTime: number; // 单位：秒
    lastAccess: number;
}

export class FileStatsManager {
    private stats: Map<string, FileStats> = new Map();
    private currentFile: string | undefined;
    private currentFileStartTime: number = 0;
    private storagePath: string;

    constructor(context: vscode.ExtensionContext) {
        this.storagePath = path.join(context.globalStorageUri.fsPath, 'file-stats.json');
        this.loadStats();
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // 监听文件打开事件
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                const filePath = editor.document.uri.fsPath;
                this.recordFileOpen(filePath);
            }
        });

        // 监听窗口失去焦点事件
        vscode.window.onDidChangeWindowState(e => {
            if (!e.focused && this.currentFile) {
                this.recordFileAccess(this.currentFile);
                this.currentFile = undefined;
            }
        });
    }

    private loadStats(): void {
        try {
            if (fs.existsSync(this.storagePath)) {
                const data = JSON.parse(fs.readFileSync(this.storagePath, 'utf8'));
                this.stats = new Map(Object.entries(data));
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    }

    private saveStats(): void {
        try {
            const data = Object.fromEntries(this.stats);
            fs.writeFileSync(this.storagePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Failed to save stats:', error);
        }
    }

    public recordFileOpen(filePath: string): void {
        const stats = this.stats.get(filePath) || { openCount: 0, totalTime: 0, lastAccess: 0 };
        stats.openCount++;
        stats.lastAccess = Date.now();
        this.stats.set(filePath, stats);
        this.currentFile = filePath;
        this.currentFileStartTime = Date.now();
        this.saveStats();
    }

    public recordFileAccess(filePath: string): void {
        if (this.currentFile === filePath) {
            const stats = this.stats.get(filePath);
            if (stats) {
                const duration = (Date.now() - this.currentFileStartTime) / 1000; // 转换为秒
                stats.totalTime += duration;
                stats.lastAccess = Date.now();
                this.stats.set(filePath, stats);
                this.saveStats();
            }
        }
    }

    public getFileStats(filePath: string): FileStats | undefined {
        return this.stats.get(filePath);
    }

    public getAllStats(): Map<string, FileStats> {
        return this.stats;
    }

    public removeFile(filePath: string): void {
        this.stats.delete(filePath);
        this.saveStats();
    }

    public removeAllFiles(): void {
        this.stats.clear();
        this.saveStats();
    }
}