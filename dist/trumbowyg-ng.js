angular.module('trumbowyg-ng', []);

angular.module('trumbowyg-ng').directive('trumbowygNg',
    function () {
        'use strict';
        return {
            transclude: true,
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {

                var options = angular.extend({
                    fullscreenable: true,
                    semantic: false,
                    closable: false,
                    btns: ['viewHTML']
                }, scope.$eval(attrs.editorConfig));

                ngModelCtrl.$render = function() {
                    angular.element(element).trumbowyg('html', ngModelCtrl.$viewValue);
                };

                angular.element(element).trumbowyg(options).on('tbwchange', function () {
                    ngModelCtrl.$setViewValue(angular.element(element).trumbowyg('html'));
                }).on('tbwpaste', function () {
                    ngModelCtrl.$setViewValue(angular.element(element).trumbowyg('html'));
                });
            }
        };
    });
