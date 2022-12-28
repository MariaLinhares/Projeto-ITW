$('document').ready(function () {
    const carousel = new bootstrap.Carousel('#myCarousel', {
        interval: 10000
    });


    const api_url = "http://192.168.160.58/Olympics/Help"

    $("#searchbar").autocomplete({
        minLenght: 3,
        source: function (request, response) {
            $.ajax({
                type: "GET",
                url: api_url,
                data: {
                    name: $('#searchbar').val().toLowerCase()
                },
    });
});