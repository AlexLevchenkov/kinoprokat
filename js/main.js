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
});