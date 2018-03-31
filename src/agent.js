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

const News = {
  create: data =>
    axios.post('/api/news/', data),
  fetch: id =>
    axios.get(`/api/news/${id}/`),
  fetchList: page =>
    axios.get(`/api/news/?page=${page}&ordering=-date`),
};

const Helpers = {
  uploadImage: data =>
    axios.post('/api/common/upload/image/', data),
};

const Rounds = {
  create: data =>
    axios.post('/api/rounds/', data),
  fetch: id =>
    axios.get(`/api/rounds/${id}/`),
  fetchAnswers: id =>
    axios.get(`/api/rounds/${id}/answers/`),
  fetchRating: id =>
    axios.get(`/api/rounds/${id}/rating/`),
  fetchTasks: id =>
    axios.get(`/api/rounds/${id}/tasks/`),
  fetchUserScore: id =>
    axios.get(`/api/rounds/${id}/users/current/score/`),
  join: id =>
    axios.post(`/api/rounds/${id}/users/`),
  unjoin: id =>
    axios.delete(`/api/rounds/${id}/users/`),
  update: (id, data) =>
    axios.patch(`/api/rounds/${id}/`, data),
};


const Answers = {
  create: data =>
    axios.post('/api/answers/', data),
};

const Tournaments = {
  create: data =>
    axios.post('/api/tournaments/', data),
  fetch: id =>
    axios.get(`/api/tournaments/${id}/`),
  fetchList: page =>
    axios.get(`/api/tournaments/?page=${page}&ordering=-create_date`),
  fetchRounds: id =>
    axios.get(`/api/tournaments/${id}/rounds/?ordering=-start`),
  update: (id, data) =>
    axios.patch(`/api/tournaments/${id}/`, data),
};

export default {
  Helpers,
  News,
  Rounds,
  Tournaments,
  Answers,
  User,
};
