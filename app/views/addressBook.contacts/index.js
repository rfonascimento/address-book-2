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
        'modalAddressBookServiceContactsConfig',
        'modalAddressBookServiceContactsDelete',
        'toaster',
        function ($scope, $q, $state, $stateParams, daoGroupsService, daoContactsService, modalAddressBookServiceContactsConfig, modalAddressBookServiceContactsDelete, toaster) {
            var key = 'myController';
            var zpriv = {};
            var myscope = $scope[key] = (function ($scope) {
                return {
                    loadInProgress: false,
                    dependenciesResolved: false,
                    data: [],
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
                    .then(function () { return daoGroupsService.getExtended(zpriv.getContext()); })
                    .then(function (response) { return myscope.groupsList = response.data; })
                    .then(function () { return myscope.actionGetData(); })
                    .finally(function () {
                    myscope.loadInProgress = false;
                    myscope.dependenciesResolved = true;
                });
            })();
            myscope.actionGetData = function () {
                myscope.loadInProgress = true;
                return daoContactsService.getExtended(zpriv.getContext())
                    .then(function (response) {
                    if (response.success == true) {
                        myscope.data = response.data.map(function (contact) {
                            if (!angular.isString(contact.pictureUrl) || contact.pictureUrl.lenght == 0) {
                                contact.pictureUrl = 'https://sprucegrovelandscaping.com/wp-content/uploads/2016/04/Photo-Not-Available.jpg';
                            }
                            return contact;
                        });
                        zpriv.getContactGroup(myscope.data);
                    }
                    else {
                        toaster.error("Error", "It was not possible retrieve contact list at this point. Please try again");
                    }
                }).finally(function () { myscope.loadInProgress = false; });
            };
            myscope.actionConfigContact = function (data) {
                var contact;
                return modalAddressBookServiceContactsConfig(data)
                    .then(function (response) {
                    contact = myscope.data.reduce(function (output, contact) {
                        if (!output && contact && contact.name == response.name) {
                            return contact;
                        }
                        return output;
                    }, null);
                    if (angular.isObject(contact)) {
                        angular.extend(contact, response);
                    }
                    else {
                        myscope.data.push(response);
                        zpriv.getContactGroup(myscope.data);
                    }
                });
            };
            myscope.actionDeleteContact = function (data) {
                return modalAddressBookServiceContactsDelete(data)
                    .then(function (response) {
                    myscope.data.map(function (contact, index) {
                        if (contact.name == response.name) {
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
            zpriv.getContactGroup = function (contactList) {
                contactList.map(function (contact) {
                    contact.$$$groupName = myscope.groupsList.reduce(function (output, group) {
                        if (!output && group && group.id == contact.groupId) {
                            return group.name;
                        }
                        return output;
                    }, null);
                });
            };
        }];
}
exports.controller = controller;
