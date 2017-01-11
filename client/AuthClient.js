import React, { Component, PropTypes } from 'react';


class AuthClient extends Component {
	static setToken(tokenValue) {
		if(typeof(Storage) !== "undefined") {
			return localStorage.setItem("token",tokenValue)
		}
	}

	static getToken() {
		if(typeof(Storage) !== "undefined") {
			return localStorage.getItem("token")
		}
	}

	static removeToken() {
		if(typeof(Storage) !== "undefined") {
			return localStorage.removeItem("token")
		}
	}
}

export default AuthClient