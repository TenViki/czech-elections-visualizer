const fs = require("fs");

const data = fs.readFileSync("alldata.json", "utf-8");
const json = JSON.parse(data);

const strany = json.cis.strany;

const parties = [];

const order = [
  "Rebelové",
  "Moravské zemské hnutí",
  "Jasný signál nezávislých",
  "Výzva 2025",
  "SMS - Stát má sloužit",
  "Svoboda a přímá demokracie (SPD)",
  "ČSSD - Česká suverenita sociální demokracie",
  "Přísaha občanské hnutí",
  "Levice",
  "Česká republika na 1. místě",
  "Spolu (ODS, KDU-ČSL, TOP 09)",
  "Švýcarská demokracie",
  "Urza.cz",
  "Hnutí občanů a podnikatelů",
  "Hnutí Generace",
  "Česká pirátská strana",
  "Koruna česká (monarchistická strana Čech Moravy a Slezska)",
  "Volt Česko",
  "Volte Pravý Blok",
  "Motoristé sobě",
  "Balbínova poetická strana",
  "ANO 2011",
  "Starostové a nezávislí",
  "Hnutí Kruh",
  "Stačilo!",
  "Voluntia",
];

const partiesLowercase = order.map((o) => o.toLowerCase());

for (const strana of strany) {
  let order;

  let formattedName = strana.NAZEV;

  formattedName = formattedName.replace(" – ", " - ");
  formattedName = formattedName.replace("!", "");

  order = partiesLowercase.indexOf(formattedName.toLowerCase());
  console.log("Order first", order, formattedName);
  if (order == -1)
    order = partiesLowercase.indexOf(strana.ZKRATKA.toLowerCase());
  console.log("Order second", order, strana.ZKRATKA);
  if (order == -1)
    order = partiesLowercase.findIndex(
      (s) =>
        s.includes(strana.ZKRATKA.toLowerCase()) ||
        strana.ZKRATKA.toLowerCase().includes(s)
    );

  console.log("Order third", order, strana.ZKRATKA);

  parties.push({
    name: strana.NAZEV,
    shortName: strana.ZKRATKA,
    color: strana.$data.color?.[0].value || "#FFD700",
    order: order + 1,
  });
}
parties.sort((a, b) => a.order - b.order);

fs.writeFileSync("parties.json", JSON.stringify(parties, null, 2));
