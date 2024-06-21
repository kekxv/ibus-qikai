import IBusQukai from '../src';

let handwrite = new IBusQukai({model: 'handwrite'});
let strokes = [];
strokes.push([{x: 0, y: 0}, {x: 100, y: 100}]);
strokes.push([{x: 0, y: 0}, {x: 150, y: 200}, {x: 150, y: 200}, {x: 150, y: 200}, {x: 150, y: 200}, {
  x: 150,
  y: 200
}, {x: 150, y: 200}, {x: 100, y: 100}]);
strokes.push([{x: 5, y: 5}, {x: 10, y: 70}, {x: 100, y: 100}]);
console.time("domatch")
let result = handwrite.domatch(strokes);
console.timeEnd("domatch")
console.log("pinyin:pin,", handwrite.pinyinmatch("pin"))
console.log("pinyin:yin,", handwrite.pinyinmatch("yin"))

document.body.onload = function () {
  console.log("加载成功")
  let box = document.querySelector("#ibus-draw");
  box.width = handwrite.size.width;
  box.height = handwrite.size.height;
  document.querySelector("#clean").onclick = function () {
    handwrite.clean();
  }
  // handwrite.canvas = box;
  handwrite.canvas = "#ibus-draw";
  handwrite.init();
  handwrite.onword = function (words) {
    console.log("words", words.result);
    let text = words.stroke + "&nbsp;";
    for (let i = 0; i < words.result.length && i < 10; i++) {
      if (!words.result.hasOwnProperty(i)) {
        return;
      }
      text = `${text} &nbsp; ${words.result[i].value}`;
    }
    document.querySelector("#words").innerHTML = text;
  }
}
