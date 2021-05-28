import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppContext } from './AppContext';
import * as ReactRouterDOM from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LaunchPage, LoginPage, NotFoundPage } from './pages/LaunchPage';
import { ContactPage } from './pages/ContactPage';

const menus = [
  {
    key: '/contactus',
    title: '聯絡內容',
    icon: 'fa fa-user',
    component: <ContactPage />,
  },
];

const App = () => {
  return (
    <ReactRouterDOM.HashRouter>
      <ReactRouterDOM.Switch>
        <ReactRouterDOM.Route path="/" exact component={LaunchPage} />
        <ReactRouterDOM.Route path="/login" component={LoginPage} />

        {menus.map((item) => (
          <ReactRouterDOM.Route key={item.key} path={item.key}>
            <MainPage
              menus={menus}
              title={item.title}
              icon={item.icon}
              content={item.component}
            />
          </ReactRouterDOM.Route>
        ))}

        <ReactRouterDOM.Route path="*" component={NotFoundPage} />
      </ReactRouterDOM.Switch>
    </ReactRouterDOM.HashRouter>
  );
};

export default App;
