const esearch = require('elasticsearch');
const express = require('express');

const client = new esearch.Client({
    host: process.env.ELASTICSEARCH_HOST,
    log: 'trace'
}); 

module.exports = {client};

