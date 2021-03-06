/**
 * Created by jackzhang on 6/26/17.
 */
import React from 'react';
import customer_values from '../../data/customer_values.js';
import { BarChart, PieChart, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const margin = {top: 10, right: 20, bottom: 30, left: 40};

class RevenueBarChart extends React.Component{
    constructor() {
        super();
        this.state = {customerData: []};
        this.width = 700;
        this.height = 400;
        this.title = "Bar Chart";
        this.x = function (d) {
            return d.letter;
        };

    }

    componentDidMount(){
        /*fetch(`http://rectum.herokuapp.com/api/customer/` + this.props.customer_id)
            .then(result=>result.json())
            .then(customerData=>this.setState({customerData}))*/
    }

    render() {
        console.log(this.props.est_value);
        return (
            <div>

                <BarChart width={this.width} height={this.height} data={this.props.est_value}
                          margin={{top: 5, right: 30, left: 30, bottom: 5}}>
                    <XAxis dataKey="date" label="Time" />
                    <YAxis dataKey="value"/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </div>

        );
    }
};

export default RevenueBarChart;