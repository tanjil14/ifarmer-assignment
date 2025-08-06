"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ToastContainer />
      {children}
    </Provider>
  );
}
