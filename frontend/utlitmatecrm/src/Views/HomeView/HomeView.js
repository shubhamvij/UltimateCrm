import React, { Component } from 'react';
import { render } from 'react-dom'
import { BarChart, PieChart, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, RadarChart, Radar ,PolarGrid ,PolarAngleAxis ,PolarRadiusAxis } from 'recharts';

import '../../material.css';
import './home.css'

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
      
//      const dataPie = this.state.customerStagePieGraph;
      const data = this.state.customerStagePieGraph;
      console.log(this.state.customerStagePieGraph);
    return (
        <div>
            <center><h1> RECREATION USA CRM </h1>
        
            <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">
                <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                       <h3> Customer Classification Breakdown</h3>
                      <BarChart className="barPadding" width={600} height={300} data={this.state.customerStageBarGraph}
                                    margin={{top: 20, right: 30, left: 20, bottom: 5}}>
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
                        <h3>Aggregate Customer Classification Stage</h3>
                      {data && 
                        <RadarChart className="otherPadding" cx={300} cy={250} outerRadius={150} width={600} height={500} data={data} margin={{top: -20, right: 30, left: 20, bottom: 5}}>
                          <Radar name="Mike" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis/>
                        </RadarChart> 
                    }
                              
        
                    </div>
                                                                                      
                                                                                      
                  </div>
                    
               </div>    
        
         </center>
      </div>
    );
  }
}

export default HomeView;
