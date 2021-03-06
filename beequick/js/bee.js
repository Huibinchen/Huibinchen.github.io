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
            templateUrl:'./views/menu.html',
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
        $http.get("http://h5.yztctech.net/api/axf/apihome.php").success(function (data){
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
        $http.get("http://h5.yztctech.net/api/axf/apimiaosha.php").success(function (data){
            $scope.product = data.product.filter((item,index)=>index<=2);
        })
            // 获取热卖数据
        $scope.homehot = []
        $http.get("http://h5.yztctech.net/api/axf/apihomehot.php").success(function (data){
                $scope.homehot = data.data.slice(0,3)
        })
        $scope.yin = []
        $http.get("http://h5.yztctech.net/api/axf/apihomehot.php").success(function (data){
            $scope.yin = data.data.slice(4,7)
        })
        $scope.yes = []
        $http.get("http://h5.yztctech.net/api/axf/apihomehot.php").success(function (data){
            $scope.yes = data.data.slice(8,11)
        })
    }])
    .controller("MenuCtrl",['$scope','$http',function ($scope,$http) {
        $scope.allCategories = false
        $scope.ranking = false

        $scope.changeCategorieBol = function (){
            $scope.ranking = false
            $scope.allCategories = !$scope.allCategories
        }
        $scope.changeRankingBol = function (){
            $scope.allCategories = false
            $scope.ranking = !$scope.ranking
        }

        $scope.btnList = ["天天特价","优选水果","热销榜","牛奶面包"]
        // 激活的分类下标
        $scope.activeCategoriesIndex = 0
        $scope.categoriesItems = [];
        function getData() {
            var url = "http://h5.yztctech.net/api/axf/apicategory.php?category="+$scope.btnList[$scope.activeCategoriesIndex]

            $http.get(url).success(function (data){
                var data = data.data
                $scope.categoriesItems = data
            })
        }
        getData()
        $scope.changeCategoriesIndex = function (index){
            $scope.activeCategoriesIndex = index

            getData()
        }

    }])
    // 当angular初始化完成会运行run
    .run(["$rootScope",function ($rootScope){
        $rootScope.navActiveIndex = 0
    }])
    .controller("MineCtrl",['$scope','$http',function ($scope,$http) {

    }])