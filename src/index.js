/**
 * 输入法 ibus
 * @param option {{model:'pinyin'|'handwrite'}}
 * @constructor
 */
import table from './handwrite.table'
import pinyinUtil from "./pinyin/pinyinUtil";

function domatch(stroke) {
  let result = [];
  if (stroke.length <= 0) {
    return result;
  }

  for (let key in table) {
    let word = table[key];
    if (word.stroke.indexOf(stroke) === 0) {
      result.push(word);
    }
  }
  result.sort((a, b) => a.stroke.length - b.stroke.length);
  return result;
}

/**
 *
 * @param option {{model:'handwrite'|'pinyin',onword:function({result:[{stroke,value}],stroke})}}
 * @constructor
 */
const IBusQukai = function (option) {
  if (!(this instanceof IBusQukai)) throw new Error("请使用 new IBusQukai()方式调用");
  option.model = option.model || 'handwrite';
  if (option.model !== 'handwrite' && option.model !== 'pinyin') {
    throw new Error(`暂不支持${option.model}输入法`)
  }
  let onword = option.onword || function () {
  }
  let self = this;
  /**
   * 画布
   * @type {HTMLCanvasElement|null}
   */
  let canvas = null;
  /**
   *
   * @type {CanvasRenderingContext2D}
   */
  let ctx = null;
  /**
   * @param {{width: number, height: number}}
   */
  Object.defineProperty(this, "size", {
    /**
     *
     * @returns {{width: number, height: number}}
     */
    get: function () {
      return {
        width: 260,
        height: 260 - 60,
      };
    },
  });

  /**
   * @type {HTMLCanvasElement|null}
   */
  Object.defineProperty(this, "canvas", {
    get: function () {
      return canvas;
    },
    set: function (canvas_) {
      if (canvas_) {
        if (typeof canvas_ === 'string') {
          canvas = document.querySelector("#ibus-draw");
          return;
        }
      }
      canvas = canvas_;
    },
  });
  /**
   * @type {function({result:[{stroke,value}],stroke})}
   */
  Object.defineProperty(this, "onword", {
    get: function () {
      return onword;
    },
    set: function (func) {
      if (!func) {
        onword = function () {
        };
        return;
      }
      if (typeof func === 'function') {
        onword = func;
      }
    },
  });
  /**
   * @type {CanvasRenderingContext2D|null}
   */
  Object.defineProperty(this, "$context", {
    get: function () {
      return ctx;
    },
  });

  let point = {x: 0, y: 0};
  let strokes = [];
  let stroke = [];
  let flag = false;

  function moveFn(e) {
    e = e || event;
    const x = e.offsetX;
    const y = e.offsetY;
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
    point.x = x;
    point.y = y;
    stroke.push({x: point.x, y: point.y});
  }

  function mousedownFn(e) {
    flag = true;
    e = e || event;
    point.x = e.offsetX;
    point.y = e.offsetY;
    stroke = [];
    canvas.addEventListener("mousemove", moveFn);
  }

  function mouseupFn() {
    try {
      canvas.removeEventListener("mousemove", moveFn);
      strokes.push(stroke);
      if (flag) {
        let result = self.domatch(strokes);
        onword && onword(result);
      }
    } finally {
      flag = false;
    }
  }

  /**
   * @type {function}
   */
  Object.defineProperty(this, "init", {
    get: function () {
      return () => {
        ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", mousedownFn);
        window.addEventListener("mouseup", mouseupFn);
      }
    },
  });
  /**
   * @type {function}
   */
  Object.defineProperty(this, "free", {
    get: function () {
      return () => {
        this.clean();
        canvas.removeEventListener("mousedown", mousedownFn);
        window.removeEventListener("mouseup", mouseupFn);
      }
    },
  });
  /**
   * @type {function}
   */
  Object.defineProperty(this, "clean", {
    get: function () {
      return () => {
        if (!ctx) {
          return false;
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        strokes = [];
        stroke = [];
        return true;
      }
    },
  });

}
IBusQukai.prototype.type = "ibus-qikai"
IBusQukai.prototype.inRectangle = function (point, rect) {
  if (rect.x1 > point.x) return false;
  if (rect.x2 < point.x) return false;
  if (rect.y1 > point.y) return false;
  return rect.y2 >= point.y;

}
IBusQukai.prototype.calcStrokeEnum = function (points) {
  if (points.length < 2) return '';
  const startpoint = points[0];
  const endpoint = points[points.length - 1];

  let rect = {
    x1: Math.min(startpoint.x, endpoint.x), y1: Math.min(endpoint.y, startpoint.y),
    x2: Math.max(endpoint.x, startpoint.x), y2: Math.max(endpoint.y, startpoint.y)
  };

  // 有米有折点
  if (Math.abs(startpoint.x - endpoint.x) > 17 && Math.abs(startpoint.y - endpoint.y) > 7) {
    let init = 0;
    // 可能是 折 笔划
    for (let i = 1; i < points.length - 1; ++i) {
      if (!this.inRectangle(points[i], rect)) {
        init++;
      }

      if (init > 5) {
        // 是 折 笔划
        return 'z';
      }
    }
  }
  //首先，比较 起点和终点的 斜率
  const x = startpoint.x - endpoint.x;
  const y = startpoint.y - endpoint.y;

  const atan2_y_x = Math.atan2(y, x);
  if ((0 < atan2_y_x) || (atan2_y_x < -2.9)) {
    return 'h';
  }
  if (atan2_y_x < -2) {
    return 'n';
  }
  if ((-1.7 < atan2_y_x) && (atan2_y_x < -1.4)) {
    return 's';
  }
  if (atan2_y_x < -0.5) {
    return 'p';
  }
  return '';
}
IBusQukai.prototype.domatch = function (strokes) {
  let result = [];
  if (strokes.length <= 0) return result;
  let stroke = "";
  for (let key in strokes) {
    let item = strokes[key];
    const stroke_ = this.calcStrokeEnum(item);
    stroke += stroke_;
  }
  if (stroke.length <= 0) return result;
  const ret = domatch(stroke);
  for (let key in ret) {
    result.push(ret[key]);
  }
  return {result, stroke};
}
IBusQukai.prototype.pinyinmatch = function (pinyin) {
  return pinyinUtil.getHanzi(pinyin)
}

export default IBusQukai
