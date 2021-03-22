/**
 * Lazy loading images
 * https://dev.to/ekafyi/lazy-loading-images-with-vanilla-javascript-2fbj
 */
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  console.log(lazyImages  )
  if (!"IntersectionObserver" in window) {

    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
    
        entries.forEach(function(entry) {
      
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
    });
  
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

console.log('client running')