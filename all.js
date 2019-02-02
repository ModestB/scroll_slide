function scrollSlide (scrollContainer, scrollItem, ssAnimType) {
  const scrollContainerEle = document.querySelector(scrollContainer);
  const scrollItems = Array.from(document.querySelectorAll(`${scrollContainer} ${scrollItem}`));
  let animTimeOut = true;

  // NOTE:
  // INNER FUNCTIONS DECLARATION
  function addAnimationClasses() {
    scrollItems.forEach((item) => {
      item.classList.add(ssAnimType);
    })
  }
  
  function stopScrollAnim (timeoutTime) {
    if(animTimeOut){animTimeOut = false}
    setTimeout( () => {
      animTimeOut = true;
    }, timeoutTime)
  }
  
  function changeScrollSlide(moveDown) {
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

  // NOTE:
  // INNER FUNCTION CALLS
  addAnimationClasses()


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
      // console.log(`scrollTop ${screenTop}  height ${height} scrollHeight ${scrollHeight}`)
      if ((delta > 0 && scrollTop - delta <= 0) || (delta < 0 && scrollTop + height >= scrollHeight-1)) {
        if(delta > 0) {

          if(animTimeOut) {
            changeScrollSlide(false);
            stopScrollAnim(2000);  
          }
          
        } else {
          if(animTimeOut){
            changeScrollSlide(true);
            stopScrollAnim(2000);  
          }         
        }      
        event.preventDefault();
      } else {
         if(delta < 0) {
          if(animTimeOut){
            changeScrollSlide(true);
            stopScrollAnim(2000);  
          } 
         }
         event.preventDefault();
      }
    })
  }())
}
