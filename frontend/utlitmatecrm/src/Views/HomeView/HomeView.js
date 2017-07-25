import React, { Component } from 'react';
import { render } from 'react-dom'
import { BarChart, PieChart, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

import '../../material.css';

let customerTypeId = "1"
let companyTypeId = "2"

class HomeView extends Component {
    
    constructor() {
  	 super();
     this.state={customers:[], newCustomer:false, customerStageBarGraph:[], customerStagePieGraph: []};

  }
  componentDidMount(){
      console.log("HELO");
    fetch(`http://rectum.herokuapp.com/api/customers/`)
        .then(result=>result.json())
        .then(customers=> {
            var acquisition = 0
            var recovery = 0
            var maintenance = 0
            var termination = 0
            var acquisitionCompany = 0
            var recoveryCompany = 0
            var maintenanceCompany = 0
            var terminationCompany  = 0
            for (var i = 0; i < customers.length; i++) {
                console.log(i);
                if (customers[i].customer_type_id === parseInt(companyTypeId)) {
                    console.log(customers[i]);
                    if (customers[i].stage === "Recovery") {
                        recoveryCompany ++;
                    } else if (customers[i].stage === "Acquisition") {
                        acquisitionCompany ++;
                    } else if (customers[i].stage === "Maintenance") {
                        maintenanceCompany ++;
                    } else if (customers[i].stage === "Termination") {
                        terminationCompany ++;
                    }
                } else if (customers[i].customer_type_id === parseInt(customerTypeId)) {
                    console.log(customers[i]);

                    if (customers[i].stage === "Recovery") {
                        recovery ++;
                    } else if (customers[i].stage === "Acquisition") {
                        acquisition ++;
                    } else if (customers[i].stage === "Maintenance") {
                        maintenance ++;
                    } else if (customers[i].stage === "Termination") {
                        termination ++;
                    }
                }
            }
            console.log(customers);
            
            var customerStageBarGraphNew = [
              {name: 'Acquisition', company: acquisitionCompany, individual: acquisition, amt: 24},
              {name: 'Maintenance', company: maintenanceCompany, individual: maintenance, amt: 13},
              {name: 'Recovery', company: recoveryCompany, individual: recovery, amt: 19},
              {name: 'Termination', company: terminationCompany, individual: termination, amt: 20},
            ];
        
        var customerStagePieGraphNew = [
          {name: 'Acquisition', value: acquisitionCompany + acquisitionCompany},
          {name: 'Maintenance', value: maintenanceCompany + maintenance},
          {name: 'Recovery', value: recoveryCompany + recovery},
          {name: 'Termination', value: terminationCompany + termination}];
        
        
        

        
        
        
          
            this.setState({customerStageBarGraph: customerStageBarGraphNew, customerStagePieGraph: customerStagePieGraphNew});

        })
    

    
    this.clickCustomerCallback = this.clickCustomerCallback.bind(this);

  }
    
    clickCustomerCallback(id) {
      console.log("HELLO SIRS");
      console.log(id);
      this.props.navigateToCustomerPage(id);
  }
    
  

  render() {
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180; 
      
    return (
        <div>
            <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">
                <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                      <BarChart width={600} height={300} data={this.state.customerStageBarGraph}
                                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                               <XAxis dataKey="name"/>
                               <YAxis/>
                               <CartesianGrid strokeDasharray="3 3"/>
                               <Tooltip/>
                               <Legend />
                               <Bar dataKey="company" fill="#8884d8" />
                               <Bar dataKey="individual" fill="#82ca9d" />
                              </BarChart>
                    </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                      
                      <PieChart width={600} height={300} onMouseEnter={this.onPieEnter}
                            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Pie
                          data={this.state.customerStagePieGraph} 
                          cx={120} 
                          cy={200} 
                          innerRadius={60}
                          outerRadius={80} 
                          fill="#8884d8"
                          paddingAngle={5}>
                            {
                                this.state.customerStagePieGraph.map((entry, index) => <Cell dataKey={entry.name} fill={COLORS[index % COLORS.length]}/>)
                            }
                        </Pie>
                    </PieChart>
                    </div>
                                                                                      
                                                                                      
                  </div>
                    
               </div>    
        
        
      </div>
    );
  }
}

export default HomeView;
