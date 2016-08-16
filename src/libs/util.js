export default {
	handleImg(url) {

		if(/^http/.test(url)){
			return url
		}

		return `http://static.qx-llt.com/images/upload/${url}`;
	}
}