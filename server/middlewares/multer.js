//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const multer = require('multer');
//---------------------------------//
// Define the MIME TYPE dictionary //
//---------------------------------//
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
};
//-------------------------------------------------------------------------------------------------//
// Indicates in which folder the files are stored                                                  //
// Indicates to use the original name and to replace spaces with underscores                       //
// Uses the MIME_TYPES constant to give the appropriate file extension                             //
// Create the file name including the name constant, a timestamp, a dot and the extension constant //
//-------------------------------------------------------------------------------------------------//
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});
//-------------------------------------------------------------------------------//
// Exports multer configuration by indicating to manage a single image type file //
//-------------------------------------------------------------------------------//
module.exports = multer({ storage: storage }).single('image');
