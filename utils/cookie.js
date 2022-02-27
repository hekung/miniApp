const cookie = {
    getAll: function () {
        var obj = {};
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            obj[arr[i].split('=')[0]] = arr[i].split('=')[1];
        }
        return obj;
    },
    getCookie: function (key) {
        return this.getAll()[key];
    },
    setCookie: function (key, value, time) {
        var date = new Date().getTime() + time * 1000;
        document.cookie = key + '=' + value + ';expires=' + new Date(date).toUTCString();
    },
    removeCookie: function (key) {
        var date = new Date().getTime() - 1;
        document.cookie = key + '=;expires=' + new Date(date).toUTCString();
    }
}
module.exports = cookie
