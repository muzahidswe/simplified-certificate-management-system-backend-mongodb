const { Pool } = require('pg'); // this is for PostgreSQL connection
const {sendApiResult} = require('./helperController');
const Posts = require('../models/postsModel');

exports.getAllPostList = async(req, res) => {
  try {
    const result = await Posts.getPostsList(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(sendApiResult(false, error.message));
  }
};

exports.getPostDetails = async(req, res) => {
  try {
    // const { id } = req.params;
    // const result = await Certificates.getCertificateDetails(id);
    // res.status(200).send(result);
  } catch (error) {
    res.status(500).send(sendApiResult(false, error.message));
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, created_by} = req.body;
    if (!title || !content || !created_by) {
      return res.status(200).send(sendApiResult(false, 'All fields are required'));
    }
    const result = await Posts.createPost(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(sendApiResult(false, error.message));
  }
}

exports.deletePost = async (req, res) => {
//   const { id } = req.params;
//   if (id === null || id === undefined) {
//     res.status(400).send(sendApiResult(false, 'Invalid or missing ID parameter'));
//     return;
//   }

//   if (!Number.isInteger(parseInt(id))) {
//     res.status(400).send(sendApiResult(false, 'ID Must be number'));
//     return;
//   }

  try {
    // const result = await Certificates.deleteCertificate(id);
    // res.status(200).send(result);
  } catch (error) {
    res.status(500).send(sendApiResult(false, error.message));
  }
};
