"use client";

function InstallPrompt() {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>

      <p>{isIOS ? "is IOS" : "is not IOS"}</p>
      <p>{isStandalone ? "is Standalone" : "is not Standalone"}</p>
    </div>
  );
}

export default InstallPrompt;
