import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './toast.css';

const defaultProps = {
  animateInside: false,
  drag: false,
  pauseOnHover: true,
  progressBar: false,
};

const toast = {
  error(message) {
    izitoast.error({
      class: 'custom-toast custom-toast-error',
      icon: 'ban icon',
      message,
      ...defaultProps,
    });
  },
  success(message) {
    izitoast.success({
      class: 'custom-toast custom-toast-success',
      icon: 'checkmark icon',
      message,
      ...defaultProps,
    });
  },
};

export default toast;
