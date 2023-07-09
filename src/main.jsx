import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './page/Home/Home.jsx';
import Users from './page/UsersList/Users.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import CreateUser from './page/CreateUser.jsx';
import UpdateUser from './page/UpdateUser.jsx';
import View from './page/View.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,

    children : [

      {
        path : "/",
        element : <Home></Home>
      },

      {
        path : "/users",
        element : <Users></Users>
      },

      {
        path : "/createUser",
        element : <CreateUser></CreateUser>
      },

      {
        path : "/updateUser/:id",
        loader : ({params}) => fetch (`https://crud-app-sunny-eka-server.vercel.app/users/${params.id}`),
        element : <UpdateUser></UpdateUser>
        
      },

      {
        path : "/viewUsers",
        element : <View></View>

      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />

    </Provider>
  </React.StrictMode>,
)
