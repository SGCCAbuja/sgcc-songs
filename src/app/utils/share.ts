export function shareLink(hymnTitle: string) {
  if (navigator.share) {
    navigator
      .share({
        text: `Check out this hymn from SGCC Collection of Songs — "${hymnTitle}"`,
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
