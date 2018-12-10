"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function controller() {
    return ['$scope',
        '$state',
        '$stateParams',
        function ($scope, $state, $stateParams) {
            var key = 'myController';
            var myscope = $scope[key] = (function ($scope) {
                return {
                    loadInProgress: false,
                    $state: $state
                };
            })($scope);
            console.log($state);
        }]; //
}
exports.controller = controller;
