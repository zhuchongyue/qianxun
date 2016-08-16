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

	export default {
		store,

		ready(){
			/*https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect


			wx8031d15a06d4a296

			*/
			this.$http.jsonp("getInviteShare", {params: {
				url: window.location.href
			}}).then(response => {
				console.log(response)
			})
		},
	}

</script>