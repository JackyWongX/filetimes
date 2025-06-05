# VSCode FileTimes 插件

这是一个用于统计和展示文件访问信息的 VSCode 插件。它可以帮助开发者追踪和分析工作区中文件的访问模式和编辑时间。还可以用来替代文档固定功能。

![插件预览](https://github.com/JackyWongX/filetimes/raw/main/images/show.png)

## 功能特性

### 1. 文件访问统计
- 统计每个文件的打开次数
- 记录文件的查看和编辑时间
- 仅统计当前焦点文档的时间
- 支持临时打开和未完全打开的文件过滤

### 2. 文件列表展示
- 在资源管理器中集成显示窗口
- 显示文件详细信息：
  - 文件名
  - 完整路径
  - 访问时间
  - 打开次数
- 高亮显示当前焦点文档

### 3. 交互功能
- 点击列表项自动打开/跳转到对应文档
- 按访问时间排序（默认）
- 按打开次数排序
- 移除选中文件

## 安装说明

1. 在 VSCode 扩展市场中搜索 "FileTimes"
2. 点击安装按钮
3. 重启 VSCode

## 使用方法

1. 安装插件后，在 VSCode 的资源管理器面板中会出现新的文件统计视图
2. 默认情况下，文件列表按访问时间排序
3. 使用右键菜单可以切换排序方式
4. 点击列表中的文件可以直接打开
5. 按住 Ctrl 键可以选择多个文件进行批量操作

## 数据存储

- 统计数据保存在工作区的 `.vscode/file-stats.json` 文件中
- 数据格式：
```json
{
  "files": {
    "文件路径": {
      "openCount": 打开次数,
      "totalTime": 总访问时间(秒),
      "lastAccess": 最后访问时间戳
    }
  }
}
```

## 更新日志

### 1.0.0
- 初始版本发布
- 实现基本的文件访问统计功能
- 支持按时间和次数排序
- 支持文件移除功能

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 问题反馈

如果您在使用过程中遇到任何问题，或者有新的功能建议，请通过以下方式反馈：

1. 在 GitHub 仓库中提交 Issue
2. 在 VSCode 扩展市场中提交评论

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 技术栈

- TypeScript
- VSCode Extension API
- Node.js
