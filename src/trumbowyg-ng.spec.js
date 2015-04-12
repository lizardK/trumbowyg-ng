'use strict';

describe('trumbowyg-ng', function () {

    var $compile, $rootScope, $scope, elem;

    beforeEach(angular.mock.module('ngSanitize'));
    beforeEach(angular.mock.module('trumbowyg-ng'));

    beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope.$digest();
    }));

    afterEach(function() {
        $scope.$destroy();
        elem.remove();
    });

    var templates = {
        'default': {
            element: '<div trumbowyg-ng ng-model="editorModel"></div>',
            scope: {
                editorModel: ''
            }
        },
        'withButtonClose': {
            element: '<div trumbowyg-ng ng-model="editorModel" editor-config="{closable: true}"></div>',
            scope: {
                editorModel: ''
            }
        },
        'withFullscreen': {
            element: '<div trumbowyg-ng ng-model="editorModel" editor-config="{fullscreenable: true}"></div>',
            scope: {
                editorModel: ''
            }
        },
        'withoutFullscreen': {
            element: '<div trumbowyg-ng ng-model="editorModel" editor-config="{fullscreenable: false}"></div>',
            scope: {
                editorModel: ''
            }
        },
        'withButtonBold': {
            element: '<div trumbowyg-ng ng-model="editorModel" editor-config="{btns: [\'bold\']}"></div>',
            scope: {
                editorModel: ''
            }
        },
        'withSemantic': {
            element: '<div trumbowyg-ng ng-model="editorModel" editor-config="{semantic: true}"></div>',
            scope: {
                editorModel: '<b>SKÅL</b>'
            }
        },
        'withModel': {
            element: '<div trumbowyg-ng ng-model="editorModel"></div>',
            scope: {
                editorModel: '<p>SKÅL</p>'
            }
        }
    };

    function compileDirective (template, locals) {
        template = templates[template];
        angular.extend($scope, angular.copy(template.scope) || angular.copy(templates['default'].scope), locals);
        var element = $(template.element).prependTo('body');
        element = $compile(element)($scope);
        $scope.$digest();
        return jQuery(element[0]);
    }

    // ---

    describe('Testing the default editor render', function () {

        it('should load the default directive', angular.mock.inject(function () {

            $scope.$digest();

            elem = compileDirective('default');

            // Parent is trumbowyg-box
            expect(elem.parent().hasClass('trumbowyg-box')).toBeTruthy();

            // have toolbar
            expect(elem.parent().find('.trumbowyg-button-pane').length === 1).toBeTruthy();
            
        }));
       
    });


    // ---

    describe('Testing buttons editor', function () {

        it('should have close button', angular.mock.inject(function () {

            $scope.$digest();

            elem = compileDirective('withButtonClose');
            
            expect(elem.parent().find('.trumbowyg-close-button').length === 1).toBeTruthy();

        }));

        it('should have fullscreen button', angular.mock.inject(function () {

            $scope.$digest();

            elem = compileDirective('withFullscreen');
            
            expect(elem.parent().find('.trumbowyg-fullscreen-button').length === 1).toBeTruthy();

        }));

        it('should not have fullscreen button', angular.mock.inject(function () {

            $scope.$digest();

            elem = compileDirective('withoutFullscreen');

            expect(elem.parent().find('.trumbowyg-fullscreen-button').length === 0).toBeTruthy();

        }));

       
        it('should have bold button', angular.mock.inject(function () {

            $scope.$digest();

            elem = compileDirective('withButtonBold');
            
            expect(elem.parent().find('.trumbowyg-bold-button').length === 1).toBeTruthy();

        }));

        it('should not have bold button', angular.mock.inject(function () {

            $scope.$digest();

            elem = compileDirective('default');

            expect(elem.parent().find('.trumbowyg-bold-button').length === 0).toBeTruthy();

        }));
    });

    // ---
    /* Known issue on Trumbowyg: Semantic function suxxx !!!
     describe('Testing the semantic mode', function () {

        it('should replace <b> by <strong>', angular.mock.inject(function () {

            $scope.$digest();

            elem = compileDirective('withSemantic');

            var e = $.Event('keydown');
            e.which = 13;            
            elem.triggerHandler(e);            
            
            expect(elem.html() === $scope.editorModel === '<strong>SKÅL</strong>').toBeTruthy();
            
        }));
       
    });
    */

    // ---
    
    describe('Testing the binding', function () {

        it('should load the model', angular.mock.inject(function () {

            $scope.$digest();

            elem = compileDirective('withModel');

            expect(elem.html() === '<p>SKÅL</p>' && $scope.editorModel === '<p>SKÅL</p>').toBeTruthy();
            
        }));
        
        it('should sync model and view', angular.mock.inject(function () {

            $scope.$digest();

            elem = compileDirective('withModel');

            expect(elem.html() === '<p>SKÅL</p>').toBeTruthy();

            $scope.editorModel = '<strong>SKÅL</strong>';

            $scope.$digest();

            expect(elem.html() === '<strong>SKÅL</strong>').toBeTruthy();
            
        }));

        it('should sync view and model', angular.mock.inject(function () {

            $scope.$digest();

            elem = compileDirective('withModel');

            expect(elem.html() === '<p>SKÅL</p>').toBeTruthy();
            
            elem.html('<strong>SKÅL</strong>');
            var e = $.Event('keyup');
            e.which = 13;            
            elem.trigger(e);
            
            $scope.$digest();

            expect($scope.editorModel === '<strong>SKÅL</strong>').toBeTruthy();
            
        }));
        
    });

    // ---
});
