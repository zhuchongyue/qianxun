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

			/*wx.error(function(res){
			     _this.wxConfig();
			});
			wx.ready(function () {
			    wx.hideOptionMenu();
			})*/
			/*
			https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect

			wx8031d15a06d4a296

			*/
			/*this.$http.jsonp("getInviteShare", { params: {
					url: window.location.href
				}
			}).then(response => {
				console.log(response)
			})*/


			if(!localStorage.getItem("userInfo")) {
				if(document.location.search.indexOf("code=") == -1) {
					

					window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8031d15a06d4a296&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`


					
					//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
				}

				if( document.location.search.indexOf("code=") > 0) {


					this.$http.jsonp("getMyAccount",{
						params: {
							code: this.$route.query.code
						}
					}).then( response => {
						console.log(response)

						if(response.data.respCode == 0) {
							localStorage.setItem("userInfo",JSON.stringify(response.data.respData))
							Cookie.set(Cookie.COOKIE_UID, response.data.respData.uid, Cookie.COOKIE_OPTION)
							Cookie.set(Cookie.COOKIE_OPENID, response.data.respData.openid, Cookie.COOKIE_OPTION)

							Cookie.set(Cookie.COOKIE_UID, response.data.respData.uid, { expires: 30, domain: 'www-test.qx-llt.com', path: '/'})
							Cookie.set(Cookie.COOKIE_OPENID, response.data.respData.openid, { expires: 30, domain: 'www-test.qx-llt.com', path: '/'})
						}
					})

					//获取openid
					/*this.$http.jsonp("https://api.weixin.qq.com/sns/oauth2/access_token", {
						params: {
							appid: "wx8031d15a06d4a296",
							secret: "SECRET",
							code: this.$route.query.code,
							grant_type: "authorization_code"
						}
					}).then( response => {
						
					})*/
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