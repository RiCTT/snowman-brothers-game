# 【H5版】雪人兄弟

## 摇杆设计

  ### 因为是
  ### 跳跃操作

    本质上是在一个设定半径的圆上运动，如果没有选中转盘，则默认垂直跳跃，否则根据位置，向左上或者向右上进行跳跃；

    - 缓动系数

      定义一个终点，一个0-1的缓动系数。每次速度 = 当前坐标 - 终点坐标 * 系统，随着距离越小，速度越慢。整体表现为：速度由快到慢，趋于0

## 参考资料
  - [碰撞检测](https://cloud.tencent.com/developer/article/1483707?from=15425)
  - [弹性碰撞](https://baijiahao.baidu.com/s?id=1675105209720015473&wfr=spider&for=pc)
  - [缓动函数](https://www.xuanfengge.com/easeing/easeing/#easeInOutSine)
  - [tween.js](https://github.com/zhangxinxu/Tween/blob/master/tween.js)
  - [tween.js效果展示](https://www.zhangxinxu.com/study/201612/how-to-use-tween-js.html)