var nav = "";

for (i = 0; i < menus.length; i++) {
    var menu = menus[i];
    nav = nav + "<h2>" +  menu.header + "</h2>";

    for (j = 0; j < menu.chapters.length; j++) {
        var chapter = menu.chapters[j];
        nav = nav + "<ul>" + chapter.name + "<ul>";

        for (k = 0; k < chapter.links.length; k++) {
            var link = chapter.links[k];
            nav = nav + '<li><a href="' + link.url + '">' + link.title + "</a></li>";
        }

        nav = nav + "</ul></ul>"
    }
}

console.log(nav);

$("#menu").append(nav);