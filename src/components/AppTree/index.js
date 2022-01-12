import React, { useEffect, useState} from 'react'
import Highcharts from 'highcharts'
import HighchartsTreeMap from 'highcharts/modules/treemap'
import HighchartsColorAxis from 'highcharts/modules/heatmap.js'
import ReactHighcharts from "highcharts-react-official";
import data from '../../data/data.json'

export default function AppTree() {
    const [result, setResult] = useState([])
    HighchartsTreeMap(Highcharts)
    HighchartsColorAxis(Highcharts)

    useEffect(()=> {
        const labelTypes = [
            ...new Set(data[0].labels.map((label) => label.type))
        ]
        if(labelTypes.find((item) => item === "cluster")){
            const clusterLabels = data[0].labels.filter((label) => label.type === "cluster")
            const getUniqueNames = [...new Set(
                clusterLabels.map((label) => label.name)
            )]
            const resultTable = [];
            getUniqueNames.map((item) => resultTable.push({
                id: item,
                name: item,
            }))
            console.log(clusterLabels)
            for(let i=0; i < clusterLabels.length; i++){
                const getValue = eval(`[${clusterLabels[i].value}]`);
                const getSpanText = clusterLabels[i];
                resultTable.push({
                    id: getSpanText.span_text,
                    name: getSpanText.span_text,
                    value: getValue[0].elements.length,
                    colorValue: getValue[0].elements.length,
                    parent: clusterLabels[i].name
                })
                getValue[0].elements.map((item) => 
                    resultTable.push({
                        name: item.text,
                        value: item.count,
                        colorValue: item.count,
                        parent: getSpanText.span_text,
                    })
                )
            }
            
            setResult(resultTable)
        }else{
            const resultTable = labelTypes.map((label) => ({
                id: label,
                name: label
            }))
            for(let i=0; i < labelTypes.length; i++){
                const uniqueLabels = data[0].labels.filter((label) => label.type === labelTypes[i])
                const getUniqueWords = [
                    ...new Set(
                        uniqueLabels.map((label) => label.value)
                    )
                ]
                getUniqueWords.map((word) => {
                    const resultValue = uniqueLabels.filter((label) => label.value === word).length
                    resultTable.push({
                            name: word, 
                            value: resultValue,
                            parent: labelTypes[i],
                            colorValue: resultValue,
                        })
                })
            }
            setResult(resultTable)
        }
    }, [])

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
            stackLabels: {
                enabled: true,
                verticalAlign: 'bottom',
                crop: false,
                overflow: 'none',
                y: -275
            },
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
            }, 
            {
                level: 1,
                dataLabels: {
                    style: {
                        fontSize: '14px',
                        textAlign: "center",
                        color: "#fff",
                    },
                    format:'{point.name}:</br>{point.value}',
                }
            },
            {
                level: 1,
                dataLabels: {
                    style: {
                        fontSize: '14px',
                        textAlign: "center",
                        color: "#fff",
                    },
                    format:'{point.name}:</br>{point.value}',
                }
            },
            ],
            data: result            
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
