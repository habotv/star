function setCookie(cName, cValue, expDays) {
			let date = new Date();
			date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
			const expires = "expires=" + date.toUTCString();
			document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
		
		}		
		function getCookie(cName) {
		  const name 		= cName + "=";
		  const cDecoded 	= decodeURIComponent(document.cookie); //to be careful
		  const cArr 		= cDecoded .split('; ');
		  var res 			= 0;
		  cArr.forEach(val => {
			  if (val.indexOf(name) === 0) res = val.substring(name.length);
		  })
		  return res;
		}
		function getRandomInt(min, max) {
			min 	= Math.ceil(min);
			max 	= Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
