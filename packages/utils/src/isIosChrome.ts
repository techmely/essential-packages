export function isIosChrome() {
  return typeof navigator !== "undefined" && navigator.userAgent.match("CriOS");
}
