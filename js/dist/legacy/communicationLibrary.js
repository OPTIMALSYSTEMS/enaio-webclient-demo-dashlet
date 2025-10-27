(function () {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire2893"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire2893"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("bprvk", function(module, exports) {

$parcel$export(module.exports, "__generator", function () { return $84e75d45d2d40355$export$67ebef60e6f28a6; });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol */ 
var $84e75d45d2d40355$var$extendStatics = function extendStatics1(d, b) {
    $84e75d45d2d40355$var$extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return $84e75d45d2d40355$var$extendStatics(d, b);
};
function $84e75d45d2d40355$export$a8ba968b8961cb8a(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    $84e75d45d2d40355$var$extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var $84e75d45d2d40355$export$18ce0697a983be9b = function __assign1() {
    $84e75d45d2d40355$export$18ce0697a983be9b = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $84e75d45d2d40355$export$18ce0697a983be9b.apply(this, arguments);
};
function $84e75d45d2d40355$export$3c9a16f847548506(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function $84e75d45d2d40355$export$29e00dfd3077644b(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function $84e75d45d2d40355$export$d5ad3fd78186038f(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function $84e75d45d2d40355$export$3a84e1ae4e97e9b0(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
function $84e75d45d2d40355$export$d831c04e792af3d(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++)value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    return useValue ? value : void 0;
}
function $84e75d45d2d40355$export$6a2a36740a146cb8(x) {
    return (typeof x === "undefined" ? "undefined" : (0, $jBhhk._)(x)) === "symbol" ? x : "".concat(x);
}
function $84e75d45d2d40355$export$d1a06452d3489bc7(f, name, prefix) {
    if ((typeof name === "undefined" ? "undefined" : (0, $jBhhk._)(name)) === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
function $84e75d45d2d40355$export$f1db080c865becb9(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function $84e75d45d2d40355$export$1050f835b63b671e(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function $84e75d45d2d40355$export$67ebef60e6f28a6(thisArg, body) {
    var _ = {
        label: 0,
        sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var $84e75d45d2d40355$export$45d3717a4c69092e = Object.create ? function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
        enumerable: true,
        get: function get() {
            return m[k];
        }
    };
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function $84e75d45d2d40355$export$f33643c0debef087(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) $84e75d45d2d40355$export$45d3717a4c69092e(o, m, p);
}
function $84e75d45d2d40355$export$19a8beecd37a4c45(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function $84e75d45d2d40355$export$8d051b38c9118094(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function $84e75d45d2d40355$export$afc72e2116322959() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat($84e75d45d2d40355$export$8d051b38c9118094(arguments[i]));
    return ar;
}
function $84e75d45d2d40355$export$6388937ca91ccae8() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function $84e75d45d2d40355$export$1216008129fb82ed(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function $84e75d45d2d40355$export$10c90e4f7922046c(v) {
    return this instanceof $84e75d45d2d40355$export$10c90e4f7922046c ? (this.v = v, this) : new $84e75d45d2d40355$export$10c90e4f7922046c(v);
}
function $84e75d45d2d40355$export$e427f37a30a4de9b(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof $84e75d45d2d40355$export$10c90e4f7922046c ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function $84e75d45d2d40355$export$bbd80228419bb833(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: $84e75d45d2d40355$export$10c90e4f7922046c(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function $84e75d45d2d40355$export$e3b29a3d6162315f(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof $84e75d45d2d40355$export$19a8beecd37a4c45 === "function" ? $84e75d45d2d40355$export$19a8beecd37a4c45(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function $84e75d45d2d40355$export$4fb47efe1390b86f(cooked, raw) {
    if (Object.defineProperty) Object.defineProperty(cooked, "raw", {
        value: raw
    });
    else cooked.raw = raw;
    return cooked;
}
var $84e75d45d2d40355$var$__setModuleDefault = Object.create ? function __setModuleDefault(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
function $84e75d45d2d40355$export$c21735bcef00d192(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) $84e75d45d2d40355$export$45d3717a4c69092e(result, mod, k);
    }
    $84e75d45d2d40355$var$__setModuleDefault(result, mod);
    return result;
}
function $84e75d45d2d40355$export$da59b14a69baef04(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function $84e75d45d2d40355$export$d5dcaf168c640c35(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function $84e75d45d2d40355$export$d40a35129aaff81f(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function $84e75d45d2d40355$export$81fdc39f203e4e04(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function $84e75d45d2d40355$export$88ac25d8e944e405(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) env.stack.push({
        async: true
    });
    return value;
}
var $84e75d45d2d40355$var$_SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function _SuppressedError(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function $84e75d45d2d40355$export$8f076105dc360e92(env) {
    function fail(e) {
        env.error = env.hasError ? new $84e75d45d2d40355$var$_SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    function next() {
        while(env.stack.length){
            var rec = env.stack.pop();
            try {
                var result = rec.dispose && rec.dispose.call(rec.value);
                if (rec.async) return Promise.resolve(result).then(next, function(e) {
                    fail(e);
                    return next();
                });
            } catch (e) {
                fail(e);
            }
        }
        if (env.hasError) throw env.error;
    }
    return next();
}
var $84e75d45d2d40355$export$2e2bcd8739ae039 = {
    __extends: $84e75d45d2d40355$export$a8ba968b8961cb8a,
    __assign: $84e75d45d2d40355$export$18ce0697a983be9b,
    __rest: $84e75d45d2d40355$export$3c9a16f847548506,
    __decorate: $84e75d45d2d40355$export$29e00dfd3077644b,
    __param: $84e75d45d2d40355$export$d5ad3fd78186038f,
    __metadata: $84e75d45d2d40355$export$f1db080c865becb9,
    __awaiter: $84e75d45d2d40355$export$1050f835b63b671e,
    __generator: $84e75d45d2d40355$export$67ebef60e6f28a6,
    __createBinding: $84e75d45d2d40355$export$45d3717a4c69092e,
    __exportStar: $84e75d45d2d40355$export$f33643c0debef087,
    __values: $84e75d45d2d40355$export$19a8beecd37a4c45,
    __read: $84e75d45d2d40355$export$8d051b38c9118094,
    __spread: $84e75d45d2d40355$export$afc72e2116322959,
    __spreadArrays: $84e75d45d2d40355$export$6388937ca91ccae8,
    __spreadArray: $84e75d45d2d40355$export$1216008129fb82ed,
    __await: $84e75d45d2d40355$export$10c90e4f7922046c,
    __asyncGenerator: $84e75d45d2d40355$export$e427f37a30a4de9b,
    __asyncDelegator: $84e75d45d2d40355$export$bbd80228419bb833,
    __asyncValues: $84e75d45d2d40355$export$e3b29a3d6162315f,
    __makeTemplateObject: $84e75d45d2d40355$export$4fb47efe1390b86f,
    __importStar: $84e75d45d2d40355$export$c21735bcef00d192,
    __importDefault: $84e75d45d2d40355$export$da59b14a69baef04,
    __classPrivateFieldGet: $84e75d45d2d40355$export$d5dcaf168c640c35,
    __classPrivateFieldSet: $84e75d45d2d40355$export$d40a35129aaff81f,
    __classPrivateFieldIn: $84e75d45d2d40355$export$81fdc39f203e4e04,
    __addDisposableResource: $84e75d45d2d40355$export$88ac25d8e944e405,
    __disposeResources: $84e75d45d2d40355$export$8f076105dc360e92
};

});

parcelRegister("jBhhk", function(module, exports) {

$parcel$export(module.exports, "_", function () { return $d685113fac153143$export$71511d61b312f219; }, function (v) { return $d685113fac153143$export$71511d61b312f219 = v; });
var $d685113fac153143$export$71511d61b312f219;
var $d685113fac153143$export$5f0017c582d45a2d;
"use strict";
$d685113fac153143$export$71511d61b312f219 = $d685113fac153143$export$5f0017c582d45a2d = $d685113fac153143$var$_type_of;
function $d685113fac153143$var$_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}

});

var $2e6a9d9d8b3d7992$exports = {};

$parcel$export($2e6a9d9d8b3d7992$exports, "registerOnInitCallback", function () { return $2e6a9d9d8b3d7992$export$8f1480d0136598a3; });
$parcel$export($2e6a9d9d8b3d7992$exports, "registerOnUpdateCallback", function () { return $2e6a9d9d8b3d7992$export$4172dbddf28736a3; });
$parcel$export($2e6a9d9d8b3d7992$exports, "openIndexData", function () { return $2e6a9d9d8b3d7992$export$c80888c0f1760f07; });
$parcel$export($2e6a9d9d8b3d7992$exports, "isModalDialog", function () { return $2e6a9d9d8b3d7992$export$cebb092bf393cc5; });
$parcel$export($2e6a9d9d8b3d7992$exports, "openLocation", function () { return $2e6a9d9d8b3d7992$export$47c4a703efa8e61e; });
$parcel$export($2e6a9d9d8b3d7992$exports, "getSelectedObjects", function () { return $2e6a9d9d8b3d7992$export$96f907581d671890; });
$parcel$export($2e6a9d9d8b3d7992$exports, "refreshHitListObjects", function () { return $2e6a9d9d8b3d7992$export$89d12ae34746cff2; });
$parcel$export($2e6a9d9d8b3d7992$exports, "openHitListByIds", function () { return $2e6a9d9d8b3d7992$export$5b5fa3829992783b; });
$parcel$export($2e6a9d9d8b3d7992$exports, "getFieldValueByInternal", function () { return $2e6a9d9d8b3d7992$export$468316c75afcb0f3; });
$parcel$export($2e6a9d9d8b3d7992$exports, "getWorkflowVariableByName", function () { return $2e6a9d9d8b3d7992$export$b3ed74af647c74bd; });
$parcel$export($2e6a9d9d8b3d7992$exports, "setFieldValueByInternal", function () { return $2e6a9d9d8b3d7992$export$50c2e2f825ad7b4b; });
$parcel$export($2e6a9d9d8b3d7992$exports, "setWorkflowVariableByName", function () { return $2e6a9d9d8b3d7992$export$23c49f97b8cbcd5b; });
$parcel$export($2e6a9d9d8b3d7992$exports, "getEnvironment", function () { return $2e6a9d9d8b3d7992$export$57570b1603cf6adb; });
$parcel$export($2e6a9d9d8b3d7992$exports, "setDialogCaption", function () { return $2e6a9d9d8b3d7992$export$74da6a16c6928c4d; });
$parcel$export($2e6a9d9d8b3d7992$exports, "closeModalDialog", function () { return $2e6a9d9d8b3d7992$export$f290980283620b4a; });
$parcel$export($2e6a9d9d8b3d7992$exports, "resetSessionTimeout", function () { return $2e6a9d9d8b3d7992$export$c3d283c41bbe930c; });
$parcel$export($2e6a9d9d8b3d7992$exports, "registerOnCanCancelCallback", function () { return $2e6a9d9d8b3d7992$export$e12a024d8ae2e5c; });


/**
 * This library manage the communication between dashlet and web client.
 */ 

var $0282955c6f0df84b$var$msgQueue = {};
var $0282955c6f0df84b$var$alertQueue = [];
var $0282955c6f0df84b$var$modalDialog = false;
var $0282955c6f0df84b$var$webclientOrigin;
var $0282955c6f0df84b$var$trustedOrigin;
var $0282955c6f0df84b$var$onInitCallback = function() {};
var $0282955c6f0df84b$var$onUpdateCallback = function() {};
var $0282955c6f0df84b$var$onUpdateCallbackRegistered = false;
/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 *
 * @param {Function} callback
 * @param {string} allowedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $0282955c6f0df84b$export$8f1480d0136598a3(callback, allowedOrigin) {
    $0282955c6f0df84b$var$onInitCallback = callback;
    $0282955c6f0df84b$var$trustedOrigin = allowedOrigin;
}
/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 *
 * @param {Function} callback The callback
 * @param {string} allowedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $0282955c6f0df84b$export$4172dbddf28736a3(callback, allowedOrigin) {
    if ($0282955c6f0df84b$var$modalDialog) throw "Modal dialogs do not trigger a update event. Please do not register one.";
    else {
        $0282955c6f0df84b$var$onUpdateCallbackRegistered = true;
        $0282955c6f0df84b$var$onUpdateCallback = callback;
        $0282955c6f0df84b$var$trustedOrigin = allowedOrigin;
    }
}
// Listen to "message" type events from web client.
window.addEventListener("message", $0282955c6f0df84b$export$221b191fcfaf22a, false);
/**
 * A function responsible for processing all incoming "messages" from the enaio® webclient.
 *
 * @param event the object passed from the other Window i.e. enaio® webclient.
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#the_dispatched_event
 */ function $0282955c6f0df84b$export$221b191fcfaf22a(event) {
    // Todo: Why global?
    $0282955c6f0df84b$var$webclientOrigin = event.origin;
    /* Ensure "messages" come from a trusted source i.e. your own enaio® hosted domain.
       Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns

       "srcOrigin" is the domain URL where enaio® webclient is served. Example: https://enaio.company-name.de
        Please note, in enaio desktop client, "srcOrigin" is represented as "file://" string.
    */ if ($0282955c6f0df84b$var$trustedOrigin !== null && $0282955c6f0df84b$var$trustedOrigin !== undefined && $0282955c6f0df84b$var$trustedOrigin.length > 0 && $0282955c6f0df84b$var$trustedOrigin !== "*") {
        // client uses electron webclient so override origin
        if ("file://" === $0282955c6f0df84b$var$webclientOrigin) $0282955c6f0df84b$var$trustedOrigin = "file://";
        var safeOrigin = $0282955c6f0df84b$var$trustedOrigin === $0282955c6f0df84b$var$webclientOrigin;
        if (safeOrigin === false) {
            console.log("webclientOrigin ".concat($0282955c6f0df84b$var$webclientOrigin, " is different from srcOrigin ").concat($0282955c6f0df84b$var$trustedOrigin));
            return false;
        }
    }
    // "handleWebclientMessage" is a handler function which further processes all incoming "messages" from enaio® webclient (see implementation details in the communication-library.js file).
    // Extract the "type" and "data" properties for further processing.
    // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    var _handleWebclientMessage = $0282955c6f0df84b$var$handleWebclientMessage(event.data), type = _handleWebclientMessage.type, data = _handleWebclientMessage.data;
    data === null || data === void 0 ? true : delete data.dapi; // abstraction layer is taking care of it.
    if (type === "onInit") {
        $0282955c6f0df84b$var$detectDashletModalDialog(data);
        // Do initialization work here.
        $0282955c6f0df84b$var$onInitCallback(data);
    } else if (type === "onUpdate") // React to osid selection changes here.
    $0282955c6f0df84b$var$onUpdateCallback(data);
    return true;
}
/**
 * Detect the kind of script which is running. There are normal dashlets and
 * modal dialogs. They differ in specific way, but we want to make it as smooth
 * to the developer as possible.
 *
 * @param data The init data structure from enaio® webclient.
 */ function $0282955c6f0df84b$var$detectDashletModalDialog(data) {
    if (data.selectedEntry) {
        $0282955c6f0df84b$var$modalDialog = true;
        if ($0282955c6f0df84b$var$onUpdateCallbackRegistered) {
            // Unregister onUpdateCallback because it is not available and write a message to console.
            console.error("Modal dialogs do not trigger a update event. Please do not register one.");
            $0282955c6f0df84b$var$onUpdateCallbackRegistered = false;
            $0282955c6f0df84b$var$onUpdateCallback = function() {};
        }
    }
}
/**
 * A function that handles "messages" coming from the enaio® webclient.
 *
 * @param payload an object with { type, data } as payload.
 * @returns an object with the same shape as the input payload i.e. { type, data }
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/5.2+Kommunikation
 */ function $0282955c6f0df84b$var$handleWebclientMessage(payload) {
    if (payload.msgId && $0282955c6f0df84b$var$msgQueue[payload.msgId]) {
        if (payload.data.error !== undefined) $0282955c6f0df84b$var$msgQueue[payload.msgId].reject(payload.data.error);
        else if (payload.data.result !== undefined) $0282955c6f0df84b$var$msgQueue[payload.msgId].resolve(payload.data.result);
        else $0282955c6f0df84b$var$msgQueue[payload.msgId].resolve();
        if ($0282955c6f0df84b$var$alertQueue.includes(payload.msgId)) {
            // display payload info
            $0282955c6f0df84b$var$alertQueue.splice($0282955c6f0df84b$var$alertQueue.indexOf(payload.msgId), 1);
            alert(JSON.stringify(payload.data.result));
        }
        delete $0282955c6f0df84b$var$msgQueue[payload.msgId];
    }
    return payload;
}
function $0282955c6f0df84b$export$7980e63f750e794e(payload) {
    return $0282955c6f0df84b$var$_sendWebclientMessage.apply(this, arguments);
}
function $0282955c6f0df84b$var$_sendWebclientMessage() {
    $0282955c6f0df84b$var$_sendWebclientMessage = /**
 * A function responsible for sending "messages" to the enaio® webclient.
 * @param payload an array with ["method-name", [arguments]] as payload. Ref: https://help.optimal-systems.com/enaio_develop/display/WEB/5.4+Dashlet-Methoden
 * @param triggerAlert Boolean. If true, a browser alert (with payload results) will be displayed in the enaio® webclient.
 * @returns a JavaScript Promise. Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/5.2+Kommunikation
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        var triggerAlert, msgId, _resolve, _reject, promise;
        var _arguments = arguments;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            triggerAlert = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : false;
            msgId = Math.random().toString(36).substr(2, 8);
            payload.push({
                msgId: msgId
            });
            if (triggerAlert) $0282955c6f0df84b$var$alertQueue.push(msgId);
            promise = new Promise(function(resolve, reject) {
                _resolve = resolve;
                _reject = reject;
            });
            $0282955c6f0df84b$var$msgQueue[msgId] = {
                resolve: _resolve,
                reject: _reject
            };
            // "window" is the Dashlet's JavaScript Window object. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window
            // "parent" is the enaio® webclient Window object.
            // postMessage" is the browser API used to communicate between enaio® webclient and the Dashlet. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
            if ($0282955c6f0df84b$var$trustedOrigin !== null && $0282955c6f0df84b$var$trustedOrigin !== undefined && $0282955c6f0df84b$var$trustedOrigin.length > 0) window.parent.postMessage(payload, $0282955c6f0df84b$var$trustedOrigin);
            else window.parent.postMessage(payload, "*");
            return [
                2,
                promise
            ];
        });
    });
    return $0282955c6f0df84b$var$_sendWebclientMessage.apply(this, arguments);
}
/**
 * Return true if we are running inside a modal dialog. If we are running inside a dashlet the return is false.
 */ function $0282955c6f0df84b$export$cebb092bf393cc5() {
    return $0282955c6f0df84b$var$modalDialog;
}
/**
 * This function is only for the unit-tests to reset the webclient library to its original state
 */ function $0282955c6f0df84b$export$aad8462122ac592b() {
    $0282955c6f0df84b$var$modalDialog = false;
    $0282955c6f0df84b$var$onInitCallback = function() {};
    $0282955c6f0df84b$var$onUpdateCallback = function() {};
    $0282955c6f0df84b$var$onUpdateCallbackRegistered = false;
}


/**
 * This library manages the communication between dashlet and rich client. It provides a bridge between 
 * the dashlet and the rich client, ensuring that dashlets can operate in a consistent way regardless of 
 * whether they are running in the web or rich client environment. It also includes mechanisms for testing
 * and for handling differences between modal dialogs and standard dashlets.
 */ 

var $e6000d5a971c7fbc$var$onInitCallback = null;
var $e6000d5a971c7fbc$var$onUpdateCallback = null;
var $e6000d5a971c7fbc$var$dashletCache = null; // static data from rich client only one time for a dashlet
var $e6000d5a971c7fbc$var$modalDialog = false;
// DODO-26194: Typeless document objecttype IDs that should be mapped to "-1"
// integer 13107200 >> -1 (internal tray)
// integer 19660800 >> -1 (workflow tray)
var $e6000d5a971c7fbc$var$TYPELESS_OBJECT_TYPE_IDS = [
    "19660800",
    "13107200"
];
/**
 * Check if the given object type represents a typeless document
 * @param {string} objectTypeId - The objecttype ID to check
 * @returns {boolean} - True if this is a typeless document type
 */ function $e6000d5a971c7fbc$var$isTypelessDocument(objectTypeId) {
    return $e6000d5a971c7fbc$var$TYPELESS_OBJECT_TYPE_IDS.includes(objectTypeId);
}
/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 *
 * @param {Function} callback
 */ function $e6000d5a971c7fbc$export$8f1480d0136598a3(callback) {
    $e6000d5a971c7fbc$var$onInitCallback = callback;
}
/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 *
 * @param {Function} callback The callback
 */ function $e6000d5a971c7fbc$export$4172dbddf28736a3(callback) {
    if ($e6000d5a971c7fbc$var$modalDialog) throw "Modal dialogs does not trigger a update event. Please do not register one.";
    $e6000d5a971c7fbc$var$onUpdateCallback = callback;
}
function $e6000d5a971c7fbc$var$internalOnInitUpdate(data) {
    return $e6000d5a971c7fbc$var$_internalOnInitUpdate.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_internalOnInitUpdate() {
    $e6000d5a971c7fbc$var$_internalOnInitUpdate = /**
 * Providing only necessary information for this rich client dashlet example.
 * We are converting it to be like the webclient structure.
 *
 * @param {Object} data initialize data from the rich client.
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(data) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!data.selectedEntry) return [
                        3,
                        1
                    ];
                    if ($e6000d5a971c7fbc$var$onUpdateCallback != null) {
                        // Unregister onUpdateCallback because it is not available and write a message to console.
                        console.error("Modal dialogs does not trigger a update event. Please do not register one.");
                        $e6000d5a971c7fbc$var$onUpdateCallback = null;
                    }
                    $e6000d5a971c7fbc$var$modalDialog = true;
                    $e6000d5a971c7fbc$var$internalOnInitModalDialog(data);
                    return [
                        3,
                        3
                    ];
                case 1:
                    return [
                        4,
                        $e6000d5a971c7fbc$var$internalOnInitUpdateDashlet(data)
                    ];
                case 2:
                    _state.sent();
                    _state.label = 3;
                case 3:
                    return [
                        2
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_internalOnInitUpdate.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$internalOnInitUpdateDashlet(data) {
    return $e6000d5a971c7fbc$var$_internalOnInitUpdateDashlet.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_internalOnInitUpdateDashlet() {
    $e6000d5a971c7fbc$var$_internalOnInitUpdateDashlet = /**
 * Method which is called if the rich client send the initialize event for a dashlet.
 * The initialize event is also fired in case of an update. The rich client only know
 * one event. We distinguish then. The onInit event is unregistered after first processing.
 * From then on all events are redirected to the update callback. The code inside enrich
 * the rich client data as much as possible to be equal to the webclient data.
 *
 * @param {Object} data initialize data from the rich client.
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(data) {
        var selectedEntries, lastObjectType, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, selectedEntry, mappedData;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    if ($e6000d5a971c7fbc$var$dashletCache === null) {
                        $e6000d5a971c7fbc$var$dashletCache = {};
                        $e6000d5a971c7fbc$var$dashletCache.dashletCaption = window.osClient.osjxGetDashletCaption();
                        $e6000d5a971c7fbc$var$dashletCache.uri = window.osClient.osjxGetDashletURL();
                        $e6000d5a971c7fbc$var$dashletCache.languageGuiSelected = window.osClient.osjxGetEnvironment(24) || "de";
                        $e6000d5a971c7fbc$var$dashletCache.languageObjectDefinition = window.osClient.osjxGetEnvironment(33);
                        $e6000d5a971c7fbc$var$dashletCache.wfOrgId = window.osClient.osjxGetEnvironment(19);
                        $e6000d5a971c7fbc$var$dashletCache.mail = window.osClient.osjxGetEnvironment(16);
                        $e6000d5a971c7fbc$var$dashletCache.username = window.osClient.osjxGetEnvironment(3);
                        $e6000d5a971c7fbc$var$dashletCache.groups = window.osClient.osjxGetEnvironment(11);
                        $e6000d5a971c7fbc$var$dashletCache.fullname = window.osClient.osjxGetEnvironment(14);
                    }
                    return [
                        4,
                        $e6000d5a971c7fbc$var$getSelectedObjects()
                    ];
                case 1:
                    selectedEntries = _state.sent();
                    lastObjectType = {
                        mainType: 0,
                        objectType: "UNKNOWN"
                    };
                    if (selectedEntries == null || selectedEntries.length === 0 || selectedEntries[0].objectId === "" || selectedEntries[0].objectId === void 0) // On opening an index data mask for a different ECM object out of the dashlet the selectedEntries has one element
                    // but the objectId and objectTypeId are empty. We fix this by assigning the information from the init event.
                    selectedEntries = [
                        {
                            objectId: data.objectident,
                            objectTypeId: data.objecttype
                        }
                    ];
                    // For search masks we have a selected object with objectId zero. There isn't a selected object.
                    if (selectedEntries.length === 1 && selectedEntries[0].objectId === "0" && selectedEntries[0].objectTypeId === "0") selectedEntries = [];
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(_iterator = selectedEntries[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            selectedEntry = _step.value;
                            $e6000d5a971c7fbc$var$addObjectTypeAndMainType(selectedEntry);
                            if (selectedEntry.objectId === data.objectident) lastObjectType = selectedEntry;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    // get base url
                    if (typeof location.origin === "undefined") location.origin = location.protocol + "//" + location.host;
                    // map data for webClient structure
                    mappedData = {
                        activeCustomDashlet: {
                            objectTypes: null,
                            platforms: null,
                            uri: $e6000d5a971c7fbc$var$dashletCache.uri,
                            title_DE: $e6000d5a971c7fbc$var$dashletCache.dashletCaption,
                            title_EN: $e6000d5a971c7fbc$var$dashletCache.dashletCaption,
                            title_FR: $e6000d5a971c7fbc$var$dashletCache.dashletCaption,
                            iconId: null,
                            users: null,
                            groups: null
                        },
                        lastSelectedEntry: {
                            hasVariants: null,
                            mainType: lastObjectType.mainType,
                            objectTypeId: $e6000d5a971c7fbc$var$isTypelessDocument(data.objecttype) ? "-1" : data.objecttype,
                            osid: data.objectident,
                            objectType: lastObjectType.objectType
                        },
                        osDashletInit: {
                            objectident: data.objectident,
                            objecttype: $e6000d5a971c7fbc$var$isTypelessDocument(data.objecttype) ? "-1" : data.objecttype,
                            userid: data.userid,
                            userguid: data.userguid,
                            sessionguid: data.sessionguid,
                            regenerate: data.regenerate,
                            pagecount: data.pagecount,
                            searchterm: data.searchterm
                        },
                        selectedEntries: selectedEntries.map(function(selectedEntry) {
                            return {
                                osid: selectedEntry.objectId,
                                objectTypeId: selectedEntry.objectTypeId,
                                objectType: selectedEntry.objectType,
                                mainType: selectedEntry.mainType
                            };
                        }),
                        locationInfo: $e6000d5a971c7fbc$var$getLocationInfo(data),
                        sessionInfo: {
                            language: $e6000d5a971c7fbc$var$dashletCache.languageGuiSelected.substring(0, 2),
                            languageObjectDefinition: $e6000d5a971c7fbc$var$dashletCache.languageObjectDefinition.split("_")[0],
                            sessionGuid: data.sessionguid,
                            clientType: "rich_client",
                            baseUrl: location.origin
                        },
                        userInfo: {
                            email: $e6000d5a971c7fbc$var$dashletCache.mail,
                            fullname: $e6000d5a971c7fbc$var$dashletCache.fullname,
                            groups: $e6000d5a971c7fbc$var$dashletCache.groups.split(";"),
                            name: $e6000d5a971c7fbc$var$dashletCache.username,
                            osGuid: data.userguid,
                            userId: data.userid,
                            wfGuid: null,
                            wfOrdId: $e6000d5a971c7fbc$var$dashletCache.wfOrgId
                        },
                        context: null
                    };
                    // execute registered events with mapped data.
                    // onInitCallback is called once. Afterward we set it to null and then onUpdateCallback is called.
                    if ($e6000d5a971c7fbc$var$onInitCallback != null) {
                        $e6000d5a971c7fbc$var$onInitCallback(mappedData);
                        $e6000d5a971c7fbc$var$onInitCallback = null;
                    } else if ($e6000d5a971c7fbc$var$onUpdateCallback != null) $e6000d5a971c7fbc$var$onUpdateCallback(mappedData);
                    return [
                        2
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_internalOnInitUpdateDashlet.apply(this, arguments);
}
/**
 * Handle the onInit event for modal dialogs and call a callback function if one is registered.
 *
 * @param {Object} data initialize data from the rich client.
 * @private
 */ function $e6000d5a971c7fbc$var$internalOnInitModalDialog(data) {
    if ($e6000d5a971c7fbc$var$onInitCallback != null) {
        $e6000d5a971c7fbc$var$onInitCallback(data);
        $e6000d5a971c7fbc$var$onInitCallback = null;
    }
}
/**
 * Embed a function to the html file as the rich client looks up for a function
 * named osDashletInit in it. For this example we find that this is a clean solution
 * instead of placing it directly into the html file.
 *
 * @private
 */ function $e6000d5a971c7fbc$export$c6ba16edd0a0ecfe() {
    window.internalOnInitUpdate = $e6000d5a971c7fbc$var$internalOnInitUpdate;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerText = "function osDashletInit(data) { window.internalOnInitUpdate(data); } function onInit(data) { window.internalOnInitUpdate(data); }";
    document.getElementsByTagName("head")[0].appendChild(script);
}
/**
 * Call the method directly to register ourselves directly on the window object.
 * A addEventListener("load", registerOnInitUpdate); would be nicer, but it is too late.
 * Then we miss the rich client call which we want to intercept.
 */ $e6000d5a971c7fbc$export$c6ba16edd0a0ecfe();
function $e6000d5a971c7fbc$export$1079770825fa94d6(payload) {
    return $e6000d5a971c7fbc$var$_sendToRichClient.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_sendToRichClient() {
    $e6000d5a971c7fbc$var$_sendToRichClient = /**
 * Entry method for sending commands to the rich client. The payload is the one for enaio web client.
 * It must be converted before sending it to rich client and the response must also be converted back.
 * This method is async even if the method is synchronous. It must be compatible to web client implementation.
 * and the web client is async an
 *
 * @param {*} payload web client format
 * @returns response in web client format
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(payload[0]){
                case "openIndexData":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$openIndexData(payload)
                    ];
                case "openLocation":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$openLocation(payload)
                    ];
                case "getSelectedObjects":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$getSelectedObjects(payload)
                    ];
                case "refreshHitListObjects":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$refreshHitListObjects(payload)
                    ];
                case "openHitListByIds":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$openHitListByIds(payload)
                    ];
                case "getFieldValueByInternal":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$getFieldValueByInternal(payload)
                    ];
                case "setFieldValueByInternal":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$setFieldValueByInternal(payload)
                    ];
                case "setWorkflowVariableByName":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$setWorkflowVariableByName(payload)
                    ];
                case "getEnvironment":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$getEnvironment()
                    ];
                case "closeModalDialog":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$closeModalDialog(payload)
                    ];
                case "setDialogCaption":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$setDialogCaption(payload)
                    ];
                case "getWorkflowVariableByName":
                    return [
                        2,
                        $e6000d5a971c7fbc$var$getWorkflowVariableByName(payload)
                    ];
            }
            return [
                2
            ];
        });
    });
    return $e6000d5a971c7fbc$var$_sendToRichClient.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$openLocation(payload) {
    return $e6000d5a971c7fbc$var$_openLocation.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_openLocation() {
    $e6000d5a971c7fbc$var$_openLocation = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        var osId, objectTypeId;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    // const inNewTab = payload[1][0]; // Only as reminder but not supported by the rich client.
                    osId = Number(payload[1][1]);
                    objectTypeId = Number(payload[1][2]);
                    if (!(objectTypeId && objectTypeId >>> 16 === 0)) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        window.osClient.osjxOpenObject(osId)
                    ];
                case 1:
                    _state.sent();
                    return [
                        3,
                        4
                    ];
                case 2:
                    return [
                        4,
                        window.osClient.osjxOpenLocation(osId)
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_openLocation.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$openIndexData(payload) {
    return $e6000d5a971c7fbc$var$_openIndexData.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_openIndexData() {
    $e6000d5a971c7fbc$var$_openIndexData = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        var osId, readonly;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    // const inNewTab = payload[1][0]; // Only as reminder but not supported by the rich client.
                    osId = Number(payload[1][2]);
                    readonly = payload[1][1].toLowerCase() === "view";
                    return [
                        4,
                        window.osClient.osjxOpenDataSheet(osId, readonly)
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_openIndexData.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$getSelectedObjects() {
    return $e6000d5a971c7fbc$var$_getSelectedObjects.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_getSelectedObjects() {
    $e6000d5a971c7fbc$var$_getSelectedObjects = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function() {
        var selectedObjects;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        window.osClient.osjxGetSelectedObjects()
                    ];
                case 1:
                    selectedObjects = _state.sent();
                    return [
                        2,
                        selectedObjects.split(";").map(function(selectedObject) {
                            var split = selectedObject.split(",");
                            var retVal = {
                                objectId: split[0],
                                objectTypeId: split[1]
                            };
                            $e6000d5a971c7fbc$var$addObjectTypeAndMainType(retVal);
                            return retVal;
                        })
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_getSelectedObjects.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$refreshHitListObjects(payload) {
    return $e6000d5a971c7fbc$var$_refreshHitListObjects.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_refreshHitListObjects() {
    $e6000d5a971c7fbc$var$_refreshHitListObjects = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, objectToRefresh, osId, err;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        6,
                        7,
                        8
                    ]);
                    _iterator = payload[1][Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        5
                    ];
                    objectToRefresh = _step.value;
                    osId = Number(objectToRefresh[0]);
                    return [
                        4,
                        window.osClient.osjxRefreshObjectInLists(osId)
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 5:
                    return [
                        3,
                        8
                    ];
                case 6:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        8
                    ];
                case 7:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 8:
                    return [
                        2
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_refreshHitListObjects.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$openHitListByIds(payload) {
    return $e6000d5a971c7fbc$var$_openHitListByIds.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_openHitListByIds() {
    $e6000d5a971c7fbc$var$_openHitListByIds = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        var ids, title, request;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    ids = payload[1].objects;
                    title = payload[1].title.length === 0 ? "Gemischte Trefferliste" : payload[1].title;
                    request = {
                        title: title,
                        hits: ids.map(function(hit) {
                            return {
                                id: hit.objectId,
                                type: hit.objectTypeId
                            };
                        })
                    };
                    return [
                        4,
                        window.osClient.osjxOpenResultList(JSON.stringify(request))
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_openHitListByIds.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$getFieldValueByInternal(payload) {
    return $e6000d5a971c7fbc$var$_getFieldValueByInternal.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_getFieldValueByInternal() {
    $e6000d5a971c7fbc$var$_getFieldValueByInternal = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        var _;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    _ = JSON.parse;
                    return [
                        4,
                        window.osClient.getFieldValueByInternal(payload[1][0])
                    ];
                case 1:
                    return [
                        2,
                        _.apply(JSON, [
                            _state.sent()
                        ])
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_getFieldValueByInternal.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$setFieldValueByInternal(payload) {
    return $e6000d5a971c7fbc$var$_setFieldValueByInternal.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_setFieldValueByInternal() {
    $e6000d5a971c7fbc$var$_setFieldValueByInternal = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        var _;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    _ = JSON.parse;
                    return [
                        4,
                        window.osClient.setFieldValueByInternal(payload[1][0])
                    ];
                case 1:
                    return [
                        2,
                        _.apply(JSON, [
                            _state.sent()
                        ])
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_setFieldValueByInternal.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$setWorkflowVariableByName(payload) {
    return $e6000d5a971c7fbc$var$_setWorkflowVariableByName.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_setWorkflowVariableByName() {
    $e6000d5a971c7fbc$var$_setWorkflowVariableByName = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        var _;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    _ = JSON.parse;
                    return [
                        4,
                        window.osClient.setWorkflowVariableByName(payload[1][0])
                    ];
                case 1:
                    return [
                        2,
                        _.apply(JSON, [
                            _state.sent()
                        ])
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_setWorkflowVariableByName.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$getEnvironment() {
    return $e6000d5a971c7fbc$var$_getEnvironment.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_getEnvironment() {
    $e6000d5a971c7fbc$var$_getEnvironment = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function() {
        var _;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    _ = JSON.parse;
                    return [
                        4,
                        window.osClient.getEnvironment()
                    ];
                case 1:
                    return [
                        2,
                        _.apply(JSON, [
                            _state.sent()
                        ])
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_getEnvironment.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$closeModalDialog(payload) {
    return $e6000d5a971c7fbc$var$_closeModalDialog.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_closeModalDialog() {
    $e6000d5a971c7fbc$var$_closeModalDialog = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        window.osClient.closeModalDialog(payload[1][0])
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_closeModalDialog.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$setDialogCaption(payload) {
    return $e6000d5a971c7fbc$var$_setDialogCaption.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_setDialogCaption() {
    $e6000d5a971c7fbc$var$_setDialogCaption = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            return [
                2,
                window.osClient.setDialogCaption(payload[1][0])
            ];
        });
    });
    return $e6000d5a971c7fbc$var$_setDialogCaption.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$getWorkflowVariableByName(payload) {
    return $e6000d5a971c7fbc$var$_getWorkflowVariableByName.apply(this, arguments);
}
function $e6000d5a971c7fbc$var$_getWorkflowVariableByName() {
    $e6000d5a971c7fbc$var$_getWorkflowVariableByName = /**
 * Documentation see communication-library.js
 *
 * @private
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        var _;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    _ = JSON.parse;
                    return [
                        4,
                        window.osClient.getWorkflowVariableByName(payload[1][0])
                    ];
                case 1:
                    return [
                        2,
                        _.apply(JSON, [
                            _state.sent()
                        ])
                    ];
            }
        });
    });
    return $e6000d5a971c7fbc$var$_getWorkflowVariableByName.apply(this, arguments);
}
/**
 * Calculate the mainType and objectType from objectTypeId and add the properties to the
 * hand in object.
 *
 * @param selectedObject The object to extend
 */ function $e6000d5a971c7fbc$var$addObjectTypeAndMainType(selectedObject) {
    if ($e6000d5a971c7fbc$var$isTypelessDocument(selectedObject.objectTypeId)) selectedObject.objectTypeId = "-1";
    // In WebClient it is a string. Therefore toString();
    selectedObject.mainType = (selectedObject.objectTypeId >>> 16).toString();
    switch(selectedObject.mainType){
        case "0":
            selectedObject.objectType = "FOLDER";
            break;
        case "99":
            selectedObject.objectType = "REGISTER";
            break;
        default:
            selectedObject.objectType = "DOCUMENT";
            break;
    }
}
/**
 * Return true if we are running inside a modal dialog. If we are running inside a dashlet the return is false.
 */ function $e6000d5a971c7fbc$export$cebb092bf393cc5() {
    return $e6000d5a971c7fbc$var$modalDialog;
}
/**
 * This function is only for the unit-tests to reset the rich client library to its original state
 */ function $e6000d5a971c7fbc$export$aad8462122ac592b() {
    $e6000d5a971c7fbc$var$modalDialog = false;
    $e6000d5a971c7fbc$var$onInitCallback = function() {};
    $e6000d5a971c7fbc$var$onUpdateCallback = function() {};
    $e6000d5a971c7fbc$var$dashletCache = null;
    delete window.osClient;
}
function $e6000d5a971c7fbc$var$getLocationInfo(data) {
    // folder is at the root - no parent information available
    if (data.folderid === data.objectident && data.foldertype === data.objecttype) return {};
    // registers inside the root folder
    if (data.objectident === data.registerid && data.objecttype === data.registertype) return {
        objectId: data.folderid,
        objectTypeId: data.foldertype
    };
    // If registerid/registertype are present, use them
    if (data.registerid != null && data.registertype != null) return {
        objectId: data.registerid,
        objectTypeId: data.registertype
    };
    // If folderid/foldertype are present, use them
    if (data.folderid != null && data.foldertype != null) return {
        objectId: data.folderid,
        objectTypeId: data.foldertype
    };
    // Fallback to empty object
    return {};
}


var $2e6a9d9d8b3d7992$var$version = "2.0.5-rc3";
/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 * 
 * @param {Function} onInitCallback The callback
 * @param {string} trustedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $2e6a9d9d8b3d7992$export$8f1480d0136598a3(onInitCallback) {
    var trustedOrigin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "*";
    console.log("Current Communication library version number: ".concat($2e6a9d9d8b3d7992$var$version));
    if (window.osClient) $e6000d5a971c7fbc$export$8f1480d0136598a3(onInitCallback);
    else $0282955c6f0df84b$export$8f1480d0136598a3(onInitCallback, trustedOrigin);
}
/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 * 
 * @param {Function} onUpdateCallback The callback
 * @param {string} trustedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $2e6a9d9d8b3d7992$export$4172dbddf28736a3(onUpdateCallback) {
    var trustedOrigin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "*";
    if (window.osClient) $e6000d5a971c7fbc$export$4172dbddf28736a3(onUpdateCallback);
    else $0282955c6f0df84b$export$4172dbddf28736a3(onUpdateCallback, trustedOrigin);
}
function $2e6a9d9d8b3d7992$export$c80888c0f1760f07(inNewTab, mode, objectId, objectTypeId) {
    return $2e6a9d9d8b3d7992$var$_openIndexData.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_openIndexData() {
    $2e6a9d9d8b3d7992$var$_openIndexData = /**
 * Opens the index data mask for the currently selected osId.
 * 
 * @param {boolean} inNewTab indicates whether the index data mask should be opened in a new tab. Default is (false).
 * @param {string} mode should the index data view be opened in read-only mode (view) or in edit mode (edit). Default is (edit) mode.
 * @param {string} objectId the osId of the DMS object.
 * @param {string} objectTypeId the objectTypeId of the DMS object. This increases the performance when opening the index data view.
 * @returns {boolean} true if the objectId and objectTypeId are valid and the opening was successful. Otherwise, false.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openIndexData
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(inNewTab, mode, objectId, objectTypeId) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            if ($2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
            return [
                2,
                $2e6a9d9d8b3d7992$var$sendClientMessage([
                    "openIndexData",
                    [
                        inNewTab,
                        mode,
                        objectId,
                        objectTypeId
                    ]
                ])
            ];
        });
    });
    return $2e6a9d9d8b3d7992$var$_openIndexData.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$export$47c4a703efa8e61e(inNewTab, objectId, objectTypeId, parentId, parentTypeId) {
    return $2e6a9d9d8b3d7992$var$_openLocation.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_openLocation() {
    $2e6a9d9d8b3d7992$var$_openLocation = /**
 * Opens the location in the current browser tab (or a location selection in the case of several possible locations) for the DMS object transferred as a parameter.
 * 
 * @param {boolean} inNewTab indicates whether the hit list should be opened in a new tab.
 * @param {string} objectId the osId of the DMS object.
 * @param {string} [objectTypeId] the objectTypeId of the DMS object. This increases the performance when opening the location.
 * @param {string} [parentId] the osId of the parent DMS object to open a specific location if the object has multiple locations.
 * @param {string} [parentTypeId] the objectTypeId of the parent DMS object to open a specific location if the object has multiple locations.
 * @returns {Promise<void>} The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openLocation
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(inNewTab, objectId, objectTypeId, parentId, parentTypeId) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    if ($2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
                    return [
                        4,
                        $2e6a9d9d8b3d7992$var$sendClientMessage([
                            "openLocation",
                            [
                                inNewTab,
                                objectId,
                                objectTypeId,
                                parentId,
                                parentTypeId
                            ]
                        ])
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return $2e6a9d9d8b3d7992$var$_openLocation.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$export$96f907581d671890() {
    return $2e6a9d9d8b3d7992$var$_getSelectedObjects.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_getSelectedObjects() {
    $2e6a9d9d8b3d7992$var$_getSelectedObjects = /**
 * Query the currently selected objects.
 * Depending on whether you call getSelectedObjects or the enaio® RichClient compatibility method,
 * you will get a different result. In the former, a JavaScript array with objects consisting of objectId and
 * objectTypeId of the selected DMS objects. With the compatibility method, a character sect that is separated
 * by a semicolon and returns a tuple from objectId and objectTypeId.
 * 
 * @returns {Promise<string>} Semicolon separated string of tuples with objectId and objectTypeId.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/getSelectedObjects
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function() {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            if ($2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
            return [
                2,
                $2e6a9d9d8b3d7992$var$sendClientMessage([
                    "getSelectedObjects",
                    []
                ])
            ];
        });
    });
    return $2e6a9d9d8b3d7992$var$_getSelectedObjects.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$export$89d12ae34746cff2(osIds) {
    return $2e6a9d9d8b3d7992$var$_refreshHitListObjects.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_refreshHitListObjects() {
    $2e6a9d9d8b3d7992$var$_refreshHitListObjects = /**
 * Update/refresh one or more objects in an open hit list.
 * 
 * @param {string[]} osIds of the DMS objects.
 * @return The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/refreshHitListObjects
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(osIds) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    if ($2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
                    return [
                        4,
                        $2e6a9d9d8b3d7992$var$sendClientMessage([
                            "refreshHitListObjects",
                            [
                                osIds
                            ]
                        ])
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return $2e6a9d9d8b3d7992$var$_refreshHitListObjects.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$export$5b5fa3829992783b(objects) {
    return $2e6a9d9d8b3d7992$var$_openHitListByIds.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_openHitListByIds() {
    $2e6a9d9d8b3d7992$var$_openHitListByIds = /**
 * Display a mixed hit list with freely selected objects.
 * 
 * @param {Array<{objectId: string, objectTypeId: string}>} objects selected objects
 * @param {boolean} [inNewTab] indicates whether the hit list should be opened in a new tab
 * @param {string} [title] title of the hit list
 * @param {string} [subTitle] subtitle of the hit list
 * @param {boolean} [executeSingleHitAction] specifies whether to execute the default action when there is a single hit
 * @return The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openHitListByIds
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(objects) {
        var inNewTab, title, subTitle, executeSingleHitAction;
        var _arguments = arguments;
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    inNewTab = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : false, title = _arguments.length > 2 && _arguments[2] !== void 0 ? _arguments[2] : "", subTitle = _arguments.length > 3 && _arguments[3] !== void 0 ? _arguments[3] : "", executeSingleHitAction = _arguments.length > 4 && _arguments[4] !== void 0 ? _arguments[4] : false;
                    if ($2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
                    return [
                        4,
                        $2e6a9d9d8b3d7992$var$sendClientMessage([
                            "openHitListByIds",
                            {
                                objects: objects,
                                inNewTab: inNewTab,
                                title: title,
                                description: subTitle,
                                executeSingleHitAction: executeSingleHitAction
                            }
                        ])
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return $2e6a9d9d8b3d7992$var$_openHitListByIds.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$export$468316c75afcb0f3(json) {
    return $2e6a9d9d8b3d7992$var$_getFieldValueByInternal.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_getFieldValueByInternal() {
    $2e6a9d9d8b3d7992$var$_getFieldValueByInternal = /**
 * Only available for modal dialogs.
 * Return the value of a field given by its internal name. The return value depends on the field type.
 * See documentation for more information regarding return value.
 *
 * @param json A json object with internalName
 * @return {Promise<string|Array<Array<string>>>}
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/getFieldValueByInternal
 * @returns The answer of the client.
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(json) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            if (!$2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
            return [
                2,
                $2e6a9d9d8b3d7992$var$sendClientMessage([
                    "getFieldValueByInternal",
                    [
                        $2e6a9d9d8b3d7992$var$jsonObjectToString(json)
                    ]
                ])
            ];
        });
    });
    return $2e6a9d9d8b3d7992$var$_getFieldValueByInternal.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$export$b3ed74af647c74bd(json) {
    return $2e6a9d9d8b3d7992$var$_getWorkflowVariableByName.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_getWorkflowVariableByName() {
    $2e6a9d9d8b3d7992$var$_getWorkflowVariableByName = /**
 * Fetches the value of a specific workflow variable by its name. This function is only available for modal dialogs.
 * The return value of the function depends on the type of the workflow variable being queried.
 *
 * @param {object} json - A JSON object containing the `name` of the workflow variable.
 * @return {Promise<string|Array<Array<string>>>} - A promise that resolves to the value of the workflow variable. The type of the return value can be a string or an array of arrays of strings, depending on the variable's type.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/getWorkflowVariableByName - For more information regarding the return value based on the field type.
 * @throws {string} - Throws an error message if the function is invoked outside of a modal dialog context, as it is not implemented for dashlets.
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(json) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            if (!$2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
            return [
                2,
                $2e6a9d9d8b3d7992$var$sendClientMessage([
                    "getWorkflowVariableByName",
                    [
                        $2e6a9d9d8b3d7992$var$jsonObjectToString(json)
                    ]
                ])
            ];
        });
    });
    return $2e6a9d9d8b3d7992$var$_getWorkflowVariableByName.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$export$50c2e2f825ad7b4b(json) {
    return $2e6a9d9d8b3d7992$var$_setFieldValueByInternal.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_setFieldValueByInternal() {
    $2e6a9d9d8b3d7992$var$_setFieldValueByInternal = /**
 * Only available for modal dialogs.
 * Set the value of a field given by its internal name in the open index data mask behind the modal dialog.
 * The current value of the index data mask field is completely replaced by the new value.
 *
 * @param json A json object with internalName and value.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/setFieldValueByInternal
 * @returns The answer of the client.
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(json) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            if (!$2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
            return [
                2,
                $2e6a9d9d8b3d7992$var$sendClientMessage([
                    "setFieldValueByInternal",
                    [
                        $2e6a9d9d8b3d7992$var$jsonObjectToString(json)
                    ]
                ])
            ];
        });
    });
    return $2e6a9d9d8b3d7992$var$_setFieldValueByInternal.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$export$23c49f97b8cbcd5b(json) {
    return $2e6a9d9d8b3d7992$var$_setWorkflowVariableByName.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_setWorkflowVariableByName() {
    $2e6a9d9d8b3d7992$var$_setWorkflowVariableByName = /**
 * Only available for modal dialogs.
 * Sets a workflow variable by its name.
 * The current value of the workflow variable is completely replaced by the new value.
 *
 * @param json A json object with the variable name and value.
 * @throws {string} If the function is used outside of a modal dialog.
 * @returns The answer of the client.
 * @async
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(json) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            if (!$2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
            return [
                2,
                $2e6a9d9d8b3d7992$var$sendClientMessage([
                    "setWorkflowVariableByName",
                    [
                        $2e6a9d9d8b3d7992$var$jsonObjectToString(json)
                    ]
                ])
            ];
        });
    });
    return $2e6a9d9d8b3d7992$var$_setWorkflowVariableByName.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$export$57570b1603cf6adb() {
    return $2e6a9d9d8b3d7992$var$_getEnvironment.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_getEnvironment() {
    $2e6a9d9d8b3d7992$var$_getEnvironment = /**
 * Return the environment values from the client.
 *
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/getEnvironment
 * @returns The environment values from the client.
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function() {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            if (!$2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
            return [
                2,
                $2e6a9d9d8b3d7992$var$sendClientMessage([
                    "getEnvironment",
                    []
                ])
            ];
        });
    });
    return $2e6a9d9d8b3d7992$var$_getEnvironment.apply(this, arguments);
}
/**
 * This function is only available for modal dialogs. It sets the caption of the dialog to the provided value.
 *
 * @param {string} newDialogCaption - The caption to be set for the modal dialog. Defaults to an empty string if no value is provided.
 * @throws {string} Throws a string error message if the function is used outside of a modal dialog context.
 * @remarks The caption is set as an array for webclient compatibility. The rich client only accepts a string.
 */ function $2e6a9d9d8b3d7992$export$74da6a16c6928c4d() {
    var newDialogCaption = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    if (!$2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $2e6a9d9d8b3d7992$var$sendClientMessage([
        "setDialogCaption",
        [
            newDialogCaption
        ]
    ]);
}
function $2e6a9d9d8b3d7992$export$f290980283620b4a(buttonScriptReturnValue) {
    return $2e6a9d9d8b3d7992$var$_closeModalDialog.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_closeModalDialog() {
    $2e6a9d9d8b3d7992$var$_closeModalDialog = /**
 * Cancel the modal dialog
 *
 * @param buttonScriptReturnValue The numeric value which should be sent to the button script
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(buttonScriptReturnValue) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            if (!$2e6a9d9d8b3d7992$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
            return [
                2,
                $2e6a9d9d8b3d7992$var$sendClientMessage([
                    "closeModalDialog",
                    [
                        buttonScriptReturnValue
                    ]
                ])
            ];
        });
    });
    return $2e6a9d9d8b3d7992$var$_closeModalDialog.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$export$c3d283c41bbe930c() {
    return $2e6a9d9d8b3d7992$var$_resetSessionTimeout.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_resetSessionTimeout() {
    $2e6a9d9d8b3d7992$var$_resetSessionTimeout = /**
 * Reset the session timeout for the current user session.
 * 
 * @returns {Promise<void>} The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/resetSessionTimeout
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function() {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (window.osClient) return [
                        2
                    ]; // there is no session timeout in the rich client
                    return [
                        4,
                        $2e6a9d9d8b3d7992$var$sendClientMessage([
                            "resetSessionTimeout",
                            []
                        ])
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return $2e6a9d9d8b3d7992$var$_resetSessionTimeout.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$sendClientMessage(payload) {
    return $2e6a9d9d8b3d7992$var$_sendClientMessage.apply(this, arguments);
}
function $2e6a9d9d8b3d7992$var$_sendClientMessage() {
    $2e6a9d9d8b3d7992$var$_sendClientMessage = /**
 * Send a command either to the web client or rich client and return the response.
 * 
 * @private
 * @param {Object[]} payload The input parameter for the command
 * @returns The answer of the client
 */ (0, $4fee8be90a0e6999$export$71511d61b312f219)(function(payload) {
        return (0, $e0b9c47374f4af3f$export$71511d61b312f219)(this, function(_state) {
            try {
                if (window.osClient) return [
                    2,
                    $e6000d5a971c7fbc$export$1079770825fa94d6(payload)
                ];
                return [
                    2,
                    $0282955c6f0df84b$export$7980e63f750e794e(payload)
                ];
            } catch (error) {
                console.log("dashlet says: error caught in ".concat(payload[0]), error);
            }
            return [
                2
            ];
        });
    });
    return $2e6a9d9d8b3d7992$var$_sendClientMessage.apply(this, arguments);
}
/**
 * Checks if the json object is a string. If not the json object is stringify and
 * returned. Otherwise, it is returned as handed in.
 *
 * @private
 * @returns {string} The stringify json object if it is not already a string.
 */ function $2e6a9d9d8b3d7992$var$jsonObjectToString(jsonObject) {
    if (!(jsonObject instanceof String) && typeof jsonObject !== "string") {
        if (typeof jsonObject.value === "object" && !Array.isArray(jsonObject.value)) jsonObject.value = JSON.stringify(jsonObject.value);
        return JSON.stringify(jsonObject);
    }
    return jsonObject;
}
/**
 * Return true if we are running inside a modal dialog. If we are running inside a dashlet the return is false.
 *
 * @private
 * @returns true if modal dialog, Otherwise false
 */ function $2e6a9d9d8b3d7992$export$cebb092bf393cc5() {
    if (window.osClient) return $e6000d5a971c7fbc$export$cebb092bf393cc5();
    return $0282955c6f0df84b$export$cebb092bf393cc5();
}
// This will store the value for the onCanCancel behavior.
// It's initialized to a default value to ensure it's always callable.
var $2e6a9d9d8b3d7992$var$onCanCancelValue = 1;
/**
 * Registers the callback for the ESC key event.
 *
 * @param {Function} valueFunction - A function that returns the current value for the callback.
 */ function $2e6a9d9d8b3d7992$export$e12a024d8ae2e5c(valueFunction) {
    return new Promise(function(resolve, reject) {
        // Delay is necessary to ensure the availability of the function.
        setTimeout(function() {
            if (!$2e6a9d9d8b3d7992$export$cebb092bf393cc5()) reject("Not implemented for dashlets");
            else {
                // We assign the function passed from main.js to onCanCancelValue.
                // This allows the function to be updated dynamically from main.js.
                $2e6a9d9d8b3d7992$var$onCanCancelValue = valueFunction;
                resolve();
            }
        }, 1000);
    });
}
// Event listener for the ESC key.
window.addEventListener("keydown", function(event) {
    // Check if the ESC key was pressed, and the modal dialog is active.
    if (event.key === "Escape" && !window.osClient && $2e6a9d9d8b3d7992$export$cebb092bf393cc5()) {
        // Retrieve the current onCanCancelValue by calling the function.
        var currentValue = typeof $2e6a9d9d8b3d7992$var$onCanCancelValue == "function" ? $2e6a9d9d8b3d7992$var$onCanCancelValue() : $2e6a9d9d8b3d7992$var$onCanCancelValue;
        // If the value is not 2, we close the modal dialog.
        if (currentValue !== 2) $2e6a9d9d8b3d7992$export$f290980283620b4a(currentValue);
        else console.warn("ESC key event is disabled.");
    }
});

var $4fee8be90a0e6999$export$71511d61b312f219;
var $4fee8be90a0e6999$export$7c398597f8905a1;
"use strict";
function $4fee8be90a0e6999$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
$4fee8be90a0e6999$export$71511d61b312f219 = $4fee8be90a0e6999$export$7c398597f8905a1 = $4fee8be90a0e6999$var$_async_to_generator;
function $4fee8be90a0e6999$var$_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $4fee8be90a0e6999$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $4fee8be90a0e6999$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

var $e0b9c47374f4af3f$export$71511d61b312f219;
var $e0b9c47374f4af3f$export$cf587fbfbb3bc6b8;
"use strict";

$e0b9c47374f4af3f$export$71511d61b312f219 = $e0b9c47374f4af3f$export$cf587fbfbb3bc6b8 = (parcelRequire("bprvk")).__generator;

})();
//# sourceMappingURL=communicationLibrary.js.map
