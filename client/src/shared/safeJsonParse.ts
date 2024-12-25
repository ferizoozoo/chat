export const safeJsonParse = (content: string | null) => {
  try {
    return JSON.parse(content);
  } catch (e) {
    return {};
  }
};
