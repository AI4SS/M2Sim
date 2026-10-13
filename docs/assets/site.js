"use strict";

const copyButton = document.getElementById("copy-citation");
const citationCode = document.getElementById("citation-code");
const copyStatus = document.getElementById("copy-status");

if (copyButton && citationCode && copyStatus) {
  copyButton.hidden = false;
  let resetTimer;

  copyButton.addEventListener("click", async () => {
    clearTimeout(resetTimer);
    copyButton.disabled = true;
    copyStatus.textContent = "";

    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        throw new Error("Clipboard access is unavailable.");
      }
      await navigator.clipboard.writeText(citationCode.textContent.trim());
      copyButton.textContent = "Copied!";
      copyStatus.textContent = "BibTeX copied to clipboard.";
    } catch {
      copyButton.textContent = "Copy BibTeX";
      copyStatus.textContent = "Could not copy automatically. Select the BibTeX above to copy it, or download the .bib file.";
    } finally {
      copyButton.disabled = false;
      resetTimer = setTimeout(() => {
        copyButton.textContent = "Copy BibTeX";
      }, 2500);
    }
  });
}
