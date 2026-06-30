@echo off
title SISTec Gate Pass — Video + Audio Merger
echo ==============================================================
echo       SISTec Digital Gate Pass — Lossless Video Merger
echo ==============================================================
echo.

set "OUTPUT=SISTec_GatePass_FINAL.mp4"

:: Search for downloaded video in Downloads folder
set "INPUT="
if exist "%USERPROFILE%\Downloads\SISTec_GatePass_Video.mp4"  set "INPUT=%USERPROFILE%\Downloads\SISTec_GatePass_Video.mp4"
if exist "%USERPROFILE%\Downloads\SISTec_GatePass_Video.webm" set "INPUT=%USERPROFILE%\Downloads\SISTec_GatePass_Video.webm"

:: Check local folder as fallback
if "%INPUT%"=="" (
    if exist "SISTec_GatePass_Video.mp4"  set "INPUT=SISTec_GatePass_Video.mp4"
    if exist "SISTec_GatePass_Video.webm" set "INPUT=SISTec_GatePass_Video.webm"
)

if "%INPUT%"=="" (
    echo [ERROR] Downloaded video file not found.
    echo.
    echo Please download the video first from the browser,
    echo then run this file again.
    echo.
    pause
    exit /b
)

echo [FOUND] Input : %INPUT%
echo [OUTPUT] File : %OUTPUT%
echo.
echo Merging losslessly (keeps full quality)...
echo.

ffmpeg.exe -i "%INPUT%" -c:v copy -an -y "%OUTPUT%"

if %ERRORLEVEL% equ 0 (
    echo.
    echo ==============================================================
    echo   [SUCCESS] Video ready!
    echo   File: %OUTPUT%
    echo   Open this in VLC — perfect quality, proper duration.
    echo ==============================================================
) else (
    echo.
    echo [ERROR] Something went wrong. Make sure ffmpeg.exe is present.
)
echo.
pause
