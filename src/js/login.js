//登录
// 1.检查用户名（邮箱，手机号码,小米ID）是否符合要求()
// 邮箱以数字或字母开头，中间可以是字母下划线+@数字或字母+.+字母 
$('.inpusername').change(function(){
    var inpusername = this.value 
     var reg1 = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+.([a-zA-Z]{2,4})$/ //邮箱
      var reg1 = /^([1])([0-9]){10}$/ //手机号码
    if(!reg1.test(inpusername)){
        $(".erroInfo").text("手机号或邮箱格式错误!")
    }else{
        $(".erroInfo").text("")
    }
 })
//  2.检查密码输入是否正确(6位数字或字母)
  $('.inppassword').change(function(){
    var inppassword = this.value 
    var reg2 = /([a-zA-Z0-9]){6}$/
    if(!reg2.test(inppassword)){
        $(".erroInfo").text("请输入6位数密码!")
    }else{
        $(".erroInfo").text("")
    }
 })
//  3.点击登录按钮提示内容不能为空
 $(".inpsubmit").click(function(){
    //用户名密码非空判断
    if($(".inpusername").val().lenght==0 || $(".inppassword").val().length==0) {
        $(".erroInfo").text("用户名密码不能为空！");
    }
    });
//点击inpsubmit 向后端发送一个带参数post 请求
 $('.inpsubmit').onclick(function(){
//创建ajax对象
var xhr = new XMLHttpRequest()

//  配置本次请求的信息
xhr.open('POST', './dd')

//  接受响应
xhr.onload = function () {
    console.log(xhr.responseText)
  var res = JSON.parse(xhr.responseText)
 
  if (res.code === 0) {
    // 提示错误
    $(".erroInfo").text("用户名或密码错误！")
  } else {
    window.location.href = './index.html'
  }

}

// 4-4. 设置请求头
xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

// 4-5. 发送请求
//      在 () 里面携带参数
// xhr.send('username=' + uname + '&password=' + upass)
xhr.send(`username=${inpusername}&password=${inppassword}`)
})


