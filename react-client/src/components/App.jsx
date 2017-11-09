import React from 'react';
import Logo from './Logo.jsx';
import LinkButton from './LinkButton.jsx';
import SearchBar from './SearchBar.jsx';
import RecordsTable from './RecordsTable.jsx';
import RecordsTableEntry from './RecordsTableEntry.jsx';
import Input from './Input.jsx';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
  } from 'react-router-dom'


let testArray = [
   {
     company: 'Loomb',
     location: 'San Francisco',
     contact: 'blep@loooooms.com',
     notes: 'Very bloop.',
     coverLetter: true,
     resume: true,
     firstInterview: true,
     secondInterview: true,
     secondInterview: true,
     offer: true,
     rejected: true,
     key: 0
   },

   {
     company: 'iBloomb',
     location: 'New York',
     contact: 'blep@ibl.com',
     notes: 'Very bleem.',
     coverLetter: true,
     resume: true,
     firstInterview: true,
     secondInterview: true,
     secondInterview: true,
     offer: true,
     rejected: true,
     key: 1
   }
];


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // recordView = true,
      // inputView = !this.recordView
    };
  }

  render() {
    return (
      <Router>
        <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <ul className="nav navbar-nav navbar-legt">
                  <li className="logo"><Logo />
                  </li>
                  <li className="link-button">
                    <Link to="/">
                      <LinkButton title='Records' />
                    </Link>
                  </li>
                  <li className="link-button">
                    <Link to="/input">
                      <LinkButton title='Insert' />
                    </Link>
                  </li>
                </ul>
                <ul className="nav navbar-nav">
                  <li className="navbar-text navbar-center align-top search-bar">
                    <SearchBar />
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="logout-button">
                    <a href="#">
                      <LinkButton title='Logout' />
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <Route exact path="/" render={() => < RecordsTable records={testArray} /> } />


            <Route exact path="/input" className="col-md-6 col-md-offset-3" render={() => <Input />} />

        </div>
      </Router>
    )
  }
}


// <Router>
//     <div>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/topics">Topics</Link></li>
//       </ul>
//
//       <hr/>
//
//       <Route exact path="/" component={Home}/>
//       <Route path="/about" component={About}/>
//       <Route path="/topics" component={Topics}/>
//     </div>
//   </Router>

export default App
