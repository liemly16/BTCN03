/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions/user';
// import { useHistory } from 'react-router-dom';

class Login extends React.Component {
  // const history = useHistory();

  // function handleClick() {
  //   history.push('/');
  // }
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    const { login } = this.props;
    login(this.refs.username.value, this.refs.password.value);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4">
          <h2>Login</h2>
          <form onSubmit={this.login}>
            <div className="form-group">
              <label>Username</label>
              <input ref="username" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input ref="password" type="password" className="form-control" />
            </div>

            <div className="form-group text-center">
              <input
                type="submit"
                value="Submit"
                className="btn btn-default btn-outline"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (username, password) => {
      dispatch(userActions.login(ownProps, username, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
