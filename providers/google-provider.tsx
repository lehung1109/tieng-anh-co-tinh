"use client";

import { createContext, Dispatch, useMemo, useReducer } from "react";

export interface GoogleContextStateModel {
  error: string | null;
}

export interface GoogleContextModel {
  state: GoogleContextStateModel;
  dispatch: Dispatch<GoogleAction>;
}

export interface GoogleAction {
  type: "SET_ERROR";
  payload: string | null;
}

export const GoogleContext = createContext<GoogleContextModel | null>(null);

export const googleReducer = (
  state: GoogleContextStateModel,
  action: GoogleAction,
) => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export function GoogleProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [state, dispatch] = useReducer(googleReducer, {
    error: null,
  });

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <GoogleContext value={value}>{children}</GoogleContext>;
}
