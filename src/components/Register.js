/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions/user';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { register } = this.props;
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const repassword = this.refs.repassword.value;

    if (password === repassword) {
      register(username, password);
    } else {
      alert('Mật khẩu không giống nhau. Vui lòng nhập lại');
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4">
          <h2>Register</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input ref="username" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input ref="password" type="password" className="form-control" />
            </div>
            <div className="form-group">
              <label>Retype Password</label>
              <input
                ref="repassword"
                type="password"
                className="form-control"
              />
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
    register: (username, password) => {
      dispatch(userActions.register(username, password, ownProps));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
