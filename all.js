function scrollSlide (scrollContainer, scrollItem, ssAnimType, ssAnimDuration, ssAnimDelay) {
  const scrollContainerEle = document.querySelector(scrollContainer);
  const scrollItems = Array.from(document.querySelectorAll(`${scrollContainer} ${scrollItem}`));

  let allowAnimation = true;

  // NOTE:
  // INNER FUNCTIONS DECLARATION
  function addAnimationClasses() {
    scrollItems.forEach((item) => {
      item.classList.add(ssAnimType);
    })
  }

  function addAnimationDuration() {
    scrollItems.forEach((item) => {
      item.style.transitionDuration = `${ssAnimDuration}s`;
    })
  }

  function addAnimationDelay(item) {
    item.style.transitionDelay = `${ssAnimDelay}s`; 
  }

  function removeAnimationDelay(item) {
    item.style.transitionDelay = '0s'; 
  }
  
  function stopScrollAnim () {
    if(allowAnimation){allowAnimation = false}
    setTimeout( () => {
      allowAnimation = true;
    }, (ssAnimDuration + ssAnimDelay) * 1000)
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
      addAnimationDelay(nextItem);
    } else {
      activeItem.classList.remove('active');
      if(moveDown) {
        scrollItems[0].classList.add('active');
        addAnimationDelay(scrollItems[0]);
      } else {
        scrollItems[scrollItems.length - 1].classList.add('active');
        addAnimationDelay(scrollItems[scrollItems.length - 1]);
      }  
    }
    removeAnimationDelay(activeItem)
  }

  // NOTE:
  // INNER FUNCTION CALLS
  addAnimationClasses()
  addAnimationDuration()


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

          if(allowAnimation) {
            changeScrollSlide(false);
            stopScrollAnim();  
          }
          
        } else {
          if(allowAnimation){
            changeScrollSlide(true);
            stopScrollAnim();  
          }         
        }      
        event.preventDefault();
      } else {
         if(delta < 0) {
          if(allowAnimation){
            changeScrollSlide(true);
            stopScrollAnim();  
          } 
         }
         event.preventDefault();
      }
    })
  }())
}
