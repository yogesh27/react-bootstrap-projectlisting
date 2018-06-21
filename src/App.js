import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Projects from './components/projects/Projects';
import ProjectDetails from './components/projectDetails/ProjectDetails';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AddProject from './components/addProject/AddProject';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/home" component={Home} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/add-project" component={AddProject} />
                    <Route path="/project/:nid" exact strict 
                        component={ProjectDetails} />
                    <Footer/>
                </div>
            </BrowserRouter>
        );
  }
}

export default App;
