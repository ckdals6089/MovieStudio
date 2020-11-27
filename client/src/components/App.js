import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import MovieDetail from "./views/MovieDetail/MovieDetail";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"


function App(props) {
  return (
    <Router>
      <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/movie/:movieId" render={(props) => <MovieDetail {...props} />} />
          </Switch>
        </div>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;