// //渲染 head-nav 下的菜单
getList()
    function getList() {
      $.ajax({
        url: '../lib/nav_top.json',
        dataType: 'json',
        success: function (res) {
          console.log(res)

        //   准备一个空字符串
          let str = ''

          //  渲染一级的 li
          res.forEach(item => {
            str += `<li>${ item.name }</li>`
          })

          //  填充到 head-nav 里面的 ul 里面
          $('.head-nav> ul')
            .html(str)
            .on({
              mouseenter: () => $('.head-bottom').stop().slideDown(),
              mouseleave: () => $('.head-bottom').stop().slideUp()
            })
            .children('li') // 找到所有的一级菜单下的 li
            .on('mouseover', function () {
              // 知道自己移入的时哪一个 li
              const index = $(this).index()
              //  找到要渲染的数组
              const list = res[index].list
              //  用我们找到的数组把 head-bottom-con 位置渲染了就可以了
              let str = ''

              // 进行组装
              list.forEach(item => {
                str += `
                  <li>
                    <div>
                      <img src="${ item.list_url }" alt="">
                    </div>
                    <p class="title">${ item.list_name }</p>
                    <span class="price">${ item.list_price }</span>
                  </li>
                `
              })

              //  填充到页面里面
              $('.head-bottom-con > ul').html(str)
            })

          // 4-4. 给 nav_box 添加一个移入移出事件
          $('.head-bottom')
            .on({
              mouseover: function () { $(this).finish().show() },
              mouseout: function () { $(this).finish().slideUp() }
            })
        }
      })
    }

 //渲染 banner-center 下的菜单
 bannerList()
 function  bannerList() {
   $.ajax({
     url: '../lib/banner-center.json',
     dataType: 'json',
     success: function (res) {
       console.log(res)

     //   准备一个空字符串
       let str = ''

       //  渲染一级的 li
       res.forEach(item => {
         str += `<li>${ item.name }</li>`
       })

       //  填充到 head-nav 里面的 ul 里面
       $('.banner-center> ul')
         .html(str)
         .on({
           mouseenter: () => $('.banner-list').stop().slideDown(),
           mouseleave: () => $('.banner-list').stop().slideUp()
         })
         .children('li') // 找到所有的一级菜单下的 li
         .on('mouseover', function () {
           // 知道自己移入的时哪一个 li
           const index = $(this).index()
           //  找到要渲染的数组
           const list = res[index].list
           //  用我们找到的数组把 head-bottom-con 位置渲染了就可以了
           let str = ''

           // 进行组装
           list.forEach(item => {
             str += `
             <li>
             <img src="${item.list_url}" alt=""> 
             <span >${item.list_name}</span></li>
             `
           })

           //  填充到页面里面
           $('.banner-list > ul').html(str)
         })

       // 4-4. 给 nav_box 添加一个移入移出事件
       $('.banner-list')
         .on({
           mouseover: function () { $(this).finish().show() },
           mouseout: function () { $(this).finish().slideUp() }
         })
     }
   })
 } 
// banner的轮播图
 var mySwiper = new Swiper ('.swiper-container', {
  loop: true, // 循环模式选项
  autoplay:{
    delay:5000
  },
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },
  
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  

})        