# 如何用AI写一个浏览器插件？b站文章一键删插图插件实战

大家好，我是彪哥。

今天教大家如何去用AI写一个浏览器插件。



## 1.明确需求

这步是最重要的一步，就是你如果你自己都不知道自己的需求是什么，

那AI写出来的就没确定性了，后面改来改去很麻烦，而且很浪费精力。。

交代一下我的需求，我写文章希望多平台同步，

当我把我的这个MD格式的文章上传到B站这个平台，

发现图片根本上传不了，

![image-20260413233251691](https://asiaassets.gokuscraper.com/images/2026/04/14/62f09a2a079e348e.webp)

原因有可能是，我的这个图床它不支持，要不然就是说我的这个图片的格式它不支持。

但是这都需要我去改我的这个文章，我不希望改，它只是我的一个分发平台。

我不希望我的文章为了这个平台做任何的改变。说白了这篇文章没有图片也无所谓，我只是想发布罢了。

但是这个时候因为它报错，这个时候没法发布。

![image-20260413233442029](https://asiaassets.gokuscraper.com/images/2026/04/14/a3c829ade833110c.webp)

所以我们需要把这个所有的错误图片报错的错误删掉之后再发布，应该就可以了。

我的需求就是写一个浏览器插件，

当我切换到哔哩哔哩这个写文章页面的时候，它会显示一个悬浮按钮，

然后我点击一下，就可以把这个所有的图片错误删掉。

我们打开浏览器开发者编辑器，对这个网页结构有一个大概的认识。

![](https://asiaassets.gokuscraper.com/images/2026/04/14/c9b24bb5b6f98626.webp)

## 2.选对工具

我这里用的是vscode,其实别的这个AI IDE也是类似的。比如cursor,claude code等。

打开ide

![image-20260413233845502](https://asiaassets.gokuscraper.com/images/2026/04/14/a7f2de24bb9f889f.webp)

把提示词发给ide

```
帮我写一个浏览器插件，在这个https://member.bilibili.com/platform/upload/text/new-edit网站显示一个悬浮窗，

当我点击时，删掉所有class="eva3-enhanced-image-wrapper" 的div元素
```

![image-20260413234508565](https://asiaassets.gokuscraper.com/images/2026/04/14/2cdb0b921857c877.webp)

点击保留，准备按照说明测试

![image-20260413234629213](https://asiaassets.gokuscraper.com/images/2026/04/14/6cb60c653468e287.webp)



## 3.插件测试

打开浏览器，点击管理扩展程序

![image-20260413234849026](https://asiaassets.gokuscraper.com/images/2026/04/14/aa75fce73848c339.webp)



点击加载已解压的扩展程序

![image-20260413234910203](https://asiaassets.gokuscraper.com/images/2026/04/14/870b255176529b54.webp)

选择刚才我们开发的插件

![image-20260413235016768](https://asiaassets.gokuscraper.com/images/2026/04/14/9f3ecec9112871aa.webp)



回到b站上传文章测试效果，有按钮，

我们点击测试一下，

![image-20260413235143294](https://asiaassets.gokuscraper.com/images/2026/04/14/e36b361c3070cc11.webp)

发现无效

![image-20260413235612079](https://asiaassets.gokuscraper.com/images/2026/04/14/36fe091470f1fa01.webp)

让ai再改一份

```
为啥提示没找到元素啊  我打开f12看了是有的
```

![image-20260413235658786](https://asiaassets.gokuscraper.com/images/2026/04/14/51de830134856fef.webp)

更新一下

![image-20260413235859939](https://asiaassets.gokuscraper.com/images/2026/04/14/86d49efad0013bd1.webp)

再次测试

![image-20260413235950667](https://asiaassets.gokuscraper.com/images/2026/04/14/64b5a887878c38b4.webp)



成功删除

![image-20260414000022148](https://asiaassets.gokuscraper.com/images/2026/04/14/f3086d01ee683cb7.webp)

但是文章还是无法上传

![image-20260414000637085](https://asiaassets.gokuscraper.com/images/2026/04/14/2e106553b9be86f6.webp)

直接复制html问ai,

![image-20260414000727005](https://asiaassets.gokuscraper.com/images/2026/04/14/0bd4639744f0149a.webp)

提示词

```
复制的html+

那我把那个错误图片删掉之后，它还是提示我这个有图片异常啊，我把那个那个元素给删掉了。
```

![image-20260414000923635](https://asiaassets.gokuscraper.com/images/2026/04/14/436da43358aeb8a2.webp)

又改了一份，刷新一下，测试

![image-20260414001001915](https://asiaassets.gokuscraper.com/images/2026/04/14/11ea5e6fab2f67bd.webp)

测试

![image-20260414001051556](https://asiaassets.gokuscraper.com/images/2026/04/14/5494dce5cf3d2bb2.webp)



删除成功

![image-20260414001228083](https://asiaassets.gokuscraper.com/images/2026/04/14/b47acf73b6265574.webp)





成功上传

![image-20260414001254669](https://asiaassets.gokuscraper.com/images/2026/04/14/7040255288c4201a.webp)

至此，目标实现。



## 4.总结

这次其实就是用AI写了个简单的浏览器插件，帮我发文章的时候一键删掉报错图片，中间踩了点坑，

比如页面是动态加载、删了DOM但状态还在，最后通过不断把真实页面结构丢给AI去改，问题就解决了。

本质上不是代码多难，而是你要把问题说清楚、把现场信息给够，AI才能帮你干活。

![抱拳了](https://asiaassets.gokuscraper.com/images/2026/04/14/0061c30253872f13.gif)

> 感谢各位朋友捧场！要是觉得内容有有点意思，**别客气，点赞、在看、转发，直接安排上！**
>
> 想以后第一时间看着咱的文章，**别忘了点个星标⭐，别到时候找不着了。**
>
> 行了，今儿就到这儿。
>
> **论成败，人生豪迈，我们下期再见！**

![image-20260414003607451](https://asiaassets.gokuscraper.com/images/2026/04/14/0a43da4a9526d6eb.webp)

886

## 公众号和交流群

欢迎进群交流。

![交流群](https://asiaassets.gokuscraper.com/%E6%82%9F%E7%A9%BA%E7%88%AC%E8%99%AB%E5%85%AC%E4%BC%97%E5%8F%B7.jpg)
