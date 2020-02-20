const mutations = {
    handleAdd(state,name){
        if(state.keepAlive.indexOf(name) == -1) state.keepAlive.push(name)
    },
    handleRemove(state,name){
        let index = state.keepAlive.indexOf(name)
        if(index != -1)
        {
            state.keepAlive.splice(index,1)
        }
        // else
        // {
        //     throw new Error('找不到缓存组件名称');
        // }
    },
    handleSetColor(state,color)
    {
        state.color = color
    }
}

export default mutations