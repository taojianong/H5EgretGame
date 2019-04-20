echo off
cd /D %~dp0
echo 开始发布debug
call 发布egret_debug版本.bat
cd %~dp0
cd res
java -jar FileVersion.jar ..\..\..\H5EgretGame\bin-release\web\debug\ ..\..\..\发布版本\debug\ resource\default.res.json assets/res/ true
::rem TortoiseProc.exe /command:commit /path:"..\..\version\debug\" /closeonend:0
echo 发布完成
pause



