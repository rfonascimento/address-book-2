"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function modalAddressBookContactsConfig() {
    return ['$uibModal', (function ($uibModal) {
            var ctrl = ['$scope',
                '$q',
                '$state',
                '$stateParams',
                'daoContactsService',
                'daoGroupsService',
                'data',
                'toaster',
                function ($scope, $q, $state, $stateParams, daoContactsService, daoGroupsService, data, toaster) {
                    var key = 'myController';
                    var zpriv = {};
                    var myscope = $scope[key] = (function ($scope) {
                        return {
                            loadInProgress: false,
                            data: angular.copy(data) || {},
                            isInEdition: angular.isObject(data),
                            isInCreation: !angular.isObject(data)
                        };
                    })($scope);
                    (function () {
                        myscope.loadInProgress = true;
                        $q.resolve(null)
                            .then(function () { return daoGroupsService.getExtended(zpriv.getContext()); })
                            .then(function (response) { myscope.groupsList = response.data; })
                            .finally(function () { myscope.loadInProgress = false; });
                    })();
                    myscope.actionConfigContact = function () {
                        var promise = null;
                        myscope.loadInProgress = true;
                        if (myscope.isInCreation) {
                            promise = daoContactsService.create(zpriv.getContext(), myscope.data);
                        }
                        else {
                            promise = daoContactsService.config(zpriv.getContext(), myscope.data);
                        }
                        return promise.then(function (response) {
                            if (response.success == true) {
                                if (myscope.isInCreation) {
                                    toaster.success("Success", "Contact successfully created");
                                }
                                else {
                                    toaster.success("Success", "Contact successfully updated");
                                }
                                return $scope.$close(myscope.data);
                            }
                            else {
                                toaster.error("Error", "It was not possible to configure the contact. Please try again");
                            }
                        }).finally(function () { myscope.loadInProgress = false; });
                    };
                    myscope.getGroups = function () {
                        return myscope.groupsList;
                    };
                    myscope.createNewContact = function () {
                        $scope.$dismiss();
                        $state.go('root.addressBook.groups');
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
                    template: require('./modal.address.book.contacts.config.tpl.html'),
                    resolve: {
                        data: [function () { return data; }]
                    }
                    //templateUrl: require('modal.address.book.contacts.config.tpl.html')
                }).result;
            };
        })];
}
exports.default = modalAddressBookContactsConfig;
;
