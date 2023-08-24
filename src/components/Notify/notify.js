import toast from 'react-hot-toast';

export const notifyInfo = () => toast.error('Images not found');

export const notifyInputQuerry = () =>
  toast.error('Sorry, please provide a search word');
