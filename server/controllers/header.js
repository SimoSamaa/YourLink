const Header = require('../models/header');

function catchError(err) {
  if(!err.statusCode) err.statusCode = 500;
}

// LOAD HEADERS
exports.getHeaders = (req, res, next) => {
  Header.find()
    .then((headers) => {
      res
        .status(200)
        .json({
          message: 'load all headers successfully',
          headers: headers
        });
    })
    .catch((err) => {
      catchError(err);
      next(err);
    });
};

// CREATE HEADER
exports.createHeader = (req, res, next) => {
  const headerData = req.body;
  const title = headerData.title;
  const dataIndex = headerData.dataIndex;
  const isDisable = headerData.isDisable;

  const header = new Header({
    title: title,
    dataIndex: dataIndex,
    isDisable: isDisable
  });

  header.save()
    .then((header) => {
      res
        .status(201)
        .json({
          message: 'header create successfully!',
          header: header
        });
    })
    .catch((err) => {
      catchError(err);
      next(err);
    });
};

// DELETE HEADER
exports.deleteHeader = (req, res, next) => {
  const headerId = req.params.id;

  Header.findById(headerId)
    .then((header) => {

      if(!header) {
        const error = new Error('Could not find post');
        error.statusCode = 404;
        throw error;
      }

      return Header.findByIdAndDelete(headerId);
    })
    .then(() => {
      res
        .status(200)
        .json({ message: 'header deleted successfully!' });
    })
    .catch((err) => {
      catchError(err);
      next(err);
    });
};

// UPDATE HEADER
exports.updateHeader = (req, res, next) => {
  const headerId = req.body.id;
  const updatedHeader = req.body;
  const title = updatedHeader.title;
  const dataIndex = updatedHeader.dataIndex;

  console.log(title);
};