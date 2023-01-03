function favs() {
    var self = this;

    self.athleteData = ko.observable();

    self.athleteData = ko.observableArray([]);
    self.favouritesData = {
        athletes: []
        //falta restantes categorias
    };

    self.athleteFav = ko.observableArray([]);
    //falta restantes categorias



    self.updateLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
    }

    function findImage(id) {
        for (let i = 0; i< IMAGES.length;i++){
            if (IMAGES[i].id === id){
                if (IMAGES[i].img_url === "none"){
                    return "./img/questioningMark.png"
                }else {
                    return IMAGES[i].img_url
                }
            }
        }
        return "./img/questioningMark.png"
    }

    self.loadData = function (array) { 
        let temp = []
        for (e in array) {
            $.ajax({
                type: "GET",
                url: "http://192.168.160.58/Olympics/api/athletes" ,
                async: false,
                success: function (data) {
                    data.img = findImage(data.Id)
                    temp.push(data)
                }
            });
        }
        return temp
    }
    
    self.updateFavouritesData = function (id, name) {
        if (!$('#' + name + '-button').hasClass("active")) {
            //Adicionar à lista de favoritos
            if (!self.favouritesData[name].includes(id))
            self.favouritesData[name].push(String(id))

            self.updateLocalStorage(name, self.favouritesData[name])
            $('#' + name + '-button').addClass("active")
        } else {
            //Remover do favoritos
            self.favouritesData[name].splice(self.favouritesData[name].indexOf(id), 1)
            self.updateLocalStorage(name, self.favouritesData[name])

            $('#' + name + '-button').removeClass("active")
        }
        self.athleteFav(self.loadData(self.favouritesData.watchLater))
    }

    self.init = function () {
        for (let k in self.favouritesData) {
            if (localStorage.getItem(k) != null) {
                self.favouritesData[k] = JSON.parse(localStorage.getItem(k))
            } else {
                self.favouritesData[k] = []
            }
        }

        self.athleteFav(self.loadData(self.favouritesData.watchLater))

    self.init()
}};