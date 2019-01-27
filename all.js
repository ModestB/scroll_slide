let scrollTimeOut = true;

function scrollSlide (scrollContainer, scrollItem) {
  const scrollContainerEle = document.querySelector(scrollContainer);
 
  return (function () {
    let eventType;
    let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    let isIe = /MSIE|Trident/.test(window.navigator.userAgent);
    if (isFirefox) {
      eventType = 'DOMMouseScroll';
    } else if (isIe) {
      eventType = 'mousewheel';
    } else {
      eventType = 'wheel';
    }
    scrollContainerEle.addEventListener(eventType, function (event) {
      let scrollTop = scrollContainerEle.scrollTop,
          scrollHeight = scrollContainerEle.scrollHeight,
          height = scrollContainerEle.clientHeight;
          
      let delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0);
      
      if ((delta > 0 && scrollTop - delta <= 0) || (delta < 0 && scrollTop + height >= scrollHeight-1)) {
        if(delta > 0) {

          if(scrollTimeOut) {
            changeScrollSlide(scrollContainer, scrollItem, false);
            stopScrollAnim(300);  
          }
          
        } else {
          if(scrollTimeOut){
            changeScrollSlide(scrollContainer, scrollItem, true);
            stopScrollAnim(300);  
          }         
        }      
        event.preventDefault();
      }
    })
  }())
}

function stopScrollAnim (timeoutTime) {
  if(scrollTimeOut){scrollTimeOut = false}
  setTimeout( () => {
    scrollTimeOut = true;
  }, timeoutTime)
}

function changeScrollSlide(scrollContainer, scrollItem, moveDown) {
  let scrollItems = Array.from(document.querySelectorAll(`${scrollContainer} ${scrollItem}`));
  let activeItem = scrollItems.find((item) => {
    return item.classList.contains('active');
  })
  let nextItem; 

  if(moveDown) {
    nextItem = scrollItems[scrollItems.indexOf(activeItem)+1]
  } else {
    nextItem = scrollItems[scrollItems.indexOf(activeItem)-1]
  }
  
  if(nextItem){
    activeItem.classList.remove('active');
    nextItem.classList.add('active');
  } else {
    activeItem.classList.remove('active');
    if(moveDown) {
      scrollItems[0].classList.add('active');
    } else {
      scrollItems[scrollItems.length - 1].classList.add('active');
    }  
  }
}
