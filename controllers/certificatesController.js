const { Pool } = require('pg'); // this is for PostgreSQL connection
const {sendApiResult} = require('./helperController');
const Certificates = require('../models/certificatesModel');

exports.getAllCertificateList = async(req, res) => {
  try {
    const result = await Certificates.getCertificatesList(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(sendApiResult(false, error.message));
  }
};

exports.getCertificateDetails = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Certificates.getCertificateDetails(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(sendApiResult(false, error.message));
  }
};

exports.createCertificate = async (req, res) => {
  try {
    const { name, category, issuer, issued_to, issued_on, expiration_date } = req.body;
    if (!name || !category || !issuer || !issued_to || !issued_on || !expiration_date) {
      return res.status(400).send(sendApiResult(false, 'All fields are required'));
    }
    const result = await Certificates.createCertificate(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(sendApiResult(false, error.message));
  }
}

exports.deleteCertificate = async (req, res) => {
  const { id } = req.params;
  if (id === null || id === undefined) {
    res.status(400).send(sendApiResult(false, 'Invalid or missing ID parameter'));
    return;
  }

  if (!Number.isInteger(parseInt(id))) {
    res.status(400).send(sendApiResult(false, 'ID Must be number'));
    return;
  }

  try {
    const result = await Certificates.deleteCertificate(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(sendApiResult(false, error.message));
  }
};
