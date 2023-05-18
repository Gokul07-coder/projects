const express = require('express');
const { searching } = require('../../controllers/elasticsearch/searching');
const { search } = require('../../controllers/search_controller/search');
const Router = express.Router();
 
// Router.get('/search', search);
Router.get('/search', searching);

module.exports = Router;