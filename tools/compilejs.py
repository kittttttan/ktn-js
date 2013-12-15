#!/usr/bin/env python
# -*- coding: utf-8 -*-

import subprocess
from os import listdir, path, sep, chdir

comp_path = "D:\\Documents\\js\\compiler-latest\\compiler.jar"
cur_dir = path.abspath(path.dirname(__file__))
root_dir = path.abspath(path.join(cur_dir, '..'))

def compile_js(fname):
    cmd = (
        "java -jar %(comp_path)s --language_in=ECMASCRIPT5_STRICT"
        " --source_map_format=V3"
        " --create_source_map %(fname)s.map"
        " --js %(fname)s.js --js_output_file %(fname)s.min.js"
        % {
            'comp_path': comp_path,
            'fname': fname
        })
    print(cmd)
    subprocess.check_call(cmd)

    with open(fname + '.min.js', 'a') as f:
        f.write("//# sourceMappingURL=%s.map" % fname)

def main():
    exe(root_dir, 'js')
    chdir(cur_dir)

def exe(curr, src_dir):
    src_long_dir = path.join(curr, src_dir)
    chdir(src_long_dir)

    for f in listdir(src_long_dir):
        src = path.join(src_long_dir, f)
        if path.isdir(src):
            continue

        fn, ext = path.basename(src).split('.', 1)
        if ext != 'js':
            #print('skip %s' % src)
            continue

        dest = fn + '.min.js'
        if path.isfile(dest):
            dest_time = path.getmtime(dest)
        else:
            dest_time = 0

        src_time = path.getmtime(src)
        if src_time > dest_time:
            compile_js(fn)
        #else:
        #    print('not updated %s' % src)

if __name__ == "__main__":
	main()
