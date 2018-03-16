   $(document).ready(function () {

        var url = 'https://openapi.youdao.com/api';
        var p = $('p');

        $("#content-box").html(function (index, oldHtml) {
            //return oldHtml.replace(/\b([a-zA-Z]+?)(?!\>)\b/gi, '<span class="word">$1</span>')
            return oldHtml.replace(/\b([a-zA-Z]+?)(?!\>)\b/gi, '<span class="word">$1</span>')
        });

        $(".word").on("click", function (event) {
            var word = $(this);
            var tip = $(".tip");
            var q = word.text();

            console.log(q);
            if (q.length <= 0) {
                return;
            }
            var l = event.clientX;
            var t = event.clientY;
            var browserWidth = document.body.clientWidth;
            console.log(browserWidth);

            var salt = parseInt(Math.random() * 1000000);
            var appKey = "269fd062f9cd4097";
            var secretKey = "RYDEHrC7jjxbfjwTyQ5oeVkgKvC5rRzG";
            var sign = md5(appKey + q + salt + secretKey);

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'jsonp',
                data: {
                    q: q,
                    appKey: appKey,
                    salt: salt,
                    from: "en",
                    to: "zh-CHS",
                    sign: sign
                },
                success: function (result) {
                    //console.log(result);

                    var content = phonetic = '';
                    if (result.basic !== undefined) {
                        var explains = result.basic.explains;
                        var phonetic = getPhonetic(result.basic);
                        for (var i = 0; i < explains.length; i++) {
                            var line = explains[i].replace(/^(\w+\.)/g, '<span class="prefix">$1</span>');
                            content += (i + 1) + ". </span>" + line + "<br />";
                        }
                    } else if (result.translation !== undefined) {
                        for (var i = 0; i < result.translation.length; i++) {
                            content += (i + 1) + ". " + result.translation[i] + "<br />";
                        }
                    }

                    var title = '<span class="origin">' + q + '</span> ';
                    if (phonetic) {
                        title += '<span class="phonetic">[' + phonetic + "]</span><br />";
                    } else {
                        title += "<br />";
                    }

                    content = title + '<div class="content">' + content + '</div>';

                    word.css({"background": "#ccc"});

                    var tipWidth = tip.outerWidth();

                    var leftPos = 0;
                    if (browserWidth - l > tipWidth) {
                        leftPos = l + 10;
                        console.log("right: " + leftPos);
                    } else {
                        leftPos = l - tipWidth;
                        console.log("left:" + leftPos);
                    }
                    tip.html(content).css({"top": t + 10, "left": leftPos}).fadeIn();


                    //点击文档任何位置，让显示的层消失
                    $(document).on("click", function () {
                        tip.fadeOut();
                        word.css({"background": ""});
                    });

                    $(window).resize(function () {
                        tip.fadeOut();
                        word.css({"background": ""});
                    });

                    //阻止冒泡，防止第一次选中文字时，由于冒泡，而触发了$(document).click事件
                    tip.on("click", function (event) {
                        event.stopPropagation();
                    });
                }
            });
        });

        function getPhonetic(basic) {
            var phonetic = [
                basic['phonetic'],
                basic["uk-phonetic"],
                basic["uk-phonetic"]
            ];

            // 去除空值
            phonetic.filter(function (n) {
                return n;
            });

            return phonetic ? phonetic[0] : '';
        }
    });