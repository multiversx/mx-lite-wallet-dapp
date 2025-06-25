export async function readFromClipboard(): Promise<string> {
  if (
    navigator &&
    navigator.clipboard &&
    typeof navigator.clipboard.readText === 'function'
  ) {
    try {
      return await navigator.clipboard.readText();
    } catch (error) {
      // Optionally handle error (e.g., permissions)
      return '';
    }
  }
  return '';
}
