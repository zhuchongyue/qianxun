export default {
	handleImg(url) {

		if(!/\.(png|jpg)$/.test(url)){
			return "http://static.qx-llt.com/images/upload/20160806/e84abb520f414c5db5b0fa7cc20dce59.jpg"
		}

		if(/^http/.test(url)){
			return url
		}

		return `http://static.qx-llt.com/images/upload/${url}`;
	}
}