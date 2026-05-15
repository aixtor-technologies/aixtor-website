"use client";

import { useEffect } from "react";

type ToastProps = {
  message?: string;
  onDismiss: () => void;
  duration?: number;
};

const Toast = ({ message = "Form submitted successfully!", onDismiss, duration = 5000 }: ToastProps) => {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [onDismiss, duration]);

  return (
    <div className="fixed top-6 right-6 z-9999 toast-slide-in flex items-center gap-3 bg-white border border-green-200 shadow-xl rounded-2xl px-5 py-4 min-w-72 max-w-sm w-full">
      <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-dark-400">Form submitted successfully!</p>
        <p className="text-xs text-gray-500 mt-0.5">{message}</p>
      </div>
      <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600 shrink-0" aria-label="Dismiss">
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
