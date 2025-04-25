import React from 'react';
import { Navigate } from 'react-router-dom';

const Protectedroute = ({ children, allowedRoles }) => {
  let loggedInRole = null;
  const roles = ["admin", "teacher", "student"];

  for (let role of roles) {
    if (localStorage.getItem(role)) {
      loggedInRole = role;
      break;
    }
  }

  console.log("Logged in role:", loggedInRole);

  if (!loggedInRole || !allowedRoles.includes(loggedInRole)) {
    alert(`Access denied. Please login as ${allowedRoles.join(' or ')}.`);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protectedroute;
