webpackJsonp([0],{

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./styles/app.scss":
/*!**********************************************************************************************!*\
  !*** ../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./styles/app.scss ***!
  \**********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "../node_modules/style-loader/index.js!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./styles/app.scss":
/*!***************************************************************************************************************************!*\
  !*** ../node_modules/style-loader!../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./styles/app.scss ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./app.scss */ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./styles/app.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./app.scss */ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./styles/app.scss", function() {
			var newContent = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./app.scss */ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./styles/app.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(/*! react */ "../node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "../node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Login = __webpack_require__(/*! Login */ "./containers/Login.js");

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_Login2.default, null), document.getElementById('app'));
// import React from 'react';
// import ReactDOM from 'react-dom'
// import {RoomBookingApp} from 'RoomBookingApp'
// require('font-awesome/css/font-awesome.css');
// var {Provider}=  require('react-redux');
// var actions = require('actions')ƒ
// var store = require('configuer.store').config()

// ReactDOM.render(
// <Provider store={store}  >
//     <RoomBookingApp></RoomBookingApp>
//     </Provider> ,
//     document.getElementById('app')
// )


__webpack_require__(/*! font-awesome-sass-loader */ "../node_modules/font-awesome-sass-loader/index.js");
__webpack_require__(/*! style-loader!css-loader!sass-loader!./styles/app.scss */ "../node_modules/style-loader/index.js!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./styles/app.scss");

/***/ }),

/***/ "./containers/Login.js":
/*!*****************************!*\
  !*** ./containers/Login.js ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "../node_modules/react/react.js");

var HomePage = React.createClass({
    displayName: "HomePage",

    render: function render() {
        return React.createElement(
            "div",
            { className: "home-page" },
            "test"
        );
    }
});
exports.default = HomePage;

/***/ }),

/***/ 0:
/*!*************************************!*\
  !*** multi babel-polyfill ./app.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */"../node_modules/babel-polyfill/lib/index.js");
module.exports = __webpack_require__(/*! ./app.js */"./app.js");


/***/ })

},[0]);
//# sourceMappingURL=app-a911c83241d5ccb53a33.js.map