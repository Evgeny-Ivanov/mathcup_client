import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const User = {
  fetch: () =>
    axios.get('/api/users/current/'),
  signIn: data =>
    axios.post('/api/users/signin/', data),
  signUpStep1: data =>
    axios.post('/api/users/signup/step1/', data),
  signUpStep2: data =>
    axios.post('/api/users/signup/step2/', data),
  logout: () =>
    axios.post('/api/users/logout/'),
  update: data =>
    axios.patch('/api/users/current/', data),
};

const News = {};

const Helpers = {
  uploadImage: data =>
    axios.post('/api/common/upload/image/', data),
};

export default {
  Helpers,
  News,
  User,
};
