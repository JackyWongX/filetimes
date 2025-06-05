@echo off
setlocal enabledelayedexpansion

echo ===== FileTimes 插件构建脚本 =====
echo.

:: 检查 Node.js 是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到 Node.js，请先安装 Node.js
    exit /b 1
)

:: 检查 npm 是否安装
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到 npm，请先安装 npm
    exit /b 1
)

:: 安装依赖
echo 正在安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo 错误: 安装依赖失败
    exit /b 1
)

:: 清理旧的构建文件
echo 正在清理旧的构建文件...
if exist out (
    rmdir /s /q out
)
if exist filetimes-*.vsix (
    del /f /q filetimes-*.vsix
)

:: 创建必要的目录
echo 正在创建必要的目录...
mkdir out 2>nul
mkdir resources 2>nul

:: 编译 TypeScript
echo 正在编译 TypeScript...
call npm run compile
if %errorlevel% neq 0 (
    echo 错误: TypeScript 编译失败
    exit /b 1
)

:: 打包插件
echo 正在打包插件...
call npx vsce package
if %errorlevel% neq 0 (
    echo 错误: 插件打包失败
    exit /b 1
)

:: 获取生成的 vsix 文件名
for %%f in (filetimes-*.vsix) do (
    set "vsix_file=%%f"
)

echo.
echo ===== 构建完成 =====
echo 插件包: !vsix_file!
echo.
echo 您可以通过以下方式安装插件：
echo 1. 在 VSCode 中，按 Ctrl+Shift+P
echo 2. 输入 "Install from VSIX"
echo 3. 选择 !vsix_file!
echo.

endlocal