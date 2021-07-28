const express = require('express')
const path = require('path')

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.use('/web', (req, res) => {
    res.render('nome.html');
})

let mensagens =  []
let conexoes = []

io.on('connection', socket =>{
    console.log('nova conexão: '+socket.id)

    socket.emit('mensagensAnteriores', mensagens);
    conexoes.push(socket.id);

    socket.on('enviarMensagem', data =>{
        mensagens.push(data);
        socket.broadcast.emit('mensagemRecebida', data);
    })

    socket.on('disconnect', function() {
  
        var i = conexoes.indexOf(socket.id);
        conexoes.splice(i, 1);
        console.log("desconectado: "+socket.id)
     });
})

server.listen(3000, ()=> {
    console.log("rodando no porta 3000")
})