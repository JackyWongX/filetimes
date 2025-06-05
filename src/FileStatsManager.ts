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
    private storageDir: string;
    private updateInterval: NodeJS.Timeout | undefined;

    constructor(context: vscode.ExtensionContext) {
        this.storageDir = context.globalStorageUri.fsPath;
        this.storagePath = path.join(this.storageDir, 'file-stats.json');
        this.ensureStorageDir();
        this.loadStats();
        this.setupEventListeners();
    }

    private ensureStorageDir(): void {
        try {
            if (!fs.existsSync(this.storageDir)) {
                fs.mkdirSync(this.storageDir, { recursive: true });
            }
        } catch (error) {
            console.error('Failed to create storage directory:', error);
        }
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
                this.clearUpdateInterval();
            }
        });

        // 监听编辑器内容变化事件
        vscode.workspace.onDidChangeTextDocument(e => {
            if (this.currentFile === e.document.uri.fsPath) {
                this.recordFileAccess(this.currentFile);
            }
        });
    }

    private startUpdateInterval(): void {
        this.clearUpdateInterval();
        this.updateInterval = setInterval(() => {
            if (this.currentFile) {
                this.recordFileAccess(this.currentFile);
            }
        }, 1000); // 每秒更新一次
    }

    private clearUpdateInterval(): void {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = undefined;
        }
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
            this.ensureStorageDir();
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
        this.startUpdateInterval();
    }

    public recordFileAccess(filePath: string): void {
        if (this.currentFile === filePath) {
            const stats = this.stats.get(filePath);
            if (stats) {
                const duration = (Date.now() - this.currentFileStartTime) / 1000; // 转换为秒
                stats.totalTime += duration;
                stats.lastAccess = Date.now();
                this.stats.set(filePath, stats);
                this.currentFileStartTime = Date.now();
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

    public dispose(): void {
        this.clearUpdateInterval();
    }
}