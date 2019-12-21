/** 
 * Kendo UI v2016.2.504 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2016 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
*/
!function (e, define) {
    define("kendo.twdatetimepicker", ["kendo.twdatepicker", "kendo.timepicker.min"], e)
}(function () {
    return function (e, t) {
        function parseTWDateToADDate(value) {
            var objectToString = {}.toString;
            if (objectToString.call(value) === "[object String]" && value.length >= 3) {
                var val = value.split('/');
                var year = parseInt(val[0]);
                if (!isNaN(year) && year<1911) {
                    year += 1911;
                    val[0] = year.toString();
                    value = val.join('/');
                }
            }
            return value;
            //var val = value.split('/');
            //var year = parseInt(val[0]);
            //if (!isNaN(year) && year < 1911) {
            //    year += 1911;
            //    val[0] = year.toString();
            //    value = val.join('/');
            //}
            //return value;
        }
        function a(e) { var t = new Date(2100, 0, 1); return t.setMinutes(-e), t }
        function n(e) { e.preventDefault() }
        function i(t) { var a, n = r.getCulture(t.culture).calendars.standard.patterns, i = !t.parseFormats.length; t.format = d(t.format || n.g), t.timeFormat = a = d(t.timeFormat || n.t), r.DateView.normalize(t), i && t.parseFormats.unshift("yyyy-MM-ddTHH:mm:ss"), -1 === e.inArray(a, t.parseFormats) && t.parseFormats.splice(1, 0, a) }
        function DateCheckYMD(tp) {
            //判斷是否為undefined
            if (tp == undefined) {
                return false;
            }
            //判斷是否為空白
            if (tp == "") {
                return false;
            }
            var aryList = tp.split(' ')[0].split('/');
            if (aryList.length != 3) {
                return false;
            }
            var y = aryList[0] == "" ? 0 : parseInt(aryList[0]);
            var m = aryList[1] == "" ? 0 : parseInt(aryList[1]);
            var d = aryList[2] == "" ? 0 : parseInt(aryList[2]);
            if (y + 1911 < 1911) {
                return false;
            }
            if (m < 1 || m > 12) {
                return false;
            }
            if (d < 1 || d > 31) {
                return false;
            }
            switch (m) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    if (d < 1 || d > 31) {
                        return false;
                    }
                    break;
                case 2:

                    if ((y % 4).toString() == "0") {
                        if (d < 1 || d > 29) {
                            return false;
                        }
                    } else {
                        if (d < 1 || d > 28) {
                            return false;
                        }
                    }
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    if (d < 1 || d > 30) {
                        return false;
                    }
                    break;
                default:
                    return false;
            }
            return true;
        }
        function validDate(text) {
            var currentDate = Date.parse(text);
            if (!currentDate) {
                return false;
            }
            var datestring = kendo.toString(text, "yyyy/MM/dd");
            if (DateCheckYMD(datestring) == false) {
                return false;
            }
            var comp = datestring.split('/');
            if (comp.length !== 3) {
                return false;
            }
            var m = parseInt(comp[1], 10);
            var d = parseInt(comp[2], 10);
            var y = parseInt(comp[0], 10) + (typeof text === 'string' ? 1911 : 0);
            var date = new Date(y, m - 1, d);
            return (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d);
        }
        var r = window.kendo, o = r.TimeView, l = r.parseDate, s = r._activeElement, d = r._extractFormat, m = r.twcalendar, u = m.isInRange, c = m.restrictValue, p = m.isEqualDatePart, f = o.getMilliseconds, _ = r.ui, v = _.Widget, g = "open", w = "close", h = "change", x = ".kendoDateTimePicker", k = "click" + x, y = "disabled", b = "readonly", V = "k-state-default", D = "k-state-focused", A = "k-state-hover", T = "k-state-disabled", I = "mouseenter" + x + " mouseleave" + x, F = "mousedown" + x, C = "month", R = "<span/>", M = "aria-activedescendant", H = "aria-expanded", O = "aria-hidden", W = "aria-owns", S = "aria-disabled", E = "aria-readonly", q = Date, B = new q(1912, 0, 1), N = new q(2099, 11, 31), P = { view: "date" }, j = { view: "time" }, Y = e.extend,
            z = v.extend({
                init: function (t, a) { var n, o = this; v.fn.init.call(o, t, a), t = o.element, a = o.options, a.disableDates = r.twcalendar.disabled(a.disableDates), a.min = l(t.attr("min")) || l(a.min), a.max = l(t.attr("max")) || l(a.max), i(a), o._initialOptions = Y({}, a), o._wrapper(), o._views(), o._icons(), o._reset(), o._template(); try { t[0].setAttribute("type", "text") } catch (s) { t[0].type = "text" } t.addClass("k-input").attr({ role: "combobox", "aria-expanded": !1 }), o._midnight = o._calculateMidnight(a.min, a.max), n = t.is("[disabled]") || e(o.element).parents("fieldset").is(":disabled"), n ? o.enable(!1) : o.readonly(t.is("[readonly]")), o._old = o._update(a.value || o.element.val()), o._oldText = t.val(), r.notify(o) },
                options: { name: "TWDateTimePicker", value: null, format: "", timeFormat: "", culture: "zh-TW", parseFormats: [], dates: [], min: new q(B), max: new q(N), interval: 30, height: 200, footer: "", start: C, depth: C, animation: {}, month: {}, ARIATemplate: 'Current focused date is #=kendo.formatTWDate(data.current, "d")#' },
                events: [g, w, h],
                setOptions: function (e) { var t, a, n, o = this, s = o._value; v.fn.setOptions.call(o, e), e = o.options, e.min = t = l(e.min), e.max = a = l(e.max), i(e), o._midnight = o._calculateMidnight(e.min, e.max), n = e.value || o._value || o.dateView._current, t && !p(t, n) && (t = new q(B)), a && !p(a, n) && (a = new q(N)), o.dateView.setOptions(e), o.timeView.setOptions(Y({}, e, { format: e.timeFormat, min: t, max: a })), s && (o.element.val(r.formatTWDate(s, e.format, e.culture)), o._updateARIA(s)) },
                _editable: function (t) { var a = this, i = a.element.off(x), o = a._dateIcon.off(x), l = a._timeIcon.off(x), d = a._inputWrapper.off(x), m = t.readonly, u = t.disable; m || u ? (d.addClass(u ? T : V).removeClass(u ? V : T), i.attr(y, u).attr(b, m).attr(S, u).attr(E, m)) : (d.addClass(V).removeClass(T).on(I, a._toggleHover), i.removeAttr(y).removeAttr(b).attr(S, !1).attr(E, !1).on("keydown" + x, e.proxy(a._keydown, a)).on("focus" + x, function () { a._inputWrapper.addClass(D) }).on("focusout" + x, function () { a._inputWrapper.removeClass(D), i.val() !== a._oldText && a._change(i.val()), a.close("date"), a.close("time") }), o.on(F, n).on(k, function () { a.toggle("date"), r.support.touch || i[0] === s() || i.focus() }), l.on(F, n).on(k, function () { a.toggle("time"), r.support.touch || i[0] === s() || i.focus() })) },
                readonly: function (e) { this._editable({ readonly: e === t ? !0 : e, disable: !1 }) },
                enable: function (e) { this._editable({ readonly: !1, disable: !(e = e === t ? !0 : e) }) },
                destroy: function () { var e = this; v.fn.destroy.call(e), e.dateView.destroy(), e.timeView.destroy(), e.element.off(x), e._dateIcon.off(x), e._timeIcon.off(x), e._inputWrapper.off(x), e._form && e._form.off("reset", e._resetHandler) },
                close: function (e) { "time" !== e && (e = "date"), this[e + "View"].close() },
                open: function (e) { "time" !== e && (e = "date"), this[e + "View"].open() },
                min: function (e) { return this._option("min", e) },
                max: function (e) { return this._option("max", e) },
                toggle: function (e) { var t = "timeView"; "time" !== e ? e = "date" : t = "dateView", this[e + "View"].toggle(), this[t].close() },
                value: function (e) {
                    var a = this;
                    return e === t ? a._value : (a._old = a._update(parseTWDateToADDate(e)), null === a._old && a.element.val(""), a._oldText = a.element.val(), t)
                },
                _change: function (value) {
                    if (value != "") {
                        if (validDate(value) == false) {
                            value = '';
                            alert("輸入日期有誤");
                        }
                    }
                    var that = this, oldValue = that.element.val(), dateChanged;
                    value = that._update(value);
                    dateChanged = +that._old != +value;
                    var valueUpdated = dateChanged && !that._typing;
                    var textFormatted = oldValue !== that.element.val();
                    if (valueUpdated || textFormatted) {
                        that.element.trigger('change');
                    }
                    if (dateChanged) {
                        that._old = value;
                        that._oldText = that.element.val();
                        that.trigger('change');
                    }
                    that._typing = false;
                },
                _option: function (e, n) { var i, r, o = this, s = o.options, d = o.timeView, m = d.options, u = o._value || o._old; if (n === t) return s[e]; if (n = l(n, s.parseFormats, s.culture)) { if (s.min.getTime() === s.max.getTime() && (m.dates = []), s[e] = new q(n.getTime()), o.dateView[e](n), o._midnight = o._calculateMidnight(s.min, s.max), u && (i = p(s.min, u), r = p(s.max, u)), i || r) { if (m[e] = n, i && !r && (m.max = a(s.interval)), r) { if (o._midnight) return d.dataBind([N]), t; i || (m.min = B) } } else m.max = N, m.min = B; d.bind() } },
                _toggleHover: function (t) { e(t.currentTarget).toggleClass(A, "mouseenter" === t.type) },
                _update: function (t) {
                    var n, i, o, s, d, m = this, f = m.options, _ = f.min, v = f.max, g = f.dates, w = m.timeView, x = m._value
                        , k = l(parseTWDateToADDate(t), f.parseFormats, f.culture)
                        , y = null === k && null === x || k instanceof Date && x instanceof Date;
                    return f.disableDates && f.disableDates(k) && (k = null, m._old || (t = null)), +k === +x && y ? (d = r.formatTWDate(k, f.format, f.culture), d !== t && (m.element.val(null === k ? t : d), t instanceof String && m.element.trigger(h)), k) : (null !== k && p(k, _) ? k = c(k, _, v) : u(k, _, v) || (k = null), m._value = k, w.value(k), m.dateView.value(k), k && (o = m._old, i = w.options, g[0] && (g = e.grep(g, function (e) { return p(k, e) }), g[0] && (w.dataBind(g), s = !0)), s || (p(k, _) && (i.min = _, i.max = a(f.interval), n = !0), p(k, v) && (m._midnight ? (w.dataBind([N]), s = !0) : (i.max = v, n || (i.min = B), n = !0))), !s && (!o && n || o && !p(o, k)) && (n || (i.max = N, i.min = B), w.bind())), m.element.val(k ? r.formatTWDate(k, f.format, f.culture) : t), m._updateARIA(k), k)
                },
                _keydown: function (e) { var t = this, a = t.dateView, n = t.timeView, i = t.element.val(), o = a.popup.visible(); e.altKey && e.keyCode === r.keys.DOWN ? t.toggle(o ? "time" : "date") : o ? (a.move(e), t._updateARIA(a._current)) : n.popup.visible() ? n.move(e) : e.keyCode === r.keys.ENTER && i !== t._oldText ? t._change(i) : t._typing = !0 },
                _views: function () { var e, t, a, n, i, s, d = this, m = d.element, c = d.options, p = m.attr("id"); d.dateView = e = new r.DateView(Y({}, c, { id: p, anchor: d.wrapper, change: function () { var t, a, n = e.calendar.value(), i = +n, o = +c.min, l = +c.max; (i === o || i === l) && (t = i === o ? o : l, t = new q(d._value || t), t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), u(t, o, l) && (n = t)), d._value && (a = r.date.setTime(new Date(n), d._value), u(a, o, l) && (n = a)), d._change(n), d.close("date") }, close: function (e) { d.trigger(w, P) ? e.preventDefault() : (m.attr(H, !1), a.attr(O, !0), t.popup.visible() || m.removeAttr(W)) }, open: function (t) { d.trigger(g, P) ? t.preventDefault() : (m.val() !== d._oldText && (s = l(m.val(), c.parseFormats, c.culture), d.dateView[s ? "current" : "value"](s)), a.attr(O, !1), m.attr(H, !0).attr(W, e._dateViewID), d._updateARIA(s)) } })), a = e.div, i = c.min.getTime(), d.timeView = t = new o({ id: p, value: c.value, anchor: d.wrapper, animation: c.animation, format: c.timeFormat, culture: c.culture, height: c.height, interval: c.interval, min: new q(B), max: new q(N), dates: i === c.max.getTime() ? [new Date(i)] : [], parseFormats: c.parseFormats, change: function (a, n) { a = t._parse(a), c.min > a ? (a = new q(+c.min), t.options.min = a) : a > c.max && (a = new q(+c.max), t.options.max = a), n ? (d._timeSelected = !0, d._change(a)) : (m.val(r.toString(a, c.format, c.culture)), e.value(a), d._updateARIA(a)) }, close: function (t) { d.trigger(w, j) ? t.preventDefault() : (n.attr(O, !0), m.attr(H, !1), e.popup.visible() || m.removeAttr(W)) }, open: function (e) { t._adjustListWidth(), d.trigger(g, j) ? e.preventDefault() : (m.val() !== d._oldText && (s = l(m.val(), c.parseFormats, c.culture), d.timeView.value(s)), n.attr(O, !1), m.attr(H, !0).attr(W, t._timeViewID), t.options.active(t.current())) }, active: function (e) { m.removeAttr(M), e && m.attr(M, t._optionID) } }), n = t.ul },
                _icons: function () { var t, a = this, n = a.element; t = n.next("span.k-select"), t[0] || (t = e('<span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-calendar">select</span><span unselectable="on" class="k-icon k-i-clock">select</span></span>').insertAfter(n)), t = t.children(), a._dateIcon = t.eq(0).attr({ role: "button", "aria-controls": a.dateView._dateViewID }), a._timeIcon = t.eq(1).attr({ role: "button", "aria-controls": a.timeView._timeViewID }) },
                _wrapper: function () { var t, a = this, n = a.element; t = n.parents(".k-datetimepicker"), t[0] || (t = n.wrap(R).parent().addClass("k-picker-wrap k-state-default"), t = t.wrap(R).parent()), t[0].style.cssText = n[0].style.cssText, n.css({ width: "100%", height: n[0].style.height }), a.wrapper = t.addClass("k-widget k-datetimepicker k-header").addClass(n[0].className), a._inputWrapper = e(t[0].firstChild) },
                _reset: function () { var t = this, a = t.element, n = a.attr("form"), i = n ? e("#" + n) : a.closest("form"); i[0] && (t._resetHandler = function () { t.value(a[0].defaultValue), t.max(t._initialOptions.max), t.min(t._initialOptions.min) }, t._form = i.on("reset", t._resetHandler)) },
                _template: function () { this._ariaTemplate = r.template(this.options.ARIATemplate) },
                _calculateMidnight: function (e, t) { return f(e) + f(t) === 0 },
                _updateARIA: function (e) { var t, a = this, n = a.dateView.calendar; a.element.removeAttr(M), n && (t = n._cell, t.attr("aria-label", a._ariaTemplate({ current: e || n.current() })), a.element.attr(M, t.attr("id"))) }
            });
        _.plugin(z)
    }(window.kendo.jQuery), window.kendo
}, "function" == typeof define && define.amd ? define : function (e, t, a) { (a || t)() });
//# sourceMappingURL=kendo.datetimepicker.min.js.map
