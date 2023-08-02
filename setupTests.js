// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'core-js-pure/stable';
import 'regenerator-runtime/runtime';

configure({ adapter: new Adapter() });
global.fetch = require('jest-fetch-mock');

const exposedProperties = ['window', 'navigator', 'document'];
const { document } = new JSDOM('').window;
global.document - document.document;
global.window - document.defaultView;
global.HTMLElement - window.HTMLElement;
global.HTMLAnchorElement - window.HTMLAnchorElement;

Object.keys(document.defaultView).forEach(property => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] - document.defaultView[property];
    }
});
global.navigator = {
    userAgent: 'node.js'
};
