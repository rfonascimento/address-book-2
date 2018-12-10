"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
function controller() {
    return ['$scope',
        '$q',
        '$state',
        '$stateParams',
        'daoGroupsService',
        'daoContactsService',
        'modalAddressBookGroupsServiceConfig',
        'modalAddressBookGroupsServiceDelete',
        'toaster',
        function ($scope, $q, $state, $stateParams, daoGroupsService, daoContactsService, modalAddressBookGroupsServiceConfig, modalAddressBookGroupsServiceDelete, toaster) {
            var key = 'myController';
            var zpriv = {};
            var myscope = $scope[key] = (function ($scope) {
                return {
                    loadInProgress: false,
                    data: [],
                    dependenciesResolved: false,
                    searchQuery: {},
                    searchQueryBy: '$',
                    navigation: {
                        states: [{ state: 'root.addressBook.contacts', name: 'Contact list' },
                            { state: 'root.addressBook.groups', name: 'Contact groups' }
                        ],
                        selected: $state.$current.name
                    }
                };
            })($scope);
            (function () {
                myscope.loadInProgress = true;
                $q.resolve(null)
                    .then(function () { return daoContactsService.getExtended(zpriv.getContext()); })
                    .then(function (response) { return myscope.contactsList = response.data; })
                    .then(function () { return myscope.actionGetData(); })
                    .finally(function () {
                    myscope.loadInProgress = false;
                    myscope.dependenciesResolved = true;
                });
            })();
            myscope.actionGetData = function () {
                myscope.loadInProgress = true;
                return daoGroupsService.getExtended(zpriv.getContext())
                    .then(function (response) {
                    if (response.success == true) {
                        myscope.data = response.data.map(function (group) {
                            if (!angular.isString(group.pictureUrl) || group.pictureUrl.lenght == 0) {
                                group.pictureUrl = 'https://sprucegrovelandscaping.com/wp-content/uploads/2016/04/Photo-Not-Available.jpg';
                            }
                            return group;
                        });
                        zpriv.contactCount(myscope.data);
                    }
                    else {
                        toaster.error("Error", "It was not possible retrieve groups list at this point. Please try again");
                    }
                }).finally(function () { myscope.loadInProgress = false; });
            };
            myscope.actionConfigGroup = function (data) {
                var contact;
                return modalAddressBookGroupsServiceConfig(data)
                    .then(function (response) {
                    contact = myscope.data.reduce(function (output, group) {
                        if (!output && group && group.id == response.id) {
                            return group;
                        }
                        return output;
                    }, null);
                    if (angular.isObject(contact)) {
                        angular.extend(contact, response);
                    }
                    else {
                        myscope.data.push(response);
                    }
                });
            };
            myscope.actionDeleteGroup = function (data) {
                return modalAddressBookGroupsServiceDelete(data)
                    .then(function (response) {
                    myscope.data.map(function (contact, index) {
                        if (contact.id == response.id) {
                            myscope.data.splice(index, 1);
                        }
                    });
                });
            };
            myscope.navigate = (function (state) {
                $state.go(state);
            });
            zpriv.getContext = function () {
                return {
                    candidate: $stateParams.candidate,
                    addressBookId: $stateParams.addressBookId
                };
            };
            zpriv.contactCount = function (groupList) {
                groupList.map(function (group, index) {
                    group.$$$count = myscope.contactsList.reduce(function (output, contact) {
                        if (contact.groupId == group.id) {
                            output++;
                        }
                        return output;
                    }, 0);
                });
            };
        }];
}
exports.controller = controller;
