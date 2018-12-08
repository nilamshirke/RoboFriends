import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
//import { robots } from './robots.js';
import Scroll from '../components/Scroll.js'
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry';

class app extends Component {

    constructor() {
        super();
        this.state = {
            robots : [],
            searchfield : ''        
        };
    }

    onSearchChange = (event) => {
       console.log(event.target.value);
        this.setState({
            searchfield : event.target.value
        })        
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response =>  response.json())
            .then(users => this.setState({ robots : users }));
    }

    render() {
        const { robots, searchfield} = this.state;

        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        }) 
        return !robots.length ? 
            <h1>Loading</h1> : 
            (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>                        
                        </ErrorBoundry>                   
                    </Scroll>
                </div>
            );
    }
  
}

export default app;