import fetch from 'src/fetch'
import * as zbUrl from '../constant/eldestbrother'
//主播管理  
export const golddaddy = (data) => { 
    return fetch({
      url: zbUrl.golddaddy,
      method: 'get',
      data
    })
}

//大哥信息  
export const golddaddyIdProfile = (data) => { 
    return fetch({
      url: '/golddaddy/'+data+'/profile',
      method: 'get',
      data
    })
}

//大哥档案 
export const golddaddyIdLive = (data) => { 
    return fetch({
      url: '/golddaddy/'+data+'/live',
      method: 'get',
      data
    })
}

//大哥记录  
export const goldrRecords = (data) => { 
    return fetch({
      url: zbUrl.goldrRecords,
      method: 'post',
      data
    })
  }

