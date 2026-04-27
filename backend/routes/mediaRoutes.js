const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary/config');
const mediaController = require('../controllers/mediaController');
const auth = require('../middleware/auth');

const upload = multer({ storage: storage });

router.post('/upload', auth, upload.single('media'), mediaController.uploadMedia);
router.get('/media', mediaController.getMedia);
router.get('/sign-upload', mediaController.signUpload);

module.exports = router;
