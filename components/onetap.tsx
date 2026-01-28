"use client";

import { signInWithGoogleAction } from "@/funcs/login-form-function";
import { useGoogleContext } from "@/hooks/use-google-context";
import Script from "next/script";
import { useEffect, useState } from "react";

interface OneTapModel {
  nonce: string;
  hashedNonce: string;
}

const OneTap = ({ nonce, hashedNonce }: OneTapModel) => {
  const [loadScript, setLoadScript] = useState<boolean>(false);
  const { state, dispatch } = useGoogleContext();

  useEffect(() => {
    setTimeout(() => {
      setLoadScript(true);
    }, 10);
  }, []);

  useEffect(() => {
    window.handleSignInWithGoogle = (
      response: google.accounts.id.CredentialResponse,
    ) => {
      signInWithGoogleAction(nonce, response)
        .then(({ error }) => {
          dispatch({ type: "SET_ERROR", payload: error?.message ?? null });
        })
        .catch(() => {
          dispatch({
            type: "SET_ERROR",
            payload: "An error occurred while signing in with Google",
          });
        });
    };
  }, [nonce, dispatch]);

  return (
    <div>
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-nonce={hashedNonce}
        data-auto_select="true"
        data-itp_support="true"
      ></div>

      {loadScript && <Script src="https://accounts.google.com/gsi/client" />}

      {state.error && <div className="text-red-500">{state.error}</div>}
    </div>
  );
};

export default OneTap;
