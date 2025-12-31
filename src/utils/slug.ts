export const generateSlug = (title: string): string => {
  if (!title) {
    throw new Error("Title is required to generate slug");
  }

  // Convert title to URL-safe string
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-")         // spaces → hyphen
    .replace(/-+/g, "-");         // remove duplicate hyphens

  // Date & time (YYYYMMDD-HHMMSS)
  const now = new Date();
  const datePart =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const timePart =
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");

  // Random 5-digit number
  const randomPart = Math.floor(10000 + Math.random() * 90000);

  return `${baseSlug}-${datePart}-${timePart}-${randomPart}`;
};
