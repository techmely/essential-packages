/**
 * @description Copy text from browser to clipboard...natively!
 * @param text
 */
export function toClipboard(text: string): boolean {
  // Create element and select the text
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.cols = 1;
  ta.rows = 1;
  ta.style.color = 'transparent';
  ta.style.border = 'none';
  document.body.append(ta);
  ta.select();

  let isSuccess = false;
  try {
    isSuccess = document.execCommand('copy');
  } catch {
    isSuccess = false;
  }

  // Cleanup the element we created
  ta.remove();

  return isSuccess;
}

/**
 * @description Copy text from an input/textarea element to a user's clipboard
 * @param el The <input> or <textarea> element
 * @param preserveSelection True if text selection/highlight should be preserved after copying text
 */
export function fromElement(
  el: HTMLInputElement | HTMLTextAreaElement,
  preserveSelection?: boolean,
) {
  let start = 0;
  let end = 0;
  let isSuccess = false;

  if (preserveSelection) {
    start = el.selectionStart || 0;
    end = el.selectionEnd || 0;
  }

  el.select();

  try {
    isSuccess = document.execCommand('copy');
  } catch {
    isSuccess = false;
  }

  if (preserveSelection) {
    el.setSelectionRange(start, end);
  }

  return isSuccess;
}
