(function () {
    "use strict";

    var module = angular.module("app");

    function fetchData($http) {
        return $http.get("/movies.json")
            .then(function (response) {
                return response.data;
            });
    }

    function RecordingController($http, $scope, PlaylistFactory) {

        var self = this;


        self.changeMessage = function () {
            self.message = "New message";
        };
        self.clear_scope = function () {
            $scope.recording = '';
        };
        self.cancel_recording = function () {
            self.clear_scope();
        };

        self.save_recording = function () {

            PlaylistFactory.$add({
                name: $scope.recording.name,
                data: 'no_data'
            }).then(function (response) {
                //show confirmation data
                console.log('Recording posted into the database', response.key);
                self.clear_scope();

                //save file into firebase storage
            }).catch(function (error) {
                console.log(error);
            });
        };

        self.$onInit = function () {
            /*     fetchData($http).then(function (dataList) {
                     self.dataList = dataList;
                 })
                 */
        };
    }

    module.component('recording', {
        templateUrl: 'components/recording/recording.html',
        controllerAs: "recording",
        controller: ["$http", "$scope", "PlaylistFactory", RecordingController]
    });

}());