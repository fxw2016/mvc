(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

	var todoApp = angular.module('todoApp',['ngRoute']);

	todoApp.controller('MainCtrl',['$scope','$location','$routeParams',function ($scope,$location,$routeParams) {


		//绑定输入框的信息
		$scope.text = "";

		//所有信息的列表数据
		$scope.todos = [
			{text:"相亲",completed:true,id:1},
			{text:"结婚",completed:false,id:2},
			{text:"生猴子",completed:false,id:3},
		];

		//添加数据
		$scope.addTodo = function (event) {
			//console.log(event);
			//alert(123);
			if($scope.text == 0) {return}

			//时间戳
			var id = new Date().getTime();
			$scope.todos.push({text:$scope.text,completed:false,id:id});

			//清空输入框
			$scope.text = '';
		}

		//删除数据
		$scope.removeTodo = function (index) {
			$scope.todos.splice(index,1);
		}

		//编辑状态
		$scope.editIndex = -10;   //确保跟$index 不重复
		$scope.editTodo = function (index) {
			$scope.editIndex = index;
		}

		//保存编辑的数据
		$scope.saveTodo = function (event) {

			//判断是否是回车  13
			if(event.keyCode == 13) {
				//编辑完成
				$scope.editIndex = -10;   //确保跟$index 不重复
			}
		}

		//获取未完成的条数
		$scope.leftCount = function () {
			var count = 0;

			for(var i=0;i<$scope.todos.length;i++) {
				if($scope.todos[i].completed != true) {
					count++;
				}
			}

			//是否全选
			/*
			if(count == 0) {
				//全选
				$scope.allChecked = true;
			}else {
				$scope.allChecked = false;
			}*/
			$scope.allChecked = !count;

			return count;
		}

		//点击按钮,全选的事件
		//var all = true;
		$scope.toggleAll = function () {
			for(var i=0;i<$scope.todos.length;i++) {
				$scope.todos[i].completed = !$scope.allChecked;
				//$scope.todos[i].completed = all;
			}

			//all = !all;
		}


		//是否显示山删除已完成事件的按钮
		$scope.exitCompleted = function () {
			for(var i=0;i<$scope.todos.length;i++) {
				if($scope.todos[i].completed) {
					return true;
				}
			}

			return false;
		}

		//删除已完成事件
		$scope.clearCompleted = function () {
			var temp = [];

			for(var i=0;i<$scope.todos.length;i++) {
				if(!$scope.todos[i].completed) {
					//拿到所有未完成的事件
					temp.push($scope.todos[i]);
				}
			}

			$scope.todos = temp;

		}

		//切换状态

		//第一种方式
		// $scope.all = function () {
		// 	$scope.search = '';
		// }
		// $scope.active = function () {
		// 	$scope.search = {completed:false};
		// }
		// $scope.completed = function () {
		// 	$scope.search = {completed:true};
		// }


		//console.log($location.$$path);
		//console.log($location.path());   //getter
		//console.log($location.path('1243'));   //setter
		//第二种方式
		// $scope.location = $location;
		// $scope.$watch('location.path()',function () {
        //
		// 	//alert('ee');
		// 	switch($location.path()) {
		// 		case '/active':
		// 			$scope.search = {completed:false};
		// 			break;
		// 		case '/completed':
		// 			$scope.search = {completed:true};
		// 			break;
		// 		default:
		// 			$scope.search = '';
		// 			break;
		// 	}
		// });

		//第三种方式(路由)
		//$routeParams
		//console.log($routeParams.status);
		$scope.status = $routeParams.status || '';

		switch ($routeParams.status) {
			case 'active':
				$scope.search = {completed:false};
				break;
			case 'completed':
				$scope.search = {completed:true};
				break;
			default:
				$scope.search = '';
				break;
		}

		console.log("我是控制器");


	}]);

	todoApp.config(['$routeProvider',function ($routeProvider) {
		$routeProvider.
		when('/',{
			templateUrl:'todo.html',
			controller:'MainCtrl'
		}).when('/:status',{
			templateUrl:'todo.html',
			controller:'MainCtrl'
		});

	}]);

})(window);
