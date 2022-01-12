import React, { useEffect} from 'react'
import Highcharts from 'highcharts'
import HighchartsTreeMap from 'highcharts/modules/treemap'
import HighchartsColorAxis from 'highcharts/modules/heatmap.js'
import ReactHighcharts from "highcharts-react-official";
import { useDispatch, useSelector } from 'react-redux';
import { getAnalyticsForm } from '../../store/actions/tree/tree.actions';

export default function AppTree() {
    HighchartsTreeMap(Highcharts)
    HighchartsColorAxis(Highcharts)

    const dispatch = useDispatch();
    const tree = useSelector(state => state.tree)

    useEffect(() => {
        if(!tree.treeLabels){
            dispatch(getAnalyticsForm())
        }
    }, [tree.treeLabels])
    
    const treeConfig = {
        colorAxis: {
            minColor: '#c6c6ea',
            maxColor: '#4D4DFF',
        },
        legend: {
            enabled: false
           },
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            allowDrillToNode: true,
            animationLimit: 1000,
            alternateStartingDirection: true,
            dataLabels: {
                enabled: false
            },
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true,
                    verticalAlign: 'middle',
                    allowOverlap: true,
                    crop: false,
                    style: {
                        fontSize: '12px',
                        textAlign: "center",
                        color: "#fff",
                    },
                    format:'{point.name}</br><b>{point.value}</b>'
                },
                borderWidth: 3,
                levelIsConstant: false
            }, {
                level: 1,
                dataLabels: {
                    style: {
                        fontSize: '14px',
                        textAlign: "center",
                        color: "#fff",
                    },
                    format:'{point.name}:</br>{point.value}',
                }
            }],
            data: tree?.treeLabels            
        }],
        title:{
            text: null
            }
    };


    return (
        <ReactHighcharts highcharts={Highcharts} options={treeConfig}>
        
        </ReactHighcharts>  
    )
}
