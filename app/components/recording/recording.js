(function () {
    "use strict";

    var module = angular.module("app");

    function fetchData($http) {
        return $http.get("/movies.json")
            .then(function (response) {
                return response.data;
            })
    }

    function controller($http) {

        var self = this;
        

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

    module.component('recording', {
        templateUrl: 'components/recording/recording.html',
        controllerAs: "recording",
        controller: ["$http", controller]
    })

}());