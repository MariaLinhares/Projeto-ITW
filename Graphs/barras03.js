
google.charts.load("current", {
    packages: ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var ratData = [
        ['Rating', 'Títulos']
    ]

    var jsonResponse = $.ajax({
        type: "GET",
        url: "http://192.168.160.58/Olympics/api/Statistics/Games_Competitions",
        async: false
    }).responseText;

    var jsonResponse = JSON.parse(jsonResponse)

    jsonResponse.forEach(e => {
        console.log(e);
        var tmp = []
        tmp[0] = e.Name
        tmp[1] = e.Counter
        ratData.push(tmp)
    });

    var data = google.visualization.arrayToDataTable(ratData);





    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1]);

    var options = {
        width: 1300,
        height: 500,
        bar: {
            groupWidth: "75%"
        },
        legend: {
            position: "none"
        },
        backgroundColor: {
            fill: 'transparent'
        },
        colors: ['#212529'],
        hAxis: {
            textStyle: {
                color: '#000'
            }
        },
        vAxis: {
            textStyle: {
                color: '#000'
            }
        }



    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values3"));
    chart.draw(view, options);
}