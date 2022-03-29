"function"!=typeof Object.create&&(Object.create=function(t){function i(){}return i.prototype=t,new i}),function(t,i,s){var e={init:function(i,s){this.$elem=t(s),this.options=t.extend({},t.fn.owlCarousel.options,this.$elem.data(),i),this.userOptions=i,this.loadContent()},loadContent:function(){var i,s=this;"function"==typeof s.options.beforeInit&&s.options.beforeInit.apply(this,[s.$elem]),"string"==typeof s.options.jsonPath?(i=s.options.jsonPath,t.getJSON(i,function(t){var i,e="";if("function"==typeof s.options.jsonSuccess)s.options.jsonSuccess.apply(this,[t]);else{for(i in t.owl)t.owl.hasOwnProperty(i)&&(e+=t.owl[i].item);s.$elem.html(e)}s.logIn()})):s.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style")),this.$elem.data("owl-originalClasses",this.$elem.attr("class")),this.$elem.css({opacity:0}),this.orignalItems=this.options.items,this.checkBrowser(),this.wrapperWidth=0,this.checkVisible=null,this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass(),this.eventTypes(),this.$userItems=this.$elem.children(),this.itemsAmount=this.$userItems.length,this.wrapItems(),this.$owlItems=this.$elem.find(".owl-item"),this.$owlWrapper=this.$elem.find(".owl-wrapper"),this.playDirection="next",this.prevItem=0,this.prevArr=[0],this.currentItem=0,this.customEvents(),this.onStartup()},onStartup:function(){this.updateItems(),this.calculateAll(),this.buildControls(),this.updateControls(),this.response(),this.moveEvents(),this.stopOnHover(),this.owlStatus(),!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle),!0===this.options.autoPlay&&(this.options.autoPlay=5e3),this.play(),this.$elem.find(".owl-wrapper").css("display","block"),this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility(),this.onstartup=!1,this.eachMoveUpdate(),"function"==typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad(),!0===this.options.autoHeight&&this.autoHeight(),this.onVisibleItems(),"function"==typeof this.options.afterAction&&this.options.afterAction.apply(this,[this.$elem])},updateVars:function(){"function"==typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]),this.watchVisibility(),this.updateItems(),this.calculateAll(),this.updatePosition(),this.updateControls(),this.eachMoveUpdate(),"function"==typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var t=this;i.setTimeout(function(){t.updateVars()},0)},watchVisibility:function(){var t=this;if(!1!==t.$elem.is(":visible"))return!1;t.$elem.css({opacity:0}),i.clearInterval(t.autoPlayInterval),i.clearInterval(t.checkVisible),t.checkVisible=i.setInterval(function(){t.$elem.is(":visible")&&(t.reload(),t.$elem.animate({opacity:1},200),i.clearInterval(t.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'),this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'),this.wrapperOuter=this.$elem.find(".owl-wrapper-outer"),this.$elem.css("display","block")},baseClass:function(){var t=this.$elem.hasClass(this.options.baseClass),i=this.$elem.hasClass(this.options.theme);t||this.$elem.addClass(this.options.baseClass),i||this.$elem.addClass(this.options.theme)},updateItems:function(){var i,s;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=!1,this.options.itemsMobile=!1,!1;if((i=t(this.options.responsiveBaseWidth).width())>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems),!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(t,i){return t[0]-i[0]}),s=0;s<this.options.itemsCustom.length;s+=1)this.options.itemsCustom[s][0]<=i&&(this.options.items=this.options.itemsCustom[s][1]);else i<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),i<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),i<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),i<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),i<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var s,e,o=this;if(!0!==o.options.responsive)return!1;e=t(i).width(),o.resizer=function(){t(i).width()!==e&&(!1!==o.options.autoPlay&&i.clearInterval(o.autoPlayInterval),i.clearTimeout(s),s=i.setTimeout(function(){e=t(i).width(),o.updateVars()},o.options.responsiveRefreshRate))},t(i).resize(o.resizer)},updatePosition:function(){this.jumpTo(this.currentItem),!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var i=this,s=0,e=i.itemsAmount-i.options.items;i.$owlItems.each(function(o){var n=t(this);n.css({width:i.itemWidth}).data("owl-item",Number(o)),o%i.options.items!=0&&o!==e||o>e||(s+=1),n.data("owl-roundPages",s)})},appendWrapperSizes:function(){var t=this.$owlItems.length*this.itemWidth;this.$owlWrapper.css({width:2*t,left:0}),this.appendItemsSizes()},calculateAll:function(){this.calculateWidth(),this.appendWrapperSizes(),this.loops(),this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/this.options.items)},max:function(){var t=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);return this.options.items>this.itemsAmount?(this.maximumItem=0,t=0,this.maximumPixels=0):(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=t),t},min:function(){return 0},loops:function(){var i,s,e=0,o=0;for(this.positionsInArray=[0],this.pagesInArray=[],i=0;i<this.itemsAmount;i+=1)o+=this.itemWidth,this.positionsInArray.push(-o),!0===this.options.scrollPerPage&&(s=t(this.$owlItems[i]).data("owl-roundPages"))!==e&&(this.pagesInArray[e]=this.positionsInArray[i],e=s)},buildControls:function(){!0!==this.options.navigation&&!0!==this.options.pagination||(this.owlControls=t('<div class="owl-controls-new"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem)),!0===this.options.pagination&&this.buildPagination(),!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var i=this,s=t('<div class="owl-buttons"/>');i.owlControls.append(s),i.buttonPrev=t("<div/>",{class:"owl-prev",html:i.options.navigationText[0]||""}),i.buttonNext=t("<div/>",{class:"owl-next",html:i.options.navigationText[1]||""}),s.append(i.buttonPrev).append(i.buttonNext),s.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(t){t.preventDefault()}),s.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(s){s.preventDefault(),t(this).hasClass("owl-next")?i.next():i.prev()})},buildPagination:function(){var i=this;i.paginationWrapper=t('<div class="owl-pagination"/>'),i.owlControls.append(i.paginationWrapper),i.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(s){s.preventDefault(),Number(t(this).data("owl-page"))!==i.currentItem&&i.goTo(Number(t(this).data("owl-page")),!0)})},updatePagination:function(){var i,s,e,o,n,a;if(!1===this.options.pagination)return!1;for(this.paginationWrapper.html(""),i=0,s=this.itemsAmount-this.itemsAmount%this.options.items,o=0;o<this.itemsAmount;o+=1)o%this.options.items==0&&(i+=1,s===o&&(e=this.itemsAmount-this.options.items),n=t("<div/>",{class:"owl-page"}),a=t("<span></span>",{text:!0===this.options.paginationNumbers?i:"",class:!0===this.options.paginationNumbers?"owl-numbers":""}),n.append(a),n.data("owl-page",s===o?e:o),n.data("owl-roundPages",i),this.paginationWrapper.append(n));this.checkPagination()},checkPagination:function(){var i=this;if(!1===i.options.pagination)return!1;i.paginationWrapper.find(".owl-page").each(function(){t(this).data("owl-roundPages")===t(i.$owlItems[i.currentItem]).data("owl-roundPages")&&(i.paginationWrapper.find(".owl-page").removeClass("active"),t(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination(),this.checkNavigation(),this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(t){if(this.isTransition)return!1;if(this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1,this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0)){if(!0!==this.options.rewindNav)return this.currentItem=this.maximumItem,!1;this.currentItem=0,t="rewind"}this.goTo(this.currentItem,t)},prev:function(t){if(this.isTransition)return!1;if(!0===this.options.scrollPerPage&&this.currentItem>0&&this.currentItem<this.options.items?this.currentItem=0:this.currentItem-=!0===this.options.scrollPerPage?this.options.items:1,this.currentItem<0){if(!0!==this.options.rewindNav)return this.currentItem=0,!1;this.currentItem=this.maximumItem,t="rewind"}this.goTo(this.currentItem,t)},goTo:function(t,s,e){var o,n=this;return!n.isTransition&&("function"==typeof n.options.beforeMove&&n.options.beforeMove.apply(this,[n.$elem]),t>=n.maximumItem?t=n.maximumItem:t<=0&&(t=0),n.currentItem=n.owl.currentItem=t,!1!==n.options.transitionStyle&&"drag"!==e&&1===n.options.items&&!0===n.browser.support3d?(n.swapSpeed(0),!0===n.browser.support3d?n.transition3d(n.positionsInArray[t]):n.css2slide(n.positionsInArray[t],1),n.afterGo(),n.singleItemTransition(),!1):(o=n.positionsInArray[t],!0===n.browser.support3d?(n.isCss3Finish=!1,!0===s?(n.swapSpeed("paginationSpeed"),i.setTimeout(function(){n.isCss3Finish=!0},n.options.paginationSpeed)):"rewind"===s?(n.swapSpeed(n.options.rewindSpeed),i.setTimeout(function(){n.isCss3Finish=!0},n.options.rewindSpeed)):(n.swapSpeed("slideSpeed"),i.setTimeout(function(){n.isCss3Finish=!0},n.options.slideSpeed)),n.transition3d(o)):!0===s?n.css2slide(o,n.options.paginationSpeed):"rewind"===s?n.css2slide(o,n.options.rewindSpeed):n.css2slide(o,n.options.slideSpeed),void n.afterGo()))},jumpTo:function(t){"function"==typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]),t>=this.maximumItem||-1===t?t=this.maximumItem:t<=0&&(t=0),this.swapSpeed(0),!0===this.browser.support3d?this.transition3d(this.positionsInArray[t]):this.css2slide(this.positionsInArray[t],1),this.currentItem=this.owl.currentItem=t,this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem),this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2],this.prevArr.shift(0),this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp()),"function"==typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop",i.clearInterval(this.autoPlayInterval)},checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var t=this;if(t.apStatus="play",!1===t.options.autoPlay)return!1;i.clearInterval(t.autoPlayInterval),t.autoPlayInterval=i.setInterval(function(){t.next(!0)},t.options.autoPlay)},swapSpeed:function(t){"slideSpeed"===t?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===t?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!=typeof t&&this.$owlWrapper.css(this.addCssSpeed(t))},addCssSpeed:function(t){return{"-webkit-transition":"all "+t+"ms ease","-moz-transition":"all "+t+"ms ease","-o-transition":"all "+t+"ms ease",transition:"all "+t+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(t){return{"-webkit-transform":"translate3d("+t+"px, 0px, 0px)","-moz-transform":"translate3d("+t+"px, 0px, 0px)","-o-transform":"translate3d("+t+"px, 0px, 0px)","-ms-transform":"translate3d("+t+"px, 0px, 0px)",transform:"translate3d("+t+"px, 0px,0px)"}},transition3d:function(t){this.$owlWrapper.css(this.doTranslate(t))},css2move:function(t){this.$owlWrapper.css({left:t})},css2slide:function(t,i){var s=this;s.isCssFinish=!1,s.$owlWrapper.stop(!0,!0).animate({left:t},{duration:i||s.options.slideSpeed,complete:function(){s.isCssFinish=!0}})},checkBrowser:function(){var t,e,o,n,a="translate3d(0px, 0px, 0px)",r=s.createElement("div");r.style.cssText="  -moz-transform:"+a+"; -ms-transform:"+a+"; -o-transform:"+a+"; -webkit-transform:"+a+"; transform:"+a,t=/translate3d\(0px, 0px, 0px\)/g,o=null!==(e=r.style.cssText.match(t))&&1===e.length,n="ontouchstart"in i||i.navigator.msMaxTouchPoints,this.browser={support3d:o,isTouch:n}},moveEvents:function(){!1===this.options.mouseDrag&&!1===this.options.touchDrag||(this.gestures(),this.disabledEvents())},eventTypes:function(){var t=["s","e","x"];this.ev_types={},!0===this.options.mouseDrag&&!0===this.options.touchDrag?t=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:!1===this.options.mouseDrag&&!0===this.options.touchDrag?t=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(t=["mousedown.owl","mousemove.owl","mouseup.owl"]),this.ev_types.start=t[0],this.ev_types.move=t[1],this.ev_types.end=t[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(t){t.preventDefault()}),this.$elem.on("mousedown.disableTextSelect",function(i){return t(i.target).is("input, textarea, select, option")})},gestures:function(){var e=this,o={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};function n(t){if(void 0!==t.touches)return{x:t.touches[0].pageX,y:t.touches[0].pageY};if(void 0===t.touches){if(void 0!==t.pageX)return{x:t.pageX,y:t.pageY};if(void 0===t.pageX)return{x:t.clientX,y:t.clientY}}}function a(i){"on"===i?(t(s).on(e.ev_types.move,r),t(s).on(e.ev_types.end,l)):"off"===i&&(t(s).off(e.ev_types.move),t(s).off(e.ev_types.end))}function r(a){var r,l,h=a.originalEvent||a||i.event;e.newPosX=n(h).x-o.offsetX,e.newPosY=n(h).y-o.offsetY,e.newRelativeX=e.newPosX-o.relativePos,"function"==typeof e.options.startDragging&&!0!==o.dragging&&0!==e.newRelativeX&&(o.dragging=!0,e.options.startDragging.apply(e,[e.$elem])),(e.newRelativeX>8||e.newRelativeX<-8)&&!0===e.browser.isTouch&&(void 0!==h.preventDefault?h.preventDefault():h.returnValue=!1,o.sliding=!0),(e.newPosY>10||e.newPosY<-10)&&!1===o.sliding&&t(s).off("touchmove.owl"),r=function(){return e.newRelativeX/5},l=function(){return e.maximumPixels+e.newRelativeX/5},e.newPosX=Math.max(Math.min(e.newPosX,r()),l()),!0===e.browser.support3d?e.transition3d(e.newPosX):e.css2move(e.newPosX)}function l(s){var n,r,l,h=s.originalEvent||s||i.event;h.target=h.target||h.srcElement,o.dragging=!1,!0!==e.browser.isTouch&&e.$owlWrapper.removeClass("grabbing"),e.newRelativeX<0?e.dragDirection=e.owl.dragDirection="left":e.dragDirection=e.owl.dragDirection="right",0!==e.newRelativeX&&(n=e.getNewPosition(),e.goTo(n,!1,"drag"),o.targetElement===h.target&&!0!==e.browser.isTouch&&(t(h.target).on("click.disable",function(i){i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault(),t(i.target).off("click.disable")}),l=(r=t._data(h.target,"events").click).pop(),r.splice(0,0,l))),a("off")}e.isCssFinish=!0,e.$elem.on(e.ev_types.start,".owl-wrapper",function(s){var r,l=s.originalEvent||s||i.event;if(3===l.which)return!1;if(!(e.itemsAmount<=e.options.items)){if(!1===e.isCssFinish&&!e.options.dragBeforeAnimFinish)return!1;if(!1===e.isCss3Finish&&!e.options.dragBeforeAnimFinish)return!1;!1!==e.options.autoPlay&&i.clearInterval(e.autoPlayInterval),!0===e.browser.isTouch||e.$owlWrapper.hasClass("grabbing")||e.$owlWrapper.addClass("grabbing"),e.newPosX=0,e.newRelativeX=0,t(this).css(e.removeTransition()),r=t(this).position(),o.relativePos=r.left,o.offsetX=n(l).x-r.left,o.offsetY=n(l).y-r.top,a("on"),o.sliding=!1,o.targetElement=l.target||l.srcElement}})},getNewPosition:function(){var t=this.closestItem();return t>this.maximumItem?(this.currentItem=this.maximumItem,t=this.maximumItem):this.newPosX>=0&&(t=0,this.currentItem=0),t},closestItem:function(){var i=this,s=!0===i.options.scrollPerPage?i.pagesInArray:i.positionsInArray,e=i.newPosX,o=null;return t.each(s,function(n,a){e-i.itemWidth/20>s[n+1]&&e-i.itemWidth/20<a&&"left"===i.moveDirection()?(o=a,!0===i.options.scrollPerPage?i.currentItem=t.inArray(o,i.positionsInArray):i.currentItem=n):e+i.itemWidth/20<a&&e+i.itemWidth/20>(s[n+1]||s[n]-i.itemWidth)&&"right"===i.moveDirection()&&(!0===i.options.scrollPerPage?(o=s[n+1]||s[s.length-1],i.currentItem=t.inArray(o,i.positionsInArray)):(o=s[n+1],i.currentItem=n+1))}),i.currentItem},moveDirection:function(){var t;return this.newRelativeX<0?(t="right",this.playDirection="next"):(t="left",this.playDirection="prev"),t},customEvents:function(){var t=this;t.$elem.on("owl.next",function(){t.next()}),t.$elem.on("owl.prev",function(){t.prev()}),t.$elem.on("owl.play",function(i,s){t.options.autoPlay=s,t.play(),t.hoverStatus="play"}),t.$elem.on("owl.stop",function(){t.stop(),t.hoverStatus="stop"}),t.$elem.on("owl.goTo",function(i,s){t.goTo(s)}),t.$elem.on("owl.jumpTo",function(i,s){t.jumpTo(s)})},stopOnHover:function(){var t=this;!0===t.options.stopOnHover&&!0!==t.browser.isTouch&&!1!==t.options.autoPlay&&(t.$elem.on("mouseover",function(){t.stop()}),t.$elem.on("mouseout",function(){"stop"!==t.hoverStatus&&t.play()}))},lazyLoad:function(){var i,s,e,o;if(!1===this.options.lazyLoad)return!1;for(i=0;i<this.itemsAmount;i+=1)"loaded"!==(s=t(this.$owlItems[i])).data("owl-loaded")&&(e=s.data("owl-item"),"string"==typeof(o=s.find(".lazyOwl")).data("src")?(void 0===s.data("owl-loaded")&&(o.hide(),s.addClass("loading").data("owl-loaded","checked")),(!0!==this.options.lazyFollow||e>=this.currentItem)&&e<this.currentItem+this.options.items&&o.length&&this.lazyPreload(s,o)):s.data("owl-loaded","loaded"))},lazyPreload:function(t,s){var e,o=this,n=0;function a(){t.data("owl-loaded","loaded").removeClass("loading"),s.removeAttr("data-src"),"fade"===o.options.lazyEffect?s.fadeIn(400):s.show(),"function"==typeof o.options.afterLazyLoad&&o.options.afterLazyLoad.apply(this,[o.$elem])}"DIV"===s.prop("tagName")?(s.css("background-image","url("+s.data("src")+")"),e=!0):s[0].src=s.data("src"),function t(){n+=1,o.completeImg(s.get(0))||!0===e?a():n<=100?i.setTimeout(t,100):a()}()},autoHeight:function(){var s,e=this,o=t(e.$owlItems[e.currentItem]).find("img");function n(){var s=t(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",s+"px"),e.wrapperOuter.hasClass("autoHeight")||i.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}void 0!==o.get(0)?(s=0,function t(){s+=1,e.completeImg(o.get(0))?n():s<=100?i.setTimeout(t,100):e.wrapperOuter.css("height","")}()):n()},completeImg:function(t){return!!t.complete&&("undefined"===typeof t.naturalWidth||0!==t.naturalWidth)},onVisibleItems:function(){var i;for(!0===this.options.addClassActive&&this.$owlItems.removeClass("active"),this.visibleItems=[],i=this.currentItem;i<this.currentItem+this.options.items;i+=1)this.visibleItems.push(i),!0===this.options.addClassActive&&t(this.$owlItems[i]).addClass("active");this.owl.visibleItems=this.visibleItems},transitionTypes:function(t){this.outClass="owl-"+t+"-out",this.inClass="owl-"+t+"-in"},singleItemTransition:function(){var t=this,i=t.outClass,s=t.inClass,e=t.$owlItems.eq(t.currentItem),o=t.$owlItems.eq(t.prevItem),n=Math.abs(t.positionsInArray[t.currentItem])+t.positionsInArray[t.prevItem],a=Math.abs(t.positionsInArray[t.currentItem])+t.itemWidth/2,r="webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";t.isTransition=!0,t.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":a+"px","-moz-perspective-origin":a+"px","perspective-origin":a+"px"}),o.css(function(t){return{position:"relative",left:t+"px"}}(n)).addClass(i).on(r,function(){t.endPrev=!0,o.off(r),t.clearTransStyle(o,i)}),e.addClass(s).on(r,function(){t.endCurrent=!0,e.off(r),t.clearTransStyle(e,s)})},clearTransStyle:function(t,i){t.css({position:"",left:""}).removeClass(i),this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.endPrev=!1,this.endCurrent=!1,this.isTransition=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect"),t(s).off(".owl owl"),t(i).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove()),this.clearEvents(),this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop(),i.clearInterval(this.checkVisible),this.unWrap(),this.$elem.removeData()},reinit:function(i){var s=t.extend({},this.userOptions,i);this.unWrap(),this.init(s,this.$elem)},addItem:function(t,i){var s;return!!t&&(0===this.$elem.children().length?(this.$elem.append(t),this.setVars(),!1):(this.unWrap(),(s=void 0===i||-1===i?-1:i)>=this.$userItems.length||-1===s?this.$userItems.eq(-1).after(t):this.$userItems.eq(s).before(t),void this.setVars()))},removeItem:function(t){var i;if(0===this.$elem.children().length)return!1;i=void 0===t||-1===t?-1:t,this.unWrap(),this.$userItems.eq(i).remove(),this.setVars()}};t.fn.owlCarousel=function(i){return this.each(function(){if(!0===t(this).data("owl-init"))return!1;t(this).data("owl-init",!0);var s=Object.create(e);s.init(i,this),t.data(this,"owlCarousel",s)})},t.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["<img src='images/prev.png' />","<img src='images/next.png' />"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:i,baseClass:"owl-carousel",theme:"owl-theme-new",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}}(jQuery,window,document);