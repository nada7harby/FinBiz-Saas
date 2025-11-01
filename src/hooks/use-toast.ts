import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const toastLimit = 1;
const removeDelay = 5000; // خليتها 5 ثواني شكل منطقي أكتر

type MyToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  desc?: React.ReactNode; 
  action?: ToastActionElement;
};

const toastActions = {
  add: "ADD_TOAST",
  update: "UPDATE_TOAST",
  dismiss: "DISMISS_TOAST",
  remove: "REMOVE_TOAST",
} as const;

let toastCounter = 0;

function makeId() {
  toastCounter = (toastCounter + 1) % Number.MAX_SAFE_INTEGER;
  return toastCounter.toString();
}

type ActionType = typeof toastActions;

type ToastActionType =
  | { type: ActionType["add"]; toast: MyToast }
  | { type: ActionType["update"]; toast: Partial<MyToast> }
  | { type: ActionType["dismiss"]; toastId?: MyToast["id"] }
  | { type: ActionType["remove"]; toastId?: MyToast["id"] };

interface ToastState {
  toasts: MyToast[];
}

// map دي علشان نحفظ الـtimeouts بتاعة كل toast
const toastTimers = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveList = (toastId: string) => {
  if (toastTimers.has(toastId)) return;

  const timer = setTimeout(() => {
    toastTimers.delete(toastId);
    sendAction({ type: "REMOVE_TOAST", toastId });
  }, removeDelay);

  toastTimers.set(toastId, timer);
};

export const toastReducer = (state: ToastState, action: ToastActionType): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, toastLimit),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveList(toastId);
      } else {
        state.toasts.forEach((t) => addToRemoveList(t.id));
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };
    }

    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: action.toastId
          ? state.toasts.filter((t) => t.id !== action.toastId)
          : [],
      };

    default:
      return state;
  }
};

// listeners دول عشان يخلو كل component يسمع التغير
const listeners: Array<(state: ToastState) => void> = [];
let currentState: ToastState = { toasts: [] };

function sendAction(action: ToastActionType) {
  currentState = toastReducer(currentState, action);
  listeners.forEach((fn) => fn(currentState));
}

type SimpleToast = Omit<MyToast, "id">;

function showToast({ ...props }: SimpleToast) {
  const id = makeId();

  const update = (data: MyToast) => sendAction({
    type: "UPDATE_TOAST",
    toast: { ...data, id },
  });

  const close = () => sendAction({ type: "DISMISS_TOAST", toastId: id });

  sendAction({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (isOpen) => {
        if (!isOpen) close();
      },
    },
  });

  return { id, close, update };
}

function useToast() {
  const [state, setState] = React.useState<ToastState>(currentState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const i = listeners.indexOf(setState);
      if (i > -1) listeners.splice(i, 1);
    };
  }, [state]);

  return {
    ...state,
    showToast,
    dismiss: (toastId?: string) =>
      sendAction({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, showToast };
