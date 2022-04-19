$(document).ready(function() {
  $(".project_slider_img").each(function(){
    let img_pull =$(this).children()
    let dots_pull=$(this).next().children()
    img_pull.each(function(i,item){
      if (i==0){
        $(this).parent().append($(this).clone())
      }
      if (i==img_pull.length-1){
        $(this).parent().prepend($(this).clone())
      }
    })
    for (let i = 1; i < img_pull.length; i++) {
      dots_pull.append($("<div class='project_slider_controler_dot'></div>").clone())
    }
    console.log("\n");
  })
})