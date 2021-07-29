const fun = require('./functions');

let mensagens =  []
let conexoes = []
let androidTokens = []

module.exports= function(socket){

    socket.emit('mensagensAnteriores', mensagens);
    console.log('nova conexão: '+socket.id)


    socket.on('conectar', data => {
        conexoes.push(data);
        androidTokens.push(data.pushTokenId);
        socket.broadcast.emit("novaConexao", data)
    });


    socket.on('enviarMensagem', data =>{
        mensagens.push(data);
        socket.broadcast.emit('mensagemRecebida', data);
        // if (androidTokens.length > 0){
        //     var push = {}
        //     push.title = data.nome;
        //     push.body = data.msg;
        //     push.code = 3
        //     push.token = androidTokens;
        //     fun.AndroidPushNotificationMultiple(push)
        // }
        
    })

    socket.on('disconnect', function() {
    
        var i = conexoes.indexOf(socket.id);
        conexoes.splice(i, 1);
        console.log("desconectado: "+socket.id)
    });

}