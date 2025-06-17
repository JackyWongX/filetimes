# FileTimes - VSCode File Activity Tracker

[![Version](https://img.shields.io/vscode-marketplace/v/JackyWong.filetimes.svg)](https://marketplace.visualstudio.com/items?itemName=JackyWong.filetimes)
[![Installs](https://img.shields.io/vscode-marketplace/i/JackyWong.filetimes.svg)](https://marketplace.visualstudio.com/items?itemName=JackyWong.filetimes)
[![Rating](https://img.shields.io/vscode-marketplace/r/JackyWong.filetimes.svg)](https://marketplace.visualstudio.com/items?itemName=JackyWong.filetimes)

A powerful VSCode extension that tracks and displays file access information to help developers analyze their coding patterns and boost productivity. Perfect for understanding which files you work with most and replacing the traditional pinning functionality.

📖 **[中文文档 / Chinese Documentation](README_CN.md)**

![Plugin Preview](https://github.com/JackyWongX/filetimes/raw/main/images/show.png)

## ✨ Features

### 📊 File Activity Tracking
- **Open Count Tracking**: Monitors how many times each file has been opened
- **Time Tracking**: Records viewing and editing time for each file
- **Focus-Based Timing**: Only tracks time when the file is actively focused
- **Smart Filtering**: Excludes temporary and partially opened files from statistics

### 📋 File List Display
- **Explorer Integration**: Seamlessly integrates with VSCode's Explorer panel
- **Comprehensive Information**: Displays detailed file statistics including:
  - File name and full path
  - Total access time
  - Open count
  - Last access timestamp
- **Active File Highlighting**: Highlights the currently focused file in the list

### 🔧 Interactive Features
- **Quick File Access**: Click any item to instantly open/jump to the corresponding file
- **Flexible Sorting Options**: Multiple sorting methods available via dropdown menu:
  - 📊 Sort by Total Time (default)
  - 🔢 Sort by Open Count
  - 📝 Sort by File Name
  - 📅 Sort by Last Access Time
- **File Management**:
  - Remove individual files from tracking
  - Clear all tracked files at once
  - Context menu for quick actions

### 🎨 User Interface
- **Modern Design**: Clean and intuitive interface that matches VSCode's theme
- **Responsive Layout**: Adapts to different panel sizes
- **Icon Support**: Uses VSCode's built-in icons for consistent visual experience
- **Dropdown Menu**: Convenient sorting options accessible via hamburger menu button

## 📦 Installation

### From VSCode Marketplace
1. Open VSCode
2. Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for "FileTimes"
4. Click "Install"
5. Restart VSCode (if required)

### Manual Installation
1. Download the `.vsix` file from the [releases page](https://github.com/JackyWongX/filetimes/releases)
2. Open VSCode
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type "Extensions: Install from VSIX"
5. Select the downloaded `.vsix` file

## 🚀 Usage

### Getting Started
1. After installation, the FileTimes panel will appear in the Explorer sidebar
2. Open any file to start tracking - the extension automatically begins monitoring your activity
3. View your file statistics in the FileTimes panel

### Sorting Options
- Click the hamburger menu (☰) button in the FileTimes panel header
- Choose from multiple sorting options:
  - **Total Time**: Files with the most accumulated active time
  - **Open Count**: Most frequently opened files
  - **File Name**: Alphabetical sorting
  - **Last Access**: Recently accessed files first

### File Management
- **Open Files**: Click any file in the list to open it immediately
- **Remove Files**: Right-click on a file to remove it from tracking
- **Clear All**: Use the context menu to clear all tracked files

## 💾 Data Storage

### Storage Location
File statistics are automatically saved in your VSCode global storage directory:
- **Windows**: `%APPDATA%\Code\User\globalStorage\JackyWong.filetimes\`
- **macOS**: `~/Library/Application Support/Code/User/globalStorage/JackyWong.filetimes/`
- **Linux**: `~/.config/Code/User/globalStorage/JackyWong.filetimes/`

### Data Format
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

## ⚙️ Configuration

The extension works out of the box with sensible defaults. Currently, all configuration is handled automatically:

- **Auto-Start**: Begins tracking immediately when VSCode starts
- **Smart Detection**: Only tracks files that are actively being worked on
- **Background Operation**: Runs efficiently without impacting VSCode performance

## 🔧 Commands

| Command | Description | Keyboard Shortcut |
|---------|-------------|-------------------|
| `FileTimes: Sort by Total Time` | Sort files by accumulated active time | - |
| `FileTimes: Sort by Open Count` | Sort files by how often they're opened | - |
| `FileTimes: Sort by File Name` | Sort files alphabetically | - |
| `FileTimes: Sort by Last Access` | Sort files by most recent access | - |
| `FileTimes: Remove File` | Remove selected file from tracking | - |
| `FileTimes: Remove All Files` | Clear all tracked files | - |

## 🐛 Troubleshooting

### Common Issues

**Files not being tracked?**
- Ensure the files are saved (temporary files are filtered out)
- Check that you're actively editing/viewing the files (not just opening them briefly)

**Statistics seem incorrect?**
- The extension only tracks time when files are in focus
- Time tracking pauses when you switch to other applications

**Panel not showing?**
- Look for "FileTimes" in the Explorer sidebar
- Try restarting VSCode if the panel doesn't appear after installation

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Setup
```bash
# Clone the repository
git clone https://github.com/JackyWongX/filetimes.git

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes
npm run watch
```

## 📝 Changelog

### Version 1.0.3
- ✨ Added dropdown menu for sorting options
- 🎨 Improved UI with hamburger menu button
- 🔧 Enhanced submenu functionality
- 🐛 Fixed menu positioning issues

### Version 1.0.2
- 🔧 Improved file tracking accuracy
- 📊 Enhanced sorting capabilities
- 🎨 UI improvements and icon additions

### Version 1.0.1
- 🐛 Bug fixes and performance improvements
- 📚 Documentation updates

### Version 1.0.0
- 🎉 Initial release
- 📊 Basic file activity tracking
- 🔄 Sorting by time and count
- 🗑️ File removal functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/JackyWongX/filetimes)
- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=JackyWong.filetimes)
- [Issue Tracker](https://github.com/JackyWongX/filetimes/issues)
- [中文文档](README_CN.md)

## 🙏 Acknowledgments

- Built with [VSCode Extension API](https://code.visualstudio.com/api)
- Icons provided by [VSCode Codicons](https://microsoft.github.io/vscode-codicons/)
- Inspired by the need for better file management in development workflows

---

**Made with ❤️ for the VSCode community**
