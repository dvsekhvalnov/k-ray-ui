import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "Recharts"
import BarTooltip from './BarTooltip'

const Timeline = (props) => {

    //Because recharts will fail if we pass 'undefined' children into BarChart
    const tooltip = props.showDetails
      ? <Tooltip content={ <BarTooltip /> }/>
      : <span />

    return (
      <ResponsiveContainer width="100%" height={50}>
        <BarChart width={600} height={35} data={props.data} barGap={0}
                  barCategoryGap={0}
      			      barSize={20}
      			      margin={{top: 0, right: 5, left: 5, bottom: 0}}>          
          <Bar dataKey={props.dataKey} fill="#82ca9d" />
          {tooltip}
        </BarChart>
      </ResponsiveContainer>
    );
  }

export default Timeline;
