# FileTimes - VSCode 文件活动追踪器

[![Version](https://img.shields.io/vscode-marketplace/v/JackyWong.filetimes.svg)](https://marketplace.visualstudio.com/items?itemName=JackyWong.filetimes)
[![Installs](https://img.shields.io/vscode-marketplace/i/JackyWong.filetimes.svg)](https://marketplace.visualstudio.com/items?itemName=JackyWong.filetimes)
[![Rating](https://img.shields.io/vscode-marketplace/r/JackyWong.filetimes.svg)](https://marketplace.visualstudio.com/items?itemName=JackyWong.filetimes)

一个强大的 VSCode 扩展，用于追踪和显示文件访问信息，帮助开发者分析编程模式并提高工作效率。非常适合了解您最常使用的文件，并替代传统的文档固定功能。

📖 **[English Documentation / 英文文档](README.md)**

![插件预览](https://github.com/JackyWongX/filetimes/raw/main/images/show.png)

## ✨ 功能特性

### 📊 文件活动追踪
- **打开次数统计**：监控每个文件被打开的次数
- **时间追踪**：记录每个文件的查看和编辑时间
- **基于焦点的计时**：仅在文件处于活动焦点时计算时间
- **智能过滤**：排除临时文件和部分打开的文件

### 📋 文件列表显示
- **资源管理器集成**：与 VSCode 的资源管理器面板无缝集成
- **全面信息展示**：显示详细的文件统计信息，包括：
  - 文件名和完整路径
  - 总访问时间
  - 打开次数
  - 最后访问时间戳
- **活动文件高亮**：在列表中高亮显示当前焦点文件

### 🔧 交互功能
- **快速文件访问**：点击任意项目即可立即打开/跳转到对应文件
- **灵活排序选项**：通过下拉菜单提供多种排序方式：
  - 📊 按总时间排序（默认）
  - 🔢 按打开次数排序
  - 📝 按文件名排序
  - 📅 按最后访问时间排序
- **文件管理**：
  - 从追踪中移除单个文件
  - 一次性清除所有追踪文件
  - 快速操作的右键菜单

### 🎨 用户界面
- **现代设计**：简洁直观的界面，与 VSCode 主题匹配
- **响应式布局**：适应不同的面板大小
- **图标支持**：使用 VSCode 内置图标以保持视觉一致性
- **下拉菜单**：通过汉堡菜单按钮便捷访问排序选项

## 📦 安装方法

### 从 VSCode 扩展市场安装
1. 打开 VSCode
2. 前往扩展面板（`Ctrl+Shift+X` 或 `Cmd+Shift+X`）
3. 搜索 "FileTimes"
4. 点击"安装"
5. 重启 VSCode（如有需要）

### 手动安装
1. 从 [发布页面](https://github.com/JackyWongX/filetimes/releases) 下载 `.vsix` 文件
2. 打开 VSCode
3. 按 `Ctrl+Shift+P`（Mac 上为 `Cmd+Shift+P`）
4. 输入 "Extensions: Install from VSIX"
5. 选择下载的 `.vsix` 文件

## 🚀 使用方法

### 开始使用
1. 安装后，FileTimes 面板将出现在资源管理器侧边栏中
2. 打开任何文件即可开始追踪 - 扩展会自动开始监控您的活动
3. 在 FileTimes 面板中查看您的文件统计信息

### 排序选项
- 点击 FileTimes 面板标题中的汉堡菜单（☰）按钮
- 从多种排序选项中选择：
  - **总时间**：累计活动时间最多的文件
  - **打开次数**：最常打开的文件
  - **文件名**：按字母顺序排序
  - **最后访问**：最近访问的文件优先

### 文件管理
- **打开文件**：点击列表中的任何文件立即打开
- **移除文件**：右键点击文件以从追踪中移除
- **清除全部**：使用右键菜单清除所有追踪文件

## 💾 数据存储

### 存储位置
文件统计信息自动保存在您的 VSCode 全局存储目录中：
- **Windows**: `%APPDATA%\Code\User\globalStorage\JackyWong.filetimes\`
- **macOS**: `~/Library/Application Support/Code/User/globalStorage/JackyWong.filetimes/`
- **Linux**: `~/.config/Code/User/globalStorage/JackyWong.filetimes/`

### 数据格式
```json
{
  "files": {
    "/path/to/file.js": {
      "openCount": 15,
      "totalTime": 3600,
      "lastAccess": 1638360000000
    }
  }
}
```

## ⚙️ 配置

扩展开箱即用，具有合理的默认设置。目前，所有配置都是自动处理的：

- **自动启动**：VSCode 启动时立即开始追踪
- **智能检测**：仅追踪正在积极使用的文件
- **后台运行**：高效运行，不影响 VSCode 性能

## 🔧 命令

| 命令 | 描述 | 快捷键 |
|------|------|--------|
| `FileTimes: 按总时间排序` | 按累计活动时间排序文件 | - |
| `FileTimes: 按打开次数排序` | 按打开频率排序文件 | - |
| `FileTimes: 按文件名排序` | 按字母顺序排序文件 | - |
| `FileTimes: 按最后访问时间排序` | 按最近访问时间排序文件 | - |
| `FileTimes: 移除文件` | 从追踪中移除选定文件 | - |
| `FileTimes: 移除所有文件` | 清除所有追踪文件 | - |

## 🐛 故障排除

### 常见问题

**文件没有被追踪？**
- 确保文件已保存（临时文件会被过滤掉）
- 检查您是否在积极编辑/查看文件（不仅仅是短暂打开）

**统计信息看起来不正确？**
- 扩展仅在文件处于焦点时追踪时间
- 当您切换到其他应用程序时，时间追踪会暂停

**面板没有显示？**
- 在资源管理器侧边栏中查找 "FileTimes"
- 如果安装后面板没有出现，请尝试重启 VSCode

## 🤝 贡献

我们欢迎贡献！以下是您可以帮助的方式：

1. **Fork** 仓库
2. **创建** 您的功能分支（`git checkout -b feature/AmazingFeature`）
3. **提交** 您的更改（`git commit -m 'Add some AmazingFeature'`）
4. **推送** 到分支（`git push origin feature/AmazingFeature`）
5. **打开** Pull Request

### 开发环境设置
```bash
# 克隆仓库
git clone https://github.com/JackyWongX/filetimes.git

# 安装依赖
npm install

# 编译 TypeScript
npm run compile

# 监听更改
npm run watch
```

## 📝 更新日志

### 版本 1.0.3
- ✨ 添加排序选项下拉菜单
- 🎨 改进带汉堡菜单按钮的用户界面
- 🔧 增强子菜单功能
- 🐛 修复菜单定位问题

### 版本 1.0.2
- 🔧 改进文件追踪准确性
- 📊 增强排序功能
- 🎨 界面改进和图标添加

### 版本 1.0.1
- 🐛 错误修复和性能改进
- 📚 文档更新

### 版本 1.0.0
- 🎉 初始发布
- 📊 基本文件活动追踪
- 🔄 按时间和次数排序
- 🗑️ 文件移除功能

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 链接

- [GitHub 仓库](https://github.com/JackyWongX/filetimes)
- [VSCode 扩展市场](https://marketplace.visualstudio.com/items?itemName=JackyWong.filetimes)
- [问题追踪](https://github.com/JackyWongX/filetimes/issues)
- [English Documentation](README.md)

## 🙏 致谢

- 使用 [VSCode Extension API](https://code.visualstudio.com/api) 构建
- 图标由 [VSCode Codicons](https://microsoft.github.io/vscode-codicons/) 提供
- 受开发工作流程中更好文件管理需求的启发

---

**为 VSCode 社区用 ❤️ 制作**
