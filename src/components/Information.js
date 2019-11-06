/* eslint-disable react/sort-comp */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/alt-text */
import { connect } from 'react-redux';
import React from 'react';
import { userActions } from '../actions/user';

class Information extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      name: user.name,
      gender: user.gender || 'male'
    };
    this.handleUpdateInfo = this.handleUpdateInfo.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
  }

  handleUpdateInfo(e) {
    e.preventDefault();
    const { updateInfo } = this.props;
    const { name, gender } = this.state;
    updateInfo(name, gender);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  render() {
    const { user } = this.props;
    const { name, gender } = this.state;

    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4">
          <form onSubmit={this.handleUpdateInfo}>
            <div className="text-center">
              <img className="avatar" src={user.avatar} />
            </div>
            <br />
            <div className="form-group">
              <label>Tên đầy đủ</label>
              <input
                onChange={this.onChangeName}
                value={name}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Giới tính</label>
              <select
                onChange={this.onChangeGender}
                value={gender}
                ref="gender"
                className="form-control"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div className="form-group text-center">
              <input
                type="submit"
                value="Cập nhật thông tin"
                className="btn btn-default"
              />
            </div>
          </form>

          <form>
            <div className="form-group">
              <label>Ảnh</label>
              <input type="file" className="form-control" />
            </div>

            <div className="form-group text-center">
              <input
                type="submit"
                value="Cập nhật ảnh"
                className="btn btn-default"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateInfo: (name, gender) => {
      dispatch(userActions.updateInfo(name, gender));
    }
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(Information);
