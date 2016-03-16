angular.module('consoles')
 .factory('Messages', function(){

 	var messages = {
        userName: '',
        sessionToken:'',
        userType:'',
        data:{}
    };

    return {
        getData: function () {
            return messages.data;
        },
        setData: function (obj) {
            messages.data = obj;
        },
        getUserName: function () {
            return messages.userName;
        },
        setUserName: function (firstName) {
            messages.userName = firstName;
        },
        getSessionToken: function () {
            return messages.sessionToken;
        },
        setSessionToken: function (firstName) {
            messages.sessionToken = firstName;
        },
        getUserType: function () {
            return messages.userType;
        },
        setUserType: function (firstName) {
            messages.userType = firstName;
        }
    };
 	
});