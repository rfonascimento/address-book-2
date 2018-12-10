"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LocalStorage() {
    return ['$window', (function ($window) {
            return {
                set: function (key, value) {
                    $window.localStorage[key] = value;
                },
                get: function (key, defaultValue) {
                    return $window.localStorage[key] || defaultValue;
                },
                setObject: function (key, value) {
                    $window.localStorage[key] = JSON.stringify(value);
                },
                getObject: function (key) {
                    return JSON.parse($window.localStorage[key] || '{}');
                }
            };
        })];
}
exports.default = LocalStorage;
;
