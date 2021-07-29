var android_server_key = 'AAAAMlcERXA:APA91bFmmnd16wyXF7GEdF87kLUfdSh879T0k-H9UgzlYH3vV1oleT40DvPblpOyA6o7Cw_vK9HsNyA3AyqHbOxoXNBKsUXeoeDefxlnypFq5g4keQ5dstX7t45qbtC2yOgejOuWFK9c';
var FCM = require('fcm-node');

module.exports = {
    AndroidPushNotification: async function(requestdata) {
        // console.log(requestdata,"==================data");
        var fcm = new FCM(android_server_key);
        var token = requestdata.token;
        var message = {
            to: token,
            collapse_key: 'BadBoy',
            content_available: true,
            notification: {
                title: 'Chat',
                body: requestdata.title
            },
            data: { //This is only optional, you can send any data
                soundname: "default",
                notification_code: requestdata.code,
                body: {
                    data: requestdata.body,
                    title: 'Chat App',
                    message: requestdata.title
                }
            }
        };
        console.log(JSON.stringify(message), "======================= android push");
        fcm.send(message, function(err, response) {
            if (err) {
                console.log('error found', err);
            } else {
                console.log('response here', response);
            }
        })
    },
    AndroidPushNotificationMultiple: async function(data) {
        var fcm = new FCM(android_server_key);
        var token = data.token;
        var message = {
            registration_ids: token,
            collapse_key: 'BadBoy',
            content_available: true,
            notification: {
                title: 'Chat',
                body: data.title
            },
            data: { //This is only optional, you can send any data
                soundname: "default",
                notification_code: data.code,
                body: {
                    data: data.body,
                    title: 'Chat App',
                    message: data.title
                }
            }
        };
        console.log(JSON.stringify(message), "======================= android push");
        fcm.send(message, function(err, response) {
            if (err) {
                console.log('error found', err);
            } else {
                console.log('response here', response);
            }
        })
    },
}