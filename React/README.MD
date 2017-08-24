# 学习Reat 的笔记

根据下面这本书学习的一些例子..

[FullStackereact-30 days of React](https://www.fullstackreact.com/30-days-of-react)

[中文翻译地址](http://www.zcfy.cc/@jiaxianhua/article)

> 感谢翻译人员[@IOSDevLog](http://www.zcfy.cc/@jiaxianhua/article)的付出



### Day 1 Hello World 

[React](https://facebook.github.io/react/)是一个用于构建用户界面的JavaScript库。它是**Web应用程序的视图层。**

所有React应用程序的核心是**组件(components)**。

#### 它是如何工作的？

React不是直接在浏览器的文档对象模型（DOM）上运行，而是在**虚拟DOM(virtual DOM)**上运行。也就是说,React不是直接对`document`修改,(因为这样会很慢),它会在其虚拟DOM中更改,然后在更新完虚拟DOM之后,React会智能地对实际DOM做出更改

虚拟Dom 完全存在于内存当中,并且以浏览器的DOM形式展示,所以,我们编写一个React组件时,我们并不是直接写Dom,而是虚拟组件,React会将其变成Dom.

例子代码:

```
<html>
<head>
  <meta charset="utf-8">
  <title>Hello world</title>
  <!-- Script tags including React -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js"></script>
  <script src="https://npmcdn.com/babel-core@5.8.38/browser.min.js"></script>

</head>
<body>
  <div id="app"></div>
  <script type="text/babel">
    ReactDOM.render(
      <h1>Hello world</h1>,
      document.querySelector('#app')
    );
  </script>
</body>
</html>
```