
// categoryMenu 메뉴
function categoryMenu(){
  let wrapstyle = $('.wrap').attr('style');

  // open
  $(document).on('click', '.header .gnb-menu .btn-menu', function(){
      $('body, html').scrollTop(0);
      $('body, .wrap').css('overflow', 'hidden');
      $('.wrap').css('position', 'relative');
      $('.category-menu-wrap').show();
      $('.category-menu-wrap').scrollTop(0);
      $('.category-menu-wrap').stop().animate({
        left: "0",
      }, 250);
    });  
  // close
  $('.category-menu-wrap .btn-close').on('click', function(){
      $('.category-menu-wrap').stop().animate({
        left: "-100%",
      }, 250, function() {
        setTimeout(function(){
          $('.category-menu-wrap').hide();
          $('body, .wrap').css('overflow', '');
          $('.wrap').attr('style', wrapstyle);
        }, 100)
      });
  
    });  

    $('.category-menu-wrap .cate-menu > li').each(function(){
      if($(this).find('ul').length > 0) $(this).addClass('has-menu');
    });

    $(document).on('click', '.category-menu-wrap .cate-menu > li.has-menu > a ', function(){
      $menu = $(this).next('ul');
      if($menu.is(':hidden')){
        $menu.slideDown();
        $menu.parent('li').addClass('on');
      }else{
        $menu.slideUp();
        $menu.parent('li').removeClass('on');
      }
    });      
}

function scrollCheck(){
  var lastScrollTop = 0;
  $('.wrap').removeClass('noscroll');
  if ($(document).height() <= $(window).height()) {
    $('.wrap').addClass('noscroll');
    return;
  }

  $(window)
      .scroll(function (e) {
        var wH =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight,
            sT = $(window).scrollTop(),
            sB = sT + wH,
            sh_H = $(".header").innerHeight();

        if(sT + window.innerHeight >= document.body.scrollHeight) return;

        // if (sT >= sh_H && sT >= lastScrollTop) {
        if (sT >= 5 && sT >= lastScrollTop) {
          $("body").addClass("scroll-down").removeClass("scroll-up");
        } else if (sT <= 0) {
          $("body").removeClass("scroll-up scroll-down");
        } else {
          $("body").addClass("scroll-up").removeClass("scroll-down");
        }

        lastScrollTop = sT;
      })
      .scroll();
}

function listAlign(){
  $('.align-btns button').on('click', function(){
    let type = $(this).attr('class').split('-')[1];
    $(this).addClass('on')
    $(this).siblings().removeClass('on');
    $('.product-list').removeClass('list grid');
    $('.product-list').addClass(type);
  });
}

function centerSlide(id, opt){
  if($(id + ' .swiper-slide').length <= opt.min) return;  
  if($(id).hasClass('main-goods-list') && $(id + ' .swiper-slide').length > 1 && $(id + ' swiper-slide').length <= 5) {
    $(id + ' .swiper-wrapper').append($(id + ' .swiper-wrapper').html())
    $(id + ' .swiper-wrapper').append($(id + ' .swiper-wrapper').html())

  }

  if(opt && opt.autoplay) opt.autoplay.disableOnInteraction = false
  
  let option = {
    loop: true,
    speed :800,
    slidesPerView: 'auto',
    centeredSlides: true,
  }
  let swiper = new Swiper(id, Object.assign(option, opt));
  if(opt.centeredSlides){
    setTimeout(function(){
      swiper.slideTo(1);
    }, 300);    
  }   
}  

function gridSlide(id, opt){
  if($(id + ' .swiper-slide').length >= 3){
    $(id).addClass('init-slider');
  }

  if(opt && opt.autoplay) opt.autoplay.disableOnInteraction = false
  
  let option = {
      loop: true,
      speed :800,
      grid: { rows: 2 },
      slidesPerView: 1,     
    }

    let swiper = new Swiper(id, Object.assign(option, opt));
}  

function basicSlide(id, opt){
  if($(id + ' .swiper-slide').length <= opt.min) return;  

  if(opt && opt.autoplay) opt.autoplay.disableOnInteraction = false
  
  let option = {
      loop: true,
      speed :800,
      slidesPerView: 1,
      pagination: {
          el: id +" .swiper-pagination",
          clickable: true,
      },
      navigation: {
        nextEl: id + " .swiper-button-next",
        prevEl: id + " .swiper-button-prev",
      },       
    }

    if($(id +" .swiper-scrollbar").length > 0) {
      option.scrollbar = {
        el: id +" .swiper-scrollbar",
        draggable: true,
      }
    }
    let swiper = new Swiper(id, Object.assign(option, opt));
}  


