@echo off

setlocal
cd /d %~dp0

python calc.py calc.txt>calc_py.txt
node calc.js calc.txt>calc_js.txt

rem fc /a /n /w calc_py.txt calc_js.txt
python diff.py calc_py.txt calc_js.txt
