$(document).ready(function(){
  let wind_width = $(window).width()
  let wind_height = $(window).height()
  if (wind_width>wind_height) {
    $("body").addClass("horizontal")
  } else {
    $("body").addClass("vertical")
    let li = $(".footer li:nth-child(4)")
    $(li).after($(".switcher"))
  }
  $(".submenu_opener").click(function(){
    if ($(this).parent().hasClass("submenu_closed")) {
      $(this).parent().removeClass("submenu_closed").addClass("submenu_open")
    } else {
      $(this).parent().removeClass("submenu_open").addClass("submenu_closed")
    }
  })
  $(".burger").click(function(){
    $(".mobile_menu_block").addClass("open")
    $("body").addClass("mobile_menu_open")
  })
  $("#mob_top_close").click(function(){
    $(".mobile_menu_block").removeClass("open")
    $("body").removeClass("mobile_menu_open")
  })
  //Таблица
  // Открытие под-таблицы 
  $(".sub-table-opener").click(function() {
    if (!$(this).parent().hasClass("open")) {
      $(this).parent().addClass("open")
      $(this).parent().next().addClass("open")
    }else{
      $(this).parent().removeClass("open")
      $(this).parent().next().removeClass("open")
    }
  })
  // Фильтр таблицы
  $("#clear").click(function () {
    clearFilterTable($(this).parents('table'));
  })
  $('select.main').on('input', function () {
    filterTable($(this).parents('table'));
  });
  $('select.year').on('input', function () {
    filterYearTable($(this).parents('table'));
  });
  function clearFilterTable($table){
    var $filters = $table.find('th');
    var $rows = $table.find('thead~tbody>tr');
    $filters.find('select').val("");
    $rows.each(function () {$(this).css('display', '')});
  }
  function filterTable($table) {
    var $filters = $table.find('th');
    var $rows = $table.find('thead~tbody>tr:not(.sub-table)');
    $rows.each(function (rowIndex) {
      var valid = false;
      $(this).find('td').each(function (colIndex) {
        if ($filters.eq(colIndex).find('select').val()) {
          if ($(this).html().toLowerCase() == $filters.eq(colIndex).find('select').val().toLowerCase()) {
            valid = true;
          }
        }
      });
      if (valid === true) {
        $(this).css('display', '');
        $(this).next().css('display', '');
      } else {
        $(this).css('display', 'none');
        $(this).next().css('display', 'none');
      }
    });
  }
  function filterYearTable($table) {
    var $filters = $table.find('th');
    var $rows = $table.find('thead~tbody>tr:not(.sub-table)');
    $rows.each(function (rowIndex) {
      var valid = true;
      $(this).find('td').each(function (colIndex) {
        if ($filters.eq(colIndex).find('select').val()) {
          if ($(this).html().toLowerCase().indexOf(
          $filters.eq(colIndex).find('select').val().toLowerCase()) == -1) {
            valid = valid && false;
          }
        }
      });
      if (valid === true) {
        $(this).css('display', '');
        $(this).next().css('display', '');
      } else {
        $(this).css('display', 'none');
        $(this).next().css('display', 'none');
      }
    });
  }
  // Сокрытие хедера на мольной версии
  if (wind_width<700) {
    let lastScroll = 0;
    const defaultOffset = 50;
    const header = document.querySelector('.header');

    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTo
    const containHide = () => header.classList.contains('hide');

    window.addEventListener('scroll', () => {
      if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        header.classList.add('hide');
      } else if (scrollPosition() < lastScroll && containHide()){
        header.classList.remove('hide');
      }
      lastScroll = scrollPosition();
    })
  }
  // Переключение в оборудовании
  $(".info-block__menu-item").click(function() {
    if($(window).width()>768){
      let menu_item = $(this).attr("id")
      let title = $(".info-block__text-item")
      $.each(title, function(i, value){
        $(value).removeClass("selected")
        $(title).filter(`.${menu_item}`).addClass("selected")
      })
      $(".info-block__menu-item").removeClass("selected")
      $(this).addClass("selected")
    }else{
      let menu_item = $(this).attr("id")
      let title = $(".info-block__text-item")
      $.each(title, function(i, value){
        $(value).removeClass("open")
        $(title).filter(`.${menu_item}`).addClass("open")
      })
      if ($(this).hasClass("open")) {
        $(".info-block__menu-item").removeClass("open")
        $.each(title, function(i, value){
          $(value).removeClass("open")
        })
      }else{
        $(".info-block__menu-item").removeClass("open")
        $(this).addClass("open")
      }
    }
  })
  $(".description-block__title").click(function() {
    if (!$(this).hasClass("link")) {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open")
      }else{
        $(this).addClass("open")
      }
    }
  })
  // Переключение залов в проектах
  $(".list-halls button").click(function() {
    let id = $(this).attr("id")
    if (!$(this).hasClass("open")) {
      $(".list-halls button").removeClass("open")
      $(".hall").removeClass("open")
      $(this).addClass("open")
      $(".hall").each(function() {
        if ($(this).hasClass(id)) {
          $(this).addClass("open")
        }
      })
    }
  })
  $(".left .description").click(function(){
    if (!$(this).hasClass("open")) {
      $(this).addClass("open")
      $(this).next().addClass("open")
    }else{
      $(this).removeClass("open")
      $(this).next().removeClass("open")
    }
  })
  //Новости
  $('.news-block__name').click(function(){
    if ($(this).hasClass('left')) {
      $('.info__left').css('display','block')
      $('.info__right').css('display','none')

      $('.info__center .left').css('display','block')
      $('.info__center .right').css('display','none')

      $('.table__characteristics td:first-child').css('display','table-cell')
      $('.table__characteristics td:last-child').css('display','none')
      
      $('.news-block__name.right').addClass('open')
      $('.news-block__name.left').removeClass('open')
    }
    else{
      $('.info__left').css('display','none')
      $('.info__right').css('display','block')

      $('.info__center .left').css('display','none')
      $('.info__center .right').css('display','block')

      $('.table__characteristics td:first-child').css('display','none')
      $('.table__characteristics td:last-child').css('display','table-cell')

      $('.news-block__name.right').removeClass('open')
      $('.news-block__name.left').addClass('open')
    }
  })
  if($(window).width()<768){
    $('.news-block__name.left').click()
  }
  //Размещение "Похожие товары"
  if($(".product-block__similar-item").length){
    setTimeout(function(){
      let img_block__slider = $(".img-block__slider").height();
      let main_advantages = $(".main-advantages").height() || 0;
      console.log(img_block__slider);
      console.log(main_advantages);
      $(".product-block__similar-item").css(`top`,`${img_block__slider + main_advantages + 220}px`);
    },50)
  }
});