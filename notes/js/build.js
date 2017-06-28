var myApp = angular.module("myApp",[]);
myApp.controller('myCtrl',['$scope',function ($scope) {
    // 存储所有的笔记
    $scope.notes = [];

    // 表示激活的笔记
    $scope.activeNote = {};

    // 标明现在是显示所有的还是收藏的列表
    // true显示所有,false->显示收藏的列表
    $scope.allBol = true

    //添加笔记
    $scope.add = function () {
        var obj = {
            text :  'New note',
            done : false
        }
        $scope.notes.push(obj);
        $scope.activeNote = obj;
    }
    //编辑笔记
    $scope.changeAdd = function (item) {
        $scope.activeNote = item
    }
    // 删除笔记 （通过获取激活的笔记的下标）
    $scope.del = function (){
        // 获取激活下标
        var activeIndex = $scope.notes.indexOf($scope.activeNote);
        $scope.notes.splice(activeIndex,1);
        $scope.activeNote = $scope.notes[0];
    }
    //切换收藏
    $scope.changeBol = function () {
        $scope.activeNote.done = ! $scope.activeNote.done
    }
    //过滤
    $scope.myFilter = function (obj) {
        if($scope.allBol){
            return true
        }else{
            return obj.done
        }
    }
}]);