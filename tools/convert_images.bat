@echo off
setlocal enabledelayedexpansion

:: 添加依赖检查
python -c "from PIL import Image" 2>NUL
if errorlevel 1 (
    echo Installing required Python package: Pillow
    pip install Pillow
    if errorlevel 1 (
        echo Failed to install Pillow. Please check your Python installation.
        pause
        exit /b 1
    )
)

:menu
cls
echo WebP Image Converter
echo ==================
echo.
echo 1. Convert Illustrations (Default Directory)
echo 2. Convert Custom Directory
echo 3. Exit
echo.
set /p choice=Choose operation (1-3): 

if "%choice%"=="1" (
    if not exist "assets\illustrations" mkdir "assets\illustrations"
    
    echo.
    echo Please put illustrations in: assets\illustrations
    echo File names should match character ID or card ID
    echo.
    echo Converted files will be copied to public directory
    echo.
    pause
    
    python tools/convert_to_webp.py
    echo.
    pause
    goto menu
)

if "%choice%"=="2" (
    echo.
    set /p source_dir=Enter source image directory path: 
    
    if not exist "!source_dir!" (
        echo Error: Directory does not exist
        pause
        goto menu
    )
    
    python tools/convert_to_webp.py "!source_dir!"
    echo.
    pause
    goto menu
)

if "%choice%"=="3" (
    exit /b
)

echo Invalid choice, please try again
pause
goto menu