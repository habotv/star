
		var _date = function(_myDate){
			const d 			= new Date(_myDate);	
			const t 			= new Date();	
			var _distance 		= d - t;
			const b = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
			];			
			var newDate = d.getDate().toString().padStart(2, '0')+', '+b[d.getMonth()]+' '+d.getFullYear();
			var nowDate = t.getDate().toString().padStart(2, '0')+', '+b[t.getMonth()]+' '+t.getFullYear();
			
			if(_distance > 0){
				if(newDate == nowDate){
					return 'Today';
				} else {
					return newDate;
				}
			} else {
				return '<img src="/engine/pwa/img/live.svg" height="15px" />';
			}
		}
		
		var _time = function(_myDate){
			const d 			= new Date(_myDate);	
			const t 			= new Date();	
			var _distance 		= d - t;
			var _timeZone 		= (_positive(d.getTimezoneOffset())/60);			
			var _waktuIndonesia =  '';
			if(_timeZone == 9){
				_waktuIndonesia = 'WIT';
			} else if(_timeZone == 8){
				_waktuIndonesia = 'WITA';
			} else if(_timeZone == 7){
				_waktuIndonesia = 'WIB';
			} else {
				if(_timeZone >= 0){
					_waktuIndonesia = 'GMT+'+(_positive(d.getTimezoneOffset())/60).toString().padStart(2, '0');
				} else {
					_waktuIndonesia = 'GMT'+(_positive(d.getTimezoneOffset())/60).toString().padStart(2, '0');
				}
			}
			var newDate = d.getHours().toString().padStart(2, '0')+':'+d.getMinutes().toString().padStart(2, '0')+' '+_waktuIndonesia;
			if(_distance > 0){
				return newDate.trim();
			} else {
				return '<span style="color:#65B741;font-weight:500">'+newDate.trim()+'</span>';
			}
		}

		var _positive = function(_number){			
			_number = _number * -1;
			return _number;
		}
		
		var _reformatTime = function(){
			$('.tanggal_event').each(function(_index){				
				var _myDate 		= _date($(this).attr('data-time'));				
				var _myStop			= $(this).attr('data-stop');
				var _myTarget		= $(this).attr('data-target');
				$(this).html(_myDate);
				const _dStop 		= new Date(_myStop);	
				const _dNow 		= new Date();	
				var _distance 		= _dStop - _dNow;
				if(_distance <= 0){
					$(_myTarget).fadeOut('slow');
				}
			});
			$('.waktu_event').each(function(_index){				
				var _myTime 		= _time($(this).attr('data-time'));			
				$(this).html(_myTime);
			});
		}
		
		var _slugify	= function(str) {
		  return String(str)
			.normalize('NFKD') // split accented characters into their base characters and diacritical marks
			.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
			.trim() // trim leading or trailing whitespace
			.toLowerCase() // convert to lowercase
			.replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
			.replace(/\s+/g, '-') // replace spaces with hyphens
			.replace(/-+/g, '-'); // remove consecutive hyphens
		}
		
		var _initDuktekSports	= function(){
			$('.list_channel').off('click').on('click', function(event){
				var _url 			= $(this).attr('data-url');
				var _source 		= $(this).attr('data-iptv');	
				_currData			= _source;
				_loopCounter		= 0;
				_type				= 'livetv';
				_idIptv				= $(this).attr('data-id');
				$('.list_channel').removeClass('active');
				$('.list_event').removeClass('active');
				$(this).addClass('active'); 
				if(_intervalPlay != null){
					clearInterval(_intervalPlay);
				}
				$('.nama_channel').attr('style', 'font-weight:400');
				$(this).find('.nama_channel').attr('style', 'font-weight:500');
				$('.list_event').removeClass('active');
				$('.nama_event').attr('style', 'font-weight:400');				
				$('.player_event').attr('style', 'font-weight:400');
				_rebuildPlayer(_source, _url, event);
				let _currentUrl 		= window.location.href.split('?')[0]
				var _bannerKotakIframe 	= btoa('<iframe title="Middle Banner" allowtransparency="true" scrolling="no" frameborder="0" framespacing="0" width="300" height="250" src="'+_currentUrl+'?iframe=large"></iframe>');			
				//var _bannerIframe		= btoa('<iframe title="Small Banner" allowtransparency="true" scrolling="no" frameborder="0" framespacing="0" width="320" height="50" src="'+_currentUrl+'?iframe=small"></iframe>');
			
				$('#banner-kotak').html(atob(_bannerKotakIframe));
				//$('#banner').html(atob(_bannerIframe));
				
				event.preventDefault();			
			});
			
			$('.list_event').off('click').on('click', function(event){
				var _url 			= $(this).attr('data-url');
				var _source 		= $(this).attr('data-iptv');
				_currData			= _source;
				var _json 			= JSON.parse(atob(_source));
				_idIptv				= _json.id_iptv;
				_idEvent			= _json.id_event;
				_loopCounter		= 0;
				_type				= 'events';
				if(_intervalPlay != null){
					clearInterval(_intervalPlay);
				}
				$('.list_event').removeClass('active');
				$(this).addClass('active'); 
				
				$('.nama_event').attr('style', 'font-weight:400');
				$(this).find('.nama_event').attr('style', 'font-weight:500');
				$('.player_event').attr('style', 'font-weight:400');
				$(this).find('.player_event').attr('style', 'font-weight:500');
				
				var _analytics = 'PCEtLSBHb29nbGUgdGFnIChndGFnLmpzKSAtLT4KPHNjcmlwdCBhc3luYyBzcmM9Imh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0YWcvanM/aWQ9Ry1SUURQWDRWWlMzIj48L3NjcmlwdD4KPHNjcmlwdD4KICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTsKICBmdW5jdGlvbiBndGFnKCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTt9CiAgZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTsKCiAgZ3RhZygnY29uZmlnJywgJ0ctUlFEUFg0VlpTMycpOwo8L3NjcmlwdD4=';
				$('#analytics').html(atob(_analytics));
				$('.list_channel').each(function(_index){
					if($('.list_channel').eq(_index).attr('data-id') == _json.id_iptv){
						$('.list_channel').removeClass('active');
						$('.nama_channel').attr('style', 'font-weight:400');
						$('.list_channel').eq(_index).find('.nama_channel').attr('style', 'font-weight:500');						
						$('.list_channel').eq(_index).addClass('active');
					}
				});
				_rebuildPlayer(_source, _url, event);
				let _currentUrl 		= window.location.href.split('?')[0]
				var _bannerKotakIframe 	= btoa('<iframe title="Middle Banner" allowtransparency="true" scrolling="no" frameborder="0" framespacing="0" width="300" height="250" src="'+_currentUrl+'?iframe=large"></iframe>');			
				//var _bannerIframe		= btoa('<iframe title="Small Banner" allowtransparency="true" scrolling="no" frameborder="0" framespacing="0" width="320" height="50" src="'+_currentUrl+'?iframe=small"></iframe>');
				
				$('#banner-kotak').html(atob(_bannerKotakIframe));
				//$('#banner').html(atob(_bannerIframe));
				
				
				event.preventDefault();
			});
			
			$('.copy_button').off('click').on('click', function(_event){
				var _myUrl = $(this).attr('data-url');
				_copy(_myUrl);
				_event.preventDefault();
			});
			
			if(_type == 'events'){
				$('.list_event').each(function(_index){
					var _currIdEvent 	= $(this).attr('data-id');
					var _currJson  		= JSON.parse(atob($(this).attr('data-iptv')));
					if(_currIdEvent == _idEvent){
						if(atob(_directSource) != _currJson.url_iptv){
							$('.list_event').eq(_index).trigger('click');
							console.log('Clicked');
						}
					}
				});
			}
		}
