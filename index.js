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
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PUBS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return JOURNAL_ISSN_MAPPING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DB_JSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DB_DUMP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DB_SQLITE; });
/* unused harmony export DB_DUMP_URI */
var GRANTS = '../../raw-data/grants.xlsx';
var PUBS = '../../raw-data/publications.xlsx';
var JOURNAL_ISSN_MAPPING = '../../raw-data/20180205-ISSNs for BBSRC Publications.xlsx';
var DB_JSON = '../../raw-data/database.json';
var DB_DUMP = '../../raw-data/db-dump.json';
var DB_SQLITE = '../../raw-data/db/';
var DB_DUMP_URI = '/assets/db-dump.json';


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nano-sql");

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BBSRCDatabase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nano_sql__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nano_sql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nano_sql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__publication_model__ = __webpack_require__(8);
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


var BBSRCDatabase = (function () {
    function BBSRCDatabase(production, adapter, nSQLOptions) {
        if (adapter === void 0) { adapter = 'PERM'; }
        if (nSQLOptions === void 0) { nSQLOptions = {}; }
        this.production = production;
        this.adapter = adapter;
        this.nSQLOptions = nSQLOptions;
        this.collections = [
            { name: 'publication', schema: __WEBPACK_IMPORTED_MODULE_1__publication_model__["a" /* PublicationModel */] }
        ];
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
                        coll = db.table(collection);
                        return [4 /*yield*/, this.collectionCount(collection)];
                    case 2:
                        if (!((_a.sent()) === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, coll.loadJS(collection, data)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.collectionCount(collection)];
                    case 5:
                        results = _a.sent();
                        this.log(collection + ": " + results);
                        return [2 /*return*/];
                }
            });
        });
    };
    BBSRCDatabase.prototype.collectionCount = function (collection, db) {
        return __awaiter(this, void 0, void 0, function () {
            var query, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!db) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.get()];
                    case 1:
                        db = _a.sent();
                        _a.label = 2;
                    case 2:
                        query = db.table(collection).query('select', ['COUNT(*) AS total']);
                        return [4 /*yield*/, query.exec()];
                    case 3:
                        results = (_a.sent())[0];
                        return [2 /*return*/, results['total'] || results['COUNT(*) AS total'] || 0];
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
            var config, db, _i, _a, collection;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = Object.assign({
                            mode: this.adapter
                        }, this.nSQLOptions);
                        this.log('DatabaseService: creating database');
                        this.log('DatabaseService: creating collections');
                        db = null;
                        _i = 0, _a = this.collections;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        collection = _a[_i];
                        db = Object(__WEBPACK_IMPORTED_MODULE_0_nano_sql__["nSQL"])(collection.name).model(collection.schema).config(config);
                        return [4 /*yield*/, db.connect()];
                    case 2:
                        _b.sent();
                        this[collection.name] = db;
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.initialize(db)];
                    case 5:
                        _b.sent();
                        if (!initializer) return [3 /*break*/, 7];
                        return [4 /*yield*/, initializer(db)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/, db];
                }
            });
        });
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationModel; });
var PublicationModel = [
    { key: 'id', type: 'string', props: ['pk'] },
    { key: 'title', type: 'string' },
    { key: 'author', type: 'string' },
    { key: 'year', type: 'int' },
    { key: 'pmid', type: 'string' },
    { key: 'doi', type: 'string' },
    { key: 'pmcid', type: 'string' },
    { key: 'journalName', type: 'string' },
    { key: 'journalId', type: 'int' },
    { key: 'subdisciplines', type: 'array' },
    { key: 'grantId', type: 'string' },
    { key: 'grantTitle', type: 'string' },
    { key: 'grantClasses', type: 'array' },
    { key: 'grantYear', type: 'int' },
    { key: 'grantInstitution', type: 'string' },
    { key: 'grantMechanism', type: 'string' },
    { key: 'fulltext', type: 'string' }
];


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("graphql-server-express");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("apollo-errors");

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return schema; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_tools__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_tools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_tools__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schema_definition__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resolvers__ = __webpack_require__(28);



