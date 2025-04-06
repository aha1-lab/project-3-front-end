import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar() {
  return (
    <div className="d-flex flex-column p-3 min-vh-100">
      <div>
        <a className="text-decoration-none d-flex align-items-center d-none d-sm-inline">
          <span className="fs-4">Side Menu</span>
        </a>
      </div>
      <hr />
      <div className="dropdown open mt-auto">
        <button
          className="btn btn-secondary dropdown-toggle"
          id="triggerId"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
        </button>
        <div className="dropdown-menu" aria-labelledby="triggerId">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item disabled" href="#">Disabled action</a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
