$('document').ready(function () {
    const carousel = new bootstrap.Carousel('#myCarousel', {
        interval: 10000
    });



    $(document).ready(function () {
        $("#searchbar").autocomplete({
            minLength: 2,
            source: function (request, response) {
                $.ajax({
                    type: "GET",                        
                    url: "http://192.168.160.58/Olympics/api/Utils/Search?q=" + q,
                    data: {
                        name: $('#searchbar').val(),
                        page:'1',
                        pagesize:'7',
                    },
                    dataType: "json",
                    success: function (data) {                                                    
                        var lista=[]; 
                        console.log(data)                    
                        var t = data.Titlesw
                        var l=7
                        console.log(t.length)
                        if(t.length<7 ){
                            l = t.length
                        }                           
                        for (var i=0; i <l ; i++){    
                            lista.push({
                                label:t[i].Name,
                                value:t[i].Name,
                                data:'./TitlesDetails.html?id='+data.Titles[i].Id,
                            })                          
                        }                            
                        response(lista);                                                    
                    },
                    error: function (result) {
                        alert(result.statusText);
                    }                        
                });
            },
            select: function( event, ui ) { 
                window.location.href = ui.item.data;
            }
    
        });
        $('#forms').submit(function (event) {                
            return false;
        });
       
        $('#forms').submit(function (event) {
            if($('#searchbar').val().trim().length >0){
                window.location.href = './all.html?Titles&name='+$('#searchbar').val()+'&page=1&pagesize=20' 
            }
        });    
    });
}); 