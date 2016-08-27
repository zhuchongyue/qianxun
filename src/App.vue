<template>
    <div class="app">
        <router-view keep-alive></router-view>
    </div>
</template>
<style lang="less">
    @import "App.less";
</style>
<script>

	import store from './vuex/store'

	//import Cookie from './libs/cookie.js'
	import Cookie from './libs/cookie.js'

	export default {
		store,

		ready(){

			var _this = this;
			_this.wxConfig();

			if(!localStorage.getItem("userInfo")) {
				if(document.location.search.indexOf("code=") == -1) {
					

					window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8031d15a06d4a296&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
				}

				if( document.location.search.indexOf("code=") > 0) {


					this.$http.jsonp("getMyAccount",{
						params: {
							code: this.$route.query.code
						}
					}).then( response => {

						if(response.data.respCode == 0) {
							localStorage.setItem("userInfo",JSON.stringify(response.data.respData))
							Cookie.set(Cookie.COOKIE_UID, response.data.respData.uid, Cookie.COOKIE_OPTION)
							Cookie.set(Cookie.COOKIE_OPENID, response.data.respData.openid, Cookie.COOKIE_OPTION)

							Cookie.set(Cookie.COOKIE_UID, response.data.respData.uid, { expires: 30, domain: 'www-test.qx-llt.com', path: '/'})
							Cookie.set(Cookie.COOKIE_OPENID, response.data.respData.openid, { expires: 30, domain: 'www-test.qx-llt.com', path: '/'})
						}
					})

				
				}
			}
		},

		methods: {
			wxConfig (){
			  
			  this.$http.jsonp("getInviteShare",{
			  	params: {
			  		url : location.origin + location.pathname + location.search
			  		}
			  	}).then((response) => {
			      if(response.data.respCode == 0){

			          var conf = response.data.respData;
			          wx.config({
			                 debug: true,
			                 appId: conf.appId, 
			                 timestamp: conf.timestamp, 
			                 nonceStr: conf.noncestr, 
			                 signature: conf.signature,
			                 jsApiList: ['getLocation','chooseWXPay','hideOptionMenu']
			          });
			      }
			  });
			}
		}
	}

</script>