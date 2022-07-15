/*import Dependencies*/
import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

/*import Component*/
import FormFileComponent from "./Form/formFile";
import MovieTableComponent from "./Table/movieTable";
import FormLoginComponent from './Form/formLogin'
import { Nav } from "react-bootstrap";
  

const AppComponent= ()=>{
      
      return (
          <ProvideAuth>
          <Router>
            <div>
                  <Nav variant="tabs" defaultActiveKey="/" >
                    <AuthButton />
                    <Nav.Item>
                      <Nav.Link href="/MovieList" className="redsun">MOVIES LIST</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="/UploadMovieList" className="redsun">MOVIES UPLOADER</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <hr />
 


              <Switch>
                <Route path="/login">
                  <FormLoginComponent />
                </Route>
                <PrivateRoute path="/MovieList">
                  <MovieTableComponent />
                </PrivateRoute>
                <PrivateRoute path="/UploadMovieList">
                  <FormFileComponent />
                </PrivateRoute>
                <PrivateRoute path="/">
                  <MovieTableComponent />
                </PrivateRoute>
              </Switch>
            </div>
          </Router>
        </ProvideAuth>
      );
              
          
      }

      export default AppComponent

       

const Auth = {
  isAuthenticated: window.localStorage.getItem('JWT') || false,
  signin(cb) {
    Auth.isAuthenticated = true;
    cb();
  },
  signout(cb) {
    window.localStorage.clear();
    Auth.isAuthenticated = false;
    cb();
  }
};

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(Auth.isAuthenticated);

  const signin = cb => {
    return Auth.signin(() => {
      try {
        const token=JSON.parse(window.localStorage.getItem('JWT'));
        const authenticatedUSER=JSON.parse(atob(token.token.split(".")[1])).users[0];
        delete authenticatedUSER.pass;
        setUser(authenticatedUSER);
        cb();
      } catch (error) {
        alert("CREDENCIALES INVALIDAS");
      }
     
      
      
      
    });
  };

  const signout = cb => {
    return Auth.signout(() => {
      window.localStorage.clear();
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

function AuthButton() {
  let auth = useAuth();

  return auth.user ? (
    <>
      <Nav.Item>
       
        <Nav.Link
          onClick={() => {
            auth.signout(() => {});
          }}
          href='/login'
          className="redsun"
        > 
          LOGOUT
        </Nav.Link>
      </Nav.Item>
      
        
    </>  
  ) : (
    <>
     <Nav.Item ><Nav.Link className="redsun" disabled></Nav.Link></Nav.Item>
      
    </>   
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


