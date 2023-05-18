const express = require('express');
const { homePage } = require('../../controllers/Homepage/home');
const { getComments, comment, deleteComment, likeComment, deleteLikeComment, getCommentLikes } = require('../../controllers/post_controllers/comment');
const Router = express.Router(); 
const { like, removeLike, getLikes } = require('../../controllers/post_controllers/like');
const {refToken} = require('../../middleware/Authorization');

//getting friend post
Router.get('/home/getPost', refToken, homePage);
Router.get('/like', refToken, getLikes);
Router.patch('/like', refToken, like );
Router.delete('/like', refToken, removeLike);
Router.get('/comment', refToken, getComments);
Router.patch('/comment', refToken, comment);
Router.delete('/comment', refToken, deleteComment);
Router.get('/likeComment', refToken, getCommentLikes);
Router.post('/likeComment', refToken, likeComment);
Router.delete('/likeComment', refToken, deleteLikeComment);

module.exports = Router;