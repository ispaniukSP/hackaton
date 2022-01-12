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
            const resultTable = [
                {
                    id: "cluster",
                    name: "cluster"
                }
            ]
            for(let i=0; i < getUniqueNames.length; i++){
                const typeIndex = clusterLabels.findIndex((item) => item.name === getUniqueNames[i]);
                const getValue = eval(`[${clusterLabels[typeIndex].value}]`);
                resultTable.push({
                    id: clusterLabels[typeIndex].name,
                    name: clusterLabels[typeIndex].name,
                    value: getValue[0].count,
                    colorValue: getValue[0].count,
                    parent: "cluster"
                })
                const getElements = getValue[0].elements 
                getElements.map((el) => resultTable.push({
                    parent: clusterLabels[typeIndex].name,
                    name: el.text,
                    value: el.count,
                    colorValue: el.count
                }))
                console.log(resultTable)
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
