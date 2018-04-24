/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return GRANTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PUBS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DB_JSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DB_DUMP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DB_SQLITE; });
/* unused harmony export DB_DUMP_URI */
var GRANTS = '../../raw-data/grants.xlsx';
var PUBS = '../../raw-data/publications.xlsx';
var DB_JSON = '../../raw-data/database.json';
var DB_DUMP = '../../raw-data/db-dump.json';
var DB_SQLITE = '../../raw-data/db/bbsrc-sqlite.db';
var DB_DUMP_URI = '/assets/db-dump.json';


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BBSRCDatabase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxdb__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxdb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxdb_plugins_validate__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxdb_plugins_validate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxdb_plugins_validate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxdb_plugins_schema_check__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxdb_plugins_schema_check___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxdb_plugins_schema_check__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_pouchdb_adapter_idb__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_pouchdb_adapter_idb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_pouchdb_adapter_idb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_pouchdb_adapter_node_websql__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_pouchdb_adapter_node_websql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_pouchdb_adapter_node_websql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pouchdb_adapter_memory__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pouchdb_adapter_memory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_pouchdb_adapter_memory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__publication_schema__ = __webpack_require__(13);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



// Commenting out as we don't use it at this time.
// import * as leveldown from 'leveldown';
// import * as rocksdb from 'rocksdb';




var BBSRCDatabase = (function () {
    function BBSRCDatabase(production, adapter, rxdbOptions) {
        if (adapter === void 0) { adapter = 'memory'; }
        if (rxdbOptions === void 0) { rxdbOptions = {}; }
        this.production = production;
        this.adapter = adapter;
        this.rxdbOptions = rxdbOptions;
        this.collections = [
            { name: 'publication', schema: __WEBPACK_IMPORTED_MODULE_6__publication_schema__["a" /* PublicationSchema */] }
        ];
        this.adapters = {
            'idb': __WEBPACK_IMPORTED_MODULE_3_pouchdb_adapter_idb__,
            'websql': __WEBPACK_IMPORTED_MODULE_4_pouchdb_adapter_node_websql__,
            'memory': __WEBPACK_IMPORTED_MODULE_5_pouchdb_adapter_memory__
        };
        this.adapterMapper = {};
    }
    BBSRCDatabase.prototype.get = function (initializer) {
        if (!BBSRCDatabase.dbPromise) {
            BBSRCDatabase.dbPromise = this._create(initializer);
        }
        return BBSRCDatabase.dbPromise;
    };
    BBSRCDatabase.prototype.initializeCollection = function (collection, data) {
        return __awaiter(this, void 0, void 0, function () {
            var db, coll, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get()];
                    case 1:
                        db = _a.sent();
                        coll = db[collection];
                        return [4 /*yield*/, coll.find().limit(1).exec()];
                    case 2:
                        if (!((_a.sent()).length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(data.map(function (item) { return coll.insert(item); }))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, coll.find().exec()];
                    case 5:
                        results = (_a.sent()).length;
                        this.log(collection + ": " + results);
                        return [2 /*return*/];
                }
            });
        });
    };
    BBSRCDatabase.prototype.initialize = function (db) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    BBSRCDatabase.prototype._create = function (initializer) {
        return __awaiter(this, void 0, void 0, function () {
            var adapter, db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setupPlugins();
                        adapter = this.adapterMapper[this.adapter] || this.adapter;
                        this.log('DatabaseService: creating database');
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_0_rxdb___default.a.create(Object.assign({
                                name: 'bbsrc',
                                adapter: adapter
                            }, this.rxdbOptions))];
                    case 1:
                        db = _a.sent();
                        this.log('DatabaseService: creating collections');
                        return [4 /*yield*/, Promise.all(this.collections.map(function (colData) { return db.collection(colData); }))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.initialize(db)];
                    case 3:
                        _a.sent();
                        if (!initializer) return [3 /*break*/, 5];
                        return [4 /*yield*/, initializer(db)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, db];
                }
            });
        });
    };
    BBSRCDatabase.prototype.setupPlugins = function () {
        if (!this.production) {
            // schema-checks should be used in dev-mode only
            __WEBPACK_IMPORTED_MODULE_0_rxdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_2_rxdb_plugins_schema_check___default.a);
        }
        __WEBPACK_IMPORTED_MODULE_0_rxdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_1_rxdb_plugins_validate___default.a);
        __WEBPACK_IMPORTED_MODULE_0_rxdb___default.a.plugin(this.adapters[this.adapter]);
        // Always add the memory adapter
        if (this.adapter !== 'memory') {
            __WEBPACK_IMPORTED_MODULE_0_rxdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_5_pouchdb_adapter_memory__);
        }
        __WEBPACK_IMPORTED_MODULE_0_rxdb___default.a.QueryChangeDetector.enable(true);
        if (!this.production) {
            __WEBPACK_IMPORTED_MODULE_0_rxdb___default.a.QueryChangeDetector.enableDebugging();
        }
    };
    BBSRCDatabase.prototype.log = function (message) {
        if (!this.production) {
            console.log(message);
        }
    };
    BBSRCDatabase.dbPromise = null;
    return BBSRCDatabase;
}());