function getTime(id, time) {
  function f(){
    const target = new Date(time);
    const today = new Date();
    const gap = target - today;
    const d = Math.floor(gap / (1000 * 60 * 60 * 24)); // 일
    const h = Math.floor((gap / (1000 * 60 * 60)) % 24); // 시
    const m = Math.floor(((gap / 1000) * 60) % 60); // 분
    const s = Math.floor((gap / 1000) % 60); // 초
    $(id).find('.days').html(d);
    $(id).find('.hours').html(h);
    $(id).find('.minutes').html(m);
    $(id).find('.seconds').html(s);
  }
  setInterval(f, 1000);
}


function popTooltip(){
	$("[data-evt=pop-tooltip]").on("click", function() {
    $tooltip = $(this).parents('.pop-tooltip-wrap').find('.pop-tooltip');
    $close = $tooltip.find('.close');
    
    $tooltip.addClass('on');
      
    $close.on('click', function(){
      $tooltip.addClass('off');
      setTimeout(function(){
        $tooltip.removeClass('off');
        $tooltip.removeClass('on');
      }, 200);
    });
  });
}

function allChk(){
	if(!$('[data-evt="all-chk"]').length>0) return;

	$('[data-evt="all-chk"]').each(function(){
		var name = $(this).attr('name');
		var _this = $(this);
		_this.on('change', function(){
			if($(this).prop("checked")){
				$('[name='+name+']').prop("checked", true);
			}else{
				$('[name='+name+']').prop("checked", false);
			}
		});
		$('[name='+name+']').on('change', function(){
			var total= $('[name='+name+']').not(_this).length;
			var chked= $('[name='+name+']:checked').not(_this).length;

			if(chked == total){
				 _this.prop("checked", true);
			}else{
				_this.prop("checked", false);
			}
		});
	});
}


function tabEvt(){
  let tabs = [];
  $('[data-tab-id]').on('click', function(){
    let type = $(this).data('type') == 'class' ? true : false;
    let tabid = $(this).data('tab-id');
    tabs = [];
    tabs.push(tabid);

    $(this).parents('li').addClass('on');
    $(this).parents('li').siblings().find('[data-tab-id]').each(function(){
      $(this).parents('li').removeClass('on');
      tabs.push($(this).data('tab-id'));
    });

    tabs.forEach(function(v){
      if(type) $('#'+v).addClass('hide')
      else $('#'+v).hide()
    });
   
    if(type) $('#'+tabid).removeClass('hide')
    else $('#'+tabid).show()    
  })
}

function tabScrollEvt(){
  if($('[data-scroll-id]').length <= 0) return;
  let ing = false;
  let clickTrigger = false;
  let scrolling = false;  
  $('[data-scroll-id]').on('click', function(e){
    e.preventDefault()
    clearTimeout(clickTrigger);
		ing = true;

    let $this = $(this)

		let id = $(this).data('scroll-id');

		if($(this).parents('li').length > 0){
			$(this).parents('li').siblings().removeClass('on');
			$(this).parents('li').addClass('on');
		}else{
			$('[data-evt="tab-btns"] a').removeClass('on');
			$(this).addClass('on');
		}

		clearTimeout(scrolling);    
		scrolling = setTimeout(function(){
			if($('#'+id).length <= 0 ) return;
      ing = true			
      let gap  = $(window).scrollTop() > $('#'+id).offset().top ? $this.outerHeight() + $('.title-main-wrap').height() : $this.outerHeight();      
      $('html, body').animate({scrollTop:$('#'+id).offset().top - gap}, 300, function(){
				clearTimeout(clickTrigger);
				clickTrigger = setTimeout(function(){
					ing = false
				}, 1000);
      });
		},100);
  });

  $(window).on('scroll resize', function(){
		let sct  = $(window).scrollTop()    
		$('[data-scroll-id]').each(function(){
			if(ing) return;
        let id = $(this).data('scroll-id');

			if($('#'+id).length <= 0 ) return;
      let gap  = $('body').hasClass('scroll-up') ? $(this).outerHeight() + $('.title-main-wrap').height() : $(this).outerHeight();      
			let t = $('#'+id).offset().top - gap;
				if(sct > t){
					$('[data-scroll-id]').parents('li').removeClass('on')
						$(this).parents('li').addClass('on');
				}
		})

	});    
}

function posFixed(obj){
  $(window).on('scroll', function(){
    let st = $(window).scrollTop();
    let top = $(obj).offset().top;
    if(st > top) $(obj).addClass('fixed');
    else $(obj).removeClass('fixed');
  });
}