var schema = Object(__WEBPACK_IMPORTED_MODULE_0_graphql_tools__["makeExecutableSchema"])({ typeDefs: __WEBPACK_IMPORTED_MODULE_1__schema_definition__["a" /* schemaDef */], resolvers: __WEBPACK_IMPORTED_MODULE_2__resolvers__["a" /* resolvers */] });


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return schemaDef; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types_graphql__ = __webpack_require__(27);

var schemaDef = "\nscalar Date\n\n" + __WEBPACK_IMPORTED_MODULE_0__types_graphql__["a" /* TypesSchema */] + "\n\ntype PageInfo {\n  totalCount: Int\n}\n\ntype PublicationQuery {\n  results: [Publication!]\n  pageInfo: PageInfo\n}\n\ntype SubdisciplineQuery {\n  results: [SubdisciplineWeight!]\n  pageInfo: PageInfo\n}\n\ntype GetDistinctQuery {\n  results: [String]\n  pageInfo: PageInfo\n}\n\ntype Query {\n  getPublications(filter: Filter): PublicationQuery\n  getSubdisciplines(filter: Filter): SubdisciplineQuery\n  getDistinct(fieldName: String, filter: Filter): GetDistinctQuery\n}\n\nschema {\n  query: Query\n}\n";


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypesSchema; });
var TypesSchema = "\ntype SubdisciplineWeight {\n  subd_id: ID!\n  weight: Float\n}\n\ntype Publication {\n  id: ID!\n  title: String\n  author: String\n  year: Int\n  pmid: String\n  doi: String\n  pmcid: String\n\n  journalName: String\n  journalId: Int\n  subdisciplines: [SubdisciplineWeight]\n\n  grantId: String\n  grantTitle: String\n  grantClasses: [String!]\n  grantYear: Int\n  grantInstitution: String\n  grantMechanism: String\n  fulltext: String\n}\n\ninput YearRange {\n  start: Int!\n  end: Int!\n}\n\ninput Sort {\n  field: String!\n  ascending: Boolean\n}\n\ninput Filter {\n  limit: Int\n  subd_id: [Int!]\n  showMultidisciplinary: Boolean\n  showUnmapped: Boolean\n  sort: [Sort!]\n  year: YearRange\n\n  fulltext: [String!]\n  researchClassification: [String!]\n  sessionYear: YearRange\n  institution: [String!]\n  mechanism: [String!]\n  journalName: [String!]\n}\n";


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return resolvers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nsql_queries__ = __webpack_require__(29);

