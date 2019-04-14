$(document).ready(function () {
    var index = 0;
    var lens = $('.swiper-slide').length;
    if (localStorage.getItem("localIndex")) {
        index = localStorage.getItem("localIndex"); /* 读取保存在localStorage对象里名为 localIndex 的变量的值 赋值给index */
        localStorage.removeItem("localIndex"); /* 删除 保存在localStorage对象里的变量 localIndex */
    }
    // console.log(typeof index);
    index = parseInt(index);
    // console.log(typeof index);
    // console.log(index);
    var swiper = new Swiper('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        direction: "horizontal",/*横向滑动*/
        loop: true, // 循环模式选项
        mousewheelControl : true,

        // 如果需要分页器
        // pagination: { el: '.swiper-pagination', },
        //分页器点击跳转
        // slidesPerView: 'auto',
        // centeredSlides: true,
        // paginationClickable: true,
        // paginationBulletRender: function (swiper, index, className) {
        //     return '<span class="spanSame span' + (index + 1) + '">' + (index + 1) + '</span>';
        // },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        initialSlide: index, // 设定初始化时slide的索引

    })
    // swiper.slideTo(index);
    // $(".swiper-pagination").on("click", "span", function () {
    //     var index = $(this).index();
    //     swiper.slideTo(index);
    //     console.log(index);
    // })
})

function turnenroll() {
    window.location.href = "enroll.html";
}
function turnintro() {
    window.location.href = "briefintroduction.html";
}