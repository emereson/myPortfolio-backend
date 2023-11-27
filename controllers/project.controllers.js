const catchAsync = require('../utils/catchAsync');
const Project = require('../models/project.model');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');

exports.findAll = catchAsync(async (req, res, next) => {
  const projects = await Project.findAll();

  return res.status(200).json({
    status: 'Succes',
    results: projects.length,
    projects,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { title, description, linkPage } = req.body;

  const imgRef = ref(
    storage,
    `projectImg/${Date.now()}-${req.file.originalname}`
  );

  await uploadBytes(imgRef, req.file.buffer);

  const imgUploaded = await getDownloadURL(imgRef);

  const project = await Project.create({
    title,
    description,
    linkPage,
    projectImg: imgUploaded,
  });

  res.status(201).json({
    status: 'success',
    message: 'the project has ben created successfully!',
    project,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { project } = req;

  return res.status(200).json({
    status: 'success',
    project,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { project } = req;
  const { title, description, linkPage } = req.body;

  const imgRef = ref(
    storage,
    `projectImg/${Date.now()}-${req.file.originalname}`
  );

  await uploadBytes(imgRef, req.file.buffer);

  const imgUploaded = await getDownloadURL(imgRef);

  await project.update({
    title,
    description,
    linkPage,
    projectImg: imgUploaded,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the project has been updated',
    project,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { project } = req;

  await project.destroy();

  return res.status(200).json({
    status: 'success',
    message: 'the project has been delete',
    project,
  });
});
