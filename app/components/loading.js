"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadBlockerDirective() {
    return ['$parse', '$compile', (function ($parse, $compile) {
            var fnTemplate = $compile('' +
                '<div class="fuze-address-book-loading-blocker-container" data-ng-show="loadInProgress">' +
                '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>' +
                '</div>');
            return {
                compile: function (tElement, tAttrs) {
                    var fnSettings = $parse(tAttrs.fuzeAddressBookLoadingBlocker);
                    return {
                        post: function ($scope, element, attrs, ctrls) {
                            var myscope = $scope.$new(true);
                            myscope.loadInProgress = fnSettings($scope);
                            fnTemplate(myscope, function (clone) {
                                element.append(clone);
                            });
                            $scope.$on('$destroy', function () {
                                myscope.$destroy();
                            });
                            $scope.$watch(function () { return fnSettings($scope); }, function (newValue) {
                                myscope.loadInProgress = newValue;
                            });
                        }
                    };
                }
            };
        })];
}
exports.default = loadBlockerDirective;
;
