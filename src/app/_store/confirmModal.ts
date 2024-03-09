import { ReactNode } from "react";
import { create } from "zustand";

type ModalType = {
  isModalOpen: boolean;
  title: string;
  content: ReactNode;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
  openModal: ({
    title,
    content,
    confirmCallback,
    cancelCallback,
  }: {
    title: string;
    content: ReactNode;
    confirmCallback?: () => void;
    cancelCallback?: () => void;
  }) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalType>((set, get) => ({
  isModalOpen: false,
  title: "",
  content: "",
  openModal: ({ title, content, confirmCallback, cancelCallback }) =>
    set({
      isModalOpen: true,
      title: title,
      content: content,
      confirmCallback: confirmCallback,
      cancelCallback: cancelCallback,
    }),
  closeModal: () => set({ isModalOpen: false }),
}));