var resolvers = {
    Query: {
        'getPublications': function (obj, args, context, info) {
            return Object(__WEBPACK_IMPORTED_MODULE_0__nsql_queries__["b" /* getPublications */])(context.database, args.filter);
        },
        'getSubdisciplines': function (obj, args, context, info) {
            return Object(__WEBPACK_IMPORTED_MODULE_0__nsql_queries__["c" /* getSubdisciplines */])(context.database, args.filter);
        },
        'getDistinct': function (obj, args, context, info) {
            return Object(__WEBPACK_IMPORTED_MODULE_0__nsql_queries__["a" /* getDistinct */])(context.database, args.fieldName, args.filter);
        }
    }
};


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getPublications;
/* harmony export (immutable) */ __webpack_exports__["c"] = getSubdisciplines;
/* harmony export (immutable) */ __webpack_exports__["a"] = getDistinct;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nano_sql__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nano_sql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nano_sql__);
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
var UNMAPPED = -1;
var MULTIDISCIPLINARY = -2;
function sumAgg(items, itemKeyField, keyField, valueField) {
    return __awaiter(this, void 0, void 0, function () {
        var acc, _i, items_1, innerItem, _a, _b, item, key, weight;
        return __generator(this, function (_c) {
            acc = {};
            for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                innerItem = items_1[_i];
                for (_a = 0, _b = (innerItem[itemKeyField] || []); _a < _b.length; _a++) {
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
function queryPublications(database, filter, selectArgs) {
    if (filter === void 0) { filter = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var db, query, where, inOrEq, regexp, field, ascending, order, subd_ids, isMultiDisc_1, isUnmapped_1, subd_idMap_1, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.get()];
                case 1:
                    db = _a.sent();
                    query = db.table('publication').query("select", selectArgs);
                    if (filter.subd_id && filter.subd_id.length > 0) {
                        query = db.table('publication').query("select");
                    }
                    where = [];
                    inOrEq = function (field, filter) {
                        if (filter.length === 1) {
                            return [field, '=', filter[0]];
                        }
                        else {
                            return [field, 'IN', filter];
                        }
                    };
                    if (filter.journalName) {
                        if (where.length > 0) {
                            where.push('AND');
                        }
                        where.push(inOrEq('journalName', filter.journalName));
                    }
                    if (filter.mechanism) {
                        if (where.length > 0) {
                            where.push('AND');
                        }
                        where.push(inOrEq('grantMechanism', filter.mechanism));
                    }
                    if (filter.institution) {
                        if (where.length > 0) {
                            where.push('AND');
                        }
                        where.push(inOrEq('grantInstitution', filter.institution));
                    }
                    if (filter.year) {
                        if (where.length > 0) {
                            where.push('AND');
                        }
                        if (filter.year.start === filter.year.end) {
                            where.push(['year', '=', filter.year.start]);
                        }
                        else {
                            where.push(['year', '>=', filter.year.start]);
                            where.push('AND');
                            where.push(['year', '<=', filter.year.end]);
                            // where.push(['year','BETWEEN',[filter.year.start, filter.year.end]]);
                        }
                    }
                    if (filter.sessionYear) {
                        if (where.length > 0) {
                            where.push('AND');
                        }
                        if (filter.sessionYear.start === filter.sessionYear.end) {
                            where.push(['grantYear', '=', filter.sessionYear.start]);
                        }
                        else {
                            where.push(['grantYear', '>=', filter.sessionYear.start]);
                            where.push('AND');
                            where.push(['grantYear', '<=', filter.sessionYear.end]);
                            // where.push(['grantYear','BETWEEN',[filter.sessionYear.start, filter.sessionYear.end]]);
                        }
                    }
                    if (filter.researchClassification) {
                        if (where.length > 0) {
                            where.push('AND');
                        }
                        where.push(['grantClasses', 'INTERSECT', filter.researchClassification]);
                    }
                    if (filter.fulltext) {
                        if (where.length > 0) {
                            where.push('AND');
                        }
                        regexp = filter.fulltext.map(function (text) { return escapeStringRegExp(text); }).join('|').toLowerCase();
                        where.push(['fulltext', 'REGEX', regexp]);
                    }
                    if (where.length > 0) {
                        query = query.where(where.length === 1 ? where[0] : where);
                    }
                    if (filter.sort && filter.sort.length > 0) {
                        field = filter.sort[0].field;
                        ascending = filter.sort[0].ascending === true;
                        order = {};
                        order[field] = ascending === true ? 'asc' : 'desc';
                        query = query.orderBy(order);
                    }
                    if (!(filter.subd_id && filter.subd_id.length > 0)) return [3 /*break*/, 3];
                    subd_ids = filter.subd_id || [];
                    isMultiDisc_1 = subd_ids.indexOf(MULTIDISCIPLINARY) !== -1;
                    isUnmapped_1 = subd_ids.indexOf(UNMAPPED) !== -1;
                    subd_idMap_1 = {};
                    subd_ids.forEach(function (s) { return subd_idMap_1[s] = true; });
                    return [4 /*yield*/, query.exec()];
                case 2:
                    results = _a.sent();
                    results = results.filter(function (row) {
                        var subdisciplines = row.subdisciplines || [];
                        if (isMultiDisc_1 && subdisciplines.length > 1) {
                            return true;
                        }
                        else if (isUnmapped_1 && subdisciplines.length == 0) {
                            return true;
                        }
                        else {
                            return subdisciplines.some(function (s) { return subd_idMap_1[s.subd_id]; });
                        }
                    });
                    if (filter.limit && filter.limit > 0) {
                        results = results.slice(0, filter.limit);
                    }
                    query = Object(__WEBPACK_IMPORTED_MODULE_0_nano_sql__["nSQL"])(results).query('select', selectArgs);
                    return [3 /*break*/, 4];
                case 3:
                    if (filter.limit && filter.limit > 0) {
                        query = query.limit(filter.limit);
                    }
                    _a.label = 4;
                case 4: return [4 /*yield*/, query.exec()];
                case 5: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}
function getPublications(database, filter) {
    if (filter === void 0) { filter = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var results, totalCount, totalCountResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, queryPublications(database, filter)];
                case 1:
                    results = _a.sent();
                    totalCount = results.length;
                    if (!(filter.limit && filter.limit > 0)) return [3 /*break*/, 3];
                    filter = Object.assign({}, filter, { limit: 0 });
                    return [4 /*yield*/, queryPublications(database, filter, ['COUNT(*) AS total'])];
                case 2:
                    totalCountResults = (_a.sent())[0];
                    totalCount = totalCountResults['total'] || totalCountResults['COUNT(*) AS total'] || 0;
                    _a.label = 3;
                case 3: return [2 /*return*/, { results: results, pageInfo: { totalCount: totalCount } }];
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
                case 0: return [4 /*yield*/, queryPublications(database, filter, ['subdisciplines'])];
                case 1:
                    publications = (_a.sent()).map(function (pub) {
                        if (filter.showUnmapped && (!pub.subdisciplines || pub.subdisciplines.length === 0)) {
                            return { 'subdisciplines': [{ subd_id: UNMAPPED, weight: 1 }] };
                        }
                        else if (filter.showMultidisciplinary && pub.subdisciplines && pub.subdisciplines.length > 1) {
                            return { 'subdisciplines': [{ subd_id: MULTIDISCIPLINARY, weight: 1 }] };
                        }
                        else {
                            return pub;
                        }
                    });
                    return [4 /*yield*/, sumAgg(publications, 'subdisciplines', 'subd_id', 'weight')];
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
                case 0: return [4 /*yield*/, queryPublications(database, filter, [fieldName])];
                case 1:
                    publications = (_a.sent());
                    values = {};
                    results = [];
                    publications.forEach(function (pub) {
                        var val = pub[fieldName];
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createServerContext;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nsql_bbsrc_database__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context__ = __webpack_require__(31);
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
                                    case 0: return [4 /*yield*/, database.collectionCount('publication', db)];
                                    case 1:
                                        hasResults = !!(_a.sent());
                                        if (!!hasResults) return [3 /*break*/, 3];
                                        return [4 /*yield*/, db.rawImport(dump)];
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
    if (adapter === void 0) { adapter = 'PERM'; }
    if (dbDumpFile === void 0) { dbDumpFile = __WEBPACK_IMPORTED_MODULE_2__loader_options__["a" /* DB_DUMP */]; }
    if (sqliteFile === void 0) { sqliteFile = __WEBPACK_IMPORTED_MODULE_2__loader_options__["c" /* DB_SQLITE */]; }
    console.log(adapter, dbDumpFile, sqliteFile);
    var options = {};
    if (['PERM'].indexOf(adapter) !== -1 && sqliteFile) {
        options['dbPath'] = sqliteFile;
    }
    var database = new __WEBPACK_IMPORTED_MODULE_0__nsql_bbsrc_database__["a" /* BBSRCDatabase */](false, adapter, options);
    importDBDump(database, dbDumpFile).then(function () {
        console.log('DB Loaded');
    });
    return new __WEBPACK_IMPORTED_MODULE_1__context__["a" /* GraphQLContext */](database);
}


/***/ }),
/* 31 */
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
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(71);


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_morgan__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_server_express__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_server_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_graphql_server_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_graphql__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_apollo_errors__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_apollo_errors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_apollo_errors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__graphql_schema__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__graphql_server_context__ = __webpack_require__(30);
/* eslint-disable global-require,no-console,no-new */









// Constants
var PORT = process.env.PORT || 8080;
// if you're not using docker-compose for local development, this will default to 8080
// to prevent non-root permission problems with 80. Dockerfile is set to make this 80
// because containers don't have that issue :)
var DEFAULT_ENDPOINT_URL = '/graphql/';
var ENDPOINT_URL = process.env.ENDPOINT_URL || DEFAULT_ENDPOINT_URL;
var ADAPTER = process.env.ADAPTER || 'PERM';
var DB_DUMP = process.env.DB_DUMP || 'db-dump.json';
var DB_SQLITE = process.env.DB_SQLITE || 'db';
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
/* 72 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ })
/******/ ]);