function fixedFooter(){
  if($('.footer-fixed').length > 0) $('.content').addClass('fixed-footer');
}

function countInput(obj){  
  if($(obj).length <= 0) return;
  $(obj).each(function(){
    let $obj = $(this);
    let $up = $(this).find('.up');
    let $down = $(this).find('.down');
    let $input =  $obj.find('.num');    
    let minCnt = $obj.data('min') != undefined ? $obj.data('min') : 0;
    let maxCnt = $obj.data('max') != undefined ? $obj.data('max') : 1000;
    let cntInputNum =  $obj.find('.num').val();
    let inpval = parseInt($obj.find('input').val());

    let countChange = function(v){
      let val = parseInt(v);

      if(val >= maxCnt ){
        $up.attr('disabled', 'disabled');
        $down.removeAttr('disabled');
      }else if (val <= minCnt) {
        $down.attr('disabled', 'disabled');
        $up.removeAttr('disabled');
      }else{
        $down.removeAttr('disabled');
        $up.removeAttr('disabled');
      }

      if(val > maxCnt) val = maxCnt
      else if(val < minCnt) val = minCnt
      else if(!val) val = 0

      inpval = val;
      $($input).val(val);

      if(val == 1) $obj.addClass('one');
      else $obj.removeClass('one');
    }

    //초기화
    $obj.find('button').each(function(){
      if($(this).hasClass('down') && cntInputNum <= minCnt) $(this).attr('disabled', 'disabled');
      else if($(this).hasClass('up') && cntInputNum >= maxCnt)  $(this).attr('disabled', 'disabled');
    });
    $obj.find('button').off('click.count');
    $obj.find('button').on('click.count', function(e){
      e.stopPropagation();      
      inpval = parseInt($obj.find('input').val());
       if($(this).hasClass('up')) countChange(inpval + 1);
       if($(this).hasClass('down')) countChange(inpval - 1);
    });


    $obj.find('input').on('change', function(){
      countChange($(this).val())
    });
  });
}


function maxLengthChk(object){
  $(object).on('input', function(){
    if (this.value.length > this.maxLength){
      this.value = this.value.slice(0, this.maxLength);
    }
  })
}


function dateSet(){
  $(".date-menu").children("label").each(function () {
      var radioInput = $(this);
      radioInput.on("click", function (e) {
          radioInput.children("input:radio").prop("checked", true);

          $(this).parents('.date-setting-box').find('.start-date').val(extractDate(radioInput.find("input:radio").val()));
          $(this).parents('.date-setting-box').find('.end-date').val(extractDate("today"));

          e.preventDefault();
      });
  })

  if($('[ data-init=checked]').length > 0 ) $('[ data-init=checked]').click();

  function extractDate(val) {
      var nowDate = new Date();
      switch (val) {
          case "oneWeek":
              nowDate.setDate(nowDate.getDate() - 7);
              break;
          case "fifteenDay":
              nowDate.setDate(nowDate.getDate() - 15);
              break;
          case "oneMonth":
              nowDate.setMonth(nowDate.getMonth() - 1);
              break;
          case "threeMonth":
              nowDate.setMonth(nowDate.getMonth() - 3);
              break;
          case "sixMonth":
              nowDate.setMonth(nowDate.getMonth() - 6);
              break;
          case "tenMonth":
              nowDate.setMonth(nowDate.getMonth() - 10);
              break;
          case "oneYear":
              nowDate.setFullYear(nowDate.getFullYear() - 1);
              break;
      }

      var year = nowDate.getFullYear();
      var month = ("0" + (1 + nowDate.getMonth())).slice(-2);
      var day = ("0" + nowDate.getDate()).slice(-2);

      return year + "-" + month + "-" + day;
  }    

  $(this).parents('.date-setting-box').find(".datepicker").on('change', function(){
    $(this).parents('.date-setting-box').find("input:radio").val(null);
  });
}

function datepicker(){
  if($(".datepicker").length <= 0) return;
   $(".datepicker").datepicker({
     dateFormat:'yy-dd-mm',
   });
   $.datepicker.setDefaults({
     dateFormat: 'yymmdd',
     prevText: '이전 달',
     nextText: '다음 달',
     monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
     monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
     dayNames: ['일', '월', '화', '수', '목', '금', '토'],
     dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
     dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
     showMonthAfterYear: true,
     yearSuffix: '년',
     onSelect: function (input, inst) {
      if($(this).parents('.date-setting-box').length > 0) $(this).parents('.date-setting-box').find("input:radio").prop("checked", false);
     }
   });
}

