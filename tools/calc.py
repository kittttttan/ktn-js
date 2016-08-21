#!/usr/bin/env python
# -*- coding: utf-8 -*-

from fractions import Fraction
import re

def exe(fname):
    reg = re.compile(r'#.*$')
    reg_frac = re.compile(r'(\d+)')
    with open(fname, 'r') as f:
        for line in f:
            line = reg.sub('', line).strip()
            if not line:
                continue
            line = reg_frac.sub(r'Fraction(\1)', line)
#            print(line + ' =')
            res = eval('str({0})'.format(line))
            print(res)

if __name__ == "__main__":
    from sys import argv
    from time import time

    argc = len(argv)
    if argc < 2:
        print('calc fname')
        exit(1)
    fname = argv[1]
    t0 = time()
    exe(fname)
    t1 = (time() - t0) * 1000
    #print('{0} ms'.format(t1))
