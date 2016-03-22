box-sizing: border-box;
IE盒模型BUG
在 IE5.x 以及 Quirks 模式的 IE6/7 中，将 border 与 padding 都包含在 width 之内。
上面的样式将所有的元素的box-sizing都设置成了border-box，而默认值是content-box，我们普遍使用的还是content-box，因为这是默认的样式，而且一般写的时候也不会去重置这个样式。