/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const Register = () => {
  return (
    <div className="row">
      <div className="col-md-offset-4 col-md-4">
        <h2>Register</h2>
        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="form-group">
            <label>Retype Password</label>
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
};

export default Register;