/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("rxdb");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("rxdb/plugins/validate");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("rxdb/plugins/schema-check");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("pouchdb-adapter-idb");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("pouchdb-adapter-node-websql");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("pouchdb-adapter-memory");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationSchema; });
var PublicationSchema = {
    'title': 'publication schema',
    'description': 'describes a bbsrc publication',
    'version': 0,
    'disableKeyCompression': true,
    'properties': {
        'id': {
            'type': 'string',
            'primary': true
        },
        'title': {
            'type': 'string',
            'default': ''
        },
        'author': {
            'type': 'string',
            'default': ''
        },
        'year': {
            'type': 'number',
            'default': 0,
            'index': true
        },
        'pmid': {
            'type': 'string',
            'default': ''
        },
        'doi': {
            'type': 'string',
            'default': ''
        },
        'pmcid': {
            'type': 'string',
            'default': ''
        },
        'journalName': {
            'type': 'string',
            'default': '',
            'index': true
        },
        'journalId': {
            'type': 'number',
            'default': '',
            'index': true
        },
        'subdisciplines': {
            'type': 'array',
            'uniqueItems': true,
            'item': {
                'type': 'object',
                'properties': {
                    'subd_id': {
                        'type': 'number'
                    },
                    'weight': {
                        'type': 'number'
                    }
                }
            }
        },
        'grantId': {
            'type': 'string',
            'default': ''
        },
        'grantTitle': {
            'type': 'string',
            'default': ''
        },
        'grantClasses': {
            'type': 'array',
            'uniqueItems': true,
            'item': {
                'type': 'string'
            }
        },
        'grantYear': {
            'type': 'number',
            'default': 0,
            'index': true
        },
        'grantInstitution': {
            'type': 'string',
            'default': '',
            'index': true
        },
        'grantMechanism': {
            'type': 'string',
            'default': '',
            'index': true
        },
        'fulltext': {
            'type': 'string',
            'default': ''
        }
    }
};


/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("graphql-server-express");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("apollo-errors");

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return schema; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_tools__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_tools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_tools__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schema_definition__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resolvers__ = __webpack_require__(33);



var schema = Object(__WEBPACK_IMPORTED_MODULE_0_graphql_tools__["makeExecutableSchema"])({ typeDefs: __WEBPACK_IMPORTED_MODULE_1__schema_definition__["a" /* schemaDef */], resolvers: __WEBPACK_IMPORTED_MODULE_2__resolvers__["a" /* resolvers */] });


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return schemaDef; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types_graphql__ = __webpack_require__(32);

