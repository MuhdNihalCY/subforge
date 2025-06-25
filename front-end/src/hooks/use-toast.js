import { useState } from "react";

// Minimal toast context for demonstration
let listeners = [];
let toastQueue = [];

export function toast(toastObj) {
  toastQueue.push({ id: Date.now(), ...toastObj });
  listeners.forEach((cb) => cb([...toastQueue]));
}

export function useToast() {
  const [toasts, setToasts] = useState([...toastQueue]);

  // Subscribe to toast updates
  if (!listeners.includes(setToasts)) {
    listeners.push(setToasts);
  }

  // Optionally, add a cleanup to remove the listener on unmount
  // (not strictly necessary for demo, but good practice)

  return { toasts, toast };
} 