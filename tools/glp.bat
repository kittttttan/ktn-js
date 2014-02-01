@echo off

setlocal
cd /d %~dp0

gulp --require coffee-script/register %*