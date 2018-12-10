"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
function controller() {
    return ['$scope',
        '$state',
        '$stateParams',
        'toaster',
        'daoAddressBookService',
        'authService',
        function ($scope, $state, $stateParams, toaster, daoAddressBookService, authService) {
            var key = 'myController';
            var myscope = $scope[key] = (function ($scope) {
                return {
                    loadInProgress: false,
                    data: {}
                };
            })($scope);
            myscope.actionCreate = function (data) {
                myscope.loadInProgress = true;
                return daoAddressBookService.create({ candidate: $stateParams.candidate }, data)
                    .then(function (response) {
                    if (response && response.success) {
                        toaster.success("Account creation success", "Login with the new account");
                        $state.go('root.user', { candidate: $stateParams.candidate });
                    }
                    else {
                        toaster.error("Account creation falied", "Please try again or contact support");
                    }
                })
                    .catch(function (error) {
                })
                    .finally(function () { myscope.loadInProgress = false; });
            };
        }];
}
exports.controller = controller;
