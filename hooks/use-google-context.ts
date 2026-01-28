import { GoogleContext, GoogleContextModel } from "@/providers/google-provider";
import { useContext } from "react";

export const useGoogleContext = () => {
  const google = useContext<GoogleContextModel | null>(GoogleContext);

  if (!google) {
    throw new Error("Google context not found");
  }

  return google;
};