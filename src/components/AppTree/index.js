import React from 'react'
import Highcharts, { format } from 'highcharts'
import HighchartsTreeMap from 'highcharts/modules/treemap'
import ReactHighcharts from "highcharts-react-official";

export default function AppTree(props) {
    const {options} = props;
    HighchartsTreeMap(Highcharts)
    
    const configg = {
        series: [{
            type: 'treemap',
            stackLabels: {
                enabled: true,
                verticalAlign: 'bottom',
                crop: false,
                overflow: 'none',
                y: -275
            },
            layoutAlgorithm: 'squarified',
            animationLimit: 1000,
            data: options            
        }],
        title: {
            text: 'Highcharts Treemap'
        }
    };


    return (
        <ReactHighcharts highcharts={Highcharts} options={configg}>
        
        </ReactHighcharts>  
    )
}
