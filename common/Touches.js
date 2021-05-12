
class Touches {
    constructor() {

    }

    _getIndex(e) {  // 获取滑动列表的下标值
        return e.currentTarget.dataset.index
    }

    _getMoveX(e, startX) {  // 获取滑动过程中滑动的距离
        return this.getClientX(e) - startX
    }

    _getEndX(e, startX) {  // 获取滑动结束滑动的距离
        let touch = e.changedTouches
        if (touch.length === 1) {
            return touch[0].clientX - startX
        }
    }

    _resetData(dataList,index) {  // 重置数据， 把所有的列表 left 置为 0 
        for (let i in dataList) {
            dataList[i].left = 0
            if(index == i || index == undefined){
                
            }else{
                dataList[i].hidden = false
            }
            
        }
        return dataList
    }

    getClientX(e) {  // 获取滑动的横坐标
        let touch = e.touches
        if (touch.length === 1) {
            return touch[0].clientX
        }
    }
    clearData(dataList){
        for (let i in dataList) {
            dataList[i].left = 0
            dataList[i].hidden = false
        }
        return dataList
    }

    touchM(e, dataList, startX) {  // touchmove 过程中更新列表数据
        let list = this._resetData(dataList)
        list[this._getIndex(e)].left = this._getMoveX(e, startX)
        return list
    }

    touchE(e, dataList, startX, width) {  // touchend 更新列表数据
        let list = this._resetData(dataList,e.currentTarget.dataset.index)
        let disX = this._getEndX(e, startX)
        let left = 0
        console.log("disX: "+disX)
        if(disX>=-3&&disX<=4){
            //点击的时候判断是什么状态此时是用户点击状态
            //这个状态是拒绝状态未显示的.如果要显示就要判断left是否为0.如果为0的话可以显示
            console.log("静止")
            if(list[this._getIndex(e)].hidden == false && list[this._getIndex(e)].left == 0){
                list[this._getIndex(e)].hidden = true
            }else if(list[this._getIndex(e)].hidden == true && list[this._getIndex(e)].left == 0){
               
                list[this._getIndex(e)].hidden = false
            }
        }else if (disX < 0) {  // 判断滑动方向， （向左滑动）
            // 滑动的距离大于删除宽度的一半就显示操作列表 否则不显示
            
            // //判断拒绝原因显示没有.如果没有显示.那么需求是阻止左滑...韩工提的必须这样
            // if(list[this._getIndex(e)].hidden == false){
            //     return
            // }
            //判断拒绝原因显示状态.如果显示的话得让他消失了.因为要左滑了....
            // if(list[this._getIndex(e)].hidden == true){
            //     list[this._getIndex(e)].hidden = false
            // }
            //下面是左滑操作
            Math.abs(disX) > width / 2 ? left = -width : left = 0
        }  else {  // 向右滑动复位
            left = 0
        }

        list[this._getIndex(e)].left = left
        return list
    }
}

export default Touches