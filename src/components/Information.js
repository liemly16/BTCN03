/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const Information = () => {
  return (
    <div className="row">
      <div className="col-md-offset-4 col-md-4">
        <form>
          <div className="text-center">
            <img
              className="avatar"
              src="https://www.w3schools.com/w3images/avatar2.png"
            />
          </div>
          <br />
          <div className="form-group">
            <label>Ảnh</label>
            <input type="file" className="form-control" />
          </div>
          <div className="form-group">
            <label>Tên đầy đủ</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <select className="form-control">
              <option>Nam</option>
              <option>Nữ</option>
              <option>Khác</option>
            </select>
          </div>
          <div className="form-group text-center">
              <input type="submit" className="btn btn-default"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Information;
