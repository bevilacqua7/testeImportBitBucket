!
function (a, b, c, d) {
	"use strict";
	function g(b, c) {
		this.element = b,
		this.options = a.extend({},
		f, c),
		this.$el = a(b),
		this.$el.data(e, this),
		this._defaults = f,
		this.init()
	}
	var e = "utilCarousel",
	f = {
		responsiveBaseOn: c,
		showItems: 4,
		responsive: !0,
		responsiveMode: "breakPoints",
		responsiveDelay: 200,
		breakPoints: [[480, 1], [768, 2], [992, 3], [1200, 4]],
		itemWidthRange: [100, 400],
		itemWidthRangeConflict: "margin",
		rangeCaculate: "maxFirst",
		autoPlay: !1,
		pagination: !0,
		navigation: !1,
		navigationText: ["Prev", "Next"],
		itemLess: "margin",
		scrollPerPage: !1,
		interval: 3e3,
		rewind: !0,
		themeClass: "util-theme-default",
		pauseOnHover: !0,
		drag: !0,
		mouseWheel: !1,
		slideSpeed: 400,
		responsiveSpeed: 400,
		scrollPageSpeed: 600,
		beforeInit: null,
		afterInit: null,
		beforeUpdate: null,
		afterUpdate: null,
		indexChanged: null,
		beforeDrag: null,
		afterDrag: null,
		itemAnimation: !1,
		lazyLoad: !1
	};
	g.prototype = {
		init: function () {
			var b = this;
			a.isFunction(b.options.beforeInit) && b.options.beforeInit(),
			b.getBroswerStatus(),
			b.initBaseVars(),
			b.buildWrap(),
			b.updateUI(!1),
			b.$wrapper.css("display", "block"),
			b.loadEvents(),
			b.options.autoPlay === !0 && b.play(),
			a.isFunction(b.options.afterInit) && b.options.afterInit(),
			b.needCheckVisable && b.checkVisable(0)
		},
		getBroswerStatus: function () {
			var b, a = this;
			a.isTouch = Modernizr.touch,
			a.transform3d = Modernizr.csstransforms3d,
			a.transform2d = Modernizr.csstransforms,
			a.transition = Modernizr.csstransitions,
			a.cssanimations = Modernizr.cssanimations,
			a.transition ? (b = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd otransitionend",
				transition: "transitionend"
			},
			a.transitionName = Modernizr.prefixed("transition"), a.transEndName = b[Modernizr.prefixed("transition")], a.emulateTransitionEnd = function (b, d) {
				var f, e = !1;
				b.one(a.transEndName, function () {
					e = !0
				}),
				f = function () {
					e || b.trigger(a.transEndName)
				},
				c.setTimeout(f, d)
			},
			a.moveProperty = Modernizr.prefixed("transform"), a.moveValueMarkup = a.transform3d ? "translate3d({0}px,0px,0px)": "translate({0}px,0px)") : (a.moveProperty = "left", a.moveValueMarkup = "{0}px")
		},
		initBaseVars: function () {
			var a = this;
			c.utilId == d && (c.utilId = 0),
			a.internalId = c.utilId + 1,
			a.$items = a.$el.children(),
			a.itemTotal = a.$items.size(),
			a.visiableItemCount = a.options.showItems,
			a.showIndex = 0,
			a.activeIndex = 0,
			a.itemPad = 0,
			a.pageIndex = -1,
			a.isSliding = !1,
			a.dragging = !1,
			a.playStatus = "stop",
			a.doAnimation = 1 == a.cssanimations && 0 != a.options.itemAnimation,
			a.needCheckVisable = a.doAnimation || a.options.lazyLoad,
			a.options.lazyLoad && (a.$lazyImages = a.$el.find(".img-lazy[data-src]"))
		},
		buildWrap: function () {
			var b = this;
			b.originalClass = b.$el.attr("class") || "",
			"" == b.options.themeClass || b.$el.hasClass(b.options.themeClass) || b.$el.attr("class", "util-theme-default " + (b.$el.attr("class") || "")),
			b.$el.hasClass("util-carousel") || b.$el.attr("class", "util-carousel " + (b.$el.attr("class") || "")),
			b.$items.wrapAll('<div class="util-wrapper"></div>').wrap('<div class="util-item"></div>'),
			b.$utilItems = b.$el.find(".util-item"),
			b.$wrapper = b.$el.find(".util-wrapper").wrap('<div class="util-wrapper-holder"></div>'),
			b.$wrapperHolder = b.$el.find(".util-wrapper-holder"),
			b.$el.css("display", "block"),
			b.options.pagination === !0 && (b.$pagination = a('<div class="util-pagination"></div>').appendTo(b.$el), b.$pagination.on("click.util touchend", ".util-page", function () {
				var c = a(this).data("utilIndex");
				b.showIndex != c && b.goTo(c, b.options.scrollPageSpeed, !0)
			})),
			b.options.navigation === !0 && (b.$navigation = a('<div class="util-navigation"></div>').appendTo(b.$el), b.$btnPrev = a('<div class="util-prev">' + b.options.navigationText[0] + "</div>").appendTo(b.$navigation), b.$btnNext = a('<div class="util-next">' + b.options.navigationText[1] + "</div>").appendTo(b.$navigation), b.$btnPrev.on("click.util", function () {
				b.prev()
			}), b.$btnNext.on("click.util", function () {
				b.next()
			}))
		},
		caculateResponsiveItems: function () {
			var g, h, i, j, k, l, m, b = this,
			c = 1,
			d = 0,
			e = a(b.options.responsiveBaseOn).width(),
			f = b.$wrapperHolder.innerWidth();
			if (b.holderWidth = f, b.options.responsive) {
				if ("itemWidthRange" == b.options.responsiveMode) i = b.options.itemWidthRange.sort(),
				g = i[0],
				h = i[1],
				j = f / g,
				k = f / h,
				"minFirst" === b.options.rangeCaculate ? (c = Math.floor(j), c > 0 ? k > c && "ajust" !== b.options.itemWidthRangeConflict && (d = f / c - h) : c = 1) : "maxFirst" === b.options.rangeCaculate && (c = Math.ceil(k), c > j && (c -= 1, c > 0 ? "ajust" !== b.options.itemWidthRangeConflict && (d = f / c - h) : c = 1));
				else for (l = b.options.breakPoints.sort(function (a, b) {
					return b[0] - a[0]
				}), c = b.options.showItems > l[0][1] ? b.options.showItems: l[0][1], m = 0; m < l.length && e <= l[m][0]; m++) c = l[m][1];
				c > b.itemTotal && ("breakPoints" === b.options.responsiveMode && ("margin" === b.options.itemLess ? (d = f / b.itemTotal - f / c, c = b.itemTotal) : "scaleUp" === b.options.itemLess && (c = b.itemTotal)), "itemWidthRange" === b.options.responsiveMode && ("margin" === b.options.itemLess && ("minFirst" === b.options.rangeCaculate && (k > b.itemTotal ? (c = b.itemTotal, d = f / c - h) : (c = b.itemTotal, d = 0)), "maxFirst" === b.options.rangeCaculate && (c = b.itemTotal, d = f / c - h)), "scaleUp" === b.options.itemLess && (c = b.itemTotal, d = 0)))
			} else c = b.options.showItems;
			b.visiableItemCount = c,
			b.itemPad = d,
			b.itemWidth = f / c
		},
		caculatePositionArray: function () {
			var b, c, d, a = this;
			for (a.itemPositions = [], a.pagePositions = [], a.userItemPositions = [], a.pageIndexs = [], b = a.itemTotal - a.visiableItemCount, c = 0, d = 0; d < a.itemTotal; d++) a.itemPositions.push( - 1 * a.itemWidth * d),
			a.userItemPositions.push(a.itemPositions[d] - a.itemPad / 2),
			(0 == d % a.visiableItemCount && b > d || d == b) && (c++, a.pagePositions.push(a.itemPositions[d]), a.pageIndexs.push(d)),
			a.$utilItems.eq(d).data("page", c)
		},
		updatePagination: function () {
			var c, b = this;
			if (b.options.pagination === !0 && (b.$pagination.empty().hide(), b.pagePositions.length > 1)) for (b.$pagination.show(), c = 0; c < b.pagePositions.length; c++) a('<div class="util-page"><span> </span></div>').data("utilIndex", a.inArray(b.pagePositions[c], b.itemPositions)).appendTo(b.$pagination)
		},
		checkPagination: function () {
			var c, a = this,
			b = 0;
			if (a.options.pagination === !0) {
				for (c = 0; c < a.pageIndexs.length && a.showIndex >= a.pageIndexs[c]; c++) b = c;
				a.$pagination.find(".active-page").removeClass("active-page"),
				a.$pagination.find(".util-page").eq(b).addClass("active-page"),
				a.pageIndex = b
			}
		},
		checkNavigation: function () {
			var a = this;
			a.options.rewind !== !0 && a.options.navigation === !0 && (a.$btnPrev.removeClass("util-disable"), a.$btnNext.removeClass("util-disable"), 0 == a.showIndex && (a.$btnPrev.hasClass("util-disable") || a.$btnPrev.addClass("util-disable")), a.showIndex == a.maxTransItems && (a.$btnNext.hasClass("util-disable") || a.$btnNext.addClass("util-disable")))
		},
		maxTrans: function () {
			var a = this;
			a.visiableItemCount > a.itemTotal ? (a.maxTransLeft = 0, a.maxTransItems = 0) : (a.maxTransLeft = (a.itemTotal - a.visiableItemCount) * a.itemWidth, a.maxTransItems = a.itemTotal - a.visiableItemCount)
		},
		updateUI: function (b) {
			var d, f, g, h, i, j, c = this;
			a.isFunction(c.options.beforeUpdate) && c.options.beforeUpdate(),
			c.caculateResponsiveItems(),
			c.maxTrans(),
			c.caculatePositionArray(),
			c.updatePagination(),
			c.checkPagination(),
			c.checkNavigation(),
			d = c.itemPad,
			c.visiableItemCount,
			f = c.itemWidth,
			g = c.$wrapper.width(),
			h = 2 * f * c.itemTotal,
			b ? (i = function () {},
			h >= g ? (c.$wrapper.width(h), i = function () {
				c.goTo(c.showIndex, c.options.slideSpeed, !0)
			}) : i = function () {
				c.$wrapper.width(h),
				c.goTo(c.showIndex, c.options.slideSpeed, !0)
			},
			c.transition && c.$wrapper.css(c.transitionName, ""), a.when(c.$utilItems.stop(!0, !1).animate({
				width: f - d,
				marginLeft: d / 2,
				marginRight: d / 2
			},
			{
				duration: c.options.responsiveSpeed,
				step: function (a, b) {
					"width" == b.prop && (j = a),
					"marginLeft" == b.prop && (j += 2 * a, c.moveTo( - c.showIndex * j))
				}
			})).then(function () {
				a.isFunction(c.options.afterUpdate) && c.options.afterUpdate(),
				i()
			})) : (c.$wrapper.width(h), c.$utilItems.css({
				width: f - d,
				marginLeft: d / 2,
				marginRight: d / 2
			}), a.isFunction(c.options.afterUpdate) && c.options.afterUpdate()),
			c.resumePlay()
		},
		resizeHandler: function () {
			var e, b = this,
			d = a(c).width();
			b.doRezise = function () {
				a(c).width() != d && (c.clearTimeout(e), b.clearPlay(), e = c.setTimeout(function () {
					var e = a(c).width();
					d != e && (d = e, b.updateUI(!0))
				},
				b.options.responsiveDelay))
			},
			b.options.responsive && a(c).on("resize.util" + b.internalId, b.doRezise)
		},
		dragEvents: function () {
			var e, f, g, b = this,
			c = b.$wrapperHolder.hammer({
				drag_min_distance: 1
			});
			c.on("dragstart", function () {
				f = d
			}).on("drag", function (c) {
				var d, h;
				b.dragging ? ("undefined" == typeof f && (f = !!(f || Math.abs(c.gesture.deltaX) < Math.abs(c.gesture.deltaY))), (!f && "touch" == c.gesture.pointerType || "mouse" == c.gesture.pointerType) && (c.gesture.preventDefault(), d = .6, h = e.left > 0 || e.left < -b.maxTransLeft ? c.gesture.deltaX * d + e.left: c.gesture.deltaX + e.left, h < -b.maxTransLeft && (h = e.left < -b.maxTransLeft ? e.left + c.gesture.deltaX * d: -b.maxTransLeft + (h - -b.maxTransLeft) * d), h > 0 && (e.left > 0 ? h = e.left + c.gesture.deltaX * d: h *= d), b.dragEndX = h, b.moveTo(h))) : ("undefined" == typeof f && (f = !!(f || Math.abs(c.gesture.deltaX) < Math.abs(c.gesture.deltaY)), f || c.gesture.preventDefault()), a.isFunction(b.options.beforeDrag) && b.options.beforeDrag(), b.clearPlay(), b.dragging = !0, e = b.$wrapper.position(), b.transition ? b.$wrapper.css(b.transitionName, "") : b.$wrapper.stop(), b.isTouch || (b.$wrapperHolder.addClass("dragging"), b.$wrapperHolder.css("cursor", b.$wrapperHolder.css("cursor"))), g = c.target || c.srcElement)
			}).on("dragend", function (c) {
				var h, i, j, k, l, e = c.target || c.srcElement;
				a(g).is(a(e)) && !b.isTouch && (a(g).on("click.util-disableclick", function (b) {
					return b.stopImmediatePropagation(),
					b.stopPropagation(),
					b.preventDefault(),
					a(g).off("click.util-disableclick"),
					!1
				}), h = a._data(g, "events"), h.click.unshift(h.click.pop())),
				c.gesture.preventDefault(),
				"touch" == c.gesture.pointerType && f || (c.gesture.preventDefault(), b.dragging = !1, i = b.options.scrollPerPage === !0 ? b.pagePositions: b.itemPositions, b.dragEndX < -b.maxTransLeft ? j = b.itemPositions.length - 1 : b.dragEndX > 0 ? j = 0 : (k = .1, l = k * b.itemWidth, a.each(i, function (e, f) {
					var g = i[e - 1] === d ? Number.MAX_VALUE: i[e - 1],
					h = i[e + 1] === d ? -Number.MAX_VALUE: i[e + 1];
					c.gesture.deltaX < 0 && b.dragEndX >= f - l && b.dragEndX < g - l && (j = b.options.scrollPerPage === !0 ? a.inArray(f, b.itemPositions) : e),
					c.gesture.deltaX > 0 && b.dragEndX >= h + l && b.dragEndX <= f + l && (j = b.options.scrollPerPage === !0 ? a.inArray(f, b.itemPositions) : e)
				})), b.isTouch || (b.$wrapperHolder.removeClass("dragging"), b.$wrapperHolder.css("cursor", "")), a.isFunction(b.options.afterDrag) && b.options.afterDrag(), b.goTo(j, b.options.slideSpeed, !0))
			})
		},
		swapEvents: function () {
			var a = this,
			b = Hammer(a.$wrapperHolder.get(0), {
				swipe_velocity: .1
			});
			b.on("swipeleft swiperight", function (b) {
				b.gesture.preventDefault(),
				"dragleft" != b.type && "dragright" != b.type && ("swipeleft" == b.type ? a.next() : a.prev())
			})
		},
		loadEvents: function () {
			var a = this;
			a.options.responsive === !0 && a.resizeHandler(),
			a.options.drag === !0 ? a.dragEvents() : a.swapEvents(),
			a.options.pauseOnHover === !0 && a.isTouch !== !0 && a.pauseOnHover(),
			a.options.mouseWheel === !0 && a.$el.on("mousewheel.util", function (b) {
				b.stopPropagation(),
				b.preventDefault(),
				b.deltaY < 0 && a.next(),
				b.deltaY > 0 && a.prev()
			}),
			a.options.lazyLoad === !0 && a.lazyLoadImage()
		},
		moveTo: function (a) {
			var b = this,
			c = {};
			c[b.moveProperty] = b.moveValueMarkup.replace("{0}", a),
			b.$wrapper.css(c),
			b.needCheckVisable && b.checkVisable(a)
		},
		slideTo: function (a, b) {
			var c = this;
			c.transition ? (c.isSliding = !0, c.$wrapper.css(c.transitionName, "all " + b + "ms cubic-bezier(0.215, 0.61, 0.355, 1)"), c.moveTo(a), c.$wrapper.one(c.transEndName, function () {
				c.isSliding = !1
			}), c.emulateTransitionEnd(c.$wrapper, b + 50)) : c.$wrapper.stop().animate({
				left: a
			},
			b, function () {
				c.isSliding = !1
			})
		},
		goTo: function (b, c, e) {
			var f = this;
			c === d && (c = f.options.slideSpeed),
			e === d && (e = !0),
			0 > b && (b = 0),
			b > f.maxTransItems && (b = f.maxTransItems),
			e === !0 ? (f.slideTo(Math.round(f.itemPositions[b]), c), f.needCheckVisable && f.checkVisable(f.itemPositions[b])) : (f.transition && f.$wrapper.css(f.transitionName, ""), f.moveTo(Math.round(f.itemPositions[b]))),
			b != f.showIndex && a.isFunction(f.options.indexChanged) && f.options.indexChanged(b),
			f.showIndex = b,
			f.afterGo()
		},
		toStart: function () {
			var a = this;
			a.goTo(0)
		},
		toEnd: function () {
			var a = this;
			a.goTo(a.maxTransItems)
		},
		afterGo: function () {
			var a = this;
			a.checkPagination(),
			a.checkNavigation(),
			a.resumePlay()
		},
		prev: function () {
			var b, a = this;
			if (a.options.scrollPerPage === !0) {
				if (b = a.pageIndex - 1, a.options.rewind === !0 && 0 > b) b = a.pageIndexs.length - 1;
				else if (a.options.rewind !== !0 && 0 > b) return ! 1;
				a.goTo(a.pageIndexs[b], a.options.slideSpeed, !0)
			} else {
				if (b = a.showIndex - 1, a.options.rewind === !0 && 0 > b) b = a.maxTransItems;
				else if (a.options.rewind !== !0 && 0 > b) return ! 1;
				a.goTo(b, a.options.slideSpeed, !0)
			}
		},
		next: function () {
			var b, a = this;
			if (a.options.scrollPerPage === !0) {
				if (b = a.pageIndex + 1, a.options.rewind === !0 && b > a.pageIndexs.length - 1) b = 0;
				else if (a.options.rewind !== !0 && b > a.pageIndexs.length - 1) return ! 1;
				a.goTo(a.pageIndexs[b], a.options.slideSpeed, !0)
			} else {
				if (b = a.showIndex + 1, a.options.rewind === !0 && b > a.maxTransItems) b = 0;
				else if (a.options.rewind !== !0 && b > a.maxTransItems) return ! 1;
				a.goTo(b, a.options.slideSpeed, !0)
			}
		},
		play: function () {
			var a = this;
			a.playStatus = "play",
			c.clearInterval(a.playTimer),
			a.playTimer = c.setInterval(function () {
				a.next()
			},
			a.options.interval)
		},
		stop: function () {
			var a = this;
			a.playStatus = "stop",
			c.clearInterval(a.playTimer)
		},
		resumePlay: function () {
			var a = this;
			"stop" !== a.playStatus && a.play()
		},
		clearPlay: function () {
			var a = this;
			c.clearInterval(a.playTimer)
		},
		pauseOnHover: function () {
			var a = this;
			a.$el.on("mouseenter.util", function () {
				a.playStatusBeforHover = a.playStatus,
				"play" === a.playStatus && a.stop()
			}),
			a.$el.on("mouseleave.util", function () {
				"play" === a.playStatusBeforHover && (a.dragging === !0 ? a.playStatus = "play": a.play())
			})
		},
		destroy: function () {
			var b = this;
			b.$pagination && b.$pagination.remove(),
			b.$navigation && b.$navigation.remove(),
			b.$items.unwrap().unwrap().unwrap(),
			a(c).off("resize.util" + b.internalId),
			b.$el.attr("class", b.originalClass).removeData("utilCarousel")
		},
		checkVisable: function (b) {
			var f, g, h, c = this,
			d = c.itemWidth - c.itemPad,
			e = [];
			for (f = 0; f < c.userItemPositions.length; f++)(c.userItemPositions[f] > b - c.holderWidth && c.userItemPositions[f] <= b || c.userItemPositions[f] - d >= b - c.holderWidth && c.userItemPositions[f] - d < b) && e.push(f);
			g = c.$items.filter(function (b) {
				return a.inArray(b, e) >= 0
			}),
			c.doAnimation && (g.addClass(c.options.itemAnimation), c.$items.not(g).removeClass(c.options.itemAnimation)),
			c.options.lazyLoad && (h = g.find(c.$lazyImages).trigger("utillazy"), c.$lazyImages = c.$lazyImages.not(h))
		},
		lazyLoadImage: function () {
			var a = this;
			a.$lazyImages.one("utillazy", function () {
				var a = this.getAttribute("data-src");
				this.setAttribute("src", a),
				this.removeAttribute("data-src")
			})
		}
	},
	a.fn[e] = function (b) {
		return this.each(function () {
			a.data(this, e) || a.data(this, e, new g(this, b))
		})
	}
} (jQuery, document, window),
jQuery(function () {
	jQuery.fn.magnificPopup && window.setTimeout(function () {
		jQuery(".util-carousel").each(function () {
			jQuery(this).magnificPopup({
				delegate: ".img-link",
				type: "image",
				gallery: {
					enabled: !0
				}
			})
		}),
		jQuery(".video-link").magnificPopup({
			type: "iframe"
		})
	},
	200)
});
window.Modernizr = function (a, b, c) {
	function y(a) {
		i.cssText = a
	}
	function z(a, b) {
		return y(l.join(a + ";") + (b || ""))
	}
	function A(a, b) {
		return typeof a === b
	}
	function B(a, b) {
		return !! ~ ("" + a).indexOf(b)
	}
	function C(a, b) {
		for (var d in a) {
			var e = a[d];
			if (!B(e, "-") && i[e] !== c) return b == "pfx" ? e: !0
		}
		return ! 1
	}
	function D(a, b, d) {
		for (var e in a) {
			var f = b[a[e]];
			if (f !== c) return d === !1 ? a[e] : A(f, "function") ? f.bind(d || b) : f
		}
		return ! 1
	}
	function E(a, b, c) {
		var d = a.charAt(0).toUpperCase() + a.slice(1),
		e = (a + " " + n.join(d + " ") + d).split(" ");
		return A(b, "string") || A(b, "undefined") ? C(e, b) : (e = (a + " " + o.join(d + " ") + d).split(" "), D(e, b, c))
	}
	var d = "2.7.2",
	e = {},
	f = b.documentElement,
	g = "modernizr",
	h = b.createElement(g),
	i = h.style,
	j,
	k = {}.toString,
	l = " -webkit- -moz- -o- -ms- ".split(" "),
	m = "Webkit Moz O ms",
	n = m.split(" "),
	o = m.toLowerCase().split(" "),
	p = {},
	q = {},
	r = {},
	s = [],
	t = s.slice,
	u,
	v = function (a, c, d, e) {
		var h, i, j, k, l = b.createElement("div"),
		m = b.body,
		n = m || b.createElement("body");
		if (parseInt(d, 10)) while (d--) j = b.createElement("div"),
		j.id = e ? e[d] : g + (d + 1),
		l.appendChild(j);
		return h = ["&#173;", '<style id="s', g, '">', a, "</style>"].join(""),
		l.id = g,
		(m ? l: n).innerHTML += h,
		n.appendChild(l),
		m || (n.style.background = "", n.style.overflow = "hidden", k = f.style.overflow, f.style.overflow = "hidden", f.appendChild(n)),
		i = c(l, a),
		m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), f.style.overflow = k),
		!!i
	},
	w = {}.hasOwnProperty,
	x; ! A(w, "undefined") && !A(w.call, "undefined") ? x = function (a, b) {
		return w.call(a, b)
	}: x = function (a, b) {
		return b in a && A(a.constructor.prototype[b], "undefined")
	},
	Function.prototype.bind || (Function.prototype.bind = function (b) {
		var c = this;
		if (typeof c != "function") throw new TypeError;
		var d = t.call(arguments, 1),
		e = function () {
			if (this instanceof e) {
				var a = function () {};
				a.prototype = c.prototype;
				var f = new a,
				g = c.apply(f, d.concat(t.call(arguments)));
				return Object(g) === g ? g: f
			}
			return c.apply(b, d.concat(t.call(arguments)))
		};
		return e
	}),
	p.touch = function () {
		var c;
		return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : v(["@media (", l.join("touch-enabled),("), g, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (a) {
			c = a.offsetTop === 9
		}),
		c
	},
	p.cssanimations = function () {
		return E("animationName")
	},
	p.csstransforms = function () {
		return !! E("transform")
	},
	p.csstransforms3d = function () {
		var a = !!E("perspective");
		return a && "webkitPerspective" in f.style && v("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (b, c) {
			a = b.offsetLeft === 9 && b.offsetHeight === 3
		}),
		a
	},
	p.csstransitions = function () {
		return E("transition")
	};
	for (var F in p) x(p, F) && (u = F.toLowerCase(), e[u] = p[F](), s.push((e[u] ? "": "no-") + u));
	return e.addTest = function (a, b) {
		if (typeof a == "object") for (var d in a) x(a, d) && e.addTest(d, a[d]);
		else {
			a = a.toLowerCase();
			if (e[a] !== c) return e;
			b = typeof b == "function" ? b() : b,
			typeof enableClasses != "undefined" && enableClasses && (f.className += " " + (b ? "": "no-") + a),
			e[a] = b
		}
		return e
	},
	y(""),
	h = j = null,
	e._version = d,
	e._prefixes = l,
	e._domPrefixes = o,
	e._cssomPrefixes = n,
	e.testProp = function (a) {
		return C([a])
	},
	e.testAllProps = E,
	e.testStyles = v,
	e.prefixed = function (a, b, c) {
		return b ? E(a, b, c) : E(a, "pfx")
	},
	e
} (this, this.document); !
function (a, b) {
	"use strict";
	function c() {
		e.READY || (t.determineEventTypes(), p.each(e.gestures, function (a) {
			v.register(a)
		}), t.onTouch(e.DOCUMENT, n, v.detect), t.onTouch(e.DOCUMENT, o, v.detect), e.READY = !0)
	}
	function d(a, c) {
		Date.now || (Date.now = function () {
			return (new Date).getTime()
		}),
		a.event.bindDom = function (d, e, f) {
			c(d).on(e, function (c) {
				var d = c.originalEvent || c,
				e = ["pageX", "pageY", "clientX", "clientY", "target", "preventDefault", "stopPropagation"];
				a.utils.each(e, function (a) {
					null == d[a] && (d[a] = c[a])
				}),
				d.which === b && (d.which = d.button),
				f.call(this, d)
			})
		},
		a.utils.each(["on", "off"], function (b) {
			a.Instance.prototype[b] = function (a, d) {
				return c(this.element)[b](a, d)
			}
		}),
		a.Instance.prototype.trigger = function (a, b) {
			var d = c(this.element);
			return d.has(b.target).length && (d = c(b.target)),
			d.trigger({
				type: a,
				gesture: b
			})
		},
		c.fn.hammer = function (b) {
			return this.each(function () {
				var d = c(this),
				e = d.data("hammer");
				e ? e && b && a.utils.extend(e.options, b) : d.data("hammer", new a(this, b || {}))
			})
		}
	}
	var e = function (a, b) {
		return new e.Instance(a, b || {})
	};
	e.VERSION = "1.0.10",
	e.defaults = {
		stop_browser_behavior: {
			userSelect: "none",
			touchAction: "none",
			touchCallout: "none",
			contentZooming: "none",
			userDrag: "none",
			tapHighlightColor: "rgba(0,0,0,0)"
		}
	},
	e.HAS_POINTEREVENTS = a.navigator.pointerEnabled || a.navigator.msPointerEnabled,
	e.HAS_TOUCHEVENTS = "ontouchstart" in a,
	e.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i,
	e.NO_MOUSEEVENTS = e.HAS_TOUCHEVENTS && a.navigator.userAgent.match(e.MOBILE_REGEX),
	e.EVENT_TYPES = {},
	e.UPDATE_VELOCITY_INTERVAL = 16,
	e.DOCUMENT = a.document;
	var f = e.DIRECTION_DOWN = "down",
	g = e.DIRECTION_LEFT = "left",
	h = e.DIRECTION_UP = "up",
	i = e.DIRECTION_RIGHT = "right",
	j = e.POINTER_MOUSE = "mouse",
	k = e.POINTER_TOUCH = "touch",
	l = e.POINTER_PEN = "pen",
	m = e.EVENT_START = "start",
	n = e.EVENT_MOVE = "move",
	o = e.EVENT_END = "end";
	e.plugins = e.plugins || {},
	e.gestures = e.gestures || {},
	e.READY = !1;
	var p = e.utils = {
		extend: function (a, c, d) {
			for (var e in c) a[e] !== b && d || (a[e] = c[e]);
			return a
		},
		each: function (a, c, d) {
			var e, f;
			if ("forEach" in a) a.forEach(c, d);
			else if (a.length !== b) {
				for (e = -1; f = a[++e];) if (c.call(d, f, e, a) === !1) return
			} else for (e in a) if (a.hasOwnProperty(e) && c.call(d, a[e], e, a) === !1) return
		},
		inStr: function (a, b) {
			return a.indexOf(b) > -1
		},
		hasParent: function (a, b) {
			for (; a;) {
				if (a == b) return ! 0;
				a = a.parentNode
			}
			return ! 1
		},
		getCenter: function (a) {
			var b = [],
			c = [],
			d = [],
			e = [],
			f = Math.min,
			g = Math.max;
			return 1 === a.length ? {
				pageX: a[0].pageX,
				pageY: a[0].pageY,
				clientX: a[0].clientX,
				clientY: a[0].clientY
			}: (p.each(a, function (a) {
				b.push(a.pageX),
				c.push(a.pageY),
				d.push(a.clientX),
				e.push(a.clientY)
			}), {
				pageX: (f.apply(Math, b) + g.apply(Math, b)) / 2,
				pageY: (f.apply(Math, c) + g.apply(Math, c)) / 2,
				clientX: (f.apply(Math, d) + g.apply(Math, d)) / 2,
				clientY: (f.apply(Math, e) + g.apply(Math, e)) / 2
			})
		},
		getVelocity: function (a, b, c) {
			return {
				x: Math.abs(b / a) || 0,
				y: Math.abs(c / a) || 0
			}
		},
		getAngle: function (a, b) {
			var c = b.clientX - a.clientX,
			d = b.clientY - a.clientY;
			return 180 * Math.atan2(d, c) / Math.PI
		},
		getDirection: function (a, b) {
			var c = Math.abs(a.clientX - b.clientX),
			d = Math.abs(a.clientY - b.clientY);
			return c >= d ? a.clientX - b.clientX > 0 ? g: i: a.clientY - b.clientY > 0 ? h: f
		},
		getDistance: function (a, b) {
			var c = b.clientX - a.clientX,
			d = b.clientY - a.clientY;
			return Math.sqrt(c * c + d * d)
		},
		getScale: function (a, b) {
			return a.length >= 2 && b.length >= 2 ? this.getDistance(b[0], b[1]) / this.getDistance(a[0], a[1]) : 1
		},
		getRotation: function (a, b) {
			return a.length >= 2 && b.length >= 2 ? this.getAngle(b[1], b[0]) - this.getAngle(a[1], a[0]) : 0
		},
		isVertical: function (a) {
			return a == h || a == f
		},
		toggleDefaultBehavior: function (a, b, c) {
			if (b && a && a.style) {
				p.each(["webkit", "moz", "Moz", "ms", "o", ""], function (d) {
					p.each(b, function (b, e) {
						d && (e = d + e.substring(0, 1).toUpperCase() + e.substring(1)),
						e in a.style && (a.style[e] = !c && b)
					})
				});
				var d = function () {
					return ! 1
				};
				"none" == b.userSelect && (a.onselectstart = !c && d),
				"none" == b.userDrag && (a.ondragstart = !c && d)
			}
		}
	};
	e.Instance = function (a, b) {
		var d = this;
		return c(),
		this.element = a,
		this.enabled = !0,
		this.options = p.extend(p.extend({},
		e.defaults), b || {}),
		this.options.stop_browser_behavior && p.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, !1),
		this.eventStartHandler = t.onTouch(a, m, function (a) {
			d.enabled && v.startDetect(d, a)
		}),
		this.eventHandlers = [],
		this
	},
	e.Instance.prototype = {
		on: function (a, b) {
			var c = a.split(" ");
			return p.each(c, function (a) {
				this.element.addEventListener(a, b, !1),
				this.eventHandlers.push({
					gesture: a,
					handler: b
				})
			},
			this),
			this
		},
		off: function (a, b) {
			var c, d, e = a.split(" ");
			return p.each(e, function (a) {
				for (this.element.removeEventListener(a, b, !1), c = -1; d = this.eventHandlers[++c];) d.gesture === a && d.handler === b && this.eventHandlers.splice(c, 1)
			},
			this),
			this
		},
		trigger: function (a, b) {
			b || (b = {});
			var c = e.DOCUMENT.createEvent("Event");
			c.initEvent(a, !0, !0),
			c.gesture = b;
			var d = this.element;
			return p.hasParent(b.target, d) && (d = b.target),
			d.dispatchEvent(c),
			this
		},
		enable: function (a) {
			return this.enabled = a,
			this
		},
		dispose: function () {
			var a, b;
			for (this.options.stop_browser_behavior && p.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, !0), a = -1; b = this.eventHandlers[++a];) this.element.removeEventListener(b.gesture, b.handler, !1);
			return this.eventHandlers = [],
			t.unbindDom(this.element, e.EVENT_TYPES[m], this.eventStartHandler),
			null
		}
	};
	var q = null,
	r = !1,
	s = !1,
	t = e.event = {
		bindDom: function (a, b, c) {
			var d = b.split(" ");
			p.each(d, function (b) {
				a.addEventListener(b, c, !1)
			})
		},
		unbindDom: function (a, b, c) {
			var d = b.split(" ");
			p.each(d, function (b) {
				a.removeEventListener(b, c, !1)
			})
		},
		onTouch: function (a, b, c) {
			var d = this,
			f = function (f) {
				var g = f.type.toLowerCase();
				if (!p.inStr(g, "mouse") || !s) {
					p.inStr(g, "touch") || p.inStr(g, "pointerdown") || p.inStr(g, "mouse") && 1 === f.which ? r = !0 : p.inStr(g, "mouse") && !f.which && (r = !1),
					(p.inStr(g, "touch") || p.inStr(g, "pointer")) && (s = !0);
					var h = 0;
					r && (e.HAS_POINTEREVENTS && b != o ? h = u.updatePointer(b, f) : p.inStr(g, "touch") ? h = f.touches.length: s || (h = p.inStr(g, "up") ? 0 : 1), h > 0 && b == o ? b = n: h || (b = o), (h || null === q) && (q = f), c.call(v, d.collectEventData(a, b, d.getTouchList(q, b), f)), e.HAS_POINTEREVENTS && b == o && (h = u.updatePointer(b, f))),
					h || (q = null, r = !1, s = !1, u.reset())
				}
			};
			return this.bindDom(a, e.EVENT_TYPES[b], f),
			f
		},
		determineEventTypes: function () {
			var a;
			a = e.HAS_POINTEREVENTS ? u.getEvents() : e.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"],
			e.EVENT_TYPES[m] = a[0],
			e.EVENT_TYPES[n] = a[1],
			e.EVENT_TYPES[o] = a[2]
		},
		getTouchList: function (a) {
			return e.HAS_POINTEREVENTS ? u.getTouchList() : a.touches ? a.touches: (a.identifier = 1, [a])
		},
		collectEventData: function (a, b, c, d) {
			var e = k;
			return (p.inStr(d.type, "mouse") || u.matchType(j, d)) && (e = j),
			{
				center: p.getCenter(c),
				timeStamp: Date.now(),
				target: d.target,
				touches: c,
				eventType: b,
				pointerType: e,
				srcEvent: d,
				preventDefault: function () {
					var a = this.srcEvent;
					a.preventManipulation && a.preventManipulation(),
					a.preventDefault && a.preventDefault()
				},
				stopPropagation: function () {
					this.srcEvent.stopPropagation()
				},
				stopDetect: function () {
					return v.stopDetect()
				}
			}
		}
	},
	u = e.PointerEvent = {
		pointers: {},
		getTouchList: function () {
			var a = [];
			return p.each(this.pointers, function (b) {
				a.push(b)
			}),
			a
		},
		updatePointer: function (a, b) {
			return a == o ? delete this.pointers[b.pointerId] : (b.identifier = b.pointerId, this.pointers[b.pointerId] = b),
			Object.keys(this.pointers).length
		},
		matchType: function (a, b) {
			if (!b.pointerType) return ! 1;
			var c = b.pointerType,
			d = {};
			return d[j] = c === j,
			d[k] = c === k,
			d[l] = c === l,
			d[a]
		},
		getEvents: function () {
			return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
		},
		reset: function () {
			this.pointers = {}
		}
	},
	v = e.detection = {
		gestures: [],
		current: null,
		previous: null,
		stopped: !1,
		startDetect: function (a, b) {
			this.current || (this.stopped = !1, this.current = {
				inst: a,
				startEvent: p.extend({},
				b),
				lastEvent: !1,
				lastVelocityEvent: !1,
				velocity: !1,
				name: ""
			},
			this.detect(b))
		},
		detect: function (a) {
			if (this.current && !this.stopped) {
				a = this.extendEventData(a);
				var b = this.current.inst,
				c = b.options;
				return p.each(this.gestures, function (d) {
					return this.stopped || c[d.name] === !1 || b.enabled === !1 || d.handler.call(d, a, b) !== !1 ? void 0 : (this.stopDetect(), !1)
				},
				this),
				this.current && (this.current.lastEvent = a),
				a.eventType == o && !a.touches.length - 1 && this.stopDetect(),
				a
			}
		},
		stopDetect: function () {
			this.previous = p.extend({},
			this.current),
			this.current = null,
			this.stopped = !0
		},
		getVelocityData: function (a, b, c, d) {
			var f = this.current,
			g = f.lastVelocityEvent,
			h = f.velocity;
			g && a.timeStamp - g.timeStamp > e.UPDATE_VELOCITY_INTERVAL ? (h = p.getVelocity(a.timeStamp - g.timeStamp, a.center.clientX - g.center.clientX, a.center.clientY - g.center.clientY), f.lastVelocityEvent = a) : f.velocity || (h = p.getVelocity(b, c, d), f.lastVelocityEvent = a),
			f.velocity = h,
			a.velocityX = h.x,
			a.velocityY = h.y
		},
		getInterimData: function (a) {
			var b, c, d = this.current.lastEvent;
			a.eventType == o ? (b = d && d.interimAngle, c = d && d.interimDirection) : (b = d && p.getAngle(d.center, a.center), c = d && p.getDirection(d.center, a.center)),
			a.interimAngle = b,
			a.interimDirection = c
		},
		extendEventData: function (a) {
			var b = this.current,
			c = b.startEvent;
			(a.touches.length != c.touches.length || a.touches === c.touches) && (c.touches = [], p.each(a.touches, function (a) {
				c.touches.push(p.extend({},
				a))
			}));
			var d = a.timeStamp - c.timeStamp,
			e = a.center.clientX - c.center.clientX,
			f = a.center.clientY - c.center.clientY;
			return this.getVelocityData(a, d, e, f),
			this.getInterimData(a),
			p.extend(a, {
				startEvent: c,
				deltaTime: d,
				deltaX: e,
				deltaY: f,
				distance: p.getDistance(c.center, a.center),
				angle: p.getAngle(c.center, a.center),
				direction: p.getDirection(c.center, a.center),
				scale: p.getScale(c.touches, a.touches),
				rotation: p.getRotation(c.touches, a.touches)
			}),
			a
		},
		register: function (a) {
			var c = a.defaults || {};
			return c[a.name] === b && (c[a.name] = !0),
			p.extend(e.defaults, c, !0),
			a.index = a.index || 1e3,
			this.gestures.push(a),
			this.gestures.sort(function (a, b) {
				return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
			}),
			this.gestures
		}
	};
	e.gestures.Drag = {
		name: "drag",
		index: 50,
		defaults: {
			drag_min_distance: 10,
			correct_for_drag_min_distance: !0,
			drag_max_touches: 1,
			drag_block_horizontal: !1,
			drag_block_vertical: !1,
			drag_lock_to_axis: !1,
			drag_lock_min_distance: 25
		},
		triggered: !1,
		handler: function (a, b) {
			var c = v.current;
			if (c.name != this.name && this.triggered) return b.trigger(this.name + "end", a),
			void(this.triggered = !1);
			if (! (b.options.drag_max_touches > 0 && a.touches.length > b.options.drag_max_touches)) switch (a.eventType) {
			case m:
				this.triggered = !1;
				break;
			case n:
				if (a.distance < b.options.drag_min_distance && c.name != this.name) return;
				var d = c.startEvent.center;
				if (c.name != this.name && (c.name = this.name, b.options.correct_for_drag_min_distance && a.distance > 0)) {
					var e = Math.abs(b.options.drag_min_distance / a.distance);
					d.pageX += a.deltaX * e,
					d.pageY += a.deltaY * e,
					d.clientX += a.deltaX * e,
					d.clientY += a.deltaY * e,
					a = v.extendEventData(a)
				} (c.lastEvent.drag_locked_to_axis || b.options.drag_lock_to_axis && b.options.drag_lock_min_distance <= a.distance) && (a.drag_locked_to_axis = !0);
				var j = c.lastEvent.direction;
				a.drag_locked_to_axis && j !== a.direction && (a.direction = p.isVertical(j) ? a.deltaY < 0 ? h: f: a.deltaX < 0 ? g: i),
				this.triggered || (b.trigger(this.name + "start", a), this.triggered = !0),
				b.trigger(this.name, a),
				b.trigger(this.name + a.direction, a);
				var k = p.isVertical(a.direction);
				(b.options.drag_block_vertical && k || b.options.drag_block_horizontal && !k) && a.preventDefault();
				break;
			case o:
				this.triggered && b.trigger(this.name + "end", a),
				this.triggered = !1
			}
		}
	},
	e.gestures.Hold = {
		name: "hold",
		index: 10,
		defaults: {
			hold_timeout: 500,
			hold_threshold: 2
		},
		timer: null,
		handler: function (a, b) {
			switch (a.eventType) {
			case m:
				clearTimeout(this.timer),
				v.current.name = this.name,
				this.timer = setTimeout(function () {
					"hold" == v.current.name && b.trigger("hold", a)
				},
				b.options.hold_timeout);
				break;
			case n:
				a.distance > b.options.hold_threshold && clearTimeout(this.timer);
				break;
			case o:
				clearTimeout(this.timer)
			}
		}
	},
	e.gestures.Release = {
		name: "release",
		index: 1 / 0,
		handler: function (a, b) {
			a.eventType == o && b.trigger(this.name, a)
		}
	},
	e.gestures.Swipe = {
		name: "swipe",
		index: 40,
		defaults: {
			swipe_min_touches: 1,
			swipe_max_touches: 1,
			swipe_velocity: .7
		},
		handler: function (a, b) {
			if (a.eventType == o) {
				if (a.touches.length < b.options.swipe_min_touches || a.touches.length > b.options.swipe_max_touches) return;
				(a.velocityX > b.options.swipe_velocity || a.velocityY > b.options.swipe_velocity) && (b.trigger(this.name, a), b.trigger(this.name + a.direction, a))
			}
		}
	},
	e.gestures.Tap = {
		name: "tap",
		index: 100,
		defaults: {
			tap_max_touchtime: 250,
			tap_max_distance: 10,
			tap_always: !0,
			doubletap_distance: 20,
			doubletap_interval: 300
		},
		has_moved: !1,
		handler: function (a, b) {
			var c, d, e;
			a.eventType == m ? this.has_moved = !1 : a.eventType != n || this.moved ? a.eventType == o && "touchcancel" != a.srcEvent.type && a.deltaTime < b.options.tap_max_touchtime && !this.has_moved && (c = v.previous, d = c && c.lastEvent && a.timeStamp - c.lastEvent.timeStamp, e = !1, c && "tap" == c.name && d && d < b.options.doubletap_interval && a.distance < b.options.doubletap_distance && (b.trigger("doubletap", a), e = !0), (!e || b.options.tap_always) && (v.current.name = "tap", b.trigger(v.current.name, a))) : this.has_moved = a.distance > b.options.tap_max_distance
		}
	},
	e.gestures.Touch = {
		name: "touch",
		index: -1 / 0,
		defaults: {
			prevent_default: !1,
			prevent_mouseevents: !1
		},
		handler: function (a, b) {
			return b.options.prevent_mouseevents && a.pointerType == j ? void a.stopDetect() : (b.options.prevent_default && a.preventDefault(), void(a.eventType == m && b.trigger(this.name, a)))
		}
	},
	e.gestures.Transform = {
		name: "transform",
		index: 45,
		defaults: {
			transform_min_scale: .01,
			transform_min_rotation: 1,
			transform_always_block: !1,
			transform_within_instance: !1
		},
		triggered: !1,
		handler: function (a, b) {
			if (v.current.name != this.name && this.triggered) return b.trigger(this.name + "end", a),
			void(this.triggered = !1);
			if (! (a.touches.length < 2)) {
				if (b.options.transform_always_block && a.preventDefault(), b.options.transform_within_instance) for (var c = -1; a.touches[++c];) if (!p.hasParent(a.touches[c].target, b.element)) return;
				switch (a.eventType) {
				case m:
					this.triggered = !1;
					break;
				case n:
					var d = Math.abs(1 - a.scale),
					e = Math.abs(a.rotation);
					if (d < b.options.transform_min_scale && e < b.options.transform_min_rotation) return;
					v.current.name = this.name,
					this.triggered || (b.trigger(this.name + "start", a), this.triggered = !0),
					b.trigger(this.name, a),
					e > b.options.transform_min_rotation && b.trigger("rotate", a),
					d > b.options.transform_min_scale && (b.trigger("pinch", a), b.trigger("pinch" + (a.scale < 1 ? "in": "out"), a));
					break;
				case o:
					this.triggered && b.trigger(this.name + "end", a),
					this.triggered = !1
				}
			}
		}
	},
	a.Hammer = e,
	"object" == typeof module && module.exports && (module.exports = e),
	"function" == typeof define && define.amd ? define(["jquery"], function (b) {
		return d(a.Hammer, b)
	}) : d(a.Hammer, a.jQuery || a.Zepto)
} (window); !
function (a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a: a(jQuery)
} (function (a) {
	function b(b) {
		var g = b || window.event,
		h = i.call(arguments, 1),
		j = 0,
		l = 0,
		m = 0,
		n = 0,
		o = 0,
		p = 0;
		if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l: m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
			if (1 === g.deltaMode) {
				var q = a.data(this, "mousewheel-line-height");
				j *= q,
				m *= q,
				l *= q
			} else if (2 === g.deltaMode) {
				var r = a.data(this, "mousewheel-page-height");
				j *= r,
				m *= r,
				l *= r
			}
			if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor": "ceil"](j / f), l = Math[l >= 1 ? "floor": "ceil"](l / f), m = Math[m >= 1 ? "floor": "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
				var s = this.getBoundingClientRect();
				o = b.clientX - s.left,
				p = b.clientY - s.top
			}
			return b.deltaX = l,
			b.deltaY = m,
			b.deltaFactor = f,
			b.offsetX = o,
			b.offsetY = p,
			b.deltaMode = 0,
			h.unshift(b, j, l, m),
			e && clearTimeout(e),
			e = setTimeout(c, 200),
			(a.event.dispatch || a.event.handle).apply(this, h)
		}
	}
	function c() {
		f = null
	}
	function d(a, b) {
		return k.settings.adjustOldDeltas && "mousewheel" === a.type && b === 0
	}
	var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
	h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
	i = Array.prototype.slice;
	if (a.event.fixHooks) for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
	var k = a.event.special.mousewheel = {
		version: "3.1.11",
		setup: function () {
			if (this.addEventListener) for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
			else this.onmousewheel = b;
			a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
			a.data(this, "mousewheel-page-height", k.getPageHeight(this))
		},
		teardown: function () {
			if (this.removeEventListener) for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
			else this.onmousewheel = null;
			a.removeData(this, "mousewheel-line-height"),
			a.removeData(this, "mousewheel-page-height")
		},
		getLineHeight: function (b) {
			var c = a(b)["offsetParent" in a.fn ? "offsetParent": "parent"]();
			return c.length || (c = a("body")),
			parseInt(c.css("fontSize"), 10)
		},
		getPageHeight: function (b) {
			return a(b).height()
		},
		settings: {
			adjustOldDeltas: !0,
			normalizeOffset: !0
		}
	};
	a.fn.extend({
		mousewheel: function (a) {
			return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
		},
		unmousewheel: function (a) {
			return this.unbind("mousewheel", a)
		}
	})
});