var dE = { exports: {} }, Xp = {}, Ym = { exports: {} }, gt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var XR;
function Kb() {
  if (XR) return gt;
  XR = 1;
  var $ = Symbol.for("react.element"), B = Symbol.for("react.portal"), M = Symbol.for("react.fragment"), Je = Symbol.for("react.strict_mode"), Fe = Symbol.for("react.profiler"), Ie = Symbol.for("react.provider"), S = Symbol.for("react.context"), St = Symbol.for("react.forward_ref"), oe = Symbol.for("react.suspense"), fe = Symbol.for("react.memo"), se = Symbol.for("react.lazy"), K = Symbol.iterator;
  function ye(b) {
    return b === null || typeof b != "object" ? null : (b = K && b[K] || b["@@iterator"], typeof b == "function" ? b : null);
  }
  var ie = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Be = Object.assign, ht = {};
  function lt(b, P, Pe) {
    this.props = b, this.context = P, this.refs = ht, this.updater = Pe || ie;
  }
  lt.prototype.isReactComponent = {}, lt.prototype.setState = function(b, P) {
    if (typeof b != "object" && typeof b != "function" && b != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, b, P, "setState");
  }, lt.prototype.forceUpdate = function(b) {
    this.updater.enqueueForceUpdate(this, b, "forceUpdate");
  };
  function cn() {
  }
  cn.prototype = lt.prototype;
  function vt(b, P, Pe) {
    this.props = b, this.context = P, this.refs = ht, this.updater = Pe || ie;
  }
  var Ge = vt.prototype = new cn();
  Ge.constructor = vt, Be(Ge, lt.prototype), Ge.isPureReactComponent = !0;
  var mt = Array.isArray, be = Object.prototype.hasOwnProperty, ft = { current: null }, He = { key: !0, ref: !0, __self: !0, __source: !0 };
  function rn(b, P, Pe) {
    var Ae, ut = {}, nt = null, et = null;
    if (P != null) for (Ae in P.ref !== void 0 && (et = P.ref), P.key !== void 0 && (nt = "" + P.key), P) be.call(P, Ae) && !He.hasOwnProperty(Ae) && (ut[Ae] = P[Ae]);
    var rt = arguments.length - 2;
    if (rt === 1) ut.children = Pe;
    else if (1 < rt) {
      for (var ot = Array(rt), Vt = 0; Vt < rt; Vt++) ot[Vt] = arguments[Vt + 2];
      ut.children = ot;
    }
    if (b && b.defaultProps) for (Ae in rt = b.defaultProps, rt) ut[Ae] === void 0 && (ut[Ae] = rt[Ae]);
    return { $$typeof: $, type: b, key: nt, ref: et, props: ut, _owner: ft.current };
  }
  function jt(b, P) {
    return { $$typeof: $, type: b.type, key: P, ref: b.ref, props: b.props, _owner: b._owner };
  }
  function Kt(b) {
    return typeof b == "object" && b !== null && b.$$typeof === $;
  }
  function an(b) {
    var P = { "=": "=0", ":": "=2" };
    return "$" + b.replace(/[=:]/g, function(Pe) {
      return P[Pe];
    });
  }
  var _t = /\/+/g;
  function Oe(b, P) {
    return typeof b == "object" && b !== null && b.key != null ? an("" + b.key) : P.toString(36);
  }
  function At(b, P, Pe, Ae, ut) {
    var nt = typeof b;
    (nt === "undefined" || nt === "boolean") && (b = null);
    var et = !1;
    if (b === null) et = !0;
    else switch (nt) {
      case "string":
      case "number":
        et = !0;
        break;
      case "object":
        switch (b.$$typeof) {
          case $:
          case B:
            et = !0;
        }
    }
    if (et) return et = b, ut = ut(et), b = Ae === "" ? "." + Oe(et, 0) : Ae, mt(ut) ? (Pe = "", b != null && (Pe = b.replace(_t, "$&/") + "/"), At(ut, P, Pe, "", function(Vt) {
      return Vt;
    })) : ut != null && (Kt(ut) && (ut = jt(ut, Pe + (!ut.key || et && et.key === ut.key ? "" : ("" + ut.key).replace(_t, "$&/") + "/") + b)), P.push(ut)), 1;
    if (et = 0, Ae = Ae === "" ? "." : Ae + ":", mt(b)) for (var rt = 0; rt < b.length; rt++) {
      nt = b[rt];
      var ot = Ae + Oe(nt, rt);
      et += At(nt, P, Pe, ot, ut);
    }
    else if (ot = ye(b), typeof ot == "function") for (b = ot.call(b), rt = 0; !(nt = b.next()).done; ) nt = nt.value, ot = Ae + Oe(nt, rt++), et += At(nt, P, Pe, ot, ut);
    else if (nt === "object") throw P = String(b), Error("Objects are not valid as a React child (found: " + (P === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : P) + "). If you meant to render a collection of children, use an array instead.");
    return et;
  }
  function bt(b, P, Pe) {
    if (b == null) return b;
    var Ae = [], ut = 0;
    return At(b, Ae, "", "", function(nt) {
      return P.call(Pe, nt, ut++);
    }), Ae;
  }
  function kt(b) {
    if (b._status === -1) {
      var P = b._result;
      P = P(), P.then(function(Pe) {
        (b._status === 0 || b._status === -1) && (b._status = 1, b._result = Pe);
      }, function(Pe) {
        (b._status === 0 || b._status === -1) && (b._status = 2, b._result = Pe);
      }), b._status === -1 && (b._status = 0, b._result = P);
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var Re = { current: null }, J = { transition: null }, Te = { ReactCurrentDispatcher: Re, ReactCurrentBatchConfig: J, ReactCurrentOwner: ft };
  function ne() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return gt.Children = { map: bt, forEach: function(b, P, Pe) {
    bt(b, function() {
      P.apply(this, arguments);
    }, Pe);
  }, count: function(b) {
    var P = 0;
    return bt(b, function() {
      P++;
    }), P;
  }, toArray: function(b) {
    return bt(b, function(P) {
      return P;
    }) || [];
  }, only: function(b) {
    if (!Kt(b)) throw Error("React.Children.only expected to receive a single React element child.");
    return b;
  } }, gt.Component = lt, gt.Fragment = M, gt.Profiler = Fe, gt.PureComponent = vt, gt.StrictMode = Je, gt.Suspense = oe, gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Te, gt.act = ne, gt.cloneElement = function(b, P, Pe) {
    if (b == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + b + ".");
    var Ae = Be({}, b.props), ut = b.key, nt = b.ref, et = b._owner;
    if (P != null) {
      if (P.ref !== void 0 && (nt = P.ref, et = ft.current), P.key !== void 0 && (ut = "" + P.key), b.type && b.type.defaultProps) var rt = b.type.defaultProps;
      for (ot in P) be.call(P, ot) && !He.hasOwnProperty(ot) && (Ae[ot] = P[ot] === void 0 && rt !== void 0 ? rt[ot] : P[ot]);
    }
    var ot = arguments.length - 2;
    if (ot === 1) Ae.children = Pe;
    else if (1 < ot) {
      rt = Array(ot);
      for (var Vt = 0; Vt < ot; Vt++) rt[Vt] = arguments[Vt + 2];
      Ae.children = rt;
    }
    return { $$typeof: $, type: b.type, key: ut, ref: nt, props: Ae, _owner: et };
  }, gt.createContext = function(b) {
    return b = { $$typeof: S, _currentValue: b, _currentValue2: b, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, b.Provider = { $$typeof: Ie, _context: b }, b.Consumer = b;
  }, gt.createElement = rn, gt.createFactory = function(b) {
    var P = rn.bind(null, b);
    return P.type = b, P;
  }, gt.createRef = function() {
    return { current: null };
  }, gt.forwardRef = function(b) {
    return { $$typeof: St, render: b };
  }, gt.isValidElement = Kt, gt.lazy = function(b) {
    return { $$typeof: se, _payload: { _status: -1, _result: b }, _init: kt };
  }, gt.memo = function(b, P) {
    return { $$typeof: fe, type: b, compare: P === void 0 ? null : P };
  }, gt.startTransition = function(b) {
    var P = J.transition;
    J.transition = {};
    try {
      b();
    } finally {
      J.transition = P;
    }
  }, gt.unstable_act = ne, gt.useCallback = function(b, P) {
    return Re.current.useCallback(b, P);
  }, gt.useContext = function(b) {
    return Re.current.useContext(b);
  }, gt.useDebugValue = function() {
  }, gt.useDeferredValue = function(b) {
    return Re.current.useDeferredValue(b);
  }, gt.useEffect = function(b, P) {
    return Re.current.useEffect(b, P);
  }, gt.useId = function() {
    return Re.current.useId();
  }, gt.useImperativeHandle = function(b, P, Pe) {
    return Re.current.useImperativeHandle(b, P, Pe);
  }, gt.useInsertionEffect = function(b, P) {
    return Re.current.useInsertionEffect(b, P);
  }, gt.useLayoutEffect = function(b, P) {
    return Re.current.useLayoutEffect(b, P);
  }, gt.useMemo = function(b, P) {
    return Re.current.useMemo(b, P);
  }, gt.useReducer = function(b, P, Pe) {
    return Re.current.useReducer(b, P, Pe);
  }, gt.useRef = function(b) {
    return Re.current.useRef(b);
  }, gt.useState = function(b) {
    return Re.current.useState(b);
  }, gt.useSyncExternalStore = function(b, P, Pe) {
    return Re.current.useSyncExternalStore(b, P, Pe);
  }, gt.useTransition = function() {
    return Re.current.useTransition();
  }, gt.version = "18.3.1", gt;
}
var Zp = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Zp.exports;
var KR;
function Zb() {
  return KR || (KR = 1, function($, B) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var M = "18.3.1", Je = Symbol.for("react.element"), Fe = Symbol.for("react.portal"), Ie = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), St = Symbol.for("react.profiler"), oe = Symbol.for("react.provider"), fe = Symbol.for("react.context"), se = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), ye = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), Be = Symbol.for("react.lazy"), ht = Symbol.for("react.offscreen"), lt = Symbol.iterator, cn = "@@iterator";
      function vt(h) {
        if (h === null || typeof h != "object")
          return null;
        var C = lt && h[lt] || h[cn];
        return typeof C == "function" ? C : null;
      }
      var Ge = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, mt = {
        transition: null
      }, be = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, ft = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, He = {}, rn = null;
      function jt(h) {
        rn = h;
      }
      He.setExtraStackFrame = function(h) {
        rn = h;
      }, He.getCurrentStack = null, He.getStackAddendum = function() {
        var h = "";
        rn && (h += rn);
        var C = He.getCurrentStack;
        return C && (h += C() || ""), h;
      };
      var Kt = !1, an = !1, _t = !1, Oe = !1, At = !1, bt = {
        ReactCurrentDispatcher: Ge,
        ReactCurrentBatchConfig: mt,
        ReactCurrentOwner: ft
      };
      bt.ReactDebugCurrentFrame = He, bt.ReactCurrentActQueue = be;
      function kt(h) {
        {
          for (var C = arguments.length, z = new Array(C > 1 ? C - 1 : 0), F = 1; F < C; F++)
            z[F - 1] = arguments[F];
          J("warn", h, z);
        }
      }
      function Re(h) {
        {
          for (var C = arguments.length, z = new Array(C > 1 ? C - 1 : 0), F = 1; F < C; F++)
            z[F - 1] = arguments[F];
          J("error", h, z);
        }
      }
      function J(h, C, z) {
        {
          var F = bt.ReactDebugCurrentFrame, Z = F.getStackAddendum();
          Z !== "" && (C += "%s", z = z.concat([Z]));
          var Le = z.map(function(re) {
            return String(re);
          });
          Le.unshift("Warning: " + C), Function.prototype.apply.call(console[h], console, Le);
        }
      }
      var Te = {};
      function ne(h, C) {
        {
          var z = h.constructor, F = z && (z.displayName || z.name) || "ReactClass", Z = F + "." + C;
          if (Te[Z])
            return;
          Re("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", C, F), Te[Z] = !0;
        }
      }
      var b = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(h) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(h, C, z) {
          ne(h, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(h, C, z, F) {
          ne(h, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(h, C, z, F) {
          ne(h, "setState");
        }
      }, P = Object.assign, Pe = {};
      Object.freeze(Pe);
      function Ae(h, C, z) {
        this.props = h, this.context = C, this.refs = Pe, this.updater = z || b;
      }
      Ae.prototype.isReactComponent = {}, Ae.prototype.setState = function(h, C) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, C, "setState");
      }, Ae.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var ut = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, nt = function(h, C) {
          Object.defineProperty(Ae.prototype, h, {
            get: function() {
              kt("%s(...) is deprecated in plain JavaScript React classes. %s", C[0], C[1]);
            }
          });
        };
        for (var et in ut)
          ut.hasOwnProperty(et) && nt(et, ut[et]);
      }
      function rt() {
      }
      rt.prototype = Ae.prototype;
      function ot(h, C, z) {
        this.props = h, this.context = C, this.refs = Pe, this.updater = z || b;
      }
      var Vt = ot.prototype = new rt();
      Vt.constructor = ot, P(Vt, Ae.prototype), Vt.isPureReactComponent = !0;
      function kn() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var wr = Array.isArray;
      function En(h) {
        return wr(h);
      }
      function tr(h) {
        {
          var C = typeof Symbol == "function" && Symbol.toStringTag, z = C && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return z;
        }
      }
      function Pn(h) {
        try {
          return Vn(h), !1;
        } catch {
          return !0;
        }
      }
      function Vn(h) {
        return "" + h;
      }
      function $r(h) {
        if (Pn(h))
          return Re("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", tr(h)), Vn(h);
      }
      function oi(h, C, z) {
        var F = h.displayName;
        if (F)
          return F;
        var Z = C.displayName || C.name || "";
        return Z !== "" ? z + "(" + Z + ")" : z;
      }
      function ua(h) {
        return h.displayName || "Context";
      }
      function Gn(h) {
        if (h == null)
          return null;
        if (typeof h.tag == "number" && Re("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case Ie:
            return "Fragment";
          case Fe:
            return "Portal";
          case St:
            return "Profiler";
          case S:
            return "StrictMode";
          case K:
            return "Suspense";
          case ye:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case fe:
              var C = h;
              return ua(C) + ".Consumer";
            case oe:
              var z = h;
              return ua(z._context) + ".Provider";
            case se:
              return oi(h, h.render, "ForwardRef");
            case ie:
              var F = h.displayName || null;
              return F !== null ? F : Gn(h.type) || "Memo";
            case Be: {
              var Z = h, Le = Z._payload, re = Z._init;
              try {
                return Gn(re(Le));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Cn = Object.prototype.hasOwnProperty, Bn = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, yr, $a, On;
      On = {};
      function gr(h) {
        if (Cn.call(h, "ref")) {
          var C = Object.getOwnPropertyDescriptor(h, "ref").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.ref !== void 0;
      }
      function oa(h) {
        if (Cn.call(h, "key")) {
          var C = Object.getOwnPropertyDescriptor(h, "key").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.key !== void 0;
      }
      function Ia(h, C) {
        var z = function() {
          yr || (yr = !0, Re("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        z.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: z,
          configurable: !0
        });
      }
      function si(h, C) {
        var z = function() {
          $a || ($a = !0, Re("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        z.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: z,
          configurable: !0
        });
      }
      function ee(h) {
        if (typeof h.ref == "string" && ft.current && h.__self && ft.current.stateNode !== h.__self) {
          var C = Gn(ft.current.type);
          On[C] || (Re('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', C, h.ref), On[C] = !0);
        }
      }
      var we = function(h, C, z, F, Z, Le, re) {
        var ze = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: Je,
          // Built-in properties that belong on the element
          type: h,
          key: C,
          ref: z,
          props: re,
          // Record the component responsible for creating this element.
          _owner: Le
        };
        return ze._store = {}, Object.defineProperty(ze._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(ze, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: F
        }), Object.defineProperty(ze, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Z
        }), Object.freeze && (Object.freeze(ze.props), Object.freeze(ze)), ze;
      };
      function at(h, C, z) {
        var F, Z = {}, Le = null, re = null, ze = null, pt = null;
        if (C != null) {
          gr(C) && (re = C.ref, ee(C)), oa(C) && ($r(C.key), Le = "" + C.key), ze = C.__self === void 0 ? null : C.__self, pt = C.__source === void 0 ? null : C.__source;
          for (F in C)
            Cn.call(C, F) && !Bn.hasOwnProperty(F) && (Z[F] = C[F]);
        }
        var xt = arguments.length - 2;
        if (xt === 1)
          Z.children = z;
        else if (xt > 1) {
          for (var tn = Array(xt), Yt = 0; Yt < xt; Yt++)
            tn[Yt] = arguments[Yt + 2];
          Object.freeze && Object.freeze(tn), Z.children = tn;
        }
        if (h && h.defaultProps) {
          var it = h.defaultProps;
          for (F in it)
            Z[F] === void 0 && (Z[F] = it[F]);
        }
        if (Le || re) {
          var Qt = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          Le && Ia(Z, Qt), re && si(Z, Qt);
        }
        return we(h, Le, re, ze, pt, ft.current, Z);
      }
      function Ft(h, C) {
        var z = we(h.type, C, h.ref, h._self, h._source, h._owner, h.props);
        return z;
      }
      function Zt(h, C, z) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var F, Z = P({}, h.props), Le = h.key, re = h.ref, ze = h._self, pt = h._source, xt = h._owner;
        if (C != null) {
          gr(C) && (re = C.ref, xt = ft.current), oa(C) && ($r(C.key), Le = "" + C.key);
          var tn;
          h.type && h.type.defaultProps && (tn = h.type.defaultProps);
          for (F in C)
            Cn.call(C, F) && !Bn.hasOwnProperty(F) && (C[F] === void 0 && tn !== void 0 ? Z[F] = tn[F] : Z[F] = C[F]);
        }
        var Yt = arguments.length - 2;
        if (Yt === 1)
          Z.children = z;
        else if (Yt > 1) {
          for (var it = Array(Yt), Qt = 0; Qt < Yt; Qt++)
            it[Qt] = arguments[Qt + 2];
          Z.children = it;
        }
        return we(h.type, Le, re, ze, pt, xt, Z);
      }
      function pn(h) {
        return typeof h == "object" && h !== null && h.$$typeof === Je;
      }
      var ln = ".", qn = ":";
      function Jt(h) {
        var C = /[=:]/g, z = {
          "=": "=0",
          ":": "=2"
        }, F = h.replace(C, function(Z) {
          return z[Z];
        });
        return "$" + F;
      }
      var Bt = !1, $t = /\/+/g;
      function sa(h) {
        return h.replace($t, "$&/");
      }
      function Sr(h, C) {
        return typeof h == "object" && h !== null && h.key != null ? ($r(h.key), Jt("" + h.key)) : C.toString(36);
      }
      function Ra(h, C, z, F, Z) {
        var Le = typeof h;
        (Le === "undefined" || Le === "boolean") && (h = null);
        var re = !1;
        if (h === null)
          re = !0;
        else
          switch (Le) {
            case "string":
            case "number":
              re = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case Je:
                case Fe:
                  re = !0;
              }
          }
        if (re) {
          var ze = h, pt = Z(ze), xt = F === "" ? ln + Sr(ze, 0) : F;
          if (En(pt)) {
            var tn = "";
            xt != null && (tn = sa(xt) + "/"), Ra(pt, C, tn, "", function(Gf) {
              return Gf;
            });
          } else pt != null && (pn(pt) && (pt.key && (!ze || ze.key !== pt.key) && $r(pt.key), pt = Ft(
            pt,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            z + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (pt.key && (!ze || ze.key !== pt.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              sa("" + pt.key) + "/"
            ) : "") + xt
          )), C.push(pt));
          return 1;
        }
        var Yt, it, Qt = 0, vn = F === "" ? ln : F + qn;
        if (En(h))
          for (var Cl = 0; Cl < h.length; Cl++)
            Yt = h[Cl], it = vn + Sr(Yt, Cl), Qt += Ra(Yt, C, z, it, Z);
        else {
          var Go = vt(h);
          if (typeof Go == "function") {
            var Vi = h;
            Go === Vi.entries && (Bt || kt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Bt = !0);
            for (var qo = Go.call(Vi), uu, Wf = 0; !(uu = qo.next()).done; )
              Yt = uu.value, it = vn + Sr(Yt, Wf++), Qt += Ra(Yt, C, z, it, Z);
          } else if (Le === "object") {
            var uc = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (uc === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : uc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Qt;
      }
      function ji(h, C, z) {
        if (h == null)
          return h;
        var F = [], Z = 0;
        return Ra(h, F, "", "", function(Le) {
          return C.call(z, Le, Z++);
        }), F;
      }
      function Zl(h) {
        var C = 0;
        return ji(h, function() {
          C++;
        }), C;
      }
      function Jl(h, C, z) {
        ji(h, function() {
          C.apply(this, arguments);
        }, z);
      }
      function dl(h) {
        return ji(h, function(C) {
          return C;
        }) || [];
      }
      function pl(h) {
        if (!pn(h))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return h;
      }
      function eu(h) {
        var C = {
          $$typeof: fe,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: h,
          _currentValue2: h,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        C.Provider = {
          $$typeof: oe,
          _context: C
        };
        var z = !1, F = !1, Z = !1;
        {
          var Le = {
            $$typeof: fe,
            _context: C
          };
          Object.defineProperties(Le, {
            Provider: {
              get: function() {
                return F || (F = !0, Re("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), C.Provider;
              },
              set: function(re) {
                C.Provider = re;
              }
            },
            _currentValue: {
              get: function() {
                return C._currentValue;
              },
              set: function(re) {
                C._currentValue = re;
              }
            },
            _currentValue2: {
              get: function() {
                return C._currentValue2;
              },
              set: function(re) {
                C._currentValue2 = re;
              }
            },
            _threadCount: {
              get: function() {
                return C._threadCount;
              },
              set: function(re) {
                C._threadCount = re;
              }
            },
            Consumer: {
              get: function() {
                return z || (z = !0, Re("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), C.Consumer;
              }
            },
            displayName: {
              get: function() {
                return C.displayName;
              },
              set: function(re) {
                Z || (kt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", re), Z = !0);
              }
            }
          }), C.Consumer = Le;
        }
        return C._currentRenderer = null, C._currentRenderer2 = null, C;
      }
      var xr = -1, _r = 0, nr = 1, ci = 2;
      function Ya(h) {
        if (h._status === xr) {
          var C = h._result, z = C();
          if (z.then(function(Le) {
            if (h._status === _r || h._status === xr) {
              var re = h;
              re._status = nr, re._result = Le;
            }
          }, function(Le) {
            if (h._status === _r || h._status === xr) {
              var re = h;
              re._status = ci, re._result = Le;
            }
          }), h._status === xr) {
            var F = h;
            F._status = _r, F._result = z;
          }
        }
        if (h._status === nr) {
          var Z = h._result;
          return Z === void 0 && Re(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, Z), "default" in Z || Re(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, Z), Z.default;
        } else
          throw h._result;
      }
      function fi(h) {
        var C = {
          // We use these fields to store the result.
          _status: xr,
          _result: h
        }, z = {
          $$typeof: Be,
          _payload: C,
          _init: Ya
        };
        {
          var F, Z;
          Object.defineProperties(z, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return F;
              },
              set: function(Le) {
                Re("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), F = Le, Object.defineProperty(z, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return Z;
              },
              set: function(Le) {
                Re("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Z = Le, Object.defineProperty(z, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return z;
      }
      function di(h) {
        h != null && h.$$typeof === ie ? Re("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? Re("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && Re("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && Re("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var C = {
          $$typeof: se,
          render: h
        };
        {
          var z;
          Object.defineProperty(C, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return z;
            },
            set: function(F) {
              z = F, !h.name && !h.displayName && (h.displayName = F);
            }
          });
        }
        return C;
      }
      var R;
      R = Symbol.for("react.module.reference");
      function I(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === Ie || h === St || At || h === S || h === K || h === ye || Oe || h === ht || Kt || an || _t || typeof h == "object" && h !== null && (h.$$typeof === Be || h.$$typeof === ie || h.$$typeof === oe || h.$$typeof === fe || h.$$typeof === se || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === R || h.getModuleId !== void 0));
      }
      function ae(h, C) {
        I(h) || Re("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var z = {
          $$typeof: ie,
          type: h,
          compare: C === void 0 ? null : C
        };
        {
          var F;
          Object.defineProperty(z, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return F;
            },
            set: function(Z) {
              F = Z, !h.name && !h.displayName && (h.displayName = Z);
            }
          });
        }
        return z;
      }
      function me() {
        var h = Ge.current;
        return h === null && Re(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function Xe(h) {
        var C = me();
        if (h._context !== void 0) {
          var z = h._context;
          z.Consumer === h ? Re("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : z.Provider === h && Re("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return C.useContext(h);
      }
      function Qe(h) {
        var C = me();
        return C.useState(h);
      }
      function dt(h, C, z) {
        var F = me();
        return F.useReducer(h, C, z);
      }
      function st(h) {
        var C = me();
        return C.useRef(h);
      }
      function Rn(h, C) {
        var z = me();
        return z.useEffect(h, C);
      }
      function en(h, C) {
        var z = me();
        return z.useInsertionEffect(h, C);
      }
      function un(h, C) {
        var z = me();
        return z.useLayoutEffect(h, C);
      }
      function rr(h, C) {
        var z = me();
        return z.useCallback(h, C);
      }
      function Qa(h, C) {
        var z = me();
        return z.useMemo(h, C);
      }
      function Wa(h, C, z) {
        var F = me();
        return F.useImperativeHandle(h, C, z);
      }
      function Ke(h, C) {
        {
          var z = me();
          return z.useDebugValue(h, C);
        }
      }
      function tt() {
        var h = me();
        return h.useTransition();
      }
      function Ga(h) {
        var C = me();
        return C.useDeferredValue(h);
      }
      function tu() {
        var h = me();
        return h.useId();
      }
      function nu(h, C, z) {
        var F = me();
        return F.useSyncExternalStore(h, C, z);
      }
      var vl = 0, Qu, hl, Ir, Io, br, ic, lc;
      function Wu() {
      }
      Wu.__reactDisabledLog = !0;
      function ml() {
        {
          if (vl === 0) {
            Qu = console.log, hl = console.info, Ir = console.warn, Io = console.error, br = console.group, ic = console.groupCollapsed, lc = console.groupEnd;
            var h = {
              configurable: !0,
              enumerable: !0,
              value: Wu,
              writable: !0
            };
            Object.defineProperties(console, {
              info: h,
              log: h,
              warn: h,
              error: h,
              group: h,
              groupCollapsed: h,
              groupEnd: h
            });
          }
          vl++;
        }
      }
      function ca() {
        {
          if (vl--, vl === 0) {
            var h = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: P({}, h, {
                value: Qu
              }),
              info: P({}, h, {
                value: hl
              }),
              warn: P({}, h, {
                value: Ir
              }),
              error: P({}, h, {
                value: Io
              }),
              group: P({}, h, {
                value: br
              }),
              groupCollapsed: P({}, h, {
                value: ic
              }),
              groupEnd: P({}, h, {
                value: lc
              })
            });
          }
          vl < 0 && Re("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var qa = bt.ReactCurrentDispatcher, Xa;
      function Gu(h, C, z) {
        {
          if (Xa === void 0)
            try {
              throw Error();
            } catch (Z) {
              var F = Z.stack.trim().match(/\n( *(at )?)/);
              Xa = F && F[1] || "";
            }
          return `
` + Xa + h;
        }
      }
      var ru = !1, yl;
      {
        var qu = typeof WeakMap == "function" ? WeakMap : Map;
        yl = new qu();
      }
      function Xu(h, C) {
        if (!h || ru)
          return "";
        {
          var z = yl.get(h);
          if (z !== void 0)
            return z;
        }
        var F;
        ru = !0;
        var Z = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Le;
        Le = qa.current, qa.current = null, ml();
        try {
          if (C) {
            var re = function() {
              throw Error();
            };
            if (Object.defineProperty(re.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(re, []);
              } catch (vn) {
                F = vn;
              }
              Reflect.construct(h, [], re);
            } else {
              try {
                re.call();
              } catch (vn) {
                F = vn;
              }
              h.call(re.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (vn) {
              F = vn;
            }
            h();
          }
        } catch (vn) {
          if (vn && F && typeof vn.stack == "string") {
            for (var ze = vn.stack.split(`
`), pt = F.stack.split(`
`), xt = ze.length - 1, tn = pt.length - 1; xt >= 1 && tn >= 0 && ze[xt] !== pt[tn]; )
              tn--;
            for (; xt >= 1 && tn >= 0; xt--, tn--)
              if (ze[xt] !== pt[tn]) {
                if (xt !== 1 || tn !== 1)
                  do
                    if (xt--, tn--, tn < 0 || ze[xt] !== pt[tn]) {
                      var Yt = `
` + ze[xt].replace(" at new ", " at ");
                      return h.displayName && Yt.includes("<anonymous>") && (Yt = Yt.replace("<anonymous>", h.displayName)), typeof h == "function" && yl.set(h, Yt), Yt;
                    }
                  while (xt >= 1 && tn >= 0);
                break;
              }
          }
        } finally {
          ru = !1, qa.current = Le, ca(), Error.prepareStackTrace = Z;
        }
        var it = h ? h.displayName || h.name : "", Qt = it ? Gu(it) : "";
        return typeof h == "function" && yl.set(h, Qt), Qt;
      }
      function Hi(h, C, z) {
        return Xu(h, !1);
      }
      function Yf(h) {
        var C = h.prototype;
        return !!(C && C.isReactComponent);
      }
      function Pi(h, C, z) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return Xu(h, Yf(h));
        if (typeof h == "string")
          return Gu(h);
        switch (h) {
          case K:
            return Gu("Suspense");
          case ye:
            return Gu("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case se:
              return Hi(h.render);
            case ie:
              return Pi(h.type, C, z);
            case Be: {
              var F = h, Z = F._payload, Le = F._init;
              try {
                return Pi(Le(Z), C, z);
              } catch {
              }
            }
          }
        return "";
      }
      var Ot = {}, Ku = bt.ReactDebugCurrentFrame;
      function wt(h) {
        if (h) {
          var C = h._owner, z = Pi(h.type, h._source, C ? C.type : null);
          Ku.setExtraStackFrame(z);
        } else
          Ku.setExtraStackFrame(null);
      }
      function Yo(h, C, z, F, Z) {
        {
          var Le = Function.call.bind(Cn);
          for (var re in h)
            if (Le(h, re)) {
              var ze = void 0;
              try {
                if (typeof h[re] != "function") {
                  var pt = Error((F || "React class") + ": " + z + " type `" + re + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[re] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw pt.name = "Invariant Violation", pt;
                }
                ze = h[re](C, re, F, z, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (xt) {
                ze = xt;
              }
              ze && !(ze instanceof Error) && (wt(Z), Re("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", z, re, typeof ze), wt(null)), ze instanceof Error && !(ze.message in Ot) && (Ot[ze.message] = !0, wt(Z), Re("Failed %s type: %s", z, ze.message), wt(null));
            }
        }
      }
      function pi(h) {
        if (h) {
          var C = h._owner, z = Pi(h.type, h._source, C ? C.type : null);
          jt(z);
        } else
          jt(null);
      }
      var Ye;
      Ye = !1;
      function Zu() {
        if (ft.current) {
          var h = Gn(ft.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
      function ar(h) {
        if (h !== void 0) {
          var C = h.fileName.replace(/^.*[\\\/]/, ""), z = h.lineNumber;
          return `

Check your code at ` + C + ":" + z + ".";
        }
        return "";
      }
      function vi(h) {
        return h != null ? ar(h.__source) : "";
      }
      var Dr = {};
      function hi(h) {
        var C = Zu();
        if (!C) {
          var z = typeof h == "string" ? h : h.displayName || h.name;
          z && (C = `

Check the top-level render call using <` + z + ">.");
        }
        return C;
      }
      function on(h, C) {
        if (!(!h._store || h._store.validated || h.key != null)) {
          h._store.validated = !0;
          var z = hi(C);
          if (!Dr[z]) {
            Dr[z] = !0;
            var F = "";
            h && h._owner && h._owner !== ft.current && (F = " It was passed a child from " + Gn(h._owner.type) + "."), pi(h), Re('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', z, F), pi(null);
          }
        }
      }
      function It(h, C) {
        if (typeof h == "object") {
          if (En(h))
            for (var z = 0; z < h.length; z++) {
              var F = h[z];
              pn(F) && on(F, C);
            }
          else if (pn(h))
            h._store && (h._store.validated = !0);
          else if (h) {
            var Z = vt(h);
            if (typeof Z == "function" && Z !== h.entries)
              for (var Le = Z.call(h), re; !(re = Le.next()).done; )
                pn(re.value) && on(re.value, C);
          }
        }
      }
      function gl(h) {
        {
          var C = h.type;
          if (C == null || typeof C == "string")
            return;
          var z;
          if (typeof C == "function")
            z = C.propTypes;
          else if (typeof C == "object" && (C.$$typeof === se || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          C.$$typeof === ie))
            z = C.propTypes;
          else
            return;
          if (z) {
            var F = Gn(C);
            Yo(z, h.props, "prop", F, h);
          } else if (C.PropTypes !== void 0 && !Ye) {
            Ye = !0;
            var Z = Gn(C);
            Re("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Z || "Unknown");
          }
          typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && Re("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function $n(h) {
        {
          for (var C = Object.keys(h.props), z = 0; z < C.length; z++) {
            var F = C[z];
            if (F !== "children" && F !== "key") {
              pi(h), Re("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", F), pi(null);
              break;
            }
          }
          h.ref !== null && (pi(h), Re("Invalid attribute `ref` supplied to `React.Fragment`."), pi(null));
        }
      }
      function kr(h, C, z) {
        var F = I(h);
        if (!F) {
          var Z = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (Z += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Le = vi(C);
          Le ? Z += Le : Z += Zu();
          var re;
          h === null ? re = "null" : En(h) ? re = "array" : h !== void 0 && h.$$typeof === Je ? (re = "<" + (Gn(h.type) || "Unknown") + " />", Z = " Did you accidentally export a JSX literal instead of a component?") : re = typeof h, Re("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", re, Z);
        }
        var ze = at.apply(this, arguments);
        if (ze == null)
          return ze;
        if (F)
          for (var pt = 2; pt < arguments.length; pt++)
            It(arguments[pt], h);
        return h === Ie ? $n(ze) : gl(ze), ze;
      }
      var Ta = !1;
      function au(h) {
        var C = kr.bind(null, h);
        return C.type = h, Ta || (Ta = !0, kt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(C, "type", {
          enumerable: !1,
          get: function() {
            return kt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: h
            }), h;
          }
        }), C;
      }
      function Qo(h, C, z) {
        for (var F = Zt.apply(this, arguments), Z = 2; Z < arguments.length; Z++)
          It(arguments[Z], F.type);
        return gl(F), F;
      }
      function Wo(h, C) {
        var z = mt.transition;
        mt.transition = {};
        var F = mt.transition;
        mt.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (mt.transition = z, z === null && F._updatedFibers) {
            var Z = F._updatedFibers.size;
            Z > 10 && kt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), F._updatedFibers.clear();
          }
        }
      }
      var Sl = !1, iu = null;
      function Qf(h) {
        if (iu === null)
          try {
            var C = ("require" + Math.random()).slice(0, 7), z = $ && $[C];
            iu = z.call($, "timers").setImmediate;
          } catch {
            iu = function(Z) {
              Sl === !1 && (Sl = !0, typeof MessageChannel > "u" && Re("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Le = new MessageChannel();
              Le.port1.onmessage = Z, Le.port2.postMessage(void 0);
            };
          }
        return iu(h);
      }
      var wa = 0, Ka = !1;
      function mi(h) {
        {
          var C = wa;
          wa++, be.current === null && (be.current = []);
          var z = be.isBatchingLegacy, F;
          try {
            if (be.isBatchingLegacy = !0, F = h(), !z && be.didScheduleLegacyUpdate) {
              var Z = be.current;
              Z !== null && (be.didScheduleLegacyUpdate = !1, El(Z));
            }
          } catch (it) {
            throw xa(C), it;
          } finally {
            be.isBatchingLegacy = z;
          }
          if (F !== null && typeof F == "object" && typeof F.then == "function") {
            var Le = F, re = !1, ze = {
              then: function(it, Qt) {
                re = !0, Le.then(function(vn) {
                  xa(C), wa === 0 ? Ju(vn, it, Qt) : it(vn);
                }, function(vn) {
                  xa(C), Qt(vn);
                });
              }
            };
            return !Ka && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              re || (Ka = !0, Re("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), ze;
          } else {
            var pt = F;
            if (xa(C), wa === 0) {
              var xt = be.current;
              xt !== null && (El(xt), be.current = null);
              var tn = {
                then: function(it, Qt) {
                  be.current === null ? (be.current = [], Ju(pt, it, Qt)) : it(pt);
                }
              };
              return tn;
            } else {
              var Yt = {
                then: function(it, Qt) {
                  it(pt);
                }
              };
              return Yt;
            }
          }
        }
      }
      function xa(h) {
        h !== wa - 1 && Re("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), wa = h;
      }
      function Ju(h, C, z) {
        {
          var F = be.current;
          if (F !== null)
            try {
              El(F), Qf(function() {
                F.length === 0 ? (be.current = null, C(h)) : Ju(h, C, z);
              });
            } catch (Z) {
              z(Z);
            }
          else
            C(h);
        }
      }
      var eo = !1;
      function El(h) {
        if (!eo) {
          eo = !0;
          var C = 0;
          try {
            for (; C < h.length; C++) {
              var z = h[C];
              do
                z = z(!0);
              while (z !== null);
            }
            h.length = 0;
          } catch (F) {
            throw h = h.slice(C + 1), F;
          } finally {
            eo = !1;
          }
        }
      }
      var lu = kr, to = Qo, no = au, Za = {
        map: ji,
        forEach: Jl,
        count: Zl,
        toArray: dl,
        only: pl
      };
      B.Children = Za, B.Component = Ae, B.Fragment = Ie, B.Profiler = St, B.PureComponent = ot, B.StrictMode = S, B.Suspense = K, B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bt, B.act = mi, B.cloneElement = to, B.createContext = eu, B.createElement = lu, B.createFactory = no, B.createRef = kn, B.forwardRef = di, B.isValidElement = pn, B.lazy = fi, B.memo = ae, B.startTransition = Wo, B.unstable_act = mi, B.useCallback = rr, B.useContext = Xe, B.useDebugValue = Ke, B.useDeferredValue = Ga, B.useEffect = Rn, B.useId = tu, B.useImperativeHandle = Wa, B.useInsertionEffect = en, B.useLayoutEffect = un, B.useMemo = Qa, B.useReducer = dt, B.useRef = st, B.useState = Qe, B.useSyncExternalStore = nu, B.useTransition = tt, B.version = M, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Zp, Zp.exports)), Zp.exports;
}
var ZR;
function Jp() {
  return ZR || (ZR = 1, process.env.NODE_ENV === "production" ? Ym.exports = Kb() : Ym.exports = Zb()), Ym.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var JR;
function Jb() {
  if (JR) return Xp;
  JR = 1;
  var $ = Jp(), B = Symbol.for("react.element"), M = Symbol.for("react.fragment"), Je = Object.prototype.hasOwnProperty, Fe = $.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Ie = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(St, oe, fe) {
    var se, K = {}, ye = null, ie = null;
    fe !== void 0 && (ye = "" + fe), oe.key !== void 0 && (ye = "" + oe.key), oe.ref !== void 0 && (ie = oe.ref);
    for (se in oe) Je.call(oe, se) && !Ie.hasOwnProperty(se) && (K[se] = oe[se]);
    if (St && St.defaultProps) for (se in oe = St.defaultProps, oe) K[se] === void 0 && (K[se] = oe[se]);
    return { $$typeof: B, type: St, key: ye, ref: ie, props: K, _owner: Fe.current };
  }
  return Xp.Fragment = M, Xp.jsx = S, Xp.jsxs = S, Xp;
}
var Kp = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var eT;
function eD() {
  return eT || (eT = 1, process.env.NODE_ENV !== "production" && function() {
    var $ = Jp(), B = Symbol.for("react.element"), M = Symbol.for("react.portal"), Je = Symbol.for("react.fragment"), Fe = Symbol.for("react.strict_mode"), Ie = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), St = Symbol.for("react.context"), oe = Symbol.for("react.forward_ref"), fe = Symbol.for("react.suspense"), se = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), ye = Symbol.for("react.lazy"), ie = Symbol.for("react.offscreen"), Be = Symbol.iterator, ht = "@@iterator";
    function lt(R) {
      if (R === null || typeof R != "object")
        return null;
      var I = Be && R[Be] || R[ht];
      return typeof I == "function" ? I : null;
    }
    var cn = $.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function vt(R) {
      {
        for (var I = arguments.length, ae = new Array(I > 1 ? I - 1 : 0), me = 1; me < I; me++)
          ae[me - 1] = arguments[me];
        Ge("error", R, ae);
      }
    }
    function Ge(R, I, ae) {
      {
        var me = cn.ReactDebugCurrentFrame, Xe = me.getStackAddendum();
        Xe !== "" && (I += "%s", ae = ae.concat([Xe]));
        var Qe = ae.map(function(dt) {
          return String(dt);
        });
        Qe.unshift("Warning: " + I), Function.prototype.apply.call(console[R], console, Qe);
      }
    }
    var mt = !1, be = !1, ft = !1, He = !1, rn = !1, jt;
    jt = Symbol.for("react.module.reference");
    function Kt(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === Je || R === Ie || rn || R === Fe || R === fe || R === se || He || R === ie || mt || be || ft || typeof R == "object" && R !== null && (R.$$typeof === ye || R.$$typeof === K || R.$$typeof === S || R.$$typeof === St || R.$$typeof === oe || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === jt || R.getModuleId !== void 0));
    }
    function an(R, I, ae) {
      var me = R.displayName;
      if (me)
        return me;
      var Xe = I.displayName || I.name || "";
      return Xe !== "" ? ae + "(" + Xe + ")" : ae;
    }
    function _t(R) {
      return R.displayName || "Context";
    }
    function Oe(R) {
      if (R == null)
        return null;
      if (typeof R.tag == "number" && vt("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof R == "function")
        return R.displayName || R.name || null;
      if (typeof R == "string")
        return R;
      switch (R) {
        case Je:
          return "Fragment";
        case M:
          return "Portal";
        case Ie:
          return "Profiler";
        case Fe:
          return "StrictMode";
        case fe:
          return "Suspense";
        case se:
          return "SuspenseList";
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case St:
            var I = R;
            return _t(I) + ".Consumer";
          case S:
            var ae = R;
            return _t(ae._context) + ".Provider";
          case oe:
            return an(R, R.render, "ForwardRef");
          case K:
            var me = R.displayName || null;
            return me !== null ? me : Oe(R.type) || "Memo";
          case ye: {
            var Xe = R, Qe = Xe._payload, dt = Xe._init;
            try {
              return Oe(dt(Qe));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var At = Object.assign, bt = 0, kt, Re, J, Te, ne, b, P;
    function Pe() {
    }
    Pe.__reactDisabledLog = !0;
    function Ae() {
      {
        if (bt === 0) {
          kt = console.log, Re = console.info, J = console.warn, Te = console.error, ne = console.group, b = console.groupCollapsed, P = console.groupEnd;
          var R = {
            configurable: !0,
            enumerable: !0,
            value: Pe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: R,
            log: R,
            warn: R,
            error: R,
            group: R,
            groupCollapsed: R,
            groupEnd: R
          });
        }
        bt++;
      }
    }
    function ut() {
      {
        if (bt--, bt === 0) {
          var R = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: At({}, R, {
              value: kt
            }),
            info: At({}, R, {
              value: Re
            }),
            warn: At({}, R, {
              value: J
            }),
            error: At({}, R, {
              value: Te
            }),
            group: At({}, R, {
              value: ne
            }),
            groupCollapsed: At({}, R, {
              value: b
            }),
            groupEnd: At({}, R, {
              value: P
            })
          });
        }
        bt < 0 && vt("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var nt = cn.ReactCurrentDispatcher, et;
    function rt(R, I, ae) {
      {
        if (et === void 0)
          try {
            throw Error();
          } catch (Xe) {
            var me = Xe.stack.trim().match(/\n( *(at )?)/);
            et = me && me[1] || "";
          }
        return `
` + et + R;
      }
    }
    var ot = !1, Vt;
    {
      var kn = typeof WeakMap == "function" ? WeakMap : Map;
      Vt = new kn();
    }
    function wr(R, I) {
      if (!R || ot)
        return "";
      {
        var ae = Vt.get(R);
        if (ae !== void 0)
          return ae;
      }
      var me;
      ot = !0;
      var Xe = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Qe;
      Qe = nt.current, nt.current = null, Ae();
      try {
        if (I) {
          var dt = function() {
            throw Error();
          };
          if (Object.defineProperty(dt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(dt, []);
            } catch (Ke) {
              me = Ke;
            }
            Reflect.construct(R, [], dt);
          } else {
            try {
              dt.call();
            } catch (Ke) {
              me = Ke;
            }
            R.call(dt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ke) {
            me = Ke;
          }
          R();
        }
      } catch (Ke) {
        if (Ke && me && typeof Ke.stack == "string") {
          for (var st = Ke.stack.split(`
`), Rn = me.stack.split(`
`), en = st.length - 1, un = Rn.length - 1; en >= 1 && un >= 0 && st[en] !== Rn[un]; )
            un--;
          for (; en >= 1 && un >= 0; en--, un--)
            if (st[en] !== Rn[un]) {
              if (en !== 1 || un !== 1)
                do
                  if (en--, un--, un < 0 || st[en] !== Rn[un]) {
                    var rr = `
` + st[en].replace(" at new ", " at ");
                    return R.displayName && rr.includes("<anonymous>") && (rr = rr.replace("<anonymous>", R.displayName)), typeof R == "function" && Vt.set(R, rr), rr;
                  }
                while (en >= 1 && un >= 0);
              break;
            }
        }
      } finally {
        ot = !1, nt.current = Qe, ut(), Error.prepareStackTrace = Xe;
      }
      var Qa = R ? R.displayName || R.name : "", Wa = Qa ? rt(Qa) : "";
      return typeof R == "function" && Vt.set(R, Wa), Wa;
    }
    function En(R, I, ae) {
      return wr(R, !1);
    }
    function tr(R) {
      var I = R.prototype;
      return !!(I && I.isReactComponent);
    }
    function Pn(R, I, ae) {
      if (R == null)
        return "";
      if (typeof R == "function")
        return wr(R, tr(R));
      if (typeof R == "string")
        return rt(R);
      switch (R) {
        case fe:
          return rt("Suspense");
        case se:
          return rt("SuspenseList");
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case oe:
            return En(R.render);
          case K:
            return Pn(R.type, I, ae);
          case ye: {
            var me = R, Xe = me._payload, Qe = me._init;
            try {
              return Pn(Qe(Xe), I, ae);
            } catch {
            }
          }
        }
      return "";
    }
    var Vn = Object.prototype.hasOwnProperty, $r = {}, oi = cn.ReactDebugCurrentFrame;
    function ua(R) {
      if (R) {
        var I = R._owner, ae = Pn(R.type, R._source, I ? I.type : null);
        oi.setExtraStackFrame(ae);
      } else
        oi.setExtraStackFrame(null);
    }
    function Gn(R, I, ae, me, Xe) {
      {
        var Qe = Function.call.bind(Vn);
        for (var dt in R)
          if (Qe(R, dt)) {
            var st = void 0;
            try {
              if (typeof R[dt] != "function") {
                var Rn = Error((me || "React class") + ": " + ae + " type `" + dt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof R[dt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Rn.name = "Invariant Violation", Rn;
              }
              st = R[dt](I, dt, me, ae, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (en) {
              st = en;
            }
            st && !(st instanceof Error) && (ua(Xe), vt("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", me || "React class", ae, dt, typeof st), ua(null)), st instanceof Error && !(st.message in $r) && ($r[st.message] = !0, ua(Xe), vt("Failed %s type: %s", ae, st.message), ua(null));
          }
      }
    }
    var Cn = Array.isArray;
    function Bn(R) {
      return Cn(R);
    }
    function yr(R) {
      {
        var I = typeof Symbol == "function" && Symbol.toStringTag, ae = I && R[Symbol.toStringTag] || R.constructor.name || "Object";
        return ae;
      }
    }
    function $a(R) {
      try {
        return On(R), !1;
      } catch {
        return !0;
      }
    }
    function On(R) {
      return "" + R;
    }
    function gr(R) {
      if ($a(R))
        return vt("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", yr(R)), On(R);
    }
    var oa = cn.ReactCurrentOwner, Ia = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, si, ee;
    function we(R) {
      if (Vn.call(R, "ref")) {
        var I = Object.getOwnPropertyDescriptor(R, "ref").get;
        if (I && I.isReactWarning)
          return !1;
      }
      return R.ref !== void 0;
    }
    function at(R) {
      if (Vn.call(R, "key")) {
        var I = Object.getOwnPropertyDescriptor(R, "key").get;
        if (I && I.isReactWarning)
          return !1;
      }
      return R.key !== void 0;
    }
    function Ft(R, I) {
      typeof R.ref == "string" && oa.current;
    }
    function Zt(R, I) {
      {
        var ae = function() {
          si || (si = !0, vt("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
        };
        ae.isReactWarning = !0, Object.defineProperty(R, "key", {
          get: ae,
          configurable: !0
        });
      }
    }
    function pn(R, I) {
      {
        var ae = function() {
          ee || (ee = !0, vt("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
        };
        ae.isReactWarning = !0, Object.defineProperty(R, "ref", {
          get: ae,
          configurable: !0
        });
      }
    }
    var ln = function(R, I, ae, me, Xe, Qe, dt) {
      var st = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: B,
        // Built-in properties that belong on the element
        type: R,
        key: I,
        ref: ae,
        props: dt,
        // Record the component responsible for creating this element.
        _owner: Qe
      };
      return st._store = {}, Object.defineProperty(st._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(st, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: me
      }), Object.defineProperty(st, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Xe
      }), Object.freeze && (Object.freeze(st.props), Object.freeze(st)), st;
    };
    function qn(R, I, ae, me, Xe) {
      {
        var Qe, dt = {}, st = null, Rn = null;
        ae !== void 0 && (gr(ae), st = "" + ae), at(I) && (gr(I.key), st = "" + I.key), we(I) && (Rn = I.ref, Ft(I, Xe));
        for (Qe in I)
          Vn.call(I, Qe) && !Ia.hasOwnProperty(Qe) && (dt[Qe] = I[Qe]);
        if (R && R.defaultProps) {
          var en = R.defaultProps;
          for (Qe in en)
            dt[Qe] === void 0 && (dt[Qe] = en[Qe]);
        }
        if (st || Rn) {
          var un = typeof R == "function" ? R.displayName || R.name || "Unknown" : R;
          st && Zt(dt, un), Rn && pn(dt, un);
        }
        return ln(R, st, Rn, Xe, me, oa.current, dt);
      }
    }
    var Jt = cn.ReactCurrentOwner, Bt = cn.ReactDebugCurrentFrame;
    function $t(R) {
      if (R) {
        var I = R._owner, ae = Pn(R.type, R._source, I ? I.type : null);
        Bt.setExtraStackFrame(ae);
      } else
        Bt.setExtraStackFrame(null);
    }
    var sa;
    sa = !1;
    function Sr(R) {
      return typeof R == "object" && R !== null && R.$$typeof === B;
    }
    function Ra() {
      {
        if (Jt.current) {
          var R = Oe(Jt.current.type);
          if (R)
            return `

Check the render method of \`` + R + "`.";
        }
        return "";
      }
    }
    function ji(R) {
      return "";
    }
    var Zl = {};
    function Jl(R) {
      {
        var I = Ra();
        if (!I) {
          var ae = typeof R == "string" ? R : R.displayName || R.name;
          ae && (I = `

Check the top-level render call using <` + ae + ">.");
        }
        return I;
      }
    }
    function dl(R, I) {
      {
        if (!R._store || R._store.validated || R.key != null)
          return;
        R._store.validated = !0;
        var ae = Jl(I);
        if (Zl[ae])
          return;
        Zl[ae] = !0;
        var me = "";
        R && R._owner && R._owner !== Jt.current && (me = " It was passed a child from " + Oe(R._owner.type) + "."), $t(R), vt('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ae, me), $t(null);
      }
    }
    function pl(R, I) {
      {
        if (typeof R != "object")
          return;
        if (Bn(R))
          for (var ae = 0; ae < R.length; ae++) {
            var me = R[ae];
            Sr(me) && dl(me, I);
          }
        else if (Sr(R))
          R._store && (R._store.validated = !0);
        else if (R) {
          var Xe = lt(R);
          if (typeof Xe == "function" && Xe !== R.entries)
            for (var Qe = Xe.call(R), dt; !(dt = Qe.next()).done; )
              Sr(dt.value) && dl(dt.value, I);
        }
      }
    }
    function eu(R) {
      {
        var I = R.type;
        if (I == null || typeof I == "string")
          return;
        var ae;
        if (typeof I == "function")
          ae = I.propTypes;
        else if (typeof I == "object" && (I.$$typeof === oe || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        I.$$typeof === K))
          ae = I.propTypes;
        else
          return;
        if (ae) {
          var me = Oe(I);
          Gn(ae, R.props, "prop", me, R);
        } else if (I.PropTypes !== void 0 && !sa) {
          sa = !0;
          var Xe = Oe(I);
          vt("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Xe || "Unknown");
        }
        typeof I.getDefaultProps == "function" && !I.getDefaultProps.isReactClassApproved && vt("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function xr(R) {
      {
        for (var I = Object.keys(R.props), ae = 0; ae < I.length; ae++) {
          var me = I[ae];
          if (me !== "children" && me !== "key") {
            $t(R), vt("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", me), $t(null);
            break;
          }
        }
        R.ref !== null && ($t(R), vt("Invalid attribute `ref` supplied to `React.Fragment`."), $t(null));
      }
    }
    var _r = {};
    function nr(R, I, ae, me, Xe, Qe) {
      {
        var dt = Kt(R);
        if (!dt) {
          var st = "";
          (R === void 0 || typeof R == "object" && R !== null && Object.keys(R).length === 0) && (st += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Rn = ji();
          Rn ? st += Rn : st += Ra();
          var en;
          R === null ? en = "null" : Bn(R) ? en = "array" : R !== void 0 && R.$$typeof === B ? (en = "<" + (Oe(R.type) || "Unknown") + " />", st = " Did you accidentally export a JSX literal instead of a component?") : en = typeof R, vt("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", en, st);
        }
        var un = qn(R, I, ae, Xe, Qe);
        if (un == null)
          return un;
        if (dt) {
          var rr = I.children;
          if (rr !== void 0)
            if (me)
              if (Bn(rr)) {
                for (var Qa = 0; Qa < rr.length; Qa++)
                  pl(rr[Qa], R);
                Object.freeze && Object.freeze(rr);
              } else
                vt("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              pl(rr, R);
        }
        if (Vn.call(I, "key")) {
          var Wa = Oe(R), Ke = Object.keys(I).filter(function(tu) {
            return tu !== "key";
          }), tt = Ke.length > 0 ? "{key: someKey, " + Ke.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!_r[Wa + tt]) {
            var Ga = Ke.length > 0 ? "{" + Ke.join(": ..., ") + ": ...}" : "{}";
            vt(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, tt, Wa, Ga, Wa), _r[Wa + tt] = !0;
          }
        }
        return R === Je ? xr(un) : eu(un), un;
      }
    }
    function ci(R, I, ae) {
      return nr(R, I, ae, !0);
    }
    function Ya(R, I, ae) {
      return nr(R, I, ae, !1);
    }
    var fi = Ya, di = ci;
    Kp.Fragment = Je, Kp.jsx = fi, Kp.jsxs = di;
  }()), Kp;
}
process.env.NODE_ENV === "production" ? dE.exports = Jb() : dE.exports = eD();
var Fi = dE.exports, pE = { exports: {} }, Va = {}, Qm = { exports: {} }, cE = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tT;
function tD() {
  return tT || (tT = 1, function($) {
    function B(J, Te) {
      var ne = J.length;
      J.push(Te);
      e: for (; 0 < ne; ) {
        var b = ne - 1 >>> 1, P = J[b];
        if (0 < Fe(P, Te)) J[b] = Te, J[ne] = P, ne = b;
        else break e;
      }
    }
    function M(J) {
      return J.length === 0 ? null : J[0];
    }
    function Je(J) {
      if (J.length === 0) return null;
      var Te = J[0], ne = J.pop();
      if (ne !== Te) {
        J[0] = ne;
        e: for (var b = 0, P = J.length, Pe = P >>> 1; b < Pe; ) {
          var Ae = 2 * (b + 1) - 1, ut = J[Ae], nt = Ae + 1, et = J[nt];
          if (0 > Fe(ut, ne)) nt < P && 0 > Fe(et, ut) ? (J[b] = et, J[nt] = ne, b = nt) : (J[b] = ut, J[Ae] = ne, b = Ae);
          else if (nt < P && 0 > Fe(et, ne)) J[b] = et, J[nt] = ne, b = nt;
          else break e;
        }
      }
      return Te;
    }
    function Fe(J, Te) {
      var ne = J.sortIndex - Te.sortIndex;
      return ne !== 0 ? ne : J.id - Te.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var Ie = performance;
      $.unstable_now = function() {
        return Ie.now();
      };
    } else {
      var S = Date, St = S.now();
      $.unstable_now = function() {
        return S.now() - St;
      };
    }
    var oe = [], fe = [], se = 1, K = null, ye = 3, ie = !1, Be = !1, ht = !1, lt = typeof setTimeout == "function" ? setTimeout : null, cn = typeof clearTimeout == "function" ? clearTimeout : null, vt = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Ge(J) {
      for (var Te = M(fe); Te !== null; ) {
        if (Te.callback === null) Je(fe);
        else if (Te.startTime <= J) Je(fe), Te.sortIndex = Te.expirationTime, B(oe, Te);
        else break;
        Te = M(fe);
      }
    }
    function mt(J) {
      if (ht = !1, Ge(J), !Be) if (M(oe) !== null) Be = !0, kt(be);
      else {
        var Te = M(fe);
        Te !== null && Re(mt, Te.startTime - J);
      }
    }
    function be(J, Te) {
      Be = !1, ht && (ht = !1, cn(rn), rn = -1), ie = !0;
      var ne = ye;
      try {
        for (Ge(Te), K = M(oe); K !== null && (!(K.expirationTime > Te) || J && !an()); ) {
          var b = K.callback;
          if (typeof b == "function") {
            K.callback = null, ye = K.priorityLevel;
            var P = b(K.expirationTime <= Te);
            Te = $.unstable_now(), typeof P == "function" ? K.callback = P : K === M(oe) && Je(oe), Ge(Te);
          } else Je(oe);
          K = M(oe);
        }
        if (K !== null) var Pe = !0;
        else {
          var Ae = M(fe);
          Ae !== null && Re(mt, Ae.startTime - Te), Pe = !1;
        }
        return Pe;
      } finally {
        K = null, ye = ne, ie = !1;
      }
    }
    var ft = !1, He = null, rn = -1, jt = 5, Kt = -1;
    function an() {
      return !($.unstable_now() - Kt < jt);
    }
    function _t() {
      if (He !== null) {
        var J = $.unstable_now();
        Kt = J;
        var Te = !0;
        try {
          Te = He(!0, J);
        } finally {
          Te ? Oe() : (ft = !1, He = null);
        }
      } else ft = !1;
    }
    var Oe;
    if (typeof vt == "function") Oe = function() {
      vt(_t);
    };
    else if (typeof MessageChannel < "u") {
      var At = new MessageChannel(), bt = At.port2;
      At.port1.onmessage = _t, Oe = function() {
        bt.postMessage(null);
      };
    } else Oe = function() {
      lt(_t, 0);
    };
    function kt(J) {
      He = J, ft || (ft = !0, Oe());
    }
    function Re(J, Te) {
      rn = lt(function() {
        J($.unstable_now());
      }, Te);
    }
    $.unstable_IdlePriority = 5, $.unstable_ImmediatePriority = 1, $.unstable_LowPriority = 4, $.unstable_NormalPriority = 3, $.unstable_Profiling = null, $.unstable_UserBlockingPriority = 2, $.unstable_cancelCallback = function(J) {
      J.callback = null;
    }, $.unstable_continueExecution = function() {
      Be || ie || (Be = !0, kt(be));
    }, $.unstable_forceFrameRate = function(J) {
      0 > J || 125 < J ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : jt = 0 < J ? Math.floor(1e3 / J) : 5;
    }, $.unstable_getCurrentPriorityLevel = function() {
      return ye;
    }, $.unstable_getFirstCallbackNode = function() {
      return M(oe);
    }, $.unstable_next = function(J) {
      switch (ye) {
        case 1:
        case 2:
        case 3:
          var Te = 3;
          break;
        default:
          Te = ye;
      }
      var ne = ye;
      ye = Te;
      try {
        return J();
      } finally {
        ye = ne;
      }
    }, $.unstable_pauseExecution = function() {
    }, $.unstable_requestPaint = function() {
    }, $.unstable_runWithPriority = function(J, Te) {
      switch (J) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          J = 3;
      }
      var ne = ye;
      ye = J;
      try {
        return Te();
      } finally {
        ye = ne;
      }
    }, $.unstable_scheduleCallback = function(J, Te, ne) {
      var b = $.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? b + ne : b) : ne = b, J) {
        case 1:
          var P = -1;
          break;
        case 2:
          P = 250;
          break;
        case 5:
          P = 1073741823;
          break;
        case 4:
          P = 1e4;
          break;
        default:
          P = 5e3;
      }
      return P = ne + P, J = { id: se++, callback: Te, priorityLevel: J, startTime: ne, expirationTime: P, sortIndex: -1 }, ne > b ? (J.sortIndex = ne, B(fe, J), M(oe) === null && J === M(fe) && (ht ? (cn(rn), rn = -1) : ht = !0, Re(mt, ne - b))) : (J.sortIndex = P, B(oe, J), Be || ie || (Be = !0, kt(be))), J;
    }, $.unstable_shouldYield = an, $.unstable_wrapCallback = function(J) {
      var Te = ye;
      return function() {
        var ne = ye;
        ye = Te;
        try {
          return J.apply(this, arguments);
        } finally {
          ye = ne;
        }
      };
    };
  }(cE)), cE;
}
var fE = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nT;
function nD() {
  return nT || (nT = 1, function($) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var B = !1, M = 5;
      function Je(ee, we) {
        var at = ee.length;
        ee.push(we), S(ee, we, at);
      }
      function Fe(ee) {
        return ee.length === 0 ? null : ee[0];
      }
      function Ie(ee) {
        if (ee.length === 0)
          return null;
        var we = ee[0], at = ee.pop();
        return at !== we && (ee[0] = at, St(ee, at, 0)), we;
      }
      function S(ee, we, at) {
        for (var Ft = at; Ft > 0; ) {
          var Zt = Ft - 1 >>> 1, pn = ee[Zt];
          if (oe(pn, we) > 0)
            ee[Zt] = we, ee[Ft] = pn, Ft = Zt;
          else
            return;
        }
      }
      function St(ee, we, at) {
        for (var Ft = at, Zt = ee.length, pn = Zt >>> 1; Ft < pn; ) {
          var ln = (Ft + 1) * 2 - 1, qn = ee[ln], Jt = ln + 1, Bt = ee[Jt];
          if (oe(qn, we) < 0)
            Jt < Zt && oe(Bt, qn) < 0 ? (ee[Ft] = Bt, ee[Jt] = we, Ft = Jt) : (ee[Ft] = qn, ee[ln] = we, Ft = ln);
          else if (Jt < Zt && oe(Bt, we) < 0)
            ee[Ft] = Bt, ee[Jt] = we, Ft = Jt;
          else
            return;
        }
      }
      function oe(ee, we) {
        var at = ee.sortIndex - we.sortIndex;
        return at !== 0 ? at : ee.id - we.id;
      }
      var fe = 1, se = 2, K = 3, ye = 4, ie = 5;
      function Be(ee, we) {
      }
      var ht = typeof performance == "object" && typeof performance.now == "function";
      if (ht) {
        var lt = performance;
        $.unstable_now = function() {
          return lt.now();
        };
      } else {
        var cn = Date, vt = cn.now();
        $.unstable_now = function() {
          return cn.now() - vt;
        };
      }
      var Ge = 1073741823, mt = -1, be = 250, ft = 5e3, He = 1e4, rn = Ge, jt = [], Kt = [], an = 1, _t = null, Oe = K, At = !1, bt = !1, kt = !1, Re = typeof setTimeout == "function" ? setTimeout : null, J = typeof clearTimeout == "function" ? clearTimeout : null, Te = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ne(ee) {
        for (var we = Fe(Kt); we !== null; ) {
          if (we.callback === null)
            Ie(Kt);
          else if (we.startTime <= ee)
            Ie(Kt), we.sortIndex = we.expirationTime, Je(jt, we);
          else
            return;
          we = Fe(Kt);
        }
      }
      function b(ee) {
        if (kt = !1, ne(ee), !bt)
          if (Fe(jt) !== null)
            bt = !0, On(P);
          else {
            var we = Fe(Kt);
            we !== null && gr(b, we.startTime - ee);
          }
      }
      function P(ee, we) {
        bt = !1, kt && (kt = !1, oa()), At = !0;
        var at = Oe;
        try {
          var Ft;
          if (!B) return Pe(ee, we);
        } finally {
          _t = null, Oe = at, At = !1;
        }
      }
      function Pe(ee, we) {
        var at = we;
        for (ne(at), _t = Fe(jt); _t !== null && !(_t.expirationTime > at && (!ee || oi())); ) {
          var Ft = _t.callback;
          if (typeof Ft == "function") {
            _t.callback = null, Oe = _t.priorityLevel;
            var Zt = _t.expirationTime <= at, pn = Ft(Zt);
            at = $.unstable_now(), typeof pn == "function" ? _t.callback = pn : _t === Fe(jt) && Ie(jt), ne(at);
          } else
            Ie(jt);
          _t = Fe(jt);
        }
        if (_t !== null)
          return !0;
        var ln = Fe(Kt);
        return ln !== null && gr(b, ln.startTime - at), !1;
      }
      function Ae(ee, we) {
        switch (ee) {
          case fe:
          case se:
          case K:
          case ye:
          case ie:
            break;
          default:
            ee = K;
        }
        var at = Oe;
        Oe = ee;
        try {
          return we();
        } finally {
          Oe = at;
        }
      }
      function ut(ee) {
        var we;
        switch (Oe) {
          case fe:
          case se:
          case K:
            we = K;
            break;
          default:
            we = Oe;
            break;
        }
        var at = Oe;
        Oe = we;
        try {
          return ee();
        } finally {
          Oe = at;
        }
      }
      function nt(ee) {
        var we = Oe;
        return function() {
          var at = Oe;
          Oe = we;
          try {
            return ee.apply(this, arguments);
          } finally {
            Oe = at;
          }
        };
      }
      function et(ee, we, at) {
        var Ft = $.unstable_now(), Zt;
        if (typeof at == "object" && at !== null) {
          var pn = at.delay;
          typeof pn == "number" && pn > 0 ? Zt = Ft + pn : Zt = Ft;
        } else
          Zt = Ft;
        var ln;
        switch (ee) {
          case fe:
            ln = mt;
            break;
          case se:
            ln = be;
            break;
          case ie:
            ln = rn;
            break;
          case ye:
            ln = He;
            break;
          case K:
          default:
            ln = ft;
            break;
        }
        var qn = Zt + ln, Jt = {
          id: an++,
          callback: we,
          priorityLevel: ee,
          startTime: Zt,
          expirationTime: qn,
          sortIndex: -1
        };
        return Zt > Ft ? (Jt.sortIndex = Zt, Je(Kt, Jt), Fe(jt) === null && Jt === Fe(Kt) && (kt ? oa() : kt = !0, gr(b, Zt - Ft))) : (Jt.sortIndex = qn, Je(jt, Jt), !bt && !At && (bt = !0, On(P))), Jt;
      }
      function rt() {
      }
      function ot() {
        !bt && !At && (bt = !0, On(P));
      }
      function Vt() {
        return Fe(jt);
      }
      function kn(ee) {
        ee.callback = null;
      }
      function wr() {
        return Oe;
      }
      var En = !1, tr = null, Pn = -1, Vn = M, $r = -1;
      function oi() {
        var ee = $.unstable_now() - $r;
        return !(ee < Vn);
      }
      function ua() {
      }
      function Gn(ee) {
        if (ee < 0 || ee > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        ee > 0 ? Vn = Math.floor(1e3 / ee) : Vn = M;
      }
      var Cn = function() {
        if (tr !== null) {
          var ee = $.unstable_now();
          $r = ee;
          var we = !0, at = !0;
          try {
            at = tr(we, ee);
          } finally {
            at ? Bn() : (En = !1, tr = null);
          }
        } else
          En = !1;
      }, Bn;
      if (typeof Te == "function")
        Bn = function() {
          Te(Cn);
        };
      else if (typeof MessageChannel < "u") {
        var yr = new MessageChannel(), $a = yr.port2;
        yr.port1.onmessage = Cn, Bn = function() {
          $a.postMessage(null);
        };
      } else
        Bn = function() {
          Re(Cn, 0);
        };
      function On(ee) {
        tr = ee, En || (En = !0, Bn());
      }
      function gr(ee, we) {
        Pn = Re(function() {
          ee($.unstable_now());
        }, we);
      }
      function oa() {
        J(Pn), Pn = -1;
      }
      var Ia = ua, si = null;
      $.unstable_IdlePriority = ie, $.unstable_ImmediatePriority = fe, $.unstable_LowPriority = ye, $.unstable_NormalPriority = K, $.unstable_Profiling = si, $.unstable_UserBlockingPriority = se, $.unstable_cancelCallback = kn, $.unstable_continueExecution = ot, $.unstable_forceFrameRate = Gn, $.unstable_getCurrentPriorityLevel = wr, $.unstable_getFirstCallbackNode = Vt, $.unstable_next = ut, $.unstable_pauseExecution = rt, $.unstable_requestPaint = Ia, $.unstable_runWithPriority = Ae, $.unstable_scheduleCallback = et, $.unstable_shouldYield = oi, $.unstable_wrapCallback = nt, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(fE)), fE;
}
var rT;
function sT() {
  return rT || (rT = 1, process.env.NODE_ENV === "production" ? Qm.exports = tD() : Qm.exports = nD()), Qm.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aT;
function rD() {
  if (aT) return Va;
  aT = 1;
  var $ = Jp(), B = sT();
  function M(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var Je = /* @__PURE__ */ new Set(), Fe = {};
  function Ie(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (Fe[n] = r, n = 0; n < r.length; n++) Je.add(r[n]);
  }
  var St = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), oe = Object.prototype.hasOwnProperty, fe = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, se = {}, K = {};
  function ye(n) {
    return oe.call(K, n) ? !0 : oe.call(se, n) ? !1 : fe.test(n) ? K[n] = !0 : (se[n] = !0, !1);
  }
  function ie(n, r, l, o) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function Be(n, r, l, o) {
    if (r === null || typeof r > "u" || ie(n, r, l, o)) return !0;
    if (o) return !1;
    if (l !== null) switch (l.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function ht(n, r, l, o, c, d, m) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = m;
  }
  var lt = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    lt[n] = new ht(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    lt[r] = new ht(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    lt[n] = new ht(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    lt[n] = new ht(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    lt[n] = new ht(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    lt[n] = new ht(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    lt[n] = new ht(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    lt[n] = new ht(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    lt[n] = new ht(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var cn = /[\-:]([a-z])/g;
  function vt(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      cn,
      vt
    );
    lt[r] = new ht(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(cn, vt);
    lt[r] = new ht(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(cn, vt);
    lt[r] = new ht(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    lt[n] = new ht(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), lt.xlinkHref = new ht("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    lt[n] = new ht(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Ge(n, r, l, o) {
    var c = lt.hasOwnProperty(r) ? lt[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (Be(r, l, c, o) && (l = null), o || c === null ? ye(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var mt = $.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, be = Symbol.for("react.element"), ft = Symbol.for("react.portal"), He = Symbol.for("react.fragment"), rn = Symbol.for("react.strict_mode"), jt = Symbol.for("react.profiler"), Kt = Symbol.for("react.provider"), an = Symbol.for("react.context"), _t = Symbol.for("react.forward_ref"), Oe = Symbol.for("react.suspense"), At = Symbol.for("react.suspense_list"), bt = Symbol.for("react.memo"), kt = Symbol.for("react.lazy"), Re = Symbol.for("react.offscreen"), J = Symbol.iterator;
  function Te(n) {
    return n === null || typeof n != "object" ? null : (n = J && n[J] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var ne = Object.assign, b;
  function P(n) {
    if (b === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      b = r && r[1] || "";
    }
    return `
` + b + n;
  }
  var Pe = !1;
  function Ae(n, r) {
    if (!n || Pe) return "";
    Pe = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (U) {
          var o = U;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (U) {
          o = U;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (U) {
          o = U;
        }
        n();
      }
    } catch (U) {
      if (U && o && typeof U.stack == "string") {
        for (var c = U.stack.split(`
`), d = o.stack.split(`
`), m = c.length - 1, E = d.length - 1; 1 <= m && 0 <= E && c[m] !== d[E]; ) E--;
        for (; 1 <= m && 0 <= E; m--, E--) if (c[m] !== d[E]) {
          if (m !== 1 || E !== 1)
            do
              if (m--, E--, 0 > E || c[m] !== d[E]) {
                var T = `
` + c[m].replace(" at new ", " at ");
                return n.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", n.displayName)), T;
              }
            while (1 <= m && 0 <= E);
          break;
        }
      }
    } finally {
      Pe = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? P(n) : "";
  }
  function ut(n) {
    switch (n.tag) {
      case 5:
        return P(n.type);
      case 16:
        return P("Lazy");
      case 13:
        return P("Suspense");
      case 19:
        return P("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Ae(n.type, !1), n;
      case 11:
        return n = Ae(n.type.render, !1), n;
      case 1:
        return n = Ae(n.type, !0), n;
      default:
        return "";
    }
  }
  function nt(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case He:
        return "Fragment";
      case ft:
        return "Portal";
      case jt:
        return "Profiler";
      case rn:
        return "StrictMode";
      case Oe:
        return "Suspense";
      case At:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case an:
        return (n.displayName || "Context") + ".Consumer";
      case Kt:
        return (n._context.displayName || "Context") + ".Provider";
      case _t:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case bt:
        return r = n.displayName || null, r !== null ? r : nt(n.type) || "Memo";
      case kt:
        r = n._payload, n = n._init;
        try {
          return nt(n(r));
        } catch {
        }
    }
    return null;
  }
  function et(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return nt(r);
      case 8:
        return r === rn ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function rt(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function ot(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Vt(n) {
    var r = ot(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(m) {
        o = "" + m, d.call(this, m);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(m) {
        o = "" + m;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function kn(n) {
    n._valueTracker || (n._valueTracker = Vt(n));
  }
  function wr(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = ot(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function En(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function tr(n, r) {
    var l = r.checked;
    return ne({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Pn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = rt(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Vn(n, r) {
    r = r.checked, r != null && Ge(n, "checked", r, !1);
  }
  function $r(n, r) {
    Vn(n, r);
    var l = rt(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? ua(n, r.type, l) : r.hasOwnProperty("defaultValue") && ua(n, r.type, rt(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function oi(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function ua(n, r, l) {
    (r !== "number" || En(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var Gn = Array.isArray;
  function Cn(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + rt(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Bn(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(M(91));
    return ne({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function yr(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(M(92));
        if (Gn(l)) {
          if (1 < l.length) throw Error(M(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: rt(l) };
  }
  function $a(n, r) {
    var l = rt(r.value), o = rt(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function On(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function gr(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function oa(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? gr(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Ia, si = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Ia = Ia || document.createElement("div"), Ia.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Ia.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function ee(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var we = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, at = ["Webkit", "ms", "Moz", "O"];
  Object.keys(we).forEach(function(n) {
    at.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), we[r] = we[n];
    });
  });
  function Ft(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || we.hasOwnProperty(n) && we[n] ? ("" + r).trim() : r + "px";
  }
  function Zt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = Ft(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var pn = ne({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function ln(n, r) {
    if (r) {
      if (pn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(M(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(M(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(M(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(M(62));
    }
  }
  function qn(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Jt = null;
  function Bt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var $t = null, sa = null, Sr = null;
  function Ra(n) {
    if (n = De(n)) {
      if (typeof $t != "function") throw Error(M(280));
      var r = n.stateNode;
      r && (r = hn(r), $t(n.stateNode, n.type, r));
    }
  }
  function ji(n) {
    sa ? Sr ? Sr.push(n) : Sr = [n] : sa = n;
  }
  function Zl() {
    if (sa) {
      var n = sa, r = Sr;
      if (Sr = sa = null, Ra(n), r) for (n = 0; n < r.length; n++) Ra(r[n]);
    }
  }
  function Jl(n, r) {
    return n(r);
  }
  function dl() {
  }
  var pl = !1;
  function eu(n, r, l) {
    if (pl) return n(r, l);
    pl = !0;
    try {
      return Jl(n, r, l);
    } finally {
      pl = !1, (sa !== null || Sr !== null) && (dl(), Zl());
    }
  }
  function xr(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var o = hn(l);
    if (o === null) return null;
    l = o[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (n = n.type, o = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !o;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(M(231, r, typeof l));
    return l;
  }
  var _r = !1;
  if (St) try {
    var nr = {};
    Object.defineProperty(nr, "passive", { get: function() {
      _r = !0;
    } }), window.addEventListener("test", nr, nr), window.removeEventListener("test", nr, nr);
  } catch {
    _r = !1;
  }
  function ci(n, r, l, o, c, d, m, E, T) {
    var U = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, U);
    } catch (W) {
      this.onError(W);
    }
  }
  var Ya = !1, fi = null, di = !1, R = null, I = { onError: function(n) {
    Ya = !0, fi = n;
  } };
  function ae(n, r, l, o, c, d, m, E, T) {
    Ya = !1, fi = null, ci.apply(I, arguments);
  }
  function me(n, r, l, o, c, d, m, E, T) {
    if (ae.apply(this, arguments), Ya) {
      if (Ya) {
        var U = fi;
        Ya = !1, fi = null;
      } else throw Error(M(198));
      di || (di = !0, R = U);
    }
  }
  function Xe(n) {
    var r = n, l = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function Qe(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function dt(n) {
    if (Xe(n) !== n) throw Error(M(188));
  }
  function st(n) {
    var r = n.alternate;
    if (!r) {
      if (r = Xe(n), r === null) throw Error(M(188));
      return r !== n ? null : n;
    }
    for (var l = n, o = r; ; ) {
      var c = l.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (o = c.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === l) return dt(c), n;
          if (d === o) return dt(c), r;
          d = d.sibling;
        }
        throw Error(M(188));
      }
      if (l.return !== o.return) l = c, o = d;
      else {
        for (var m = !1, E = c.child; E; ) {
          if (E === l) {
            m = !0, l = c, o = d;
            break;
          }
          if (E === o) {
            m = !0, o = c, l = d;
            break;
          }
          E = E.sibling;
        }
        if (!m) {
          for (E = d.child; E; ) {
            if (E === l) {
              m = !0, l = d, o = c;
              break;
            }
            if (E === o) {
              m = !0, o = d, l = c;
              break;
            }
            E = E.sibling;
          }
          if (!m) throw Error(M(189));
        }
      }
      if (l.alternate !== o) throw Error(M(190));
    }
    if (l.tag !== 3) throw Error(M(188));
    return l.stateNode.current === l ? n : r;
  }
  function Rn(n) {
    return n = st(n), n !== null ? en(n) : null;
  }
  function en(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = en(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var un = B.unstable_scheduleCallback, rr = B.unstable_cancelCallback, Qa = B.unstable_shouldYield, Wa = B.unstable_requestPaint, Ke = B.unstable_now, tt = B.unstable_getCurrentPriorityLevel, Ga = B.unstable_ImmediatePriority, tu = B.unstable_UserBlockingPriority, nu = B.unstable_NormalPriority, vl = B.unstable_LowPriority, Qu = B.unstable_IdlePriority, hl = null, Ir = null;
  function Io(n) {
    if (Ir && typeof Ir.onCommitFiberRoot == "function") try {
      Ir.onCommitFiberRoot(hl, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var br = Math.clz32 ? Math.clz32 : Wu, ic = Math.log, lc = Math.LN2;
  function Wu(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (ic(n) / lc | 0) | 0;
  }
  var ml = 64, ca = 4194304;
  function qa(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function Xa(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, m = l & 268435455;
    if (m !== 0) {
      var E = m & ~c;
      E !== 0 ? o = qa(E) : (d &= m, d !== 0 && (o = qa(d)));
    } else m = l & ~c, m !== 0 ? o = qa(m) : d !== 0 && (o = qa(d));
    if (o === 0) return 0;
    if (r !== 0 && r !== o && !(r & c) && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0)) return r;
    if (o & 4 && (o |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= o; 0 < r; ) l = 31 - br(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function Gu(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ru(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var m = 31 - br(d), E = 1 << m, T = c[m];
      T === -1 ? (!(E & l) || E & o) && (c[m] = Gu(E, r)) : T <= r && (n.expiredLanes |= E), d &= ~E;
    }
  }
  function yl(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function qu() {
    var n = ml;
    return ml <<= 1, !(ml & 4194240) && (ml = 64), n;
  }
  function Xu(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function Hi(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - br(r), n[r] = l;
  }
  function Yf(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - br(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function Pi(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - br(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var Ot = 0;
  function Ku(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var wt, Yo, pi, Ye, Zu, ar = !1, vi = [], Dr = null, hi = null, on = null, It = /* @__PURE__ */ new Map(), gl = /* @__PURE__ */ new Map(), $n = [], kr = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Ta(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Dr = null;
        break;
      case "dragenter":
      case "dragleave":
        hi = null;
        break;
      case "mouseover":
      case "mouseout":
        on = null;
        break;
      case "pointerover":
      case "pointerout":
        It.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        gl.delete(r.pointerId);
    }
  }
  function au(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = De(r), r !== null && Yo(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Qo(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return Dr = au(Dr, n, r, l, o, c), !0;
      case "dragenter":
        return hi = au(hi, n, r, l, o, c), !0;
      case "mouseover":
        return on = au(on, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return It.set(d, au(It.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, gl.set(d, au(gl.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function Wo(n) {
    var r = pu(n.target);
    if (r !== null) {
      var l = Xe(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = Qe(l), r !== null) {
            n.blockedOn = r, Zu(n.priority, function() {
              pi(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function Sl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = to(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        Jt = o, l.target.dispatchEvent(o), Jt = null;
      } else return r = De(l), r !== null && Yo(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function iu(n, r, l) {
    Sl(n) && l.delete(r);
  }
  function Qf() {
    ar = !1, Dr !== null && Sl(Dr) && (Dr = null), hi !== null && Sl(hi) && (hi = null), on !== null && Sl(on) && (on = null), It.forEach(iu), gl.forEach(iu);
  }
  function wa(n, r) {
    n.blockedOn === r && (n.blockedOn = null, ar || (ar = !0, B.unstable_scheduleCallback(B.unstable_NormalPriority, Qf)));
  }
  function Ka(n) {
    function r(c) {
      return wa(c, n);
    }
    if (0 < vi.length) {
      wa(vi[0], n);
      for (var l = 1; l < vi.length; l++) {
        var o = vi[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (Dr !== null && wa(Dr, n), hi !== null && wa(hi, n), on !== null && wa(on, n), It.forEach(r), gl.forEach(r), l = 0; l < $n.length; l++) o = $n[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < $n.length && (l = $n[0], l.blockedOn === null); ) Wo(l), l.blockedOn === null && $n.shift();
  }
  var mi = mt.ReactCurrentBatchConfig, xa = !0;
  function Ju(n, r, l, o) {
    var c = Ot, d = mi.transition;
    mi.transition = null;
    try {
      Ot = 1, El(n, r, l, o);
    } finally {
      Ot = c, mi.transition = d;
    }
  }
  function eo(n, r, l, o) {
    var c = Ot, d = mi.transition;
    mi.transition = null;
    try {
      Ot = 4, El(n, r, l, o);
    } finally {
      Ot = c, mi.transition = d;
    }
  }
  function El(n, r, l, o) {
    if (xa) {
      var c = to(n, r, l, o);
      if (c === null) gc(n, r, o, lu, l), Ta(n, o);
      else if (Qo(c, n, r, l, o)) o.stopPropagation();
      else if (Ta(n, o), r & 4 && -1 < kr.indexOf(n)) {
        for (; c !== null; ) {
          var d = De(c);
          if (d !== null && wt(d), d = to(n, r, l, o), d === null && gc(n, r, o, lu, l), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else gc(n, r, o, null, l);
    }
  }
  var lu = null;
  function to(n, r, l, o) {
    if (lu = null, n = Bt(o), n = pu(n), n !== null) if (r = Xe(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = Qe(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return lu = n, null;
  }
  function no(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (tt()) {
          case Ga:
            return 1;
          case tu:
            return 4;
          case nu:
          case vl:
            return 16;
          case Qu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Za = null, h = null, C = null;
  function z() {
    if (C) return C;
    var n, r = h, l = r.length, o, c = "value" in Za ? Za.value : Za.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var m = l - n;
    for (o = 1; o <= m && r[l - o] === c[d - o]; o++) ;
    return C = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function F(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function Z() {
    return !0;
  }
  function Le() {
    return !1;
  }
  function re(n) {
    function r(l, o, c, d, m) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = m, this.currentTarget = null;
      for (var E in n) n.hasOwnProperty(E) && (l = n[E], this[E] = l ? l(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Z : Le, this.isPropagationStopped = Le, this;
    }
    return ne(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Z);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Z);
    }, persist: function() {
    }, isPersistent: Z }), r;
  }
  var ze = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, pt = re(ze), xt = ne({}, ze, { view: 0, detail: 0 }), tn = re(xt), Yt, it, Qt, vn = ne({}, xt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Kf, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Qt && (Qt && n.type === "mousemove" ? (Yt = n.screenX - Qt.screenX, it = n.screenY - Qt.screenY) : it = Yt = 0, Qt = n), Yt);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : it;
  } }), Cl = re(vn), Go = ne({}, vn, { dataTransfer: 0 }), Vi = re(Go), qo = ne({}, xt, { relatedTarget: 0 }), uu = re(qo), Wf = ne({}, ze, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), uc = re(Wf), Gf = ne({}, ze, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), ev = re(Gf), qf = ne({}, ze, { data: 0 }), Xf = re(qf), tv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, nv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Gm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Bi(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Gm[n]) ? !!r[n] : !1;
  }
  function Kf() {
    return Bi;
  }
  var Zf = ne({}, xt, { key: function(n) {
    if (n.key) {
      var r = tv[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = F(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? nv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Kf, charCode: function(n) {
    return n.type === "keypress" ? F(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? F(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), Jf = re(Zf), ed = ne({}, vn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), rv = re(ed), oc = ne({}, xt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Kf }), av = re(oc), Yr = ne({}, ze, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), $i = re(Yr), Ln = ne({}, vn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ii = re(Ln), td = [9, 13, 27, 32], ro = St && "CompositionEvent" in window, Xo = null;
  St && "documentMode" in document && (Xo = document.documentMode);
  var Ko = St && "TextEvent" in window && !Xo, iv = St && (!ro || Xo && 8 < Xo && 11 >= Xo), lv = " ", sc = !1;
  function uv(n, r) {
    switch (n) {
      case "keyup":
        return td.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ov(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var ao = !1;
  function sv(n, r) {
    switch (n) {
      case "compositionend":
        return ov(r);
      case "keypress":
        return r.which !== 32 ? null : (sc = !0, lv);
      case "textInput":
        return n = r.data, n === lv && sc ? null : n;
      default:
        return null;
    }
  }
  function qm(n, r) {
    if (ao) return n === "compositionend" || !ro && uv(n, r) ? (n = z(), C = h = Za = null, ao = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return iv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Xm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function cv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Xm[n.type] : r === "textarea";
  }
  function nd(n, r, l, o) {
    ji(o), r = rs(r, "onChange"), 0 < r.length && (l = new pt("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var yi = null, ou = null;
  function fv(n) {
    fu(n, 0);
  }
  function Zo(n) {
    var r = ei(n);
    if (wr(r)) return n;
  }
  function Km(n, r) {
    if (n === "change") return r;
  }
  var dv = !1;
  if (St) {
    var rd;
    if (St) {
      var ad = "oninput" in document;
      if (!ad) {
        var pv = document.createElement("div");
        pv.setAttribute("oninput", "return;"), ad = typeof pv.oninput == "function";
      }
      rd = ad;
    } else rd = !1;
    dv = rd && (!document.documentMode || 9 < document.documentMode);
  }
  function vv() {
    yi && (yi.detachEvent("onpropertychange", hv), ou = yi = null);
  }
  function hv(n) {
    if (n.propertyName === "value" && Zo(ou)) {
      var r = [];
      nd(r, ou, n, Bt(n)), eu(fv, r);
    }
  }
  function Zm(n, r, l) {
    n === "focusin" ? (vv(), yi = r, ou = l, yi.attachEvent("onpropertychange", hv)) : n === "focusout" && vv();
  }
  function mv(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return Zo(ou);
  }
  function Jm(n, r) {
    if (n === "click") return Zo(r);
  }
  function yv(n, r) {
    if (n === "input" || n === "change") return Zo(r);
  }
  function ey(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var Ja = typeof Object.is == "function" ? Object.is : ey;
  function Jo(n, r) {
    if (Ja(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!oe.call(r, c) || !Ja(n[c], r[c])) return !1;
    }
    return !0;
  }
  function gv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function cc(n, r) {
    var l = gv(n);
    n = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = n + l.textContent.length, n <= r && o >= r) return { node: l, offset: r - n };
        n = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = gv(l);
    }
  }
  function Rl(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Rl(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function es() {
    for (var n = window, r = En(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = En(n.document);
    }
    return r;
  }
  function fc(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function io(n) {
    var r = es(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Rl(l.ownerDocument.documentElement, l)) {
      if (o !== null && fc(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = cc(l, d);
          var m = cc(
            l,
            o
          );
          c && m && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== m.node || n.focusOffset !== m.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(m.node, m.offset)) : (r.setEnd(m.node, m.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var ty = St && "documentMode" in document && 11 >= document.documentMode, lo = null, id = null, ts = null, ld = !1;
  function ud(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    ld || lo == null || lo !== En(o) || (o = lo, "selectionStart" in o && fc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), ts && Jo(ts, o) || (ts = o, o = rs(id, "onSelect"), 0 < o.length && (r = new pt("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = lo)));
  }
  function dc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var su = { animationend: dc("Animation", "AnimationEnd"), animationiteration: dc("Animation", "AnimationIteration"), animationstart: dc("Animation", "AnimationStart"), transitionend: dc("Transition", "TransitionEnd") }, ir = {}, od = {};
  St && (od = document.createElement("div").style, "AnimationEvent" in window || (delete su.animationend.animation, delete su.animationiteration.animation, delete su.animationstart.animation), "TransitionEvent" in window || delete su.transitionend.transition);
  function pc(n) {
    if (ir[n]) return ir[n];
    if (!su[n]) return n;
    var r = su[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in od) return ir[n] = r[l];
    return n;
  }
  var Sv = pc("animationend"), Ev = pc("animationiteration"), Cv = pc("animationstart"), Rv = pc("transitionend"), sd = /* @__PURE__ */ new Map(), vc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function _a(n, r) {
    sd.set(n, r), Ie(r, [n]);
  }
  for (var cd = 0; cd < vc.length; cd++) {
    var cu = vc[cd], ny = cu.toLowerCase(), ry = cu[0].toUpperCase() + cu.slice(1);
    _a(ny, "on" + ry);
  }
  _a(Sv, "onAnimationEnd"), _a(Ev, "onAnimationIteration"), _a(Cv, "onAnimationStart"), _a("dblclick", "onDoubleClick"), _a("focusin", "onFocus"), _a("focusout", "onBlur"), _a(Rv, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), Ie("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ie("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ie("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ie("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ie("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ie("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ns = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), fd = new Set("cancel close invalid load scroll toggle".split(" ").concat(ns));
  function hc(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, me(o, r, void 0, n), n.currentTarget = null;
  }
  function fu(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var m = o.length - 1; 0 <= m; m--) {
          var E = o[m], T = E.instance, U = E.currentTarget;
          if (E = E.listener, T !== d && c.isPropagationStopped()) break e;
          hc(c, E, U), d = T;
        }
        else for (m = 0; m < o.length; m++) {
          if (E = o[m], T = E.instance, U = E.currentTarget, E = E.listener, T !== d && c.isPropagationStopped()) break e;
          hc(c, E, U), d = T;
        }
      }
    }
    if (di) throw n = R, di = !1, R = null, n;
  }
  function Ht(n, r) {
    var l = r[ls];
    l === void 0 && (l = r[ls] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (Tv(r, n, 2, !1), l.add(o));
  }
  function mc(n, r, l) {
    var o = 0;
    r && (o |= 4), Tv(l, n, o, r);
  }
  var yc = "_reactListening" + Math.random().toString(36).slice(2);
  function uo(n) {
    if (!n[yc]) {
      n[yc] = !0, Je.forEach(function(l) {
        l !== "selectionchange" && (fd.has(l) || mc(l, !1, n), mc(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[yc] || (r[yc] = !0, mc("selectionchange", !1, r));
    }
  }
  function Tv(n, r, l, o) {
    switch (no(r)) {
      case 1:
        var c = Ju;
        break;
      case 4:
        c = eo;
        break;
      default:
        c = El;
    }
    l = c.bind(null, r, l, n), c = void 0, !_r || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function gc(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null) e: for (; ; ) {
      if (o === null) return;
      var m = o.tag;
      if (m === 3 || m === 4) {
        var E = o.stateNode.containerInfo;
        if (E === c || E.nodeType === 8 && E.parentNode === c) break;
        if (m === 4) for (m = o.return; m !== null; ) {
          var T = m.tag;
          if ((T === 3 || T === 4) && (T = m.stateNode.containerInfo, T === c || T.nodeType === 8 && T.parentNode === c)) return;
          m = m.return;
        }
        for (; E !== null; ) {
          if (m = pu(E), m === null) return;
          if (T = m.tag, T === 5 || T === 6) {
            o = d = m;
            continue e;
          }
          E = E.parentNode;
        }
      }
      o = o.return;
    }
    eu(function() {
      var U = d, W = Bt(l), q = [];
      e: {
        var Q = sd.get(n);
        if (Q !== void 0) {
          var de = pt, ge = n;
          switch (n) {
            case "keypress":
              if (F(l) === 0) break e;
            case "keydown":
            case "keyup":
              de = Jf;
              break;
            case "focusin":
              ge = "focus", de = uu;
              break;
            case "focusout":
              ge = "blur", de = uu;
              break;
            case "beforeblur":
            case "afterblur":
              de = uu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              de = Cl;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              de = Vi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              de = av;
              break;
            case Sv:
            case Ev:
            case Cv:
              de = uc;
              break;
            case Rv:
              de = $i;
              break;
            case "scroll":
              de = tn;
              break;
            case "wheel":
              de = Ii;
              break;
            case "copy":
            case "cut":
            case "paste":
              de = ev;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              de = rv;
          }
          var Ce = (r & 4) !== 0, bn = !Ce && n === "scroll", D = Ce ? Q !== null ? Q + "Capture" : null : Q;
          Ce = [];
          for (var x = U, L; x !== null; ) {
            L = x;
            var G = L.stateNode;
            if (L.tag === 5 && G !== null && (L = G, D !== null && (G = xr(x, D), G != null && Ce.push(oo(x, G, L)))), bn) break;
            x = x.return;
          }
          0 < Ce.length && (Q = new de(Q, ge, null, l, W), q.push({ event: Q, listeners: Ce }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (Q = n === "mouseover" || n === "pointerover", de = n === "mouseout" || n === "pointerout", Q && l !== Jt && (ge = l.relatedTarget || l.fromElement) && (pu(ge) || ge[Yi])) break e;
          if ((de || Q) && (Q = W.window === W ? W : (Q = W.ownerDocument) ? Q.defaultView || Q.parentWindow : window, de ? (ge = l.relatedTarget || l.toElement, de = U, ge = ge ? pu(ge) : null, ge !== null && (bn = Xe(ge), ge !== bn || ge.tag !== 5 && ge.tag !== 6) && (ge = null)) : (de = null, ge = U), de !== ge)) {
            if (Ce = Cl, G = "onMouseLeave", D = "onMouseEnter", x = "mouse", (n === "pointerout" || n === "pointerover") && (Ce = rv, G = "onPointerLeave", D = "onPointerEnter", x = "pointer"), bn = de == null ? Q : ei(de), L = ge == null ? Q : ei(ge), Q = new Ce(G, x + "leave", de, l, W), Q.target = bn, Q.relatedTarget = L, G = null, pu(W) === U && (Ce = new Ce(D, x + "enter", ge, l, W), Ce.target = L, Ce.relatedTarget = bn, G = Ce), bn = G, de && ge) t: {
              for (Ce = de, D = ge, x = 0, L = Ce; L; L = Tl(L)) x++;
              for (L = 0, G = D; G; G = Tl(G)) L++;
              for (; 0 < x - L; ) Ce = Tl(Ce), x--;
              for (; 0 < L - x; ) D = Tl(D), L--;
              for (; x--; ) {
                if (Ce === D || D !== null && Ce === D.alternate) break t;
                Ce = Tl(Ce), D = Tl(D);
              }
              Ce = null;
            }
            else Ce = null;
            de !== null && wv(q, Q, de, Ce, !1), ge !== null && bn !== null && wv(q, bn, ge, Ce, !0);
          }
        }
        e: {
          if (Q = U ? ei(U) : window, de = Q.nodeName && Q.nodeName.toLowerCase(), de === "select" || de === "input" && Q.type === "file") var Se = Km;
          else if (cv(Q)) if (dv) Se = yv;
          else {
            Se = mv;
            var Ne = Zm;
          }
          else (de = Q.nodeName) && de.toLowerCase() === "input" && (Q.type === "checkbox" || Q.type === "radio") && (Se = Jm);
          if (Se && (Se = Se(n, U))) {
            nd(q, Se, l, W);
            break e;
          }
          Ne && Ne(n, Q, U), n === "focusout" && (Ne = Q._wrapperState) && Ne.controlled && Q.type === "number" && ua(Q, "number", Q.value);
        }
        switch (Ne = U ? ei(U) : window, n) {
          case "focusin":
            (cv(Ne) || Ne.contentEditable === "true") && (lo = Ne, id = U, ts = null);
            break;
          case "focusout":
            ts = id = lo = null;
            break;
          case "mousedown":
            ld = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ld = !1, ud(q, l, W);
            break;
          case "selectionchange":
            if (ty) break;
          case "keydown":
          case "keyup":
            ud(q, l, W);
        }
        var Ue;
        if (ro) e: {
          switch (n) {
            case "compositionstart":
              var $e = "onCompositionStart";
              break e;
            case "compositionend":
              $e = "onCompositionEnd";
              break e;
            case "compositionupdate":
              $e = "onCompositionUpdate";
              break e;
          }
          $e = void 0;
        }
        else ao ? uv(n, l) && ($e = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && ($e = "onCompositionStart");
        $e && (iv && l.locale !== "ko" && (ao || $e !== "onCompositionStart" ? $e === "onCompositionEnd" && ao && (Ue = z()) : (Za = W, h = "value" in Za ? Za.value : Za.textContent, ao = !0)), Ne = rs(U, $e), 0 < Ne.length && ($e = new Xf($e, n, null, l, W), q.push({ event: $e, listeners: Ne }), Ue ? $e.data = Ue : (Ue = ov(l), Ue !== null && ($e.data = Ue)))), (Ue = Ko ? sv(n, l) : qm(n, l)) && (U = rs(U, "onBeforeInput"), 0 < U.length && (W = new Xf("onBeforeInput", "beforeinput", null, l, W), q.push({ event: W, listeners: U }), W.data = Ue));
      }
      fu(q, r);
    });
  }
  function oo(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function rs(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = xr(n, l), d != null && o.unshift(oo(n, d, c)), d = xr(n, r), d != null && o.push(oo(n, d, c))), n = n.return;
    }
    return o;
  }
  function Tl(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function wv(n, r, l, o, c) {
    for (var d = r._reactName, m = []; l !== null && l !== o; ) {
      var E = l, T = E.alternate, U = E.stateNode;
      if (T !== null && T === o) break;
      E.tag === 5 && U !== null && (E = U, c ? (T = xr(l, d), T != null && m.unshift(oo(l, T, E))) : c || (T = xr(l, d), T != null && m.push(oo(l, T, E)))), l = l.return;
    }
    m.length !== 0 && n.push({ event: r, listeners: m });
  }
  var xv = /\r\n?/g, ay = /\u0000|\uFFFD/g;
  function _v(n) {
    return (typeof n == "string" ? n : "" + n).replace(xv, `
`).replace(ay, "");
  }
  function Sc(n, r, l) {
    if (r = _v(r), _v(n) !== r && l) throw Error(M(425));
  }
  function wl() {
  }
  var as = null, du = null;
  function Ec(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var Cc = typeof setTimeout == "function" ? setTimeout : void 0, dd = typeof clearTimeout == "function" ? clearTimeout : void 0, bv = typeof Promise == "function" ? Promise : void 0, so = typeof queueMicrotask == "function" ? queueMicrotask : typeof bv < "u" ? function(n) {
    return bv.resolve(null).then(n).catch(Rc);
  } : Cc;
  function Rc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function co(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (o === 0) {
          n.removeChild(c), Ka(r);
          return;
        }
        o--;
      } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    Ka(r);
  }
  function gi(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function Dv(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0) return n;
          r--;
        } else l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var xl = Math.random().toString(36).slice(2), Si = "__reactFiber$" + xl, is = "__reactProps$" + xl, Yi = "__reactContainer$" + xl, ls = "__reactEvents$" + xl, fo = "__reactListeners$" + xl, iy = "__reactHandles$" + xl;
  function pu(n) {
    var r = n[Si];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Yi] || l[Si]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Dv(n); n !== null; ) {
          if (l = n[Si]) return l;
          n = Dv(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function De(n) {
    return n = n[Si] || n[Yi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function ei(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(M(33));
  }
  function hn(n) {
    return n[is] || null;
  }
  var Et = [], ba = -1;
  function Da(n) {
    return { current: n };
  }
  function nn(n) {
    0 > ba || (n.current = Et[ba], Et[ba] = null, ba--);
  }
  function _e(n, r) {
    ba++, Et[ba] = n.current, n.current = r;
  }
  var Er = {}, Sn = Da(Er), In = Da(!1), Qr = Er;
  function Wr(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Er;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l) c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function Mn(n) {
    return n = n.childContextTypes, n != null;
  }
  function po() {
    nn(In), nn(Sn);
  }
  function kv(n, r, l) {
    if (Sn.current !== Er) throw Error(M(168));
    _e(Sn, r), _e(In, l);
  }
  function us(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(M(108, et(n) || "Unknown", c));
    return ne({}, l, o);
  }
  function Xn(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Er, Qr = Sn.current, _e(Sn, n), _e(In, In.current), !0;
  }
  function Tc(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(M(169));
    l ? (n = us(n, r, Qr), o.__reactInternalMemoizedMergedChildContext = n, nn(In), nn(Sn), _e(Sn, n)) : nn(In), _e(In, l);
  }
  var Ei = null, vo = !1, Qi = !1;
  function wc(n) {
    Ei === null ? Ei = [n] : Ei.push(n);
  }
  function _l(n) {
    vo = !0, wc(n);
  }
  function Ci() {
    if (!Qi && Ei !== null) {
      Qi = !0;
      var n = 0, r = Ot;
      try {
        var l = Ei;
        for (Ot = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Ei = null, vo = !1;
      } catch (c) {
        throw Ei !== null && (Ei = Ei.slice(n + 1)), un(Ga, Ci), c;
      } finally {
        Ot = r, Qi = !1;
      }
    }
    return null;
  }
  var bl = [], Dl = 0, kl = null, Wi = 0, Nn = [], ka = 0, fa = null, Ri = 1, Ti = "";
  function vu(n, r) {
    bl[Dl++] = Wi, bl[Dl++] = kl, kl = n, Wi = r;
  }
  function Ov(n, r, l) {
    Nn[ka++] = Ri, Nn[ka++] = Ti, Nn[ka++] = fa, fa = n;
    var o = Ri;
    n = Ti;
    var c = 32 - br(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - br(r) + c;
    if (30 < d) {
      var m = c - c % 5;
      d = (o & (1 << m) - 1).toString(32), o >>= m, c -= m, Ri = 1 << 32 - br(r) + c | l << c | o, Ti = d + n;
    } else Ri = 1 << d | l << c | o, Ti = n;
  }
  function xc(n) {
    n.return !== null && (vu(n, 1), Ov(n, 1, 0));
  }
  function _c(n) {
    for (; n === kl; ) kl = bl[--Dl], bl[Dl] = null, Wi = bl[--Dl], bl[Dl] = null;
    for (; n === fa; ) fa = Nn[--ka], Nn[ka] = null, Ti = Nn[--ka], Nn[ka] = null, Ri = Nn[--ka], Nn[ka] = null;
  }
  var Gr = null, qr = null, fn = !1, Oa = null;
  function pd(n, r) {
    var l = Ua(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Lv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Gr = n, qr = gi(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Gr = n, qr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = fa !== null ? { id: Ri, overflow: Ti } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Ua(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Gr = n, qr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function vd(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function hd(n) {
    if (fn) {
      var r = qr;
      if (r) {
        var l = r;
        if (!Lv(n, r)) {
          if (vd(n)) throw Error(M(418));
          r = gi(l.nextSibling);
          var o = Gr;
          r && Lv(n, r) ? pd(o, l) : (n.flags = n.flags & -4097 | 2, fn = !1, Gr = n);
        }
      } else {
        if (vd(n)) throw Error(M(418));
        n.flags = n.flags & -4097 | 2, fn = !1, Gr = n;
      }
    }
  }
  function Yn(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Gr = n;
  }
  function bc(n) {
    if (n !== Gr) return !1;
    if (!fn) return Yn(n), fn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Ec(n.type, n.memoizedProps)), r && (r = qr)) {
      if (vd(n)) throw os(), Error(M(418));
      for (; r; ) pd(n, r), r = gi(r.nextSibling);
    }
    if (Yn(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(M(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                qr = gi(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        qr = null;
      }
    } else qr = Gr ? gi(n.stateNode.nextSibling) : null;
    return !0;
  }
  function os() {
    for (var n = qr; n; ) n = gi(n.nextSibling);
  }
  function Ol() {
    qr = Gr = null, fn = !1;
  }
  function Gi(n) {
    Oa === null ? Oa = [n] : Oa.push(n);
  }
  var ly = mt.ReactCurrentBatchConfig;
  function hu(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(M(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(M(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(m) {
          var E = c.refs;
          m === null ? delete E[d] : E[d] = m;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(M(284));
      if (!l._owner) throw Error(M(290, n));
    }
    return n;
  }
  function Dc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(M(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Mv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function mu(n) {
    function r(D, x) {
      if (n) {
        var L = D.deletions;
        L === null ? (D.deletions = [x], D.flags |= 16) : L.push(x);
      }
    }
    function l(D, x) {
      if (!n) return null;
      for (; x !== null; ) r(D, x), x = x.sibling;
      return null;
    }
    function o(D, x) {
      for (D = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? D.set(x.key, x) : D.set(x.index, x), x = x.sibling;
      return D;
    }
    function c(D, x) {
      return D = jl(D, x), D.index = 0, D.sibling = null, D;
    }
    function d(D, x, L) {
      return D.index = L, n ? (L = D.alternate, L !== null ? (L = L.index, L < x ? (D.flags |= 2, x) : L) : (D.flags |= 2, x)) : (D.flags |= 1048576, x);
    }
    function m(D) {
      return n && D.alternate === null && (D.flags |= 2), D;
    }
    function E(D, x, L, G) {
      return x === null || x.tag !== 6 ? (x = Qd(L, D.mode, G), x.return = D, x) : (x = c(x, L), x.return = D, x);
    }
    function T(D, x, L, G) {
      var Se = L.type;
      return Se === He ? W(D, x, L.props.children, G, L.key) : x !== null && (x.elementType === Se || typeof Se == "object" && Se !== null && Se.$$typeof === kt && Mv(Se) === x.type) ? (G = c(x, L.props), G.ref = hu(D, x, L), G.return = D, G) : (G = js(L.type, L.key, L.props, null, D.mode, G), G.ref = hu(D, x, L), G.return = D, G);
    }
    function U(D, x, L, G) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== L.containerInfo || x.stateNode.implementation !== L.implementation ? (x = of(L, D.mode, G), x.return = D, x) : (x = c(x, L.children || []), x.return = D, x);
    }
    function W(D, x, L, G, Se) {
      return x === null || x.tag !== 7 ? (x = el(L, D.mode, G, Se), x.return = D, x) : (x = c(x, L), x.return = D, x);
    }
    function q(D, x, L) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return x = Qd("" + x, D.mode, L), x.return = D, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case be:
            return L = js(x.type, x.key, x.props, null, D.mode, L), L.ref = hu(D, null, x), L.return = D, L;
          case ft:
            return x = of(x, D.mode, L), x.return = D, x;
          case kt:
            var G = x._init;
            return q(D, G(x._payload), L);
        }
        if (Gn(x) || Te(x)) return x = el(x, D.mode, L, null), x.return = D, x;
        Dc(D, x);
      }
      return null;
    }
    function Q(D, x, L, G) {
      var Se = x !== null ? x.key : null;
      if (typeof L == "string" && L !== "" || typeof L == "number") return Se !== null ? null : E(D, x, "" + L, G);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case be:
            return L.key === Se ? T(D, x, L, G) : null;
          case ft:
            return L.key === Se ? U(D, x, L, G) : null;
          case kt:
            return Se = L._init, Q(
              D,
              x,
              Se(L._payload),
              G
            );
        }
        if (Gn(L) || Te(L)) return Se !== null ? null : W(D, x, L, G, null);
        Dc(D, L);
      }
      return null;
    }
    function de(D, x, L, G, Se) {
      if (typeof G == "string" && G !== "" || typeof G == "number") return D = D.get(L) || null, E(x, D, "" + G, Se);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case be:
            return D = D.get(G.key === null ? L : G.key) || null, T(x, D, G, Se);
          case ft:
            return D = D.get(G.key === null ? L : G.key) || null, U(x, D, G, Se);
          case kt:
            var Ne = G._init;
            return de(D, x, L, Ne(G._payload), Se);
        }
        if (Gn(G) || Te(G)) return D = D.get(L) || null, W(x, D, G, Se, null);
        Dc(x, G);
      }
      return null;
    }
    function ge(D, x, L, G) {
      for (var Se = null, Ne = null, Ue = x, $e = x = 0, Jn = null; Ue !== null && $e < L.length; $e++) {
        Ue.index > $e ? (Jn = Ue, Ue = null) : Jn = Ue.sibling;
        var Nt = Q(D, Ue, L[$e], G);
        if (Nt === null) {
          Ue === null && (Ue = Jn);
          break;
        }
        n && Ue && Nt.alternate === null && r(D, Ue), x = d(Nt, x, $e), Ne === null ? Se = Nt : Ne.sibling = Nt, Ne = Nt, Ue = Jn;
      }
      if ($e === L.length) return l(D, Ue), fn && vu(D, $e), Se;
      if (Ue === null) {
        for (; $e < L.length; $e++) Ue = q(D, L[$e], G), Ue !== null && (x = d(Ue, x, $e), Ne === null ? Se = Ue : Ne.sibling = Ue, Ne = Ue);
        return fn && vu(D, $e), Se;
      }
      for (Ue = o(D, Ue); $e < L.length; $e++) Jn = de(Ue, D, $e, L[$e], G), Jn !== null && (n && Jn.alternate !== null && Ue.delete(Jn.key === null ? $e : Jn.key), x = d(Jn, x, $e), Ne === null ? Se = Jn : Ne.sibling = Jn, Ne = Jn);
      return n && Ue.forEach(function(Vl) {
        return r(D, Vl);
      }), fn && vu(D, $e), Se;
    }
    function Ce(D, x, L, G) {
      var Se = Te(L);
      if (typeof Se != "function") throw Error(M(150));
      if (L = Se.call(L), L == null) throw Error(M(151));
      for (var Ne = Se = null, Ue = x, $e = x = 0, Jn = null, Nt = L.next(); Ue !== null && !Nt.done; $e++, Nt = L.next()) {
        Ue.index > $e ? (Jn = Ue, Ue = null) : Jn = Ue.sibling;
        var Vl = Q(D, Ue, Nt.value, G);
        if (Vl === null) {
          Ue === null && (Ue = Jn);
          break;
        }
        n && Ue && Vl.alternate === null && r(D, Ue), x = d(Vl, x, $e), Ne === null ? Se = Vl : Ne.sibling = Vl, Ne = Vl, Ue = Jn;
      }
      if (Nt.done) return l(
        D,
        Ue
      ), fn && vu(D, $e), Se;
      if (Ue === null) {
        for (; !Nt.done; $e++, Nt = L.next()) Nt = q(D, Nt.value, G), Nt !== null && (x = d(Nt, x, $e), Ne === null ? Se = Nt : Ne.sibling = Nt, Ne = Nt);
        return fn && vu(D, $e), Se;
      }
      for (Ue = o(D, Ue); !Nt.done; $e++, Nt = L.next()) Nt = de(Ue, D, $e, Nt.value, G), Nt !== null && (n && Nt.alternate !== null && Ue.delete(Nt.key === null ? $e : Nt.key), x = d(Nt, x, $e), Ne === null ? Se = Nt : Ne.sibling = Nt, Ne = Nt);
      return n && Ue.forEach(function(vh) {
        return r(D, vh);
      }), fn && vu(D, $e), Se;
    }
    function bn(D, x, L, G) {
      if (typeof L == "object" && L !== null && L.type === He && L.key === null && (L = L.props.children), typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case be:
            e: {
              for (var Se = L.key, Ne = x; Ne !== null; ) {
                if (Ne.key === Se) {
                  if (Se = L.type, Se === He) {
                    if (Ne.tag === 7) {
                      l(D, Ne.sibling), x = c(Ne, L.props.children), x.return = D, D = x;
                      break e;
                    }
                  } else if (Ne.elementType === Se || typeof Se == "object" && Se !== null && Se.$$typeof === kt && Mv(Se) === Ne.type) {
                    l(D, Ne.sibling), x = c(Ne, L.props), x.ref = hu(D, Ne, L), x.return = D, D = x;
                    break e;
                  }
                  l(D, Ne);
                  break;
                } else r(D, Ne);
                Ne = Ne.sibling;
              }
              L.type === He ? (x = el(L.props.children, D.mode, G, L.key), x.return = D, D = x) : (G = js(L.type, L.key, L.props, null, D.mode, G), G.ref = hu(D, x, L), G.return = D, D = G);
            }
            return m(D);
          case ft:
            e: {
              for (Ne = L.key; x !== null; ) {
                if (x.key === Ne) if (x.tag === 4 && x.stateNode.containerInfo === L.containerInfo && x.stateNode.implementation === L.implementation) {
                  l(D, x.sibling), x = c(x, L.children || []), x.return = D, D = x;
                  break e;
                } else {
                  l(D, x);
                  break;
                }
                else r(D, x);
                x = x.sibling;
              }
              x = of(L, D.mode, G), x.return = D, D = x;
            }
            return m(D);
          case kt:
            return Ne = L._init, bn(D, x, Ne(L._payload), G);
        }
        if (Gn(L)) return ge(D, x, L, G);
        if (Te(L)) return Ce(D, x, L, G);
        Dc(D, L);
      }
      return typeof L == "string" && L !== "" || typeof L == "number" ? (L = "" + L, x !== null && x.tag === 6 ? (l(D, x.sibling), x = c(x, L), x.return = D, D = x) : (l(D, x), x = Qd(L, D.mode, G), x.return = D, D = x), m(D)) : l(D, x);
    }
    return bn;
  }
  var Tn = mu(!0), le = mu(!1), da = Da(null), Xr = null, ho = null, md = null;
  function yd() {
    md = ho = Xr = null;
  }
  function gd(n) {
    var r = da.current;
    nn(da), n._currentValue = r;
  }
  function Sd(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function mn(n, r) {
    Xr = n, md = ho = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (Un = !0), n.firstContext = null);
  }
  function La(n) {
    var r = n._currentValue;
    if (md !== n) if (n = { context: n, memoizedValue: r, next: null }, ho === null) {
      if (Xr === null) throw Error(M(308));
      ho = n, Xr.dependencies = { lanes: 0, firstContext: n };
    } else ho = ho.next = n;
    return r;
  }
  var yu = null;
  function Ed(n) {
    yu === null ? yu = [n] : yu.push(n);
  }
  function Cd(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Ed(r)) : (l.next = c.next, c.next = l), r.interleaved = l, pa(n, o);
  }
  function pa(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var va = !1;
  function Rd(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Nv(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function qi(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Ll(n, r, l) {
    var o = n.updateQueue;
    if (o === null) return null;
    if (o = o.shared, Ct & 2) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, pa(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, Ed(o)) : (r.next = c.next, c.next = r), o.interleaved = r, pa(n, l);
  }
  function kc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Pi(n, l);
    }
  }
  function zv(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var m = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = m : d = d.next = m, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function ss(n, r, l, o) {
    var c = n.updateQueue;
    va = !1;
    var d = c.firstBaseUpdate, m = c.lastBaseUpdate, E = c.shared.pending;
    if (E !== null) {
      c.shared.pending = null;
      var T = E, U = T.next;
      T.next = null, m === null ? d = U : m.next = U, m = T;
      var W = n.alternate;
      W !== null && (W = W.updateQueue, E = W.lastBaseUpdate, E !== m && (E === null ? W.firstBaseUpdate = U : E.next = U, W.lastBaseUpdate = T));
    }
    if (d !== null) {
      var q = c.baseState;
      m = 0, W = U = T = null, E = d;
      do {
        var Q = E.lane, de = E.eventTime;
        if ((o & Q) === Q) {
          W !== null && (W = W.next = {
            eventTime: de,
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          });
          e: {
            var ge = n, Ce = E;
            switch (Q = r, de = l, Ce.tag) {
              case 1:
                if (ge = Ce.payload, typeof ge == "function") {
                  q = ge.call(de, q, Q);
                  break e;
                }
                q = ge;
                break e;
              case 3:
                ge.flags = ge.flags & -65537 | 128;
              case 0:
                if (ge = Ce.payload, Q = typeof ge == "function" ? ge.call(de, q, Q) : ge, Q == null) break e;
                q = ne({}, q, Q);
                break e;
              case 2:
                va = !0;
            }
          }
          E.callback !== null && E.lane !== 0 && (n.flags |= 64, Q = c.effects, Q === null ? c.effects = [E] : Q.push(E));
        } else de = { eventTime: de, lane: Q, tag: E.tag, payload: E.payload, callback: E.callback, next: null }, W === null ? (U = W = de, T = q) : W = W.next = de, m |= Q;
        if (E = E.next, E === null) {
          if (E = c.shared.pending, E === null) break;
          Q = E, E = Q.next, Q.next = null, c.lastBaseUpdate = Q, c.shared.pending = null;
        }
      } while (!0);
      if (W === null && (T = q), c.baseState = T, c.firstBaseUpdate = U, c.lastBaseUpdate = W, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          m |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      Di |= m, n.lanes = m, n.memoizedState = q;
    }
  }
  function Td(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(M(191, c));
        c.call(o);
      }
    }
  }
  var cs = {}, wi = Da(cs), fs = Da(cs), ds = Da(cs);
  function gu(n) {
    if (n === cs) throw Error(M(174));
    return n;
  }
  function wd(n, r) {
    switch (_e(ds, r), _e(fs, n), _e(wi, cs), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : oa(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = oa(r, n);
    }
    nn(wi), _e(wi, r);
  }
  function Su() {
    nn(wi), nn(fs), nn(ds);
  }
  function Uv(n) {
    gu(ds.current);
    var r = gu(wi.current), l = oa(r, n.type);
    r !== l && (_e(fs, n), _e(wi, l));
  }
  function Oc(n) {
    fs.current === n && (nn(wi), nn(fs));
  }
  var yn = Da(0);
  function Lc(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var ps = [];
  function ke() {
    for (var n = 0; n < ps.length; n++) ps[n]._workInProgressVersionPrimary = null;
    ps.length = 0;
  }
  var ct = mt.ReactCurrentDispatcher, Lt = mt.ReactCurrentBatchConfig, Wt = 0, Mt = null, zn = null, Kn = null, Mc = !1, vs = !1, Eu = 0, Y = 0;
  function Dt() {
    throw Error(M(321));
  }
  function je(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!Ja(n[l], r[l])) return !1;
    return !0;
  }
  function Ml(n, r, l, o, c, d) {
    if (Wt = d, Mt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, ct.current = n === null || n.memoizedState === null ? Wc : Es, n = l(o, c), vs) {
      d = 0;
      do {
        if (vs = !1, Eu = 0, 25 <= d) throw Error(M(301));
        d += 1, Kn = zn = null, r.updateQueue = null, ct.current = Gc, n = l(o, c);
      } while (vs);
    }
    if (ct.current = xu, r = zn !== null && zn.next !== null, Wt = 0, Kn = zn = Mt = null, Mc = !1, r) throw Error(M(300));
    return n;
  }
  function ti() {
    var n = Eu !== 0;
    return Eu = 0, n;
  }
  function Cr() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Kn === null ? Mt.memoizedState = Kn = n : Kn = Kn.next = n, Kn;
  }
  function wn() {
    if (zn === null) {
      var n = Mt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = zn.next;
    var r = Kn === null ? Mt.memoizedState : Kn.next;
    if (r !== null) Kn = r, zn = n;
    else {
      if (n === null) throw Error(M(310));
      zn = n, n = { memoizedState: zn.memoizedState, baseState: zn.baseState, baseQueue: zn.baseQueue, queue: zn.queue, next: null }, Kn === null ? Mt.memoizedState = Kn = n : Kn = Kn.next = n;
    }
    return Kn;
  }
  function Xi(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Nl(n) {
    var r = wn(), l = r.queue;
    if (l === null) throw Error(M(311));
    l.lastRenderedReducer = n;
    var o = zn, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var m = c.next;
        c.next = d.next, d.next = m;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var E = m = null, T = null, U = d;
      do {
        var W = U.lane;
        if ((Wt & W) === W) T !== null && (T = T.next = { lane: 0, action: U.action, hasEagerState: U.hasEagerState, eagerState: U.eagerState, next: null }), o = U.hasEagerState ? U.eagerState : n(o, U.action);
        else {
          var q = {
            lane: W,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          };
          T === null ? (E = T = q, m = o) : T = T.next = q, Mt.lanes |= W, Di |= W;
        }
        U = U.next;
      } while (U !== null && U !== d);
      T === null ? m = o : T.next = E, Ja(o, r.memoizedState) || (Un = !0), r.memoizedState = o, r.baseState = m, r.baseQueue = T, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, Mt.lanes |= d, Di |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Cu(n) {
    var r = wn(), l = r.queue;
    if (l === null) throw Error(M(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var m = c = c.next;
      do
        d = n(d, m.action), m = m.next;
      while (m !== c);
      Ja(d, r.memoizedState) || (Un = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function Nc() {
  }
  function zc(n, r) {
    var l = Mt, o = wn(), c = r(), d = !Ja(o.memoizedState, c);
    if (d && (o.memoizedState = c, Un = !0), o = o.queue, hs(Fc.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || Kn !== null && Kn.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ru(9, Ac.bind(null, l, o, c, r), void 0, null), Qn === null) throw Error(M(349));
      Wt & 30 || Uc(l, r, c);
    }
    return c;
  }
  function Uc(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Mt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Mt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Ac(n, r, l, o) {
    r.value = l, r.getSnapshot = o, jc(r) && Hc(n);
  }
  function Fc(n, r, l) {
    return l(function() {
      jc(r) && Hc(n);
    });
  }
  function jc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !Ja(n, l);
    } catch {
      return !0;
    }
  }
  function Hc(n) {
    var r = pa(n, 1);
    r !== null && Nr(r, n, 1, -1);
  }
  function Pc(n) {
    var r = Cr();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Xi, lastRenderedState: n }, r.queue = n, n = n.dispatch = wu.bind(null, Mt, n), [r.memoizedState, n];
  }
  function Ru(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = Mt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Mt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Vc() {
    return wn().memoizedState;
  }
  function mo(n, r, l, o) {
    var c = Cr();
    Mt.flags |= n, c.memoizedState = Ru(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function yo(n, r, l, o) {
    var c = wn();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (zn !== null) {
      var m = zn.memoizedState;
      if (d = m.destroy, o !== null && je(o, m.deps)) {
        c.memoizedState = Ru(r, l, d, o);
        return;
      }
    }
    Mt.flags |= n, c.memoizedState = Ru(1 | r, l, d, o);
  }
  function Bc(n, r) {
    return mo(8390656, 8, n, r);
  }
  function hs(n, r) {
    return yo(2048, 8, n, r);
  }
  function $c(n, r) {
    return yo(4, 2, n, r);
  }
  function ms(n, r) {
    return yo(4, 4, n, r);
  }
  function Tu(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function Ic(n, r, l) {
    return l = l != null ? l.concat([n]) : null, yo(4, 4, Tu.bind(null, r, n), l);
  }
  function ys() {
  }
  function Yc(n, r) {
    var l = wn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && je(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function Qc(n, r) {
    var l = wn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && je(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function xd(n, r, l) {
    return Wt & 21 ? (Ja(l, r) || (l = qu(), Mt.lanes |= l, Di |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, Un = !0), n.memoizedState = l);
  }
  function gs(n, r) {
    var l = Ot;
    Ot = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = Lt.transition;
    Lt.transition = {};
    try {
      n(!1), r();
    } finally {
      Ot = l, Lt.transition = o;
    }
  }
  function _d() {
    return wn().memoizedState;
  }
  function Ss(n, r, l) {
    var o = ki(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, Kr(n)) Av(r, l);
    else if (l = Cd(n, r, l, o), l !== null) {
      var c = jn();
      Nr(l, n, o, c), Xt(l, r, o);
    }
  }
  function wu(n, r, l) {
    var o = ki(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Kr(n)) Av(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var m = r.lastRenderedState, E = d(m, l);
        if (c.hasEagerState = !0, c.eagerState = E, Ja(E, m)) {
          var T = r.interleaved;
          T === null ? (c.next = c, Ed(r)) : (c.next = T.next, T.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Cd(n, r, c, o), l !== null && (c = jn(), Nr(l, n, o, c), Xt(l, r, o));
    }
  }
  function Kr(n) {
    var r = n.alternate;
    return n === Mt || r !== null && r === Mt;
  }
  function Av(n, r) {
    vs = Mc = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Xt(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Pi(n, l);
    }
  }
  var xu = { readContext: La, useCallback: Dt, useContext: Dt, useEffect: Dt, useImperativeHandle: Dt, useInsertionEffect: Dt, useLayoutEffect: Dt, useMemo: Dt, useReducer: Dt, useRef: Dt, useState: Dt, useDebugValue: Dt, useDeferredValue: Dt, useTransition: Dt, useMutableSource: Dt, useSyncExternalStore: Dt, useId: Dt, unstable_isNewReconciler: !1 }, Wc = { readContext: La, useCallback: function(n, r) {
    return Cr().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: La, useEffect: Bc, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, mo(
      4194308,
      4,
      Tu.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return mo(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return mo(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = Cr();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = Cr();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = Ss.bind(null, Mt, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = Cr();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Pc, useDebugValue: ys, useDeferredValue: function(n) {
    return Cr().memoizedState = n;
  }, useTransition: function() {
    var n = Pc(!1), r = n[0];
    return n = gs.bind(null, n[1]), Cr().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = Mt, c = Cr();
    if (fn) {
      if (l === void 0) throw Error(M(407));
      l = l();
    } else {
      if (l = r(), Qn === null) throw Error(M(349));
      Wt & 30 || Uc(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, Bc(Fc.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, Ru(9, Ac.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = Cr(), r = Qn.identifierPrefix;
    if (fn) {
      var l = Ti, o = Ri;
      l = (o & ~(1 << 32 - br(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = Eu++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = Y++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Es = {
    readContext: La,
    useCallback: Yc,
    useContext: La,
    useEffect: hs,
    useImperativeHandle: Ic,
    useInsertionEffect: $c,
    useLayoutEffect: ms,
    useMemo: Qc,
    useReducer: Nl,
    useRef: Vc,
    useState: function() {
      return Nl(Xi);
    },
    useDebugValue: ys,
    useDeferredValue: function(n) {
      var r = wn();
      return xd(r, zn.memoizedState, n);
    },
    useTransition: function() {
      var n = Nl(Xi)[0], r = wn().memoizedState;
      return [n, r];
    },
    useMutableSource: Nc,
    useSyncExternalStore: zc,
    useId: _d,
    unstable_isNewReconciler: !1
  }, Gc = { readContext: La, useCallback: Yc, useContext: La, useEffect: hs, useImperativeHandle: Ic, useInsertionEffect: $c, useLayoutEffect: ms, useMemo: Qc, useReducer: Cu, useRef: Vc, useState: function() {
    return Cu(Xi);
  }, useDebugValue: ys, useDeferredValue: function(n) {
    var r = wn();
    return zn === null ? r.memoizedState = n : xd(r, zn.memoizedState, n);
  }, useTransition: function() {
    var n = Cu(Xi)[0], r = wn().memoizedState;
    return [n, r];
  }, useMutableSource: Nc, useSyncExternalStore: zc, useId: _d, unstable_isNewReconciler: !1 };
  function ni(n, r) {
    if (n && n.defaultProps) {
      r = ne({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function bd(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : ne({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var qc = { isMounted: function(n) {
    return (n = n._reactInternals) ? Xe(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = ki(n), d = qi(o, c);
    d.payload = r, l != null && (d.callback = l), r = Ll(n, d, c), r !== null && (Nr(r, n, c, o), kc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = ki(n), d = qi(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Ll(n, d, c), r !== null && (Nr(r, n, c, o), kc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = jn(), o = ki(n), c = qi(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Ll(n, c, o), r !== null && (Nr(r, n, o, l), kc(r, n, o));
  } };
  function Fv(n, r, l, o, c, d, m) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, m) : r.prototype && r.prototype.isPureReactComponent ? !Jo(l, o) || !Jo(c, d) : !0;
  }
  function Xc(n, r, l) {
    var o = !1, c = Er, d = r.contextType;
    return typeof d == "object" && d !== null ? d = La(d) : (c = Mn(r) ? Qr : Sn.current, o = r.contextTypes, d = (o = o != null) ? Wr(n, c) : Er), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = qc, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function jv(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && qc.enqueueReplaceState(r, r.state, null);
  }
  function Cs(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Rd(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = La(d) : (d = Mn(r) ? Qr : Sn.current, c.context = Wr(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (bd(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && qc.enqueueReplaceState(c, c.state, null), ss(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function _u(n, r) {
    try {
      var l = "", o = r;
      do
        l += ut(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function Dd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function kd(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Kc = typeof WeakMap == "function" ? WeakMap : Map;
  function Hv(n, r, l) {
    l = qi(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      To || (To = !0, ku = o), kd(n, r);
    }, l;
  }
  function Od(n, r, l) {
    l = qi(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        kd(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      kd(n, r), typeof o != "function" && (Al === null ? Al = /* @__PURE__ */ new Set([this]) : Al.add(this));
      var m = r.stack;
      this.componentDidCatch(r.value, { componentStack: m !== null ? m : "" });
    }), l;
  }
  function Ld(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new Kc();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = py.bind(null, n, r, l), r.then(n, n));
  }
  function Pv(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function zl(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = qi(-1, 1), r.tag = 2, Ll(l, r, 1))), l.lanes |= 1), n);
  }
  var Rs = mt.ReactCurrentOwner, Un = !1;
  function lr(n, r, l, o) {
    r.child = n === null ? le(r, null, l, o) : Tn(r, n.child, l, o);
  }
  function Zr(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return mn(r, c), o = Ml(n, r, l, o, d, c), l = ti(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Na(n, r, c)) : (fn && l && xc(r), r.flags |= 1, lr(n, r, o, c), r.child);
  }
  function bu(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !Yd(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, Ze(n, r, d, o, c)) : (n = js(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var m = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Jo, l(m, o) && n.ref === r.ref) return Na(n, r, c);
    }
    return r.flags |= 1, n = jl(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function Ze(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (Jo(d, o) && n.ref === r.ref) if (Un = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) n.flags & 131072 && (Un = !0);
      else return r.lanes = n.lanes, Na(n, r, c);
    }
    return Vv(n, r, l, o, c);
  }
  function Ts(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, _e(Eo, ha), ha |= l;
    else {
      if (!(l & 1073741824)) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, _e(Eo, ha), ha |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, _e(Eo, ha), ha |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, _e(Eo, ha), ha |= o;
    return lr(n, r, c, l), r.child;
  }
  function Md(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Vv(n, r, l, o, c) {
    var d = Mn(l) ? Qr : Sn.current;
    return d = Wr(r, d), mn(r, c), l = Ml(n, r, l, o, d, c), o = ti(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Na(n, r, c)) : (fn && o && xc(r), r.flags |= 1, lr(n, r, l, c), r.child);
  }
  function Bv(n, r, l, o, c) {
    if (Mn(l)) {
      var d = !0;
      Xn(r);
    } else d = !1;
    if (mn(r, c), r.stateNode === null) Ma(n, r), Xc(r, l, o), Cs(r, l, o, c), o = !0;
    else if (n === null) {
      var m = r.stateNode, E = r.memoizedProps;
      m.props = E;
      var T = m.context, U = l.contextType;
      typeof U == "object" && U !== null ? U = La(U) : (U = Mn(l) ? Qr : Sn.current, U = Wr(r, U));
      var W = l.getDerivedStateFromProps, q = typeof W == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      q || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== o || T !== U) && jv(r, m, o, U), va = !1;
      var Q = r.memoizedState;
      m.state = Q, ss(r, o, m, c), T = r.memoizedState, E !== o || Q !== T || In.current || va ? (typeof W == "function" && (bd(r, l, W, o), T = r.memoizedState), (E = va || Fv(r, l, E, o, Q, T, U)) ? (q || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = T), m.props = o, m.state = T, m.context = U, o = E) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      m = r.stateNode, Nv(n, r), E = r.memoizedProps, U = r.type === r.elementType ? E : ni(r.type, E), m.props = U, q = r.pendingProps, Q = m.context, T = l.contextType, typeof T == "object" && T !== null ? T = La(T) : (T = Mn(l) ? Qr : Sn.current, T = Wr(r, T));
      var de = l.getDerivedStateFromProps;
      (W = typeof de == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== q || Q !== T) && jv(r, m, o, T), va = !1, Q = r.memoizedState, m.state = Q, ss(r, o, m, c);
      var ge = r.memoizedState;
      E !== q || Q !== ge || In.current || va ? (typeof de == "function" && (bd(r, l, de, o), ge = r.memoizedState), (U = va || Fv(r, l, U, o, Q, ge, T) || !1) ? (W || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, ge, T), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, ge, T)), typeof m.componentDidUpdate == "function" && (r.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && Q === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && Q === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = ge), m.props = o, m.state = ge, m.context = T, o = U) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && Q === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && Q === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return ws(n, r, l, o, d, c);
  }
  function ws(n, r, l, o, c, d) {
    Md(n, r);
    var m = (r.flags & 128) !== 0;
    if (!o && !m) return c && Tc(r, l, !1), Na(n, r, d);
    o = r.stateNode, Rs.current = r;
    var E = m && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && m ? (r.child = Tn(r, n.child, null, d), r.child = Tn(r, null, E, d)) : lr(n, r, E, d), r.memoizedState = o.state, c && Tc(r, l, !0), r.child;
  }
  function go(n) {
    var r = n.stateNode;
    r.pendingContext ? kv(n, r.pendingContext, r.pendingContext !== r.context) : r.context && kv(n, r.context, !1), wd(n, r.containerInfo);
  }
  function $v(n, r, l, o, c) {
    return Ol(), Gi(c), r.flags |= 256, lr(n, r, l, o), r.child;
  }
  var Zc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Nd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function Jc(n, r, l) {
    var o = r.pendingProps, c = yn.current, d = !1, m = (r.flags & 128) !== 0, E;
    if ((E = m) || (E = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), E ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), _e(yn, c & 1), n === null)
      return hd(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (m = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, m = { mode: "hidden", children: m }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = m) : d = Hl(m, o, 0, null), n = el(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = Nd(l), r.memoizedState = Zc, n) : zd(r, m));
    if (c = n.memoizedState, c !== null && (E = c.dehydrated, E !== null)) return Iv(n, r, m, o, E, c, l);
    if (d) {
      d = o.fallback, m = r.mode, c = n.child, E = c.sibling;
      var T = { mode: "hidden", children: o.children };
      return !(m & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = T, r.deletions = null) : (o = jl(c, T), o.subtreeFlags = c.subtreeFlags & 14680064), E !== null ? d = jl(E, d) : (d = el(d, m, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, m = n.child.memoizedState, m = m === null ? Nd(l) : { baseLanes: m.baseLanes | l, cachePool: null, transitions: m.transitions }, d.memoizedState = m, d.childLanes = n.childLanes & ~l, r.memoizedState = Zc, o;
    }
    return d = n.child, n = d.sibling, o = jl(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function zd(n, r) {
    return r = Hl({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function xs(n, r, l, o) {
    return o !== null && Gi(o), Tn(r, n.child, null, l), n = zd(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Iv(n, r, l, o, c, d, m) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = Dd(Error(M(422))), xs(n, r, m, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = Hl({ mode: "visible", children: o.children }, c, 0, null), d = el(d, c, m, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && Tn(r, n.child, null, m), r.child.memoizedState = Nd(m), r.memoizedState = Zc, d);
    if (!(r.mode & 1)) return xs(n, r, m, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var E = o.dgst;
      return o = E, d = Error(M(419)), o = Dd(d, o, void 0), xs(n, r, m, o);
    }
    if (E = (m & n.childLanes) !== 0, Un || E) {
      if (o = Qn, o !== null) {
        switch (m & -m) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (o.suspendedLanes | m) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, pa(n, c), Nr(o, n, c, -1));
      }
      return Id(), o = Dd(Error(M(421))), xs(n, r, m, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = vy.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, qr = gi(c.nextSibling), Gr = r, fn = !0, Oa = null, n !== null && (Nn[ka++] = Ri, Nn[ka++] = Ti, Nn[ka++] = fa, Ri = n.id, Ti = n.overflow, fa = r), r = zd(r, o.children), r.flags |= 4096, r);
  }
  function Ud(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), Sd(n.return, r, l);
  }
  function Or(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function xi(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (lr(n, r, o.children, l), o = yn.current, o & 2) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Ud(n, l, r);
        else if (n.tag === 19) Ud(n, l, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      o &= 1;
    }
    if (_e(yn, o), !(r.mode & 1)) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && Lc(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), Or(r, !1, c, l, d);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && Lc(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        Or(r, !0, l, null, d);
        break;
      case "together":
        Or(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Ma(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Na(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), Di |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(M(153));
    if (r.child !== null) {
      for (n = r.child, l = jl(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = jl(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function _s(n, r, l) {
    switch (r.tag) {
      case 3:
        go(r), Ol();
        break;
      case 5:
        Uv(r);
        break;
      case 1:
        Mn(r.type) && Xn(r);
        break;
      case 4:
        wd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        _e(da, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (_e(yn, yn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? Jc(n, r, l) : (_e(yn, yn.current & 1), n = Na(n, r, l), n !== null ? n.sibling : null);
        _e(yn, yn.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o) return xi(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), _e(yn, yn.current), o) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Ts(n, r, l);
    }
    return Na(n, r, l);
  }
  var za, An, Yv, Qv;
  za = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6) n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r) return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, An = function() {
  }, Yv = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, gu(wi.current);
      var d = null;
      switch (l) {
        case "input":
          c = tr(n, c), o = tr(n, o), d = [];
          break;
        case "select":
          c = ne({}, c, { value: void 0 }), o = ne({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Bn(n, c), o = Bn(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = wl);
      }
      ln(l, o);
      var m;
      l = null;
      for (U in c) if (!o.hasOwnProperty(U) && c.hasOwnProperty(U) && c[U] != null) if (U === "style") {
        var E = c[U];
        for (m in E) E.hasOwnProperty(m) && (l || (l = {}), l[m] = "");
      } else U !== "dangerouslySetInnerHTML" && U !== "children" && U !== "suppressContentEditableWarning" && U !== "suppressHydrationWarning" && U !== "autoFocus" && (Fe.hasOwnProperty(U) ? d || (d = []) : (d = d || []).push(U, null));
      for (U in o) {
        var T = o[U];
        if (E = c != null ? c[U] : void 0, o.hasOwnProperty(U) && T !== E && (T != null || E != null)) if (U === "style") if (E) {
          for (m in E) !E.hasOwnProperty(m) || T && T.hasOwnProperty(m) || (l || (l = {}), l[m] = "");
          for (m in T) T.hasOwnProperty(m) && E[m] !== T[m] && (l || (l = {}), l[m] = T[m]);
        } else l || (d || (d = []), d.push(
          U,
          l
        )), l = T;
        else U === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, E = E ? E.__html : void 0, T != null && E !== T && (d = d || []).push(U, T)) : U === "children" ? typeof T != "string" && typeof T != "number" || (d = d || []).push(U, "" + T) : U !== "suppressContentEditableWarning" && U !== "suppressHydrationWarning" && (Fe.hasOwnProperty(U) ? (T != null && U === "onScroll" && Ht("scroll", n), d || E === T || (d = [])) : (d = d || []).push(U, T));
      }
      l && (d = d || []).push("style", l);
      var U = d;
      (r.updateQueue = U) && (r.flags |= 4);
    }
  }, Qv = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function bs(n, r) {
    if (!fn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var o = null; l !== null; ) l.alternate !== null && (o = l), l = l.sibling;
        o === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : o.sibling = null;
    }
  }
  function Zn(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function Wv(n, r, l) {
    var o = r.pendingProps;
    switch (_c(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Zn(r), null;
      case 1:
        return Mn(r.type) && po(), Zn(r), null;
      case 3:
        return o = r.stateNode, Su(), nn(In), nn(Sn), ke(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (bc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Oa !== null && (Ou(Oa), Oa = null))), An(n, r), Zn(r), null;
      case 5:
        Oc(r);
        var c = gu(ds.current);
        if (l = r.type, n !== null && r.stateNode != null) Yv(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(M(166));
            return Zn(r), null;
          }
          if (n = gu(wi.current), bc(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[Si] = r, o[is] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                Ht("cancel", o), Ht("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Ht("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < ns.length; c++) Ht(ns[c], o);
                break;
              case "source":
                Ht("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Ht(
                  "error",
                  o
                ), Ht("load", o);
                break;
              case "details":
                Ht("toggle", o);
                break;
              case "input":
                Pn(o, d), Ht("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, Ht("invalid", o);
                break;
              case "textarea":
                yr(o, d), Ht("invalid", o);
            }
            ln(l, d), c = null;
            for (var m in d) if (d.hasOwnProperty(m)) {
              var E = d[m];
              m === "children" ? typeof E == "string" ? o.textContent !== E && (d.suppressHydrationWarning !== !0 && Sc(o.textContent, E, n), c = ["children", E]) : typeof E == "number" && o.textContent !== "" + E && (d.suppressHydrationWarning !== !0 && Sc(
                o.textContent,
                E,
                n
              ), c = ["children", "" + E]) : Fe.hasOwnProperty(m) && E != null && m === "onScroll" && Ht("scroll", o);
            }
            switch (l) {
              case "input":
                kn(o), oi(o, d, !0);
                break;
              case "textarea":
                kn(o), On(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = wl);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            m = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = gr(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = m.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = m.createElement(l, { is: o.is }) : (n = m.createElement(l), l === "select" && (m = n, o.multiple ? m.multiple = !0 : o.size && (m.size = o.size))) : n = m.createElementNS(n, l), n[Si] = r, n[is] = o, za(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (m = qn(l, o), l) {
                case "dialog":
                  Ht("cancel", n), Ht("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Ht("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < ns.length; c++) Ht(ns[c], n);
                  c = o;
                  break;
                case "source":
                  Ht("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Ht(
                    "error",
                    n
                  ), Ht("load", n), c = o;
                  break;
                case "details":
                  Ht("toggle", n), c = o;
                  break;
                case "input":
                  Pn(n, o), c = tr(n, o), Ht("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = ne({}, o, { value: void 0 }), Ht("invalid", n);
                  break;
                case "textarea":
                  yr(n, o), c = Bn(n, o), Ht("invalid", n);
                  break;
                default:
                  c = o;
              }
              ln(l, c), E = c;
              for (d in E) if (E.hasOwnProperty(d)) {
                var T = E[d];
                d === "style" ? Zt(n, T) : d === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, T != null && si(n, T)) : d === "children" ? typeof T == "string" ? (l !== "textarea" || T !== "") && ee(n, T) : typeof T == "number" && ee(n, "" + T) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Fe.hasOwnProperty(d) ? T != null && d === "onScroll" && Ht("scroll", n) : T != null && Ge(n, d, T, m));
              }
              switch (l) {
                case "input":
                  kn(n), oi(n, o, !1);
                  break;
                case "textarea":
                  kn(n), On(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + rt(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? Cn(n, !!o.multiple, d, !1) : o.defaultValue != null && Cn(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = wl);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return Zn(r), null;
      case 6:
        if (n && r.stateNode != null) Qv(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(M(166));
          if (l = gu(ds.current), gu(wi.current), bc(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Si] = r, (d = o.nodeValue !== l) && (n = Gr, n !== null)) switch (n.tag) {
              case 3:
                Sc(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Sc(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Si] = r, r.stateNode = o;
        }
        return Zn(r), null;
      case 13:
        if (nn(yn), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (fn && qr !== null && r.mode & 1 && !(r.flags & 128)) os(), Ol(), r.flags |= 98560, d = !1;
          else if (d = bc(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(M(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(M(317));
              d[Si] = r;
            } else Ol(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            Zn(r), d = !1;
          } else Oa !== null && (Ou(Oa), Oa = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || yn.current & 1 ? _n === 0 && (_n = 3) : Id())), r.updateQueue !== null && (r.flags |= 4), Zn(r), null);
      case 4:
        return Su(), An(n, r), n === null && uo(r.stateNode.containerInfo), Zn(r), null;
      case 10:
        return gd(r.type._context), Zn(r), null;
      case 17:
        return Mn(r.type) && po(), Zn(r), null;
      case 19:
        if (nn(yn), d = r.memoizedState, d === null) return Zn(r), null;
        if (o = (r.flags & 128) !== 0, m = d.rendering, m === null) if (o) bs(d, !1);
        else {
          if (_n !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (m = Lc(n), m !== null) {
              for (r.flags |= 128, bs(d, !1), o = m.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) d = l, n = o, d.flags &= 14680066, m = d.alternate, m === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = m.childLanes, d.lanes = m.lanes, d.child = m.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = m.memoizedProps, d.memoizedState = m.memoizedState, d.updateQueue = m.updateQueue, d.type = m.type, n = m.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return _e(yn, yn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && Ke() > Ro && (r.flags |= 128, o = !0, bs(d, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = Lc(m), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), bs(d, !0), d.tail === null && d.tailMode === "hidden" && !m.alternate && !fn) return Zn(r), null;
          } else 2 * Ke() - d.renderingStartTime > Ro && l !== 1073741824 && (r.flags |= 128, o = !0, bs(d, !1), r.lanes = 4194304);
          d.isBackwards ? (m.sibling = r.child, r.child = m) : (l = d.last, l !== null ? l.sibling = m : r.child = m, d.last = m);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = Ke(), r.sibling = null, l = yn.current, _e(yn, o ? l & 1 | 2 : l & 1), r) : (Zn(r), null);
      case 22:
      case 23:
        return $d(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? ha & 1073741824 && (Zn(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : Zn(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(M(156, r.tag));
  }
  function ef(n, r) {
    switch (_c(r), r.tag) {
      case 1:
        return Mn(r.type) && po(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return Su(), nn(In), nn(Sn), ke(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Oc(r), null;
      case 13:
        if (nn(yn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(M(340));
          Ol();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return nn(yn), null;
      case 4:
        return Su(), null;
      case 10:
        return gd(r.type._context), null;
      case 22:
      case 23:
        return $d(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ds = !1, Rr = !1, uy = typeof WeakSet == "function" ? WeakSet : Set, he = null;
  function So(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      dn(n, r, o);
    }
    else l.current = null;
  }
  function tf(n, r, l) {
    try {
      l();
    } catch (o) {
      dn(n, r, o);
    }
  }
  var Gv = !1;
  function qv(n, r) {
    if (as = xa, n = es(), fc(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var o = l.getSelection && l.getSelection();
        if (o && o.rangeCount !== 0) {
          l = o.anchorNode;
          var c = o.anchorOffset, d = o.focusNode;
          o = o.focusOffset;
          try {
            l.nodeType, d.nodeType;
          } catch {
            l = null;
            break e;
          }
          var m = 0, E = -1, T = -1, U = 0, W = 0, q = n, Q = null;
          t: for (; ; ) {
            for (var de; q !== l || c !== 0 && q.nodeType !== 3 || (E = m + c), q !== d || o !== 0 && q.nodeType !== 3 || (T = m + o), q.nodeType === 3 && (m += q.nodeValue.length), (de = q.firstChild) !== null; )
              Q = q, q = de;
            for (; ; ) {
              if (q === n) break t;
              if (Q === l && ++U === c && (E = m), Q === d && ++W === o && (T = m), (de = q.nextSibling) !== null) break;
              q = Q, Q = q.parentNode;
            }
            q = de;
          }
          l = E === -1 || T === -1 ? null : { start: E, end: T };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (du = { focusedElem: n, selectionRange: l }, xa = !1, he = r; he !== null; ) if (r = he, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, he = n;
    else for (; he !== null; ) {
      r = he;
      try {
        var ge = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (ge !== null) {
              var Ce = ge.memoizedProps, bn = ge.memoizedState, D = r.stateNode, x = D.getSnapshotBeforeUpdate(r.elementType === r.type ? Ce : ni(r.type, Ce), bn);
              D.__reactInternalSnapshotBeforeUpdate = x;
            }
            break;
          case 3:
            var L = r.stateNode.containerInfo;
            L.nodeType === 1 ? L.textContent = "" : L.nodeType === 9 && L.documentElement && L.removeChild(L.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(M(163));
        }
      } catch (G) {
        dn(r, r.return, G);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, he = n;
        break;
      }
      he = r.return;
    }
    return ge = Gv, Gv = !1, ge;
  }
  function ks(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && tf(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Os(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var o = l.create;
          l.destroy = o();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Ad(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function nf(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, nf(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Si], delete r[is], delete r[ls], delete r[fo], delete r[iy])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Ls(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Ki(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Ls(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function _i(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = wl));
    else if (o !== 4 && (n = n.child, n !== null)) for (_i(n, r, l), n = n.sibling; n !== null; ) _i(n, r, l), n = n.sibling;
  }
  function bi(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (bi(n, r, l), n = n.sibling; n !== null; ) bi(n, r, l), n = n.sibling;
  }
  var xn = null, Lr = !1;
  function Mr(n, r, l) {
    for (l = l.child; l !== null; ) Xv(n, r, l), l = l.sibling;
  }
  function Xv(n, r, l) {
    if (Ir && typeof Ir.onCommitFiberUnmount == "function") try {
      Ir.onCommitFiberUnmount(hl, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        Rr || So(l, r);
      case 6:
        var o = xn, c = Lr;
        xn = null, Mr(n, r, l), xn = o, Lr = c, xn !== null && (Lr ? (n = xn, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : xn.removeChild(l.stateNode));
        break;
      case 18:
        xn !== null && (Lr ? (n = xn, l = l.stateNode, n.nodeType === 8 ? co(n.parentNode, l) : n.nodeType === 1 && co(n, l), Ka(n)) : co(xn, l.stateNode));
        break;
      case 4:
        o = xn, c = Lr, xn = l.stateNode.containerInfo, Lr = !0, Mr(n, r, l), xn = o, Lr = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Rr && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, m = d.destroy;
            d = d.tag, m !== void 0 && (d & 2 || d & 4) && tf(l, r, m), c = c.next;
          } while (c !== o);
        }
        Mr(n, r, l);
        break;
      case 1:
        if (!Rr && (So(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (E) {
          dn(l, r, E);
        }
        Mr(n, r, l);
        break;
      case 21:
        Mr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (Rr = (o = Rr) || l.memoizedState !== null, Mr(n, r, l), Rr = o) : Mr(n, r, l);
        break;
      default:
        Mr(n, r, l);
    }
  }
  function Kv(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new uy()), r.forEach(function(o) {
        var c = lh.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function ri(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, m = r, E = m;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 5:
              xn = E.stateNode, Lr = !1;
              break e;
            case 3:
              xn = E.stateNode.containerInfo, Lr = !0;
              break e;
            case 4:
              xn = E.stateNode.containerInfo, Lr = !0;
              break e;
          }
          E = E.return;
        }
        if (xn === null) throw Error(M(160));
        Xv(d, m, c), xn = null, Lr = !1;
        var T = c.alternate;
        T !== null && (T.return = null), c.return = null;
      } catch (U) {
        dn(c, r, U);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) Fd(r, n), r = r.sibling;
  }
  function Fd(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ri(r, n), Jr(n), o & 4) {
          try {
            ks(3, n, n.return), Os(3, n);
          } catch (Ce) {
            dn(n, n.return, Ce);
          }
          try {
            ks(5, n, n.return);
          } catch (Ce) {
            dn(n, n.return, Ce);
          }
        }
        break;
      case 1:
        ri(r, n), Jr(n), o & 512 && l !== null && So(l, l.return);
        break;
      case 5:
        if (ri(r, n), Jr(n), o & 512 && l !== null && So(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            ee(c, "");
          } catch (Ce) {
            dn(n, n.return, Ce);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, m = l !== null ? l.memoizedProps : d, E = n.type, T = n.updateQueue;
          if (n.updateQueue = null, T !== null) try {
            E === "input" && d.type === "radio" && d.name != null && Vn(c, d), qn(E, m);
            var U = qn(E, d);
            for (m = 0; m < T.length; m += 2) {
              var W = T[m], q = T[m + 1];
              W === "style" ? Zt(c, q) : W === "dangerouslySetInnerHTML" ? si(c, q) : W === "children" ? ee(c, q) : Ge(c, W, q, U);
            }
            switch (E) {
              case "input":
                $r(c, d);
                break;
              case "textarea":
                $a(c, d);
                break;
              case "select":
                var Q = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var de = d.value;
                de != null ? Cn(c, !!d.multiple, de, !1) : Q !== !!d.multiple && (d.defaultValue != null ? Cn(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Cn(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[is] = d;
          } catch (Ce) {
            dn(n, n.return, Ce);
          }
        }
        break;
      case 6:
        if (ri(r, n), Jr(n), o & 4) {
          if (n.stateNode === null) throw Error(M(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (Ce) {
            dn(n, n.return, Ce);
          }
        }
        break;
      case 3:
        if (ri(r, n), Jr(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          Ka(r.containerInfo);
        } catch (Ce) {
          dn(n, n.return, Ce);
        }
        break;
      case 4:
        ri(r, n), Jr(n);
        break;
      case 13:
        ri(r, n), Jr(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Pd = Ke())), o & 4 && Kv(n);
        break;
      case 22:
        if (W = l !== null && l.memoizedState !== null, n.mode & 1 ? (Rr = (U = Rr) || W, ri(r, n), Rr = U) : ri(r, n), Jr(n), o & 8192) {
          if (U = n.memoizedState !== null, (n.stateNode.isHidden = U) && !W && n.mode & 1) for (he = n, W = n.child; W !== null; ) {
            for (q = he = W; he !== null; ) {
              switch (Q = he, de = Q.child, Q.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ks(4, Q, Q.return);
                  break;
                case 1:
                  So(Q, Q.return);
                  var ge = Q.stateNode;
                  if (typeof ge.componentWillUnmount == "function") {
                    o = Q, l = Q.return;
                    try {
                      r = o, ge.props = r.memoizedProps, ge.state = r.memoizedState, ge.componentWillUnmount();
                    } catch (Ce) {
                      dn(o, l, Ce);
                    }
                  }
                  break;
                case 5:
                  So(Q, Q.return);
                  break;
                case 22:
                  if (Q.memoizedState !== null) {
                    Ms(q);
                    continue;
                  }
              }
              de !== null ? (de.return = Q, he = de) : Ms(q);
            }
            W = W.sibling;
          }
          e: for (W = null, q = n; ; ) {
            if (q.tag === 5) {
              if (W === null) {
                W = q;
                try {
                  c = q.stateNode, U ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (E = q.stateNode, T = q.memoizedProps.style, m = T != null && T.hasOwnProperty("display") ? T.display : null, E.style.display = Ft("display", m));
                } catch (Ce) {
                  dn(n, n.return, Ce);
                }
              }
            } else if (q.tag === 6) {
              if (W === null) try {
                q.stateNode.nodeValue = U ? "" : q.memoizedProps;
              } catch (Ce) {
                dn(n, n.return, Ce);
              }
            } else if ((q.tag !== 22 && q.tag !== 23 || q.memoizedState === null || q === n) && q.child !== null) {
              q.child.return = q, q = q.child;
              continue;
            }
            if (q === n) break e;
            for (; q.sibling === null; ) {
              if (q.return === null || q.return === n) break e;
              W === q && (W = null), q = q.return;
            }
            W === q && (W = null), q.sibling.return = q.return, q = q.sibling;
          }
        }
        break;
      case 19:
        ri(r, n), Jr(n), o & 4 && Kv(n);
        break;
      case 21:
        break;
      default:
        ri(
          r,
          n
        ), Jr(n);
    }
  }
  function Jr(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Ls(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(M(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (ee(c, ""), o.flags &= -33);
            var d = Ki(n);
            bi(n, d, c);
            break;
          case 3:
          case 4:
            var m = o.stateNode.containerInfo, E = Ki(n);
            _i(n, E, m);
            break;
          default:
            throw Error(M(161));
        }
      } catch (T) {
        dn(n, n.return, T);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function oy(n, r, l) {
    he = n, jd(n);
  }
  function jd(n, r, l) {
    for (var o = (n.mode & 1) !== 0; he !== null; ) {
      var c = he, d = c.child;
      if (c.tag === 22 && o) {
        var m = c.memoizedState !== null || Ds;
        if (!m) {
          var E = c.alternate, T = E !== null && E.memoizedState !== null || Rr;
          E = Ds;
          var U = Rr;
          if (Ds = m, (Rr = T) && !U) for (he = c; he !== null; ) m = he, T = m.child, m.tag === 22 && m.memoizedState !== null ? Hd(c) : T !== null ? (T.return = m, he = T) : Hd(c);
          for (; d !== null; ) he = d, jd(d), d = d.sibling;
          he = c, Ds = E, Rr = U;
        }
        Zv(n);
      } else c.subtreeFlags & 8772 && d !== null ? (d.return = c, he = d) : Zv(n);
    }
  }
  function Zv(n) {
    for (; he !== null; ) {
      var r = he;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              Rr || Os(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !Rr) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : ni(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && Td(r, d, o);
              break;
            case 3:
              var m = r.updateQueue;
              if (m !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                Td(r, m, l);
              }
              break;
            case 5:
              var E = r.stateNode;
              if (l === null && r.flags & 4) {
                l = E;
                var T = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    T.autoFocus && l.focus();
                    break;
                  case "img":
                    T.src && (l.src = T.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (r.memoizedState === null) {
                var U = r.alternate;
                if (U !== null) {
                  var W = U.memoizedState;
                  if (W !== null) {
                    var q = W.dehydrated;
                    q !== null && Ka(q);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(M(163));
          }
          Rr || r.flags & 512 && Ad(r);
        } catch (Q) {
          dn(r, r.return, Q);
        }
      }
      if (r === n) {
        he = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, he = l;
        break;
      }
      he = r.return;
    }
  }
  function Ms(n) {
    for (; he !== null; ) {
      var r = he;
      if (r === n) {
        he = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, he = l;
        break;
      }
      he = r.return;
    }
  }
  function Hd(n) {
    for (; he !== null; ) {
      var r = he;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Os(4, r);
            } catch (T) {
              dn(r, l, T);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (T) {
                dn(r, c, T);
              }
            }
            var d = r.return;
            try {
              Ad(r);
            } catch (T) {
              dn(r, d, T);
            }
            break;
          case 5:
            var m = r.return;
            try {
              Ad(r);
            } catch (T) {
              dn(r, m, T);
            }
        }
      } catch (T) {
        dn(r, r.return, T);
      }
      if (r === n) {
        he = null;
        break;
      }
      var E = r.sibling;
      if (E !== null) {
        E.return = r.return, he = E;
        break;
      }
      he = r.return;
    }
  }
  var sy = Math.ceil, Ul = mt.ReactCurrentDispatcher, Du = mt.ReactCurrentOwner, ur = mt.ReactCurrentBatchConfig, Ct = 0, Qn = null, Fn = null, or = 0, ha = 0, Eo = Da(0), _n = 0, Ns = null, Di = 0, Co = 0, rf = 0, zs = null, ea = null, Pd = 0, Ro = 1 / 0, ma = null, To = !1, ku = null, Al = null, af = !1, Zi = null, Us = 0, Fl = 0, wo = null, As = -1, Tr = 0;
  function jn() {
    return Ct & 6 ? Ke() : As !== -1 ? As : As = Ke();
  }
  function ki(n) {
    return n.mode & 1 ? Ct & 2 && or !== 0 ? or & -or : ly.transition !== null ? (Tr === 0 && (Tr = qu()), Tr) : (n = Ot, n !== 0 || (n = window.event, n = n === void 0 ? 16 : no(n.type)), n) : 1;
  }
  function Nr(n, r, l, o) {
    if (50 < Fl) throw Fl = 0, wo = null, Error(M(185));
    Hi(n, l, o), (!(Ct & 2) || n !== Qn) && (n === Qn && (!(Ct & 2) && (Co |= l), _n === 4 && ai(n, or)), ta(n, o), l === 1 && Ct === 0 && !(r.mode & 1) && (Ro = Ke() + 500, vo && Ci()));
  }
  function ta(n, r) {
    var l = n.callbackNode;
    ru(n, r);
    var o = Xa(n, n === Qn ? or : 0);
    if (o === 0) l !== null && rr(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && rr(l), r === 1) n.tag === 0 ? _l(Vd.bind(null, n)) : wc(Vd.bind(null, n)), so(function() {
        !(Ct & 6) && Ci();
      }), l = null;
      else {
        switch (Ku(o)) {
          case 1:
            l = Ga;
            break;
          case 4:
            l = tu;
            break;
          case 16:
            l = nu;
            break;
          case 536870912:
            l = Qu;
            break;
          default:
            l = nu;
        }
        l = oh(l, lf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function lf(n, r) {
    if (As = -1, Tr = 0, Ct & 6) throw Error(M(327));
    var l = n.callbackNode;
    if (xo() && n.callbackNode !== l) return null;
    var o = Xa(n, n === Qn ? or : 0);
    if (o === 0) return null;
    if (o & 30 || o & n.expiredLanes || r) r = uf(n, o);
    else {
      r = o;
      var c = Ct;
      Ct |= 2;
      var d = eh();
      (Qn !== n || or !== r) && (ma = null, Ro = Ke() + 500, Ji(n, r));
      do
        try {
          th();
          break;
        } catch (E) {
          Jv(n, E);
        }
      while (!0);
      yd(), Ul.current = d, Ct = c, Fn !== null ? r = 0 : (Qn = null, or = 0, r = _n);
    }
    if (r !== 0) {
      if (r === 2 && (c = yl(n), c !== 0 && (o = c, r = Fs(n, c))), r === 1) throw l = Ns, Ji(n, 0), ai(n, o), ta(n, Ke()), l;
      if (r === 6) ai(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !cy(c) && (r = uf(n, o), r === 2 && (d = yl(n), d !== 0 && (o = d, r = Fs(n, d))), r === 1)) throw l = Ns, Ji(n, 0), ai(n, o), ta(n, Ke()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(M(345));
          case 2:
            Mu(n, ea, ma);
            break;
          case 3:
            if (ai(n, o), (o & 130023424) === o && (r = Pd + 500 - Ke(), 10 < r)) {
              if (Xa(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                jn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = Cc(Mu.bind(null, n, ea, ma), r);
              break;
            }
            Mu(n, ea, ma);
            break;
          case 4:
            if (ai(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var m = 31 - br(o);
              d = 1 << m, m = r[m], m > c && (c = m), o &= ~d;
            }
            if (o = c, o = Ke() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * sy(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = Cc(Mu.bind(null, n, ea, ma), o);
              break;
            }
            Mu(n, ea, ma);
            break;
          case 5:
            Mu(n, ea, ma);
            break;
          default:
            throw Error(M(329));
        }
      }
    }
    return ta(n, Ke()), n.callbackNode === l ? lf.bind(null, n) : null;
  }
  function Fs(n, r) {
    var l = zs;
    return n.current.memoizedState.isDehydrated && (Ji(n, r).flags |= 256), n = uf(n, r), n !== 2 && (r = ea, ea = l, r !== null && Ou(r)), n;
  }
  function Ou(n) {
    ea === null ? ea = n : ea.push.apply(ea, n);
  }
  function cy(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!Ja(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null) l.return = r, r = l;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function ai(n, r) {
    for (r &= ~rf, r &= ~Co, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - br(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Vd(n) {
    if (Ct & 6) throw Error(M(327));
    xo();
    var r = Xa(n, 0);
    if (!(r & 1)) return ta(n, Ke()), null;
    var l = uf(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = yl(n);
      o !== 0 && (r = o, l = Fs(n, o));
    }
    if (l === 1) throw l = Ns, Ji(n, 0), ai(n, r), ta(n, Ke()), l;
    if (l === 6) throw Error(M(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Mu(n, ea, ma), ta(n, Ke()), null;
  }
  function Bd(n, r) {
    var l = Ct;
    Ct |= 1;
    try {
      return n(r);
    } finally {
      Ct = l, Ct === 0 && (Ro = Ke() + 500, vo && Ci());
    }
  }
  function Lu(n) {
    Zi !== null && Zi.tag === 0 && !(Ct & 6) && xo();
    var r = Ct;
    Ct |= 1;
    var l = ur.transition, o = Ot;
    try {
      if (ur.transition = null, Ot = 1, n) return n();
    } finally {
      Ot = o, ur.transition = l, Ct = r, !(Ct & 6) && Ci();
    }
  }
  function $d() {
    ha = Eo.current, nn(Eo);
  }
  function Ji(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, dd(l)), Fn !== null) for (l = Fn.return; l !== null; ) {
      var o = l;
      switch (_c(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && po();
          break;
        case 3:
          Su(), nn(In), nn(Sn), ke();
          break;
        case 5:
          Oc(o);
          break;
        case 4:
          Su();
          break;
        case 13:
          nn(yn);
          break;
        case 19:
          nn(yn);
          break;
        case 10:
          gd(o.type._context);
          break;
        case 22:
        case 23:
          $d();
      }
      l = l.return;
    }
    if (Qn = n, Fn = n = jl(n.current, null), or = ha = r, _n = 0, Ns = null, rf = Co = Di = 0, ea = zs = null, yu !== null) {
      for (r = 0; r < yu.length; r++) if (l = yu[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, d = l.pending;
        if (d !== null) {
          var m = d.next;
          d.next = c, o.next = m;
        }
        l.pending = o;
      }
      yu = null;
    }
    return n;
  }
  function Jv(n, r) {
    do {
      var l = Fn;
      try {
        if (yd(), ct.current = xu, Mc) {
          for (var o = Mt.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Mc = !1;
        }
        if (Wt = 0, Kn = zn = Mt = null, vs = !1, Eu = 0, Du.current = null, l === null || l.return === null) {
          _n = 1, Ns = r, Fn = null;
          break;
        }
        e: {
          var d = n, m = l.return, E = l, T = r;
          if (r = or, E.flags |= 32768, T !== null && typeof T == "object" && typeof T.then == "function") {
            var U = T, W = E, q = W.tag;
            if (!(W.mode & 1) && (q === 0 || q === 11 || q === 15)) {
              var Q = W.alternate;
              Q ? (W.updateQueue = Q.updateQueue, W.memoizedState = Q.memoizedState, W.lanes = Q.lanes) : (W.updateQueue = null, W.memoizedState = null);
            }
            var de = Pv(m);
            if (de !== null) {
              de.flags &= -257, zl(de, m, E, d, r), de.mode & 1 && Ld(d, U, r), r = de, T = U;
              var ge = r.updateQueue;
              if (ge === null) {
                var Ce = /* @__PURE__ */ new Set();
                Ce.add(T), r.updateQueue = Ce;
              } else ge.add(T);
              break e;
            } else {
              if (!(r & 1)) {
                Ld(d, U, r), Id();
                break e;
              }
              T = Error(M(426));
            }
          } else if (fn && E.mode & 1) {
            var bn = Pv(m);
            if (bn !== null) {
              !(bn.flags & 65536) && (bn.flags |= 256), zl(bn, m, E, d, r), Gi(_u(T, E));
              break e;
            }
          }
          d = T = _u(T, E), _n !== 4 && (_n = 2), zs === null ? zs = [d] : zs.push(d), d = m;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var D = Hv(d, T, r);
                zv(d, D);
                break e;
              case 1:
                E = T;
                var x = d.type, L = d.stateNode;
                if (!(d.flags & 128) && (typeof x.getDerivedStateFromError == "function" || L !== null && typeof L.componentDidCatch == "function" && (Al === null || !Al.has(L)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var G = Od(d, E, r);
                  zv(d, G);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        rh(l);
      } catch (Se) {
        r = Se, Fn === l && l !== null && (Fn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function eh() {
    var n = Ul.current;
    return Ul.current = xu, n === null ? xu : n;
  }
  function Id() {
    (_n === 0 || _n === 3 || _n === 2) && (_n = 4), Qn === null || !(Di & 268435455) && !(Co & 268435455) || ai(Qn, or);
  }
  function uf(n, r) {
    var l = Ct;
    Ct |= 2;
    var o = eh();
    (Qn !== n || or !== r) && (ma = null, Ji(n, r));
    do
      try {
        fy();
        break;
      } catch (c) {
        Jv(n, c);
      }
    while (!0);
    if (yd(), Ct = l, Ul.current = o, Fn !== null) throw Error(M(261));
    return Qn = null, or = 0, _n;
  }
  function fy() {
    for (; Fn !== null; ) nh(Fn);
  }
  function th() {
    for (; Fn !== null && !Qa(); ) nh(Fn);
  }
  function nh(n) {
    var r = uh(n.alternate, n, ha);
    n.memoizedProps = n.pendingProps, r === null ? rh(n) : Fn = r, Du.current = null;
  }
  function rh(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = ef(l, r), l !== null) {
          l.flags &= 32767, Fn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          _n = 6, Fn = null;
          return;
        }
      } else if (l = Wv(l, r, ha), l !== null) {
        Fn = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        Fn = r;
        return;
      }
      Fn = r = n;
    } while (r !== null);
    _n === 0 && (_n = 5);
  }
  function Mu(n, r, l) {
    var o = Ot, c = ur.transition;
    try {
      ur.transition = null, Ot = 1, dy(n, r, l, o);
    } finally {
      ur.transition = c, Ot = o;
    }
    return null;
  }
  function dy(n, r, l, o) {
    do
      xo();
    while (Zi !== null);
    if (Ct & 6) throw Error(M(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(M(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (Yf(n, d), n === Qn && (Fn = Qn = null, or = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || af || (af = !0, oh(nu, function() {
      return xo(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = ur.transition, ur.transition = null;
      var m = Ot;
      Ot = 1;
      var E = Ct;
      Ct |= 4, Du.current = null, qv(n, l), Fd(l, n), io(du), xa = !!as, du = as = null, n.current = l, oy(l), Wa(), Ct = E, Ot = m, ur.transition = d;
    } else n.current = l;
    if (af && (af = !1, Zi = n, Us = c), d = n.pendingLanes, d === 0 && (Al = null), Io(l.stateNode), ta(n, Ke()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (To) throw To = !1, n = ku, ku = null, n;
    return Us & 1 && n.tag !== 0 && xo(), d = n.pendingLanes, d & 1 ? n === wo ? Fl++ : (Fl = 0, wo = n) : Fl = 0, Ci(), null;
  }
  function xo() {
    if (Zi !== null) {
      var n = Ku(Us), r = ur.transition, l = Ot;
      try {
        if (ur.transition = null, Ot = 16 > n ? 16 : n, Zi === null) var o = !1;
        else {
          if (n = Zi, Zi = null, Us = 0, Ct & 6) throw Error(M(331));
          var c = Ct;
          for (Ct |= 4, he = n.current; he !== null; ) {
            var d = he, m = d.child;
            if (he.flags & 16) {
              var E = d.deletions;
              if (E !== null) {
                for (var T = 0; T < E.length; T++) {
                  var U = E[T];
                  for (he = U; he !== null; ) {
                    var W = he;
                    switch (W.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ks(8, W, d);
                    }
                    var q = W.child;
                    if (q !== null) q.return = W, he = q;
                    else for (; he !== null; ) {
                      W = he;
                      var Q = W.sibling, de = W.return;
                      if (nf(W), W === U) {
                        he = null;
                        break;
                      }
                      if (Q !== null) {
                        Q.return = de, he = Q;
                        break;
                      }
                      he = de;
                    }
                  }
                }
                var ge = d.alternate;
                if (ge !== null) {
                  var Ce = ge.child;
                  if (Ce !== null) {
                    ge.child = null;
                    do {
                      var bn = Ce.sibling;
                      Ce.sibling = null, Ce = bn;
                    } while (Ce !== null);
                  }
                }
                he = d;
              }
            }
            if (d.subtreeFlags & 2064 && m !== null) m.return = d, he = m;
            else e: for (; he !== null; ) {
              if (d = he, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  ks(9, d, d.return);
              }
              var D = d.sibling;
              if (D !== null) {
                D.return = d.return, he = D;
                break e;
              }
              he = d.return;
            }
          }
          var x = n.current;
          for (he = x; he !== null; ) {
            m = he;
            var L = m.child;
            if (m.subtreeFlags & 2064 && L !== null) L.return = m, he = L;
            else e: for (m = x; he !== null; ) {
              if (E = he, E.flags & 2048) try {
                switch (E.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Os(9, E);
                }
              } catch (Se) {
                dn(E, E.return, Se);
              }
              if (E === m) {
                he = null;
                break e;
              }
              var G = E.sibling;
              if (G !== null) {
                G.return = E.return, he = G;
                break e;
              }
              he = E.return;
            }
          }
          if (Ct = c, Ci(), Ir && typeof Ir.onPostCommitFiberRoot == "function") try {
            Ir.onPostCommitFiberRoot(hl, n);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        Ot = l, ur.transition = r;
      }
    }
    return !1;
  }
  function ah(n, r, l) {
    r = _u(l, r), r = Hv(n, r, 1), n = Ll(n, r, 1), r = jn(), n !== null && (Hi(n, 1, r), ta(n, r));
  }
  function dn(n, r, l) {
    if (n.tag === 3) ah(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        ah(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Al === null || !Al.has(o))) {
          n = _u(l, n), n = Od(r, n, 1), r = Ll(r, n, 1), n = jn(), r !== null && (Hi(r, 1, n), ta(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function py(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = jn(), n.pingedLanes |= n.suspendedLanes & l, Qn === n && (or & l) === l && (_n === 4 || _n === 3 && (or & 130023424) === or && 500 > Ke() - Pd ? Ji(n, 0) : rf |= l), ta(n, r);
  }
  function ih(n, r) {
    r === 0 && (n.mode & 1 ? (r = ca, ca <<= 1, !(ca & 130023424) && (ca = 4194304)) : r = 1);
    var l = jn();
    n = pa(n, r), n !== null && (Hi(n, r, l), ta(n, l));
  }
  function vy(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), ih(n, l);
  }
  function lh(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var o = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        o = n.stateNode;
        break;
      default:
        throw Error(M(314));
    }
    o !== null && o.delete(r), ih(n, l);
  }
  var uh;
  uh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || In.current) Un = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return Un = !1, _s(n, r, l);
      Un = !!(n.flags & 131072);
    }
    else Un = !1, fn && r.flags & 1048576 && Ov(r, Wi, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        Ma(n, r), n = r.pendingProps;
        var c = Wr(r, Sn.current);
        mn(r, l), c = Ml(null, r, o, n, c, l);
        var d = ti();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Mn(o) ? (d = !0, Xn(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Rd(r), c.updater = qc, r.stateNode = c, c._reactInternals = r, Cs(r, o, n, l), r = ws(null, r, o, !0, d, l)) : (r.tag = 0, fn && d && xc(r), lr(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (Ma(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = my(o), n = ni(o, n), c) {
            case 0:
              r = Vv(null, r, o, n, l);
              break e;
            case 1:
              r = Bv(null, r, o, n, l);
              break e;
            case 11:
              r = Zr(null, r, o, n, l);
              break e;
            case 14:
              r = bu(null, r, o, ni(o.type, n), l);
              break e;
          }
          throw Error(M(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), Vv(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), Bv(n, r, o, c, l);
      case 3:
        e: {
          if (go(r), n === null) throw Error(M(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, Nv(n, r), ss(r, o, null, l);
          var m = r.memoizedState;
          if (o = m.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = _u(Error(M(423)), r), r = $v(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = _u(Error(M(424)), r), r = $v(n, r, o, l, c);
            break e;
          } else for (qr = gi(r.stateNode.containerInfo.firstChild), Gr = r, fn = !0, Oa = null, l = le(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Ol(), o === c) {
              r = Na(n, r, l);
              break e;
            }
            lr(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Uv(r), n === null && hd(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, m = c.children, Ec(o, c) ? m = null : d !== null && Ec(o, d) && (r.flags |= 32), Md(n, r), lr(n, r, m, l), r.child;
      case 6:
        return n === null && hd(r), null;
      case 13:
        return Jc(n, r, l);
      case 4:
        return wd(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = Tn(r, null, o, l) : lr(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), Zr(n, r, o, c, l);
      case 7:
        return lr(n, r, r.pendingProps, l), r.child;
      case 8:
        return lr(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return lr(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, m = c.value, _e(da, o._currentValue), o._currentValue = m, d !== null) if (Ja(d.value, m)) {
            if (d.children === c.children && !In.current) {
              r = Na(n, r, l);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var E = d.dependencies;
            if (E !== null) {
              m = d.child;
              for (var T = E.firstContext; T !== null; ) {
                if (T.context === o) {
                  if (d.tag === 1) {
                    T = qi(-1, l & -l), T.tag = 2;
                    var U = d.updateQueue;
                    if (U !== null) {
                      U = U.shared;
                      var W = U.pending;
                      W === null ? T.next = T : (T.next = W.next, W.next = T), U.pending = T;
                    }
                  }
                  d.lanes |= l, T = d.alternate, T !== null && (T.lanes |= l), Sd(
                    d.return,
                    l,
                    r
                  ), E.lanes |= l;
                  break;
                }
                T = T.next;
              }
            } else if (d.tag === 10) m = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (m = d.return, m === null) throw Error(M(341));
              m.lanes |= l, E = m.alternate, E !== null && (E.lanes |= l), Sd(m, l, r), m = d.sibling;
            } else m = d.child;
            if (m !== null) m.return = d;
            else for (m = d; m !== null; ) {
              if (m === r) {
                m = null;
                break;
              }
              if (d = m.sibling, d !== null) {
                d.return = m.return, m = d;
                break;
              }
              m = m.return;
            }
            d = m;
          }
          lr(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, mn(r, l), c = La(c), o = o(c), r.flags |= 1, lr(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = ni(o, r.pendingProps), c = ni(o.type, c), bu(n, r, o, c, l);
      case 15:
        return Ze(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), Ma(n, r), r.tag = 1, Mn(o) ? (n = !0, Xn(r)) : n = !1, mn(r, l), Xc(r, o, c), Cs(r, o, c, l), ws(null, r, o, !0, n, l);
      case 19:
        return xi(n, r, l);
      case 22:
        return Ts(n, r, l);
    }
    throw Error(M(156, r.tag));
  };
  function oh(n, r) {
    return un(n, r);
  }
  function hy(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ua(n, r, l, o) {
    return new hy(n, r, l, o);
  }
  function Yd(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function my(n) {
    if (typeof n == "function") return Yd(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === _t) return 11;
      if (n === bt) return 14;
    }
    return 2;
  }
  function jl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Ua(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function js(n, r, l, o, c, d) {
    var m = 2;
    if (o = n, typeof n == "function") Yd(n) && (m = 1);
    else if (typeof n == "string") m = 5;
    else e: switch (n) {
      case He:
        return el(l.children, c, d, r);
      case rn:
        m = 8, c |= 8;
        break;
      case jt:
        return n = Ua(12, l, r, c | 2), n.elementType = jt, n.lanes = d, n;
      case Oe:
        return n = Ua(13, l, r, c), n.elementType = Oe, n.lanes = d, n;
      case At:
        return n = Ua(19, l, r, c), n.elementType = At, n.lanes = d, n;
      case Re:
        return Hl(l, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Kt:
            m = 10;
            break e;
          case an:
            m = 9;
            break e;
          case _t:
            m = 11;
            break e;
          case bt:
            m = 14;
            break e;
          case kt:
            m = 16, o = null;
            break e;
        }
        throw Error(M(130, n == null ? n : typeof n, ""));
    }
    return r = Ua(m, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function el(n, r, l, o) {
    return n = Ua(7, n, o, r), n.lanes = l, n;
  }
  function Hl(n, r, l, o) {
    return n = Ua(22, n, o, r), n.elementType = Re, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Qd(n, r, l) {
    return n = Ua(6, n, null, r), n.lanes = l, n;
  }
  function of(n, r, l) {
    return r = Ua(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function sh(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Xu(0), this.expirationTimes = Xu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xu(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function sf(n, r, l, o, c, d, m, E, T) {
    return n = new sh(n, r, l, E, T), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Ua(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Rd(d), n;
  }
  function yy(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ft, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function Wd(n) {
    if (!n) return Er;
    n = n._reactInternals;
    e: {
      if (Xe(n) !== n || n.tag !== 1) throw Error(M(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Mn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(M(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (Mn(l)) return us(n, l, r);
    }
    return r;
  }
  function ch(n, r, l, o, c, d, m, E, T) {
    return n = sf(l, o, !0, n, c, d, m, E, T), n.context = Wd(null), l = n.current, o = jn(), c = ki(l), d = qi(o, c), d.callback = r ?? null, Ll(l, d, c), n.current.lanes = c, Hi(n, c, o), ta(n, o), n;
  }
  function cf(n, r, l, o) {
    var c = r.current, d = jn(), m = ki(c);
    return l = Wd(l), r.context === null ? r.context = l : r.pendingContext = l, r = qi(d, m), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Ll(c, r, m), n !== null && (Nr(n, c, m, d), kc(n, c, m)), m;
  }
  function ff(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function Gd(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function df(n, r) {
    Gd(n, r), (n = n.alternate) && Gd(n, r);
  }
  function fh() {
    return null;
  }
  var Nu = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function qd(n) {
    this._internalRoot = n;
  }
  pf.prototype.render = qd.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(M(409));
    cf(n, r, null, null);
  }, pf.prototype.unmount = qd.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Lu(function() {
        cf(null, n, null, null);
      }), r[Yi] = null;
    }
  };
  function pf(n) {
    this._internalRoot = n;
  }
  pf.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Ye();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < $n.length && r !== 0 && r < $n[l].priority; l++) ;
      $n.splice(l, 0, n), l === 0 && Wo(n);
    }
  };
  function Xd(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function vf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function dh() {
  }
  function gy(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var U = ff(m);
          d.call(U);
        };
      }
      var m = ch(r, o, n, 0, null, !1, !1, "", dh);
      return n._reactRootContainer = m, n[Yi] = m.current, uo(n.nodeType === 8 ? n.parentNode : n), Lu(), m;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var E = o;
      o = function() {
        var U = ff(T);
        E.call(U);
      };
    }
    var T = sf(n, 0, !1, null, null, !1, !1, "", dh);
    return n._reactRootContainer = T, n[Yi] = T.current, uo(n.nodeType === 8 ? n.parentNode : n), Lu(function() {
      cf(r, T, l, o);
    }), T;
  }
  function Hs(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var m = d;
      if (typeof c == "function") {
        var E = c;
        c = function() {
          var T = ff(m);
          E.call(T);
        };
      }
      cf(r, m, n, c);
    } else m = gy(l, r, n, c, o);
    return ff(m);
  }
  wt = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = qa(r.pendingLanes);
          l !== 0 && (Pi(r, l | 1), ta(r, Ke()), !(Ct & 6) && (Ro = Ke() + 500, Ci()));
        }
        break;
      case 13:
        Lu(function() {
          var o = pa(n, 1);
          if (o !== null) {
            var c = jn();
            Nr(o, n, 1, c);
          }
        }), df(n, 1);
    }
  }, Yo = function(n) {
    if (n.tag === 13) {
      var r = pa(n, 134217728);
      if (r !== null) {
        var l = jn();
        Nr(r, n, 134217728, l);
      }
      df(n, 134217728);
    }
  }, pi = function(n) {
    if (n.tag === 13) {
      var r = ki(n), l = pa(n, r);
      if (l !== null) {
        var o = jn();
        Nr(l, n, r, o);
      }
      df(n, r);
    }
  }, Ye = function() {
    return Ot;
  }, Zu = function(n, r) {
    var l = Ot;
    try {
      return Ot = n, r();
    } finally {
      Ot = l;
    }
  }, $t = function(n, r, l) {
    switch (r) {
      case "input":
        if ($r(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = hn(o);
              if (!c) throw Error(M(90));
              wr(o), $r(o, c);
            }
          }
        }
        break;
      case "textarea":
        $a(n, l);
        break;
      case "select":
        r = l.value, r != null && Cn(n, !!l.multiple, r, !1);
    }
  }, Jl = Bd, dl = Lu;
  var Sy = { usingClientEntryPoint: !1, Events: [De, ei, hn, ji, Zl, Bd] }, Ps = { findFiberByHostInstance: pu, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ph = { bundleType: Ps.bundleType, version: Ps.version, rendererPackageName: Ps.rendererPackageName, rendererConfig: Ps.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: mt.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Rn(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Ps.findFiberByHostInstance || fh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Pl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Pl.isDisabled && Pl.supportsFiber) try {
      hl = Pl.inject(ph), Ir = Pl;
    } catch {
    }
  }
  return Va.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Sy, Va.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Xd(r)) throw Error(M(200));
    return yy(n, r, null, l);
  }, Va.createRoot = function(n, r) {
    if (!Xd(n)) throw Error(M(299));
    var l = !1, o = "", c = Nu;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = sf(n, 1, !1, null, null, l, !1, o, c), n[Yi] = r.current, uo(n.nodeType === 8 ? n.parentNode : n), new qd(r);
  }, Va.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(M(188)) : (n = Object.keys(n).join(","), Error(M(268, n)));
    return n = Rn(r), n = n === null ? null : n.stateNode, n;
  }, Va.flushSync = function(n) {
    return Lu(n);
  }, Va.hydrate = function(n, r, l) {
    if (!vf(r)) throw Error(M(200));
    return Hs(null, n, r, !0, l);
  }, Va.hydrateRoot = function(n, r, l) {
    if (!Xd(n)) throw Error(M(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", m = Nu;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (m = l.onRecoverableError)), r = ch(r, null, n, 1, l ?? null, c, !1, d, m), n[Yi] = r.current, uo(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new pf(r);
  }, Va.render = function(n, r, l) {
    if (!vf(r)) throw Error(M(200));
    return Hs(null, n, r, !1, l);
  }, Va.unmountComponentAtNode = function(n) {
    if (!vf(n)) throw Error(M(40));
    return n._reactRootContainer ? (Lu(function() {
      Hs(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Yi] = null;
      });
    }), !0) : !1;
  }, Va.unstable_batchedUpdates = Bd, Va.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!vf(l)) throw Error(M(200));
    if (n == null || n._reactInternals === void 0) throw Error(M(38));
    return Hs(n, r, l, !1, o);
  }, Va.version = "18.3.1-next-f1338f8080-20240426", Va;
}
var Ba = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var iT;
function aD() {
  return iT || (iT = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var $ = Jp(), B = sT(), M = $.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Je = !1;
    function Fe(e) {
      Je = e;
    }
    function Ie(e) {
      if (!Je) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        St("warn", e, a);
      }
    }
    function S(e) {
      if (!Je) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        St("error", e, a);
      }
    }
    function St(e, t, a) {
      {
        var i = M.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var oe = 0, fe = 1, se = 2, K = 3, ye = 4, ie = 5, Be = 6, ht = 7, lt = 8, cn = 9, vt = 10, Ge = 11, mt = 12, be = 13, ft = 14, He = 15, rn = 16, jt = 17, Kt = 18, an = 19, _t = 21, Oe = 22, At = 23, bt = 24, kt = 25, Re = !0, J = !1, Te = !1, ne = !1, b = !1, P = !0, Pe = !0, Ae = !0, ut = !0, nt = /* @__PURE__ */ new Set(), et = {}, rt = {};
    function ot(e, t) {
      Vt(e, t), Vt(e + "Capture", t);
    }
    function Vt(e, t) {
      et[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), et[e] = t;
      {
        var a = e.toLowerCase();
        rt[a] = e, e === "onDoubleClick" && (rt.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        nt.add(t[i]);
    }
    var kn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", wr = Object.prototype.hasOwnProperty;
    function En(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function tr(e) {
      try {
        return Pn(e), !1;
      } catch {
        return !0;
      }
    }
    function Pn(e) {
      return "" + e;
    }
    function Vn(e, t) {
      if (tr(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function $r(e) {
      if (tr(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    function oi(e, t) {
      if (tr(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function ua(e, t) {
      if (tr(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function Gn(e) {
      if (tr(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    function Cn(e) {
      if (tr(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    var Bn = 0, yr = 1, $a = 2, On = 3, gr = 4, oa = 5, Ia = 6, si = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ee = si + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", we = new RegExp("^[" + si + "][" + ee + "]*$"), at = {}, Ft = {};
    function Zt(e) {
      return wr.call(Ft, e) ? !0 : wr.call(at, e) ? !1 : we.test(e) ? (Ft[e] = !0, !0) : (at[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function pn(e, t, a) {
      return t !== null ? t.type === Bn : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function ln(e, t, a, i) {
      if (a !== null && a.type === Bn)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function qn(e, t, a, i) {
      if (t === null || typeof t > "u" || ln(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case On:
            return !t;
          case gr:
            return t === !1;
          case oa:
            return isNaN(t);
          case Ia:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Jt(e) {
      return $t.hasOwnProperty(e) ? $t[e] : null;
    }
    function Bt(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === $a || t === On || t === gr, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var $t = {}, sa = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    sa.forEach(function(e) {
      $t[e] = new Bt(
        e,
        Bn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        $a,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        $a,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        On,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        On,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        gr,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        Ia,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        oa,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Sr = /[\-\:]([a-z])/g, Ra = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ra);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ra);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ra);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        yr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var ji = "xlinkHref";
    $t[ji] = new Bt(
      "xlinkHref",
      yr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        yr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var Zl = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Jl = !1;
    function dl(e) {
      !Jl && Zl.test(e) && (Jl = !0, S("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function pl(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        Vn(a, t), i.sanitizeURL && dl("" + a);
        var s = i.attributeName, f = null;
        if (i.type === gr) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : qn(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (qn(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === On)
            return a;
          f = e.getAttribute(s);
        }
        return qn(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function eu(e, t, a, i) {
      {
        if (!Zt(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Vn(a, t), u === "" + a ? a : u;
      }
    }
    function xr(e, t, a, i) {
      var u = Jt(t);
      if (!pn(t, u, i)) {
        if (qn(t, a, u, i) && (a = null), i || u === null) {
          if (Zt(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Vn(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === On ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var y = u.attributeName, g = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(y);
        else {
          var _ = u.type, w;
          _ === On || _ === gr && a === !0 ? w = "" : (Vn(a, y), w = "" + a, u.sanitizeURL && dl(w.toString())), g ? e.setAttributeNS(g, y, w) : e.setAttribute(y, w);
        }
      }
    }
    var _r = Symbol.for("react.element"), nr = Symbol.for("react.portal"), ci = Symbol.for("react.fragment"), Ya = Symbol.for("react.strict_mode"), fi = Symbol.for("react.profiler"), di = Symbol.for("react.provider"), R = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), ae = Symbol.for("react.suspense"), me = Symbol.for("react.suspense_list"), Xe = Symbol.for("react.memo"), Qe = Symbol.for("react.lazy"), dt = Symbol.for("react.scope"), st = Symbol.for("react.debug_trace_mode"), Rn = Symbol.for("react.offscreen"), en = Symbol.for("react.legacy_hidden"), un = Symbol.for("react.cache"), rr = Symbol.for("react.tracing_marker"), Qa = Symbol.iterator, Wa = "@@iterator";
    function Ke(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Qa && e[Qa] || e[Wa];
      return typeof t == "function" ? t : null;
    }
    var tt = Object.assign, Ga = 0, tu, nu, vl, Qu, hl, Ir, Io;
    function br() {
    }
    br.__reactDisabledLog = !0;
    function ic() {
      {
        if (Ga === 0) {
          tu = console.log, nu = console.info, vl = console.warn, Qu = console.error, hl = console.group, Ir = console.groupCollapsed, Io = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: br,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Ga++;
      }
    }
    function lc() {
      {
        if (Ga--, Ga === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: tt({}, e, {
              value: tu
            }),
            info: tt({}, e, {
              value: nu
            }),
            warn: tt({}, e, {
              value: vl
            }),
            error: tt({}, e, {
              value: Qu
            }),
            group: tt({}, e, {
              value: hl
            }),
            groupCollapsed: tt({}, e, {
              value: Ir
            }),
            groupEnd: tt({}, e, {
              value: Io
            })
          });
        }
        Ga < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Wu = M.ReactCurrentDispatcher, ml;
    function ca(e, t, a) {
      {
        if (ml === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            ml = i && i[1] || "";
          }
        return `
` + ml + e;
      }
    }
    var qa = !1, Xa;
    {
      var Gu = typeof WeakMap == "function" ? WeakMap : Map;
      Xa = new Gu();
    }
    function ru(e, t) {
      if (!e || qa)
        return "";
      {
        var a = Xa.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      qa = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = Wu.current, Wu.current = null, ic();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (A) {
              i = A;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (A) {
              i = A;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (A) {
            i = A;
          }
          e();
        }
      } catch (A) {
        if (A && i && typeof A.stack == "string") {
          for (var p = A.stack.split(`
`), v = i.stack.split(`
`), y = p.length - 1, g = v.length - 1; y >= 1 && g >= 0 && p[y] !== v[g]; )
            g--;
          for (; y >= 1 && g >= 0; y--, g--)
            if (p[y] !== v[g]) {
              if (y !== 1 || g !== 1)
                do
                  if (y--, g--, g < 0 || p[y] !== v[g]) {
                    var _ = `
` + p[y].replace(" at new ", " at ");
                    return e.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", e.displayName)), typeof e == "function" && Xa.set(e, _), _;
                  }
                while (y >= 1 && g >= 0);
              break;
            }
        }
      } finally {
        qa = !1, Wu.current = s, lc(), Error.prepareStackTrace = u;
      }
      var w = e ? e.displayName || e.name : "", N = w ? ca(w) : "";
      return typeof e == "function" && Xa.set(e, N), N;
    }
    function yl(e, t, a) {
      return ru(e, !0);
    }
    function qu(e, t, a) {
      return ru(e, !1);
    }
    function Xu(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Hi(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ru(e, Xu(e));
      if (typeof e == "string")
        return ca(e);
      switch (e) {
        case ae:
          return ca("Suspense");
        case me:
          return ca("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case I:
            return qu(e.render);
          case Xe:
            return Hi(e.type, t, a);
          case Qe: {
            var i = e, u = i._payload, s = i._init;
            try {
              return Hi(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function Yf(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case ie:
          return ca(e.type);
        case rn:
          return ca("Lazy");
        case be:
          return ca("Suspense");
        case an:
          return ca("SuspenseList");
        case oe:
        case se:
        case He:
          return qu(e.type);
        case Ge:
          return qu(e.type.render);
        case fe:
          return yl(e.type);
        default:
          return "";
      }
    }
    function Pi(e) {
      try {
        var t = "", a = e;
        do
          t += Yf(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function Ot(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Ku(e) {
      return e.displayName || "Context";
    }
    function wt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case ci:
          return "Fragment";
        case nr:
          return "Portal";
        case fi:
          return "Profiler";
        case Ya:
          return "StrictMode";
        case ae:
          return "Suspense";
        case me:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var t = e;
            return Ku(t) + ".Consumer";
          case di:
            var a = e;
            return Ku(a._context) + ".Provider";
          case I:
            return Ot(e, e.render, "ForwardRef");
          case Xe:
            var i = e.displayName || null;
            return i !== null ? i : wt(e.type) || "Memo";
          case Qe: {
            var u = e, s = u._payload, f = u._init;
            try {
              return wt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Yo(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function pi(e) {
      return e.displayName || "Context";
    }
    function Ye(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case bt:
          return "Cache";
        case cn:
          var i = a;
          return pi(i) + ".Consumer";
        case vt:
          var u = a;
          return pi(u._context) + ".Provider";
        case Kt:
          return "DehydratedFragment";
        case Ge:
          return Yo(a, a.render, "ForwardRef");
        case ht:
          return "Fragment";
        case ie:
          return a;
        case ye:
          return "Portal";
        case K:
          return "Root";
        case Be:
          return "Text";
        case rn:
          return wt(a);
        case lt:
          return a === Ya ? "StrictMode" : "Mode";
        case Oe:
          return "Offscreen";
        case mt:
          return "Profiler";
        case _t:
          return "Scope";
        case be:
          return "Suspense";
        case an:
          return "SuspenseList";
        case kt:
          return "TracingMarker";
        case fe:
        case oe:
        case jt:
        case se:
        case ft:
        case He:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var Zu = M.ReactDebugCurrentFrame, ar = null, vi = !1;
    function Dr() {
      {
        if (ar === null)
          return null;
        var e = ar._debugOwner;
        if (e !== null && typeof e < "u")
          return Ye(e);
      }
      return null;
    }
    function hi() {
      return ar === null ? "" : Pi(ar);
    }
    function on() {
      Zu.getCurrentStack = null, ar = null, vi = !1;
    }
    function It(e) {
      Zu.getCurrentStack = e === null ? null : hi, ar = e, vi = !1;
    }
    function gl() {
      return ar;
    }
    function $n(e) {
      vi = e;
    }
    function kr(e) {
      return "" + e;
    }
    function Ta(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Cn(e), e;
        default:
          return "";
      }
    }
    var au = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Qo(e, t) {
      au[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Wo(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Sl(e) {
      return e._valueTracker;
    }
    function iu(e) {
      e._valueTracker = null;
    }
    function Qf(e) {
      var t = "";
      return e && (Wo(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function wa(e) {
      var t = Wo(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Cn(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            Cn(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            Cn(p), i = "" + p;
          },
          stopTracking: function() {
            iu(e), delete e[t];
          }
        };
        return f;
      }
    }
    function Ka(e) {
      Sl(e) || (e._valueTracker = wa(e));
    }
    function mi(e) {
      if (!e)
        return !1;
      var t = Sl(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = Qf(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function xa(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Ju = !1, eo = !1, El = !1, lu = !1;
    function to(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function no(e, t) {
      var a = e, i = t.checked, u = tt({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function Za(e, t) {
      Qo("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !eo && (S("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component", t.type), eo = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Ju && (S("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component", t.type), Ju = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Ta(t.value != null ? t.value : i),
        controlled: to(t)
      };
    }
    function h(e, t) {
      var a = e, i = t.checked;
      i != null && xr(a, "checked", i, !1);
    }
    function C(e, t) {
      var a = e;
      {
        var i = to(t);
        !a._wrapperState.controlled && i && !lu && (S("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), lu = !0), a._wrapperState.controlled && !i && !El && (S("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), El = !0);
      }
      h(e, t);
      var u = Ta(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = kr(u)) : a.value !== kr(u) && (a.value = kr(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Le(a, t.type, u) : t.hasOwnProperty("defaultValue") && Le(a, t.type, Ta(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function z(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = kr(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function F(e, t) {
      var a = e;
      C(a, t), Z(a, t);
    }
    function Z(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Vn(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Lh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            mi(f), C(f, p);
          }
        }
      }
    }
    function Le(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || xa(e.ownerDocument) !== e) && (a == null ? e.defaultValue = kr(e._wrapperState.initialValue) : e.defaultValue !== kr(a) && (e.defaultValue = kr(a)));
    }
    var re = !1, ze = !1, pt = !1;
    function xt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? $.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || ze || (ze = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (pt || (pt = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !re && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), re = !0);
    }
    function tn(e, t) {
      t.value != null && e.setAttribute("value", kr(Ta(t.value)));
    }
    var Yt = Array.isArray;
    function it(e) {
      return Yt(e);
    }
    var Qt;
    Qt = !1;
    function vn() {
      var e = Dr();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Cl = ["value", "defaultValue"];
    function Go(e) {
      {
        Qo("select", e);
        for (var t = 0; t < Cl.length; t++) {
          var a = Cl[t];
          if (e[a] != null) {
            var i = it(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, vn()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, vn());
          }
        }
      }
    }
    function Vi(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var y = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== y && (u[v].selected = y), y && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var g = kr(Ta(a)), _ = null, w = 0; w < u.length; w++) {
          if (u[w].value === g) {
            u[w].selected = !0, i && (u[w].defaultSelected = !0);
            return;
          }
          _ === null && !u[w].disabled && (_ = u[w]);
        }
        _ !== null && (_.selected = !0);
      }
    }
    function qo(e, t) {
      return tt({}, t, {
        value: void 0
      });
    }
    function uu(e, t) {
      var a = e;
      Go(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Qt && (S("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Qt = !0);
    }
    function Wf(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Vi(a, !!t.multiple, i, !1) : t.defaultValue != null && Vi(a, !!t.multiple, t.defaultValue, !0);
    }
    function uc(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Vi(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? Vi(a, !!t.multiple, t.defaultValue, !0) : Vi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function Gf(e, t) {
      var a = e, i = t.value;
      i != null && Vi(a, !!t.multiple, i, !1);
    }
    var ev = !1;
    function qf(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = tt({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: kr(a._wrapperState.initialValue)
      });
      return i;
    }
    function Xf(e, t) {
      var a = e;
      Qo("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !ev && (S("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component"), ev = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          S("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (it(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            s = u;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: Ta(i)
      };
    }
    function tv(e, t) {
      var a = e, i = Ta(t.value), u = Ta(t.defaultValue);
      if (i != null) {
        var s = kr(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = kr(u));
    }
    function nv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Gm(e, t) {
      tv(e, t);
    }
    var Bi = "http://www.w3.org/1999/xhtml", Kf = "http://www.w3.org/1998/Math/MathML", Zf = "http://www.w3.org/2000/svg";
    function Jf(e) {
      switch (e) {
        case "svg":
          return Zf;
        case "math":
          return Kf;
        default:
          return Bi;
      }
    }
    function ed(e, t) {
      return e == null || e === Bi ? Jf(t) : e === Zf && t === "foreignObject" ? Bi : e;
    }
    var rv = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, oc, av = rv(function(e, t) {
      if (e.namespaceURI === Zf && !("innerHTML" in e)) {
        oc = oc || document.createElement("div"), oc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = oc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Yr = 1, $i = 3, Ln = 8, Ii = 9, td = 11, ro = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === $i) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Xo = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, Ko = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function iv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var lv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Ko).forEach(function(e) {
      lv.forEach(function(t) {
        Ko[iv(t, e)] = Ko[e];
      });
    });
    function sc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(Ko.hasOwnProperty(e) && Ko[e]) ? t + "px" : (ua(t, e), ("" + t).trim());
    }
    var uv = /([A-Z])/g, ov = /^ms-/;
    function ao(e) {
      return e.replace(uv, "-$1").toLowerCase().replace(ov, "-ms-");
    }
    var sv = function() {
    };
    {
      var qm = /^(?:webkit|moz|o)[A-Z]/, Xm = /^-ms-/, cv = /-(.)/g, nd = /;\s*$/, yi = {}, ou = {}, fv = !1, Zo = !1, Km = function(e) {
        return e.replace(cv, function(t, a) {
          return a.toUpperCase();
        });
      }, dv = function(e) {
        yi.hasOwnProperty(e) && yi[e] || (yi[e] = !0, S(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Km(e.replace(Xm, "ms-"))
        ));
      }, rd = function(e) {
        yi.hasOwnProperty(e) && yi[e] || (yi[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, ad = function(e, t) {
        ou.hasOwnProperty(t) && ou[t] || (ou[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(nd, "")));
      }, pv = function(e, t) {
        fv || (fv = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, vv = function(e, t) {
        Zo || (Zo = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      sv = function(e, t) {
        e.indexOf("-") > -1 ? dv(e) : qm.test(e) ? rd(e) : nd.test(t) && ad(e, t), typeof t == "number" && (isNaN(t) ? pv(e, t) : isFinite(t) || vv(e, t));
      };
    }
    var hv = sv;
    function Zm(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : ao(i)) + ":", t += sc(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function mv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || hv(i, t[i]);
          var s = sc(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function Jm(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function yv(e) {
      var t = {};
      for (var a in e)
        for (var i = Xo[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function ey(e, t) {
      {
        if (!t)
          return;
        var a = yv(e), i = yv(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, S("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", Jm(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var Ja = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, Jo = tt({
      menuitem: !0
    }, Ja), gv = "__html";
    function cc(e, t) {
      if (t) {
        if (Jo[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(gv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && S("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Rl(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var es = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, fc = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, io = {}, ty = new RegExp("^(aria)-[" + ee + "]*$"), lo = new RegExp("^(aria)[A-Z][" + ee + "]*$");
    function id(e, t) {
      {
        if (wr.call(io, t) && io[t])
          return !0;
        if (lo.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = fc.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), io[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), io[t] = !0, !0;
        }
        if (ty.test(t)) {
          var u = t.toLowerCase(), s = fc.hasOwnProperty(u) ? u : null;
          if (s == null)
            return io[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), io[t] = !0, !0;
        }
      }
      return !0;
    }
    function ts(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = id(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? S("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && S("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function ld(e, t) {
      Rl(e, t) || ts(e, t);
    }
    var ud = !1;
    function dc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !ud && (ud = !0, e === "select" && t.multiple ? S("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : S("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var su = function() {
    };
    {
      var ir = {}, od = /^on./, pc = /^on[^A-Z]/, Sv = new RegExp("^(aria)-[" + ee + "]*$"), Ev = new RegExp("^(aria)[A-Z][" + ee + "]*$");
      su = function(e, t, a, i) {
        if (wr.call(ir, t) && ir[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), ir[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, p), ir[t] = !0, !0;
          if (od.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), ir[t] = !0, !0;
        } else if (od.test(t))
          return pc.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), ir[t] = !0, !0;
        if (Sv.test(t) || Ev.test(t))
          return !0;
        if (u === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), ir[t] = !0, !0;
        if (u === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), ir[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), ir[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), ir[t] = !0, !0;
        var v = Jt(t), y = v !== null && v.type === Bn;
        if (es.hasOwnProperty(u)) {
          var g = es[u];
          if (g !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, g), ir[t] = !0, !0;
        } else if (!y && t !== u)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), ir[t] = !0, !0;
        return typeof a == "boolean" && ln(t, a, v, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), ir[t] = !0, !0) : y ? !0 : ln(t, a, v, !1) ? (ir[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === On && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), ir[t] = !0), !0);
      };
    }
    var Cv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = su(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? S("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && S("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Rv(e, t, a) {
      Rl(e, t) || Cv(e, t, a);
    }
    var sd = 1, vc = 2, _a = 4, cd = sd | vc | _a, cu = null;
    function ny(e) {
      cu !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), cu = e;
    }
    function ry() {
      cu === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), cu = null;
    }
    function ns(e) {
      return e === cu;
    }
    function fd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === $i ? t.parentNode : t;
    }
    var hc = null, fu = null, Ht = null;
    function mc(e) {
      var t = Do(e);
      if (t) {
        if (typeof hc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Lh(a);
          hc(t.stateNode, t.type, i);
        }
      }
    }
    function yc(e) {
      hc = e;
    }
    function uo(e) {
      fu ? Ht ? Ht.push(e) : Ht = [e] : fu = e;
    }
    function Tv() {
      return fu !== null || Ht !== null;
    }
    function gc() {
      if (fu) {
        var e = fu, t = Ht;
        if (fu = null, Ht = null, mc(e), t)
          for (var a = 0; a < t.length; a++)
            mc(t[a]);
      }
    }
    var oo = function(e, t) {
      return e(t);
    }, rs = function() {
    }, Tl = !1;
    function wv() {
      var e = Tv();
      e && (rs(), gc());
    }
    function xv(e, t, a) {
      if (Tl)
        return e(t, a);
      Tl = !0;
      try {
        return oo(e, t, a);
      } finally {
        Tl = !1, wv();
      }
    }
    function ay(e, t, a) {
      oo = e, rs = a;
    }
    function _v(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Sc(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && _v(t));
        default:
          return !1;
      }
    }
    function wl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Lh(a);
      if (i === null)
        return null;
      var u = i[t];
      if (Sc(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var as = !1;
    if (kn)
      try {
        var du = {};
        Object.defineProperty(du, "passive", {
          get: function() {
            as = !0;
          }
        }), window.addEventListener("test", du, du), window.removeEventListener("test", du, du);
      } catch {
        as = !1;
      }
    function Ec(e, t, a, i, u, s, f, p, v) {
      var y = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, y);
      } catch (g) {
        this.onError(g);
      }
    }
    var Cc = Ec;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var dd = document.createElement("react");
      Cc = function(t, a, i, u, s, f, p, v, y) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var g = document.createEvent("Event"), _ = !1, w = !0, N = window.event, A = Object.getOwnPropertyDescriptor(window, "event");
        function j() {
          dd.removeEventListener(H, Me, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = N);
        }
        var ue = Array.prototype.slice.call(arguments, 3);
        function Me() {
          _ = !0, j(), a.apply(i, ue), w = !1;
        }
        var xe, Tt = !1, yt = !1;
        function k(O) {
          if (xe = O.error, Tt = !0, xe === null && O.colno === 0 && O.lineno === 0 && (yt = !0), O.defaultPrevented && xe != null && typeof xe == "object")
            try {
              xe._suppressLogging = !0;
            } catch {
            }
        }
        var H = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", k), dd.addEventListener(H, Me, !1), g.initEvent(H, !1, !1), dd.dispatchEvent(g), A && Object.defineProperty(window, "event", A), _ && w && (Tt ? yt && (xe = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : xe = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(xe)), window.removeEventListener("error", k), !_)
          return j(), Ec.apply(this, arguments);
      };
    }
    var bv = Cc, so = !1, Rc = null, co = !1, gi = null, Dv = {
      onError: function(e) {
        so = !0, Rc = e;
      }
    };
    function xl(e, t, a, i, u, s, f, p, v) {
      so = !1, Rc = null, bv.apply(Dv, arguments);
    }
    function Si(e, t, a, i, u, s, f, p, v) {
      if (xl.apply(this, arguments), so) {
        var y = ls();
        co || (co = !0, gi = y);
      }
    }
    function is() {
      if (co) {
        var e = gi;
        throw co = !1, gi = null, e;
      }
    }
    function Yi() {
      return so;
    }
    function ls() {
      if (so) {
        var e = Rc;
        return so = !1, Rc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function fo(e) {
      return e._reactInternals;
    }
    function iy(e) {
      return e._reactInternals !== void 0;
    }
    function pu(e, t) {
      e._reactInternals = t;
    }
    var De = (
      /*                      */
      0
    ), ei = (
      /*                */
      1
    ), hn = (
      /*                    */
      2
    ), Et = (
      /*                       */
      4
    ), ba = (
      /*                */
      16
    ), Da = (
      /*                 */
      32
    ), nn = (
      /*                     */
      64
    ), _e = (
      /*                   */
      128
    ), Er = (
      /*            */
      256
    ), Sn = (
      /*                          */
      512
    ), In = (
      /*                     */
      1024
    ), Qr = (
      /*                      */
      2048
    ), Wr = (
      /*                    */
      4096
    ), Mn = (
      /*                   */
      8192
    ), po = (
      /*             */
      16384
    ), kv = (
      /*               */
      32767
    ), us = (
      /*                   */
      32768
    ), Xn = (
      /*                */
      65536
    ), Tc = (
      /* */
      131072
    ), Ei = (
      /*                       */
      1048576
    ), vo = (
      /*                    */
      2097152
    ), Qi = (
      /*                 */
      4194304
    ), wc = (
      /*                */
      8388608
    ), _l = (
      /*               */
      16777216
    ), Ci = (
      /*              */
      33554432
    ), bl = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      Et | In | 0
    ), Dl = hn | Et | ba | Da | Sn | Wr | Mn, kl = Et | nn | Sn | Mn, Wi = Qr | ba, Nn = Qi | wc | vo, ka = M.ReactCurrentOwner;
    function fa(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (hn | Wr)) !== De && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === K ? a : null;
    }
    function Ri(e) {
      if (e.tag === be) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function Ti(e) {
      return e.tag === K ? e.stateNode.containerInfo : null;
    }
    function vu(e) {
      return fa(e) === e;
    }
    function Ov(e) {
      {
        var t = ka.current;
        if (t !== null && t.tag === fe) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ye(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = fo(e);
      return u ? fa(u) === u : !1;
    }
    function xc(e) {
      if (fa(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function _c(e) {
      var t = e.alternate;
      if (!t) {
        var a = fa(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var p = s.return;
          if (p !== null) {
            i = u = p;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var v = s.child; v; ) {
            if (v === i)
              return xc(s), e;
            if (v === u)
              return xc(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var y = !1, g = s.child; g; ) {
            if (g === i) {
              y = !0, i = s, u = f;
              break;
            }
            if (g === u) {
              y = !0, u = s, i = f;
              break;
            }
            g = g.sibling;
          }
          if (!y) {
            for (g = f.child; g; ) {
              if (g === i) {
                y = !0, i = f, u = s;
                break;
              }
              if (g === u) {
                y = !0, u = f, i = s;
                break;
              }
              g = g.sibling;
            }
            if (!y)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== K)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Gr(e) {
      var t = _c(e);
      return t !== null ? qr(t) : null;
    }
    function qr(e) {
      if (e.tag === ie || e.tag === Be)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = qr(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function fn(e) {
      var t = _c(e);
      return t !== null ? Oa(t) : null;
    }
    function Oa(e) {
      if (e.tag === ie || e.tag === Be)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== ye) {
          var a = Oa(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var pd = B.unstable_scheduleCallback, Lv = B.unstable_cancelCallback, vd = B.unstable_shouldYield, hd = B.unstable_requestPaint, Yn = B.unstable_now, bc = B.unstable_getCurrentPriorityLevel, os = B.unstable_ImmediatePriority, Ol = B.unstable_UserBlockingPriority, Gi = B.unstable_NormalPriority, ly = B.unstable_LowPriority, hu = B.unstable_IdlePriority, Dc = B.unstable_yieldValue, Mv = B.unstable_setDisableYieldValue, mu = null, Tn = null, le = null, da = !1, Xr = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function ho(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return S("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        Pe && (e = tt({}, e, {
          getLaneLabelMap: yu,
          injectProfilingHooks: La
        })), mu = t.inject(e), Tn = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function md(e, t) {
      if (Tn && typeof Tn.onScheduleFiberRoot == "function")
        try {
          Tn.onScheduleFiberRoot(mu, e, t);
        } catch (a) {
          da || (da = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function yd(e, t) {
      if (Tn && typeof Tn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & _e) === _e;
          if (Ae) {
            var i;
            switch (t) {
              case Or:
                i = os;
                break;
              case xi:
                i = Ol;
                break;
              case Ma:
                i = Gi;
                break;
              case Na:
                i = hu;
                break;
              default:
                i = Gi;
                break;
            }
            Tn.onCommitFiberRoot(mu, e, i, a);
          }
        } catch (u) {
          da || (da = !0, S("React instrumentation encountered an error: %s", u));
        }
    }
    function gd(e) {
      if (Tn && typeof Tn.onPostCommitFiberRoot == "function")
        try {
          Tn.onPostCommitFiberRoot(mu, e);
        } catch (t) {
          da || (da = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Sd(e) {
      if (Tn && typeof Tn.onCommitFiberUnmount == "function")
        try {
          Tn.onCommitFiberUnmount(mu, e);
        } catch (t) {
          da || (da = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function mn(e) {
      if (typeof Dc == "function" && (Mv(e), Fe(e)), Tn && typeof Tn.setStrictMode == "function")
        try {
          Tn.setStrictMode(mu, e);
        } catch (t) {
          da || (da = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function La(e) {
      le = e;
    }
    function yu() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Eu; a++) {
          var i = Av(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Ed(e) {
      le !== null && typeof le.markCommitStarted == "function" && le.markCommitStarted(e);
    }
    function Cd() {
      le !== null && typeof le.markCommitStopped == "function" && le.markCommitStopped();
    }
    function pa(e) {
      le !== null && typeof le.markComponentRenderStarted == "function" && le.markComponentRenderStarted(e);
    }
    function va() {
      le !== null && typeof le.markComponentRenderStopped == "function" && le.markComponentRenderStopped();
    }
    function Rd(e) {
      le !== null && typeof le.markComponentPassiveEffectMountStarted == "function" && le.markComponentPassiveEffectMountStarted(e);
    }
    function Nv() {
      le !== null && typeof le.markComponentPassiveEffectMountStopped == "function" && le.markComponentPassiveEffectMountStopped();
    }
    function qi(e) {
      le !== null && typeof le.markComponentPassiveEffectUnmountStarted == "function" && le.markComponentPassiveEffectUnmountStarted(e);
    }
    function Ll() {
      le !== null && typeof le.markComponentPassiveEffectUnmountStopped == "function" && le.markComponentPassiveEffectUnmountStopped();
    }
    function kc(e) {
      le !== null && typeof le.markComponentLayoutEffectMountStarted == "function" && le.markComponentLayoutEffectMountStarted(e);
    }
    function zv() {
      le !== null && typeof le.markComponentLayoutEffectMountStopped == "function" && le.markComponentLayoutEffectMountStopped();
    }
    function ss(e) {
      le !== null && typeof le.markComponentLayoutEffectUnmountStarted == "function" && le.markComponentLayoutEffectUnmountStarted(e);
    }
    function Td() {
      le !== null && typeof le.markComponentLayoutEffectUnmountStopped == "function" && le.markComponentLayoutEffectUnmountStopped();
    }
    function cs(e, t, a) {
      le !== null && typeof le.markComponentErrored == "function" && le.markComponentErrored(e, t, a);
    }
    function wi(e, t, a) {
      le !== null && typeof le.markComponentSuspended == "function" && le.markComponentSuspended(e, t, a);
    }
    function fs(e) {
      le !== null && typeof le.markLayoutEffectsStarted == "function" && le.markLayoutEffectsStarted(e);
    }
    function ds() {
      le !== null && typeof le.markLayoutEffectsStopped == "function" && le.markLayoutEffectsStopped();
    }
    function gu(e) {
      le !== null && typeof le.markPassiveEffectsStarted == "function" && le.markPassiveEffectsStarted(e);
    }
    function wd() {
      le !== null && typeof le.markPassiveEffectsStopped == "function" && le.markPassiveEffectsStopped();
    }
    function Su(e) {
      le !== null && typeof le.markRenderStarted == "function" && le.markRenderStarted(e);
    }
    function Uv() {
      le !== null && typeof le.markRenderYielded == "function" && le.markRenderYielded();
    }
    function Oc() {
      le !== null && typeof le.markRenderStopped == "function" && le.markRenderStopped();
    }
    function yn(e) {
      le !== null && typeof le.markRenderScheduled == "function" && le.markRenderScheduled(e);
    }
    function Lc(e, t) {
      le !== null && typeof le.markForceUpdateScheduled == "function" && le.markForceUpdateScheduled(e, t);
    }
    function ps(e, t) {
      le !== null && typeof le.markStateUpdateScheduled == "function" && le.markStateUpdateScheduled(e, t);
    }
    var ke = (
      /*                         */
      0
    ), ct = (
      /*                 */
      1
    ), Lt = (
      /*                    */
      2
    ), Wt = (
      /*               */
      8
    ), Mt = (
      /*              */
      16
    ), zn = Math.clz32 ? Math.clz32 : vs, Kn = Math.log, Mc = Math.LN2;
    function vs(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Kn(t) / Mc | 0) | 0;
    }
    var Eu = 31, Y = (
      /*                        */
      0
    ), Dt = (
      /*                          */
      0
    ), je = (
      /*                        */
      1
    ), Ml = (
      /*    */
      2
    ), ti = (
      /*             */
      4
    ), Cr = (
      /*            */
      8
    ), wn = (
      /*                     */
      16
    ), Xi = (
      /*                */
      32
    ), Nl = (
      /*                       */
      4194240
    ), Cu = (
      /*                        */
      64
    ), Nc = (
      /*                        */
      128
    ), zc = (
      /*                        */
      256
    ), Uc = (
      /*                        */
      512
    ), Ac = (
      /*                        */
      1024
    ), Fc = (
      /*                        */
      2048
    ), jc = (
      /*                        */
      4096
    ), Hc = (
      /*                        */
      8192
    ), Pc = (
      /*                        */
      16384
    ), Ru = (
      /*                       */
      32768
    ), Vc = (
      /*                       */
      65536
    ), mo = (
      /*                       */
      131072
    ), yo = (
      /*                       */
      262144
    ), Bc = (
      /*                       */
      524288
    ), hs = (
      /*                       */
      1048576
    ), $c = (
      /*                       */
      2097152
    ), ms = (
      /*                            */
      130023424
    ), Tu = (
      /*                             */
      4194304
    ), Ic = (
      /*                             */
      8388608
    ), ys = (
      /*                             */
      16777216
    ), Yc = (
      /*                             */
      33554432
    ), Qc = (
      /*                             */
      67108864
    ), xd = Tu, gs = (
      /*          */
      134217728
    ), _d = (
      /*                          */
      268435455
    ), Ss = (
      /*               */
      268435456
    ), wu = (
      /*                        */
      536870912
    ), Kr = (
      /*                   */
      1073741824
    );
    function Av(e) {
      {
        if (e & je)
          return "Sync";
        if (e & Ml)
          return "InputContinuousHydration";
        if (e & ti)
          return "InputContinuous";
        if (e & Cr)
          return "DefaultHydration";
        if (e & wn)
          return "Default";
        if (e & Xi)
          return "TransitionHydration";
        if (e & Nl)
          return "Transition";
        if (e & ms)
          return "Retry";
        if (e & gs)
          return "SelectiveHydration";
        if (e & Ss)
          return "IdleHydration";
        if (e & wu)
          return "Idle";
        if (e & Kr)
          return "Offscreen";
      }
    }
    var Xt = -1, xu = Cu, Wc = Tu;
    function Es(e) {
      switch (zl(e)) {
        case je:
          return je;
        case Ml:
          return Ml;
        case ti:
          return ti;
        case Cr:
          return Cr;
        case wn:
          return wn;
        case Xi:
          return Xi;
        case Cu:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Pc:
        case Ru:
        case Vc:
        case mo:
        case yo:
        case Bc:
        case hs:
        case $c:
          return e & Nl;
        case Tu:
        case Ic:
        case ys:
        case Yc:
        case Qc:
          return e & ms;
        case gs:
          return gs;
        case Ss:
          return Ss;
        case wu:
          return wu;
        case Kr:
          return Kr;
        default:
          return S("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function Gc(e, t) {
      var a = e.pendingLanes;
      if (a === Y)
        return Y;
      var i = Y, u = e.suspendedLanes, s = e.pingedLanes, f = a & _d;
      if (f !== Y) {
        var p = f & ~u;
        if (p !== Y)
          i = Es(p);
        else {
          var v = f & s;
          v !== Y && (i = Es(v));
        }
      } else {
        var y = a & ~u;
        y !== Y ? i = Es(y) : s !== Y && (i = Es(s));
      }
      if (i === Y)
        return Y;
      if (t !== Y && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === Y) {
        var g = zl(i), _ = zl(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          g >= _ || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          g === wn && (_ & Nl) !== Y
        )
          return t;
      }
      (i & ti) !== Y && (i |= a & wn);
      var w = e.entangledLanes;
      if (w !== Y)
        for (var N = e.entanglements, A = i & w; A > 0; ) {
          var j = Un(A), ue = 1 << j;
          i |= N[j], A &= ~ue;
        }
      return i;
    }
    function ni(e, t) {
      for (var a = e.eventTimes, i = Xt; t > 0; ) {
        var u = Un(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function bd(e, t) {
      switch (e) {
        case je:
        case Ml:
        case ti:
          return t + 250;
        case Cr:
        case wn:
        case Xi:
        case Cu:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Pc:
        case Ru:
        case Vc:
        case mo:
        case yo:
        case Bc:
        case hs:
        case $c:
          return t + 5e3;
        case Tu:
        case Ic:
        case ys:
        case Yc:
        case Qc:
          return Xt;
        case gs:
        case Ss:
        case wu:
        case Kr:
          return Xt;
        default:
          return S("Should have found matching lanes. This is a bug in React."), Xt;
      }
    }
    function qc(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p, y = s[p];
        y === Xt ? ((v & i) === Y || (v & u) !== Y) && (s[p] = bd(v, t)) : y <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function Fv(e) {
      return Es(e.pendingLanes);
    }
    function Xc(e) {
      var t = e.pendingLanes & ~Kr;
      return t !== Y ? t : t & Kr ? Kr : Y;
    }
    function jv(e) {
      return (e & je) !== Y;
    }
    function Cs(e) {
      return (e & _d) !== Y;
    }
    function _u(e) {
      return (e & ms) === e;
    }
    function Dd(e) {
      var t = je | ti | wn;
      return (e & t) === Y;
    }
    function kd(e) {
      return (e & Nl) === e;
    }
    function Kc(e, t) {
      var a = Ml | ti | Cr | wn;
      return (t & a) !== Y;
    }
    function Hv(e, t) {
      return (t & e.expiredLanes) !== Y;
    }
    function Od(e) {
      return (e & Nl) !== Y;
    }
    function Ld() {
      var e = xu;
      return xu <<= 1, (xu & Nl) === Y && (xu = Cu), e;
    }
    function Pv() {
      var e = Wc;
      return Wc <<= 1, (Wc & ms) === Y && (Wc = Tu), e;
    }
    function zl(e) {
      return e & -e;
    }
    function Rs(e) {
      return zl(e);
    }
    function Un(e) {
      return 31 - zn(e);
    }
    function lr(e) {
      return Un(e);
    }
    function Zr(e, t) {
      return (e & t) !== Y;
    }
    function bu(e, t) {
      return (e & t) === t;
    }
    function Ze(e, t) {
      return e | t;
    }
    function Ts(e, t) {
      return e & ~t;
    }
    function Md(e, t) {
      return e & t;
    }
    function Vv(e) {
      return e;
    }
    function Bv(e, t) {
      return e !== Dt && e < t ? e : t;
    }
    function ws(e) {
      for (var t = [], a = 0; a < Eu; a++)
        t.push(e);
      return t;
    }
    function go(e, t, a) {
      e.pendingLanes |= t, t !== wu && (e.suspendedLanes = Y, e.pingedLanes = Y);
      var i = e.eventTimes, u = lr(t);
      i[u] = a;
    }
    function $v(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Un(i), s = 1 << u;
        a[u] = Xt, i &= ~s;
      }
    }
    function Zc(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Nd(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = Y, e.pingedLanes = Y, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p;
        i[p] = Y, u[p] = Xt, s[p] = Xt, f &= ~v;
      }
    }
    function Jc(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Un(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function zd(e, t) {
      var a = zl(t), i;
      switch (a) {
        case ti:
          i = Ml;
          break;
        case wn:
          i = Cr;
          break;
        case Cu:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Pc:
        case Ru:
        case Vc:
        case mo:
        case yo:
        case Bc:
        case hs:
        case $c:
        case Tu:
        case Ic:
        case ys:
        case Yc:
        case Qc:
          i = Xi;
          break;
        case wu:
          i = Ss;
          break;
        default:
          i = Dt;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== Dt ? Dt : i;
    }
    function xs(e, t, a) {
      if (Xr)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = lr(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function Iv(e, t) {
      if (Xr)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = lr(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function Ud(e, t) {
      return null;
    }
    var Or = je, xi = ti, Ma = wn, Na = wu, _s = Dt;
    function za() {
      return _s;
    }
    function An(e) {
      _s = e;
    }
    function Yv(e, t) {
      var a = _s;
      try {
        return _s = e, t();
      } finally {
        _s = a;
      }
    }
    function Qv(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function bs(e, t) {
      return e > t ? e : t;
    }
    function Zn(e, t) {
      return e !== 0 && e < t;
    }
    function Wv(e) {
      var t = zl(e);
      return Zn(Or, t) ? Zn(xi, t) ? Cs(t) ? Ma : Na : xi : Or;
    }
    function ef(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var Ds;
    function Rr(e) {
      Ds = e;
    }
    function uy(e) {
      Ds(e);
    }
    var he;
    function So(e) {
      he = e;
    }
    var tf;
    function Gv(e) {
      tf = e;
    }
    var qv;
    function ks(e) {
      qv = e;
    }
    var Os;
    function Ad(e) {
      Os = e;
    }
    var nf = !1, Ls = [], Ki = null, _i = null, bi = null, xn = /* @__PURE__ */ new Map(), Lr = /* @__PURE__ */ new Map(), Mr = [], Xv = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Kv(e) {
      return Xv.indexOf(e) > -1;
    }
    function ri(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function Fd(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Ki = null;
          break;
        case "dragenter":
        case "dragleave":
          _i = null;
          break;
        case "mouseover":
        case "mouseout":
          bi = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          xn.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Lr.delete(i);
          break;
        }
      }
    }
    function Jr(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = ri(t, a, i, u, s);
        if (t !== null) {
          var p = Do(t);
          p !== null && he(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function oy(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return Ki = Jr(Ki, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return _i = Jr(_i, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return bi = Jr(bi, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, y = v.pointerId;
          return xn.set(y, Jr(xn.get(y) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var g = u, _ = g.pointerId;
          return Lr.set(_, Jr(Lr.get(_) || null, e, t, a, i, g)), !0;
        }
      }
      return !1;
    }
    function jd(e) {
      var t = $s(e.target);
      if (t !== null) {
        var a = fa(t);
        if (a !== null) {
          var i = a.tag;
          if (i === be) {
            var u = Ri(a);
            if (u !== null) {
              e.blockedOn = u, Os(e.priority, function() {
                tf(a);
              });
              return;
            }
          } else if (i === K) {
            var s = a.stateNode;
            if (ef(s)) {
              e.blockedOn = Ti(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Zv(e) {
      for (var t = qv(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < Mr.length && Zn(t, Mr[i].priority); i++)
        ;
      Mr.splice(i, 0, a), i === 0 && jd(a);
    }
    function Ms(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Co(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          ny(s), u.target.dispatchEvent(s), ry();
        } else {
          var f = Do(i);
          return f !== null && he(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Hd(e, t, a) {
      Ms(e) && a.delete(t);
    }
    function sy() {
      nf = !1, Ki !== null && Ms(Ki) && (Ki = null), _i !== null && Ms(_i) && (_i = null), bi !== null && Ms(bi) && (bi = null), xn.forEach(Hd), Lr.forEach(Hd);
    }
    function Ul(e, t) {
      e.blockedOn === t && (e.blockedOn = null, nf || (nf = !0, B.unstable_scheduleCallback(B.unstable_NormalPriority, sy)));
    }
    function Du(e) {
      if (Ls.length > 0) {
        Ul(Ls[0], e);
        for (var t = 1; t < Ls.length; t++) {
          var a = Ls[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Ki !== null && Ul(Ki, e), _i !== null && Ul(_i, e), bi !== null && Ul(bi, e);
      var i = function(p) {
        return Ul(p, e);
      };
      xn.forEach(i), Lr.forEach(i);
      for (var u = 0; u < Mr.length; u++) {
        var s = Mr[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; Mr.length > 0; ) {
        var f = Mr[0];
        if (f.blockedOn !== null)
          break;
        jd(f), f.blockedOn === null && Mr.shift();
      }
    }
    var ur = M.ReactCurrentBatchConfig, Ct = !0;
    function Qn(e) {
      Ct = !!e;
    }
    function Fn() {
      return Ct;
    }
    function or(e, t, a) {
      var i = rf(t), u;
      switch (i) {
        case Or:
          u = ha;
          break;
        case xi:
          u = Eo;
          break;
        case Ma:
        default:
          u = _n;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function ha(e, t, a, i) {
      var u = za(), s = ur.transition;
      ur.transition = null;
      try {
        An(Or), _n(e, t, a, i);
      } finally {
        An(u), ur.transition = s;
      }
    }
    function Eo(e, t, a, i) {
      var u = za(), s = ur.transition;
      ur.transition = null;
      try {
        An(xi), _n(e, t, a, i);
      } finally {
        An(u), ur.transition = s;
      }
    }
    function _n(e, t, a, i) {
      Ct && Ns(e, t, a, i);
    }
    function Ns(e, t, a, i) {
      var u = Co(e, t, a, i);
      if (u === null) {
        _y(e, t, i, Di, a), Fd(e, i);
        return;
      }
      if (oy(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Fd(e, i), t & _a && Kv(e)) {
        for (; u !== null; ) {
          var s = Do(u);
          s !== null && uy(s);
          var f = Co(e, t, a, i);
          if (f === null && _y(e, t, i, Di, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      _y(e, t, i, null, a);
    }
    var Di = null;
    function Co(e, t, a, i) {
      Di = null;
      var u = fd(i), s = $s(u);
      if (s !== null) {
        var f = fa(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === be) {
            var v = Ri(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === K) {
            var y = f.stateNode;
            if (ef(y))
              return Ti(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return Di = s, null;
    }
    function rf(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Or;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return xi;
        case "message": {
          var t = bc();
          switch (t) {
            case os:
              return Or;
            case Ol:
              return xi;
            case Gi:
            case ly:
              return Ma;
            case hu:
              return Na;
            default:
              return Ma;
          }
        }
        default:
          return Ma;
      }
    }
    function zs(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function ea(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Pd(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function Ro(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var ma = null, To = null, ku = null;
    function Al(e) {
      return ma = e, To = Us(), !0;
    }
    function af() {
      ma = null, To = null, ku = null;
    }
    function Zi() {
      if (ku)
        return ku;
      var e, t = To, a = t.length, i, u = Us(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return ku = u.slice(e, p), ku;
    }
    function Us() {
      return "value" in ma ? ma.value : ma.textContent;
    }
    function Fl(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function wo() {
      return !0;
    }
    function As() {
      return !1;
    }
    function Tr(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var y = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return y ? this.isDefaultPrevented = wo : this.isDefaultPrevented = As, this.isPropagationStopped = As, this;
      }
      return tt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = wo);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = wo);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: wo
      }), t;
    }
    var jn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, ki = Tr(jn), Nr = tt({}, jn, {
      view: 0,
      detail: 0
    }), ta = Tr(Nr), lf, Fs, Ou;
    function cy(e) {
      e !== Ou && (Ou && e.type === "mousemove" ? (lf = e.screenX - Ou.screenX, Fs = e.screenY - Ou.screenY) : (lf = 0, Fs = 0), Ou = e);
    }
    var ai = tt({}, Nr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: dn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (cy(e), lf);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Fs;
      }
    }), Vd = Tr(ai), Bd = tt({}, ai, {
      dataTransfer: 0
    }), Lu = Tr(Bd), $d = tt({}, Nr, {
      relatedTarget: 0
    }), Ji = Tr($d), Jv = tt({}, jn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), eh = Tr(Jv), Id = tt({}, jn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), uf = Tr(Id), fy = tt({}, jn, {
      data: 0
    }), th = Tr(fy), nh = th, rh = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Mu = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function dy(e) {
      if (e.key) {
        var t = rh[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Fl(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Mu[e.keyCode] || "Unidentified" : "";
    }
    var xo = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function ah(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = xo[e];
      return i ? !!a[i] : !1;
    }
    function dn(e) {
      return ah;
    }
    var py = tt({}, Nr, {
      key: dy,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: dn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Fl(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Fl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), ih = Tr(py), vy = tt({}, ai, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), lh = Tr(vy), uh = tt({}, Nr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: dn
    }), oh = Tr(uh), hy = tt({}, jn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Ua = Tr(hy), Yd = tt({}, ai, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), my = Tr(Yd), jl = [9, 13, 27, 32], js = 229, el = kn && "CompositionEvent" in window, Hl = null;
    kn && "documentMode" in document && (Hl = document.documentMode);
    var Qd = kn && "TextEvent" in window && !Hl, of = kn && (!el || Hl && Hl > 8 && Hl <= 11), sh = 32, sf = String.fromCharCode(sh);
    function yy() {
      ot("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), ot("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), ot("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), ot("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Wd = !1;
    function ch(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function cf(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function ff(e, t) {
      return e === "keydown" && t.keyCode === js;
    }
    function Gd(e, t) {
      switch (e) {
        case "keyup":
          return jl.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== js;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function df(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function fh(e) {
      return e.locale === "ko";
    }
    var Nu = !1;
    function qd(e, t, a, i, u) {
      var s, f;
      if (el ? s = cf(t) : Nu ? Gd(t, i) && (s = "onCompositionEnd") : ff(t, i) && (s = "onCompositionStart"), !s)
        return null;
      of && !fh(i) && (!Nu && s === "onCompositionStart" ? Nu = Al(u) : s === "onCompositionEnd" && Nu && (f = Zi()));
      var p = gh(a, s);
      if (p.length > 0) {
        var v = new th(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var y = df(i);
          y !== null && (v.data = y);
        }
      }
    }
    function pf(e, t) {
      switch (e) {
        case "compositionend":
          return df(t);
        case "keypress":
          var a = t.which;
          return a !== sh ? null : (Wd = !0, sf);
        case "textInput":
          var i = t.data;
          return i === sf && Wd ? null : i;
        default:
          return null;
      }
    }
    function Xd(e, t) {
      if (Nu) {
        if (e === "compositionend" || !el && Gd(e, t)) {
          var a = Zi();
          return af(), Nu = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!ch(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return of && !fh(t) ? null : t.data;
        default:
          return null;
      }
    }
    function vf(e, t, a, i, u) {
      var s;
      if (Qd ? s = pf(t, i) : s = Xd(t, i), !s)
        return null;
      var f = gh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new nh("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function dh(e, t, a, i, u, s, f) {
      qd(e, t, a, i, u), vf(e, t, a, i, u);
    }
    var gy = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function Hs(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!gy[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function Sy(e) {
      if (!kn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function Ps() {
      ot("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function ph(e, t, a, i) {
      uo(i);
      var u = gh(t, "onChange");
      if (u.length > 0) {
        var s = new ki("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var Pl = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function l(e) {
      var t = [];
      ph(t, n, e, fd(e)), xv(o, t);
    }
    function o(e) {
      bE(e, 0);
    }
    function c(e) {
      var t = Ef(e);
      if (mi(t))
        return e;
    }
    function d(e, t) {
      if (e === "change")
        return t;
    }
    var m = !1;
    kn && (m = Sy("input") && (!document.documentMode || document.documentMode > 9));
    function E(e, t) {
      Pl = e, n = t, Pl.attachEvent("onpropertychange", U);
    }
    function T() {
      Pl && (Pl.detachEvent("onpropertychange", U), Pl = null, n = null);
    }
    function U(e) {
      e.propertyName === "value" && c(n) && l(e);
    }
    function W(e, t, a) {
      e === "focusin" ? (T(), E(t, a)) : e === "focusout" && T();
    }
    function q(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return c(n);
    }
    function Q(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function de(e, t) {
      if (e === "click")
        return c(t);
    }
    function ge(e, t) {
      if (e === "input" || e === "change")
        return c(t);
    }
    function Ce(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Le(e, "number", e.value);
    }
    function bn(e, t, a, i, u, s, f) {
      var p = a ? Ef(a) : window, v, y;
      if (r(p) ? v = d : Hs(p) ? m ? v = ge : (v = q, y = W) : Q(p) && (v = de), v) {
        var g = v(t, a);
        if (g) {
          ph(e, g, i, u);
          return;
        }
      }
      y && y(t, p, a), t === "focusout" && Ce(p);
    }
    function D() {
      Vt("onMouseEnter", ["mouseout", "mouseover"]), Vt("onMouseLeave", ["mouseout", "mouseover"]), Vt("onPointerEnter", ["pointerout", "pointerover"]), Vt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function x(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !ns(i)) {
        var y = i.relatedTarget || i.fromElement;
        if (y && ($s(y) || cp(y)))
          return;
      }
      if (!(!v && !p)) {
        var g;
        if (u.window === u)
          g = u;
        else {
          var _ = u.ownerDocument;
          _ ? g = _.defaultView || _.parentWindow : g = window;
        }
        var w, N;
        if (v) {
          var A = i.relatedTarget || i.toElement;
          if (w = a, N = A ? $s(A) : null, N !== null) {
            var j = fa(N);
            (N !== j || N.tag !== ie && N.tag !== Be) && (N = null);
          }
        } else
          w = null, N = a;
        if (w !== N) {
          var ue = Vd, Me = "onMouseLeave", xe = "onMouseEnter", Tt = "mouse";
          (t === "pointerout" || t === "pointerover") && (ue = lh, Me = "onPointerLeave", xe = "onPointerEnter", Tt = "pointer");
          var yt = w == null ? g : Ef(w), k = N == null ? g : Ef(N), H = new ue(Me, Tt + "leave", w, i, u);
          H.target = yt, H.relatedTarget = k;
          var O = null, X = $s(u);
          if (X === a) {
            var ve = new ue(xe, Tt + "enter", N, i, u);
            ve.target = k, ve.relatedTarget = yt, O = ve;
          }
          kT(e, H, O, w, N);
        }
      }
    }
    function L(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var G = typeof Object.is == "function" ? Object.is : L;
    function Se(e, t) {
      if (G(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!wr.call(t, s) || !G(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Ne(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Ue(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function $e(e, t) {
      for (var a = Ne(e), i = 0, u = 0; a; ) {
        if (a.nodeType === $i) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Ne(Ue(a));
      }
    }
    function Jn(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return Nt(e, u, s, f, p);
    }
    function Nt(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, y = 0, g = e, _ = null;
      e: for (; ; ) {
        for (var w = null; g === t && (a === 0 || g.nodeType === $i) && (f = s + a), g === i && (u === 0 || g.nodeType === $i) && (p = s + u), g.nodeType === $i && (s += g.nodeValue.length), (w = g.firstChild) !== null; )
          _ = g, g = w;
        for (; ; ) {
          if (g === e)
            break e;
          if (_ === t && ++v === a && (f = s), _ === i && ++y === u && (p = s), (w = g.nextSibling) !== null)
            break;
          g = _, _ = g.parentNode;
        }
        g = w;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function Vl(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var y = $e(e, f), g = $e(e, p);
        if (y && g) {
          if (u.rangeCount === 1 && u.anchorNode === y.node && u.anchorOffset === y.offset && u.focusNode === g.node && u.focusOffset === g.offset)
            return;
          var _ = a.createRange();
          _.setStart(y.node, y.offset), u.removeAllRanges(), f > p ? (u.addRange(_), u.extend(g.node, g.offset)) : (_.setEnd(g.node, g.offset), u.addRange(_));
        }
      }
    }
    function vh(e) {
      return e && e.nodeType === $i;
    }
    function mE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : vh(e) ? !1 : vh(t) ? mE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function fT(e) {
      return e && e.ownerDocument && mE(e.ownerDocument.documentElement, e);
    }
    function dT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function yE() {
      for (var e = window, t = xa(); t instanceof e.HTMLIFrameElement; ) {
        if (dT(t))
          e = t.contentWindow;
        else
          return t;
        t = xa(e.document);
      }
      return t;
    }
    function Ey(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function pT() {
      var e = yE();
      return {
        focusedElem: e,
        selectionRange: Ey(e) ? hT(e) : null
      };
    }
    function vT(e) {
      var t = yE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && fT(a)) {
        i !== null && Ey(a) && mT(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === Yr && u.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < u.length; f++) {
          var p = u[f];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function hT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Jn(e), t || {
        start: 0,
        end: 0
      };
    }
    function mT(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Vl(e, t);
    }
    var yT = kn && "documentMode" in document && document.documentMode <= 11;
    function gT() {
      ot("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var hf = null, Cy = null, Kd = null, Ry = !1;
    function ST(e) {
      if ("selectionStart" in e && Ey(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function ET(e) {
      return e.window === e ? e.document : e.nodeType === Ii ? e : e.ownerDocument;
    }
    function gE(e, t, a) {
      var i = ET(a);
      if (!(Ry || hf == null || hf !== xa(i))) {
        var u = ST(hf);
        if (!Kd || !Se(Kd, u)) {
          Kd = u;
          var s = gh(Cy, "onSelect");
          if (s.length > 0) {
            var f = new ki("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = hf;
          }
        }
      }
    }
    function CT(e, t, a, i, u, s, f) {
      var p = a ? Ef(a) : window;
      switch (t) {
        case "focusin":
          (Hs(p) || p.contentEditable === "true") && (hf = p, Cy = a, Kd = null);
          break;
        case "focusout":
          hf = null, Cy = null, Kd = null;
          break;
        case "mousedown":
          Ry = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ry = !1, gE(e, i, u);
          break;
        case "selectionchange":
          if (yT)
            break;
        case "keydown":
        case "keyup":
          gE(e, i, u);
      }
    }
    function hh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var mf = {
      animationend: hh("Animation", "AnimationEnd"),
      animationiteration: hh("Animation", "AnimationIteration"),
      animationstart: hh("Animation", "AnimationStart"),
      transitionend: hh("Transition", "TransitionEnd")
    }, Ty = {}, SE = {};
    kn && (SE = document.createElement("div").style, "AnimationEvent" in window || (delete mf.animationend.animation, delete mf.animationiteration.animation, delete mf.animationstart.animation), "TransitionEvent" in window || delete mf.transitionend.transition);
    function mh(e) {
      if (Ty[e])
        return Ty[e];
      if (!mf[e])
        return e;
      var t = mf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in SE)
          return Ty[e] = t[a];
      return e;
    }
    var EE = mh("animationend"), CE = mh("animationiteration"), RE = mh("animationstart"), TE = mh("transitionend"), wE = /* @__PURE__ */ new Map(), xE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function _o(e, t) {
      wE.set(e, t), ot(t, [e]);
    }
    function RT() {
      for (var e = 0; e < xE.length; e++) {
        var t = xE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        _o(a, "on" + i);
      }
      _o(EE, "onAnimationEnd"), _o(CE, "onAnimationIteration"), _o(RE, "onAnimationStart"), _o("dblclick", "onDoubleClick"), _o("focusin", "onFocus"), _o("focusout", "onBlur"), _o(TE, "onTransitionEnd");
    }
    function TT(e, t, a, i, u, s, f) {
      var p = wE.get(t);
      if (p !== void 0) {
        var v = ki, y = t;
        switch (t) {
          case "keypress":
            if (Fl(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = ih;
            break;
          case "focusin":
            y = "focus", v = Ji;
            break;
          case "focusout":
            y = "blur", v = Ji;
            break;
          case "beforeblur":
          case "afterblur":
            v = Ji;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Vd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Lu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = oh;
            break;
          case EE:
          case CE:
          case RE:
            v = eh;
            break;
          case TE:
            v = Ua;
            break;
          case "scroll":
            v = ta;
            break;
          case "wheel":
            v = my;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = uf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = lh;
            break;
        }
        var g = (s & _a) !== 0;
        {
          var _ = !g && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", w = bT(a, p, i.type, g, _);
          if (w.length > 0) {
            var N = new v(p, y, null, i, u);
            e.push({
              event: N,
              listeners: w
            });
          }
        }
      }
    }
    RT(), D(), Ps(), gT(), yy();
    function wT(e, t, a, i, u, s, f) {
      TT(e, t, a, i, u, s);
      var p = (s & cd) === 0;
      p && (x(e, t, a, i, u), bn(e, t, a, i, u), CT(e, t, a, i, u), dh(e, t, a, i, u));
    }
    var Zd = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], wy = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Zd));
    function _E(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Si(i, t, void 0, e), e.currentTarget = null;
    }
    function xT(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          _E(e, v, p), i = f;
        }
      else
        for (var y = 0; y < t.length; y++) {
          var g = t[y], _ = g.instance, w = g.currentTarget, N = g.listener;
          if (_ !== i && e.isPropagationStopped())
            return;
          _E(e, N, w), i = _;
        }
    }
    function bE(e, t) {
      for (var a = (t & _a) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        xT(s, f, a);
      }
      is();
    }
    function _T(e, t, a, i, u) {
      var s = fd(a), f = [];
      wT(f, e, i, a, s, t), bE(f, t);
    }
    function gn(e, t) {
      wy.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = nw(t), u = OT(e);
      i.has(u) || (DE(t, e, vc, a), i.add(u));
    }
    function xy(e, t, a) {
      wy.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= _a), DE(a, e, i, t);
    }
    var yh = "_reactListening" + Math.random().toString(36).slice(2);
    function Jd(e) {
      if (!e[yh]) {
        e[yh] = !0, nt.forEach(function(a) {
          a !== "selectionchange" && (wy.has(a) || xy(a, !1, e), xy(a, !0, e));
        });
        var t = e.nodeType === Ii ? e : e.ownerDocument;
        t !== null && (t[yh] || (t[yh] = !0, xy("selectionchange", !1, t)));
      }
    }
    function DE(e, t, a, i, u) {
      var s = or(e, t, a), f = void 0;
      as && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? Pd(e, t, s, f) : ea(e, t, s) : f !== void 0 ? Ro(e, t, s, f) : zs(e, t, s);
    }
    function kE(e, t) {
      return e === t || e.nodeType === Ln && e.parentNode === t;
    }
    function _y(e, t, a, i, u) {
      var s = i;
      if (!(t & sd) && !(t & vc)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === K || v === ye) {
              var y = p.stateNode.containerInfo;
              if (kE(y, f))
                break;
              if (v === ye)
                for (var g = p.return; g !== null; ) {
                  var _ = g.tag;
                  if (_ === K || _ === ye) {
                    var w = g.stateNode.containerInfo;
                    if (kE(w, f))
                      return;
                  }
                  g = g.return;
                }
              for (; y !== null; ) {
                var N = $s(y);
                if (N === null)
                  return;
                var A = N.tag;
                if (A === ie || A === Be) {
                  p = s = N;
                  continue e;
                }
                y = y.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      xv(function() {
        return _T(e, t, a, s);
      });
    }
    function ep(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function bT(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], y = e, g = null; y !== null; ) {
        var _ = y, w = _.stateNode, N = _.tag;
        if (N === ie && w !== null && (g = w, p !== null)) {
          var A = wl(y, p);
          A != null && v.push(ep(y, A, g));
        }
        if (u)
          break;
        y = y.return;
      }
      return v;
    }
    function gh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === ie && f !== null) {
          var v = f, y = wl(u, a);
          y != null && i.unshift(ep(u, y, v));
          var g = wl(u, t);
          g != null && i.push(ep(u, g, v));
        }
        u = u.return;
      }
      return i;
    }
    function yf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== ie);
      return e || null;
    }
    function DT(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = yf(s))
        u++;
      for (var f = 0, p = i; p; p = yf(p))
        f++;
      for (; u - f > 0; )
        a = yf(a), u--;
      for (; f - u > 0; )
        i = yf(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = yf(a), i = yf(i);
      }
      return null;
    }
    function OE(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, y = v.alternate, g = v.stateNode, _ = v.tag;
        if (y !== null && y === i)
          break;
        if (_ === ie && g !== null) {
          var w = g;
          if (u) {
            var N = wl(p, s);
            N != null && f.unshift(ep(p, N, w));
          } else if (!u) {
            var A = wl(p, s);
            A != null && f.push(ep(p, A, w));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function kT(e, t, a, i, u) {
      var s = i && u ? DT(i, u) : null;
      i !== null && OE(e, t, i, s, !1), u !== null && a !== null && OE(e, a, u, s, !0);
    }
    function OT(e, t) {
      return e + "__bubble";
    }
    var Aa = !1, tp = "dangerouslySetInnerHTML", Sh = "suppressContentEditableWarning", bo = "suppressHydrationWarning", LE = "autoFocus", Vs = "children", Bs = "style", Eh = "__html", by, Ch, np, ME, Rh, NE, zE;
    by = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Ch = function(e, t) {
      ld(e, t), dc(e, t), Rv(e, t, {
        registrationNameDependencies: et,
        possibleRegistrationNames: rt
      });
    }, NE = kn && !document.documentMode, np = function(e, t, a) {
      if (!Aa) {
        var i = Th(a), u = Th(t);
        u !== i && (Aa = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, ME = function(e) {
      if (!Aa) {
        Aa = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, Rh = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, zE = function(e, t) {
      var a = e.namespaceURI === Bi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var LT = /\r\n?/g, MT = /\u0000|\uFFFD/g;
    function Th(e) {
      Gn(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(LT, `
`).replace(MT, "");
    }
    function wh(e, t, a, i) {
      var u = Th(t), s = Th(e);
      if (s !== u && (i && (Aa || (Aa = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && Re))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function UE(e) {
      return e.nodeType === Ii ? e : e.ownerDocument;
    }
    function NT() {
    }
    function xh(e) {
      e.onclick = NT;
    }
    function zT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === Bs)
            f && Object.freeze(f), mv(t, f);
          else if (s === tp) {
            var p = f ? f[Eh] : void 0;
            p != null && av(t, p);
          } else if (s === Vs)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && ro(t, f);
            } else typeof f == "number" && ro(t, "" + f);
          else s === Sh || s === bo || s === LE || (et.hasOwnProperty(s) ? f != null && (typeof f != "function" && Rh(s, f), s === "onScroll" && gn("scroll", t)) : f != null && xr(t, s, f, u));
        }
    }
    function UT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === Bs ? mv(e, f) : s === tp ? av(e, f) : s === Vs ? ro(e, f) : xr(e, s, f, i);
      }
    }
    function AT(e, t, a, i) {
      var u, s = UE(a), f, p = i;
      if (p === Bi && (p = Jf(e)), p === Bi) {
        if (u = Rl(e, t), !u && e !== e.toLowerCase() && S("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var y = v.firstChild;
          f = v.removeChild(y);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var g = f;
          t.multiple ? g.multiple = !0 : t.size && (g.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === Bi && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !wr.call(by, e) && (by[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function FT(e, t) {
      return UE(t).createTextNode(e);
    }
    function jT(e, t, a, i) {
      var u = Rl(t, a);
      Ch(t, a);
      var s;
      switch (t) {
        case "dialog":
          gn("cancel", e), gn("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < Zd.length; f++)
            gn(Zd[f], e);
          s = a;
          break;
        case "source":
          gn("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e), s = a;
          break;
        case "details":
          gn("toggle", e), s = a;
          break;
        case "input":
          Za(e, a), s = no(e, a), gn("invalid", e);
          break;
        case "option":
          xt(e, a), s = a;
          break;
        case "select":
          uu(e, a), s = qo(e, a), gn("invalid", e);
          break;
        case "textarea":
          Xf(e, a), s = qf(e, a), gn("invalid", e);
          break;
        default:
          s = a;
      }
      switch (cc(t, s), zT(t, e, i, s, u), t) {
        case "input":
          Ka(e), z(e, a, !1);
          break;
        case "textarea":
          Ka(e), nv(e);
          break;
        case "option":
          tn(e, a);
          break;
        case "select":
          Wf(e, a);
          break;
        default:
          typeof s.onClick == "function" && xh(e);
          break;
      }
    }
    function HT(e, t, a, i, u) {
      Ch(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = no(e, a), p = no(e, i), s = [];
          break;
        case "select":
          f = qo(e, a), p = qo(e, i), s = [];
          break;
        case "textarea":
          f = qf(e, a), p = qf(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && xh(e);
          break;
      }
      cc(t, p);
      var v, y, g = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === Bs) {
            var _ = f[v];
            for (y in _)
              _.hasOwnProperty(y) && (g || (g = {}), g[y] = "");
          } else v === tp || v === Vs || v === Sh || v === bo || v === LE || (et.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var w = p[v], N = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || w === N || w == null && N == null))
          if (v === Bs)
            if (w && Object.freeze(w), N) {
              for (y in N)
                N.hasOwnProperty(y) && (!w || !w.hasOwnProperty(y)) && (g || (g = {}), g[y] = "");
              for (y in w)
                w.hasOwnProperty(y) && N[y] !== w[y] && (g || (g = {}), g[y] = w[y]);
            } else
              g || (s || (s = []), s.push(v, g)), g = w;
          else if (v === tp) {
            var A = w ? w[Eh] : void 0, j = N ? N[Eh] : void 0;
            A != null && j !== A && (s = s || []).push(v, A);
          } else v === Vs ? (typeof w == "string" || typeof w == "number") && (s = s || []).push(v, "" + w) : v === Sh || v === bo || (et.hasOwnProperty(v) ? (w != null && (typeof w != "function" && Rh(v, w), v === "onScroll" && gn("scroll", e)), !s && N !== w && (s = [])) : (s = s || []).push(v, w));
      }
      return g && (ey(g, p[Bs]), (s = s || []).push(Bs, g)), s;
    }
    function PT(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && h(e, u);
      var s = Rl(a, i), f = Rl(a, u);
      switch (UT(e, t, s, f), a) {
        case "input":
          C(e, u);
          break;
        case "textarea":
          tv(e, u);
          break;
        case "select":
          uc(e, u);
          break;
      }
    }
    function VT(e) {
      {
        var t = e.toLowerCase();
        return es.hasOwnProperty(t) && es[t] || null;
      }
    }
    function BT(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = Rl(t, a), Ch(t, a), t) {
        case "dialog":
          gn("cancel", e), gn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e);
          break;
        case "video":
        case "audio":
          for (var y = 0; y < Zd.length; y++)
            gn(Zd[y], e);
          break;
        case "source":
          gn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e);
          break;
        case "details":
          gn("toggle", e);
          break;
        case "input":
          Za(e, a), gn("invalid", e);
          break;
        case "option":
          xt(e, a);
          break;
        case "select":
          uu(e, a), gn("invalid", e);
          break;
        case "textarea":
          Xf(e, a), gn("invalid", e);
          break;
      }
      cc(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var g = e.attributes, _ = 0; _ < g.length; _++) {
          var w = g[_].name.toLowerCase();
          switch (w) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(g[_].name);
          }
        }
      }
      var N = null;
      for (var A in a)
        if (a.hasOwnProperty(A)) {
          var j = a[A];
          if (A === Vs)
            typeof j == "string" ? e.textContent !== j && (a[bo] !== !0 && wh(e.textContent, j, s, f), N = [Vs, j]) : typeof j == "number" && e.textContent !== "" + j && (a[bo] !== !0 && wh(e.textContent, j, s, f), N = [Vs, "" + j]);
          else if (et.hasOwnProperty(A))
            j != null && (typeof j != "function" && Rh(A, j), A === "onScroll" && gn("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var ue = void 0, Me = Jt(A);
            if (a[bo] !== !0) {
              if (!(A === Sh || A === bo || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              A === "value" || A === "checked" || A === "selected")) {
                if (A === tp) {
                  var xe = e.innerHTML, Tt = j ? j[Eh] : void 0;
                  if (Tt != null) {
                    var yt = zE(e, Tt);
                    yt !== xe && np(A, xe, yt);
                  }
                } else if (A === Bs) {
                  if (v.delete(A), NE) {
                    var k = Zm(j);
                    ue = e.getAttribute("style"), k !== ue && np(A, ue, k);
                  }
                } else if (p && !b)
                  v.delete(A.toLowerCase()), ue = eu(e, A, j), j !== ue && np(A, ue, j);
                else if (!pn(A, Me, p) && !qn(A, j, Me, p)) {
                  var H = !1;
                  if (Me !== null)
                    v.delete(Me.attributeName), ue = pl(e, A, j, Me);
                  else {
                    var O = i;
                    if (O === Bi && (O = Jf(t)), O === Bi)
                      v.delete(A.toLowerCase());
                    else {
                      var X = VT(A);
                      X !== null && X !== A && (H = !0, v.delete(X)), v.delete(A);
                    }
                    ue = eu(e, A, j);
                  }
                  var ve = b;
                  !ve && j !== ue && !H && np(A, ue, j);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[bo] !== !0 && ME(v), t) {
        case "input":
          Ka(e), z(e, a, !0);
          break;
        case "textarea":
          Ka(e), nv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && xh(e);
          break;
      }
      return N;
    }
    function $T(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Dy(e, t) {
      {
        if (Aa)
          return;
        Aa = !0, S("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function ky(e, t) {
      {
        if (Aa)
          return;
        Aa = !0, S('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function Oy(e, t, a) {
      {
        if (Aa)
          return;
        Aa = !0, S("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Ly(e, t) {
      {
        if (t === "" || Aa)
          return;
        Aa = !0, S('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function IT(e, t, a) {
      switch (t) {
        case "input":
          F(e, a);
          return;
        case "textarea":
          Gm(e, a);
          return;
        case "select":
          Gf(e, a);
          return;
      }
    }
    var rp = function() {
    }, ap = function() {
    };
    {
      var YT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], AE = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], QT = AE.concat(["button"]), WT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], FE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      ap = function(e, t) {
        var a = tt({}, e || FE), i = {
          tag: t
        };
        return AE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), QT.indexOf(t) !== -1 && (a.pTagInButtonScope = null), YT.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var GT = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return WT.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, qT = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, jE = {};
      rp = function(e, t, a) {
        a = a || FE;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = GT(e, u) ? null : i, f = s ? null : qT(e, a), p = s || f;
        if (p) {
          var v = p.tag, y = !!s + "|" + e + "|" + v;
          if (!jE[y]) {
            jE[y] = !0;
            var g = e, _ = "";
            if (e === "#text" ? /\S/.test(t) ? g = "Text nodes" : (g = "Whitespace text nodes", _ = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : g = "<" + e + ">", s) {
              var w = "";
              v === "table" && e === "tr" && (w += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), S("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", g, v, _, w);
            } else
              S("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", g, v);
          }
        }
      };
    }
    var _h = "suppressHydrationWarning", bh = "$", Dh = "/$", ip = "$?", lp = "$!", XT = "style", My = null, Ny = null;
    function KT(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Ii:
        case td: {
          t = i === Ii ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : ed(null, "");
          break;
        }
        default: {
          var s = i === Ln ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = ed(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = ap(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function ZT(e, t, a) {
      {
        var i = e, u = ed(i.namespace, t), s = ap(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function ED(e) {
      return e;
    }
    function JT(e) {
      My = Fn(), Ny = pT();
      var t = null;
      return Qn(!1), t;
    }
    function e1(e) {
      vT(Ny), Qn(My), My = null, Ny = null;
    }
    function t1(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (rp(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = ap(f.ancestorInfo, e);
          rp(null, p, v);
        }
        s = f.namespace;
      }
      var y = AT(e, t, a, s);
      return sp(u, y), Vy(y, t), y;
    }
    function n1(e, t) {
      e.appendChild(t);
    }
    function r1(e, t, a, i, u) {
      switch (jT(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function a1(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = ap(f.ancestorInfo, t);
          rp(null, p, v);
        }
      }
      return HT(e, t, a, i);
    }
    function zy(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function i1(e, t, a, i) {
      {
        var u = a;
        rp(null, e, u.ancestorInfo);
      }
      var s = FT(e, t);
      return sp(i, s), s;
    }
    function l1() {
      var e = window.event;
      return e === void 0 ? Ma : rf(e.type);
    }
    var Uy = typeof setTimeout == "function" ? setTimeout : void 0, u1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Ay = -1, HE = typeof Promise == "function" ? Promise : void 0, o1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof HE < "u" ? function(e) {
      return HE.resolve(null).then(e).catch(s1);
    } : Uy;
    function s1(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function c1(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function f1(e, t, a, i, u, s) {
      PT(e, t, a, i, u), Vy(e, u);
    }
    function PE(e) {
      ro(e, "");
    }
    function d1(e, t, a) {
      e.nodeValue = a;
    }
    function p1(e, t) {
      e.appendChild(t);
    }
    function v1(e, t) {
      var a;
      e.nodeType === Ln ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && xh(a);
    }
    function h1(e, t, a) {
      e.insertBefore(t, a);
    }
    function m1(e, t, a) {
      e.nodeType === Ln ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function y1(e, t) {
      e.removeChild(t);
    }
    function g1(e, t) {
      e.nodeType === Ln ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Fy(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Ln) {
          var s = u.data;
          if (s === Dh)
            if (i === 0) {
              e.removeChild(u), Du(t);
              return;
            } else
              i--;
          else (s === bh || s === ip || s === lp) && i++;
        }
        a = u;
      } while (a);
      Du(t);
    }
    function S1(e, t) {
      e.nodeType === Ln ? Fy(e.parentNode, t) : e.nodeType === Yr && Fy(e, t), Du(e);
    }
    function E1(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function C1(e) {
      e.nodeValue = "";
    }
    function R1(e, t) {
      e = e;
      var a = t[XT], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = sc("display", i);
    }
    function T1(e, t) {
      e.nodeValue = t;
    }
    function w1(e) {
      e.nodeType === Yr ? e.textContent = "" : e.nodeType === Ii && e.documentElement && e.removeChild(e.documentElement);
    }
    function x1(e, t, a) {
      return e.nodeType !== Yr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function _1(e, t) {
      return t === "" || e.nodeType !== $i ? null : e;
    }
    function b1(e) {
      return e.nodeType !== Ln ? null : e;
    }
    function VE(e) {
      return e.data === ip;
    }
    function jy(e) {
      return e.data === lp;
    }
    function D1(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function k1(e, t) {
      e._reactRetry = t;
    }
    function kh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Yr || t === $i)
          break;
        if (t === Ln) {
          var a = e.data;
          if (a === bh || a === lp || a === ip)
            break;
          if (a === Dh)
            return null;
        }
      }
      return e;
    }
    function up(e) {
      return kh(e.nextSibling);
    }
    function O1(e) {
      return kh(e.firstChild);
    }
    function L1(e) {
      return kh(e.firstChild);
    }
    function M1(e) {
      return kh(e.nextSibling);
    }
    function N1(e, t, a, i, u, s, f) {
      sp(s, e), Vy(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var y = (s.mode & ct) !== ke;
      return BT(e, t, a, p, i, y, f);
    }
    function z1(e, t, a, i) {
      return sp(a, e), a.mode & ct, $T(e, t);
    }
    function U1(e, t) {
      sp(t, e);
    }
    function A1(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === Dh) {
            if (a === 0)
              return up(t);
            a--;
          } else (i === bh || i === lp || i === ip) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function BE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === bh || i === lp || i === ip) {
            if (a === 0)
              return t;
            a--;
          } else i === Dh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function F1(e) {
      Du(e);
    }
    function j1(e) {
      Du(e);
    }
    function H1(e) {
      return e !== "head" && e !== "body";
    }
    function P1(e, t, a, i) {
      var u = !0;
      wh(t.nodeValue, a, i, u);
    }
    function V1(e, t, a, i, u, s) {
      if (t[_h] !== !0) {
        var f = !0;
        wh(i.nodeValue, u, s, f);
      }
    }
    function B1(e, t) {
      t.nodeType === Yr ? Dy(e, t) : t.nodeType === Ln || ky(e, t);
    }
    function $1(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Yr ? Dy(a, t) : t.nodeType === Ln || ky(a, t));
      }
    }
    function I1(e, t, a, i, u) {
      (u || t[_h] !== !0) && (i.nodeType === Yr ? Dy(a, i) : i.nodeType === Ln || ky(a, i));
    }
    function Y1(e, t, a) {
      Oy(e, t);
    }
    function Q1(e, t) {
      Ly(e, t);
    }
    function W1(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && Oy(i, t);
      }
    }
    function G1(e, t) {
      {
        var a = e.parentNode;
        a !== null && Ly(a, t);
      }
    }
    function q1(e, t, a, i, u, s) {
      (s || t[_h] !== !0) && Oy(a, i);
    }
    function X1(e, t, a, i, u) {
      (u || t[_h] !== !0) && Ly(a, i);
    }
    function K1(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function Z1(e) {
      Jd(e);
    }
    var gf = Math.random().toString(36).slice(2), Sf = "__reactFiber$" + gf, Hy = "__reactProps$" + gf, op = "__reactContainer$" + gf, Py = "__reactEvents$" + gf, J1 = "__reactListeners$" + gf, ew = "__reactHandles$" + gf;
    function tw(e) {
      delete e[Sf], delete e[Hy], delete e[Py], delete e[J1], delete e[ew];
    }
    function sp(e, t) {
      t[Sf] = e;
    }
    function Oh(e, t) {
      t[op] = e;
    }
    function $E(e) {
      e[op] = null;
    }
    function cp(e) {
      return !!e[op];
    }
    function $s(e) {
      var t = e[Sf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[op] || a[Sf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = BE(e); u !== null; ) {
              var s = u[Sf];
              if (s)
                return s;
              u = BE(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Do(e) {
      var t = e[Sf] || e[op];
      return t && (t.tag === ie || t.tag === Be || t.tag === be || t.tag === K) ? t : null;
    }
    function Ef(e) {
      if (e.tag === ie || e.tag === Be)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Lh(e) {
      return e[Hy] || null;
    }
    function Vy(e, t) {
      e[Hy] = t;
    }
    function nw(e) {
      var t = e[Py];
      return t === void 0 && (t = e[Py] = /* @__PURE__ */ new Set()), t;
    }
    var IE = {}, YE = M.ReactDebugCurrentFrame;
    function Mh(e) {
      if (e) {
        var t = e._owner, a = Hi(e.type, e._source, t ? t.type : null);
        YE.setExtraStackFrame(a);
      } else
        YE.setExtraStackFrame(null);
    }
    function tl(e, t, a, i, u) {
      {
        var s = Function.call.bind(wr);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              p = y;
            }
            p && !(p instanceof Error) && (Mh(u), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), Mh(null)), p instanceof Error && !(p.message in IE) && (IE[p.message] = !0, Mh(u), S("Failed %s type: %s", a, p.message), Mh(null));
          }
      }
    }
    var By = [], Nh;
    Nh = [];
    var zu = -1;
    function ko(e) {
      return {
        current: e
      };
    }
    function na(e, t) {
      if (zu < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== Nh[zu] && S("Unexpected Fiber popped."), e.current = By[zu], By[zu] = null, Nh[zu] = null, zu--;
    }
    function ra(e, t, a) {
      zu++, By[zu] = e.current, Nh[zu] = a, e.current = t;
    }
    var $y;
    $y = {};
    var ii = {};
    Object.freeze(ii);
    var Uu = ko(ii), Bl = ko(!1), Iy = ii;
    function Cf(e, t, a) {
      return a && $l(t) ? Iy : Uu.current;
    }
    function QE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Rf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return ii;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = Ye(e) || "Unknown";
          tl(i, s, "context", p);
        }
        return u && QE(e, t, s), s;
      }
    }
    function zh() {
      return Bl.current;
    }
    function $l(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Uh(e) {
      na(Bl, e), na(Uu, e);
    }
    function Yy(e) {
      na(Bl, e), na(Uu, e);
    }
    function WE(e, t, a) {
      {
        if (Uu.current !== ii)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        ra(Uu, t, e), ra(Bl, a, e);
      }
    }
    function GE(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = Ye(e) || "Unknown";
            $y[s] || ($y[s] = !0, S("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((Ye(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = Ye(e) || "Unknown";
          tl(u, f, "child context", v);
        }
        return tt({}, a, f);
      }
    }
    function Ah(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || ii;
        return Iy = Uu.current, ra(Uu, a, e), ra(Bl, Bl.current, e), !0;
      }
    }
    function qE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = GE(e, t, Iy);
          i.__reactInternalMemoizedMergedChildContext = u, na(Bl, e), na(Uu, e), ra(Uu, u, e), ra(Bl, a, e);
        } else
          na(Bl, e), ra(Bl, a, e);
      }
    }
    function rw(e) {
      {
        if (!vu(e) || e.tag !== fe)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case K:
              return t.stateNode.context;
            case fe: {
              var a = t.type;
              if ($l(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Oo = 0, Fh = 1, Au = null, Qy = !1, Wy = !1;
    function XE(e) {
      Au === null ? Au = [e] : Au.push(e);
    }
    function aw(e) {
      Qy = !0, XE(e);
    }
    function KE() {
      Qy && Lo();
    }
    function Lo() {
      if (!Wy && Au !== null) {
        Wy = !0;
        var e = 0, t = za();
        try {
          var a = !0, i = Au;
          for (An(Or); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Au = null, Qy = !1;
        } catch (s) {
          throw Au !== null && (Au = Au.slice(e + 1)), pd(os, Lo), s;
        } finally {
          An(t), Wy = !1;
        }
      }
      return null;
    }
    var Tf = [], wf = 0, jh = null, Hh = 0, Oi = [], Li = 0, Is = null, Fu = 1, ju = "";
    function iw(e) {
      return Qs(), (e.flags & Ei) !== De;
    }
    function lw(e) {
      return Qs(), Hh;
    }
    function uw() {
      var e = ju, t = Fu, a = t & ~ow(t);
      return a.toString(32) + e;
    }
    function Ys(e, t) {
      Qs(), Tf[wf++] = Hh, Tf[wf++] = jh, jh = e, Hh = t;
    }
    function ZE(e, t, a) {
      Qs(), Oi[Li++] = Fu, Oi[Li++] = ju, Oi[Li++] = Is, Is = e;
      var i = Fu, u = ju, s = Ph(i) - 1, f = i & ~(1 << s), p = a + 1, v = Ph(t) + s;
      if (v > 30) {
        var y = s - s % 5, g = (1 << y) - 1, _ = (f & g).toString(32), w = f >> y, N = s - y, A = Ph(t) + N, j = p << N, ue = j | w, Me = _ + u;
        Fu = 1 << A | ue, ju = Me;
      } else {
        var xe = p << s, Tt = xe | f, yt = u;
        Fu = 1 << v | Tt, ju = yt;
      }
    }
    function Gy(e) {
      Qs();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Ys(e, a), ZE(e, a, i);
      }
    }
    function Ph(e) {
      return 32 - zn(e);
    }
    function ow(e) {
      return 1 << Ph(e) - 1;
    }
    function qy(e) {
      for (; e === jh; )
        jh = Tf[--wf], Tf[wf] = null, Hh = Tf[--wf], Tf[wf] = null;
      for (; e === Is; )
        Is = Oi[--Li], Oi[Li] = null, ju = Oi[--Li], Oi[Li] = null, Fu = Oi[--Li], Oi[Li] = null;
    }
    function sw() {
      return Qs(), Is !== null ? {
        id: Fu,
        overflow: ju
      } : null;
    }
    function cw(e, t) {
      Qs(), Oi[Li++] = Fu, Oi[Li++] = ju, Oi[Li++] = Is, Fu = t.id, ju = t.overflow, Is = e;
    }
    function Qs() {
      Ur() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var zr = null, Mi = null, nl = !1, Ws = !1, Mo = null;
    function fw() {
      nl && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function JE() {
      Ws = !0;
    }
    function dw() {
      return Ws;
    }
    function pw(e) {
      var t = e.stateNode.containerInfo;
      return Mi = L1(t), zr = e, nl = !0, Mo = null, Ws = !1, !0;
    }
    function vw(e, t, a) {
      return Mi = M1(t), zr = e, nl = !0, Mo = null, Ws = !1, a !== null && cw(e, a), !0;
    }
    function eC(e, t) {
      switch (e.tag) {
        case K: {
          B1(e.stateNode.containerInfo, t);
          break;
        }
        case ie: {
          var a = (e.mode & ct) !== ke;
          I1(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case be: {
          var i = e.memoizedState;
          i.dehydrated !== null && $1(i.dehydrated, t);
          break;
        }
      }
    }
    function tC(e, t) {
      eC(e, t);
      var a = gb();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= ba) : i.push(a);
    }
    function Xy(e, t) {
      {
        if (Ws)
          return;
        switch (e.tag) {
          case K: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case ie:
                var i = t.type;
                t.pendingProps, Y1(a, i);
                break;
              case Be:
                var u = t.pendingProps;
                Q1(a, u);
                break;
            }
            break;
          }
          case ie: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case ie: {
                var v = t.type, y = t.pendingProps, g = (e.mode & ct) !== ke;
                q1(
                  s,
                  f,
                  p,
                  v,
                  y,
                  // TODO: Delete this argument when we remove the legacy root API.
                  g
                );
                break;
              }
              case Be: {
                var _ = t.pendingProps, w = (e.mode & ct) !== ke;
                X1(
                  s,
                  f,
                  p,
                  _,
                  // TODO: Delete this argument when we remove the legacy root API.
                  w
                );
                break;
              }
            }
            break;
          }
          case be: {
            var N = e.memoizedState, A = N.dehydrated;
            if (A !== null) switch (t.tag) {
              case ie:
                var j = t.type;
                t.pendingProps, W1(A, j);
                break;
              case Be:
                var ue = t.pendingProps;
                G1(A, ue);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function nC(e, t) {
      t.flags = t.flags & ~Wr | hn, Xy(e, t);
    }
    function rC(e, t) {
      switch (e.tag) {
        case ie: {
          var a = e.type;
          e.pendingProps;
          var i = x1(t, a);
          return i !== null ? (e.stateNode = i, zr = e, Mi = O1(i), !0) : !1;
        }
        case Be: {
          var u = e.pendingProps, s = _1(t, u);
          return s !== null ? (e.stateNode = s, zr = e, Mi = null, !0) : !1;
        }
        case be: {
          var f = b1(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: sw(),
              retryLane: Kr
            };
            e.memoizedState = p;
            var v = Sb(f);
            return v.return = e, e.child = v, zr = e, Mi = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function Ky(e) {
      return (e.mode & ct) !== ke && (e.flags & _e) === De;
    }
    function Zy(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function Jy(e) {
      if (nl) {
        var t = Mi;
        if (!t) {
          Ky(e) && (Xy(zr, e), Zy()), nC(zr, e), nl = !1, zr = e;
          return;
        }
        var a = t;
        if (!rC(e, t)) {
          Ky(e) && (Xy(zr, e), Zy()), t = up(a);
          var i = zr;
          if (!t || !rC(e, t)) {
            nC(zr, e), nl = !1, zr = e;
            return;
          }
          tC(i, a);
        }
      }
    }
    function hw(e, t, a) {
      var i = e.stateNode, u = !Ws, s = N1(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function mw(e) {
      var t = e.stateNode, a = e.memoizedProps, i = z1(t, a, e);
      if (i) {
        var u = zr;
        if (u !== null)
          switch (u.tag) {
            case K: {
              var s = u.stateNode.containerInfo, f = (u.mode & ct) !== ke;
              P1(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case ie: {
              var p = u.type, v = u.memoizedProps, y = u.stateNode, g = (u.mode & ct) !== ke;
              V1(
                p,
                v,
                y,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                g
              );
              break;
            }
          }
      }
      return i;
    }
    function yw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      U1(a, e);
    }
    function gw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return A1(a);
    }
    function aC(e) {
      for (var t = e.return; t !== null && t.tag !== ie && t.tag !== K && t.tag !== be; )
        t = t.return;
      zr = t;
    }
    function Vh(e) {
      if (e !== zr)
        return !1;
      if (!nl)
        return aC(e), nl = !0, !1;
      if (e.tag !== K && (e.tag !== ie || H1(e.type) && !zy(e.type, e.memoizedProps))) {
        var t = Mi;
        if (t)
          if (Ky(e))
            iC(e), Zy();
          else
            for (; t; )
              tC(e, t), t = up(t);
      }
      return aC(e), e.tag === be ? Mi = gw(e) : Mi = zr ? up(e.stateNode) : null, !0;
    }
    function Sw() {
      return nl && Mi !== null;
    }
    function iC(e) {
      for (var t = Mi; t; )
        eC(e, t), t = up(t);
    }
    function xf() {
      zr = null, Mi = null, nl = !1, Ws = !1;
    }
    function lC() {
      Mo !== null && (J0(Mo), Mo = null);
    }
    function Ur() {
      return nl;
    }
    function eg(e) {
      Mo === null ? Mo = [e] : Mo.push(e);
    }
    var Ew = M.ReactCurrentBatchConfig, Cw = null;
    function Rw() {
      return Ew.transition;
    }
    var rl = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var Tw = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Wt && (t = a), a = a.return;
        return t;
      }, Gs = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, fp = [], dp = [], pp = [], vp = [], hp = [], mp = [], qs = /* @__PURE__ */ new Set();
      rl.recordUnsafeLifecycleWarnings = function(e, t) {
        qs.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && fp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillMount == "function" && dp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && pp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillReceiveProps == "function" && vp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && hp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillUpdate == "function" && mp.push(e));
      }, rl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        fp.length > 0 && (fp.forEach(function(w) {
          e.add(Ye(w) || "Component"), qs.add(w.type);
        }), fp = []);
        var t = /* @__PURE__ */ new Set();
        dp.length > 0 && (dp.forEach(function(w) {
          t.add(Ye(w) || "Component"), qs.add(w.type);
        }), dp = []);
        var a = /* @__PURE__ */ new Set();
        pp.length > 0 && (pp.forEach(function(w) {
          a.add(Ye(w) || "Component"), qs.add(w.type);
        }), pp = []);
        var i = /* @__PURE__ */ new Set();
        vp.length > 0 && (vp.forEach(function(w) {
          i.add(Ye(w) || "Component"), qs.add(w.type);
        }), vp = []);
        var u = /* @__PURE__ */ new Set();
        hp.length > 0 && (hp.forEach(function(w) {
          u.add(Ye(w) || "Component"), qs.add(w.type);
        }), hp = []);
        var s = /* @__PURE__ */ new Set();
        if (mp.length > 0 && (mp.forEach(function(w) {
          s.add(Ye(w) || "Component"), qs.add(w.type);
        }), mp = []), t.size > 0) {
          var f = Gs(t);
          S(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = Gs(i);
          S(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = Gs(s);
          S(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var y = Gs(e);
          Ie(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, y);
        }
        if (a.size > 0) {
          var g = Gs(a);
          Ie(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, g);
        }
        if (u.size > 0) {
          var _ = Gs(u);
          Ie(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, _);
        }
      };
      var Bh = /* @__PURE__ */ new Map(), uC = /* @__PURE__ */ new Set();
      rl.recordLegacyContextWarning = function(e, t) {
        var a = Tw(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!uC.has(e.type)) {
          var i = Bh.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Bh.set(a, i)), i.push(e));
        }
      }, rl.flushLegacyContextWarning = function() {
        Bh.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(Ye(s) || "Component"), uC.add(s.type);
            });
            var u = Gs(i);
            try {
              It(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              on();
            }
          }
        });
      }, rl.discardPendingWarnings = function() {
        fp = [], dp = [], pp = [], vp = [], hp = [], mp = [], Bh = /* @__PURE__ */ new Map();
      };
    }
    var tg, ng, rg, ag, ig, oC = function(e, t) {
    };
    tg = !1, ng = !1, rg = {}, ag = {}, ig = {}, oC = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = Ye(t) || "Component";
        ag[a] || (ag[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function ww(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function yp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Wt || P) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== fe) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !ww(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = Ye(e) || "Component";
          rg[u] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), rg[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== fe)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          oi(i, "ref");
          var y = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === y)
            return t.ref;
          var g = function(_) {
            var w = v.refs;
            _ === null ? delete w[y] : w[y] = _;
          };
          return g._stringRef = y, g;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function $h(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Ih(e) {
      {
        var t = Ye(e) || "Component";
        if (ig[t])
          return;
        ig[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function sC(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function cC(e) {
      function t(k, H) {
        if (e) {
          var O = k.deletions;
          O === null ? (k.deletions = [H], k.flags |= ba) : O.push(H);
        }
      }
      function a(k, H) {
        if (!e)
          return null;
        for (var O = H; O !== null; )
          t(k, O), O = O.sibling;
        return null;
      }
      function i(k, H) {
        for (var O = /* @__PURE__ */ new Map(), X = H; X !== null; )
          X.key !== null ? O.set(X.key, X) : O.set(X.index, X), X = X.sibling;
        return O;
      }
      function u(k, H) {
        var O = ac(k, H);
        return O.index = 0, O.sibling = null, O;
      }
      function s(k, H, O) {
        if (k.index = O, !e)
          return k.flags |= Ei, H;
        var X = k.alternate;
        if (X !== null) {
          var ve = X.index;
          return ve < H ? (k.flags |= hn, H) : ve;
        } else
          return k.flags |= hn, H;
      }
      function f(k) {
        return e && k.alternate === null && (k.flags |= hn), k;
      }
      function p(k, H, O, X) {
        if (H === null || H.tag !== Be) {
          var ve = eE(O, k.mode, X);
          return ve.return = k, ve;
        } else {
          var ce = u(H, O);
          return ce.return = k, ce;
        }
      }
      function v(k, H, O, X) {
        var ve = O.type;
        if (ve === ci)
          return g(k, H, O.props.children, X, O.key);
        if (H !== null && (H.elementType === ve || // Keep this check inline so it only runs on the false path:
        hR(H, O) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof ve == "object" && ve !== null && ve.$$typeof === Qe && sC(ve) === H.type)) {
          var ce = u(H, O.props);
          return ce.ref = yp(k, H, O), ce.return = k, ce._debugSource = O._source, ce._debugOwner = O._owner, ce;
        }
        var Ve = JS(O, k.mode, X);
        return Ve.ref = yp(k, H, O), Ve.return = k, Ve;
      }
      function y(k, H, O, X) {
        if (H === null || H.tag !== ye || H.stateNode.containerInfo !== O.containerInfo || H.stateNode.implementation !== O.implementation) {
          var ve = tE(O, k.mode, X);
          return ve.return = k, ve;
        } else {
          var ce = u(H, O.children || []);
          return ce.return = k, ce;
        }
      }
      function g(k, H, O, X, ve) {
        if (H === null || H.tag !== ht) {
          var ce = $o(O, k.mode, X, ve);
          return ce.return = k, ce;
        } else {
          var Ve = u(H, O);
          return Ve.return = k, Ve;
        }
      }
      function _(k, H, O) {
        if (typeof H == "string" && H !== "" || typeof H == "number") {
          var X = eE("" + H, k.mode, O);
          return X.return = k, X;
        }
        if (typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case _r: {
              var ve = JS(H, k.mode, O);
              return ve.ref = yp(k, null, H), ve.return = k, ve;
            }
            case nr: {
              var ce = tE(H, k.mode, O);
              return ce.return = k, ce;
            }
            case Qe: {
              var Ve = H._payload, qe = H._init;
              return _(k, qe(Ve), O);
            }
          }
          if (it(H) || Ke(H)) {
            var qt = $o(H, k.mode, O, null);
            return qt.return = k, qt;
          }
          $h(k, H);
        }
        return typeof H == "function" && Ih(k), null;
      }
      function w(k, H, O, X) {
        var ve = H !== null ? H.key : null;
        if (typeof O == "string" && O !== "" || typeof O == "number")
          return ve !== null ? null : p(k, H, "" + O, X);
        if (typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case _r:
              return O.key === ve ? v(k, H, O, X) : null;
            case nr:
              return O.key === ve ? y(k, H, O, X) : null;
            case Qe: {
              var ce = O._payload, Ve = O._init;
              return w(k, H, Ve(ce), X);
            }
          }
          if (it(O) || Ke(O))
            return ve !== null ? null : g(k, H, O, X, null);
          $h(k, O);
        }
        return typeof O == "function" && Ih(k), null;
      }
      function N(k, H, O, X, ve) {
        if (typeof X == "string" && X !== "" || typeof X == "number") {
          var ce = k.get(O) || null;
          return p(H, ce, "" + X, ve);
        }
        if (typeof X == "object" && X !== null) {
          switch (X.$$typeof) {
            case _r: {
              var Ve = k.get(X.key === null ? O : X.key) || null;
              return v(H, Ve, X, ve);
            }
            case nr: {
              var qe = k.get(X.key === null ? O : X.key) || null;
              return y(H, qe, X, ve);
            }
            case Qe:
              var qt = X._payload, zt = X._init;
              return N(k, H, O, zt(qt), ve);
          }
          if (it(X) || Ke(X)) {
            var Wn = k.get(O) || null;
            return g(H, Wn, X, ve, null);
          }
          $h(H, X);
        }
        return typeof X == "function" && Ih(H), null;
      }
      function A(k, H, O) {
        {
          if (typeof k != "object" || k === null)
            return H;
          switch (k.$$typeof) {
            case _r:
            case nr:
              oC(k, O);
              var X = k.key;
              if (typeof X != "string")
                break;
              if (H === null) {
                H = /* @__PURE__ */ new Set(), H.add(X);
                break;
              }
              if (!H.has(X)) {
                H.add(X);
                break;
              }
              S("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", X);
              break;
            case Qe:
              var ve = k._payload, ce = k._init;
              A(ce(ve), H, O);
              break;
          }
        }
        return H;
      }
      function j(k, H, O, X) {
        for (var ve = null, ce = 0; ce < O.length; ce++) {
          var Ve = O[ce];
          ve = A(Ve, ve, k);
        }
        for (var qe = null, qt = null, zt = H, Wn = 0, Ut = 0, Hn = null; zt !== null && Ut < O.length; Ut++) {
          zt.index > Ut ? (Hn = zt, zt = null) : Hn = zt.sibling;
          var ia = w(k, zt, O[Ut], X);
          if (ia === null) {
            zt === null && (zt = Hn);
            break;
          }
          e && zt && ia.alternate === null && t(k, zt), Wn = s(ia, Wn, Ut), qt === null ? qe = ia : qt.sibling = ia, qt = ia, zt = Hn;
        }
        if (Ut === O.length) {
          if (a(k, zt), Ur()) {
            var Br = Ut;
            Ys(k, Br);
          }
          return qe;
        }
        if (zt === null) {
          for (; Ut < O.length; Ut++) {
            var ui = _(k, O[Ut], X);
            ui !== null && (Wn = s(ui, Wn, Ut), qt === null ? qe = ui : qt.sibling = ui, qt = ui);
          }
          if (Ur()) {
            var Ea = Ut;
            Ys(k, Ea);
          }
          return qe;
        }
        for (var Ca = i(k, zt); Ut < O.length; Ut++) {
          var la = N(Ca, k, Ut, O[Ut], X);
          la !== null && (e && la.alternate !== null && Ca.delete(la.key === null ? Ut : la.key), Wn = s(la, Wn, Ut), qt === null ? qe = la : qt.sibling = la, qt = la);
        }
        if (e && Ca.forEach(function(If) {
          return t(k, If);
        }), Ur()) {
          var Yu = Ut;
          Ys(k, Yu);
        }
        return qe;
      }
      function ue(k, H, O, X) {
        var ve = Ke(O);
        if (typeof ve != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          O[Symbol.toStringTag] === "Generator" && (ng || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), ng = !0), O.entries === ve && (tg || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), tg = !0);
          var ce = ve.call(O);
          if (ce)
            for (var Ve = null, qe = ce.next(); !qe.done; qe = ce.next()) {
              var qt = qe.value;
              Ve = A(qt, Ve, k);
            }
        }
        var zt = ve.call(O);
        if (zt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Wn = null, Ut = null, Hn = H, ia = 0, Br = 0, ui = null, Ea = zt.next(); Hn !== null && !Ea.done; Br++, Ea = zt.next()) {
          Hn.index > Br ? (ui = Hn, Hn = null) : ui = Hn.sibling;
          var Ca = w(k, Hn, Ea.value, X);
          if (Ca === null) {
            Hn === null && (Hn = ui);
            break;
          }
          e && Hn && Ca.alternate === null && t(k, Hn), ia = s(Ca, ia, Br), Ut === null ? Wn = Ca : Ut.sibling = Ca, Ut = Ca, Hn = ui;
        }
        if (Ea.done) {
          if (a(k, Hn), Ur()) {
            var la = Br;
            Ys(k, la);
          }
          return Wn;
        }
        if (Hn === null) {
          for (; !Ea.done; Br++, Ea = zt.next()) {
            var Yu = _(k, Ea.value, X);
            Yu !== null && (ia = s(Yu, ia, Br), Ut === null ? Wn = Yu : Ut.sibling = Yu, Ut = Yu);
          }
          if (Ur()) {
            var If = Br;
            Ys(k, If);
          }
          return Wn;
        }
        for (var qp = i(k, Hn); !Ea.done; Br++, Ea = zt.next()) {
          var Kl = N(qp, k, Br, Ea.value, X);
          Kl !== null && (e && Kl.alternate !== null && qp.delete(Kl.key === null ? Br : Kl.key), ia = s(Kl, ia, Br), Ut === null ? Wn = Kl : Ut.sibling = Kl, Ut = Kl);
        }
        if (e && qp.forEach(function(Xb) {
          return t(k, Xb);
        }), Ur()) {
          var qb = Br;
          Ys(k, qb);
        }
        return Wn;
      }
      function Me(k, H, O, X) {
        if (H !== null && H.tag === Be) {
          a(k, H.sibling);
          var ve = u(H, O);
          return ve.return = k, ve;
        }
        a(k, H);
        var ce = eE(O, k.mode, X);
        return ce.return = k, ce;
      }
      function xe(k, H, O, X) {
        for (var ve = O.key, ce = H; ce !== null; ) {
          if (ce.key === ve) {
            var Ve = O.type;
            if (Ve === ci) {
              if (ce.tag === ht) {
                a(k, ce.sibling);
                var qe = u(ce, O.props.children);
                return qe.return = k, qe._debugSource = O._source, qe._debugOwner = O._owner, qe;
              }
            } else if (ce.elementType === Ve || // Keep this check inline so it only runs on the false path:
            hR(ce, O) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof Ve == "object" && Ve !== null && Ve.$$typeof === Qe && sC(Ve) === ce.type) {
              a(k, ce.sibling);
              var qt = u(ce, O.props);
              return qt.ref = yp(k, ce, O), qt.return = k, qt._debugSource = O._source, qt._debugOwner = O._owner, qt;
            }
            a(k, ce);
            break;
          } else
            t(k, ce);
          ce = ce.sibling;
        }
        if (O.type === ci) {
          var zt = $o(O.props.children, k.mode, X, O.key);
          return zt.return = k, zt;
        } else {
          var Wn = JS(O, k.mode, X);
          return Wn.ref = yp(k, H, O), Wn.return = k, Wn;
        }
      }
      function Tt(k, H, O, X) {
        for (var ve = O.key, ce = H; ce !== null; ) {
          if (ce.key === ve)
            if (ce.tag === ye && ce.stateNode.containerInfo === O.containerInfo && ce.stateNode.implementation === O.implementation) {
              a(k, ce.sibling);
              var Ve = u(ce, O.children || []);
              return Ve.return = k, Ve;
            } else {
              a(k, ce);
              break;
            }
          else
            t(k, ce);
          ce = ce.sibling;
        }
        var qe = tE(O, k.mode, X);
        return qe.return = k, qe;
      }
      function yt(k, H, O, X) {
        var ve = typeof O == "object" && O !== null && O.type === ci && O.key === null;
        if (ve && (O = O.props.children), typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case _r:
              return f(xe(k, H, O, X));
            case nr:
              return f(Tt(k, H, O, X));
            case Qe:
              var ce = O._payload, Ve = O._init;
              return yt(k, H, Ve(ce), X);
          }
          if (it(O))
            return j(k, H, O, X);
          if (Ke(O))
            return ue(k, H, O, X);
          $h(k, O);
        }
        return typeof O == "string" && O !== "" || typeof O == "number" ? f(Me(k, H, "" + O, X)) : (typeof O == "function" && Ih(k), a(k, H));
      }
      return yt;
    }
    var _f = cC(!0), fC = cC(!1);
    function xw(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = ac(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = ac(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function _w(e, t) {
      for (var a = e.child; a !== null; )
        pb(a, t), a = a.sibling;
    }
    var lg = ko(null), ug;
    ug = {};
    var Yh = null, bf = null, og = null, Qh = !1;
    function Wh() {
      Yh = null, bf = null, og = null, Qh = !1;
    }
    function dC() {
      Qh = !0;
    }
    function pC() {
      Qh = !1;
    }
    function vC(e, t, a) {
      ra(lg, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== ug && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = ug;
    }
    function sg(e, t) {
      var a = lg.current;
      na(lg, t), e._currentValue = a;
    }
    function cg(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (bu(i.childLanes, t) ? u !== null && !bu(u.childLanes, t) && (u.childLanes = Ze(u.childLanes, t)) : (i.childLanes = Ze(i.childLanes, t), u !== null && (u.childLanes = Ze(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && S("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function bw(e, t, a) {
      Dw(e, t, a);
    }
    function Dw(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === fe) {
                var p = Rs(a), v = Hu(Xt, p);
                v.tag = qh;
                var y = i.updateQueue;
                if (y !== null) {
                  var g = y.shared, _ = g.pending;
                  _ === null ? v.next = v : (v.next = _.next, _.next = v), g.pending = v;
                }
              }
              i.lanes = Ze(i.lanes, a);
              var w = i.alternate;
              w !== null && (w.lanes = Ze(w.lanes, a)), cg(i.return, a, e), s.lanes = Ze(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === vt)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Kt) {
          var N = i.return;
          if (N === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          N.lanes = Ze(N.lanes, a);
          var A = N.alternate;
          A !== null && (A.lanes = Ze(A.lanes, a)), cg(N, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var j = u.sibling;
            if (j !== null) {
              j.return = u.return, u = j;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function Df(e, t) {
      Yh = e, bf = null, og = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (Zr(a.lanes, t) && Mp(), a.firstContext = null);
      }
    }
    function er(e) {
      Qh && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (og !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (bf === null) {
          if (Yh === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          bf = a, Yh.dependencies = {
            lanes: Y,
            firstContext: a
          };
        } else
          bf = bf.next = a;
      }
      return t;
    }
    var Xs = null;
    function fg(e) {
      Xs === null ? Xs = [e] : Xs.push(e);
    }
    function kw() {
      if (Xs !== null) {
        for (var e = 0; e < Xs.length; e++) {
          var t = Xs[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var s = u.next;
              u.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        Xs = null;
      }
    }
    function hC(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, fg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Gh(e, i);
    }
    function Ow(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, fg(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function Lw(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, fg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Gh(e, i);
    }
    function Fa(e, t) {
      return Gh(e, t);
    }
    var Mw = Gh;
    function Gh(e, t) {
      e.lanes = Ze(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = Ze(a.lanes, t)), a === null && (e.flags & (hn | Wr)) !== De && fR(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = Ze(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = Ze(a.childLanes, t) : (u.flags & (hn | Wr)) !== De && fR(e), i = u, u = u.return;
      if (i.tag === K) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var mC = 0, yC = 1, qh = 2, dg = 3, Xh = !1, pg, Kh;
    pg = !1, Kh = null;
    function vg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: Y
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function gC(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function Hu(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: mC,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function No(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (Kh === u && !pg && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), pg = !0), O_()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, Mw(e, a);
      } else
        return Lw(e, u, t, a);
    }
    function Zh(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (Od(a)) {
          var s = u.lanes;
          s = Md(s, e.pendingLanes);
          var f = Ze(s, a);
          u.lanes = f, Jc(e, f);
        }
      }
    }
    function hg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var y = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = y : (f.next = y, f = y), v = v.next;
            } while (v !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var g = a.lastBaseUpdate;
      g === null ? a.firstBaseUpdate = t : g.next = t, a.lastBaseUpdate = t;
    }
    function Nw(e, t, a, i, u, s) {
      switch (a.tag) {
        case yC: {
          var f = a.payload;
          if (typeof f == "function") {
            dC();
            var p = f.call(s, i, u);
            {
              if (e.mode & Wt) {
                mn(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              pC();
            }
            return p;
          }
          return f;
        }
        case dg:
          e.flags = e.flags & ~Xn | _e;
        case mC: {
          var v = a.payload, y;
          if (typeof v == "function") {
            dC(), y = v.call(s, i, u);
            {
              if (e.mode & Wt) {
                mn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              pC();
            }
          } else
            y = v;
          return y == null ? i : tt({}, i, y);
        }
        case qh:
          return Xh = !0, i;
      }
      return i;
    }
    function Jh(e, t, a, i) {
      var u = e.updateQueue;
      Xh = !1, Kh = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, y = v.next;
        v.next = null, f === null ? s = y : f.next = y, f = v;
        var g = e.alternate;
        if (g !== null) {
          var _ = g.updateQueue, w = _.lastBaseUpdate;
          w !== f && (w === null ? _.firstBaseUpdate = y : w.next = y, _.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var N = u.baseState, A = Y, j = null, ue = null, Me = null, xe = s;
        do {
          var Tt = xe.lane, yt = xe.eventTime;
          if (bu(i, Tt)) {
            if (Me !== null) {
              var H = {
                eventTime: yt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Dt,
                tag: xe.tag,
                payload: xe.payload,
                callback: xe.callback,
                next: null
              };
              Me = Me.next = H;
            }
            N = Nw(e, u, xe, N, t, a);
            var O = xe.callback;
            if (O !== null && // If the update was already committed, we should not queue its
            // callback again.
            xe.lane !== Dt) {
              e.flags |= nn;
              var X = u.effects;
              X === null ? u.effects = [xe] : X.push(xe);
            }
          } else {
            var k = {
              eventTime: yt,
              lane: Tt,
              tag: xe.tag,
              payload: xe.payload,
              callback: xe.callback,
              next: null
            };
            Me === null ? (ue = Me = k, j = N) : Me = Me.next = k, A = Ze(A, Tt);
          }
          if (xe = xe.next, xe === null) {
            if (p = u.shared.pending, p === null)
              break;
            var ve = p, ce = ve.next;
            ve.next = null, xe = ce, u.lastBaseUpdate = ve, u.shared.pending = null;
          }
        } while (!0);
        Me === null && (j = N), u.baseState = j, u.firstBaseUpdate = ue, u.lastBaseUpdate = Me;
        var Ve = u.shared.interleaved;
        if (Ve !== null) {
          var qe = Ve;
          do
            A = Ze(A, qe.lane), qe = qe.next;
          while (qe !== Ve);
        } else s === null && (u.shared.lanes = Y);
        Ip(A), e.lanes = A, e.memoizedState = N;
      }
      Kh = null;
    }
    function zw(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function SC() {
      Xh = !1;
    }
    function em() {
      return Xh;
    }
    function EC(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, zw(f, a));
        }
    }
    var gp = {}, zo = ko(gp), Sp = ko(gp), tm = ko(gp);
    function nm(e) {
      if (e === gp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function CC() {
      var e = nm(tm.current);
      return e;
    }
    function mg(e, t) {
      ra(tm, t, e), ra(Sp, e, e), ra(zo, gp, e);
      var a = KT(t);
      na(zo, e), ra(zo, a, e);
    }
    function kf(e) {
      na(zo, e), na(Sp, e), na(tm, e);
    }
    function yg() {
      var e = nm(zo.current);
      return e;
    }
    function RC(e) {
      nm(tm.current);
      var t = nm(zo.current), a = ZT(t, e.type);
      t !== a && (ra(Sp, e, e), ra(zo, a, e));
    }
    function gg(e) {
      Sp.current === e && (na(zo, e), na(Sp, e));
    }
    var Uw = 0, TC = 1, wC = 1, Ep = 2, al = ko(Uw);
    function Sg(e, t) {
      return (e & t) !== 0;
    }
    function Of(e) {
      return e & TC;
    }
    function Eg(e, t) {
      return e & TC | t;
    }
    function Aw(e, t) {
      return e | t;
    }
    function Uo(e, t) {
      ra(al, t, e);
    }
    function Lf(e) {
      na(al, e);
    }
    function Fw(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function rm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === be) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || VE(i) || jy(i))
              return t;
          }
        } else if (t.tag === an && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & _e) !== De;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var ja = (
      /*   */
      0
    ), sr = (
      /* */
      1
    ), Il = (
      /*  */
      2
    ), cr = (
      /*    */
      4
    ), Ar = (
      /*   */
      8
    ), Cg = [];
    function Rg() {
      for (var e = 0; e < Cg.length; e++) {
        var t = Cg[e];
        t._workInProgressVersionPrimary = null;
      }
      Cg.length = 0;
    }
    function jw(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var pe = M.ReactCurrentDispatcher, Cp = M.ReactCurrentBatchConfig, Tg, Mf;
    Tg = /* @__PURE__ */ new Set();
    var Ks = Y, Gt = null, fr = null, dr = null, am = !1, Rp = !1, Tp = 0, Hw = 0, Pw = 25, V = null, Ni = null, Ao = -1, wg = !1;
    function Pt() {
      {
        var e = V;
        Ni === null ? Ni = [e] : Ni.push(e);
      }
    }
    function te() {
      {
        var e = V;
        Ni !== null && (Ao++, Ni[Ao] !== e && Vw(e));
      }
    }
    function Nf(e) {
      e != null && !it(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", V, typeof e);
    }
    function Vw(e) {
      {
        var t = Ye(Gt);
        if (!Tg.has(t) && (Tg.add(t), Ni !== null)) {
          for (var a = "", i = 30, u = 0; u <= Ao; u++) {
            for (var s = Ni[u], f = u === Ao ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          S(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function aa() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function xg(e, t) {
      if (wg)
        return !1;
      if (t === null)
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", V), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, V, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!G(e[a], t[a]))
          return !1;
      return !0;
    }
    function zf(e, t, a, i, u, s) {
      Ks = s, Gt = t, Ni = e !== null ? e._debugHookTypes : null, Ao = -1, wg = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = Y, e !== null && e.memoizedState !== null ? pe.current = QC : Ni !== null ? pe.current = YC : pe.current = IC;
      var f = a(i, u);
      if (Rp) {
        var p = 0;
        do {
          if (Rp = !1, Tp = 0, p >= Pw)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, wg = !1, fr = null, dr = null, t.updateQueue = null, Ao = -1, pe.current = WC, f = a(i, u);
        } while (Rp);
      }
      pe.current = ym, t._debugHookTypes = Ni;
      var v = fr !== null && fr.next !== null;
      if (Ks = Y, Gt = null, fr = null, dr = null, V = null, Ni = null, Ao = -1, e !== null && (e.flags & Nn) !== (t.flags & Nn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & ct) !== ke && S("Internal React error: Expected static flag was missing. Please notify the React team."), am = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function Uf() {
      var e = Tp !== 0;
      return Tp = 0, e;
    }
    function xC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Mt) !== ke ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ts(e.lanes, a);
    }
    function _C() {
      if (pe.current = ym, am) {
        for (var e = Gt.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        am = !1;
      }
      Ks = Y, Gt = null, fr = null, dr = null, Ni = null, Ao = -1, V = null, HC = !1, Rp = !1, Tp = 0;
    }
    function Yl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return dr === null ? Gt.memoizedState = dr = e : dr = dr.next = e, dr;
    }
    function zi() {
      var e;
      if (fr === null) {
        var t = Gt.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = fr.next;
      var a;
      if (dr === null ? a = Gt.memoizedState : a = dr.next, a !== null)
        dr = a, a = dr.next, fr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        fr = e;
        var i = {
          memoizedState: fr.memoizedState,
          baseState: fr.baseState,
          baseQueue: fr.baseQueue,
          queue: fr.queue,
          next: null
        };
        dr === null ? Gt.memoizedState = dr = i : dr = dr.next = i;
      }
      return dr;
    }
    function bC() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function _g(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function bg(e, t, a) {
      var i = Yl(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: Y,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = Yw.bind(null, Gt, s);
      return [i.memoizedState, f];
    }
    function Dg(e, t, a) {
      var i = zi(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = fr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, y = p.next;
          f.next = y, p.next = v;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var g = f.next, _ = s.baseState, w = null, N = null, A = null, j = g;
        do {
          var ue = j.lane;
          if (bu(Ks, ue)) {
            if (A !== null) {
              var xe = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Dt,
                action: j.action,
                hasEagerState: j.hasEagerState,
                eagerState: j.eagerState,
                next: null
              };
              A = A.next = xe;
            }
            if (j.hasEagerState)
              _ = j.eagerState;
            else {
              var Tt = j.action;
              _ = e(_, Tt);
            }
          } else {
            var Me = {
              lane: ue,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            };
            A === null ? (N = A = Me, w = _) : A = A.next = Me, Gt.lanes = Ze(Gt.lanes, ue), Ip(ue);
          }
          j = j.next;
        } while (j !== null && j !== g);
        A === null ? w = _ : A.next = N, G(_, i.memoizedState) || Mp(), i.memoizedState = _, i.baseState = w, i.baseQueue = A, u.lastRenderedState = _;
      }
      var yt = u.interleaved;
      if (yt !== null) {
        var k = yt;
        do {
          var H = k.lane;
          Gt.lanes = Ze(Gt.lanes, H), Ip(H), k = k.next;
        } while (k !== yt);
      } else f === null && (u.lanes = Y);
      var O = u.dispatch;
      return [i.memoizedState, O];
    }
    function kg(e, t, a) {
      var i = zi(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, y = v;
        do {
          var g = y.action;
          p = e(p, g), y = y.next;
        } while (y !== v);
        G(p, i.memoizedState) || Mp(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function CD(e, t, a) {
    }
    function RD(e, t, a) {
    }
    function Og(e, t, a) {
      var i = Gt, u = Yl(), s, f = Ur();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Mf || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), Mf = !0);
      } else {
        if (s = t(), !Mf) {
          var p = t();
          G(s, p) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Mf = !0);
        }
        var v = Am();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Kc(v, Ks) || DC(i, t, s);
      }
      u.memoizedState = s;
      var y = {
        value: s,
        getSnapshot: t
      };
      return u.queue = y, sm(OC.bind(null, i, y, e), [e]), i.flags |= Qr, wp(sr | Ar, kC.bind(null, i, y, s, t), void 0, null), s;
    }
    function im(e, t, a) {
      var i = Gt, u = zi(), s = t();
      if (!Mf) {
        var f = t();
        G(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Mf = !0);
      }
      var p = u.memoizedState, v = !G(p, s);
      v && (u.memoizedState = s, Mp());
      var y = u.queue;
      if (_p(OC.bind(null, i, y, e), [e]), y.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      dr !== null && dr.memoizedState.tag & sr) {
        i.flags |= Qr, wp(sr | Ar, kC.bind(null, i, y, s, t), void 0, null);
        var g = Am();
        if (g === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Kc(g, Ks) || DC(i, t, s);
      }
      return s;
    }
    function DC(e, t, a) {
      e.flags |= po;
      var i = {
        getSnapshot: t,
        value: a
      }, u = Gt.updateQueue;
      if (u === null)
        u = bC(), Gt.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function kC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, LC(t) && MC(e);
    }
    function OC(e, t, a) {
      var i = function() {
        LC(t) && MC(e);
      };
      return a(i);
    }
    function LC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !G(a, i);
      } catch {
        return !0;
      }
    }
    function MC(e) {
      var t = Fa(e, je);
      t !== null && mr(t, e, je, Xt);
    }
    function lm(e) {
      var t = Yl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: Y,
        dispatch: null,
        lastRenderedReducer: _g,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = Qw.bind(null, Gt, a);
      return [t.memoizedState, i];
    }
    function Lg(e) {
      return Dg(_g);
    }
    function Mg(e) {
      return kg(_g);
    }
    function wp(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = Gt.updateQueue;
      if (s === null)
        s = bC(), Gt.updateQueue = s, s.lastEffect = u.next = u;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = u.next = u;
        else {
          var p = f.next;
          f.next = u, u.next = p, s.lastEffect = u;
        }
      }
      return u;
    }
    function Ng(e) {
      var t = Yl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function um(e) {
      var t = zi();
      return t.memoizedState;
    }
    function xp(e, t, a, i) {
      var u = Yl(), s = i === void 0 ? null : i;
      Gt.flags |= e, u.memoizedState = wp(sr | t, a, void 0, s);
    }
    function om(e, t, a, i) {
      var u = zi(), s = i === void 0 ? null : i, f = void 0;
      if (fr !== null) {
        var p = fr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (xg(s, v)) {
            u.memoizedState = wp(t, a, f, s);
            return;
          }
        }
      }
      Gt.flags |= e, u.memoizedState = wp(sr | t, a, f, s);
    }
    function sm(e, t) {
      return (Gt.mode & Mt) !== ke ? xp(Ci | Qr | wc, Ar, e, t) : xp(Qr | wc, Ar, e, t);
    }
    function _p(e, t) {
      return om(Qr, Ar, e, t);
    }
    function zg(e, t) {
      return xp(Et, Il, e, t);
    }
    function cm(e, t) {
      return om(Et, Il, e, t);
    }
    function Ug(e, t) {
      var a = Et;
      return a |= Qi, (Gt.mode & Mt) !== ke && (a |= _l), xp(a, cr, e, t);
    }
    function fm(e, t) {
      return om(Et, cr, e, t);
    }
    function NC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || S("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function Ag(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = Et;
      return u |= Qi, (Gt.mode & Mt) !== ke && (u |= _l), xp(u, cr, NC.bind(null, t, e), i);
    }
    function dm(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return om(Et, cr, NC.bind(null, t, e), i);
    }
    function Bw(e, t) {
    }
    var pm = Bw;
    function Fg(e, t) {
      var a = Yl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function vm(e, t) {
      var a = zi(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (xg(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function jg(e, t) {
      var a = Yl(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function hm(e, t) {
      var a = zi(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (xg(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function Hg(e) {
      var t = Yl();
      return t.memoizedState = e, e;
    }
    function zC(e) {
      var t = zi(), a = fr, i = a.memoizedState;
      return AC(t, i, e);
    }
    function UC(e) {
      var t = zi();
      if (fr === null)
        return t.memoizedState = e, e;
      var a = fr.memoizedState;
      return AC(t, a, e);
    }
    function AC(e, t, a) {
      var i = !Dd(Ks);
      if (i) {
        if (!G(a, t)) {
          var u = Ld();
          Gt.lanes = Ze(Gt.lanes, u), Ip(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Mp()), e.memoizedState = a, a;
    }
    function $w(e, t, a) {
      var i = za();
      An(Qv(i, xi)), e(!0);
      var u = Cp.transition;
      Cp.transition = {};
      var s = Cp.transition;
      Cp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (An(i), Cp.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && Ie("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function Pg() {
      var e = lm(!1), t = e[0], a = e[1], i = $w.bind(null, a), u = Yl();
      return u.memoizedState = i, [t, i];
    }
    function FC() {
      var e = Lg(), t = e[0], a = zi(), i = a.memoizedState;
      return [t, i];
    }
    function jC() {
      var e = Mg(), t = e[0], a = zi(), i = a.memoizedState;
      return [t, i];
    }
    var HC = !1;
    function Iw() {
      return HC;
    }
    function Vg() {
      var e = Yl(), t = Am(), a = t.identifierPrefix, i;
      if (Ur()) {
        var u = uw();
        i = ":" + a + "R" + u;
        var s = Tp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Hw++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function mm() {
      var e = zi(), t = e.memoizedState;
      return t;
    }
    function Yw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Vo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (PC(e))
        VC(t, u);
      else {
        var s = hC(e, t, u, i);
        if (s !== null) {
          var f = Sa();
          mr(s, e, i, f), BC(s, t, i);
        }
      }
      $C(e, i);
    }
    function Qw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Vo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (PC(e))
        VC(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === Y && (s === null || s.lanes === Y)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = pe.current, pe.current = il;
            try {
              var v = t.lastRenderedState, y = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = y, G(y, v)) {
                Ow(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              pe.current = p;
            }
          }
        }
        var g = hC(e, t, u, i);
        if (g !== null) {
          var _ = Sa();
          mr(g, e, i, _), BC(g, t, i);
        }
      }
      $C(e, i);
    }
    function PC(e) {
      var t = e.alternate;
      return e === Gt || t !== null && t === Gt;
    }
    function VC(e, t) {
      Rp = am = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function BC(e, t, a) {
      if (Od(a)) {
        var i = t.lanes;
        i = Md(i, e.pendingLanes);
        var u = Ze(i, a);
        t.lanes = u, Jc(e, u);
      }
    }
    function $C(e, t, a) {
      ps(e, t);
    }
    var ym = {
      readContext: er,
      useCallback: aa,
      useContext: aa,
      useEffect: aa,
      useImperativeHandle: aa,
      useInsertionEffect: aa,
      useLayoutEffect: aa,
      useMemo: aa,
      useReducer: aa,
      useRef: aa,
      useState: aa,
      useDebugValue: aa,
      useDeferredValue: aa,
      useTransition: aa,
      useMutableSource: aa,
      useSyncExternalStore: aa,
      useId: aa,
      unstable_isNewReconciler: J
    }, IC = null, YC = null, QC = null, WC = null, Ql = null, il = null, gm = null;
    {
      var Bg = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, We = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      IC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", Pt(), Nf(t), Fg(e, t);
        },
        useContext: function(e) {
          return V = "useContext", Pt(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", Pt(), Nf(t), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", Pt(), Nf(a), Ag(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", Pt(), Nf(t), zg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", Pt(), Nf(t), Ug(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", Pt(), Nf(t);
          var a = pe.current;
          pe.current = Ql;
          try {
            return jg(e, t);
          } finally {
            pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", Pt();
          var i = pe.current;
          pe.current = Ql;
          try {
            return bg(e, t, a);
          } finally {
            pe.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", Pt(), Ng(e);
        },
        useState: function(e) {
          V = "useState", Pt();
          var t = pe.current;
          pe.current = Ql;
          try {
            return lm(e);
          } finally {
            pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", Pt(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", Pt(), Hg(e);
        },
        useTransition: function() {
          return V = "useTransition", Pt(), Pg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", Pt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", Pt(), Og(e, t, a);
        },
        useId: function() {
          return V = "useId", Pt(), Vg();
        },
        unstable_isNewReconciler: J
      }, YC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", te(), Fg(e, t);
        },
        useContext: function(e) {
          return V = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", te(), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", te(), Ag(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", te(), zg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", te(), Ug(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", te();
          var a = pe.current;
          pe.current = Ql;
          try {
            return jg(e, t);
          } finally {
            pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", te();
          var i = pe.current;
          pe.current = Ql;
          try {
            return bg(e, t, a);
          } finally {
            pe.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", te(), Ng(e);
        },
        useState: function(e) {
          V = "useState", te();
          var t = pe.current;
          pe.current = Ql;
          try {
            return lm(e);
          } finally {
            pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", te(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", te(), Hg(e);
        },
        useTransition: function() {
          return V = "useTransition", te(), Pg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", te(), Og(e, t, a);
        },
        useId: function() {
          return V = "useId", te(), Vg();
        },
        unstable_isNewReconciler: J
      }, QC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", te();
          var a = pe.current;
          pe.current = il;
          try {
            return hm(e, t);
          } finally {
            pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", te();
          var i = pe.current;
          pe.current = il;
          try {
            return Dg(e, t, a);
          } finally {
            pe.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", te(), um();
        },
        useState: function(e) {
          V = "useState", te();
          var t = pe.current;
          pe.current = il;
          try {
            return Lg(e);
          } finally {
            pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", te(), zC(e);
        },
        useTransition: function() {
          return V = "useTransition", te(), FC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", te(), im(e, t);
        },
        useId: function() {
          return V = "useId", te(), mm();
        },
        unstable_isNewReconciler: J
      }, WC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", te();
          var a = pe.current;
          pe.current = gm;
          try {
            return hm(e, t);
          } finally {
            pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", te();
          var i = pe.current;
          pe.current = gm;
          try {
            return kg(e, t, a);
          } finally {
            pe.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", te(), um();
        },
        useState: function(e) {
          V = "useState", te();
          var t = pe.current;
          pe.current = gm;
          try {
            return Mg(e);
          } finally {
            pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", te(), UC(e);
        },
        useTransition: function() {
          return V = "useTransition", te(), jC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", te(), im(e, t);
        },
        useId: function() {
          return V = "useId", te(), mm();
        },
        unstable_isNewReconciler: J
      }, Ql = {
        readContext: function(e) {
          return Bg(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", We(), Pt(), Fg(e, t);
        },
        useContext: function(e) {
          return V = "useContext", We(), Pt(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", We(), Pt(), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", We(), Pt(), Ag(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", We(), Pt(), zg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", We(), Pt(), Ug(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", We(), Pt();
          var a = pe.current;
          pe.current = Ql;
          try {
            return jg(e, t);
          } finally {
            pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", We(), Pt();
          var i = pe.current;
          pe.current = Ql;
          try {
            return bg(e, t, a);
          } finally {
            pe.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", We(), Pt(), Ng(e);
        },
        useState: function(e) {
          V = "useState", We(), Pt();
          var t = pe.current;
          pe.current = Ql;
          try {
            return lm(e);
          } finally {
            pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", We(), Pt(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", We(), Pt(), Hg(e);
        },
        useTransition: function() {
          return V = "useTransition", We(), Pt(), Pg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", We(), Pt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", We(), Pt(), Og(e, t, a);
        },
        useId: function() {
          return V = "useId", We(), Pt(), Vg();
        },
        unstable_isNewReconciler: J
      }, il = {
        readContext: function(e) {
          return Bg(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", We(), te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", We(), te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", We(), te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", We(), te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", We(), te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", We(), te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", We(), te();
          var a = pe.current;
          pe.current = il;
          try {
            return hm(e, t);
          } finally {
            pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", We(), te();
          var i = pe.current;
          pe.current = il;
          try {
            return Dg(e, t, a);
          } finally {
            pe.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", We(), te(), um();
        },
        useState: function(e) {
          V = "useState", We(), te();
          var t = pe.current;
          pe.current = il;
          try {
            return Lg(e);
          } finally {
            pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", We(), te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", We(), te(), zC(e);
        },
        useTransition: function() {
          return V = "useTransition", We(), te(), FC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", We(), te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", We(), te(), im(e, t);
        },
        useId: function() {
          return V = "useId", We(), te(), mm();
        },
        unstable_isNewReconciler: J
      }, gm = {
        readContext: function(e) {
          return Bg(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", We(), te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", We(), te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", We(), te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", We(), te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", We(), te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", We(), te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", We(), te();
          var a = pe.current;
          pe.current = il;
          try {
            return hm(e, t);
          } finally {
            pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", We(), te();
          var i = pe.current;
          pe.current = il;
          try {
            return kg(e, t, a);
          } finally {
            pe.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", We(), te(), um();
        },
        useState: function(e) {
          V = "useState", We(), te();
          var t = pe.current;
          pe.current = il;
          try {
            return Mg(e);
          } finally {
            pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", We(), te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", We(), te(), UC(e);
        },
        useTransition: function() {
          return V = "useTransition", We(), te(), jC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", We(), te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", We(), te(), im(e, t);
        },
        useId: function() {
          return V = "useId", We(), te(), mm();
        },
        unstable_isNewReconciler: J
      };
    }
    var Fo = B.unstable_now, GC = 0, Sm = -1, bp = -1, Em = -1, $g = !1, Cm = !1;
    function qC() {
      return $g;
    }
    function Ww() {
      Cm = !0;
    }
    function Gw() {
      $g = !1, Cm = !1;
    }
    function qw() {
      $g = Cm, Cm = !1;
    }
    function XC() {
      return GC;
    }
    function KC() {
      GC = Fo();
    }
    function Ig(e) {
      bp = Fo(), e.actualStartTime < 0 && (e.actualStartTime = Fo());
    }
    function ZC(e) {
      bp = -1;
    }
    function Rm(e, t) {
      if (bp >= 0) {
        var a = Fo() - bp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), bp = -1;
      }
    }
    function Wl(e) {
      if (Sm >= 0) {
        var t = Fo() - Sm;
        Sm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case K:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case mt:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function Yg(e) {
      if (Em >= 0) {
        var t = Fo() - Em;
        Em = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case K:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case mt:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Gl() {
      Sm = Fo();
    }
    function Qg() {
      Em = Fo();
    }
    function Wg(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function ll(e, t) {
      if (e && e.defaultProps) {
        var a = tt({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var Gg = {}, qg, Xg, Kg, Zg, Jg, JC, Tm, eS, tS, nS, Dp;
    {
      qg = /* @__PURE__ */ new Set(), Xg = /* @__PURE__ */ new Set(), Kg = /* @__PURE__ */ new Set(), Zg = /* @__PURE__ */ new Set(), eS = /* @__PURE__ */ new Set(), Jg = /* @__PURE__ */ new Set(), tS = /* @__PURE__ */ new Set(), nS = /* @__PURE__ */ new Set(), Dp = /* @__PURE__ */ new Set();
      var e0 = /* @__PURE__ */ new Set();
      Tm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          e0.has(a) || (e0.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, JC = function(e, t) {
        if (t === void 0) {
          var a = wt(e) || "Component";
          Jg.has(a) || (Jg.add(a), S("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(Gg, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(Gg);
    }
    function rS(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & Wt) {
          mn(!0);
          try {
            s = a(i, u);
          } finally {
            mn(!1);
          }
        }
        JC(t, s);
      }
      var f = s == null ? u : tt({}, u, s);
      if (e.memoizedState = f, e.lanes === Y) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var aS = {
      isMounted: Ov,
      enqueueSetState: function(e, t, a) {
        var i = fo(e), u = Sa(), s = Vo(i), f = Hu(u, s);
        f.payload = t, a != null && (Tm(a, "setState"), f.callback = a);
        var p = No(i, f, s);
        p !== null && (mr(p, i, s, u), Zh(p, i, s)), ps(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = fo(e), u = Sa(), s = Vo(i), f = Hu(u, s);
        f.tag = yC, f.payload = t, a != null && (Tm(a, "replaceState"), f.callback = a);
        var p = No(i, f, s);
        p !== null && (mr(p, i, s, u), Zh(p, i, s)), ps(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = fo(e), i = Sa(), u = Vo(a), s = Hu(i, u);
        s.tag = qh, t != null && (Tm(t, "forceUpdate"), s.callback = t);
        var f = No(a, s, u);
        f !== null && (mr(f, a, u, i), Zh(f, a, u)), Lc(a, u);
      }
    };
    function t0(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Wt) {
            mn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              mn(!1);
            }
          }
          v === void 0 && S("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", wt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Se(a, i) || !Se(u, s) : !0;
    }
    function Xw(e, t, a) {
      var i = e.stateNode;
      {
        var u = wt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Dp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Wt) === ke && (Dp.add(t), S(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Dp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Wt) === ke && (Dp.add(t), S(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !tS.has(t) && (tS.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", wt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !Kg.has(t) && (Kg.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", wt(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || it(p)) && S("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function n0(e, t) {
      t.updater = aS, e.stateNode = t, pu(t, e), t._reactInternalInstance = Gg;
    }
    function r0(e, t, a) {
      var i = !1, u = ii, s = ii, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === R && f._context === void 0
        );
        if (!p && !nS.has(t)) {
          nS.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === di ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", S("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", wt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = er(f);
      else {
        u = Cf(e, t, !0);
        var y = t.contextTypes;
        i = y != null, s = i ? Rf(e, u) : ii;
      }
      var g = new t(a, s);
      if (e.mode & Wt) {
        mn(!0);
        try {
          g = new t(a, s);
        } finally {
          mn(!1);
        }
      }
      var _ = e.memoizedState = g.state !== null && g.state !== void 0 ? g.state : null;
      n0(e, g);
      {
        if (typeof t.getDerivedStateFromProps == "function" && _ === null) {
          var w = wt(t) || "Component";
          Xg.has(w) || (Xg.add(w), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", w, g.state === null ? "null" : "undefined", w));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof g.getSnapshotBeforeUpdate == "function") {
          var N = null, A = null, j = null;
          if (typeof g.componentWillMount == "function" && g.componentWillMount.__suppressDeprecationWarning !== !0 ? N = "componentWillMount" : typeof g.UNSAFE_componentWillMount == "function" && (N = "UNSAFE_componentWillMount"), typeof g.componentWillReceiveProps == "function" && g.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? A = "componentWillReceiveProps" : typeof g.UNSAFE_componentWillReceiveProps == "function" && (A = "UNSAFE_componentWillReceiveProps"), typeof g.componentWillUpdate == "function" && g.componentWillUpdate.__suppressDeprecationWarning !== !0 ? j = "componentWillUpdate" : typeof g.UNSAFE_componentWillUpdate == "function" && (j = "UNSAFE_componentWillUpdate"), N !== null || A !== null || j !== null) {
            var ue = wt(t) || "Component", Me = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            Zg.has(ue) || (Zg.add(ue), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ue, Me, N !== null ? `
  ` + N : "", A !== null ? `
  ` + A : "", j !== null ? `
  ` + j : ""));
          }
        }
      }
      return i && QE(e, u, s), g;
    }
    function Kw(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Ye(e) || "Component"), aS.enqueueReplaceState(t, t.state, null));
    }
    function a0(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = Ye(e) || "Component";
          qg.has(s) || (qg.add(s), S("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        aS.enqueueReplaceState(t, t.state, null);
      }
    }
    function iS(e, t, a, i) {
      Xw(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, vg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = er(s);
      else {
        var f = Cf(e, t, !0);
        u.context = Rf(e, f);
      }
      {
        if (u.state === a) {
          var p = wt(t) || "Component";
          eS.has(p) || (eS.add(p), S("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & Wt && rl.recordLegacyContextWarning(e, u), rl.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (rS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (Kw(e, u), Jh(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var y = Et;
        y |= Qi, (e.mode & Mt) !== ke && (y |= _l), e.flags |= y;
      }
    }
    function Zw(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = ii;
      if (typeof p == "object" && p !== null)
        v = er(p);
      else {
        var y = Cf(e, t, !0);
        v = Rf(e, y);
      }
      var g = t.getDerivedStateFromProps, _ = typeof g == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !_ && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && a0(e, u, a, v), SC();
      var w = e.memoizedState, N = u.state = w;
      if (Jh(e, a, u, i), N = e.memoizedState, s === a && w === N && !zh() && !em()) {
        if (typeof u.componentDidMount == "function") {
          var A = Et;
          A |= Qi, (e.mode & Mt) !== ke && (A |= _l), e.flags |= A;
        }
        return !1;
      }
      typeof g == "function" && (rS(e, t, g, a), N = e.memoizedState);
      var j = em() || t0(e, t, s, a, w, N, v);
      if (j) {
        if (!_ && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var ue = Et;
          ue |= Qi, (e.mode & Mt) !== ke && (ue |= _l), e.flags |= ue;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var Me = Et;
          Me |= Qi, (e.mode & Mt) !== ke && (Me |= _l), e.flags |= Me;
        }
        e.memoizedProps = a, e.memoizedState = N;
      }
      return u.props = a, u.state = N, u.context = v, j;
    }
    function Jw(e, t, a, i, u) {
      var s = t.stateNode;
      gC(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : ll(t.type, f);
      s.props = p;
      var v = t.pendingProps, y = s.context, g = a.contextType, _ = ii;
      if (typeof g == "object" && g !== null)
        _ = er(g);
      else {
        var w = Cf(t, a, !0);
        _ = Rf(t, w);
      }
      var N = a.getDerivedStateFromProps, A = typeof N == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !A && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || y !== _) && a0(t, s, i, _), SC();
      var j = t.memoizedState, ue = s.state = j;
      if (Jh(t, i, s, u), ue = t.memoizedState, f === v && j === ue && !zh() && !em() && !Te)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= Et), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= In), !1;
      typeof N == "function" && (rS(t, a, N, i), ue = t.memoizedState);
      var Me = em() || t0(t, a, p, i, j, ue, _) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Te;
      return Me ? (!A && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, ue, _), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, ue, _)), typeof s.componentDidUpdate == "function" && (t.flags |= Et), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= In)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= Et), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= In), t.memoizedProps = i, t.memoizedState = ue), s.props = i, s.state = ue, s.context = _, Me;
    }
    function Zs(e, t) {
      return {
        value: e,
        source: t,
        stack: Pi(t),
        digest: null
      };
    }
    function lS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function ex(e, t) {
      return !0;
    }
    function uS(e, t) {
      try {
        var a = ex(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === fe)
            return;
          console.error(i);
        }
        var p = u ? Ye(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", y;
        if (e.tag === K)
          y = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var g = Ye(e) || "Anonymous";
          y = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + g + ".");
        }
        var _ = v + `
` + f + `

` + ("" + y);
        console.error(_);
      } catch (w) {
        setTimeout(function() {
          throw w;
        });
      }
    }
    var tx = typeof WeakMap == "function" ? WeakMap : Map;
    function i0(e, t, a) {
      var i = Hu(Xt, a);
      i.tag = dg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        W_(u), uS(e, t);
      }, i;
    }
    function oS(e, t, a) {
      var i = Hu(Xt, a);
      i.tag = dg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          mR(e), uS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        mR(e), uS(e, t), typeof u != "function" && Y_(this);
        var v = t.value, y = t.stack;
        this.componentDidCatch(v, {
          componentStack: y !== null ? y : ""
        }), typeof u != "function" && (Zr(e.lanes, je) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Ye(e) || "Unknown"));
      }), i;
    }
    function l0(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new tx(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = G_.bind(null, e, t, a);
        Xr && Yp(e, a), t.then(s, s);
      }
    }
    function nx(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function rx(e, t) {
      var a = e.tag;
      if ((e.mode & ct) === ke && (a === oe || a === Ge || a === He)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function u0(e) {
      var t = e;
      do {
        if (t.tag === be && Fw(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function o0(e, t, a, i, u) {
      if ((e.mode & ct) === ke) {
        if (e === t)
          e.flags |= Xn;
        else {
          if (e.flags |= _e, a.flags |= Tc, a.flags &= -52805, a.tag === fe) {
            var s = a.alternate;
            if (s === null)
              a.tag = jt;
            else {
              var f = Hu(Xt, je);
              f.tag = qh, No(a, f, je);
            }
          }
          a.lanes = Ze(a.lanes, je);
        }
        return e;
      }
      return e.flags |= Xn, e.lanes = u, e;
    }
    function ax(e, t, a, i, u) {
      if (a.flags |= us, Xr && Yp(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        rx(a), Ur() && a.mode & ct && JE();
        var f = u0(t);
        if (f !== null) {
          f.flags &= ~Er, o0(f, t, a, e, u), f.mode & ct && l0(e, s, u), nx(f, e, s);
          return;
        } else {
          if (!jv(u)) {
            l0(e, s, u), VS();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Ur() && a.mode & ct) {
        JE();
        var v = u0(t);
        if (v !== null) {
          (v.flags & Xn) === De && (v.flags |= Er), o0(v, t, a, e, u), eg(Zs(i, a));
          return;
        }
      }
      i = Zs(i, a), F_(i);
      var y = t;
      do {
        switch (y.tag) {
          case K: {
            var g = i;
            y.flags |= Xn;
            var _ = Rs(u);
            y.lanes = Ze(y.lanes, _);
            var w = i0(y, g, _);
            hg(y, w);
            return;
          }
          case fe:
            var N = i, A = y.type, j = y.stateNode;
            if ((y.flags & _e) === De && (typeof A.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && !uR(j))) {
              y.flags |= Xn;
              var ue = Rs(u);
              y.lanes = Ze(y.lanes, ue);
              var Me = oS(y, N, ue);
              hg(y, Me);
              return;
            }
            break;
        }
        y = y.return;
      } while (y !== null);
    }
    function ix() {
      return null;
    }
    var kp = M.ReactCurrentOwner, ul = !1, sS, Op, cS, fS, dS, Js, pS, wm, Lp;
    sS = {}, Op = {}, cS = {}, fS = {}, dS = {}, Js = !1, pS = {}, wm = {}, Lp = {};
    function ya(e, t, a, i) {
      e === null ? t.child = fC(t, null, a, i) : t.child = _f(t, e.child, a, i);
    }
    function lx(e, t, a, i) {
      t.child = _f(t, e.child, null, i), t.child = _f(t, null, a, i);
    }
    function s0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && tl(
          s,
          i,
          // Resolved props
          "prop",
          wt(a)
        );
      }
      var f = a.render, p = t.ref, v, y;
      Df(t, u), pa(t);
      {
        if (kp.current = t, $n(!0), v = zf(e, t, f, i, p, u), y = Uf(), t.mode & Wt) {
          mn(!0);
          try {
            v = zf(e, t, f, i, p, u), y = Uf();
          } finally {
            mn(!1);
          }
        }
        $n(!1);
      }
      return va(), e !== null && !ul ? (xC(e, t, u), Pu(e, t, u)) : (Ur() && y && Gy(t), t.flags |= ei, ya(e, t, v, u), t.child);
    }
    function c0(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (fb(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = $f(s), t.tag = He, t.type = f, mS(t, s), f0(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          if (p && tl(
            p,
            i,
            // Resolved props
            "prop",
            wt(s)
          ), a.defaultProps !== void 0) {
            var v = wt(s) || "Unknown";
            Lp[v] || (S("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), Lp[v] = !0);
          }
        }
        var y = ZS(a.type, null, i, t, t.mode, u);
        return y.ref = t.ref, y.return = t, t.child = y, y;
      }
      {
        var g = a.type, _ = g.propTypes;
        _ && tl(
          _,
          i,
          // Resolved props
          "prop",
          wt(g)
        );
      }
      var w = e.child, N = RS(e, u);
      if (!N) {
        var A = w.memoizedProps, j = a.compare;
        if (j = j !== null ? j : Se, j(A, i) && e.ref === t.ref)
          return Pu(e, t, u);
      }
      t.flags |= ei;
      var ue = ac(w, i);
      return ue.ref = t.ref, ue.return = t, t.child = ue, ue;
    }
    function f0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === Qe) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var y = s && s.propTypes;
          y && tl(
            y,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            wt(s)
          );
        }
      }
      if (e !== null) {
        var g = e.memoizedProps;
        if (Se(g, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (ul = !1, t.pendingProps = i = g, RS(e, u))
            (e.flags & Tc) !== De && (ul = !0);
          else return t.lanes = e.lanes, Pu(e, t, u);
      }
      return vS(e, t, a, i, u);
    }
    function d0(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || ne)
        if ((t.mode & ct) === ke) {
          var f = {
            baseLanes: Y,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Fm(t, a);
        } else if (Zr(a, Kr)) {
          var _ = {
            baseLanes: Y,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = _;
          var w = s !== null ? s.baseLanes : a;
          Fm(t, w);
        } else {
          var p = null, v;
          if (s !== null) {
            var y = s.baseLanes;
            v = Ze(y, a);
          } else
            v = a;
          t.lanes = t.childLanes = Kr;
          var g = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = g, t.updateQueue = null, Fm(t, v), null;
        }
      else {
        var N;
        s !== null ? (N = Ze(s.baseLanes, a), t.memoizedState = null) : N = a, Fm(t, N);
      }
      return ya(e, t, u, a), t.child;
    }
    function ux(e, t, a) {
      var i = t.pendingProps;
      return ya(e, t, i, a), t.child;
    }
    function ox(e, t, a) {
      var i = t.pendingProps.children;
      return ya(e, t, i, a), t.child;
    }
    function sx(e, t, a) {
      {
        t.flags |= Et;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return ya(e, t, s, a), t.child;
    }
    function p0(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Sn, t.flags |= vo);
    }
    function vS(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && tl(
          s,
          i,
          // Resolved props
          "prop",
          wt(a)
        );
      }
      var f;
      {
        var p = Cf(t, a, !0);
        f = Rf(t, p);
      }
      var v, y;
      Df(t, u), pa(t);
      {
        if (kp.current = t, $n(!0), v = zf(e, t, a, i, f, u), y = Uf(), t.mode & Wt) {
          mn(!0);
          try {
            v = zf(e, t, a, i, f, u), y = Uf();
          } finally {
            mn(!1);
          }
        }
        $n(!1);
      }
      return va(), e !== null && !ul ? (xC(e, t, u), Pu(e, t, u)) : (Ur() && y && Gy(t), t.flags |= ei, ya(e, t, v, u), t.child);
    }
    function v0(e, t, a, i, u) {
      {
        switch (_b(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= _e, t.flags |= Xn;
            var y = new Error("Simulated error coming from DevTools"), g = Rs(u);
            t.lanes = Ze(t.lanes, g);
            var _ = oS(t, Zs(y, t), g);
            hg(t, _);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var w = a.propTypes;
          w && tl(
            w,
            i,
            // Resolved props
            "prop",
            wt(a)
          );
        }
      }
      var N;
      $l(a) ? (N = !0, Ah(t)) : N = !1, Df(t, u);
      var A = t.stateNode, j;
      A === null ? (_m(e, t), r0(t, a, i), iS(t, a, i, u), j = !0) : e === null ? j = Zw(t, a, i, u) : j = Jw(e, t, a, i, u);
      var ue = hS(e, t, a, j, N, u);
      {
        var Me = t.stateNode;
        j && Me.props !== i && (Js || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ye(t) || "a component"), Js = !0);
      }
      return ue;
    }
    function hS(e, t, a, i, u, s) {
      p0(e, t);
      var f = (t.flags & _e) !== De;
      if (!i && !f)
        return u && qE(t, a, !1), Pu(e, t, s);
      var p = t.stateNode;
      kp.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, ZC();
      else {
        pa(t);
        {
          if ($n(!0), v = p.render(), t.mode & Wt) {
            mn(!0);
            try {
              p.render();
            } finally {
              mn(!1);
            }
          }
          $n(!1);
        }
        va();
      }
      return t.flags |= ei, e !== null && f ? lx(e, t, v, s) : ya(e, t, v, s), t.memoizedState = p.state, u && qE(t, a, !0), t.child;
    }
    function h0(e) {
      var t = e.stateNode;
      t.pendingContext ? WE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && WE(e, t.context, !1), mg(e, t.containerInfo);
    }
    function cx(e, t, a) {
      if (h0(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      gC(e, t), Jh(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var p = f.element;
      if (u.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, y = t.updateQueue;
        if (y.baseState = v, t.memoizedState = v, t.flags & Er) {
          var g = Zs(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return m0(e, t, p, a, g);
        } else if (p !== s) {
          var _ = Zs(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return m0(e, t, p, a, _);
        } else {
          pw(t);
          var w = fC(t, null, p, a);
          t.child = w;
          for (var N = w; N; )
            N.flags = N.flags & ~hn | Wr, N = N.sibling;
        }
      } else {
        if (xf(), p === s)
          return Pu(e, t, a);
        ya(e, t, p, a);
      }
      return t.child;
    }
    function m0(e, t, a, i, u) {
      return xf(), eg(u), t.flags |= Er, ya(e, t, a, i), t.child;
    }
    function fx(e, t, a) {
      RC(t), e === null && Jy(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = zy(i, u);
      return p ? f = null : s !== null && zy(i, s) && (t.flags |= Da), p0(e, t), ya(e, t, f, a), t.child;
    }
    function dx(e, t) {
      return e === null && Jy(t), null;
    }
    function px(e, t, a, i) {
      _m(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var y = t.tag = db(v), g = ll(v, u), _;
      switch (y) {
        case oe:
          return mS(t, v), t.type = v = $f(v), _ = vS(null, t, v, g, i), _;
        case fe:
          return t.type = v = QS(v), _ = v0(null, t, v, g, i), _;
        case Ge:
          return t.type = v = WS(v), _ = s0(null, t, v, g, i), _;
        case ft: {
          if (t.type !== t.elementType) {
            var w = v.propTypes;
            w && tl(
              w,
              g,
              // Resolved for outer only
              "prop",
              wt(v)
            );
          }
          return _ = c0(
            null,
            t,
            v,
            ll(v.type, g),
            // The inner type can have defaults too
            i
          ), _;
        }
      }
      var N = "";
      throw v !== null && typeof v == "object" && v.$$typeof === Qe && (N = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + N));
    }
    function vx(e, t, a, i, u) {
      _m(e, t), t.tag = fe;
      var s;
      return $l(a) ? (s = !0, Ah(t)) : s = !1, Df(t, u), r0(t, a, i), iS(t, a, i, u), hS(null, t, a, !0, s, u);
    }
    function hx(e, t, a, i) {
      _m(e, t);
      var u = t.pendingProps, s;
      {
        var f = Cf(t, a, !1);
        s = Rf(t, f);
      }
      Df(t, i);
      var p, v;
      pa(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var y = wt(a) || "Unknown";
          sS[y] || (S("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", y, y), sS[y] = !0);
        }
        t.mode & Wt && rl.recordLegacyContextWarning(t, null), $n(!0), kp.current = t, p = zf(null, t, a, u, s, i), v = Uf(), $n(!1);
      }
      if (va(), t.flags |= ei, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var g = wt(a) || "Unknown";
        Op[g] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", g, g, g), Op[g] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var _ = wt(a) || "Unknown";
          Op[_] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _, _, _), Op[_] = !0);
        }
        t.tag = fe, t.memoizedState = null, t.updateQueue = null;
        var w = !1;
        return $l(a) ? (w = !0, Ah(t)) : w = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, vg(t), n0(t, p), iS(t, a, u, i), hS(null, t, a, !0, w, i);
      } else {
        if (t.tag = oe, t.mode & Wt) {
          mn(!0);
          try {
            p = zf(null, t, a, u, s, i), v = Uf();
          } finally {
            mn(!1);
          }
        }
        return Ur() && v && Gy(t), ya(null, t, p, i), mS(t, a), t.child;
      }
    }
    function mS(e, t) {
      {
        if (t && t.childContextTypes && S("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Dr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), dS[u] || (dS[u] = !0, S("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = wt(t) || "Unknown";
          Lp[f] || (S("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), Lp[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = wt(t) || "Unknown";
          fS[p] || (S("%s: Function components do not support getDerivedStateFromProps.", p), fS[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = wt(t) || "Unknown";
          cS[v] || (S("%s: Function components do not support contextType.", v), cS[v] = !0);
        }
      }
    }
    var yS = {
      dehydrated: null,
      treeContext: null,
      retryLane: Dt
    };
    function gS(e) {
      return {
        baseLanes: e,
        cachePool: ix(),
        transitions: null
      };
    }
    function mx(e, t) {
      var a = null;
      return {
        baseLanes: Ze(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function yx(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return Sg(e, Ep);
    }
    function gx(e, t) {
      return Ts(e.childLanes, t);
    }
    function y0(e, t, a) {
      var i = t.pendingProps;
      bb(t) && (t.flags |= _e);
      var u = al.current, s = !1, f = (t.flags & _e) !== De;
      if (f || yx(u, e) ? (s = !0, t.flags &= ~_e) : (e === null || e.memoizedState !== null) && (u = Aw(u, wC)), u = Of(u), Uo(t, u), e === null) {
        Jy(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return Tx(t, v);
        }
        var y = i.children, g = i.fallback;
        if (s) {
          var _ = Sx(t, y, g, a), w = t.child;
          return w.memoizedState = gS(a), t.memoizedState = yS, _;
        } else
          return SS(t, y);
      } else {
        var N = e.memoizedState;
        if (N !== null) {
          var A = N.dehydrated;
          if (A !== null)
            return wx(e, t, f, i, A, N, a);
        }
        if (s) {
          var j = i.fallback, ue = i.children, Me = Cx(e, t, ue, j, a), xe = t.child, Tt = e.child.memoizedState;
          return xe.memoizedState = Tt === null ? gS(a) : mx(Tt, a), xe.childLanes = gx(e, a), t.memoizedState = yS, Me;
        } else {
          var yt = i.children, k = Ex(e, t, yt, a);
          return t.memoizedState = null, k;
        }
      }
    }
    function SS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = ES(u, i);
      return s.return = e, e.child = s, s;
    }
    function Sx(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & ct) === ke && s !== null ? (p = s, p.childLanes = Y, p.pendingProps = f, e.mode & Lt && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = $o(a, u, i, null)) : (p = ES(f, u), v = $o(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function ES(e, t, a) {
      return gR(e, t, Y, null);
    }
    function g0(e, t) {
      return ac(e, t);
    }
    function Ex(e, t, a, i) {
      var u = e.child, s = u.sibling, f = g0(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & ct) === ke && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= ba) : p.push(s);
      }
      return t.child = f, f;
    }
    function Cx(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, y;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & ct) === ke && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var g = t.child;
        y = g, y.childLanes = Y, y.pendingProps = v, t.mode & Lt && (y.actualDuration = 0, y.actualStartTime = -1, y.selfBaseDuration = f.selfBaseDuration, y.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        y = g0(f, v), y.subtreeFlags = f.subtreeFlags & Nn;
      var _;
      return p !== null ? _ = ac(p, i) : (_ = $o(i, s, u, null), _.flags |= hn), _.return = t, y.return = t, y.sibling = _, t.child = y, _;
    }
    function xm(e, t, a, i) {
      i !== null && eg(i), _f(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = SS(t, s);
      return f.flags |= hn, t.memoizedState = null, f;
    }
    function Rx(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = ES(f, s), v = $o(i, s, u, null);
      return v.flags |= hn, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & ct) !== ke && _f(t, e.child, null, u), v;
    }
    function Tx(e, t, a) {
      return (e.mode & ct) === ke ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = je) : jy(t) ? e.lanes = Cr : e.lanes = Kr, null;
    }
    function wx(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & Er) {
          t.flags &= ~Er;
          var k = lS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return xm(e, t, f, k);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= _e, null;
          var H = i.children, O = i.fallback, X = Rx(e, t, H, O, f), ve = t.child;
          return ve.memoizedState = gS(f), t.memoizedState = yS, X;
        }
      else {
        if (fw(), (t.mode & ct) === ke)
          return xm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (jy(u)) {
          var p, v, y;
          {
            var g = D1(u);
            p = g.digest, v = g.message, y = g.stack;
          }
          var _;
          v ? _ = new Error(v) : _ = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var w = lS(_, p, y);
          return xm(e, t, f, w);
        }
        var N = Zr(f, e.childLanes);
        if (ul || N) {
          var A = Am();
          if (A !== null) {
            var j = zd(A, f);
            if (j !== Dt && j !== s.retryLane) {
              s.retryLane = j;
              var ue = Xt;
              Fa(e, j), mr(A, e, j, ue);
            }
          }
          VS();
          var Me = lS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return xm(e, t, f, Me);
        } else if (VE(u)) {
          t.flags |= _e, t.child = e.child;
          var xe = q_.bind(null, e);
          return k1(u, xe), null;
        } else {
          vw(t, u, s.treeContext);
          var Tt = i.children, yt = SS(t, Tt);
          return yt.flags |= Wr, yt;
        }
      }
    }
    function S0(e, t, a) {
      e.lanes = Ze(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = Ze(i.lanes, t)), cg(e.return, t, a);
    }
    function xx(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === be) {
          var u = i.memoizedState;
          u !== null && S0(i, a, e);
        } else if (i.tag === an)
          S0(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function _x(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && rm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function bx(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !pS[e])
        if (pS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              S('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          S('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function Dx(e, t) {
      e !== void 0 && !wm[e] && (e !== "collapsed" && e !== "hidden" ? (wm[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (wm[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function E0(e, t) {
      {
        var a = it(e), i = !a && typeof Ke(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function kx(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (it(e)) {
          for (var a = 0; a < e.length; a++)
            if (!E0(e[a], a))
              return;
        } else {
          var i = Ke(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!E0(s.value, f))
                  return;
                f++;
              }
          } else
            S('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function CS(e, t, a, i, u) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = u);
    }
    function C0(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      bx(u), Dx(s, u), kx(f, u), ya(e, t, f, a);
      var p = al.current, v = Sg(p, Ep);
      if (v)
        p = Eg(p, Ep), t.flags |= _e;
      else {
        var y = e !== null && (e.flags & _e) !== De;
        y && xx(t, t.child, a), p = Of(p);
      }
      if (Uo(t, p), (t.mode & ct) === ke)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var g = _x(t.child), _;
            g === null ? (_ = t.child, t.child = null) : (_ = g.sibling, g.sibling = null), CS(
              t,
              !1,
              // isBackwards
              _,
              g,
              s
            );
            break;
          }
          case "backwards": {
            var w = null, N = t.child;
            for (t.child = null; N !== null; ) {
              var A = N.alternate;
              if (A !== null && rm(A) === null) {
                t.child = N;
                break;
              }
              var j = N.sibling;
              N.sibling = w, w = N, N = j;
            }
            CS(
              t,
              !0,
              // isBackwards
              w,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            CS(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Ox(e, t, a) {
      mg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = _f(t, null, i, a) : ya(e, t, i, a), t.child;
    }
    var R0 = !1;
    function Lx(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || R0 || (R0 = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && tl(v, s, "prop", "Context.Provider");
      }
      if (vC(t, u, p), f !== null) {
        var y = f.value;
        if (G(y, p)) {
          if (f.children === s.children && !zh())
            return Pu(e, t, a);
        } else
          bw(t, u, a);
      }
      var g = s.children;
      return ya(e, t, g, a), t.child;
    }
    var T0 = !1;
    function Mx(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (T0 || (T0 = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Df(t, a);
      var f = er(i);
      pa(t);
      var p;
      return kp.current = t, $n(!0), p = s(f), $n(!1), va(), t.flags |= ei, ya(e, t, p, a), t.child;
    }
    function Mp() {
      ul = !0;
    }
    function _m(e, t) {
      (t.mode & ct) === ke && e !== null && (e.alternate = null, t.alternate = null, t.flags |= hn);
    }
    function Pu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), ZC(), Ip(t.lanes), Zr(a, t.childLanes) ? (xw(e, t), t.child) : null;
    }
    function Nx(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= ba) : s.push(e), a.flags |= hn, a;
      }
    }
    function RS(e, t) {
      var a = e.lanes;
      return !!Zr(a, t);
    }
    function zx(e, t, a) {
      switch (t.tag) {
        case K:
          h0(t), t.stateNode, xf();
          break;
        case ie:
          RC(t);
          break;
        case fe: {
          var i = t.type;
          $l(i) && Ah(t);
          break;
        }
        case ye:
          mg(t, t.stateNode.containerInfo);
          break;
        case vt: {
          var u = t.memoizedProps.value, s = t.type._context;
          vC(t, s, u);
          break;
        }
        case mt:
          {
            var f = Zr(a, t.childLanes);
            f && (t.flags |= Et);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case be: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return Uo(t, Of(al.current)), t.flags |= _e, null;
            var y = t.child, g = y.childLanes;
            if (Zr(a, g))
              return y0(e, t, a);
            Uo(t, Of(al.current));
            var _ = Pu(e, t, a);
            return _ !== null ? _.sibling : null;
          } else
            Uo(t, Of(al.current));
          break;
        }
        case an: {
          var w = (e.flags & _e) !== De, N = Zr(a, t.childLanes);
          if (w) {
            if (N)
              return C0(e, t, a);
            t.flags |= _e;
          }
          var A = t.memoizedState;
          if (A !== null && (A.rendering = null, A.tail = null, A.lastEffect = null), Uo(t, al.current), N)
            break;
          return null;
        }
        case Oe:
        case At:
          return t.lanes = Y, d0(e, t, a);
      }
      return Pu(e, t, a);
    }
    function w0(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Nx(e, t, ZS(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || zh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          ul = !0;
        else {
          var s = RS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & _e) === De)
            return ul = !1, zx(e, t, a);
          (e.flags & Tc) !== De ? ul = !0 : ul = !1;
        }
      } else if (ul = !1, Ur() && iw(t)) {
        var f = t.index, p = lw();
        ZE(t, p, f);
      }
      switch (t.lanes = Y, t.tag) {
        case se:
          return hx(e, t, t.type, a);
        case rn: {
          var v = t.elementType;
          return px(e, t, v, a);
        }
        case oe: {
          var y = t.type, g = t.pendingProps, _ = t.elementType === y ? g : ll(y, g);
          return vS(e, t, y, _, a);
        }
        case fe: {
          var w = t.type, N = t.pendingProps, A = t.elementType === w ? N : ll(w, N);
          return v0(e, t, w, A, a);
        }
        case K:
          return cx(e, t, a);
        case ie:
          return fx(e, t, a);
        case Be:
          return dx(e, t);
        case be:
          return y0(e, t, a);
        case ye:
          return Ox(e, t, a);
        case Ge: {
          var j = t.type, ue = t.pendingProps, Me = t.elementType === j ? ue : ll(j, ue);
          return s0(e, t, j, Me, a);
        }
        case ht:
          return ux(e, t, a);
        case lt:
          return ox(e, t, a);
        case mt:
          return sx(e, t, a);
        case vt:
          return Lx(e, t, a);
        case cn:
          return Mx(e, t, a);
        case ft: {
          var xe = t.type, Tt = t.pendingProps, yt = ll(xe, Tt);
          if (t.type !== t.elementType) {
            var k = xe.propTypes;
            k && tl(
              k,
              yt,
              // Resolved for outer only
              "prop",
              wt(xe)
            );
          }
          return yt = ll(xe.type, yt), c0(e, t, xe, yt, a);
        }
        case He:
          return f0(e, t, t.type, t.pendingProps, a);
        case jt: {
          var H = t.type, O = t.pendingProps, X = t.elementType === H ? O : ll(H, O);
          return vx(e, t, H, X, a);
        }
        case an:
          return C0(e, t, a);
        case _t:
          break;
        case Oe:
          return d0(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Af(e) {
      e.flags |= Et;
    }
    function x0(e) {
      e.flags |= Sn, e.flags |= vo;
    }
    var _0, TS, b0, D0;
    _0 = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === ie || u.tag === Be)
          n1(e, u.stateNode);
        else if (u.tag !== ye) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, TS = function(e, t) {
    }, b0 = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = yg(), v = a1(f, a, s, i, u, p);
        t.updateQueue = v, v && Af(t);
      }
    }, D0 = function(e, t, a, i) {
      a !== i && Af(t);
    };
    function Np(e, t) {
      if (!Ur())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, s = null; u !== null; )
              u.alternate !== null && (s = u), u = u.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function Fr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = Y, i = De;
      if (t) {
        if ((e.mode & Lt) !== ke) {
          for (var v = e.selfBaseDuration, y = e.child; y !== null; )
            a = Ze(a, Ze(y.lanes, y.childLanes)), i |= y.subtreeFlags & Nn, i |= y.flags & Nn, v += y.treeBaseDuration, y = y.sibling;
          e.treeBaseDuration = v;
        } else
          for (var g = e.child; g !== null; )
            a = Ze(a, Ze(g.lanes, g.childLanes)), i |= g.subtreeFlags & Nn, i |= g.flags & Nn, g.return = e, g = g.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Lt) !== ke) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = Ze(a, Ze(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = Ze(a, Ze(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function Ux(e, t, a) {
      if (Sw() && (t.mode & ct) !== ke && (t.flags & _e) === De)
        return iC(t), xf(), t.flags |= Er | us | Xn, !1;
      var i = Vh(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (yw(t), Fr(t), (t.mode & Lt) !== ke) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (xf(), (t.flags & _e) === De && (t.memoizedState = null), t.flags |= Et, Fr(t), (t.mode & Lt) !== ke) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return lC(), !0;
    }
    function k0(e, t, a) {
      var i = t.pendingProps;
      switch (qy(t), t.tag) {
        case se:
        case rn:
        case He:
        case oe:
        case Ge:
        case ht:
        case lt:
        case mt:
        case cn:
        case ft:
          return Fr(t), null;
        case fe: {
          var u = t.type;
          return $l(u) && Uh(t), Fr(t), null;
        }
        case K: {
          var s = t.stateNode;
          if (kf(t), Yy(t), Rg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = Vh(t);
            if (f)
              Af(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Er) !== De) && (t.flags |= In, lC());
            }
          }
          return TS(e, t), Fr(t), null;
        }
        case ie: {
          gg(t);
          var v = CC(), y = t.type;
          if (e !== null && t.stateNode != null)
            b0(e, t, y, i, v), e.ref !== t.ref && x0(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Fr(t), null;
            }
            var g = yg(), _ = Vh(t);
            if (_)
              hw(t, v, g) && Af(t);
            else {
              var w = t1(y, i, v, g, t);
              _0(w, t, !1, !1), t.stateNode = w, r1(w, y, i, v) && Af(t);
            }
            t.ref !== null && x0(t);
          }
          return Fr(t), null;
        }
        case Be: {
          var N = i;
          if (e && t.stateNode != null) {
            var A = e.memoizedProps;
            D0(e, t, A, N);
          } else {
            if (typeof N != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var j = CC(), ue = yg(), Me = Vh(t);
            Me ? mw(t) && Af(t) : t.stateNode = i1(N, j, ue, t);
          }
          return Fr(t), null;
        }
        case be: {
          Lf(t);
          var xe = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Tt = Ux(e, t, xe);
            if (!Tt)
              return t.flags & Xn ? t : null;
          }
          if ((t.flags & _e) !== De)
            return t.lanes = a, (t.mode & Lt) !== ke && Wg(t), t;
          var yt = xe !== null, k = e !== null && e.memoizedState !== null;
          if (yt !== k && yt) {
            var H = t.child;
            if (H.flags |= Mn, (t.mode & ct) !== ke) {
              var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              O || Sg(al.current, wC) ? A_() : VS();
            }
          }
          var X = t.updateQueue;
          if (X !== null && (t.flags |= Et), Fr(t), (t.mode & Lt) !== ke && yt) {
            var ve = t.child;
            ve !== null && (t.treeBaseDuration -= ve.treeBaseDuration);
          }
          return null;
        }
        case ye:
          return kf(t), TS(e, t), e === null && Z1(t.stateNode.containerInfo), Fr(t), null;
        case vt:
          var ce = t.type._context;
          return sg(ce, t), Fr(t), null;
        case jt: {
          var Ve = t.type;
          return $l(Ve) && Uh(t), Fr(t), null;
        }
        case an: {
          Lf(t);
          var qe = t.memoizedState;
          if (qe === null)
            return Fr(t), null;
          var qt = (t.flags & _e) !== De, zt = qe.rendering;
          if (zt === null)
            if (qt)
              Np(qe, !1);
            else {
              var Wn = j_() && (e === null || (e.flags & _e) === De);
              if (!Wn)
                for (var Ut = t.child; Ut !== null; ) {
                  var Hn = rm(Ut);
                  if (Hn !== null) {
                    qt = !0, t.flags |= _e, Np(qe, !1);
                    var ia = Hn.updateQueue;
                    return ia !== null && (t.updateQueue = ia, t.flags |= Et), t.subtreeFlags = De, _w(t, a), Uo(t, Eg(al.current, Ep)), t.child;
                  }
                  Ut = Ut.sibling;
                }
              qe.tail !== null && Yn() > X0() && (t.flags |= _e, qt = !0, Np(qe, !1), t.lanes = xd);
            }
          else {
            if (!qt) {
              var Br = rm(zt);
              if (Br !== null) {
                t.flags |= _e, qt = !0;
                var ui = Br.updateQueue;
                if (ui !== null && (t.updateQueue = ui, t.flags |= Et), Np(qe, !0), qe.tail === null && qe.tailMode === "hidden" && !zt.alternate && !Ur())
                  return Fr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Yn() * 2 - qe.renderingStartTime > X0() && a !== Kr && (t.flags |= _e, qt = !0, Np(qe, !1), t.lanes = xd);
            }
            if (qe.isBackwards)
              zt.sibling = t.child, t.child = zt;
            else {
              var Ea = qe.last;
              Ea !== null ? Ea.sibling = zt : t.child = zt, qe.last = zt;
            }
          }
          if (qe.tail !== null) {
            var Ca = qe.tail;
            qe.rendering = Ca, qe.tail = Ca.sibling, qe.renderingStartTime = Yn(), Ca.sibling = null;
            var la = al.current;
            return qt ? la = Eg(la, Ep) : la = Of(la), Uo(t, la), Ca;
          }
          return Fr(t), null;
        }
        case _t:
          break;
        case Oe:
        case At: {
          PS(t);
          var Yu = t.memoizedState, If = Yu !== null;
          if (e !== null) {
            var qp = e.memoizedState, Kl = qp !== null;
            Kl !== If && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ne && (t.flags |= Mn);
          }
          return !If || (t.mode & ct) === ke ? Fr(t) : Zr(Xl, Kr) && (Fr(t), t.subtreeFlags & (hn | Et) && (t.flags |= Mn)), null;
        }
        case bt:
          return null;
        case kt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ax(e, t, a) {
      switch (qy(t), t.tag) {
        case fe: {
          var i = t.type;
          $l(i) && Uh(t);
          var u = t.flags;
          return u & Xn ? (t.flags = u & ~Xn | _e, (t.mode & Lt) !== ke && Wg(t), t) : null;
        }
        case K: {
          t.stateNode, kf(t), Yy(t), Rg();
          var s = t.flags;
          return (s & Xn) !== De && (s & _e) === De ? (t.flags = s & ~Xn | _e, t) : null;
        }
        case ie:
          return gg(t), null;
        case be: {
          Lf(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            xf();
          }
          var p = t.flags;
          return p & Xn ? (t.flags = p & ~Xn | _e, (t.mode & Lt) !== ke && Wg(t), t) : null;
        }
        case an:
          return Lf(t), null;
        case ye:
          return kf(t), null;
        case vt:
          var v = t.type._context;
          return sg(v, t), null;
        case Oe:
        case At:
          return PS(t), null;
        case bt:
          return null;
        default:
          return null;
      }
    }
    function O0(e, t, a) {
      switch (qy(t), t.tag) {
        case fe: {
          var i = t.type.childContextTypes;
          i != null && Uh(t);
          break;
        }
        case K: {
          t.stateNode, kf(t), Yy(t), Rg();
          break;
        }
        case ie: {
          gg(t);
          break;
        }
        case ye:
          kf(t);
          break;
        case be:
          Lf(t);
          break;
        case an:
          Lf(t);
          break;
        case vt:
          var u = t.type._context;
          sg(u, t);
          break;
        case Oe:
        case At:
          PS(t);
          break;
      }
    }
    var L0 = null;
    L0 = /* @__PURE__ */ new Set();
    var bm = !1, jr = !1, Fx = typeof WeakSet == "function" ? WeakSet : Set, Ee = null, Ff = null, jf = null;
    function jx(e) {
      xl(null, function() {
        throw e;
      }), ls();
    }
    var Hx = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Lt)
        try {
          Gl(), t.componentWillUnmount();
        } finally {
          Wl(e);
        }
      else
        t.componentWillUnmount();
    };
    function M0(e, t) {
      try {
        jo(cr, e);
      } catch (a) {
        sn(e, t, a);
      }
    }
    function wS(e, t, a) {
      try {
        Hx(e, a);
      } catch (i) {
        sn(e, t, i);
      }
    }
    function Px(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        sn(e, t, i);
      }
    }
    function N0(e, t) {
      try {
        U0(e);
      } catch (a) {
        sn(e, t, a);
      }
    }
    function Hf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Ae && ut && e.mode & Lt)
              try {
                Gl(), i = a(null);
              } finally {
                Wl(e);
              }
            else
              i = a(null);
          } catch (u) {
            sn(e, t, u);
          }
          typeof i == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ye(e));
        } else
          a.current = null;
    }
    function Dm(e, t, a) {
      try {
        a();
      } catch (i) {
        sn(e, t, i);
      }
    }
    var z0 = !1;
    function Vx(e, t) {
      JT(e.containerInfo), Ee = t, Bx();
      var a = z0;
      return z0 = !1, a;
    }
    function Bx() {
      for (; Ee !== null; ) {
        var e = Ee, t = e.child;
        (e.subtreeFlags & bl) !== De && t !== null ? (t.return = e, Ee = t) : $x();
      }
    }
    function $x() {
      for (; Ee !== null; ) {
        var e = Ee;
        It(e);
        try {
          Ix(e);
        } catch (a) {
          sn(e, e.return, a);
        }
        on();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ee = t;
          return;
        }
        Ee = e.return;
      }
    }
    function Ix(e) {
      var t = e.alternate, a = e.flags;
      if ((a & In) !== De) {
        switch (It(e), e.tag) {
          case oe:
          case Ge:
          case He:
            break;
          case fe: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !Js && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ye(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ye(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : ll(e.type, i), u);
              {
                var p = L0;
                f === void 0 && !p.has(e.type) && (p.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Ye(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case K: {
            {
              var v = e.stateNode;
              w1(v.containerInfo);
            }
            break;
          }
          case ie:
          case Be:
          case ye:
          case jt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        on();
      }
    }
    function ol(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Ar) !== ja ? qi(t) : (e & cr) !== ja && ss(t), (e & Il) !== ja && Qp(!0), Dm(t, a, p), (e & Il) !== ja && Qp(!1), (e & Ar) !== ja ? Ll() : (e & cr) !== ja && Td());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function jo(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & Ar) !== ja ? Rd(t) : (e & cr) !== ja && kc(t);
            var f = s.create;
            (e & Il) !== ja && Qp(!0), s.destroy = f(), (e & Il) !== ja && Qp(!1), (e & Ar) !== ja ? Nv() : (e & cr) !== ja && zv();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & cr) !== De ? v = "useLayoutEffect" : (s.tag & Il) !== De ? v = "useInsertionEffect" : v = "useEffect";
                var y = void 0;
                p === null ? y = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? y = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : y = " You returned: " + p, S("%s must not return anything besides a function, which is used for clean-up.%s", v, y);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function Yx(e, t) {
      if ((t.flags & Et) !== De)
        switch (t.tag) {
          case mt: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = XC(), p = t.alternate === null ? "mount" : "update";
            qC() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case K:
                  var y = v.stateNode;
                  y.passiveEffectDuration += a;
                  break e;
                case mt:
                  var g = v.stateNode;
                  g.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function Qx(e, t, a, i) {
      if ((a.flags & kl) !== De)
        switch (a.tag) {
          case oe:
          case Ge:
          case He: {
            if (!jr)
              if (a.mode & Lt)
                try {
                  Gl(), jo(cr | sr, a);
                } finally {
                  Wl(a);
                }
              else
                jo(cr | sr, a);
            break;
          }
          case fe: {
            var u = a.stateNode;
            if (a.flags & Et && !jr)
              if (t === null)
                if (a.type === a.elementType && !Js && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ye(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ye(a) || "instance")), a.mode & Lt)
                  try {
                    Gl(), u.componentDidMount();
                  } finally {
                    Wl(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : ll(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !Js && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ye(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ye(a) || "instance")), a.mode & Lt)
                  try {
                    Gl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Wl(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !Js && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ye(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ye(a) || "instance")), EC(a, p, u));
            break;
          }
          case K: {
            var v = a.updateQueue;
            if (v !== null) {
              var y = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case ie:
                    y = a.child.stateNode;
                    break;
                  case fe:
                    y = a.child.stateNode;
                    break;
                }
              EC(a, v, y);
            }
            break;
          }
          case ie: {
            var g = a.stateNode;
            if (t === null && a.flags & Et) {
              var _ = a.type, w = a.memoizedProps;
              c1(g, _, w);
            }
            break;
          }
          case Be:
            break;
          case ye:
            break;
          case mt: {
            {
              var N = a.memoizedProps, A = N.onCommit, j = N.onRender, ue = a.stateNode.effectDuration, Me = XC(), xe = t === null ? "mount" : "update";
              qC() && (xe = "nested-update"), typeof j == "function" && j(a.memoizedProps.id, xe, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Me);
              {
                typeof A == "function" && A(a.memoizedProps.id, xe, ue, Me), $_(a);
                var Tt = a.return;
                e: for (; Tt !== null; ) {
                  switch (Tt.tag) {
                    case K:
                      var yt = Tt.stateNode;
                      yt.effectDuration += ue;
                      break e;
                    case mt:
                      var k = Tt.stateNode;
                      k.effectDuration += ue;
                      break e;
                  }
                  Tt = Tt.return;
                }
              }
            }
            break;
          }
          case be: {
            e_(e, a);
            break;
          }
          case an:
          case jt:
          case _t:
          case Oe:
          case At:
          case kt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      jr || a.flags & Sn && U0(a);
    }
    function Wx(e) {
      switch (e.tag) {
        case oe:
        case Ge:
        case He: {
          if (e.mode & Lt)
            try {
              Gl(), M0(e, e.return);
            } finally {
              Wl(e);
            }
          else
            M0(e, e.return);
          break;
        }
        case fe: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Px(e, e.return, t), N0(e, e.return);
          break;
        }
        case ie: {
          N0(e, e.return);
          break;
        }
      }
    }
    function Gx(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === ie) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? E1(u) : R1(i.stateNode, i.memoizedProps);
            } catch (f) {
              sn(e, e.return, f);
            }
          }
        } else if (i.tag === Be) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? C1(s) : T1(s, i.memoizedProps);
            } catch (f) {
              sn(e, e.return, f);
            }
        } else if (!((i.tag === Oe || i.tag === At) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function U0(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case ie:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & Lt)
            try {
              Gl(), u = t(i);
            } finally {
              Wl(e);
            }
          else
            u = t(i);
          typeof u == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ye(e));
        } else
          t.hasOwnProperty("current") || S("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Ye(e)), t.current = i;
      }
    }
    function qx(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function A0(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, A0(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === ie) {
          var a = e.stateNode;
          a !== null && tw(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Xx(e) {
      for (var t = e.return; t !== null; ) {
        if (F0(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function F0(e) {
      return e.tag === ie || e.tag === K || e.tag === ye;
    }
    function j0(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || F0(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== ie && t.tag !== Be && t.tag !== Kt; ) {
          if (t.flags & hn || t.child === null || t.tag === ye)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & hn))
          return t.stateNode;
      }
    }
    function Kx(e) {
      var t = Xx(e);
      switch (t.tag) {
        case ie: {
          var a = t.stateNode;
          t.flags & Da && (PE(a), t.flags &= ~Da);
          var i = j0(e);
          _S(e, i, a);
          break;
        }
        case K:
        case ye: {
          var u = t.stateNode.containerInfo, s = j0(e);
          xS(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function xS(e, t, a) {
      var i = e.tag, u = i === ie || i === Be;
      if (u) {
        var s = e.stateNode;
        t ? m1(a, s, t) : v1(a, s);
      } else if (i !== ye) {
        var f = e.child;
        if (f !== null) {
          xS(f, t, a);
          for (var p = f.sibling; p !== null; )
            xS(p, t, a), p = p.sibling;
        }
      }
    }
    function _S(e, t, a) {
      var i = e.tag, u = i === ie || i === Be;
      if (u) {
        var s = e.stateNode;
        t ? h1(a, s, t) : p1(a, s);
      } else if (i !== ye) {
        var f = e.child;
        if (f !== null) {
          _S(f, t, a);
          for (var p = f.sibling; p !== null; )
            _S(p, t, a), p = p.sibling;
        }
      }
    }
    var Hr = null, sl = !1;
    function Zx(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case ie: {
              Hr = i.stateNode, sl = !1;
              break e;
            }
            case K: {
              Hr = i.stateNode.containerInfo, sl = !0;
              break e;
            }
            case ye: {
              Hr = i.stateNode.containerInfo, sl = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Hr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        H0(e, t, a), Hr = null, sl = !1;
      }
      qx(a);
    }
    function Ho(e, t, a) {
      for (var i = a.child; i !== null; )
        H0(e, t, i), i = i.sibling;
    }
    function H0(e, t, a) {
      switch (Sd(a), a.tag) {
        case ie:
          jr || Hf(a, t);
        case Be: {
          {
            var i = Hr, u = sl;
            Hr = null, Ho(e, t, a), Hr = i, sl = u, Hr !== null && (sl ? g1(Hr, a.stateNode) : y1(Hr, a.stateNode));
          }
          return;
        }
        case Kt: {
          Hr !== null && (sl ? S1(Hr, a.stateNode) : Fy(Hr, a.stateNode));
          return;
        }
        case ye: {
          {
            var s = Hr, f = sl;
            Hr = a.stateNode.containerInfo, sl = !0, Ho(e, t, a), Hr = s, sl = f;
          }
          return;
        }
        case oe:
        case Ge:
        case ft:
        case He: {
          if (!jr) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var y = v.next, g = y;
                do {
                  var _ = g, w = _.destroy, N = _.tag;
                  w !== void 0 && ((N & Il) !== ja ? Dm(a, t, w) : (N & cr) !== ja && (ss(a), a.mode & Lt ? (Gl(), Dm(a, t, w), Wl(a)) : Dm(a, t, w), Td())), g = g.next;
                } while (g !== y);
              }
            }
          }
          Ho(e, t, a);
          return;
        }
        case fe: {
          if (!jr) {
            Hf(a, t);
            var A = a.stateNode;
            typeof A.componentWillUnmount == "function" && wS(a, t, A);
          }
          Ho(e, t, a);
          return;
        }
        case _t: {
          Ho(e, t, a);
          return;
        }
        case Oe: {
          if (
            // TODO: Remove this dead flag
            a.mode & ct
          ) {
            var j = jr;
            jr = j || a.memoizedState !== null, Ho(e, t, a), jr = j;
          } else
            Ho(e, t, a);
          break;
        }
        default: {
          Ho(e, t, a);
          return;
        }
      }
    }
    function Jx(e) {
      e.memoizedState;
    }
    function e_(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && j1(s);
          }
        }
      }
    }
    function P0(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Fx()), t.forEach(function(i) {
          var u = X_.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), Xr)
              if (Ff !== null && jf !== null)
                Yp(jf, Ff);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function t_(e, t, a) {
      Ff = a, jf = e, It(t), V0(t, e), It(t), Ff = null, jf = null;
    }
    function cl(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            Zx(e, t, s);
          } catch (v) {
            sn(s, t, v);
          }
        }
      var f = gl();
      if (t.subtreeFlags & Dl)
        for (var p = t.child; p !== null; )
          It(p), V0(p, e), p = p.sibling;
      It(f);
    }
    function V0(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case oe:
        case Ge:
        case ft:
        case He: {
          if (cl(t, e), ql(e), u & Et) {
            try {
              ol(Il | sr, e, e.return), jo(Il | sr, e);
            } catch (Ve) {
              sn(e, e.return, Ve);
            }
            if (e.mode & Lt) {
              try {
                Gl(), ol(cr | sr, e, e.return);
              } catch (Ve) {
                sn(e, e.return, Ve);
              }
              Wl(e);
            } else
              try {
                ol(cr | sr, e, e.return);
              } catch (Ve) {
                sn(e, e.return, Ve);
              }
          }
          return;
        }
        case fe: {
          cl(t, e), ql(e), u & Sn && i !== null && Hf(i, i.return);
          return;
        }
        case ie: {
          cl(t, e), ql(e), u & Sn && i !== null && Hf(i, i.return);
          {
            if (e.flags & Da) {
              var s = e.stateNode;
              try {
                PE(s);
              } catch (Ve) {
                sn(e, e.return, Ve);
              }
            }
            if (u & Et) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, y = e.type, g = e.updateQueue;
                if (e.updateQueue = null, g !== null)
                  try {
                    f1(f, g, y, v, p, e);
                  } catch (Ve) {
                    sn(e, e.return, Ve);
                  }
              }
            }
          }
          return;
        }
        case Be: {
          if (cl(t, e), ql(e), u & Et) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var _ = e.stateNode, w = e.memoizedProps, N = i !== null ? i.memoizedProps : w;
            try {
              d1(_, N, w);
            } catch (Ve) {
              sn(e, e.return, Ve);
            }
          }
          return;
        }
        case K: {
          if (cl(t, e), ql(e), u & Et && i !== null) {
            var A = i.memoizedState;
            if (A.isDehydrated)
              try {
                F1(t.containerInfo);
              } catch (Ve) {
                sn(e, e.return, Ve);
              }
          }
          return;
        }
        case ye: {
          cl(t, e), ql(e);
          return;
        }
        case be: {
          cl(t, e), ql(e);
          var j = e.child;
          if (j.flags & Mn) {
            var ue = j.stateNode, Me = j.memoizedState, xe = Me !== null;
            if (ue.isHidden = xe, xe) {
              var Tt = j.alternate !== null && j.alternate.memoizedState !== null;
              Tt || U_();
            }
          }
          if (u & Et) {
            try {
              Jx(e);
            } catch (Ve) {
              sn(e, e.return, Ve);
            }
            P0(e);
          }
          return;
        }
        case Oe: {
          var yt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & ct
          ) {
            var k = jr;
            jr = k || yt, cl(t, e), jr = k;
          } else
            cl(t, e);
          if (ql(e), u & Mn) {
            var H = e.stateNode, O = e.memoizedState, X = O !== null, ve = e;
            if (H.isHidden = X, X && !yt && (ve.mode & ct) !== ke) {
              Ee = ve;
              for (var ce = ve.child; ce !== null; )
                Ee = ce, r_(ce), ce = ce.sibling;
            }
            Gx(ve, X);
          }
          return;
        }
        case an: {
          cl(t, e), ql(e), u & Et && P0(e);
          return;
        }
        case _t:
          return;
        default: {
          cl(t, e), ql(e);
          return;
        }
      }
    }
    function ql(e) {
      var t = e.flags;
      if (t & hn) {
        try {
          Kx(e);
        } catch (a) {
          sn(e, e.return, a);
        }
        e.flags &= ~hn;
      }
      t & Wr && (e.flags &= ~Wr);
    }
    function n_(e, t, a) {
      Ff = a, jf = t, Ee = e, B0(e, t, a), Ff = null, jf = null;
    }
    function B0(e, t, a) {
      for (var i = (e.mode & ct) !== ke; Ee !== null; ) {
        var u = Ee, s = u.child;
        if (u.tag === Oe && i) {
          var f = u.memoizedState !== null, p = f || bm;
          if (p) {
            bS(e, t, a);
            continue;
          } else {
            var v = u.alternate, y = v !== null && v.memoizedState !== null, g = y || jr, _ = bm, w = jr;
            bm = p, jr = g, jr && !w && (Ee = u, a_(u));
            for (var N = s; N !== null; )
              Ee = N, B0(
                N,
                // New root; bubble back up to here and stop.
                t,
                a
              ), N = N.sibling;
            Ee = u, bm = _, jr = w, bS(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & kl) !== De && s !== null ? (s.return = u, Ee = s) : bS(e, t, a);
      }
    }
    function bS(e, t, a) {
      for (; Ee !== null; ) {
        var i = Ee;
        if ((i.flags & kl) !== De) {
          var u = i.alternate;
          It(i);
          try {
            Qx(t, u, i, a);
          } catch (f) {
            sn(i, i.return, f);
          }
          on();
        }
        if (i === e) {
          Ee = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, Ee = s;
          return;
        }
        Ee = i.return;
      }
    }
    function r_(e) {
      for (; Ee !== null; ) {
        var t = Ee, a = t.child;
        switch (t.tag) {
          case oe:
          case Ge:
          case ft:
          case He: {
            if (t.mode & Lt)
              try {
                Gl(), ol(cr, t, t.return);
              } finally {
                Wl(t);
              }
            else
              ol(cr, t, t.return);
            break;
          }
          case fe: {
            Hf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && wS(t, t.return, i);
            break;
          }
          case ie: {
            Hf(t, t.return);
            break;
          }
          case Oe: {
            var u = t.memoizedState !== null;
            if (u) {
              $0(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Ee = a) : $0(e);
      }
    }
    function $0(e) {
      for (; Ee !== null; ) {
        var t = Ee;
        if (t === e) {
          Ee = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ee = a;
          return;
        }
        Ee = t.return;
      }
    }
    function a_(e) {
      for (; Ee !== null; ) {
        var t = Ee, a = t.child;
        if (t.tag === Oe) {
          var i = t.memoizedState !== null;
          if (i) {
            I0(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Ee = a) : I0(e);
      }
    }
    function I0(e) {
      for (; Ee !== null; ) {
        var t = Ee;
        It(t);
        try {
          Wx(t);
        } catch (i) {
          sn(t, t.return, i);
        }
        if (on(), t === e) {
          Ee = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ee = a;
          return;
        }
        Ee = t.return;
      }
    }
    function i_(e, t, a, i) {
      Ee = t, l_(t, e, a, i);
    }
    function l_(e, t, a, i) {
      for (; Ee !== null; ) {
        var u = Ee, s = u.child;
        (u.subtreeFlags & Wi) !== De && s !== null ? (s.return = u, Ee = s) : u_(e, t, a, i);
      }
    }
    function u_(e, t, a, i) {
      for (; Ee !== null; ) {
        var u = Ee;
        if ((u.flags & Qr) !== De) {
          It(u);
          try {
            o_(t, u, a, i);
          } catch (f) {
            sn(u, u.return, f);
          }
          on();
        }
        if (u === e) {
          Ee = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, Ee = s;
          return;
        }
        Ee = u.return;
      }
    }
    function o_(e, t, a, i) {
      switch (t.tag) {
        case oe:
        case Ge:
        case He: {
          if (t.mode & Lt) {
            Qg();
            try {
              jo(Ar | sr, t);
            } finally {
              Yg(t);
            }
          } else
            jo(Ar | sr, t);
          break;
        }
      }
    }
    function s_(e) {
      Ee = e, c_();
    }
    function c_() {
      for (; Ee !== null; ) {
        var e = Ee, t = e.child;
        if ((Ee.flags & ba) !== De) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              Ee = u, p_(u, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var p = f.sibling;
                    f.sibling = null, f = p;
                  } while (f !== null);
                }
              }
            }
            Ee = e;
          }
        }
        (e.subtreeFlags & Wi) !== De && t !== null ? (t.return = e, Ee = t) : f_();
      }
    }
    function f_() {
      for (; Ee !== null; ) {
        var e = Ee;
        (e.flags & Qr) !== De && (It(e), d_(e), on());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ee = t;
          return;
        }
        Ee = e.return;
      }
    }
    function d_(e) {
      switch (e.tag) {
        case oe:
        case Ge:
        case He: {
          e.mode & Lt ? (Qg(), ol(Ar | sr, e, e.return), Yg(e)) : ol(Ar | sr, e, e.return);
          break;
        }
      }
    }
    function p_(e, t) {
      for (; Ee !== null; ) {
        var a = Ee;
        It(a), h_(a, t), on();
        var i = a.child;
        i !== null ? (i.return = a, Ee = i) : v_(e);
      }
    }
    function v_(e) {
      for (; Ee !== null; ) {
        var t = Ee, a = t.sibling, i = t.return;
        if (A0(t), t === e) {
          Ee = null;
          return;
        }
        if (a !== null) {
          a.return = i, Ee = a;
          return;
        }
        Ee = i;
      }
    }
    function h_(e, t) {
      switch (e.tag) {
        case oe:
        case Ge:
        case He: {
          e.mode & Lt ? (Qg(), ol(Ar, e, t), Yg(e)) : ol(Ar, e, t);
          break;
        }
      }
    }
    function m_(e) {
      switch (e.tag) {
        case oe:
        case Ge:
        case He: {
          try {
            jo(cr | sr, e);
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
        case fe: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
      }
    }
    function y_(e) {
      switch (e.tag) {
        case oe:
        case Ge:
        case He: {
          try {
            jo(Ar | sr, e);
          } catch (t) {
            sn(e, e.return, t);
          }
          break;
        }
      }
    }
    function g_(e) {
      switch (e.tag) {
        case oe:
        case Ge:
        case He: {
          try {
            ol(cr | sr, e, e.return);
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
        case fe: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && wS(e, e.return, t);
          break;
        }
      }
    }
    function S_(e) {
      switch (e.tag) {
        case oe:
        case Ge:
        case He:
          try {
            ol(Ar | sr, e, e.return);
          } catch (t) {
            sn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var zp = Symbol.for;
      zp("selector.component"), zp("selector.has_pseudo_class"), zp("selector.role"), zp("selector.test_id"), zp("selector.text");
    }
    var E_ = [];
    function C_() {
      E_.forEach(function(e) {
        return e();
      });
    }
    var R_ = M.ReactCurrentActQueue;
    function T_(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function Y0() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && R_.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var w_ = Math.ceil, DS = M.ReactCurrentDispatcher, kS = M.ReactCurrentOwner, Pr = M.ReactCurrentBatchConfig, fl = M.ReactCurrentActQueue, pr = (
      /*             */
      0
    ), Q0 = (
      /*               */
      1
    ), Vr = (
      /*                */
      2
    ), Ui = (
      /*                */
      4
    ), Vu = 0, Up = 1, ec = 2, km = 3, Ap = 4, W0 = 5, OS = 6, Rt = pr, ga = null, Dn = null, vr = Y, Xl = Y, LS = ko(Y), hr = Vu, Fp = null, Om = Y, jp = Y, Lm = Y, Hp = null, Ha = null, MS = 0, G0 = 500, q0 = 1 / 0, x_ = 500, Bu = null;
    function Pp() {
      q0 = Yn() + x_;
    }
    function X0() {
      return q0;
    }
    var Mm = !1, NS = null, Pf = null, tc = !1, Po = null, Vp = Y, zS = [], US = null, __ = 50, Bp = 0, AS = null, FS = !1, Nm = !1, b_ = 50, Vf = 0, zm = null, $p = Xt, Um = Y, K0 = !1;
    function Am() {
      return ga;
    }
    function Sa() {
      return (Rt & (Vr | Ui)) !== pr ? Yn() : ($p !== Xt || ($p = Yn()), $p);
    }
    function Vo(e) {
      var t = e.mode;
      if ((t & ct) === ke)
        return je;
      if ((Rt & Vr) !== pr && vr !== Y)
        return Rs(vr);
      var a = Rw() !== Cw;
      if (a) {
        if (Pr.transition !== null) {
          var i = Pr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Um === Dt && (Um = Ld()), Um;
      }
      var u = za();
      if (u !== Dt)
        return u;
      var s = l1();
      return s;
    }
    function D_(e) {
      var t = e.mode;
      return (t & ct) === ke ? je : Pv();
    }
    function mr(e, t, a, i) {
      Z_(), K0 && S("useInsertionEffect must not schedule updates."), FS && (Nm = !0), go(e, a, i), (Rt & Vr) !== Y && e === ga ? tb(t) : (Xr && xs(e, t, a), nb(t), e === ga && ((Rt & Vr) === pr && (jp = Ze(jp, a)), hr === Ap && Bo(e, vr)), Pa(e, i), a === je && Rt === pr && (t.mode & ct) === ke && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !fl.isBatchingLegacy && (Pp(), KE()));
    }
    function k_(e, t, a) {
      var i = e.current;
      i.lanes = t, go(e, t, a), Pa(e, a);
    }
    function O_(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Rt & Vr) !== pr
      );
    }
    function Pa(e, t) {
      var a = e.callbackNode;
      qc(e, t);
      var i = Gc(e, e === ga ? vr : Y);
      if (i === Y) {
        a !== null && pR(a), e.callbackNode = null, e.callbackPriority = Dt;
        return;
      }
      var u = zl(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(fl.current !== null && a !== IS)) {
        a == null && s !== je && S("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && pR(a);
      var f;
      if (u === je)
        e.tag === Oo ? (fl.isBatchingLegacy !== null && (fl.didScheduleLegacyUpdate = !0), aw(eR.bind(null, e))) : XE(eR.bind(null, e)), fl.current !== null ? fl.current.push(Lo) : o1(function() {
          (Rt & (Vr | Ui)) === pr && Lo();
        }), f = null;
      else {
        var p;
        switch (Wv(i)) {
          case Or:
            p = os;
            break;
          case xi:
            p = Ol;
            break;
          case Ma:
            p = Gi;
            break;
          case Na:
            p = hu;
            break;
          default:
            p = Gi;
            break;
        }
        f = YS(p, Z0.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function Z0(e, t) {
      if (Gw(), $p = Xt, Um = Y, (Rt & (Vr | Ui)) !== pr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Iu();
      if (i && e.callbackNode !== a)
        return null;
      var u = Gc(e, e === ga ? vr : Y);
      if (u === Y)
        return null;
      var s = !Kc(e, u) && !Hv(e, u) && !t, f = s ? P_(e, u) : jm(e, u);
      if (f !== Vu) {
        if (f === ec) {
          var p = Xc(e);
          p !== Y && (u = p, f = jS(e, p));
        }
        if (f === Up) {
          var v = Fp;
          throw nc(e, Y), Bo(e, u), Pa(e, Yn()), v;
        }
        if (f === OS)
          Bo(e, u);
        else {
          var y = !Kc(e, u), g = e.current.alternate;
          if (y && !M_(g)) {
            if (f = jm(e, u), f === ec) {
              var _ = Xc(e);
              _ !== Y && (u = _, f = jS(e, _));
            }
            if (f === Up) {
              var w = Fp;
              throw nc(e, Y), Bo(e, u), Pa(e, Yn()), w;
            }
          }
          e.finishedWork = g, e.finishedLanes = u, L_(e, f, u);
        }
      }
      return Pa(e, Yn()), e.callbackNode === a ? Z0.bind(null, e) : null;
    }
    function jS(e, t) {
      var a = Hp;
      if (ef(e)) {
        var i = nc(e, t);
        i.flags |= Er, K1(e.containerInfo);
      }
      var u = jm(e, t);
      if (u !== ec) {
        var s = Ha;
        Ha = a, s !== null && J0(s);
      }
      return u;
    }
    function J0(e) {
      Ha === null ? Ha = e : Ha.push.apply(Ha, e);
    }
    function L_(e, t, a) {
      switch (t) {
        case Vu:
        case Up:
          throw new Error("Root did not complete. This is a bug in React.");
        case ec: {
          rc(e, Ha, Bu);
          break;
        }
        case km: {
          if (Bo(e, a), _u(a) && // do not delay if we're inside an act() scope
          !vR()) {
            var i = MS + G0 - Yn();
            if (i > 10) {
              var u = Gc(e, Y);
              if (u !== Y)
                break;
              var s = e.suspendedLanes;
              if (!bu(s, a)) {
                Sa(), Zc(e, s);
                break;
              }
              e.timeoutHandle = Uy(rc.bind(null, e, Ha, Bu), i);
              break;
            }
          }
          rc(e, Ha, Bu);
          break;
        }
        case Ap: {
          if (Bo(e, a), kd(a))
            break;
          if (!vR()) {
            var f = ni(e, a), p = f, v = Yn() - p, y = K_(v) - v;
            if (y > 10) {
              e.timeoutHandle = Uy(rc.bind(null, e, Ha, Bu), y);
              break;
            }
          }
          rc(e, Ha, Bu);
          break;
        }
        case W0: {
          rc(e, Ha, Bu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function M_(e) {
      for (var t = e; ; ) {
        if (t.flags & po) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!G(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & po && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function Bo(e, t) {
      t = Ts(t, Lm), t = Ts(t, jp), $v(e, t);
    }
    function eR(e) {
      if (qw(), (Rt & (Vr | Ui)) !== pr)
        throw new Error("Should not already be working.");
      Iu();
      var t = Gc(e, Y);
      if (!Zr(t, je))
        return Pa(e, Yn()), null;
      var a = jm(e, t);
      if (e.tag !== Oo && a === ec) {
        var i = Xc(e);
        i !== Y && (t = i, a = jS(e, i));
      }
      if (a === Up) {
        var u = Fp;
        throw nc(e, Y), Bo(e, t), Pa(e, Yn()), u;
      }
      if (a === OS)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, rc(e, Ha, Bu), Pa(e, Yn()), null;
    }
    function N_(e, t) {
      t !== Y && (Jc(e, Ze(t, je)), Pa(e, Yn()), (Rt & (Vr | Ui)) === pr && (Pp(), Lo()));
    }
    function HS(e, t) {
      var a = Rt;
      Rt |= Q0;
      try {
        return e(t);
      } finally {
        Rt = a, Rt === pr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !fl.isBatchingLegacy && (Pp(), KE());
      }
    }
    function z_(e, t, a, i, u) {
      var s = za(), f = Pr.transition;
      try {
        return Pr.transition = null, An(Or), e(t, a, i, u);
      } finally {
        An(s), Pr.transition = f, Rt === pr && Pp();
      }
    }
    function $u(e) {
      Po !== null && Po.tag === Oo && (Rt & (Vr | Ui)) === pr && Iu();
      var t = Rt;
      Rt |= Q0;
      var a = Pr.transition, i = za();
      try {
        return Pr.transition = null, An(Or), e ? e() : void 0;
      } finally {
        An(i), Pr.transition = a, Rt = t, (Rt & (Vr | Ui)) === pr && Lo();
      }
    }
    function tR() {
      return (Rt & (Vr | Ui)) !== pr;
    }
    function Fm(e, t) {
      ra(LS, Xl, e), Xl = Ze(Xl, t);
    }
    function PS(e) {
      Xl = LS.current, na(LS, e);
    }
    function nc(e, t) {
      e.finishedWork = null, e.finishedLanes = Y;
      var a = e.timeoutHandle;
      if (a !== Ay && (e.timeoutHandle = Ay, u1(a)), Dn !== null)
        for (var i = Dn.return; i !== null; ) {
          var u = i.alternate;
          O0(u, i), i = i.return;
        }
      ga = e;
      var s = ac(e.current, null);
      return Dn = s, vr = Xl = t, hr = Vu, Fp = null, Om = Y, jp = Y, Lm = Y, Hp = null, Ha = null, kw(), rl.discardPendingWarnings(), s;
    }
    function nR(e, t) {
      do {
        var a = Dn;
        try {
          if (Wh(), _C(), on(), kS.current = null, a === null || a.return === null) {
            hr = Up, Fp = t, Dn = null;
            return;
          }
          if (Ae && a.mode & Lt && Rm(a, !0), Pe)
            if (va(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              wi(a, i, vr);
            } else
              cs(a, t, vr);
          ax(e, a.return, a, t, vr), lR(a);
        } catch (u) {
          t = u, Dn === a && a !== null ? (a = a.return, Dn = a) : a = Dn;
          continue;
        }
        return;
      } while (!0);
    }
    function rR() {
      var e = DS.current;
      return DS.current = ym, e === null ? ym : e;
    }
    function aR(e) {
      DS.current = e;
    }
    function U_() {
      MS = Yn();
    }
    function Ip(e) {
      Om = Ze(e, Om);
    }
    function A_() {
      hr === Vu && (hr = km);
    }
    function VS() {
      (hr === Vu || hr === km || hr === ec) && (hr = Ap), ga !== null && (Cs(Om) || Cs(jp)) && Bo(ga, vr);
    }
    function F_(e) {
      hr !== Ap && (hr = ec), Hp === null ? Hp = [e] : Hp.push(e);
    }
    function j_() {
      return hr === Vu;
    }
    function jm(e, t) {
      var a = Rt;
      Rt |= Vr;
      var i = rR();
      if (ga !== e || vr !== t) {
        if (Xr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Yp(e, vr), u.clear()), Iv(e, t);
        }
        Bu = Ud(), nc(e, t);
      }
      Su(t);
      do
        try {
          H_();
          break;
        } catch (s) {
          nR(e, s);
        }
      while (!0);
      if (Wh(), Rt = a, aR(i), Dn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Oc(), ga = null, vr = Y, hr;
    }
    function H_() {
      for (; Dn !== null; )
        iR(Dn);
    }
    function P_(e, t) {
      var a = Rt;
      Rt |= Vr;
      var i = rR();
      if (ga !== e || vr !== t) {
        if (Xr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Yp(e, vr), u.clear()), Iv(e, t);
        }
        Bu = Ud(), Pp(), nc(e, t);
      }
      Su(t);
      do
        try {
          V_();
          break;
        } catch (s) {
          nR(e, s);
        }
      while (!0);
      return Wh(), aR(i), Rt = a, Dn !== null ? (Uv(), Vu) : (Oc(), ga = null, vr = Y, hr);
    }
    function V_() {
      for (; Dn !== null && !vd(); )
        iR(Dn);
    }
    function iR(e) {
      var t = e.alternate;
      It(e);
      var a;
      (e.mode & Lt) !== ke ? (Ig(e), a = BS(t, e, Xl), Rm(e, !0)) : a = BS(t, e, Xl), on(), e.memoizedProps = e.pendingProps, a === null ? lR(e) : Dn = a, kS.current = null;
    }
    function lR(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & us) === De) {
          It(t);
          var u = void 0;
          if ((t.mode & Lt) === ke ? u = k0(a, t, Xl) : (Ig(t), u = k0(a, t, Xl), Rm(t, !1)), on(), u !== null) {
            Dn = u;
            return;
          }
        } else {
          var s = Ax(a, t);
          if (s !== null) {
            s.flags &= kv, Dn = s;
            return;
          }
          if ((t.mode & Lt) !== ke) {
            Rm(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= us, i.subtreeFlags = De, i.deletions = null;
          else {
            hr = OS, Dn = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          Dn = v;
          return;
        }
        t = i, Dn = t;
      } while (t !== null);
      hr === Vu && (hr = W0);
    }
    function rc(e, t, a) {
      var i = za(), u = Pr.transition;
      try {
        Pr.transition = null, An(Or), B_(e, t, a, i);
      } finally {
        Pr.transition = u, An(i);
      }
      return null;
    }
    function B_(e, t, a, i) {
      do
        Iu();
      while (Po !== null);
      if (J_(), (Rt & (Vr | Ui)) !== pr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Ed(s), u === null)
        return Cd(), null;
      if (s === Y && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Y, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Dt;
      var f = Ze(u.lanes, u.childLanes);
      Nd(e, f), e === ga && (ga = null, Dn = null, vr = Y), ((u.subtreeFlags & Wi) !== De || (u.flags & Wi) !== De) && (tc || (tc = !0, US = a, YS(Gi, function() {
        return Iu(), null;
      })));
      var p = (u.subtreeFlags & (bl | Dl | kl | Wi)) !== De, v = (u.flags & (bl | Dl | kl | Wi)) !== De;
      if (p || v) {
        var y = Pr.transition;
        Pr.transition = null;
        var g = za();
        An(Or);
        var _ = Rt;
        Rt |= Ui, kS.current = null, Vx(e, u), KC(), t_(e, u, s), e1(e.containerInfo), e.current = u, fs(s), n_(u, e, s), ds(), hd(), Rt = _, An(g), Pr.transition = y;
      } else
        e.current = u, KC();
      var w = tc;
      if (tc ? (tc = !1, Po = e, Vp = s) : (Vf = 0, zm = null), f = e.pendingLanes, f === Y && (Pf = null), w || cR(e.current, !1), yd(u.stateNode, i), Xr && e.memoizedUpdaters.clear(), C_(), Pa(e, Yn()), t !== null)
        for (var N = e.onRecoverableError, A = 0; A < t.length; A++) {
          var j = t[A], ue = j.stack, Me = j.digest;
          N(j.value, {
            componentStack: ue,
            digest: Me
          });
        }
      if (Mm) {
        Mm = !1;
        var xe = NS;
        throw NS = null, xe;
      }
      return Zr(Vp, je) && e.tag !== Oo && Iu(), f = e.pendingLanes, Zr(f, je) ? (Ww(), e === AS ? Bp++ : (Bp = 0, AS = e)) : Bp = 0, Lo(), Cd(), null;
    }
    function Iu() {
      if (Po !== null) {
        var e = Wv(Vp), t = bs(Ma, e), a = Pr.transition, i = za();
        try {
          return Pr.transition = null, An(t), I_();
        } finally {
          An(i), Pr.transition = a;
        }
      }
      return !1;
    }
    function $_(e) {
      zS.push(e), tc || (tc = !0, YS(Gi, function() {
        return Iu(), null;
      }));
    }
    function I_() {
      if (Po === null)
        return !1;
      var e = US;
      US = null;
      var t = Po, a = Vp;
      if (Po = null, Vp = Y, (Rt & (Vr | Ui)) !== pr)
        throw new Error("Cannot flush passive effects while already rendering.");
      FS = !0, Nm = !1, gu(a);
      var i = Rt;
      Rt |= Ui, s_(t.current), i_(t, t.current, a, e);
      {
        var u = zS;
        zS = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          Yx(t, f);
        }
      }
      wd(), cR(t.current, !0), Rt = i, Lo(), Nm ? t === zm ? Vf++ : (Vf = 0, zm = t) : Vf = 0, FS = !1, Nm = !1, gd(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function uR(e) {
      return Pf !== null && Pf.has(e);
    }
    function Y_(e) {
      Pf === null ? Pf = /* @__PURE__ */ new Set([e]) : Pf.add(e);
    }
    function Q_(e) {
      Mm || (Mm = !0, NS = e);
    }
    var W_ = Q_;
    function oR(e, t, a) {
      var i = Zs(a, t), u = i0(e, i, je), s = No(e, u, je), f = Sa();
      s !== null && (go(s, je, f), Pa(s, f));
    }
    function sn(e, t, a) {
      if (jx(a), Qp(!1), e.tag === K) {
        oR(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === K) {
          oR(i, e, a);
          return;
        } else if (i.tag === fe) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !uR(s)) {
            var f = Zs(a, e), p = oS(i, f, je), v = No(i, p, je), y = Sa();
            v !== null && (go(v, je, y), Pa(v, y));
            return;
          }
        }
        i = i.return;
      }
      S(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function G_(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = Sa();
      Zc(e, a), rb(e), ga === e && bu(vr, a) && (hr === Ap || hr === km && _u(vr) && Yn() - MS < G0 ? nc(e, Y) : Lm = Ze(Lm, a)), Pa(e, u);
    }
    function sR(e, t) {
      t === Dt && (t = D_(e));
      var a = Sa(), i = Fa(e, t);
      i !== null && (go(i, t, a), Pa(i, a));
    }
    function q_(e) {
      var t = e.memoizedState, a = Dt;
      t !== null && (a = t.retryLane), sR(e, a);
    }
    function X_(e, t) {
      var a = Dt, i;
      switch (e.tag) {
        case be:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case an:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), sR(e, a);
    }
    function K_(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : w_(e / 1960) * 1960;
    }
    function Z_() {
      if (Bp > __)
        throw Bp = 0, AS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Vf > b_ && (Vf = 0, zm = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function J_() {
      rl.flushLegacyContextWarning(), rl.flushPendingUnsafeLifecycleWarnings();
    }
    function cR(e, t) {
      It(e), Hm(e, _l, g_), t && Hm(e, Ci, S_), Hm(e, _l, m_), t && Hm(e, Ci, y_), on();
    }
    function Hm(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== De ? i = i.child : ((i.flags & t) !== De && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var Pm = null;
    function fR(e) {
      {
        if ((Rt & Vr) !== pr || !(e.mode & ct))
          return;
        var t = e.tag;
        if (t !== se && t !== K && t !== fe && t !== oe && t !== Ge && t !== ft && t !== He)
          return;
        var a = Ye(e) || "ReactComponent";
        if (Pm !== null) {
          if (Pm.has(a))
            return;
          Pm.add(a);
        } else
          Pm = /* @__PURE__ */ new Set([a]);
        var i = ar;
        try {
          It(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? It(e) : on();
        }
      }
    }
    var BS;
    {
      var eb = null;
      BS = function(e, t, a) {
        var i = SR(eb, t);
        try {
          return w0(e, t, a);
        } catch (s) {
          if (dw() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (Wh(), _C(), O0(e, t), SR(t, i), t.mode & Lt && Ig(t), xl(null, w0, null, e, t, a), Yi()) {
            var u = ls();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var dR = !1, $S;
    $S = /* @__PURE__ */ new Set();
    function tb(e) {
      if (vi && !Iw())
        switch (e.tag) {
          case oe:
          case Ge:
          case He: {
            var t = Dn && Ye(Dn) || "Unknown", a = t;
            if (!$S.has(a)) {
              $S.add(a);
              var i = Ye(e) || "Unknown";
              S("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case fe: {
            dR || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), dR = !0);
            break;
          }
        }
    }
    function Yp(e, t) {
      if (Xr) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          xs(e, i, t);
        });
      }
    }
    var IS = {};
    function YS(e, t) {
      {
        var a = fl.current;
        return a !== null ? (a.push(t), IS) : pd(e, t);
      }
    }
    function pR(e) {
      if (e !== IS)
        return Lv(e);
    }
    function vR() {
      return fl.current !== null;
    }
    function nb(e) {
      {
        if (e.mode & ct) {
          if (!Y0())
            return;
        } else if (!T_() || Rt !== pr || e.tag !== oe && e.tag !== Ge && e.tag !== He)
          return;
        if (fl.current === null) {
          var t = ar;
          try {
            It(e), S(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Ye(e));
          } finally {
            t ? It(e) : on();
          }
        }
      }
    }
    function rb(e) {
      e.tag !== Oo && Y0() && fl.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Qp(e) {
      K0 = e;
    }
    var Ai = null, Bf = null, ab = function(e) {
      Ai = e;
    };
    function $f(e) {
      {
        if (Ai === null)
          return e;
        var t = Ai(e);
        return t === void 0 ? e : t.current;
      }
    }
    function QS(e) {
      return $f(e);
    }
    function WS(e) {
      {
        if (Ai === null)
          return e;
        var t = Ai(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = $f(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: I,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function hR(e, t) {
      {
        if (Ai === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case fe: {
            typeof i == "function" && (u = !0);
            break;
          }
          case oe: {
            (typeof i == "function" || s === Qe) && (u = !0);
            break;
          }
          case Ge: {
            (s === I || s === Qe) && (u = !0);
            break;
          }
          case ft:
          case He: {
            (s === Xe || s === Qe) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Ai(a);
          if (f !== void 0 && f === Ai(i))
            return !0;
        }
        return !1;
      }
    }
    function mR(e) {
      {
        if (Ai === null || typeof WeakSet != "function")
          return;
        Bf === null && (Bf = /* @__PURE__ */ new WeakSet()), Bf.add(e);
      }
    }
    var ib = function(e, t) {
      {
        if (Ai === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Iu(), $u(function() {
          GS(e.current, i, a);
        });
      }
    }, lb = function(e, t) {
      {
        if (e.context !== ii)
          return;
        Iu(), $u(function() {
          Wp(t, e, null, null);
        });
      }
    };
    function GS(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case oe:
          case He:
          case fe:
            v = p;
            break;
          case Ge:
            v = p.render;
            break;
        }
        if (Ai === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var y = !1, g = !1;
        if (v !== null) {
          var _ = Ai(v);
          _ !== void 0 && (a.has(_) ? g = !0 : t.has(_) && (f === fe ? g = !0 : y = !0));
        }
        if (Bf !== null && (Bf.has(e) || i !== null && Bf.has(i)) && (g = !0), g && (e._debugNeedsRemount = !0), g || y) {
          var w = Fa(e, je);
          w !== null && mr(w, e, je, Xt);
        }
        u !== null && !g && GS(u, t, a), s !== null && GS(s, t, a);
      }
    }
    var ub = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return qS(e.current, i, a), a;
      }
    };
    function qS(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case oe:
          case He:
          case fe:
            p = f;
            break;
          case Ge:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? ob(e, a) : i !== null && qS(i, t, a), u !== null && qS(u, t, a);
      }
    }
    function ob(e, t) {
      {
        var a = sb(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case ie:
              t.add(i.stateNode);
              return;
            case ye:
              t.add(i.stateNode.containerInfo);
              return;
            case K:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function sb(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === ie)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var XS;
    {
      XS = !1;
      try {
        var yR = Object.preventExtensions({});
      } catch {
        XS = !0;
      }
    }
    function cb(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = De, this.subtreeFlags = De, this.deletions = null, this.lanes = Y, this.childLanes = Y, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !XS && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var li = function(e, t, a, i) {
      return new cb(e, t, a, i);
    };
    function KS(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function fb(e) {
      return typeof e == "function" && !KS(e) && e.defaultProps === void 0;
    }
    function db(e) {
      if (typeof e == "function")
        return KS(e) ? fe : oe;
      if (e != null) {
        var t = e.$$typeof;
        if (t === I)
          return Ge;
        if (t === Xe)
          return ft;
      }
      return se;
    }
    function ac(e, t) {
      var a = e.alternate;
      a === null ? (a = li(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = De, a.subtreeFlags = De, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Nn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case se:
        case oe:
        case He:
          a.type = $f(e.type);
          break;
        case fe:
          a.type = QS(e.type);
          break;
        case Ge:
          a.type = WS(e.type);
          break;
      }
      return a;
    }
    function pb(e, t) {
      e.flags &= Nn | hn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = Y, e.lanes = t, e.child = null, e.subtreeFlags = De, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = De, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function vb(e, t, a) {
      var i;
      return e === Fh ? (i = ct, t === !0 && (i |= Wt, i |= Mt)) : i = ke, Xr && (i |= Lt), li(K, null, null, i);
    }
    function ZS(e, t, a, i, u, s) {
      var f = se, p = e;
      if (typeof e == "function")
        KS(e) ? (f = fe, p = QS(p)) : p = $f(p);
      else if (typeof e == "string")
        f = ie;
      else
        e: switch (e) {
          case ci:
            return $o(a.children, u, s, t);
          case Ya:
            f = lt, u |= Wt, (u & ct) !== ke && (u |= Mt);
            break;
          case fi:
            return hb(a, u, s, t);
          case ae:
            return mb(a, u, s, t);
          case me:
            return yb(a, u, s, t);
          case Rn:
            return gR(a, u, s, t);
          case en:
          case dt:
          case un:
          case rr:
          case st:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case di:
                  f = vt;
                  break e;
                case R:
                  f = cn;
                  break e;
                case I:
                  f = Ge, p = WS(p);
                  break e;
                case Xe:
                  f = ft;
                  break e;
                case Qe:
                  f = rn, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var y = i ? Ye(i) : null;
              y && (v += `

Check the render method of \`` + y + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var g = li(f, a, t, u);
      return g.elementType = e, g.type = p, g.lanes = s, g._debugOwner = i, g;
    }
    function JS(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = ZS(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function $o(e, t, a, i) {
      var u = li(ht, e, i, t);
      return u.lanes = a, u;
    }
    function hb(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = li(mt, e, i, t | Lt);
      return u.elementType = fi, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function mb(e, t, a, i) {
      var u = li(be, e, i, t);
      return u.elementType = ae, u.lanes = a, u;
    }
    function yb(e, t, a, i) {
      var u = li(an, e, i, t);
      return u.elementType = me, u.lanes = a, u;
    }
    function gR(e, t, a, i) {
      var u = li(Oe, e, i, t);
      u.elementType = Rn, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function eE(e, t, a) {
      var i = li(Be, e, null, t);
      return i.lanes = a, i;
    }
    function gb() {
      var e = li(ie, null, null, ke);
      return e.elementType = "DELETED", e;
    }
    function Sb(e) {
      var t = li(Kt, null, null, ke);
      return t.stateNode = e, t;
    }
    function tE(e, t, a) {
      var i = e.children !== null ? e.children : [], u = li(ye, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function SR(e, t) {
      return e === null && (e = li(se, null, null, ke)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function Eb(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Ay, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Dt, this.eventTimes = ws(Y), this.expirationTimes = ws(Xt), this.pendingLanes = Y, this.suspendedLanes = Y, this.pingedLanes = Y, this.expiredLanes = Y, this.mutableReadLanes = Y, this.finishedLanes = Y, this.entangledLanes = Y, this.entanglements = ws(Y), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < Eu; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Fh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Oo:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function ER(e, t, a, i, u, s, f, p, v, y) {
      var g = new Eb(e, t, a, p, v), _ = vb(t, s);
      g.current = _, _.stateNode = g;
      {
        var w = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        _.memoizedState = w;
      }
      return vg(_), g;
    }
    var nE = "18.3.1";
    function Cb(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return $r(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: nr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var rE, aE;
    rE = !1, aE = {};
    function CR(e) {
      if (!e)
        return ii;
      var t = fo(e), a = rw(t);
      if (t.tag === fe) {
        var i = t.type;
        if ($l(i))
          return GE(t, i, a);
      }
      return a;
    }
    function Rb(e, t) {
      {
        var a = fo(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = Gr(a);
        if (u === null)
          return null;
        if (u.mode & Wt) {
          var s = Ye(a) || "Component";
          if (!aE[s]) {
            aE[s] = !0;
            var f = ar;
            try {
              It(u), a.mode & Wt ? S("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : S("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? It(f) : on();
            }
          }
        }
        return u.stateNode;
      }
    }
    function RR(e, t, a, i, u, s, f, p) {
      var v = !1, y = null;
      return ER(e, t, v, y, a, i, u, s, f);
    }
    function TR(e, t, a, i, u, s, f, p, v, y) {
      var g = !0, _ = ER(a, i, g, e, u, s, f, p, v);
      _.context = CR(null);
      var w = _.current, N = Sa(), A = Vo(w), j = Hu(N, A);
      return j.callback = t ?? null, No(w, j, A), k_(_, A, N), _;
    }
    function Wp(e, t, a, i) {
      md(t, e);
      var u = t.current, s = Sa(), f = Vo(u);
      yn(f);
      var p = CR(a);
      t.context === null ? t.context = p : t.pendingContext = p, vi && ar !== null && !rE && (rE = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Ye(ar) || "Unknown"));
      var v = Hu(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var y = No(u, v, f);
      return y !== null && (mr(y, u, f, s), Zh(y, u, f)), f;
    }
    function Vm(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case ie:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function Tb(e) {
      switch (e.tag) {
        case K: {
          var t = e.stateNode;
          if (ef(t)) {
            var a = Fv(t);
            N_(t, a);
          }
          break;
        }
        case be: {
          $u(function() {
            var u = Fa(e, je);
            if (u !== null) {
              var s = Sa();
              mr(u, e, je, s);
            }
          });
          var i = je;
          iE(e, i);
          break;
        }
      }
    }
    function wR(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = Bv(a.retryLane, t));
    }
    function iE(e, t) {
      wR(e, t);
      var a = e.alternate;
      a && wR(a, t);
    }
    function wb(e) {
      if (e.tag === be) {
        var t = gs, a = Fa(e, t);
        if (a !== null) {
          var i = Sa();
          mr(a, e, t, i);
        }
        iE(e, t);
      }
    }
    function xb(e) {
      if (e.tag === be) {
        var t = Vo(e), a = Fa(e, t);
        if (a !== null) {
          var i = Sa();
          mr(a, e, t, i);
        }
        iE(e, t);
      }
    }
    function xR(e) {
      var t = fn(e);
      return t === null ? null : t.stateNode;
    }
    var _R = function(e) {
      return null;
    };
    function _b(e) {
      return _R(e);
    }
    var bR = function(e) {
      return !1;
    };
    function bb(e) {
      return bR(e);
    }
    var DR = null, kR = null, OR = null, LR = null, MR = null, NR = null, zR = null, UR = null, AR = null;
    {
      var FR = function(e, t, a) {
        var i = t[a], u = it(e) ? e.slice() : tt({}, e);
        return a + 1 === t.length ? (it(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = FR(e[i], t, a + 1), u);
      }, jR = function(e, t) {
        return FR(e, t, 0);
      }, HR = function(e, t, a, i) {
        var u = t[i], s = it(e) ? e.slice() : tt({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], it(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = HR(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, PR = function(e, t, a) {
        if (t.length !== a.length) {
          Ie("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              Ie("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return HR(e, t, a, 0);
      }, VR = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = it(e) ? e.slice() : tt({}, e);
        return s[u] = VR(e[u], t, a + 1, i), s;
      }, BR = function(e, t, a) {
        return VR(e, t, 0, a);
      }, lE = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      DR = function(e, t, a, i) {
        var u = lE(e, t);
        if (u !== null) {
          var s = BR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = tt({}, e.memoizedProps);
          var f = Fa(e, je);
          f !== null && mr(f, e, je, Xt);
        }
      }, kR = function(e, t, a) {
        var i = lE(e, t);
        if (i !== null) {
          var u = jR(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = tt({}, e.memoizedProps);
          var s = Fa(e, je);
          s !== null && mr(s, e, je, Xt);
        }
      }, OR = function(e, t, a, i) {
        var u = lE(e, t);
        if (u !== null) {
          var s = PR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = tt({}, e.memoizedProps);
          var f = Fa(e, je);
          f !== null && mr(f, e, je, Xt);
        }
      }, LR = function(e, t, a) {
        e.pendingProps = BR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Fa(e, je);
        i !== null && mr(i, e, je, Xt);
      }, MR = function(e, t) {
        e.pendingProps = jR(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Fa(e, je);
        a !== null && mr(a, e, je, Xt);
      }, NR = function(e, t, a) {
        e.pendingProps = PR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Fa(e, je);
        i !== null && mr(i, e, je, Xt);
      }, zR = function(e) {
        var t = Fa(e, je);
        t !== null && mr(t, e, je, Xt);
      }, UR = function(e) {
        _R = e;
      }, AR = function(e) {
        bR = e;
      };
    }
    function Db(e) {
      var t = Gr(e);
      return t === null ? null : t.stateNode;
    }
    function kb(e) {
      return null;
    }
    function Ob() {
      return ar;
    }
    function Lb(e) {
      var t = e.findFiberByHostInstance, a = M.ReactCurrentDispatcher;
      return ho({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: DR,
        overrideHookStateDeletePath: kR,
        overrideHookStateRenamePath: OR,
        overrideProps: LR,
        overridePropsDeletePath: MR,
        overridePropsRenamePath: NR,
        setErrorHandler: UR,
        setSuspenseHandler: AR,
        scheduleUpdate: zR,
        currentDispatcherRef: a,
        findHostInstanceByFiber: Db,
        findFiberByHostInstance: t || kb,
        // React Refresh
        findHostInstancesForRefresh: ub,
        scheduleRefresh: ib,
        scheduleRoot: lb,
        setRefreshHandler: ab,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: Ob,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: nE
      });
    }
    var $R = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function uE(e) {
      this._internalRoot = e;
    }
    Bm.prototype.render = uE.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : $m(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Ln) {
          var i = xR(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Wp(e, t, null, null);
    }, Bm.prototype.unmount = uE.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        tR() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), $u(function() {
          Wp(null, e, null, null);
        }), $E(t);
      }
    };
    function Mb(e, t) {
      if (!$m(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      IR(e);
      var a = !1, i = !1, u = "", s = $R;
      t != null && (t.hydrate ? Ie("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === _r && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = RR(e, Fh, null, a, i, u, s);
      Oh(f.current, e);
      var p = e.nodeType === Ln ? e.parentNode : e;
      return Jd(p), new uE(f);
    }
    function Bm(e) {
      this._internalRoot = e;
    }
    function Nb(e) {
      e && Zv(e);
    }
    Bm.prototype.unstable_scheduleHydration = Nb;
    function zb(e, t, a) {
      if (!$m(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      IR(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = $R;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var y = TR(t, null, e, Fh, i, s, f, p, v);
      if (Oh(y.current, e), Jd(e), u)
        for (var g = 0; g < u.length; g++) {
          var _ = u[g];
          jw(y, _);
        }
      return new Bm(y);
    }
    function $m(e) {
      return !!(e && (e.nodeType === Yr || e.nodeType === Ii || e.nodeType === td));
    }
    function Gp(e) {
      return !!(e && (e.nodeType === Yr || e.nodeType === Ii || e.nodeType === td || e.nodeType === Ln && e.nodeValue === " react-mount-point-unstable "));
    }
    function IR(e) {
      e.nodeType === Yr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), cp(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var Ub = M.ReactCurrentOwner, YR;
    YR = function(e) {
      if (e._reactRootContainer && e.nodeType !== Ln) {
        var t = xR(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = oE(e), u = !!(i && Do(i));
      u && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Yr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function oE(e) {
      return e ? e.nodeType === Ii ? e.documentElement : e.firstChild : null;
    }
    function QR() {
    }
    function Ab(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var w = Vm(f);
            s.call(w);
          };
        }
        var f = TR(
          t,
          i,
          e,
          Oo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          QR
        );
        e._reactRootContainer = f, Oh(f.current, e);
        var p = e.nodeType === Ln ? e.parentNode : e;
        return Jd(p), $u(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var y = i;
          i = function() {
            var w = Vm(g);
            y.call(w);
          };
        }
        var g = RR(
          e,
          Oo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          QR
        );
        e._reactRootContainer = g, Oh(g.current, e);
        var _ = e.nodeType === Ln ? e.parentNode : e;
        return Jd(_), $u(function() {
          Wp(t, g, a, i);
        }), g;
      }
    }
    function Fb(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Im(e, t, a, i, u) {
      YR(a), Fb(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = Ab(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = Vm(f);
            p.call(v);
          };
        }
        Wp(t, f, e, u);
      }
      return Vm(f);
    }
    var WR = !1;
    function jb(e) {
      {
        WR || (WR = !0, S("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = Ub.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", wt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Yr ? e : Rb(e, "findDOMNode");
    }
    function Hb(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = cp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Im(null, e, t, !0, a);
    }
    function Pb(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = cp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Im(null, e, t, !1, a);
    }
    function Vb(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gp(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !iy(e))
        throw new Error("parentComponent must be a valid React Component");
      return Im(e, t, a, !1, i);
    }
    var GR = !1;
    function Bb(e) {
      if (GR || (GR = !0, S("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Gp(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = cp(e) && e._reactRootContainer === void 0;
        t && S("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = oE(e), i = a && !Do(a);
          i && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return $u(function() {
          Im(null, null, e, !1, function() {
            e._reactRootContainer = null, $E(e);
          });
        }), !0;
      } else {
        {
          var u = oE(e), s = !!(u && Do(u)), f = e.nodeType === Yr && Gp(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Rr(Tb), So(wb), Gv(xb), ks(za), Ad(Yv), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), yc(IT), ay(HS, z_, $u);
    function $b(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!$m(t))
        throw new Error("Target container is not a DOM element.");
      return Cb(e, t, null, a);
    }
    function Ib(e, t, a, i) {
      return Vb(e, t, a, i);
    }
    var sE = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Do, Ef, Lh, uo, gc, HS]
    };
    function Yb(e, t) {
      return sE.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Mb(e, t);
    }
    function Qb(e, t, a) {
      return sE.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), zb(e, t, a);
    }
    function Wb(e) {
      return tR() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), $u(e);
    }
    var Gb = Lb({
      findFiberByHostInstance: $s,
      bundleType: 1,
      version: nE,
      rendererPackageName: "react-dom"
    });
    if (!Gb && kn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var qR = window.location.protocol;
      /^(https?|file):$/.test(qR) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (qR === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sE, Ba.createPortal = $b, Ba.createRoot = Yb, Ba.findDOMNode = jb, Ba.flushSync = Wb, Ba.hydrate = Hb, Ba.hydrateRoot = Qb, Ba.render = Pb, Ba.unmountComponentAtNode = Bb, Ba.unstable_batchedUpdates = HS, Ba.unstable_renderSubtreeIntoContainer = Ib, Ba.version = nE, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Ba;
}
function cT() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cT);
    } catch ($) {
      console.error($);
    }
  }
}
process.env.NODE_ENV === "production" ? (cT(), pE.exports = rD()) : pE.exports = aD();
var iD = pE.exports, vE, Wm = iD;
if (process.env.NODE_ENV === "production")
  vE = Wm.createRoot, Wm.hydrateRoot;
else {
  var lT = Wm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  vE = function($, B) {
    lT.usingClientEntryPoint = !0;
    try {
      return Wm.createRoot($, B);
    } finally {
      lT.usingClientEntryPoint = !1;
    }
  };
}
var uT = Jp();
async function lD($) {
  const [B, M, Je, Fe] = await Promise.all([
    $.sendMessagePromise({ type: "config/floor_registry/list" }),
    $.sendMessagePromise({ type: "config/area_registry/list" }),
    $.sendMessagePromise({ type: "config/device_registry/list" }),
    $.sendMessagePromise({ type: "config/entity_registry/list" })
  ]);
  return { floors: B, areas: M, devices: Je, entities: Fe };
}
const uD = /* @__PURE__ */ new Set([
  "door",
  "window",
  "garage_door",
  "lock",
  "safety",
  "smoke",
  "gas",
  "moisture",
  "tamper"
]), oD = {
  light: "light",
  climate: "climate",
  media_player: "media",
  cover: "cover",
  switch: "switch",
  fan: "switch",
  input_boolean: "switch",
  lock: "security",
  alarm_control_panel: "security",
  sensor: "sensor"
};
function sD($, B) {
  const M = $.split(".")[0];
  return M === "binary_sensor" ? B && uD.has(B) ? "security" : "sensor" : oD[M] ?? "other";
}
const cD = [
  "light",
  "climate",
  "media",
  "cover",
  "switch",
  "security",
  "sensor",
  "other"
], hE = "__unassigned__", oT = "Sonstiges";
function fD($, B) {
  return B ? !0 : !($.hidden_by !== null || $.entity_category !== null);
}
function dD($, B) {
  if ($.area_id) return $.area_id;
  if ($.device_id) {
    const M = B.get($.device_id);
    if (M) return M;
  }
  return hE;
}
function pD($, B) {
  const M = /* @__PURE__ */ new Map();
  for (const Fe of $) {
    const Ie = sD(Fe, B.deviceClassOf(Fe)), S = M.get(Ie) ?? [];
    S.push(Fe), M.set(Ie, S);
  }
  const Je = [];
  for (const Fe of cD) {
    const Ie = M.get(Fe);
    Ie && Ie.length > 0 && Je.push({ category: Fe, entityIds: Ie });
  }
  return Je;
}
function vD($) {
  const B = new Map(
    $.devices.map((se) => [se.id, se.area_id])
  ), M = /* @__PURE__ */ new Map();
  for (const se of $.entities) {
    if (!fD(se, $.includeHidden)) continue;
    const K = dD(se, B), ye = M.get(K) ?? [];
    ye.push(se.entity_id), M.set(K, ye);
  }
  const Je = new Map(
    $.areas.map((se) => [se.area_id, se.name])
  ), Fe = new Map(
    $.areas.map((se) => [se.area_id, se.floor_id])
  ), Ie = /* @__PURE__ */ new Map();
  for (const [se, K] of M) {
    const ye = pD(K, $);
    if (ye.length === 0) continue;
    const ie = se === hE ? oT : Je.get(se) ?? se, Be = se === hE ? null : Fe.get(se) ?? null, ht = { areaId: se, name: ie, groups: ye }, lt = Ie.get(Be) ?? [];
    lt.push(ht), Ie.set(Be, lt);
  }
  if (!($.floors.length > 0)) {
    const se = [...Ie.values()].flat();
    return se.length === 0 ? { hasFloors: !1, floors: [] } : {
      hasFloors: !1,
      floors: [{ floorId: null, name: "", rooms: se }]
    };
  }
  const St = [], oe = [...$.floors].sort(
    (se, K) => (se.level ?? 0) - (K.level ?? 0)
  );
  for (const se of oe) {
    const K = Ie.get(se.floor_id) ?? [];
    K.length > 0 && St.push({ floorId: se.floor_id, name: se.name, rooms: K });
  }
  const fe = [...Ie.entries()].filter(([se]) => se === null || !$.floors.some((K) => K.floor_id === se)).flatMap(([, se]) => se);
  return fe.length > 0 && St.push({ floorId: null, name: oT, rooms: fe }), { hasFloors: !0, floors: St };
}
function hD($) {
  const [B, M] = uT.useState(null);
  return uT.useEffect(() => {
    if (!$) return;
    let Je = !1;
    return lD($.connection).then((Fe) => {
      if (Je) return;
      const Ie = vD({
        floors: Fe.floors,
        areas: Fe.areas,
        devices: Fe.devices,
        entities: Fe.entities,
        deviceClassOf: (S) => {
          var St, oe;
          return ((oe = (St = $.states[S]) == null ? void 0 : St.attributes) == null ? void 0 : oe.device_class) ?? null;
        },
        includeHidden: !1
      });
      M(Ie);
    }).catch((Fe) => {
      Je || console.error("ha-reactdash: registry fetch failed", Fe);
    }), () => {
      Je = !0;
    };
  }, [$]), B;
}
const mD = { fontFamily: "sans-serif", padding: 16 };
function yD({ tree: $ }) {
  return /* @__PURE__ */ Fi.jsxs("div", { style: mD, children: [
    /* @__PURE__ */ Fi.jsx("h1", { children: "ha-reactdash" }),
    $.floors.map((B) => /* @__PURE__ */ Fi.jsxs("section", { style: { marginBottom: 24 }, children: [
      $.hasFloors && B.name && /* @__PURE__ */ Fi.jsx("h2", { children: B.name }),
      B.rooms.map((M) => /* @__PURE__ */ Fi.jsxs("div", { style: { margin: "8px 0", paddingLeft: 8 }, children: [
        /* @__PURE__ */ Fi.jsx("h3", { style: { margin: "4px 0" }, children: M.name }),
        M.groups.map((Je) => /* @__PURE__ */ Fi.jsxs("div", { style: { paddingLeft: 12 }, children: [
          /* @__PURE__ */ Fi.jsx("strong", { children: Je.category }),
          ": ",
          Je.entityIds.join(", ")
        ] }, Je.category))
      ] }, M.areaId))
    ] }, B.floorId ?? "synthetic"))
  ] });
}
function gD({ hass: $ }) {
  const B = hD($);
  return $ ? B ? /* @__PURE__ */ Fi.jsx(yD, { tree: B }) : /* @__PURE__ */ Fi.jsx("div", { style: { padding: 16, fontFamily: "sans-serif" }, children: "Lade Struktur…" }) : /* @__PURE__ */ Fi.jsx("div", { style: { padding: 16, fontFamily: "sans-serif" }, children: "Verbinde…" });
}
class SD extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      const B = this.attachShadow({ mode: "open" });
      this.mountPoint = document.createElement("div"), B.appendChild(this.mountPoint);
    }
    !this.root && this.mountPoint && (this.root = vE(this.mountPoint)), this.renderApp();
  }
  disconnectedCallback() {
    var B;
    (B = this.root) == null || B.unmount(), this.root = void 0;
  }
  set hass(B) {
    this._hass = B, this.renderApp();
  }
  get hass() {
    return this._hass;
  }
  renderApp() {
    var B;
    (B = this.root) == null || B.render(/* @__PURE__ */ Fi.jsx(gD, { hass: this._hass }));
  }
}
customElements.get("ha-reactdash") || customElements.define("ha-reactdash", SD);
