import { useRecoilState } from 'recoil';
import { toastState, Toast } from '../../recoil/atoms/toastState';
import { generateStr } from '../../utils/utils';

export const useToast = () => {
  const [toasts, setToasts] = useRecoilState(toastState);

  const removeToast = (toastId: Toast['id']) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
  };

  const appendToast = (toast: Toast) => {
    const id = generateStr(4);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), 600 + (toast.duration ?? 3000));
  };

  return {
    toasts,
    appendToast,
  };
};
