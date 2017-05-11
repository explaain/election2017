module.exports = function(trackEvent){
  return function() {

    // STUDENTS scope (postcode-compare)

    // Postcodes inputs
    $(".postcode-compare [name=postcode]:not(.tracked)").eq(0).on("keydown",function(){
      if(!$(this).hasClass('typed')){
        $(this).addClass("typed");
        trackEvent("Home Postcode Typed",{type: "Student"})
      }
    })
    $(".postcode-compare [name=postcode]:not(.tracked)").eq(1).on("keydown",function(){
      if(!$(this).hasClass('typed')){
        $(this).addClass("typed");
        trackEvent("Uni Postcode Typed",{type: "Student"})
      }
    })
    $(".postcode-compare [name=postcode]").addClass("tracked");

    // Submitting Postcodes
    $(".postcode-compare .postcode-form:not(.tracked)").on("submit",function(){
      trackEvent("Postcodes Submitted",{type: "Student"});
    })
    $(".postcode-compare .postcode-form").addClass("tracked");

    // Learn more
    $(".postcode-compare .learn-more button:not(.tracked)").on("mouseup touchend",function(){
      trackEvent("Learn More Clicked",{type: "Student"});
    })
    $(".postcode-compare .learn-more button").addClass("tracked");

    // Register
    $(".postcode-compare .register button:not(.tracked)").on("click",function(){
      trackEvent("Register Clicked",{type: "Student"});
    })
    $(".postcode-compare .register button").addClass("tracked");

    // Facebook Share
    $(".postcode-compare .btn-facebook:not(.tracked)").on("click",function(){
      trackEvent("Facebook Share Clicked",{type: "Student"});
    })
    $(".postcode-compare .btn-facebook").addClass("tracked");

    // Twitter Share
    $(".postcode-compare .btn-twitter:not(.tracked)").on("click",function(){
      trackEvent("Twitter Share Clicked",{type: "Student"});
    })
    $(".postcode-compare .btn-twitter").addClass("tracked");


    // GLOBAL scope

    // Explaain links
    $("a.explaain-link:not(.tracked),a.internal:not(.tracked)").on("mouseup touchend",function(){
      trackEvent("Explaain Link Clicked",{type: "Student", link: $(this).attr("href")});
    })
    $("a.explaain-link:not(.tracked),a.internal:not(.tracked)").addClass("tracked");

  }
}
