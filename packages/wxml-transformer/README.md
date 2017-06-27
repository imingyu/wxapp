#wxml-transformer
将微信小程序的wxml代码转换成js object或html片段

## 安装
```bash
npm i wxml-transformer --save-dev
```

## 使用
```javascript
var transformer = require('wxml-transformer');
transformer.toHtml('<view id="box">{{123}}</view>');//<div id="box">{{123}}</div>


var options = {
    mapping:{
        view:'section',
        text:(element, helper)=>{
            return `<span data-wxa="text" ${helper.propsStringify(element.props)}>${helper.childrenStringify(element.children, options)}</span>`
        }
    }
};
transformer.toHtml('<view id="box">{{123}} <text id="t1">456</text></view>', options);//<section id="box">{{123}} <span data-wxa="text" id="t1">456</span></section>

transformer.toObject('<view id="box">{{123}}</view>');//{tag:'view', props:{id:'box'}, children:[ {'{{123}}'} ]}
```