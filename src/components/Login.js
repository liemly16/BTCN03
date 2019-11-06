/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { useHistory } from 'react-router-dom';

function Login() {
  // const history = useHistory();

  // function handleClick() {
  //   history.push('/');
  // }

  return (
    <div className="row">
      <div className="col-md-offset-4 col-md-4">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" />
          </div>

          <div className="form-group text-center">
            <input
              type="button"
              value="Submit"
              className="btn btn-default btn-outline"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
