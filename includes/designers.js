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
      $('section.step').addClass('wide');
    } else {
      $('section.step').removeClass('wide');
    }
  }

  onStepLoad(){
    $(".slick-container:not(.slick-initialized)").slick({
      dots: false,
      infinite: false,
      adaptiveHeight: true,
      centerPadding: '15px',
      slidesToShow: 1,
      arrows: true,
      variableWidth: true
    });
  }

}
