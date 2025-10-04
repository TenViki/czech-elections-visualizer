/* eslint-disable prefer-const */

import axios from "axios";
import parse from "node-html-parser";
import fs from "fs/promises";
import { ResponseData } from "./response";

let lastLog = Date.now() - 60000;

export interface Subject {
  name: string;
  percent: number;
  voters: number;
  color?: string;
  shortName?: string;
}

export const GET = async () => {
  const url = process.env.DATA_URL;
  if (!url) {
    return new Response("DATA_URL is not defined", { status: 500 });
  }

  const subjectsMeta = await fs.readFile("parties.json", "utf-8");
  const subjectsMetaJson: { color: string; name: string; shortName: string }[] =
    JSON.parse(subjectsMeta);

  const res = await fetch(
    "https://ct24.ceskatelevize.cz/api/elections/pa/results?electionId=125&areaType=all",
    {
      next: { revalidate: 30 }, // Revalidate every 30 seconds
    }
  );

  const data = (await res.json()) as ResponseData;

  const subjects: Subject[] = [];

  // let index = 0;

  const parties = data.data.results[0].parties;

  for (const party of parties) {
    subjects.push({
      name: party.shortName,
      shortName: party.abbreviation,
      color: `#${party.color}`,
      percent: party.percent / 100,
      voters: party.votes,
    });
  }

  subjects.sort((a, b) => b.percent - a.percent);

  // const metaRes = await fetch(
  //   "https://www.volby.cz/appdata/ps2025/ucast/cr/0.json",
  //   {
  //     next: { revalidate: 30 },
  //   }
  // );

  let total;
  let totalVotes;
  let attendance;

  total = data.data.results[0].processedPercent / 100;
  totalVotes = data.data.results[0].validVotes;
  attendance = data.data.results[0].attendancePercent / 100;

  // if (metaTable) {
  //   const dataRow = metaTable.querySelectorAll("tr")[2];
  //   if (dataRow) {
  //     const cols = dataRow.querySelectorAll("td");
  //     total = cols[2]?.text.trim() || "N/A";
  //     totalVotes = cols[7]?.text.trim() || "N/A";
  //     attendance = cols[5]?.text.trim() || "N/A";
  //   }
  // }

  if (Date.now() - lastLog > 30000) {
    const json = JSON.stringify({ subjects, total, attendance, totalVotes });
    lastLog = Date.now();

    fs.writeFile(`logs/${Date.now()}.json`, json).catch((err) => {
      console.error("Failed to write log file", err);
    });
  }

  console.log(`Fetched data: ${subjects.length} subjects`);
  console.log(`Total votes: ${total}`);
  console.log(`Voter turnout: ${attendance}`);

  return new Response(
    JSON.stringify({ subjects, total, attendance, totalVotes }),
    {
      status: 200,
    }
  );
};
