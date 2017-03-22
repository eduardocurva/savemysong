(function () {
    "use strict";

    var module = angular.module("app");

    function fetchData($http) {
        return $http.get("/movies.json")
            .then(function (response) {
                return response.data;
            })
    }

    function controller($http, PlaylistFactory) {

        var self = this;
        self.list = PlaylistFactory;

        self.changeMessage = function () {
            self.message = "New message";
        }

        self.$onInit = function () {
            /*     fetchData($http).then(function (dataList) {
                     self.dataList = dataList;
                 })
                 */
        }
    }

    module.component('playlist', {
        templateUrl: 'components/playlist/playlist.html',
        controllerAs: "playlist",
        controller: ["$http", "PlaylistFactory", controller]
    })

}());