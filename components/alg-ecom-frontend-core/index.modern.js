import axios from 'axios';
import numberFormat from 'number-with-commas';
import { cloneDeep as cloneDeep$1 } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { MD5, AES, enc } from 'crypto-js';

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var API_DOMAIN = process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN;
var CMS_DOMAIN = process.env.NEXT_PUBLIC_REACT_APP_CMS_DOMAIN;

var ApiService = /*#__PURE__*/function () {
  function ApiService(store) {
    this.store = store;
  }

  _createClass(ApiService, [{
    key: "token",
    get: function get() {
      return this.store.token;
    }
  }, {
    key: "apiDomain",
    get: function get() {
      return this.store.apiDomain;
    }
  }, {
    key: "cmsDomain",
    get: function get() {
      return this.store.cmsDomain;
    }
  }, {
    key: "languageID",
    get: function get() {
      return this.store.languageID;
    }
  }, {
    key: "websiteID",
    get: function get() {
      return this.store.websiteID;
    }
  }, {
    key: "subsiteID",
    get: function get() {
      return this.store.subsiteID;
    }
  }]);

  return ApiService;
}();

var CrudService = /*#__PURE__*/function (_ApiService) {
  _inheritsLoose(CrudService, _ApiService);

  function CrudService() {
    return _ApiService.apply(this, arguments) || this;
  }

  return CrudService;
}(ApiService);

var post = function post(url, data, languageID, websiteID, subsiteID, contentType, token) {
  try {
    var options = {
      url: url,
      method: 'POST',
      headers: _extends({}, getAuthHeader(token), getSettingHeaders(languageID, websiteID, subsiteID, token), {
        'Content-Type': contentType ? contentType : 'application/json'
      })
    };
    return Promise.resolve(axios.post(url, data, options));
  } catch (e) {
    return Promise.reject(e);
  }
};
var get = function get(url, languageID, websiteID, subsiteID, token) {
  try {
    var options = {
      headers: _extends({}, getAuthHeader(token), getSettingHeaders(languageID, websiteID, subsiteID, token))
    };
    return Promise.resolve(axios.get(url, options));
  } catch (e) {
    return Promise.reject(e);
  }
};
function getAuthHeader(token) {
  if (!token) {
    return {};
  }

  return {
    Authorization: "Bearer " + token
  };
}
function getSettingHeaders(languageID, websiteID, subsiteID, token) {
  if (!languageID || !websiteID || !subsiteID) {
    return {};
  }

  return {
    languageID: languageID,
    websiteID: websiteID,
    subsiteID: subsiteID,
    userToken: token
  };
}

