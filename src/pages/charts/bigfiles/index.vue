<!--
/**
 * @intro: 基本表格.
 */
-->
<template>
  <ui-container>
    <div slot="header" style="width: 100%; overflow: hidden;">
      <div class="header-left" style="float:left; padding-top: 30px;">
          <div class="head-img"><img :src="eldestfileData.role_avatar" /></div>
          <div class="text-content-pople"><span>{{eldestfileData.role_name}}</span></div>
      </div>
      <div style="width:80%; overflow: hidden; float:right;">
        <div class="top-content" style="overflow: hidden;">
          <span><font>性别：</font><i>{{eldestfileData.role_attr_data.sex}}</i></span>
          <span><font>生日：</font><i>{{eldestfileData.role_attr_data.birth}}</i></span>
          <span><font>城市：</font><i>{{eldestfileData.role_attr_data.city}}</i></span>
          <span><font>电话号码：</font><i>{{eldestfileData.role_attr_data.phone}}</i></span>
          <span><font>微信号：</font><i>{{eldestfileData.role_attr_data.wechat}}</i></span>
          <span><font>QQ：</font><i>{{eldestfileData.role_attr_data.qq}}</i></span>
          <span><font>详细地址：</font><i>{{eldestfileData.role_attr_data.addr}}</i></span>
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
    <div class="sea-box" style="width:100%; overflow:hidden;">
      <div>
        <span>观看主播：</span>
        <span>
          <i v-for="(item,index) in eldestfileData.out_see_anchor" :key="index">{{item.role_name}}</i>
        </span>
      </div>
      <div>
        <span>打赏主播：</span>
        <span>
          <i v-for="(item,index) in eldestfileData.out_gift_anchor" :key="index">{{item.role_name}}</i>
        </span>
      </div>
      <div>
        <span>最高打赏：</span>
        <span>
          <i>{{eldestfileData.out_top_gift_record.anchor_role_name}}</i>
        </span>
        <span>打赏金额：</span>
        <span>
          <i>{{eldestfileData.out_top_gift_record.gift_monetary_value}}</i>
        </span>
      </div>
    </div>
    <div class="text-bottom" style="width:100%; overflow:hidden;">
      <div>
        <span>标签：{{eldestfileData.shared_tags}}</span>
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
    <!-- <div style="position:absolute; right:10px; bottom:10px;"><el-button type="primary">编辑档案</el-button></div> -->
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'TableBase',
  data(){
    return{
      eldestfileData:{},
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
        const result = await $api.eldestbrother.golddaddyIdProfile(roleIdNum)
        this.eldestfileData = result.data.profile
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
.sea-box div{
  width: 100%;
  overflow: hidden;
  margin-top: 15px; 
}
.sea-box span i{
  font-style: normal;
  margin-right: 10px;
  color: #65c2ee;
}
</style>
