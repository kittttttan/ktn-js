@echo off
rem jsdoc
rem https://github.com/jsdoc3/jsdoc

setlocal
cd /d %~dp0
rem set JSDOC=D:\Documents\js\jsdoc\jsdoc.cmd
set JSDOC=jsdoc

%JSDOC% -R README.md -r ../es6 -d ../doc
