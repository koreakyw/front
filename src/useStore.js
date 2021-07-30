import {
  counter, market, user, payment
} from './stores';

const useStore = () => {
  return { counter, market, user, payment };
};

export default useStore;