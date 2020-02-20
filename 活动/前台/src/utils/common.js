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
  let cookieName = ['mi1','img','name'];
  let userInfo = {}
  cookieName.forEach( (val,key) => {
	var cookieValue = null;//返回cookie的value值 
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');//将获得的所有cookie切割成数组 
		for (var i = 0; i < cookies.length; i+=1) {
			var cookie = cookies[i];//得到某下标的cookies数组 
			if (cookie.substring(0, val.length + 2).trim() == val.trim()+ "=") {//如果存在该cookie的话就将cookie的值拿出来 
				cookieValue = unescape(cookie.substring(val.length + 2,cookie.length));
				var data = cookieValue.split(',')[0];
				if(val == 'img')
				{
					data = data ? (data.indexOf('http') == 0 ? data : '//img.dusun.com.cn/uploadimg/' + data) : ''
				}
				userInfo[key == 0 ? 'mid' : val] = data
			}
		}	
	}
  })
  return userInfo
}
