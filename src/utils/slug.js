export const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim().replace(/고객센터/g, "").trim();
  cleanName = cleanName.replace(/[\/\\:*?"<>|%,.*+]/g, "");
  return cleanName.replace(/[\s-]+/g, "-") + "-고객센터";
};

export const normalizeSlugKey = (str) => {
  if (!str) return "";
  let s = str;
  try {
    s = decodeURIComponent(s);
  } catch (e) {}
  return s
    .toLowerCase()
    .replace(/%2b/gi, "")
    .replace(/[\/\\:*?"<>|%,.*+\s-]/g, "")
    .replace(/고객센터/g, "");
};
