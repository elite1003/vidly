import React, { Component } from 'react';
import Movies from "./components/movies";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
    render() { 
        return (
            <main className ="container mt-4">
            <Route path="/" component={Movies} />
            </main>
        );
    }
}
 
export default App;  