import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the app component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
  const wrapper =  shallow(<App {...props} />)
  if (state) wrapper.setState(state);
  return wrapper
}

/**
 * Return ShalowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 * @return {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders decrement button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'decrement-button');
  expect(button.length).toBe(1);
})

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  // find display and test value
  const display = findByTestAttr(wrapper, 'counter-display');
  expect(display.text()).toContain(counter + 1);
});

test('clicking decrement button subtracts one from counter display', () => {
  const counter = 5;
  const wrapper = setup(null, {counter});

  // find button and click
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  // find display and test value
  const display = findByTestAttr(wrapper, 'counter-display');
  expect(display.text()).toContain(counter - 1);
});

test('display error on decrement below 0', () => {
  const counter = 0;
  const wrapper = setup(null, {counter});

  // initially show no error
  const errorDisplay = findByTestAttr(wrapper, 'error-display');
  expect(errorDisplay.length).toBe(0);

  // find button and click
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  // find display expect to be 0 still
  const display = findByTestAttr(wrapper, 'counter-display');
  expect(display.text()).toContain('0')

  // find div with error message
  const errorDisplay2 = findByTestAttr(wrapper, 'error-display');
  expect(errorDisplay2.length).toBe(1);
});

test ('removes error after incrementing again', () => {
  const counter = 0;
  const wrapper = setup();

  // find button and click decrement
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  // find div with error message
  const errorDisplay = findByTestAttr(wrapper, 'error-display');
  expect(errorDisplay.length).toBe(1);

  // find button and click increment
  const buttonIncrement = findByTestAttr(wrapper, 'increment-button');
  buttonIncrement.simulate('click');

  // not find div with error message
  const errorDisplay2 = findByTestAttr(wrapper, 'error-display');
  expect(errorDisplay2.length).toBe(0);
})