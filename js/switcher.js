$(document).ready(function(){
  // Смена светлого и тёмного интерфейса
  $("#switcher").click(function(){
    const mode = $("body").hasClass("light")
    let header_img = $(".header object")
    let footer_img = $(".footer button")
    if (mode) {
      $.each(header_img, function(i, value) {
        let temp = $(value).attr("data")
        temp=temp.replace("light","dark")
        $(value).attr("data", temp)
      })
      $("#switcher img").attr("src",$("#switcher img").attr("src").replace("light","dark"))
      $(".logo img").attr("src",$(".logo img").attr("src").replace("light","dark"))
      $(".language img").attr("src",$(".language img").attr("src").replace("light","dark"))
      $(".language_option").addClass("dark")
      $.each(footer_img, function(i, value) {
        $(value).addClass("social_svg_dark")
      })
      $("body").addClass("dark").removeClass("light")
      localStorage.setItem("user-theme", "dark")
    }else{
      $.each(header_img, function(i, value) {
        let temp = $(value).attr("data")
        temp=temp.replace("dark","light")
        $(value).attr("data", temp)
      })
      $("#switcher img").attr("src",$("#switcher img").attr("src").replace("dark","light"))
      $(".logo img").attr("src",$(".logo img").attr("src").replace("dark","light"))
      $(".language img").attr("src",$(".language img").attr("src").replace("dark","light"))
      $(".language_option").removeClass("dark")
      $.each(footer_img, function(i, value) {
        $(value).removeClass("social_svg_dark")
      })
      $("body").addClass("light").removeClass("dark")
      localStorage.setItem("user-theme", "light")
    }
  })
  const saveUserTheme=localStorage.getItem('user-theme')
  let userTheam
  if(window.matchMedia){
    userTheam = window.matchMedia('(prefers-color-scheme: dark)').matches? 'dark' : 'light'
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{
    !saveUserTheme ? change() :null
  })
  function setThemeClass(){
    if(saveUserTheme){
      $('body').addClass(saveUserTheme)
    }else{
      $('body').addClass(userTheam)
    }
  }
  setThemeClass()
  if ($("body").hasClass("dark")) {
    $("#switcher").click()
    $("#switcher").click()
  }
  // Смена языка
  if ($(window).width()>768) {
    $(".language_option").click(function(){
      let leng = $(this).attr("id")
      let title = $(".name")
      $.each(title, function(i, value){
        $(value).addClass("off")
        $(title).filter(`#${leng}`).removeClass("off")
      })
      $(".language_option").removeClass("selected")
      $(this).addClass("selected")
    })
  } else {
    $(".language_option").click(function(){
      if ($('body').hasClass("main")) {
        let leng = $(this).attr("id")
        let title = $(".name")
        $.each(title, function(i, value){
          $(value).addClass("off")
          $(title).filter(`#${leng}`).removeClass("off")
        })
        $(".language_option").removeClass("selected")
        $(this).addClass("selected")
      }else{
        if ($(".language").hasClass("open")) {
          let leng = $(this).attr("id")
          let title = $(".name")
          $.each(title, function(i, value){
            $(value).addClass("off")
            $(title).filter(`#${leng}`).removeClass("off")
          })
          $(".language_option").removeClass("selected")
          $(this).addClass("selected")
          $(".language").removeClass("open")
        }else{
          $(".language").addClass("open")
        }
      }
    })
  }
  $("#ua").click();
  $("#ua").click();
});