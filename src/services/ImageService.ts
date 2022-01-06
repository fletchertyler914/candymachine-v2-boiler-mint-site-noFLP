import http from '../utils/http-common';
import { BuildScapeResponse } from '../models/BuildScapeResponse';
import IImageData from '../models/ImageData';
import IMintData from '../models/ImageData';

const create = (data: IImageData) => {
  return http.post<BuildScapeResponse>('/image/merge', data).catch((err) => {
    throw new Error(err);
  });
};

const save = (data: IMintData) => {
  return http.post('/save', data);
};

const ImageService = {
  create,
  save,
};

export default ImageService;
