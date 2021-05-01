import React, { useEffect, useState } from "react";

import Plot from "react-plotly.js";
import styled from "styled-components";

function DataVisualisation() {
  const [chartState, setChartState] = useState({
    data: [],
    layout: {
      max_width: 500,
      height: 600,
      padding: 9,
      title: "Deaths in conflict 2019",
      plot_bgcolor: "rgba(0,0,0,0)",
      paper_bgcolor: "rgba(0,0,0,0)",
    },
    frames: [],
    config: {},
  });

  let isDataLoaded = false;

  useEffect(() => {
    let newChartData = {
      type: "bar",
      x: [],
      y: [],
      marker: {
        color: ["black"],
      },
    };

    fetch(
      "https://ucdpapi.pcr.uu.se/api/battledeaths/20.1?pagesize=100&year=2019"
    )
      .then((response) => response.json())
      .then((data) => {
        data.Result.filter((item) => {
          if (item.bd_best > 999) {
            // include only countires with over 999 deaths
            newChartData.x.push(item.battle_location);
            newChartData.y.push(item.bd_best);
            isDataLoaded = true;
          }
        });
        let newChartState = {
          ...chartState,
          data: [newChartData],
        };
        setChartState(newChartState);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function renderSkeleton() {
    return <>Laster...</>;
  }

  function renderPage() {
    return (
      <GraphContainer>
        <Plot
          data={chartState.data}
          layout={chartState.layout}
          frames={chartState.frames}
          config={chartState.config}
          onInitialized={(figure) => setChartState(figure)}
          onUpdate={(figure) => setChartState(figure)}
        />
      </GraphContainer>
    );
  }

  return <>{isDataLoaded === null ? renderSkeleton() : renderPage()}</>;
}

export const GraphContainer = styled.div`
  max-width: 90%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DataVisualisation;
