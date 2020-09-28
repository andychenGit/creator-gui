# creator-gui
主要是扩展一些cocos Creator引擎的gui组件


一、增加最常用的tableview组件(重复回收利用的列表视图)

    该列表组件参照了cocos2dx里C++的tableview原理衍生出来的，并对其做了部分调整
    
     1、增加了cell的对齐方式,  操作：Tablview脚本组件->Alignment属性选择，具体请参考案例
     
     2、增加了cell出场动画自定义效果，以及分帧加载，操作：Tablview脚本组件->IsDelay属性勾选，设置延迟时间DelayTime属性，动画效果需要重写BaseCell:updateAnim方法，具体请参考案例
     
     3、支持自定义cell大小，可以支持聊天系统，具体请参考uitalkLayerTest
     
     4、支持选中的回调设置setClickCallBack，以及选中的cell效果改变， 具体请参考uitalkLayerTest
     
