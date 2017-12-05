!
function() {
    function e(e, t, n) {
        if (r) for (var o = r.length; o--;) {
            var s = r[o];
            i.call(e, s) && t.call(n, s, e[s])
        }
    }
    this.MooTools = {
        version: "1.6.0",
        build: "529422872adfff401b901b8b6c7ca5114ee95e2b"
    };
    var t = this.typeOf = function(e) {
        if (null == e) return "null";
        if (null != e.$family) return e.$family();
        if (e.nodeName) {
            if (1 == e.nodeType) return "element";
            if (3 == e.nodeType) return /\S/.test(e.nodeValue) ? "textnode": "whitespace"
        } else if ("number" == typeof e.length) {
            if ("callee" in e) return "arguments";
            if ("item" in e) return "collection"
        }
        return typeof e
    },
    n = this.instanceOf = function(e, t) {
        if (null == e) return ! 1;
        for (var n = e.$constructor || e.constructor; n;) {
            if (n === t) return ! 0;
            n = n.parent
        }
        return !! e.hasOwnProperty && e instanceof t
    },
    i = Object.prototype.hasOwnProperty,
    r = !0;
    for (var o in {
        toString: 1
    }) r = null;
    r && (r = ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"]);
    var s = this.Function;
    s.prototype.overloadSetter = function(t) {
        var n = this;
        return function(i, r) {
            if (null == i) return this;
            if (t || "string" != typeof i) {
                for (var o in i) n.call(this, o, i[o]);
                e(i, n, this)
            } else n.call(this, i, r);
            return this
        }
    },
    s.prototype.overloadGetter = function(e) {
        var t = this;
        return function(n) {
            var i, r;
            if ("string" != typeof n ? i = n: arguments.length > 1 ? i = arguments: e && (i = [n]), i) {
                r = {};
                for (var o = 0; o < i.length; o++) r[i[o]] = t.call(this, i[o])
            } else r = t.call(this, n);
            return r
        }
    },
    s.prototype.extend = function(e, t) {
        this[e] = t
    }.overloadSetter(),
    s.prototype.implement = function(e, t) {
        this.prototype[e] = t
    }.overloadSetter();
    var a = Array.prototype.slice;
    Array.convert = function(e) {
        return null == e ? [] : l.isEnumerable(e) && "string" != typeof e ? "array" == t(e) ? e: a.call(e) : [e]
    },
    s.convert = function(e) {
        return "function" == t(e) ? e: function() {
            return e
        }
    },
    Number.convert = function(e) {
        var t = parseFloat(e);
        return isFinite(t) ? t: null
    },
    String.convert = function(e) {
        return e + ""
    },
    Array.from = Array.convert,
    s.from = s.convert,
    Number.from = Number.convert,
    String.from = String.convert,
    s.implement({
        hide: function() {
            return this.$hidden = !0,
            this
        },
        protect: function() {
            return this.$protected = !0,
            this
        }
    });
    var l = this.Type = function(e, n) {
        if (e) {
            var i = e.toLowerCase(),
            r = function(e) {
                return t(e) == i
            };
            l["is" + e] = r,
            null != n && (n.prototype.$family = function() {
                return i
            }.hide(), n.type = r)
        }
        return null == n ? null: (n.extend(this), n.$constructor = l, n.prototype.$constructor = n, n)
    },
    c = Object.prototype.toString;
    l.isEnumerable = function(e) {
        return null != e && "number" == typeof e.length && "[object Function]" != c.call(e)
    };
    var u = {},
    p = function(e) {
        var n = t(e.prototype);
        return u[n] || (u[n] = [])
    },
    h = function(e, n) {
        if (!n || !n.$hidden) {
            for (var i = p(this), r = 0; r < i.length; r++) {
                var o = i[r];
                "type" == t(o) ? h.call(o, e, n) : o.call(this, e, n)
            }
            var s = this.prototype[e];
            null != s && s.$protected || (this.prototype[e] = n),
            null == this[e] && "function" == t(n) && f.call(this, e,
            function(e) {
                return n.apply(e, a.call(arguments, 1))
            })
        }
    },
    f = function(e, t) {
        if (!t || !t.$hidden) {
            var n = this[e];
            null != n && n.$protected || (this[e] = t)
        }
    };
    l.implement({
        implement: h.overloadSetter(),
        extend: f.overloadSetter(),
        alias: function(e, t) {
            h.call(this, e, this.prototype[t])
        }.overloadSetter(),
        mirror: function(e) {
            return p(this).push(e),
            this
        }
    }),
    new l("Type", l);
    var d = function(e, t, n) {
        var i = t != Object,
        r = t.prototype;
        i && (t = new l(e, t));
        for (var o = 0,
        s = n.length; o < s; o++) {
            var a = n[o],
            c = t[a],
            u = r[a];
            c && c.protect(),
            i && u && t.implement(a, u.protect())
        }
        if (i) {
            var p = r.propertyIsEnumerable(n[0]);
            t.forEachMethod = function(e) {
                if (!p) for (var t = 0,
                i = n.length; t < i; t++) e.call(r, r[n[t]], n[t]);
                for (var o in r) e.call(r, r[o], o)
            }
        }
        return d
    };
    d("String", String, ["charAt", "charCodeAt", "concat", "contains", "indexOf", "lastIndexOf", "match", "quote", "replace", "search", "slice", "split", "substr", "substring", "trim", "toLowerCase", "toUpperCase"])("Array", Array, ["pop", "push", "reverse", "shift", "sort", "splice", "unshift", "concat", "join", "slice", "indexOf", "lastIndexOf", "filter", "forEach", "every", "map", "some", "reduce", "reduceRight", "contains"])("Number", Number, ["toExponential", "toFixed", "toLocaleString", "toPrecision"])("Function", s, ["apply", "call", "bind"])("RegExp", RegExp, ["exec", "test"])("Object", Object, ["create", "defineProperty", "defineProperties", "keys", "getPrototypeOf", "getOwnPropertyDescriptor", "getOwnPropertyNames", "preventExtensions", "isExtensible", "seal", "isSealed", "freeze", "isFrozen"])("Date", Date, ["now"]),
    Object.extend = f.overloadSetter(),
    Date.extend("now",
    function() {
        return + new Date
    }),
    new l("Boolean", Boolean),
    Number.prototype.$family = function() {
        return isFinite(this) ? "number": "null"
    }.hide(),
    Number.extend("random",
    function(e, t) {
        return Math.floor(Math.random() * (t - e + 1) + e)
    }),
    Array.implement({
        forEach: function(e, t) {
            for (var n = 0,
            i = this.length; n < i; n++) n in this && e.call(t, this[n], n, this)
        },
        each: function(e, t) {
            return Array.forEach(this, e, t),
            this
        }
    }),
    Object.extend({
        keys: function(t) {
            var n = [];
            for (var r in t) i.call(t, r) && n.push(r);
            return e(t,
            function(e) {
                n.push(e)
            }),
            n
        },
        forEach: function(e, t, n) {
            Object.keys(e).forEach(function(i) {
                t.call(n, e[i], i, e)
            })
        }
    }),
    Object.each = Object.forEach;
    var y = function(e) {
        switch (t(e)) {
        case "array":
            return e.clone();
        case "object":
            return Object.clone(e);
        default:
            return e
        }
    };
    Array.implement("clone",
    function() {
        for (var e = this.length,
        t = new Array(e); e--;) t[e] = y(this[e]);
        return t
    });
    var m = function(e, n, i) {
        switch (t(i)) {
        case "object":
            "object" == t(e[n]) ? Object.merge(e[n], i) : e[n] = Object.clone(i);
            break;
        case "array":
            e[n] = i.clone();
            break;
        default:
            e[n] = i
        }
        return e
    };
    Object.extend({
        merge: function(e, n, i) {
            if ("string" == t(n)) return m(e, n, i);
            for (var r = 1,
            o = arguments.length; r < o; r++) {
                var s = arguments[r];
                for (var a in s) m(e, a, s[a])
            }
            return e
        },
        clone: function(e) {
            var t = {};
            for (var n in e) t[n] = y(e[n]);
            return t
        },
        append: function(e) {
            for (var t = 1,
            n = arguments.length; t < n; t++) {
                var i = arguments[t] || {};
                for (var r in i) e[r] = i[r]
            }
            return e
        }
    }),
    ["Object", "WhiteSpace", "TextNode", "Collection", "Arguments"].each(function(e) {
        new l(e)
    });
    var g = Date.now();
    String.extend("uniqueID",
    function() {
        return (g++).toString(36)
    });
    var v = this.Hash = new l("Hash",
    function(e) {
        "hash" == t(e) && (e = Object.clone(e.getClean()));
        for (var n in e) this[n] = e[n];
        return this
    });
    v.implement({
        forEach: function(e, t) {
            Object.forEach(this, e, t)
        },
        getClean: function() {
            var e = {};
            for (var t in this) this.hasOwnProperty(t) && (e[t] = this[t]);
            return e
        },
        getLength: function() {
            var e = 0;
            for (var t in this) this.hasOwnProperty(t) && e++;
            return e
        }
    }),
    v.alias("each", "forEach"),
    Object.type = l.isObject;
    var b = this.Native = function(e) {
        return new l(e.name, e.initialize)
    };
    b.type = l.type,
    b.implement = function(e, t) {
        for (var n = 0; n < e.length; n++) e[n].implement(t);
        return b
    };
    var x = Array.type;
    Array.type = function(e) {
        return n(e, Array) || x(e)
    },
    this.$A = function(e) {
        return Array.convert(e).slice()
    },
    this.$arguments = function(e) {
        return function() {
            return arguments[e]
        }
    },
    this.$chk = function(e) {
        return ! (!e && 0 !== e)
    },
    this.$clear = function(e) {
        return clearTimeout(e),
        clearInterval(e),
        null
    },
    this.$defined = function(e) {
        return null != e
    },
    this.$each = function(e, n, i) {
        var r = t(e); ("arguments" == r || "collection" == r || "array" == r || "elements" == r ? Array: Object).each(e, n, i)
    },
    this.$empty = function() {},
    this.$extend = function(e, t) {
        return Object.append(e, t)
    },
    this.$H = function(e) {
        return new v(e)
    },
    this.$merge = function() {
        var e = Array.slice(arguments);
        return e.unshift({}),
        Object.merge.apply(null, e)
    },
    this.$lambda = s.convert,
    this.$mixin = Object.merge,
    this.$random = Number.random,
    this.$splat = Array.convert,
    this.$time = Date.now,
    this.$type = function(e) {
        var n = t(e);
        return "elements" == n ? "array": "null" != n && n
    },
    this.$unlink = function(e) {
        switch (t(e)) {
        case "object":
            return Object.clone(e);
        case "array":
            return Array.clone(e);
        case "hash":
            return new v(e);
        default:
            return e
        }
    }
} (),
Array.implement({
    every: function(e, t) {
        for (var n = 0,
        i = this.length >>> 0; n < i; n++) if (n in this && !e.call(t, this[n], n, this)) return ! 1;
        return ! 0
    },
    filter: function(e, t) {
        for (var n, i = [], r = 0, o = this.length >>> 0; r < o; r++) r in this && (n = this[r], e.call(t, n, r, this) && i.push(n));
        return i
    },
    indexOf: function(e, t) {
        for (var n = this.length >>> 0,
        i = t < 0 ? Math.max(0, n + t) : t || 0; i < n; i++) if (this[i] === e) return i;
        return - 1
    },
    map: function(e, t) {
        for (var n = this.length >>> 0,
        i = Array(n), r = 0; r < n; r++) r in this && (i[r] = e.call(t, this[r], r, this));
        return i
    },
    some: function(e, t) {
        for (var n = 0,
        i = this.length >>> 0; n < i; n++) if (n in this && e.call(t, this[n], n, this)) return ! 0;
        return ! 1
    },
    clean: function() {
        return this.filter(function(e) {
            return null != e
        })
    },
    invoke: function(e) {
        var t = Array.slice(arguments, 1);
        return this.map(function(n) {
            return n[e].apply(n, t)
        })
    },
    associate: function(e) {
        for (var t = {},
        n = Math.min(this.length, e.length), i = 0; i < n; i++) t[e[i]] = this[i];
        return t
    },
    link: function(e) {
        for (var t = {},
        n = 0,
        i = this.length; n < i; n++) for (var r in e) if (e[r](this[n])) {
            t[r] = this[n],
            delete e[r];
            break
        }
        return t
    },
    contains: function(e, t) {
        return - 1 != this.indexOf(e, t)
    },
    append: function(e) {
        return this.push.apply(this, e),
        this
    },
    getLast: function() {
        return this.length ? this[this.length - 1] : null
    },
    getRandom: function() {
        return this.length ? this[Number.random(0, this.length - 1)] : null
    },
    include: function(e) {
        return this.contains(e) || this.push(e),
        this
    },
    combine: function(e) {
        for (var t = 0,
        n = e.length; t < n; t++) this.include(e[t]);
        return this
    },
    erase: function(e) {
        for (var t = this.length; t--;) this[t] === e && this.splice(t, 1);
        return this
    },
    empty: function() {
        return this.length = 0,
        this
    },
    flatten: function() {
        for (var e = [], t = 0, n = this.length; t < n; t++) {
            var i = typeOf(this[t]);
            "null" != i && (e = e.concat("array" == i || "collection" == i || "arguments" == i || instanceOf(this[t], Array) ? Array.flatten(this[t]) : this[t]))
        }
        return e
    },
    pick: function() {
        for (var e = 0,
        t = this.length; e < t; e++) if (null != this[e]) return this[e];
        return null
    },
    hexToRgb: function(e) {
        if (3 != this.length) return null;
        var t = this.map(function(e) {
            return 1 == e.length && (e += e),
            parseInt(e, 16)
        });
        return e ? t: "rgb(" + t + ")"
    },
    rgbToHex: function(e) {
        if (this.length < 3) return null;
        if (4 == this.length && 0 == this[3] && !e) return "transparent";
        for (var t = [], n = 0; n < 3; n++) {
            var i = (this[n] - 0).toString(16);
            t.push(1 == i.length ? "0" + i: i)
        }
        return e ? t: "#" + t.join("")
    }
}),
Array.alias("extend", "append");
var $pick = this.$pick = function() {
    return Array.convert(arguments).pick()
};
Function.extend({
    attempt: function() {
        for (var e = 0,
        t = arguments.length; e < t; e++) try {
            return arguments[e]()
        } catch(e) {}
        return null
    }
}),
Function.implement({
    attempt: function(e, t) {
        try {
            return this.apply(t, Array.convert(e))
        } catch(e) {}
        return null
    },
    bind: function(e) {
        var t = this,
        n = arguments.length > 1 ? Array.slice(arguments, 1) : null,
        i = function() {},
        r = function() {
            var o = e,
            s = arguments.length;
            this instanceof r && (i.prototype = t.prototype, o = new i);
            var a = n || s ? t.apply(o, n && s ? n.concat(Array.slice(arguments)) : n || arguments) : t.call(o);
            return o == e ? a: o
        };
        return r
    },
    pass: function(e, t) {
        var n = this;
        return null != e && (e = Array.convert(e)),
        function() {
            return n.apply(t, e || arguments)
        }
    },
    delay: function(e, t, n) {
        return setTimeout(this.pass(null == n ? [] : n, t), e)
    },
    periodical: function(e, t, n) {
        return setInterval(this.pass(null == n ? [] : n, t), e)
    }
}),
delete Function.prototype.bind,
Function.implement({
    create: function(e) {
        var t = this;
        return e = e || {},
        function(n) {
            var i = e.arguments;
            i = null != i ? Array.convert(i) : Array.slice(arguments, e.event ? 1 : 0),
            e.event && i.unshift(n || window.event);
            var r = function() {
                return t.apply(e.bind || null, i)
            };
            return e.delay ? setTimeout(r, e.delay) : e.periodical ? setInterval(r, e.periodical) : e.attempt ? Function.attempt(r) : r()
        }
    },
    bind: function(e, t) {
        var n = this;
        return null != t && (t = Array.convert(t)),
        function() {
            return n.apply(e, t || arguments)
        }
    },
    bindWithEvent: function(e, t) {
        var n = this;
        return null != t && (t = Array.convert(t)),
        function(i) {
            return n.apply(e, null == t ? arguments: [i].concat(t))
        }
    },
    run: function(e, t) {
        return this.apply(t, Array.convert(e))
    }
}),
Object.create == Function.prototype.create && (Object.create = null);
var $try = Function.attempt;
Number.implement({
    limit: function(e, t) {
        return Math.min(t, Math.max(e, this))
    },
    round: function(e) {
        return e = Math.pow(10, e || 0).toFixed(e < 0 ? -e: 0),
        Math.round(this * e) / e
    },
    times: function(e, t) {
        for (var n = 0; n < this; n++) e.call(t, n, this)
    },
    toFloat: function() {
        return parseFloat(this)
    },
    toInt: function(e) {
        return parseInt(this, e || 10)
    }
}),
Number.alias("each", "times"),
function(e) {
    var t = {}; ["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "sin", "sqrt", "tan"].each(function(e) {
        Number[e] || (t[e] = function() {
            return Math[e].apply(null, [this].concat(Array.convert(arguments)))
        })
    }),
    Number.implement(t)
} (),
String.implement({
    contains: function(e, t) {
        return (t ? String(this).slice(t) : String(this)).indexOf(e) > -1
    },
    test: function(e, t) {
        return ("regexp" == typeOf(e) ? e: new RegExp("" + e, t)).test(this)
    },
    trim: function() {
        return String(this).replace(/^\s+|\s+$/g, "")
    },
    clean: function() {
        return String(this).replace(/\s+/g, " ").trim()
    },
    camelCase: function() {
        return String(this).replace(/-\D/g,
        function(e) {
            return e.charAt(1).toUpperCase()
        })
    },
    hyphenate: function() {
        return String(this).replace(/[A-Z]/g,
        function(e) {
            return "-" + e.charAt(0).toLowerCase()
        })
    },
    capitalize: function() {
        return String(this).replace(/\b[a-z]/g,
        function(e) {
            return e.toUpperCase()
        })
    },
    escapeRegExp: function() {
        return String(this).replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
    },
    toInt: function(e) {
        return parseInt(this, e || 10)
    },
    toFloat: function() {
        return parseFloat(this)
    },
    hexToRgb: function(e) {
        var t = String(this).match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
        return t ? t.slice(1).hexToRgb(e) : null
    },
    rgbToHex: function(e) {
        var t = String(this).match(/\d{1,3}/g);
        return t ? t.rgbToHex(e) : null
    },
    substitute: function(e, t) {
        return String(this).replace(t || /\\?\{([^{}]+)\}/g,
        function(t, n) {
            return "\\" == t.charAt(0) ? t.slice(1) : null != e[n] ? e[n] : ""
        })
    }
}),
String.prototype.contains = function(e, t) {
    return t ? (t + this + t).indexOf(t + e + t) > -1 : String(this).indexOf(e) > -1
},
function() {
    var e = this.document,
    t = e.window = this,
    n = function(e, t) {
        e = e.toLowerCase(),
        t = t ? t.toLowerCase() : "";
        var n = e.match(/(edge)[\s\/:]([\w\d\.]+)/);
        return n || (n = e.match(/(opera|ie|firefox|chrome|trident|crios|version)[\s\/:]([\w\d\.]+)?.*?(safari|(?:rv[\s\/:]|version[\s\/:])([\w\d\.]+)|$)/) || [null, "unknown", 0]),
        "trident" == n[1] ? (n[1] = "ie", n[4] && (n[2] = n[4])) : "crios" == n[1] && (n[1] = "chrome"),
        "win" == (t = e.match(/ip(?:ad|od|hone)/) ? "ios": (e.match(/(?:webos|android)/) || e.match(/mac|win|linux/) || ["other"])[0]) && (t = "windows"),
        {
            extend: Function.prototype.extend,
            name: "version" == n[1] ? n[3] : n[1],
            version: parseFloat("opera" == n[1] && n[4] ? n[4] : n[2]),
            platform: t
        }
    },
    i = this.Browser = n(navigator.userAgent, navigator.platform);
    "ie" == i.name && e.documentMode && (i.version = e.documentMode),
    i.extend({
        Features: {
            xpath: !!e.evaluate,
            air: !!t.runtime,
            query: !!e.querySelector,
            json: !!t.JSON
        },
        parseUA: n
    }),
    i[i.name] = !0,
    i[i.name + parseInt(i.version, 10)] = !0,
    "ie" == i.name && i.version >= "11" && delete i.ie;
    var r = i.platform;
    "windows" == r && (r = "win"),
    i.Platform = {
        name: r
    },
    i.Platform[r] = !0,
    i.Request = function() {
        var e = function() {
            return new XMLHttpRequest
        },
        t = function() {
            return new ActiveXObject("MSXML2.XMLHTTP")
        },
        n = function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        };
        return Function.attempt(function() {
            return e(),
            e
        },
        function() {
            return t(),
            t
        },
        function() {
            return n(),
            n
        })
    } (),
    i.Features.xhr = !!i.Request;
    var o = (Function.attempt(function() {
        return navigator.plugins["Shockwave Flash"].description
    },
    function() {
        return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
    }) || "0 r0").match(/\d+/g);
    if (i.Plugins = {
        Flash: {
            version: Number(o[0] || "0." + o[1]) || 0,
            build: Number(o[2]) || 0
        }
    },
    i.exec = function(n) {
        if (!n) return n;
        if (t.execScript) t.execScript(n);
        else {
            var i = e.createElement("script");
            i.setAttribute("type", "text/javascript"),
            i.text = n,
            e.head.appendChild(i),
            e.head.removeChild(i)
        }
        return n
    },
    String.implement("stripScripts",
    function(e) {
        var t = "",
        n = this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,
        function(e, n) {
            return t += n + "\n",
            ""
        });
        return ! 0 === e ? i.exec(t) : "function" == typeOf(e) && e(t, n),
        n
    }), i.extend({
        Document: this.Document,
        Window: this.Window,
        Element: this.Element,
        Event: this.Event
    }), this.Window = this.$constructor = new Type("Window",
    function() {}), this.$family = Function.convert("window").hide(), Window.mirror(function(e, n) {
        t[e] = n
    }), this.Document = e.$constructor = new Type("Document",
    function() {}), e.$family = Function.convert("document").hide(), Document.mirror(function(t, n) {
        e[t] = n
    }), e.html = e.documentElement, e.head || (e.head = e.getElementsByTagName("head")[0]), e.execCommand) try {
        e.execCommand("BackgroundImageCache", !1, !0)
    } catch(e) {}
    if (this.attachEvent && !this.addEventListener) {
        var s = function() {
            this.detachEvent("onunload", s),
            e.head = e.html = e.window = null,
            t = this.Window = e = null
        };
        this.attachEvent("onunload", s)
    }
    var a = Array.convert;
    try {
        a(e.html.childNodes)
    } catch(e) {
        Array.convert = function(e) {
            if ("string" != typeof e && Type.isEnumerable(e) && "array" != typeOf(e)) {
                for (var t = e.length,
                n = new Array(t); t--;) n[t] = e[t];
                return n
            }
            return a(e)
        };
        var l = Array.prototype,
        c = l.slice; ["pop", "push", "reverse", "shift", "sort", "splice", "unshift", "concat", "join", "slice"].each(function(e) {
            var t = l[e];
            Array[e] = function(e) {
                return t.apply(Array.convert(e), c.call(arguments, 1))
            }
        })
    }
    i.Platform.ios && (i.Platform.ipod = !0),
    i.Engine = {};
    var u = function(e, t) {
        i.Engine.name = e,
        i.Engine[e + t] = !0,
        i.Engine.version = t
    };
    if (i.ie) switch (i.Engine.trident = !0, i.version) {
    case 6:
        u("trident", 4);
        break;
    case 7:
        u("trident", 5);
        break;
    case 8:
        u("trident", 6)
    }
    if (i.firefox && (i.Engine.gecko = !0, i.version >= 3 ? u("gecko", 19) : u("gecko", 18)), i.safari || i.chrome) switch (i.Engine.webkit = !0, i.version) {
    case 2:
        u("webkit", 419);
        break;
    case 3:
        u("webkit", 420);
        break;
    case 4:
        u("webkit", 525)
    }
    if (i.opera && (i.Engine.presto = !0, i.version >= 9.6 ? u("presto", 960) : i.version >= 9.5 ? u("presto", 950) : u("presto", 925)), "unknown" == i.name) switch ((navigator.userAgent.toLowerCase().match(/(?:webkit|khtml|gecko)/) || [])[0]) {
    case "webkit":
    case "khtml":
        i.Engine.webkit = !0;
        break;
    case "gecko":
        i.Engine.gecko = !0
    }
    this.$exec = i.exec
} (),
function() {
    var e = this.Class = new Type("Class",
    function(i) {
        instanceOf(i, Function) && (i = {
            initialize: i
        });
        var r = function() {
            if (n(this), r.$prototyping) return this;
            this.$caller = null,
            this.$family = null;
            var e = this.initialize ? this.initialize.apply(this, arguments) : this;
            return this.$caller = this.caller = null,
            e
        }.extend(this).implement(i);
        return r.$constructor = e,
        r.prototype.$constructor = r,
        r.prototype.parent = t,
        r
    }),
    t = function() {
        if (!this.$caller) throw new Error('The method "parent" cannot be called.');
        var e = this.$caller.$name,
        t = this.$caller.$owner.parent,
        n = t ? t.prototype[e] : null;
        if (!n) throw new Error('The method "' + e + '" has no parent.');
        return n.apply(this, arguments)
    },
    n = function(e) {
        for (var t in e) {
            var i = e[t];
            switch (typeOf(i)) {
            case "object":
                var r = function() {};
                r.prototype = i,
                e[t] = n(new r);
                break;
            case "array":
                e[t] = i.clone()
            }
        }
        return e
    },
    i = function(t, n, i) {
        if (e.Mutators.hasOwnProperty(t) && null == (n = e.Mutators[t].call(this, n))) return this;
        if ("function" == typeOf(n)) {
            if (n.$hidden) return this;
            this.prototype[t] = i ? n: function(e, t, n) {
                n.$origin && (n = n.$origin);
                var i = function() {
                    if (n.$protected && null == this.$caller) throw new Error('The method "' + t + '" cannot be called.');
                    var e = this.caller,
                    r = this.$caller;
                    this.caller = r,
                    this.$caller = i;
                    var o = n.apply(this, arguments);
                    return this.$caller = r,
                    this.caller = e,
                    o
                }.extend({
                    $owner: e,
                    $origin: n,
                    $name: t
                });
                return i
            } (this, t, n)
        } else Object.merge(this.prototype, t, n);
        return this
    };
    e.implement("implement", i.overloadSetter()),
    e.Mutators = {
        Extends: function(e) {
            this.parent = e,
            this.prototype = function(e) {
                e.$prototyping = !0;
                var t = new e;
                return delete e.$prototyping,
                t
            } (e)
        },
        Implements: function(e) {
            Array.convert(e).each(function(e) {
                var t = new e;
                for (var n in t) i.call(this, n, t[n], !0)
            },
            this)
        }
    }
} (),
function() {
    this.Chain = new Class({
        $chain: [],
        chain: function() {
            return this.$chain.append(Array.flatten(arguments)),
            this
        },
        callChain: function() {
            return !! this.$chain.length && this.$chain.shift().apply(this, arguments)
        },
        clearChain: function() {
            return this.$chain.empty(),
            this
        }
    });
    var e = function(e) {
        return e.replace(/^on([A-Z])/,
        function(e, t) {
            return t.toLowerCase()
        })
    };
    this.Events = new Class({
        $events: {},
        addEvent: function(t, n, i) {
            return t = e(t),
            n == $empty ? this: (this.$events[t] = (this.$events[t] || []).include(n), i && (n.internal = !0), this)
        },
        addEvents: function(e) {
            for (var t in e) this.addEvent(t, e[t]);
            return this
        },
        fireEvent: function(t, n, i) {
            t = e(t);
            var r = this.$events[t];
            return r ? (n = Array.convert(n), r.each(function(e) {
                i ? e.delay(i, this, n) : e.apply(this, n)
            },
            this), this) : this
        },
        removeEvent: function(t, n) {
            t = e(t);
            var i = this.$events[t];
            if (i && !n.internal) {
                var r = i.indexOf(n); - 1 != r && delete i[r]
            }
            return this
        },
        removeEvents: function(t) {
            var n;
            if ("object" == typeOf(t)) {
                for (n in t) this.removeEvent(n, t[n]);
                return this
            }
            t && (t = e(t));
            for (n in this.$events) if (!t || t == n) for (var i = this.$events[n], r = i.length; r--;) r in i && this.removeEvent(n, i[r]);
            return this
        }
    }),
    this.Options = new Class({
        setOptions: function() {
            var e = this.options = Object.merge.apply(null, [{},
            this.options].append(arguments));
            if (this.addEvent) for (var t in e)"function" == typeOf(e[t]) && /^on[A-Z]/.test(t) && (this.addEvent(t, e[t]), delete e[t]);
            return this
        }
    })
} (),
function() {
    function e(i, o) {
        if (i.$thenableState === r) if (i === o) n(i, new TypeError("Tried to resolve a thenable with itself."));
        else if (!o || "object" != typeof o && "function" != typeof o) t(i, o);
        else {
            var s;
            try {
                s = o.then
            } catch(e) {
                n(i, e)
            }
            if ("function" == typeof s) {
                var a = !1;
                l(function() {
                    try {
                        s.call(o,
                        function(t) {
                            a || (a = !0, e(i, t))
                        },
                        function(e) {
                            a || (a = !0, n(i, e))
                        })
                    } catch(e) {
                        a || (a = !0, n(i, e))
                    }
                })
            } else t(i, o)
        }
    }
    function t(e, t) {
        e.$thenableState === r && (e.$thenableResult = t, e.$thenableState = o, i(e))
    }
    function n(e, t) {
        e.$thenableState === r && (e.$thenableResult = t, e.$thenableState = s, i(e))
    }
    function i(t) {
        var i, r = t.$thenableState,
        a = t.$thenableResult,
        c = t.$thenableReactions;
        r === o ? (t.$thenableReactions = [], i = "fulfillHandler") : r == s && (t.$thenableReactions = [], i = "rejectHandler"),
        i && l(function(t, i, r) {
            for (var o = 0,
            s = i.length; o < s; ++o) {
                var a = i[o],
                l = a[r];
                if ("Identity" === l) e(a.thenable, t);
                else if ("Thrower" === l) n(a.thenable, t);
                else try {
                    e(a.thenable, l(t))
                } catch(e) {
                    n(a.thenable, e)
                }
            }
        }.pass([a, c, i]))
    }
    var r = 0,
    o = 1,
    s = 2,
    a = Class.Thenable = new Class({
        $thenableState: r,
        $thenableResult: null,
        $thenableReactions: [],
        resolve: function(t) {
            return e(this, t),
            this
        },
        reject: function(e) {
            return n(this, e),
            this
        },
        getThenableState: function() {
            switch (this.$thenableState) {
            case r:
                return "pending";
            case o:
                return "fulfilled";
            case s:
                return "rejected"
            }
        },
        resetThenable: function(e) {
            return n(this, e),
            function(e) {
                e.$thenableState !== r && (e.$thenableResult = null, e.$thenableState = r)
            } (this),
            this
        },
        then: function(e, t) {
            "function" != typeof e && (e = "Identity"),
            "function" != typeof t && (t = "Thrower");
            var n = new a;
            return this.$thenableReactions.push({
                thenable: n,
                fulfillHandler: e,
                rejectHandler: t
            }),
            this.$thenableState !== r && i(this),
            n
        },
        catch: function(e) {
            return this.then(null, e)
        }
    });
    a.extend({
        resolve: function(t) {
            var n;
            return t instanceof a ? n = t: e(n = new a, t),
            n
        },
        reject: function(e) {
            var t = new a;
            return n(t, e),
            t
        }
    });
    var l;
    l = "undefined" != typeof process && "function" == typeof process.nextTick ? process.nextTick: "undefined" != typeof setImmediate ? setImmediate: function(e) {
        setTimeout(e, 0)
    }
} (),
Object.extend({
    subset: function(e, t) {
        for (var n = {},
        i = 0,
        r = t.length; i < r; i++) {
            var o = t[i];
            o in e && (n[o] = e[o])
        }
        return n
    },
    map: function(e, t, n) {
        for (var i = {},
        r = Object.keys(e), o = 0; o < r.length; o++) {
            var s = r[o];
            i[s] = t.call(n, e[s], s, e)
        }
        return i
    },
    filter: function(e, t, n) {
        for (var i = {},
        r = Object.keys(e), o = 0; o < r.length; o++) {
            var s = r[o],
            a = e[s];
            t.call(n, a, s, e) && (i[s] = a)
        }
        return i
    },
    every: function(e, t, n) {
        for (var i = Object.keys(e), r = 0; r < i.length; r++) {
            var o = i[r];
            if (!t.call(n, e[o], o)) return ! 1
        }
        return ! 0
    },
    some: function(e, t, n) {
        for (var i = Object.keys(e), r = 0; r < i.length; r++) {
            var o = i[r];
            if (t.call(n, e[o], o)) return ! 0
        }
        return ! 1
    },
    values: function(e) {
        for (var t = [], n = Object.keys(e), i = 0; i < n.length; i++) {
            var r = n[i];
            t.push(e[r])
        }
        return t
    },
    getLength: function(e) {
        return Object.keys(e).length
    },
    keyOf: function(e, t) {
        for (var n = Object.keys(e), i = 0; i < n.length; i++) {
            var r = n[i];
            if (e[r] === t) return r
        }
        return null
    },
    contains: function(e, t) {
        return null != Object.keyOf(e, t)
    },
    toQueryString: function(e, t) {
        var n = [];
        return Object.each(e,
        function(e, i) {
            t && (i = t + "[" + i + "]");
            var r;
            switch (typeOf(e)) {
            case "object":
                r = Object.toQueryString(e, i);
                break;
            case "array":
                var o = {};
                e.each(function(e, t) {
                    o[t] = e
                }),
                r = Object.toQueryString(o, i);
                break;
            default:
                r = i + "=" + encodeURIComponent(e)
            }
            null != e && n.push(r)
        }),
        n.join("&")
    }
}),
Hash.implement({
    has: Object.prototype.hasOwnProperty,
    keyOf: function(e) {
        return Object.keyOf(this, e)
    },
    hasValue: function(e) {
        return Object.contains(this, e)
    },
    extend: function(e) {
        return Hash.each(e || {},
        function(e, t) {
            Hash.set(this, t, e)
        },
        this),
        this
    },
    combine: function(e) {
        return Hash.each(e || {},
        function(e, t) {
            Hash.include(this, t, e)
        },
        this),
        this
    },
    erase: function(e) {
        return this.hasOwnProperty(e) && delete this[e],
        this
    },
    get: function(e) {
        return this.hasOwnProperty(e) ? this[e] : null
    },
    set: function(e, t) {
        return this[e] && !this.hasOwnProperty(e) || (this[e] = t),
        this
    },
    empty: function() {
        return Hash.each(this,
        function(e, t) {
            delete this[t]
        },
        this),
        this
    },
    include: function(e, t) {
        return null == this[e] && (this[e] = t),
        this
    },
    map: function(e, t) {
        return new Hash(Object.map(this, e, t))
    },
    filter: function(e, t) {
        return new Hash(Object.filter(this, e, t))
    },
    every: function(e, t) {
        return Object.every(this, e, t)
    },
    some: function(e, t) {
        return Object.some(this, e, t)
    },
    getKeys: function() {
        return Object.keys(this)
    },
    getValues: function() {
        return Object.values(this)
    },
    toQueryString: function(e) {
        return Object.toQueryString(this, e)
    }
}),
Hash.extend = Object.append,
Hash.alias({
    indexOf: "keyOf",
    contains: "hasValue"
}),
function() {
    function e(e, o, s, l, u, h, f, d, y, m, g, v, b, x, w, _) {
        if ((o || -1 === n) && (t.expressions[++n] = [], i = -1, o)) return "";
        if (s || l || -1 === i) {
            s = s || " ";
            var k = t.expressions[n];
            r && k[i] && (k[i].reverseCombinator = c(s)),
            k[++i] = {
                combinator: s,
                tag: "*"
            }
        }
        var S = t.expressions[n][i];
        if (u) S.tag = u.replace(a, "");
        else if (h) S.id = h.replace(a, "");
        else if (f) f = f.replace(a, ""),
        S.classList || (S.classList = []),
        S.classes || (S.classes = []),
        S.classList.push(f),
        S.classes.push({
            value: f,
            regexp: new RegExp("(^|\\s)" + p(f) + "(\\s|$)")
        });
        else if (b) _ = (_ = _ || w) ? _.replace(a, "") : null,
        S.pseudos || (S.pseudos = []),
        S.pseudos.push({
            key: b.replace(a, ""),
            value: _,
            type: 1 == v.length ? "class": "element"
        });
        else if (d) {
            d = d.replace(a, ""),
            g = (g || "").replace(a, "");
            var C, T;
            switch (y) {
            case "^=":
                T = new RegExp("^" + p(g));
                break;
            case "$=":
                T = new RegExp(p(g) + "$");
                break;
            case "~=":
                T = new RegExp("(^|\\s)" + p(g) + "(\\s|$)");
                break;
            case "|=":
                T = new RegExp("^" + p(g) + "(-|$)");
                break;
            case "=":
                C = function(e) {
                    return g == e
                };
                break;
            case "*=":
                C = function(e) {
                    return e && e.indexOf(g) > -1
                };
                break;
            case "!=":
                C = function(e) {
                    return g != e
                };
                break;
            default:
                C = function(e) {
                    return !! e
                }
            }
            "" == g && /^[*$^]=$/.test(y) && (C = function() {
                return ! 1
            }),
            C || (C = function(e) {
                return e && T.test(e)
            }),
            S.attributes || (S.attributes = []),
            S.attributes.push({
                key: d,
                operator: y,
                value: g,
                test: C
            })
        }
        return ""
    }
    var t, n, i, r, o = {},
    s = {},
    a = /\\/g,
    l = function(i, a) {
        if (null == i) return null;
        if (!0 === i.Slick) return i;
        i = ("" + i).replace(/^\s+|\s+$/g, "");
        var c = (r = !!a) ? s: o;
        if (c[i]) return c[i];
        for (t = {
            Slick: !0,
            expressions: [],
            raw: i,
            reverse: function() {
                return l(this.raw, !0)
            }
        },
        n = -1; i != (i = i.replace(h, e)););
        return t.length = t.expressions.length,
        c[t.raw] = r ? u(t) : t
    },
    c = function(e) {
        return "!" === e ? " ": " " === e ? "!": /^!/.test(e) ? e.replace(/^!/, "") : "!" + e
    },
    u = function(e) {
        for (var t = e.expressions,
        n = 0; n < t.length; n++) {
            for (var i = t[n], r = {
                parts: [],
                tag: "*",
                combinator: c(i[0].combinator)
            },
            o = 0; o < i.length; o++) {
                var s = i[o];
                s.reverseCombinator || (s.reverseCombinator = " "),
                s.combinator = s.reverseCombinator,
                delete s.reverseCombinator
            }
            i.reverse().push(r)
        }
        return e
    },
    p = function(e) {
        return e.replace(/[-[\]{}()*+?.\\^$|,#\s]/g,
        function(e) {
            return "\\" + e
        })
    },
    h = new RegExp("^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:([\"'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)".replace(/<combinator>/, "[" + p(">+~`!@$%^&={}\\;</") + "]").replace(/<unicode>/g, "(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])").replace(/<unicode1>/g, "(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")),
    f = this.Slick || {};
    f.parse = function(e) {
        return l(e)
    },
    f.escapeRegExp = p,
    this.Slick || (this.Slick = f)
}.apply("undefined" != typeof exports ? exports: this),
function() {
    var e = {},
    t = {},
    n = Object.prototype.toString;
    e.isNativeCode = function(e) {
        return /\{\s*\[native code\]\s*\}/.test("" + e)
    },
    e.isXML = function(e) {
        return !! e.xmlVersion || !!e.xml || "[object XMLDocument]" == n.call(e) || 9 == e.nodeType && "HTML" != e.documentElement.nodeName
    },
    e.setDocument = function(e) {
        var n = e.nodeType;
        if (9 == n);
        else if (n) e = e.ownerDocument;
        else {
            if (!e.navigator) return;
            e = e.document
        }
        if (this.document !== e) {
            this.document = e;
            var i, r = e.documentElement,
            o = this.getUIDXML(r),
            s = t[o];
            if (s) for (i in s) this[i] = s[i];
            else { (s = t[o] = {}).root = r,
                s.isXMLDocument = this.isXML(e),
                s.brokenStarGEBTN = s.starSelectsClosedQSA = s.idGetsName = s.brokenMixedCaseQSA = s.brokenGEBCN = s.brokenCheckedQSA = s.brokenEmptyAttributeQSA = s.isHTMLDocument = s.nativeMatchesSelector = !1;
                var a, l, c, u, p, h, f = "slick_uniqueid",
                d = e.createElement("div"),
                y = e.body || e.getElementsByTagName("body")[0] || r;
                y.appendChild(d);
                try {
                    d.innerHTML = '<a id="' + f + '"></a>',
                    s.isHTMLDocument = !!e.getElementById(f)
                } catch(e) {}
                if (s.isHTMLDocument) {
                    d.style.display = "none",
                    d.appendChild(e.createComment("")),
                    l = d.getElementsByTagName("*").length > 1;
                    try {
                        d.innerHTML = "foo</foo>",
                        a = (h = d.getElementsByTagName("*")) && !!h.length && "/" == h[0].nodeName.charAt(0)
                    } catch(e) {}
                    s.brokenStarGEBTN = l || a;
                    try {
                        d.innerHTML = '<a name="' + f + '"></a><b id="' + f + '"></b>',
                        s.idGetsName = e.getElementById(f) === d.firstChild
                    } catch(e) {}
                    if (d.getElementsByClassName) {
                        try {
                            d.innerHTML = '<a class="f"></a><a class="b"></a>',
                            d.getElementsByClassName("b").length,
                            d.firstChild.className = "b",
                            u = 2 != d.getElementsByClassName("b").length
                        } catch(e) {}
                        try {
                            d.innerHTML = '<a class="a"></a><a class="f b a"></a>',
                            c = 2 != d.getElementsByClassName("a").length
                        } catch(e) {}
                        s.brokenGEBCN = u || c
                    }
                    if (d.querySelectorAll) {
                        try {
                            d.innerHTML = "foo</foo>",
                            h = d.querySelectorAll("*"),
                            s.starSelectsClosedQSA = h && !!h.length && "/" == h[0].nodeName.charAt(0)
                        } catch(e) {}
                        try {
                            d.innerHTML = '<a class="MiX"></a>',
                            s.brokenMixedCaseQSA = !d.querySelectorAll(".MiX").length
                        } catch(e) {}
                        try {
                            d.innerHTML = '<select><option selected="selected">a</option></select>',
                            s.brokenCheckedQSA = 0 == d.querySelectorAll(":checked").length
                        } catch(e) {}
                        try {
                            d.innerHTML = '<a class=""></a>',
                            s.brokenEmptyAttributeQSA = 0 != d.querySelectorAll('[class*=""]').length
                        } catch(e) {}
                    }
                    try {
                        d.innerHTML = '<form action="s"><input id="action"/></form>',
                        p = "s" != d.firstChild.getAttribute("action")
                    } catch(e) {}
                    if (s.nativeMatchesSelector = r.matches || r.mozMatchesSelector || r.webkitMatchesSelector, s.nativeMatchesSelector) try {
                        s.nativeMatchesSelector.call(r, ":slick"),
                        s.nativeMatchesSelector = null
                    } catch(e) {}
                }
                try {
                    r.slick_expando = 1,
                    delete r.slick_expando,
                    s.getUID = this.getUIDHTML
                } catch(e) {
                    s.getUID = this.getUIDXML
                }
                y.removeChild(d),
                d = h = y = null,
                s.getAttribute = s.isHTMLDocument && p ?
                function(e, t) {
                    var n = this.attributeGetters[t];
                    if (n) return n.call(e);
                    var i = e.getAttributeNode(t);
                    return i ? i.nodeValue: null
                }: function(e, t) {
                    var n = this.attributeGetters[t];
                    return n ? n.call(e) : e.getAttribute(t)
                },
                s.hasAttribute = r && this.isNativeCode(r.hasAttribute) ?
                function(e, t) {
                    return e.hasAttribute(t)
                }: function(e, t) {
                    return ! (! (e = e.getAttributeNode(t)) || !e.specified && !e.nodeValue)
                };
                var m = r && this.isNativeCode(r.contains),
                g = e && this.isNativeCode(e.contains);
                s.contains = m && g ?
                function(e, t) {
                    return e.contains(t)
                }: m && !g ?
                function(t, n) {
                    return t === n || (t === e ? e.documentElement: t).contains(n)
                }: r && r.compareDocumentPosition ?
                function(e, t) {
                    return e === t || !!(16 & e.compareDocumentPosition(t))
                }: function(e, t) {
                    if (t) do {
                        if (t === e) return ! 0
                    } while ( t = t . parentNode );
                    return ! 1
                },
                s.documentSorter = r.compareDocumentPosition ?
                function(e, t) {
                    return e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) ? -1 : e === t ? 0 : 1 : 0
                }: "sourceIndex" in r ?
                function(e, t) {
                    return e.sourceIndex && t.sourceIndex ? e.sourceIndex - t.sourceIndex: 0
                }: e.createRange ?
                function(e, t) {
                    if (!e.ownerDocument || !t.ownerDocument) return 0;
                    var n = e.ownerDocument.createRange(),
                    i = t.ownerDocument.createRange();
                    return n.setStart(e, 0),
                    n.setEnd(e, 0),
                    i.setStart(t, 0),
                    i.setEnd(t, 0),
                    n.compareBoundaryPoints(Range.START_TO_END, i)
                }: null,
                r = null;
                for (i in s) this[i] = s[i]
            }
        }
    };
    var i = /^([#.]?)((?:[\w-]+|\*))$/,
    r = /\[.+[*$^]=(?:""|'')?\]/,
    o = {};
    e.search = function(e, t, n, s) {
        var a = this.found = s ? null: n || [];
        if (!e) return a;
        if (e.navigator) e = e.document;
        else if (!e.nodeType) return a;
        var l, c, u, h, f = this.uniques = {},
        d = !(!n || !n.length),
        y = 9 == e.nodeType;
        if (this.document !== (y ? e: e.ownerDocument) && this.setDocument(e), d) for (c = a.length; c--;) f[this.getUID(a[c])] = !0;
        if ("string" == typeof t) {
            var m = t.match(i);
            e: if (m) {
                var g = m[1],
                v = m[2];
                if (g) {
                    if ("#" == g) {
                        if (!this.isHTMLDocument || !y) break e;
                        if (! (u = e.getElementById(v))) return a;
                        if (this.idGetsName && u.getAttributeNode("id").nodeValue != v) break e;
                        if (s) return u || null;
                        d && f[this.getUID(u)] || a.push(u)
                    } else if ("." == g) {
                        if (!this.isHTMLDocument || (!e.getElementsByClassName || this.brokenGEBCN) && e.querySelectorAll) break e;
                        if (e.getElementsByClassName && !this.brokenGEBCN) {
                            if (h = e.getElementsByClassName(v), s) return h[0] || null;
                            for (c = 0; u = h[c++];) d && f[this.getUID(u)] || a.push(u)
                        } else {
                            var b = new RegExp("(^|\\s)" + p.escapeRegExp(v) + "(\\s|$)");
                            for (h = e.getElementsByTagName("*"), c = 0; u = h[c++];) if (className = u.className, className && b.test(className)) {
                                if (s) return u;
                                d && f[this.getUID(u)] || a.push(u)
                            }
                        }
                    }
                } else {
                    if ("*" == v && this.brokenStarGEBTN) break e;
                    if (h = e.getElementsByTagName(v), s) return h[0] || null;
                    for (c = 0; u = h[c++];) d && f[this.getUID(u)] || a.push(u)
                }
                return d && this.sort(a),
                s ? null: a
            }
            e: if (e.querySelectorAll) {
                if (!this.isHTMLDocument || o[t] || this.brokenMixedCaseQSA || this.brokenCheckedQSA && t.indexOf(":checked") > -1 || this.brokenEmptyAttributeQSA && r.test(t) || !y && t.indexOf(",") > -1 || p.disableQSA) break e;
                var x, w = t,
                _ = e;
                y || (x = _.getAttribute("id"), slickid = "slickid__", _.setAttribute("id", slickid), w = "#" + slickid + " " + w, e = _.parentNode);
                try {
                    if (s) return e.querySelector(w) || null;
                    h = e.querySelectorAll(w)
                } catch(e) {
                    o[t] = 1;
                    break e
                } finally {
                    y || (x ? _.setAttribute("id", x) : _.removeAttribute("id"), e = _)
                }
                if (this.starSelectsClosedQSA) for (c = 0; u = h[c++];) ! (u.nodeName > "@") || d && f[this.getUID(u)] || a.push(u);
                else for (c = 0; u = h[c++];) d && f[this.getUID(u)] || a.push(u);
                return d && this.sort(a),
                a
            }
            if (! (l = this.Slick.parse(t)).length) return a
        } else {
            if (null == t) return a;
            if (!t.Slick) return this.contains(e.documentElement || e, t) ? (a ? a.push(t) : a = t, a) : a;
            l = t
        }
        this.posNTH = {},
        this.posNTHLast = {},
        this.posNTHType = {},
        this.posNTHTypeLast = {},
        this.push = !d && (s || 1 == l.length && 1 == l.expressions[0].length) ? this.pushArray: this.pushUID,
        null == a && (a = []);
        var k, S, C, T, E, M, A, O, L, P, R, I, j, N, D = l.expressions;
        e: for (c = 0; I = D[c]; c++) for (k = 0; j = I[k]; k++) {
            if (T = "combinator:" + j.combinator, !this[T]) continue e;
            if (E = this.isXMLDocument ? j.tag: j.tag.toUpperCase(), M = j.id, A = j.classList, O = j.classes, L = j.attributes, P = j.pseudos, N = k === I.length - 1, this.bitUniques = {},
            N ? (this.uniques = f, this.found = a) : (this.uniques = {},
            this.found = []), 0 === k) {
                if (this[T](e, E, M, O, L, P, A), s && N && a.length) break e
            } else if (s && N) {
                for (S = 0, C = R.length; S < C; S++) if (this[T](R[S], E, M, O, L, P, A), a.length) break e
            } else for (S = 0, C = R.length; S < C; S++) this[T](R[S], E, M, O, L, P, A);
            R = this.found
        }
        return (d || l.expressions.length > 1) && this.sort(a),
        s ? a[0] || null: a
    },
    e.uidx = 1,
    e.uidk = "slick-uniqueid",
    e.getUIDXML = function(e) {
        var t = e.getAttribute(this.uidk);
        return t || (t = this.uidx++, e.setAttribute(this.uidk, t)),
        t
    },
    e.getUIDHTML = function(e) {
        return e.uniqueNumber || (e.uniqueNumber = this.uidx++)
    },
    e.sort = function(e) {
        return this.documentSorter ? (e.sort(this.documentSorter), e) : e
    },
    e.cacheNTH = {},
    e.matchNTH = /^([+-]?\d*)?([a-z]+)?([+-]\d+)?$/,
    e.parseNTHArgument = function(e) {
        var t = e.match(this.matchNTH);
        if (!t) return ! 1;
        var n = t[2] || !1,
        i = t[1] || 1;
        "-" == i && (i = -1);
        var r = +t[3] || 0;
        return t = "n" == n ? {
            a: i,
            b: r
        }: "odd" == n ? {
            a: 2,
            b: 1
        }: "even" == n ? {
            a: 2,
            b: 0
        }: {
            a: 0,
            b: i
        },
        this.cacheNTH[e] = t
    },
    e.createNTHPseudo = function(e, t, n, i) {
        return function(r, o) {
            var s = this.getUID(r);
            if (!this[n][s]) {
                var a = r.parentNode;
                if (!a) return ! 1;
                var l = a[e],
                c = 1;
                if (i) {
                    var u = r.nodeName;
                    do {
                        l.nodeName == u && (this[n][this.getUID(l)] = c++)
                    } while ( l = l [ t ])
                } else do {
                    1 == l.nodeType && (this[n][this.getUID(l)] = c++)
                } while ( l = l [ t ])
            }
            o = o || "n";
            var p = this.cacheNTH[o] || this.parseNTHArgument(o);
            if (!p) return ! 1;
            var h = p.a,
            f = p.b,
            d = this[n][s];
            if (0 == h) return f == d;
            if (h > 0) {
                if (d < f) return ! 1
            } else if (f < d) return ! 1;
            return (d - f) % h == 0
        }
    },
    e.pushArray = function(e, t, n, i, r, o) {
        this.matchSelector(e, t, n, i, r, o) && this.found.push(e)
    },
    e.pushUID = function(e, t, n, i, r, o) {
        var s = this.getUID(e); ! this.uniques[s] && this.matchSelector(e, t, n, i, r, o) && (this.uniques[s] = !0, this.found.push(e))
    },
    e.matchNode = function(e, t) {
        if (this.isHTMLDocument && this.nativeMatchesSelector) try {
            return this.nativeMatchesSelector.call(e, t.replace(/\[([^=]+)=\s*([^'"\]]+?)\s*\]/g, '[$1="$2"]'))
        } catch(e) {}
        var n = this.Slick.parse(t);
        if (!n) return ! 0;
        var i, r, o = n.expressions,
        s = 0;
        for (i = 0; r = o[i]; i++) if (1 == r.length) {
            var a = r[0];
            if (this.matchSelector(e, this.isXMLDocument ? a.tag: a.tag.toUpperCase(), a.id, a.classes, a.attributes, a.pseudos)) return ! 0;
            s++
        }
        if (s == n.length) return ! 1;
        var l, c = this.search(this.document, n);
        for (i = 0; l = c[i++];) if (l === e) return ! 0;
        return ! 1
    },
    e.matchPseudo = function(e, t, n) {
        var i = "pseudo:" + t;
        if (this[i]) return this[i](e, n);
        var r = this.getAttribute(e, t);
        return n ? n == r: !!r
    },
    e.matchSelector = function(e, t, n, i, r, o) {
        if (t) {
            var s = this.isXMLDocument ? e.nodeName: e.nodeName.toUpperCase();
            if ("*" == t) {
                if (s < "@") return ! 1
            } else if (s != t) return ! 1
        }
        if (n && e.getAttribute("id") != n) return ! 1;
        var a, l, c;
        if (i) for (a = i.length; a--;) if (! (c = this.getAttribute(e, "class")) || !i[a].regexp.test(c)) return ! 1;
        if (r) for (a = r.length; a--;) if ((l = r[a]).operator ? !l.test(this.getAttribute(e, l.key)) : !this.hasAttribute(e, l.key)) return ! 1;
        if (o) for (a = o.length; a--;) if (l = o[a], !this.matchPseudo(e, l.key, l.value)) return ! 1;
        return ! 0
    };
    var s = {
        " ": function(e, t, n, i, r, o, s) {
            var a, l, c;
            if (this.isHTMLDocument) {
                e: if (n) {
                    if (! (l = this.document.getElementById(n)) && e.all || this.idGetsName && l && l.getAttributeNode("id").nodeValue != n) {
                        if (! (c = e.all[n])) return;
                        for (c[0] || (c = [c]), a = 0; l = c[a++];) {
                            var u = l.getAttributeNode("id");
                            if (u && u.nodeValue == n) {
                                this.push(l, t, null, i, r, o);
                                break
                            }
                        }
                        return
                    }
                    if (!l) {
                        if (this.contains(this.root, e)) return;
                        break e
                    }
                    if (this.document !== e && !this.contains(e, l)) return;
                    return void this.push(l, t, null, i, r, o)
                }
                e: if (i && e.getElementsByClassName && !this.brokenGEBCN) {
                    if (! (c = e.getElementsByClassName(s.join(" "))) || !c.length) break e;
                    for (a = 0; l = c[a++];) this.push(l, t, n, null, r, o);
                    return
                }
            }
            if ((c = e.getElementsByTagName(t)) && c.length) for (this.brokenStarGEBTN || (t = null), a = 0; l = c[a++];) this.push(l, t, n, i, r, o)
        },
        ">": function(e, t, n, i, r, o) {
            if (e = e.firstChild) do {
                1 == e.nodeType && this.push(e, t, n, i, r, o)
            } while ( e = e . nextSibling )
        },
        "+": function(e, t, n, i, r, o) {
            for (; e = e.nextSibling;) if (1 == e.nodeType) {
                this.push(e, t, n, i, r, o);
                break
            }
        },
        "^": function(e, t, n, i, r, o) { (e = e.firstChild) && (1 == e.nodeType ? this.push(e, t, n, i, r, o) : this["combinator:+"](e, t, n, i, r, o))
        },
        "~": function(e, t, n, i, r, o) {
            for (; e = e.nextSibling;) if (1 == e.nodeType) {
                var s = this.getUID(e);
                if (this.bitUniques[s]) break;
                this.bitUniques[s] = !0,
                this.push(e, t, n, i, r, o)
            }
        },
        "++": function(e, t, n, i, r, o) {
            this["combinator:+"](e, t, n, i, r, o),
            this["combinator:!+"](e, t, n, i, r, o)
        },
        "~~": function(e, t, n, i, r, o) {
            this["combinator:~"](e, t, n, i, r, o),
            this["combinator:!~"](e, t, n, i, r, o)
        },
        "!": function(e, t, n, i, r, o) {
            for (; e = e.parentNode;) e !== this.document && this.push(e, t, n, i, r, o)
        },
        "!>": function(e, t, n, i, r, o) { (e = e.parentNode) !== this.document && this.push(e, t, n, i, r, o)
        },
        "!+": function(e, t, n, i, r, o) {
            for (; e = e.previousSibling;) if (1 == e.nodeType) {
                this.push(e, t, n, i, r, o);
                break
            }
        },
        "!^": function(e, t, n, i, r, o) { (e = e.lastChild) && (1 == e.nodeType ? this.push(e, t, n, i, r, o) : this["combinator:!+"](e, t, n, i, r, o))
        },
        "!~": function(e, t, n, i, r, o) {
            for (; e = e.previousSibling;) if (1 == e.nodeType) {
                var s = this.getUID(e);
                if (this.bitUniques[s]) break;
                this.bitUniques[s] = !0,
                this.push(e, t, n, i, r, o)
            }
        }
    };
    for (var a in s) e["combinator:" + a] = s[a];
    var l = {
        empty: function(e) {
            var t = e.firstChild;
            return ! (t && 1 == t.nodeType || (e.innerText || e.textContent || "").length)
        },
        not: function(e, t) {
            return ! this.matchNode(e, t)
        },
        contains: function(e, t) {
            return (e.innerText || e.textContent || "").indexOf(t) > -1
        },
        "first-child": function(e) {
            for (; e = e.previousSibling;) if (1 == e.nodeType) return ! 1;
            return ! 0
        },
        "last-child": function(e) {
            for (; e = e.nextSibling;) if (1 == e.nodeType) return ! 1;
            return ! 0
        },
        "only-child": function(e) {
            for (var t = e; t = t.previousSibling;) if (1 == t.nodeType) return ! 1;
            for (var n = e; n = n.nextSibling;) if (1 == n.nodeType) return ! 1;
            return ! 0
        },
        "nth-child": e.createNTHPseudo("firstChild", "nextSibling", "posNTH"),
        "nth-last-child": e.createNTHPseudo("lastChild", "previousSibling", "posNTHLast"),
        "nth-of-type": e.createNTHPseudo("firstChild", "nextSibling", "posNTHType", !0),
        "nth-last-of-type": e.createNTHPseudo("lastChild", "previousSibling", "posNTHTypeLast", !0),
        index: function(e, t) {
            return this["pseudo:nth-child"](e, "" + (t + 1))
        },
        even: function(e) {
            return this["pseudo:nth-child"](e, "2n")
        },
        odd: function(e) {
            return this["pseudo:nth-child"](e, "2n+1")
        },
        "first-of-type": function(e) {
            for (var t = e.nodeName; e = e.previousSibling;) if (e.nodeName == t) return ! 1;
            return ! 0
        },
        "last-of-type": function(e) {
            for (var t = e.nodeName; e = e.nextSibling;) if (e.nodeName == t) return ! 1;
            return ! 0
        },
        "only-of-type": function(e) {
            for (var t = e,
            n = e.nodeName; t = t.previousSibling;) if (t.nodeName == n) return ! 1;
            for (var i = e; i = i.nextSibling;) if (i.nodeName == n) return ! 1;
            return ! 0
        },
        enabled: function(e) {
            return ! e.disabled
        },
        disabled: function(e) {
            return e.disabled
        },
        checked: function(e) {
            return e.checked || e.selected
        },
        focus: function(e) {
            return this.isHTMLDocument && this.document.activeElement === e && (e.href || e.type || this.hasAttribute(e, "tabindex"))
        },
        root: function(e) {
            return e === this.root
        },
        selected: function(e) {
            return e.selected
        }
    };
    for (var c in l) e["pseudo:" + c] = l[c];
    var u = e.attributeGetters = {
        for: function() {
            return "htmlFor" in this ? this.htmlFor: this.getAttribute("for")
        },
        href: function() {
            return "href" in this ? this.getAttribute("href", 2) : this.getAttribute("href")
        },
        style: function() {
            return this.style ? this.style.cssText: this.getAttribute("style")
        },
        tabindex: function() {
            var e = this.getAttributeNode("tabindex");
            return e && e.specified ? e.nodeValue: null
        },
        type: function() {
            return this.getAttribute("type")
        },
        maxlength: function() {
            var e = this.getAttributeNode("maxLength");
            return e && e.specified ? e.nodeValue: null
        }
    };
    u.MAXLENGTH = u.maxLength = u.maxlength;
    var p = e.Slick = this.Slick || {};
    p.version = "1.1.7",
    p.search = function(t, n, i) {
        return e.search(t, n, i)
    },
    p.find = function(t, n) {
        return e.search(t, n, null, !0)
    },
    p.contains = function(t, n) {
        return e.setDocument(t),
        e.contains(t, n)
    },
    p.getAttribute = function(t, n) {
        return e.setDocument(t),
        e.getAttribute(t, n)
    },
    p.hasAttribute = function(t, n) {
        return e.setDocument(t),
        e.hasAttribute(t, n)
    },
    p.match = function(t, n) {
        return ! (!t || !n) && (!n || n === t || (e.setDocument(t), e.matchNode(t, n)))
    },
    p.defineAttributeGetter = function(t, n) {
        return e.attributeGetters[t] = n,
        this
    },
    p.lookupAttributeGetter = function(t) {
        return e.attributeGetters[t]
    },
    p.definePseudo = function(t, n) {
        return e["pseudo:" + t] = function(e, t) {
            return n.call(e, t)
        },
        this
    },
    p.lookupPseudo = function(t) {
        var n = e["pseudo:" + t];
        return n ?
        function(e) {
            return n.call(this, e)
        }: null
    },
    p.override = function(t, n) {
        return e.override(t, n),
        this
    },
    p.isXML = e.isXML,
    p.uidOf = function(t) {
        return e.getUIDHTML(t)
    },
    this.Slick || (this.Slick = p)
}.apply("undefined" != typeof exports ? exports: this);
var Element = this.Element = function(e, t) {
    var n = Element.Constructors[e];
    if (n) return n(t);
    if ("string" != typeof e) return document.id(e).set(t);
    if (t || (t = {}), !/^[\w-]+$/.test(e)) {
        var i = Slick.parse(e).expressions[0][0];
        e = "*" == i.tag ? "div": i.tag,
        i.id && null == t.id && (t.id = i.id);
        var r = i.attributes;
        if (r) for (var o, s = 0,
        a = r.length; s < a; s++) null == t[(o = r[s]).key] && (null != o.value && "=" == o.operator ? t[o.key] = o.value: o.value || o.operator || (t[o.key] = !0));
        i.classList && null == t.class && (t.class = i.classList.join(" "))
    }
    return document.newElement(e, t)
};
Browser.Element && (Element.prototype = Browser.Element.prototype, Element.prototype._fireEvent = function(e) {
    return function(t, n) {
        return e.call(this, t, n)
    }
} (Element.prototype.fireEvent)),
new Type("Element", Element).mirror(function(e) {
    if (!Array.prototype[e]) {
        var t = {};
        t[e] = function() {
            for (var t = [], n = arguments, i = !0, r = 0, o = this.length; r < o; r++) {
                var s = this[r],
                a = t[r] = s[e].apply(s, n);
                i = i && "element" == typeOf(a)
            }
            return i ? new Elements(t) : t
        },
        Elements.implement(t)
    }
}),
Browser.Element || (Element.parent = Object, Element.Prototype = {
    $constructor: Element,
    $family: Function.convert("element").hide()
},
Element.mirror(function(e, t) {
    Element.Prototype[e] = t
})),
Element.Constructors = {},
Element.Constructors = new Hash;

Elements = this.Elements = function(e) {
    if (e && e.length) for (var t, n = {},
    i = 0; t = e[i++];) {
        var r = Slick.uidOf(t);
        n[r] || (n[r] = !0, this.push(t))
    }
};
Elements.prototype = {
    length: 0
},
Elements.parent = Array,
new Type("Elements", Elements).implement({
    filter: function(e, t) {
        return e ? new Elements(Array.filter(this, "string" == typeOf(e) ?
        function(t) {
            return t.match(e)
        }: e, t)) : this
    }.protect(),
    push: function() {
        for (var e = this.length,
        t = 0,
        n = arguments.length; t < n; t++) {
            var i = document.id(arguments[t]);
            i && (this[e++] = i)
        }
        return this.length = e
    }.protect(),
    unshift: function() {
        for (var e = [], t = 0, n = arguments.length; t < n; t++) {
            var i = document.id(arguments[t]);
            i && e.push(i)
        }
        return Array.prototype.unshift.apply(this, e)
    }.protect(),
    concat: function() {
        for (var e = new Elements(this), t = 0, n = arguments.length; t < n; t++) {
            var i = arguments[t];
            Type.isEnumerable(i) ? e.append(i) : e.push(i)
        }
        return e
    }.protect(),
    append: function(e) {
        for (var t = 0,
        n = e.length; t < n; t++) this.push(e[t]);
        return this
    }.protect(),
    empty: function() {
        for (; this.length;) delete this[--this.length];
        return this
    }.protect()
}),
Elements.alias("extend", "append"),
function() {
    var e = Array.prototype.splice,
    t = {
        0 : 0,
        1 : 1,
        length: 2
    };
    e.call(t, 1, 1),
    1 == t[1] && Elements.implement("splice",
    function() {
        for (var t = this.length,
        n = e.apply(this, arguments); t >= this.length;) delete this[t--];
        return n
    }.protect()),
    Array.forEachMethod(function(e, t) {
        Elements.implement(t, e)
    }),
    Array.mirror(Elements);
    var n;
    try {
        n = "x" == document.createElement("<input name=x>").name
    } catch(e) {}
    var i = function(e) {
        return ("" + e).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    },
    r = function() {
        var e = document.createElement("style"),
        t = !1;
        try {
            e.innerHTML = "#justTesing{margin: 0px;}",
            t = !!e.innerHTML
        } catch(e) {}
        return t
    } ();
    Document.implement({
        newElement: function(e, t) {
            if (t) {
                if (null != t.checked && (t.defaultChecked = t.checked), "checkbox" != t.type && "radio" != t.type || null != t.value || (t.value = "on"), !r && "style" == e) {
                    var o = document.createElement("style");
                    return o.setAttribute("type", "text/css"),
                    t.type && delete t.type,
                    this.id(o).set(t)
                }
                n && (e = "<" + e, t.name && (e += ' name="' + i(t.name) + '"'), t.type && (e += ' type="' + i(t.type) + '"'), e += ">", delete t.name, delete t.type)
            }
            return this.id(this.createElement(e)).set(t)
        }
    })
} (),
function() {
    Slick.uidOf(window),
    Slick.uidOf(document),
    Document.implement({
        newTextNode: function(e) {
            return this.createTextNode(e)
        },
        getDocument: function() {
            return this
        },
        getWindow: function() {
            return this.window
        },
        id: function() {
            var e = {
                string: function(t, n, i) {
                    return (t = Slick.find(i, "#" + t.replace(/(\W)/g, "\\$1"))) ? e.element(t, n) : null
                },
                element: function(e, t) {
                    if (Slick.uidOf(e), !t && !e.$family && !/^(?:object|embed)$/i.test(e.tagName)) {
                        var n = e.fireEvent;
                        e._fireEvent = function(e, t) {
                            return n(e, t)
                        },
                        Object.append(e, Element.Prototype)
                    }
                    return e
                },
                object: function(t, n, i) {
                    return t.toElement ? e.element(t.toElement(i), n) : null
                }
            };
            return e.textnode = e.whitespace = e.window = e.document = function(e) {
                return e
            },
            function(t, n, i) {
                if (t && t.$family && t.uniqueNumber) return t;
                var r = typeOf(t);
                return e[r] ? e[r](t, n, i || document) : null
            }
        } ()
    }),
    null == window.$ && Window.implement("$",
    function(e, t) {
        return document.id(e, t, this.document)
    }),
    Window.implement({
        getDocument: function() {
            return this.document
        },
        getWindow: function() {
            return this
        }
    }),
    [Document, Element].invoke("implement", {
        getElements: function(e) {
            return Slick.search(this, e, new Elements)
        },
        getElement: function(e) {
            return document.id(Slick.find(this, e))
        }
    });
    var e = {
        contains: function(e) {
            return Slick.contains(this, e)
        }
    };
    document.contains || Document.implement(e),
    document.createElement("div").contains || Element.implement(e),
    Element.implement("hasChild",
    function(e) {
        return this !== e && this.contains(e)
    }),
    function(e, t, n) {
        this.Selectors = {};
        var i = this.Selectors.Pseudo = new Hash,
        r = function() {
            for (var e in i) i.hasOwnProperty(e) && (Slick.definePseudo(e, i[e]), delete i[e])
        };
        Slick.search = function(t, n, i) {
            return r(),
            e.call(this, t, n, i)
        },
        Slick.find = function(e, n) {
            return r(),
            t.call(this, e, n)
        },
        Slick.match = function(e, t) {
            return r(),
            n.call(this, e, t)
        }
    } (Slick.search, Slick.find, Slick.match);
    var t = function(e, t) {
        if (!e) return t;
        for (var n = (e = Object.clone(Slick.parse(e))).expressions, i = n.length; i--;) n[i][0].combinator = t;
        return e
    };
    Object.forEach({
        getNext: "~",
        getPrevious: "!~",
        getParent: "!"
    },
    function(e, n) {
        Element.implement(n,
        function(n) {
            return this.getElement(t(n, e))
        })
    }),
    Object.forEach({
        getAllNext: "~",
        getAllPrevious: "!~",
        getSiblings: "~~",
        getChildren: ">",
        getParents: "!"
    },
    function(e, n) {
        Element.implement(n,
        function(n) {
            return this.getElements(t(n, e))
        })
    }),
    Element.implement({
        getFirst: function(e) {
            return document.id(Slick.search(this, t(e, ">"))[0])
        },
        getLast: function(e) {
            return document.id(Slick.search(this, t(e, ">")).getLast())
        },
        getWindow: function() {
            return this.ownerDocument.window
        },
        getDocument: function() {
            return this.ownerDocument
        },
        getElementById: function(e) {
            return document.id(Slick.find(this, "#" + ("" + e).replace(/(\W)/g, "\\$1")))
        },
        match: function(e) {
            return ! e || Slick.match(this, e)
        }
    }),
    null == window.$$ && Window.implement("$$",
    function(e) {
        var t = new Elements;
        if (1 == arguments.length && "string" == typeof e) return Slick.search(this.document, e, t);
        for (var n = Array.flatten(arguments), i = 0, r = n.length; i < r; i++) {
            var o = n[i];
            switch (typeOf(o)) {
            case "element":
                t.push(o);
                break;
            case "string":
                Slick.search(this.document, o, t)
            }
        }
        return t
    }),
    null == window.$$ && Window.implement("$$",
    function(e) {
        if (1 == arguments.length) {
            if ("string" == typeof e) return Slick.search(this.document, e, new Elements);
            if (Type.isEnumerable(e)) return new Elements(e)
        }
        return new Elements(arguments)
    });
    var n = {
        before: function(e, t) {
            var n = t.parentNode;
            n && n.insertBefore(e, t)
        },
        after: function(e, t) {
            var n = t.parentNode;
            n && n.insertBefore(e, t.nextSibling)
        },
        bottom: function(e, t) {
            t.appendChild(e)
        },
        top: function(e, t) {
            t.insertBefore(e, t.firstChild)
        }
    };
    n.inside = n.bottom,
    Object.each(n,
    function(e, t) {
        var n = {};
        n["inject" + (t = t.capitalize())] = function(t) {
            return e(this, document.id(t, !0)),
            this
        },
        n["grab" + t] = function(t) {
            return e(document.id(t, !0), this),
            this
        },
        Element.implement(n)
    });
    var i = {},
    r = {},
    o = {};
    Array.forEach(["type", "value", "defaultValue", "accessKey", "cellPadding", "cellSpacing", "colSpan", "frameBorder", "rowSpan", "tabIndex", "useMap"],
    function(e) {
        o[e.toLowerCase()] = e
    }),
    o.html = "innerHTML",
    o.text = null == document.createElement("div").textContent ? "innerText": "textContent",
    Object.forEach(o,
    function(e, t) {
        r[t] = function(t, n) {
            t[e] = n
        },
        i[t] = function(t) {
            return t[e]
        }
    }),
    r.text = (r.text,
    function(e, t) {
        "style" == e.get("tag") ? e.set("html", t) : e[o.text] = t
    }),
    i.text = function(e) {
        return function(t) {
            return "style" == t.get("tag") ? t.innerHTML: e(t)
        }
    } (i.text);
    var s = {};
    Array.forEach(["compact", "nowrap", "ismap", "declare", "noshade", "checked", "disabled", "readOnly", "multiple", "selected", "noresize", "defer", "defaultChecked", "autofocus", "controls", "autoplay", "loop"],
    function(e) {
        var t = e.toLowerCase();
        s[t] = e,
        r[t] = function(t, n) {
            t[e] = !!n
        },
        i[t] = function(t) {
            return !! t[e]
        }
    }),
    Object.append(r, {
        class: function(e, t) {
            "className" in e ? e.className = t || "": e.setAttribute("class", t)
        },
        for: function(e, t) {
            "htmlFor" in e ? e.htmlFor = t: e.setAttribute("for", t)
        },
        style: function(e, t) {
            e.style ? e.style.cssText = t: e.setAttribute("style", t)
        },
        value: function(e, t) {
            e.value = null != t ? t: ""
        }
    }),
    i.class = function(e) {
        return "className" in e ? e.className || null: e.getAttribute("class")
    };
    var a = document.createElement("button");
    try {
        a.type = "button"
    } catch(e) {}
    "button" != a.type && (r.type = function(e, t) {
        e.setAttribute("type", t)
    }),
    a = null;
    var c, u, p = function() {
        var e = document.createElement("style"),
        t = !1;
        try {
            e.innerHTML = "#justTesing{margin: 0px;}",
            t = !!e.innerHTML
        } catch(e) {}
        return t
    } (),
    h = document.createElement("input");
    h.value = "t",
    h.type = "submit",
    c = "t" != h.value;
    try {
        h.value = "",
        h.type = "email",
        u = "email" == h.type
    } catch(e) {}
    h = null,
    !c && u || (r.type = function(e, t) {
        try {
            var n = e.value;
            e.type = t,
            e.value = n
        } catch(e) {}
    });
    var f = function(e) {
        return e.random = "attribute",
        "attribute" == e.getAttribute("random")
    } (document.createElement("div")),
    d = function(e) {
        return e.innerHTML = '<object><param name="should_fix" value="the unknown" /></object>',
        1 != e.cloneNode(!0).firstChild.childNodes.length
    } (document.createElement("div")),
    y = !!document.createElement("div").classList,
    m = function(e) {
        var t = {};
        return (e || "").clean().split(" ").filter(function(e) {
            if ("" !== e && !t[e]) return t[e] = e
        })
    },
    g = function(e) {
        this.classList.add(e)
    },
    v = function(e) {
        this.classList.remove(e)
    };
    Element.implement({
        setProperty: function(e, t) {
            var n = r[e.toLowerCase()];
            if (n) n(this, t);
            else {
                var i;
                f && (i = this.retrieve("$attributeWhiteList", {})),
                null == t ? (this.removeAttribute(e), f && delete i[e]) : (this.setAttribute(e, "" + t), f && (i[e] = !0))
            }
            return this
        },
        setProperties: function(e) {
            for (var t in e) this.setProperty(t, e[t]);
            return this
        },
        getProperty: function(e) {
            var t = i[e.toLowerCase()];
            if (t) return t(this);
            if (f) {
                var n = this.getAttributeNode(e),
                r = this.retrieve("$attributeWhiteList", {});
                if (!n) return null;
                if (n.expando && !r[e]) {
                    var o = this.outerHTML;
                    if (o.substr(0, o.search(/\/?['"]?>(?![^<]*<['"])/)).indexOf(e) < 0) return null;
                    r[e] = !0
                }
            }
            var s = Slick.getAttribute(this, e);
            return s || Slick.hasAttribute(this, e) ? s: null
        },
        getProperties: function() {
            var e = Array.convert(arguments);
            return e.map(this.getProperty, this).associate(e)
        },
        removeProperty: function(e) {
            return this.setProperty(e, null)
        },
        removeProperties: function() {
            return Array.each(arguments, this.removeProperty, this),
            this
        },
        set: function(e, t) {
            var n = Element.Properties[e];
            n && n.set ? n.set.call(this, t) : this.setProperty(e, t)
        }.overloadSetter(),
        get: function(e) {
            var t = Element.Properties[e];
            return t && t.get ? t.get.apply(this) : this.getProperty(e)
        }.overloadGetter(),
        erase: function(e) {
            var t = Element.Properties[e];
            return t && t.erase ? t.erase.apply(this) : this.removeProperty(e),
            this
        },
        hasClass: y ?
        function(e) {
            return this.classList.contains(e)
        }: function(e) {
            return m(this.className).contains(e)
        },
        addClass: y ?
        function(e) {
            return m(e).forEach(g, this),
            this
        }: function(e) {
            return this.className = m(e + " " + this.className).join(" "),
            this
        },
        removeClass: y ?
        function(e) {
            return m(e).forEach(v, this),
            this
        }: function(e) {
            var t = m(this.className);
            return m(e).forEach(t.erase, t),
            this.className = t.join(" "),
            this
        },
        toggleClass: function(e, t) {
            return null == t && (t = !this.hasClass(e)),
            t ? this.addClass(e) : this.removeClass(e)
        },
        adopt: function() {
            var e, t = this,
            n = Array.flatten(arguments),
            i = n.length;
            i > 1 && (t = e = document.createDocumentFragment());
            for (var r = 0; r < i; r++) {
                var o = document.id(n[r], !0);
                o && t.appendChild(o)
            }
            return e && this.appendChild(e),
            this
        },
        appendText: function(e, t) {
            return this.grab(this.getDocument().newTextNode(e), t)
        },
        grab: function(e, t) {
            return n[t || "bottom"](document.id(e, !0), this),
            this
        },
        inject: function(e, t) {
            return n[t || "bottom"](this, document.id(e, !0)),
            this
        },
        replaces: function(e) {
            return (e = document.id(e, !0)).parentNode.replaceChild(this, e),
            this
        },
        wraps: function(e, t) {
            return e = document.id(e, !0),
            this.replaces(e).grab(e, t)
        },
        getSelected: function() {
            return this.selectedIndex,
            new Elements(Array.convert(this.options).filter(function(e) {
                return e.selected
            }))
        },
        toQueryString: function() {
            var e = [];
            return this.getElements("input, select, textarea").each(function(t) {
                var n = t.type;
                if (t.name && !t.disabled && "submit" != n && "reset" != n && "file" != n && "image" != n) {
                    var i = "select" == t.get("tag") ? t.getSelected().map(function(e) {
                        return document.id(e).get("value")
                    }) : "radio" != n && "checkbox" != n || t.checked ? t.get("value") : null;
                    Array.convert(i).each(function(n) {
                        void 0 !== n && e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(n))
                    })
                }
            }),
            e.join("&")
        }
    });
    var b = {
        before: "beforeBegin",
        after: "afterEnd",
        bottom: "beforeEnd",
        top: "afterBegin",
        inside: "beforeEnd"
    };
    Element.implement("appendHTML", "insertAdjacentHTML" in document.createElement("div") ?
    function(e, t) {
        return this.insertAdjacentHTML(b[t || "bottom"], e),
        this
    }: function(e, t) {
        var i = new Element("div", {
            html: e
        }),
        r = i.childNodes,
        o = i.firstChild;
        if (!o) return this;
        if (r.length > 1) {
            o = document.createDocumentFragment();
            for (var s = 0,
            a = r.length; s < a; s++) o.appendChild(r[s])
        }
        return n[t || "bottom"](o, this),
        this
    });
    var x = {},
    w = {},
    _ = function(e) {
        return w[e] || (w[e] = {})
    },
    k = function(e) {
        var t = e.uniqueNumber;
        return e.removeEvents && e.removeEvents(),
        e.clearAttributes && e.clearAttributes(),
        null != t && (delete x[t], delete w[t]),
        e
    },
    S = {
        input: "checked",
        option: "selected",
        textarea: "value"
    };
    if (Element.implement({
        destroy: function() {
            var e = k(this).getElementsByTagName("*");
            return Array.each(e, k),
            Element.dispose(this),
            null
        },
        empty: function() {
            return Array.convert(this.childNodes).each(Element.dispose),
            this
        },
        dispose: function() {
            return this.parentNode ? this.parentNode.removeChild(this) : this
        },
        clone: function(e, t) {
            e = !1 !== e;
            var n, i = this.cloneNode(e),
            r = [i],
            o = [this];
            for (e && (r.append(Array.convert(i.getElementsByTagName("*"))), o.append(Array.convert(this.getElementsByTagName("*")))), n = r.length; n--;) {
                var s = r[n],
                a = o[n];
                if (t || s.removeAttribute("id"), s.clearAttributes && (s.clearAttributes(), s.mergeAttributes(a), s.removeAttribute("uniqueNumber"), s.options)) for (var l = s.options,
                c = a.options,
                u = l.length; u--;) l[u].selected = c[u].selected;
                var p = S[a.tagName.toLowerCase()];
                p && a[p] && (s[p] = a[p])
            }
            if (d) {
                var h = i.getElementsByTagName("object"),
                f = this.getElementsByTagName("object");
                for (n = h.length; n--;) h[n].outerHTML = f[n].outerHTML
            }
            return document.id(i)
        }
    }), [Element, Window, Document].invoke("implement", {
        addListener: function(e, t) {
            return window.attachEvent && !window.addEventListener && (x[Slick.uidOf(this)] = this),
            this.addEventListener ? this.addEventListener(e, t, !!arguments[2]) : this.attachEvent("on" + e, t),
            this
        },
        removeListener: function(e, t) {
            return this.removeEventListener ? this.removeEventListener(e, t, !!arguments[2]) : this.detachEvent("on" + e, t),
            this
        },
        retrieve: function(e, t) {
            var n = _(Slick.uidOf(this)),
            i = n[e];
            return null != t && null == i && (i = n[e] = t),
            null != i ? i: null
        },
        store: function(e, t) {
            return _(Slick.uidOf(this))[e] = t,
            this
        },
        eliminate: function(e) {
            return delete _(Slick.uidOf(this))[e],
            this
        }
    }), window.attachEvent && !window.addEventListener) {
        var C = function() {
            Object.each(x, k),
            window.CollectGarbage && CollectGarbage(),
            window.removeListener("unload", C)
        };
        window.addListener("unload", C)
    }
    Element.Properties = {},
    Element.Properties = new Hash,
    Element.Properties.style = {
        set: function(e) {
            this.style.cssText = e
        },
        get: function() {
            return this.style.cssText
        },
        erase: function() {
            this.style.cssText = ""
        }
    },
    Element.Properties.tag = {
        get: function() {
            return this.tagName.toLowerCase()
        }
    },
    Element.Properties.html = {
        set: function(e) {
            null == e ? e = "": "array" == typeOf(e) && (e = e.join("")),
            this.styleSheet && !p ? this.styleSheet.cssText = e: this.innerHTML = e
        },
        erase: function() {
            this.set("html", "")
        }
    };
    var T, E = !0,
    M = !0,
    A = !0,
    O = document.createElement("div");
    if (O.innerHTML = "<nav></nav>", !(E = 1 == O.childNodes.length)) {
        var L = "abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" ");
        for (T = document.createDocumentFragment(), l = L.length; l--;) T.createElement(L[l])
    }
    O = null,
    M = Function.attempt(function() {
        return document.createElement("table").innerHTML = "<tr><td></td></tr>",
        !0
    });
    var P = document.createElement("tr");
    P.innerHTML = "<td></td>",
    A = "<td></td>" == P.innerHTML,
    P = null,
    M && A && E || (Element.Properties.html.set = function(e) {
        var t = {
            table: [1, "<table>", "</table>"],
            select: [1, "<select>", "</select>"],
            tbody: [2, "<table><tbody>", "</tbody></table>"],
            tr: [3, "<table><tbody><tr>", "</tr></tbody></table>"]
        };
        return t.thead = t.tfoot = t.tbody,
        function(n) {
            if (this.styleSheet) return e.call(this, n);
            var i = t[this.get("tag")];
            if (i || E || (i = [0, "", ""]), !i) return e.call(this, n);
            var r = i[0],
            o = document.createElement("div"),
            s = o;
            for (E || T.appendChild(o), o.innerHTML = [i[1], n, i[2]].flatten().join(""); r--;) s = s.firstChild;
            this.empty().adopt(s.childNodes),
            E || T.removeChild(o),
            o = null
        }
    } (Element.Properties.html.set));
    var R = document.createElement("form");
    R.innerHTML = "<select><option>s</option></select>",
    "s" != R.firstChild.value && (Element.Properties.value = {
        set: function(e) {
            if ("select" != this.get("tag")) return this.setProperty("value", e);
            var t = this.getElements("option");
            e = String(e);
            for (var n = 0; n < t.length; n++) {
                var i = t[n],
                r = i.getAttributeNode("value");
                if ((r && r.specified ? i.value: i.get("text")) === e) return i.selected = !0
            }
        },
        get: function() {
            var e = this,
            t = e.get("tag");
            if ("select" != t && "option" != t) return this.getProperty("value");
            if ("select" == t && !(e = e.getSelected()[0])) return "";
            var n = e.getAttributeNode("value");
            return n && n.specified ? e.value: e.get("text")
        }
    }),
    R = null,
    document.createElement("div").getAttributeNode("id") && (Element.Properties.id = {
        set: function(e) {
            this.id = this.getAttributeNode("id").value = e
        },
        get: function() {
            return this.id || null
        },
        erase: function() {
            this.id = this.getAttributeNode("id").value = ""
        }
    })
} (),
function() {
    var e = {},
    t = this.DOMEvent = new Type("DOMEvent",
    function(t, n) {
        if (n || (n = window), (t = t || n.event).$extended) return t;
        this.event = t,
        this.$extended = !0,
        this.shift = t.shiftKey,
        this.control = t.ctrlKey,
        this.alt = t.altKey,
        this.meta = t.metaKey;
        for (var i = this.type = t.type,
        r = t.target || t.srcElement; r && 3 == r.nodeType;) r = r.parentNode;
        if (this.target = document.id(r), 0 == i.indexOf("key")) {
            var o = this.code = t.which || t.keyCode;
            this.shift && "keypress" == i || (this.key = e[o] || Object.keyOf(Event.Keys, o)),
            "keydown" != i && "keyup" != i || (o > 111 && o < 124 ? this.key = "f" + (o - 111) : o > 95 && o < 106 && (this.key = o - 96)),
            null == this.key && (this.key = String.fromCharCode(o).toLowerCase())
        } else if ("click" == i || "dblclick" == i || "contextmenu" == i || "wheel" == i || "DOMMouseScroll" == i || 0 == i.indexOf("mouse")) {
            var s = n.document;
            if (s = s.compatMode && "CSS1Compat" != s.compatMode ? s.body: s.html, this.page = {
                x: null != t.pageX ? t.pageX: t.clientX + s.scrollLeft,
                y: null != t.pageY ? t.pageY: t.clientY + s.scrollTop
            },
            this.client = {
                x: null != t.pageX ? t.pageX - n.pageXOffset: t.clientX,
                y: null != t.pageY ? t.pageY - n.pageYOffset: t.clientY
            },
            "DOMMouseScroll" != i && "wheel" != i && "mousewheel" != i || (this.wheel = function(e) {
                var t;
                if (e.wheelDelta) t = e.wheelDelta % 120 == 0 ? e.wheelDelta / 120 : e.wheelDelta / 12;
                else {
                    var n = e.deltaY || e.detail || 0;
                    t = -(n % 3 == 0 ? n / 3 : 10 * n)
                }
                return t
            } (t)), this.rightClick = 3 == t.which || 2 == t.button, "mouseover" == i || "mouseout" == i || "mouseenter" == i || "mouseleave" == i) {
                for (var a = "mouseover" == i || "mouseenter" == i,
                l = t.relatedTarget || t[(a ? "from": "to") + "Element"]; l && 3 == l.nodeType;) l = l.parentNode;
                this.relatedTarget = document.id(l)
            }
        } else if (0 == i.indexOf("touch") || 0 == i.indexOf("gesture")) {
            this.rotation = t.rotation,
            this.scale = t.scale,
            this.targetTouches = t.targetTouches,
            this.changedTouches = t.changedTouches;
            var c = this.touches = t.touches;
            if (c && c[0]) {
                var u = c[0];
                this.page = {
                    x: u.pageX,
                    y: u.pageY
                },
                this.client = {
                    x: u.clientX,
                    y: u.clientY
                }
            }
        }
        this.client || (this.client = {}),
        this.page || (this.page = {})
    });
    t.implement({
        stop: function() {
            return this.preventDefault().stopPropagation()
        },
        stopPropagation: function() {
            return this.event.stopPropagation ? this.event.stopPropagation() : this.event.cancelBubble = !0,
            this
        },
        preventDefault: function() {
            return this.event.preventDefault ? this.event.preventDefault() : this.event.returnValue = !1,
            this
        }
    }),
    t.defineKey = function(t, n) {
        return e[t] = n,
        this
    },
    t.defineKeys = t.defineKey.overloadSetter(!0),
    t.defineKeys({
        38 : "up",
        40 : "down",
        37 : "left",
        39 : "right",
        27 : "esc",
        32 : "space",
        8 : "backspace",
        9 : "tab",
        46 : "delete",
        13 : "enter"
    })
} ();
var Event = this.Event = DOMEvent;
Event.Keys = {},
Event.Keys = new Hash(Event.Keys),
function() {
    Element.Properties.events = {
        set: function(e) {
            this.addEvents(e)
        }
    },
    [Element, Window, Document].invoke("implement", {
        addEvent: function(e, t) {
            var n = this.retrieve("events", {});
            if (n[e] || (n[e] = {
                keys: [],
                values: []
            }), n[e].keys.contains(t)) return this;
            n[e].keys.push(t);
            var i = e,
            r = Element.Events[e],
            o = t,
            s = this;
            r && (r.onAdd && r.onAdd.call(this, t, e), r.condition && (o = function(n) {
                return ! r.condition.call(this, n, e) || t.call(this, n)
            }), r.base && (i = Function.convert(r.base).call(this, e)));
            var a = function() {
                return t.call(s)
            },
            l = Element.NativeEvents[i];
            return l && (2 == l && (a = function(e) {
                e = new DOMEvent(e, s.getWindow()),
                !1 === o.call(s, e) && e.stop()
            }), this.addListener(i, a, arguments[2])),
            n[e].values.push(a),
            this
        },
        removeEvent: function(e, t) {
            var n = this.retrieve("events");
            if (!n || !n[e]) return this;
            var i = n[e],
            r = i.keys.indexOf(t);
            if ( - 1 == r) return this;
            var o = i.values[r];
            delete i.keys[r],
            delete i.values[r];
            var s = Element.Events[e];
            return s && (s.onRemove && s.onRemove.call(this, t, e), s.base && (e = Function.convert(s.base).call(this, e))),
            Element.NativeEvents[e] ? this.removeListener(e, o, arguments[2]) : this
        },
        addEvents: function(e) {
            for (var t in e) this.addEvent(t, e[t]);
            return this
        },
        removeEvents: function(e) {
            var t;
            if ("object" == typeOf(e)) {
                for (t in e) this.removeEvent(t, e[t]);
                return this
            }
            var n = this.retrieve("events");
            if (!n) return this;
            if (e) n[e] && (n[e].keys.each(function(t) {
                this.removeEvent(e, t)
            },
            this), delete n[e]);
            else {
                for (t in n) this.removeEvents(t);
                this.eliminate("events")
            }
            return this
        },
        fireEvent: function(e, t, n) {
            var i = this.retrieve("events");
            return i && i[e] ? (t = Array.convert(t), i[e].keys.each(function(e) {
                n ? e.delay(n, this, t) : e.apply(this, t)
            },
            this), this) : this
        },
        cloneEvents: function(e, t) {
            var n = (e = document.id(e)).retrieve("events");
            if (!n) return this;
            if (t) n[t] && n[t].keys.each(function(e) {
                this.addEvent(t, e)
            },
            this);
            else for (var i in n) this.cloneEvents(e, i);
            return this
        }
    }),
    Element.NativeEvents = {
        click: 2,
        dblclick: 2,
        mouseup: 2,
        mousedown: 2,
        contextmenu: 2,
        wheel: 2,
        mousewheel: 2,
        DOMMouseScroll: 2,
        mouseover: 2,
        mouseout: 2,
        mousemove: 2,
        selectstart: 2,
        selectend: 2,
        keydown: 2,
        keypress: 2,
        keyup: 2,
        orientationchange: 2,
        touchstart: 2,
        touchmove: 2,
        touchend: 2,
        touchcancel: 2,
        gesturestart: 2,
        gesturechange: 2,
        gestureend: 2,
        focus: 2,
        blur: 2,
        change: 2,
        reset: 2,
        select: 2,
        submit: 2,
        paste: 2,
        input: 2,
        load: 2,
        unload: 1,
        beforeunload: 2,
        resize: 1,
        move: 1,
        DOMContentLoaded: 1,
        readystatechange: 1,
        hashchange: 1,
        popstate: 2,
        pageshow: 2,
        pagehide: 2,
        error: 1,
        abort: 1,
        scroll: 1,
        message: 2
    },
    Element.Events = {
        mousewheel: {
            base: "onwheel" in document ? "wheel": "onmousewheel" in document ? "mousewheel": "DOMMouseScroll"
        }
    };
    var e = function(e) {
        var t = e.relatedTarget;
        return null == t || !!t && (t != this && "xul" != t.prefix && "document" != typeOf(this) && !this.contains(t))
    };
    "onmouseenter" in document.documentElement ? (Element.NativeEvents.mouseenter = Element.NativeEvents.mouseleave = 2, Element.MouseenterCheck = e) : (Element.Events.mouseenter = {
        base: "mouseover",
        condition: e
    },
    Element.Events.mouseleave = {
        base: "mouseout",
        condition: e
    }),
    window.addEventListener || (Element.NativeEvents.propertychange = 2, Element.Events.change = {
        base: function() {
            var e = this.type;
            return "input" != this.get("tag") || "radio" != e && "checkbox" != e ? "change": "propertychange"
        },
        condition: function(e) {
            return "propertychange" != e.type || "checked" == e.event.propertyName
        }
    }),
    Element.Events = new Hash(Element.Events)
} (),
function() {
    var e = !!window.addEventListener;
    Element.NativeEvents.focusin = Element.NativeEvents.focusout = 2;
    var t = function(e, t, n, i, r) {
        for (; r && r != e;) {
            if (t(r, i)) return n.call(r, i, r);
            r = document.id(r.parentNode)
        }
    },
    n = {
        mouseenter: {
            base: "mouseover",
            condition: Element.MouseenterCheck
        },
        mouseleave: {
            base: "mouseout",
            condition: Element.MouseenterCheck
        },
        focus: {
            base: "focus" + (e ? "": "in"),
            capture: !0
        },
        blur: {
            base: e ? "blur": "focusout",
            capture: !0
        }
    },
    i = "$delegation:",
    r = function(e) {
        
    },
    o = function(e) {
        return {
            base: "focusin",
            listen: function(n, i, r, o, s) {
                var a = {
                    blur: function() {
                        this.removeEvents(a)
                    }
                };
                a[e] = function(e) {
                    t(n, i, r, e, s)
                },
                o.target.addEvents(a)
            }
        }
    };
    e || Object.append(n, {
        submit: r("submit"),
        reset: r("reset"),
        change: o("change"),
        select: o("select")
    });
    var s = Element.prototype,
    a = s.addEvent,
    l = s.removeEvent,
    c = function(e, t) {
        return function(n, i, r) {
            if ( - 1 == n.indexOf(":relay")) return e.call(this, n, i, r);
            var o = Slick.parse(n).expressions[0][0];
            if ("relay" != o.pseudos[0].key) return e.call(this, n, i, r);
            var s = o.tag;
            return o.pseudos.slice(1).each(function(e) {
                s += ":" + e.key + (e.value ? "(" + e.value + ")": "")
            }),
            e.call(this, n, i),
            t.call(this, s, o.pseudos[0].value, i)
        }
    },
    u = {
        addEvent: function(e, i, r) {
            var o = this.retrieve("$delegates", {}),
            s = o[e];
            if (s) for (var l in s) if (s[l].fn == r && s[l].match == i) return this;
            var c = e,
            u = i,
            p = r,
            h = n[e] || {};
            e = h.base || c,
            i = function(e) {
                return Slick.match(e, u)
            };
            var f = Element.Events[c];
            if (h.condition || f && f.condition) {
                var d = i,
                y = h.condition || f.condition;
                i = function(t, n) {
                    return d(t, n) && y.call(t, n, e)
                }
            }
            var m = this,
            g = String.uniqueID(),
            v = h.listen ?
            function(e, t) { ! t && e && e.target && (t = e.target),
                t && h.listen(m, i, r, e, t, g)
            }: function(e, n) { ! n && e && e.target && (n = e.target),
                n && t(m, i, r, e, n)
            };
            return s || (s = {}),
            s[g] = {
                match: u,
                fn: p,
                delegator: v
            },
            o[c] = s,
            a.call(this, e, v, h.capture)
        },
        removeEvent: function(e, t, i, r) {
            var o = this.retrieve("$delegates", {}),
            s = o[e];
            if (!s) return this;
            if (r) {
                var a = e,
                c = s[r].delegator,
                p = n[e] || {};
                return e = p.base || a,
                p.remove && p.remove(this, r),
                delete s[r],
                o[a] = s,
                l.call(this, e, c, p.capture)
            }
            var h, f;
            if (i) {
                for (h in s) if ((f = s[h]).match == t && f.fn == i) return u.removeEvent.call(this, e, t, i, h)
            } else for (h in s)(f = s[h]).match == t && u.removeEvent.call(this, e, t, f.fn, h);
            return this
        }
    }; [Element, Window, Document].invoke("implement", {
        addEvent: c(a, u.addEvent),
        removeEvent: c(l, u.removeEvent)
    })
} (),
function() {
    var e, t = document.html; (e = document.createElement("div")).style.color = "red",
    e.style.color = null;
    var n = "red" == e.style.color;
    e.style.border = "1px solid #123abc";
    var i = "1px solid #123abc" != e.style.border;
    e = null;
    var r = !!window.getComputedStyle,
    o = null != document.createElement("div").style.borderRadius;
    Element.Properties.styles = {
        set: function(e) {
            this.setStyles(e)
        }
    };
    var s = null != t.style.opacity,
    a = null != t.style.filter,
    l = /alpha\(opacity=([\d.]+)\)/i,
    c = function(e, t) {
        e.store("$opacity", t),
        e.style.visibility = t > 0 || null == t ? "visible": "hidden"
    },
    u = function(e, t, n) {
        var i = e.style,
        r = i.filter || e.getComputedStyle("filter") || "";
        i.filter = (t.test(r) ? r.replace(t, n) : r + " " + n).trim(),
        i.filter || i.removeAttribute("filter")
    },
    p = s ?
    function(e, t) {
        e.style.opacity = t
    }: a ?
    function(e, t) {
        e.currentStyle && e.currentStyle.hasLayout || (e.style.zoom = 1),
        null == t || 1 == t ? (u(e, l, ""), 1 == t && 1 != h(e) && u(e, l, "alpha(opacity=100)")) : u(e, l, "alpha(opacity=" + (100 * t).limit(0, 100).round() + ")")
    }: c,
    h = s ?
    function(e) {
        var t = e.style.opacity || e.getComputedStyle("opacity");
        return "" == t ? 1 : t.toFloat()
    }: a ?
    function(e) {
        var t, n = e.style.filter || e.getComputedStyle("filter");
        return n && (t = n.match(l)),
        null == t || null == n ? 1 : t[1] / 100
    }: function(e) {
        var t = e.retrieve("$opacity");
        return null == t && (t = "hidden" == e.style.visibility ? 0 : 1),
        t
    },
    f = null == t.style.cssFloat ? "styleFloat": "cssFloat",
    d = {
        left: "0%",
        top: "0%",
        center: "50%",
        right: "100%",
        bottom: "100%"
    },
    y = null != t.style.backgroundPositionX,
    m = /^-(ms)-/,
    g = function(e) {
        return e.replace(m, "$1-").camelCase()
    };
    Element.implement({
        getComputedStyle: function(e) {
            if (!r && this.currentStyle) return this.currentStyle[g(e)];
            var t = Element.getDocument(this).defaultView,
            n = t ? t.getComputedStyle(this, null) : null;
            return n ? n.getPropertyValue(e == f ? "float": e.hyphenate()) : ""
        },
        setStyle: function(e, t) {
            if ("opacity" == e) return null != t && (t = parseFloat(t)),
            p(this, t),
            this;
            if (e = g("float" == e ? f: e), "string" != typeOf(t)) {
                var i = (Element.Styles[e] || "@").split(" ");
                t = Array.convert(t).map(function(e, t) {
                    return i[t] ? "number" == typeOf(e) ? i[t].replace("@", Math.round(e)) : e: ""
                }).join(" ")
            } else t == String(Number(t)) && (t = Math.round(t));
            return this.style[e] = t,
            ("" == t || null == t) && n && this.style.removeAttribute &&
            function(e, t) {
                "backgroundPosition" == t && (e.removeAttribute(t + "X"), t += "Y"),
                e.removeAttribute(t)
            } (this.style, e),
            this
        },
        getStyle: function(e) {
            if ("opacity" == e) return h(this);
            if (e = g("float" == e ? f: e), o && -1 != e.indexOf("borderRadius")) return ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"].map(function(e) {
                return this.style[e] || "0px"
            },
            this).join(" ");
            var t = this.style[e];
            if (!t || "zIndex" == e) {
                if (Element.ShortStyles.hasOwnProperty(e)) {
                    t = [];
                    for (var n in Element.ShortStyles[e]) t.push(this.getStyle(n));
                    return t.join(" ")
                }
                t = this.getComputedStyle(e)
            }
            if (y && /^backgroundPosition[XY]?$/.test(e)) return t.replace(/(top|right|bottom|left)/g,
            function(e) {
                return d[e]
            }) || "0px";
            if (!t && "backgroundPosition" == e) return "0px 0px";
            if (t) {
                var s = (t = String(t)).match(/rgba?\([\d\s,]+\)/);
                s && (t = t.replace(s[0], s[0].rgbToHex()))
            }
            if (!r && !this.style[e]) {
                if (/^(height|width)$/.test(e) && !/px$/.test(t)) {
                    var a = 0;
                    return ("width" == e ? ["left", "right"] : ["top", "bottom"]).each(function(e) {
                        a += this.getStyle("border-" + e + "-width").toInt() + this.getStyle("padding-" + e).toInt()
                    },
                    this),
                    this["offset" + e.capitalize()] - a + "px"
                }
                if (/^border(.+)Width|margin|padding/.test(e) && isNaN(parseFloat(t))) return "0px"
            }
            return i && /^border(Top|Right|Bottom|Left)?$/.test(e) && /^#/.test(t) ? t.replace(/^(.+)\s(.+)\s(.+)$/, "$2 $3 $1") : t
        },
        setStyles: function(e) {
            for (var t in e) this.setStyle(t, e[t]);
            return this
        },
        getStyles: function() {
            var e = {};
            return Array.flatten(arguments).each(function(t) {
                e[t] = this.getStyle(t)
            },
            this),
            e
        }
    }),
    Element.Styles = {
        left: "@px",
        top: "@px",
        bottom: "@px",
        right: "@px",
        width: "@px",
        height: "@px",
        maxWidth: "@px",
        maxHeight: "@px",
        minWidth: "@px",
        minHeight: "@px",
        backgroundColor: "rgb(@, @, @)",
        backgroundSize: "@px",
        backgroundPosition: "@px @px",
        color: "rgb(@, @, @)",
        fontSize: "@px",
        letterSpacing: "@px",
        lineHeight: "@px",
        clip: "rect(@px @px @px @px)",
        margin: "@px @px @px @px",
        padding: "@px @px @px @px",
        border: "@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)",
        borderWidth: "@px @px @px @px",
        borderStyle: "@ @ @ @",
        borderColor: "rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)",
        zIndex: "@",
        zoom: "@",
        fontWeight: "@",
        textIndent: "@px",
        opacity: "@",
        borderRadius: "@px @px @px @px"
    },
    Element.implement({
        setOpacity: function(e) {
            return p(this, e),
            this
        },
        getOpacity: function() {
            return h(this)
        }
    }),
    Element.Properties.opacity = {
        set: function(e) {
            p(this, e),
            c(this, e)
        },
        get: function() {
            return h(this)
        }
    },
    Element.Styles = new Hash(Element.Styles),
    Element.ShortStyles = {
        margin: {},
        padding: {},
        border: {},
        borderWidth: {},
        borderStyle: {},
        borderColor: {}
    },
    ["Top", "Right", "Bottom", "Left"].each(function(e) {
        var t = Element.ShortStyles,
        n = Element.Styles; ["margin", "padding"].each(function(i) {
            var r = i + e;
            t[i][r] = n[r] = "@px"
        });
        var i = "border" + e;
        t.border[i] = n[i] = "@px @ rgb(@, @, @)";
        var r = i + "Width",
        o = i + "Style",
        s = i + "Color";
        t[i] = {},
        t.borderWidth[r] = t[i][r] = n[r] = "@px",
        t.borderStyle[o] = t[i][o] = n[o] = "@",
        t.borderColor[s] = t[i][s] = n[s] = "rgb(@, @, @)"
    }),
    y && (Element.ShortStyles.backgroundPosition = {
        backgroundPositionX: "@",
        backgroundPositionY: "@"
    })
} (),
function() {
    function e(e, t) {
        return h(e, t).toInt() || 0
    }
    function t(e) {
        return "border-box" == h(e, "-moz-box-sizing")
    }
    function n(t) {
        return e(t, "border-top-width")
    }
    function i(t) {
        return e(t, "border-left-width")
    }
    function r(e) {
        return /^(?:body|html)$/i.test(e.tagName)
    }
    function o(e) {
        var t = e.getDocument();
        return t.compatMode && "CSS1Compat" != t.compatMode ? t.body: t.html
    }
    var s = document.createElement("div"),
    a = document.createElement("div");
    s.style.height = "0",
    s.appendChild(a);
    var l = a.offsetParent === s;
    s = a = null;
    var c = ["height", "paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"],
    u = ["width", "paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"],
    p = function(e) {
        return "static" != h(e, "position") || r(e)
    };
    Element.implement({
        scrollTo: function(e, t) {
            return r(this) ? this.getWindow().scrollTo(e, t) : (this.scrollLeft = e, this.scrollTop = t),
            this
        },
        getSize: function() {
            if (r(this)) return this.getWindow().getSize();
            if (!window.getComputedStyle) return {
                x: this.offsetWidth,
                y: this.offsetHeight
            };
            if ("svg" == this.get("tag")) return function(e) {
                var t = window.getComputedStyle(e),
                n = {
                    x: 0,
                    y: 0
                };
                return c.each(function(e) {
                    n.y += parseFloat(t[e])
                }),
                u.each(function(e) {
                    n.x += parseFloat(t[e])
                }),
                n
            } (this);
            try {
                var e = this.getBoundingClientRect();
                return {
                    x: e.width,
                    y: e.height
                }
            } catch(e) {
                return {
                    x: 0,
                    y: 0
                }
            }
        },
        getScrollSize: function() {
            return r(this) ? this.getWindow().getScrollSize() : {
                x: this.scrollWidth,
                y: this.scrollHeight
            }
        },
        getScroll: function() {
            return r(this) ? this.getWindow().getScroll() : {
                x: this.scrollLeft,
                y: this.scrollTop
            }
        },
        getScrolls: function() {
            for (var e = this.parentNode,
            t = {
                x: 0,
                y: 0
            }; e && !r(e);) t.x += e.scrollLeft,
            t.y += e.scrollTop,
            e = e.parentNode;
            return t
        },
        getOffsetParent: l ?
        function() {
            var e = this;
            if (r(e) || "fixed" == h(e, "position")) return null;
            for (var t = "static" == h(e, "position") ?
            function(e) {
                return p(e) || /^(?:table|td|th)$/i.test(e.tagName)
            }: p; e = e.parentNode;) if (t(e)) return e;
            return null
        }: function() {
            if (r(this) || "fixed" == h(this, "position")) return null;
            try {
                return this.offsetParent
            } catch(e) {}
            return null
        },
        getOffsets: function() {
            var e = this.getBoundingClientRect;
            if (e = e && !Browser.Platform.ios) {
                var o = this.getBoundingClientRect(),
                s = document.id(this.getDocument().documentElement),
                a = s.getScroll(),
                l = this.getScrolls(),
                c = "fixed" == h(this, "position");
                return {
                    x: o.left.toFloat() + l.x + (c ? 0 : a.x) - s.clientLeft,
                    y: o.top.toFloat() + l.y + (c ? 0 : a.y) - s.clientTop
                }
            }
            var u = this,
            p = {
                x: 0,
                y: 0
            };
            if (r(this)) return p;
            for (; u && !r(u);) {
                if (p.x += u.offsetLeft, p.y += u.offsetTop, Browser.firefox) {
                    t(u) || (p.x += i(u), p.y += n(u));
                    var f = u.parentNode;
                    f && "visible" != h(f, "overflow") && (p.x += i(f), p.y += n(f))
                } else u != this && Browser.safari && (p.x += i(u), p.y += n(u));
                u = u.offsetParent
            }
            return Browser.firefox && !t(this) && (p.x -= i(this), p.y -= n(this)),
            p
        },
        getPosition: function(e) {
            var t = this.getOffsets(),
            r = this.getScrolls(),
            o = {
                x: t.x - r.x,
                y: t.y - r.y
            };
            if (e && (e = document.id(e))) {
                var s = e.getPosition();
                return {
                    x: o.x - s.x - i(e),
                    y: o.y - s.y - n(e)
                }
            }
            return o
        },
        getCoordinates: function(e) {
            if (r(this)) return this.getWindow().getCoordinates();
            var t = this.getPosition(e),
            n = this.getSize(),
            i = {
                left: t.x,
                top: t.y,
                width: n.x,
                height: n.y
            };
            return i.right = i.left + i.width,
            i.bottom = i.top + i.height,
            i
        },
        computePosition: function(t) {
            return {
                left: t.x - e(this, "margin-left"),
                top: t.y - e(this, "margin-top")
            }
        },
        setPosition: function(e) {
            return this.setStyles(this.computePosition(e))
        }
    }),
    [Document, Window].invoke("implement", {
        getSize: function() {
            var e = o(this);
            return {
                x: e.clientWidth,
                y: e.clientHeight
            }
        },
        getScroll: function() {
            var e = this.getWindow(),
            t = o(this);
            return {
                x: e.pageXOffset || t.scrollLeft,
                y: e.pageYOffset || t.scrollTop
            }
        },
        getScrollSize: function() {
            var e = o(this),
            t = this.getSize(),
            n = this.getDocument().body;
            return {
                x: Math.max(e.scrollWidth, n.scrollWidth, t.x),
                y: Math.max(e.scrollHeight, n.scrollHeight, t.y)
            }
        },
        getPosition: function() {
            return {
                x: 0,
                y: 0
            }
        },
        getCoordinates: function() {
            var e = this.getSize();
            return {
                top: 0,
                left: 0,
                bottom: e.y,
                right: e.x,
                height: e.y,
                width: e.x
            }
        }
    });
    var h = Element.getComputedStyle
} (),
Element.alias({
    position: "setPosition"
}),
[Window, Document, Element].invoke("implement", {
    getHeight: function() {
        return this.getSize().y
    },
    getWidth: function() {
        return this.getSize().x
    },
    getScrollTop: function() {
        return this.getScroll().y
    },
    getScrollLeft: function() {
        return this.getScroll().x
    },
    getScrollHeight: function() {
        return this.getScrollSize().y
    },
    getScrollWidth: function() {
        return this.getScrollSize().x
    },
    getTop: function() {
        return this.getPosition().y
    },
    getLeft: function() {
        return this.getPosition().x
    }
}),
function() {
    var e = this.Fx = new Class({
        Implements: [Chain, Events, Options, Class.Thenable],
        options: {
            fps: 60,
            unit: !1,
            duration: 500,
            frames: null,
            frameSkip: !0,
            link: "ignore"
        },
        initialize: function(e) {
            this.subject = this.subject || this,
            this.setOptions(e)
        },
        getTransition: function() {
            return function(e) {
                return - (Math.cos(Math.PI * e) - 1) / 2
            }
        },
        step: function(e) {
            if (this.options.frameSkip) {
                var t = (null != this.time ? e - this.time: 0) / this.frameInterval;
                this.time = e,
                this.frame += t
            } else this.frame++;
            if (this.frame < this.frames) {
                var n = this.transition(this.frame / this.frames);
                this.set(this.compute(this.from, this.to, n))
            } else this.frame = this.frames,
            this.set(this.compute(this.from, this.to, 1)),
            this.stop()
        },
        set: function(e) {
            return e
        },
        compute: function(t, n, i) {
            return e.compute(t, n, i)
        },
        check: function() {
            if (!this.isRunning()) return ! 0;
            switch (this.options.link) {
            case "cancel":
                return this.cancel(),
                !0;
            case "chain":
                return this.chain(this.caller.pass(arguments, this)),
                !1
            }
            return ! 1
        },
        start: function(t, n) {
            if (!this.check(t, n)) return this;
            this.from = t,
            this.to = n,
            this.frame = this.options.frameSkip ? 0 : -1,
            this.time = null,
            this.transition = this.getTransition();
            var r = this.options.frames,
            o = this.options.fps,
            s = this.options.duration;
            return this.duration = e.Durations[s] || s.toInt(),
            this.frameInterval = 1e3 / o,
            this.frames = r || Math.round(this.duration / this.frameInterval),
            "pending" !== this.getThenableState() && this.resetThenable(this.subject),
            this.fireEvent("start", this.subject),
            i.call(this, o),
            this
        },
        stop: function() {
            return this.isRunning() && (this.time = null, r.call(this, this.options.fps), this.frames == this.frame ? (this.fireEvent("complete", this.subject), this.callChain() || this.fireEvent("chainComplete", this.subject)) : this.fireEvent("stop", this.subject), this.resolve(this.subject === this ? null: this.subject)),
            this
        },
        cancel: function() {
            return this.isRunning() && (this.time = null, r.call(this, this.options.fps), this.frame = this.frames, this.fireEvent("cancel", this.subject).clearChain(), this.reject(this.subject)),
            this
        },
        pause: function() {
            return this.isRunning() && (this.time = null, r.call(this, this.options.fps)),
            this
        },
        resume: function() {
            return this.isPaused() && i.call(this, this.options.fps),
            this
        },
        isRunning: function() {
            var e = t[this.options.fps];
            return e && e.contains(this)
        },
        isPaused: function() {
            return this.frame < this.frames && !this.isRunning()
        }
    });
    e.compute = function(e, t, n) {
        return (t - e) * n + e
    },
    e.Durations = {
        short: 250,
        normal: 500,
        long: 1e3
    };
    var t = {},
    n = {},
    i = function(e) {
        var i = t[e] || (t[e] = []);
        i.push(this),
        n[e] || (n[e] = function() {
            for (var e = Date.now(), t = this.length; t--;) {
                var n = this[t];
                n && n.step(e)
            }
        }.periodical(Math.round(1e3 / e), i))
    },
    r = function(e) {
        var i = t[e];
        i && (i.erase(this), !i.length && n[e] && (delete t[e], n[e] = clearInterval(n[e])))
    }
} (),
Fx.CSS = new Class({
    Extends: Fx,
    prepare: function(e, t, n) {
        var i = (n = Array.convert(n))[0],
        r = n[1];
        if (null == r) {
            r = i,
            i = e.getStyle(t);
            var o = this.options.unit;
            if (o && i && "string" == typeof i && i.slice( - o.length) != o && 0 != parseFloat(i)) {
                e.setStyle(t, r + o);
                var s = e.getComputedStyle(t);
                if (!/px$/.test(s) && null == (s = e.style[("pixel-" + t).camelCase()])) {
                    var a = e.style.left;
                    e.style.left = r + o,
                    s = e.style.pixelLeft,
                    e.style.left = a
                }
                i = (r || 1) / (parseFloat(s) || 1) * (parseFloat(i) || 0),
                e.setStyle(t, i + o)
            }
        }
        return {
            from: this.parse(i),
            to: this.parse(r)
        }
    },
    parse: function(e) {
        return e = Function.convert(e)(),
        (e = "string" == typeof e ? e.split(" ") : Array.convert(e)).map(function(e) {
            e = String(e);
            var t = !1;
            return Object.each(Fx.CSS.Parsers,
            function(n) {
                if (!t) {
                    var i = n.parse(e); (i || 0 === i) && (t = {
                        value: i,
                        parser: n
                    })
                }
            }),
            t = t || {
                value: e,
                parser: Fx.CSS.Parsers.String
            }
        })
    },
    compute: function(e, t, n) {
        var i = [];
        return Math.min(e.length, t.length).times(function(r) {
            i.push({
                value: e[r].parser.compute(e[r].value, t[r].value, n),
                parser: e[r].parser
            })
        }),
        i.$family = Function.convert("fx:css:value"),
        i
    },
    serve: function(e, t) {
        "fx:css:value" != typeOf(e) && (e = this.parse(e));
        var n = [];
        return e.each(function(e) {
            n = n.concat(e.parser.serve(e.value, t))
        }),
        n
    },
    render: function(e, t, n, i) {
        e.setStyle(t, this.serve(n, i))
    },
    search: function(e) {
        if (Fx.CSS.Cache[e]) return Fx.CSS.Cache[e];
        var t = {},
        n = new RegExp("^" + e.escapeRegExp() + "$"),
        i = function(e) {
            Array.each(e,
            function(e) {
                if (e.media) i(e.rules || e.cssRules);
                else if (e.style) {
                    var r = e.selectorText ? e.selectorText.replace(/^\w+/,
                    function(e) {
                        return e.toLowerCase()
                    }) : null;
                    r && n.test(r) && Object.each(Element.Styles,
                    function(n, i) {
                        e.style[i] && !Element.ShortStyles[i] && (n = String(e.style[i]), t[i] = /^rgb/.test(n) ? n.rgbToHex() : n)
                    })
                }
            })
        };
        return Array.each(document.styleSheets,
        function(e) {
            var t = e.href;
            if (! (t && t.indexOf("://") > -1 && -1 == t.indexOf(document.domain))) {
                var n = e.rules || e.cssRules;
                i(n)
            }
        }),
        Fx.CSS.Cache[e] = t
    }
}),
Fx.CSS.Cache = {},
Fx.CSS.Parsers = {
    Color: {
        parse: function(e) {
            return e.match(/^#[0-9a-f]{3,6}$/i) ? e.hexToRgb(!0) : !!(e = e.match(/(\d+),\s*(\d+),\s*(\d+)/)) && [e[1], e[2], e[3]]
        },
        compute: function(e, t, n) {
            return e.map(function(i, r) {
                return Math.round(Fx.compute(e[r], t[r], n))
            })
        },
        serve: function(e) {
            return e.map(Number)
        }
    },
    Number: {
        parse: parseFloat,
        compute: Fx.compute,
        serve: function(e, t) {
            return t ? e + t: e
        }
    },
    String: {
        parse: Function.convert(!1),
        compute: function(e, t) {
            return t
        },
        serve: function(e) {
            return e
        }
    }
},
Fx.CSS.Parsers = new Hash(Fx.CSS.Parsers),
Fx.Morph = new Class({
    Extends: Fx.CSS,
    initialize: function(e, t) {
        this.element = this.subject = document.id(e),
        this.parent(t)
    },
    set: function(e) {
        "string" == typeof e && (e = this.search(e));
        for (var t in e) this.render(this.element, t, e[t], this.options.unit);
        return this
    },
    compute: function(e, t, n) {
        var i = {};
        for (var r in e) i[r] = this.parent(e[r], t[r], n);
        return i
    },
    start: function(e) {
        if (!this.check(e)) return this;
        "string" == typeof e && (e = this.search(e));
        var t = {},
        n = {};
        for (var i in e) {
            var r = this.prepare(this.element, i, e[i]);
            t[i] = r.from,
            n[i] = r.to
        }
        return this.parent(t, n)
    }
}),
Element.Properties.morph = {
    set: function(e) {
        return this.get("morph").cancel().setOptions(e),
        this
    },
    get: function() {
        var e = this.retrieve("morph");
        return e || (e = new Fx.Morph(this, {
            link: "cancel"
        }), this.store("morph", e)),
        e
    }
},
Element.implement({
    morph: function(e) {
        return this.get("morph").start(e),
        this
    }
}),

function() {
    var e = function() {},
    t = "onprogress" in new Browser.Request,
    n = this.Request = new Class({
        Implements: [Chain, Events, Options, Class.Thenable],
        options: {
            url: "",
            data: "",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                Accept: "text/javascript, text/html, application/xml, text/xml, */*"
            },
            async: !0,
            format: !1,
            method: "post",
            link: "ignore",
            isSuccess: null,
            emulation: !0,
            urlEncoded: !0,
            encoding: "utf-8",
            evalScripts: !1,
            evalResponse: !1,
            timeout: 0,
            noCache: !1
        },
        initialize: function(e) {
            this.xhr = new Browser.Request,
            this.setOptions(e),
            this.headers = this.options.headers
        },
        onStateChange: function() {
            var n = this.xhr;
            4 == n.readyState && this.running && (this.running = !1, this.status = 0, Function.attempt(function() {
                var e = n.status;
                this.status = 1223 == e ? 204 : e
            }.bind(this)), n.onreadystatechange = e, t && (n.onprogress = n.onloadstart = e), this.timer && (clearTimeout(this.timer), delete this.timer), this.response = {
                text: this.xhr.responseText || "",
                xml: this.xhr.responseXML
            },
            this.options.isSuccess.call(this, this.status) ? this.success(this.response.text, this.response.xml) : this.failure())
        },
        isSuccess: function() {
            var e = this.status;
            return e >= 200 && e < 300
        },
        isRunning: function() {
            return !! this.running
        },
        processScripts: function(e) {
            return this.options.evalResponse || /(ecma|java)script/.test(this.getHeader("Content-type")) ? Browser.exec(e) : e.stripScripts(this.options.evalScripts)
        },
        success: function(e, t) {
            this.onSuccess(this.processScripts(e), t),
            this.resolve({
                text: e,
                xml: t
            })
        },
        onSuccess: function() {
            this.fireEvent("complete", arguments).fireEvent("success", arguments).callChain()
        },
        failure: function() {
            this.onFailure(),
            this.reject({
                reason: "failure",
                xhr: this.xhr
            })
        },
        onFailure: function() {
            this.fireEvent("complete").fireEvent("failure", this.xhr)
        },
        loadstart: function(e) {
            this.fireEvent("loadstart", [e, this.xhr])
        },
        progress: function(e) {
            this.fireEvent("progress", [e, this.xhr])
        },
        timeout: function() {
            this.fireEvent("timeout", this.xhr),
            this.reject({
                reason: "timeout",
                xhr: this.xhr
            })
        },
        setHeader: function(e, t) {
            return this.headers[e] = t,
            this
        },
        getHeader: function(e) {
            return Function.attempt(function() {
                return this.xhr.getResponseHeader(e)
            }.bind(this))
        },
        check: function() {
            if (!this.running) return ! 0;
            switch (this.options.link) {
            case "cancel":
                return this.cancel(),
                !0;
            case "chain":
                return this.chain(this.caller.pass(arguments, this)),
                !1
            }
            return ! 1
        },
        send: function(e) {
            if (!this.check(e)) return this;
            this.options.isSuccess = this.options.isSuccess || this.isSuccess,
            this.running = !0;
            var n = typeOf(e);
            "string" != n && "element" != n || (e = {
                data: e
            });
            var i = this.options,
            r = (e = Object.append({
                data: i.data,
                url: i.url,
                method: i.method
            },
            e)).data,
            o = String(e.url),
            s = e.method.toLowerCase();
            switch (typeOf(r)) {
            case "element":
                r = document.id(r).toQueryString();
                break;
            case "object":
            case "hash":
                r = Object.toQueryString(r)
            }
            if (this.options.format) {
                var a = "format=" + this.options.format;
                r = r ? a + "&" + r: a
            }
            if (this.options.emulation && !["get", "post"].contains(s)) {
                var l = "_method=" + s;
                r = r ? l + "&" + r: l,
                s = "post"
            }
            if (this.options.urlEncoded && ["post", "put"].contains(s)) {
                var c = this.options.encoding ? "; charset=" + this.options.encoding: "";
                this.headers["Content-type"] = "application/x-www-form-urlencoded" + c
            }
            o || (o = document.location.pathname);
            var u = o.lastIndexOf("/");
            u > -1 && (u = o.indexOf("#")) > -1 && (o = o.substr(0, u)),
            this.options.noCache && (o += (o.indexOf("?") > -1 ? "&": "?") + String.uniqueID()),
            !r || "get" != s && "delete" != s || (o += (o.indexOf("?") > -1 ? "&": "?") + r, r = null);
            var p = this.xhr;
            return t && (p.onloadstart = this.loadstart.bind(this), p.onprogress = this.progress.bind(this)),
            p.open(s.toUpperCase(), o, this.options.async, this.options.user, this.options.password),
            (this.options.user || this.options.withCredentials) && "withCredentials" in p && (p.withCredentials = !0),
            p.onreadystatechange = this.onStateChange.bind(this),
            Object.each(this.headers,
            function(e, t) {
                try {
                    p.setRequestHeader(t, e)
                } catch(n) {
                    this.fireEvent("exception", [t, e]),
                    this.reject({
                        reason: "exception",
                        xhr: p,
                        exception: n
                    })
                }
            },
            this),
            "pending" !== this.getThenableState() && this.resetThenable({
                reason: "send"
            }),
            this.fireEvent("request"),
            p.send(r),
            this.options.async ? this.options.timeout && (this.timer = this.timeout.delay(this.options.timeout, this)) : this.onStateChange(),
            this
        },
        cancel: function() {
            if (!this.running) return this;
            this.running = !1;
            var n = this.xhr;
            return n.abort(),
            this.timer && (clearTimeout(this.timer), delete this.timer),
            n.onreadystatechange = e,
            t && (n.onprogress = n.onloadstart = e),
            this.xhr = new Browser.Request,
            this.fireEvent("cancel"),
            this.reject({
                reason: "cancel",
                xhr: n
            }),
            this
        }
    }),
    i = {}; ["get", "post", "put", "delete", "patch", "head", "GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"].each(function(e) {
        i[e] = function(t) {
            var n = {
                method: e
            };
            return null != t && (n.data = t),
            this.send(n)
        }
    }),
    n.implement(i),
    Element.Properties.send = {
        set: function(e) {
            return this.get("send").cancel().setOptions(e),
            this
        },
        get: function() {
            var e = this.retrieve("send");
            return e || (e = new n({
                data: this,
                link: "cancel",
                method: this.get("method") || "post",
                url: this.get("action")
            }), this.store("send", e)),
            e
        }
    },
    Element.implement({
        send: function(e) {
            var t = this.get("send");
            return t.send({
                data: this,
                url: e || t.options.url
            }),
            this
        }
    })
} (),

Element.Properties.load = {
    set: function(e) {
        return this.get("load").cancel().setOptions(e),
        this
    },
    get: function() {
        var e = this.retrieve("load");
        return e || (e = new Request.HTML({
            data: this,
            link: "cancel",
            update: this,
            method: "get"
        }), this.store("load", e)),
        e
    }
},
Element.implement({
    load: function() {
        return this.get("load").send(Array.link(arguments, {
            data: Type.isObject,
            url: Type.isString
        })),
        this
    }
}),
"undefined" == typeof JSON && (this.JSON = {}),
JSON = new Hash({
    stringify: JSON.stringify,
    parse: JSON.parse
}),
function() {
    var special = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    escape = function(e) {
        return special[e] || "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice( - 4)
    };
    JSON.validate = function(e) {
        return e = e.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
        /^[\],:{}\s]*$/.test(e)
    },
    JSON.encode = JSON.stringify ?
    function(e) {
        return JSON.stringify(e)
    }: function(e) {
        switch (e && e.toJSON && (e = e.toJSON()), typeOf(e)) {
        case "string":
            return '"' + e.replace(/[\x00-\x1f\\"]/g, escape) + '"';
        case "array":
            return "[" + e.map(JSON.encode).clean() + "]";
        case "object":
        case "hash":
            var t = [];
            return Object.each(e,
            function(e, n) {
                var i = JSON.encode(e);
                i && t.push(JSON.encode(n) + ":" + i)
            }),
            "{" + t + "}";
        case "number":
        case "boolean":
            return "" + e;
        case "null":
            return "null"
        }
        return null
    },
    JSON.secure = !0,
    JSON.secure = !1,
    JSON.decode = function(string, secure) {
        if (!string || "string" != typeOf(string)) return null;
        if (null == secure && (secure = JSON.secure), secure) {
            if (JSON.parse) return JSON.parse(string);
            if (!JSON.validate(string)) throw new Error("JSON could not decode the input; security is enabled and the value is not secure.")
        }
        return eval("(" + string + ")")
    }
} (),
Request.JSON = new Class({
    Extends: Request,
    options: {
        secure: !0
    },
    initialize: function(e) {
        this.parent(e),
        Object.append(this.headers, {
            Accept: "application/json",
            "X-Request": "JSON"
        })
    },
    success: function(e) {
        var t;
        try {
            t = this.response.json = JSON.decode(e, this.options.secure)
        } catch(t) {
            return void this.fireEvent("error", [e, t])
        }
        null == t ? this.failure() : (this.onSuccess(t, e), this.resolve({
            json: t,
            text: e
        }))
    }
});
var Cookie = new Class({
    Implements: Options,
    options: {
        path: "/",
        domain: !1,
        duration: !1,
        secure: !1,
        document: document,
        encode: !0,
        httpOnly: !1
    },
    initialize: function(e, t) {
        this.key = e,
        this.setOptions(t)
    },
    write: function(e) {
        if (this.options.encode && (e = encodeURIComponent(e)), this.options.domain && (e += "; domain=" + this.options.domain), this.options.path && (e += "; path=" + this.options.path), this.options.duration) {
            var t = new Date;
            t.setTime(t.getTime() + 24 * this.options.duration * 60 * 60 * 1e3),
            e += "; expires=" + t.toGMTString()
        }
        return this.options.secure && (e += "; secure"),
        this.options.httpOnly && (e += "; HttpOnly"),
        this.options.document.cookie = this.key + "=" + e,
        this
    },
    read: function() {
        var e = this.options.document.cookie.match("(?:^|;)\\s*" + this.key.escapeRegExp() + "=([^;]*)");
        return e ? decodeURIComponent(e[1]) : null
    },
    dispose: function() {
        return new Cookie(this.key, Object.merge({},
        this.options, {
            duration: -1
        })).write(""),
        this
    }
});
Cookie.write = function(e, t, n) {
    return new Cookie(e, n).write(t)
},
Cookie.read = function(e) {
    return new Cookie(e).read()
},
Cookie.dispose = function(e, t) {
    return new Cookie(e, t).dispose()
},
function(e, t) {
    var n, i, r, o, s = [],
    a = t.createElement("div"),
    l = function() {
        clearTimeout(o),
        n || (Browser.loaded = n = !0, t.removeListener("DOMContentLoaded", l).removeListener("readystatechange", c), t.fireEvent("domready"), e.fireEvent("domready")),
        t = e = a = null
    },
    c = function() {
        for (var e = s.length; e--;) if (s[e]()) return l(),
        !0;
        return ! 1
    },
    u = function() {
        clearTimeout(o),
        c() || (o = setTimeout(u, 10))
    };
    t.addListener("DOMContentLoaded", l);
    var p = function() {
        try {
            return a.doScroll(),
            !0
        } catch(e) {}
        return ! 1
    };
    a.doScroll && !p() && (s.push(p), r = !0),
    t.readyState && s.push(function() {
        var e = t.readyState;
        return "loaded" == e || "complete" == e
    }),
    "onreadystatechange" in t ? t.addListener("readystatechange", c) : r = !0,
    r && u(),
    Element.Events.domready = {
        onAdd: function(e) {
            n && e.call(this)
        }
    },
    Element.Events.load = {
        base: "load",
        onAdd: function(t) {
            i && this == e && t.call(this)
        },
        condition: function() {
            return this == e && (l(), delete Element.Events.load),
            !0
        }
    },
    e.addEvent("load",
    function() {
        i = !0
    })
} (window, document),


Class.Mutators.Binds = function(e) {
    return this.prototype.initialize || this.implement("initialize",
    function() {}),
    Array.convert(e).concat(this.prototype.Binds || [])
},
Class.Mutators.initialize = function(e) {
    return function() {
        return Array.convert(this.Binds).each(function(e) {
            var t = this[e];
            t && (this[e] = t.bind(this))
        },
        this),
        e.apply(this, arguments)
    }
},
Class.Occlude = new Class({
    occlude: function(e, t) {
        var n = (t = document.id(t || this.element)).retrieve(e || this.property);
        return n && !this.occluded ? this.occluded = n: (this.occluded = !1, t.store(e || this.property, this), this.occluded)
    }
}),
Class.refactor = function(e, t) {
    return Object.each(t,
    function(t, n) {
        var i = e.prototype[n];
        i = i && i.$origin || i ||
        function() {},
        e.implement(n, "function" == typeof t ?
        function() {
            var e = this.previous;
            this.previous = i;
            var n = t.apply(this, arguments);
            return this.previous = e,
            n
        }: t)
    }),
    e
},

function() {
    Events.Pseudos = function(e, t, n) {
        var i = function(e) {
            return {
                store: e.store ?
                function(t, n) {
                    e.store("_monitorEvents:" + t, n)
                }: function(t, n) { (e._monitorEvents || (e._monitorEvents = {}))[t] = n
                },
                retrieve: e.retrieve ?
                function(t, n) {
                    return e.retrieve("_monitorEvents:" + t, n)
                }: function(t, n) {
                    return e._monitorEvents ? e._monitorEvents[t] || n: n
                }
            }
        },
        r = function(t) {
            if ( - 1 == t.indexOf(":") || !e) return null;
            for (var n = Slick.parse(t).expressions[0][0], i = n.pseudos, r = i.length, o = []; r--;) {
                var s = i[r].key,
                a = e[s];
                null != a && o.push({
                    event: n.tag,
                    value: i[r].value,
                    pseudo: s,
                    original: t,
                    listener: a
                })
            }
            return o.length ? o: null
        };
        return {
            addEvent: function(e, n, o) {
                var s = r(e);
                if (!s) return t.call(this, e, n, o);
                var a = i(this),
                l = a.retrieve(e, []),
                c = s[0].event,
                u = Array.slice(arguments, 2),
                p = n,
                h = this;
                return s.each(function(e) {
                    var t = e.listener,
                    n = p;
                    0 == t ? c += ":" + e.pseudo + "(" + e.value + ")": p = function() {
                        t.call(h, e, n, arguments, p)
                    }
                }),
                l.include({
                    type: c,
                    event: n,
                    monitor: p
                }),
                a.store(e, l),
                e != c && t.apply(this, [e, n].concat(u)),
                t.apply(this, [c, p].concat(u))
            },
            removeEvent: function(e, t) {
                if (!r(e)) return n.call(this, e, t);
                var o = i(this),
                s = o.retrieve(e);
                if (!s) return this;
                var a = Array.slice(arguments, 2);
                return n.apply(this, [e, t].concat(a)),
                s.each(function(e, i) {
                    t && e.event != t || n.apply(this, [e.type, e.monitor].concat(a)),
                    delete s[i]
                },
                this),
                o.store(e, s),
                this
            }
        }
    };
    var e = {
        once: function(e, t, n, i) {
            t.apply(this, n),
            this.removeEvent(e.event, i).removeEvent(e.original, t)
        },
        throttle: function(e, t, n) {
            t._throttled || (t.apply(this, n), t._throttled = setTimeout(function() {
                t._throttled = !1
            },
            e.value || 250))
        },
        pause: function(e, t, n) {
            clearTimeout(t._pause),
            t._pause = t.delay(e.value || 250, this, n)
        }
    };
    Events.definePseudo = function(t, n) {
        return e[t] = n,
        this
    },
    Events.lookupPseudo = function(t) {
        return e[t]
    };
    var t = Events.prototype;
    Events.implement(Events.Pseudos(e, t.addEvent, t.removeEvent)),
    ["Request", "Fx"].each(function(e) {
        this[e] && this[e].implement(Events.prototype)
    })
} (),
function() {
    var e = this.Drag = new Class({
        
        initialize: function() {
            var t = Array.link(arguments, {
                options: Type.isObject,
                element: function(e) {
                    return null != e
                }
            });
            this.element = document.id(t.element),
            
            this.handles = this.element,
            
            this.element.addEvent("touchstart")
        },
    })
} (),

Request = Class.refactor(Request, {
    options: {
        useSpinner: !1,
        spinnerOptions: {},
        spinnerTarget: !1
    },
    initialize: function(e) {
        this._send = this.send,
        this.send = function(e) {
            var t = this.getSpinner();
            return t ? t.chain(this._send.pass(e, this)).show() : this._send(e),
            this
        },
        this.previous(e)
    },
    getSpinner: function() {
        if (!this.spinner) {
            var e = document.id(this.options.spinnerTarget) || document.id(this.options.update);
            if (this.options.useSpinner && e) {
                e.set("spinner", this.options.spinnerOptions);
                var t = this.spinner = e.get("spinner"); ["complete", "exception", "cancel"].each(function(e) {
                    this.addEvent(e, t.hide.bind(t))
                },
                this)
            }
        }
        return this.spinner
    }
}),
Element.Properties.spinner = {
    set: function(e) {
        var t = this.retrieve("spinner");
        return t && t.destroy(),
        this.eliminate("spinner").store("spinner:options", e)
    },
    get: function() {
        var e = this.retrieve("spinner");
        return e || (e = new Spinner(this, this.retrieve("spinner:options")), this.store("spinner", e)),
        e
    }
},
Element.implement({
    spin: function(e) {
        return e && this.set("spinner", e),
        this.get("spinner").show(),
        this
    },
    unspin: function() {
        return this.get("spinner").hide(),
        this
    }
}),
function() {
    var e = function(e) {
        return decodeURIComponent(e.replace(/\+/g, " "))
    };
    String.implement({
        parseQueryString: function(t, n) {
            null == t && (t = !0),
            null == n && (n = !0);
            var i = this.split(/[&;]/),
            r = {};
            return i.length ? (i.each(function(i) {
                var o = i.indexOf("=") + 1,
                s = o ? i.substr(o) : "",
                a = o ? i.substr(0, o - 1).match(/([^\]\[]+|(\B)(?=\]))/g) : [i],
                l = r;
                a && (n && (s = e(s)), a.each(function(n, i) {
                    t && (n = e(n));
                    var r = l[n];
                    i < a.length - 1 ? l = l[n] = r || {}: "array" == typeOf(r) ? r.push(s) : l[n] = null != r ? [r, s] : s
                }))
            }), r) : r
        },
        cleanQueryString: function(e) {
            return this.split("&").filter(function(t) {
                var n = t.indexOf("="),
                i = n < 0 ? "": t.substr(0, n),
                r = t.substr(n + 1);
                return e ? e.call(null, i, r) : r || 0 === r
            }).join("&")
        }
    })
} (),
window.Form || (window.Form = {}),
Form.Request = new Class({
    Binds: ["onSubmit", "onFormValidate"],
    Implements: [Options, Events, Class.Occlude],
    options: {
        requestOptions: {
            evalScripts: !0,
            useSpinner: !0,
            emulation: !1,
            link: "ignore"
        },
        sendButtonClicked: !0,
        extraData: {},
        resetForm: !0
    },
    property: "form.request",
    initialize: function(e, t, n) {
        if (this.element = document.id(e), this.occlude()) return this.occluded;
        this.setOptions(n).setTarget(t).attach()
    },
    setTarget: function(e) {
        return this.target = document.id(e),
        this.request ? this.request.setOptions({
            update: this.target
        }) : this.makeRequest(),
        this
    },
    toElement: function() {
        return this.element
    },
    makeRequest: function() {
        var e = this;
        return this.request = new Request.HTML(Object.merge({
            update: this.target,
            emulation: !1,
            spinnerTarget: this.element,
            method: this.element.get("method") || "post"
        },
        this.options.requestOptions)).addEvents({
            success: function(t, n, i, r) { ["complete", "success"].each(function(o) {
                    e.fireEvent(o, [e.target, t, n, i, r])
                })
            },
            failure: function() {
                e.fireEvent("complete", arguments).fireEvent("failure", arguments)
            },
            exception: function() {
                e.fireEvent("failure", arguments)
            }
        }),
        this.attachReset()
    },
    attachReset: function() {
        return this.options.resetForm ? (this.request.addEvent("success",
        function() {
            Function.attempt(function() {
                this.element.reset()
            }.bind(this)),
            window.OverText && OverText.update()
        }.bind(this)), this) : this
    },
    attach: function(e) {
        var t = 0 != e ? "addEvent": "removeEvent";
        this.element[t]("click:relay(button, input[type=submit])", this.saveClickedButton.bind(this));
        var n = this.element.retrieve("validator");
        return n ? n[t]("onFormValidate", this.onFormValidate) : this.element[t]("submit", this.onSubmit),
        this
    },
    detach: function() {
        return this.attach(!1)
    },
    enable: function() {
        return this.attach()
    },
    disable: function() {
        return this.detach()
    },
    onFormValidate: function(e, t, n) {
        if (n) {
            var i = this.element.retrieve("validator"); (e || i && !i.options.stopOnFailure) && (n.stop(), this.send())
        }
    },
    onSubmit: function(e) {
        var t = this.element.retrieve("validator");
        if (t) return this.element.removeEvent("submit", this.onSubmit),
        t.addEvent("onFormValidate", this.onFormValidate),
        void t.validate(e);
        e && e.stop(),
        this.send()
    },
    saveClickedButton: function(e, t) {
        var n = t.get("name");
        n && this.options.sendButtonClicked && (this.options.extraData[n] = t.get("value") || !0, this.clickedCleaner = function() {
            delete this.options.extraData[n],
            this.clickedCleaner = function() {}
        }.bind(this))
    },
    clickedCleaner: function() {},
    send: function() {
        var e = this.element.toQueryString().trim(),
        t = Object.toQueryString(this.options.extraData);
        return e ? e += "&" + t: e = t,
        this.fireEvent("send", [this.element, e.parseQueryString()]),
        this.request.send({
            data: e,
            url: this.options.requestOptions.url || this.element.get("action")
        }),
        this.clickedCleaner(),
        this
    }
}),
Element.implement("formUpdate",
function(e, t) {
    var n = this.retrieve("form.request");
    return n ? (e && n.setTarget(e), t && n.setOptions(t).makeRequest()) : n = new Form.Request(this, e, t),
    n.send(),
    this
}),
function() {
    var e = function(e) {
        var t = e.options.hideInputs;
        if (window.OverText) {
            var n = [null];
            OverText.each(function(e) {
                n.include("." + e.options.labelClass)
            }),
            n && (t += n.join(", "))
        }
        return t ? e.element.getElements(t) : null
    };
    Fx.Reveal = new Class({
        Extends: Fx.Morph,
        options: {
            link: "cancel",
            styles: ["padding", "border", "margin"],
            transitionOpacity: "opacity" in document.documentElement,
            mode: "vertical",
            display: function() {
                return "tr" != this.element.get("tag") ? "block": "table-row"
            },
            opacity: 1,
            hideInputs: "opacity" in document.documentElement ? null: "select, input, textarea, object, embed"
        },
        dissolve: function() {
            if (this.hiding || this.showing)"chain" == this.options.link ? this.chain(this.dissolve.bind(this)) : "cancel" != this.options.link || this.hiding || (this.cancel(), this.dissolve());
            else if ("none" != this.element.getStyle("display")) {
                this.hiding = !0,
                this.showing = !1,
                this.hidden = !0,
                this.cssText = this.element.style.cssText;
                var t = this.element.getComputedSize({
                    styles: this.options.styles,
                    mode: this.options.mode
                });
                this.options.transitionOpacity && (t.opacity = this.options.opacity);
                var n = {};
                Object.each(t,
                function(e, t) {
                    n[t] = [e, 0]
                }),
                this.element.setStyles({
                    display: Function.convert(this.options.display).call(this),
                    overflow: "hidden"
                });
                var i = e(this);
                i && i.setStyle("visibility", "hidden"),
                this.$chain.unshift(function() {
                    this.hidden && (this.hiding = !1, this.element.style.cssText = this.cssText, this.element.setStyle("display", "none"), i && i.setStyle("visibility", "visible")),
                    this.fireEvent("hide", this.element),
                    this.callChain()
                }.bind(this)),
                this.start(n)
            } else this.callChain.delay(10, this),
            this.fireEvent("complete", this.element),
            this.fireEvent("hide", this.element);
            return this
        },
        reveal: function() {
            if (this.showing || this.hiding)"chain" == this.options.link ? this.chain(this.reveal.bind(this)) : "cancel" != this.options.link || this.showing || (this.cancel(), this.reveal());
            else if ("none" == this.element.getStyle("display")) {
                this.hiding = !1,
                this.showing = !0,
                this.hidden = !1,
                this.cssText = this.element.style.cssText;
                var t;
                this.element.measure(function() {
                    t = this.element.getComputedSize({
                        styles: this.options.styles,
                        mode: this.options.mode
                    })
                }.bind(this)),
                null != this.options.heightOverride && (t.height = this.options.heightOverride.toInt()),
                null != this.options.widthOverride && (t.width = this.options.widthOverride.toInt()),
                this.options.transitionOpacity && (this.element.setStyle("opacity", 0), t.opacity = this.options.opacity);
                var n = {
                    height: 0,
                    display: Function.convert(this.options.display).call(this)
                };
                Object.each(t,
                function(e, t) {
                    n[t] = 0
                }),
                n.overflow = "hidden",
                this.element.setStyles(n);
                var i = e(this);
                i && i.setStyle("visibility", "hidden"),
                this.$chain.unshift(function() {
                    this.element.style.cssText = this.cssText,
                    this.element.setStyle("display", Function.convert(this.options.display).call(this)),
                    this.hidden || (this.showing = !1),
                    i && i.setStyle("visibility", "visible"),
                    this.callChain(),
                    this.fireEvent("show", this.element)
                }.bind(this)),
                this.start(t)
            } else this.callChain(),
            this.fireEvent("complete", this.element),
            this.fireEvent("show", this.element);
            return this
        },
        toggle: function() {
            return "none" == this.element.getStyle("display") ? this.reveal() : this.dissolve(),
            this
        },
        cancel: function() {
            return this.parent.apply(this, arguments),
            null != this.cssText && (this.element.style.cssText = this.cssText),
            this.hiding = !1,
            this.showing = !1,
            this
        }
    }),
    Element.Properties.reveal = {
        set: function(e) {
            return this.get("reveal").cancel().setOptions(e),
            this
        },
        get: function() {
            var e = this.retrieve("reveal");
            return e || (e = new Fx.Reveal(this), this.store("reveal", e)),
            e
        }
    },
    Element.Properties.dissolve = Element.Properties.reveal,
    Element.implement({
        reveal: function(e) {
            return this.get("reveal").setOptions(e).reveal(),
            this
        },
        dissolve: function(e) {
            return this.get("reveal").setOptions(e).dissolve(),
            this
        },
        nix: function(e) {
            var t = Array.link(arguments, {
                destroy: Type.isBoolean,
                options: Type.isObject
            });
            return this.get("reveal").setOptions(e).dissolve().chain(function() {
                this[t.destroy ? "destroy": "dispose"]()
            }.bind(this)),
            this
        },
        wink: function() {
            var e = Array.link(arguments, {
                duration: Type.isNumber,
                options: Type.isObject
            }),
            t = this.get("reveal").setOptions(e.options);
            t.reveal().chain(function() { (function() {
                    t.dissolve()
                }).delay(e.duration || 2e3)
            })
        }
    })
} (),
Form.Request.Append = new Class({
    Extends: Form.Request,
    options: {
        useReveal: !0,
        revealOptions: {},
        inject: "bottom"
    },
    makeRequest: function() {
        this.request = new Request.HTML(Object.merge({
            url: this.element.get("action"),
            method: this.element.get("method") || "post",
            spinnerTarget: this.element
        },
        this.options.requestOptions, {
            evalScripts: !1
        })).addEvents({
            success: function(e, t, n, i) {
                var r, o = Elements.from(n); (r = 1 == o.length ? o[0] : new Element("div", {
                    styles: {
                        display: "none"
                    }
                }).adopt(o)).inject(this.target, this.options.inject),
                this.options.requestOptions.evalScripts && Browser.exec(i),
                this.fireEvent("beforeEffect", r);
                var s = function() {
                    this.fireEvent("success", [r, this.target, e, t, n, i])
                }.bind(this);
                this.options.useReveal ? (r.set("reveal", this.options.revealOptions).get("reveal").chain(s), r.reveal()) : s()
            }.bind(this),
            failure: function(e) {
                this.fireEvent("failure", e)
            }.bind(this)
        }),
        this.attachReset()
    }
}),
function() {
    var e = Object.prototype.hasOwnProperty;
    Object.extend({
        getFromPath: function(t, n) {
            "string" == typeof n && (n = n.split("."));
            for (var i = 0,
            r = n.length; i < r; i++) {
                if (!e.call(t, n[i])) return null;
                t = t[n[i]]
            }
            return t
        },
        cleanValues: function(e, t) {
            t = t ||
            function(e) {
                return null != e
            };
            for (var n in e) t(e[n]) || delete e[n];
            return e
        },
        erase: function(t, n) {
            return e.call(t, n) && delete t[n],
            t
        },
        run: function(e) {
            var t = Array.slice(arguments, 1);
            for (var n in e) e[n].apply && e[n].apply(e, t);
            return e
        }
    })
} (),
Fx.Elements = new Class({
    Extends: Fx.CSS,
    initialize: function(e, t) {
        this.elements = this.subject = $$(e),
        this.parent(t)
    },
    compute: function(e, t, n) {
        var i = {};
        for (var r in e) {
            var o = e[r],
            s = t[r],
            a = i[r] = {};
            for (var l in o) a[l] = this.parent(o[l], s[l], n)
        }
        return i
    },
    set: function(e) {
        for (var t in e) if (this.elements[t]) {
            var n = e[t];
            for (var i in n) this.render(this.elements[t], i, n[i], this.options.unit)
        }
        return this
    },
    start: function(e) {
        if (!this.check(e)) return this;
        var t = {},
        n = {};
        for (var i in e) if (this.elements[i]) {
            var r = e[i],
            o = t[i] = {},
            s = n[i] = {};
            for (var a in r) {
                var l = this.prepare(this.elements[i], a, r[a]);
                o[a] = l.from,
                s[a] = l.to
            }
        }
        return this.parent(t, n)
    }
}),
Fx.Accordion = new Class({
    Extends: Fx.Elements,
    options: {
        fixedHeight: !1,
        fixedWidth: !1,
        display: 0,
        show: !1,
        height: !0,
        width: !1,
        opacity: !0,
        alwaysHide: !1,
        trigger: "click",
        initialDisplayFx: !0,
        resetHeight: !0,
        keepOpen: !1
    },
    initialize: function() {
        var e = function(e) {
            return null != e
        },
        t = Array.link(arguments, {
            container: Type.isElement,
            options: Type.isObject,
            togglers: e,
            elements: e
        });
        this.parent(t.elements, t.options);
        var n = this.options,
        i = this.togglers = $$(t.togglers);
        this.previous = -1,
        this.internalChain = new Chain,
        n.alwaysHide && (this.options.link = "chain"),
        (n.show || 0 === this.options.show) && (n.display = !1, this.previous = n.show),
        n.start && (n.display = !1, n.show = !1);
        var r = this.effects = {};
        n.opacity && (r.opacity = "fullOpacity"),
        n.width && (r.width = n.fixedWidth ? "fullWidth": "offsetWidth"),
        n.height && (r.height = n.fixedHeight ? "fullHeight": "scrollHeight");
        for (var o = 0,
        s = i.length; o < s; o++) this.addSection(i[o], this.elements[o]);
        this.elements.each(function(e, t) {
            if (n.show === t) this.fireEvent("active", [i[t], e]);
            else for (var o in r) e.setStyle(o, 0)
        },
        this),
        (n.display || 0 === n.display || !1 === n.initialDisplayFx) && this.display(n.display, n.initialDisplayFx),
        !1 !== n.fixedHeight && (n.resetHeight = !1),
        this.addEvent("complete", this.internalChain.callChain.bind(this.internalChain))
    },
    addSection: function(e, t) {
        e = document.id(e),
        t = document.id(t),
        this.togglers.include(e),
        this.elements.include(t);
        var n = this.togglers,
        i = this.options,
        r = n.contains(e),
        o = n.indexOf(e),
        s = this.display.pass(o, this);
        if (e.store("accordion:display", s).addEvent(i.trigger, s), i.height && t.setStyles({
            "padding-top": 0,
            "border-top": "none",
            "padding-bottom": 0,
            "border-bottom": "none"
        }), i.width && t.setStyles({
            "padding-left": 0,
            "border-left": "none",
            "padding-right": 0,
            "border-right": "none"
        }), t.fullOpacity = 1, i.fixedWidth && (t.fullWidth = i.fixedWidth), i.fixedHeight && (t.fullHeight = i.fixedHeight), t.setStyle("overflow", "hidden"), !r) for (var a in this.effects) t.setStyle(a, 0);
        return this
    },
    removeSection: function(e, t) {
        var n = this.togglers,
        i = n.indexOf(e),
        r = this.elements[i],
        o = function() {
            n.erase(e),
            this.elements.erase(r),
            this.detach(e)
        }.bind(this);
        return this.now == i || null != t ? this.display(null != t ? t: i - 1 >= 0 ? i - 1 : 0).chain(o) : o(),
        this
    },
    detach: function(e) {
        var t = function(e) {
            e.removeEvent(this.options.trigger, e.retrieve("accordion:display"))
        }.bind(this);
        return e ? t(e) : this.togglers.each(t),
        this
    },
    display: function(e, t) {
        if (!this.check(e, t)) return this;
        var n = {},
        i = this.elements,
        r = this.options,
        o = this.effects,
        s = r.keepOpen,
        a = r.alwaysHide;
        if (null == t && (t = !0), "element" == typeOf(e) && (e = i.indexOf(e)), e == this.current && !a && !s) return this;
        if (r.resetHeight) {
            var l = i[this.current];
            if (l && !this.selfHidden) for (var c in o) l.setStyle(c, l[o[c]])
        }
        return this.timer && "chain" == r.link ? this: (null != this.current && (this.previous = this.current), this.current = e, this.selfHidden = !1, i.each(function(i, l) {
            n[l] = {};
            var c, u;
            if (!s || l == e) {
                l == e && (u = i.offsetHeight > 0 && r.height || i.offsetWidth > 0 && r.width),
                l != e ? c = !0 : (a || s) && u && (c = !0, this.selfHidden = !0),
                this.fireEvent(c ? "background": "active", [this.togglers[l], i]);
                for (var p in o) n[l][p] = c ? 0 : i[o[p]];
                t || c || !r.resetHeight || (n[l].height = "auto")
            }
        },
        this), this.internalChain.clearChain(), this.internalChain.chain(function() {
            if (r.resetHeight && !this.selfHidden) {
                var t = i[e];
                t && t.setStyle("height", "auto")
            }
        }.bind(this)), t ? this.start(n) : this.set(n).internalChain.callChain())
    }
});
var Accordion = new Class({
    Extends: Fx.Accordion,
    initialize: function() {
        this.parent.apply(this, arguments);
        var e = Array.link(arguments, {
            container: Type.isElement
        });
        this.container = e.container
    },
    addSection: function(e, t, n) {
        e = document.id(e),
        t = document.id(t);
        var i = this.togglers.contains(e),
        r = this.togglers.length;
        return ! r || i && !n ? this.container && !i && (e.inject(this.container), t.inject(this.container)) : (n = null != n ? n: r - 1, e.inject(this.togglers[n], "before"), t.inject(e, "after")),
        this.parent.apply(this, arguments)
    }
});
Request.JSONP = new Class({
    Implements: [Chain, Events, Options],
    options: {
        onRequest: function(e) {
            this.options.log && window.console && console.log && console.log("JSONP retrieving script with url:" + e)
        },
        onError: function(e) {
            this.options.log && window.console && console.warn && console.warn("JSONP " + e + " will fail in Internet Explorer, which enforces a 2083 bytes length limit on URIs")
        },
        url: "",
        callbackKey: "callback",
        injectScript: document.head,
        data: "",
        link: "ignore",
        timeout: 0,
        log: !1
    },
    initialize: function(e) {
        this.setOptions(e)
    },
    send: function(e) {
        if (!Request.prototype.check.call(this, e)) return this;
        this.running = !0;
        var t = typeOf(e);
        "string" != t && "element" != t || (e = {
            data: e
        });
        var n = (e = Object.merge(this.options, e || {})).data;
        switch (typeOf(n)) {
        case "element":
            n = document.id(n).toQueryString();
            break;
        case "object":
        case "hash":
            n = Object.toQueryString(n)
        }
        var i = this.index = Request.JSONP.counter++,
        r = "request_" + i,
        o = e.url + (e.url.test("\\?") ? "&": "?") + e.callbackKey + "=Request.JSONP.request_map.request_" + i + (n ? "&" + n: "");
        o.length > 2083 && this.fireEvent("error", o),
        Request.JSONP.request_map[r] = function() {
            delete Request.JSONP.request_map[r],
            this.success(arguments, i)
        }.bind(this);
        var s = this.getScript(o).inject(e.injectScript);
        return this.fireEvent("request", [o, s]),
        e.timeout && this.timeout.delay(e.timeout, this),
        this
    },
    getScript: function(e) {
        return this.script || (this.script = new Element("script", {
            type: "text/javascript",
            async: !0,
            src: e
        })),
        this.script
    },
    success: function(e) {
        this.running && this.clear().fireEvent("complete", e).fireEvent("success", e).callChain()
    },
    cancel: function() {
        return this.running && this.clear().fireEvent("cancel"),
        this
    },
    isRunning: function() {
        return !! this.running
    },
    clear: function() {
        return this.running = !1,
        this.script && (this.script.destroy(), this.script = null),
        this
    },
    timeout: function() {
        return this.running && (this.running = !1, this.fireEvent("timeout", [this.script.get("src"), this.script]).fireEvent("failure").cancel()),
        this
    }
}),
Request.JSONP.counter = 0,
Request.JSONP.request_map = {},
Array.implement({
    min: function() {
        return Math.min.apply(null, this)
    },
    max: function() {
        return Math.max.apply(null, this)
    },
    average: function() {
        return this.length ? this.sum() / this.length: 0
    },
    sum: function() {
        var e = 0,
        t = this.length;
        if (t) for (; t--;) null != this[t] && (e += parseFloat(this[t]));
        return e
    },
    unique: function() {
        return [].combine(this)
    },
    shuffle: function() {
        for (var e = this.length; e && --e;) {
            var t = this[e],
            n = Math.floor(Math.random() * (e + 1));
            this[e] = this[n],
            this[n] = t
        }
        return this
    },
    reduce: function(e, t) {
        for (var n = 0,
        i = this.length; n < i; n++) n in this && (t = void 0 === t ? this[n] : e.call(null, t, this[n], n, this));
        return t
    },
    reduceRight: function(e, t) {
        for (var n = this.length; n--;) n in this && (t = void 0 === t ? this[n] : e.call(null, t, this[n], n, this));
        return t
    },
    pluck: function(e) {
        return this.map(function(t) {
            return t[e]
        })
    }
}),
function() {
    var e = this.Asset = {
        javascript: function(e, t) {
            t || (t = {});
            var n = new Element("script", {
                src: e,
                type: "text/javascript"
            }),
            i = t.document || document,
            r = t.onload || t.onLoad;
            return delete t.onload,
            delete t.onLoad,
            delete t.document,
            r && (n.addEventListener ? n.addEvent("load", r) : n.addEvent("readystatechange",
            function() { ["loaded", "complete"].contains(this.readyState) && r.call(this)
            })),
            n.set(t).inject(i.head)
        },
        css: function(e, t) {
            t || (t = {});
            var n = t.onload || t.onLoad,
            i = t.document || document,
            r = t.timeout || 3e3; ["onload", "onLoad", "document"].each(function(e) {
                delete t[e]
            });
            var o = new Element("link", {
                type: "text/css",
                rel: "stylesheet",
                media: "screen",
                href: e
            }).setProperties(t).inject(i.head);
            if (n) {
                var s = !1,
                a = 0,
                l = function() {
                    for (var e = document.styleSheets,
                    t = 0; t < e.length; t++) {
                        var i = e[t],
                        c = i.ownerNode ? i.ownerNode: i.owningElement;
                        if (c && c == o) return s = !0,
                        n.call(o)
                    }
                    if (a++, !s && a < r / 50) return setTimeout(l, 50)
                };
                setTimeout(l, 0)
            }
            return o
        },
        image: function(e, t) {
            t || (t = {});
            var n = new Image,
            i = document.id(n) || new Element("img");
            return ["load", "abort", "error"].each(function(e) {
                var r = "on" + e,
                o = "on" + e.capitalize(),
                s = t[r] || t[o] ||
                function() {};
                delete t[o],
                delete t[r],
                n[r] = function() {
                    n && (i.parentNode || (i.width = n.width, i.height = n.height), n = n.onload = n.onabort = n.onerror = null, s.delay(1, i, i), i.fireEvent(e, i, 1))
                }
            }),
            n.src = i.src = e,
            n && n.complete && n.onload.delay(1),
            i.set(t)
        },
        images: function(t, n) {
            t = Array.convert(t);
            var i = function() {},
            r = 0;
            return n = Object.merge({
                onComplete: i,
                onProgress: i,
                onError: i,
                properties: {}
            },
            n),
            new Elements(t.map(function(i, o) {
                return e.image(i, Object.append(n.properties, {
                    onload: function() {
                        r++,
                        n.onProgress.call(this, r, o, i),
                        r == t.length && n.onComplete()
                    },
                    onerror: function() {
                        r++,
                        n.onError.call(this, r, o, i),
                        r == t.length && n.onComplete()
                    }
                }))
            }))
        }
    }
} (),
function(e) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = e();
    else {
        if ("function" == typeof define && define.amd) return define([], e); (this || window).CodeMirror = e()
    }
} (function() {
    function e(t, n) {
        if (! (this instanceof e)) return new e(t, n);
        this.options = n = n ? Ai(n) : {},
        Ai(zr, n, !1),
        p(n);
        var i = n.value;
        "string" == typeof i && (i = new lo(i, n.mode, null, n.lineSeparator)),
        this.doc = i;
        var r = new e.inputStyles[n.inputStyle](this),
        s = this.display = new
        function(e, t, n) {
            var i = this;
            this.input = n,
            i.scrollbarFiller = Ii("div", null, "CodeMirror-scrollbar-filler"),
            i.scrollbarFiller.setAttribute("cm-not-content", "true"),
            i.gutterFiller = Ii("div", null, "CodeMirror-gutter-filler"),
            i.gutterFiller.setAttribute("cm-not-content", "true"),
            i.lineDiv = Ii("div", null, "CodeMirror-code"),
            i.selectionDiv = Ii("div", null, null, "position: relative; z-index: 1"),
            i.cursorDiv = Ii("div", null, "CodeMirror-cursors"),
            i.measure = Ii("div", null, "CodeMirror-measure"),
            i.lineMeasure = Ii("div", null, "CodeMirror-measure"),
            i.lineSpace = Ii("div", [i.measure, i.lineMeasure, i.selectionDiv, i.cursorDiv, i.lineDiv], null, "position: relative; outline: none"),
            i.mover = Ii("div", [Ii("div", [i.lineSpace], "CodeMirror-lines")], null, "position: relative"),
            i.sizer = Ii("div", [i.mover], "CodeMirror-sizer"),
            i.sizerWidth = null,
            i.heightForcer = Ii("div", null, null, "position: absolute; height: " + xo + "px; width: 1px;"),
            i.gutters = Ii("div", null, "CodeMirror-gutters"),
            i.lineGutter = null,
            i.scroller = Ii("div", [i.sizer, i.heightForcer, i.gutters], "CodeMirror-scroll"),
            i.scroller.setAttribute("tabIndex", "-1"),
            i.wrapper = Ii("div", [i.scrollbarFiller, i.gutterFiller, i.scroller], "CodeMirror"),
            ir && rr < 8 && (i.gutters.style.zIndex = -1, i.scroller.style.paddingRight = 0);
            or || er && fr || (i.scroller.draggable = !0);
            e && (e.appendChild ? e.appendChild(i.wrapper) : e(i.wrapper));
            i.viewFrom = i.viewTo = t.first,
            i.reportedViewFrom = i.reportedViewTo = t.first,
            i.view = [],
            i.renderedView = null,
            i.externalMeasured = null,
            i.viewOffset = 0,
            i.lastWrapHeight = i.lastWrapWidth = 0,
            i.updateLineNumbers = null,
            i.nativeBarWidth = i.barHeight = i.barWidth = 0,
            i.scrollbarsClipped = !1,
            i.lineNumWidth = i.lineNumInnerWidth = i.lineNumChars = null,
            i.alignWidgets = !1,
            i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null,
            i.maxLine = null,
            i.maxLineLength = 0,
            i.maxLineChanged = !1,
            i.wheelDX = i.wheelDY = i.wheelStartX = i.wheelStartY = null,
            i.shift = !1,
            i.selForContextMenu = null,
            i.activeTouch = null,
            n.init(i)
        } (t, i, r);
        s.wrapper.CodeMirror = this,
        a(this),
        o(this),
        n.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"),
        n.autofocus && !fr && s.input.focus(),
        y(this),
        this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            delayingBlurEvent: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: !1,
            cutIncoming: !1,
            selectingText: !1,
            draggingText: !1,
            highlight: new _i,
            keySeq: null,
            specialChars: null
        };
        var l = this;
        ir && rr < 11 && setTimeout(function() {
            l.display.input.reset(!0)
        },
        20),
        function(e) {
            function t() {
                i.activeTouch && (r = setTimeout(function() {
                    i.activeTouch = null
                },
                1e3), (o = i.activeTouch).end = +new Date)
            }
            function n(e, t) {
                if (null == t.left) return ! 0;
                var n = t.left - e.left,
                i = t.top - e.top;
                return n * n + i * i > 400
            }
            var i = e.display;
            
            i.dragFunctions = {
                enter: function(t) {
                    vi(e, t) || fo(t)
                },
                over: function(t) {
                    vi(e, t) || (!
                    function(e, t) {
                        var n = gt(e, t);
                        if (!n) return;
                        var i = document.createDocumentFragment();
                        ke(e, n, i),
                        e.display.dragCursor || (e.display.dragCursor = Ii("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv));
                        Ni(e.display.dragCursor, i)
                    } (e, t), fo(t))
                },
                start: function(t) { !
                    function(e, t) {
                        if (ir && (!e.state.draggingText || +new Date - Lr < 100)) return void fo(t);
                        if (vi(e, t) || mt(e.display, t)) return;
                        if (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !cr) {
                            var n = Ii("img", null, null, "position: fixed; left: 0; top: 0;");
                            n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                            lr && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop),
                            t.dataTransfer.setDragImage(n, 0, 0),
                            lr && n.parentNode.removeChild(n)
                        }
                    } (e, t)
                },
                drop: rt(e, wt),
                leave: function(t) {
                    vi(e, t) || _t(e)
                }
            };
            var s = i.input.getField();
        } (this),
        function() {
            if (zo) return; (function() {
                var e;
            })(),
            zo = !0
        } (),
        tt(this),
        this.curOp.forceUpdate = !0,
        Un(this, i),
        n.autofocus && !fr || l.hasFocus() ? setTimeout(Oi(Pt, this), 20) : Rt(this);
        for (var c in Wr) Wr.hasOwnProperty(c) && Wr[c](this, n[c], $r);
        x(this),
        n.finishInit && n.finishInit(this);
        for (var u = 0; u < qr.length; ++u) qr[u](this);
        nt(this),
        or && n.lineWrapping && "optimizelegibility" == getComputedStyle(s.lineDiv).textRendering && (s.lineDiv.style.textRendering = "auto")
    }
    function t(t) {
        t.doc.mode = e.getMode(t.options, t.doc.modeOption),
        n(t)
    }
    function n(e) {
        e.doc.iter(function(e) {
            e.stateAfter && (e.stateAfter = null),
            e.styles && (e.styles = null)
        }),
        e.doc.frontier = e.doc.first,
        Ce(e, 100),
        e.state.modeGen++,
        e.curOp && ct(e)
    }
    function i(e) {
        var t = Ze(e.display),
        n = e.options.lineWrapping,
        i = n && Math.max(5, e.display.scroller.clientWidth / et(e.display) - 3);
        return function(r) {
            if (Sn(e.doc, r)) return 0;
            var o = 0;
            if (r.widgets) for (var s = 0; s < r.widgets.length; s++) r.widgets[s].height && (o += r.widgets[s].height);
            return n ? o + (Math.ceil(r.text.length / i) || 1) * t: o + t
        }
    }
    function r(e) {
        var t = e.doc,
        n = i(e);
        t.iter(function(e) {
            var t = n(e);
            t != e.height && Xn(e, t)
        })
    }
    function o(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"),
        Fe(e)
    }
    function s(e) {
        a(e),
        ct(e),
        setTimeout(function() {
            b(e)
        },
        20)
    }
    function a(e) {
        var t = e.display.gutters,
        n = e.options.gutters;
        ji(t);
        for (var i = 0; i < n.length; ++i) {
            var r = n[i],
            o = t.appendChild(Ii("div", null, "CodeMirror-gutter " + r));
            "CodeMirror-linenumbers" == r && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px")
        }
        t.style.display = i ? "": "none",
        l(e)
    }
    function l(e) {
        var t = e.display.gutters.offsetWidth;
        e.display.sizer.style.marginLeft = t + "px"
    }
    function c(e) {
        if (0 == e.height) return 0;
        for (var t, n = e.text.length,
        i = e; t = vn(i);) {
            i = (r = t.find(0, !0)).from.line,
            n += r.from.ch - r.to.ch
        }
        for (i = e; t = bn(i);) {
            var r = t.find(0, !0);
            n -= i.text.length - r.from.ch,
            n += (i = r.to.line).text.length - r.to.ch
        }
        return n
    }
    function u(e) {
        var t = e.display,
        n = e.doc;
        t.maxLine = Vn(n, n.first),
        t.maxLineLength = c(t.maxLine),
        t.maxLineChanged = !0,
        n.iter(function(e) {
            var n = c(e);
            n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e)
        })
    }
    function p(e) {
        var t = Ci(e.gutters, "CodeMirror-linenumbers"); - 1 == t && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), e.gutters.splice(t, 1))
    }
    function h(e) {
        var t = e.display,
        n = t.gutters.offsetWidth,
        i = Math.round(e.doc.height + Ae(e.display));
        return {
            clientHeight: t.scroller.clientHeight,
            viewHeight: t.wrapper.clientHeight,
            scrollWidth: t.scroller.scrollWidth,
            clientWidth: t.scroller.clientWidth,
            viewWidth: t.wrapper.clientWidth,
            barLeft: e.options.fixedGutter ? n: 0,
            docHeight: i,
            scrollHeight: i + Le(e) + t.barHeight,
            nativeBarWidth: t.nativeBarWidth,
            gutterWidth: n
        }
    }
    function f(e, t, n) {
        this.cm = n;
        var i = this.vert = Ii("div", [Ii("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
        r = this.horiz = Ii("div", [Ii("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        e(i),
        e(r),
        this.checkedZeroWidth = !1,
        ir && rr < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
    }
    function d() {}
    function y(t) {
        t.display.scrollbars && (t.display.scrollbars.clear(), t.display.scrollbars.addClass && No(t.display.wrapper, t.display.scrollbars.addClass)),
        t.display.scrollbars = new e.scrollbarModel[t.options.scrollbarStyle](function(e) {
            t.display.wrapper.insertBefore(e, t.display.scrollbarFiller),
            e.setAttribute("cm-not-content", "true")
        },
        function(e, n) {
            "horizontal" == n ? St(t, e) : kt(t, e)
        },
        t),
        t.display.scrollbars.addClass && Do(t.display.wrapper, t.display.scrollbars.addClass)
    }
    function m(e, t) {
        t || (t = h(e));
        var n = e.display.barWidth,
        i = e.display.barHeight;
        g(e, t);
        for (var r = 0; r < 4 && n != e.display.barWidth || i != e.display.barHeight; r++) n != e.display.barWidth && e.options.lineWrapping && M(e),
        g(e, h(e)),
        n = e.display.barWidth,
        i = e.display.barHeight
    }
    function g(e, t) {
        var n = e.display,
        i = n.scrollbars.update(t);
        n.sizer.style.paddingRight = (n.barWidth = i.right) + "px",
        n.sizer.style.paddingBottom = (n.barHeight = i.bottom) + "px",
        n.heightForcer.style.borderBottom = i.bottom + "px solid transparent",
        i.right && i.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = i.bottom + "px", n.scrollbarFiller.style.width = i.right + "px") : n.scrollbarFiller.style.display = "",
        i.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = i.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = ""
    }
    function v(e, t, n) {
        var i = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
        i = Math.floor(i - Me(e));
        var r = n && null != n.bottom ? n.bottom: i + e.wrapper.clientHeight,
        o = Yn(t, i),
        s = Yn(t, r);
        if (n && n.ensure) {
            var a = n.ensure.from.line,
            l = n.ensure.to.line;
            a < o ? (o = a, s = Yn(t, Zn(Vn(t, a)) + e.wrapper.clientHeight)) : Math.min(l, t.lastLine()) >= s && (o = Yn(t, Zn(Vn(t, l)) - e.wrapper.clientHeight), s = l)
        }
        return {
            from: o,
            to: Math.max(s, o + 1)
        }
    }
    function b(e) {
        var t = e.display,
        n = t.view;
        if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
            for (var i = _(t) - t.scroller.scrollLeft + e.doc.scrollLeft, r = t.gutters.offsetWidth, o = i + "px", s = 0; s < n.length; s++) if (!n[s].hidden) {
                e.options.fixedGutter && (n[s].gutter && (n[s].gutter.style.left = o), n[s].gutterBackground && (n[s].gutterBackground.style.left = o));
                var a = n[s].alignable;
                if (a) for (var l = 0; l < a.length; l++) a[l].style.left = o
            }
            e.options.fixedGutter && (t.gutters.style.left = i + r + "px")
        }
    }
    function x(e) {
        if (!e.options.lineNumbers) return ! 1;
        var t = e.doc,
        n = w(e.options, t.first + t.size - 1),
        i = e.display;
        if (n.length != i.lineNumChars) {
            var r = i.measure.appendChild(Ii("div", [Ii("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
            o = r.firstChild.offsetWidth,
            s = r.offsetWidth - o;
            return i.lineGutter.style.width = "",
            i.lineNumInnerWidth = Math.max(o, i.lineGutter.offsetWidth - s) + 1,
            i.lineNumWidth = i.lineNumInnerWidth + s,
            i.lineNumChars = i.lineNumInnerWidth ? n.length: -1,
            i.lineGutter.style.width = i.lineNumWidth + "px",
            l(e),
            !0
        }
        return ! 1
    }
    function w(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber))
    }
    function _(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
    }
    function k(e, t, n) {
        var i = e.display;
        this.viewport = t,
        this.visible = v(i, e.doc, t),
        this.editorIsHidden = !i.wrapper.offsetWidth,
        this.wrapperHeight = i.wrapper.clientHeight,
        this.wrapperWidth = i.wrapper.clientWidth,
        this.oldDisplayWidth = Pe(e),
        this.force = n,
        this.dims = O(e),
        this.events = []
    }
    function S(e, t) {
        var n = e.display,
        i = e.doc;
        if (t.editorIsHidden) return pt(e),
        !1;
        if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == dt(e)) return ! 1;
        x(e) && (pt(e), t.dims = O(e));
        var r = i.first + i.size,
        o = Math.max(t.visible.from - e.options.viewportMargin, i.first),
        s = Math.min(r, t.visible.to + e.options.viewportMargin);
        n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(i.first, n.viewFrom)),
        n.viewTo > s && n.viewTo - s < 20 && (s = Math.min(r, n.viewTo)),
        wr && (o = _n(e.doc, o), s = kn(e.doc, s));
        var a = o != n.viewFrom || s != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth; !
        function(e, t, n) {
            var i = e.display;
            0 == i.view.length || t >= i.viewTo || n <= i.viewFrom ? (i.view = lt(e, t, n), i.viewFrom = t) : (i.viewFrom > t ? i.view = lt(e, t, i.viewFrom).concat(i.view) : i.viewFrom < t && (i.view = i.view.slice(ht(e, t))), i.viewFrom = t, i.viewTo < n ? i.view = i.view.concat(lt(e, i.viewTo, n)) : i.viewTo > n && (i.view = i.view.slice(0, ht(e, n))));
            i.viewTo = n
        } (e, o, s),
        n.viewOffset = Zn(Vn(e.doc, n.viewFrom)),
        e.display.mover.style.top = n.viewOffset + "px";
        var l = dt(e);
        if (!a && 0 == l && !t.force && n.renderedView == n.view && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo)) return ! 1;
        var c = Di();
        return l > 4 && (n.lineDiv.style.display = "none"),
        function(e, t, n) {
            function i(t) {
                var n = t.nextSibling;
                return or && dr && e.display.currentWheelTarget == t ? t.style.display = "none": t.parentNode.removeChild(t),
                n
            }
            var r = e.display,
            o = e.options.lineNumbers,
            s = r.lineDiv,
            a = s.firstChild;
            for (var l = r.view,
            c = r.viewFrom,
            u = 0; u < l.length; u++) {
                var p = l[u];
                if (p.hidden);
                else if (p.node && p.node.parentNode == s) {
                    for (; a != p.node;) a = i(a);
                    var h = o && null != t && t <= c && p.lineNumber;
                    p.changes && (Ci(p.changes, "gutter") > -1 && (h = !1), L(e, p, c, n)),
                    h && (ji(p.lineNumber), p.lineNumber.appendChild(document.createTextNode(w(e.options, c)))),
                    a = p.node.nextSibling
                } else {
                    var f = function(e, t, n, i) {
                        var r = R(e, t);
                        t.text = t.node = r.pre,
                        r.bgClass && (t.bgClass = r.bgClass);
                        r.textClass && (t.textClass = r.textClass);
                        return I(t),
                        j(e, t, n, i),
                        N(e, t, i),
                        t.node
                    } (e, p, c, n);
                    s.insertBefore(f, a)
                }
                c += p.size
            }
            for (; a;) a = i(a)
        } (e, n.updateLineNumbers, t.dims),
        l > 4 && (n.lineDiv.style.display = ""),
        n.renderedView = n.view,
        c && Di() != c && c.offsetHeight && c.focus(),
        ji(n.cursorDiv),
        ji(n.selectionDiv),
        n.gutters.style.height = n.sizer.style.minHeight = 0,
        a && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, Ce(e, 400)),
        n.updateLineNumbers = null,
        !0
    }
    function C(e, t) {
        for (var n = t.viewport,
        i = !0; (i && e.options.lineWrapping && t.oldDisplayWidth != Pe(e) || (n && null != n.top && (n = {
            top: Math.min(e.doc.height + Ae(e.display) - Re(e), n.top)
        }), t.visible = v(e.display, e.doc, n), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && S(e, t); i = !1) {
            M(e);
            var r = h(e);
            we(e),
            m(e, r),
            E(e, r)
        }
        t.signal(e, "update", e),
        e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
    }
    function T(e, t) {
        var n = new k(e, t);
        if (S(e, n)) {
            M(e),
            C(e, n);
            var i = h(e);
            we(e),
            m(e, i),
            E(e, i),
            n.finish()
        }
    }
    function E(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px",
        e.display.heightForcer.style.top = t.docHeight + "px",
        e.display.gutters.style.height = t.docHeight + e.display.barHeight + Le(e) + "px"
    }
    function M(e) {
        for (var t = e.display,
        n = t.lineDiv.offsetTop,
        i = 0; i < t.view.length; i++) {
            var r, o = t.view[i];
            if (!o.hidden) {
                if (ir && rr < 8) {
                    var s = o.node.offsetTop + o.node.offsetHeight;
                    r = s - n,
                    n = s
                } else {
                    var a = o.node.getBoundingClientRect();
                    r = a.bottom - a.top
                }
                var l = o.line.height - r;
                if (r < 2 && (r = Ze(t)), (l > .001 || l < -.001) && (Xn(o.line, r), A(o.line), o.rest)) for (var c = 0; c < o.rest.length; c++) A(o.rest[c])
            }
        }
    }
    function A(e) {
        if (e.widgets) for (var t = 0; t < e.widgets.length; ++t) e.widgets[t].height = e.widgets[t].node.parentNode.offsetHeight
    }
    function O(e) {
        for (var t = e.display,
        n = {},
        i = {},
        r = t.gutters.clientLeft,
        o = t.gutters.firstChild,
        s = 0; o; o = o.nextSibling, ++s) n[e.options.gutters[s]] = o.offsetLeft + o.clientLeft + r,
        i[e.options.gutters[s]] = o.clientWidth;
        return {
            fixedPos: _(t),
            gutterTotalWidth: t.gutters.offsetWidth,
            gutterLeft: n,
            gutterWidth: i,
            wrapperWidth: t.wrapper.clientWidth
        }
    }
    function L(e, t, n, i) {
        for (var r = 0; r < t.changes.length; r++) {
            var o = t.changes[r];
            "text" == o ?
            function(e, t) {
                var n = t.text.className,
                i = R(e, t);
                t.text == t.node && (t.node = i.pre);
                t.text.parentNode.replaceChild(i.pre, t.text),
                t.text = i.pre,
                i.bgClass != t.bgClass || i.textClass != t.textClass ? (t.bgClass = i.bgClass, t.textClass = i.textClass, I(t)) : n && (t.text.className = n)
            } (e, t) : "gutter" == o ? j(e, t, n, i) : "class" == o ? I(t) : "widget" == o &&
            function(e, t, n) {
                t.alignable && (t.alignable = null);
                for (var i = t.node.firstChild; i; i = r) {
                    var r = i.nextSibling;
                    "CodeMirror-linewidget" == i.className && t.node.removeChild(i)
                }
                N(e, t, n)
            } (e, t, i)
        }
        t.changes = null
    }
    function P(e) {
        return e.node == e.text && (e.node = Ii("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), ir && rr < 8 && (e.node.style.zIndex = 2)),
        e.node
    }
    function R(e, t) {
        var n = e.display.externalMeasured;
        return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : zn(e, t)
    }
    function I(e) { !
        function(e) {
            var t = e.bgClass ? e.bgClass + " " + (e.line.bgClass || "") : e.line.bgClass;
            if (t && (t += " CodeMirror-linebackground"), e.background) t ? e.background.className = t: (e.background.parentNode.removeChild(e.background), e.background = null);
            else if (t) {
                var n = P(e);
                e.background = n.insertBefore(Ii("div", null, t), n.firstChild)
            }
        } (e),
        e.line.wrapClass ? P(e).className = e.line.wrapClass: e.node != e.text && (e.node.className = "");
        var t = e.textClass ? e.textClass + " " + (e.line.textClass || "") : e.line.textClass;
        e.text.className = t || ""
    }
    function j(e, t, n, i) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
            o = P(t);
            t.gutterBackground = Ii("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? i.fixedPos: -i.gutterTotalWidth) + "px; width: " + i.gutterTotalWidth + "px"),
            o.insertBefore(t.gutterBackground, t.text)
        }
        var r = t.line.gutterMarkers;
        if (e.options.lineNumbers || r) {
            var o = P(t),
            s = t.gutter = Ii("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? i.fixedPos: -i.gutterTotalWidth) + "px");
            if (e.display.input.setUneditable(s), o.insertBefore(s, t.text), t.line.gutterClass && (s.className += " " + t.line.gutterClass), !e.options.lineNumbers || r && r["CodeMirror-linenumbers"] || (t.lineNumber = s.appendChild(Ii("div", w(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + i.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), r) for (var a = 0; a < e.options.gutters.length; ++a) {
                var l = e.options.gutters[a],
                c = r.hasOwnProperty(l) && r[l];
                c && s.appendChild(Ii("div", [c], "CodeMirror-gutter-elt", "left: " + i.gutterLeft[l] + "px; width: " + i.gutterWidth[l] + "px"))
            }
        }
    }
    function N(e, t, n) {
        if (D(e, t.line, t, n, !0), t.rest) for (var i = 0; i < t.rest.length; i++) D(e, t.rest[i], t, n, !1)
    }
    function D(e, t, n, i, r) {
        if (t.widgets) for (var o = P(n), s = 0, a = t.widgets; s < a.length; ++s) {
            var l = a[s],
            c = Ii("div", [l.node], "CodeMirror-linewidget");
            l.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"),
            function(e, t, n, i) {
                if (e.noHScroll) { (n.alignable || (n.alignable = [])).push(t);
                    var r = i.wrapperWidth;
                    t.style.left = i.fixedPos + "px",
                    e.coverGutter || (r -= i.gutterTotalWidth, t.style.paddingLeft = i.gutterTotalWidth + "px"),
                    t.style.width = r + "px"
                }
                e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -i.gutterTotalWidth + "px"))
            } (l, c, n, i),
            e.display.input.setUneditable(c),
            r && l.above ? o.insertBefore(c, n.gutter || n.text) : o.appendChild(c),
            mi(l, "redraw")
        }
    }
    function z(e) {
        return _r(e.line, e.ch)
    }
    function W(e, t) {
        return kr(e, t) < 0 ? t: e
    }
    function $(e, t) {
        return kr(e, t) < 0 ? e: t
    }
    function B(e) {
        e.state.focused || (e.display.input.focus(), Pt(e))
    }
    function H(e, t, n, i, r) {
        var o = e.doc;
        e.display.shift = !1,
        i || (i = o.sel);
        var s = e.state.pasteIncoming || "paste" == r,
        a = o.splitLines(t),
        l = null;
        if (s && i.ranges.length > 1) if (Sr && Sr.text.join("\n") == t) {
            if (i.ranges.length % Sr.text.length == 0) {
                l = [];
                for (c = 0; c < Sr.text.length; c++) l.push(o.splitLines(Sr.text[c]))
            }
        } else a.length == i.ranges.length && (l = Ti(a,
        function(e) {
            return [e]
        }));
        for (var c = i.ranges.length - 1; c >= 0; c--) {
            var u = i.ranges[c],
            p = u.from(),
            h = u.to();
            u.empty() && (n && n > 0 ? p = _r(p.line, p.ch - n) : e.state.overwrite && !s ? h = _r(h.line, Math.min(Vn(o, h.line).text.length, h.ch + Si(a).length)) : Sr && Sr.lineWise && Sr.text.join("\n") == t && (p = h = _r(p.line, 0)));
            var f = e.curOp.updateInput,
            d = {
                from: p,
                to: h,
                text: l ? l[c % l.length] : a,
                origin: r || (s ? "paste": e.state.cutIncoming ? "cut": "+input")
            };
            Wt(e.doc, d),
            mi(e, "inputRead", e, d)
        }
        t && !s && q(e, t),
        Vt(e),
        e.curOp.updateInput = f,
        e.curOp.typing = !0,
        e.state.pasteIncoming = e.state.cutIncoming = !1
    }
    function F(e, t) {
        var n = e.clipboardData && e.clipboardData.getData("Text");
        if (n) return e.preventDefault(),
        t.isReadOnly() || t.options.disableInput || it(t,
        function() {
            H(t, n, 0, null, "paste")
        }),
        !0
    }
    function q(e, t) {
        if (e.options.electricChars && e.options.smartIndent) for (var n = e.doc.sel,
        i = n.ranges.length - 1; i >= 0; i--) {
            var r = n.ranges[i];
            if (! (r.head.ch > 100 || i && n.ranges[i - 1].head.line == r.head.line)) {
                var o = e.getModeAt(r.head),
                s = !1;
                if (o.electricChars) {
                    for (var a = 0; a < o.electricChars.length; a++) if (t.indexOf(o.electricChars.charAt(a)) > -1) {
                        s = Jt(e, r.head.line, "smart");
                        break
                    }
                } else o.electricInput && o.electricInput.test(Vn(e.doc, r.head.line).text.slice(0, r.head.ch)) && (s = Jt(e, r.head.line, "smart"));
                s && mi(e, "electricInput", e, r.head.line)
            }
        }
    }
    function K(e) {
        for (var t = [], n = [], i = 0; i < e.doc.sel.ranges.length; i++) {
            var r = e.doc.sel.ranges[i].head.line,
            o = {
                anchor: _r(r, 0),
                head: _r(r + 1, 0)
            };
            n.push(o),
            t.push(e.getRange(o.anchor, o.head))
        }
        return {
            text: t,
            ranges: n
        }
    }
    function U(e, t) {
        e.setAttribute("autocorrect", "off"),
        e.setAttribute("autocapitalize", "off"),
        e.setAttribute("spellcheck", !!t)
    }
    function V(e) {
        this.cm = e,
        this.prevInput = "",
        this.pollingFast = !1,
        this.polling = new _i,
        this.inaccurateSelection = !1,
        this.hasSelection = !1,
        this.composing = null
    }
    function G() {
        var e = Ii("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
        t = Ii("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return or ? e.style.width = "1000px": e.setAttribute("wrap", "off"),
        hr && (e.style.border = "1px solid black"),
        U(e),
        t
    }
    function J(e) {
        this.cm = e,
        this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null,
        this.polling = new _i,
        this.gracePeriod = !1
    }
    function X(e, t) {
        var n = Ne(e, t.line);
        if (!n || n.hidden) return null;
        var i = Vn(e.doc, t.line),
        r = Ie(n, i, t.line),
        o = ei(i),
        s = "left";
        if (o) {
            s = Gi(o, t.ch) % 2 ? "right": "left"
        }
        var a = We(r.map, t.ch, s);
        return a.offset = "right" == a.collapse ? a.end: a.start,
        a
    }
    function Q(e, t) {
        return t && (e.bad = !0),
        e
    }
    function Y(e, t, n) {
        var i;
        if (t == e.display.lineDiv) {
            if (! (i = e.display.lineDiv.childNodes[n])) return Q(e.clipPos(_r(e.display.viewTo - 1)), !0);
            t = null,
            n = 0
        } else for (i = t;; i = i.parentNode) {
            if (!i || i == e.display.lineDiv) return null;
            if (i.parentNode && i.parentNode == e.display.lineDiv) break
        }
        for (var r = 0; r < e.display.view.length; r++) {
            var o = e.display.view[r];
            if (o.node == i) return function(e, t, n) {
                function i(t, n, i) {
                    for (var r = -1; r < (u ? u.length: 0); r++) for (var o = r < 0 ? c.map: u[r], s = 0; s < o.length; s += 3) {
                        var a = o[s + 2];
                        if (a == t || a == n) {
                            var l = Qn(r < 0 ? e.line: e.rest[r]),
                            p = o[s] + i;
                            return (i < 0 || a != t) && (p = o[s + (i ? 1 : 0)]),
                            _r(l, p)
                        }
                    }
                }
                var r = e.text.firstChild,
                o = !1;
                if (!t || !Ro(r, t)) return Q(_r(Qn(e.line), 0), !0);
                if (t == r && (o = !0, t = r.childNodes[n], n = 0, !t)) {
                    var s = e.rest ? Si(e.rest) : e.line;
                    return Q(_r(Qn(s), s.text.length), o)
                }
                var a = 3 == t.nodeType ? t: null,
                l = t;
                a || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (a = t.firstChild, n && (n = a.nodeValue.length));
                for (; l.parentNode != r;) l = l.parentNode;
                var c = e.measure,
                u = c.maps;
                var p = i(a, l, n);
                if (p) return Q(p, o);
                for (var h = l.nextSibling,
                f = a ? a.nodeValue.length - n: 0; h; h = h.nextSibling) {
                    if (p = i(h, h.firstChild, 0)) return Q(_r(p.line, p.ch - f), o);
                    f += h.textContent.length
                }
                for (var d = l.previousSibling,
                f = n; d; d = d.previousSibling) {
                    if (p = i(d, d.firstChild, -1)) return Q(_r(p.line, p.ch + f), o);
                    f += d.textContent.length
                }
            } (o, t, n)
        }
    }
    function Z(e, t) {
        this.ranges = e,
        this.primIndex = t
    }
    function ee(e, t) {
        this.anchor = e,
        this.head = t
    }
    function te(e, t) {
        var n = e[t];
        e.sort(function(e, t) {
            return kr(e.from(), t.from())
        }),
        t = Ci(e, n);
        for (var i = 1; i < e.length; i++) {
            var r = e[i],
            o = e[i - 1];
            if (kr(o.to(), r.from()) >= 0) {
                var s = $(o.from(), r.from()),
                a = W(o.to(), r.to()),
                l = o.empty() ? r.from() == r.head: o.from() == o.head;
                i <= t && --t,
                e.splice(--i, 2, new ee(l ? a: s, l ? s: a))
            }
        }
        return new Z(e, t)
    }
    function ne(e, t) {
        return new Z([new ee(e, t || e)], 0)
    }
    function ie(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1))
    }
    function re(e, t) {
        if (t.line < e.first) return _r(e.first, 0);
        var n = e.first + e.size - 1;
        return t.line > n ? _r(n, Vn(e, n).text.length) : function(e, t) {
            var n = e.ch;
            return null == n || n > t ? _r(e.line, t) : n < 0 ? _r(e.line, 0) : e
        } (t, Vn(e, t.line).text.length)
    }
    function oe(e, t) {
        return t >= e.first && t < e.first + e.size
    }
    function se(e, t) {
        for (var n = [], i = 0; i < t.length; i++) n[i] = re(e, t[i]);
        return n
    }
    function ae(e, t, n, i) {
        if (e.cm && e.cm.display.shift || e.extend) {
            var r = t.anchor;
            if (i) {
                var o = kr(n, r) < 0;
                o != kr(i, r) < 0 ? (r = n, n = i) : o != kr(n, i) < 0 && (n = i)
            }
            return new ee(r, n)
        }
        return new ee(i || n, n)
    }
    function le(e, t, n, i) {
        fe(e, new Z([ae(e, e.sel.primary(), t, n)], 0), i)
    }
    function ce(e, t, n) {
        for (var i = [], r = 0; r < e.sel.ranges.length; r++) i[r] = ae(e, e.sel.ranges[r], t[r], null);
        fe(e, te(i, e.sel.primIndex), n)
    }
    function ue(e, t, n, i) {
        var r = e.sel.ranges.slice(0);
        r[t] = n,
        fe(e, te(r, e.sel.primIndex), i)
    }
    function pe(e, t, n, i) {
        fe(e, ne(t, n), i)
    }
    function he(e, t, n) {
        var i = e.history.done,
        r = Si(i);
        r && r.ranges ? (i[i.length - 1] = t, de(e, t, n)) : fe(e, t, n)
    }
    function fe(e, t, n) {
        de(e, t, n),
        function(e, t, n, i) {
            var r = e.history,
            o = i && i.origin;
            n == r.lastSelOp || o && r.lastSelOrigin == o && (r.lastModTime == r.lastSelTime && r.lastOrigin == o ||
            function(e, t, n, i) {
                var r = t.charAt(0);
                return "*" == r || "+" == r && n.ranges.length == i.ranges.length && n.somethingSelected() == i.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay: 500)
            } (e, o, Si(r.done), t)) ? r.done[r.done.length - 1] = t: oi(t, r.done);
            r.lastSelTime = +new Date,
            r.lastSelOrigin = o,
            r.lastSelOp = n,
            i && !1 !== i.clearRedo && ii(r.undone)
        } (e, e.sel, e.cm ? e.cm.curOp.id: NaN, n)
    }
    function de(e, t, n) { (xi(e, "beforeSelectionChange") || e.cm && xi(e.cm, "beforeSelectionChange")) && (t = function(e, t, n) {
            var i = {
                ranges: t.ranges,
                update: function(t) {
                    this.ranges = [];
                    for (var n = 0; n < t.length; n++) this.ranges[n] = new ee(re(e, t[n].anchor), re(e, t[n].head))
                },
                origin: n && n.origin
            };
            return vo(e, "beforeSelectionChange", e, i),
            e.cm && vo(e.cm, "beforeSelectionChange", e.cm, i),
            i.ranges != t.ranges ? te(i.ranges, i.ranges.length - 1) : t
        } (e, t, n));
        ye(e, ge(e, t, n && n.bias || (kr(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1), !0)),
        n && !1 === n.scroll || !e.cm || Vt(e.cm)
    }
    function ye(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0, bi(e.cm)), mi(e, "cursorActivity", e))
    }
    function me(e) {
        ye(e, ge(e, e.sel, null, !1))
    }
    function ge(e, t, n, i) {
        for (var r, o = 0; o < t.ranges.length; o++) {
            var s = t.ranges[o],
            a = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
            l = be(e, s.anchor, a && a.anchor, n, i),
            c = be(e, s.head, a && a.head, n, i); (r || l != s.anchor || c != s.head) && (r || (r = t.ranges.slice(0, o)), r[o] = new ee(l, c))
        }
        return r ? te(r, t.primIndex) : t
    }
    function ve(e, t, n, i, r) {
        var o = Vn(e, t.line);
        if (o.markedSpans) for (var s = 0; s < o.markedSpans.length; ++s) {
            var a = o.markedSpans[s],
            l = a.marker;
            if ((null == a.from || (l.inclusiveLeft ? a.from <= t.ch: a.from < t.ch)) && (null == a.to || (l.inclusiveRight ? a.to >= t.ch: a.to > t.ch))) {
                if (r && (vo(l, "beforeCursorEnter"), l.explicitlyCleared)) {
                    if (o.markedSpans) {--s;
                        continue
                    }
                    break
                }
                if (!l.atomic) continue;
                if (n) {
                    var c, u = l.find(i < 0 ? 1 : -1);
                    if ((i < 0 ? l.inclusiveRight: l.inclusiveLeft) && (u = xe(e, u, -i, u && u.line == t.line ? o: null)), u && u.line == t.line && (c = kr(u, n)) && (i < 0 ? c < 0 : c > 0)) return ve(e, u, t, i, r)
                }
                var p = l.find(i < 0 ? -1 : 1);
                return (i < 0 ? l.inclusiveLeft: l.inclusiveRight) && (p = xe(e, p, i, p.line == t.line ? o: null)),
                p ? ve(e, p, t, i, r) : null
            }
        }
        return t
    }
    function be(e, t, n, i, r) {
        var o = i || 1,
        s = ve(e, t, n, o, r) || !r && ve(e, t, n, o, !0) || ve(e, t, n, -o, r) || !r && ve(e, t, n, -o, !0);
        return s || (e.cantEdit = !0, _r(e.first, 0))
    }
    function xe(e, t, n, i) {
        return n < 0 && 0 == t.ch ? t.line > e.first ? re(e, _r(t.line - 1)) : null: n > 0 && t.ch == (i || Vn(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? _r(t.line + 1, 0) : null: new _r(t.line, t.ch + n)
    }
    function we(e) {
        e.display.input.showSelection(e.display.input.prepareSelection())
    }
    function _e(e, t) {
        for (var n = e.doc,
        i = {},
        r = i.cursors = document.createDocumentFragment(), o = i.selection = document.createDocumentFragment(), s = 0; s < n.sel.ranges.length; s++) if (!1 !== t || s != n.sel.primIndex) {
            var a = n.sel.ranges[s];
            if (! (a.from().line >= e.display.viewTo || a.to().line < e.display.viewFrom)) {
                var l = a.empty(); (l || e.options.showCursorWhenSelecting) && ke(e, a.head, r),
                l ||
                function(e, t, n) {
                    function i(e, t, n, i) {
                        t < 0 && (t = 0),
                        t = Math.round(t),
                        i = Math.round(i),
                        a.appendChild(Ii("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (null == n ? u - e: n) + "px; height: " + (i - t) + "px"))
                    }
                    function r(t, n, r) {
                        function o(n, i) {
                            return Ge(e, _r(t, n), "div", p, i)
                        }
                        var a, l, p = Vn(s, t),
                        h = p.text.length;
                        return function(e, t, n, i) {
                            if (!e) return i(t, n, "ltr");
                            for (var r = !1,
                            o = 0; o < e.length; ++o) {
                                var s = e[o]; (s.from < n && s.to > t || t == n && s.to == t) && (i(Math.max(s.from, t), Math.min(s.to, n), 1 == s.level ? "rtl": "ltr"), r = !0)
                            }
                            r || i(t, n, "ltr")
                        } (ei(p), n || 0, null == r ? h: r,
                        function(e, t, s) {
                            var p, f, d, y = o(e, "left");
                            if (e == t) p = y,
                            f = d = y.left;
                            else {
                                if (p = o(t - 1, "right"), "rtl" == s) {
                                    var m = y;
                                    y = p,
                                    p = m
                                }
                                f = y.left,
                                d = p.right
                            }
                            null == n && 0 == e && (f = c),
                            p.top - y.top > 3 && (i(f, y.top, null, y.bottom), f = c, y.bottom < p.top && i(f, y.bottom, null, p.top)),
                            null == r && t == h && (d = u),
                            (!a || y.top < a.top || y.top == a.top && y.left < a.left) && (a = y),
                            (!l || p.bottom > l.bottom || p.bottom == l.bottom && p.right > l.right) && (l = p),
                            f < c + 1 && (f = c),
                            i(f, p.top, d - f, p.bottom)
                        }),
                        {
                            start: a,
                            end: l
                        }
                    }
                    var o = e.display,
                    s = e.doc,
                    a = document.createDocumentFragment(),
                    l = Oe(e.display),
                    c = l.left,
                    u = Math.max(o.sizerWidth, Pe(e) - o.sizer.offsetLeft) - l.right;
                    var p = t.from(),
                    h = t.to();
                    if (p.line == h.line) r(p.line, p.ch, h.ch);
                    else {
                        var f = Vn(s, p.line),
                        d = Vn(s, h.line),
                        y = wn(f) == wn(d),
                        m = r(p.line, p.ch, y ? f.text.length + 1 : null).end,
                        g = r(h.line, y ? 0 : null, h.ch).start;
                        y && (m.top < g.top - 2 ? (i(m.right, m.top, null, m.bottom), i(c, g.top, g.left, g.bottom)) : i(m.right, m.top, g.left - m.right, m.bottom)),
                        m.bottom < g.top && i(c, m.bottom, null, g.top)
                    }
                    n.appendChild(a)
                } (e, a, o)
            }
        }
        return i
    }
    function ke(e, t, n) {
        var i = Je(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
        r = n.appendChild(Ii("div", " ", "CodeMirror-cursor"));
        if (r.style.left = i.left + "px", r.style.top = i.top + "px", r.style.height = Math.max(0, i.bottom - i.top) * e.options.cursorHeight + "px", i.other) {
            var o = n.appendChild(Ii("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
            o.style.display = "",
            o.style.left = i.other.left + "px",
            o.style.top = i.other.top + "px",
            o.style.height = .85 * (i.other.bottom - i.other.top) + "px"
        }
    }
    function Se(e) {
        if (e.state.focused) {
            var t = e.display;
            clearInterval(t.blinker);
            var n = !0;
            t.cursorDiv.style.visibility = "",
            e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
                t.cursorDiv.style.visibility = (n = !n) ? "": "hidden"
            },
            e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
        }
    }
    function Ce(e, t) {
        e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(t, Oi(Te, e))
    }
    function Te(e) {
        var t = e.doc;
        if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.viewTo)) {
            var n = +new Date + e.options.workTime,
            i = Ur(t.mode, Ee(e, t.frontier)),
            r = [];
            t.iter(t.frontier, Math.min(t.first + t.size, e.display.viewTo + 500),
            function(o) {
                if (t.frontier >= e.display.viewFrom) {
                    var s = o.styles,
                    a = o.text.length > e.options.maxHighlightLength,
                    l = In(e, o, a ? Ur(t.mode, i) : i, !0);
                    o.styles = l.styles;
                    var c = o.styleClasses,
                    u = l.classes;
                    u ? o.styleClasses = u: c && (o.styleClasses = null);
                    for (var p = !s || s.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), h = 0; ! p && h < s.length; ++h) p = s[h] != o.styles[h];
                    p && r.push(t.frontier),
                    o.stateAfter = a ? i: Ur(t.mode, i)
                } else o.text.length <= e.options.maxHighlightLength && Nn(e, o.text, i),
                o.stateAfter = t.frontier % 5 == 0 ? Ur(t.mode, i) : null;
                if (++t.frontier, +new Date > n) return Ce(e, e.options.workDelay),
                !0
            }),
            r.length && it(e,
            function() {
                for (var t = 0; t < r.length; t++) ut(e, r[t], "text")
            })
        }
    }
    function Ee(e, t, n) {
        var i = e.doc,
        r = e.display;
        if (!i.mode.startState) return ! 0;
        var o = function(e, t, n) {
            for (var i, r, o = e.doc,
            s = n ? -1 : t - (e.doc.mode.innerMode ? 1e3: 100), a = t; a > s; --a) {
                if (a <= o.first) return o.first;
                var l = Vn(o, a - 1);
                if (l.stateAfter && (!n || a <= o.frontier)) return a;
                var c = Co(l.text, null, e.options.tabSize); (null == r || i > c) && (r = a - 1, i = c)
            }
            return r
        } (e, t, n),
        s = o > i.first && Vn(i, o - 1).stateAfter;
        return s = s ? Ur(i.mode, s) : Vr(i.mode),
        i.iter(o, t,
        function(n) {
            Nn(e, n.text, s);
            var a = o == t - 1 || o % 5 == 0 || o >= r.viewFrom && o < r.viewTo;
            n.stateAfter = a ? Ur(i.mode, s) : null,
            ++o
        }),
        n && (i.frontier = o),
        s
    }
    function Me(e) {
        return e.lineSpace.offsetTop
    }
    function Ae(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight
    }
    function Oe(e) {
        if (e.cachedPaddingH) return e.cachedPaddingH;
        var t = Ni(e.measure, Ii("pre", "x")),
        n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
        i = {
            left: parseInt(n.paddingLeft),
            right: parseInt(n.paddingRight)
        };
        return isNaN(i.left) || isNaN(i.right) || (e.cachedPaddingH = i),
        i
    }
    function Le(e) {
        return xo - e.display.nativeBarWidth
    }
    function Pe(e) {
        return e.display.scroller.clientWidth - Le(e) - e.display.barWidth
    }
    function Re(e) {
        return e.display.scroller.clientHeight - Le(e) - e.display.barHeight
    }
    function Ie(e, t, n) {
        if (e.line == t) return {
            map: e.measure.map,
            cache: e.measure.cache
        };
        for (i = 0; i < e.rest.length; i++) if (e.rest[i] == t) return {
            map: e.measure.maps[i],
            cache: e.measure.caches[i]
        };
        for (var i = 0; i < e.rest.length; i++) if (Qn(e.rest[i]) > n) return {
            map: e.measure.maps[i],
            cache: e.measure.caches[i],
            before: !0
        }
    }
    function je(e, t, n, i) {
        return ze(e, De(e, t), n, i)
    }
    function Ne(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[ht(e, t)];
        var n = e.display.externalMeasured;
        return n && t >= n.lineN && t < n.lineN + n.size ? n: void 0
    }
    function De(e, t) {
        var n = Qn(t),
        i = Ne(e, n);
        i && !i.text ? i = null: i && i.changes && (L(e, i, n, O(e)), e.curOp.forceUpdate = !0),
        i || (i = function(e, t) {
            var n = Qn(t = wn(t)),
            i = e.display.externalMeasured = new at(e.doc, t, n);
            i.lineN = n;
            var r = i.built = zn(e, i);
            return i.text = r.pre,
            Ni(e.display.lineMeasure, r.pre),
            i
        } (e, t));
        var r = Ie(i, t, n);
        return {
            line: t,
            view: i,
            rect: null,
            map: r.map,
            cache: r.cache,
            before: r.before,
            hasHeights: !1
        }
    }
    function ze(e, t, n, i, r) {
        t.before && (n = -1);
        var o, s = n + (i || "");
        return t.cache.hasOwnProperty(s) ? o = t.cache[s] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (!
        function(e, t, n) {
            var i = e.options.lineWrapping,
            r = i && Pe(e);
            if (!t.measure.heights || i && t.measure.width != r) {
                var o = t.measure.heights = [];
                if (i) {
                    t.measure.width = r;
                    for (var s = t.text.firstChild.getClientRects(), a = 0; a < s.length - 1; a++) {
                        var l = s[a],
                        c = s[a + 1];
                        Math.abs(l.bottom - c.bottom) > 2 && o.push((l.bottom + c.top) / 2 - n.top)
                    }
                }
                o.push(n.bottom - n.top)
            }
        } (e, t.view, t.rect), t.hasHeights = !0), (o = function(e, t, n, i) {
            var r, o = We(t.map, n, i),
            s = o.node,
            a = o.start,
            l = o.end,
            c = o.collapse;
            if (3 == s.nodeType) {
                for (m = 0; m < 4; m++) {
                    for (; a && Ri(t.line.text.charAt(o.coverStart + a));)--a;
                    for (; o.coverStart + l < o.coverEnd && Ri(t.line.text.charAt(o.coverStart + l));)++l;
                    l = a,
                    a -= 1,
                    c = "right"
                }
                ir && rr < 11 && (r = function(e, t) {
                    if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !
                    function(e) {
                        if (null != Fo) return Fo;
                        var t = Ni(e, Ii("span", "x")),
                        n = t.getBoundingClientRect(),
                        i = Ao(t, 0, 1).getBoundingClientRect();
                        return Fo = Math.abs(n.left - i.left) > 1
                    } (e)) return t;
                    var n = screen.logicalXDPI / screen.deviceXDPI,
                    i = screen.logicalYDPI / screen.deviceYDPI;
                    return {
                        left: t.left * n,
                        right: t.right * n,
                        top: t.top * i,
                        bottom: t.bottom * i
                    }
                } (e.display.measure, r))
            } else {
                a > 0 && (c = i = "right");
                var u;
                r = e.options.lineWrapping && (u = s.getClientRects()).length > 1 ? u["right" == i ? u.length - 1 : 0] : s.getBoundingClientRect()
            }
            if (ir && rr < 9 && !a && (!r || !r.left && !r.right)) {
                var p = s.parentNode.getClientRects()[0];
                r = p ? {
                    left: p.left,
                    right: p.left + et(e.display),
                    top: p.top,
                    bottom: p.bottom
                }: Mr
            }
            
            e.options.singleCursorHeightPerLine || (b.rtop = h, b.rbottom = f);
            return b
        } (e, t, n, i)).bogus || (t.cache[s] = o)),
        {
            left: o.left,
            right: o.right,
            top: r ? o.rtop: o.top,
            bottom: r ? o.rbottom: o.bottom
        }
    }
    function We(e, t, n) {
        for (var i, r, o, s, a = 0; a < e.length; a += 3) {
            var l = e[a],
            c = e[a + 1];
            if (t < l ? (r = 0, o = 1, s = "left") : t < c ? o = (r = t - l) + 1 : (a == e.length - 3 || t == c && e[a + 3] > t) && (r = (o = c - l) - 1, t >= c && (s = "right")), null != r) {
                if (i = e[a + 2], l == c && n == (i.insertLeft ? "left": "right") && (s = n), "left" == n && 0 == r) for (; a && e[a - 2] == e[a - 3] && e[a - 1].insertLeft;) i = e[2 + (a -= 3)],
                s = "left";
                if ("right" == n && r == c - l) for (; a < e.length - 3 && e[a + 3] == e[a + 4] && !e[a + 5].insertLeft;) i = e[(a += 3) + 2],
                s = "right";
                break
            }
        }
        return {
            node: i,
            start: r,
            end: o,
            collapse: s,
            coverStart: l,
            coverEnd: c
        }
    }
    function $e(e, t) {
        var n = Mr;
        if ("left" == t) for (i = 0; i < e.length && (n = e[i]).left == n.right; i++);
        else for (var i = e.length - 1; i >= 0 && (n = e[i]).left == n.right; i--);
        return n
    }
    function Be(e) {
        if (e.measure && (e.measure.cache = {},
        e.measure.heights = null, e.rest)) for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
    }
    function He(e) {
        e.display.externalMeasure = null,
        ji(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++) Be(e.display.view[t])
    }
    function Fe(e) {
        He(e),
        e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null,
        e.options.lineWrapping || (e.display.maxLineChanged = !0),
        e.display.lineNumChars = null
    }
    function qe() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }
    function Ke() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
    }
    function Ue(e, t, n, i) {
        if (t.widgets) for (var r = 0; r < t.widgets.length; ++r) if (t.widgets[r].above) {
            var o = En(t.widgets[r]);
            n.top += o,
            n.bottom += o
        }
        if ("line" == i) return n;
        i || (i = "local");
        var s = Zn(t);
        if ("local" == i ? s += Me(e.display) : s -= e.display.viewOffset, "page" == i || "window" == i) {
            var a = e.display.lineSpace.getBoundingClientRect();
            s += a.top + ("window" == i ? 0 : Ke());
            var l = a.left + ("window" == i ? 0 : qe());
            n.left += l,
            n.right += l
        }
        return n.top += s,
        n.bottom += s,
        n
    }
    function Ve(e, t, n) {
        if ("div" == n) return t;
        var i = t.left,
        r = t.top;
        if ("page" == n) i -= qe(),
        r -= Ke();
        else if ("local" == n || !n) {
            var o = e.display.sizer.getBoundingClientRect();
            i += o.left,
            r += o.top
        }
        var s = e.display.lineSpace.getBoundingClientRect();
        return {
            left: i - s.left,
            top: r - s.top
        }
    }
    function Ge(e, t, n, i, r) {
        return i || (i = Vn(e.doc, t.line)),
        Ue(e, i, je(e, i, t.ch, r), n)
    }
    function Je(e, t, n, i, r, o) {
        function s(t, s) {
            var a = ze(e, r, t, s ? "right": "left", o);
            return s ? a.left = a.right: a.right = a.left,
            Ue(e, i, a, n)
        }
        function a(e, t) {
            var n = l[t],
            i = n.level % 2;
            return e == Bi(n) && t && n.level < l[t - 1].level ? (e = Hi(n = l[--t]) - (n.level % 2 ? 0 : 1), i = !0) : e == Hi(n) && t < l.length - 1 && n.level < l[t + 1].level && (e = Bi(n = l[++t]) - n.level % 2, i = !1),
            i && e == n.to && e > n.from ? s(e - 1) : s(e, i)
        }
        i = i || Vn(e.doc, t.line),
        r || (r = De(e, i));
        var l = ei(i),
        c = t.ch;
        if (!l) return s(c);
        var u = a(c, Gi(l, c));
        return null != Ko && (u.other = a(c, Ko)),
        u
    }
    function Xe(e, t) {
        var n = 0,
        t = re(e.doc, t);
        e.options.lineWrapping || (n = et(e.display) * t.ch);
        var i = Vn(e.doc, t.line),
        r = Zn(i) + Me(e.display);
        return {
            left: n,
            right: n,
            top: r,
            bottom: r + i.height
        }
    }
    function Qe(e, t, n, i) {
        var r = _r(e, t);
        return r.xRel = i,
        n && (r.outside = !0),
        r
    }
    function Ye(e, t, n) {
        var i = e.doc;
        if ((n += e.display.viewOffset) < 0) return Qe(i.first, 0, !0, -1);
        var r = Yn(i, n),
        o = i.first + i.size - 1;
        if (r > o) return Qe(i.first + i.size - 1, Vn(i, o).text.length, !0, 1);
        t < 0 && (t = 0);
        for (var s = Vn(i, r);;) {
            var a = function(e, t, n, i, r) {
                function o(i) {
                    var r = Je(e, _r(n, i), "line", t, c);
                    return a = !0,
                    s > r.bottom ? r.left - l: s < r.top ? r.left + l: (a = !1, r.left)
                }
                var s = r - Zn(t),
                a = !1,
                l = 2 * e.display.wrapper.clientWidth,
                c = De(e, t);
                var u = ei(t),
                p = t.text.length,
                h = Fi(t),
                f = qi(t),
                d = o(h),
                y = a,
                m = o(f),
                g = a;
                if (i > m) return Qe(n, f, g, 1);
                for (;;) {
                    if (u ? f == h || f == Xi(t, h, 1) : f - h <= 1) {
                        var v = i < d || i - d <= m - i ? h: f,
                        b = v == h ? y: g,
                        x = i - (v == h ? d: m);
                        if (g && !u && !/\s/.test(t.text.charAt(v)) && x > 0 && v < t.text.length && c.view.measure.heights.length > 1) {
                            var w = ze(e, c, v, "right");
                            s <= w.bottom && s >= w.top && Math.abs(i - w.right) < x && (b = !1, v++, x = i - w.right)
                        }
                        for (; Ri(t.text.charAt(v));)++v;
                        return Qe(n, v, b, x < -1 ? -1 : x > 1 ? 1 : 0)
                    }
                    var _ = Math.ceil(p / 2),
                    k = h + _;
                    if (u) {
                        k = h;
                        for (var S = 0; S < _; ++S) k = Xi(t, k, 1)
                    }
                    var C = o(k);
                    C > i ? (f = k, m = C, (g = a) && (m += 1e3), p = _) : (h = k, d = C, y = a, p -= _)
                }
            } (e, s, r, t, n),
            l = bn(s),
            c = l && l.find(0, !0);
            if (!l || !(a.ch > c.from.ch || a.ch == c.from.ch && a.xRel > 0)) return a;
            r = Qn(s = c.to.line)
        }
    }
    function Ze(e) {
        if (null != e.cachedTextHeight) return e.cachedTextHeight;
        if (null == Cr) {
            Cr = Ii("pre");
            for (var t = 0; t < 49; ++t) Cr.appendChild(document.createTextNode("x")),
            Cr.appendChild(Ii("br"));
            Cr.appendChild(document.createTextNode("x"))
        }
        Ni(e.measure, Cr);
        var n = Cr.offsetHeight / 50;
        return n > 3 && (e.cachedTextHeight = n),
        ji(e.measure),
        n || 1
    }
    function et(e) {
        if (null != e.cachedCharWidth) return e.cachedCharWidth;
        var t = Ii("span", "xxxxxxxxxx"),
        n = Ii("pre", [t]);
        Ni(e.measure, n);
        var i = t.getBoundingClientRect(),
        r = (i.right - i.left) / 10;
        return r > 2 && (e.cachedCharWidth = r),
        r || 10
    }
    function tt(e) {
        e.curOp = {
            cm: e,
            viewChanged: !1,
            startHeight: e.doc.height,
            forceUpdate: !1,
            updateInput: null,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++Or
        },
        Ar ? Ar.ops.push(e.curOp) : e.curOp.ownsGroup = Ar = {
            ops: [e.curOp],
            delayedCallbacks: []
        }
    }
    function nt(e) {
        var t = e.curOp.ownsGroup;
        if (t) try { !
            function(e) {
                var t = e.delayedCallbacks,
                n = 0;
                do {
                    for (; n < t.length; n++) t[n].call(null);
                    for (var i = 0; i < e.ops.length; i++) {
                        var r = e.ops[i];
                        if (r.cursorActivityHandlers) for (; r.cursorActivityCalled < r.cursorActivityHandlers.length;) r.cursorActivityHandlers[r.cursorActivityCalled++].call(null, r.cm)
                    }
                } while ( n < t . length )
            } (t)
        } finally {
            Ar = null;
            for (var n = 0; n < t.ops.length; n++) t.ops[n].cm.curOp = null; !
            function(e) {
                for (var t = e.ops,
                n = 0; n < t.length; n++) !
                function(e) {
                    var t = e.cm,
                    n = t.display; (function(e) {
                        var t = e.display; ! t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Le(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Le(e) + "px", t.scrollbarsClipped = !0)
                    })(t),
                    e.updateMaxLine && u(t);
                    e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping,
                    e.update = e.mustUpdate && new k(t, e.mustUpdate && {
                        top: e.scrollTop,
                        ensure: e.scrollToPos
                    },
                    e.forceUpdate)
                } (t[n]);
                for (n = 0; n < t.length; n++) !
                function(e) {
                    e.updatedDisplay = e.mustUpdate && S(e.cm, e.update)
                } (t[n]);
                for (n = 0; n < t.length; n++) !
                function(e) {
                    var t = e.cm,
                    n = t.display;
                    e.updatedDisplay && M(t);
                    e.barMeasure = h(t),
                    n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = je(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + Le(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Pe(t))); (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection(e.focus))
                } (t[n]);
                for (n = 0; n < t.length; n++) !
                function(e) {
                    var t = e.cm;
                    null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && St(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
                    var n = e.focus && e.focus == Di() && (!document.hasFocus || document.hasFocus());
                    e.updatedDisplay && E(t, e.barMeasure);
                    e.selectionChanged && Se(t);
                    t.state.focused && e.updateInput && t.display.input.reset(e.typing);
                    n && B(e.cm)
                } (t[n]);
                for (n = 0; n < t.length; n++) !
                function(e) {
                    var t = e.cm,
                    n = t.display,
                    i = t.doc;
                    e.updatedDisplay && C(t, e.update);
                    null == n.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (n.wheelStartX = n.wheelStartY = null);
                    null == e.scrollTop || n.scroller.scrollTop == e.scrollTop && !e.forceScroll || (i.scrollTop = Math.max(0, Math.min(n.scroller.scrollHeight - n.scroller.clientHeight, e.scrollTop)), n.scrollbars.setScrollTop(i.scrollTop), n.scroller.scrollTop = i.scrollTop);
                    null == e.scrollLeft || n.scroller.scrollLeft == e.scrollLeft && !e.forceScroll || (i.scrollLeft = Math.max(0, Math.min(n.scroller.scrollWidth - n.scroller.clientWidth, e.scrollLeft)), n.scrollbars.setScrollLeft(i.scrollLeft), n.scroller.scrollLeft = i.scrollLeft, b(t));
                    if (e.scrollToPos) {
                        var r = function(e, t, n, i) {
                            null == i && (i = 0);
                            for (var r = 0; r < 5; r++) {
                                var o = !1,
                                s = Je(e, t),
                                a = n && n != t ? Je(e, n) : s,
                                l = Kt(e, Math.min(s.left, a.left), Math.min(s.top, a.top) - i, Math.max(s.left, a.left), Math.max(s.bottom, a.bottom) + i),
                                c = e.doc.scrollTop,
                                u = e.doc.scrollLeft;
                                if (null != l.scrollTop && (kt(e, l.scrollTop), Math.abs(e.doc.scrollTop - c) > 1 && (o = !0)), null != l.scrollLeft && (St(e, l.scrollLeft), Math.abs(e.doc.scrollLeft - u) > 1 && (o = !0)), !o) break
                            }
                            return s
                        } (t, re(i, e.scrollToPos.from), re(i, e.scrollToPos.to), e.scrollToPos.margin);
                        e.scrollToPos.isCursor && t.state.focused &&
                        function(e, t) {
                            if (vi(e, "scrollCursorIntoView")) return;
                            var n = e.display,
                            i = n.sizer.getBoundingClientRect(),
                            r = null;
                            t.top + i.top < 0 ? r = !0 : t.bottom + i.top > (window.innerHeight || document.documentElement.clientHeight) && (r = !1);
                            if (null != r && !pr) {
                                var o = Ii("div", "​", null, "position: absolute; top: " + (t.top - n.viewOffset - Me(e.display)) + "px; height: " + (t.bottom - t.top + Le(e) + n.barHeight) + "px; left: " + t.left + "px; width: 2px;");
                                e.display.lineSpace.appendChild(o),
                                o.scrollIntoView(r),
                                e.display.lineSpace.removeChild(o)
                            }
                        } (t, r)
                    }
                    var o = e.maybeHiddenMarkers,
                    s = e.maybeUnhiddenMarkers;
                    if (o) for (a = 0; a < o.length; ++a) o[a].lines.length || vo(o[a], "hide");
                    if (s) for (var a = 0; a < s.length; ++a) s[a].lines.length && vo(s[a], "unhide");
                    n.wrapper.offsetHeight && (i.scrollTop = t.display.scroller.scrollTop);
                    e.changeObjs && vo(t, "changes", t, e.changeObjs);
                    e.update && e.update.finish()
                } (t[n])
            } (t)
        }
    }
    function it(e, t) {
        if (e.curOp) return t();
        tt(e);
        try {
            return t()
        } finally {
            nt(e)
        }
    }
    function rt(e, t) {
        return function() {
            if (e.curOp) return t.apply(e, arguments);
            tt(e);
            try {
                return t.apply(e, arguments)
            } finally {
                nt(e)
            }
        }
    }
    function ot(e) {
        return function() {
            if (this.curOp) return e.apply(this, arguments);
            tt(this);
            try {
                return e.apply(this, arguments)
            } finally {
                nt(this)
            }
        }
    }
    function st(e) {
        return function() {
            var t = this.cm;
            if (!t || t.curOp) return e.apply(this, arguments);
            tt(t);
            try {
                return e.apply(this, arguments)
            } finally {
                nt(t)
            }
        }
    }
    function at(e, t, n) {
        this.line = t,
        this.rest = function(e) {
            var t, n;
            for (; t = bn(e);) e = t.find(1, !0).line,
            (n || (n = [])).push(e);
            return n
        } (t),
        this.size = this.rest ? Qn(Si(this.rest)) - n + 1 : 1,
        this.node = this.text = null,
        this.hidden = Sn(e, t)
    }
    function lt(e, t, n) {
        for (var i, r = [], o = t; o < n; o = i) {
            var s = new at(e.doc, Vn(e.doc, o), o);
            i = o + s.size,
            r.push(s)
        }
        return r
    }
    function ct(e, t, n, i) {
        null == t && (t = e.doc.first),
        null == n && (n = e.doc.first + e.doc.size),
        i || (i = 0);
        var r = e.display;
        if (i && n < r.viewTo && (null == r.updateLineNumbers || r.updateLineNumbers > t) && (r.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= r.viewTo) wr && _n(e.doc, t) < r.viewTo && pt(e);
        else if (n <= r.viewFrom) wr && kn(e.doc, n + i) > r.viewFrom ? pt(e) : (r.viewFrom += i, r.viewTo += i);
        else if (t <= r.viewFrom && n >= r.viewTo) pt(e);
        else if (t <= r.viewFrom) { (o = ft(e, n, n + i, 1)) ? (r.view = r.view.slice(o.index), r.viewFrom = o.lineN, r.viewTo += i) : pt(e)
        } else if (n >= r.viewTo) {
            var o = ft(e, t, t, -1);
            o ? (r.view = r.view.slice(0, o.index), r.viewTo = o.lineN) : pt(e)
        } else {
            var s = ft(e, t, t, -1),
            a = ft(e, n, n + i, 1);
            s && a ? (r.view = r.view.slice(0, s.index).concat(lt(e, s.lineN, a.lineN)).concat(r.view.slice(a.index)), r.viewTo += i) : pt(e)
        }
        var l = r.externalMeasured;
        l && (n < l.lineN ? l.lineN += i: t < l.lineN + l.size && (r.externalMeasured = null))
    }
    function ut(e, t, n) {
        e.curOp.viewChanged = !0;
        var i = e.display,
        r = e.display.externalMeasured;
        if (r && t >= r.lineN && t < r.lineN + r.size && (i.externalMeasured = null), !(t < i.viewFrom || t >= i.viewTo)) {
            var o = i.view[ht(e, t)];
            if (null != o.node) {
                var s = o.changes || (o.changes = []); - 1 == Ci(s, n) && s.push(n)
            }
        }
    }
    function pt(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first,
        e.display.view = [],
        e.display.viewOffset = 0
    }
    function ht(e, t) {
        if (t >= e.display.viewTo) return null;
        if ((t -= e.display.viewFrom) < 0) return null;
        for (var n = e.display.view,
        i = 0; i < n.length; i++) if ((t -= n[i].size) < 0) return i
    }
    function ft(e, t, n, i) {
        var r, o = ht(e, t),
        s = e.display.view;
        if (!wr || n == e.doc.first + e.doc.size) return {
            index: o,
            lineN: n
        };
        for (var a = 0,
        l = e.display.viewFrom; a < o; a++) l += s[a].size;
        if (l != t) {
            if (i > 0) {
                if (o == s.length - 1) return null;
                r = l + s[o].size - t,
                o++
            } else r = l - t;
            t += r,
            n += r
        }
        for (; _n(e.doc, n) != n;) {
            if (o == (i < 0 ? 0 : s.length - 1)) return null;
            n += i * s[o - (i < 0 ? 1 : 0)].size,
            o += i
        }
        return {
            index: o,
            lineN: n
        }
    }
    function dt(e) {
        for (var t = e.display.view,
        n = 0,
        i = 0; i < t.length; i++) {
            var r = t[i];
            r.hidden || r.node && !r.changes || ++n
        }
        return n
    }
    function yt(e) {
        var t = e.display;
        t.lastWrapHeight == t.wrapper.clientHeight && t.lastWrapWidth == t.wrapper.clientWidth || (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize())
    }
    function mt(e, t) {
        for (var n = fi(t); n != e.wrapper; n = n.parentNode) if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover) return ! 0
    }
    function gt(e, t, n, i) {
        var r = e.display;
        if (!n && "true" == fi(t).getAttribute("cm-not-content")) return null;
        var o, s, a = r.lineSpace.getBoundingClientRect();
        try {
            o = t.clientX - a.left,
            s = t.clientY - a.top
        } catch(t) {
            return null
        }
        var l, c = Ye(e, o, s);
        if (i && 1 == c.xRel && (l = Vn(e.doc, c.line).text).length == c.ch) {
            var u = Co(l, l.length, e.options.tabSize) - l.length;
            c = _r(c.line, Math.max(0, Math.round((o - Oe(e.display).left) / et(e.display)) - u))
        }
        return c
    }
    function vt(e) {
        var t = this,
        n = t.display;
        if (! (vi(t, e) || n.activeTouch && n.input.supportsTouch())) if (n.shift = e.shiftKey, mt(n, e)) or || (n.scroller.draggable = !1, setTimeout(function() {
            n.scroller.draggable = !0
        },
        100));
        else if (!xt(t, e)) {
            var i = gt(t, e);
            switch (window.focus(), di(e)) {
            case 1:
                t.state.selectingText ? t.state.selectingText(e) : i ?
                function(e, t, n) {
                    ir ? setTimeout(Oi(B, e), 0) : e.curOp.focus = Di();
                    var i, r = +new Date;
                    Er && Er.time > r - 400 && 0 == kr(Er.pos, n) ? i = "triple": Tr && Tr.time > r - 400 && 0 == kr(Tr.pos, n) ? (i = "double", Er = {
                        time: r,
                        pos: n
                    }) : (i = "single", Tr = {
                        time: r,
                        pos: n
                    });
                    var o, s = e.doc.sel,
                    a = dr ? t.metaKey: t.ctrlKey;
                    e.options.dragDrop && Wo && !e.isReadOnly() && "single" == i && (o = s.contains(n)) > -1 && (kr((o = s.ranges[o]).from(), n) < 0 || n.xRel > 0) && (kr(o.to(), n) > 0 || n.xRel < 0) ?
                    function(e, t, n, i) {
                        var r = e.display,
                        o = +new Date,
                        s = rt(e,
                        function(a) {
                            or && (r.scroller.draggable = !1),
                            e.state.draggingText = !1,
                            go(document, "mouseup", s),
                            go(r.scroller, "drop", s),
                            Math.abs(t.clientX - a.clientX) + Math.abs(t.clientY - a.clientY) < 10 && (po(a), !i && +new Date - 200 < o && le(e.doc, n), or || ir && 9 == rr ? setTimeout(function() {
                                document.body.focus(),
                                r.input.focus()
                            },
                            20) : r.input.focus())
                        });
                        or && (r.scroller.draggable = !0);
                        e.state.draggingText = s,
                        s.copy = dr ? t.altKey: t.ctrlKey,
                        r.scroller.dragDrop && r.scroller.dragDrop();
                        yo(document, "mouseup", s),
                        yo(r.scroller, "drop", s)
                    } (e, t, n, a) : function(e, t, n, i, r) {
                        function o(t) {
                            if (0 != kr(m, t)) if (m = t, "rect" == i) {
                                for (var r = [], o = e.options.tabSize, s = Co(Vn(c, n.line).text, n.ch, o), a = Co(Vn(c, t.line).text, t.ch, o), l = Math.min(s, a), f = Math.max(s, a), d = Math.min(n.line, t.line), y = Math.min(e.lastLine(), Math.max(n.line, t.line)); d <= y; d++) {
                                    var g = Vn(c, d).text,
                                    v = To(g, l, o);
                                    l == f ? r.push(new ee(_r(d, v), _r(d, v))) : g.length > v && r.push(new ee(_r(d, v), _r(d, To(g, f, o))))
                                }
                                r.length || r.push(new ee(n, n)),
                                fe(c, te(h.ranges.slice(0, p).concat(r), p), {
                                    origin: "*mouse",
                                    scroll: !1
                                }),
                                e.scrollIntoView(t)
                            } else {
                                var b = u,
                                x = b.anchor,
                                w = t;
                                if ("single" != i) {
                                    if ("double" == i) _ = e.findWordAt(t);
                                    else var _ = new ee(_r(t.line, 0), re(c, _r(t.line + 1, 0)));
                                    kr(_.anchor, x) > 0 ? (w = _.head, x = $(b.from(), _.anchor)) : (w = _.anchor, x = W(b.to(), _.head))
                                } (r = h.ranges.slice(0))[p] = new ee(re(c, x), w),
                                fe(c, te(r, p), ko)
                            }
                        }
                        function s(t) {
                            var n = ++b,
                            r = gt(e, t, !0, "rect" == i);
                            if (r) if (0 != kr(r, m)) {
                                e.curOp.focus = Di(),
                                o(r);
                                var a = v(l, c); (r.line >= a.to || r.line < a.from) && setTimeout(rt(e,
                                function() {
                                    b == n && s(t)
                                }), 150)
                            } else {
                                var u = t.clientY < g.top ? -20 : t.clientY > g.bottom ? 20 : 0;
                                u && setTimeout(rt(e,
                                function() {
                                    b == n && (l.scroller.scrollTop += u, s(t))
                                }), 50)
                            }
                        }
                        function a(t) {
                            e.state.selectingText = !1,
                            b = 1 / 0,
                            po(t),
                            l.input.focus(),
                            go(document, "mousemove", x),
                            go(document, "mouseup", w),
                            c.history.lastSelOrigin = null
                        }
                        var l = e.display,
                        c = e.doc;
                        po(t);
                        var u, p, h = c.sel,
                        f = h.ranges;
                        r && !t.shiftKey ? (p = c.sel.contains(n), u = p > -1 ? f[p] : new ee(n, n)) : (u = c.sel.primary(), p = c.sel.primIndex);
                        if (yr ? t.shiftKey && t.metaKey: t.altKey) i = "rect",
                        r || (u = new ee(n, n)),
                        n = gt(e, t, !0, !0),
                        p = -1;
                        else if ("double" == i) {
                            var d = e.findWordAt(n);
                            u = e.display.shift || c.extend ? ae(c, u, d.anchor, d.head) : d
                        } else if ("triple" == i) {
                            var y = new ee(_r(n.line, 0), re(c, _r(n.line + 1, 0)));
                            u = e.display.shift || c.extend ? ae(c, u, y.anchor, y.head) : y
                        } else u = ae(c, u, n);
                        r ? -1 == p ? (p = f.length, fe(c, te(f.concat([u]), p), {
                            scroll: !1,
                            origin: "*mouse"
                        })) : f.length > 1 && f[p].empty() && "single" == i && !t.shiftKey ? (fe(c, te(f.slice(0, p).concat(f.slice(p + 1)), 0), {
                            scroll: !1,
                            origin: "*mouse"
                        }), h = c.sel) : ue(c, p, u, ko) : (p = 0, fe(c, new Z([u], 0), ko), h = c.sel);
                        var m = n;
                        var g = l.wrapper.getBoundingClientRect(),
                        b = 0;
                        var x = rt(e,
                        function(e) {
                            di(e) ? s(e) : a(e)
                        }),
                        w = rt(e, a);
                        e.state.selectingText = w,
                        yo(document, "mousemove", x),
                        yo(document, "mouseup", w)
                    } (e, t, n, i, a)
                } (t, e, i) : fi(e) == n.scroller && po(e);
                break;
            case 2:
                or && (t.state.lastMiddleDown = +new Date),
                i && le(t.doc, i),
                setTimeout(function() {
                    n.input.focus()
                },
                20),
                po(e);
                break;
            case 3:
                br ? It(t, e) : function(e) {
                    e.state.delayingBlurEvent = !0,
                    setTimeout(function() {
                        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, Rt(e))
                    },
                    100)
                } (t)
            }
        }
    }
    function bt(e, t, n, i) {
        try {
            var r = t.clientX,
            o = t.clientY
        } catch(t) {
            return ! 1
        }
        if (r >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return ! 1;
        i && po(t);
        var s = e.display,
        a = s.lineDiv.getBoundingClientRect();
        if (o > a.bottom || !xi(e, n)) return hi(t);
        o -= a.top - s.viewOffset;
        for (var l = 0; l < e.options.gutters.length; ++l) {
            var c = s.gutters.childNodes[l];
            if (c && c.getBoundingClientRect().right >= r) {
                var u = Yn(e.doc, o),
                p = e.options.gutters[l];
                return vo(e, n, e, u, p, t),
                hi(t)
            }
        }
    }
    function xt(e, t) {
        return bt(e, t, "gutterClick", !0)
    }
    function wt(e) {
        var t = this;
        if (_t(t), !vi(t, e) && !mt(t.display, e)) {
            po(e),
            ir && (Lr = +new Date);
            var n = gt(t, e, !0),
            i = e.dataTransfer.files;
            if (n && !t.isReadOnly()) if (i && i.length && window.FileReader && window.File) for (var r = i.length,
            o = Array(r), s = 0, a = function(e, i) {
                if (!t.options.allowDropFileTypes || -1 != Ci(t.options.allowDropFileTypes, e.type)) {
                    var a = new FileReader;
                    a.onload = rt(t,
                    function() {
                        var e = a.result;
                        if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[i] = e, ++s == r) {
                            var l = {
                                from: n = re(t.doc, n),
                                to: n,
                                text: t.doc.splitLines(o.join(t.doc.lineSeparator())),
                                origin: "paste"
                            };
                            Wt(t.doc, l),
                            he(t.doc, ne(n, Dr(l)))
                        }
                    }),
                    a.readAsText(e)
                }
            },
            l = 0; l < r; ++l) a(i[l], l);
            else {
                if (t.state.draggingText && t.doc.sel.contains(n) > -1) return t.state.draggingText(e),
                void setTimeout(function() {
                    t.display.input.focus()
                },
                20);
                try {
                    if (o = e.dataTransfer.getData("Text")) {
                        if (t.state.draggingText && !t.state.draggingText.copy) var c = t.listSelections();
                        if (de(t.doc, ne(n, n)), c) for (l = 0; l < c.length; ++l) qt(t.doc, "", c[l].anchor, c[l].head, "drag");
                        t.replaceSelection(o, "around", "paste"),
                        t.display.input.focus()
                    }
                } catch(e) {}
            }
        }
    }
    function _t(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
    }
    function kt(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (e.doc.scrollTop = t, er || T(e, {
            top: t
        }), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t), e.display.scrollbars.setScrollTop(t), er && T(e), Ce(e, 100))
    }
    function St(e, t, n) { (n ? t == e.doc.scrollLeft: Math.abs(e.doc.scrollLeft - t) < 2) || (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), e.doc.scrollLeft = t, b(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
    }
    function Ct(e, t) {
        var n = Ir(t),
        i = n.x,
        r = n.y,
        o = e.display,
        s = o.scroller,
        a = s.scrollWidth > s.clientWidth,
        l = s.scrollHeight > s.clientHeight;
        if (i && a || r && l) {
            if (r && dr && or) e: for (var c = t.target,
            u = o.view; c != s; c = c.parentNode) for (var p = 0; p < u.length; p++) if (u[p].node == c) {
                e.display.currentWheelTarget = c;
                break e
            }
            if (i && !er && !lr && null != Rr) return r && l && kt(e, Math.max(0, Math.min(s.scrollTop + r * Rr, s.scrollHeight - s.clientHeight))),
            St(e, Math.max(0, Math.min(s.scrollLeft + i * Rr, s.scrollWidth - s.clientWidth))),
            (!r || r && l) && po(t),
            void(o.wheelStartX = null);
            if (r && null != Rr) {
                var h = r * Rr,
                f = e.doc.scrollTop,
                d = f + o.wrapper.clientHeight;
                h < 0 ? f = Math.max(0, f + h - 50) : d = Math.min(e.doc.height, d + h + 50),
                T(e, {
                    top: f,
                    bottom: d
                })
            }
            Pr < 20 && (null == o.wheelStartX ? (o.wheelStartX = s.scrollLeft, o.wheelStartY = s.scrollTop, o.wheelDX = i, o.wheelDY = r, setTimeout(function() {
                if (null != o.wheelStartX) {
                    var e = s.scrollLeft - o.wheelStartX,
                    t = s.scrollTop - o.wheelStartY,
                    n = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
                    o.wheelStartX = o.wheelStartY = null,
                    n && (Rr = (Rr * Pr + n) / (Pr + 1), ++Pr)
                }
            },
            200)) : (o.wheelDX += i, o.wheelDY += r))
        }
    }
    function Tt(e, t, n) {
        if ("string" == typeof t && !(t = Gr[t])) return ! 1;
        e.display.input.ensurePolled();
        var i = e.display.shift,
        r = !1;
        try {
            e.isReadOnly() && (e.state.suppressEdits = !0),
            n && (e.display.shift = !1),
            r = t(e) != wo
        } finally {
            e.display.shift = i,
            e.state.suppressEdits = !1
        }
        return r
    }
    function Et(e, t, n, i) {
        var r = e.state.keySeq;
        if (r) {
            if (Qr(t)) return "handled";
            jr.set(50,
            function() {
                e.state.keySeq == r && (e.state.keySeq = null, e.display.input.reset())
            }),
            t = r + " " + t
        }
        var o = function(e, t, n) {
            for (var i = 0; i < e.state.keyMaps.length; i++) {
                var r = Xr(t, e.state.keyMaps[i], n, e);
                if (r) return r
            }
            return e.options.extraKeys && Xr(t, e.options.extraKeys, n, e) || Xr(t, e.options.keyMap, n, e)
        } (e, t, i);
        return "multi" == o && (e.state.keySeq = t),
        "handled" == o && mi(e, "keyHandled", e, t, n),
        "handled" != o && "multi" != o || (po(n), Se(e)),
        r && !o && /\'$/.test(t) ? (po(n), !0) : !!o
    }
    function Mt(e, t) {
        var n = Yr(t, !0);
        return !! n && (t.shiftKey && !e.state.keySeq ? Et(e, "Shift-" + n, t,
        function(t) {
            return Tt(e, t, !0)
        }) || Et(e, n, t,
        function(t) {
            if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return Tt(e, t)
        }) : Et(e, n, t,
        function(t) {
            return Tt(e, t)
        }))
    }
    function At(e) {
        var t = this;
        if (t.curOp.focus = Di(), !vi(t, e)) {
            ir && rr < 11 && 27 == e.keyCode && (e.returnValue = !1);
            var n = e.keyCode;
            t.display.shift = 16 == n || e.shiftKey;
            var i = Mt(t, e);
            lr && (Nr = i ? n: null, !i && 88 == n && !Ho && (dr ? e.metaKey: e.ctrlKey) && t.replaceSelection("", null, "cut")),
            18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) ||
            function(e) {
                function t(e) {
                    18 != e.keyCode && e.altKey || (No(n, "CodeMirror-crosshair"), go(document, "keyup", t), go(document, "mouseover", t))
                }
                var n = e.display.lineDiv;
                Do(n, "CodeMirror-crosshair");
                yo(document, "keyup", t),
                yo(document, "mouseover", t)
            } (t)
        }
    }
    function Ot(e) {
        16 == e.keyCode && (this.doc.sel.shift = !1),
        vi(this, e)
    }
    function Lt(e) {
        var t = this;
        if (! (mt(t.display, e) || vi(t, e) || e.ctrlKey && !e.altKey || dr && e.metaKey)) {
            var n = e.keyCode,
            i = e.charCode;
            if (lr && n == Nr) return Nr = null,
            void po(e);
            if (!lr || e.which && !(e.which < 10) || !Mt(t, e)) { (function(e, t, n) {
                    return Et(e, "'" + n + "'", t,
                    function(t) {
                        return Tt(e, t, !0)
                    })
                })(t, e, String.fromCharCode(null == i ? n: i)) || t.display.input.onKeyPress(e)
            }
        }
    }
    function Pt(e, t) {
        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1),
        "nocursor" != e.options.readOnly && (e.state.focused || (vo(e, "focus", e, t), e.state.focused = !0, Do(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), or && setTimeout(function() {
            e.display.input.reset(!0)
        },
        20)), e.display.input.receivedFocus()), Se(e))
    }
    function Rt(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (vo(e, "blur", e, t), e.state.focused = !1, No(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
            e.state.focused || (e.display.shift = !1)
        },
        150))
    }
    function It(e, t) {
        mt(e.display, t) ||
        function(e, t) {
            return !! xi(e, "gutterContextMenu") && bt(e, t, "gutterContextMenu", !1)
        } (e, t) || vi(e, t, "contextmenu") || e.display.input.onContextMenu(t)
    }
    function jt(e, t) {
        if (kr(e, t.from) < 0) return e;
        if (kr(e, t.to) <= 0) return Dr(t);
        var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
        i = e.ch;
        return e.line == t.to.line && (i += Dr(t).ch - t.to.ch),
        _r(n, i)
    }
    function Nt(e, t) {
        for (var n = [], i = 0; i < e.sel.ranges.length; i++) {
            var r = e.sel.ranges[i];
            n.push(new ee(jt(r.anchor, t), jt(r.head, t)))
        }
        return te(n, e.sel.primIndex)
    }
    function Dt(e, t, n) {
        return e.line == t.line ? _r(n.line, e.ch - t.ch + n.ch) : _r(n.line + (e.line - t.line), e.ch)
    }
    function zt(e, t, n) {
        var i = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            cancel: function() {
                this.canceled = !0
            }
        };
        return n && (i.update = function(t, n, i, r) {
            t && (this.from = re(e, t)),
            n && (this.to = re(e, n)),
            i && (this.text = i),
            void 0 !== r && (this.origin = r)
        }),
        vo(e, "beforeChange", e, i),
        e.cm && vo(e.cm, "beforeChange", e.cm, i),
        i.canceled ? null: {
            from: i.from,
            to: i.to,
            text: i.text,
            origin: i.origin
        }
    }
    function Wt(e, t, n) {
        if (e.cm) {
            if (!e.cm.curOp) return rt(e.cm, Wt)(e, t, n);
            if (e.cm.state.suppressEdits) return
        }
        if (! (xi(e, "beforeChange") || e.cm && xi(e.cm, "beforeChange")) || (t = zt(e, t, !0))) {
            var i = xr && !n &&
            function(e, t, n) {
                var i = null;
                if (e.iter(t.line, n.line + 1,
                function(e) {
                    if (e.markedSpans) for (var t = 0; t < e.markedSpans.length; ++t) {
                        var n = e.markedSpans[t].marker; ! n.readOnly || i && -1 != Ci(i, n) || (i || (i = [])).push(n)
                    }
                }), !i) return null;
                for (var r = [{
                    from: t,
                    to: n
                }], o = 0; o < i.length; ++o) for (var s = i[o], a = s.find(0), l = 0; l < r.length; ++l) {
                    var c = r[l];
                    if (! (kr(c.to, a.from) < 0 || kr(c.from, a.to) > 0)) {
                        var u = [l, 1],
                        p = kr(c.from, a.from),
                        h = kr(c.to, a.to); (p < 0 || !s.inclusiveLeft && !p) && u.push({
                            from: c.from,
                            to: a.from
                        }),
                        (h > 0 || !s.inclusiveRight && !h) && u.push({
                            from: a.to,
                            to: c.to
                        }),
                        r.splice.apply(r, u),
                        l += u.length - 1
                    }
                }
                return r
            } (e, t.from, t.to);
            if (i) for (var r = i.length - 1; r >= 0; --r) $t(e, {
                from: i[r].from,
                to: i[r].to,
                text: r ? [""] : t.text
            });
            else $t(e, t)
        }
    }
    function $t(e, t) {
        if (1 != t.text.length || "" != t.text[0] || 0 != kr(t.from, t.to)) {
            var n = Nt(e, t);
            ri(e, t, n, e.cm ? e.cm.curOp.id: NaN),
            Ft(e, t, n, cn(e, t));
            var i = [];
            Kn(e,
            function(e, n) {
                n || -1 != Ci(i, e.history) || (pi(e.history, t), i.push(e.history)),
                Ft(e, t, null, cn(e, t))
            })
        }
    }
    function Bt(e, t, n) {
        if (!e.cm || !e.cm.state.suppressEdits || n) {
            for (var i, r = e.history,
            o = e.sel,
            s = "undo" == t ? r.done: r.undone, a = "undo" == t ? r.undone: r.done, l = 0; l < s.length && (i = s[l], n ? !i.ranges || i.equals(e.sel) : i.ranges); l++);
            if (l != s.length) {
                for (r.lastOrigin = r.lastSelOrigin = null; (i = s.pop()).ranges;) {
                    if (oi(i, a), n && !i.equals(e.sel)) return void fe(e, i, {
                        clearRedo: !1
                    });
                    o = i
                }
                var c = [];
                oi(o, a),
                a.push({
                    changes: c,
                    generation: r.generation
                }),
                r.generation = i.generation || ++r.maxGeneration;
                for (var u = xi(e, "beforeChange") || e.cm && xi(e.cm, "beforeChange"), l = i.changes.length - 1; l >= 0; --l) {
                    var p = i.changes[l];
                    if (p.origin = t, u && !zt(e, p, !1)) return void(s.length = 0);
                    c.push(ni(e, p));
                    var h = l ? Nt(e, p) : Si(s);
                    Ft(e, p, h, pn(e, p)),
                    !l && e.cm && e.cm.scrollIntoView({
                        from: p.from,
                        to: Dr(p)
                    });
                    var f = [];
                    Kn(e,
                    function(e, t) {
                        t || -1 != Ci(f, e.history) || (pi(e.history, p), f.push(e.history)),
                        Ft(e, p, null, pn(e, p))
                    })
                }
            }
        }
    }
    function Ht(e, t) {
        if (0 != t && (e.first += t, e.sel = new Z(Ti(e.sel.ranges,
        function(e) {
            return new ee(_r(e.anchor.line + t, e.anchor.ch), _r(e.head.line + t, e.head.ch))
        }), e.sel.primIndex), e.cm)) {
            ct(e.cm, e.first, e.first - t, t);
            for (var n = e.cm.display,
            i = n.viewFrom; i < n.viewTo; i++) ut(e.cm, i, "gutter")
        }
    }
    function Ft(e, t, n, r) {
        if (e.cm && !e.cm.curOp) return rt(e.cm, Ft)(e, t, n, r);
        if (t.to.line < e.first) Ht(e, t.text.length - 1 - (t.to.line - t.from.line));
        else if (! (t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
                var o = t.text.length - 1 - (e.first - t.from.line);
                Ht(e, o),
                t = {
                    from: _r(e.first, 0),
                    to: _r(t.to.line + o, t.to.ch),
                    text: [Si(t.text)],
                    origin: t.origin
                }
            }
            var s = e.lastLine();
            t.to.line > s && (t = {
                from: t.from,
                to: _r(s, Vn(e, s).text.length),
                text: [t.text[0]],
                origin: t.origin
            }),
            t.removed = Gn(e, t.from, t.to),
            n || (n = Nt(e, t)),
            e.cm ?
            function(e, t, n) {
                var r = e.doc,
                o = e.display,
                s = t.from,
                a = t.to,
                l = !1,
                u = s.line;
                e.options.lineWrapping || (u = Qn(wn(Vn(r, s.line))), r.iter(u, a.line + 1,
                function(e) {
                    if (e == o.maxLine) return l = !0,
                    !0
                }));
                r.sel.contains(t.from, t.to) > -1 && bi(e);
                Hn(r, t, n, i(e)),
                e.options.lineWrapping || (r.iter(u, s.line + t.text.length,
                function(e) {
                    var t = c(e);
                    t > o.maxLineLength && (o.maxLine = e, o.maxLineLength = t, o.maxLineChanged = !0, l = !1)
                }), l && (e.curOp.updateMaxLine = !0));
                r.frontier = Math.min(r.frontier, s.line),
                Ce(e, 400);
                var p = t.text.length - (a.line - s.line) - 1;
                t.full ? ct(e) : s.line != a.line || 1 != t.text.length || Bn(e.doc, t) ? ct(e, s.line, a.line + 1, p) : ut(e, s.line, "text");
                var h = xi(e, "changes"),
                f = xi(e, "change");
                if (f || h) {
                    var d = {
                        from: s,
                        to: a,
                        text: t.text,
                        removed: t.removed,
                        origin: t.origin
                    };
                    f && mi(e, "change", e, d),
                    h && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(d)
                }
                e.display.selForContextMenu = null
            } (e.cm, t, r) : Hn(e, t, r),
            de(e, n, _o)
        }
    }
    function qt(e, t, n, i, r) {
        if (i || (i = n), kr(i, n) < 0) {
            var o = i;
            i = n,
            n = o
        }
        "string" == typeof t && (t = e.splitLines(t)),
        Wt(e, {
            from: n,
            to: i,
            text: t,
            origin: r
        })
    }
    function Kt(e, t, n, i, r) {
        var o = e.display,
        s = Ze(e.display);
        n < 0 && (n = 0);
        var a = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop: o.scroller.scrollTop,
        l = Re(e),
        c = {};
        r - n > l && (r = n + l);
        var u = e.doc.height + Ae(o),
        p = n < s,
        h = r > u - s;
        if (n < a) c.scrollTop = p ? 0 : n;
        else if (r > a + l) {
            var f = Math.min(n, (h ? u: r) - l);
            f != a && (c.scrollTop = f)
        }
        var d = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft: o.scroller.scrollLeft,
        y = Pe(e) - (e.options.fixedGutter ? o.gutters.offsetWidth: 0),
        m = i - t > y;
        return m && (i = t + y),
        t < 10 ? c.scrollLeft = 0 : t < d ? c.scrollLeft = Math.max(0, t - (m ? 0 : 10)) : i > y + d - 3 && (c.scrollLeft = i + (m ? 0 : 10) - y),
        c
    }
    function Ut(e, t, n) {
        null == t && null == n || Gt(e),
        null != t && (e.curOp.scrollLeft = (null == e.curOp.scrollLeft ? e.doc.scrollLeft: e.curOp.scrollLeft) + t),
        null != n && (e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop: e.curOp.scrollTop) + n)
    }
    function Vt(e) {
        Gt(e);
        var t = e.getCursor(),
        n = t,
        i = t;
        e.options.lineWrapping || (n = t.ch ? _r(t.line, t.ch - 1) : t, i = _r(t.line, t.ch + 1)),
        e.curOp.scrollToPos = {
            from: n,
            to: i,
            margin: e.options.cursorScrollMargin,
            isCursor: !0
        }
    }
    function Gt(e) {
        var t = e.curOp.scrollToPos;
        if (t) {
            e.curOp.scrollToPos = null;
            var n = Xe(e, t.from),
            i = Xe(e, t.to),
            r = Kt(e, Math.min(n.left, i.left), Math.min(n.top, i.top) - t.margin, Math.max(n.right, i.right), Math.max(n.bottom, i.bottom) + t.margin);
            e.scrollTo(r.scrollLeft, r.scrollTop)
        }
    }
    function Jt(e, t, n, i) {
        var r, o = e.doc;
        null == n && (n = "add"),
        "smart" == n && (o.mode.indent ? r = Ee(e, t) : n = "prev");
        var s = e.options.tabSize,
        a = Vn(o, t),
        l = Co(a.text, null, s);
        a.stateAfter && (a.stateAfter = null);
        var c, u = a.text.match(/^\s*/)[0];
        if (i || /\S/.test(a.text)) {
            if ("smart" == n && ((c = o.mode.indent(r, a.text.slice(u.length), a.text)) == wo || c > 150)) {
                if (!i) return;
                n = "prev"
            }
        } else c = 0,
        n = "not";
        "prev" == n ? c = t > o.first ? Co(Vn(o, t - 1).text, null, s) : 0 : "add" == n ? c = l + e.options.indentUnit: "subtract" == n ? c = l - e.options.indentUnit: "number" == typeof n && (c = l + n),
        c = Math.max(0, c);
        var p = "",
        h = 0;
        if (e.options.indentWithTabs) for (f = Math.floor(c / s); f; --f) h += s,
        p += "\t";
        if (h < c && (p += ki(c - h)), p != u) return qt(o, p, _r(t, 0), _r(t, u.length), "+input"),
        a.stateAfter = null,
        !0;
        for (var f = 0; f < o.sel.ranges.length; f++) {
            var d = o.sel.ranges[f];
            if (d.head.line == t && d.head.ch < u.length) {
                ue(o, f, new ee(h = _r(t, u.length), h));
                break
            }
        }
    }
    function Xt(e, t, n, i) {
        var r = t,
        o = t;
        return "number" == typeof t ? o = Vn(e, ie(e, t)) : r = Qn(t),
        null == r ? null: (i(o, r) && e.cm && ut(e.cm, r, n), o)
    }
    function Qt(e, t) {
        for (var n = e.doc.sel.ranges,
        i = [], r = 0; r < n.length; r++) {
            for (var o = t(n[r]); i.length && kr(o.from, Si(i).to) <= 0;) {
                var s = i.pop();
                if (kr(s.from, o.from) < 0) {
                    o.from = s.from;
                    break
                }
            }
            i.push(o)
        }
        it(e,
        function() {
            for (var t = i.length - 1; t >= 0; t--) qt(e.doc, "", i[t].from, i[t].to, "+delete");
            Vt(e)
        })
    }
    function Yt(e, t, n, i, r) {
        function o(t) {
            var i = (r ? Xi: Qi)(c, a, n, !0);
            if (null == i) {
                if (t || !
                function() {
                    var t = s + n;
                    return ! (t < e.first || t >= e.first + e.size) && (s = t, c = Vn(e, t))
                } ()) return ! 1;
                a = r ? (n < 0 ? qi: Fi)(c) : n < 0 ? c.text.length: 0
            } else a = i;
            return ! 0
        }
        var s = t.line,
        a = t.ch,
        l = n,
        c = Vn(e, s);
        if ("char" == i) o();
        else if ("column" == i) o(!0);
        else if ("word" == i || "group" == i) for (var u = null,
        p = "group" == i,
        h = e.cm && e.cm.getHelper(t, "wordChars"), f = !0; ! (n < 0) || o(!f); f = !1) {
            var d = c.text.charAt(a) || "\n",
            y = Li(d, h) ? "w": p && "\n" == d ? "n": !p || /\s/.test(d) ? null: "p";
            if (!p || f || y || (y = "s"), u && u != y) {
                n < 0 && (n = 1, o());
                break
            }
            if (y && (u = y), n > 0 && !o(!f)) break
        }
        var m = be(e, _r(s, a), t, l, !0);
        return kr(t, m) || (m.hitSide = !0),
        m
    }
    function Zt(e, t, n, i) {
        var r, o = e.doc,
        s = t.left;
        if ("page" == i) {
            var a = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
            l = Math.max(a - .5 * Ze(e.display), 3);
            r = (n > 0 ? t.bottom: t.top) + n * l
        } else "line" == i && (r = n > 0 ? t.bottom + 3 : t.top - 3);
        for (;;) {
            var c = Ye(e, s, r);
            if (!c.outside) break;
            if (n < 0 ? r <= 0 : r >= o.height) {
                c.hitSide = !0;
                break
            }
            r += 5 * n
        }
        return c
    }
    function en(t, n, i, r) {
        e.defaults[t] = n,
        i && (Wr[t] = r ?
        function(e, t, n) {
            n != $r && i(e, t, n)
        }: i)
    }
    function tn(e) {
        for (var t, n, i, r, o = e.split(/-(?!$)/), e = o[o.length - 1], s = 0; s < o.length - 1; s++) {
            var a = o[s];
            if (/^(cmd|meta|m)$/i.test(a)) r = !0;
            else if (/^a(lt)?$/i.test(a)) t = !0;
            else if (/^(c|ctrl|control)$/i.test(a)) n = !0;
            else {
                if (!/^s(hift)$/i.test(a)) throw new Error("Unrecognized modifier name: " + a);
                i = !0
            }
        }
        return t && (e = "Alt-" + e),
        n && (e = "Ctrl-" + e),
        r && (e = "Cmd-" + e),
        i && (e = "Shift-" + e),
        e
    }
    function nn(e) {
        return "string" == typeof e ? Jr[e] : e
    }
    function rn(e, t, n, i, r) {
        if (i && i.shared) return function(e, t, n, i, r) { (i = Ai(i)).shared = !1;
            var o = [rn(e, t, n, i, r)],
            s = o[0],
            a = i.widgetNode;
            return Kn(e,
            function(e) {
                a && (i.widgetNode = a.cloneNode(!0)),
                o.push(rn(e, re(e, t), re(e, n), i, r));
                for (var l = 0; l < e.linked.length; ++l) if (e.linked[l].isParent) return;
                s = Si(o)
            }),
            new no(o, s)
        } (e, t, n, i, r);
        if (e.cm && !e.cm.curOp) return rt(e.cm, rn)(e, t, n, i, r);
        var o = new to(e, r),
        s = kr(t, n);
        if (i && Ai(i, o, !1), s > 0 || 0 == s && !1 !== o.clearWhenEmpty) return o;
        if (o.replacedWith && (o.collapsed = !0, o.widgetNode = Ii("span", [o.replacedWith], "CodeMirror-widget"), i.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), i.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
            if (xn(e, t.line, t, n, o) || t.line != n.line && xn(e, n.line, t, n, o)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
            wr = !0
        }
        o.addToHistory && ri(e, {
            from: t,
            to: n,
            origin: "markText"
        },
        e.sel, NaN);
        var a, l = t.line,
        c = e.cm;
        if (e.iter(l, n.line + 1,
        function(e) {
            c && o.collapsed && !c.options.lineWrapping && wn(e) == c.display.maxLine && (a = !0),
            o.collapsed && l != t.line && Xn(e, 0),
            function(e, t) {
                e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t],
                t.marker.attachLine(e)
            } (e, new an(o, l == t.line ? t.ch: null, l == n.line ? n.ch: null)),
            ++l
        }), o.collapsed && e.iter(t.line, n.line + 1,
        function(t) {
            Sn(e, t) && Xn(t, 0)
        }), o.clearOnEnter && yo(o, "beforeCursorEnter",
        function() {
            o.clear()
        }), o.readOnly && (xr = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++eo, o.atomic = !0), c) {
            if (a && (c.curOp.updateMaxLine = !0), o.collapsed) ct(c, t.line, n.line + 1);
            else if (o.className || o.title || o.startStyle || o.endStyle || o.css) for (var u = t.line; u <= n.line; u++) ut(c, u, "text");
            o.atomic && me(c.doc),
            mi(c, "markerAdded", c, o)
        }
        return o
    }
    function on(e) {
        return e.findMarks(_r(e.first, 0), e.clipPos(_r(e.lastLine())),
        function(e) {
            return e.parent
        })
    }
    function sn(e) {
        for (var t = 0; t < e.length; t++) {
            var n = e[t],
            i = [n.primary.doc];
            Kn(n.primary.doc,
            function(e) {
                i.push(e)
            });
            for (var r = 0; r < n.markers.length; r++) {
                var o = n.markers[r]; - 1 == Ci(i, o.doc) && (o.parent = null, n.markers.splice(r--, 1))
            }
        }
    }
    function an(e, t, n) {
        this.marker = e,
        this.from = t,
        this.to = n
    }
    function ln(e, t) {
        if (e) for (var n = 0; n < e.length; ++n) {
            var i = e[n];
            if (i.marker == t) return i
        }
    }
    function cn(e, t) {
        if (t.full) return null;
        var n = oe(e, t.from.line) && Vn(e, t.from.line).markedSpans,
        i = oe(e, t.to.line) && Vn(e, t.to.line).markedSpans;
        if (!n && !i) return null;
        var r = t.from.ch,
        o = t.to.ch,
        s = 0 == kr(t.from, t.to),
        a = function(e, t, n) {
            if (e) for (var i, r = 0; r < e.length; ++r) {
                var o = e[r],
                s = o.marker;
                if (null == o.from || (s.inclusiveLeft ? o.from <= t: o.from < t) || o.from == t && "bookmark" == s.type && (!n || !o.marker.insertLeft)) {
                    var a = null == o.to || (s.inclusiveRight ? o.to >= t: o.to > t); (i || (i = [])).push(new an(s, o.from, a ? null: o.to))
                }
            }
            return i
        } (n, r, s),
        l = function(e, t, n) {
            if (e) for (var i, r = 0; r < e.length; ++r) {
                var o = e[r],
                s = o.marker;
                if (null == o.to || (s.inclusiveRight ? o.to >= t: o.to > t) || o.from == t && "bookmark" == s.type && (!n || o.marker.insertLeft)) {
                    var a = null == o.from || (s.inclusiveLeft ? o.from <= t: o.from < t); (i || (i = [])).push(new an(s, a ? null: o.from - t, null == o.to ? null: o.to - t))
                }
            }
            return i
        } (i, o, s),
        c = 1 == t.text.length,
        u = Si(t.text).length + (c ? r: 0);
        if (a) for (m = 0; m < a.length; ++m) {
            if (null == (p = a[m]).to) { (h = ln(l, p.marker)) ? c && (p.to = null == h.to ? null: h.to + u) : p.to = r
            }
        }
        if (l) for (m = 0; m < l.length; ++m) {
            var p = l[m];
            if (null != p.to && (p.to += u), null == p.from) {
                var h = ln(a, p.marker);
                h || (p.from = u, c && (a || (a = [])).push(p))
            } else p.from += u,
            c && (a || (a = [])).push(p)
        }
        a && (a = un(a)),
        l && l != a && (l = un(l));
        var f = [a];
        if (!c) {
            var d, y = t.text.length - 2;
            if (y > 0 && a) for (m = 0; m < a.length; ++m) null == a[m].to && (d || (d = [])).push(new an(a[m].marker, null, null));
            for (var m = 0; m < y; ++m) f.push(d);
            f.push(l)
        }
        return f
    }
    function un(e) {
        for (var t = 0; t < e.length; ++t) {
            var n = e[t];
            null != n.from && n.from == n.to && !1 !== n.marker.clearWhenEmpty && e.splice(t--, 1)
        }
        return e.length ? e: null
    }
    function pn(e, t) {
        var n = function(e, t) {
            var n = t["spans_" + e.id];
            if (!n) return null;
            for (var i = 0,
            r = []; i < t.text.length; ++i) r.push(ai(n[i]));
            return r
        } (e, t),
        i = cn(e, t);
        if (!n) return i;
        if (!i) return n;
        for (var r = 0; r < n.length; ++r) {
            var o = n[r],
            s = i[r];
            if (o && s) e: for (var a = 0; a < s.length; ++a) {
                for (var l = s[a], c = 0; c < o.length; ++c) if (o[c].marker == l.marker) continue e;
                o.push(l)
            } else s && (n[r] = s)
        }
        return n
    }
    function hn(e) {
        var t = e.markedSpans;
        if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
            e.markedSpans = null
        }
    }
    function fn(e, t) {
        if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
            e.markedSpans = t
        }
    }
    function dn(e) {
        return e.inclusiveLeft ? -1 : 0
    }
    function yn(e) {
        return e.inclusiveRight ? 1 : 0
    }
    function mn(e, t) {
        var n = e.lines.length - t.lines.length;
        if (0 != n) return n;
        var i = e.find(),
        r = t.find(),
        o = kr(i.from, r.from) || dn(e) - dn(t);
        if (o) return - o;
        var s = kr(i.to, r.to) || yn(e) - yn(t);
        return s || t.id - e.id
    }
    function gn(e, t) {
        var n, i = wr && e.markedSpans;
        if (i) for (var r, o = 0; o < i.length; ++o)(r = i[o]).marker.collapsed && null == (t ? r.from: r.to) && (!n || mn(n, r.marker) < 0) && (n = r.marker);
        return n
    }
    function vn(e) {
        return gn(e, !0)
    }
    function bn(e) {
        return gn(e, !1)
    }
    function xn(e, t, n, i, r) {
        var o = Vn(e, t),
        s = wr && o.markedSpans;
        if (s) for (var a = 0; a < s.length; ++a) {
            var l = s[a];
            if (l.marker.collapsed) {
                var c = l.marker.find(0),
                u = kr(c.from, n) || dn(l.marker) - dn(r),
                p = kr(c.to, i) || yn(l.marker) - yn(r);
                if (! (u >= 0 && p <= 0 || u <= 0 && p >= 0) && (u <= 0 && (l.marker.inclusiveRight && r.inclusiveLeft ? kr(c.to, n) >= 0 : kr(c.to, n) > 0) || u >= 0 && (l.marker.inclusiveRight && r.inclusiveLeft ? kr(c.from, i) <= 0 : kr(c.from, i) < 0))) return ! 0
            }
        }
    }
    function wn(e) {
        for (var t; t = vn(e);) e = t.find( - 1, !0).line;
        return e
    }
    function _n(e, t) {
        var n = Vn(e, t),
        i = wn(n);
        return n == i ? t: Qn(i)
    }
    function kn(e, t) {
        if (t > e.lastLine()) return t;
        var n, i = Vn(e, t);
        if (!Sn(e, i)) return t;
        for (; n = bn(i);) i = n.find(1, !0).line;
        return Qn(i) + 1
    }
    function Sn(e, t) {
        var n = wr && t.markedSpans;
        if (n) for (var i, r = 0; r < n.length; ++r) if ((i = n[r]).marker.collapsed) {
            if (null == i.from) return ! 0;
            if (!i.marker.widgetNode && 0 == i.from && i.marker.inclusiveLeft && Cn(e, t, i)) return ! 0
        }
    }
    function Cn(e, t, n) {
        if (null == n.to) {
            var i = n.marker.find(1, !0);
            return Cn(e, i.line, ln(i.line.markedSpans, n.marker))
        }
        if (n.marker.inclusiveRight && n.to == t.text.length) return ! 0;
        for (var r, o = 0; o < t.markedSpans.length; ++o) if ((r = t.markedSpans[o]).marker.collapsed && !r.marker.widgetNode && r.from == n.to && (null == r.to || r.to != n.from) && (r.marker.inclusiveLeft || n.marker.inclusiveRight) && Cn(e, t, r)) return ! 0
    }
    function Tn(e, t, n) {
        Zn(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Ut(e, null, n)
    }
    function En(e) {
        if (null != e.height) return e.height;
        var t = e.doc.cm;
        if (!t) return 0;
        if (!Ro(document.body, e.node)) {
            var n = "position: relative;";
            e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"),
            e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"),
            Ni(t.display.measure, Ii("div", [e.node], null, n))
        }
        return e.height = e.node.parentNode.offsetHeight
    }
    function Mn(e) {
        e.parent = null,
        hn(e)
    }
    function An(e, t) {
        if (e) for (;;) {
            var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
            if (!n) break;
            e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
            var i = n[1] ? "bgClass": "textClass";
            null == t[i] ? t[i] = n[2] : new RegExp("(?:^|s)" + n[2] + "(?:$|s)").test(t[i]) || (t[i] += " " + n[2])
        }
        return e
    }
    function On(t, n) {
        if (t.blankLine) return t.blankLine(n);
        if (t.innerMode) {
            var i = e.innerMode(t, n);
            return i.mode.blankLine ? i.mode.blankLine(i.state) : void 0
        }
    }
    function Ln(t, n, i, r) {
        for (var o = 0; o < 10; o++) {
            r && (r[0] = e.innerMode(t, i).mode);
            var s = t.token(n, i);
            if (n.pos > n.start) return s
        }
        throw new Error("Mode " + t.name + " failed to advance stream.")
    }
    function Pn(e, t, n, i) {
        function r(e) {
            return {
                start: p.start,
                end: p.pos,
                string: p.current(),
                type: o || null,
                state: e ? Ur(s.mode, u) : u
            }
        }
        var o, s = e.doc,
        a = s.mode;
        t = re(s, t);
        var l, c = Vn(s, t.line),
        u = Ee(e, t.line, n),
        p = new Zr(c.text, e.options.tabSize);
        for (i && (l = []); (i || p.pos < t.ch) && !p.eol();) p.start = p.pos,
        o = Ln(a, p, u),
        i && l.push(r(!0));
        return i ? l: r()
    }
    function Rn(e, t, n, i, r, o, s) {
      
    }
    function In(e, t, n, i) {
        var r = [e.state.modeGen],
        o = {};
        Rn(e, t.text, e.doc.mode, n,
        function(e, t) {
            r.push(e, t)
        },
        o, i);
        for (var s = 0; s < e.state.overlays.length; ++s) {
            var a = e.state.overlays[s],
            l = 1,
            c = 0;
            Rn(e, t.text, a.mode, !0,
            function(e, t) {
                for (var n = l; c < e;) {
                    var i = r[l];
                    i > e && r.splice(l, 1, e, r[l + 1], i),
                    l += 2,
                    c = Math.min(e, i)
                }
                if (t) if (a.opaque) r.splice(n, l - n, e, "cm-overlay " + t),
                l = n + 2;
                else for (; n < l; n += 2) {
                    var o = r[n + 1];
                    r[n + 1] = (o ? o + " ": "") + "cm-overlay " + t
                }
            },
            o)
        }
        return {
            styles: r,
            classes: o.bgClass || o.textClass ? o: null
        }
    }
    function jn(e, t, n) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
            var i = Ee(e, Qn(t)),
            r = In(e, t, t.text.length > e.options.maxHighlightLength ? Ur(e.doc.mode, i) : i);
            t.stateAfter = i,
            t.styles = r.styles,
            r.classes ? t.styleClasses = r.classes: t.styleClasses && (t.styleClasses = null),
            n === e.doc.frontier && e.doc.frontier++
        }
        return t.styles
    }
    function Nn(e, t, n, i) {
        var r = e.doc.mode,
        o = new Zr(t, e.options.tabSize);
        for (o.start = o.pos = i || 0, "" == t && On(r, n); ! o.eol();) Ln(r, o, n),
        o.start = o.pos
    }
    function Dn(e, t) {
        if (!e || /^\s*$/.test(e)) return null;
        var n = t.addModeClass ? so: oo;
        return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"))
    }
    function zn(e, t) {
        var n = Ii("span", null, null, or ? "padding-right: .1px": null),
        i = {
            pre: Ii("pre", [n], "CodeMirror-line"),
            content: n,
            col: 0,
            pos: 0,
            cm: e,
            trailingSpace: !1,
            splitSpaces: (ir || or) && e.getOption("lineWrapping")
        };
        t.measure = {};
        for (var r = 0; r <= (t.rest ? t.rest.length: 0); r++) {
            var o, s = r ? t.rest[r - 1] : t.line;
            i.pos = 0,
            i.addToken = Wn,
            function(e) {
                if (null != jo) return jo;
                var t = Ni(e, document.createTextNode("AخA"));
                
                return ji(e),
                !(!n || n.left == n.right) && (jo = i.right - n.right < 3)
            } (e.display.measure) && (o = ei(s)) && (i.addToken = function(e, t) {
                return function(n, i, r, o, s, a, l) {
                    r = r ? r + " cm-force-border": "cm-force-border";
                    for (var c = n.pos,
                    u = c + i.length;;) {
                        for (var p = 0; p < t.length; p++) {
                            var h = t[p];
                            if (h.to > c && h.from <= c) break
                        }
                        if (h.to >= u) return e(n, i, r, o, s, a, l);
                        e(n, i.slice(0, h.to - c), r, o, null, a, l),
                        o = null,
                        i = i.slice(h.to - c),
                        c = h.to
                    }
                }
            } (i.addToken, o)),
            i.map = []; !
            function(e, t, n) {
                var i = e.markedSpans,
                r = e.text,
                o = 0;
                if (!i) {
                    for (y = 1; y < n.length; y += 2) t.addToken(t, r.slice(o, o = n[y]), Dn(n[y + 1], t.cm.options));
                    return
                }
                for (var s, a, l, c, u, p, h, f = r.length,
                d = 0,
                y = 1,
                m = "",
                g = 0;;) {
                    if (g == d) {
                        l = c = u = p = a = "",
                        h = null,
                        g = 1 / 0;
                        for (var v, b = [], x = 0; x < i.length; ++x) {
                            var w = i[x],
                            _ = w.marker;
                            "bookmark" == _.type && w.from == d && _.widgetNode ? b.push(_) : w.from <= d && (null == w.to || w.to > d || _.collapsed && w.to == d && w.from == d) ? (null != w.to && w.to != d && g > w.to && (g = w.to, c = ""), _.className && (l += " " + _.className), _.css && (a = (a ? a + ";": "") + _.css), _.startStyle && w.from == d && (u += " " + _.startStyle), _.endStyle && w.to == g && (v || (v = [])).push(_.endStyle, w.to), _.title && !p && (p = _.title), _.collapsed && (!h || mn(h.marker, _) < 0) && (h = w)) : w.from > d && g > w.from && (g = w.from)
                        }
                        if (v) for (x = 0; x < v.length; x += 2) v[x + 1] == g && (c += " " + v[x]);
                        if (!h || h.from == d) for (x = 0; x < b.length; ++x) $n(t, 0, b[x]);
                        if (h && (h.from || 0) == d) {
                            if ($n(t, (null == h.to ? f + 1 : h.to) - d, h.marker, null == h.from), null == h.to) return;
                            h.to == d && (h = !1)
                        }
                    }
                    if (d >= f) break;
                    for (var k = Math.min(f, g);;) {
                        if (m) {
                            var S = d + m.length;
                            if (!h) {
                                var C = S > k ? m.slice(0, k - d) : m;
                                t.addToken(t, C, s ? s + l: l, u, d + C.length == g ? c: "", p, a)
                            }
                            if (S >= k) {
                                m = m.slice(k - d),
                                d = k;
                                break
                            }
                            d = S,
                            u = ""
                        }
                        m = r.slice(o, o = n[y++]),
                        s = Dn(n[y++], t.cm.options)
                    }
                }
            } (s, i, jn(e, s, t != e.display.externalMeasured && Qn(s))),
            s.styleClasses && (s.styleClasses.bgClass && (i.bgClass = Wi(s.styleClasses.bgClass, i.bgClass || "")), s.styleClasses.textClass && (i.textClass = Wi(s.styleClasses.textClass, i.textClass || ""))),
            0 == i.map.length && i.map.push(0, 0, i.content.appendChild(function(e) {
                if (null == Io) {
                    var t = Ii("span", "​");
                    Ni(e, Ii("span", [t, document.createTextNode("x")])),
                    0 != e.firstChild.offsetHeight && (Io = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(ir && rr < 8))
                }
                var n = Io ? Ii("span", "​") : Ii("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
                return n.setAttribute("cm-text", ""),
                n
            } (e.display.measure))),
            0 == r ? (t.measure.map = i.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(i.map), (t.measure.caches || (t.measure.caches = [])).push({}))
        }
        if (or) {
            var a = i.content.lastChild; (/\bcm-tab\b/.test(a.className) || a.querySelector && a.querySelector(".cm-tab")) && (i.content.className = "cm-tab-wrap-hack")
        }
        return vo(e, "renderLine", e, t.line, i.pre),
        i.pre.className && (i.textClass = Wi(i.pre.className, i.textClass || "")),
        i
    }
    function Wn(e, t, n, i, r, o, s) {
        if (t) {
            var a = e.splitSpaces ?
            function(e, t) {
                if (e.length > 1 && !/  /.test(e)) return e;
                for (var n = t,
                i = "",
                r = 0; r < e.length; r++) {
                    var o = e.charAt(r);
                    " " != o || !n || r != e.length - 1 && 32 != e.charCodeAt(r + 1) || (o = " "),
                    i += o,
                    n = " " == o
                }
                return i
            } (t, e.trailingSpace) : t,
            l = e.cm.state.specialChars,
            c = !1;
            if (l.test(t)) for (var u = document.createDocumentFragment(), p = 0;;) {
                l.lastIndex = p;
                var h = l.exec(t),
                f = h ? h.index - p: t.length - p;
                if (f) {
                    m = document.createTextNode(a.slice(p, p + f));
                    ir && rr < 9 ? u.appendChild(Ii("span", [m])) : u.appendChild(m),
                    e.map.push(e.pos, e.pos + f, m),
                    e.col += f,
                    e.pos += f
                }
                if (!h) break;
                if (p += f + 1, "\t" == h[0]) {
                    var d = e.cm.options.tabSize,
                    y = d - e.col % d; (m = u.appendChild(Ii("span", ki(y), "cm-tab"))).setAttribute("role", "presentation"),
                    m.setAttribute("cm-text", "\t"),
                    e.col += y
                } else if ("\r" == h[0] || "\n" == h[0]) { (m = u.appendChild(Ii("span", "\r" == h[0] ? "␍": "␤", "cm-invalidchar"))).setAttribute("cm-text", h[0]),
                    e.col += 1
                } else {
                    var m; (m = e.cm.options.specialCharPlaceholder(h[0])).setAttribute("cm-text", h[0]),
                    ir && rr < 9 ? u.appendChild(Ii("span", [m])) : u.appendChild(m),
                    e.col += 1
                }
                e.map.push(e.pos, e.pos + 1, m),
                e.pos++
            } else {
                e.col += t.length;
                u = document.createTextNode(a);
                e.map.push(e.pos, e.pos + t.length, u),
                ir && rr < 9 && (c = !0),
                e.pos += t.length
            }
            if (e.trailingSpace = 32 == a.charCodeAt(t.length - 1), n || i || r || c || s) {
                var g = n || "";
                i && (g += i),
                r && (g += r);
                var v = Ii("span", [u], g, s);
                return o && (v.title = o),
                e.content.appendChild(v)
            }
            e.content.appendChild(u)
        }
    }
    function $n(e, t, n, i) {
        var r = !i && n.widgetNode;
        r && e.map.push(e.pos, e.pos + t, r),
        !i && e.cm.display.input.needsContentAttribute && (r || (r = e.content.appendChild(document.createElement("span"))), r.setAttribute("cm-marker", n.id)),
        r && (e.cm.display.input.setUneditable(r), e.content.appendChild(r)),
        e.pos += t,
        e.trailingSpace = !1
    }
    function Bn(e, t) {
        return 0 == t.from.ch && 0 == t.to.ch && "" == Si(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
    }
    function Hn(e, t, n, i) {
        function r(e) {
            return n ? n[e] : null
        }
        function o(e, n, r) { !
            function(e, t, n, i) {
                e.text = t,
                e.stateAfter && (e.stateAfter = null),
                e.styles && (e.styles = null),
                null != e.order && (e.order = null),
                hn(e),
                fn(e, n);
                var r = i ? i(e) : 1;
                r != e.height && Xn(e, r)
            } (e, n, r, i),
            mi(e, "change", e, t)
        }
        function s(e, t) {
            for (var n = e,
            o = []; n < t; ++n) o.push(new ro(c[n], r(n), i));
            return o
        }
        var a = t.from,
        l = t.to,
        c = t.text,
        u = Vn(e, a.line),
        p = Vn(e, l.line),
        h = Si(c),
        f = r(c.length - 1),
        d = l.line - a.line;
        if (t.full) e.insert(0, s(0, c.length)),
        e.remove(c.length, e.size - c.length);
        else if (Bn(e, t)) {
            y = s(0, c.length - 1);
            o(p, p.text, f),
            d && e.remove(a.line, d),
            y.length && e.insert(a.line, y)
        } else if (u == p) if (1 == c.length) o(u, u.text.slice(0, a.ch) + h + u.text.slice(l.ch), f);
        else { (y = s(1, c.length - 1)).push(new ro(h + u.text.slice(l.ch), f, i)),
            o(u, u.text.slice(0, a.ch) + c[0], r(0)),
            e.insert(a.line + 1, y)
        } else if (1 == c.length) o(u, u.text.slice(0, a.ch) + c[0] + p.text.slice(l.ch), r(0)),
        e.remove(a.line + 1, d);
        else {
            o(u, u.text.slice(0, a.ch) + c[0], r(0)),
            o(p, h + p.text.slice(l.ch), f);
            var y = s(1, c.length - 1);
            d > 1 && e.remove(a.line + 1, d - 1),
            e.insert(a.line + 1, y)
        }
        mi(e, "change", e, t)
    }
    function Fn(e) {
        this.lines = e,
        this.parent = null;
        for (var t = 0,
        n = 0; t < e.length; ++t) e[t].parent = this,
        n += e[t].height;
        this.height = n
    }
    function qn(e) {
        this.children = e;
        for (var t = 0,
        n = 0,
        i = 0; i < e.length; ++i) {
            var r = e[i];
            t += r.chunkSize(),
            n += r.height,
            r.parent = this
        }
        this.size = t,
        this.height = n,
        this.parent = null
    }
    function Kn(e, t, n) {
        function i(e, r, o) {
            if (e.linked) for (var s = 0; s < e.linked.length; ++s) {
                var a = e.linked[s];
                if (a.doc != r) {
                    var l = o && a.sharedHist;
                    n && !l || (t(a.doc, l), i(a.doc, e, l))
                }
            }
        }
        i(e, null, !0)
    }
    function Un(e, n) {
        if (n.cm) throw new Error("This document is already in use.");
        e.doc = n,
        n.cm = e,
        r(e),
        t(e),
        e.options.lineWrapping || u(e),
        e.options.mode = n.modeOption,
        ct(e)
    }
    function Vn(e, t) {
        if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var n = e; ! n.lines;) for (var i = 0;; ++i) {
            var r = n.children[i],
            o = r.chunkSize();
            if (t < o) {
                n = r;
                break
            }
            t -= o
        }
        return n.lines[t]
    }
    function Gn(e, t, n) {
        var i = [],
        r = t.line;
        return e.iter(t.line, n.line + 1,
        function(e) {
            var o = e.text;
            r == n.line && (o = o.slice(0, n.ch)),
            r == t.line && (o = o.slice(t.ch)),
            i.push(o),
            ++r
        }),
        i
    }
    function Jn(e, t, n) {
        var i = [];
        return e.iter(t, n,
        function(e) {
            i.push(e.text)
        }),
        i
    }
    function Xn(e, t) {
        var n = t - e.height;
        if (n) for (var i = e; i; i = i.parent) i.height += n
    }
    function Qn(e) {
        if (null == e.parent) return null;
        for (var t = e.parent,
        n = Ci(t.lines, e), i = t.parent; i; t = i, i = i.parent) for (var r = 0; i.children[r] != t; ++r) n += i.children[r].chunkSize();
        return n + t.first
    }
    function Yn(e, t) {
        var n = e.first;
        e: do {
            for (o = 0; o < e.children.length; ++o) {
                var i = e.children[o],
                r = i.height;
                if (t < r) {
                    e = i;
                    continue e
                }
                t -= r,
                n += i.chunkSize()
            }
            return n
        } while (! e . lines );
        for (var o = 0; o < e.lines.length; ++o) {
            var s = e.lines[o].height;
            if (t < s) break;
            t -= s
        }
        return n + o
    }
    function Zn(e) {
        for (var t = 0,
        n = (e = wn(e)).parent, i = 0; i < n.lines.length; ++i) {
            var r = n.lines[i];
            if (r == e) break;
            t += r.height
        }
        for (var o = n.parent; o; n = o, o = n.parent) for (i = 0; i < o.children.length; ++i) {
            var s = o.children[i];
            if (s == n) break;
            t += s.height
        }
        return t
    }
    function ei(e) {
        var t = e.order;
        return t
    }
    function ti(e) {
        this.done = [],
        this.undone = [],
        this.undoDepth = 1 / 0,
        this.lastModTime = this.lastSelTime = 0,
        this.lastOp = this.lastSelOp = null,
        this.lastOrigin = this.lastSelOrigin = null,
        this.generation = this.maxGeneration = e || 1
    }
    function ni(e, t) {
        var n = {
            from: z(t.from),
            to: Dr(t),
            text: Gn(e, t.from, t.to)
        };
        return si(e, n, t.from.line, t.to.line + 1),
        Kn(e,
        function(e) {
            si(e, n, t.from.line, t.to.line + 1)
        },
        !0),
        n
    }
    function ii(e) {
        for (; e.length;) {
            if (!Si(e).ranges) break;
            e.pop()
        }
    }
    function ri(e, t, n, i) {
        var r = e.history;
        r.undone.length = 0;
        var o, s = +new Date;
        if ((r.lastOp == i || r.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && r.lastModTime > s - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (o = function(e, t) {
            return t ? (ii(e.done), Si(e.done)) : e.done.length && !Si(e.done).ranges ? Si(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), Si(e.done)) : void 0
        } (r, r.lastOp == i))) {
            var a = Si(o.changes);
            0 == kr(t.from, t.to) && 0 == kr(t.from, a.to) ? a.to = Dr(t) : o.changes.push(ni(e, t))
        } else {
            var l = Si(r.done);
            for (l && l.ranges || oi(e.sel, r.done), o = {
                changes: [ni(e, t)],
                generation: r.generation
            },
            r.done.push(o); r.done.length > r.undoDepth;) r.done.shift(),
            r.done[0].ranges || r.done.shift()
        }
        r.done.push(n),
        r.generation = ++r.maxGeneration,
        r.lastModTime = r.lastSelTime = s,
        r.lastOp = r.lastSelOp = i,
        r.lastOrigin = r.lastSelOrigin = t.origin,
        a || vo(e, "historyAdded")
    }
    function oi(e, t) {
        var n = Si(t);
        n && n.ranges && n.equals(e) || t.push(e)
    }
    function si(e, t, n, i) {
        var r = t["spans_" + e.id],
        o = 0;
        e.iter(Math.max(e.first, n), Math.min(e.first + e.size, i),
        function(n) {
            n.markedSpans && ((r || (r = t["spans_" + e.id] = {}))[o] = n.markedSpans),
            ++o
        })
    }
    function ai(e) {
        if (!e) return null;
        for (var t, n = 0; n < e.length; ++n) e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
        return t ? t.length ? t: null: e
    }
    function li(e, t, n) {
        for (var i = 0,
        r = []; i < e.length; ++i) {
            var o = e[i];
            if (o.ranges) r.push(n ? Z.prototype.deepCopy.call(o) : o);
            else {
                var s = o.changes,
                a = [];
                r.push({
                    changes: a
                });
                for (var l = 0; l < s.length; ++l) {
                    var c, u = s[l];
                    if (a.push({
                        from: u.from,
                        to: u.to,
                        text: u.text
                    }), t) for (var p in u)(c = p.match(/^spans_(\d+)$/)) && Ci(t, Number(c[1])) > -1 && (Si(a)[p] = u[p], delete u[p])
                }
            }
        }
        return r
    }
    function ci(e, t, n, i) {
        n < e.line ? e.line += i: t < e.line && (e.line = t, e.ch = 0)
    }
    function ui(e, t, n, i) {
        for (var r = 0; r < e.length; ++r) {
            var o = e[r],
            s = !0;
            if (o.ranges) {
                o.copied || ((o = e[r] = o.deepCopy()).copied = !0);
                for (a = 0; a < o.ranges.length; a++) ci(o.ranges[a].anchor, t, n, i),
                ci(o.ranges[a].head, t, n, i)
            } else {
                for (var a = 0; a < o.changes.length; ++a) {
                    var l = o.changes[a];
                    if (n < l.from.line) l.from = _r(l.from.line + i, l.from.ch),
                    l.to = _r(l.to.line + i, l.to.ch);
                    else if (t <= l.to.line) {
                        s = !1;
                        break
                    }
                }
                s || (e.splice(0, r + 1), r = 0)
            }
        }
    }
    function pi(e, t) {
        var n = t.from.line,
        i = t.to.line,
        r = t.text.length - (i - n) - 1;
        ui(e.done, n, i, r),
        ui(e.undone, n, i, r)
    }
    function hi(e) {
        return null != e.defaultPrevented ? e.defaultPrevented: 0 == e.returnValue
    }
    function fi(e) {
        return e.target || e.srcElement
    }
    function di(e) {
        var t = e.which;
        return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)),
        dr && e.ctrlKey && 1 == t && (t = 3),
        t
    }
    function yi(e, t, n) {
        var i = e._handlers && e._handlers[t];
        return n
    }
    function mi(e, t) {
        function n(e) {
            return function() {
                e.apply(null, o)
            }
        }
        var i = yi(e, t, !1);
        if (i.length) {
            var r, o = Array.prototype.slice.call(arguments, 2);
            Ar ? r = Ar.delayedCallbacks: bo ? r = bo: (r = bo = [], setTimeout(gi, 0));
            for (var s = 0; s < i.length; ++s) r.push(n(i[s]))
        }
    }
    function gi() {
        var e = bo;
        bo = null;
        for (var t = 0; t < e.length; ++t) e[t]()
    }
    function vi(e, t, n) {
        return "string" == typeof t && (t = {
            type: t,
            preventDefault: function() {
                this.defaultPrevented = !0
            }
        }),
        vo(e, n || t.type, e, t),
        hi(t) || t.codemirrorIgnore
    }
    function bi(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (t) for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), i = 0; i < t.length; ++i) - 1 == Ci(n, t[i]) && n.push(t[i])
    }
    function xi(e, t) {
        return
    }
    function wi(e) {
        e.prototype.on = function(e, t) {
            yo(this, e, t)
        },
        e.prototype.off = function(e, t) {
            go(this, e, t)
        }
    }
    function _i() {
        this.id = null
    }
    function ki(e) {
        for (; Eo.length <= e;) Eo.push(Si(Eo) + " ");
        return Eo[e]
    }
    function Si(e) {
        return e[e.length - 1]
    }
    function Ci(e, t) {
        for (var n = 0; n < e.length; ++n) if (e[n] == t) return n;
        return - 1
    }
    function Ti(e, t) {
        for (var n = [], i = 0; i < e.length; i++) n[i] = t(e[i], i);
        return n
    }
    function Ei() {}
    function Mi(e, t) {
        var n;
        return Object.create ? n = Object.create(e) : (Ei.prototype = e, n = new Ei),
        t && Ai(t, n),
        n
    }
    function Ai(e, t, n) {
        t || (t = {});
        for (var i in e) ! e.hasOwnProperty(i) || !1 === n && t.hasOwnProperty(i) || (t[i] = e[i]);
        return t
    }
    function Oi(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
            return e.apply(null, t)
        }
    }
    function Li(e, t) {
        return t ? !!(t.source.indexOf("\\w") > -1 && Lo(e)) || t.test(e) : Lo(e)
    }
    function Pi(e) {
        for (var t in e) if (e.hasOwnProperty(t) && e[t]) return ! 1;
        return ! 0
    }
    function Ri(e) {
        return e.charCodeAt(0) >= 768 && Po.test(e)
    }
    function Ii(e, t, n, i) {
        var r = document.createElement(e);
        if (n && (r.className = n), i && (r.style.cssText = i), "string" == typeof t) r.appendChild(document.createTextNode(t));
        else if (t) for (var o = 0; o < t.length; ++o) r.appendChild(t[o]);
        return r
    }
    function ji(e) {
        for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
        return e
    }
    function Ni(e, t) {
        return ji(e).appendChild(t)
    }
    function Di() {
        for (var e = document.activeElement; e && e.root && e.root.activeElement;) e = e.root.activeElement;
        return e
    }
    function zi(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
    }
    function Wi(e, t) {
        for (var n = e.split(" "), i = 0; i < n.length; i++) n[i] && !zi(n[i]).test(t) && (t += " " + n[i]);
        return t
    }
    function $i(e) {
        if (document.body.getElementsByClassName) for (var t = document.body.getElementsByClassName("CodeMirror"), n = 0; n < t.length; n++) {
            var i = t[n].CodeMirror;
            i && e(i)
        }
    }
    function Bi(e) {
        return e.level % 2 ? e.to: e.from
    }
    function Hi(e) {
        return e.level % 2 ? e.from: e.to
    }
    function Fi(e) {
        var t = ei(e);
        return t ? Bi(t[0]) : 0
    }
    function qi(e) {
        var t = ei(e);
        return t ? Hi(Si(t)) : e.text.length
    }
    function Ki(e, t) {
        var n = Vn(e.doc, t),
        i = wn(n);
        i != n && (t = Qn(i));
        var r = ei(i),
        o = r ? r[0].level % 2 ? qi(i) : Fi(i) : 0;
        return _r(t, o)
    }
    function Ui(e, t) {
        var n = Ki(e, t.line),
        i = Vn(e.doc, n.line),
        r = ei(i);
        if (!r || 0 == r[0].level) {
            var o = Math.max(0, i.text.search(/\S/)),
            s = t.line == n.line && t.ch <= o && t.ch;
            return _r(n.line, s ? 0 : o)
        }
        return n
    }
    function Vi(e, t, n) {
        var i = e[0].level;
        return t == i || n != i && t < n
    }
    function Gi(e, t) {
        Ko = null;
        for (var n, i = 0; i < e.length; ++i) {
            var r = e[i];
            if (r.from < t && r.to > t) return i;
            if (r.from == t || r.to == t) {
                if (null != n) return Vi(e, r.level, e[n].level) ? (r.from != r.to && (Ko = n), i) : (r.from != r.to && (Ko = i), n);
                n = i
            }
        }
        return n
    }
    function Ji(e, t, n, i) {
        if (!i) return t + n;
        do {
            t += n
        } while ( t > 0 && Ri ( e . text . charAt ( t )));
        return t
    }
    function Xi(e, t, n, i) {
        var r = ei(e);
        if (!r) return Qi(e, t, n, i);
        for (var o = Gi(r, t), s = r[o], a = Ji(e, t, s.level % 2 ? -n: n, i);;) {
            if (a > s.from && a < s.to) return a;
            if (a == s.from || a == s.to) return Gi(r, a) == o ? a: (s = r[o += n], n > 0 == s.level % 2 ? s.to: s.from);
            if (! (s = r[o += n])) return null;
            a = n > 0 == s.level % 2 ? Ji(e, s.to, -1, i) : Ji(e, s.from, 1, i)
        }
    }
    function Qi(e, t, n, i) {
        var r = t + n;
        if (i) for (; r > 0 && Ri(e.text.charAt(r));) r += n;
        return r < 0 || r > e.text.length ? null: r
    }
    var Yi = navigator.userAgent,
    Zi = navigator.platform,
    er = /gecko\/\d/i.test(Yi),
    tr = /MSIE \d/.test(Yi),
    nr = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Yi),
    ir = tr || nr,
    rr = ir && (tr ? document.documentMode || 6 : nr[1]),
    or = /WebKit\//.test(Yi),
    sr = or && /Qt\/\d+\.\d+/.test(Yi),
    ar = /Chrome\//.test(Yi),
    lr = /Opera\//.test(Yi),
    cr = /Apple Computer/.test(navigator.vendor),
    ur = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(Yi),
    pr = /PhantomJS/.test(Yi),
    hr = /AppleWebKit/.test(Yi) && /Mobile\/\w+/.test(Yi),
    fr = hr || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(Yi),
    dr = hr || /Mac/.test(Zi),
    yr = /\bCrOS\b/.test(Yi),
    mr = /win/i.test(Zi),
    gr = lr && Yi.match(/Version\/(\d*\.\d*)/);
    gr && (gr = Number(gr[1])),
    gr && gr >= 15 && (lr = !1, or = !0);
    var vr = dr && (sr || lr && (null == gr || gr < 12.11)),
    br = er || ir && rr >= 9,
    xr = !1,
    wr = !1;
    f.prototype = Ai({
        update: function(e) {
            var t = e.scrollWidth > e.clientWidth + 1,
            n = e.scrollHeight > e.clientHeight + 1,
            i = e.nativeBarWidth;
            if (n) {
                this.vert.style.display = "block",
                this.vert.style.bottom = t ? i + "px": "0";
                var r = e.viewHeight - (t ? i: 0);
                this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + r) + "px"
            } else this.vert.style.display = "",
            this.vert.firstChild.style.height = "0";
            if (t) {
                this.horiz.style.display = "block",
                this.horiz.style.right = n ? i + "px": "0",
                this.horiz.style.left = e.barLeft + "px";
                var o = e.viewWidth - e.barLeft - (n ? i: 0);
                this.horiz.firstChild.style.width = e.scrollWidth - e.clientWidth + o + "px"
            } else this.horiz.style.display = "",
            this.horiz.firstChild.style.width = "0";
            return ! this.checkedZeroWidth && e.clientHeight > 0 && (0 == i && this.zeroWidthHack(), this.checkedZeroWidth = !0),
            {
                right: n ? i: 0,
                bottom: t ? i: 0
            }
        },
        setScrollLeft: function(e) {
            this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e),
            this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz)
        },
        setScrollTop: function(e) {
            this.vert.scrollTop != e && (this.vert.scrollTop = e),
            this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert)
        },
        zeroWidthHack: function() {
            var e = dr && !ur ? "12px": "18px";
            this.horiz.style.height = this.vert.style.width = e,
            this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none",
            this.disableHoriz = new _i,
            this.disableVert = new _i
        },
        enableZeroWidthBar: function(e, t) {
            function n() {
                var i = e.getBoundingClientRect();
                document.elementFromPoint(i.left + 1, i.bottom - 1) != e ? e.style.pointerEvents = "none": t.set(1e3, n)
            }
            e.style.pointerEvents = "auto",
            t.set(1e3, n)
        },
        clear: function() {
            var e = this.horiz.parentNode;
            e.removeChild(this.horiz),
            e.removeChild(this.vert)
        }
    },
    f.prototype),
    d.prototype = Ai({
        update: function() {
            return {
                bottom: 0,
                right: 0
            }
        },
        setScrollLeft: function() {},
        setScrollTop: function() {},
        clear: function() {}
    },
    d.prototype),
    e.scrollbarModel = {
        native: f,
        null: d
    },
    k.prototype.signal = function(e, t) {
        xi(e, t) && this.events.push(arguments)
    },
    k.prototype.finish = function() {
        for (var e = 0; e < this.events.length; e++) vo.apply(null, this.events[e])
    };
    var _r = e.Pos = function(e, t) {
        if (! (this instanceof _r)) return new _r(e, t);
        this.line = e,
        this.ch = t
    },
    kr = e.cmpPos = function(e, t) {
        return e.line - t.line || e.ch - t.ch
    },
    Sr = null;
    V.prototype = Ai({
        init: function(e) {
            function t(e) {
                if (!vi(i, e)) {
                    if (i.somethingSelected()) Sr = {
                        lineWise: !1,
                        text: i.getSelections()
                    },
                    n.inaccurateSelection && (n.prevInput = "", n.inaccurateSelection = !1, o.value = Sr.text.join("\n"), Mo(o));
                    else {
                        if (!i.options.lineWiseCopyCut) return;
                        var t = K(i);
                        Sr = {
                            lineWise: !0,
                            text: t.text
                        },
                        "cut" == e.type ? i.setSelections(t.ranges, null, _o) : (n.prevInput = "", o.value = t.text.join("\n"), Mo(o))
                    }
                    "cut" == e.type && (i.state.cutIncoming = !0)
                }
            }
            var n = this,
            i = this.cm,
            r = this.wrapper = G(),
            o = this.textarea = r.firstChild;
            e.wrapper.insertBefore(r, e.wrapper.firstChild);
            
        },
        prepareSelection: function() {
            var e = this.cm,
            t = e.display,
            n = e.doc,
            i = _e(e);
            if (e.options.moveInputWithCursor) {
                var r = Je(e, n.sel.primary().head, "div"),
                o = t.wrapper.getBoundingClientRect(),
                s = t.lineDiv.getBoundingClientRect();
                i.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, r.top + s.top - o.top)),
                i.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, r.left + s.left - o.left))
            }
            return i
        },
        showSelection: function(e) {
            var t = this.cm.display;
            Ni(t.cursorDiv, e.cursors),
            Ni(t.selectionDiv, e.selection),
            null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
        },
        reset: function(e) {
            if (!this.contextMenuPending) {
                var t, n, i = this.cm,
                r = i.doc;
                
                this.inaccurateSelection = t
            }
        },
        getField: function() {
            return this.textarea
        },
        supportsTouch: function() {
            return ! 1
        },
        focus: function() {
            if ("nocursor" != this.cm.options.readOnly && (!fr || Di() != this.textarea)) try {
                this.textarea.focus()
            } catch(e) {}
        },
        blur: function() {
            this.textarea.blur()
        },
        resetPosition: function() {
            this.wrapper.style.top = this.wrapper.style.left = 0
        },
        receivedFocus: function() {
            this.slowPoll()
        },
        slowPoll: function() {
            var e = this;
            e.pollingFast || e.polling.set(this.cm.options.pollInterval,
            function() {
                e.poll(),
                e.cm.state.focused && e.slowPoll()
            })
        },
        fastPoll: function() {
            function e() {
                n.poll() || t ? (n.pollingFast = !1, n.slowPoll()) : (t = !0, n.polling.set(60, e))
            }
            var t = !1,
            n = this;
            n.pollingFast = !0,
            n.polling.set(20, e)
        },
        poll: function() {
            var e = this.cm,
            t = this.textarea,
            n = this.prevInput;
            if (this.contextMenuPending || !e.state.focused || Bo(t) && !n && !this.composing || e.isReadOnly() || e.options.disableInput || e.state.keySeq) return ! 1;
            var i = t.value;
            if (i == n && !e.somethingSelected()) return ! 1;
            if (ir && rr >= 9 && this.hasSelection === i || dr && /[\uf700-\uf7ff]/.test(i)) return e.display.input.reset(),
            !1;
            if (e.doc.sel == e.display.selForContextMenu) {
                var r = i.charCodeAt(0);
                if (8203 != r || n || (n = "​"), 8666 == r) return this.reset(),
                this.cm.execCommand("undo")
            }
            for (var o = 0,
            s = Math.min(n.length, i.length); o < s && n.charCodeAt(o) == i.charCodeAt(o);)++o;
            var a = this;
            return it(e,
            function() {
                H(e, i.slice(o), n.length - o, null, a.composing ? "*compose": null),
                i.length > 1e3 || i.indexOf("\n") > -1 ? t.value = a.prevInput = "": a.prevInput = i,
                a.composing && (a.composing.range.clear(), a.composing.range = e.markText(a.composing.start, e.getCursor("to"), {
                    className: "CodeMirror-composing"
                }))
            }),
            !0
        },
        ensurePolled: function() {
            this.pollingFast && this.poll() && (this.pollingFast = !1)
        },
        onKeyPress: function() {
            ir && rr >= 9 && (this.hasSelection = null),
            this.fastPoll()
        },
        onContextMenu: function(e) {
            function t() {
                if (null != s.selectionStart) {
                    var e = r.somethingSelected(),
                    t = "​" + (e ? s.value: "");
                    s.value = "⇚",
                    s.value = t,
                    i.prevInput = e ? "": "​",
                    s.selectionStart = 1,
                    s.selectionEnd = t.length,
                    o.selForContextMenu = r.doc.sel
                }
            }
            function n() {
                if (i.contextMenuPending = !1, i.wrapper.style.cssText = u, s.style.cssText = c, ir && rr < 9 && o.scrollbars.setScrollTop(o.scroller.scrollTop = l), null != s.selectionStart) { (!ir || ir && rr < 9) && t();
                    var e = 0,
                    n = function() {
                        o.selForContextMenu == r.doc.sel && 0 == s.selectionStart && s.selectionEnd > 0 && "​" == i.prevInput ? rt(r, Gr.selectAll)(r) : e++<10 ? o.detectingSelectAll = setTimeout(n, 500) : o.input.reset()
                    };
                    o.detectingSelectAll = setTimeout(n, 200)
                }
            }
            var i = this,
            r = i.cm,
            o = r.display,
            s = i.textarea,
            a = gt(r, e),
            l = o.scroller.scrollTop;
            if (a && !lr) {
                r.options.resetSelectionOnContextMenu && -1 == r.doc.sel.contains(a) && rt(r, fe)(r.doc, ne(a), _o);
                var c = s.style.cssText,
                u = i.wrapper.style.cssText;
                i.wrapper.style.cssText = "position: absolute";
                var p = i.wrapper.getBoundingClientRect();
                if (s.style.cssText = "position: absolute; width: 30px; height: 30px; top: " + (e.clientY - p.top - 5) + "px; left: " + (e.clientX - p.left - 5) + "px; z-index: 1000; background: " + (ir ? "rgba(255, 255, 255, .05)": "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", or) var h = window.scrollY;
                if (o.input.focus(), or && window.scrollTo(null, h), o.input.reset(), r.somethingSelected() || (s.value = i.prevInput = " "), i.contextMenuPending = !0, o.selForContextMenu = r.doc.sel, clearTimeout(o.detectingSelectAll), ir && rr >= 9 && t(), br) {
                    fo(e);
                    var f = function() {
                        go(window, "mouseup", f),
                        setTimeout(n, 20)
                    };
                    yo(window, "mouseup", f)
                } else setTimeout(n, 50)
            }
        },
        readOnlyChanged: function(e) {
            e || this.reset()
        },
        setUneditable: Ei,
        needsContentAttribute: !1
    },
    V.prototype),
    J.prototype = Ai({
        init: function(e) {
            function t(e) {
                if (!vi(i, e)) {
                    if (i.somethingSelected()) Sr = {
                        lineWise: !1,
                        text: i.getSelections()
                    },
                    "cut" == e.type && i.replaceSelection("", null, "cut");
                    else {
                        if (!i.options.lineWiseCopyCut) return;
                        var t = K(i);
                        Sr = {
                            lineWise: !0,
                            text: t.text
                        },
                        "cut" == e.type && i.operation(function() {
                            i.setSelections(t.ranges, 0, _o),
                            i.replaceSelection("", null, "cut")
                        })
                    }
                    if (e.clipboardData) {
                        e.clipboardData.clearData();
                        var o = Sr.text.join("\n");
                        if (e.clipboardData.setData("Text", o), e.clipboardData.getData("Text") == o) return void e.preventDefault()
                    }
                    var s = G(),
                    a = s.firstChild;
                    i.display.lineSpace.insertBefore(s, i.display.lineSpace.firstChild),
                    a.value = Sr.text.join("\n");
                    var l = document.activeElement;
                    Mo(a),
                    setTimeout(function() {
                        i.display.lineSpace.removeChild(s),
                        l.focus(),
                        l == r && n.showPrimarySelection()
                    },
                    50)
                }
            }
            var n = this,
            i = n.cm,
            r = n.div = e.lineDiv;
            U(r, i.options.spellcheck),
            yo(r, "paste",
            function(e) {
                vi(i, e) || F(e, i) || rr <= 11 && setTimeout(rt(i,
                function() {
                    n.pollContent() || ct(i)
                }), 20)
            }),
            yo(r, "compositionstart",
            function(e) {
                var t = e.data;
                if (n.composing = {
                    sel: i.doc.sel,
                    data: t,
                    startData: t
                },
                t) {
                    var r = i.doc.sel.primary(),
                    o = i.getLine(r.head.line).indexOf(t, Math.max(0, r.head.ch - t.length));
                    o > -1 && o <= r.head.ch && (n.composing.sel = ne(_r(r.head.line, o), _r(r.head.line, o + t.length)))
                }
            }),
            yo(r, "compositionupdate",
            function(e) {
                n.composing.data = e.data
            }),
            yo(r, "compositionend",
            function(e) {
                var t = n.composing;
                t && (e.data == t.startData || /\u200b/.test(e.data) || (t.data = e.data), setTimeout(function() {
                    t.handled || n.applyComposition(t),
                    n.composing == t && (n.composing = null)
                },
                50))
            }),
            yo(r, "touchstart",
            function() {
                n.forceCompositionEnd()
            }),
            yo(r, "input",
            function() {
                n.composing || !i.isReadOnly() && n.pollContent() || it(n.cm,
                function() {
                    ct(i)
                })
            }),
            yo(r, "copy", t),
            yo(r, "cut", t)
        },
        prepareSelection: function() {
            var e = _e(this.cm, !1);
            return e.focus = this.cm.state.focused,
            e
        },
        showSelection: function(e, t) {
            e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e))
        },
        showPrimarySelection: function() {
            var e = window.getSelection(),
            t = this.cm.doc.sel.primary(),
            n = Y(this.cm, e.anchorNode, e.anchorOffset),
            i = Y(this.cm, e.focusNode, e.focusOffset);
            if (!n || n.bad || !i || i.bad || 0 != kr($(n, i), t.from()) || 0 != kr(W(n, i), t.to())) {
                var r = X(this.cm, t.from()),
                o = X(this.cm, t.to());
                if (r || o) {
                    var s = this.cm.display.view,
                    a = e.rangeCount && e.getRangeAt(0);
                    if (r) {
                        if (!o) {
                            var l = s[s.length - 1].measure,
                            c = l.maps ? l.maps[l.maps.length - 1] : l.map;
                            o = {
                                node: c[c.length - 1],
                                offset: c[c.length - 2] - c[c.length - 3]
                            }
                        }
                    } else r = {
                        node: s[0].measure.map[2],
                        offset: 0
                    };
                    try {
                        var u = Ao(r.node, r.offset, o.offset, o.node)
                    } catch(e) {}
                    u && (!er && this.cm.state.focused ? (e.collapse(r.node, r.offset), u.collapsed || e.addRange(u)) : (e.removeAllRanges(), e.addRange(u)), a && null == e.anchorNode ? e.addRange(a) : er && this.startGracePeriod()),
                    this.rememberSelection()
                }
            }
        },
        startGracePeriod: function() {
            var e = this;
            clearTimeout(this.gracePeriod),
            this.gracePeriod = setTimeout(function() {
                e.gracePeriod = !1,
                e.selectionChanged() && e.cm.operation(function() {
                    e.cm.curOp.selectionChanged = !0
                })
            },
            20)
        },
        showMultipleSelections: function(e) {
            Ni(this.cm.display.cursorDiv, e.cursors),
            Ni(this.cm.display.selectionDiv, e.selection)
        },
        rememberSelection: function() {
            var e = window.getSelection();
            this.lastAnchorNode = e.anchorNode,
            this.lastAnchorOffset = e.anchorOffset,
            this.lastFocusNode = e.focusNode,
            this.lastFocusOffset = e.focusOffset
        },
        selectionInEditor: function() {
            var e = window.getSelection();
            if (!e.rangeCount) return ! 1;
            var t = e.getRangeAt(0).commonAncestorContainer;
            return Ro(this.div, t)
        },
        focus: function() {
            "nocursor" != this.cm.options.readOnly && this.div.focus()
        },
        blur: function() {
            this.div.blur()
        },
        getField: function() {
            return this.div
        },
        supportsTouch: function() {
            return ! 0
        },
        receivedFocus: function() {
            function e() {
                t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e))
            }
            var t = this;
            this.selectionInEditor() ? this.pollSelection() : it(this.cm,
            function() {
                t.cm.curOp.selectionChanged = !0
            }),
            this.polling.set(this.cm.options.pollInterval, e)
        },
        selectionChanged: function() {
            var e = window.getSelection();
            return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
        },
        pollSelection: function() {
            if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
                var e = window.getSelection(),
                t = this.cm;
                this.rememberSelection();
                var n = Y(t, e.anchorNode, e.anchorOffset),
                i = Y(t, e.focusNode, e.focusOffset);
                n && i && it(t,
                function() {
                    fe(t.doc, ne(n, i), _o),
                    (n.bad || i.bad) && (t.curOp.selectionChanged = !0)
                })
            }
        },
        pollContent: function() {
            var e = this.cm,
            t = e.display,
            n = e.doc.sel.primary(),
            i = n.from(),
            r = n.to();
            if (i.line < t.viewFrom || r.line > t.viewTo - 1) return ! 1;
            var o;
            if (i.line == t.viewFrom || 0 == (o = ht(e, i.line))) var s = Qn(t.view[0].line),
            a = t.view[0].node;
            else var s = Qn(t.view[o].line),
            a = t.view[o - 1].node.nextSibling;
            var l = ht(e, r.line);
            if (l == t.view.length - 1) var c = t.viewTo - 1,
            u = t.lineDiv.lastChild;
            else var c = Qn(t.view[l + 1].line) - 1,
            u = t.view[l + 1].node.previousSibling;
            for (var p = e.doc.splitLines(function(e, t, n, i, r) {
                function o(t) {
                    if (1 == t.nodeType) {
                        var n = t.getAttribute("cm-text");
                        if (null != n) return "" == n && (n = t.textContent.replace(/\u200b/g, "")),
                        void(s += n);
                        var c, u = t.getAttribute("cm-marker");
                        if (u) {
                            var p = e.findMarks(_r(i, 0), _r(r + 1, 0),
                            function(e) {
                                return function(t) {
                                    return t.id == e
                                }
                            } ( + u));
                            return void(p.length && (c = p[0].find()) && (s += Gn(e.doc, c.from, c.to).join(l)))
                        }
                        if ("false" == t.getAttribute("contenteditable")) return;
                        for (var h = 0; h < t.childNodes.length; h++) o(t.childNodes[h]);
                        /^(pre|div|p)$/i.test(t.nodeName) && (a = !0)
                    } else if (3 == t.nodeType) {
                        var f = t.nodeValue;
                        if (!f) return;
                        a && (s += l, a = !1),
                        s += f
                    }
                }
                for (var s = "",
                a = !1,
                l = e.doc.lineSeparator(); o(t), t != n;) t = t.nextSibling;
                return s
            } (e, a, u, s, c)), h = Gn(e.doc, _r(s, 0), _r(c, Vn(e.doc, c).text.length)); p.length > 1 && h.length > 1;) if (Si(p) == Si(h)) p.pop(),
            h.pop(),
            c--;
            else {
                if (p[0] != h[0]) break;
                p.shift(),
                h.shift(),
                s++
            }
            for (var f = 0,
            d = 0,
            y = p[0], m = h[0], g = Math.min(y.length, m.length); f < g && y.charCodeAt(f) == m.charCodeAt(f);)++f;
            for (var v = Si(p), b = Si(h), x = Math.min(v.length - (1 == p.length ? f: 0), b.length - (1 == h.length ? f: 0)); d < x && v.charCodeAt(v.length - d - 1) == b.charCodeAt(b.length - d - 1);)++d;
            p[p.length - 1] = v.slice(0, v.length - d),
            p[0] = p[0].slice(f);
            var w = _r(s, f),
            _ = _r(c, h.length ? Si(h).length - d: 0);
            return p.length > 1 || p[0] || kr(w, _) ? (qt(e.doc, p, w, _, "+input"), !0) : void 0
        },
        ensurePolled: function() {
            this.forceCompositionEnd()
        },
        reset: function() {
            this.forceCompositionEnd()
        },
        forceCompositionEnd: function() {
            this.composing && !this.composing.handled && (this.applyComposition(this.composing), this.composing.handled = !0, this.div.blur(), this.div.focus())
        },
        applyComposition: function(e) {
            this.cm.isReadOnly() ? rt(this.cm, ct)(this.cm) : e.data && e.data != e.startData && rt(this.cm, H)(this.cm, e.data, 0, e.sel)
        },
        setUneditable: function(e) {
            e.contentEditable = "false"
        },
        onKeyPress: function(e) {
            e.preventDefault(),
            this.cm.isReadOnly() || rt(this.cm, H)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode: e.charCode), 0)
        },
        readOnlyChanged: function(e) {
            this.div.contentEditable = String("nocursor" != e)
        },
        onContextMenu: Ei,
        resetPosition: Ei,
        needsContentAttribute: !0
    },
    J.prototype),
    e.inputStyles = {
        textarea: V,
        contenteditable: J
    },
    Z.prototype = {
        primary: function() {
            return this.ranges[this.primIndex]
        },
        equals: function(e) {
            if (e == this) return ! 0;
            if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return ! 1;
            for (var t = 0; t < this.ranges.length; t++) {
                var n = this.ranges[t],
                i = e.ranges[t];
                if (0 != kr(n.anchor, i.anchor) || 0 != kr(n.head, i.head)) return ! 1
            }
            return ! 0
        },
        deepCopy: function() {
            for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new ee(z(this.ranges[t].anchor), z(this.ranges[t].head));
            return new Z(e, this.primIndex)
        },
        somethingSelected: function() {
            for (var e = 0; e < this.ranges.length; e++) if (!this.ranges[e].empty()) return ! 0;
            return ! 1
        },
        contains: function(e, t) {
            t || (t = e);
            for (var n = 0; n < this.ranges.length; n++) {
                var i = this.ranges[n];
                if (kr(t, i.from()) >= 0 && kr(e, i.to()) <= 0) return n
            }
            return - 1
        }
    },
    ee.prototype = {
        from: function() {
            return $(this.anchor, this.head)
        },
        to: function() {
            return W(this.anchor, this.head)
        },
        empty: function() {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        }
    };
    var Cr, Tr, Er, Mr = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    Ar = null,
    Or = 0,
    Lr = 0,
    Pr = 0,
    Rr = null;
    ir ? Rr = -.53 : er ? Rr = 15 : ar ? Rr = -.7 : cr && (Rr = -1 / 3);
    var Ir = function(e) {
        var t = e.wheelDeltaX,
        n = e.wheelDeltaY;
        return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail),
        null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail: null == n && (n = e.wheelDelta),
        {
            x: t,
            y: n
        }
    };
    e.wheelEventPixels = function(e) {
        var t = Ir(e);
        return t.x *= Rr,
        t.y *= Rr,
        t
    };
    var jr = new _i,
    Nr = null,
    Dr = e.changeEnd = function(e) {
        return e.text ? _r(e.from.line + e.text.length - 1, Si(e.text).length + (1 == e.text.length ? e.from.ch: 0)) : e.to
    };
    e.prototype = {
        constructor: e,
        focus: function() {
            window.focus(),
            this.display.input.focus()
        },
        setOption: function(e, t) {
            var n = this.options,
            i = n[e];
            n[e] == t && "mode" != e || (n[e] = t, Wr.hasOwnProperty(e) && rt(this, Wr[e])(this, t, i))
        },
        getOption: function(e) {
            return this.options[e]
        },
        getDoc: function() {
            return this.doc
        },
        addKeyMap: function(e, t) {
            this.state.keyMaps[t ? "push": "unshift"](nn(e))
        },
        removeKeyMap: function(e) {
            for (var t = this.state.keyMaps,
            n = 0; n < t.length; ++n) if (t[n] == e || t[n].name == e) return t.splice(n, 1),
            !0
        },
        addOverlay: ot(function(t, n) {
            var i = t.token ? t: e.getMode(this.options, t);
            if (i.startState) throw new Error("Overlays may not be stateful."); !
            function(e, t, n) {
                for (var i = 0,
                r = n(t); i < e.length && n(e[i]) <= r;) i++;
                e.splice(i, 0, t)
            } (this.state.overlays, {
                mode: i,
                modeSpec: t,
                opaque: n && n.opaque,
                priority: n && n.priority || 0
            },
            function(e) {
                return e.priority
            }),
            this.state.modeGen++,
            ct(this)
        }),
        removeOverlay: ot(function(e) {
            for (var t = this.state.overlays,
            n = 0; n < t.length; ++n) {
                var i = t[n].modeSpec;
                if (i == e || "string" == typeof e && i.name == e) return t.splice(n, 1),
                this.state.modeGen++,
                void ct(this)
            }
        }),
        indentLine: ot(function(e, t, n) {
            "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart": "prev": t ? "add": "subtract"),
            oe(this.doc, e) && Jt(this, e, t, n)
        }),
        indentSelection: ot(function(e) {
            for (var t = this.doc.sel.ranges,
            n = -1,
            i = 0; i < t.length; i++) {
                var r = t[i];
                if (r.empty()) r.head.line > n && (Jt(this, r.head.line, e, !0), n = r.head.line, i == this.doc.sel.primIndex && Vt(this));
                else {
                    var o = r.from(),
                    s = r.to(),
                    a = Math.max(n, o.line);
                    n = Math.min(this.lastLine(), s.line - (s.ch ? 0 : 1)) + 1;
                    for (var l = a; l < n; ++l) Jt(this, l, e);
                    var c = this.doc.sel.ranges;
                    0 == o.ch && t.length == c.length && c[i].from().ch > 0 && ue(this.doc, i, new ee(o, c[i].to()), _o)
                }
            }
        }),
        getTokenAt: function(e, t) {
            return Pn(this, e, t)
        },
        getLineTokens: function(e, t) {
            return Pn(this, _r(e), t, !0)
        },
        getTokenTypeAt: function(e) {
            e = re(this.doc, e);
            var t, n = jn(this, Vn(this.doc, e.line)),
            i = 0,
            r = (n.length - 1) / 2,
            o = e.ch;
            if (0 == o) t = n[2];
            else for (;;) {
                var s = i + r >> 1;
                if ((s ? n[2 * s - 1] : 0) >= o) r = s;
                else {
                    if (! (n[2 * s + 1] < o)) {
                        t = n[2 * s + 2];
                        break
                    }
                    i = s + 1
                }
            }
            var a = t ? t.indexOf("cm-overlay ") : -1;
            return a < 0 ? t: 0 == a ? null: t.slice(0, a - 1)
        },
        getModeAt: function(t) {
            var n = this.doc.mode;
            return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode: n
        },
        getHelper: function(e, t) {
            return this.getHelpers(e, t)[0]
        },
        getHelpers: function(e, t) {
            var n = [];
            if (!Kr.hasOwnProperty(t)) return n;
            var i = Kr[t],
            r = this.getModeAt(e);
            if ("string" == typeof r[t]) i[r[t]] && n.push(i[r[t]]);
            else if (r[t]) for (s = 0; s < r[t].length; s++) {
                var o = i[r[t][s]];
                o && n.push(o)
            } else r.helperType && i[r.helperType] ? n.push(i[r.helperType]) : i[r.name] && n.push(i[r.name]);
            for (var s = 0; s < i._global.length; s++) {
                var a = i._global[s];
                a.pred(r, this) && -1 == Ci(n, a.val) && n.push(a.val)
            }
            return n
        },
        getStateAfter: function(e, t) {
            var n = this.doc;
            return e = ie(n, null == e ? n.first + n.size - 1 : e),
            Ee(this, e + 1, t)
        },
        cursorCoords: function(e, t) {
            var n, i = this.doc.sel.primary();
            return n = null == e ? i.head: "object" == typeof e ? re(this.doc, e) : e ? i.from() : i.to(),
            Je(this, n, t || "page")
        },
        charCoords: function(e, t) {
            return Ge(this, re(this.doc, e), t || "page")
        },
        coordsChar: function(e, t) {
            return e = Ve(this, e, t || "page"),
            Ye(this, e.left, e.top)
        },
        lineAtHeight: function(e, t) {
            return e = Ve(this, {
                top: e,
                left: 0
            },
            t || "page").top,
            Yn(this.doc, e + this.display.viewOffset)
        },
        heightAtLine: function(e, t) {
            var n, i = !1;
            if ("number" == typeof e) {
                var r = this.doc.first + this.doc.size - 1;
                e < this.doc.first ? e = this.doc.first: e > r && (e = r, i = !0),
                n = Vn(this.doc, e)
            } else n = e;
            return Ue(this, n, {
                top: 0,
                left: 0
            },
            t || "page").top + (i ? this.doc.height - Zn(n) : 0)
        },
        defaultTextHeight: function() {
            return Ze(this.display)
        },
        defaultCharWidth: function() {
            return et(this.display)
        },
        setGutterMarker: ot(function(e, t, n) {
            return Xt(this.doc, e, "gutter",
            function(e) {
                var i = e.gutterMarkers || (e.gutterMarkers = {});
                return i[t] = n,
                !n && Pi(i) && (e.gutterMarkers = null),
                !0
            })
        }),
        clearGutter: ot(function(e) {
            var t = this,
            n = t.doc,
            i = n.first;
            n.iter(function(n) {
                n.gutterMarkers && n.gutterMarkers[e] && (n.gutterMarkers[e] = null, ut(t, i, "gutter"), Pi(n.gutterMarkers) && (n.gutterMarkers = null)),
                ++i
            })
        }),
        lineInfo: function(e) {
            if ("number" == typeof e) {
                if (!oe(this.doc, e)) return null;
                t = e;
                if (! (e = Vn(this.doc, e))) return null
            } else {
                var t;
                if (null == (t = Qn(e))) return null
            }
            return {
                line: t,
                handle: e,
                text: e.text,
                gutterMarkers: e.gutterMarkers,
                textClass: e.textClass,
                bgClass: e.bgClass,
                wrapClass: e.wrapClass,
                widgets: e.widgets
            }
        },
        getViewport: function() {
            return {
                from: this.display.viewFrom,
                to: this.display.viewTo
            }
        },
        addWidget: function(e, t, n, i, r) {
            var o = this.display,
            s = (e = Je(this, re(this.doc, e))).bottom,
            a = e.left;
            if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), o.sizer.appendChild(t), "over" == i) s = e.top;
            else if ("above" == i || "near" == i) {
                var l = Math.max(o.wrapper.clientHeight, this.doc.height),
                c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth); ("above" == i || e.bottom + t.offsetHeight > l) && e.top > t.offsetHeight ? s = e.top - t.offsetHeight: e.bottom + t.offsetHeight <= l && (s = e.bottom),
                a + t.offsetWidth > c && (a = c - t.offsetWidth)
            }
            t.style.top = s + "px",
            t.style.left = t.style.right = "",
            "right" == r ? (a = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == r ? a = 0 : "middle" == r && (a = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = a + "px"),
            n &&
            function(e, t, n, i, r) {
                var o = Kt(e, t, n, i, r);
                null != o.scrollTop && kt(e, o.scrollTop),
                null != o.scrollLeft && St(e, o.scrollLeft)
            } (this, a, s, a + t.offsetWidth, s + t.offsetHeight)
        },
        triggerOnKeyDown: ot(At),
        triggerOnKeyPress: ot(Lt),
        triggerOnKeyUp: Ot,
        execCommand: function(e) {
            if (Gr.hasOwnProperty(e)) return Gr[e].call(null, this)
        },
        triggerElectric: ot(function(e) {
            q(this, e)
        }),
        findPosH: function(e, t, n, i) {
            var r = 1;
            t < 0 && (r = -1, t = -t);
            for (var o = 0,
            s = re(this.doc, e); o < t && !(s = Yt(this.doc, s, r, n, i)).hitSide; ++o);
            return s
        },
        moveH: ot(function(e, t) {
            var n = this;
            n.extendSelectionsBy(function(i) {
                return n.display.shift || n.doc.extend || i.empty() ? Yt(n.doc, i.head, e, t, n.options.rtlMoveVisually) : e < 0 ? i.from() : i.to()
            },
            So)
        }),
        deleteH: ot(function(e, t) {
            var n = this.doc.sel,
            i = this.doc;
            n.somethingSelected() ? i.replaceSelection("", null, "+delete") : Qt(this,
            function(n) {
                var r = Yt(i, n.head, e, t, !1);
                return e < 0 ? {
                    from: r,
                    to: n.head
                }: {
                    from: n.head,
                    to: r
                }
            })
        }),
        findPosV: function(e, t, n, i) {
            var r = 1,
            o = i;
            t < 0 && (r = -1, t = -t);
            for (var s = 0,
            a = re(this.doc, e); s < t; ++s) {
                var l = Je(this, a, "div");
                if (null == o ? o = l.left: l.left = o, (a = Zt(this, l, r, n)).hitSide) break
            }
            return a
        },
        moveV: ot(function(e, t) {
            var n = this,
            i = this.doc,
            r = [],
            o = !n.display.shift && !i.extend && i.sel.somethingSelected();
            if (i.extendSelectionsBy(function(s) {
                if (o) return e < 0 ? s.from() : s.to();
                var a = Je(n, s.head, "div");
                null != s.goalColumn && (a.left = s.goalColumn),
                r.push(a.left);
                var l = Zt(n, a, e, t);
                return "page" == t && s == i.sel.primary() && Ut(n, null, Ge(n, l, "div").top - a.top),
                l
            },
            So), r.length) for (var s = 0; s < i.sel.ranges.length; s++) i.sel.ranges[s].goalColumn = r[s]
        }),
        findWordAt: function(e) {
            var t = Vn(this.doc, e.line).text,
            n = e.ch,
            i = e.ch;
            if (t) {
                var r = this.getHelper(e, "wordChars"); (e.xRel < 0 || i == t.length) && n ? --n: ++i;
                for (var o = t.charAt(n), s = Li(o, r) ?
                function(e) {
                    return Li(e, r)
                }: /\s/.test(o) ?
                function(e) {
                    return /\s/.test(e)
                }: function(e) {
                    return ! /\s/.test(e) && !Li(e)
                }; n > 0 && s(t.charAt(n - 1));)--n;
                for (; i < t.length && s(t.charAt(i));)++i
            }
            return new ee(_r(e.line, n), _r(e.line, i))
        },
        toggleOverwrite: function(e) {
            null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? Do(this.display.cursorDiv, "CodeMirror-overwrite") : No(this.display.cursorDiv, "CodeMirror-overwrite"), vo(this, "overwriteToggle", this, this.state.overwrite))
        },
        hasFocus: function() {
            return this.display.input.getField() == Di()
        },
        isReadOnly: function() {
            return ! (!this.options.readOnly && !this.doc.cantEdit)
        },
        scrollTo: ot(function(e, t) {
            null == e && null == t || Gt(this),
            null != e && (this.curOp.scrollLeft = e),
            null != t && (this.curOp.scrollTop = t)
        }),
        getScrollInfo: function() {
            var e = this.display.scroller;
            return {
                left: e.scrollLeft,
                top: e.scrollTop,
                height: e.scrollHeight - Le(this) - this.display.barHeight,
                width: e.scrollWidth - Le(this) - this.display.barWidth,
                clientHeight: Re(this),
                clientWidth: Pe(this)
            }
        },
        scrollIntoView: ot(function(e, t) {
            if (null == e ? (e = {
                from: this.doc.sel.primary().head,
                to: null
            },
            null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                from: _r(e, 0),
                to: null
            }: null == e.from && (e = {
                from: e,
                to: null
            }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line) Gt(this),
            this.curOp.scrollToPos = e;
            else {
                var n = Kt(this, Math.min(e.from.left, e.to.left), Math.min(e.from.top, e.to.top) - e.margin, Math.max(e.from.right, e.to.right), Math.max(e.from.bottom, e.to.bottom) + e.margin);
                this.scrollTo(n.scrollLeft, n.scrollTop)
            }
        }),
        setSize: ot(function(e, t) {
            function n(e) {
                return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px": e
            }
            var i = this;
            null != e && (i.display.wrapper.style.width = n(e)),
            null != t && (i.display.wrapper.style.height = n(t)),
            i.options.lineWrapping && He(this);
            var r = i.display.viewFrom;
            i.doc.iter(r, i.display.viewTo,
            function(e) {
                if (e.widgets) for (var t = 0; t < e.widgets.length; t++) if (e.widgets[t].noHScroll) {
                    ut(i, r, "widget");
                    break
                }++r
            }),
            i.curOp.forceUpdate = !0,
            vo(i, "refresh", this)
        }),
        operation: function(e) {
            return it(this, e)
        },
        refresh: ot(function() {
            var e = this.display.cachedTextHeight;
            ct(this),
            this.curOp.forceUpdate = !0,
            Fe(this),
            this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop),
            l(this),
            (null == e || Math.abs(e - Ze(this.display)) > .5) && r(this),
            vo(this, "refresh", this)
        }),
        swapDoc: ot(function(e) {
            var t = this.doc;
            return t.cm = null,
            Un(this, e),
            Fe(this),
            this.display.input.reset(),
            this.scrollTo(e.scrollLeft, e.scrollTop),
            this.curOp.forceScroll = !0,
            mi(this, "swapDoc", this, t),
            t
        }),
        getInputField: function() {
            return this.display.input.getField()
        },
        getWrapperElement: function() {
            return this.display.wrapper
        },
        getScrollerElement: function() {
            return this.display.scroller
        },
        getGutterElement: function() {
            return this.display.gutters
        }
    },
    wi(e);
    var zr = e.defaults = {},
    Wr = e.optionHandlers = {},
    $r = e.Init = {
        toString: function() {
            return "CodeMirror.Init"
        }
    };
    en("value", "",
    function(e, t) {
        e.setValue(t)
    },
    !0),
    en("mode", null,
    function(e, n) {
        e.doc.modeOption = n,
        t(e)
    },
    !0),
    en("indentUnit", 2, t, !0),
    en("indentWithTabs", !1),
    en("smartIndent", !0),
    en("tabSize", 4,
    function(e) {
        n(e),
        Fe(e),
        ct(e)
    },
    !0),
    en("lineSeparator", null,
    function(e, t) {
        if (e.doc.lineSep = t, t) {
            var n = [],
            i = e.doc.first;
            e.doc.iter(function(e) {
                for (var r = 0;;) {
                    var o = e.text.indexOf(t, r);
                    if ( - 1 == o) break;
                    r = o + t.length,
                    n.push(_r(i, o))
                }
                i++
            });
            for (var r = n.length - 1; r >= 0; r--) qt(e.doc, t, n[r], _r(n[r].line, n[r].ch + t.length))
        }
    }),
    en("specialChars", /[\u0000-\u001f\u007f\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,
    function(t, n, i) {
        t.state.specialChars = new RegExp(n.source + (n.test("\t") ? "": "|\t"), "g"),
        i != e.Init && t.refresh()
    }),
    en("specialCharPlaceholder",
    function(e) {
        var t = Ii("span", "•", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16),
        t.setAttribute("aria-label", t.title),
        t
    },
    function(e) {
        e.refresh()
    },
    !0),
    en("electricChars", !0),
    en("inputStyle", fr ? "contenteditable": "textarea",
    function() {
        throw new Error("inputStyle can not (yet) be changed in a running editor")
    },
    !0),
    en("spellcheck", !1,
    function(e, t) {
        e.getInputField().spellcheck = t
    },
    !0),
    en("rtlMoveVisually", !mr),
    en("wholeLineUpdateBefore", !0),
    en("theme", "default",
    function(e) {
        o(e),
        s(e)
    },
    !0),
    en("keyMap", "default",
    function(t, n, i) {
        var r = nn(n),
        o = i != e.Init && nn(i);
        o && o.detach && o.detach(t, r),
        r.attach && r.attach(t, o || null)
    }),
    en("extraKeys", null),
    en("lineWrapping", !1,
    function(e) {
        e.options.lineWrapping ? (Do(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (No(e.display.wrapper, "CodeMirror-wrap"), u(e)),
        r(e),
        ct(e),
        Fe(e),
        setTimeout(function() {
            m(e)
        },
        100)
    },
    !0),
    en("gutters", [],
    function(e) {
        p(e.options),
        s(e)
    },
    !0),
    en("fixedGutter", !0,
    function(e, t) {
        e.display.gutters.style.left = t ? _(e.display) + "px": "0",
        e.refresh()
    },
    !0),
    en("coverGutterNextToScrollbar", !1,
    function(e) {
        m(e)
    },
    !0),
    en("scrollbarStyle", "native",
    function(e) {
        y(e),
        m(e),
        e.display.scrollbars.setScrollTop(e.doc.scrollTop),
        e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
    },
    !0),
    en("lineNumbers", !1,
    function(e) {
        p(e.options),
        s(e)
    },
    !0),
    en("firstLineNumber", 1, s, !0),
    en("lineNumberFormatter",
    function(e) {
        return e
    },
    s, !0),
    en("showCursorWhenSelecting", !1, we, !0),
    en("resetSelectionOnContextMenu", !0),
    en("lineWiseCopyCut", !0),
    en("readOnly", !1,
    function(e, t) {
        "nocursor" == t ? (Rt(e), e.display.input.blur(), e.display.disabled = !0) : e.display.disabled = !1,
        e.display.input.readOnlyChanged(t)
    }),
    en("disableInput", !1,
    function(e, t) {
        t || e.display.input.reset()
    },
    !0),
    en("dragDrop", !0,
    function(t, n, i) {
        if (!n != !(i && i != e.Init)) {
            var r = t.display.dragFunctions,
            o = n;
            
        }
    }),
    en("allowDropFileTypes", null),
    en("cursorBlinkRate", 530),
    en("cursorScrollMargin", 0),
    en("cursorHeight", 1, we, !0),
    en("singleCursorHeightPerLine", !0, we, !0),
    en("workTime", 100),
    en("workDelay", 100),
    en("flattenSpans", !0, n, !0),
    en("addModeClass", !1, n, !0),
    en("pollInterval", 100),
    en("undoDepth", 200,
    function(e, t) {
        e.doc.history.undoDepth = t
    }),
    en("historyEventDelay", 1250),
    en("viewportMargin", 10,
    function(e) {
        e.refresh()
    },
    !0),
    en("maxHighlightLength", 1e4, n, !0),
    en("moveInputWithCursor", !0,
    function(e, t) {
        t || e.display.input.resetPosition()
    }),
    en("tabindex", null,
    function(e, t) {
        e.display.input.getField().tabIndex = t || ""
    }),
    en("autofocus", null);
    var Br = e.modes = {},
    Hr = e.mimeModes = {};
    e.defineMode = function(t, n) {
        e.defaults.mode || "null" == t || (e.defaults.mode = t),
        arguments.length > 2 && (n.dependencies = Array.prototype.slice.call(arguments, 2)),
        Br[t] = n
    },
    e.defineMIME = function(e, t) {
        Hr[e] = t
    },
    e.resolveMode = function(t) {
        if ("string" == typeof t && Hr.hasOwnProperty(t)) t = Hr[t];
        else if (t && "string" == typeof t.name && Hr.hasOwnProperty(t.name)) {
            var n = Hr[t.name];
            "string" == typeof n && (n = {
                name: n
            }),
            (t = Mi(n, t)).name = n.name
        } else {
            if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t)) return e.resolveMode("application/xml");
            if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+json$/.test(t)) return e.resolveMode("application/json")
        }
        return "string" == typeof t ? {
            name: t
        }: t || {
            name: "null"
        }
    },
    e.getMode = function(t, n) {
        var n = e.resolveMode(n),
        i = Br[n.name];
        if (!i) return e.getMode(t, "text/plain");
        var r = i(t, n);
        if (Fr.hasOwnProperty(n.name)) {
            var o = Fr[n.name];
            for (var s in o) o.hasOwnProperty(s) && (r.hasOwnProperty(s) && (r["_" + s] = r[s]), r[s] = o[s])
        }
        if (r.name = n.name, n.helperType && (r.helperType = n.helperType), n.modeProps) for (var s in n.modeProps) r[s] = n.modeProps[s];
        return r
    },
    e.defineMode("null",
    function() {
        return {
            token: function(e) {
                e.skipToEnd()
            }
        }
    }),
    e.defineMIME("text/plain", "null");
    var Fr = e.modeExtensions = {};
    
    var qr = [];
    var Kr = e.helpers = {};
    
    var Ur = e.copyState = function(e, t) {
        
    },
    Vr = e.startState = function(e, t, n) {
        return ! e.startState || e.startState(t, n)
    };
   
    var Gr = e.commands = {
        
    },
    Jr = e.keyMap = {};
    Jr.basic = {
    },
    Jr.pcDefault = {
    },
    Jr.emacsy = {
       
    },
    Jr.macDefault = {
    },
    Jr.
default = dr ? Jr.macDefault: Jr.pcDefault;
    
    var Xr = e.lookupKey = function(e, t, n, i) {
        
    },
    Qr = e.isModifierKey = function(e) {
        var t = "string" == typeof e ? e: qo[e.keyCode];
        return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
    },
    Yr = e.keyName = function(e, t) {
        };
    e.fromTextArea = function(t, n) {
       
    };
    var Zr = e.StringStream = function(e, t) {
        this.pos = this.start = 0,
        this.string = e,
        this.tabSize = t || 8,
        this.lastColumnPos = this.lastColumnValue = 0,
        this.lineStart = 0
    };
    Zr.prototype = {
        
    };
    var eo = 0,
    to = e.TextMarker = function(e, t) {
        this.lines = [],
        this.type = t,
        this.doc = e,
        this.id = ++eo
    };
    wi(to);
    
    
    var eo = 0;
    
    var io = e.LineWidget = function(e, t, n) {
        
    };
    wi(io),
    io.prototype.clear = function() {
       
    },
    io.prototype.changed = function() {
        
    };
    var ro = e.Line = function(e, t, n) {
        this.text = e,
        fn(this, t),
        this.height = n ? n(this) : 1
    };
    wi(ro),
    ro.prototype.lineNo = function() {
        return Qn(this)
    };
    var oo = {},
    so = {};
    Fn.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        
        insertInner: function(e, t, n) {
            this.height += n,
            this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
            for (var i = 0; i < t.length; ++i) t[i].parent = this
        },
        iterN: function(e, t, n) {
            for (var i = e + t; e < i; ++e) if (n(this.lines[e])) return ! 0
        }
    },
    qn.prototype = {
        
        insertInner: function(e, t, n) {
            this.size += t.length,
            this.height += n;
            for (var i = 0; i < this.children.length; ++i) {
                var r = this.children[i],
                o = r.chunkSize();
                if (e <= o) {
                    if (r.insertInner(e, t, n), r.lines && r.lines.length > 50) {
                        for (var s = r.lines.length % 25 + 25,
                        a = s; a < r.lines.length;) {
                            var l = new Fn(r.lines.slice(a, a += 25));
                            r.height -= l.height,
                            this.children.splice(++i, 0, l),
                            l.parent = this
                        }
                        r.lines = r.lines.slice(0, s),
                        this.maybeSpill()
                    }
                    break
                }
                e -= o
            }
        },
        
    };
    var ao = 0,
    lo = e.Doc = function(e, t, n, i) {
        if (! (this instanceof lo)) return new lo(e, t, n, i);
        null == n && (n = 0),
        qn.call(this, [new Fn([new ro("", null)])]),
        this.first = n,
        this.scrollTop = this.scrollLeft = 0,
        this.cantEdit = !1,
        this.cleanGeneration = 1,
        this.frontier = n;
        var r = _r(n, 0);
        this.sel = ne(r),
        this.history = new ti(null),
        this.id = ++ao,
        this.modeOption = t,
        this.lineSep = i,
        this.extend = !1,
        "string" == typeof e && (e = this.splitLines(e)),
        Hn(this, {
            from: r,
            to: r,
            text: e
        }),
        fe(this, ne(r), _o)
    };
    lo.prototype = Mi(qn.prototype, {
        constructor: lo,
        iter: function(e, t, n) {
        },
        insert: function(e, t) {
            for (var n = 0,
            i = 0; i < t.length; ++i) n += t[i].height;
            this.insertInner(e - this.first, t, n)
        },
        
        getLine: function(e) {
            var t = this.getLineHandle(e);
            return t && t.text
        },
        
        splitLines: function(e) {
            return this.lineSep ? e.split(this.lineSep) : $o(e)
        },
        
    }),
    
    vo = e.signal = function(e, t) {
        var n = yi(e, t, !0);
        if (n.length) for (var i = Array.prototype.slice.call(arguments, 2), r = 0; r < n.length; ++r) n[r].apply(null, i)
    },
    bo = null,
    xo = 30;
    var Ao, Oo = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    
    var zo = !1;
    var jo, Io,_o ;
    var $o = function(e) {
        return e.split(/\r\n?|\n/)
    }
    
    return e;
});

Layout = {
    render: function() {
        this.resize(),
        this.createDragInstances();
    },
    findLayoutElements: function() {
        this.content = document.id("content"),
        this.columns = this.content.getChildren(".column"),
        this.handlers = $H({
            vertical: document.id("content").getElementById("handler_vertical"),
            left: this.columns[0].getElement(".handler_horizontal"),
            right: this.columns[1].getElement(".handler_horizontal")
        })
    },
    
    createDragInstances: function() {
        this.handlers.each(function(e) {
            new Drag(e, {
               
            })
        }, this);
    },
    
    resize: function(e) {
        this.findLayoutElements();
        this.handlers.vertical.setStyle("left", 656),
        this.handlers.left.setStyle("top", 8),
        this.handlers.right.setStyle("top", 447);
    },
    
};


window.defaultCmOptions = {
    tabSize: 2,
    indentUnit: 2,
    matchBrackets: !0,
    lineNumbers: !0,
},
window.cmOptions = window.defaultCmOptions;
var MooShellEditor = new Class({
    options: {
        codeMirrorOptions: window.cmOptions,
    },
    initialize: function(e, t) {
        this.element = $(e);
        
        var i = this.element.getParent(),
        t = {
            value: this.element.value
        };
        t = Object.append(t, this.options.codeMirrorOptions),
        CodeMirror(i, t);
    }
});

MooShellEditor.CSS = new Class({
    Extends: MooShellEditor,
    
    initialize: function(e, t) {
        this.parent(e, this.options)
    }
});