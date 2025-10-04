"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getData } from "./api/data/data";
import Chart from "./Chart";

const Visualize = () => {
  const query = useQuery({
    queryKey: ["data"],
    queryFn: getData,
    refetchInterval: 5000,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {query.isLoading ? (
        <div className="flex h-full items-center justify-center">
          Načítání...
        </div>
      ) : (
        <Chart
          subjects={query.data?.subjects || []}
          total={query.data?.total}
          attendance={query.data?.attendance}
          totalVotes={query.data?.totalVotes}
        />
      )}
    </div>
  );
};

export default Visualize;
