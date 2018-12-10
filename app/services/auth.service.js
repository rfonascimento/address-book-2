"use strict";
exports.__esModule = true;
function Auth() {
    return ['$cookies', '$stateParams', (function ($cookies, $stateParams) {
            var zpriv = {};
            var service = {};
            service.getUserAddressBookId = function () {
                return $cookies.get('userAddressBookId');
            };
            service.setUserAddressBook = function (userAddressBook) {
                return $cookies.put('userAddressBookId', userAddressBook);
            };
            service.unsetUserAddressBookId = function () {
                return $cookies.remove('userAddressBookId');
            };
            return service;
        })];
}
exports["default"] = Auth;
;
