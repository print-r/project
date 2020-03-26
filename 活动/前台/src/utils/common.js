/**
* 计算日期相差的天、时、分、秒
* @param {string} date 日期格式
*/
export function countDown(date) {
 //保存数据
 var dataTime = {};
 //当前时间
 var nowDate = new Date();
 //转换为时间戳
 var dateRep = date.replace(/\-/g, '/').substr(0, 19);
 dateRep = new Date(dateRep).getTime();

 //相差的总秒数
 var totalSeconds = parseInt((dateRep - nowDate) / 1000);
 //年
 var year = Math.floor(totalSeconds / 86400 / 365);
 totalSeconds = totalSeconds % (86400 * 365);
 //月
 var month = Math.floor(totalSeconds / 86400 / 30);
 totalSeconds = totalSeconds % (86400 * 30);
 //日
 var day = Math.floor(totalSeconds / 86400);
 totalSeconds = totalSeconds % 86400;
 //时
 var hour = Math.floor(totalSeconds / 3600);
 totalSeconds = totalSeconds % 3600;
 //分
 var minute = Math.floor(totalSeconds / 60);
 totalSeconds = totalSeconds % 60;
 //秒
 var second = totalSeconds;
 //保存数据
 dataTime = {
   days: size(day),
   hours: size(hour),
   minutes: size(minute),
   seconds: size(second)
 }
 return dataTime;
}

function size(data) {
  return data <= 9 ? '0' + data : data
}

//获取用户信息
export function getUserInfo()
{
  let cookieName = ['mi1','img','mn'];
  let userInfo = {}
  let cookieValue = document.cookie.split(';')
  if(cookieValue)
  {
	let data = null
	cookieName.forEach( (val,key) => {
		cookieValue.forEach( item => {
			data = item.split('=')
			if(data[0].replace(/\s+/g,"") == val)
			{
				if(val == 'img')
				{
					data[1] = data[1] ? (data[1].indexOf('http') == 0 ? data[1] : '//img.dusun.com.cn/uploadimg/' + data[1]) : ''
				}
				userInfo[key == 0 ? 'mid' : val] = key == 0 ? unescape(data[1]).split(',')[0]  : unescape(data[1])
			}
		})
	})
  }
  return userInfo
}

// 判断是否为微信浏览器
export function handleCheckWeiXin() 
{
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') 
	{
		return true; // 微信端
	} 
	else 
	{
		return false;
	}
}

/**
 * 跳转外链
 * @param {string} name [跳转名称]
 */
export function handleJumpUrl(path)
{
	let name = '';
	switch(path.toLowerCase())
	{
		case 'login':
			name = 'userLogin_index';
		break;
		case 'userinfo':
			name = 'my_index';
		break;
	}
	let url = process.env.NODE_ENV == 'production' ? process.env.BASE_API : 'http://localhost' + process.env.BASE_API
    window.location.href = `${url}/${name}.do`;
}