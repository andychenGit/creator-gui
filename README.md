# creator-gui
主要是扩展一些cocos Creator引擎的gui组件


一、增加最常用的TablView组件(重复回收利用的列表视图  TableLayerTest、TalkLayerTest）

        //this.view表示tableview视图对象
        var tempData = []
        for (let i = 0; i < 20; i++) {
            tempData.push(i)
        }
        
        this.view.setData(tempData)
        this.view.reloadData()
        this.view.setClickCallBack((cell, data)=>{

        })

    该列表组件参照了cocos2dx里C++的TableView原理衍生出来的，并对其做了部分调整
    
     1、增加了cell的对齐方式,  操作：TableView脚本组件->Alignment属性选择，具体请参考案例
     
     2、增加了cell出场动画自定义效果，以及分帧加载，操作：TableView脚本组件->IsDelay属性勾选，
     
        设置延迟时间DelayTime属性，动画效果需要重写BaseCell:updateAnim方法，具体请参考案例
     
     3、支持自定义cell大小，可以支持聊天系统，具体请参考uitalkLayerTest
     
     4、支持选中的回调设置setClickCallBack，以及选中的cell效果改变， 具体请参考TableLayerTest


二、基于Tablview扩展GridView组件（网格列表视图，支持多行多列的相同大小cell）

     1、继承了TableView的功能，不支持大小不一的cell，具体请参考案例：GridLayerTest
    

三、基于Tablview扩展PickerView组件（选择器列表视图，用于翻页列表、选择性的列表）

    1、具体请参考案例：PickerLayerTest、PageLayerTest


四、基于Tablview扩展TreeView组件（树型展开列表视图，用于实现城市选择，文件选择等等）

    1、具体请参考案例：TreeLayerTest
