(function (React, ReactDOM, style, _Button, style$1, _Flex, style$2, _WhiteSpace, style$3, _Progress, style$4, _List, style$5, _Checkbox, style$6, _Picker, antd, classnames, style$7, _Modal) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
  var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
  var _Flex__default = /*#__PURE__*/_interopDefaultLegacy(_Flex);
  var _WhiteSpace__default = /*#__PURE__*/_interopDefaultLegacy(_WhiteSpace);
  var _Progress__default = /*#__PURE__*/_interopDefaultLegacy(_Progress);
  var _List__default = /*#__PURE__*/_interopDefaultLegacy(_List);
  var _Checkbox__default = /*#__PURE__*/_interopDefaultLegacy(_Checkbox);
  var _Picker__default = /*#__PURE__*/_interopDefaultLegacy(_Picker);
  var classnames__default = /*#__PURE__*/_interopDefaultLegacy(classnames);
  var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var ArrayHelper = {
    convertIndexToRowColumn: function convertIndexToRowColumn(rowLength, index) {
      return {
        col: index % rowLength + 1,
        row: Math.floor(index / rowLength) + 1
      };
    },
    is2DArray: function is2DArray(array) {
      return array[0] instanceof Array;
    },
    getRowColumnByIndex: function getRowColumnByIndex(array, index) {
      if (this.is2DArray(array)) {
        return this.convertIndexToRowColumn(array[0].length, index);
      }

      return this.convertIndexToRowColumn(Math.sqrt(array.length), index);
    },
    findIndexOfMax: function findIndexOfMax(array) {
      var index = 0;
      var max = array[0];

      for (var i = 1; i < array.length; i++) {
        if (array[i] > max) {
          max = array[i];
          index = i;
        }
      }

      return index;
    },
    intersects: function intersects(a1, a2) {
      var res = [];

      var _iterator = _createForOfIteratorHelper(a1),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var e1 = _step.value;

          if (a2.indexOf(e1) >= 0) {
            res.push(e1);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return res;
    }
  };

  var siteName$1 = 'AI tic tac toe';

  var EnUS = /*#__PURE__*/_createClass(function EnUS() {
    _classCallCheck(this, EnUS);
  });

  _defineProperty(EnUS, "siteName", siteName$1);

  _defineProperty(EnUS, "settings", 'Settings');

  _defineProperty(EnUS, "homepage", 'Play');

  _defineProperty(EnUS, "source", 'Source Code');

  _defineProperty(EnUS, "getRedPackage", 'Red Package!');

  _defineProperty(EnUS, "supportAuthor", 'Support Author');

  _defineProperty(EnUS, "how", 'How');

  var siteName = 'AI 三子棋';

  var ZhCN = /*#__PURE__*/function (_EnUS) {
    _inherits(ZhCN, _EnUS);

    var _super = _createSuper(ZhCN);

    function ZhCN() {
      _classCallCheck(this, ZhCN);

      return _super.apply(this, arguments);
    }

    return _createClass(ZhCN);
  }(EnUS);

  _defineProperty(ZhCN, "siteName", siteName);

  _defineProperty(ZhCN, "settings", '设置');

  _defineProperty(ZhCN, "homepage", '主页');

  _defineProperty(ZhCN, "source", '源代码');

  _defineProperty(ZhCN, "getRedPackage", '领红包！');

  _defineProperty(ZhCN, "supportAuthor", '打赏作者');

  _defineProperty(ZhCN, "how", '原理');

  var resources;
  var currentCulture;

  var Resources = /*#__PURE__*/function () {
    function Resources() {
      _classCallCheck(this, Resources);
    }

    _createClass(Resources, null, [{
      key: "setCulture",
      value: function setCulture(culture) {
        try {
          resources = require("../Resources/".concat(culture));

          if (culture === 'zh-CN') {
            currentCulture = ZhCN;
          } else {
            currentCulture = EnUS;
          }

          return [culture];
        } catch (ex) {
          resources = require("../Resources/zh-CN");
          return ['en-US'];
        }
      }
    }, {
      key: "getInstance",
      value: function getInstance() {
        if (!resources) {
          Resources.setCulture('en-US');
        }

        return resources;
      }
    }, {
      key: "getCurrentCulture",
      value: function getCurrentCulture() {
        return currentCulture || EnUS;
      }
    }]);

    return Resources;
  }();

  var cultures = {
    zhCN: ['zh-CN'],
    enUS: ['en-US'],
    getDefault: function getDefault() {
      var culture = 'en-US';
      var settings = JSON.parse(localStorage.getItem('settings'));

      if (settings && settings.language !== undefined) {
        culture = settings.language[0];
      } else if (navigator && navigator.language && navigator.language === 'zh-CN') {
        culture = 'zh-CN';
      } else {
        culture = 'en-US';
      }

      if (culture === 'zh-CN') {
        Resources.setCulture(cultures.zhCN[0]);
        return cultures.zhCN;
      }

      Resources.setCulture(cultures.enUS[0]);
      return cultures.enUS;
    }
  };
  var CultureContext = /*#__PURE__*/React__default["default"].createContext({
    culture: {
      currentCulture: cultures.getDefault()
    },
    changeCulture: function changeCulture(value) {
      console.log('change to = ', value);
    }
  });

  var CultureSelector = /*#__PURE__*/function (_React$Component) {
    _inherits(CultureSelector, _React$Component);

    var _super = _createSuper(CultureSelector);

    function CultureSelector() {
      _classCallCheck(this, CultureSelector);

      return _super.apply(this, arguments);
    }

    _createClass(CultureSelector, [{
      key: "render",
      value: function render() {
        var _this = this;

        var languages = [{
          value: 'zh-CN',
          label: '中文'
        }, {
          value: 'en-US',
          label: 'English'
        }];
        return /*#__PURE__*/React__default["default"].createElement(CultureContext.Consumer, null, function (_ref) {
          var culture = _ref.culture,
              changeCulture = _ref.changeCulture;
          return /*#__PURE__*/React__default["default"].createElement(_Picker__default["default"], {
            data: languages,
            onChange: function onChange(value) {
              changeCulture(value);
              typeof _this.props.onChange === 'function' && _this.props.onChange(value);
            },
            cols: 1,
            value: culture.currentCulture
          }, /*#__PURE__*/React__default["default"].createElement(_List__default["default"].Item, {
            arrow: "horizontal"
          }, Resources.getInstance().chooseLanguage));
        });
      }
    }]);

    return CultureSelector;
  }(React__default["default"].Component);

  var spotScoreMap = new Map();
  var CheckboxItem = _Checkbox__default["default"].CheckboxItem;
  var defaultSettings = {
    // learn: true,
    // showLearningStatus: false,
    language: ['en-US']
  };
  var GlobalSettings = _objectSpread2(_objectSpread2({}, defaultSettings), JSON.parse(localStorage.getItem('settings')));

  /*#__PURE__*/(function (_React$Component) {
    _inherits(Settings, _React$Component);

    var _super = _createSuper(Settings);

    function Settings() {
      var _this;

      _classCallCheck(this, Settings);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "state", _objectSpread2({}, GlobalSettings));

      _defineProperty(_assertThisInitialized(_this), "onChange", function (key) {
        GlobalSettings[key] = !GlobalSettings[key];

        _this.setState(_defineProperty({}, key, GlobalSettings[key]));

        localStorage.setItem('settings', JSON.stringify(GlobalSettings));
      });

      return _this;
    }

    _createClass(Settings, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return /*#__PURE__*/React__default["default"].createElement("div", {
          style: {
            textAlign: 'left'
          }
        }, /*#__PURE__*/React__default["default"].createElement(_List__default["default"], {
          renderHeader: function renderHeader() {
            return Resources.getCurrentCulture().settings;
          }
        }, Object.keys(GlobalSettings).map(function (k) {
          if (typeof defaultSettings[k] === "boolean") {
            return /*#__PURE__*/React__default["default"].createElement(CheckboxItem, {
              key: k,
              onChange: function onChange() {
                return _this2.onChange(k);
              },
              checked: _this2.state[k]
            }, k);
          } else if (k === 'language') {
            return /*#__PURE__*/React__default["default"].createElement(CultureSelector, {
              key: k,
              onChange: function onChange(value) {
                GlobalSettings.language = value;

                _this2.setState({
                  language: value
                });

                localStorage.setItem('settings', JSON.stringify(GlobalSettings));
              }
            });
          } else {
            return null;
          }
        })), /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", null, "Icons made by ", /*#__PURE__*/React__default["default"].createElement("a", {
          href: "https://www.freepik.com/",
          title: "Freepik",
          rel: "noopener noreferrer"
        }, "Freepik"), " from ", /*#__PURE__*/React__default["default"].createElement("a", {
          href: "https://www.flaticon.com/",
          title: "Flaticon",
          rel: "noopener noreferrer",
          target: "_blank"
        }, "www.flaticon.com"), " is licensed by ", /*#__PURE__*/React__default["default"].createElement("a", {
          href: "http://creativecommons.org/licenses/by/3.0/",
          title: "Creative Commons BY 3.0",
          target: "_blank",
          rel: "noopener noreferrer"
        }, "CC 3.0 BY")), /*#__PURE__*/React__default["default"].createElement("div", null, "Icons made by ", /*#__PURE__*/React__default["default"].createElement("a", {
          href: "https://www.flaticon.com/authors/smashicons",
          title: "Smashicons"
        }, "Smashicons"), " from ", /*#__PURE__*/React__default["default"].createElement("a", {
          href: "https://www.flaticon.com/",
          rel: "noopener noreferrer",
          title: "Flaticon"
        }, "www.flaticon.com"), " is licensed by ", /*#__PURE__*/React__default["default"].createElement("a", {
          href: "http://creativecommons.org/licenses/by/3.0/",
          title: "Creative Commons BY 3.0",
          target: "_blank",
          rel: "noopener noreferrer"
        }, "CC 3.0 BY"))));
      }
    }]);

    return Settings;
  })(React__default["default"].Component);

  function Square(props) {
    return /*#__PURE__*/React__default["default"].createElement("button", {
      className: "square",
      onClick: props.onClick,
      title: JSON.stringify(spotScoreMap.get(props.index)),
      disabled: props.disabled
    }, props.highlight ? /*#__PURE__*/React__default["default"].createElement("strong", {
      style: {
        "color": "red"
      }
    }, props.value) : /*#__PURE__*/React__default["default"].createElement("span", null, props.value));
  }

  var Board = /*#__PURE__*/function (_React$Component) {
    _inherits(Board, _React$Component);

    var _super = _createSuper(Board);

    function Board() {
      _classCallCheck(this, Board);

      return _super.apply(this, arguments);
    }

    _createClass(Board, [{
      key: "renderSquare",
      value: function renderSquare(i) {
        var _this = this;

        return /*#__PURE__*/React__default["default"].createElement(Square, {
          value: this.props.squares[i],
          onClick: function onClick() {
            return _this.props.onClick(i);
          },
          key: i,
          index: i,
          highlight: this.props.winner ? this.props.winner.where.indexOf(i) >= 0 : false,
          disabled: this.props.disabled
        });
      }
    }, {
      key: "renderBoardRow",
      value: function renderBoardRow(side, rowIndex) {
        var cols = [];

        for (var i = 0; i < side; i++) {
          cols.push(this.renderSquare(rowIndex * side + i));
        }

        return cols;
      }
    }, {
      key: "renderBoard",
      value: function renderBoard() {
        var side = Math.sqrt(this.props.squares.length);
        var rows = [];

        for (var i = 0; i < side; i++) {
          rows.push( /*#__PURE__*/React__default["default"].createElement("div", {
            className: "board-row",
            key: i
          }, this.renderBoardRow(side, i)));
        }

        return rows;
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React__default["default"].createElement("div", {
          style: {
            display: 'inline-block',
            minWidth: '247px'
          }
        }, this.renderBoard());
      }
    }]);

    return Board;
  }(React__default["default"].Component);

  var GameModes = {
    humanVsComputer: 'humanVsComputer',
    computerVsComputer: 'computerVsComputer'
  };

  var boardSides$1 = {
    top: [0, 1, 2],
    left: [0, 3, 6],
    right: [2, 5, 8],
    bottom: [6, 7, 8],
    center: [3, 4, 5],
    middle: [1, 4, 7],
    slash: [2, 4, 6],
    antiSlash: [0, 4, 8]
  };
  var sides$1 = [boardSides$1.top, boardSides$1.center, boardSides$1.bottom, boardSides$1.left, boardSides$1.middle, boardSides$1.right, boardSides$1.slash, boardSides$1.antiSlash];

  function checkSides(bitmap) {
    var d = 0;
    var dead = 0;
    var w = 0;
    var c = 0;

    var _loop = function _loop(i) {
      var side = bitmap.filter(function (_, j) {
        return sides$1[i].indexOf(j) >= 0;
      });
      var negatives = side.filter(function (b) {
        return b === -1;
      });
      var zeros = side.filter(function (b) {
        return b === 0;
      });
      var ones = side.filter(function (b) {
        return b === 1;
      });

      if (negatives.length === 2 && zeros.length === 1) {
        d++;
      }

      if (negatives.length === 3) {
        dead++;
      }

      if (ones.length === 3) {
        w++;
      }

      if (ones.length === 2 && zeros.length === 1) {
        c++;
      }
    };

    for (var i = 0; i < sides$1.length; i++) {
      _loop(i);
    }

    return {
      danger: d,
      lost: dead,
      chance: c,
      win: w
    };
  }

  var initialWeights = [0, 1, 1];

  var namedStrategy = function namedStrategy(factors) {
    return {
      const: factors[0],
      danger: factors[1],
      occupyCenter: factors[2]
    };
  };

  var StrategySettings = /*#__PURE__*/function () {
    function StrategySettings() {
      _classCallCheck(this, StrategySettings);
    }

    _createClass(StrategySettings, null, [{
      key: "setInitialWeights",
      value: function setInitialWeights(iw) {
        initialWeights = iw;
      }
    }, {
      key: "setNamedStrategy",
      value: function setNamedStrategy(func) {
        namedStrategy = func;
      }
    }]);

    return StrategySettings;
  }();

  var Strategy = /*#__PURE__*/function () {
    function Strategy() {
      _classCallCheck(this, Strategy);
    }

    _createClass(Strategy, null, [{
      key: "getInitialWeights",
      value: function getInitialWeights() {
        return initialWeights;
      }
    }, {
      key: "getNamedStrategy",
      value: function getNamedStrategy(factors) {
        return namedStrategy(factors);
      }
    }, {
      key: "getBoardStatus",
      value: function getBoardStatus(bitmap) {
        var _checkSides = checkSides(bitmap),
            danger = _checkSides.danger,
            lost = _checkSides.lost,
            chance = _checkSides.chance,
            win = _checkSides.win;

        return {
          danger: danger,
          lost: lost,
          chance: chance,
          win: win,
          factors: Object.keys(namedStrategy(Strategy.getInitialWeights())).map(function (key) {
            return {
              const: 1,
              danger: danger * 1.1,
              occupyCenter: bitmap[4] === 1 ? 1 : 0,
              intersectedBads: Strategy.getIntersectedBads(bitmap) / 2,
              chance: chance,
              numberOfBadsOfMyChance: Strategy.getNumberOfBadsOfMyChancePosition(bitmap)
            }[key];
          })
        };
      }
    }, {
      key: "getIntersectedBads",
      value: function getIntersectedBads(bitmap) {
        var intersectedBads = 0;
        var bads = [];

        var _loop2 = function _loop2(i) {
          var side = bitmap.filter(function (_, j) {
            return sides$1[i].indexOf(j) >= 0;
          });

          var _side = _slicedToArray(side, 3),
              v1 = _side[0],
              v2 = _side[1],
              v3 = _side[2];

          if (v1 === -1 && v2 === 0 && v3 === 0 || v1 === 0 && v2 === -1 && v3 === 0 || v1 === 0 && v2 === 0 && v3 === -1 || v1 === -1 && v2 === -1 && v3 === 0 || v1 === -1 && v2 === 0 && v3 === -1 || v1 === 0 && v2 === -1 && v3 === -1) {
            bads.push(sides$1[i]);
          }
        };

        for (var i = 0; i < sides$1.length; i++) {
          _loop2(i);
        }

        if (bads.length <= 1) {
          return 0;
        }

        for (var _i = 0; _i < bads.length - 1; _i++) {
          for (var j = _i + 1; j < bads.length; j++) {
            var bad1 = bads[_i];
            var bad2 = bads[j];
            var intersects = ArrayHelper.intersects(bad1, bad2);

            if (intersects.length > 0 && (bitmap[intersects[0]] === 0 || bitmap[intersects[0]] === -1)) {
              intersectedBads++;
            }
          }
        }

        return intersectedBads;
      }
    }, {
      key: "getNumberOfBadsOfMyChancePosition",
      value: function getNumberOfBadsOfMyChancePosition(bitmap) {
        var sum = 0;

        var _loop3 = function _loop3(i) {
          var sideValues = bitmap.filter(function (_, j) {
            return sides$1[i].indexOf(j) >= 0;
          });
          var zeros = sideValues.filter(function (b) {
            return b === 0;
          });
          var ones = sideValues.filter(function (b) {
            return b === 1;
          });

          if (ones.length === 2 && zeros.length === 1) {
            var theChance = sides$1[i].filter(function (index) {
              return bitmap[index] === 0;
            })[0];

            if (theChance !== undefined) {
              var sidesContainsTheChancePosition = sides$1.filter(function (s) {
                return s.indexOf(theChance) >= 0;
              });

              var _iterator = _createForOfIteratorHelper(sidesContainsTheChancePosition),
                  _step;

              try {
                var _loop4 = function _loop4() {
                  var s = _step.value;
                  var sValues = bitmap.filter(function (_, j) {
                    return s.indexOf(j) >= 0;
                  });
                  var n = sValues.filter(function (b) {
                    return b === -1;
                  }).length;
                  var p = sValues.filter(function (b) {
                    return b === 1;
                  }).length;

                  if (n > 0 && p === 0) {
                    sum++;
                  }
                };

                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _loop4();
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
          }
        };

        for (var i = 0; i < sides$1.length; i++) {
          _loop3(i);
        }

        return sum;
      }
    }]);

    return Strategy;
  }();

  var boardSides = {
    top: [0, 1, 2],
    left: [0, 3, 6],
    right: [2, 5, 8],
    bottom: [6, 7, 8],
    center: [3, 4, 5],
    middle: [1, 4, 7],
    slash: [2, 4, 6],
    antiSlash: [0, 4, 8]
  };
  var sides = [boardSides.top, boardSides.center, boardSides.bottom, boardSides.left, boardSides.middle, boardSides.right, boardSides.slash, boardSides.antiSlash];
  var Judger = {
    getBoardScore: function getBoardScore(bitmap, weights) {
      weights = weights || Strategy.getInitialWeights();

      var _Strategy$getBoardSta = Strategy.getBoardStatus(bitmap),
          lost = _Strategy$getBoardSta.lost,
          win = _Strategy$getBoardSta.win,
          factors = _Strategy$getBoardSta.factors;

      if (lost) {
        return {
          factors: factors,
          namedFactors: Strategy.getNamedStrategy(factors),
          total: -Math.PI / 2
        };
      }

      if (win) {
        return {
          factors: factors,
          namedFactors: Strategy.getNamedStrategy(factors),
          total: Math.PI / 2
        };
      }

      var score = Math.atan(factors.map(function (s, i) {
        return s * weights[i];
      }).reduce(function (prev, next) {
        return prev + next;
      }, 0));
      return {
        factors: factors,
        namedFactors: Strategy.getNamedStrategy(factors),
        total: score
      };
    },
    getSpots: function getSpots(bitmapSquares) {
      return bitmapSquares.map(function (s, i) {
        return s === 0 ? i : NaN;
      }).filter(function (n) {
        return !isNaN(n);
      });
    },
    generateNewBoardsBySpots: function generateNewBoardsBySpots(currentBoard, spots) {
      spots = spots || this.getSpots(currentBoard);
      return spots.map(function (i) {
        var newSquares = currentBoard.slice();
        newSquares[i] = 1;
        return newSquares;
      });
    },
    gameProgress: function gameProgress(bitmapSquares) {
      var emptySpots = bitmapSquares.filter(function (b) {
        return b === 0;
      });

      if (emptySpots.length === bitmapSquares.length) {
        return {
          win: false,
          lost: false,
          fair: false
        };
      }

      var _loop = function _loop(i) {
        var theSide = sides[i];
        var side = bitmapSquares.filter(function (_, j) {
          return theSide.indexOf(j) >= 0;
        });
        var ones = side.filter(function (b) {
          return b === 1;
        });
        var negatives = side.filter(function (b) {
          return b === -1;
        });

        if (ones.length === 3) {
          return {
            v: {
              win: theSide,
              lost: false,
              fair: false
            }
          };
        }

        if (negatives.length === 3) {
          return {
            v: {
              win: false,
              lost: theSide,
              fair: false
            }
          };
        }
      };

      for (var i = 0; i < sides.length; i++) {
        var _ret = _loop(i);

        if (_typeof(_ret) === "object") return _ret.v;
      }

      return {
        win: false,
        lost: false,
        fair: emptySpots.length === 0
      };
    },
    gameEnds: function gameEnds(progress) {
      return progress.fair || progress.win || progress.lost;
    }
  };

  var weights = [0, 1, 1, 1, 1, 1, 1, 1, 1];
  var ComputerFool = /*#__PURE__*/function () {
    function ComputerFool() {
      _classCallCheck(this, ComputerFool);

      this.weights = weights;
    }

    _createClass(ComputerFool, [{
      key: "nextMove",
      value: function nextMove(squares) {
        return ComputerFool.nextMove(squares, this.weights);
      }
    }], [{
      key: "nextMove",
      value: function nextMove(squares, weights) {
        var spots = Judger.getSpots(squares);
        return spots[Math.round((spots.length - 1) * Math.random())];
      }
    }]);

    return ComputerFool;
  }();
  var ComputerFool$1 = new ComputerFool();

  var PlayerFool = /*#__PURE__*/function () {
    function PlayerFool(me) {
      _classCallCheck(this, PlayerFool);

      this.me = me;
    }

    _createClass(PlayerFool, [{
      key: "nextMove",
      value: function nextMove(squares, game, callback) {
        var bitmap = squares.map(function (s) {
          if (s === 'X') {
            return 1;
          }

          if (s === 'O') {
            return -1;
          }

          return 0;
        });
        game.handleClick(ComputerFool$1.nextMove(bitmap), callback);
      }
    }, {
      key: "getWeights",
      value: function getWeights() {
        return [];
      }
    }, {
      key: "getLearningEnabled",
      value: function getLearningEnabled() {
        return false;
      }
    }, {
      key: "setWeightsUpdatedCallback",
      value: function setWeightsUpdatedCallback() {}
    }, {
      key: "clean",
      value: function clean() {}
    }]);

    return PlayerFool;
  }();

  var latestFactors = null;

  var AI = /*#__PURE__*/function () {
    function AI() {
      _classCallCheck(this, AI);

      this.weights = Object.assign([], Strategy.getInitialWeights());
      this.setWeightsUpdatedCallback(function () {});
    }

    _createClass(AI, [{
      key: "setWeightsUpdatedCallback",
      value: function setWeightsUpdatedCallback(cb) {
        this.weightsUpdatedCallback = cb;
      }
    }, {
      key: "nextMove",
      value: function nextMove(squares, nextIsMe) {
        this.tryLearn(squares);
        return AI.nextMove(squares, this.weights, nextIsMe);
      }
    }, {
      key: "tryLearn",
      value: function tryLearn(squares) {
        this.learn(this.lastBitmapSquares, squares);
        this.lastBitmapSquares = squares;
      }
    }, {
      key: "clean",
      value: function clean() {
        latestFactors = null;
      }
    }, {
      key: "getWeights",
      value: function getWeights() {
        return this.weights;
      }
    }, {
      key: "getFactors",
      value: function getFactors() {
        return latestFactors;
      }
    }, {
      key: "setWeights",
      value: function setWeights(weights) {
        this.weights = weights;
      }
    }, {
      key: "learn",
      value: function learn(lastSquares, currentSquares) {
        if (!lastSquares) {
          return;
        }

        if (!GlobalSettings.learn) {
          return;
        }

        var estimatedLastScore = Judger.getBoardScore(lastSquares, this.weights);
        var actualScore = Judger.getBoardScore(currentSquares, this.weights);
        var diff = actualScore.total - estimatedLastScore.total;

        for (var i = 0; i < estimatedLastScore.factors.length; i++) {
          this.weights[i] = this.weights[i] + 0.1 * diff * estimatedLastScore.factors[i];
        }

        this.weightsUpdatedCallback(this.weights);
      }
    }], [{
      key: "nextMove",
      value: function nextMove(squares, weights, nextIsMe) {
        spotScoreMap.clear();
        var spots = Judger.getSpots(squares);
        var nextBoards = Judger.generateNewBoardsBySpots(squares, spots);
        var scores = nextBoards.map(function (b) {
          return Judger.getBoardScore(b, weights).total;
        });

        for (var i = 0; i < spots.length; i++) {
          var spot = spots[i];
          var score = scores[i];
          spotScoreMap.set(spot, {
            weights: weights,
            strategy: Strategy.getBoardStatus(squares).factors,
            score: score
          });
        }

        var index = ArrayHelper.findIndexOfMax(scores);
        latestFactors = scores[index].namedFactors;
        return spots[index];
      }
    }]);

    return AI;
  }();

  var PlayerAI = /*#__PURE__*/function () {
    function PlayerAI(me, enemy) {
      _classCallCheck(this, PlayerAI);

      this.me = me;
      this.enemy = enemy;
      this.expert = new AI();
    }

    _createClass(PlayerAI, [{
      key: "nextMove",
      value: function nextMove(squares, game, callback) {
        var bitmap = this.convertSquaresToBitmap(squares);
        var nextIndex = this.expert.nextMove(bitmap, !game.state.xIsNext);
        game.handleClick(nextIndex, callback);
      }
    }, {
      key: "convertSquaresToBitmap",
      value: function convertSquaresToBitmap(squares) {
        var _this = this;

        return squares.map(function (s) {
          if (s === _this.enemy) {
            return -1;
          }

          if (s === _this.me) {
            return 1;
          }

          return 0;
        });
      }
    }, {
      key: "getWeights",
      value: function getWeights() {
        return this.expert.getWeights();
      }
    }, {
      key: "getFactors",
      value: function getFactors() {
        return this.expert.getFactors();
      }
    }, {
      key: "setWeightsUpdatedCallback",
      value: function setWeightsUpdatedCallback(cb) {
        this.expert.setWeightsUpdatedCallback(cb);
      }
    }, {
      key: "tryLearn",
      value: function tryLearn(squares) {
        this.expert.tryLearn(this.convertSquaresToBitmap(squares));
      }
    }, {
      key: "clean",
      value: function clean() {
        this.expert.clean();
      }
    }]);

    return PlayerAI;
  }();

  var state = {
    XWin: 0,
    OWin: 0,
    Fair: 0
  };

  var Stats = /*#__PURE__*/function (_React$Component) {
    _inherits(Stats, _React$Component);

    var _super = _createSuper(Stats);

    function Stats() {
      _classCallCheck(this, Stats);

      return _super.apply(this, arguments);
    }

    _createClass(Stats, [{
      key: "getTotal",
      value: function getTotal() {
        return state.XWin + state.OWin + state.Fair;
      }
    }, {
      key: "getXWinPercent",
      value: function getXWinPercent() {
        if (this.getTotal() === 0) {
          return 0;
        }

        return state.XWin / this.getTotal();
      }
    }, {
      key: "getOWinPercent",
      value: function getOWinPercent() {
        if (this.getTotal() === 0) {
          return 0;
        }

        return state.OWin / this.getTotal();
      }
    }, {
      key: "getFairPercent",
      value: function getFairPercent() {
        if (this.getTotal() === 0) {
          return 0;
        }

        return state.Fair / this.getTotal();
      }
    }, {
      key: "render",
      value: function render() {
        var dataSource = [{
          key: '#',
          XWin: state.XWin,
          OWin: state.OWin,
          draw: state.Fair,
          subtotal: this.getTotal()
        }, {
          key: '%',
          XWin: this.getXWinPercent().toFixed(2) * 100 + '%',
          OWin: this.getOWinPercent().toFixed(2) * 100 + '%',
          draw: this.getFairPercent().toFixed(2) * 100 + '%',
          subtotal: '100%'
        }];
        var columns = [{
          title: this.props.round,
          dataIndex: 'key',
          key: 'key'
        }, {
          title: /*#__PURE__*/React__default["default"].createElement("div", null, "\u4F60 (X) ", /*#__PURE__*/React__default["default"].createElement("br", null), Resources.getInstance().wins),
          dataIndex: 'XWin',
          key: 'XWin'
        }, {
          title: /*#__PURE__*/React__default["default"].createElement("div", null, "\u7535\u8111 (O) ", /*#__PURE__*/React__default["default"].createElement("br", null), Resources.getInstance().wins),
          dataIndex: 'OWin',
          key: 'OWin'
        }, {
          title: Resources.getInstance().fair,
          dataIndex: 'draw',
          key: 'draw'
        }, {
          title: Resources.getInstance().total,
          dataIndex: 'subtotal',
          key: 'subtotal'
        }];
        return /*#__PURE__*/React__default["default"].createElement(antd.Table, {
          dataSource: dataSource,
          columns: columns,
          pagination: false
        });
      }
    }], [{
      key: "updateRoundResult",
      value: function updateRoundResult(winner) {
        if (winner === 'X') {
          state.XWin = state.XWin + 1;
          return;
        }

        if (winner === 'O') {
          state.OWin = state.OWin + 1;
          return;
        }

        state.Fair = state.Fair + 1;
      }
    }]);

    return Stats;
  }(React__default["default"].Component);

  var GameOptions = /*#__PURE__*/function (_React$Component) {
    _inherits(GameOptions, _React$Component);

    var _super = _createSuper(GameOptions);

    function GameOptions(props) {
      var _this;

      _classCallCheck(this, GameOptions);

      _this = _super.call(this);
      _this.state = {
        selected: props.mode,
        autoStart: props.autoStart
      };
      return _this;
    }

    _createClass(GameOptions, [{
      key: "selectMode",
      value: function selectMode(mode) {
        this.setState({
          selected: GameModes[mode]
        });
        this.notifyWorld();
      }
    }, {
      key: "checkAutoStart",
      value: function checkAutoStart() {
        this.setState({
          autoStart: true
        });
        this.notifyWorld();
      }
    }, {
      key: "notifyWorld",
      value: function notifyWorld() {
        var self = this;
        setTimeout(function () {
          self.props.optionChanged(self.state.selected, self.state.autoStart);
        });
      }
    }, {
      key: "toggleAutoStart",
      value: function toggleAutoStart() {
        this.setState({
          autoStart: !this.state.autoStart
        });
        this.notifyWorld();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return /*#__PURE__*/React__default["default"].createElement("div", null, Object.keys(GameModes).map(function (mode) {
          return /*#__PURE__*/React__default["default"].createElement("p", {
            key: mode
          }, /*#__PURE__*/React__default["default"].createElement("button", {
            disabled: _this2.props.readonly,
            onClick: function onClick() {
              return _this2.selectMode(mode);
            }
          }, _this2.state.selected === GameModes[mode] ? /*#__PURE__*/React__default["default"].createElement("strong", null, Resources.getInstance()[GameModes[mode]]) : /*#__PURE__*/React__default["default"].createElement("span", null, Resources.getInstance()[GameModes[mode]])));
        }), /*#__PURE__*/React__default["default"].createElement("p", null, /*#__PURE__*/React__default["default"].createElement("input", {
          id: "auto-start",
          type: "checkbox",
          onChange: function onChange() {
            return _this2.toggleAutoStart();
          },
          checked: this.state.autoStart
        }), /*#__PURE__*/React__default["default"].createElement("label", {
          htmlFor: "auto-start"
        }, Resources.getInstance().autoStart)));
      }
    }]);

    return GameOptions;
  }(React__default["default"].Component);

  var LearningStatus = /*#__PURE__*/function (_React$Component) {
    _inherits(LearningStatus, _React$Component);

    var _super = _createSuper(LearningStatus);

    function LearningStatus() {
      _classCallCheck(this, LearningStatus);

      return _super.apply(this, arguments);
    }

    _createClass(LearningStatus, [{
      key: "render",
      value: function render() {
        return GlobalSettings.showLearningStatus ? /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"], {
          wrap: "wrap"
        }, /*#__PURE__*/React__default["default"].createElement("div", null, this.props.state.OWeights.map(function (w) {
          return w.toFixed(2);
        }).join(', ')), /*#__PURE__*/React__default["default"].createElement("div", {
          style: {
            wordBreak: 'break-word'
          }
        }, JSON.stringify(this.props.state.strategy))) : null;
      }
    }]);

    return LearningStatus;
  }(React__default["default"].Component);

  var Result = /*#__PURE__*/function (_React$Component) {
    _inherits(Result, _React$Component);

    var _super = _createSuper(Result);

    function Result() {
      var _this;

      _classCallCheck(this, Result);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "state", {
        showRedPackageModal: false
      });

      _defineProperty(_assertThisInitialized(_this), "comfortPlayer", function () {
        _this.setState({
          showRedPackageModal: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onClose", function () {
        _this.setState({
          showRedPackageModal: false
        });
      });

      return _this;
    }

    _createClass(Result, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
          visible: this.state.showRedPackageModal,
          transparent: true,
          maskClosable: false,
          title: "\u62FF\u7EA2\u5305\u6765\u62EF\u6551\u4F60",
          footer: [{
            text: '领过了，开心多啦！',
            onPress: function onPress() {
              _this2.onClose();
            }
          }]
        }, /*#__PURE__*/React__default["default"].createElement("img", {
          src: require('../Resources/images/alipay-red-package.png'),
          alt: "\u652F\u4ED8\u5B9D\u7EA2\u5305",
          style: {
            maxWidth: '100%'
          }
        })), this.props.winnerInfo.who === 'X' && /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"], null, /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"].Item, null, /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], null, "\u7ADF\u7136\u8D62\u4E86\uFF0C\u4E0D\u53EF\u601D\u8BAE\uFF01"))), this.props.winnerInfo.who === 'O' && /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"], null, /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"].Item, null, /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
          icon: /*#__PURE__*/React__default["default"].createElement("img", {
            src: require('../icons/crying.svg'),
            alt: ""
          }),
          onClick: this.comfortPlayer
        }, "\u8F93\u6389\u4E86\uFF0C\u4E0D\u5F00\u5FC3\u3002"))));
      }
    }]);

    return Result;
  }(React__default["default"].Component);

  StrategySettings.setInitialWeights([0, -2, -1, 1, 1.5, -1]); //-0.01, -0.47, -0.16, 1.46, 0.67, -0.54

  StrategySettings.setNamedStrategy(function (factors) {
    return {
      const: factors[0],
      danger: factors[1],
      intersectedBads: factors[2],
      chance: factors[3],
      occupyCenter: factors[4],
      numberOfBadsOfMyChance: factors[5]
    };
  });
  var PlayerX, PlayerO;

  var Game = /*#__PURE__*/function (_React$Component) {
    _inherits(Game, _React$Component);

    var _super = _createSuper(Game);

    function Game(props) {
      var _this;

      _classCallCheck(this, Game);

      _this = _super.call(this, props);
      PlayerX = new PlayerFool('X');
      PlayerO = new PlayerAI('O', 'X');
      var initialSquares = Array(9).fill(null);
      _this.state = {
        history: [{
          squares: initialSquares,
          squareIndex: null
        }],
        xIsNext: true,
        stepNumber: 0,
        currentMode: GameModes.humanVsComputer,
        autoStart: false,
        OWeights: Object.assign([], PlayerO.getWeights()),
        strategy: Strategy.getNamedStrategy(Strategy.getBoardStatus(new PlayerAI('O', 'X').convertSquaresToBitmap(initialSquares)).factors),
        winnerInfo: null,
        round: 1,
        countDown: 0,
        disabled: false
      };
      _this.optionChanged = _this.optionChanged.bind(_assertThisInitialized(_this));
      _this.changeCountdownNumber = _this.changeCountdownNumber.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Game, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        PlayerO.setWeightsUpdatedCallback(this.weightsUpdated.bind(this));
        PlayerX.setWeightsUpdatedCallback(this.weightsUpdated.bind(this));
      }
    }, {
      key: "changeCountdownNumber",
      value: function changeCountdownNumber(e) {
        this.setState({
          countDown: e.target.value
        });
      }
    }, {
      key: "handleClick",
      value: function handleClick(i, callback) {
        var _this2 = this;

        var history = this.state.history.slice(0, this.state.stepNumber + 1);
        var current = history[history.length - 1];
        var squares = current.squares.slice();

        if (this.notifyGameOverIfEnds(squares)) {
          this.setState({
            disabled: true
          });
          return;
        }

        if (squares[i]) {
          return;
        }

        this.placeAt(squares, i, history, function () {
          _this2.setState({
            strategy: Strategy.getNamedStrategy(Strategy.getBoardStatus(new PlayerAI('O', 'X').convertSquaresToBitmap(_this2.state.history[_this2.state.history.length - 1].squares)).factors)
          });

          if (_this2.notifyGameOverIfEnds(_this2.state.history[_this2.state.stepNumber].squares)) {
            return;
          }

          if (!_this2.state.autoPlaying) {
            setTimeout(function () {
              if (!_this2.state.xIsNext) {
                _this2.setState({
                  disabled: true
                });

                setTimeout(function () {
                  PlayerO.nextMove(_this2.state.history[_this2.state.stepNumber].squares, _this2);

                  _this2.setState({
                    disabled: false
                  });
                }, 600);
                return;
              }

              if (_this2.state.xIsNext && _this2.state.currentMode === GameModes.computerVsComputer) {
                PlayerX.nextMove(_this2.state.history[_this2.state.stepNumber].squares, _this2);
              }
            }, 10);
          }

          typeof callback === 'function' && callback();
        });
      }
    }, {
      key: "notifyGameOverIfEnds",
      value: function notifyGameOverIfEnds(squares) {
        var progress = Judger.gameProgress(PlayerO.convertSquaresToBitmap(squares));

        if (Judger.gameEnds(progress)) {
          this.gameEnds({
            who: progress.lost ? 'X' : progress.win ? 'O' : null,
            where: progress.lost || progress.win || []
          });
          return true;
        }

        return false;
      }
    }, {
      key: "placeAt",
      value: function placeAt(squares, i, history, afterStateChangedCallback) {
        if (squares[i]) {
          return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
            squareIndex: i
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext
        }, afterStateChangedCallback);
      }
    }, {
      key: "jumpTo",
      value: function jumpTo(step, callback) {
        var _this3 = this;

        this.setState({
          stepNumber: step,
          xIsNext: step % 2 === 0,
          winnerInfo: step === 0 ? null : this.state.winnerInfo,
          disabled: step === 0 ? false : this.state.disabled
        }, function () {
          _this3.autoStart(_this3.state.currentMode, _this3.state.autoStart);

          typeof callback === 'function' && callback();
        });
      }
    }, {
      key: "optionChanged",
      value: function optionChanged(selectedMode, autoStart) {
        var _this4 = this;

        this.setState({
          currentMode: selectedMode,
          autoStart: autoStart
        }, function () {
          _this4.autoStart(selectedMode, autoStart);
        });
      }
    }, {
      key: "autoStart",
      value: function autoStart(selectedMode, _autoStart) {
        var _this5 = this;

        if (selectedMode === GameModes.computerVsComputer && _autoStart && this.state.stepNumber === 0) {
          this.setState({
            endsAt: undefined
          }, function () {
            PlayerX.nextMove(_this5.state.history[_this5.state.stepNumber].squares, _this5);
          });
        }
      }
    }, {
      key: "learn",
      value: function learn() {
        this.setState({
          countDown: this.state.countDown - 1
        });
        this.gameOptions.checkAutoStart(true);
        this.gameOptions.selectMode('computerVsComputer');

        if (this.state.stepNumber > 0) {
          this.jumpTo(0);
        }
      }
    }, {
      key: "weightsUpdated",
      value: function weightsUpdated(newWeights) {
        this.setState({
          OWeights: Object.assign([], PlayerO.getWeights())
        });
      }
    }, {
      key: "gameEnds",
      value: function gameEnds(winnerInfo) {
        var _this6 = this;

        PlayerO.tryLearn(this.state.history[this.state.stepNumber].squares);
        PlayerO.clean();
        Stats.updateRoundResult(winnerInfo ? winnerInfo.who : null);
        this.setState({
          winnerInfo: winnerInfo,
          round: this.state.round + 1,
          endsAt: this.state.stepNumber
        }, function () {
          if (_this6.state.countDown > 0) {
            _this6.setState({
              countDown: _this6.state.countDown - 1
            }, function () {
              _this6.jumpTo(0);
            });
          } else {
            _this6.setState({
              autoPlaying: false
            });
          }
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this7 = this;

        var history = this.state.history;
        var current = history[this.state.stepNumber];
        var winner = this.state.winnerInfo ? this.state.winnerInfo.who : null;
        var status;

        if (winner) {
          status = Resources.getInstance().winner + winner;
        } else {
          if (!this.state.winnerInfo) {
            status = Resources.getInstance().getNextPlayer(this.state.xIsNext, this.state.stepNumber);
          } else {
            status = '和棋！';
          }
        }

        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "flex-container",
          style: {
            minWidth: '300px'
          }
        }, this.state.stepNumber > 0 && /*#__PURE__*/React__default["default"].createElement(_Progress__default["default"], {
          percent: this.state.disabled ? 0 : 100,
          position: "fixed"
        }), /*#__PURE__*/React__default["default"].createElement(_WhiteSpace__default["default"], {
          size: "lg"
        }), /*#__PURE__*/React__default["default"].createElement(LearningStatus, {
          state: this.state
        }), /*#__PURE__*/React__default["default"].createElement(_WhiteSpace__default["default"], {
          size: "lg"
        }), /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"], null, /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"].Item, {
          style: {
            textAlign: 'center'
          }
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          style: {
            height: '50px'
          },
          className: classnames__default["default"]({
            'win': this.state.winnerInfo,
            'progress': !this.state.winnerInfo
          })
        }, status))), /*#__PURE__*/React__default["default"].createElement(_WhiteSpace__default["default"], {
          size: "lg"
        }), /*#__PURE__*/React__default["default"].createElement(_WhiteSpace__default["default"], {
          size: "lg"
        }), /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"], null, /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"].Item, {
          style: {
            textAlign: 'center'
          }
        }, /*#__PURE__*/React__default["default"].createElement(Board, {
          squares: current.squares,
          disabled: this.state.disabled,
          onClick: function onClick(i) {
            return _this7.state.currentMode === GameModes.computerVsComputer ? false : _this7.handleClick(i);
          },
          winner: this.state.winnerInfo
        }))), /*#__PURE__*/React__default["default"].createElement(_WhiteSpace__default["default"], {
          size: "lg"
        }), /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"], null, /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"].Item, null, /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
          style: {
            visibility: this.state.winnerInfo !== null ? 'visible' : 'hidden'
          },
          icon: /*#__PURE__*/React__default["default"].createElement("img", {
            src: "https://gw.alipayobjects.com/zos/rmsportal/jBfVSpDwPbitsABtDDlB.svg",
            alt: ""
          }),
          onClick: function onClick() {
            return _this7.jumpTo(0);
          }
        }, "\u518D\u6765\u4E00\u5C40\uFF01"))), /*#__PURE__*/React__default["default"].createElement(_WhiteSpace__default["default"], {
          size: "lg"
        }), /*#__PURE__*/React__default["default"].createElement(Result, {
          winnerInfo: this.state.winnerInfo || {}
        }), /*#__PURE__*/React__default["default"].createElement(_WhiteSpace__default["default"], {
          size: "lg"
        }), /*#__PURE__*/React__default["default"].createElement(_WhiteSpace__default["default"], {
          size: "lg"
        }), /*#__PURE__*/React__default["default"].createElement(_WhiteSpace__default["default"], {
          size: "lg"
        }), /*#__PURE__*/React__default["default"].createElement(_WhiteSpace__default["default"], {
          size: "lg"
        }), /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"], null, /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"].Item, {
          style: {
            textAlign: 'center'
          }
        }, /*#__PURE__*/React__default["default"].createElement(Stats, {
          round: this.state.round
        }))), /*#__PURE__*/React__default["default"].createElement(_WhiteSpace__default["default"], {
          size: "lg"
        }), /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"], {
          style: {
            display: 'none'
          }
        }, /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"].Item, null, /*#__PURE__*/React__default["default"].createElement("p", null, Resources.getInstance().autoPlay, " ", /*#__PURE__*/React__default["default"].createElement("input", {
          type: "number",
          onChange: this.changeCountdownNumber,
          id: "turns",
          value: this.state.countDown
        }), " ", Resources.getInstance().round, "\xA0\xA0\xA0\xA0", /*#__PURE__*/React__default["default"].createElement("button", {
          id: "start-auto-button",
          onClick: function onClick() {
            return _this7.learn();
          }
        }, Resources.getInstance().startLearning))), /*#__PURE__*/React__default["default"].createElement(_Flex__default["default"].Item, null, /*#__PURE__*/React__default["default"].createElement(GameOptions, {
          readonly: this.state.stepNumber,
          optionChanged: this.optionChanged,
          autoStart: this.state.autoStart,
          mode: this.state.currentMode,
          ref: function ref(gameOptions) {
            return _this7.gameOptions = gameOptions;
          }
        }))));
      }
    }, {
      key: "move",
      value: function move(squares, callback) {
        if (this.state.xIsNext) {
          return PlayerX.nextMove(squares, this, callback);
        }

        return PlayerO.nextMove(squares, this, callback);
      }
    }, {
      key: "autoPlay",
      value: function autoPlay() {
        var _this8 = this;

        this.setState({
          autoPlaying: true
        }, function () {
          var squares = _this8.state.history[_this8.state.stepNumber].squares;
          var progress = Judger.gameProgress(PlayerO.convertSquaresToBitmap(squares));

          if (!Judger.gameEnds(progress)) {
            _this8.move(squares, _this8.autoPlay.bind(_this8));
          } else {
            _this8.gameEnds({
              who: progress.win ? 'O' : progress.lost ? 'X' : null,
              where: progress.win || progress.lost || []
            });

            _this8.setState({
              autoPlaying: false
            });
          }
        });
      }
    }]);

    return Game;
  }(React__default["default"].Component);

  ReactDOM__default["default"].render( /*#__PURE__*/React__default["default"].createElement(Game, null), document.getElementById('root'));

})(React, ReactDOM, null, _Button, null, _Flex, null, _WhiteSpace, null, _Progress, null, _List, null, _Checkbox, null, _Picker, antd, classnames, null, _Modal);
