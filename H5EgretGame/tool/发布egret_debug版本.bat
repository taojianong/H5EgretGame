echo off
cd /D %~dp0
cd ..\
egret publish --version debug --runtime html5
echo �������
pause

