import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
import Contacts from './contact/Contacts';
// import { userDetails } from '../services';
// import {Protected} from './Protected';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Users = lazy(() => import('./users/Users'));
const AddUser = lazy(() => import('./users/Adduser'));

const Category = lazy(() => import('./category/Category'));
const AddCategories = lazy(() => import('./category/AddCategories'));

const City = lazy(() => import('./city/City'));
const AddCities = lazy(() => import('./city/AddCities'));

const Banners = lazy(() => import('./banners/Banners'));
const Addbanners = lazy(() => import('./banners/Addbanners'));

const Login = lazy(() => import('./user-pages/Login'));

const Studio = lazy(() => import('./studio/Studio'));
const Studiolist = lazy(() => import('./studio/Studiolist'));
const Studiodetails = lazy(() => import('./studio/Studiodetails'));

const Hireus = lazy(() => import('./hireus/Hireus'));
const Addhireus = lazy(() => import('./hireus/Addhireus'));
const HireusDetails = lazy(() => import('./hireus/HireusDetails'));

const Price = lazy(() => import('./price/Price'));
const AddPrice = lazy(() => import('./price/AddPrice'));

const LearnVideo = lazy(() => import('./learnvideo/LearnVideo'));
const LearnVideoDetails = lazy(() => import('./learnvideo/LearnVideoDetails'));

const Punlimited = lazy(() => import('./premium/Punlimited'));
const PremiumAdd = lazy(() => import('./premium/Premiumadd'));


const AppRoutes = () => {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/" component={ Login } />

          {/* <Protected isLoggedIn={isLoggedIn}> */}
            <Route path="/dashboard" component={Dashboard } />

            <Route path="/users" component={ Users } />
            <Route path="/adduser" component={ AddUser } />

            <Route path="/category" component={ Category } />
            <Route path="/addcategory" component={ AddCategories } />
            <Route path="/addcategory/:id" component={ AddCategories } />

            <Route path="/city" component={ City } />
            <Route path="/addcities" component={ AddCities } />
            <Route path="/addcities/:id" component={ AddCities } />

            <Route path="/banners" component={ Banners } />
            <Route path="/addbanner" component={ Addbanners } />
            <Route path="/addbanner/:id" component={ Addbanners } />

            <Route path="/studio" component={ Studio } />
            <Route path="/studio/:id" component={ Studio } />
            <Route path="/studiolist" component={ Studiolist } />
            <Route path="/studiodetails/:id" component={ Studiodetails } />

            <Route path="/hireus" component={ Hireus } />
            <Route path="/addhireus" component={ Addhireus } />
            <Route path="/addhireus/:id" component={ Addhireus } />
            <Route path="/hireusdetails/:id" component={ HireusDetails } />

            <Route path="/price" component={ Price } />
            <Route path="/addprice" component={ AddPrice } />
            <Route path="/addprice/:id" component={ AddPrice } />

            <Route path="/learnvideo" component={ LearnVideo } />
            <Route path="/learnvideodetails" component={ LearnVideoDetails } />

            <Route path="/punlimited" component={ Punlimited } />
            <Route path="/Premiumadd" component={ PremiumAdd } />
            <Route path="/Premiumadd/:id" component={ Studiodetails } />

            <Route path="/contactlist" component={ Contacts } />

          {/* </Protected> */}


          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
}

export default AppRoutes;