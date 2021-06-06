/*
 * Anime v1.0.0
 * http://anime-js.com
 *
 * Copyright (c) Julian Garnier
 * http://juliangarnier.com
 * Released under the MIT license
 */

var anime = (function() {

  // Easing functions from jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/

  var easings = {
    linear: function(t, b, c, d) {
      return b + t / d * c;
    },
    easeInQuad: function(t, b, c, d) {
	    return c * (t /= d) * t + b;
	  },
	  easeOutQuad: function(t, b, c, d) {
	    return -c * (t /= d) * (t - 2) + b;
	  },
	  easeInOutQuad: function(t, b, c, d) {
	    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	    return -c / 2 * ((--t) * (t - 2) - 1) + b;
	  },
	  easeInCubic: function(t, b, c, d) {
	    return c * (t /= d) * t * t + b;
	  },
	  easeOutCubic: function(t, b, c, d) {
	    return c * ((t = t / d - 1) * t * t + 1) + b;
	  },
	  easeInOutCubic: function(t, b, c, d) {
	    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	    return c / 2 * ((t -= 2) * t * t + 2) + b;
	  },
	  easeInQuart: function(t, b, c, d) {
	    return c * (t /= d) * t * t * t + b;
	  },
	  easeOutQuart: function(t, b, c, d) {
	    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	  },
	  easeInOutQuart: function(t, b, c, d) {
	    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
	    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	  },
	  easeInQuint: function(t, b, c, d) {
	    return c * (t /= d) * t * t * t * t + b;
	  },
	  easeOutQuint: function(t, b, c, d) {
	    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	  },
	  easeInOutQuint: function(t, b, c, d) {
	    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	  },
	  easeInSine: function(t, b, c, d) {
	    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	  },
	  easeOutSine: function(t, b, c, d) {
	    return c * Math.sin(t / d * (Math.PI / 2)) + b;
	  },
	  easeInOutSine: function(t, b, c, d) {
	    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	  },
	  easeInExpo: function(t, b, c, d) {
	    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	  },
	  easeOutExpo: function(t, b, c, d) {
	    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	  },
	  easeInOutExpo: function(t, b, c, d) {
	    if (t == 0) return b;
	    if (t == d) return b + c;
	    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	  },
	  easeInCirc: function(t, b, c, d) {
	    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	  },
	  easeOutCirc: function(t, b, c, d) {
	    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	  },
	  easeInOutCirc: function(t, b, c, d) {
	    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	  },
	  easeInElastic: function(t, b, c, d, elasticity) {
	    var s = 1.70158;
	    var p = d * (1 - (Math.min(elasticity, 99) / 100));
	    var a = c;
	    if (t == 0) return b;
	    if ((t /= d) == 1) return b + c;
	    if (a < Math.abs(c)) { a = c;
	      var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	  },
	  easeOutElastic: function(t, b, c, d, elasticity) {
	    var s = 1.70158;
	    var p = d * (1 - (Math.min(elasticity, 999) / 1000));
	    var a = c;
	    if (t == 0) return b;
	    if ((t /= d) == 1) return b + c;
	    if (a < Math.abs(c)) { a = c;
	      var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	  },
	  easeInOutElastic: function(t, b, c, d, elasticity) {
	    var s = 1.70158;
	    var p = d * (1 - (Math.min(elasticity, 99) / 100));
	    var a = c;
	    if (t == 0) return b;
	    if ((t /= d / 2) == 2) return b + c;
	    if (a < Math.abs(c)) { a = c;
	      var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	  },
	  easeInBack: function(t, b, c, d, s) {
	    var s = 1.70158;
	    return c * (t /= d) * t * ((s + 1) * t - s) + b;
	  },
	  easeOutBack: function(t, b, c, d, s) {
	    var s = 1.70158;
	    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	  },
	  easeInOutBack: function(t, b, c, d, s) {
	    var s = 1.70158;
	    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
	    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	  },
	  easeInBounce: function(t, b, c, d) {
	    return c - jQuery.easing.easeOutBounce(d - t, 0, c, d) + b;
	  },
	  easeOutBounce: function(t, b, c, d) {
	    if ((t /= d) < (1 / 2.75)) {
	      return c * (7.5625 * t * t) + b;
	    } else if (t < (2 / 2.75)) {
	      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
	    } else if (t < (2.5 / 2.75)) {
	      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
	    } else {
	      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
	    }
	  },
	  easeInOutBounce: function(t, b, c, d) {
	    if (t < d / 2) return easings.easeInBounce(t * 2, 0, c, d) * .5 + b;
	    return easings.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	  }
  }

  // Defaults

  var defaultSettings = {
    duration: 1000,
    delay: 0,
    loop: false,
    autoPlay: true,
    direction: 'normal',
    easing: 'easeInOutQuad',
    elasticity: 50,
    speed: 1,
    round: false,
    begin: undefined,
    update: undefined,
    complete: undefined
  }

  var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY'];

  // Utils

  var is = (function() {
    return {
      array:    function(a) { return Array.isArray(a) },
      object:   function(a) { return Object.prototype.toString.call(a).indexOf('Object') > -1 },
      nodeList: function(a) { return (a instanceof NodeList || a instanceof HTMLCollection) },
      html:     function(a) { return a.nodeType },
      svg:      function(a) { return a instanceof SVGElement },
      number:   function(a) { return !isNaN(parseInt(a)) },
      string:   function(a) { return typeof a === 'string' },
      func:     function(a) { return typeof a === 'function' },
      undef:    function(a) { return typeof a === 'undefined' },
      null:     function(a) { return typeof a === 'null' },
      hex:      function(a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a) },
      rgb:      function(a) { return /^rgb/.test(a) },
      rgba:     function(a) { return /^rgba/.test(a) },
      hsl:      function(a) { return /^hsl/.test(a) },
      color:    function(a) { return (is.hex(a) || is.rgb(a) || is.rgba(a) || is.hsl(a))}
    }
  })();

  var randomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var randomColor = function(hue, sat, lum) {
    var h = is.array(hue) ? randomNumber(hue[0], hue[1]) : randomNumber(0, 360);
    var s = is.array(sat) ? randomNumber(sat[0], sat[1]) : randomNumber(60, 90);
    var l = is.array(lum) ? randomNumber(lum[0], lum[1]) : randomNumber(40, 60);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
  }

  // Strings

  var numberToString = function(val) {
    return (is.string(val)) ? val : val + '';
  }

  var stringToHyphens = function(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  var selectString = function(str) {
    var selectors = str.split(' ');
    var rgx = /^[\#\.A-Za-z][A-Za-z0-9\-_:=">\[\]\.]*$/;
    for (var i = 0; i < selectors.length; i++) if (!rgx.test(selectors[i])) return false;
    return document.querySelectorAll(str).length ? document.querySelectorAll(str) : false;
  }

  // Arrays

  var flattenArray = function(arr) {
    return arr.reduce(function(a, b) {
      return a.concat(is.array(b) ? flattenArray(b) : b);
    }, []);
  }

  var toArray = function(o) {
    if (is.array(o)) return o;
    if (is.string(o)) o = selectString(o) || o;
    if (is.nodeList(o)) return [].slice.call(o);
    return [o];
  }

  var arrayContains = function(arr, val) {
    return arr.some(function(a) { return a === val; });
  }

  var groupArrayByProps = function(arr, propsArr) {
    var groups = {};
    arr.forEach(function(o) {
      var group = JSON.stringify(propsArr.map(function(p) { return o[p]; }));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function(group) {
      return groups[group];
    });
  }

  // Objects

  var cloneObject = function(o) {
    var newObject = {};
    for (var p in o) newObject[p] = o[p];
    return newObject;
  }

  var mergeObjects = function(o1, o2) {
    for (var p in o2) o1[p] = !is.undef(o1[p]) ? o1[p] : o2[p];
    return o1;
  }

  // Colors

  var hexToRgb = function(hex) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hex.replace(rgx, function(m, r, g, b) { return r + r + g + g + b + b; });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  var hslToRgb = function(hsl) {
    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hsl);
    var h = (parseInt(hsl[1]) / 360);
    var s = (parseInt(hsl[2]) / 100);
    var l = (parseInt(hsl[3]) / 100);
    var hue2rgb = function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    var r, g, b;
    if (s == 0) r = g = b = l;
    else
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    return 'rgb(' + r * 255 + ',' + g * 255 + ',' + b * 255 + ')';
  }

  var colorToRgb = function(val) {
    if (is.rgb(val) || is.rgba(val)) return val;
    if (is.hex(val)) return hexToRgb(val);
    if (is.hsl(val)) return hslToRgb(val);
  }

  // Units

  var getUnit = function(val) {
    return /([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(val)[2];
  }

  var addDefaultTransformUnit = function(prop, val, intialVal) {
    if (getUnit(val)) return val;
    if (prop.indexOf('translate') > -1) return getUnit(intialVal) ? val + getUnit(intialVal) : val + 'px';
    if (prop.indexOf('rotate') > -1 || prop.indexOf('skew') > -1) return val + 'deg';
    return val;
  }

  // Values

  var getAnimationType = function(el, prop) {
    if ((is.html(el) || is.svg(el)) && arrayContains(validTransforms, prop)) return 'transform';
    if ((is.html(el) || is.svg(el)) && getCSSValue(el, prop)) return 'css';
    if ((is.html(el) || is.svg(el)) && (el.getAttribute(prop) && !el[prop])) return 'attribute';
    if (!is.null(el[prop]) && !is.undef(el[prop])) return 'object';
  }

  var getCSSValue = function(el, prop) {
    return getComputedStyle(el).getPropertyValue(stringToHyphens(prop));
  }

  var getTransformValue = function(el, prop) {
    var defaultVal = prop.indexOf('scale') > -1 ? 1 : 0;
    var str = el.style.transform;
    if (!str) return defaultVal;
    var rgx = /(\w+)\((.+?)\)/g;
    var match = []; var props = []; var values = [];
    while (match = rgx.exec(str)) {
      props.push(match[1]);
      values.push(match[2]);
    }
    var val = values.filter(function(f, i) { return props[i] === prop; });
    return val.length ? val[0] : defaultVal;
  }

  var getInitialTargetValue = function(target, prop) {
    if (getAnimationType(target, prop) === 'transform') return getTransformValue(target, prop);
    if (getAnimationType(target, prop) === 'css') return getCSSValue(target, prop);
    if (getAnimationType(target, prop) === 'attribute') return target.getAttribute(prop);
    return target[prop] || 0;
  }

  var getValidValue = function(values, val, originalCSS) {
    if (is.color(val)) return colorToRgb(val);
    if (getUnit(val)) return val;
    var unit = getUnit(values.to) ? getUnit(values.to) : getUnit(values.from);
    if (!unit && originalCSS) unit = getUnit(originalCSS);
    return unit ? val + unit : val;
  }

  var recomposeValue = function(numbers, strings, initialStrings) {
    return strings.reduce(function(a, b, i) {
      var b = (b ? b : initialStrings[i - 1]);
      return a + numbers[i - 1] + b;
    });
  }

  var decomposeValue = function(val) {
    var rgx = /-?\d*\.?\d+/g;
    return {
      numbers: numberToString(val).match(rgx) ? numberToString(val).match(rgx).map(Number) : [0],
      strings: numberToString(val).split(rgx)
    }
  }

  // Animatables

  var getAnimatables = function(targets) {
    return targets.map(function(t, i) {
      return { target: t, id: i }
    });
  }

  // Settings

  var getSettings = function(params) {
    var settings = mergeObjects(params, defaultSettings);
    if (settings.direction === 'alternate' && !settings.loop) settings.loop = 1;
    return settings;
  }

  // Properties

  var getProperties = function(params, settings) {
    var properties = [];
    for (var prop in params) {
      if (!defaultSettings.hasOwnProperty(prop) && prop !== 'targets') {
        var property = is.object(params[prop]) ? cloneObject(params[prop]) : {value: params[prop]};
        property.name = prop;
        properties.push(mergeObjects(property, settings));
      }
    }
    return properties;
  }

  var getPropertiesValues = function(target, prop, value, i) {
    var values = toArray( is.func(value) ? value(target, i) : value);
    return {
      from: (values.length > 1) ? values[0] : getInitialTargetValue(target, prop),
      to: (values.length > 1) ? values[1] : values[0]
    }
  }

  var getValidInterpolationValues = function(prop, values, type, target) {
    var valid = {};
    if (type === 'transform') {
      valid.from = prop + '(' + addDefaultTransformUnit(prop, values.from, values.to) + ')';
      valid.to = prop + '(' + addDefaultTransformUnit(prop, values.to) + ')';
    } else {
      var originalCSS = (type === 'css') ? getCSSValue(target, prop) : undefined;
      valid.from = getValidValue(values, values.from, originalCSS);
      valid.to = getValidValue(values, values.to, originalCSS);
    }
    return valid;
  }

  var getInterpolationsProps = function(animatables, props) {
    var interpolationsProps = [];
    animatables.forEach(function(animatable, i) {
      var target = animatable.target;
      props.forEach(function(prop) {
        var animType = getAnimationType(target, prop.name);
        if (animType) {
          var values = getPropertiesValues(target, prop.name, prop.value, i);
          var int = cloneObject(prop);
          int.animatables = animatable;
          int.type = animType;
          int.round = is.color(values.from) ? true : int.round;
          int.delay = (is.func(int.delay) ? int.delay(i, animatables.length) : int.delay) / int.speed;
          int.duration = (is.func(int.duration) ? int.duration(i, animatables.length) : int.duration) / int.speed;
          int.from = decomposeValue(getValidInterpolationValues(prop.name, values, int.type, target).from);
          int.to = decomposeValue(getValidInterpolationValues(prop.name, values, int.type, target).to);
          interpolationsProps.push(int);
        }
      });
    });
    return interpolationsProps;
  }

  // Interpolations

  var getInterpolations = function(animatables, props) {
    var interpolationsProps = getInterpolationsProps(animatables, props);
    var splittedProps = groupArrayByProps(interpolationsProps, ['name', 'from', 'to', 'delay', 'duration']);
    return splittedProps.map(function(interpolationProps) {
      var int = cloneObject(interpolationProps[0]);
      int.animatables = interpolationProps.map(function(p) { return p.animatables });
      int.totalDuration = int.delay + int.duration;
      return int;
    });
  }

  var reverseInterpolation = function(int) {
    var toVal = int.to, fromVal = int.from;
    int.from = toVal;
    int.to = fromVal;
  }

  // Progress

  var getInterpolationProgress = function(int, time) {
    var elapsed = Math.min(Math.max(time - int.delay, 0), int.duration);
    var progress = int.to.numbers.map(function (number, p) {
      var start = int.from.numbers[p];
      var delta = number - start;
      var easing = easings[int.easing](elapsed, start, delta, int.duration, int.elasticity);
      return int.round ? Math.round(easing) : easing;
    });
    int.currentValues = {
      progress: progress,
      full: recomposeValue(progress, int.to.strings, int.from.strings)
    }
    return int.currentValues.full;
  }

  var setAnimationProgress = function(anim, time) {
    var transforms = undefined;
    anim.currentTime = Math.min(time, anim.totalDuration);
    anim.progress = (anim.currentTime / anim.totalDuration) * 100;
    anim.interpolations.forEach(function(int) {
      var progress = getInterpolationProgress(int, time);
      anim.values[int.name] = {};
      int.animatables.forEach(function(animatable) {
        var id = animatable.id;
        anim.values[int.name][id] = int.currentValues;
        switch (int.type) {
          case 'css': animatable.target.style[int.name] = progress; break;
          case 'attribute': animatable.target.setAttribute(int.name, progress); break;
          case 'object': animatable.target[int.name] = progress; break;
          case 'transform':
            if (!transforms) transforms = {};
            if (!transforms[id]) transforms[id] = [];
            if (!arrayContains(transforms[id], progress)) transforms[id].push(progress);
            break;
        }
      });
    });
    if (transforms) for (var t in transforms) anim.animatables[t].target.style.transform = transforms[t].join(' ');
    if (anim.settings.update) anim.settings.update(anim);
  }

  // Animation

  var createAnimation = function(params) {
    var targets = flattenArray(is.array(params.targets) ? params.targets.map(toArray) : toArray(params.targets));
    var animatables = getAnimatables(targets);
    var settings = getSettings(params);
    var properties = getProperties(params, settings);
    var interpolations = getInterpolations(animatables, properties);
    return {
      settings: settings,
      targets: targets,
      animatables: animatables,
      interpolations: interpolations,
      totalDuration: Math.max.apply(Math, interpolations.map(function(a){ return a.totalDuration; })),
      values: {},
      currentTime: 0,
      progress: 0,
      running: false,
      ended: false
    }
  }

  // Public

  var anime = function(params) {

    if (!params || !params.targets) return;
    var anim = createAnimation(params);
    var time = {};

    time.tick = function() {
      anim.ended = false;
      time.now = +new Date();
      time.current = time.last + time.now - time.start;
      setAnimationProgress(anim, time.current);
      if (time.current >= anim.totalDuration) {
        if (anim.settings.loop) {
          time.start = +new Date();
          if (is.number(anim.settings.loop)) anim.settings.loop--;
          if (anim.settings.direction === 'alternate') anim.interpolations.forEach(reverseInterpolation);
          time.raf = requestAnimationFrame(time.tick);
        } else {
          anim.ended = true;
          anim.settings.complete ? anim.settings.complete(anim) : anim.pause();
        }
        time.last = 0;
      } else {
        time.raf = requestAnimationFrame(time.tick);
      }
    }

    anim.set = function(params) {
      var mergedParams = mergeObjects(params, anim.settings);
      anim = mergeObjects(createAnimation(mergedParams), anim);
    }

    anim.seek = function(progress) {
      var time = is.number(progress) ? progress : (is.number(progress.time) ? progress.time : (progress.percent / 100) * anim.totalDuration);
      setAnimationProgress(anim, time);
    }

    anim.play = function(params) {
      if (params) anim.set(params);
      if (!anim.running) {
        anim.running = true;
        time.start = +new Date();
        time.last = anim.ended ? 0 : anim.currentTime;
        if (anim.settings.direction === 'reverse') anim.interpolations.forEach(reverseInterpolation);
        if (anim.settings.begin) anim.settings.begin(anim);
        time.raf = requestAnimationFrame(time.tick);
      }
    }

    anim.pause = function(params) {
      if (params) anim.set(params);
      anim.running = false;
      cancelAnimationFrame(time.raf);
    }

    anim.restart = function(params) {
      if (params) anim.set(params);
      anim.running = false;
      anim.currentTime = 0;
      anim.play();
    }

    if (anim.settings.autoPlay) anim.play();

    return anim;

  }

  anime.easings = easings;
  anime.is = is;
  anime.getInitialValue = getInitialTargetValue;
  anime.random = randomNumber;
  anime.hsl = randomColor;


  return anime;

})();
