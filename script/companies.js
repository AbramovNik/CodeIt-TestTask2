'use strict'
$(document).ready(function () {
    loadCompanies();
    loadNews();
});

var loadCompanies = function () {
    var url = 'http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList';

    $.ajax({
        method: 'GET',
        url: url,
        beforeSend: function () {
            $('.loader').show();
        },
        success: function (data, textStatus, jqXHR) {
            if (data.status != 'Error') {
                if ($.isArray(data.list) || !data.list.length) {
                    data.list.forEach(function (item) {
                        $('#companies').append('<div class="company" data-name="' + item.name + '">' + item.name + '</div>');
                    });
                    for (var i = 0; i<data.list.length; i++){
                        // console.log(data.list[i])
                        console.log(data.list[i].location.name)
                    }
                    $("#totalCompanies").append('<div class = "total">' + data.list.length + '</div>');
                    $(document).on('click', 'div.company', function () {
                        $(".company").removeClass("active");
                        $(this).addClass("active");
                        var name = $(this).data('name');
                        data.list.forEach(function (item) {
                            if (item.name == name) {
                                $('#partners').empty();
                                item.partners.forEach(function (partner) {
                                    $('#partners').append('<div class="partner" data-name="' + partner.name + '">' + partner.name + "-" + partner.value + "%" + '</div>');
                                });
                            }
                        });

                    });
                } else {
                    console.log('Feed is empty')
                    return;
                }
            } else {
                console.log('Feed Error');
                return;
            }
        },
        complete: function () {
            $('.loader').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(JSON.stringify(jqXHR));
            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });
}

var loadNews = function () {
    var url = 'http://codeit.ai/codeitCandidates/serverFrontendTest/news/getList';
    $.ajax({
        method: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {
            if (data) {
                if (data.status != 'Error') {
                    if ($.isArray(data.list) || !data.list.length) {
                        data.list.forEach(function (item) {
                            var d = new Date(+item.date);
                            var desc = item.description;
                            var n = 100;
                            if (desc.length > n) {
                                desc = desc.substring(n, length - 1) + "...";


                            }
                            var newsDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
                            $('#newsList').append(`<div class="news "><div class = "imgWrap" style = "background-image:url(` + item.img + `)"></div>
                            <a href = "`+ item.link + `">` + item.link + `</a>
                            <div class = "author">Author:&nbsp;` + item.author + `</div>
                            <div class = "date">Date:&nbsp;` + newsDate + `</div>
                            <div class = "desc">`+ desc + `</div>`);

                        });
                    } else {
                        console.log('News Feed is Empty')
                        return;
                    }
                } else {
                    console.log('Feed Error');
                    return;
                }

            } else {
                console.log('Feed is empty')
                return;
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(JSON.stringify(jqXHR));
            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });
}