function clip(val){
  var textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  textarea.value = val;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("URL을 클립보드에 복사했습니다")
};


function toggleBtns(){
  $('[data-evt="toggle-btns"] button, [data-evt="toggle-btns"] a').on('click', function(){
    $(this).parents('li').siblings().removeClass('on');
    $(this).parents('li').addClass('on');
  });
}

	
function comma(){
  $('[data-evt=price]').on('keyup', function(e){
    var val = this.value.replace(/[^0-9]/g, "");
    this.value = val.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
  })
}

/* popup */
function popClose(id){
	$(id).fadeOut(300);
	$('html, body').css('overflow','');
} 

function popOpen(id, callback){
	$(id).fadeIn(300);
	$('html, body').css('overflow','hidden');
	if(callback !=undefined ) callback();

	$(id).find('.close').on('click', function(){
		popClose(id);
	})
}


function btmPopOpen(id, hidden, callback){
  let $sideMenuWrap = $(id);
  let $sideMenu = $sideMenuWrap.find('.pop-wrap');
  let $close = $sideMenuWrap.find('.close');
  
  if(!hidden) $(window).scrollTop(0);
  $sideMenuWrap.show();
  $sideMenu.slideDown(300, function(){
    if(!hidden) $('html, body').css('overflow','hidden');
    $sideMenuWrap.addClass('on');
    $sideMenu.height($sideMenu.height())
    if(callback) callback();
  });
  $close.on('click', function(){
    btmPopClose(id);
  });
  
}


function btmPopClose(id, callback){
  let $sideMenuWrap = $(id);
  let $sideMenu = $sideMenuWrap.find('.pop-wrap');

    $sideMenu.css('min-height', 0);
    $sideMenu.slideUp(function(){
      $sideMenuWrap.removeClass('on');
      $sideMenu.css('bottom', 0);
      $sideMenu.attr('style', '');
      $sideMenuWrap.fadeOut();
      if(callback) callback();
    })

    $('html, body').css('overflow','');
}

//얼럿창
function alertClose(id){
  $(id).fadeOut(300, ()=>{
    $(id).remove();
  });
  $('body').css('overflow','');
}

function alertOpen(text, type, callback, opt){
  // if($('#alert').length > 0) return;
  const alertHtml = '<div class="alert-popup">' +
      '<div class="dim"></div>' +
      '<div class="popup">' +
      ((opt && opt.close) ? '<button class="btn-close"></button>': '')  +
      '<div class="pop-body">' +
      '<div class="alert-txt">'+ text +'</div>' +
      '</div>' +
      '<div class="pop-footer">' +
      '<div class="btn-wrap">' +
      '</div>' +
      '</div>' +
      '</button>' +
      '</div>';

  const $alert = $(alertHtml);

  $('.wrap').append($alert);

  function btnCheck(item){
    switch (item) {
      case '확인' :
        return '<button class="btn-type2 st1">확인</button>'
        break;
      case '취소' :
        return '<button class="btn-type2 st2">취소</button>'
        break;
      default:
        return '<button class="btn-type2 st2">취소</button><button class="btn-type2 st1">확인</button>'
    }
  }
  if(!type){
    $alert.find('.btn-wrap').append(btnCheck(''));
  }else{
    for(let i=0;i<type.length;i++){
      $alert.find('.btn-wrap').append(btnCheck(type[i]))
    }
  }
  $alert.show()
  $alert.find('.btn-type2').focus();
  $alert.find('.btn-type2').on('click', function(){
    if(callback) callback(type[$(this).index()]);
    alertClose($alert);
  });
  $alert.find('.btn-close').on('click', function(){
    if((opt && opt.closeCallback)) opt.closeCallback()
    else if(callback) callback(type[$(this).index()]);

    alertClose($alert);
  });
}


//loading
function loading(){
  const loadingHtml = `<div class="loading-bar">
		<div class="three-bounce">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>`

  const $loading = $(loadingHtml);  
  $('.wrap').append($loading);  
  $('body, html').css('overflow', 'hidden');
}
function loadingClose(){
  $('.loading-bar').remove();  
  $('body, html').css('overflow', '');
}

$(function(){
  categoryMenu();
  listAlign();
  scrollCheck();
  dateSet();
  popTooltip();
  allChk();
  tabEvt();
  tabScrollEvt();
  posFixed('.title-main-wrap')
  fixedFooter();
  comma();
  countInput('[data-evt*="inp-number"]');
  maxLengthChk('[type=number][maxlength]');
  toggleBtns();
  datepicker();
});

$(window).on('scroll', function(){
  $('.total-search-layer').hide();
});