const config = require('../config/mongoDBConfig');
const {sendApiResult } = require('../controllers/helperController');
const postSchema = require('./schemas/postSchema');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


let Posts = function() {}

Posts.getPostsList = function(req) {
    return new Promise(async (resolve, reject) => {
        try {
            const list = await postSchema.aggregate([
                {
                    $lookup: {
                        from: 'users',          // The name of the users collection
                        localField: 'user_id',  // The field from the posts collection
                        foreignField: '_id',    // The field from the users collection
                        as: 'userInfo',         // The alias for the joined data
                    },
                },
                {
                    $unwind: '$userInfo',       // Deconstruct the user array created by $lookup
                },
                {
                    $project: {
                        post_id: '$numericId',
                        title: '$title',
                        content: '$content',
                        user: {
                            name: '$userInfo.name',
                            username: '$userInfo.username',
                        },
                        created: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$created'
                            }
                        },
                    },
                },
              ]);
            if (list.length != 0) {
                resolve(sendApiResult(true, "Post List Fetched Successfully", list));
            } else {
                resolve(sendApiResult(true, "No Data Found"));
            }
        } catch (error) {
            console.error(error.message);
            reject(sendApiResult(false, error.message));
        }
    });
}

Posts.getCertificateDetails = function(id) {
    return new Promise(async (resolve, reject) => {
        try {
            // const list = await certificateSchema.find({"numericId": id});
            // if (list.length != 0) {
            //     resolve(sendApiResult(true, "Certificate Details Fetched Successfully", list));
            // } else {
            //     resolve(sendApiResult(true, "No Data Found"));
            // }
        } catch (error) {
            console.error(error.message);
            reject(sendApiResult(false, error.message));
        }
    });
}

Posts.createPost = function(req) {
    return new Promise(async (resolve, reject) => {
        try {
            const newPost = new postSchema({
                title: req.title,
                content: req.content,
                user_id: new ObjectId(req.created_by), // created_by = "00e000d01000000000000000"
                created: new Date()
            });
            const insert = await newPost.save();
   
            if (Object.keys(insert).length != 0) {
                resolve(sendApiResult(true, "New Post Created Successfully", req));
            } else {
                reject(sendApiResult(false, "Data Could not be Submitted"));
            }
        } catch (error) {
            console.error(error.message);
            reject(sendApiResult(false, error.message));
        }
    })
}

Posts.deleteCertificate = function(id) {
    return new Promise(async (resolve, reject) => {
        try {
            // if(id == null){
            //     resolve(sendApiResult(true, "Certificate ID Missing"));
            // }
            // const deleteCertificate = await certificateSchema.findOneAndDelete({numericId: id});
            // // `findByIdAndDelete` method in Mongoose is designed to work with the default _id field, 
            // // `findOneAndDelete` method with a filter based on that field.
            // if (deleteCertificate) {
            //     resolve(sendApiResult(true, "Certificate Deleted Successfully", id));
            // } else {
            //     resolve(sendApiResult(true, "No Data Found"));
            // }
        } catch (error) {
            console.error(error.message);
            reject(sendApiResult(false, error.message));
        }
    });
}

module.exports = Posts;