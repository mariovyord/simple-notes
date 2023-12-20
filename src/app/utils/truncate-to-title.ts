export function truncateToTitle(text: string, maxLength = 25) {
  if (text.length < maxLength) {
    return text;
  }

  const lastSpaceIndex = text.lastIndexOf(" ", maxLength);

  if (lastSpaceIndex !== -1) {
    return text.substring(0, lastSpaceIndex) + "...";
  } else {
    return text.substring(0, maxLength) + "...";
  }
}
