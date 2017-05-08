/*
 * This module is made for visual design JavaScript
 * Dependencies - jQuery, Slick
 *
 */

module.exports = class Designers {

  onWindowResize(){
    const self = this;
    $(window).on("resize",function(){
      self.adaptLayout()
    })
  }

  adaptLayout() {
    if ($(window).innerWidth() > 600) {
      // $('section.step').addClass('wide');
    } else {
      $('section.step').removeClass('wide');
    }
  }

  onStepLoad(){
    $(".slick-container").hide();
    setTimeout(function(){
      $(".slick-container").show();
      $(".slick-container:not(.slick-initialized)").slick({
        dots: false,
        infinite: false,
        adaptiveHeight: true,
        centerPadding: '15px',
        slidesToShow: 1,
        arrows: true,
        variableWidth: true
      });
    })
    // Correcting the height of Versus divs
    if($(".versus").length===2){
      const mh1 = Math.max($(".versus .location").eq(0).height(),$(".versus .location").eq(1).height());
      $(".versus .location").css({"min-height":mh1});
      const mh2 = Math.max($(".versus").eq(0).height(),$(".versus").eq(1).height());
      $(".versus").height({"min-height":mh2})
    }
  }

  uniqueStepLayout(step){
    if (step.label == 'Party stories') {
      $('div.body').addClass('backColor');
    } else {
      $('div.body').removeClass('backColor');
    }
  }

}
