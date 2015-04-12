Trumbowyg-ng
============

Angular directive for   [Trumbowyg](http://alex-d.github.io/Trumbowyg/) editor.

# Requirements

- Angular
- jQuery
- Trumbowyg

# Getting starting

## Clone the repository

- `cd trumbowyg-ng` to go into the project's root directory
- `npm install` to install development dependencies
- `npm install -g bower grunt` to install bower and grunt command if you don't have them already
- `bower install` to install dependencies
- `grunt` to build the project

## Via bower

`bower install trumbowyg-ng`

# Usage

##Add module to your angular app

```javascript
angular.module('app',['trumbowyg-ng']);
```

##Use directive

```html
<div trumbowyg-ng
     ng-model="editorModel"
     editor-config="{btns: ['viewHTML','bold','italic','|','link']}">
</div>
```

##Setup model

```javascript
angular.module('app').controller('AppCtrl', function ($scope) {
    $scope.editorModel = 'SKÅL !!!';
});
```

For more on Trumbowyg see [http://alex-d.github.io/Trumbowyg/documentation.html](http://alex-d.github.io/Trumbowyg/documentation.html)

#Running tests

Following command will run both unit & End-to-End (e2e) tests

`grunt tests`
      
# License

This project is under MIT license. See [LICENSE](LICENSE) file for details.
