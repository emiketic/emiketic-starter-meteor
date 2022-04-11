// Packages
import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

/* -------------------------------------------------------------------------- */
/*                                   Methods                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

/**
 * Reactivly returns the current meteor user
 * @returns {Object} Meteor user object
 */
export function useAccount() {
  return useTracker(function () {
    const user = Meteor.user();
    const userId = Meteor.userId();
    return {
      user,
      userId,
      isLoggedIn: !!userId,
    };
  }, []);
}

/**
 * Lists all user permissions in the session
 * @returns {Array} Array with permissions for the current session
 */
export function usePermissions() {
  return [];
}

/**
 * Determines whether current session "has a given permission"
 * Computes the auhtorization for an authorized route or section
 * based on the permission tree
 * @param {String|Array} permission Dot-notation based permission string supplied by
 * any `PermissionRoute` or  `PermissionElement`. Can also be an array of permissions
 * @returns {Bool} Whether user is authorized for the required permission
 */
export function useAuthorization(permissions) {
  // Look for a permission wildcard first
  const hasUnrestrictedRole = false;
  if (hasUnrestrictedRole) {
    return true;
  }
  // Check whether the required permission is included in the user permissions

  const availablePermissions = [];
  // Support array of permissions
  if (Array.isArray(permissions)) {
    return availablePermissions.some((p) => p === permissions);
  }
  // Or simple string
  return availablePermissions.includes(permissions);
}

/**
 * Determines whether current session satisfies a group of required permissions
 * @param {String|Array} requires Can be one of the following
 * - Dot-notation based permission string
 * - Custom function defined in an outer scope and evaluted here
 * - Array of dot-notation strings and functions defined in an outer scope
 * User must satisfy one of the requiremens cited above (i.e. requirements
 * we're computing against)
 * @param {String} combinationOperator - Whether requirements should be all satisfied or
 * at least one of them has user authorization
 *   @returns {Bool} Whether user is authorized for the passed requirements
 */
export function useRequirements({
  requirements = [],
  combinationOperator = 'and',
}) {
  // If no requirements were specified, auhtorize
  if (
    !requirements ||
    (Array.isArray(requirements) && requirements.length === 0) ||
    (typeof requires === 'string' && requirements.length === 0)
  ) {
    return true;
  }
  let combine;
  switch (combinationOperator) {
    case 'and':
    default:
      combine = 'every';
      break;
    case 'or':
      combine = 'some';
      break;
  }
  // Check permissions for all requirements
  const checkPermission = useAuthorization;
  const permissionRequirements = Array.isArray(requirements)
    ? requirements
    : [requirements];

  const authorized = permissionRequirements[combine]((permission) => {
    // Regular dot notation requirement
    if (typeof permission === 'string') {
      return checkPermission(permission);
    }
    // Criterion requirement
    return permission();
  });
  return authorized;
}

/**
 * Finds out whether user session has a specific role among its roles
 * @param {String} roleIdentifier Role unique identifier
 * @returns {Bool} Whether user has the role
 */
export function useRole(roleIdentifier) {
  return undefined;
}

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

/* ******************************** CONSTANTS ******************************* */

const PERMISSION_COMPONENT_PROP_TYPES = {
  children: PropTypes.node,
  requirements: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  forbidWithPermissions: PropTypes.bool,
};

const PERMISSION_COMPONENT_DEFAULT_PROPS = {
  children: null,
  requirements: [],
  forbidWithPermissions: false,
};

/* *************************** PERMISSION ELEMENT *************************** */

/**
 * Permission-based wrapper element for components or component sections
 * @param {React.Element} children Nested children to be authorized by the component
 * @param {String|Array|Func} requirements Can be one of the following
 * - Dot-notation based permission string
 * - Custom function defined in an outer scope and evaluted here
 * - Array of dot-notation strings and functions defined in an outer scope
 * User must satisfy one of the requiremens cited above in order
 * to render/hide children elements.
 * @param {Boolean} forbidWithPermissions If set to true, children will be hidden (inverse logic)
 * @returns {React.Element} Authorized element
 */
export function PermissionElement({
  children,
  requirements,
  forbidWithPermissions = false,
}) {
  const authorized = useRequirements({ requirements });
  if (authorized && !forbidWithPermissions) {
    return children;
  }
  return null;
}

PermissionElement.propTypes = PERMISSION_COMPONENT_PROP_TYPES;
PermissionElement.defaultProps = PERMISSION_COMPONENT_DEFAULT_PROPS;

/* **************************** PERMISSION ROUTE **************************** */

/**
 * Permission-based react router route
 * @param {React.Element} children Nested routes to be authorized by the parent route
 * @param {String|Array|Func} requirements Can be one of the following
 * - Dot-notation based permission string
 * - Custom function defined in an outer scope and evaluted here
 * - Array of dot-notation strings and functions defined in an outer scope
 * User must satisfy one of the requiremens cited above in order
 * to be granted access to routes or be redirected to `redirectPath`
 * @param {Boolean} forbidWithPermissions If set to true, user will redirected on permission satisfaction
 * @returns {React.Element} Authorized element
 */
export function PermissionRoute({
  children,
  requirements,
  forbidWithPermissions = false,
  redirectPath = '/',
}) {
  const redirectRender = <Navigate to={redirectPath} />;
  const account = useAccount();
  const { isLoggedIn } = account;
  const authorized = useRequirements({ requirements });
  if (!isLoggedIn) {
    return redirectRender;
  }
  if (authorized && !forbidWithPermissions) {
    return children;
  }
  return redirectRender;
}

PermissionRoute.propTypes = {
  ...PERMISSION_COMPONENT_PROP_TYPES,
  redirectPath: PropTypes.string,
};
PermissionRoute.defaultProps = {
  ...PERMISSION_COMPONENT_DEFAULT_PROPS,
  redirectPath: '/',
};
