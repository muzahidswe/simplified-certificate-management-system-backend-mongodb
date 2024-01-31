const config = require('../config/mongoDBConfig');
const {sendApiResult } = require('../controllers/helperController');
const mongoose = require('mongoose');
const certificateSchema = require('./schemas/certificateSchema');

let Certificates = function() {}

Certificates.getCertificatesList = function(req) {
    return new Promise(async (resolve, reject) => {
        try {
            // const list = await certificateSchema.aggregate()
            //     .select({
            //         id: '$numericId',                   // Alias for 'numericId' field
            //         name: "$name",                      // Alias for 'name' field
            //         category: '$category',              // Alias for 'category' field
            //         issuer: '$issuer',                  // Alias for 'issuer' field
            //         issued_to: '$issued_to',            // Alias for 'issued_to' field
            //         issued_on: '$issued_on',            // Alias for 'issued_on' field
            //         expiration_date: '$expiration_date' // Alias for 'expiration_date' field
            //     });
            // this has been used for configuring date format in `YYYY-MM-DD`
            const list = await certificateSchema.aggregate(
                [
                    {
                        $project: {
                            id: '$numericId',
                            name: '$name',
                            category: '$category',
                            issuer: '$issuer',
                            issued_to: '$issued_to',
                            issued_on: {
                                $dateToString: {
                                    format: '%Y-%m-%d',
                                    date: '$issued_on'
                                }
                            },
                            expiration_date: {
                                $dateToString: {
                                    format: '%Y-%m-%d',
                                    date: '$expiration_date'
                                }
                            }
                        }
                    }
                ]
            );
            if (list.length != 0) {
                resolve(sendApiResult(true, "Certificate List Fetched Successfully", list));
            } else {
                resolve(sendApiResult(true, "No Data Found"));
            }
        } catch (error) {
            console.error(error.message);
            reject(sendApiResult(false, error.message));
        }
    });
}

Certificates.getCertificateDetails = function(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const list = await certificateSchema.find({"numericId": id});
            if (list.length != 0) {
                resolve(sendApiResult(true, "Certificate Details Fetched Successfully", list));
            } else {
                resolve(sendApiResult(true, "No Data Found"));
            }
        } catch (error) {
            console.error(error.message);
            reject(sendApiResult(false, error.message));
        }
    });
}

Certificates.createCertificate = function(req) {
    return new Promise(async (resolve, reject) => {
        try {
            const newCertificate = new certificateSchema({
                name: req.name,
                category: req.category,
                issuer: req.issuer,
                issued_to: req.issued_to,
                issued_on: req.issued_on,
                expiration_date: req.expiration_date,
            });
            const insert = await newCertificate.save();
   
            if (Object.keys(insert).length != 0) {
                resolve(sendApiResult(true, "New Certificate Created Successfully", req));
            } else {
                reject(sendApiResult(false, "Data Could not be Submitted"));
            }
        } catch (error) {
            console.error(error.message);
            reject(sendApiResult(false, error.message));
        }
    })
}

Certificates.deleteCertificate = function(id) {
    return new Promise(async (resolve, reject) => {
        try {
            if(id == null){
                resolve(sendApiResult(true, "Certificate ID Missing"));
            }
            const deleteCertificate = await certificateSchema.findOneAndDelete({numericId: id});
            // `findByIdAndDelete` method in Mongoose is designed to work with the default _id field, 
            // `findOneAndDelete` method with a filter based on that field.
            if (deleteCertificate) {
                resolve(sendApiResult(true, "Certificate Deleted Successfully", id));
            } else {
                resolve(sendApiResult(true, "No Data Found"));
            }
        } catch (error) {
            console.error(error.message);
            reject(sendApiResult(false, error.message));
        }
    });
}

module.exports = Certificates;