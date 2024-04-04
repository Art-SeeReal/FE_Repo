import { atom } from 'recoil';

const STATE_KEY = {
  toast: 'toast',
} as const;

export const ToastTypes = {
  info: 'info',
  success: 'success',
  error: 'error',
} as const;

export interface Toast {
  id?: string;
  type?: keyof typeof ToastTypes;
  content: string;
  duration?: number;
}

export const toastState = atom<Toast[]>({
  key: STATE_KEY.toast,
  default: [],
});
