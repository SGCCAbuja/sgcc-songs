export function formatSection(section: {
  type: string;
  number?: number;
}): string {
  if (section.type === "verse") {
    return `Verse ${section.number}`;
  }
  return section.type.charAt(0).toUpperCase() + section.type.slice(1);
}
