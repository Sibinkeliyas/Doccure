import React from 'react'
import * as echarts from 'echarts';
import { useEffect } from 'react';

function Chart({blocked , unblocked , title , id}) {
   useEffect(() => {
        var chartDom = document.getElementById(id);
        var myChart = echarts.init(chartDom);
        const option = {
  title: {
    text: title,
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: unblocked, name: 'Active  ' },
        { value: blocked, name: 'Non-active' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
     myChart.setOption(option);
   } , [blocked, id, title, unblocked])
  return (
    <div id={id} style={{ height: '400px' }} className='col-12'>
      
    </div>
  )
}

export default Chart
