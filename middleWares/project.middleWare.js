const Project = require('../models/project.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.validExistProject = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const project = await Project.findOne({
    where: {
      id,
    },
  });
  if (!project) {
    return next(new AppError(`Data of the project not found`, 404));
  }
  req.project = project;
  next();
});
