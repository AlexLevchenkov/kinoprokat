$(document).ready(function(){
  let timerLang
  let timerSwitch
  var audio = new Audio('wham-last-christmas.mp3');
  $("#error").click(function(){
    let button = $(".main_menu img")
    if ($("body").hasClass("error")) {
      $.each(button, function(i, value) {
        let temp = $(value).attr("src")
        temp=temp.replace("gif","png")
        $(value).attr("src", temp)
        $("body").removeClass("error")
      })
      $(".snow").css("display", "none")
      clearInterval(timerLang)
      clearInterval(timerSwitch)
      clearInterval(timerAudio)
      audio.pause()
    }else{
      $.each(button, function(i, value) {
        let temp = $(value).attr("src")
        temp=temp.replace("png","gif")
        $(value).attr("src", temp)
        $("body").addClass("error")
      })
      $(".snow").css("display", "block")
      let rand = 0
      timerLang = setInterval(()=> {
        if (rand<1) {
          let title = $(".main_menu h2")
          $.each(title, function(i, value){
            $(value).addClass("off")
            $(title).filter(`#ua`).removeClass("off")
          })
          let lang = $(".language_option")
          $.each(lang, function(i, value){
            $(value).removeClass("selected")
            $(lang).filter(`#ua`).addClass("selected")
          })
          rand++
        }else if (rand<2){
          let title = $(".main_menu h2")
          $.each(title, function(i, value){
            $(value).addClass("off")
            $(title).filter(`#ru`).removeClass("off")
          })
          let lang = $(".language_option")
          $.each(lang, function(i, value){
            $(value).removeClass("selected")
            $(lang).filter(`#ru`).addClass("selected")
          })
          rand++
        }else{
          let title = $(".main_menu h2")
          $.each(title, function(i, value){
            $(value).addClass("off")
            $(title).filter(`#en`).removeClass("off")
          })
          let lang = $(".language_option")
          $.each(lang, function(i, value){
            $(value).removeClass("selected")
            $(lang).filter(`#en`).addClass("selected")
          })
          rand=0
        }
      },500)
      timerSwitch = setInterval(()=>{
        $("#switcher").click()
      },3000)
      timerAudio = setInterval(()=>{
        audio.play()
      },1000)
    }
  })
});