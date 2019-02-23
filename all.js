function scrollSlide (args) {
  //args.container, args.item, args.animType, args.duration, args.delay, args.uncutMove
  const scrollContainerEle = document.querySelector(args.container);
  const scrollItems = Array.from(document.querySelectorAll(`${args.container} ${args.item}`));
  let indicatorArr = [];
  let activeItem;

  let allowAnimation = true;
  let allowAnimationTimeout;

  // NOTE:
  // INNER FUNCTIONS DECLARATION
  function findActiveItem () {
    activeItem = scrollItems.find((item) => {
      return item.classList.contains('active');
    })
  }


  function addAnimationClasses() {
    scrollItems.forEach((item) => {
      item.classList.add(args.animType);
    })
  }

  function addLoppAnimClasses () {
    findActiveItem();
    let nextItem = scrollItems[scrollItems.indexOf(activeItem)+1];
    let prevItem = scrollItems[scrollItems.indexOf(activeItem)-1];
    if(!nextItem) {
      nextItem = scrollItems[0];
    };
   
    if(!prevItem) {
      prevItem = scrollItems[scrollItems.length - 1];
    };
    let itemsProceed = 0;
    scrollItems.forEach((item) => {
      itemsProceed++; 

      item.classList.remove('ss-move-prev') 
      item.classList.remove('ss-move-next') 

      if(itemsProceed === scrollItems.length){
        nextItem.classList.add('ss-move-next');
        prevItem.classList.add('ss-move-prev');

      }  
    })
  }
  

  function addAnimationDuration() {
    scrollItems.forEach((item) => {
      item.style.transitionDuration = `${args.duration}s`;
      addAnimationDelay(item)
    })
  }

  function addAnimationDelay(item) {
    item.style.transitionDelay = `${args.delay}s`; 
  }
 
  function stopScrollAnim () {
    if(allowAnimation){allowAnimation = false}
    allowAnimationTimeout = setTimeout( () => {
      allowAnimation = true;

      scrollItems.forEach((item) => {
        item.classList.remove('ss-moving');
      })
    }, (args.duration + args.delay) * 1000)
  }
  
  function findNextItemIndex(moveDown) {
    findActiveItem();
    let nextItem; 
  
    let nextItemIndex;
    if(moveDown) {
      nextItem = scrollItems[scrollItems.indexOf(activeItem)+1]
    } else {
      nextItem = scrollItems[scrollItems.indexOf(activeItem)-1]
    }
    if(nextItem){
      nextItemIndex = scrollItems.indexOf(nextItem)  
    } else {
      if(moveDown) {
        nextItemIndex = 0;
      } else {
        nextItemIndex = scrollItems.length - 1;
      }  
    }
    changeSlide(nextItemIndex)
  }

  function addIndicators(){
    const indicatorContainer = document.createElement('div');
    indicatorContainer.setAttribute('class', 'ss-indicator-container')
    scrollContainerEle.appendChild(indicatorContainer)

    scrollItems.forEach(() => {
      let indicator = document.createElement('div');
      indicator.setAttribute('class', 'ss-indicator');
      indicatorArr.push(indicator);
      indicatorContainer.appendChild(indicator);
    })
  }

  function checkChangeIndicator (nextActiveItem) {
    removeActiveIndicator();

    let activeItemIndex = scrollItems.indexOf(nextActiveItem);
    let activeIndicator = indicatorArr[activeItemIndex];
    activeIndicator.classList.add('active');
  }

  function removeActiveIndicator () {
    let previousActiveItem = document.querySelector( '.ss-indicator.active');
    try {
      previousActiveItem.classList.remove('active');
    } catch (error) {
      
    } 
  }

  function changeSlide(index) {
    let nextItem = scrollItems[index]; 
    activeItem.classList.add('ss-moving');
    nextItem.classList.add('ss-moving');
    activeItem.classList.remove('active');
    nextItem.classList.add('active');

    if(args.uncutMove){ addLoppAnimClasses()}
    if(args.dots){checkChangeIndicator(nextItem)}
  }

  // TODO:
  function indicatorChangeSlide () {
    indicatorArr.forEach(function (item, index){
      item.addEventListener('click', () => {
        if(!item.classList.contains('active')){
          changeSlide(index)
        }
      })
    })
  }

 

  // NOTE:
  // INNER FUNCTION CALLS
  findActiveItem();
  addAnimationClasses()
  if(args.uncutMove){ addLoppAnimClasses()}
  addAnimationDuration()
  if(args.dots){
    addIndicators()
    checkChangeIndicator(scrollItems[0])
    
    //TEST:
    indicatorChangeSlide() 
  }



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
            stopScrollAnim()
            findNextItemIndex(false)
          }
          
        } else {
          if(allowAnimation){
            stopScrollAnim()
            findNextItemIndex(true);
          }         
        }      
        event.preventDefault();
      } else {
         if(delta < 0) {
          if(allowAnimation){  
            stopScrollAnim()
            findNextItemIndex(true);
          } 
         }
         event.preventDefault();
      }
    })
  }())
}
