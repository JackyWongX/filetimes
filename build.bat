@echo off
setlocal enabledelayedexpansion

echo ===== FileTimes ��������ű� =====
echo.

:: ��� Node.js �Ƿ�װ
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ����: δ�ҵ� Node.js�����Ȱ�װ Node.js
    exit /b 1
)

:: ��� npm �Ƿ�װ
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ����: δ�ҵ� npm�����Ȱ�װ npm
    exit /b 1
)

:: ��װ����
echo ���ڰ�װ����...
call npm install
if %errorlevel% neq 0 (
    echo ����: ��װ����ʧ��
    exit /b 1
)

:: ����ɵĹ����ļ�
echo ��������ɵĹ����ļ�...
if exist out (
    rmdir /s /q out
)
if exist filetimes-*.vsix (
    del /f /q filetimes-*.vsix
)

:: ������Ҫ��Ŀ¼
echo ���ڴ�����Ҫ��Ŀ¼...
mkdir out 2>nul
mkdir resources 2>nul

:: ���� TypeScript
echo ���ڱ��� TypeScript...
call npm run compile
if %errorlevel% neq 0 (
    echo ����: TypeScript ����ʧ��
    exit /b 1
)

:: ������
echo ���ڴ�����...
call npx vsce package
if %errorlevel% neq 0 (
    echo ����: ������ʧ��
    exit /b 1
)

:: ��ȡ���ɵ� vsix �ļ���
for %%f in (filetimes-*.vsix) do (
    set "vsix_file=%%f"
)

echo.
echo ===== ������� =====
echo �����: !vsix_file!
echo.
echo ������ͨ�����·�ʽ��װ�����
echo 1. �� VSCode �У��� Ctrl+Shift+P
echo 2. ���� "Install from VSIX"
echo 3. ѡ�� !vsix_file!
echo.

endlocal