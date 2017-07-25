import React, { Component } from 'react';
import { render } from 'react-dom'
import { BarChart, PieChart, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import '../../material.css';
import './issueView.css'


const testData = [
    {id: '1', title: 'Test 1'},
    {id: '2', title: 'Test 2' },
    {id: '3', title: 'Test 3'},
    {id: '4', title: 'Test 4'},
    {id: '5', title: 'Test 5'},
  ]

const barData = [
      {name: 'Jan', open: 40, closed: 24, amt: 24},
      {name: 'Feb', open: 30, closed: 13, amt: 13},
      {name: 'Mar', open: 20, closed: 19, amt: 19},
      {name: 'Apr', open: 27, closed: 20, amt: 20},
      {name: 'May', open: 18, closed: 18, amt: 18},
      {name: 'Jun', open: 23, closed: 20, amt: 20},
];

const pieData = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;  

class IssueView extends Component {
  constructor(){
    super();
    this.state = {issues:[], filter:'all', tab:'user', showInput: false, form_title: '', form_notes: '', form_cus_id: '', form_issue_type_id: '1'};
  }

  componentDidMount(){
    this.fetchIssues = this.fetchIssues.bind(this);
    this.closeIssue = this.closeIssue.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.renderViewBody = this.renderViewBody.bind(this);
    this.renderFABButton = this.renderFABButton.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.processFrom = this.processFrom.bind(this);

    this.fetchIssues();
  }

  fetchIssues(){
      fetch('http://rectum.herokuapp.com/api/issues')
      .then(result => result.json())
      .then(issues => this.setState({issues}));
  }

  closeIssue(issueId) {
     this.state.issues.map((item) => {
        if(item.id === issueId){
          console.log('test');
          item.closed_by_id = this.props.activeCustomerId? this.props.activeCustomerId: 0;
        }
     });
     this.forceUpdate();
  }

  reopenIssue(issueId){
    this.state.issues.map((item) => {
        if(item.id === issueId){
          item.closed_by_id = null;
        }
     });
     this.forceUpdate();
  }

  filterItem(item) {
    var is_open = item.closed_by_id == null? true: false;
    if (this.state.filter === 'all'){
      return is_open;
    } else if (this.state.filter === 'open_me'){
      return (item.opened_by.id === this.props.activeCustomerId? this.props.activeCustomerId: item.opened_by.id) && is_open; 
    } else if (this.state.filter === 'ass_me'){
      return (item.assigned_to.id === this.props.activeCustomerId? this.props.activeCustomerId: item.assigned_to.id) && is_open;
    } else if (this.state.filter === 'closed'){
      return !is_open;
    }
  }

  processFrom(){
    var date = new Date();
    fetch('http://localhost:3000/api/issue/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "customer_id": this.state.form_cus_id,
            "opened_by_id": 9,
            "assigned_to_id": 9,
            "created_at": date.toISOString(),
            "updated_at": date.toISOString(),
            "title": this.state.form_title,
            "priority": 1,
            "issue_type_id": this.state.form_issue_type_id,
            "issue_notes": this.state.form_notes
          })
        }).then(() => {
          this.setState({form_cus_id: '', form_title: '', form_notes: '', form_issue_type_id: '1', showInput: false});
          this.fetchIssues()});
  }

  handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
  }

  renderViewBody(){
    if (this.state.showInput && this.state.tab === 'user'){
      return <div className="mdc-elevation--z2">
                <div className="mdc-card">
                  <section className="mdc-card__primary">
                    <h2>Add Issue</h2>
                    <div className="mdc-textfield mdc-textfield--fullwidth">
                      <input className="mdc-textfield__input"
                             type="text"
                             placeholder="Title"
                             aria-label="Full-Width Textfield"
                             name="form_title"
                             value={this.state.form_title}
                             onChange={this.handleInputChange}/>
                    </div>
                    <div className="mdc-textfield mdc-textfield--fullwidth">
                      <input className="mdc-textfield__input"
                             type="text"
                             placeholder="Customer ID"
                             aria-label="Full-Width Textfield"
                             name="form_cus_id"
                             value={this.state.form_cus_id}
                             onChange={this.handleInputChange}/>
                    </div>
                      <select className="mdc-select" name="form_issue_type_id" value={this.state.form_issue_type_id} onChange={this.handleInputChange}>
                        <option value='1'>Manufacturing Defect</option>
                        <option value='2'>Worn Part</option>
                        <option value='3'>Paint</option>
                        <option value='4'>User Error</option>
                      </select>
                    <div className="mdc-textfield mdc-textfield--fullwidth">
                      <input className="mdc-textfield__input"
                             type="text"
                             placeholder="Notes"
                             aria-label="Full-Width Textfield"
                             name="form_notes"
                             value={this.state.form_notes}
                             onChange={this.handleInputChange}/>
                    </div>
                  </section>
                </div>
              </div>
    } else if (this.state.tab === 'user'){
      return <div className="mdc-elevation--z2">
                {this.state.issues.filter(this.filterItem).map((item) => <div className="mdc-card">
                  <section className="mdc-card__primary">
                    <h1 className="mdc-card__title mdc-card__title--large">{item.title}<br/></h1>
                    <h2 className="mdc-card__subtitle">Assigned to: {item.assigned_to.first_name} {item.assigned_to.last_name}
                        <br/>Opened by: {item.opened_by.first_name} {item.opened_by.last_name}
                    </h2>
                  </section>
                  <section className="mdc-card__supporting-text">
                    <p><h3>Issue: {item.issue_type.name}</h3>{item.issue_type.description}</p>
                    <p><h3>Notes:</h3>{item.issue_notes}</p>
                  </section>
                  <section className="mdc-card__actions">
                    {item.closed_by_id? (<button className="mdc-button mdc-button--compact mdc-card__action" onClick={() => this.reopenIssue(item.id)}>Reopen</button>) 
                    : (<button className="mdc-button mdc-button--compact mdc-card__action" onClick={() => this.closeIssue(item.id)}>Close</button>)}
                  </section>
                </div>)}
            </div>  
    } else if (this.state.tab === 'manager'){
        return <div className="mdc-elevation--z2">
                  <div className="mdc-card">
                      <section className="mdc-card__primary">
                      <div className="mdc-layout-grid">
                        <div className="mdc-layout-grid__inner">
                          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                            <h1>Issues Performance for July</h1>
                          </div>
                          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                            <h2>Issues Closed</h2>
                          </div>
                          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                            <h2>Issues Opened</h2>
                          </div>
                          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                            <h2>Issues Remaining</h2>
                          </div>
                          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                            <h2>15</h2>
                          </div>
                          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                            <h2>20</h2>
                          </div>
                          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                            <h2>5</h2>
                          </div>
                        </div>
                      </div>
                      </section>
                    </div>
                    <div className="mdc-card">
                      <section className="mdc-card__primary">
                        <h1>Issues Performance by Month</h1>
                        <BarChart width={600} height={300} data={barData}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                         <XAxis dataKey="name"/>
                         <YAxis/>
                         <CartesianGrid strokeDasharray="3 3"/>
                         <Tooltip/>
                         <Legend />
                         <Bar dataKey="closed" fill="#8884d8" />
                         <Bar dataKey="open" fill="#82ca9d" />
                        </BarChart>
                      </section>
                    </div>
                  </div>
    }
    
  }

  renderFABButton(){
    if (this.state.showInput){
      return <div>{this.state.tab === 'user' &&  <button onClick={() => this.processFrom()} className="mdc-fab material-icons add-button-right" aria-label="Done">
                    <span className="mdc-fab__icon">
                      done
                    </span>
              </button>}
             </div>
    }
    return <div> {this.state.tab === 'user' &&  <button onClick={() => this.setState({showInput: true})} className="mdc-fab material-icons add-button-right" aria-label="Add">
                  <span className="mdc-fab__icon">
                    add
                  </span>
            </button>}
            </div>
  }

  render() {
    return (
        <div>
            <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">
                  <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                     <nav id="basic-tab-bar" className="mdc-tab-bar">
                        {this.state.tab === 'user' ? (<a className="mdc-tab mdc-tab--active" href="#one" onClick={() => this.setState({tab: 'user'})}>User</a>)
                          : (<a className="mdc-tab" href="#one" onClick={() => this.setState({tab: 'user'})}>User</a>)}
                          {this.state.tab === 'manager' ? (<a className="mdc-tab mdc-tab--active" href="#two" onClick={() => this.setState({tab: 'manager', showInput: false})}>Manager</a>)
                          : (<a className="mdc-tab" href="#two" onClick={() => this.setState({tab: 'manager', showInput: false})}>Manager</a>)}
                        <span className="mdc-tab-bar__indicator"></span>
                      </nav>
                  </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                        <nav className="mdc-permanent-drawer mdc-typography">
                          <nav id="icon-with-text-demo" className="mdc-list">
                            <a className="mdc-list-item mdc-permanent-drawer--selected" href="#" onClick={() => this.setState({filter: 'all', showInput: false, tab:'user'})}>
                              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>All
                            </a>
                            <a className="mdc-list-item" href="#" onClick={() => this.setState({filter: 'open_me', showInput: false, tab:'user'})}>
                              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Opened by me
                            </a>
                            <a className="mdc-list-item" href="#" onClick={() => this.setState({filter: 'ass_me', showInput: false, tab:'user'})}>
                              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Assigned to me
                            </a>
                            <a className="mdc-list-item" href="#" onClick={() => this.setState({filter: 'closed', showInput: false, tab:'user'})}>
                              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Closed
                            </a>
                          </nav>
                        </nav>
                    </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
                    { this.renderViewBody() }
                    { this.renderFABButton() }
                    </div>
                  </div>
            </div>  
      </div>
    );
  }
}

export default IssueView;