var UserService = /*#__PURE__*/function (_ApiService) {
  _inheritsLoose(UserService, _ApiService);

  function UserService() {
    return _ApiService.apply(this, arguments) || this;
  }

  var _proto = UserService.prototype;

  _proto.login = function login(credentials) {
    try {
      var _this2 = this;

      var url = _this2.apiDomain + "/mobileapp/user/index";
      var postData = new FormData();
      postData.append('userLogin', credentials === null || credentials === void 0 ? void 0 : credentials.userLogin);
      postData.append('userPassword', credentials === null || credentials === void 0 ? void 0 : credentials.password);
      return Promise.resolve(post(url, postData, _this2.languageID, _this2.websiteID, _this2.subsiteID)).then(function (resposne) {
        var _resposne$data, _resposne$data$meta;

        if (((_resposne$data = resposne.data) === null || _resposne$data === void 0 ? void 0 : (_resposne$data$meta = _resposne$data.meta) === null || _resposne$data$meta === void 0 ? void 0 : _resposne$data$meta.responsecode) === 200) {
          var _resposne$data2, _resposne$data3, _resposne$data3$meta, _resposne$data4, _resposne$data4$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data2 = resposne.data) === null || _resposne$data2 === void 0 ? void 0 : _resposne$data2.data,
            responsecode: (_resposne$data3 = resposne.data) === null || _resposne$data3 === void 0 ? void 0 : (_resposne$data3$meta = _resposne$data3.meta) === null || _resposne$data3$meta === void 0 ? void 0 : _resposne$data3$meta.responsecode,
            status: (_resposne$data4 = resposne.data) === null || _resposne$data4 === void 0 ? void 0 : (_resposne$data4$meta = _resposne$data4.meta) === null || _resposne$data4$meta === void 0 ? void 0 : _resposne$data4$meta.status,
            message: ''
          };
        } else {
          var _resposne$data5, _resposne$data5$meta, _resposne$data6, _resposne$data6$meta, _resposne$data7, _resposne$data7$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data5 = resposne.data) === null || _resposne$data5 === void 0 ? void 0 : (_resposne$data5$meta = _resposne$data5.meta) === null || _resposne$data5$meta === void 0 ? void 0 : _resposne$data5$meta.responsecode,
            status: (_resposne$data6 = resposne.data) === null || _resposne$data6 === void 0 ? void 0 : (_resposne$data6$meta = _resposne$data6.meta) === null || _resposne$data6$meta === void 0 ? void 0 : _resposne$data6$meta.status,
            message: (_resposne$data7 = resposne.data) === null || _resposne$data7 === void 0 ? void 0 : (_resposne$data7$meta = _resposne$data7.meta) === null || _resposne$data7$meta === void 0 ? void 0 : _resposne$data7$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.signUp = function signUp(data) {
    try {
      var _this4 = this;

      var url = _this4.apiDomain + "mobileapp/user/signup/";
      return Promise.resolve(post(url, data, _this4.languageID, _this4.websiteID, _this4.subsiteID)).then(function (resposne) {
        var _resposne$data8, _resposne$data8$meta;

        if (((_resposne$data8 = resposne.data) === null || _resposne$data8 === void 0 ? void 0 : (_resposne$data8$meta = _resposne$data8.meta) === null || _resposne$data8$meta === void 0 ? void 0 : _resposne$data8$meta.responsecode) === 200) {
          var _resposne$data9, _resposne$data10, _resposne$data10$meta, _resposne$data11, _resposne$data11$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data9 = resposne.data) === null || _resposne$data9 === void 0 ? void 0 : _resposne$data9.data,
            responsecode: (_resposne$data10 = resposne.data) === null || _resposne$data10 === void 0 ? void 0 : (_resposne$data10$meta = _resposne$data10.meta) === null || _resposne$data10$meta === void 0 ? void 0 : _resposne$data10$meta.responsecode,
            status: (_resposne$data11 = resposne.data) === null || _resposne$data11 === void 0 ? void 0 : (_resposne$data11$meta = _resposne$data11.meta) === null || _resposne$data11$meta === void 0 ? void 0 : _resposne$data11$meta.status,
            message: ''
          };
        } else {
          var _resposne$data12, _resposne$data12$meta, _resposne$data13, _resposne$data13$meta, _resposne$data14, _resposne$data14$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data12 = resposne.data) === null || _resposne$data12 === void 0 ? void 0 : (_resposne$data12$meta = _resposne$data12.meta) === null || _resposne$data12$meta === void 0 ? void 0 : _resposne$data12$meta.responsecode,
            status: (_resposne$data13 = resposne.data) === null || _resposne$data13 === void 0 ? void 0 : (_resposne$data13$meta = _resposne$data13.meta) === null || _resposne$data13$meta === void 0 ? void 0 : _resposne$data13$meta.status,
            message: (_resposne$data14 = resposne.data) === null || _resposne$data14 === void 0 ? void 0 : (_resposne$data14$meta = _resposne$data14.meta) === null || _resposne$data14$meta === void 0 ? void 0 : _resposne$data14$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.guestSignUp = function guestSignUp(data) {
    try {
      var _this6 = this;

      var url = _this6.apiDomain + "mobileapp/user/guestsignup/";
      return Promise.resolve(post(url, data, _this6.languageID, _this6.websiteID, _this6.subsiteID)).then(function (resposne) {
        var _resposne$data15, _resposne$data15$meta;

        if (((_resposne$data15 = resposne.data) === null || _resposne$data15 === void 0 ? void 0 : (_resposne$data15$meta = _resposne$data15.meta) === null || _resposne$data15$meta === void 0 ? void 0 : _resposne$data15$meta.responsecode) === 200) {
          var _resposne$data16, _resposne$data17, _resposne$data17$meta, _resposne$data18, _resposne$data18$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data16 = resposne.data) === null || _resposne$data16 === void 0 ? void 0 : _resposne$data16.data,
            responsecode: (_resposne$data17 = resposne.data) === null || _resposne$data17 === void 0 ? void 0 : (_resposne$data17$meta = _resposne$data17.meta) === null || _resposne$data17$meta === void 0 ? void 0 : _resposne$data17$meta.responsecode,
            status: (_resposne$data18 = resposne.data) === null || _resposne$data18 === void 0 ? void 0 : (_resposne$data18$meta = _resposne$data18.meta) === null || _resposne$data18$meta === void 0 ? void 0 : _resposne$data18$meta.status,
            message: ''
          };
        } else {
          var _resposne$data19, _resposne$data19$meta, _resposne$data20, _resposne$data20$meta, _resposne$data21, _resposne$data21$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data19 = resposne.data) === null || _resposne$data19 === void 0 ? void 0 : (_resposne$data19$meta = _resposne$data19.meta) === null || _resposne$data19$meta === void 0 ? void 0 : _resposne$data19$meta.responsecode,
            status: (_resposne$data20 = resposne.data) === null || _resposne$data20 === void 0 ? void 0 : (_resposne$data20$meta = _resposne$data20.meta) === null || _resposne$data20$meta === void 0 ? void 0 : _resposne$data20$meta.status,
            message: (_resposne$data21 = resposne.data) === null || _resposne$data21 === void 0 ? void 0 : (_resposne$data21$meta = _resposne$data21.meta) === null || _resposne$data21$meta === void 0 ? void 0 : _resposne$data21$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.changeUserPhone = function changeUserPhone(data, userToken) {
    try {
      var _this8 = this;

      var url = _this8.apiDomain + "mobileapp/user/changeUserPhone/";
      return Promise.resolve(post(url, data, _this8.languageID, _this8.websiteID, _this8.subsiteID, '', userToken)).then(function (resposne) {
        var _resposne$data22, _resposne$data22$meta;

        if (((_resposne$data22 = resposne.data) === null || _resposne$data22 === void 0 ? void 0 : (_resposne$data22$meta = _resposne$data22.meta) === null || _resposne$data22$meta === void 0 ? void 0 : _resposne$data22$meta.responsecode) === 200) {
          var _resposne$data23, _resposne$data24, _resposne$data24$meta, _resposne$data25, _resposne$data25$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data23 = resposne.data) === null || _resposne$data23 === void 0 ? void 0 : _resposne$data23.data,
            responsecode: (_resposne$data24 = resposne.data) === null || _resposne$data24 === void 0 ? void 0 : (_resposne$data24$meta = _resposne$data24.meta) === null || _resposne$data24$meta === void 0 ? void 0 : _resposne$data24$meta.responsecode,
            status: (_resposne$data25 = resposne.data) === null || _resposne$data25 === void 0 ? void 0 : (_resposne$data25$meta = _resposne$data25.meta) === null || _resposne$data25$meta === void 0 ? void 0 : _resposne$data25$meta.status,
            message: ''
          };
        } else {
          var _resposne$data26, _resposne$data26$meta, _resposne$data27, _resposne$data27$meta, _resposne$data28, _resposne$data28$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data26 = resposne.data) === null || _resposne$data26 === void 0 ? void 0 : (_resposne$data26$meta = _resposne$data26.meta) === null || _resposne$data26$meta === void 0 ? void 0 : _resposne$data26$meta.responsecode,
            status: (_resposne$data27 = resposne.data) === null || _resposne$data27 === void 0 ? void 0 : (_resposne$data27$meta = _resposne$data27.meta) === null || _resposne$data27$meta === void 0 ? void 0 : _resposne$data27$meta.status,
            message: (_resposne$data28 = resposne.data) === null || _resposne$data28 === void 0 ? void 0 : (_resposne$data28$meta = _resposne$data28.meta) === null || _resposne$data28$meta === void 0 ? void 0 : _resposne$data28$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.verifyOtp = function verifyOtp(data) {
    try {
      var _this10 = this;

      var url = _this10.apiDomain + "mobileapp/user/verifyOTP/";
      return Promise.resolve(_catch(function () {
        return Promise.resolve(post(url, data, _this10.languageID, _this10.websiteID, _this10.subsiteID)).then(function (resposne) {
          var _resposne$data29, _resposne$data29$meta;

          if (((_resposne$data29 = resposne.data) === null || _resposne$data29 === void 0 ? void 0 : (_resposne$data29$meta = _resposne$data29.meta) === null || _resposne$data29$meta === void 0 ? void 0 : _resposne$data29$meta.responsecode) === 200) {
            var _resposne$data30, _resposne$data31, _resposne$data31$meta, _resposne$data32, _resposne$data32$meta;

            return {
              data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data30 = resposne.data) === null || _resposne$data30 === void 0 ? void 0 : _resposne$data30.data,
              responsecode: (_resposne$data31 = resposne.data) === null || _resposne$data31 === void 0 ? void 0 : (_resposne$data31$meta = _resposne$data31.meta) === null || _resposne$data31$meta === void 0 ? void 0 : _resposne$data31$meta.responsecode,
              status: (_resposne$data32 = resposne.data) === null || _resposne$data32 === void 0 ? void 0 : (_resposne$data32$meta = _resposne$data32.meta) === null || _resposne$data32$meta === void 0 ? void 0 : _resposne$data32$meta.status,
              message: ''
            };
          } else {
            var _resposne$data33, _resposne$data33$meta, _resposne$data34, _resposne$data34$meta, _resposne$data35, _resposne$data35$meta;

            return {
              data: undefined,
              responsecode: (_resposne$data33 = resposne.data) === null || _resposne$data33 === void 0 ? void 0 : (_resposne$data33$meta = _resposne$data33.meta) === null || _resposne$data33$meta === void 0 ? void 0 : _resposne$data33$meta.responsecode,
              status: (_resposne$data34 = resposne.data) === null || _resposne$data34 === void 0 ? void 0 : (_resposne$data34$meta = _resposne$data34.meta) === null || _resposne$data34$meta === void 0 ? void 0 : _resposne$data34$meta.status,
              message: (_resposne$data35 = resposne.data) === null || _resposne$data35 === void 0 ? void 0 : (_resposne$data35$meta = _resposne$data35.meta) === null || _resposne$data35$meta === void 0 ? void 0 : _resposne$data35$meta.message
            };
          }
        });
      }, function (error) {
        var _error$response$data, _error$response$data$, _error$response$data2, _error$response$data3, _error$response$data4, _error$response$data5;

        return {
          data: undefined,
          responsecode: (_error$response$data = error.response.data) === null || _error$response$data === void 0 ? void 0 : (_error$response$data$ = _error$response$data.meta) === null || _error$response$data$ === void 0 ? void 0 : _error$response$data$.responsecode,
          status: (_error$response$data2 = error.response.data) === null || _error$response$data2 === void 0 ? void 0 : (_error$response$data3 = _error$response$data2.meta) === null || _error$response$data3 === void 0 ? void 0 : _error$response$data3.status,
          message: (_error$response$data4 = error.response.data) === null || _error$response$data4 === void 0 ? void 0 : (_error$response$data5 = _error$response$data4.meta) === null || _error$response$data5 === void 0 ? void 0 : _error$response$data5.message
        };
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.resendOtp = function resendOtp(data) {
    try {
      var _this12 = this;

      var url = _this12.apiDomain + "mobileapp/user/resendOTP/";
      return Promise.resolve(_catch(function () {
        return Promise.resolve(post(url, data, _this12.languageID, _this12.websiteID, _this12.subsiteID)).then(function (resposne) {
          var _resposne$data36, _resposne$data36$meta;

          if (((_resposne$data36 = resposne.data) === null || _resposne$data36 === void 0 ? void 0 : (_resposne$data36$meta = _resposne$data36.meta) === null || _resposne$data36$meta === void 0 ? void 0 : _resposne$data36$meta.responsecode) === 200) {
            var _resposne$data37, _resposne$data38, _resposne$data38$meta, _resposne$data39, _resposne$data39$meta;

            return {
              data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data37 = resposne.data) === null || _resposne$data37 === void 0 ? void 0 : _resposne$data37.data,
              responsecode: (_resposne$data38 = resposne.data) === null || _resposne$data38 === void 0 ? void 0 : (_resposne$data38$meta = _resposne$data38.meta) === null || _resposne$data38$meta === void 0 ? void 0 : _resposne$data38$meta.responsecode,
              status: (_resposne$data39 = resposne.data) === null || _resposne$data39 === void 0 ? void 0 : (_resposne$data39$meta = _resposne$data39.meta) === null || _resposne$data39$meta === void 0 ? void 0 : _resposne$data39$meta.status,
              message: ''
            };
          } else {
            var _resposne$data40, _resposne$data40$meta, _resposne$data41, _resposne$data41$meta, _resposne$data42, _resposne$data42$meta;

            return {
              data: undefined,
              responsecode: (_resposne$data40 = resposne.data) === null || _resposne$data40 === void 0 ? void 0 : (_resposne$data40$meta = _resposne$data40.meta) === null || _resposne$data40$meta === void 0 ? void 0 : _resposne$data40$meta.responsecode,
              status: (_resposne$data41 = resposne.data) === null || _resposne$data41 === void 0 ? void 0 : (_resposne$data41$meta = _resposne$data41.meta) === null || _resposne$data41$meta === void 0 ? void 0 : _resposne$data41$meta.status,
              message: (_resposne$data42 = resposne.data) === null || _resposne$data42 === void 0 ? void 0 : (_resposne$data42$meta = _resposne$data42.meta) === null || _resposne$data42$meta === void 0 ? void 0 : _resposne$data42$meta.message
            };
          }
        });
      }, function (error) {
        var _error$response$data6, _error$response$data7, _error$response$data8, _error$response$data9, _error$response$data10, _error$response$data11;

        return {
          data: undefined,
          responsecode: (_error$response$data6 = error.response.data) === null || _error$response$data6 === void 0 ? void 0 : (_error$response$data7 = _error$response$data6.meta) === null || _error$response$data7 === void 0 ? void 0 : _error$response$data7.responsecode,
          status: (_error$response$data8 = error.response.data) === null || _error$response$data8 === void 0 ? void 0 : (_error$response$data9 = _error$response$data8.meta) === null || _error$response$data9 === void 0 ? void 0 : _error$response$data9.status,
          message: (_error$response$data10 = error.response.data) === null || _error$response$data10 === void 0 ? void 0 : (_error$response$data11 = _error$response$data10.meta) === null || _error$response$data11 === void 0 ? void 0 : _error$response$data11.message
        };
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.fbUserSignup = function fbUserSignup(data) {
    try {
      var _this14 = this;

      var url = _this14.apiDomain + "mobileapp/user/fbUserSignup/";
      return Promise.resolve(post(url, data, _this14.languageID, _this14.websiteID, _this14.subsiteID)).then(function (resposne) {
        var _resposne$data43, _resposne$data43$meta;

        if (((_resposne$data43 = resposne.data) === null || _resposne$data43 === void 0 ? void 0 : (_resposne$data43$meta = _resposne$data43.meta) === null || _resposne$data43$meta === void 0 ? void 0 : _resposne$data43$meta.responsecode) === 200) {
          var _resposne$data44, _resposne$data45, _resposne$data45$meta, _resposne$data46, _resposne$data46$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data44 = resposne.data) === null || _resposne$data44 === void 0 ? void 0 : _resposne$data44.data,
            responsecode: (_resposne$data45 = resposne.data) === null || _resposne$data45 === void 0 ? void 0 : (_resposne$data45$meta = _resposne$data45.meta) === null || _resposne$data45$meta === void 0 ? void 0 : _resposne$data45$meta.responsecode,
            status: (_resposne$data46 = resposne.data) === null || _resposne$data46 === void 0 ? void 0 : (_resposne$data46$meta = _resposne$data46.meta) === null || _resposne$data46$meta === void 0 ? void 0 : _resposne$data46$meta.status,
            message: ''
          };
        } else {
          var _resposne$data47, _resposne$data47$meta, _resposne$data48, _resposne$data48$meta, _resposne$data49, _resposne$data49$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data47 = resposne.data) === null || _resposne$data47 === void 0 ? void 0 : (_resposne$data47$meta = _resposne$data47.meta) === null || _resposne$data47$meta === void 0 ? void 0 : _resposne$data47$meta.responsecode,
            status: (_resposne$data48 = resposne.data) === null || _resposne$data48 === void 0 ? void 0 : (_resposne$data48$meta = _resposne$data48.meta) === null || _resposne$data48$meta === void 0 ? void 0 : _resposne$data48$meta.status,
            message: (_resposne$data49 = resposne.data) === null || _resposne$data49 === void 0 ? void 0 : (_resposne$data49$meta = _resposne$data49.meta) === null || _resposne$data49$meta === void 0 ? void 0 : _resposne$data49$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.googleUserSignup = function googleUserSignup(data) {
    try {
      var _this16 = this;

      var url = _this16.apiDomain + "mobileapp/user/checkgoogleLogin/";
      return Promise.resolve(post(url, data, _this16.languageID, _this16.websiteID, _this16.subsiteID)).then(function (resposne) {
        var _resposne$data50, _resposne$data50$meta;

        if (((_resposne$data50 = resposne.data) === null || _resposne$data50 === void 0 ? void 0 : (_resposne$data50$meta = _resposne$data50.meta) === null || _resposne$data50$meta === void 0 ? void 0 : _resposne$data50$meta.responsecode) === 200) {
          var _resposne$data51, _resposne$data52, _resposne$data52$meta, _resposne$data53, _resposne$data53$meta, _resposne$data54, _resposne$data54$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data51 = resposne.data) === null || _resposne$data51 === void 0 ? void 0 : _resposne$data51.data,
            responsecode: (_resposne$data52 = resposne.data) === null || _resposne$data52 === void 0 ? void 0 : (_resposne$data52$meta = _resposne$data52.meta) === null || _resposne$data52$meta === void 0 ? void 0 : _resposne$data52$meta.responsecode,
            status: (_resposne$data53 = resposne.data) === null || _resposne$data53 === void 0 ? void 0 : (_resposne$data53$meta = _resposne$data53.meta) === null || _resposne$data53$meta === void 0 ? void 0 : _resposne$data53$meta.status,
            message: (_resposne$data54 = resposne.data) === null || _resposne$data54 === void 0 ? void 0 : (_resposne$data54$meta = _resposne$data54.meta) === null || _resposne$data54$meta === void 0 ? void 0 : _resposne$data54$meta.message
          };
        } else {
          var _resposne$data55, _resposne$data55$meta, _resposne$data56, _resposne$data56$meta, _resposne$data57, _resposne$data57$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data55 = resposne.data) === null || _resposne$data55 === void 0 ? void 0 : (_resposne$data55$meta = _resposne$data55.meta) === null || _resposne$data55$meta === void 0 ? void 0 : _resposne$data55$meta.responsecode,
            status: (_resposne$data56 = resposne.data) === null || _resposne$data56 === void 0 ? void 0 : (_resposne$data56$meta = _resposne$data56.meta) === null || _resposne$data56$meta === void 0 ? void 0 : _resposne$data56$meta.status,
            message: (_resposne$data57 = resposne.data) === null || _resposne$data57 === void 0 ? void 0 : (_resposne$data57$meta = _resposne$data57.meta) === null || _resposne$data57$meta === void 0 ? void 0 : _resposne$data57$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.gerConfigurations = function gerConfigurations() {
    try {
      var _this18 = this;

      var url = _this18.apiDomain + "mobileapp/user/listConfigurations/";
      return Promise.resolve(get(url, _this18.languageID, _this18.websiteID, _this18.subsiteID, _this18.token)).then(function (resposne) {
        var _resposne$data58, _resposne$data58$meta;

        if (((_resposne$data58 = resposne.data) === null || _resposne$data58 === void 0 ? void 0 : (_resposne$data58$meta = _resposne$data58.meta) === null || _resposne$data58$meta === void 0 ? void 0 : _resposne$data58$meta.responsecode) === 200) {
          var _resposne$data59, _resposne$data60, _resposne$data61;

          return resposne !== null && resposne !== void 0 && (_resposne$data59 = resposne.data) !== null && _resposne$data59 !== void 0 && _resposne$data59.data && resposne !== null && resposne !== void 0 && (_resposne$data60 = resposne.data) !== null && _resposne$data60 !== void 0 && _resposne$data60.data.length ? resposne === null || resposne === void 0 ? void 0 : (_resposne$data61 = resposne.data) === null || _resposne$data61 === void 0 ? void 0 : _resposne$data61.data : null;
        } else {
          return undefined;
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.gerOrders = function gerOrders() {
    try {
      var _this20 = this;

      var url = _this20.apiDomain + "mobileapp/user/listOrders/";
      return Promise.resolve(get(url, _this20.languageID, _this20.websiteID, _this20.subsiteID, _this20.token)).then(function (resposne) {
        var _resposne$data62, _resposne$data62$meta;

        if (((_resposne$data62 = resposne.data) === null || _resposne$data62 === void 0 ? void 0 : (_resposne$data62$meta = _resposne$data62.meta) === null || _resposne$data62$meta === void 0 ? void 0 : _resposne$data62$meta.responsecode) === 200) {
          var _resposne$data63, _resposne$data64, _resposne$data65;

          return resposne !== null && resposne !== void 0 && (_resposne$data63 = resposne.data) !== null && _resposne$data63 !== void 0 && _resposne$data63.data && resposne !== null && resposne !== void 0 && (_resposne$data64 = resposne.data) !== null && _resposne$data64 !== void 0 && _resposne$data64.data.length ? resposne === null || resposne === void 0 ? void 0 : (_resposne$data65 = resposne.data) === null || _resposne$data65 === void 0 ? void 0 : _resposne$data65.data : null;
        } else {
          return undefined;
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.gerBookings = function gerBookings() {
    try {
      var _this22 = this;

      var url = _this22.apiDomain + "mobileapp/user/listBookings/";
      return Promise.resolve(get(url, _this22.languageID, _this22.websiteID, _this22.subsiteID, _this22.token)).then(function (resposne) {
        var _resposne$data66, _resposne$data66$meta;

        if (((_resposne$data66 = resposne.data) === null || _resposne$data66 === void 0 ? void 0 : (_resposne$data66$meta = _resposne$data66.meta) === null || _resposne$data66$meta === void 0 ? void 0 : _resposne$data66$meta.responsecode) === 200) {
          var _resposne$data67, _resposne$data68, _resposne$data69;

          return resposne !== null && resposne !== void 0 && (_resposne$data67 = resposne.data) !== null && _resposne$data67 !== void 0 && _resposne$data67.data && resposne !== null && resposne !== void 0 && (_resposne$data68 = resposne.data) !== null && _resposne$data68 !== void 0 && _resposne$data68.data.length ? resposne === null || resposne === void 0 ? void 0 : (_resposne$data69 = resposne.data) === null || _resposne$data69 === void 0 ? void 0 : _resposne$data69.data : null;
        } else {
          return undefined;
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.gerOrderDetails = function gerOrderDetails(orderID) {
    try {
      var _this24 = this;

      var url = _this24.apiDomain + "mobileapp/user/listOrders/orderID/" + orderID;
      return Promise.resolve(get(url, _this24.languageID, _this24.websiteID, _this24.subsiteID, _this24.token)).then(function (resposne) {
        var _resposne$data70, _resposne$data70$meta;

        if (((_resposne$data70 = resposne.data) === null || _resposne$data70 === void 0 ? void 0 : (_resposne$data70$meta = _resposne$data70.meta) === null || _resposne$data70$meta === void 0 ? void 0 : _resposne$data70$meta.responsecode) === 200) {
          var _resposne$data71;

          return resposne === null || resposne === void 0 ? void 0 : (_resposne$data71 = resposne.data) === null || _resposne$data71 === void 0 ? void 0 : _resposne$data71.data;
        } else {
          return undefined;
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getBookingDetails = function getBookingDetails(bookingID) {
    try {
      var _this26 = this;

      var url = _this26.apiDomain + "mobileapp/user/listBookings/orderID/" + bookingID;
      return Promise.resolve(get(url, _this26.languageID, _this26.websiteID, _this26.subsiteID, _this26.token)).then(function (resposne) {
        var _resposne$data72, _resposne$data72$meta;

        if (((_resposne$data72 = resposne.data) === null || _resposne$data72 === void 0 ? void 0 : (_resposne$data72$meta = _resposne$data72.meta) === null || _resposne$data72$meta === void 0 ? void 0 : _resposne$data72$meta.responsecode) === 200) {
          var _resposne$data73;

          return resposne === null || resposne === void 0 ? void 0 : (_resposne$data73 = resposne.data) === null || _resposne$data73 === void 0 ? void 0 : _resposne$data73.data;
        } else {
          return undefined;
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getConfigurationDetails = function getConfigurationDetails(configID) {
    try {
      var _this28 = this;

      var url = _this28.apiDomain + "mobileapp/user/listConfigurations/configID/" + configID;
      return Promise.resolve(get(url, _this28.languageID, _this28.websiteID, _this28.subsiteID, _this28.token)).then(function (resposne) {
        if (resposne.status === 200) {
          var _resposne$data74;

          return resposne === null || resposne === void 0 ? void 0 : (_resposne$data74 = resposne.data) === null || _resposne$data74 === void 0 ? void 0 : _resposne$data74.data;
        } else {
          return undefined;
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.forgotPassword = function forgotPassword(data) {
    try {
      var _this30 = this;

      var url = _this30.apiDomain + "mobileapp/user/forgotPassword/";
      return Promise.resolve(post(url, data, _this30.languageID, _this30.websiteID, _this30.subsiteID)).then(function (resposne) {
        var _resposne$data75, _resposne$data75$meta;

        if (((_resposne$data75 = resposne.data) === null || _resposne$data75 === void 0 ? void 0 : (_resposne$data75$meta = _resposne$data75.meta) === null || _resposne$data75$meta === void 0 ? void 0 : _resposne$data75$meta.responsecode) === 200) {
          var _resposne$data76, _resposne$data77, _resposne$data77$meta, _resposne$data78, _resposne$data78$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data76 = resposne.data) === null || _resposne$data76 === void 0 ? void 0 : _resposne$data76.data,
            responsecode: (_resposne$data77 = resposne.data) === null || _resposne$data77 === void 0 ? void 0 : (_resposne$data77$meta = _resposne$data77.meta) === null || _resposne$data77$meta === void 0 ? void 0 : _resposne$data77$meta.responsecode,
            status: (_resposne$data78 = resposne.data) === null || _resposne$data78 === void 0 ? void 0 : (_resposne$data78$meta = _resposne$data78.meta) === null || _resposne$data78$meta === void 0 ? void 0 : _resposne$data78$meta.status,
            message: ''
          };
        } else {
          var _resposne$data79, _resposne$data79$meta, _resposne$data80, _resposne$data80$meta, _resposne$data81, _resposne$data81$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data79 = resposne.data) === null || _resposne$data79 === void 0 ? void 0 : (_resposne$data79$meta = _resposne$data79.meta) === null || _resposne$data79$meta === void 0 ? void 0 : _resposne$data79$meta.responsecode,
            status: (_resposne$data80 = resposne.data) === null || _resposne$data80 === void 0 ? void 0 : (_resposne$data80$meta = _resposne$data80.meta) === null || _resposne$data80$meta === void 0 ? void 0 : _resposne$data80$meta.status,
            message: (_resposne$data81 = resposne.data) === null || _resposne$data81 === void 0 ? void 0 : (_resposne$data81$meta = _resposne$data81.meta) === null || _resposne$data81$meta === void 0 ? void 0 : _resposne$data81$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.resetPassword = function resetPassword(data) {
    try {
      var _this32 = this;

      var url = _this32.apiDomain + "mobileapp/user/resetPassword/";
      return Promise.resolve(post(url, data, _this32.languageID, _this32.websiteID, _this32.subsiteID)).then(function (resposne) {
        var _resposne$data82, _resposne$data82$meta;

        if (((_resposne$data82 = resposne.data) === null || _resposne$data82 === void 0 ? void 0 : (_resposne$data82$meta = _resposne$data82.meta) === null || _resposne$data82$meta === void 0 ? void 0 : _resposne$data82$meta.responsecode) === 200) {
          var _resposne$data83, _resposne$data84, _resposne$data84$meta, _resposne$data85, _resposne$data85$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data83 = resposne.data) === null || _resposne$data83 === void 0 ? void 0 : _resposne$data83.data,
            responsecode: (_resposne$data84 = resposne.data) === null || _resposne$data84 === void 0 ? void 0 : (_resposne$data84$meta = _resposne$data84.meta) === null || _resposne$data84$meta === void 0 ? void 0 : _resposne$data84$meta.responsecode,
            status: (_resposne$data85 = resposne.data) === null || _resposne$data85 === void 0 ? void 0 : (_resposne$data85$meta = _resposne$data85.meta) === null || _resposne$data85$meta === void 0 ? void 0 : _resposne$data85$meta.status,
            message: ''
          };
        } else {
          var _resposne$data86, _resposne$data86$meta, _resposne$data87, _resposne$data87$meta, _resposne$data88, _resposne$data88$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data86 = resposne.data) === null || _resposne$data86 === void 0 ? void 0 : (_resposne$data86$meta = _resposne$data86.meta) === null || _resposne$data86$meta === void 0 ? void 0 : _resposne$data86$meta.responsecode,
            status: (_resposne$data87 = resposne.data) === null || _resposne$data87 === void 0 ? void 0 : (_resposne$data87$meta = _resposne$data87.meta) === null || _resposne$data87$meta === void 0 ? void 0 : _resposne$data87$meta.status,
            message: (_resposne$data88 = resposne.data) === null || _resposne$data88 === void 0 ? void 0 : (_resposne$data88$meta = _resposne$data88.meta) === null || _resposne$data88$meta === void 0 ? void 0 : _resposne$data88$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return UserService;
}(ApiService);

var serviceEndpoint = 'mobileapp/quick';

var QuickAccessService = /*#__PURE__*/function (_ApiService) {
  _inheritsLoose(QuickAccessService, _ApiService);

  function QuickAccessService() {
    return _ApiService.apply(this, arguments) || this;
  }

  var _proto = QuickAccessService.prototype;

  _proto.RequestCallback = function RequestCallback(data) {
    try {
      var _this2 = this;

      var postData = new FormData();
      postData.append('title', data.title);
      postData.append('firstName', data.firstName);
      postData.append('lastName', data.lastName);
      postData.append('phoneNumber', data.phoneNumber);
      postData.append('email', data.email);
      postData.append('productID', data.productID);
      postData.append('userID', data.userID);
      postData.append('businessSource', (data === null || data === void 0 ? void 0 : data.businessSource) || 'Alghanim website');

      if (data !== null && data !== void 0 && data.campaignTag) {
        postData.append('campaignTag', data === null || data === void 0 ? void 0 : data.campaignTag);
      }

      var url = _this2.apiDomain + "/" + serviceEndpoint + "/savecallback";
      return Promise.resolve(post(url, postData, _this2.languageID, _this2.websiteID, _this2.subsiteID)).then(function (resposne) {
        var _resposne$data, _resposne$data$meta;

        if (((_resposne$data = resposne.data) === null || _resposne$data === void 0 ? void 0 : (_resposne$data$meta = _resposne$data.meta) === null || _resposne$data$meta === void 0 ? void 0 : _resposne$data$meta.responsecode) === 200) {
          var _resposne$data2, _resposne$data3, _resposne$data3$meta, _resposne$data4, _resposne$data4$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data2 = resposne.data) === null || _resposne$data2 === void 0 ? void 0 : _resposne$data2.data,
            responsecode: (_resposne$data3 = resposne.data) === null || _resposne$data3 === void 0 ? void 0 : (_resposne$data3$meta = _resposne$data3.meta) === null || _resposne$data3$meta === void 0 ? void 0 : _resposne$data3$meta.responsecode,
            status: (_resposne$data4 = resposne.data) === null || _resposne$data4 === void 0 ? void 0 : (_resposne$data4$meta = _resposne$data4.meta) === null || _resposne$data4$meta === void 0 ? void 0 : _resposne$data4$meta.status,
            message: ''
          };
        } else {
          var _resposne$data5, _resposne$data5$meta, _resposne$data6, _resposne$data6$meta, _resposne$data7, _resposne$data7$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data5 = resposne.data) === null || _resposne$data5 === void 0 ? void 0 : (_resposne$data5$meta = _resposne$data5.meta) === null || _resposne$data5$meta === void 0 ? void 0 : _resposne$data5$meta.responsecode,
            status: (_resposne$data6 = resposne.data) === null || _resposne$data6 === void 0 ? void 0 : (_resposne$data6$meta = _resposne$data6.meta) === null || _resposne$data6$meta === void 0 ? void 0 : _resposne$data6$meta.status,
            message: (_resposne$data7 = resposne.data) === null || _resposne$data7 === void 0 ? void 0 : (_resposne$data7$meta = _resposne$data7.meta) === null || _resposne$data7$meta === void 0 ? void 0 : _resposne$data7$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.BookTestDrive = function BookTestDrive(data) {
    try {
      var _this4 = this;

      var postData = new FormData();
      postData.append('title', data.title);
      postData.append('firstName', data.firstName);
      postData.append('lastName', data.lastName);
      postData.append('phoneNumber', data.phoneNumber);
      postData.append('email', data.email);
      postData.append('productID', data.productID);
      postData.append('userID', data.userID);
      postData.append('showroomID', data.showroomID);
      postData.append('scheduledTime', data.date);
      postData.append('comments', data.comments);
      postData.append('businessSource', (data === null || data === void 0 ? void 0 : data.businessSource) || 'Alghanim website');
      postData.append('campaignTag', (data === null || data === void 0 ? void 0 : data.campaignTag) || '');

      if (data !== null && data !== void 0 && data.addressStreet) {
        postData.append('addressStreet', data === null || data === void 0 ? void 0 : data.addressStreet);
      }

      console.log('data', data);
      var url = _this4.apiDomain + "/" + serviceEndpoint + "/bookdrive";
      return Promise.resolve(post(url, postData, _this4.languageID, _this4.websiteID, _this4.subsiteID, '', _this4.token)).then(function (resposne) {
        var _resposne$data8, _resposne$data8$meta;

        if (((_resposne$data8 = resposne.data) === null || _resposne$data8 === void 0 ? void 0 : (_resposne$data8$meta = _resposne$data8.meta) === null || _resposne$data8$meta === void 0 ? void 0 : _resposne$data8$meta.responsecode) === 200) {
          var _resposne$data9, _resposne$data10, _resposne$data10$meta, _resposne$data11, _resposne$data11$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data9 = resposne.data) === null || _resposne$data9 === void 0 ? void 0 : _resposne$data9.data,
            responsecode: (_resposne$data10 = resposne.data) === null || _resposne$data10 === void 0 ? void 0 : (_resposne$data10$meta = _resposne$data10.meta) === null || _resposne$data10$meta === void 0 ? void 0 : _resposne$data10$meta.responsecode,
            status: (_resposne$data11 = resposne.data) === null || _resposne$data11 === void 0 ? void 0 : (_resposne$data11$meta = _resposne$data11.meta) === null || _resposne$data11$meta === void 0 ? void 0 : _resposne$data11$meta.status,
            message: ''
          };
        } else {
          var _resposne$data12, _resposne$data12$meta, _resposne$data13, _resposne$data13$meta, _resposne$data14, _resposne$data14$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data12 = resposne.data) === null || _resposne$data12 === void 0 ? void 0 : (_resposne$data12$meta = _resposne$data12.meta) === null || _resposne$data12$meta === void 0 ? void 0 : _resposne$data12$meta.responsecode,
            status: (_resposne$data13 = resposne.data) === null || _resposne$data13 === void 0 ? void 0 : (_resposne$data13$meta = _resposne$data13.meta) === null || _resposne$data13$meta === void 0 ? void 0 : _resposne$data13$meta.status,
            message: (_resposne$data14 = resposne.data) === null || _resposne$data14 === void 0 ? void 0 : (_resposne$data14$meta = _resposne$data14.meta) === null || _resposne$data14$meta === void 0 ? void 0 : _resposne$data14$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.ShowRoomVisit = function ShowRoomVisit(data) {
    try {
      var _this6 = this;

      var postData = new FormData();
      postData.append('title', data.title);
      postData.append('firstName', data.firstName);
      postData.append('lastName', data.lastName);
      postData.append('phoneNumber', data.phoneNumber);
      postData.append('email', data.email);
      postData.append('productID', data.productID);
      postData.append('userID', data.userID);
      postData.append('showroomID', data.showroomID);
      postData.append('visitDay', data.date);
      postData.append('businessSource', (data === null || data === void 0 ? void 0 : data.businessSource) || 'Alghanim website');

      if (data !== null && data !== void 0 && data.campaignTag) {
        postData.append('campaignTag', data === null || data === void 0 ? void 0 : data.campaignTag);
      }

      postData.append('visitTime', data.time);
      var url = _this6.apiDomain + "/" + serviceEndpoint + "/schedulevisit";
      return Promise.resolve(post(url, postData, _this6.languageID, _this6.websiteID, _this6.subsiteID, '', _this6.token)).then(function (resposne) {
        var _resposne$data15, _resposne$data15$meta;

        if (((_resposne$data15 = resposne.data) === null || _resposne$data15 === void 0 ? void 0 : (_resposne$data15$meta = _resposne$data15.meta) === null || _resposne$data15$meta === void 0 ? void 0 : _resposne$data15$meta.responsecode) === 200) {
          var _resposne$data16, _resposne$data17, _resposne$data17$meta, _resposne$data18, _resposne$data18$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data16 = resposne.data) === null || _resposne$data16 === void 0 ? void 0 : _resposne$data16.data,
            responsecode: (_resposne$data17 = resposne.data) === null || _resposne$data17 === void 0 ? void 0 : (_resposne$data17$meta = _resposne$data17.meta) === null || _resposne$data17$meta === void 0 ? void 0 : _resposne$data17$meta.responsecode,
            status: (_resposne$data18 = resposne.data) === null || _resposne$data18 === void 0 ? void 0 : (_resposne$data18$meta = _resposne$data18.meta) === null || _resposne$data18$meta === void 0 ? void 0 : _resposne$data18$meta.status,
            message: ''
          };
        } else {
          var _resposne$data19, _resposne$data19$meta, _resposne$data20, _resposne$data20$meta, _resposne$data21, _resposne$data21$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data19 = resposne.data) === null || _resposne$data19 === void 0 ? void 0 : (_resposne$data19$meta = _resposne$data19.meta) === null || _resposne$data19$meta === void 0 ? void 0 : _resposne$data19$meta.responsecode,
            status: (_resposne$data20 = resposne.data) === null || _resposne$data20 === void 0 ? void 0 : (_resposne$data20$meta = _resposne$data20.meta) === null || _resposne$data20$meta === void 0 ? void 0 : _resposne$data20$meta.status,
            message: (_resposne$data21 = resposne.data) === null || _resposne$data21 === void 0 ? void 0 : (_resposne$data21$meta = _resposne$data21.meta) === null || _resposne$data21$meta === void 0 ? void 0 : _resposne$data21$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.RequestQuote = function RequestQuote(data) {
    try {
      var _this8 = this;

      var postData = new FormData();
      postData.append('title', data.title);
      postData.append('firstName', data.firstName);
      postData.append('lastName', data.lastName);
      postData.append('phoneNumber', data.phoneNumber);
      postData.append('email', data.email);
      postData.append('productID', data.productID);
      postData.append('userID', data.userID);
      postData.append('showroomID', data.showroomID);
      postData.append('businessSource', (data === null || data === void 0 ? void 0 : data.businessSource) || 'Alghanim website');

      if (data !== null && data !== void 0 && data.campaignTag) {
        postData.append('campaignTag', data === null || data === void 0 ? void 0 : data.campaignTag);
      }

      postData.append('comments', data.comments);
      var url = _this8.apiDomain + "/" + serviceEndpoint + "/requestquote";
      return Promise.resolve(post(url, postData, _this8.languageID, _this8.websiteID, _this8.subsiteID, '', _this8.token)).then(function (resposne) {
        var _resposne$data22, _resposne$data22$meta;

        if (((_resposne$data22 = resposne.data) === null || _resposne$data22 === void 0 ? void 0 : (_resposne$data22$meta = _resposne$data22.meta) === null || _resposne$data22$meta === void 0 ? void 0 : _resposne$data22$meta.responsecode) === 200) {
          var _resposne$data23, _resposne$data24, _resposne$data24$meta, _resposne$data25, _resposne$data25$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data23 = resposne.data) === null || _resposne$data23 === void 0 ? void 0 : _resposne$data23.data,
            responsecode: (_resposne$data24 = resposne.data) === null || _resposne$data24 === void 0 ? void 0 : (_resposne$data24$meta = _resposne$data24.meta) === null || _resposne$data24$meta === void 0 ? void 0 : _resposne$data24$meta.responsecode,
            status: (_resposne$data25 = resposne.data) === null || _resposne$data25 === void 0 ? void 0 : (_resposne$data25$meta = _resposne$data25.meta) === null || _resposne$data25$meta === void 0 ? void 0 : _resposne$data25$meta.status,
            message: ''
          };
        } else {
          var _resposne$data26, _resposne$data26$meta, _resposne$data27, _resposne$data27$meta, _resposne$data28, _resposne$data28$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data26 = resposne.data) === null || _resposne$data26 === void 0 ? void 0 : (_resposne$data26$meta = _resposne$data26.meta) === null || _resposne$data26$meta === void 0 ? void 0 : _resposne$data26$meta.responsecode,
            status: (_resposne$data27 = resposne.data) === null || _resposne$data27 === void 0 ? void 0 : (_resposne$data27$meta = _resposne$data27.meta) === null || _resposne$data27$meta === void 0 ? void 0 : _resposne$data27$meta.status,
            message: (_resposne$data28 = resposne.data) === null || _resposne$data28 === void 0 ? void 0 : (_resposne$data28$meta = _resposne$data28.meta) === null || _resposne$data28$meta === void 0 ? void 0 : _resposne$data28$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.BookService = function BookService(data) {
    try {
      var _this10 = this;

      var postData = new FormData();
      postData.append('title', data === null || data === void 0 ? void 0 : data.title);
      postData.append('firstName', data === null || data === void 0 ? void 0 : data.firstName);
      postData.append('lastName', data === null || data === void 0 ? void 0 : data.lastName);
      postData.append('phoneNumber', data === null || data === void 0 ? void 0 : data.phoneNumber);
      postData.append('email', data === null || data === void 0 ? void 0 : data.email);
      postData.append('modelID', data === null || data === void 0 ? void 0 : data.modelID);
      postData.append('userID', data === null || data === void 0 ? void 0 : data.userID);
      postData.append('showroomID', data === null || data === void 0 ? void 0 : data.showroomID);
      postData.append('vehRegNo', data === null || data === void 0 ? void 0 : data.vehRegNo);
      postData.append('mileage', data === null || data === void 0 ? void 0 : data.mileage);
      postData.append('businessSource', (data === null || data === void 0 ? void 0 : data.businessSource) || 'Alghanim website');

      if (data !== null && data !== void 0 && data.campaignTag) {
        postData.append('campaignTag', data === null || data === void 0 ? void 0 : data.campaignTag);
      }

      if (data !== null && data !== void 0 && data.doorToDoor) {
        postData.append('doorToDoor', data === null || data === void 0 ? void 0 : data.doorToDoor);
      }

      postData.append('comments', data === null || data === void 0 ? void 0 : data.comments);
      var url = _this10.apiDomain + "/mobileapp/quick/requestService/";
      return Promise.resolve(post(url, postData, _this10.languageID, _this10.websiteID, _this10.subsiteID, '', _this10.token)).then(function (resposne) {
        var _resposne$data29, _resposne$data29$meta;

        if (((_resposne$data29 = resposne.data) === null || _resposne$data29 === void 0 ? void 0 : (_resposne$data29$meta = _resposne$data29.meta) === null || _resposne$data29$meta === void 0 ? void 0 : _resposne$data29$meta.responsecode) === 200) {
          var _resposne$data30, _resposne$data31, _resposne$data31$meta, _resposne$data32, _resposne$data32$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data30 = resposne.data) === null || _resposne$data30 === void 0 ? void 0 : _resposne$data30.data,
            responsecode: (_resposne$data31 = resposne.data) === null || _resposne$data31 === void 0 ? void 0 : (_resposne$data31$meta = _resposne$data31.meta) === null || _resposne$data31$meta === void 0 ? void 0 : _resposne$data31$meta.responsecode,
            status: (_resposne$data32 = resposne.data) === null || _resposne$data32 === void 0 ? void 0 : (_resposne$data32$meta = _resposne$data32.meta) === null || _resposne$data32$meta === void 0 ? void 0 : _resposne$data32$meta.status,
            message: ''
          };
        } else {
          var _resposne$data33, _resposne$data33$meta, _resposne$data34, _resposne$data34$meta, _resposne$data35, _resposne$data35$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data33 = resposne.data) === null || _resposne$data33 === void 0 ? void 0 : (_resposne$data33$meta = _resposne$data33.meta) === null || _resposne$data33$meta === void 0 ? void 0 : _resposne$data33$meta.responsecode,
            status: (_resposne$data34 = resposne.data) === null || _resposne$data34 === void 0 ? void 0 : (_resposne$data34$meta = _resposne$data34.meta) === null || _resposne$data34$meta === void 0 ? void 0 : _resposne$data34$meta.status,
            message: (_resposne$data35 = resposne.data) === null || _resposne$data35 === void 0 ? void 0 : (_resposne$data35$meta = _resposne$data35.meta) === null || _resposne$data35$meta === void 0 ? void 0 : _resposne$data35$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.DownloadBrochure = function DownloadBrochure(data) {
    try {
      var _this12 = this;

      var postData = new FormData();
      postData.append('title', data.title);
      postData.append('firstName', data.firstName);
      postData.append('lastName', data.lastName);
      postData.append('phoneNumber', data.phoneNumber);
      postData.append('email', data.email);
      postData.append('productID', data.productID);

      if (data !== null && data !== void 0 && data.campaignTag) {
        postData.append('campaignTag', data === null || data === void 0 ? void 0 : data.campaignTag);
      }

      postData.append('businessSource', (data === null || data === void 0 ? void 0 : data.businessSource) || 'Alghanim website');
      postData.append('userID', data.userID);
      var url = _this12.apiDomain + "/" + serviceEndpoint + "/downloadbrochure";
      return Promise.resolve(post(url, postData, _this12.languageID, _this12.websiteID, _this12.subsiteID, '', _this12.token)).then(function (resposne) {
        var _resposne$data36, _resposne$data36$meta;

        if (((_resposne$data36 = resposne.data) === null || _resposne$data36 === void 0 ? void 0 : (_resposne$data36$meta = _resposne$data36.meta) === null || _resposne$data36$meta === void 0 ? void 0 : _resposne$data36$meta.responsecode) === 200) {
          var _resposne$data37, _resposne$data38, _resposne$data38$meta, _resposne$data39, _resposne$data39$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data37 = resposne.data) === null || _resposne$data37 === void 0 ? void 0 : _resposne$data37.data,
            responsecode: (_resposne$data38 = resposne.data) === null || _resposne$data38 === void 0 ? void 0 : (_resposne$data38$meta = _resposne$data38.meta) === null || _resposne$data38$meta === void 0 ? void 0 : _resposne$data38$meta.responsecode,
            status: (_resposne$data39 = resposne.data) === null || _resposne$data39 === void 0 ? void 0 : (_resposne$data39$meta = _resposne$data39.meta) === null || _resposne$data39$meta === void 0 ? void 0 : _resposne$data39$meta.status,
            message: ''
          };
        } else {
          var _resposne$data40, _resposne$data40$meta, _resposne$data41, _resposne$data41$meta, _resposne$data42, _resposne$data42$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data40 = resposne.data) === null || _resposne$data40 === void 0 ? void 0 : (_resposne$data40$meta = _resposne$data40.meta) === null || _resposne$data40$meta === void 0 ? void 0 : _resposne$data40$meta.responsecode,
            status: (_resposne$data41 = resposne.data) === null || _resposne$data41 === void 0 ? void 0 : (_resposne$data41$meta = _resposne$data41.meta) === null || _resposne$data41$meta === void 0 ? void 0 : _resposne$data41$meta.status,
            message: (_resposne$data42 = resposne.data) === null || _resposne$data42 === void 0 ? void 0 : (_resposne$data42$meta = _resposne$data42.meta) === null || _resposne$data42$meta === void 0 ? void 0 : _resposne$data42$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.NotifyMe = function NotifyMe(data) {
    try {
      var _this14 = this;

      var postData = new FormData();

      if (data !== null && data !== void 0 && data.title) {
        postData.append('title', data.title);
      }

      if (data !== null && data !== void 0 && data.firstName) {
        postData.append('firstName', data.firstName);
      }

      if (data !== null && data !== void 0 && data.lastName) {
        postData.append('lastName', data.lastName);
      }

      if (data !== null && data !== void 0 && data.phoneNumber) {
        postData.append('phoneNumber', data.phoneNumber);
      }

      if (data !== null && data !== void 0 && data.email) {
        postData.append('email', data.email);
      }

      if (data !== null && data !== void 0 && data.productID) {
        postData.append('productID', data.productID);
      }

      postData.append('comments', data.comments || '');
      postData.append('businessSource', (data === null || data === void 0 ? void 0 : data.businessSource) || 'Alghanim website');
      var url = _this14.apiDomain + "/mobileapp/catalog/postInterest/";
      return Promise.resolve(post(url, postData, _this14.languageID, _this14.websiteID, _this14.subsiteID, '', _this14.token)).then(function (resposne) {
        var _resposne$data43, _resposne$data43$meta;

        if (((_resposne$data43 = resposne.data) === null || _resposne$data43 === void 0 ? void 0 : (_resposne$data43$meta = _resposne$data43.meta) === null || _resposne$data43$meta === void 0 ? void 0 : _resposne$data43$meta.responsecode) === 200) {
          var _resposne$data44, _resposne$data45, _resposne$data45$meta, _resposne$data46, _resposne$data46$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data44 = resposne.data) === null || _resposne$data44 === void 0 ? void 0 : _resposne$data44.data,
            responsecode: (_resposne$data45 = resposne.data) === null || _resposne$data45 === void 0 ? void 0 : (_resposne$data45$meta = _resposne$data45.meta) === null || _resposne$data45$meta === void 0 ? void 0 : _resposne$data45$meta.responsecode,
            status: (_resposne$data46 = resposne.data) === null || _resposne$data46 === void 0 ? void 0 : (_resposne$data46$meta = _resposne$data46.meta) === null || _resposne$data46$meta === void 0 ? void 0 : _resposne$data46$meta.status,
            message: ''
          };
        } else {
          var _resposne$data47, _resposne$data47$meta, _resposne$data48, _resposne$data48$meta, _resposne$data49, _resposne$data49$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data47 = resposne.data) === null || _resposne$data47 === void 0 ? void 0 : (_resposne$data47$meta = _resposne$data47.meta) === null || _resposne$data47$meta === void 0 ? void 0 : _resposne$data47$meta.responsecode,
            status: (_resposne$data48 = resposne.data) === null || _resposne$data48 === void 0 ? void 0 : (_resposne$data48$meta = _resposne$data48.meta) === null || _resposne$data48$meta === void 0 ? void 0 : _resposne$data48$meta.status,
            message: (_resposne$data49 = resposne.data) === null || _resposne$data49 === void 0 ? void 0 : (_resposne$data49$meta = _resposne$data49.meta) === null || _resposne$data49$meta === void 0 ? void 0 : _resposne$data49$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.SaveEnquiry = function SaveEnquiry(data) {
    try {
      var _this16 = this;

      var postData = new FormData();
      postData.append('title', data === null || data === void 0 ? void 0 : data.title);
      postData.append('firstName', data === null || data === void 0 ? void 0 : data.firstName);
      postData.append('lastName', data === null || data === void 0 ? void 0 : data.lastName);
      postData.append('phoneNumber', data === null || data === void 0 ? void 0 : data.phoneNumber);
      postData.append('email', data === null || data === void 0 ? void 0 : data.email);

      if (data !== null && data !== void 0 && data.modelID) {
        postData.append('modelID', data === null || data === void 0 ? void 0 : data.modelID);
      }

      if (data !== null && data !== void 0 && data.variant) {
        postData.append('variant', data === null || data === void 0 ? void 0 : data.variant);
      }

      if (data !== null && data !== void 0 && data.variantSKU) {
        postData.append('variantSKU', data === null || data === void 0 ? void 0 : data.variantSKU);
      }

      if (data !== null && data !== void 0 && data.productID) {
        postData.append('productID', data === null || data === void 0 ? void 0 : data.productID);
      }

      if (data !== null && data !== void 0 && data.businessSource) {
        postData.append('businessSource', data === null || data === void 0 ? void 0 : data.businessSource);
      }

      if (data !== null && data !== void 0 && data.campaignTag) {
        postData.append('campaignTag', data === null || data === void 0 ? void 0 : data.campaignTag);
      }

      if (data !== null && data !== void 0 && data.showroomID) {
        postData.append('showroomID', data === null || data === void 0 ? void 0 : data.showroomID);
      }

      if (data !== null && data !== void 0 && data.comments) {
        postData.append('comments', data === null || data === void 0 ? void 0 : data.comments);
      }

      var url = _this16.apiDomain + "/mobileapp/quick/saveenquiry/";
      return Promise.resolve(post(url, postData, _this16.languageID, _this16.websiteID, _this16.subsiteID, '', _this16.token)).then(function (resposne) {
        var _resposne$data50, _resposne$data50$meta;

        if (((_resposne$data50 = resposne.data) === null || _resposne$data50 === void 0 ? void 0 : (_resposne$data50$meta = _resposne$data50.meta) === null || _resposne$data50$meta === void 0 ? void 0 : _resposne$data50$meta.responsecode) === 200) {
          var _resposne$data51, _resposne$data52, _resposne$data52$meta, _resposne$data53, _resposne$data53$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data51 = resposne.data) === null || _resposne$data51 === void 0 ? void 0 : _resposne$data51.data,
            responsecode: (_resposne$data52 = resposne.data) === null || _resposne$data52 === void 0 ? void 0 : (_resposne$data52$meta = _resposne$data52.meta) === null || _resposne$data52$meta === void 0 ? void 0 : _resposne$data52$meta.responsecode,
            status: (_resposne$data53 = resposne.data) === null || _resposne$data53 === void 0 ? void 0 : (_resposne$data53$meta = _resposne$data53.meta) === null || _resposne$data53$meta === void 0 ? void 0 : _resposne$data53$meta.status,
            message: ''
          };
        } else {
          var _resposne$data54, _resposne$data54$meta, _resposne$data55, _resposne$data55$meta, _resposne$data56, _resposne$data56$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data54 = resposne.data) === null || _resposne$data54 === void 0 ? void 0 : (_resposne$data54$meta = _resposne$data54.meta) === null || _resposne$data54$meta === void 0 ? void 0 : _resposne$data54$meta.responsecode,
            status: (_resposne$data55 = resposne.data) === null || _resposne$data55 === void 0 ? void 0 : (_resposne$data55$meta = _resposne$data55.meta) === null || _resposne$data55$meta === void 0 ? void 0 : _resposne$data55$meta.status,
            message: (_resposne$data56 = resposne.data) === null || _resposne$data56 === void 0 ? void 0 : (_resposne$data56$meta = _resposne$data56.meta) === null || _resposne$data56$meta === void 0 ? void 0 : _resposne$data56$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.ContactUs = function ContactUs(data) {
    try {
      var _this18 = this;

      var postData = new FormData();

      if (data !== null && data !== void 0 && data.category) {
        postData.append('category', data.category);
      }

      if (data !== null && data !== void 0 && data.firstName) {
        postData.append('firstName', data.firstName);
      }

      if (data !== null && data !== void 0 && data.lastName) {
        postData.append('lastName', data.lastName);
      }

      if (data !== null && data !== void 0 && data.phoneNumber) {
        postData.append('phoneNumber', data.phoneNumber);
      }

      if (data !== null && data !== void 0 && data.email) {
        postData.append('email', data.email);
      }

      if (data !== null && data !== void 0 && data.comments) {
        postData.append('comments', data.comments || '');
      }

      if (data !== null && data !== void 0 && data.businessSource) {
        postData.append('businessSource', (data === null || data === void 0 ? void 0 : data.businessSource) || 'Alghanim website');
      }

      if (data !== null && data !== void 0 && data.campaignTag) {
        postData.append('campaignTag', data === null || data === void 0 ? void 0 : data.campaignTag);
      }

      var url = _this18.apiDomain + "mobileapp/quick/savecontact/";
      return Promise.resolve(post(url, postData, _this18.languageID, _this18.websiteID, _this18.subsiteID, '', _this18.token)).then(function (resposne) {
        var _resposne$data57, _resposne$data57$meta;

        if (((_resposne$data57 = resposne.data) === null || _resposne$data57 === void 0 ? void 0 : (_resposne$data57$meta = _resposne$data57.meta) === null || _resposne$data57$meta === void 0 ? void 0 : _resposne$data57$meta.responsecode) === 200) {
          var _resposne$data58, _resposne$data59, _resposne$data59$meta, _resposne$data60, _resposne$data60$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data58 = resposne.data) === null || _resposne$data58 === void 0 ? void 0 : _resposne$data58.data,
            responsecode: (_resposne$data59 = resposne.data) === null || _resposne$data59 === void 0 ? void 0 : (_resposne$data59$meta = _resposne$data59.meta) === null || _resposne$data59$meta === void 0 ? void 0 : _resposne$data59$meta.responsecode,
            status: (_resposne$data60 = resposne.data) === null || _resposne$data60 === void 0 ? void 0 : (_resposne$data60$meta = _resposne$data60.meta) === null || _resposne$data60$meta === void 0 ? void 0 : _resposne$data60$meta.status,
            message: ''
          };
        } else {
          var _resposne$data61, _resposne$data61$meta, _resposne$data62, _resposne$data62$meta, _resposne$data63, _resposne$data63$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data61 = resposne.data) === null || _resposne$data61 === void 0 ? void 0 : (_resposne$data61$meta = _resposne$data61.meta) === null || _resposne$data61$meta === void 0 ? void 0 : _resposne$data61$meta.responsecode,
            status: (_resposne$data62 = resposne.data) === null || _resposne$data62 === void 0 ? void 0 : (_resposne$data62$meta = _resposne$data62.meta) === null || _resposne$data62$meta === void 0 ? void 0 : _resposne$data62$meta.status,
            message: (_resposne$data63 = resposne.data) === null || _resposne$data63 === void 0 ? void 0 : (_resposne$data63$meta = _resposne$data63.meta) === null || _resposne$data63$meta === void 0 ? void 0 : _resposne$data63$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.PartsEnquiry = function PartsEnquiry(data) {
    try {
      var _this20 = this;

      var postData = new FormData();
      postData.append('title', data === null || data === void 0 ? void 0 : data.title);
      postData.append('firstName', data === null || data === void 0 ? void 0 : data.firstName);
      postData.append('lastName', data === null || data === void 0 ? void 0 : data.lastName);
      postData.append('phoneNumber', data === null || data === void 0 ? void 0 : data.phoneNumber);
      postData.append('email', data === null || data === void 0 ? void 0 : data.email);

      if (data !== null && data !== void 0 && data.modelID) {
        postData.append('modelID', data === null || data === void 0 ? void 0 : data.modelID);
      }

      if (data !== null && data !== void 0 && data.comments) {
        postData.append('comments', data === null || data === void 0 ? void 0 : data.comments);
      }

      var url = _this20.apiDomain + "/mobileapp/quick/partsEnquiry";
      return Promise.resolve(post(url, postData, _this20.languageID, _this20.websiteID, _this20.subsiteID, '', _this20.token)).then(function (resposne) {
        var _resposne$data64, _resposne$data64$meta;

        if (((_resposne$data64 = resposne.data) === null || _resposne$data64 === void 0 ? void 0 : (_resposne$data64$meta = _resposne$data64.meta) === null || _resposne$data64$meta === void 0 ? void 0 : _resposne$data64$meta.responsecode) === 200) {
          var _resposne$data65, _resposne$data66, _resposne$data66$meta, _resposne$data67, _resposne$data67$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data65 = resposne.data) === null || _resposne$data65 === void 0 ? void 0 : _resposne$data65.data,
            responsecode: (_resposne$data66 = resposne.data) === null || _resposne$data66 === void 0 ? void 0 : (_resposne$data66$meta = _resposne$data66.meta) === null || _resposne$data66$meta === void 0 ? void 0 : _resposne$data66$meta.responsecode,
            status: (_resposne$data67 = resposne.data) === null || _resposne$data67 === void 0 ? void 0 : (_resposne$data67$meta = _resposne$data67.meta) === null || _resposne$data67$meta === void 0 ? void 0 : _resposne$data67$meta.status,
            message: ''
          };
        } else {
          var _resposne$data68, _resposne$data68$meta, _resposne$data69, _resposne$data69$meta, _resposne$data70, _resposne$data70$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data68 = resposne.data) === null || _resposne$data68 === void 0 ? void 0 : (_resposne$data68$meta = _resposne$data68.meta) === null || _resposne$data68$meta === void 0 ? void 0 : _resposne$data68$meta.responsecode,
            status: (_resposne$data69 = resposne.data) === null || _resposne$data69 === void 0 ? void 0 : (_resposne$data69$meta = _resposne$data69.meta) === null || _resposne$data69$meta === void 0 ? void 0 : _resposne$data69$meta.status,
            message: (_resposne$data70 = resposne.data) === null || _resposne$data70 === void 0 ? void 0 : (_resposne$data70$meta = _resposne$data70.meta) === null || _resposne$data70$meta === void 0 ? void 0 : _resposne$data70$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.CampaignEnquiry = function CampaignEnquiry(data) {
    try {
      var _this22 = this;

      var postData = new FormData();
      postData.append('firstName', data === null || data === void 0 ? void 0 : data.firstName);
      postData.append('lastName', data === null || data === void 0 ? void 0 : data.lastName);
      postData.append('phoneNumber', data === null || data === void 0 ? void 0 : data.phoneNumber);
      postData.append('email', data === null || data === void 0 ? void 0 : data.email);

      if (data !== null && data !== void 0 && data.businessSource) {
        postData.append('businessSource', (data === null || data === void 0 ? void 0 : data.businessSource) || 'Alghanim website');
      }

      if (data !== null && data !== void 0 && data.campaignTag) {
        postData.append('campaignTag', data === null || data === void 0 ? void 0 : data.campaignTag);
      }

      var url = _this22.apiDomain + "/mobileapp/quick/campaignEnquiry";
      return Promise.resolve(post(url, postData, _this22.languageID, _this22.websiteID, _this22.subsiteID, '', _this22.token)).then(function (resposne) {
        var _resposne$data71, _resposne$data71$meta;

        if (((_resposne$data71 = resposne.data) === null || _resposne$data71 === void 0 ? void 0 : (_resposne$data71$meta = _resposne$data71.meta) === null || _resposne$data71$meta === void 0 ? void 0 : _resposne$data71$meta.responsecode) === 200) {
          var _resposne$data72, _resposne$data73, _resposne$data73$meta, _resposne$data74, _resposne$data74$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data72 = resposne.data) === null || _resposne$data72 === void 0 ? void 0 : _resposne$data72.data,
            responsecode: (_resposne$data73 = resposne.data) === null || _resposne$data73 === void 0 ? void 0 : (_resposne$data73$meta = _resposne$data73.meta) === null || _resposne$data73$meta === void 0 ? void 0 : _resposne$data73$meta.responsecode,
            status: (_resposne$data74 = resposne.data) === null || _resposne$data74 === void 0 ? void 0 : (_resposne$data74$meta = _resposne$data74.meta) === null || _resposne$data74$meta === void 0 ? void 0 : _resposne$data74$meta.status,
            message: ''
          };
        } else {
          var _resposne$data75, _resposne$data75$meta, _resposne$data76, _resposne$data76$meta, _resposne$data77, _resposne$data77$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data75 = resposne.data) === null || _resposne$data75 === void 0 ? void 0 : (_resposne$data75$meta = _resposne$data75.meta) === null || _resposne$data75$meta === void 0 ? void 0 : _resposne$data75$meta.responsecode,
            status: (_resposne$data76 = resposne.data) === null || _resposne$data76 === void 0 ? void 0 : (_resposne$data76$meta = _resposne$data76.meta) === null || _resposne$data76$meta === void 0 ? void 0 : _resposne$data76$meta.status,
            message: (_resposne$data77 = resposne.data) === null || _resposne$data77 === void 0 ? void 0 : (_resposne$data77$meta = _resposne$data77.meta) === null || _resposne$data77$meta === void 0 ? void 0 : _resposne$data77$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return QuickAccessService;
}(ApiService);

var PaymentService = /*#__PURE__*/function (_ApiService) {
  _inheritsLoose(PaymentService, _ApiService);

  function PaymentService() {
    return _ApiService.apply(this, arguments) || this;
  }

  var _proto = PaymentService.prototype;

  _proto.gerPaymentDetails = function gerPaymentDetails(ID, configID, amount) {
    try {
      var _this2 = this;

      var url = _this2.apiDomain + "mobileapp/payment/getDetails/ID/" + ID + "/configID/" + configID + "/amount/" + amount;
      return Promise.resolve(get(url, _this2.languageID, _this2.websiteID, _this2.subsiteID, _this2.token)).then(function (resposne) {
        var _resposne$data;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data = resposne.data) === null || _resposne$data === void 0 ? void 0 : _resposne$data.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.payNow = function payNow(id, orderID) {
    try {
      var _this4 = this;

      var url = _this4.apiDomain + "mobileapp/payment/paynow/id/" + id + "/orderID/" + orderID + "/";
      return Promise.resolve(post(url, {}, _this4.languageID, _this4.websiteID, _this4.subsiteID)).then(function (resposne) {
        var _resposne$data2, _resposne$data3, _resposne$data3$meta, _resposne$data4, _resposne$data4$meta;

        return {
          data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data2 = resposne.data) === null || _resposne$data2 === void 0 ? void 0 : _resposne$data2.data,
          responsecode: (_resposne$data3 = resposne.data) === null || _resposne$data3 === void 0 ? void 0 : (_resposne$data3$meta = _resposne$data3.meta) === null || _resposne$data3$meta === void 0 ? void 0 : _resposne$data3$meta.responsecode,
          status: (_resposne$data4 = resposne.data) === null || _resposne$data4 === void 0 ? void 0 : (_resposne$data4$meta = _resposne$data4.meta) === null || _resposne$data4$meta === void 0 ? void 0 : _resposne$data4$meta.status,
          message: ''
        };
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.verifyPayment = function verifyPayment(orderNo, refNo) {
    try {
      var _this6 = this;

      var url = _this6.apiDomain + "mobileapp/payment/verifypayment/orderID/" + orderNo + "/";

      if (refNo !== '') {
        url += "reference_number/" + refNo + "/";
      }

      return Promise.resolve(get(url, _this6.languageID, _this6.websiteID, _this6.subsiteID, _this6.token)).then(function (resposne) {
        return resposne === null || resposne === void 0 ? void 0 : resposne.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return PaymentService;
}(ApiService);

var AiService = /*#__PURE__*/function (_ApiService) {
  _inheritsLoose(AiService, _ApiService);

  function AiService() {
    return _ApiService.apply(this, arguments) || this;
  }

  var _proto = AiService.prototype;

  _proto.sendTrackingCount = function sendTrackingCount(data) {
    try {
      var _this2 = this;

      var url = _this2.apiDomain + "mobileapp/ai";
      return Promise.resolve(post(url, data, _this2.languageID, _this2.websiteID, _this2.subsiteID)).then(function (resposne) {
        var _resposne$data, _resposne$data$meta;

        if (((_resposne$data = resposne.data) === null || _resposne$data === void 0 ? void 0 : (_resposne$data$meta = _resposne$data.meta) === null || _resposne$data$meta === void 0 ? void 0 : _resposne$data$meta.responsecode) === 200) {
          var _resposne$data2, _resposne$data3, _resposne$data3$meta, _resposne$data4, _resposne$data4$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data2 = resposne.data) === null || _resposne$data2 === void 0 ? void 0 : _resposne$data2.data,
            responsecode: (_resposne$data3 = resposne.data) === null || _resposne$data3 === void 0 ? void 0 : (_resposne$data3$meta = _resposne$data3.meta) === null || _resposne$data3$meta === void 0 ? void 0 : _resposne$data3$meta.responsecode,
            status: (_resposne$data4 = resposne.data) === null || _resposne$data4 === void 0 ? void 0 : (_resposne$data4$meta = _resposne$data4.meta) === null || _resposne$data4$meta === void 0 ? void 0 : _resposne$data4$meta.status,
            message: ''
          };
        } else {
          var _resposne$data5, _resposne$data5$meta, _resposne$data6, _resposne$data6$meta, _resposne$data7, _resposne$data7$meta;

          return {
            data: undefined,
            responsecode: (_resposne$data5 = resposne.data) === null || _resposne$data5 === void 0 ? void 0 : (_resposne$data5$meta = _resposne$data5.meta) === null || _resposne$data5$meta === void 0 ? void 0 : _resposne$data5$meta.responsecode,
            status: (_resposne$data6 = resposne.data) === null || _resposne$data6 === void 0 ? void 0 : (_resposne$data6$meta = _resposne$data6.meta) === null || _resposne$data6$meta === void 0 ? void 0 : _resposne$data6$meta.status,
            message: (_resposne$data7 = resposne.data) === null || _resposne$data7 === void 0 ? void 0 : (_resposne$data7$meta = _resposne$data7.meta) === null || _resposne$data7$meta === void 0 ? void 0 : _resposne$data7$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return AiService;
}(ApiService);

var DiscountService = /*#__PURE__*/function (_ApiService) {
  _inheritsLoose(DiscountService, _ApiService);

  function DiscountService() {
    return _ApiService.apply(this, arguments) || this;
  }

  var _proto = DiscountService.prototype;

  _proto.discountApproval = function discountApproval(token) {
    try {
      var _this2 = this;

      var url = _this2.apiDomain + "mobileapp/crm/getDiscountApprovals/token/" + token;
      return Promise.resolve(get(url, _this2.languageID, _this2.websiteID, _this2.subsiteID, _this2.token)).then(function (resposne) {
        return resposne === null || resposne === void 0 ? void 0 : resposne.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.discountAccept = function discountAccept(token, status, comments) {
    try {
      var _this4 = this;

      var url = _this4.apiDomain + "mobileapp/crm/discountApprovalStatusUpdate/";
      var response = post(url, {
        token: token,
        type: status,
        comments: comments
      }, _this4.languageID, _this4.websiteID, _this4.subsiteID, undefined, token).then(function (res) {
        return res.status;
      })["catch"](function (err) {
        return err.response.status;
      });
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return DiscountService;
}(ApiService);

var AppSettingsService = /*#__PURE__*/function (_ApiService) {
  _inheritsLoose(AppSettingsService, _ApiService);

  function AppSettingsService() {
    return _ApiService.apply(this, arguments) || this;
  }

  var _proto = AppSettingsService.prototype;

  _proto.getAppSettings = function getAppSettings() {
    try {
      var _this2 = this;

      var url = _this2.apiDomain + "mobileapp/index/common/";
      return Promise.resolve(get(url));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return AppSettingsService;
}(ApiService);

var BuildService = /*#__PURE__*/function (_ApiService) {
  _inheritsLoose(BuildService, _ApiService);

  function BuildService() {
    return _ApiService.apply(this, arguments) || this;
  }

  var _proto = BuildService.prototype;

  _proto.tradeInModelYearList = function tradeInModelYearList() {
    try {
      var _this2 = this;

      var url = _this2.apiDomain + "mobileapp/product/listyear";
      return Promise.resolve(get(url, _this2.languageID, _this2.websiteID, _this2.subsiteID)).then(function (resposne) {
        var _resposne$data;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data = resposne.data) === null || _resposne$data === void 0 ? void 0 : _resposne$data.result;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.tradeInBrandList = function tradeInBrandList(modelyear) {
    try {
      var _this4 = this;

      var url = _this4.apiDomain + "mobileapp/product/brands/modelyear/" + modelyear + "/";
      return Promise.resolve(get(url, _this4.languageID, _this4.websiteID, _this4.subsiteID)).then(function (resposne) {
        var _resposne$data2;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data2 = resposne.data) === null || _resposne$data2 === void 0 ? void 0 : _resposne$data2.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.tradeInModelList = function tradeInModelList(modelyear, brand) {
    try {
      var _this6 = this;

      return Promise.resolve(get(_this6.apiDomain + "mobileapp/product/models/modelyear/" + modelyear + "/brand/" + brand, _this6.languageID, _this6.websiteID, _this6.subsiteID)).then(function (resposne) {
        var _resposne$data3;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data3 = resposne.data) === null || _resposne$data3 === void 0 ? void 0 : _resposne$data3.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.tradeInTrimList = function tradeInTrimList(modelyear, brand, modelCode) {
    try {
      var _this8 = this;

      return Promise.resolve(get(_this8.apiDomain + "mobileapp/product/trim/modelyear/" + modelyear + "/brand/" + brand + "/model/" + modelCode, _this8.languageID, _this8.websiteID, _this8.subsiteID)).then(function (resposne) {
        var _resposne$data4;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data4 = resposne.data) === null || _resposne$data4 === void 0 ? void 0 : _resposne$data4.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.modelList = function modelList(modelyear) {
    try {
      var _this10 = this;

      var url = _this10.apiDomain + "mobileapp/index/modelslist/";

      if (modelyear) {
        url += "modelyear/" + modelyear + "/";
      }

      return Promise.resolve(get(url, _this10.languageID, _this10.websiteID, _this10.subsiteID)).then(function (resposne) {
        var _resposne$data5;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data5 = resposne.data) === null || _resposne$data5 === void 0 ? void 0 : _resposne$data5.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.buildPriceProductList = function buildPriceProductList(modelyear, bodytype) {
    try {
      var _this12 = this;

      var url = _this12.apiDomain + "mobileapp/index/products/";

      if (modelyear) {
        url += "modelyear/" + modelyear + "/";
      }

      if (bodytype && bodytype !== 'All') {
        url += "bodytype/" + bodytype + "/";
      }

      return Promise.resolve(get(url, _this12.languageID, _this12.websiteID, _this12.subsiteID)).then(function (resposne) {
        var _resposne$data6;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data6 = resposne.data) === null || _resposne$data6 === void 0 ? void 0 : _resposne$data6.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.buildPriceProductDetails = function buildPriceProductDetails(productId) {
    try {
      var _this14 = this;

      var url = _this14.apiDomain + "mobileapp/product/id/" + productId + "/";
      return Promise.resolve(get(url, _this14.languageID, _this14.websiteID, _this14.subsiteID)).then(function (resposne) {
        var _resposne$data7;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data7 = resposne.data) === null || _resposne$data7 === void 0 ? void 0 : _resposne$data7.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.bannerList = function bannerList() {
    try {
      var _this16 = this;

      var url = _this16.apiDomain + "mobileapp/index/banners/";
      return Promise.resolve(get(url, _this16.languageID, _this16.websiteID, _this16.subsiteID)).then(function (resposne) {
        var _resposne$data8;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data8 = resposne.data) === null || _resposne$data8 === void 0 ? void 0 : _resposne$data8.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.trimList = function trimList(modelyear, model) {
    try {
      var _this18 = this;

      var url = _this18.apiDomain + "mobileapp/catalog/index/";
      url += "modelyear/" + modelyear + "/model/" + model + "/";
      return Promise.resolve(get(url, _this18.languageID, _this18.websiteID, _this18.subsiteID)).then(function (resposne) {
        var _resposne$data9;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data9 = resposne.data) === null || _resposne$data9 === void 0 ? void 0 : _resposne$data9.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.trimWiseList = function trimWiseList(modelyear, model, trimCode) {
    try {
      var _this20 = this;

      var url = _this20.apiDomain + "mobileapp/catalog/index/";
      url += "modelyear/" + modelyear + "/model/" + model + "/trimcode/" + trimCode + "/";
      return Promise.resolve(get(url, _this20.languageID, _this20.websiteID, _this20.subsiteID)).then(function (resposne) {
        var _resposne$data10;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data10 = resposne.data) === null || _resposne$data10 === void 0 ? void 0 : _resposne$data10.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.powerProductsCompareData = function powerProductsCompareData(product) {
    try {
      var _this22 = this;

      var url = _this22.apiDomain + "mobileapp/product/compare/";
      var postData = new FormData();
      postData.append('productID', product.toString());
      return Promise.resolve(post(url, postData, _this22.languageID, _this22.websiteID, _this22.subsiteID, 'multipart/form-data')).then(function (resposne) {
        var _resposne$data11, _resposne$data11$data, _resposne$data12, _resposne$data12$data, _resposne$data13, _resposne$data13$data;

        return {
          brochure: resposne === null || resposne === void 0 ? void 0 : (_resposne$data11 = resposne.data) === null || _resposne$data11 === void 0 ? void 0 : (_resposne$data11$data = _resposne$data11.data) === null || _resposne$data11$data === void 0 ? void 0 : _resposne$data11$data.brochure,
          productsList: resposne === null || resposne === void 0 ? void 0 : (_resposne$data12 = resposne.data) === null || _resposne$data12 === void 0 ? void 0 : (_resposne$data12$data = _resposne$data12.data) === null || _resposne$data12$data === void 0 ? void 0 : _resposne$data12$data.productsList,
          attributesList: resposne === null || resposne === void 0 ? void 0 : (_resposne$data13 = resposne.data) === null || _resposne$data13 === void 0 ? void 0 : (_resposne$data13$data = _resposne$data13.data) === null || _resposne$data13$data === void 0 ? void 0 : _resposne$data13$data.attributesList
        };
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.broncoCompareData = function broncoCompareData(model, products) {
    try {
      var _this24 = this;

      var url = _this24.apiDomain + "mobileapp/catalog/compare/";
      url += "model/" + model + "/";
      var prodData = [];
      var postData = new FormData();
      products.forEach(function (product) {
        prodData.push(product.productID);
      });
      postData.append('products', JSON.stringify(prodData));
      return Promise.resolve(post(url, postData, _this24.languageID, _this24.websiteID, _this24.subsiteID, 'multipart/form-data')).then(function (resposne) {
        var _resposne$data14, _resposne$data14$data, _resposne$data15, _resposne$data15$data, _resposne$data16, _resposne$data16$data;

        return {
          brochure: resposne === null || resposne === void 0 ? void 0 : (_resposne$data14 = resposne.data) === null || _resposne$data14 === void 0 ? void 0 : (_resposne$data14$data = _resposne$data14.data) === null || _resposne$data14$data === void 0 ? void 0 : _resposne$data14$data.brochure,
          productsList: resposne === null || resposne === void 0 ? void 0 : (_resposne$data15 = resposne.data) === null || _resposne$data15 === void 0 ? void 0 : (_resposne$data15$data = _resposne$data15.data) === null || _resposne$data15$data === void 0 ? void 0 : _resposne$data15$data.productsList,
          attributesList: resposne === null || resposne === void 0 ? void 0 : (_resposne$data16 = resposne.data) === null || _resposne$data16 === void 0 ? void 0 : (_resposne$data16$data = _resposne$data16.data) === null || _resposne$data16$data === void 0 ? void 0 : _resposne$data16$data.attributesList
        };
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.trimCompareData = function trimCompareData(modelyear, model, products) {
    try {
      var _this26 = this;

      var url = _this26.apiDomain + "mobileapp/catalog/compare/";
      url += "modelyear/" + modelyear + "/model/" + model + "/";
      var prodData = [];
      var postData = new FormData();
      products.forEach(function (product) {
        prodData.push(product.productID);
      });
      postData.append('products', JSON.stringify(prodData));
      return Promise.resolve(post(url, postData, _this26.languageID, _this26.websiteID, _this26.subsiteID, 'multipart/form-data')).then(function (resposne) {
        var _resposne$data17, _resposne$data17$data, _resposne$data18, _resposne$data18$data, _resposne$data19, _resposne$data19$data;

        return {
          brochure: resposne === null || resposne === void 0 ? void 0 : (_resposne$data17 = resposne.data) === null || _resposne$data17 === void 0 ? void 0 : (_resposne$data17$data = _resposne$data17.data) === null || _resposne$data17$data === void 0 ? void 0 : _resposne$data17$data.brochure,
          productsList: resposne === null || resposne === void 0 ? void 0 : (_resposne$data18 = resposne.data) === null || _resposne$data18 === void 0 ? void 0 : (_resposne$data18$data = _resposne$data18.data) === null || _resposne$data18$data === void 0 ? void 0 : _resposne$data18$data.productsList,
          attributesList: resposne === null || resposne === void 0 ? void 0 : (_resposne$data19 = resposne.data) === null || _resposne$data19 === void 0 ? void 0 : (_resposne$data19$data = _resposne$data19.data) === null || _resposne$data19$data === void 0 ? void 0 : _resposne$data19$data.attributesList
        };
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.editionCompareData = function editionCompareData(modelyear, model, products) {
    try {
      var _this28 = this;

      var url = _this28.apiDomain + "mobileapp/catalog/compare/";
      url += "modelyear/" + modelyear + "/model/" + model + "/";
      var prodData = [];
      var postData = new FormData();
      products.forEach(function (product) {
        prodData.push(product.productID);
      });
      postData.append('products', JSON.stringify(prodData));
      return Promise.resolve(post(url, postData, _this28.languageID, _this28.websiteID, _this28.subsiteID, 'multipart/form-data')).then(function (resposne) {
        var _resposne$data20, _resposne$data20$data, _resposne$data21, _resposne$data21$data;

        return {
          productsList: resposne === null || resposne === void 0 ? void 0 : (_resposne$data20 = resposne.data) === null || _resposne$data20 === void 0 ? void 0 : (_resposne$data20$data = _resposne$data20.data) === null || _resposne$data20$data === void 0 ? void 0 : _resposne$data20$data.productsList,
          attributesList: resposne === null || resposne === void 0 ? void 0 : (_resposne$data21 = resposne.data) === null || _resposne$data21 === void 0 ? void 0 : (_resposne$data21$data = _resposne$data21.data) === null || _resposne$data21$data === void 0 ? void 0 : _resposne$data21$data.attributesList
        };
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getCombinationVariants = function getCombinationVariants(productId, customOptionID, cutomOptionVariantID) {
    try {
      var _this30 = this;

      var url = _this30.apiDomain + "mobileapp/product/getcombination/id/" + productId + "/customOptionID/" + customOptionID + "/cutomOptionVariantID/" + cutomOptionVariantID + "/";
      return Promise.resolve(get(url, _this30.languageID, _this30.websiteID, _this30.subsiteID)).then(function (resposne) {
        var _resposne$data22;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data22 = resposne.data) === null || _resposne$data22 === void 0 ? void 0 : _resposne$data22.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getCombinationPrice = function getCombinationPrice(productId, customExteriorID, cutomExteriorVariantID, customInteriorID, cutomInteriorVariantID) {
    try {
      var _this32 = this;

      var url = _this32.apiDomain + "mobileapp/product/getCombinationPrice/id/" + productId + "/customOptionIDs/" + customExteriorID + "-" + customInteriorID + "/cutomOptionVariantIDs/" + cutomExteriorVariantID + "-" + cutomInteriorVariantID + "/";
      return Promise.resolve(get(url, _this32.languageID, _this32.websiteID, _this32.subsiteID)).then(function (resposne) {
        var _resposne$data23;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data23 = resposne.data) === null || _resposne$data23 === void 0 ? void 0 : _resposne$data23.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.createCart = function createCart(productID, data) {
    try {
      var _this34 = this;

      var url = _this34.apiDomain + "mobileapp/cart/createcart/";
      var postData = getCreateCartPostData(productID, data);

      try {} catch (error) {}

      return Promise.resolve(post(url, postData, _this34.languageID, _this34.websiteID, _this34.subsiteID)).then(function (resposne) {
        var _resposne$data24, _resposne$data24$meta;

        if (((_resposne$data24 = resposne.data) === null || _resposne$data24 === void 0 ? void 0 : (_resposne$data24$meta = _resposne$data24.meta) === null || _resposne$data24$meta === void 0 ? void 0 : _resposne$data24$meta.responsecode) === 200) {
          var _resposne$data25, _resposne$data26, _resposne$data26$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data25 = resposne.data) === null || _resposne$data25 === void 0 ? void 0 : _resposne$data25.data,
            status: 'Success',
            responsecode: (_resposne$data26 = resposne.data) === null || _resposne$data26 === void 0 ? void 0 : (_resposne$data26$meta = _resposne$data26.meta) === null || _resposne$data26$meta === void 0 ? void 0 : _resposne$data26$meta.responsecode,
            message: ''
          };
        } else {
          var _resposne$data27, _resposne$data27$meta, _resposne$data28, _resposne$data28$meta;

          return {
            data: undefined,
            status: 'Failed',
            responsecode: (_resposne$data27 = resposne.data) === null || _resposne$data27 === void 0 ? void 0 : (_resposne$data27$meta = _resposne$data27.meta) === null || _resposne$data27$meta === void 0 ? void 0 : _resposne$data27$meta.responsecode,
            message: (_resposne$data28 = resposne.data) === null || _resposne$data28 === void 0 ? void 0 : (_resposne$data28$meta = _resposne$data28.meta) === null || _resposne$data28$meta === void 0 ? void 0 : _resposne$data28$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getCartDetails = function getCartDetails(cartId, configID) {
    try {
      var _this36 = this;

      var url = _this36.apiDomain + "mobileapp/cart/getcart";

      if (cartId) {
        url = url + ("/cartID/" + cartId);
      }

      if (configID) {
        url = url + ("/configID/" + configID);
      }

      return Promise.resolve(get(url, _this36.languageID, _this36.websiteID, _this36.subsiteID, _this36.token)).then(function (resposne) {
        return resposne === null || resposne === void 0 ? void 0 : resposne.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.updateCart = function updateCart(productID, data) {
    try {
      var _this38 = this;

      var url = _this38.apiDomain + "mobileapp/cart/updatecart/";
      var postData = getUpdateCartPostData(productID, data);
      postData.saveConfig = 'No';
      return Promise.resolve(post(url, postData, _this38.languageID, _this38.websiteID, _this38.subsiteID, undefined, _this38.token)).then(function (resposne) {
        var _resposne$data29, _resposne$data29$meta;

        if (((_resposne$data29 = resposne.data) === null || _resposne$data29 === void 0 ? void 0 : (_resposne$data29$meta = _resposne$data29.meta) === null || _resposne$data29$meta === void 0 ? void 0 : _resposne$data29$meta.responsecode) === 200) {
          var _resposne$data30, _resposne$data31, _resposne$data31$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data30 = resposne.data) === null || _resposne$data30 === void 0 ? void 0 : _resposne$data30.data,
            status: 'Success',
            responsecode: (_resposne$data31 = resposne.data) === null || _resposne$data31 === void 0 ? void 0 : (_resposne$data31$meta = _resposne$data31.meta) === null || _resposne$data31$meta === void 0 ? void 0 : _resposne$data31$meta.responsecode,
            message: ''
          };
        } else {
          var _resposne$data32, _resposne$data32$meta, _resposne$data33, _resposne$data33$meta;

          return {
            data: undefined,
            status: 'Failed',
            responsecode: (_resposne$data32 = resposne.data) === null || _resposne$data32 === void 0 ? void 0 : (_resposne$data32$meta = _resposne$data32.meta) === null || _resposne$data32$meta === void 0 ? void 0 : _resposne$data32$meta.responsecode,
            message: (_resposne$data33 = resposne.data) === null || _resposne$data33 === void 0 ? void 0 : (_resposne$data33$meta = _resposne$data33.meta) === null || _resposne$data33$meta === void 0 ? void 0 : _resposne$data33$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.saveConfig = function saveConfig(productID, data, configInsert) {
    try {
      var _this40 = this;

      var url = _this40.apiDomain + "mobileapp/cart/updatecart/";
      var postData = getUpdateCartPostData(productID, data);
      postData.saveConfig = 'Yes';

      if (configInsert && data.configID) {
        postData.configInsert = configInsert;

        if (configInsert === 'No') {
          postData.configID = data.configID;
        }
      }

      return Promise.resolve(post(url, postData, _this40.languageID, _this40.websiteID, _this40.subsiteID, undefined, _this40.token)).then(function (resposne) {
        var _resposne$data34, _resposne$data34$meta;

        if (((_resposne$data34 = resposne.data) === null || _resposne$data34 === void 0 ? void 0 : (_resposne$data34$meta = _resposne$data34.meta) === null || _resposne$data34$meta === void 0 ? void 0 : _resposne$data34$meta.responsecode) === 200) {
          var _resposne$data35, _resposne$data36, _resposne$data36$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data35 = resposne.data) === null || _resposne$data35 === void 0 ? void 0 : _resposne$data35.data,
            status: 'Success',
            responsecode: (_resposne$data36 = resposne.data) === null || _resposne$data36 === void 0 ? void 0 : (_resposne$data36$meta = _resposne$data36.meta) === null || _resposne$data36$meta === void 0 ? void 0 : _resposne$data36$meta.responsecode,
            message: ''
          };
        } else {
          var _resposne$data37, _resposne$data37$meta, _resposne$data38, _resposne$data38$meta;

          return {
            data: undefined,
            status: 'Failed',
            responsecode: (_resposne$data37 = resposne.data) === null || _resposne$data37 === void 0 ? void 0 : (_resposne$data37$meta = _resposne$data37.meta) === null || _resposne$data37$meta === void 0 ? void 0 : _resposne$data37$meta.responsecode,
            message: (_resposne$data38 = resposne.data) === null || _resposne$data38 === void 0 ? void 0 : (_resposne$data38$meta = _resposne$data38.meta) === null || _resposne$data38$meta === void 0 ? void 0 : _resposne$data38$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.createOnlineOrder = function createOnlineOrder(data) {
    try {
      var _this42 = this;

      var url = _this42.apiDomain + "mobileapp/cart/payment/";
      return Promise.resolve(post(url, data, _this42.languageID, _this42.websiteID, _this42.subsiteID, undefined, _this42.token)).then(function (resposne) {
        var _resposne$data39, _resposne$data39$meta;

        if (((_resposne$data39 = resposne.data) === null || _resposne$data39 === void 0 ? void 0 : (_resposne$data39$meta = _resposne$data39.meta) === null || _resposne$data39$meta === void 0 ? void 0 : _resposne$data39$meta.status) === 'Success') {
          var _resposne$data40, _resposne$data41, _resposne$data41$meta;

          return {
            data: resposne === null || resposne === void 0 ? void 0 : (_resposne$data40 = resposne.data) === null || _resposne$data40 === void 0 ? void 0 : _resposne$data40.data,
            status: (_resposne$data41 = resposne.data) === null || _resposne$data41 === void 0 ? void 0 : (_resposne$data41$meta = _resposne$data41.meta) === null || _resposne$data41$meta === void 0 ? void 0 : _resposne$data41$meta.status,
            message: ''
          };
        } else {
          var _resposne$data42, _resposne$data42$meta, _resposne$data43, _resposne$data43$meta;

          return {
            data: undefined,
            status: (_resposne$data42 = resposne.data) === null || _resposne$data42 === void 0 ? void 0 : (_resposne$data42$meta = _resposne$data42.meta) === null || _resposne$data42$meta === void 0 ? void 0 : _resposne$data42$meta.status,
            message: (_resposne$data43 = resposne.data) === null || _resposne$data43 === void 0 ? void 0 : (_resposne$data43$meta = _resposne$data43.meta) === null || _resposne$data43$meta === void 0 ? void 0 : _resposne$data43$meta.message
          };
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getBankList = function getBankList() {
    try {
      var _this44 = this;

      var url = _this44.apiDomain + "mobileapp/index/listfinance";
      return Promise.resolve(get(url, _this44.languageID, _this44.websiteID, _this44.subsiteID)).then(function (resposne) {
        var _resposne$data44;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data44 = resposne.data) === null || _resposne$data44 === void 0 ? void 0 : _resposne$data44.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getShowRoomList = function getShowRoomList() {
    try {
      var _this46 = this;

      var url = _this46.apiDomain + "mobileapp/index/showRooms/";
      return Promise.resolve(get(url, _this46.languageID, _this46.websiteID, _this46.subsiteID)).then(function (resposne) {
        var _resposne$data45;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data45 = resposne.data) === null || _resposne$data45 === void 0 ? void 0 : _resposne$data45.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.verifyOrder = function verifyOrder(orderNo, refNo) {
    try {
      var _this48 = this;

      var url = _this48.apiDomain + "mobileapp/cart/verifyOrder/order_no/" + orderNo + "/";

      if (refNo != '') {
        url += "reference_number/" + refNo + "/";
      }

      return Promise.resolve(get(url, _this48.languageID, _this48.websiteID, _this48.subsiteID, _this48.token)).then(function (resposne) {
        var _resposne$data46;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data46 = resposne.data) === null || _resposne$data46 === void 0 ? void 0 : _resposne$data46.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getOrderDetails = function getOrderDetails(orderNo, refNo) {
    try {
      var _this50 = this;

      var url = _this50.apiDomain + "mobileapp/cart/getOrder/order_no/" + orderNo + "/";

      if (refNo != '') {
        url += "reference_number/" + refNo + "/";
      }

      return Promise.resolve(get(url, _this50.languageID, _this50.websiteID, _this50.subsiteID, _this50.token)).then(function (resposne) {
        var _resposne$data47;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data47 = resposne.data) === null || _resposne$data47 === void 0 ? void 0 : _resposne$data47.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getVehicleModelList = function getVehicleModelList() {
    try {
      var _this52 = this;

      var url = _this52.apiDomain + "mobileapp/index/vehiclemodels/";
      return Promise.resolve(get(url, _this52.languageID, _this52.websiteID, _this52.subsiteID)).then(function (resposne) {
        var _resposne$data48;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data48 = resposne.data) === null || _resposne$data48 === void 0 ? void 0 : _resposne$data48.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getProductModelList = function getProductModelList(vehType) {
    try {
      var _this54 = this;

      var url = _this54.apiDomain + "mobileapp/index/productmodels/";

      if (vehType) {
        url += "vehType/" + vehType + "/";
      }

      return Promise.resolve(get(url, _this54.languageID, _this54.websiteID, _this54.subsiteID)).then(function (resposne) {
        var _resposne$data49;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data49 = resposne.data) === null || _resposne$data49 === void 0 ? void 0 : _resposne$data49.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getAllProductList = function getAllProductList(bodyTypeKey) {
    try {
      var _this56 = this;

      var url = _this56.apiDomain + "mobileapp/product/listProducts/";

      if (bodyTypeKey) {
        url += "bodyTypeKey/" + bodyTypeKey + "/";
      }

      return Promise.resolve(get(url, _this56.languageID, _this56.websiteID, _this56.subsiteID)).then(function (resposne) {
        var _resposne$data50;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data50 = resposne.data) === null || _resposne$data50 === void 0 ? void 0 : _resposne$data50.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getPowerProductList = function getPowerProductList() {
    try {
      var _this58 = this;

      var url = _this58.apiDomain + "mobileapp/product/listpowerproducts/";
      return Promise.resolve(get(url, _this58.languageID, _this58.websiteID, _this58.subsiteID)).then(function (resposne) {
        var _resposne$data51;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data51 = resposne.data) === null || _resposne$data51 === void 0 ? void 0 : _resposne$data51.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getVehicleTypeProductList = function getVehicleTypeProductList(type, modelCode) {
    try {
      var _this60 = this;

      var url = _this60.apiDomain + "mobileapp/index/vehicles/type/" + type + "/";

      if (modelCode) {
        url += "modelCode/" + modelCode + "/";
      }

      return Promise.resolve(get(url, _this60.languageID, _this60.websiteID, _this60.subsiteID)).then(function (resposne) {
        var _resposne$data52;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data52 = resposne.data) === null || _resposne$data52 === void 0 ? void 0 : _resposne$data52.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getCMSPages = function getCMSPages(pageID) {
    try {
      var _this62 = this;

      var url = _this62.apiDomain + "mobileapp/page/pageID/" + pageID + "/";
      return Promise.resolve(get(url, _this62.languageID, _this62.websiteID, _this62.subsiteID)).then(function (resposne) {
        var _resposne$data53;

        return resposne === null || resposne === void 0 ? void 0 : (_resposne$data53 = resposne.data) === null || _resposne$data53 === void 0 ? void 0 : _resposne$data53.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return BuildService;
}(ApiService);

var getCreateCartPostData = function getCreateCartPostData(productID, cart) {
  var _cart$productInfo, _cart$productInfo$com, _cart$accessoriesInfo;

  var postData;
  postData = {
    productID: productID
  };

  if (((_cart$productInfo = cart.productInfo) === null || _cart$productInfo === void 0 ? void 0 : (_cart$productInfo$com = _cart$productInfo.combinationInfo) === null || _cart$productInfo$com === void 0 ? void 0 : _cart$productInfo$com.length) > 0) {
    postData.combinationID = cart.productInfo.combinationInfo[0].combinationID;
    postData.combinationSKU = cart.productInfo.combinationInfo[0].combinationSKU;
  }

  if (((_cart$accessoriesInfo = cart.accessoriesInfo) === null || _cart$accessoriesInfo === void 0 ? void 0 : _cart$accessoriesInfo.length) > 0) {
    postData.accessoryID = cart.accessoriesInfo[0].productID;
    postData.accessoryQuantity = 1;
  }

  return postData;
};

var getUpdateCartPostData = function getUpdateCartPostData(productID, cart) {
  var _cart$productInfo2, _cart$productInfo2$co, _cart$accessoriesInfo2, _cart$serviceDetails, _cart$customerCare, _cart$extendedWarrant, _cart$selCampaignDeta, _cart$vouchers, _cart$coupons, _cart$accessoryPackag, _cart$campaignCashbac, _postData$financeDeta;

  var postData;
  postData = {
    productID: productID,
    productQuantity: 1,
    cartID: cart.cartID
  };

  if (((_cart$productInfo2 = cart.productInfo) === null || _cart$productInfo2 === void 0 ? void 0 : (_cart$productInfo2$co = _cart$productInfo2.combinationInfo) === null || _cart$productInfo2$co === void 0 ? void 0 : _cart$productInfo2$co.length) > 0) {
    postData.combinationID = cart.productInfo.combinationInfo[0].combinationID;
    postData.combinationSKU = cart.productInfo.combinationInfo[0].combinationSKU;
  }

  if (cart !== null && cart !== void 0 && cart.accessoriesInfo && (cart === null || cart === void 0 ? void 0 : (_cart$accessoriesInfo2 = cart.accessoriesInfo) === null || _cart$accessoriesInfo2 === void 0 ? void 0 : _cart$accessoriesInfo2.length) > 0) {
    var _cart$accessoriesInfo3;

    postData.accessoryDetails = cart === null || cart === void 0 ? void 0 : (_cart$accessoriesInfo3 = cart.accessoriesInfo) === null || _cart$accessoriesInfo3 === void 0 ? void 0 : _cart$accessoriesInfo3.map(function (item) {
      var _item$tintDetails, _item$tintDetails2, _item$tintDetails3, _item$tintDetails4, _item$tintDetails5;

      return {
        productID: item.productID,
        productQuantity: 1,
        tint_windshield: item === null || item === void 0 ? void 0 : (_item$tintDetails = item.tintDetails) === null || _item$tintDetails === void 0 ? void 0 : _item$tintDetails.tint_windshield,
        tint_rear: item === null || item === void 0 ? void 0 : (_item$tintDetails2 = item.tintDetails) === null || _item$tintDetails2 === void 0 ? void 0 : _item$tintDetails2.tint_rear,
        tint_row_1: item === null || item === void 0 ? void 0 : (_item$tintDetails3 = item.tintDetails) === null || _item$tintDetails3 === void 0 ? void 0 : _item$tintDetails3.tint_row_1,
        tint_row_2: item === null || item === void 0 ? void 0 : (_item$tintDetails4 = item.tintDetails) === null || _item$tintDetails4 === void 0 ? void 0 : _item$tintDetails4.tint_row_2,
        tint_row_3: item === null || item === void 0 ? void 0 : (_item$tintDetails5 = item.tintDetails) === null || _item$tintDetails5 === void 0 ? void 0 : _item$tintDetails5.tint_row_3
      };
    });
  }

  if (cart !== null && cart !== void 0 && cart.serviceDetails && (cart === null || cart === void 0 ? void 0 : (_cart$serviceDetails = cart.serviceDetails) === null || _cart$serviceDetails === void 0 ? void 0 : _cart$serviceDetails.length) > 0) {
    postData.serviceID = cart === null || cart === void 0 ? void 0 : cart.serviceDetails[0].productID;
    postData.serviceDetails = {
      productOptionID: cart === null || cart === void 0 ? void 0 : cart.serviceDetails[0].planDetails.productOptionID,
      payType: cart === null || cart === void 0 ? void 0 : cart.serviceDetails[0].planDetails.payType,
      installments: (cart === null || cart === void 0 ? void 0 : cart.serviceDetails[0].planDetails.installments) || 0,
      installmentRate: (cart === null || cart === void 0 ? void 0 : cart.serviceDetails[0].planDetails.installmentRate) || 0,
      addons: (cart === null || cart === void 0 ? void 0 : cart.serviceDetails[0].planDetails.addons) || []
    };
  }

  if (cart !== null && cart !== void 0 && cart.insuranceDetails && (cart === null || cart === void 0 ? void 0 : cart.insuranceDetails.length) > 0) {
    postData.planID = cart === null || cart === void 0 ? void 0 : cart.insuranceDetails[0].productID;
    postData.planDetails = {
      productOptionID: cart === null || cart === void 0 ? void 0 : cart.insuranceDetails[0].planDetails.productOptionID,
      payType: cart === null || cart === void 0 ? void 0 : cart.insuranceDetails[0].planDetails.payType,
      installments: cart === null || cart === void 0 ? void 0 : cart.insuranceDetails[0].planDetails.installments,
      installmentRate: cart === null || cart === void 0 ? void 0 : cart.insuranceDetails[0].planDetails.installmentRate,
      addons: cart === null || cart === void 0 ? void 0 : cart.insuranceDetails[0].planDetails.addons
    };
  }

  if (cart !== null && cart !== void 0 && cart.customerCare && (cart === null || cart === void 0 ? void 0 : (_cart$customerCare = cart.customerCare) === null || _cart$customerCare === void 0 ? void 0 : _cart$customerCare.length) > 0) {
    postData.customercareID = cart === null || cart === void 0 ? void 0 : cart.customerCare[0].productID;
    postData.customercareDetails = {
      productOptionID: cart === null || cart === void 0 ? void 0 : cart.customerCare[0].planDetails.productOptionID,
      payType: cart === null || cart === void 0 ? void 0 : cart.customerCare[0].planDetails.payType,
      installments: (cart === null || cart === void 0 ? void 0 : cart.customerCare[0].planDetails.installments) || 0,
      installmentRate: (cart === null || cart === void 0 ? void 0 : cart.customerCare[0].planDetails.installmentRate) || 0,
      addons: (cart === null || cart === void 0 ? void 0 : cart.customerCare[0].planDetails.addons) || []
    };
  }

  if (cart !== null && cart !== void 0 && cart.extendedWarranty && (cart === null || cart === void 0 ? void 0 : (_cart$extendedWarrant = cart.extendedWarranty) === null || _cart$extendedWarrant === void 0 ? void 0 : _cart$extendedWarrant.length) > 0) {
    postData.warrentyID = cart === null || cart === void 0 ? void 0 : cart.extendedWarranty[0].productID;
    postData.warrentyDetails = {
      productOptionID: cart === null || cart === void 0 ? void 0 : cart.extendedWarranty[0].planDetails.productOptionID,
      payType: cart === null || cart === void 0 ? void 0 : cart.extendedWarranty[0].planDetails.payType,
      installments: (cart === null || cart === void 0 ? void 0 : cart.extendedWarranty[0].planDetails.installments) || 0,
      installmentRate: (cart === null || cart === void 0 ? void 0 : cart.extendedWarranty[0].planDetails.installmentRate) || 0,
      addons: (cart === null || cart === void 0 ? void 0 : cart.extendedWarranty[0].planDetails.addons) || []
    };
  }

  if (cart !== null && cart !== void 0 && cart.showroomID) {
    postData.showroomID = cart === null || cart === void 0 ? void 0 : cart.showroomID;
  }

  if (cart !== null && cart !== void 0 && cart.tradeInDetails && (cart === null || cart === void 0 ? void 0 : cart.tradeInDetails.length) > 0) {
    postData.tradeIn = 'Yes';
    postData.tradeInDetails = cart.tradeInDetails.map(function (item) {
      return {
        modelYear: item.modelYear,
        brandID: item.brand,
        modelCode: item.modelCode,
        trim: item.trim,
        mileageID: item.mileage
      };
    });
  }

  if (cart !== null && cart !== void 0 && cart.financeDetails && (cart === null || cart === void 0 ? void 0 : cart.financeDetails.length) > 0) {
    if ((cart === null || cart === void 0 ? void 0 : cart.financeDetails[0].monthlyPayment) !== 0 && (cart === null || cart === void 0 ? void 0 : cart.financeDetails[0].monthlyPayment) !== undefined) {
      var _cart$financeDetails$, _cart$financeDetails$2, _cart$financeDetails$3, _cart$financeDetails$4, _cart$financeDetails$5;

      postData.financeDetails = [{
        financeType: 'monthlypayment',
        bankID: cart === null || cart === void 0 ? void 0 : cart.financeDetails[0].bankID,
        downPayment: cart === null || cart === void 0 ? void 0 : cart.financeDetails[0].downPayment,
        monthlyPayment: cart === null || cart === void 0 ? void 0 : cart.financeDetails[0].monthlyPayment,
        tenure: cart === null || cart === void 0 ? void 0 : cart.financeDetails[0].term,
        campaignID: cart === null || cart === void 0 ? void 0 : (_cart$financeDetails$ = cart.financeDetails[0]) === null || _cart$financeDetails$ === void 0 ? void 0 : _cart$financeDetails$.campaignID,
        campCashback: (cart === null || cart === void 0 ? void 0 : (_cart$financeDetails$2 = cart.financeDetails[0]) === null || _cart$financeDetails$2 === void 0 ? void 0 : _cart$financeDetails$2.campCashback) || 0,
        campDiscountPercentage: (cart === null || cart === void 0 ? void 0 : (_cart$financeDetails$3 = cart.financeDetails[0]) === null || _cart$financeDetails$3 === void 0 ? void 0 : _cart$financeDetails$3.campDiscountPercentage) || 0,
        numOfFreeEmi: (cart === null || cart === void 0 ? void 0 : (_cart$financeDetails$4 = cart.financeDetails[0]) === null || _cart$financeDetails$4 === void 0 ? void 0 : _cart$financeDetails$4.numOfFreeEmi) || 0,
        effectiveInterestRate: cart === null || cart === void 0 ? void 0 : (_cart$financeDetails$5 = cart.financeDetails[0]) === null || _cart$financeDetails$5 === void 0 ? void 0 : _cart$financeDetails$5.effectiveInterestRate
      }];
    }
  }

  if (!!((_cart$selCampaignDeta = cart.selCampaignDetails) !== null && _cart$selCampaignDeta !== void 0 && _cart$selCampaignDeta.length)) {
    var _cart$selCampaignDeta2;

    postData.selectedCampaignIDs = (_cart$selCampaignDeta2 = cart.selCampaignDetails) === null || _cart$selCampaignDeta2 === void 0 ? void 0 : _cart$selCampaignDeta2.map(function (x) {
      return x.campaignID;
    });
  }

  if (!!((_cart$vouchers = cart.vouchers) !== null && _cart$vouchers !== void 0 && _cart$vouchers.length)) {
    var _cart$vouchers2;

    postData.cashVoucherIDs = (_cart$vouchers2 = cart.vouchers) === null || _cart$vouchers2 === void 0 ? void 0 : _cart$vouchers2.map(function (x) {
      return x.cashVoucherID;
    });
  }

  if (!!((_cart$coupons = cart.coupons) !== null && _cart$coupons !== void 0 && _cart$coupons.length)) {
    var _cart$coupons2;

    postData.couponCashBackCode = (_cart$coupons2 = cart.coupons) === null || _cart$coupons2 === void 0 ? void 0 : _cart$coupons2.map(function (x) {
      return x.couponCode;
    });
  }

  if (cart !== null && cart !== void 0 && cart.accessoryPackages && (cart === null || cart === void 0 ? void 0 : (_cart$accessoryPackag = cart.accessoryPackages) === null || _cart$accessoryPackag === void 0 ? void 0 : _cart$accessoryPackag.length) > 0) {
    var _cart$accessoryPackag2;

    postData.accessoryPackages = (_cart$accessoryPackag2 = cart.accessoryPackages) === null || _cart$accessoryPackag2 === void 0 ? void 0 : _cart$accessoryPackag2.map(function (x) {
      var _x$tintOptions, _x$tintOptions3;

      var obj = {
        packageID: x.packageID,
        packagePrice: x.packagePrice
      };

      if ((_x$tintOptions = x.tintOptions) !== null && _x$tintOptions !== void 0 && _x$tintOptions.windsheild) {
        var _x$tintOptions2, _x$tintOptions2$winds;

        obj.tint_windsheild = {
          productID: (_x$tintOptions2 = x.tintOptions) === null || _x$tintOptions2 === void 0 ? void 0 : (_x$tintOptions2$winds = _x$tintOptions2.windsheild) === null || _x$tintOptions2$winds === void 0 ? void 0 : _x$tintOptions2$winds.productID,
          productQuantity: 1
        };
      }

      if ((_x$tintOptions3 = x.tintOptions) !== null && _x$tintOptions3 !== void 0 && _x$tintOptions3.rear) {
        var _x$tintOptions4, _x$tintOptions4$rear;

        obj.tint_rear = {
          productID: (_x$tintOptions4 = x.tintOptions) === null || _x$tintOptions4 === void 0 ? void 0 : (_x$tintOptions4$rear = _x$tintOptions4.rear) === null || _x$tintOptions4$rear === void 0 ? void 0 : _x$tintOptions4$rear.productID,
          productQuantity: 1
        };
      }

      for (var i = 0; i < ((_x$tint = x.tint) === null || _x$tint === void 0 ? void 0 : _x$tint.tintRows); i++) {
        var _x$tint, _x$tintOptions5;

        if ((_x$tintOptions5 = x.tintOptions) !== null && _x$tintOptions5 !== void 0 && _x$tintOptions5["row_" + (i + 1)]) {
          var _x$tintOptions6, _x$tintOptions6$;

          obj["tint_row_" + (i + 1)] = {
            productID: (_x$tintOptions6 = x.tintOptions) === null || _x$tintOptions6 === void 0 ? void 0 : (_x$tintOptions6$ = _x$tintOptions6["row_" + (i + 1)]) === null || _x$tintOptions6$ === void 0 ? void 0 : _x$tintOptions6$.productID,
            productQuantity: 1
          };
        }
      }

      if (x.accessories) {
        var _x$accessories;

        obj.accessories = (_x$accessories = x.accessories) === null || _x$accessories === void 0 ? void 0 : _x$accessories.map(function (a) {
          return {
            productID: a.productID,
            productQuantity: 1
          };
        });
      }

      return obj;
    });
  }

  if (!!((_cart$campaignCashbac = cart.campaignCashbackItems) !== null && _cart$campaignCashbac !== void 0 && _cart$campaignCashbac.length)) {
    postData.campaignCashbackItems = cart.campaignCashbackItems;
  }

  if ((_postData$financeDeta = postData.financeDetails) !== null && _postData$financeDeta !== void 0 && _postData$financeDeta.length) {
    var _postData$financeDeta2, _postData$selCampaign;

    var finance = (_postData$financeDeta2 = postData.financeDetails) === null || _postData$financeDeta2 === void 0 ? void 0 : _postData$financeDeta2[0];

    if (finance.campaignID && !((_postData$selCampaign = postData.selCampaignDetails) !== null && _postData$selCampaign !== void 0 && _postData$selCampaign.some(function (c) {
      return c.campaignID === (finance === null || finance === void 0 ? void 0 : finance.campaignID);
    }))) {
      delete finance.campCashback;
      delete finance.campaignID;
      delete finance.campDiscountPercentage;
      delete finance.numOfFreeEmi;
      postData.financeDetails = [finance];
    }
  }

  return postData;
};

var AlghanimApiClient = /*#__PURE__*/function () {
  function AlghanimApiClient(apiDomain, cmsDomain) {
    this.store = {
      apiDomain: '',
      cmsDomain: '',
      token: undefined,
      languageID: undefined,
      subsiteID: undefined,
      websiteID: undefined,
      currencyID: undefined
    };
    this.store.apiDomain = apiDomain;
    this.store.cmsDomain = cmsDomain;
    this.crud = new CrudService(this.store);
    this.user = new UserService(this.store);
    this.build = new BuildService(this.store);
    this.appSettings = new AppSettingsService(this.store);
    this.quickAccess = new QuickAccessService(this.store);
    this.payment = new PaymentService(this.store);
    this.ai = new AiService(this.store);
    this.discount = new DiscountService(this.store);
  }

  var _proto = AlghanimApiClient.prototype;

  _proto.setToken = function setToken(token) {
    this.store.token = token;
  };

  _proto.setCmsDomain = function setCmsDomain(token) {
    this.store.token = token;
  };

  _proto.setLanguageID = function setLanguageID(id) {
    this.store.languageID = id;
  };

  _proto.setWebsiteID = function setWebsiteID(id) {
    this.store.websiteID = id;
  };

  _proto.setSubsiteID = function setSubsiteID(id) {
    this.store.subsiteID = id;
  };

  _proto.setCurrencyID = function setCurrencyID(id) {
    this.store.currencyID = id;
  };

  return AlghanimApiClient;
}();

var api = new AlghanimApiClient(API_DOMAIN || '', CMS_DOMAIN);

var commonTypes = {
  RESET_DATA: 'COMMON/RESET_DATA',
  HEADER_MENU_TOGGLE: 'COMMON/HEADER_MENU_TOGGLE',
  OUTER_CLASS_UPDATE: 'COMMON/OUTER_CLASS_UPDATE',
  REQUEST_CALLBACK_TOGGLE: 'COMMON/REQUEST_CALLBACK_TOGGLE',
  BOOK_TEST_DRIVE_TOGGLE: 'COMMON/BOOK_TEST_DRIVE_TOGGLE',
  DOWNLOAD_BROCHURE_TOGGLE: 'COMMON/DOWNLOAD_BROCHURE_TOGGLE',
  REQUEST_QUOTE_TOGGLE: 'COMMON/REQUEST_QUOTE_TOGGLE',
  SHEDULE_SHOWROOM_VISIT_TOGGLE: 'COMMON/SHEDULE_SHOWROOM_VISIT_TOGGLE',
  FINANCE_POPUP_TOGGLE: 'COMMON/FINANCE_POPUP_TOGGLE',
  SERVICE_POPUP_TOGGLE: 'COMMON/SERVICE_POPUP_TOGGLE',
  FETCH_PROFILE_REQUEST: 'AUTH/FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS: 'AUTH/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_ERROR: 'AUTH/FETCH_PROFILE_ERROR'
};
var initialState = {
  headerMenuOpen: false,
  bookTestDrivePopupOpen: false,
  downloadBrochurePopupOpen: false,
  requestCallbackPopUpOpen: false,
  requestQuotePopupOpen: false,
  sheduleShoroomVisitPopupOpen: false,
  financePopupOpen: false,
  servicePopupOpen: false,
  outerClassName: ''
};
var commonReducer = function commonReducer(state, action) {
  if (state === void 0) {
    state = initialState;
  }

  switch (action.type) {
    case commonTypes.HEADER_MENU_TOGGLE:
      return _extends({}, state, {
        headerMenuOpen: !state.headerMenuOpen
      });

    case commonTypes.SERVICE_POPUP_TOGGLE:
      return _extends({}, state, {
        servicePopupOpen: !state.servicePopupOpen
      });

    case commonTypes.FINANCE_POPUP_TOGGLE:
      return _extends({}, state, {
        financePopupOpen: !state.financePopupOpen
      });

    case commonTypes.OUTER_CLASS_UPDATE:
      return _extends({}, state, {
        outerClassName: action.payload.data
      });

    case commonTypes.REQUEST_CALLBACK_TOGGLE:
      return _extends({}, state, {
        requestCallbackPopUpOpen: !state.requestCallbackPopUpOpen
      });

    case commonTypes.BOOK_TEST_DRIVE_TOGGLE:
      return _extends({}, state, {
        bookTestDrivePopupOpen: !state.bookTestDrivePopupOpen
      });

    case commonTypes.DOWNLOAD_BROCHURE_TOGGLE:
      return _extends({}, state, {
        downloadBrochurePopupOpen: !state.downloadBrochurePopupOpen
      });

    case commonTypes.REQUEST_QUOTE_TOGGLE:
      return _extends({}, state, {
        requestQuotePopupOpen: !state.requestQuotePopupOpen
      });

    case commonTypes.SHEDULE_SHOWROOM_VISIT_TOGGLE:
      return _extends({}, state, {
        sheduleShoroomVisitPopupOpen: !state.sheduleShoroomVisitPopupOpen
      });

    default:
      return state;
  }
};
var commonActions = {
  clearData: function clearData(onComplete) {
    return function (dispatch) {
      try {
        return Promise.resolve(dispatch({
          type: commonTypes.RESET_DATA
        })).then(function () {
          if (onComplete) {
            onComplete();
          }
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  toggleMenu: function toggleMenu() {
    return function (dispatch) {
      try {
        return Promise.resolve(dispatch({
          type: commonTypes.HEADER_MENU_TOGGLE
        })).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  toggleRequestCallback: function toggleRequestCallback() {
    return function (dispatch) {
      try {
        return Promise.resolve(dispatch({
          type: commonTypes.REQUEST_CALLBACK_TOGGLE
        })).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  toggleBookTestDrive: function toggleBookTestDrive() {
    return function (dispatch) {
      try {
        return Promise.resolve(dispatch({
          type: commonTypes.BOOK_TEST_DRIVE_TOGGLE
        })).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  toggleDownloadBrochure: function toggleDownloadBrochure() {
    return function (dispatch) {
      try {
        return Promise.resolve(dispatch({
          type: commonTypes.DOWNLOAD_BROCHURE_TOGGLE
        })).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  toggleRequestQuote: function toggleRequestQuote() {
    return function (dispatch) {
      try {
        return Promise.resolve(dispatch({
          type: commonTypes.REQUEST_QUOTE_TOGGLE
        })).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  toggleSheduleShowroomVisit: function toggleSheduleShowroomVisit() {
    return function (dispatch) {
      try {
        return Promise.resolve(dispatch({
          type: commonTypes.SHEDULE_SHOWROOM_VISIT_TOGGLE
        })).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  toggleFinancePopUp: function toggleFinancePopUp() {
    return function (dispatch) {
      try {
        return Promise.resolve(dispatch({
          type: commonTypes.FINANCE_POPUP_TOGGLE
        })).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  toggleServicePopUp: function toggleServicePopUp() {
    return function (dispatch) {
      try {
        return Promise.resolve(dispatch({
          type: commonTypes.SERVICE_POPUP_TOGGLE
        })).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  updateOuterClassName: function updateOuterClassName(outerClassName) {
    return function (dispatch) {
      try {
        return Promise.resolve(dispatch({
          type: commonTypes.OUTER_CLASS_UPDATE,
          payload: {
            data: outerClassName
          }
        })).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

var types = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_ERROR: 'AUTH/LOGIN_ERROR',
  FB_LOGIN_REQUEST: 'AUTH/FB_LOGINLOGIN_REQUEST',
  FB_LOGIN_SUCCESS: 'AUTH/FB_LOGINLOGIN_SUCCESS',
  FB_LOGIN_ERROR: 'AUTH/FB_LOGINLOGIN_ERROR',
  GOOGLE_LOGIN_REQUEST: 'AUTH/GOOGLE_LOGINLOGIN_REQUEST',
  GOOGLE_LOGIN_SUCCESS: 'AUTH/GOOGLE_LOGINLOGIN_SUCCESS',
  GOOGLE_LOGIN_ERROR: 'AUTH/GOOGLE_LOGINLOGIN_ERROR',
  LOGOUT: 'AUTH/LOGOUT',
  REDIRECT_SAVE: 'AUTH/REDIRECT_SAVE',
  REDIRECT_APPLY: 'AUTH/REDIRECT_APPLY',
  SIGN_UP_REQUEST: 'AUTH/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'AUTH/SIGN_UP_SUCCESS',
  SIGN_UP_ERROR: 'AUTH/SIGN_UP_ERROR'
};
var initialState$1 = {
  isLoading: false,
  redirectTo: '/'
};
var authReducer = function authReducer(state, action) {
  if (state === void 0) {
    state = initialState$1;
  }

  switch (action.type) {
    case types.LOGIN_REQUEST:
      return _extends({}, state, {
        isLoading: true,
        userLogin: action.data ? action.data.userLogin : state.userLogin,
        loginError: undefined
      });

    case types.LOGIN_SUCCESS:
      return _extends({}, state, {
        isLoading: false,
        token: action.data.userToken,
        user: action.data,
        loginError: undefined
      });

    case types.LOGIN_ERROR:
      return _extends({}, state, {
        isLoading: false,
        token: undefined,
        loginError: action.data ? action.data.errorMessage : undefined
      });

    case types.SIGN_UP_REQUEST:
      return _extends({}, state, {
        isLoading: true,
        otpError: undefined
      });

    case types.SIGN_UP_SUCCESS:
      return _extends({}, state, {
        isLoading: false,
        token: action.data.userToken,
        user: action.data,
        otpError: undefined
      });

    case types.SIGN_UP_ERROR:
      return _extends({}, state, {
        isLoading: false,
        token: undefined,
        otpError: action.data ? action.data.errorMessage : undefined
      });

    case types.FB_LOGIN_REQUEST:
      return _extends({}, state, {
        isLoading: true,
        fbLoginError: undefined
      });

    case types.FB_LOGIN_SUCCESS:
      return _extends({}, state, {
        isLoading: false,
        token: action.data.userToken,
        user: action.data,
        fbLoginError: undefined
      });

    case types.FB_LOGIN_ERROR:
      return _extends({}, state, {
        isLoading: false,
        token: undefined,
        fbLoginError: action.data ? action.data.errorMessage : undefined
      });

    case types.GOOGLE_LOGIN_REQUEST:
      return _extends({}, state, {
        isLoading: true,
        googleLoginError: undefined
      });

    case types.GOOGLE_LOGIN_SUCCESS:
      return _extends({}, state, {
        isLoading: false,
        token: action.data.userToken,
        user: action.data,
        googleLoginError: undefined
      });

    case types.GOOGLE_LOGIN_ERROR:
      return _extends({}, state, {
        isLoading: false,
        token: undefined,
        googleLoginError: action.data ? action.data.errorMessage : undefined
      });

    case types.LOGOUT:
      api.setToken(undefined);
      return _extends({}, state, {
        token: undefined,
        user: undefined
      });

    case commonTypes.RESET_DATA:
      return _extends({}, initialState$1, {
        userLogin: state.userLogin,
        countryCode: state.countryCode,
        startingCode: state.startingCode,
        phoneNumber: state.phoneNumber
      });

    case types.REDIRECT_SAVE:
      return _extends({}, state, {
        redirectTo: action.data
      });

    case types.REDIRECT_APPLY:
      return _extends({}, state, {
        redirectTo: '/'
      });

    default:
      return state;
  }
};
var authActions = {
  login: function login(data, onSuccess) {
    return function (dispatch) {
      try {
        dispatch({
          type: types.LOGIN_REQUEST,
          data: {
            userLogin: data.userLogin
          }
        });

        var _temp2 = _catch(function () {
          return Promise.resolve(api.user.login(data)).then(function (response) {
            var _response$data;

            if (((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.verified) !== false) {
              dispatch({
                type: types.LOGIN_SUCCESS,
                data: response.data
              });
              api.setToken(response.data.userToken);
            }

            if (onSuccess) {
              var _response$data2, _response$data3, _response$data4, _response$data5;

              onSuccess((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.userID, (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.userToken, (_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.verified, (_response$data5 = response.data) === null || _response$data5 === void 0 ? void 0 : _response$data5.customerId);
            }
          });
        }, function () {
          dispatch({
            type: types.LOGIN_ERROR,
            data: {
              errorMessage: 'Invalid Username or Password!'
            }
          });
        });

        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  verifyOtp: function verifyOtp(data, onSuccess) {
    return function (dispatch) {
      try {
        dispatch({
          type: types.SIGN_UP_REQUEST
        });

        var _temp4 = _catch(function () {
          return Promise.resolve(api.user.verifyOtp(data)).then(function (response) {
            if ((response === null || response === void 0 ? void 0 : response.responsecode) === 500) {
              dispatch({
                type: types.SIGN_UP_ERROR,
                data: {
                  errorMessage: (response === null || response === void 0 ? void 0 : response.message) || 'Invalid OTP!'
                }
              });
            } else {
              var _response$data6, _response$data7, _response$data8, _response$data9;

              dispatch({
                type: types.SIGN_UP_SUCCESS,
                data: response.data
              });
              api.setToken(response.data.userToken);
              if (onSuccess) onSuccess((_response$data6 = response.data) === null || _response$data6 === void 0 ? void 0 : _response$data6.userID, (_response$data7 = response.data) === null || _response$data7 === void 0 ? void 0 : _response$data7.userToken, (_response$data8 = response.data) === null || _response$data8 === void 0 ? void 0 : _response$data8.verified, (_response$data9 = response.data) === null || _response$data9 === void 0 ? void 0 : _response$data9.customerId);
            }
          });
        }, function () {
          dispatch({
            type: types.SIGN_UP_ERROR,
            data: {
              errorMessage: 'Invalid OTP!'
            }
          });
        });

        return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  fbLogin: function fbLogin(data, onSuccess, onError) {
    return function (dispatch) {
      try {
        dispatch({
          type: types.FB_LOGIN_REQUEST
        });

        var _temp6 = _catch(function () {
          return Promise.resolve(api.user.fbUserSignup(data)).then(function (response) {
            var _response$data10, _response$data11, _response$data12, _response$data13;

            dispatch({
              type: types.FB_LOGIN_SUCCESS,
              data: response.data
            });
            api.setToken(response.data.userToken);
            if (onSuccess) onSuccess((_response$data10 = response.data) === null || _response$data10 === void 0 ? void 0 : _response$data10.userID, (_response$data11 = response.data) === null || _response$data11 === void 0 ? void 0 : _response$data11.userToken, (_response$data12 = response.data) === null || _response$data12 === void 0 ? void 0 : _response$data12.verified, (_response$data13 = response.data) === null || _response$data13 === void 0 ? void 0 : _response$data13.customerId);
          });
        }, function () {
          if (onError) onError();
          dispatch({
            type: types.FB_LOGIN_ERROR,
            data: {
              errorMessage: 'Un able to fetch details'
            }
          });
        });

        return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  googleLogin: function googleLogin(data, onSuccess, onError) {
    return function (dispatch) {
      try {
        dispatch({
          type: types.GOOGLE_LOGIN_REQUEST
        });

        var _temp8 = _catch(function () {
          return Promise.resolve(api.user.googleUserSignup(data)).then(function (response) {
            var _response$data14, _response$data15, _response$data16, _response$data17;

            if ((response === null || response === void 0 ? void 0 : response.message) === 'verify_phonenumber') {} else {
              api.setToken(response.data.userToken);
              dispatch({
                type: types.GOOGLE_LOGIN_SUCCESS,
                data: response.data
              });
            }

            if (onSuccess) onSuccess((_response$data14 = response.data) === null || _response$data14 === void 0 ? void 0 : _response$data14.userID, (_response$data15 = response.data) === null || _response$data15 === void 0 ? void 0 : _response$data15.userToken, (_response$data16 = response.data) === null || _response$data16 === void 0 ? void 0 : _response$data16.verified, (_response$data17 = response.data) === null || _response$data17 === void 0 ? void 0 : _response$data17.customerId);
          });
        }, function () {
          if (onError) onError();
          dispatch({
            type: types.GOOGLE_LOGIN_ERROR,
            data: {
              errorMessage: 'Un able to fetch details'
            }
          });
        });

        return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  logout: function logout(onSuccess) {
    return function (dispatch) {
      try {
        dispatch({
          type: types.LOGOUT
        });
        if (onSuccess) onSuccess();
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  redirectSave: function redirectSave(to) {
    return function (dispatch) {
      try {
        dispatch({
          type: types.REDIRECT_SAVE,
          data: to
        });
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  redirectApply: function redirectApply() {
    return function (dispatch) {
      return dispatch({
        type: types.REDIRECT_APPLY
      });
    };
  }
};

var UseUnauthorizedApiResponseInterceptor = function UseUnauthorizedApiResponseInterceptor(onUnauthorizedResponse) {
  axios.interceptors.response.use(undefined, function (err) {
    if (err.response && err.response.status === 401) {
      if (onUnauthorizedResponse) {
        onUnauthorizedResponse();
      }
    }

    throw err;
  });
};

var buildPriceTypes = {
  PRODUCT_LIST: 'BUILD_PRICE/PRODUCT_LIST',
  PRODUCT_LIST_REQUEST: 'BUILD_PRICE/PRODUCT_LIST_REQUEST',
  PRODUCT_LIST_ERROR: 'BUILD_PRICE/PRODUCT_LIST_ERROR',
  MODEL_LIST: 'BUILD_PRICE/MODEL_LIST',
  MODEL_REQUEST: 'BUILD_PRICE/MODEL_REQUEST',
  MODEL_ERROR: 'BUILD_PRICE/MODEL_ERROR',
  BODY_TYPE_LIST: 'BUILD_PRICE/BODY_TYPE_LIST',
  BODY_TYPE_REQUEST: 'BUILD_PRICE/BODY_TYPE_REQUEST',
  BODY_TYPE_ERROR: 'BUILD_PRICE/BODY_TYPE_ERROR',
  PRODUCT_FILTER: 'BUILD_PRICE/PRODUCT_FILTER',
  BANNER_LIST: 'BUILD_PRICE/BANNER_LIST',
  BANNER_REQUEST: 'BUILD_PRICE/BANNER_REQUEST',
  BANNER_ERROR: 'BUILD_PRICE/BANNER_ERROR'
};
var initialState$2 = {
  modelyear: 0,
  bodytype: '',
  productsList: [],
  modelsList: [],
  bodytypesList: [],
  bodyModelLoaded: false,
  bodyModelLoading: false,
  productLoaded: false,
  productLoading: false
};
var buildPriceReducer = function buildPriceReducer(state, action) {
  var _action$data, _action$data2, _action$data3;

  if (state === void 0) {
    state = initialState$2;
  }

  switch (action.type) {
    case buildPriceTypes.PRODUCT_LIST_REQUEST:
      return _extends({}, state, {
        productLoaded: false,
        productLoading: true
      });

    case buildPriceTypes.PRODUCT_LIST_ERROR:
      return _extends({}, state, {
        productsList: [],
        productLoaded: true,
        productLoading: false
      });

    case buildPriceTypes.PRODUCT_LIST:
      return _extends({}, state, {
        productsList: action.data ? (_action$data = action.data) === null || _action$data === void 0 ? void 0 : _action$data.productsList : state.productsList,
        modelyear: action.data ? (_action$data2 = action.data) === null || _action$data2 === void 0 ? void 0 : _action$data2.modelyear : state.modelyear,
        bodytype: action.data ? (_action$data3 = action.data) === null || _action$data3 === void 0 ? void 0 : _action$data3.bodytype : state.bodytype,
        productLoaded: true,
        productLoading: false
      });

    case buildPriceTypes.MODEL_LIST:
      return _extends({}, state, {
        modelsList: action.data ? action.data.modelsList : state.modelsList,
        bodyModelLoaded: true,
        bodyModelLoading: false
      });

    case buildPriceTypes.MODEL_ERROR:
      return _extends({}, state, {
        bodyModelLoaded: true,
        bodyModelLoading: false
      });

    case buildPriceTypes.MODEL_REQUEST:
      return _extends({}, state, {
        bodyModelLoaded: false,
        bodyModelLoading: true
      });

    case buildPriceTypes.BODY_TYPE_LIST:
      console.log('state', state);
      return _extends({}, state, {
        bodytypesList: action.data ? action.data.bodytypesList : state.bodytypesList,
        bodyTypeLoaded: true,
        bodyTypeLoading: false
      });

    case buildPriceTypes.BODY_TYPE_ERROR:
      return _extends({}, state, {
        bodyTypeLoaded: true,
        bodyTypeLoading: false
      });

    case buildPriceTypes.BODY_TYPE_REQUEST:
      return _extends({}, state, {
        bodyTypeLoaded: false,
        bodyTypeLoading: true
      });

    case buildPriceTypes.PRODUCT_FILTER:
      return _extends({}, state, {
        modelyear: action.modelyear,
        bodytype: action.bodytype
      });

    case buildPriceTypes.BANNER_LIST:
      return _extends({}, state, {
        bannerList: action.data ? action.data.bannerList : state.bannerList,
        bannerLoaded: true,
        bannerLoading: false
      });

    case buildPriceTypes.BANNER_ERROR:
      return _extends({}, state, {
        bannerLoaded: true,
        bannerLoading: false
      });

    case buildPriceTypes.BANNER_REQUEST:
      return _extends({}, state, {
        bannerLoaded: false,
        bannerLoading: true
      });

    default:
      return state;
  }
};
var BuildPriceActions = {
  getProductList: function getProductList(modelyear, bodytype, onSuccess) {
    return function (dispatch) {
      try {
        dispatch({
          type: buildPriceTypes.PRODUCT_LIST_REQUEST
        });
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.buildPriceProductList(modelyear, bodytype)).then(function (response) {
            dispatch({
              type: buildPriceTypes.PRODUCT_LIST,
              data: response
            });

            if (onSuccess) {
              onSuccess();
            }
          });
        }, function (error) {
          dispatch({
            type: buildPriceTypes.PRODUCT_LIST_ERROR,
            data: []
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  getModelList: function getModelList(modelyear) {
    return function (dispatch) {
      try {
        dispatch({
          type: buildPriceTypes.MODEL_REQUEST
        });
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.modelList(modelyear)).then(function (response) {
            dispatch({
              type: buildPriceTypes.MODEL_LIST,
              data: response
            });
          });
        }, function (error) {
          dispatch({
            type: buildPriceTypes.MODEL_ERROR,
            data: []
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  getBodyTypeList: function getBodyTypeList(modelyear) {
    return function (dispatch) {
      try {
        dispatch({
          type: buildPriceTypes.BODY_TYPE_REQUEST
        });
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.modelList(modelyear)).then(function (response) {
            dispatch({
              type: buildPriceTypes.BODY_TYPE_LIST,
              data: response
            });
          });
        }, function (error) {
          dispatch({
            type: buildPriceTypes.BODY_TYPE_ERROR,
            data: []
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  getBannerList: function getBannerList() {
    return function (dispatch) {
      try {
        dispatch({
          type: buildPriceTypes.BANNER_REQUEST
        });
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.bannerList()).then(function (response) {
            dispatch({
              type: buildPriceTypes.BANNER_LIST,
              data: response
            });
          });
        }, function (error) {
          dispatch({
            type: buildPriceTypes.BANNER_ERROR,
            data: []
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  updateFilter: function updateFilter(modelyear, bodytype) {
    return function (dispatch) {
      try {
        dispatch({
          type: buildPriceTypes.PRODUCT_FILTER,
          modelyear: modelyear,
          bodytype: bodytype
        });
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

var capitalizeFirstLetter = function capitalizeFirstLetter(text) {
  if (!text) {
    return text;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};
var capitalizeAllFirstLettersOfWords = function capitalizeAllFirstLettersOfWords(text) {
  if (!text) {
    return text;
  }

  return text.split(' ').map(capitalizeFirstLetter).join(' ');
};
var numberWithCommas = function numberWithCommas(x, isExemptZero) {
  if (isExemptZero === true) {
    if (x === undefined) {
      return '';
    }

    var retString = '';

    if (typeof x === 'string') {
      var _parseFloat;

      retString = numberFormat((_parseFloat = parseFloat(x)) === null || _parseFloat === void 0 ? void 0 : _parseFloat.toFixed(2)).split('.')[0];
    } else {
      retString = numberFormat(x === null || x === void 0 ? void 0 : x.toFixed(2)).split('.')[0];
    }

    return retString;
  } else {
    if (x === undefined) {
      return '';
    }

    if (typeof x === 'string') {
      var _parseFloat2;

      return numberFormat((_parseFloat2 = parseFloat(x)) === null || _parseFloat2 === void 0 ? void 0 : _parseFloat2.toFixed(2));
    }

    return numberFormat(x === null || x === void 0 ? void 0 : x.toFixed(2));
  }
};

var trimVarientActionTypes = {
  PRODUCT_VARIENTS: 'TRIM/VARIENTS'
};
var initialState$3 = {
  isLoading: false,
  data: {
    pageTitle: '',
    productsList: []
  }
};
var trimVarientsReducer = function trimVarientsReducer(state, action) {
  if (state === void 0) {
    state = initialState$3;
  }

  switch (action.type) {
    case trimVarientActionTypes.PRODUCT_VARIENTS:
      return _extends({}, state, {
        isLoading: true,
        data: action.data ? action.data : state.data
      });

    default:
      return state;
  }
};
var TrimVarientActions = {
  getTrimVarients: function getTrimVarients(_, onSuccess) {
    return function (dispatch) {
      try {
        try {
          dispatch({
            type: trimVarientActionTypes.PRODUCT_VARIENTS,
            data: {
              page_title: '2020 Tahova',
              products_list: products
            }
          });

          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          dispatch({
            type: trimVarientActionTypes.PRODUCT_VARIENTS,
            data: []
          });
          throw error;
        }

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};
var products = [{
  productId: '1',
  productTitle: 'TAHOE LS 1',
  productDescription: 'About product',
  productImage: 'path/product_image.jpg',
  previewImage: 'path/preview_image.jpg',
  salesPrice: '12,999',
  offerPrice: '12,999',
  productUrl: 'tahow-ls-1',
  productCurrency: 'KWD',
  productModel: 'TAHOE',
  bodyType: 'LS',
  productMedia: [{
    Image: 'path/image.jpg',
    Angle: '180'
  }]
}, {
  productId: '2',
  productTitle: 'TAHOE LS 2',
  productDescription: 'About product',
  productImage: 'path/product_image.jpg',
  previewImage: 'path/preview_image.jpg',
  salesPrice: '12,999',
  offerPrice: '12,999',
  productUrl: 'tahow-ls-1',
  productCurrency: 'KWD',
  productModel: 'TAHOE',
  bodyType: 'LS',
  productMedia: [{
    Image: 'path/image.jpg',
    Angle: '180'
  }]
}, {
  productId: '3',
  productTitle: 'TAHOE LS 3',
  productDescription: 'About product',
  productImage: 'path/product_image.jpg',
  previewImage: 'path/preview_image.jpg',
  salesPrice: '12,999',
  offerPrice: '12,999',
  productUrl: 'tahow-ls-1',
  productCurrency: 'KWD',
  productModel: 'TAHOE',
  bodyType: 'LS',
  productMedia: [{
    Image: 'path/image.jpg',
    Angle: '180'
  }]
}, {
  productId: '4',
  productTitle: 'TAHOE LS 4',
  productDescription: 'About product',
  productImage: 'path/product_image.jpg',
  previewImage: 'path/preview_image.jpg',
  salesPrice: '12,999',
  offerPrice: '12,999',
  productUrl: 'tahow-ls-1',
  productCurrency: 'KWD',
  productModel: 'TAHOE',
  bodyType: 'LS',
  productMedia: [{
    Image: 'path/image.jpg',
    Angle: '180'
  }]
}, {
  productId: '5',
  productTitle: 'TAHOE LS 5',
  productDescription: 'About product',
  productImage: 'path/product_image.jpg',
  previewImage: 'path/preview_image.jpg',
  salesPrice: '12,999',
  offerPrice: '12,999',
  productUrl: 'tahow-ls-1',
  productCurrency: 'KWD',
  productModel: 'TAHOE',
  bodyType: 'LS',
  productMedia: [{
    Image: 'path/image.jpg',
    Angle: '180'
  }]
}];

var compareVarientActionTypes = {
  COMPARE_VARIENTS: 'COMPARE/VARIENTS'
};
var initialState$4 = {
  brochure: '',
  productsList: [],
  attributesList: []
};
var compareVarientsReducer = function compareVarientsReducer(state, action) {
  if (state === void 0) {
    state = initialState$4;
  }

  switch (action.type) {
    case compareVarientActionTypes.COMPARE_VARIENTS:
      return _extends({
        isLoading: true
      }, action.data);

    default:
      return state;
  }
};
var CompareVarientActions = {
  getCompareVarients: function getCompareVarients(_, onSuccess) {
    return function (dispatch) {
      try {
        try {
          dispatch({
            type: compareVarientActionTypes.COMPARE_VARIENTS,
            data: compareData
          });

          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          dispatch({
            type: compareVarientActionTypes.COMPARE_VARIENTS,
            data: []
          });
          throw error;
        }

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};
var compareData = {
  brochure: '',
  productsList: [{
    productID: 1,
    productTitle: 'CAMARO H72',
    productImage: 'https://sariya.oorjit.net/alghanim-ecom/public/uploads/catalog/product/thumb/d/o/download__2030251747.jpg',
    salesPrice: 400,
    offerPrice: 1,
    productUrl: '2020-camaro-coupe-lt-v6-auto-t-m',
    productCurrency: 'KWD',
    modelCode: 'camaro',
    attributes: [{
      attributeGroupName: 'Exterior',
      attrOptions: [{
        attrName: 'Intermittent Front and Rear Wipers',
        attrOptValue: 'Standard'
      }, {
        attrName: 'Rain Sensing Front Wipers',
        attrOptValue: 'Standard'
      }, {
        attrName: 'Rear vision camera',
        attrOptValue: 'Standard'
      }]
    }, {
      attributeGroupName: 'Interior',
      attrOptions: [{
        attrName: 'Fold-flat second- and third-row seats',
        attrOptValue: 'Standard'
      }, {
        attrName: 'Remote vehicle starter system',
        attrOptValue: 'Standard'
      }]
    }]
  }, {
    productID: 2,
    productTitle: 'CAMARO H72',
    productImage: 'https://sariya.oorjit.net/alghanim-ecom/public/uploads/catalog/product/thumb/2/5/25360346148__1182340892.jpg',
    salesPrice: 3000,
    offerPrice: 1,
    productUrl: '2020-camaro-coupe-2lt-v6-auto-t-m-full-option-leather',
    productCurrency: 'KWD',
    modelCode: 'camaro',
    attributes: [{
      attributeGroupName: 'Exterior',
      attrOptions: [{
        attrName: 'Intermittent Front and Rear Wipers',
        attrOptValue: 'Standard'
      }, {
        attrName: 'Rain Sensing Front Wipers',
        attrOptValue: 'Standard'
      }, {
        attrName: 'Rear vision camera',
        attrOptValue: 'Standard'
      }]
    }, {
      attributeGroupName: 'Interior',
      attrOptions: [{
        attrName: 'Fold-flat second- and third-row seats',
        attrOptValue: 'Standard'
      }, {
        attrName: 'Remote vehicle starter system',
        attrOptValue: 'Standard'
      }]
    }]
  }],
  attributesList: [{
    attributeGroupName: 'Exterior',
    attrOptions: [{
      attrName: 'Intermittent Front and Rear Wipers',
      attrOptValue: 'Standard'
    }, {
      attrName: 'Rain Sensing Front Wipers',
      attrOptValue: 'Standard'
    }, {
      attrName: 'Rear vision camera',
      attrOptValue: 'Standard'
    }]
  }, {
    attributeGroupName: 'Interior',
    attrOptions: [{
      attrName: 'Fold-flat second- and third-row seats',
      attrOptValue: 'Standard'
    }, {
      attrName: 'Remote vehicle starter system',
      attrOptValue: 'Standard'
    }]
  }]
};

var editionVarientActionTypes = {
  EDITION_VARIENTS: 'EDITION/VARIENTS'
};
var initialState$5 = {
  isLoading: false,
  data: {
    pageTitle: '',
    productsList: []
  }
};
var editionVarientsReducer = function editionVarientsReducer(state, action) {
  if (state === void 0) {
    state = initialState$5;
  }

  switch (action.type) {
    case editionVarientActionTypes.EDITION_VARIENTS:
      return _extends({}, state, {
        isLoading: true,
        data: action.data ? action.data : state.data
      });

    default:
      return state;
  }
};
var EditionVarientActions = {
  getEditionVarients: function getEditionVarients(_, onSuccess) {
    return function (dispatch) {
      try {
        try {
          dispatch({
            type: editionVarientActionTypes.EDITION_VARIENTS,
            data: {
              page_title: '2020 Tahova',
              products_list: products$1
            }
          });

          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          dispatch({
            type: editionVarientActionTypes.EDITION_VARIENTS,
            data: []
          });
          throw error;
        }

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};
var products$1 = [{
  productId: '1',
  productTitle: 'TAHOE LS 1',
  productDescription: 'About product',
  productImage: 'path/product_image.jpg',
  previewImage: 'path/preview_image.jpg',
  salesPrice: '12,999',
  offerPrice: '12,999',
  productUrl: 'tahow-ls-1',
  productCurrency: 'KWD',
  productModel: 'TAHOE',
  bodyType: 'LS',
  productMedia: [{
    Image: 'path/image.jpg',
    Angle: '180'
  }]
}, {
  productId: '2',
  productTitle: 'TAHOE LS 2',
  productDescription: 'About product',
  productImage: 'path/product_image.jpg',
  previewImage: 'path/preview_image.jpg',
  salesPrice: '12,999',
  offerPrice: '12,999',
  productUrl: 'tahow-ls-1',
  productCurrency: 'KWD',
  productModel: 'TAHOE',
  bodyType: 'LS',
  productMedia: [{
    Image: 'path/image.jpg',
    Angle: '180'
  }]
}, {
  productId: '3',
  productTitle: 'TAHOE LS 3',
  productDescription: 'About product',
  productImage: 'path/product_image.jpg',
  previewImage: 'path/preview_image.jpg',
  salesPrice: '12,999',
  offerPrice: '12,999',
  productUrl: 'tahow-ls-1',
  productCurrency: 'KWD',
  productModel: 'TAHOE',
  bodyType: 'LS',
  productMedia: [{
    Image: 'path/image.jpg',
    Angle: '180'
  }]
}, {
  productId: '4',
  productTitle: 'TAHOE LS 4',
  productDescription: 'About product',
  productImage: 'path/product_image.jpg',
  previewImage: 'path/preview_image.jpg',
  salesPrice: '12,999',
  offerPrice: '12,999',
  productUrl: 'tahow-ls-1',
  productCurrency: 'KWD',
  productModel: 'TAHOE',
  bodyType: 'LS',
  productMedia: [{
    Image: 'path/image.jpg',
    Angle: '180'
  }]
}, {
  productId: '5',
  productTitle: 'TAHOE LS 5',
  productDescription: 'About product',
  productImage: 'path/product_image.jpg',
  previewImage: 'path/preview_image.jpg',
  salesPrice: '12,999',
  offerPrice: '12,999',
  productUrl: 'tahow-ls-1',
  productCurrency: 'KWD',
  productModel: 'TAHOE',
  bodyType: 'LS',
  productMedia: [{
    Image: 'path/image.jpg',
    Angle: '180'
  }]
}];

var initialProductInfoModelCart = {
  cartItemID: 0,
  productID: 0,
  productTitle: '',
  saleslPrice: '',
  offerPrice: '',
  customOptionsInfo: [],
  combinationInfo: [],
  tradeInDiscount: 0
};
var initialCartStateModelState = {
  isLoading: true,
  cartID: undefined,
  userID: 0,
  netPrice: 0,
  productBasePrice: 0,
  tplPrice: 0,
  registrationPrice: 0,
  productCurrency: '',
  showroomID: 0,
  tradeIn: '',
  productInfo: initialProductInfoModelCart,
  accessoriesInfo: [],
  insuranceDetails: [],
  serviceDetails: [],
  customerCare: [],
  extendedWarranty: [],
  financeDetails: [],
  tradeInDetails: [],
  configID: 0,
  configurationID: 0
};

var cartActionTypes = {
  UPDATE_CART: 'CART/UPDATE',
  GET_CART: 'CART/GET',
  CLEAR_CART: 'CART/CLEAR',
  UPDATE_BASE_PRICE: 'CART/UPDATE_BASE_PRICE',
  UPDATE_DEFAULT_INTERIOR: 'CART/UPDATE_DEFAULT_INTERIOR',
  UPDATE_COMBINATION_PRICE: 'CART/UPDATE_COMBINATION_PRICE',
  UPDATE_CART_PRODUCT_ID: 'CART/UPDATE_CART_PRODUCT_ID',
  UPDATE_SHOW_ROOMID: 'CART/UPDATE_SHOW_ROOMID'
};
var cartReducer = function cartReducer(state, action) {
  var _combinationData$cust, _combinationData$comb, _combinationData1$com;

  if (state === void 0) {
    state = initialCartStateModelState;
  }

  switch (action.type) {
    case cartActionTypes.CLEAR_CART:
      return _extends({}, action.data, {
        isLoading: true
      });

    case cartActionTypes.UPDATE_CART:
      return _extends({}, action.data, {
        isLoading: true,
        configurationID: null
      });

    case cartActionTypes.GET_CART:
      return _extends({}, action.data, {
        configurationID: action.configID,
        isLoading: true
      });

    case cartActionTypes.UPDATE_SHOW_ROOMID:
      return _extends({}, state, {
        showroomID: action.data,
        isLoading: true
      });

    case cartActionTypes.UPDATE_BASE_PRICE:
      return _extends({}, action.data, {
        isLoading: true
      });

    case cartActionTypes.UPDATE_DEFAULT_INTERIOR:
      var combinationData = action.data;
      var cartInteriorDataIndex = state.productInfo.customOptionsInfo.findIndex(function (item) {
        return item.customOptionName.toUpperCase() === 'INTERIOR';
      });
      var stateData = cloneDeep(state);

      if ((combinationData === null || combinationData === void 0 ? void 0 : (_combinationData$cust = combinationData.customoptionsList) === null || _combinationData$cust === void 0 ? void 0 : _combinationData$cust.length) > 0) {
        var combInteriorData = combinationData === null || combinationData === void 0 ? void 0 : combinationData.customoptionsList[0].variants.find(function (item) {
          return item.isDefault === 1;
        });

        if (combInteriorData) {
          var cartInteriorData = getCartCustOption(combInteriorData, combinationData.customoptionsList[0].customOptionID, combinationData.customoptionsList[0].customOptionName);

          if (cartInteriorDataIndex >= 0) {
            stateData.productInfo.customOptionsInfo.splice(cartInteriorDataIndex, 1, cartInteriorData);
          } else {
            stateData.productInfo.customOptionsInfo.push(cartInteriorData);
          }
        }
      }

      if (combinationData !== null && combinationData !== void 0 && combinationData.combinationInfo && (combinationData === null || combinationData === void 0 ? void 0 : (_combinationData$comb = combinationData.combinationInfo) === null || _combinationData$comb === void 0 ? void 0 : _combinationData$comb.length) > 0) {
        var _stateData$tpl, _stateData$tpl$, _stateData$registrati, _stateData$registrati2;

        var combData = combinationData.combinationInfo[0];
        var cartCombination = {
          combinationID: 0,
          combinationSKU: '',
          combinationPrice: 0,
          combinationMedia: []
        };
        cartCombination.combinationID = combData.combinationID;
        cartCombination.combinationSKU = combData.combinationSKU;
        cartCombination.combinationPrice = combData.combinationSalesPrice;
        cartCombination.combinationMedia = combData.combinationMedia;
        stateData.netPrice = (((_stateData$tpl = stateData.tpl) === null || _stateData$tpl === void 0 ? void 0 : (_stateData$tpl$ = _stateData$tpl[0]) === null || _stateData$tpl$ === void 0 ? void 0 : _stateData$tpl$.offerPrice) || 0) + (((_stateData$registrati = stateData.registration) === null || _stateData$registrati === void 0 ? void 0 : (_stateData$registrati2 = _stateData$registrati[0]) === null || _stateData$registrati2 === void 0 ? void 0 : _stateData$registrati2.offerPrice) || 0) + combData.combinationOfferPrice;
        stateData.productInfo.combinationInfo = [cartCombination];
      } else {
        stateData.productInfo.combinationInfo = [];
      }

      return stateData;

    case cartActionTypes.UPDATE_COMBINATION_PRICE:
      var combinationData1 = action.data;
      var stateData1 = cloneDeep(state);

      if ((combinationData1 === null || combinationData1 === void 0 ? void 0 : (_combinationData1$com = combinationData1.combinationInfo) === null || _combinationData1$com === void 0 ? void 0 : _combinationData1$com.length) > 0) {
        var _stateData1$tpl, _stateData1$tpl$, _stateData1$registrat, _stateData1$registrat2;

        var _combData = combinationData1.combinationInfo[0];
        var _cartCombination = {
          combinationID: 0,
          combinationSKU: '',
          combinationPrice: 0,
          combinationMedia: []
        };
        _cartCombination.combinationID = _combData.combinationID;
        _cartCombination.combinationSKU = _combData.combinationSKU;
        _cartCombination.combinationPrice = _combData.combinationOfferPrice;
        _cartCombination.combinationMedia = _combData.combinationMedia;
        stateData1.netPrice = (((_stateData1$tpl = stateData1.tpl) === null || _stateData1$tpl === void 0 ? void 0 : (_stateData1$tpl$ = _stateData1$tpl[0]) === null || _stateData1$tpl$ === void 0 ? void 0 : _stateData1$tpl$.offerPrice) || 0) + (((_stateData1$registrat = stateData1.registration) === null || _stateData1$registrat === void 0 ? void 0 : (_stateData1$registrat2 = _stateData1$registrat[0]) === null || _stateData1$registrat2 === void 0 ? void 0 : _stateData1$registrat2.offerPrice) || 0) + _combData.combinationOfferPrice;
        stateData1.productInfo.combinationInfo = [_cartCombination];
      }

      return stateData1;

    case cartActionTypes.UPDATE_CART_PRODUCT_ID:
      var stateData2 = cloneDeep(state);
      return stateData2;

    default:
      return state;
  }
};

var getCartCustOption = function getCartCustOption(item, customOptionId, customOptionName) {
  var custOption = {
    customOptionID: 0,
    customOptionName: '',
    variantID: 0,
    variantName: '',
    variantThumbImage: '',
    priceDiff: 0
  };
  custOption.variantID = item.cutomOptionVariantID;
  custOption.variantThumbImage = item.variantThumbImage;
  custOption.variantName = item.value;
  custOption.customOptionID = customOptionId;
  custOption.customOptionName = customOptionName;
  custOption.priceDiff = item.priceDiff;
  return custOption;
};

var CartActions = {
  clearCart: function clearCart(onSuccess) {
    return function (dispatch) {
      try {
        dispatch({
          type: cartActionTypes.UPDATE_CART,
          data: cloneDeep(initialCartStateModelState)
        });

        if (onSuccess) {
          onSuccess();
        }

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  updateShowRoomId: function updateShowRoomId(id) {
    return function (dispatch) {
      try {
        try {
          dispatch({
            type: cartActionTypes.UPDATE_SHOW_ROOMID,
            data: id
          });
        } catch (error) {
          throw error;
        }

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  addToCart: function addToCart(cart, onSuccess) {
    return function (dispatch) {
      try {
        try {
          dispatch({
            type: cartActionTypes.UPDATE_CART,
            data: cart
          });

          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          dispatch({
            type: cartActionTypes.UPDATE_CART,
            data: []
          });
          throw error;
        }

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  getCartDetails: function getCartDetails(cartId, configID, onSuccess) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.getCartDetails(cartId, configID)).then(function (response) {
            var _response$meta;

            if ((response === null || response === void 0 ? void 0 : (_response$meta = response.meta) === null || _response$meta === void 0 ? void 0 : _response$meta.responsecode) === 200) {
              dispatch({
                type: cartActionTypes.GET_CART,
                data: response === null || response === void 0 ? void 0 : response.data,
                configID: configID
              });
            } else {}

            if (onSuccess) {
              onSuccess();
            }
          });
        }, function (error) {
          dispatch({
            type: cartActionTypes.UPDATE_CART,
            data: []
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

var initialState$6 = {
  combinationInfo: [],
  customoptionsList: [],
  isFound: true
};
var combinationDetailsReducer = function combinationDetailsReducer(state, action) {
  var _action$data;

  if (state === void 0) {
    state = initialState$6;
  }

  switch (action.type) {
    case combinationDetailsActionTypes.COMBINATION_DETAILS:
      return _extends({}, action.data, {
        isFound: action.data ? true : false
      });

    case combinationDetailsActionTypes.COMBINATION_DETAILS:
      return {
        combinationInfo: ((_action$data = action.data) === null || _action$data === void 0 ? void 0 : _action$data.combinationInfo) || [],
        customoptionsList: state.customoptionsList || []
      };

    default:
      return state;
  }
};
var combinationDetailsActionTypes = {
  COMBINATION_DETAILS: 'COMBINATION_DETAILS',
  COMBINATION_PRICE_DETAILS: 'COMBINATION_PRICE_DETAILS'
};
var CombinationDetailsActions = {
  getCombinationDetails: function getCombinationDetails(prodcuctId, customOptionID, customOptionVariantID, onSuccess) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.getCombinationVariants(prodcuctId, customOptionID, customOptionVariantID)).then(function (response) {
            return Promise.resolve(dispatch({
              type: combinationDetailsActionTypes.COMBINATION_DETAILS,
              data: response
            })).then(function () {
              return Promise.resolve(dispatch({
                type: cartActionTypes.UPDATE_DEFAULT_INTERIOR,
                data: response
              })).then(function () {
                if (onSuccess) {
                  onSuccess();
                }
              });
            });
          });
        }, function (error) {
          dispatch({
            type: combinationDetailsActionTypes.COMBINATION_DETAILS,
            data: []
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  getCombinationPrice: function getCombinationPrice(prodcuctId, customExteriorID, cutomExteriorVariantID, customInteriorID, cutomInteriorVariantID, onSuccess) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.getCombinationPrice(prodcuctId, customExteriorID, cutomExteriorVariantID, customInteriorID, cutomInteriorVariantID)).then(function (response) {
            return Promise.resolve(dispatch({
              type: combinationDetailsActionTypes.COMBINATION_PRICE_DETAILS,
              data: response
            })).then(function () {
              return Promise.resolve(dispatch({
                type: cartActionTypes.UPDATE_COMBINATION_PRICE,
                data: response
              })).then(function () {
                if (onSuccess) {
                  onSuccess();
                }
              });
            });
          });
        }, function (error) {
          dispatch({
            type: combinationDetailsActionTypes.COMBINATION_DETAILS,
            data: []
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

var EcomCampaignAppliedItem = function EcomCampaignAppliedItem() {};
var CampaignFinanceOffer = function CampaignFinanceOffer() {};

var initialState$7 = {
  isLoading: false,
  productDetails: undefined,
  accessories: [],
  servicesList: [],
  insurancesList: [],
  maxDownPayment: 0,
  showroomsList: [],
  bankDetails: [],
  modelsList: [],
  customerCarePackages: [],
  extendedWarrenty: [],
  registrationPrice: [],
  tplPrice: [],
  accessoryPackages: []
};
var productDetailsReducer = function productDetailsReducer(state, action) {
  if (state === void 0) {
    state = initialState$7;
  }

  switch (action.type) {
    case productDetailsActionTypes.PRODUCT_DETAILS:
      return _extends({
        isLoading: true
      }, action.data);

    default:
      return state;
  }
};
var productDetailsActionTypes = {
  PRODUCT_DETAILS: 'PRODUCT_DETAILS',
  PRODUCT_DETAILS_CLEAR: 'PRODUCT_DETAILS_CLEAR'
};
var ProductDetailsActions = {
  clearProductDetails: function clearProductDetails() {
    return function (dispatch) {
      try {
        try {
          console.log('productDetailsActionTypes.PRODUCT_DETAILS_CLEAR', initialState$7);
          dispatch({
            type: productDetailsActionTypes.PRODUCT_DETAILS_CLEAR,
            data: cloneDeep$1(initialState$7)
          });
        } catch (error) {
          dispatch({
            type: productDetailsActionTypes.PRODUCT_DETAILS,
            data: []
          });
          throw error;
        }

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  getProductDetails: function getProductDetails(id, onSuccess) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.buildPriceProductDetails(id)).then(function (response) {
            var _response$productDeta, _response$productDeta2;

            dispatch({
              type: productDetailsActionTypes.PRODUCT_DETAILS,
              data: response
            });
            dispatch({
              type: combinationDetailsActionTypes.COMBINATION_DETAILS,
              data: {
                customoptionsList: response === null || response === void 0 ? void 0 : (_response$productDeta = response.productDetails) === null || _response$productDeta === void 0 ? void 0 : _response$productDeta.customoptionsList,
                combinationInfo: response === null || response === void 0 ? void 0 : (_response$productDeta2 = response.productDetails) === null || _response$productDeta2 === void 0 ? void 0 : _response$productDeta2.combinations
              }
            });

            if (onSuccess) {
              onSuccess();
            }
          });
        }, function (error) {
          dispatch({
            type: productDetailsActionTypes.PRODUCT_DETAILS,
            data: []
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

var TradeInActionTypes = {
  TRADEIN_MODEL_YEAR: 'TRADEIN/MODEL_YEAR',
  TRADEIN_BRANDS: 'TRADEIN/BRANDS',
  TRADEIN_MODELS: 'TRADEIN/MODELS',
  TRADEIN_TRIMS: 'TRADEIN/TRIMS'
};

var TradeInActions = {
  getModelYearList: function getModelYearList(onSuccess) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.tradeInModelYearList()).then(function (response) {
            dispatch({
              type: TradeInActionTypes.TRADEIN_MODEL_YEAR,
              data: response
            });

            if (onSuccess) {
              onSuccess();
            }
          });
        }, function (error) {
          dispatch({
            type: TradeInActionTypes.TRADEIN_BRANDS,
            data: []
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  getBrandList: function getBrandList(year, onSuccess) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.tradeInBrandList(year)).then(function (response) {
            dispatch({
              type: TradeInActionTypes.TRADEIN_BRANDS,
              data: response
            });

            if (onSuccess) {
              onSuccess();
            }
          });
        }, function (error) {
          dispatch({
            type: TradeInActionTypes.TRADEIN_BRANDS,
            data: []
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  getModelList: function getModelList(year, brand, onSuccess) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.tradeInModelList(year, brand)).then(function (response) {
            dispatch({
              type: TradeInActionTypes.TRADEIN_MODELS,
              data: response
            });

            if (onSuccess) {
              onSuccess();
            }
          });
        }, function (error) {
          dispatch({
            type: TradeInActionTypes.TRADEIN_MODELS,
            data: {}
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  getTrimList: function getTrimList(modelyear, brand, modelCode, onSuccess) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.tradeInTrimList(modelyear, brand, modelCode)).then(function (response) {
            dispatch({
              type: TradeInActionTypes.TRADEIN_TRIMS,
              data: response
            });

            if (onSuccess) {
              onSuccess();
            }
          });
        }, function (error) {
          dispatch({
            type: TradeInActionTypes.TRADEIN_TRIMS,
            data: {}
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

var initialStateTradeInBrandModel = {
  isLoading: false,
  brandsList: []
};
var tradeInBrandData = {
  isLoading: false,
  brandsList: [{
    brandName: 'CHEVROLET'
  }, {
    brandName: 'FORD'
  }]
};

var tradeInBrandReducer = function tradeInBrandReducer(state, action) {
  if (state === void 0) {
    state = initialStateTradeInBrandModel;
  }

  switch (action.type) {
    case TradeInActionTypes.TRADEIN_BRANDS:
      return {
        isLoading: true,
        brandsList: action.data ? action.data.brandsList : state.brandsList
      };

    default:
      return state;
  }
};

var initialStateTradeInTrimModel = {
  isLoading: false,
  trimList: []
};

var tradeInMileageReducer = function tradeInMileageReducer(state, action) {
  if (state === void 0) {
    state = initialStateTradeInTrimModel;
  }

  switch (action.type) {
    case TradeInActionTypes.TRADEIN_TRIMS:
      return {
        isLoading: false,
        trimList: action.data ? action.data.trimList : state.trimList
      };

    default:
      return state;
  }
};

var initialStateTradeInModel = {
  isLoading: false,
  modelsList: []
};
var tradeInModelData = {
  isLoading: false,
  modelsList: [{
    modelCode: 'CHEVROLET'
  }]
};

var tradeInModelReducer = function tradeInModelReducer(state, action) {
  if (state === void 0) {
    state = initialStateTradeInModel;
  }

  switch (action.type) {
    case TradeInActionTypes.TRADEIN_MODELS:
      return {
        isLoading: true,
        modelsList: action.data ? action.data.modelsList : state.modelsList
      };

    default:
      return state;
  }
};

var initialStateTradeInModelYear = {
  isLoading: false,
  modelsYears: []
};

var tradeInModelYearReducer = function tradeInModelYearReducer(state, action) {
  if (state === void 0) {
    state = initialStateTradeInModelYear;
  }

  switch (action.type) {
    case TradeInActionTypes.TRADEIN_MODEL_YEAR:
      return {
        isLoading: true,
        modelsYears: action.data ? action.data : state.modelsYears
      };

    default:
      return state;
  }
};

var initialAppSettingsStateViewModel = {
  loaded: false,
  loading: false,
  htmlDirection: 'ltr'
};

var createActionWithPayload = function createActionWithPayload(type, payload) {
  var actionData = {
    type: type,
    payload: payload
  };
  return actionData;
};
var createAction = function createAction(type) {
  var actionData = {
    type: type
  };
  return actionData;
};

var appSettingsReducer = function appSettingsReducer(state, action) {
  if (state === void 0) {
    state = initialAppSettingsStateViewModel;
  }

  switch (action.type) {
    case appSettingsActionTypes.REQUEST:
      return _extends({}, state, {
        loading: true,
        loaded: false
      });

    case appSettingsActionTypes.LOADED:
      if (!state.languageID) {
        var _action$payload, _action$payload$langu, _action$payload3, _action$payload3$curr, _action$payload5, _action$payload5$webs, _action$payload7, _action$payload7$subs;

        if (((_action$payload = action.payload) === null || _action$payload === void 0 ? void 0 : (_action$payload$langu = _action$payload.languagesList) === null || _action$payload$langu === void 0 ? void 0 : _action$payload$langu.length) > 0) {
          var _action$payload2, _action$payload2$lang;

          api.setLanguageID((_action$payload2 = action.payload) === null || _action$payload2 === void 0 ? void 0 : (_action$payload2$lang = _action$payload2.languagesList[0]) === null || _action$payload2$lang === void 0 ? void 0 : _action$payload2$lang.languageID);
        }

        if (((_action$payload3 = action.payload) === null || _action$payload3 === void 0 ? void 0 : (_action$payload3$curr = _action$payload3.currencyList) === null || _action$payload3$curr === void 0 ? void 0 : _action$payload3$curr.length) > 0) {
          var _action$payload4, _action$payload4$curr;

          api.setCurrencyID((_action$payload4 = action.payload) === null || _action$payload4 === void 0 ? void 0 : (_action$payload4$curr = _action$payload4.currencyList[0]) === null || _action$payload4$curr === void 0 ? void 0 : _action$payload4$curr.currencyID);
        }

        if (((_action$payload5 = action.payload) === null || _action$payload5 === void 0 ? void 0 : (_action$payload5$webs = _action$payload5.websiteList) === null || _action$payload5$webs === void 0 ? void 0 : _action$payload5$webs.length) > 0) {
          var _action$payload6, _action$payload6$webs;

          api.setWebsiteID((_action$payload6 = action.payload) === null || _action$payload6 === void 0 ? void 0 : (_action$payload6$webs = _action$payload6.websiteList[0]) === null || _action$payload6$webs === void 0 ? void 0 : _action$payload6$webs.websiteID);
        }

        if (((_action$payload7 = action.payload) === null || _action$payload7 === void 0 ? void 0 : (_action$payload7$subs = _action$payload7.subsitesList) === null || _action$payload7$subs === void 0 ? void 0 : _action$payload7$subs.length) > 0) {
          var _action$payload8, _action$payload8$subs;

          api.setSubsiteID((_action$payload8 = action.payload) === null || _action$payload8 === void 0 ? void 0 : (_action$payload8$subs = _action$payload8.subsitesList[0]) === null || _action$payload8$subs === void 0 ? void 0 : _action$payload8$subs.storeID);
        }
      }

      return _extends({}, state, {
        loaded: true,
        loading: false,
        data: action.payload
      });

    case appSettingsActionTypes.SET_LANGUAGE_ID:
      return _extends({}, state, {
        languageID: action.payload
      });

    case appSettingsActionTypes.SET_SUBSITE_ID:
      return _extends({}, state, {
        subsiteID: action.payload
      });

    case appSettingsActionTypes.SET_WEBSITE_ID:
      return _extends({}, state, {
        websiteID: action.payload
      });

    case appSettingsActionTypes.SET_HTML_DIRECTION_ID:
      return _extends({}, state, {
        htmlDirection: action.payload
      });

    case appSettingsActionTypes.ERROR:
      return _extends({}, state, {
        loaded: true,
        loading: false,
        error: action.payload
      });

    default:
      return state;
  }
};
var appSettingsActionTypes = {
  REQUEST: 'APP_SETTINGS/REQUEST_DATA',
  LOADED: 'APP_SETTINGS/LOADED_DATA',
  ERROR: 'APP_SETTINGS/ERROR_DATA',
  SET_LANGUAGE_ID: 'APP_SETTINGS/LANGUAGE_ID',
  SET_SUBSITE_ID: 'APP_SETTINGS/SUBSITE_ID',
  SET_WEBSITE_ID: 'APP_SETTINGS/WEBSITE_ID',
  SET_HTML_DIRECTION_ID: 'APP_SETTINGS/HTML_DIRECTION_ID'
};
var requestAppSettingsAction = function requestAppSettingsAction() {
  return createAction(appSettingsActionTypes.REQUEST);
};
var appSettingsLoadedAction = function appSettingsLoadedAction(data) {
  return createActionWithPayload(appSettingsActionTypes.LOADED, data);
};
var appSettingsErrorAction = function appSettingsErrorAction(error) {
  return createActionWithPayload(appSettingsActionTypes.ERROR, error);
};
var AppSettingsLanguageAction = function AppSettingsLanguageAction(id) {
  return createActionWithPayload(appSettingsActionTypes.SET_LANGUAGE_ID, id);
};
var AppSettingsSubsiteAction = function AppSettingsSubsiteAction(id) {
  return createActionWithPayload(appSettingsActionTypes.SET_SUBSITE_ID, id);
};
var AppSettingsWebsiteAction = function AppSettingsWebsiteAction(id) {
  return createActionWithPayload(appSettingsActionTypes.SET_WEBSITE_ID, id);
};
var AppSettingsHtmlDirectionAction = function AppSettingsHtmlDirectionAction(direction) {
  return createActionWithPayload(appSettingsActionTypes.SET_HTML_DIRECTION_ID, direction);
};
var appSettingsActions = {
  getAppSettings: function getAppSettings(onComplete) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.appSettings.getAppSettings()).then(function (response) {
            dispatch({
              type: appSettingsActionTypes.LOADED,
              data: response === null || response === void 0 ? void 0 : response.data
            });

            if (onComplete) {
              onComplete();
            }
          });
        }, function (error) {
          dispatch({
            type: appSettingsActionTypes.LOADED,
            data: initialAppSettingsStateViewModel
          });
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

var CRYPTO_KEY = 'e23d1343';
var CART_ID = 'CART_ID';
var USER_ID = 'USER_ID';

var LocalStorage = /*#__PURE__*/function () {
  function LocalStorage() {}

  LocalStorage.getItem = function getItem(key) {
    var ciphertext = MD5(key).toString();
    var encryptvalue = localStorage.getItem(ciphertext);

    if (encryptvalue == null) {
      return null;
    }

    var bytes = AES.decrypt(encryptvalue, CRYPTO_KEY);
    var plaintext = bytes.toString(enc.Utf8);
    return plaintext;
  };

  LocalStorage.setItem = function setItem(key, value) {
    var ciphertext = MD5(key).toString();
    var encryptedValue = AES.encrypt(value.toString(), CRYPTO_KEY);
    localStorage.setItem(ciphertext, encryptedValue.toString());
  };

  LocalStorage.removeItem = function removeItem(key) {
    var ciphertext = MD5(key).toString();
    localStorage.removeItem(ciphertext);
  };

  return LocalStorage;
}();

var initialState$8 = {
  financeList: []
};
var bankListReducer = function bankListReducer(state, action) {
  if (state === void 0) {
    state = initialState$8;
  }

  switch (action.type) {
    case bankListActionTypes.BANK_LIST:
      return _extends({}, action.data);

    default:
      return state;
  }
};
var bankListActionTypes = {
  BANK_LIST: 'BANK_LIST'
};
var bankListActions = {
  getBankList: function getBankList(onSuccess) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.getBankList()).then(function (response) {
            return Promise.resolve(dispatch({
              type: bankListActionTypes.BANK_LIST,
              data: response
            })).then(function () {
              if (onSuccess) {
                onSuccess();
              }
            });
          });
        }, function (error) {
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

var initialState$9 = {
  showroomsList: []
};
var showRoomListReducer = function showRoomListReducer(state, action) {
  if (state === void 0) {
    state = initialState$9;
  }

  switch (action.type) {
    case showRoomListActionTypes.SHOWROOM_LIST:
      return _extends({}, action.data);

    default:
      return state;
  }
};
var showRoomListActionTypes = {
  SHOWROOM_LIST: 'SHOWROOM_LIST'
};
var showRoomListActions = {
  getShowRoomList: function getShowRoomList(onSuccess) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.getShowRoomList()).then(function (response) {
            return Promise.resolve(dispatch({
              type: showRoomListActionTypes.SHOWROOM_LIST,
              data: response
            })).then(function () {
              if (onSuccess) {
                onSuccess();
              }
            });
          });
        }, function (error) {
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

var initialState$a = {
  modelsList: []
};
var allVehicleModelListReducer = function allVehicleModelListReducer(state, action) {
  if (state === void 0) {
    state = initialState$a;
  }

  switch (action.type) {
    case allVehicleModelActionTypes.ALL_VEHICLE_LIST:
      return _extends({}, action.data);

    default:
      return state;
  }
};
var allVehicleModelActionTypes = {
  ALL_VEHICLE_LIST: 'ALL_VEHICLE_LIST'
};
var allVehicleModelActions = {
  getVehicleModelsList: function getVehicleModelsList(onSuccess) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.build.getVehicleModelList()).then(function (response) {
            return Promise.resolve(dispatch({
              type: allVehicleModelActionTypes.ALL_VEHICLE_LIST,
              data: response
            })).then(function () {
              if (onSuccess) {
                onSuccess();
              }
            });
          });
        }, function (error) {
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

var initialProductModelState = {
  isLoading: false,
  productModelsList: []
};
var productModelsReducer = function productModelsReducer(state, action) {
  if (state === void 0) {
    state = initialProductModelState;
  }

  switch (action.type) {
    case productModelActionTypes.PRODUCT_MODELS:
      return _extends({
        isLoading: false
      }, action.data);

    case productModelActionTypes.PRODUCT_MODELS_SET_LOADING:
      return {
        isLoading: action.data,
        productModelsList: []
      };

    case productModelActionTypes.PRODUCT_MODELS_CLEAR:
      return {
        isLoading: false,
        productModelsList: []
      };

    default:
      return state;
  }
};
var productModelActionTypes = {
  PRODUCT_MODELS: 'PRODUCT_MODELS',
  PRODUCT_MODELS_CLEAR: 'PRODUCT_MODELS_CLEAR',
  PRODUCT_MODELS_SET_LOADING: 'PRODUCT_MODELS_SET_LOADING'
};
var productModelsActions = {
  getProductModels: function getProductModels(onSuccess, vehType) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          dispatch({
            type: productModelActionTypes.PRODUCT_MODELS_SET_LOADING,
            data: true
          });
          return Promise.resolve(vehType ? api.build.getProductModelList(vehType) : api.build.getProductModelList()).then(function (response) {
            return Promise.resolve(dispatch({
              type: productModelActionTypes.PRODUCT_MODELS,
              data: response
            })).then(function () {
              if (onSuccess) {
                onSuccess();
              }
            });
          });
        }, function (error) {
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};
var productModelsResetSettingsAction = function productModelsResetSettingsAction() {
  return createAction(productModelActionTypes.PRODUCT_MODELS_CLEAR);
};
var productModelsSetLoadingAction = function productModelsSetLoadingAction(data) {
  return createActionWithPayload(productModelActionTypes.PRODUCT_MODELS_SET_LOADING, data);
};

var aiTypes = {
  AI_REQUEST: 'AI/SET_REQUEST',
  AI_SUCCESS: 'AI/SET_SUCCESS',
  AI_ERROR: 'AI/SET_ERROR',
  TRACKING_REQUEST: 'TRACKING/SET_REQUEST',
  TRACKING_SUCCESS: 'TRACKING/SET_SUCCESS',
  TRACKING_ERROR: 'TRACKING/SET_ERROR'
};
var initialState$b = {};
var aiReducer = function aiReducer(state, action) {
  var _state$vehicles, _existingData;

  if (state === void 0) {
    state = initialState$b;
  }

  switch (action.type) {
    case aiTypes.AI_SUCCESS:
      var existingData = !!((_state$vehicles = state.vehicles) !== null && _state$vehicles !== void 0 && _state$vehicles.length) ? [].concat(state.vehicles) : [];
      var isExisting = (_existingData = existingData) === null || _existingData === void 0 ? void 0 : _existingData.find(function (x) {
        var _x$model, _action$model;

        return ((_x$model = x.model) === null || _x$model === void 0 ? void 0 : _x$model.toUpperCase()) === ((_action$model = action.model) === null || _action$model === void 0 ? void 0 : _action$model.toUpperCase());
      });

      if (!isExisting) {
        var _action$model2;

        existingData.push({
          model: (_action$model2 = action.model) === null || _action$model2 === void 0 ? void 0 : _action$model2.toUpperCase(),
          count: action.count
        });
      } else {
        var _existingData2;

        existingData = (_existingData2 = existingData) === null || _existingData2 === void 0 ? void 0 : _existingData2.map(function (m) {
          var _m$model, _action$model3;

          return _extends({}, m, {
            count: ((_m$model = m.model) === null || _m$model === void 0 ? void 0 : _m$model.toUpperCase()) === ((_action$model3 = action.model) === null || _action$model3 === void 0 ? void 0 : _action$model3.toUpperCase()) ? m.count + action.count : m.count
          });
        });
      }

      return _extends({}, state, {
        vehicles: existingData
      });

    case aiTypes.TRACKING_SUCCESS:
      return _extends({}, state, {
        vehicles: undefined
      });

    case aiTypes.TRACKING_ERROR:
      return _extends({}, state);

    default:
      return state;
  }
};
var aiActions = {
  savePageView: function savePageView(model, count) {
    return function (dispatch) {
      try {
        dispatch({
          type: aiTypes.AI_SUCCESS,
          model: model,
          count: count
        });
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
  },
  sendTrackingCount: function sendTrackingCount(data) {
    return function (dispatch) {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(api.ai.sendTrackingCount(data)).then(function (response) {
            var _response$data, _response$data$meta;

            if (((_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$meta = _response$data.meta) === null || _response$data$meta === void 0 ? void 0 : _response$data$meta.responsecode) === 200) {
              var _response$data2, _response$data3, _response$data3$meta, _response$data4, _response$data4$meta;

              dispatch({
                type: aiTypes.TRACKING_SUCCESS
              });
              return {
                data: response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.data,
                responsecode: (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : (_response$data3$meta = _response$data3.meta) === null || _response$data3$meta === void 0 ? void 0 : _response$data3$meta.responsecode,
                status: (_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : (_response$data4$meta = _response$data4.meta) === null || _response$data4$meta === void 0 ? void 0 : _response$data4$meta.status,
                message: ''
              };
            } else {
              var _response$data5, _response$data5$meta, _response$data6, _response$data6$meta, _response$data7, _response$data7$meta;

              return {
                data: undefined,
                responsecode: (_response$data5 = response.data) === null || _response$data5 === void 0 ? void 0 : (_response$data5$meta = _response$data5.meta) === null || _response$data5$meta === void 0 ? void 0 : _response$data5$meta.responsecode,
                status: (_response$data6 = response.data) === null || _response$data6 === void 0 ? void 0 : (_response$data6$meta = _response$data6.meta) === null || _response$data6$meta === void 0 ? void 0 : _response$data6$meta.status,
                message: (_response$data7 = response.data) === null || _response$data7 === void 0 ? void 0 : (_response$data7$meta = _response$data7.meta) === null || _response$data7$meta === void 0 ? void 0 : _response$data7$meta.message
              };
            }
          });
        }, function (error) {
          var _error$response$data, _error$response$data$, _error$response$data2, _error$response$data3, _error$response$data4, _error$response$data5;

          dispatch({
            type: aiTypes.TRACKING_ERROR,
            data: {
              errorMessage: 'Invalid details!'
            }
          });
          return {
            data: undefined,
            responsecode: (_error$response$data = error.response.data) === null || _error$response$data === void 0 ? void 0 : (_error$response$data$ = _error$response$data.meta) === null || _error$response$data$ === void 0 ? void 0 : _error$response$data$.responsecode,
            status: (_error$response$data2 = error.response.data) === null || _error$response$data2 === void 0 ? void 0 : (_error$response$data3 = _error$response$data2.meta) === null || _error$response$data3 === void 0 ? void 0 : _error$response$data3.status,
            message: (_error$response$data4 = error.response.data) === null || _error$response$data4 === void 0 ? void 0 : (_error$response$data5 = _error$response$data4.meta) === null || _error$response$data5 === void 0 ? void 0 : _error$response$data5.message
          };
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

export { AppSettingsHtmlDirectionAction, AppSettingsLanguageAction, AppSettingsService, AppSettingsSubsiteAction, AppSettingsWebsiteAction, BuildPriceActions, CART_ID, CRYPTO_KEY, CampaignFinanceOffer, CartActions, CombinationDetailsActions, CompareVarientActions, EcomCampaignAppliedItem, EditionVarientActions, LocalStorage, ProductDetailsActions, TradeInActionTypes, TradeInActions, TrimVarientActions, USER_ID, UseUnauthorizedApiResponseInterceptor, aiActions, aiReducer, aiTypes, allVehicleModelActionTypes, allVehicleModelActions, allVehicleModelListReducer, api, appSettingsActionTypes, appSettingsActions, appSettingsErrorAction, appSettingsLoadedAction, appSettingsReducer, authActions, authReducer, bankListActionTypes, bankListActions, bankListReducer, buildPriceReducer, buildPriceTypes, capitalizeAllFirstLettersOfWords, capitalizeFirstLetter, cartActionTypes, cartReducer, combinationDetailsActionTypes, combinationDetailsReducer, commonActions, commonReducer, commonTypes, compareVarientActionTypes, compareVarientsReducer, editionVarientActionTypes, editionVarientsReducer, initialAppSettingsStateViewModel, initialCartStateModelState, initialProductInfoModelCart, initialStateTradeInBrandModel, initialStateTradeInModel, initialStateTradeInModelYear, initialStateTradeInTrimModel, numberWithCommas, productDetailsActionTypes, productDetailsReducer, productModelActionTypes, productModelsActions, productModelsReducer, productModelsResetSettingsAction, productModelsSetLoadingAction, requestAppSettingsAction, showRoomListActionTypes, showRoomListActions, showRoomListReducer, tradeInBrandData, tradeInBrandReducer, tradeInMileageReducer, tradeInModelData, tradeInModelReducer, tradeInModelYearReducer, trimVarientActionTypes, trimVarientsReducer, types };
//# sourceMappingURL=index.modern.js.map