var schemaDef = "\nscalar Date\n\n" + __WEBPACK_IMPORTED_MODULE_0__types_graphql__["a" /* TypesSchema */] + "\n\ntype PageInfo {\n  totalCount: Int\n}\n\ntype PublicationQuery {\n  results: [Publication!]\n  pageInfo: PageInfo\n}\n\ntype SubdisciplineQuery {\n  results: [SubdisciplineWeight!]\n  pageInfo: PageInfo\n}\n\ntype GetDistinctQuery {\n  results: [String]\n  pageInfo: PageInfo\n}\n\ntype Query {\n  getPublications(filter: Filter): PublicationQuery\n  getSubdisciplines(filter: Filter): SubdisciplineQuery\n  getDistinct(fieldName: String, filter: Filter): GetDistinctQuery\n}\n\nschema {\n  query: Query\n}\n";


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypesSchema; });
var TypesSchema = "\ntype SubdisciplineWeight {\n  subd_id: ID!\n  weight: Float\n}\n\ntype Publication {\n  id: ID!\n  title: String\n  author: String\n  year: Int\n  pmid: String\n  doi: String\n  pmcid: String\n\n  journalName: String\n  journalId: Int\n  subdisciplines: [SubdisciplineWeight]\n\n  grantId: String\n  grantTitle: String\n  grantClasses: [String!]\n  grantYear: Int\n  grantInstitution: String\n  grantMechanism: String\n  fulltext: String\n}\n\ninput YearRange {\n  start: Int!\n  end: Int!\n}\n\ninput Sort {\n  field: String!\n  ascending: Boolean\n}\n\ninput Filter {\n  limit: Int\n  subd_id: [Int!]\n  sort: [Sort!]\n  year: YearRange\n\n  fulltext: [String!]\n  researchClassification: [String!]\n  sessionYear: YearRange\n  institution: [String!]\n  mechanism: [String!]\n  journalName: [String!]\n}\n";


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return resolvers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rxdb_queries__ = __webpack_require__(34);

var resolvers = {
    Query: {
        'getPublications': function (obj, args, context, info) {
            return Object(__WEBPACK_IMPORTED_MODULE_0__rxdb_queries__["b" /* getPublications */])(context.database, args.filter);
        },
        'getSubdisciplines': function (obj, args, context, info) {
            return Object(__WEBPACK_IMPORTED_MODULE_0__rxdb_queries__["c" /* getSubdisciplines */])(context.database, args.filter);
        },
        'getDistinct': function (obj, args, context, info) {
            return Object(__WEBPACK_IMPORTED_MODULE_0__rxdb_queries__["a" /* getDistinct */])(context.database, args.fieldName, args.filter);
        }
    }
};


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getPublications;
/* harmony export (immutable) */ __webpack_exports__["c"] = getSubdisciplines;
/* harmony export (immutable) */ __webpack_exports__["a"] = getDistinct;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// FROM: https://github.com/sindresorhus/escape-string-regexp/
var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
function escapeStringRegExp(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a string');
    }
    return str.replace(matchOperatorsRe, '\\$&');
}
function sumAgg(items, itemKeyField, keyField, valueField) {
    return __awaiter(this, void 0, void 0, function () {
        var acc, _i, items_1, innerItem, _a, _b, item, key, weight;
        return __generator(this, function (_c) {
            acc = {};
            for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                innerItem = items_1[_i];
                for (_a = 0, _b = innerItem[itemKeyField]; _a < _b.length; _a++) {
                    item = _b[_a];
                    key = item[keyField];
                    weight = item[valueField];
                    if (acc.hasOwnProperty(key)) {
                        acc[key] += weight;
                    }
                    else {
                        acc[key] = weight;
                    }
                }
            }
            return [2 /*return*/, acc];
        });
    });
}
function getPublications(database, filter) {
    if (filter === void 0) { filter = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var db, query, regexp, results, totalCount, field_1, ascending;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.get()];
                case 1:
                    db = _a.sent();
                    query = db.publication.find();
                    if (filter.subd_id) {
                        query = query.where('subdisciplines').elemMatch({ 'subd_id': { '$in': filter.subd_id } });
                    }
                    if (filter.journalName) {
                        query = query.where('journalName')["in"](filter.journalName);
                    }
                    if (filter.mechanism) {
                        query = query.where('grantMechanism')["in"](filter.mechanism);
                    }
                    if (filter.institution) {
                        query = query.where('grantInstitution')["in"](filter.institution);
                    }
                    if (filter.year) {
                        if (filter.year.start === filter.year.end) {
                            query = query.where('year').eq(filter.year.start);
                        }
                        else {
                            query = query.where('year').gte(filter.year.start).lte(filter.year.end);
                        }
                    }
                    if (filter.sessionYear) {
                        if (filter.sessionYear.start === filter.sessionYear.end) {
                            query = query.where('grantYear').eq(filter.sessionYear.start);
                        }
                        else {
                            query = query.where('grantYear').gte(filter.sessionYear.start).lte(filter.sessionYear.end);
                        }
                    }
                    if (filter.researchClassification) {
                        query = query.where('grantClasses').elemMatch({ '$in': filter.researchClassification });
                    }
                    if (filter.fulltext) {
                        regexp = new RegExp(filter.fulltext.map(function (text) { return escapeStringRegExp(text); }).join('|'), 'i');
                        query = query.where('fulltext').regex(regexp);
                    }
                    return [4 /*yield*/, query.exec()];
                case 2:
                    results = _a.sent();
                    totalCount = results.length;
                    if (filter.sort && filter.sort.length > 0) {
                        field_1 = filter.sort[0].field;
                        ascending = filter.sort[0].ascending === true;
                        if (ascending) {
                            results.sort(function (a, b) { return a[field_1] - b[field_1]; });
                        }
                        else {
                            results.sort(function (a, b) { return b[field_1] - a[field_1]; });
                        }
                    }
                    if (filter.limit && filter.limit > 0) {
                        results = results.slice(0, filter.limit);
                    }
                    return [2 /*return*/, { results: results, pageInfo: { totalCount: totalCount } }];
            }
        });
    });
}
function getSubdisciplines(database, filter) {
    if (filter === void 0) { filter = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var publications, weights, results, totalCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getPublications(database, filter)];
                case 1:
                    publications = _a.sent();
                    return [4 /*yield*/, sumAgg(publications.results, 'subdisciplines', 'subd_id', 'weight')];
                case 2:
                    weights = _a.sent();
                    results = Object.entries(weights).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return ({ subd_id: k, weight: v });
                    });
                    totalCount = results.length;
                    return [2 /*return*/, { results: results, pageInfo: { totalCount: totalCount } }];
            }
        });
    });
}
function getDistinct(database, fieldName, filter) {
    if (filter === void 0) { filter = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var publications, values, results, totalCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getPublications(database, filter)];
                case 1:
                    publications = (_a.sent()).results;
                    values = {};
                    results = [];
                    publications.forEach(function (pub) {
                        var val = pub.get(fieldName);
                        if (!(typeof val === 'string' || val instanceof String)) {
                            val = JSON.stringify(val);
                        }
                        if (!values.hasOwnProperty(val)) {
                            values[val] = 1;
                            results.push(val);
                        }
                        else {
                            values[val]++;
                        }
                    });
                    totalCount = results.length;
                    return [2 /*return*/, { results: results, pageInfo: { totalCount: totalCount } }];
            }
        });
    });
}


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createServerContext;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rxdb_bbsrc_database__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loader_options__ = __webpack_require__(4);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fs = __webpack_require__(2);



