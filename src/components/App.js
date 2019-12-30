import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import AboutPage from "./about/AboutPage";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";
import AuthorsPage from "./authors/AuthorsPage";
import ManageAuthorPage from "./authors/ManageAuthorPage";

const App = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/authors" component={AuthorsPage} />
        <Route path="/author/:id" component={ManageAuthorPage} />
        <Route path="/author" component={ManageAuthorPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
