interface Window {
  handleSignInWithGoogle: (
    response: google.accounts.id.CredentialResponse
  ) => void;
  MSStream?: boolean;
}