function readJSON(inputFile) {
    return JSON.parse(fs.readFileSync(inputFile));
}
function importDBDump(database, dumpFile) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var dump, db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dump = readJSON(dumpFile);
                    return [4 /*yield*/, database.get(function (db) { return __awaiter(_this, void 0, void 0, function () {
                            var hasResults;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, db.publication.findOne().exec()];
                                    case 1:
                                        hasResults = !!(_a.sent());
                                        if (!!hasResults) return [3 /*break*/, 3];
                                        console.log("Importing dump");
                                        return [4 /*yield*/, db.importDump(dump)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    db = _a.sent();
                    return [2 /*return*/, db];
            }
        });
    });
}
function createServerContext(adapter, dbDumpFile, sqliteFile) {
    if (adapter === void 0) { adapter = 'websql'; }
    if (dbDumpFile === void 0) { dbDumpFile = __WEBPACK_IMPORTED_MODULE_2__loader_options__["a" /* DB_DUMP */]; }
    if (sqliteFile === void 0) { sqliteFile = __WEBPACK_IMPORTED_MODULE_2__loader_options__["c" /* DB_SQLITE */]; }
    console.log(adapter, dbDumpFile, sqliteFile);
    var rxdbOptions = {};
    if (['websql', 'leveldown', 'rocksdb'].indexOf(adapter) !== -1 && sqliteFile) {
        rxdbOptions['name'] = sqliteFile;
    }
    var database = new __WEBPACK_IMPORTED_MODULE_0__rxdb_bbsrc_database__["a" /* BBSRCDatabase */](false, adapter, rxdbOptions);
    importDBDump(database, dbDumpFile).then(function () {
        console.log('DB Loaded');
    });
    return new __WEBPACK_IMPORTED_MODULE_1__context__["a" /* GraphQLContext */](database);
}
// export const context = createServerContext();


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphQLContext; });
var GraphQLContext = (function () {
    function GraphQLContext(database, db) {
        var _this = this;
        this.database = database;
        this.db = db;
        if (!db) {
            database.get().then(function (dbInstance) { _this.db = dbInstance; });
        }
    }
    return GraphQLContext;
}());



