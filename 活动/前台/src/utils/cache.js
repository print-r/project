/**
 * 页面缓存时间
 * @param {object} vm vue对象
 */
const cache = vm => {
    if(!vm) throw new Error('缺少vue对象');
    //缓存时长（10分钟）
    let cacheTime = 1000 * 60 * 60 * .1
    //获取缓存时间
    let time = sessionStorage.getItem('cache_time')
    //当前时间
    let now = Date.now()
    if(!time)
    {
        //保存缓存时间
        sessionStorage.setItem('cache_time',now + cacheTime)
    }else
    {
        let mode = now > time ? 'handleRemove' : 'handleAdd';
        //添加、删除（缓存）
        vm[mode](vm.$options.name)

        if(mode == 'handleRemove')
        {
            //清除活动列表、个人中心缓存
            let list = ['Activity','Personal']

            list.forEach( val => {
                vm[mode](val)
            })
            //更新缓存时间
            sessionStorage.setItem('cache_time',now + cacheTime)
        }
    }
}

export default cache