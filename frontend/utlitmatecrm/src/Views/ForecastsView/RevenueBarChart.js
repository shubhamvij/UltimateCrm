/**
 * Created by jackzhang on 6/26/17.
 */
import React from 'react';
import customer_values from '../../data/customer_values.js';
import { LineChart, Line } from 'recharts';

const margin = {top: 10, right: 20, bottom: 30, left: 40};
var BarChart = require('react-d3-basic').BarChart;

class RevenueBarChart extends React.Component{
    constructor() {
        super();
        this.generalChartData = require('../../data/customer_values.csv');
        console.log(customer_values);
        this.width = 700;
        this.height = 400;
        this.title = "Bar Chart";
        this.chartSeries = [
            {
                field: 'frequency',
                name: 'Frequency'
            }
        ];
        this.x = function (d) {
            return d.letter;
        };
        this.xScale = 'ordinal';
        this.xLabel = "Time";
        this.yLabel = "Value";
        this.yTicks = [10, "%"];
    }

    /*getInitialState() {
        return { width: 500 };
    }*/

    /*componentDidMount: () => {
        window.onresize = () => {
            this.setState({width: this.refs.root.offsetWidth});
        };
    }*/

    /*handleBarClick(element, id){
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    }*/

    render() {
        var width = 700,
            height = 300,
            margins = {left: 100, right: 100, top: 50, bottom: 50},
            title = "User sample",
            // chart series,
            // field: is what field your data want to be selected
            // name: the name of the field that display in legend
            // color: what color is the line
            chartSeries = [
                {
                    field: 'BMI',
                    name: 'BMI',
                    color: '#ff7f0e'
                }
            ],
            // your x accessor
            x = function(d) {
                return d.index;
            }
        /*<LineChart width={400} height={400} data={customer_values}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>*/
        return (
            <div>


        <BarChart
            title= {this.title}
            data= {customer_values}
            width= {this.width}
            height= {this.height}
            chartSeries = {this.chartSeries}
            x= {this.x}
            xLabel= {this.xLabel}
            xScale= {this.xScale}
            yTicks= {this.yTicks}
            yLabel = {this.yLabel}
        />
            /*<div ref='root'>
                <div style={{width: '10%'}}>
                    <BarChart ylabel='$ in Thousands'
                              width={1200}
                              height={400}
                              margin={margin}
                              data={customer_values}/>
                </div>
            </div>*/
            </div>

        );
    }
};

export default RevenueBarChart;