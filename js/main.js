/**
 * JS related to Chi's homepage.
 */


// Viewport width and height in pixels.
var viewportWidth;
var viewportHeight;

var horizontalScroll;
var verticalScroll;

/**
 * Size full-width images throughout the page.
 */
function sizeFullImages() {
  // Leave 20px on either side of image. And 5px of border on either side.
  var maxImageWidth = Math.min(700, viewportWidth - 50);
  var fullImages = document.getElementsByClassName('fullImage');
  for (var i = 0; i < fullImages.length; i++) {
    var width = parseInt(fullImages[i].getAttribute('width'));
    var height = parseInt(fullImages[i].getAttribute('height'));
    var aspectRatio = width / height;
    if (width > maxImageWidth) {
      width = maxImageWidth;
      fullImages[i].style.width = '' + width + 'px';
      fullImages[i].style.height = '' + Math.round(width / aspectRatio) + 'px';
    }
  }
}


function setTopBackgroundHeight() {
  document.getElementById('topBackground').style.height =
      '' + viewportHeight + 'px';
  // Push other content down appropriately.
  document.getElementById('main').style.marginTop =
      '' + (viewportHeight + 20) + 'px';
}


function makeTopBackgroundSemiTransparent() {
  // Make the top bg image more transparent as user scrolls down.
  var topBackgroundElement = document.getElementById('topBackground');
  // If we scrolled down enough, start to make the top bg image transparent.
  var opacity;
  if (verticalScroll > 20) {
    // Exponentially decay in opacity.
    opacity = Math.exp(
        -Math.min(
            1,
            verticalScroll * 1.618 / topBackgroundElement.offsetHeight));
  } else {
    opacity = 1;
  }
  topBackgroundElement.style.opacity = opacity;
}


function shiftHeroByScroll() {
  // Shift the hero (with profile pic + links) down as user scrolls.
  var topBackgroundElement = document.getElementById('topBackground');
  var heroElement = document.getElementById('hero');
  var percentBottom = 50;
  if (verticalScroll > 20) {
    // Move the hero down anywhere from 0 to 30 %. Don't go all the way.
    percentBottom -=
        Math.min(1, verticalScroll / topBackgroundElement.offsetHeight) * 30;
  }
  heroElement.style.bottom = '' + percentBottom + '%';
}


function handleResize() {
  viewportWidth = document.documentElement.clientWidth;
  viewportHeight = document.documentElement.clientHeight;
  sizeFullImages();
  setTopBackgroundHeight();
}


function handleScroll() {
  horizontalScroll =
      (window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0);
  verticalScroll =
      (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0);
  makeTopBackgroundSemiTransparent();
  shiftHeroByScroll();
}


// Initialize.
handleResize();
window.addEventListener('resize', handleResize, false);

handleScroll();
window.addEventListener('scroll', handleScroll, false);
