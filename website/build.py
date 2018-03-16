#!D:\Python\Python36-32
# -*- coding=utf-8 -*-

import os
import shutil

DATA_DIR = "data/"
OUTPUT_DIR = "html/"
TEMPLATE_FILE = "template.html"


def read(filename):
    return open(DATA_DIR + filename, "r", encoding="utf-8").read()


def write(filename, content):
    open(filename, "w", encoding="utf-8").write(content)


def run():
    chapters = os.listdir(DATA_DIR)[0:-2]
    menu = build_menu(chapters)

    template = read(TEMPLATE_FILE)
    template = template.replace("{{menu}}", menu)

    build_index(template)
    build_chapter(chapters, template)


def build_menu(chapters):
    """
    创建目录
    :param chapters:
    :return:
    """
    html = '<a href ="/index.html">首页</a>'
    for chapter in chapters:
        html += "<ul>" + chapter + "<ul>"

        files = os.listdir(DATA_DIR + chapter)
        for filename in files:
            html += '<li><a href="/' + chapter[0:2] + '/' + filename[0:2] + filename[-5:] + '">' + filename[0:-5] + "</a></li>"

        html += "</ul></ul>"

    return html


def build_index(template):
    content = read("index.html")
    write(OUTPUT_DIR + "index.html", build(template, content))


def build_chapter(chapters, template):
    for chapter in chapters:
        print(chapter)
        base = OUTPUT_DIR + chapter[0:2]

        if os.path.exists(base):
            shutil.rmtree(base)
        os.mkdir(base)

        files = os.listdir(DATA_DIR + chapter)
        for filename in files:
            print(base + "/" + filename)
            content = read(chapter + "/" + filename)
            content = "<h1>" + filename[3:-5] + "</h1>\n" + content
            write(base + "/" + filename[0:2] + filename[-5:], build(template, content))


def build(template, content):
    return template.replace("{{content}}", content)


if __name__ == "__main__":
    run()
