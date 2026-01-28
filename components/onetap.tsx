"use client";

interface OneTapModel {
  nonce: string;
  hashedNonce: string;
}

const OneTap = ({ nonce, hashedNonce }: OneTapModel) => {
  return (
    <div>
      <h1>One Tap </h1>
    </div>
  );
};

export default OneTap;
