#!/usr/bin/env python
# -*- coding: utf-8 -*-

from fractions import Fraction

def fromat(f):
    return '{0}/{1}'.format(f.numerator, f.denominator)

def exe(fname):
    with open(fname, 'r') as f:
        for line in f:
            if not line:
                continue
            res = eval(line)
            print res

if __name__ == "__main__":
    from sys import argv
    argc = len(argv)
    if argc < 2:
        print('calc fname')
        exit(1)
    fname = argv[1]
    exe(fname)
