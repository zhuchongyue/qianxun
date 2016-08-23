/**
 *  Cookie 操作的基本类库，api请参照 https://github.com/js-cookie/js-cookie
 *
 *  关于几个特定的cookie值操作   uid 之类的  请统一使用下面的常量
 *
 */

import Cookies from 'js-cookie'

import _ from 'underscore'

//const COOKIE_T_VALUE = 21

let customCookies = Cookies.withConverter({
	write(value, key){
		return value
	},
	read(value){
		return value
	}
})


export default _.extend(customCookies, {

	COOKIE_OPTION: { expires: 30, domain: '.qx-llt.com', path: '/'},
	COOKIE_UID: 'uid',
	COOKIE_OPENID: 'openId',

	getOpenId() {
		return customCookies.get(this.COOKIE_OPENID)
	},

	getUID() {
		return customCookies.get(this.COOKIE_UID)
	}
})