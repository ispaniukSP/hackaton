import React, {useState, useEffect} from 'react'
import Highcharts, { format } from 'highcharts'
import HighchartsTreeMap from 'highcharts/modules/treemap'
import HighchartsColorAxis from 'highcharts/modules/heatmap.js'
import ReactHighcharts from "highcharts-react-official";
import { useDispatch, useSelector } from 'react-redux';
import { getAnalyticsForm } from '../../store/actions/tree/tree.actions';

export default function AppTree(props) {
    HighchartsTreeMap(Highcharts)
    HighchartsColorAxis(Highcharts)

    const dispatch = useDispatch()
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
            align: 'center',
            dataLabels: {
                enabled: false
            },
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true,
                    format:'{point.name}</br><b>{point.value}</b>'
                },
                borderWidth: 3,
                levelIsConstant: false
            }, {
                level: 1,
                width: 50,
                dataLabels: {
                    style: {
                        fontSize: '14px',
                        textAlign: "center"
                    },
                    format:'{point.name}</br><b>{point.value}</b>',
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
