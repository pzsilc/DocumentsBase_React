import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { HeaderContainer } from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { LoginContainer } from './components/Auth/Login';
import { LogoutContainer } from './components/Auth/Logout';
import { HomeContainer } from './components/Home';
import { AddContainer } from './components/Add';
import { ListContainer } from './components/List';
import { LoggedRoute, GuestRoute } from './middlewares';
import { NotificationContainer } from 'react-notifications';
import { DocumentDetailsContainer } from './components/DocumentDetails';
import 'react-notifications/lib/notifications.css';

const App = () => {
    return(
        <BrowserRouter>
            <HeaderContainer/>
            <NotificationContainer/>
            <main>
                <Switch>
                    <LoggedRoute exact path="/documents-base" component={HomeContainer} />
                    <LoggedRoute path="/documents-base/add" component={AddContainer} />
                    <GuestRoute path="/documents-base/login" component={LoginContainer} />
                    <LoggedRoute path="/documents-base/logout" component={LogoutContainer} />
                    <LoggedRoute path="/documents-base/list/:id" component={ListContainer} />
                    <LoggedRoute path='/documents-base/documents/:id' component={DocumentDetailsContainer} />
                </Switch>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;