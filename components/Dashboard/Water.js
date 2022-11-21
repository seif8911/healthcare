import React from 'react'
import { ResponsiveBump,Bump } from '@nivo/bump'

const   Water = () => {
    const data =[
        {
          "id": "Water",
          "data": [
            {
              "x": 3,
              "y": 5
            }
            ,
            {
              "x": 2,
              "y": 2

            },
            {
              "x": 1,
              "y": 1
            },
           
          ]
        }
      ]
  return (
      <ResponsiveBump
        data={data}
        colors={{ scheme: 'category10' }}
        lineWidth={4}
        activeLineWidth={4}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        startLabelPadding={15}
        startLabelTextColor="black"
        endLabel={false}
        pointSize={1}
        activePointSize={2}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={12}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        enableGridX={false}
        enableGridY={false}
        axisTop={null}
        axisBottom={null}
        axisLeft={null}
        motionConfig="wobbly"
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        axisRight={null}
    />
 
  )
}

export default Water