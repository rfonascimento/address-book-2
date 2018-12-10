"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function modalAddressBookContactsDelete() {
    return ['$uibModal', (function ($uibModal) {
            var ctrl = ['$scope',
                '$q',
                '$stateParams',
                'daoContactsService',
                'daoGroupsService',
                'data',
                'toaster',
                function ($scope, $q, $stateParams, daoContactsService, daoGroupsService, data, toaster) {
                    var key = 'myController';
                    var zpriv = {};
                    var myscope = $scope[key] = (function ($scope) {
                        return {
                            loadInProgress: false,
                            data: angular.copy(data) || {},
                        };
                    })($scope);
                    myscope.actionDeleteContact = function () {
                        myscope.loadInProgress = true;
                        return daoContactsService.remove(zpriv.getContext(), myscope.data)
                            .then(function (response) {
                            if (response.success == true) {
                                toaster.success("Success", "Contact successfully deleted");
                                return $scope.$close(myscope.data);
                            }
                            else {
                                toaster.error("Error", "It was not possible to delete the contact. Please try again");
                            }
                        }).finally(function () { myscope.loadInProgress = false; });
                    };
                    zpriv.getContext = function () {
                        return {
                            candidate: $stateParams.candidate,
                            addressBookId: $stateParams.addressBookId
                        };
                    };
                }];
            return function (data) {
                return $uibModal.open({
                    controller: ctrl,
                    backdrop: 'static',
                    template: require('./modal.address.book.contacts.delete.tpl.html'),
                    resolve: {
                        data: [function () { return data; }]
                    }
                    //templateUrl: require('modal.address.book.contacts.config.tpl.html')
                }).result;
            };
        })];
}
exports.default = modalAddressBookContactsDelete;
;
