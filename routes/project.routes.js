const express = require('express');
const { upload } = require('../utils/multer');

const projectController = require('../controllers/project.controllers');

const projectMiddleware = require('../middleWares/project.middleWare');
const { route } = require('../app');

const router = express.Router();

router.get('/', projectController.findAll);
router.post('/', upload.single('projectImg'), projectController.create);

router
  .route('/:id')
  .get(projectMiddleware.validExistProject, projectController.findOne)
  .patch(
    upload.single('projectImg'),
    projectMiddleware.validExistProject,
    projectController.update
  )
  .delete(projectMiddleware.validExistProject, projectController.delete);

module.exports = router;
