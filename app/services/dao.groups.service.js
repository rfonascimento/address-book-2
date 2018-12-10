"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function daoGroups() {
    return ['$http',
        '$stateParams',
        '$parse',
        'localStorageService',
        (function ($http, $stateParams, $parse, localStorageService) {
            var dao = {};
            var zpriv = {};
            zpriv.getUrl = function (context, data) {
                if (data && data.id) {
                    return "https://frontend-addressbook.herokuapp.com/" + context.candidate + "/" + context.addressBookId + "/groups/" + data.id;
                }
                else {
                    return "https://frontend-addressbook.herokuapp.com/" + context.candidate + "/" + context.addressBookId + "/groups/";
                }
            };
            zpriv.rest2gui = function (data) {
            };
            dao.get = (function (context, data) {
                var url = zpriv.getUrl(context, data);
                return $http.get(url).then(function (response) {
                    return { success: true, data: ((response || {}).data || {}).value };
                }).catch(function (error) { return { success: false, error: error }; });
            });
            // Apparently there's no GET to the resource per se
            dao.getExtended = function (context) {
                var data;
                var url = "https://frontend-addressbook.herokuapp.com/" + context.candidate + "/" + context.addressBookId;
                return $http.get(url).then(function (response) {
                    localStorageService.setObject('fuzeAddressBookGroupsData', $parse('data.value.groups')(response));
                    return { success: true, data: $parse('data.value.groups')(response) };
                }).catch(function (error) {
                    if (angular.isObject(data = localStorageService.getObject('fuzeAddressBookGroupsData'))) {
                        return { success: true, data: data };
                    }
                    else {
                        return { success: false, error: error };
                    }
                });
            };
            dao.create = (function (context, data) {
                var url = "https://frontend-addressbook.herokuapp.com/" + context.candidate + "/" + context.addressBookId + "/groups/";
                return $http.post(url, data).then(function (response) {
                    return { success: true, data: ((response || {}).data || {}).value };
                }).catch(function (error) { return { success: false, error: error }; });
            });
            dao.config = (function (context, data) {
                var url = zpriv.getUrl(context, data);
                return $http.put(url, data).then(function (response) {
                    return { success: true, data: ((response || {}).data || {}).value };
                }).catch(function (error) { return { success: false, error: error }; });
            });
            dao.remove = (function (context, data) {
                var url = zpriv.getUrl(context, data);
                return $http.delete(url, data).then(function (response) {
                    return { success: true, data: ((response || {}).data || {}).value };
                }).catch(function (error) { return { success: false, error: error }; });
            });
            return dao;
        })];
}
exports.default = daoGroups;
;
