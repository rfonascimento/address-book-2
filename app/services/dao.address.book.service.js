"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function daoAddressBook() {
    return ['$http',
        '$parse',
        '$stateParams',
        'localStorageService',
        (function ($http, $parse, $stateParams, localStorageService) {
            var dao = {};
            var zpriv = {};
            zpriv.getUrl = function (type, context) {
                switch (type) {
                    case 'self':
                        {
                            return "https://frontend-addressbook.herokuapp.com/";
                        }
                        break;
                    case 'addressBook':
                        {
                            return "https://frontend-addressbook.herokuapp.com/" + context.candidate + "/";
                        }
                        break;
                    default: return null;
                }
            };
            dao.get = (function (context, data) {
                var candidate;
                var url = zpriv.getUrl('addressBook', context);
                return $http.get(url).then(function (response) {
                    localStorageService.setObject('fuzeAddressBookCandidateData', $parse('data.value')(response));
                    return { success: true, data: ((response || {}).data || {}).value };
                }).catch(function (error) {
                    if (angular.isObject(candidate = localStorageService.getObject('fuzeAddressBookCandidateData'))) {
                        return { success: true, data: candidate };
                    }
                    else {
                        return { success: false, error: error };
                    }
                });
            });
            dao.create = (function (context, data) {
                var url = zpriv.getUrl('addressBook', context);
                return $http.post(url, data).then(function (response) {
                    return { success: true, data: ((response || {}).data || {}).value };
                }).catch(function (error) {
                    return { success: false, error: error };
                });
            });
            return dao;
        })];
}
exports.default = daoAddressBook;
;
