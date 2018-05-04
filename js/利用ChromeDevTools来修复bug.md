# 利用Chrome DevTools来修复Bug

原文作者:[Brandon Morelli](https://codeburst.io/@bmorelli25?source=post_header_lockup)

原文地址:https://codeburst.io/learn-how-to-debug-javascript-with-chrome-devtools-9514c58479db

翻译:HowardTang

-------------------------------

身为一个初级的开发工程师,寻找和解决bugs会让人感觉非常困难。我们会频繁的使用`console.log()`来寻找并处理bugs,**不要再这样做了!**

这是一篇讲述关于正确调试程序姿势的文章,你将会学习到如何在Chorme Developer Tools中设置断点来修复你的代码.

这个教程会向你展示如何去调试一个具体的issue,但是它的原理是通用的,你可以通过学习它来有效的解决所有类型的JavaScript bugs.



## 第一步:重现BUG

重现bug是调试的第一步.重现bug意味着需要找出导致bug出现的行为,我们可能需要多次的重现错误,所以要尽量的减免不必要的步骤.

下面,会展示一个有BUG的DEMO,跟着步骤一步一步来解决这个BUG吧

- 在新的页面中打开这个[**DEMO**](https://googlechrome.github.io/devtools-samples/debug-js/get-started).
- 在**NUMBER1**的输入框中输入**5**
- 在**NUMBER2**的输入框中输入**1**
- 点击按钮**add Number1 and Number2**将数字相加
- 输出的结果为`5 + 1 =51`

输出的结果是错误的!正确的结果应为6,这是一个BUG!



## 第二步:利用断点暂停代码

可以利用DevTool让代码暂停执行,并且可以检查在那时刻的所有变量的值.暂停代码的工具叫断点,让我们试一试吧:

- 回到刚刚的页面,并打开DevTools工具,打开方法:`Command+Option+I(Mac)`,`Control+Shift+I (Window,Linux)`.

- 点击工具栏上的**Sources**按钮

- 点击展开**Event Listener Breakpoints**列表,DevTools展示了一个可扩展的事件类别列表,例如**Animation(动画)** 和**Clipboard(剪切板)**.

- 点击展开**Mouse**事件列表

- 勾选 **click** 事件

  ![0_kMC1NRb04kmBZ82P](D:\note\js\assets/0_kMC1NRb04kmBZ82P.png)

  

- 回到DEMO当中,再次点击**add Number1 and Number2**按钮,DevTools会暂停代码,并且在**Sources**面板中高亮一段代码

```
function onClick() {
```

 ### 为什么?

当你在`Event Listener BreakPoints`中勾选了**点击**后,你就建立了一个基于事件点击的断点,当你点击任意节点的时候并且该节点有一个`click`的事件时,DevTools自动暂停在该点击事件(函数)的第一行当中



## 第三步 单步调试代码

发生错误的一个常见原因就是代码的执行顺序错了,我们可以通过单步调试来一行一行的执行代码,这样我们就可以弄清楚你写的代码的执行步骤了:

- 在 **Sources**面板中,点击**Step into next function call**按钮

  ![0_jG6_q1VmUpTXGgT1 (D:\note\js\assets/0_jG6_q1VmUpTXGgT1 (1).png)](C:\Users\Administrator\Desktop\0_jG6_q1VmUpTXGgT1 (1).png)

  点击一下这个按钮,代码就会在`onClick()`中执行一行,当DevTools高亮下面这句代码的时候
  ```
  if (inputsAreEmpty()) {
  ```

- 现在点击 **Step over next function call** 按钮:

![a](D:\note\js\assets/0_98yNamZxcsTisowa.png)

​	这告诉DevTools执行inputsAreEmpty()。注意DevTools跳过几行代码。这是因为inputsAreEmpty()计算为false,因此if语句的代码块不执行。 

-----

单步调试代码的基本思想:可以利用单步调试,一步一步的接近错误的代码.  



## 第四步:设置另一种断点

行断点是最常见的断点类型,当你有一行代码需要暂停,你就可以为它加上行断点

- 在`updateLabel`函数中,找到这一句代码

  ```
  label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;
  ```

在代码的左侧,你可以看到代码的行数:32,点击32,DevTools会把给它加上一个蓝色的光标,这就是行断点了,这意味着代码执行到这一行上面的时候,就会暂停执行

- 点击**Resume script execution** 按钮

  ![0_wFGPXpdqODqzs2mY](D:\note\js\assets/0_wFGPXpdqODqzs2mY-1525418629586.png)

代码会继续执行,直到你刚刚放置断点的地方

- 代码已经执行了`updateLabel()`,DevTools打印出了 `addend1`, `addend2`, 和`sum`.

  `sum`看起来非常可疑,它似乎是一个字符串,但是它应该是一个`Number`类型,这可能是错误的原因



## 第五步:检查变量的值

产生错误的另一个常见原因就是一个变量或函数产生出一个与预期不相同的值,许多的开发人员会通过`console.log()`来查看值,但这非常的无趣与乏味:

 	1. 你需要手动的编辑并且调用`console.log()`
 	2. 你可能不知道哪些变量是与产生BUG相关的,所以你需要监视非常多的变量

在DevTools有一个功能可以代替`console.log()`,这就是Watch Expressions ,他不仅可以观察监视变量,还可以存储任何JS的表达式:

- 在**Sources**面板中,点击**Watch** 按钮
- 点击**Add Expression** 

![0_UpumeYQc3_gv8JVk](D:\note\js\assets/0_UpumeYQc3_gv8JVk-1525419135000.png)

- 输入 `typeof sum`

- 点击回车按钮,DevTools 工具会显示`typeof sum: "string" ` , 冒号右边的值是Watch表达式的结果。 

  ![0_yEoCmNDJBEZb8Nxe](D:\note\js\assets/0_yEoCmNDJBEZb8Nxe.png)

  所以,`Sum`是一个字符串,它理应是一个`Number`,这就是这个DEMO的BUG的原因



第二个代替`console.log()`的功能就是控制台,可以使用控制台来调用任何的JS语句,调试时，开发人员通常使用控制台覆盖变量值。我们可以利用控制台测试修复刚刚发现的BUG:

- 点击**CONSOLE**的TAB打开控制台

- 在控制台输入 `parseInt(addend1) + parseInt(addend2)`

- 按下回车,控制台会输出`6`,这是我们想要的答案

  ![0_tcs5P_NdlIU_9dpu](D:\note\js\assets/0_tcs5P_NdlIU_9dpu.png)



## 第六步 修复BUG

我们已经确定了该错误,并且找到了修复的方法,剩下的就是通过编辑代码并重新运行了,我们不需要离开DevTools即可修复这个BUG,我们可以在DevTools 面板中直接编辑JS代码:

- 在**Sources**面板中,用`var sum = parseInt(addend1) + parseInt(addend2); `替换掉`var sum = addend1 + addend2 `语句. 

- 按下 Command+S (Mac) or Control+S (Windows, Linux)  保存我们的更改

- 点击 **Deactivate breakpoints** 

  ![0_hyuaGwUfClHRIpuk](D:\note\js\assets/0_hyuaGwUfClHRIpuk.png)

  如果这个按钮变成了蓝色的,就代表他已经开启,DevTools会忽略我们设置的任何断点

- 点击 **Resume script execution**

![0_n6QiQtGxRZvieXoa](D:\note\js\assets/0_n6QiQtGxRZvieXoa.png)

这时候页面就会输出正确的值了