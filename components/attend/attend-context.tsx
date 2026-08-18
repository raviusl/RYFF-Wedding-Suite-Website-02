"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AttendContextValue = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const AttendContext = createContext<AttendContextValue | null>(null);

export function AttendProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openModal, closeModal }),
    [open, openModal, closeModal],
  );

  return <AttendContext.Provider value={value}>{children}</AttendContext.Provider>;
}

export function useAttendModal() {
  const context = useContext(AttendContext);
  if (!context) {
    throw new Error("useAttendModal must be used within AttendProvider");
  }
  return context;
}
