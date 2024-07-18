<!--
/**
 * @intro: 基本表格.
 */
-->
<template>
  <ui-container>
    <div slot="header" style="width: 100%; overflow: hidden;">
      <div class="header-left" style="float:left; padding-top: 30px;">
          <div class="head-img"><img :src="zbprofileData.role_avatar" /></div>
          <div class="text-content-pople"><span>{{zbprofileData.role_name}}</span></div>
      </div>
      <div style="width:80%; overflow: hidden; float:right;">
        <div class="top-content" style="overflow: hidden;">
          <span><font>性别：</font><i>{{zbprofileData.role_attr_data.sex}}</i></span>
          <span><font>生日：</font><i>{{zbprofileData.role_attr_data.birth}}</i></span>
          <span><font>城市：</font><i>{{zbprofileData.role_attr_data.city}}</i></span>
          <span><font>电话号码：</font><i>{{zbprofileData.role_attr_data.phone}}</i></span>
          <span><font>微信号：</font><i>{{zbprofileData.role_attr_data.wechat}}</i></span>
          <span><font>QQ：</font><i>{{zbprofileData.role_attr_data.qq}}</i></span>
          <span><font>详细地址：</font><i>{{zbprofileData.role_attr_data.addr}}</i></span>
        </div>
      </div>
    </div>
    <div>
      <div style="width:49%; float:left; text-align:center;">
        <div style="width:100%; height:150px; border:1px solid #eee;"></div>
        <div style="margin-top:5px">打赏记录</div>
      </div>
      <div style="width:49%; float:right; text-align:center;">
        <div style="width:100%; height:150px; border:1px solid #eee;"></div>
        <div style="margin-top:5px">上线记录</div>
      </div>
    </div>
    <div class="text-bottom" style="width:100%; overflow:hidden;">
      <div>
        <span>标签：{{zbprofileData.shared_tags}}</span>
      </div>
      <div>
        <span>自定义标签：</span>
      </div>
      <div>
        <span>自定义算法：</span>
      </div>
      <div>
        <span>自定义描述：</span>
      </div>
    </div>
    <div style="position:absolute; right:10px; bottom:10px;"><el-button type="primary">编辑档案</el-button></div>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'TableBase',
  data(){
    return{
      zbprofileData:{},
    }
  },
   mounted(){
     this.zbfileItemFn()
  },
  methods: {
    async zbfileItemFn(){
      const {$refs, $api, form, $message, $notify, setUserInfo, $router} = this
      const roleIdNum = this.$route.query.roleId
      try{
        const result = await $api.zhubo.zbprofile(roleIdNum)
        this.zbprofileData = result.data.profile
      }catch(error){
        console.log(error)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.head-img{
  width: 31px;
  height: 32px;
  margin-right: 8px;
  margin-top: 8px;
  float: left;
}
.text-content-pople{
  line-height: 50px;
  float: left;
  color: #65c2ee;
}
.top-content span{
  width: 33%;
  float: left;
  margin-top: 15px;
}
.top-content span i{
  font-style: normal;
}
.text-bottom div{margin-top: 10px;}
</style>
