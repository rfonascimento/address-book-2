"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function modalAddressBookContactsDelete() {
    return ['$uibModal', (function ($uibModal) {
            var ctrl = ['$scope',
                '$q',
                '$stateParams',
                'daoGroupsService',
                'data',
                'toaster',
                function ($scope, $q, $stateParams, daoGroupsService, data, toaster) {
                    var key = 'myController';
                    var zpriv = {};
                    var myscope = $scope[key] = (function ($scope) {
                        return {
                            loadInProgress: false,
                            data: angular.copy(data) || {},
                        };
                    })($scope);
                    myscope.actionDeleteGroup = function () {
                        myscope.loadInProgress = true;
                        return daoGroupsService.remove(zpriv.getContext(), myscope.data)
                            .then(function (response) {
                            if (response.success == true) {
                                toaster.success("Success", "Group successfully deleted");
                                return $scope.$close(myscope.data);
                            }
                            else {
                                toaster.error("Error", "It was not possible to delete the contact group. Please try again");
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
                    template: require('./modal.address.book.groups.delete.tpl.html'),
                    resolve: {
                        data: [function () { return data; }]
                    }
                }).result;
            };
        })];
}
exports.default = modalAddressBookContactsDelete;
;
