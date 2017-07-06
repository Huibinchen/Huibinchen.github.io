/**
 * Created by Administrator on 2017/6/28.
 */
function resetFontSize() {
    var windowW = document.documentElement.clientWidth;
    var scale = windowW / 320;
    var newSize = scale * 10;
    document.getElementsByTagName("html")[0].style.fontSize = newSize + "px";
}
window.addEventListener("resize",resetFontSize,false);
resetFontSize();

var as = document.querySelectorAll("nav>ul>a");
var lis = document.querySelectorAll("nav>ul>a>li");
as[0].firstElementChild.className = "navs-item navs-item-home active";
as[0].addEventListener("touchstart", function () {
    revser();
    this.firstElementChild.className = "navs-item navs-item-home active";
});
as[1].addEventListener("touchstart", function () {
    revser();
    this.firstElementChild.className = "navs-item navs-item-menu active";
});
as[2].addEventListener("touchstart",function () {
    revser();
    this.firstElementChild.className = "navs-item navs-item-cart active";
});
as[3].addEventListener("touchstart", function () {
    revser();
    this.firstElementChild.className = "navs-item navs-item-mine active";
});
function revser() {
    as[0].firstElementChild.className = "navs-item navs-item-home";
    as[1].firstElementChild.className = "navs-item navs-item-menu";
    as[2].firstElementChild.className = "navs-item navs-item-cart";
    as[3].firstElementChild.className = "navs-item navs-item-mine";
}

angular.module("myApp",["ngRoute"]).config(["$routeProvider",function ($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl:'./views/home.html',
            controller : 'HomeCtrl'
        })
        .when('/menu',{
            templateUrl:'./views/menu-2.html',
            controller : 'MenuCtrl'
        })
        .when('/car',{
            templateUrl:'./views/car.html'
            // controller : 'CarCtrl'
        })
        .when('/mine',{
            templateUrl:'./views/mine.html',
            controller : 'MineCtrl'
        })
        .when('/404',{
            templateUrl:'./views/404.html'
        })
        .otherwise({
            redirectTo:'/404'
        })

    }])
    .controller("HomeCtrl",['$scope','$http',function ($scope,$http) {
        $scope.slide = [];
        $scope.menu = [];
        $scope.product = [];
        $http.get("js/getApiHome.json").success(function (data){
            $scope.slide = data.data.slide.filter((item,index)=>index!=0&&index!=data.data.slide.length-1);
            $scope.menu = data.data.menu
            var imgNum = 0
            for (var i=0; i<$scope.slide.length; i++){

                var imgObj = new Image()
                imgObj.src = $scope.slide[i].activity.img
                imgObj.onload = function (){

                    imgNum++
                    if (imgNum == $scope.slide.length){
                        var mySwiper = new Swiper ('.swiper-container', {
                            loop: true,
                            autoplay:2000,
                            autoplayDisableOnInteraction:false,
                            // 如果需要分页器
                            pagination: '.swiper-pagination'
                        })
                    }
                }
            }
        })
        $http.get("js/getApiMiao.json").success(function (data){
            $scope.product = data.product.filter((item,index)=>index<=2);
        })
            // 获取热卖数据
        $scope.homehot = []
        $http.get("js/getApiHomeHot.json").success(function (data){
                $scope.homehot = data.data.slice(0,3)
        })
        $scope.yin = []
        $http.get("js/getApiHomeHot.json").success(function (data){
            $scope.yin = data.data.slice(4,7)
        })
        $scope.yes = []
        $http.get("js/getApiHomeHot.json").success(function (data){
            $scope.yes = data.data.slice(8,11)
        })
    }])



    .controller("MenuCtrl",['$scope','$http',function ($scope,$http) {
        // 用于存储所有分类数据
        $scope.categories = []

        // 存储所有的商品信息
        $scope.products = {}

        // 过滤的选项,可选为综合排序和分类排序
        $scope.filterItems = []

        // 综合排序,因为全部分类项返回的数据格式是对象，键为name，为了跟它统一
        $scope.rankings = [{name:'综合排序'},{name:"价格最低"},{name:"价格最高"}]

        // 全部分类
        $scope.allCategories = false
        // 综合排序
        $scope.ranking = false

        // 激活的分类id-> 初始为第一个
        $scope.activeCategoriesId = 0
        // 分类的商品数组
        $scope.categoriesItems = []

        $scope.key = "全部分类"
        $scope.orderObj ={
            // order排序的关键字
            order:'',
            // 升序还是降序
            orderBol: false
        }


        //点击全部分类
        $scope.changeCategorieBol = function (){
            $scope.ranking = false
            $scope.allCategories = !$scope.allCategories
            // 通过分类的id获取对应的cids也就是分类列表
            for (var i=0; i<$scope.categories.length; i++){
                if ($scope.categories[i].id == $scope.activeCategoriesId){
                    $scope.filterItems = $scope.categories[i].cids
                }
            }
        }
        //点击综合排序
        $scope.changeRankingBol = function (){
            $scope.allCategories = false
            $scope.ranking = !$scope.ranking
            $scope.filterItems = $scope.rankings
        }

        $scope.filterProduct = function (item) {
            if(allCategories){

            }
        }
        // 初始获取热销榜的数据
        function getData(){
            $http.get("js/getCategoryProduct.json").success(function (data){

                // 分类数据
                $scope.categories = data.data.categories

                // 初始化分类id
                $scope.activeCategoriesId = data.data.categories[0].id

                // 商品数据
                $scope.products = data.data.products
            })
        }
        getData()



        // 点击分类切换
        $scope.changeCategoriesIndex = function (id){
            $scope.activeCategoriesId = id

            // 将全部分类和综合排序隐藏掉
            $scope.allCategories = false
            $scope.ranking = false

            // 分类关键字->默认为“全部分类”
            $scope.key = "全部分类"
            $scope.orderObj = {
                // order排序的关键字
                order:'',
                // 升序还是降序
                orderBol: false
            }
        }
    }])



    // 当angular初始化完成会运行run
    .run(["$rootScope",function ($rootScope){
        $rootScope.navActiveIndex = 0
    }])
    .controller("MineCtrl",['$scope','$http',function ($scope,$http) {

    }])