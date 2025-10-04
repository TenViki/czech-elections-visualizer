import Color from "color";
import React, { useEffect } from "react";
import { getTextWidth } from "./font";

interface PartyProps {
  name: string;
  percent: number;
  color?: string;
  shortName?: string;
  voters?: number;
}

const Party = ({ name, percent, shortName, color, voters }: PartyProps) => {
  const [fontSizes, setFontSizes] = React.useState<{
    name: number;
    percent: number;
  }>({ name: 16, percent: 16 });

  if (!color) {
    color = "#ccc";
  }

  if (percent < 0.1) {
    percent = 0.1;
  }

  useEffect(() => {
    const handleResize = () => {
      // recalculate font sizes
      const partyColor = new Color(color!);

      const calculatedPercent = Math.max(percent, 0.1);

      const calculatedWidth = window.innerWidth * (calculatedPercent / 100);
      let percentageWidth;
      let percentageSize = 0;

      let attempts = 0;

      do {
        percentageSize++;
        percentageWidth = getTextWidth(
          `${calculatedPercent.toFixed(1)}%`,
          `bold ${percentageSize}px "Segoe UI"`
        );
        attempts++;
        console.log(name, percentageSize, percentageWidth);
      } while (percentageWidth < calculatedWidth * 0.9 && attempts++ < 100);

      // const percentageSize = Math.min(64, calculatedWidth * 0.66);
      setFontSizes({ name: calculatedWidth, percent: percentageSize });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [percent]);

  const partyColor = new Color(color);
  const calculatedWidth = window.innerWidth * (percent / 100);

  // calculate font size based on width of the party div.
  // the text size should be such that the text fits in the div.¨
  // temember that in this case the percent is in normal orientation, not rotated

  return (
    <div
      style={{
        background: color,
        color: partyColor.isLight() ? "black" : "white",
        width: `${percent}%`,
        paddingBottom: "10rem",
        paddingTop: "1rem",
      }}
      className="flex flex-col"
    >
      <div className="mb-12 grow flex flex-col">
        <div
          className="grow"
          style={{
            fontSize: Math.min(64, fontSizes.name * 0.66),
            transform: "rotate(180deg)",
            fontWeight: "bold",
            writingMode: "vertical-lr",
            display: "flex",
            alignItems: "center",
            color: partyColor.isLight() ? "black" : "white",
          }}
        >
          <div className="grow">
            {calculatedWidth > 150 && (
              <div
                className="text-3xl"
                style={{
                  opacity: 0.5,
                }}
              >
                {Intl.NumberFormat("cs-CZ").format(voters!)}
              </div>
            )}
            <div>{shortName}</div>
          </div>
          <div
            style={{
              opacity: 0.7,
              fontSize: Math.min(64, fontSizes.percent * 0.66) * 0.75,
            }}
          >
            {percent} %
          </div>
        </div>
      </div>
    </div>
  );
};
export default Party;
