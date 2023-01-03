function favs() {
    var self = this;

    self.athleteData = ko.observable();

    self.athleteData = ko.observableArray([]);
    self.favourites = {
        athletes: []
    };
};