"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('bootstrap-css-only');
var app_routes_1 = __importDefault(require("./app-routes"));
var dao_address_book_service_1 = __importDefault(require("./services/dao.address.book.service"));
var dao_contacts_service_1 = __importDefault(require("./services/dao.contacts.service"));
var dao_groups_service_1 = __importDefault(require("./services/dao.groups.service"));
var local_storage_service_1 = __importDefault(require("./services/local.storage.service"));
var modal_address_book_contacts_config_1 = __importDefault(require("./services/modal.address.book.contacts.config"));
var modal_address_book_contacts_delete_1 = __importDefault(require("./services/modal.address.book.contacts.delete"));
var modal_address_book_groups_config_1 = __importDefault(require("./services/modal.address.book.groups.config"));
var modal_address_book_groups_delete_1 = __importDefault(require("./services/modal.address.book.groups.delete"));
var auth_service_1 = __importDefault(require("./services/auth.service"));
var loading_1 = __importDefault(require("./components/loading"));
require("@fortawesome/fontawesome-free-webfonts");
require("@fortawesome/fontawesome-free-webfonts/css/fa-solid.css");
require("angularjs-toaster/toaster.css");
require("../assets/css/main.scss"); // Best for last
(function () {
    'use strict';
    var angular = require('angularjs');
    require('angular-ui-router');
    require('angular-cookies');
    require('angular-ui-bootstrap');
    require('angular-animate');
    require('angularjs-toaster');
    var myapp = angular.module('fuzeAddressBook', ['ngCookies', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'toaster']);
    myapp
        .config(app_routes_1.default())
        .service('daoAddressBookService', dao_address_book_service_1.default())
        .service('daoContactsService', dao_contacts_service_1.default())
        .service('daoGroupsService', dao_groups_service_1.default())
        .service('localStorageService', local_storage_service_1.default())
        .service('modalAddressBookServiceContactsConfig', modal_address_book_contacts_config_1.default())
        .service('modalAddressBookServiceContactsDelete', modal_address_book_contacts_delete_1.default())
        .service('modalAddressBookGroupsServiceConfig', modal_address_book_groups_config_1.default())
        .service('modalAddressBookGroupsServiceDelete', modal_address_book_groups_delete_1.default())
        .service('authService', auth_service_1.default())
        .directive('fuzeAddressBookLoadingBlocker', loading_1.default());
    myapp.controller('mainCtrl', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
            var key = 'myMainController';
            var myscope = $scope[key] = (function ($scope) {
                return {
                    loadInProgress: false,
                    data: {}
                };
            })($scope);
            myscope.isEntryState = function () {
                return $state.includes('root.user');
            };
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                console.log(error);
            });
        }]);
})();
