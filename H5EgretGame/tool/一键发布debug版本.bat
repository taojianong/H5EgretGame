echo off
cd /D %~dp0
echo ��ʼ����debug
call ����egret_debug�汾.bat
cd %~dp0
cd res
java -jar FileVersion.jar ..\..\..\H5EgretGame\bin-release\web\debug\ ..\..\..\�����汾\debug\ resource\default.res.json assets/res/ true
::rem TortoiseProc.exe /command:commit /path:"..\..\version\debug\" /closeonend:0
echo �������
pause



