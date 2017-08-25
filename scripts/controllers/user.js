(function(){
   'use strict';
   angular.module('app.home')
     .controller('UserController',['$scope','$window','userService',function($scope,$window,userService){
    //从服务器得到数据
    $scope.loginname='';
      $scope.password='';
      $scope.status='';

      var url = "http://192.168.0.100/hrm/user/list";
      var params={
        pageIndex:1,
        offset:50
      }
      var promise=userService.getList(url,params);
      promise.then(function(res){
        $scope.users=res.data.users;
      },function(res){})

    //删除
     $scope.deleteUser=function(e){
      var url="http://192.168.0.100/hrm/user/delete";
      var params = {
       id:e
      }
      var promise=userService.getList(url,params);
      promise.then(function(res){
        if(res.data.status=="ok"){
      var url = "http://192.168.0.100/hrm/user/list";
      var params={
        pageIndex:1,
        offset:50
      }
      var promise=userService.getList(url,params);
      promise.then(function(res){
        $scope.users=res.data.users;
      },function(res){})
        }
      },function(res){

      })


  }
    //  //修改
     $scope.edit=function(id,loginname,password,status){
      return $scope.datas={id:id,loginname:loginname,password:password,status:status}
     }       
     // 保存修改
     $scope.saveEdit=function(){
      var url="http://192.168.0.100/hrm/user/edit";
      var params = {
       id:$scope.datas.id,
       loginname:$scope.datas.loginname,
       password:$scope.datas.password,
       status:$scope.datas.status
      }
      var promise=userService.getList(url,params);
      promise.then(function(res){
        if(res.data.status=="ok"){
      var url = "http://192.168.0.100/hrm/user/list";
      var params={
        pageIndex:1,
        offset:50
      }
      var promise=userService.getList(url,params);
      promise.then(function(res){
        $scope.users=res.data.users;
      },function(res){})
        }
      },function(res){

      })
     $scope.id='';
     $scope.loginname='';
     $scope.password='';
     $scope.status='';

  }
  //添加
      $scope.add=function(){
          console.log(url)
          var url = "http://192.168.0.100/hrm/user/save";
          var params={
              id:$scope.datas.id,
              loginname:$scope.datas.loginname,
              password:$scope.datas.password,
              status:$scope.datas.status
            }
          var promise=userService.getList(url,params);
          promise.then(function(res){
            if(res.data.status=="ok"){
              var url = "http://192.168.0.100/hrm/user/list";
              var params={
                pageIndex:1,
                offset:50
              }
              var promise=userService.getList(url,params);
              promise.then(function(res){
                $scope.users=res.data.users;
              },function(res){})
            }
          },function(res){

        })

      }

       var url = "http://192.168.0.100/hrm/user/list";
       $scope.pageIndex=1;
       $scope.offset=10;
       var params={
                pageIndex:$scope.pageIndex,
                offset:$scope.offset
              }
        var promise=userService.getList(url,params);
              promise.then(function(res){
                $scope.users=res.data.users;
                $scope.totalPage=Math.ceil(res.data.total/$scope.offset);
              },function(res){})
       $scope.handlePage=function(pageNum){
        $scope.pageIndex=$scope.pageIndex+pageNum;
        if($scope.pageIndex<1){
          $scope.pageIndex=1;
        }
        if($scope.pageIndex>$scope.totalPage){
          $scope.pageIndex=$scope.totalPage;
        } 
      var params={
                pageIndex:$scope.pageIndex,
                offset:$scope.offset
              }
        var promise=userService.getList(url,params);
              promise.then(function(res){
                $scope.users=res.data.users;
              },function(res){
            })
          }
      //分页
      //  $scope.lastPage=function(){
      //         var url = "http://192.168.0.100/hrm/user/list";
      //         var params={
      //           pageIndex:1,
      //           offset:8
      //         }
      //         var promise=userService.getList(url,params);
      //         promise.then(function(res){
      //           $scope.users=res.data.users;
      //         },function(res){})

      // } 
      // $scope.nextPage=function(){
      //         var url = "http://192.168.0.100/hrm/user/list";
      //         var params={
      //           pageIndex:1,
      //           offset:5
      //         }
      //         var promise=userService.getList(url,params);
      //         promise.then(function(res){
      //           $scope.users=res.data.users;
      //         },function(res){})

      // }
      //查找
      $scope.search=function(){
          var url = "http://192.168.0.100/hrm/user/getById";
          var params={
              id:$scope.id, 
            }
            console.log(params)
             var promise=userService.getList(url,params);
              promise.then(function(res){
                $scope.users=[res.data.user];
              },function(res){})
            }
        
  }])
})()