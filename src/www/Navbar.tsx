import React, { FunctionComponent, PropsWithChildren } from "react";

interface Props {
}

export const Navbar: FunctionComponent<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-0">
      <div className="col-12 col-md-4">
        <i className="navbar-brand mb-0 h1">
          YT Helper
        </i>
      </div>
      <div className="col">
        {children}
      </div>
    </nav>
  );
}
