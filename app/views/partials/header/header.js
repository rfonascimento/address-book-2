"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./header.scss");
function controller() {
    return ['$scope',
        '$state',
        '$stateParams',
        'authService',
        function ($scope, $state, $stateParams, authService) {
            var key = 'myController';
            var zpriv = {};
            var myscope = $scope[key] = (function ($scope) {
                return {
                    loadInProgress: false,
                    candidate: $stateParams.candidate
                };
            })($scope);
            myscope.actionLogout = function () {
                authService.unsetUserAddressBookId();
                $state.go('root.user', { candidate: $stateParams.candidate });
            };
            myscope.isUserLoggedIn = function () {
                return angular.isString(authService.getUserAddressBookId());
            };
        }]; //
}
exports.controller = controller;
