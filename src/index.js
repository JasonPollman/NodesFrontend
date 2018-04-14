/**
 * Entry point to the Node Number Factory application.
 * @since 4/10/18
 * @file
 */

import React from 'react';
import ReactDom from 'react-dom';
import ApplicationContainer from './components/ApplicationContainer';
import './style.scss';

/**
 * Renders the application.
 * @returns {undefined}
 */
(function render() {
  ReactDom.render(
    <ApplicationContainer />,
    document.getElementById('mount'),
  );
}());
