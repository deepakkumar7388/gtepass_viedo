@echo off
title SISTec 4K Video and Audio Merger
echo ==============================================================
echo            SISTec Digital Pass — 4K Lossless Merger
echo ==============================================================
echo.

set "AUDIO=assets\bgm.m4a"
set "OUTPUT=SISTec_Promo_4K_Final.mp4"

:: Search in Downloads first
set "INPUT="
if exist "%USERPROFILE%\Downloads\SISTec_DigitalPass_4K.webm" set "INPUT=%USERPROFILE%\Downloads\SISTec_DigitalPass_4K.webm"
if exist "%USERPROFILE%\Downloads\SISTec_DigitalPass_4K.mp4" set "INPUT=%USERPROFILE%\Downloads\SISTec_DigitalPass_4K.mp4"

:: Check local folder if not found in Downloads
if "%INPUT%"=="" (
    if exist "SISTec_DigitalPass_4K.webm" set "INPUT=SISTec_DigitalPass_4K.webm"
    if exist "SISTec_DigitalPass_4K.mp4" set "INPUT=SISTec_DigitalPass_4K.mp4"
)

if "%INPUT%"=="" (
    echo [ERROR] Could not find the downloaded video file.
    echo Please make sure you have downloaded the video from your browser first.
    echo (We searched in: %USERPROFILE%\Downloads for 'SISTec_DigitalPass_4K')
    echo.
    echo Alternatively, copy your downloaded video into this folder and rename it to 'video.webm', then run this file again.
    pause
    exit /b
)

echo [FOUND] Input Video: %INPUT%
echo [FOUND] Audio Track: %AUDIO%
echo.
echo Merging video and audio losslessly (keeps 100%% of 4K quality)...
echo.

ffmpeg.exe -i "%INPUT%" -i "%AUDIO%" -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 -y "%OUTPUT%"

if %ERRORLEVEL% equ 0 (
    echo.
    echo ==============================================================
    echo   [SUCCESS] Perfect 4K video created successfully!
    echo   Output File: %OUTPUT%
    echo ==============================================================
) else (
    echo.
    echo [ERROR] Something went wrong during the merging process.
)
echo.
pause
