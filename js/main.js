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

  //Фильтр таблицы
  $(".table_clear").click(function () {
    clearFilterTable($(this).parents('table'));
  })
  
  $('.table-filters select.main').on('input', function () {
    filterTable($(this).parents('table'));
  });
  $('.table-filters select.year').on('input', function () {
    filterYearTable($(this).parents('table'));
  });

  function clearFilterTable($table){
    var $filters = $table.find('.table-filters td');
    var $rows = $table.find('.table-row');
    $filters.find('select').val("");
    $rows.each(function () {$(this).css('display', '')});
  }

  function filterTable($table) {
    var $filters = $table.find('.table-filters td');
    var $rows = $table.find('.table-row');
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
      } else {
        $(this).css('display', 'none');
      }
    });
  }
  function filterYearTable($table) {
    var $filters = $table.find('.table-filters td');
    var $rows = $table.find('.table-row');
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
      } else {
        $(this).css('display', 'none');
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

  //Переключатель версий ccs для оборудования
  $(".controler button").click(function() {
    let version = $(this).attr("id")
    $("body").removeClass("v_2").removeClass("v_3")
    $("body").addClass(version)
  })
});