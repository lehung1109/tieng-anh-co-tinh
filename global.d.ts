interface Window {
  handleSignInWithGoogle: (nonce: string, response: google.accounts.id.CredentialResponse) => Promise<void>;
}