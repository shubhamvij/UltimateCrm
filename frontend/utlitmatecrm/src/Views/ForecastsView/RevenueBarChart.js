/**
 * Created by jackzhang on 6/26/17.
 */
import React from 'react';
import BarChart from 'react-bar-chart';
const data = [
    {text: 'January, 2017',	value: 1778437.75},
        {text:'February 2017',	value:1796222.128},
            {text:'March, 2017',	value:1814184.349},
                {text:'April, 2017',	value:1632765.914},
                    {text:'May, 2017',	value:1649093.573},
                        {text:'June, 2017',	value:1978912.288},
                            {text:'July, 2017',	value:1860177.55},
                                {text:'August, 2017',	value:1822973.999},
                                    {text:'September, 2017',	value:1841203.739},
                                        {text:'October, 2017',	value:2025324.113},
                                            {text:'November, 2017',	value:2045577.354},
                                                {text:'December, 2017',	value:1881931.166},
];
const margin = {top: 10, right: 20, bottom: 30, left: 40};


class RevenueBarChart extends React.Component{
    getInitialState() {
        return { width: 500 };
    }

    /*componentDidMount: () => {
        window.onresize = () => {
            this.setState({width: this.refs.root.offsetWidth});
        };
    }*/

    handleBarClick(element, id){
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    }

    render() {
        return (
            <div ref='root'>
                <div style={{width: '10%'}}>
                    <BarChart ylabel='$ in Thousands'
                              width={1200}
                              height={400}
                              margin={margin}
                              data={data}
                              onBarClick={this.handleBarClick}/>
                </div>
            </div>
        );
    }
};

export default RevenueBarChart;