/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(75);


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_morgan__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_server_express__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_server_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_graphql_server_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_graphql__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_apollo_errors__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_apollo_errors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_apollo_errors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__graphql_schema__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__graphql_server_context__ = __webpack_require__(35);
/* eslint-disable global-require,no-console,no-new */









// Constants
var PORT = process.env.PORT || 8080;
// if you're not using docker-compose for local development, this will default to 8080
// to prevent non-root permission problems with 80. Dockerfile is set to make this 80
// because containers don't have that issue :)
var DEFAULT_ENDPOINT_URL = '/graphql/';
var ENDPOINT_URL = process.env.ENDPOINT_URL || DEFAULT_ENDPOINT_URL;
var ADAPTER = process.env.ADAPTER || 'websql';
var DB_DUMP = process.env.DB_DUMP || 'db-dump.json';
var DB_SQLITE = process.env.DB_SQLITE || 'db/bbsrc';
var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
app.use(__WEBPACK_IMPORTED_MODULE_1_morgan___default()('common'));
//
// Top level error
//
// Unless any other error is matched we will send this for
// all error conditions.
//
var UnknownError = Object(__WEBPACK_IMPORTED_MODULE_6_apollo_errors__["createError"])('UnknownError', {
    message: 'An unknown error has occurred.  Please try again later'
});
var formatError = function (error) {
    //
    // Log raw errors to the server console
    //
    console.log(error);
    console.log('----^ ^ ^ ^ ^ error ^ ^ ^ ^ ^----');
    //
    // Prepare a formatted error for the client, so that we
    // don't expose any internals about the API or database connection
    // to the client making the GraphQL query.
    //
    var formattedError = Object(__WEBPACK_IMPORTED_MODULE_6_apollo_errors__["formatError"])(error);
    if (formattedError instanceof __WEBPACK_IMPORTED_MODULE_5_graphql__["GraphQLError"]) {
        formattedError = Object(__WEBPACK_IMPORTED_MODULE_6_apollo_errors__["formatError"])(new UnknownError({
            data: {
                originalMessage: formattedError.message,
                originalError: formattedError.name
            }
        }));
    }
    return formattedError;
};
var context = Object(__WEBPACK_IMPORTED_MODULE_8__graphql_server_context__["a" /* createServerContext */])(ADAPTER, DB_DUMP, DB_SQLITE);
//
// Setup GraphQl endpoint
//
// Use Express to listen for all GraphQL queries at
// the '/graphql' path.
//
// Load the schema and context for each GraphQL request.
//
app.use('/graphql', __WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json(), Object(__WEBPACK_IMPORTED_MODULE_2_graphql_server_express__["graphqlExpress"])(function (request, response) {
    return {
        schema: __WEBPACK_IMPORTED_MODULE_7__graphql_schema__["a" /* schema */],
        context: context,
        formatError: formatError
    };
}));
app.get('/healthz', function (req, res) {
    // do app logic here to determine if app is truly healthy
    // you should return 200 if healthy, and anything else will fail
    // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
    res.send('I am happy and healthy\n');
});
// Client compiled project path
app.use('/', __WEBPACK_IMPORTED_MODULE_0_express___default.a.static('client'));
// Start the GraphQL server and populate DB with seed data if empty
var server = Object(__WEBPACK_IMPORTED_MODULE_4_http__["createServer"])(app);
server.listen(PORT, function () {
    console.log("Webserver is ready on port " + PORT);
});
//
// need this in docker container to properly exit since node doesn't handle SIGINT/SIGTERM
// this also won't work on using npm start since:
// https://github.com/npm/npm/issues/4603
// https://github.com/npm/npm/pull/10868
// https://github.com/RisingStack/kubernetes-graceful-shutdown-example/blob/master/src/index.js
// if you want to use npm then start with `docker run --init` to help, but I still don't think it's
// a graceful shutdown of node process
//
// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
    console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
    shutdown();
});
// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
    console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
    shutdown();
});
// shut down server
function shutdown() {
    server.close(function onServerClosed(err) {
        if (err) {
            console.error(err);
            process.exitCode = 1;
        }
        process.exit();
    });
}
//
// need above in docker container to properly exit
//


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ })
/******/ ]);