#!D:\Python\Python36-32
# -*- coding: utf-8 -*-

import os
import sys
import re


def get_file_name(dir, file_extension):
    f_list = os.listdir(dir)

    result_list = []

    for file_name in f_list:
        if os.path.splitext(file_name)[1] == file_extension:
            result_list.append(os.path.join(dir, file_name))
            print(file_name)
    return result_list


def srt2vtt(file_name):
    content = open(file_name, "r", encoding="utf-8").read()
    # 添加WEBVTT行
    content = "WEBVTT\n\n" + content
    # 替换“,”为“.”
    content = re.sub("(\d{2}:\d{2}:\d{2}),(\d{3})", lambda m: m.group(1) + '.' + m.group(2), content)

    output_file = os.path.splitext(file_name)[0] + '.vtt'
    open(output_file, "w", encoding="utf-8").write(content)


if __name__ == '__main__':
    args = sys.argv
    print(args)

    if os.path.isdir(args[1]):
        file_list = get_file_name(args[1], ".srt")
        for file in file_list:
            srt2vtt(file)

    elif os.path.isfile(args[1]):
        srt2vtt(args[1])
    else:
        print("arg[0] should be file name or dir")