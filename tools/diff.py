#!/usr/bin/env python
# -*- coding: utf-8 -*-

import difflib

def exe(f1, f2):
    l1, l2 = [], []
    with open(f1, 'r') as f:
        for line in f:
            if not line:
                continue
            l1.append(line)
    with open(f2, 'r') as f:
        for line in f:
            if not line:
                continue
            l2.append(line)
    for buf in difflib.context_diff(l1, l2, n=0, lineterm='', fromfile=f1, tofile=f2):
	  print buf

if __name__ == "__main__":
    from sys import argv
    argc = len(argv)
    if argc < 2:
        print('diff fname1 fname2')
        exit(1)
    f1, f2 = argv[1], argv[2]
    exe(f1, f2)
