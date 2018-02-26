import React, { Component } from 'react';
import NavBar1 from './components/NavBar1';
import NavBar2 from './components/NavBar2';
class App extends Component {

  state = {
    response: ''
  };
/*
  componentDidMount() {
     this.callApi()
       .then(res => this.setState({ response: res.express }))
       .catch(err => console.log(err));
   }

   callApi = async () => {
     const response = await fetch('/api/hello');
     const body = await response.json();

     if (response.status !== 200) throw Error(body.message);

     return body;
  }; */
  render() {
    return (
      <div>
       <NavBar1 />
       <NavBar2 />
       </div>
    );
  }
}

export default App;
