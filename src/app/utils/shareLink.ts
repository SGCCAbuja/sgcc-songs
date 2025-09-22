export function shareLink(songTitle: string) {
  if (navigator.share) {
    navigator
      .share({
        text: `Check out "${songTitle}" from SGCC Collection of Songs`,
        url: window.location.href,
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.warn("Share action was aborted.");
        } else {
          console.error("Error sharing:", error);
        }
      });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("Sharing is not supported on this device.");
  }
}
