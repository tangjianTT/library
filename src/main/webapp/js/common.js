$(function(){
	console.log($('.nav .ac').val())
    $('.nav li').on('click', function() {
        $(this).addClass('ac').siblings().removeClass('ac');
    })

    $('.main-nav li').on('click', function() {
        $(this).addClass('ac').siblings().removeClass('ac')
        console.log($(this).attr("data"));
    })
    
    $('.theme-popover input').focus(function(){
    	$(this).css('border', '1px solid #007fff');
    })

    $('.theme-popover input').blur(function(){
    	$(this).css('border', '');
    })
   
    $(".search-input").keydown(function(event) {  
        if (event.keyCode == 13) { 
           alert($('.search-input').val())
         }  
    })

   $('.search-logo-img').click(function(){
   		alert($('.search-input').val())
   })
})