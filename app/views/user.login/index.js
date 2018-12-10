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
            myscope.actionLogin = function (data) {
                var addressBook = null;
                myscope.loadInProgress = true;
                return daoAddressBookService.get({ candidate: $stateParams.candidate }, data)
                    .then(function (response) {
                    if (response && response.success && angular.isArray(response.data)) {
                        addressBook = response.data.reduce(function (output, addressBook) {
                            if (angular.isObject(output)) {
                                return output;
                            }
                            else if (addressBook.username == myscope.data.username && addressBook.password == myscope.data.password) {
                                return addressBook;
                            }
                            else {
                                return null;
                            }
                        }, null);
                        if (!angular.isObject(addressBook)) {
                            toaster.error("Authentication failed", "Please verify if the username and password are correct");
                        }
                        else {
                            authService.setUserAddressBook(addressBook.id);
                            $state.go('root.addressBook', { candidate: $stateParams.candidate, addressBookId: addressBook.id });
                        }
                    }
                })
                    .catch(function (error) {
                })
                    .finally(function () { myscope.loadInProgress = false; });
            };
        }];
}
exports.controller = controller;
