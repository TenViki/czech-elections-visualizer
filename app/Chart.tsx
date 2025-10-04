import React from "react";
import { Subject } from "./api/data/route";
import Color from "color";
import Party from "./Party";

interface ChartProps {
  subjects: Subject[];
  total?: string;
  attendance?: string;
  totalVotes?: string;
}

const Chart: React.FC<ChartProps> = ({
  subjects,
  total,
  attendance,
  totalVotes,
}) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        position: "relative",
      }}
    >
      {subjects.map((subject) => (
        <Party {...subject} key={subject.name} />
      ))}

      <div
        className="absolute flex text-white h-28 bottom-0 left-0 w-full justify-around items-center text-4xl font-bold"
        style={{
          backdropFilter: "blur(64px)",
          background: "rgba(0,0,0,0.15)",
        }}
      >
        <div>Sečteno okresků: {total} %</div>
        <div>
          Počet hlasů: {Intl.NumberFormat("cs-CZ").format(+totalVotes!)}
        </div>
        <div>Volební účast: {attendance} %</div>
      </div>
    </div>
  );
};

export default Chart;
