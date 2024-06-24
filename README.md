# 网页输入法

项目地址：https://github.com/kekxv/ibus-qikai

来点友好的反馈：https://github.com/kekxv/ibus-qikai/issues


- 手写输入法

> 借鉴了 https://github.com/microcai/ibus-handwrite 项目

- 拼音输入法

> https://github.com/kekxv/vue-pinyinKeyboard
> 
> 参考借鉴 ： https://github.com/sxei/pinyinjs

## 效果

### 拼音
```js
console.log("pinyin:pin,", handwrite.pinyinmatch("pin"))
// [Log] pinyin:pin, – "品贫聘频拼拚颦姘嫔榀牝"
console.log("pinyin:yin,", handwrite.pinyinmatch("yin"))
// [Log] pinyin:yin, – "因引银印音饮阴隐姻殷淫尹荫吟瘾寅茵圻垠鄞湮蚓氤胤龈窨喑铟洇狺夤廴吲霪茚堙"
```

### 手写

手写整体效果一般般，需要一笔一画的书写，且依赖顺序，后期考虑做笔划排序，以及笔划识别优化

> 目前手写是指定的宽度 size{width: 260,height: 260 - 60,}

![shuo.png](https://github.com/kekxv/ibus-qikai/raw/main/assets/shuo.png)
![zhang.png](https://github.com/kekxv/ibus-qikai/raw/main/assets/zhang.png)
