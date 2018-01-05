## Screenshot
![screenshot](https://github.com/dishuostec/superscript-chs-demo/raw/master/public/img/screenshot.png)

## Usage

```
git clone https://github.com/dishuostec/superscript-chs-demo.git superscript-chs-demo
cd superscript-chs-demo
npm install
npm start
```

用 chrome 打开 [http://localhost:3000]()

## Info

用 `ss-chs` 库扩展了 `superscript`、`ss-parser`、`ss-message`，使得 `superscript` 支持中文处理。

自带的脚本：

```
+ 计算面积
- {^hasItem('area_shape', false)} ^topicRedirect('计算面积', '问形状')
- {^hasItem('area_shape', true)} ^topicRedirect('计算面积', '问条件')

> topic 计算面积 (计算, 面积) {keep}
    + 问形状
    - 好的，什么形状？

    + 问条件
    - {^equal('area_shape', '正方形')} {@正方形}
    - {^equal('area_shape', '长方形')} {@长方形}
    - {^equal('area_shape', '三角形')} {@三角形}
    - {^equal('area_shape', '圆形')} {@圆形}

    + 正方形
    - 边长是多少？ ^save('area_shape', '正方形')

    + [边长是] (*)
    % 边长是多少 *
    - {^hasNumber(1)} ^calArea('正方形', {l1: <cap>})

    + 长方形
    - 长和宽是多少？ ^save('area_shape', '长方形')

    + [长|宽] *1 [,] [长|宽] *1
    % 长和宽是多少 *
    - {^hasNumber(2)} ^calArea('长方形', {l1: <cap1>, l2: <cap2>})

    + 三角形
    - 底和高是多少？ ^save('area_shape', '三角形')

    + [底|高] *1 [底|高] *1
    % 底和高是多少 *
    - {^hasNumber(2)} ^calArea('三角形', {l1: <cap1>, l2: <cap2>})

    + 圆形
    - 半径是多少？ ^save('area_shape', '圆形')

    + [半径是] (*)
    % 半径是多少 *
    - {^hasNumber(1)} ^calArea('圆形', {l1: <cap>})

< topic
```

## Thanks

- [SuperScript](https://github.com/superscriptjs/superscript)
- [nodejieba](https://github.com/yanyiwu/nodejieba)

## License

[The MIT License (MIT)](https://github.com/superscriptjs/superscript/blob/master/LICENSE.md)
