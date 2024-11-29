export function strMaxLenght(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "..." : str;
}

export function getDistance(
  pos1: { lat: number; long: number },
  pos2: { lat: number; long: number },
  unit: "K" | "N" | "M" = "K" // 'M' is statute miles, 'K' is kilometers, 'N' is nautical miles
): number {
  if (pos1.lat == pos2.lat && pos1.long == pos2.long) {
    return 0;
  } else {
    var radlat1 = (Math.PI * pos1.lat) / 180;
    var radlat2 = (Math.PI * pos2.lat) / 180;
    var theta = pos1.long - pos2.long;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}
