export const GREEN_400 = "#22c55e";

export const availableBranches = [
  "all",
  "AE",
  "AM",
  "BT",
  "CE",
  "CH",
  "CS",
  "CY",
  "ED",
  "EE",
  "EP",
  "GN",
  "HS",
  "MA",
  "ME",
  "MM",
  "NA",
  "OE",
  "PH",
  // "AS",

  // "ID",
  // "IL",

  // "NU",
  // "CA",
  // "CD",

  // "NE",

  // "IN",

  // "IG",

  // "EC",

  // "BS",
  // "MP",
  // "MS",
  // "HM",

  // "WS",
  // "MT",
  // "IT",
  // "PE",
  // "NC",
  // "NS",
];

export const SERVER_URL =
  (process.env.NODE_ENV as string) === "local"
    ? "http://localhost:3000"
    : "https://mentora.cf";
