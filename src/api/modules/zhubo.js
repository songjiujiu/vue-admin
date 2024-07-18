import fetch from 'src/fetch'
import * as zbUrl from '../constant/zhubo'

// 主播列表
export const zbindex = (data) => {
    return fetch({
      url: zbUrl.zbindex,
      method: 'get',
      data
    })
  }

//主播信息页面
export const zbmessage = (data) => {
  return fetch({
    url: '/anchor/'+data+'/live',
    method: 'get',
  })
}

//主播记录
export const zbrecords = (data) => { 
  return fetch({
    url: zbUrl.zbrecords,
    method: 'post',
    data
  })
}

//主播档案  zbManage
export const zbprofile = (data) => { 
  return fetch({
    url: '/anchor/'+data+'/profile',
    method: 'get',
    data
  })
}

//主播管理  
export const zbManage = (data) => { 
  return fetch({
    url: zbUrl.zbManage,
    method: 'get',
    data
  })
}

//主播续期 
export const zbRenewal = (data) => { 
  return fetch({
    url: zbUrl.zbRenewal,
    method: 'post',
    data
  })
}

//添加付费 
export const zbPayadd = (data) => { 
  return fetch({
    url: zbUrl.zbPayadd,
    method: 'post',
    data
  })
}

//取消关注主播  
export const zbGroupdel = (data) => { 
  return fetch({
    url: zbUrl.zbGroupdel,
    method: 'post',
    data
  })
}