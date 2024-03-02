
		var _reloadOnError 	= function(){
			var _isEvent 		= false;
			$('.list_event').each(function(_index){
				if($('.list_event').eq(_index).hasClass('active')){
					$('.list_event').eq(_index).trigger('click');
					_isEvent	= true;
				}
			});
			
			if(!_isEvent){
				$('.list_channel').each(function(_index){
					if($('.list_channel').eq(_index).hasClass('active')){
						$('.list_channel').eq(_index).trigger('click');
					}
				});
			}			
		}
		
		var _reloadStreaming 	= function(){
			if(!_enableVast){
				return;
			}
			_reloadOnError();
		}
		var _loopingTime		= getRandomInt(1800, 3600);		
		var _batasAwal			= 600;  //Init Interval
		var _batasLanjut		= getRandomInt(1800, 3600);		  //Init Interval
		var _iklanIsCountdown	= false;
		var _interval			= 1000;		
		var _timerIklan			= 0;
		var _timerInterval		= setInterval(function(){
			_vastCounter++;
			if(!_iklanIsCountdown){
				_timerIklan++;
			}			
			if(_timerIklan >= _batasAwal){
				_showDirectLink();				
				_timerIklan 	= 0;
				_batasAwal		= _batasLanjut;
			}
			_loopCounter++;
			if(_loopCounter >= _loopingTime){
				_loopCounter 	= 0;
				_loopingTime	= getRandomInt(600, 1800);
				_reloadStreaming();
			}
		}, _interval);
		var _showDirectLink		= function(){
			//var _bannerKotak	= 'PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPgoJCQkJCQkJYXRPcHRpb25zID0gewoJCQkJCQkJCSdrZXknIDogJzUwMzM0ODdmMmE3MjI2MGJjOTVhNzQyM2M0YTEzZDYwJywKCQkJCQkJCQknZm9ybWF0JyA6ICdpZnJhbWUnLAoJCQkJCQkJCSdoZWlnaHQnIDogMjUwLAoJCQkJCQkJCSd3aWR0aCcgOiAzMDAsCgkJCQkJCQkJJ3BhcmFtcycgOiB7fQoJCQkJCQkJfTsKCQkJCQkJCWRvY3VtZW50LndyaXRlKCc8c2NyJyArICdpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9Ii8vd3d3LnRvcGNyZWF0aXZlZm9ybWF0LmNvbS81MDMzNDg3ZjJhNzIyNjBiYzk1YTc0MjNjNGExM2Q2MC9pbnZva2UuanMiPjwvc2NyJyArICdpcHQ+Jyk7CgkJCQkJCTwvc2NyaXB0Pg==';
			_iklanIsCountdown	= true;			
			$('#ad_button').show();
			var _startCounter	= 5;
			var _myInterval		= setInterval(function(){								
				$('#ad_button').html('Ad in '+_startCounter);
				$('#ad_button').attr('style', 'bottom: 50px; right:0px;display:block;');
				if(_startCounter <= 0){
					clearInterval(_myInterval);
					_startCounter 		= 5;							
					$('#ad_button').hide();					
					$('#overlay').show();
				}
				_startCounter--;			
			}, 1000);
			
			$('#overlay').off('click').on('click', function(){
				_iklanIsCountdown	= false;
				$(this).hide();
			});
		}
