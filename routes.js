const express = require('express');
const views = require('./Controllers/views');

var routes = express.Router();



routes.get('/', views.nome);
routes.get('/chat', views.chat);
routes.get('/json/:nome', views.json);



module.exports =routes;