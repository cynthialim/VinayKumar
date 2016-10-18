/**
 * Copyright © 2016. All Rights Reserved
 *
 * Created by vinay.adepu.
 * Description:
 *
 */
var React = require("react");
var ReactDOM = require("react-dom");
import '../bower_components/bootstrap/dist/css/bootstrap.min.css';
import '../bower_components/components-font-awesome/css/font-awesome.min.css';
import '../src/css/styles.css';
import headerlogo from '../src/img/headerlogo.png';
import profilepic from '../src/img/vinay.png';
var customData = require('./fixtures/kpiList.xml')


"use strict";
(function(){

    var UserInfo = React.createClass({
        getInitialState: function() {
            return {
                username: 'Vinay Kumar Adepu',
                userPoints: '82',
                image:'vinay'
            };
        },
        render: function() {
            return (
                <div>
                    <div className="thumbnail-profile"><img className="user-img" src={profilepic} alt="" /></div>
                    <div className="caption"><h4>{this.state.username}</h4></div>
                    <div className="credits"><span className="credit-span"></span>{this.state.userPoints}</div>
                </div>
            );
        }
    });

    var KpiObject = React.createClass({
        getInitialState: function(){
            console.log(this.props);
            return {};
        },
        getKPIDetails: function(details){
            console.log(details.id);
            this.props.kpiDetails(details);
        },
        deleteKPI: function(details){
            console.log(details.id);
            this.props.deleteEvent(details, "delete");
        },
        render: function(){
            return (<tr>
                        <td className="list-elem-thumb">
                            <div className="kpi-type">{this.props.kpiobject.kpiType}</div>
                        </td>
                        <td className="list-elem-text">
                            <a onClick={this.getKPIDetails.bind(this, this.props.kpiobject)}  href="javascript:;"><h5>{this.props.kpiobject.kpiName}</h5></a>
                            <h6>Actual: {this.props.kpiobject.actual}% | Target: {this.props.kpiobject.target}% | UOM: {this.props.kpiobject.uom}</h6>
                        </td>
                        <td className="list-elem-ico">
                            <a href="javascript:;"><i className="fa fa-pencil-square-o fa-lg"  aria-hidden="true" onClick={this.getKPIDetails.bind(this, this.props.kpiobject)}></i></a>
                            <a href="javascript:;"><i className="fa fa-trash fa-lg" aria-hidden="true"  onClick={this.deleteKPI.bind(this, this.props.kpiobject)}></i></a>
                        </td>
                    </tr>);
        }
    });

    var KpiList = React.createClass({
        getInitialState: function() {
            console.log(this.props);
            return {
                createKPI: this.props.createkpi,
                kpiList: this.props.kpiList
            };
        },

        setKPIMode : function() {
            //this.setState({createKPI:true});
            this.props.setKpiMode(true);
        },

        render: function(){
            return (<div>
                    <div className="content-wrapper">
                        <div className="kpi-heading">KPI List <button className="btn btn-default btn-xs pull-right" onClick={this.setKPIMode}>Add KPI</button></div>
                        <div className="table-responsive table-responsive-list">
                            <div className="div-list">
                                <table className="listTable">
                                    <tbody>
                                    {this.state.kpiList.map(function(item, i) {
                                        var boundClick = this.props.kpiDetails.bind(null, item);
                                        var deleteKPI = this.props.updateEvent.bind(null, item, "delete");
                                        return (
                                            <KpiObject kpiDetails={boundClick} deleteEvent={deleteKPI} key={"kpi"+i} kpiobject={item}/>
                                        );
                                    }, this)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </div>);
        }
    });

    var CreateKPI = React.createClass({
        getInitialState: function() {
            return {
                id:0,
                kpiType:"N",
                kpiName:"",
                target:"",
                actual:"",
                uom:"",
                dueDate:""
            };
        },
        handleKPITypeChange: function(event) {
            this.setState({kpiType: event.target.value});
        },
        handleKPINameChange: function(event) {
            this.setState({kpiName: event.target.value});
        },
        handleTargetChange: function(event) {
            this.setState({target: event.target.value});
        },
        handleActualChange: function(event) {
            this.setState({actual: event.target.value});
        },
        handleUOMChange: function(event) {
            this.setState({uom: event.target.value});
        },
        handleDueDateChange: function(event) {
            this.setState({dueDate: event.target.value});
        },
        handleSubmit: function(e) {
            e.preventDefault();
            if(!(this.state.kpiName && this.state.uom && this.state.target)){
                return;
            }
            this.state["createdOn"] = new Date();
            this.state["updatedOn"] = new Date();
            console.log(this.state);
            this.props.saveEvent(this.state);
            this.setState({
                id:0,
                kpiType:"N",
                kpiName:"",
                target:"",
                actual:"",
                uom:"",
                dueDate:""
            });
        },
        render: function(){
            return (
                <div>
                <form className="kpi-form" onSubmit={this.handleSubmit}>
                    <fieldset>
                    <legend>Add KPI</legend>
                    <div className="form-group">
                        <label>KPI Type</label>
                        <select id="kpiType" className="form-control" value={this.state.kpiType} onChange={this.handleKPITypeChange}>
                            <option value="T">Translate</option>
                            <option value="C">Cascade</option>
                            <option value="N">New</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>KPI Name</label>
                        <input  className="form-control" value={this.state.kpiName} id="kpiName" type="text" onChange={this.handleKPINameChange}/>
                    </div>
                    <div className="form-group">
                        <label>Target</label>
                        <input  className="form-control" value={this.state.target} id="target" type="number" onChange={this.handleTargetChange}/>
                    </div>
                    <div className="form-group">
                        <label>UOM</label>
                        <input className="form-control" value={this.state.uom} id="uom" type="text" onChange={this.handleUOMChange}/>
                    </div>
                    <div className="form-group">
                        <label>Due Date</label>
                        <input className="form-control" value={this.state.dueDate} id="dueDate" type="date" onChange={this.handleDueDateChange}/>
                    </div>
                    <div className="form-group">
                        <input className="btn btn-success" type="submit" value="Save" />
                    </div>
                    </fieldset>
                </form>
                </div>
            );
        }
    });

    var ViewKPI = React.createClass({
        getInitialState: function() {
            return this.props.updateObj;
        },
        handleKPITypeChange: function(event) {
            this.setState({kpiType: event.target.value});
        },
        handleKPINameChange: function(event) {
            this.setState({kpiName: event.target.value});
        },
        handleTargetChange: function(event) {
            this.setState({target: event.target.value});
        },
        handleActualChange: function(event) {
            this.setState({actual: event.target.value});
        },
        handleUOMChange: function(event) {
            this.setState({uom: event.target.value});
        },
        handleDueDateChange: function(event) {
            this.setState({dueDate: event.target.value});
        },
        handleSubmit: function(e) {
            e.preventDefault();
            if(!(this.state.kpiName && this.state.uom && this.state.target)){
                return;
            }
            this.state["updatedOn"] = new Date();
            console.log(this.state);
            this.props.updateEvent(this.state, "put");
        },
        render: function(){
            return (
                <div>
                <form className="kpi-form" onSubmit={this.handleSubmit}>
                    <fieldset><legend>Edit KPI</legend>
                    <div className="form-group">
                        <label>KPI Type</label>
                        <select id="kpiType" disabled className="form-control"  value={this.state.kpiType} onChange={this.handleKPITypeChange}>
                            <option value="T">Translate</option>
                            <option value="C">Cascade</option>
                            <option value="N">New</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>KPI Name</label>
                        <input className="form-control" id="kpiName"  value={this.state.kpiName} type="text" onChange={this.handleKPINameChange}/>
                    </div>
                    <div className="form-group">
                        <label>Target</label>
                        <input  className="form-control"  value={this.state.target} disabled id="target" type="number"/>
                    </div>
                    <div className="form-group">
                        <label>Actual</label>
                        <input className="form-control"  value={this.state.actual} onChange={this.handleActualChange} id="target" type="number"/>
                    </div>
                    <div className="form-group">
                        <label>UOM</label>
                        <input className="form-control"  value={this.state.uom} disabled id="uom" type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Due Date</label>
                    <input className="form-control"  value={this.state.dueDate} id="dueDate" type="date" onChange={this.handleDueDateChange}/>
                    </div>
                    <div className="form-group">
                        <input className="btn btn-success" type="submit" value="Update" />
                    </div>
                    </fieldset>
                </form>
                </div>
            );
        }
    });

    var PieChart = React.createClass({
        //Width and height
        getInitialState: function(){
            var data = this.props.kpiList;
            var translate=0,cascade=0,normal = 0;
            for(var i = 0; i < data.length; i++){
                // console.log(JSON.stringify(data[i]));
                if(data[i].kpiType === "T"){
                    translate = translate + 1;
                }
                if(data[i].kpiType === "C"){
                    cascade = cascade + 1;
                }
                if(data[i].kpiType === "N"){
                    normal = normal + 1;
                }
            }
            return {
                width:250,
                height:250,
                dataset:[
                    { id:1, label: 'Translate', count: translate?parseFloat((translate/data.length)*100).toFixed(2):0 },
                    { id:2, label: 'Cascade', count: cascade?parseFloat((cascade/data.length)*100).toFixed(2):0 },
                    { id:3, label: 'Normal', count: normal?parseFloat((normal/data.length)*100).toFixed(2):0 }
                ],
                outerRadius: 250 / 2,
                innerRadius:0
            }
        },
        componentDidMount: function(){
            var arc = d3.svg.arc()
                .innerRadius(this.state.innerRadius)
                .outerRadius(this.state.outerRadius);

            var pie = d3.layout.pie().value(function(d) { return d.count; })
                .sort(null)
            var color = d3.scale.category20();

            // Create SVG element
            var svg = d3.select("#pieChart")
                .append("svg")
                .attr("width", this.state.width)
                .attr("height", this.state.height);

            // Set up groups
            var arcs = svg.selectAll("g.arc")
                .data(pie(this.state.dataset))
                .enter()
                .append("g")
                .attr("class", "arc")
                .attr("transform", "translate(" + this.state.outerRadius + "," + this.state.outerRadius + ")")
                .on("mouseover", function (d) {
                    var toolTipObj = d3.select("#tooltip")
                        .style("left", d3.event.pageX-1800 + "px")
                        .style("top", d3.event.pageY-100 + "px")
                        .style("opacity", 1)
                        .style("fill-opacity", "1")
                        .style("stroke-width", "3px");
                    toolTipObj.select("#value")
                        .text(d.data.count);
                    toolTipObj.select("#labelName")
                        .text(d.data.label);
                })
                .on("mouseout", function () {
                    // Hide the tooltip
                    d3.select("#tooltip")
                        .style("opacity", 0);;
                });

            // Draw arc paths
            arcs.append("path")
                .attr("fill", function(d) {
                    return color(d.data.label);
                })
                .attr("stroke", "#fff")
                .attr("stroke-width", "0")
                .attr("d", arc)
                .classed("slice",true)
                .attr("style","cursor:pointer;")
                .append("svg:title")
                .text(function(d) { return d.data.label; });;

            // Labels
            arcs.append("text")
                .attr("transform", function (d) {
                    return "translate(" + arc.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .style("font-size", "18px")
                .text(function (d) {
                    return d.data.count;
                });
        },
        render: function(){
            return (<div className="pie-chart"><div id="tooltip" className="default-hidden">
                <p><strong><label id="labelName"></label></strong>
            </p>
            <p><span id="value"></span>%</p>
            </div><fieldset><legend>KPI Type Percentage(%)</legend><div key={this.props.kpiList.length} id="pieChart"></div></fieldset></div>);
        }
    });


    var Content = React.createClass({
        getInitialState: function() {
            return {
                createKPI:true,
                kpiList: [],
                updateObj:{}
            };
        },

        getKPIDetails: function(obj){
            console.log("Edit Obj---"+JSON.stringify(obj));
            //this.forceUpdate();
            this.setState({createKPI:false, updateObj:obj});
        },

        setKPIMode : function(mode, obj) {
            this.setState({createKPI:mode});
        },

        updateKPI: function(obj, eventType){
            if(eventType === "delete"){
                this.deleteKPI(obj)
            } else {
                var kpis = this.state.kpiList;
                for(var i = 0; i < kpis.length; i++){
                    if(kpis[i].id === obj.id){
                        kpis[i] = obj;
                    }
                }
                this.setState({createKPI:false, kpiList:kpis});
            }
        },

        deleteKPI: function(obj) {
            var kpis = this.state.kpiList;
            for(var i = 0; i < kpis.length; i++){
                if(kpis[i].id === obj.id){
                    kpis.splice(i, 1);
                    break;
                }
            }
            this.setState({createKPI:false, kpiList:kpis});
        },

        saveKPI: function(obj){
            var kpis = this.state.kpiList;
            obj["id"] = kpis.length+1;
            kpis.push(obj);
            this.setState({kpiList:kpis});
            this.props.updateNotification();
        },

        updateStateList: function(xml){
            var xmlDoc = xml.responseXML;
            var list = xmlDoc.getElementsByTagName("KPI");
            console.log(list);
        },

        componentDidMount: function() {
            for(var i = 0; i < customData.kpiList.kpi.length; i++){
                for(var key in customData.kpiList.kpi[i]){
                    customData.kpiList.kpi[i][key] = customData.kpiList.kpi[i][key]?(customData.kpiList.kpi[i][key]).toString():"";
                }
            }
            this.setState({kpiList:customData.kpiList.kpi});
        },

        componentWillMount:function(){
            this.setState({createKPI:true});
        },

        render: function(){
            var contentMode;
            if(this.state.createKPI) {
                contentMode = <div> <CreateKPI saveEvent={this.saveKPI}/> </div>;
            } else {
                contentMode = <div> <ViewKPI key={this.state.updateObj.id} updateEvent={this.updateKPI} updateObj={this.state.updateObj}/> </div>;
            }
           return (<div className="main-container">
                        <div className="menu-container col-md-3">
                            <div id="sidebar-wrapper">
                                <ul className="nav nav-list bs-docs-sidenav affix-top">
                                    <li className="sidebar-brand menu-item">
                                        <UserInfo url="getUserInfo"></UserInfo>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <KpiList key={this.state.kpiList.length} createkpi={this.state.createKPI} updateEvent={this.updateKPI} kpiList={this.state.kpiList} kpiDetails={this.getKPIDetails} setKpiMode={this.setKPIMode}></KpiList>
                            </div>
                        </div>
                        <div className="col-md-6 main-content">
                            {contentMode}
                        </div>
                        <div className="col-md-3 main-content">
                            <div className="row page-right-panel-chart">
                                <div className="col-xs-12 col-md-12">
                                    <a href="#" className="thumbnail">
                                        <PieChart key={this.state.kpiList.length} kpiList={this.state.kpiList}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                </div>);
        }
    });



    var Navbar = React.createClass({
        render: function() {
            return <nav className="navbar navbar-default company-logo">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand"><img src={headerlogo} alt="Performance Management System"/></a>
                        </div>
                        <div className="button-comments pull-right">
                            <i className="fa fa-comments fa-3x"></i>
                            <span className="button-badge">{this.props.notificationCount}</span>
                        </div>
                    </div>
                </nav>;
        }
    });

    var Layout = React.createClass({
        getInitialState: function() {
            return {
                notificationCount:0
            };
        },
        updateNotificationCount: function(){
            this.setState({notificationCount:this.state.notificationCount+1});
        },
        render: function() {
            return <div className="app-body-child"><Navbar notificationCount={this.state.notificationCount}></Navbar><Content updateNotification={this.updateNotificationCount}></Content></div>;
        }
    });

    ReactDOM.render(<Layout></Layout>,
        document.getElementById("sampleApp")
    );
})();




