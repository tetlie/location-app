import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';


function DataVisualisation() {

  const [chartState, setChartState] = useState({
    data: [],
    layout: {
      width: '100%',
      height: 600,
      title: 'Deaths in conflict 2019',
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      showlegend: false

    },
    frames: [],
    config: {}
  });

  

  useEffect(() => {

    let newChartData = {
      type: 'bar',
      x: [],
      y: [],
      marker: {
        color: ['black']
      },
    }

    fetch('https://ucdpapi.pcr.uu.se/api/battledeaths/20.1?pagesize=100&year=2019')
      .then(response =>response.json())
      .then(data => {
        // data.Result.forEach(item => console.log(item))
        data.Result.forEach(item => {
          if (item.bd_best > 1000) {
          newChartData.x.push(item.battle_location)
          newChartData.y.push(item.bd_best)
        }
        })
        
        let newChartState = {
          ...chartState,
          data: [newChartData]
        };

        setChartState(newChartState)
        
      })
      .catch(error => {
        console.log(error)
      })

  }, [])

  return (
    <>
      <Plot
        data={chartState.data}
        layout={chartState.layout}
        frames={chartState.frames}
        config={chartState.config}
        onInitialized={(figure) => setChartState(figure)}
        onUpdate={(figure) => setChartState(figure)}
      />
    </>
  )
};


export default DataVisualisation;