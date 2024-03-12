			var _enableVast			= true;
			var _directSource 		= 'aHR0cHM6Ly9kMzVqNTA0ejB4MnZ1Mi5jbG91ZGZyb250Lm5ldC92MS9tYXN0ZXIvMGJjOGU4Mzc2YmQ4NDE3YTFiNjc2MTEzOGFhNDFjMjZjNzMwOTMxMi9iZWluLXNwb3J0cy14dHJhLWVuLWVzcGFub2wvcGxheWxpc3QubTN1OA==';
			var _loopCounter		= 0;
			var _vastMinCounter		= 60;
			var _vastCounter		= 0;						
			var playerInstance 		= jwplayer("player");
			document.oncontextmenu 	= function() {
			};
			$('#sports_tv_container').scroll(function(i){			
				var _scrollTop = $('#sports_tv_container').scrollTop();
				setCookie('scroll_position', _scrollTop, 1);
			});
			
			$('#live_tv_container').scroll(function(i){			
				var _scrollTop = $('#live_tv_container').scrollTop();
				setCookie('entertainment_scroll_position', _scrollTop, 1);
			});
			
			$('#events_container').scroll(function(i){			
				var _scrollTop = $('#events_container').scrollTop();
				setCookie('event_scroll_position', _scrollTop, 1);
			});
			
			var _bodyWidth          = window.innerWidth;
			var _bodyHeight         = window.innerHeight;         
			
			$(window).resize(function(){
				_onResize(true);
			});
			var _vastScheduler		= function(){
				var _schedule = [
					{
						"offset":"pause",
						"tag":""
					}
				];
				if(!_enableVast){
					return _schedule;
				}
				if(_vastCounter >= _vastMinCounter){
					_vastCounter	= 0;
					_vastMinCounter = getRandomInt(120, 300);
					_schedule = [					
						{
							"offset":"pre",
							"tag": ""
						}						
					];
				}
				return _schedule
			}

			var _onResize = function(_isResize){
				_bodyWidth          = window.innerWidth;
				_bodyHeight         = window.innerHeight;
				var _ratio          = 16/9;
				var _wrapperWidth   = document.getElementById('player_wrapper').clientWidth;
				var _wrapperHeight  = document.getElementById('player_wrapper').clientHeight;            
				var _wrapperRatio   = _wrapperWidth/_wrapperHeight;            
				_initPlayer(_wrapperWidth, _wrapperHeight, _isResize);
				
				/*if(screen.orientation.type == 'landscape-primary'){
					//$('#main-body').attr('style', ' rotate: 0deg;width:100vw;height:100vh;display:flex;position:fixed;top:0px;left:0px;');
					
				} else {
					//$('#main-body').attr('style', ' rotate: 90deg;;width:100vh;height:100vw;display:flex;position:fixed;bottom:0px;right:0px;');
				
				}*/
				
				var _channels       			= document.getElementById('channels').clientHeight;
				var _wrapper_panel_header       = document.getElementById('wrapper_panel_header').clientHeight;
				var _footer_container       	= document.getElementById('footer_container').clientHeight;
				var _channel_container			= parseInt(_channels - (_wrapper_panel_header+_footer_container));
				$('#channel_container').attr('style', 'height:'+(_channel_container-55)+'px!important');
				if(screen.orientation.type == 'landscape-primary'){

                  $('#banner').attr('style', '');
				} else {
					
					var _channelsWidth       	= document.getElementById('banner').clientWidth;
					var _marginLeft				= parseInt((_channelsWidth - 320)/2);				
					$('#banner').attr('style', 'padding-left:'+_marginLeft+'px;height:0px;background:#96A496');
				}

                  /* $('#banner').find('iframe').off('load').on('load', function(){
					_onResize(false);
				}); */
				setTimeout(function(){
					_channels       			= document.getElementById('channels').clientHeight;
					_wrapper_panel_header       = document.getElementById('wrapper_panel_header').clientHeight;
					_footer_container       	= document.getElementById('footer_container').clientHeight;
					_channel_container			= parseInt(_channels - (_wrapper_panel_header+_footer_container));
					$('#channel_container').attr('style', 'height:'+(_channel_container-5)+'px!important');
				}, 10000);
			}
			
			
			
			var _rebuildPlayer = function(_source, _target, _event){				
				var _jsonData 		= JSON.parse(atob(_source));
				window.history.pushState({"pageTitle":_jsonData.nama_channel+' - Mainton'},"", _target);
				
				//window.parent._changeState('test ajah', 'test.html');
				//console.clear();
				
				
				
				if(_event != null && typeof _event != 'undefined'){
					_event.preventDefault();
				}
				if(typeof _jsonData.nama_event == 'undefined'){
					document.title 		= 'Live Streaming '+_jsonData.nama_channel;
				} else {
					document.title 		= _jsonData.player_1+' VS '+_jsonData.player_2+' - Live Streaming '+_jsonData.nama_event;
				}				
				
												if(_type == 'events'){										
					var _countdownEvent = new Date(_jsonData.jadwal_event).getTime();
					var _now 			= new Date().getTime();
					var _distance 		= _countdownEvent - _now;
					if(_distance > 0){
						if(playerInstance != null){
							playerInstance.remove();
						}
						jwplayer("player").remove();
						playerInstance 	= null;
						if(_jsonData.nama_event.toLowerCase() == 'caf africa cup of nations'){
							$('#player_wrapper').attr('style', 'background-image:linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%), url(https://www.cafonline.com/media/gdgf5rol/agxswzwn76qqeum51its.png);background-repeat:no-repeat;background-size:cover;background-position:center center;');
						} else if(_jsonData.nama_event.toLowerCase() == 'afc asian cup'){
							$('#player_wrapper').attr('style', 'background-image:linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%), url(https://production.togglestatic.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%277196980%27&EntityType=%27LinearSchedule%27&EntityId=%27ec37b5b7-1bec-46ce-9367-d0b37c5029ac%27&Width=1080&Height=608&ResizeAction=%27fill%27&HorizontalAlignment=%27center%27&VerticalAlignment=%27top%27);background-repeat:no-repeat;background-size:cover;background-position:center center;');
						} else {
							$('#player_wrapper').attr('style', 'background-image:linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%), url(/engine/pwa/img/stadium.avif);background-repeat:no-repeat;background-size:cover;background-position:center center;');												
						}
						
						var _timerContent = '<div style="margin-bottom:8px;font-size:30px;">'+_countDownPlay(_jsonData.jadwal_event)+'</div><div>'+_jsonData.player_1+'&nbsp;<img style="max-width:20px!important;border-radius:2px!important" alt="'+_jsonData.player_1+'" src="'+_jsonData.logo_1+'" height="15px" />&nbsp;'+' vs '+'&nbsp;<img style="max-width:20px!important;border-radius:2px!important" alt="'+_jsonData.player_2+'" src="'+_jsonData.logo_2+'" height="15px" />&nbsp;'+_jsonData.player_2+'</div><div style="font-size:15px!important;margin-top:8px;">Kickoff '+_date(_jsonData.jadwal_event)+' '+_time(_jsonData.jadwal_event)+'</div>';
						$('#timer').html(_timerContent);
						$('#timer').show();
						_intervalPlay = setInterval(function(){							
							var _countdownEvent = new Date(_jsonData.jadwal_event).getTime();
							var _now 			= new Date().getTime();
							var _distance 		= _countdownEvent - _now;
							if(_distance <= 0){								
								$('.list_event').each(function(_index){
									var _idEvent = $(this).attr('data-id');
									if(_jsonData.id_event == _idEvent){
										$(this).trigger('click');		
										_reformatTime();										
										clearInterval(_intervalPlay);
									}
								});
								/* Reload Page */
								//location.reload(); 
							}
							
							_timerContent = '<div style="margin-bottom:8px;font-size:30px;">'+_countDownPlay(_jsonData.jadwal_event)+'</div><div>'+_jsonData.player_1+'&nbsp;<img style="max-width:20px!important;border-radius:2px!important" alt="'+_jsonData.player_1+'" src="'+_jsonData.logo_1+'" height="15px" />&nbsp;'+' vs '+'&nbsp;<img style="max-width:20px!important;border-radius:2px!important" alt="'+_jsonData.player_2+'" src="'+_jsonData.logo_2+'" height="15px" />&nbsp;'+_jsonData.player_2+'</div><div style="font-size:15px!important;margin-top:8px;">Kickoff '+_date(_jsonData.jadwal_event)+' '+_time(_jsonData.jadwal_event)+'</div>';
							$('#timer').html(_timerContent);
						}, 500);						
						return false;
					} else {
						if(_intervalPlay != null){
							clearInterval(_intervalPlay);
						}
					}						
				}
								
				_intervalPlay 		= null;
				$('#timer').hide();
				var _playerWidth 	= document.getElementById('player_wrapper').clientWidth;
				var _playerHeight 	= document.getElementById('player_wrapper').clientHeight;
				if(playerInstance != null){
					playerInstance.remove();
				}
				jwplayer("player").remove();
				playerInstance = null;
				playerInstance = jwplayer("player");
			
				
				
				if(_jsonData.jenis == 'hls'){		
					playerInstance.setup({
						playlist: [{
                            "image": "https://cdn.jsdelivr.net/gh/habotv/star@master/maintons.png",
							"title": _jsonData.nama_channel+" - Mainton", 
							"sources": [
								{
									"default": false,                            
									"file": _jsonData.url_iptv,                          									
									"label": "0"
								}
							]
						}],
						width:_playerWidth+'px',
						height: _playerHeight+'px',
						advertising: {
							client: "vast",
							schedule: _vastScheduler()
						},
						aspectratio: "16:9",
						primary: 'html5',						
						setFullscreen: true,
						displaytitle: true,
                      stretching: "uniform",
						autostart: false,
						logo: {
							file: '',
							link: '/',
							position: 'top-right',
							hide: "false"
						},
						cast:{},
						sharing: {
							"sites": ["reddit", "facebook", "twitter"]
						},
						skin: {
							controlbar: {
								"background": "rgba(0,0,0,0)",
								"icons": "rgba(255,255,255,1)",
								"iconsActive": "#FFFFFF",
								"text": "#FFFFFF"
							},
							menus: {
								"background": "#333333",
								"text": "rgba(255,255,255,0.8)",
								"textActive": "#FFFFFF"
							},
							timeslider: {
								"progress": "#F2F2F2",
								"rail": "rgba(255,255,255,0.3)"
							},
							tooltips: {
								"background": "#FFFFFF",
								"text": "#000000"
							}
						}
					}).on('ready', function () {
						_isFullScreen = jwplayer().getFullscreen();
					}).on('error', function(){
						$('.jw-error-text').html('An unexpected error occurred, <span class="jw-break jw-reset"></span>always use <strong>Chrome Browser</strong> and <strong> Hub. Admin Mainton</strong> !!!');					   
						/* setTimeout(function(){
							$('.jw-error-text').html('An unexpected error occurred, <span class="jw-break jw-reset"></span>always use <strong>Chrome Browser</strong> or <strong>UC Browser</strong> !!!');					   
						}, 100); */
						setTimeout(function(){
							console.log('Replaying');
							_reloadOnError();
						}, 5000);
						
					});
				} else if(_jsonData.jenis == 'dash-clearkey'){
					var _key = _jsonData.url_license.split(':');
					playerInstance.setup({        
						playlist: [{
                            "image": "https://cdn.jsdelivr.net/gh/habotv/star@master/maintons.png",
							"title": _jsonData.nama_channel+" - Mainton",
							"sources": [
								{
									"default": true,                            
									"file": _jsonData.url_iptv,
									"type": "dash",
									"drm": {
										"clearkey": { "keyId": _key[0], "key": _key[1] }
									},                            									
									"label": "0",
								}
							]
						}],
						width:_playerWidth+'px',
						height: _playerHeight+'px',
						advertising: {
							client: "vast",
							schedule: _vastScheduler()
						},
						aspectratio: "16:9",
						primary: 'html5',
						
						setFullscreen: true,
						displaytitle: true,
                      stretching: "uniform",
						autostart: false,
						logo: {
							file: '',
							link: '/',
							position: 'top-right',
							hide: "false"
						},
						cast:{},
						sharing: {
							"sites": ["reddit", "facebook", "twitter"]
						},
						skin: {
							controlbar: {
								"background": "rgba(0,0,0,0)",
								"icons": "rgba(255,255,255,1)",
								"iconsActive": "#FFFFFF",
								"text": "#FFFFFF"
							},
							menus: {
								"background": "#333333",
								"text": "rgba(255,255,255,0.8)",
								"textActive": "#FFFFFF"
							},
							timeslider: {
								"progress": "#F2F2F2",
								"rail": "rgba(255,255,255,0.3)"
							},
							tooltips: {
								"background": "#FFFFFF",
								"text": "#000000"
							}
						}
					}).on('ready', function () {
						_isFullScreen = jwplayer().getFullscreen();
					}).on('error', function(){
						$('.jw-error-text').html('An unexpected error occurred, <span class="jw-break jw-reset"></span>always use <strong>Chrome Browser</strong> and <strong> Hub. Admin Mainton</strong> !!!');					   
						/* setTimeout(function(){
							$('.jw-error-text').html('An unexpected error occurred, <span class="jw-break jw-reset"></span>always use <strong>Chrome Browser</strong> or <strong>UC Browser</strong> !!!');					   
						}, 100); */
						setTimeout(function(){
							console.log('Replaying');
							_reloadOnError();
						}, 5000);
						
					});
				} else if(_jsonData.jenis == 'dash-widevine'){
					
					var _headerLicense 			= _jsonData.header_license;
					var _renderedHeaderLicense  = [];		
					for(var _key in _headerLicense) {
					   console.log(_key, _headerLicense[_key]);
					   _renderedHeaderLicense.push({"name":_key, "value":_headerLicense[_key]})
					}
					
					var _key = _jsonData.url_license.split(':');
					playerInstance.setup({        
						playlist: [{
							"title": _jsonData.nama_channel+" - Mainton",
							"sources": [
								{
                                    "image": "https://cdn.jsdelivr.net/gh/habotv/star@master/maintons.png",
									"default": false,                            
									"file": _jsonData.url_iptv,
									"type": "dash",
									"drm": {
										
										"widevine": {
										  "url": _jsonData.url_license,
										  "headers": _renderedHeaderLicense
										}
									},                            									
									"label": "0"
								}
							]
						}],
						width:_playerWidth+'px',
						height: _playerHeight+'px',
						advertising: {
							client: "vast",
							schedule: _vastScheduler()
						},
						aspectratio: "16:9",
						primary: 'html5',
						
						setFullscreen: true,
						displaytitle: true,
                      stretching: "uniform",
						autostart: false,
						logo: {
							file: '',
							link: '/',
							position: 'top-right',
							hide: "false"
						},
						cast:{},
						sharing: {
							"sites": ["reddit", "facebook", "twitter"]
						},
						skin: {
							controlbar: {
								"background": "rgba(0,0,0,0)",
								"icons": "rgba(255,255,255,1)",
								"iconsActive": "#FFFFFF",
								"text": "#FFFFFF"
							},
							menus: {
								"background": "#333333",
								"text": "rgba(255,255,255,0.8)",
								"textActive": "#FFFFFF"
							},
							timeslider: {
								"progress": "#F2F2F2",
								"rail": "rgba(255,255,255,0.3)"
							},
							tooltips: {
								"background": "#FFFFFF",
								"text": "#000000"
							}
						}
					}).on('ready', function () {
						_isFullScreen = jwplayer().getFullscreen();
					}).on('error', function(){
						$('.jw-error-text').html('An unexpected error occurred, <span class="jw-break jw-reset"></span>always use <strong>Chrome Browser</strong> and <strong> Hub. Admin Mainton</strong> !!!');					   
						/* setTimeout(function(){
							$('.jw-error-text').html('An unexpected error occurred, <span class="jw-break jw-reset"></span>always use <strong>Chrome Browser</strong> or <strong>UC Browser</strong> !!!');					   
						}, 100); */
						setTimeout(function(){
							console.log('Replaying');
							_reloadOnError();
						}, 5000);
					});
				}
			}
		
			var _countDownPlay = function(_playTime){
				var countDownDate = new Date(_playTime).getTime();
				var now 		= new Date().getTime();				  
				var distance 	= countDownDate - now;
				var days 		= Math.floor(distance / (1000 * 60 * 60 * 24));
				var hours 		= Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes 	= Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds 	= Math.floor((distance % (1000 * 60)) / 1000);
				if(days > 0){
					var _result 	= '<div style="background:url(https://statics.1mv.xyz/img/player/icon_none@2x.png); background-repeat:no-repeat;background-size:80px 80px; background-position:center center;height:80px;margin-bottom:20px">&nbsp;</div><span style="width:65px;display:inline-block;text-align:center;">'+days.toString().padStart(2, '0') + 'd</span>&nbsp;:&nbsp;<span style="width:65px;display:inline-block;text-align:center;">' + hours.toString().padStart(2, '0') + 'h</span>&nbsp;:&nbsp;<span style="width:65px;display:inline-block;text-align:center;">'+ minutes.toString().padStart(2, '0') + 'm</span>&nbsp;:&nbsp;<span style="width:65px;display:inline-block;text-align:center;">' + seconds.toString().padStart(2, '0')+'s</span>';
				} else {
					var _result 	= '<div style="background:url(https://statics.1mv.xyz/img/player/icon_none@2x.png); background-repeat:no-repeat;background-size:80px 80px; background-position:center center;height:80px;margin-bottom:20px">&nbsp;</div><span style="width:65px;display:inline-block;text-align:center;">' + hours.toString().padStart(2, '0') + 'h</span>&nbsp;:&nbsp;<span style="width:65px;display:inline-block;text-align:center;">'+ minutes.toString().padStart(2, '0') + 'm</span>&nbsp;:&nbsp;<span style="width:65px;display:inline-block;text-align:center;">' + seconds.toString().padStart(2, '0')+'s</span>';
				}
				return _result;
			}
			
			var _initPlayer = function(_playerWidth, _playerHeight, _isResize){
				//$.get('https://sports.duktek.online/resolution/'+_playerWidth+'x'+_playerHeight+'.html');
								if(_type == 'events'){
					if(_intervalPlay != null){
						clearInterval(_intervalPlay);
					}
					var _jsonData 		= JSON.parse(atob(_currData)); 
					var _countdownEvent = new Date(_jsonData.jadwal_event).getTime();
					var _now 			= new Date().getTime();
					var _distance 		= _countdownEvent - _now;
					if(_distance > 0){
						$('#timer').show();
						//$('#player_wrapper').attr('style', 'background-image:linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%), url(/engine/pwa/img/stadium.avif);background-repeat:no-repeat;background-size:cover;background-position:center center;');
						if(_jsonData.nama_event.toLowerCase() == 'caf africa cup of nations'){
							$('#player_wrapper').attr('style', 'background-image:linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%), url(aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2hhYm90di9jZG5AbWFzdGVyL3JrdHBsYXlzLmpwZw==);background-repeat:no-repeat;background-size:cover;background-position:center center;');
						} else if(_jsonData.nama_event.toLowerCase() == 'afc asian cup'){
							$('#player_wrapper').attr('style', 'background-image:linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%), url(aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2hhYm90di9jZG5AbWFzdGVyL3JrdHBsYXlzLmpwZw==);background-repeat:no-repeat;background-size:cover;background-position:center center;');
						} else {
							$('#player_wrapper').attr('style', 'background-image:linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%), url(aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2hhYm90di9jZG5AbWFzdGVyL3JrdHBsYXlzLmpwZw==);background-repeat:no-repeat;background-size:cover;background-position:center center;');
						}
						var _timerContent = '<div style="margin-bottom:8px;font-size:30px;">'+_countDownPlay(_jsonData.jadwal_event)+'</div><div>'+_jsonData.player_1+'&nbsp;<img style="max-width:20px!important;border-radius:2px!important" alt="'+_jsonData.player_1+'" src="'+_jsonData.logo_1+'" height="15px" />&nbsp;'+' vs '+'&nbsp;<img style="max-width:20px!important;border-radius:2px!important" alt="'+_jsonData.player_2+'" src="'+_jsonData.logo_2+'" height="15px" />&nbsp;'+_jsonData.player_2+'</div><div style="font-size:15px!important;margin-top:8px;">Kickoff '+_date(_jsonData.jadwal_event)+' '+_time(_jsonData.jadwal_event)+'</div>';
						$('#timer').html(_timerContent);
						$('#timer').show();
						_intervalPlay = setInterval(function(){							
							var _countdownEvent = new Date(_jsonData.jadwal_event).getTime();
							var _now 			= new Date().getTime();
							var _distance 		= _countdownEvent - _now;
							if(_distance <= 0){								
								clearInterval(_intervalPlay);
								$('.list_event').each(function(_index){
									var _idEvent = $(this).attr('data-id');
									if(_jsonData.id_event == _idEvent){
										$(this).trigger('click');										
										_reformatTime();
									}
								});
							}
							_timerContent = '<div style="margin-bottom:8px;font-size:30px;">'+_countDownPlay(_jsonData.jadwal_event)+'</div><div>'+_jsonData.player_1+'&nbsp;<img style="max-width:20px!important;border-radius:2px!important" alt="'+_jsonData.player_1+'" src="'+_jsonData.logo_1+'" height="15px" />&nbsp;'+' vs '+'&nbsp;<img style="max-width:20px!important;border-radius:2px!important" alt="'+_jsonData.player_2+'" src="'+_jsonData.logo_2+'" height="15px" />&nbsp;'+_jsonData.player_2+'</div><div style="font-size:15px!important;margin-top:8px;">Kickoff '+_date(_jsonData.jadwal_event)+' '+_time(_jsonData.jadwal_event)+'</div>';
							$('#timer').html(_timerContent);
						}, 500);
						return;
					}										
				} else {
					$('#timer').hide();
				}
								
								
				_intervalPlay 		= null;
				if(_isResize){
					playerInstance.resize(_playerWidth, _playerHeight);
					return;
				} else {
					playerInstance = jwplayer("player");
										playerInstance.setup({
						playlist: [{
                            "image": "https://cdn.jsdelivr.net/gh/habotv/star@master/maintons.png",
							"title": "Mainton - Badminton",
							"sources": [
								{
									"default": false,                            
									"file": atob(_directSource),
									"label": "0"
								}
							]
						}],
						width:_playerWidth+'px',
						height: _playerHeight+'px',
						advertising: {
							client: "vast",
							schedule: _vastScheduler()
						},
						aspectratio: "16:9",
						primary: 'html5',
						
						setFullscreen: true,
						displaytitle: true,
                                         stretching: "uniform", 
						autostart: false,
						logo: {
							file: '',
							link: '/',
							position: 'top-right',
							hide: "false"
						},
						cast:{},
						sharing: {
							"sites": ["reddit", "facebook", "twitter"]
						},
						skin: {
							controlbar: {
								"background": "rgba(0,0,0,0)",
								"icons": "rgba(255,255,255,1)",
								"iconsActive": "#FFFFFF",
								"text": "#FFFFFF"
							},
							menus: {
								"background": "#333333",
								"text": "rgba(255,255,255,0.8)",
								"textActive": "#FFFFFF"
							},
							timeslider: {
								"progress": "#F2F2F2",
								"rail": "rgba(255,255,255,0.3)"
							},
							tooltips: {
								"background": "#FFFFFF",
								"text": "#000000"
							}
						}
					}).on('ready', function () {
						_isFullScreen = jwplayer().getFullscreen();
					}).on('error', function(){
						$('.jw-error-text').html('An unexpected error occurred, <span class="jw-break jw-reset"></span>always use <strong>Chrome Browser</strong> and <strong> Hub. Admin Mainton</strong> !!!');					   
						/* setTimeout(function(){
							$('.jw-error-text').html('An unexpected error occurred, <span class="jw-break jw-reset"></span>always use <strong>Chrome Browser</strong> or <strong>UC Browser</strong> !!!');					   
						}, 100); */
						setTimeout(function(){
							console.log('Replaying');
							_reloadOnError();
						}, 500);
					});
									}
				//playerInstance.pause();				
				//playerInstance.play();				
			}
