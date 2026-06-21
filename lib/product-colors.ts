const colorHexMap: Record<string, string> = {
  "rose nude": "#D98A99",
  "rose forte": "#C76D80",
  "rosê nude": "#D98A99",
  "rosê forte": "#C76D80",
  rose: "#D98A99",
  rosê: "#D98A99",
  dourado: "#C9A15A",
  preto: "#3a2e30",
  caqui: "#7a6a55",
  branco: "#ffffff",
  "off white": "#F8EFF1",
};

export function getColorHex(color: string) {
  return colorHexMap[color.trim().toLowerCase()] ?? "#D98A99";
}
