import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';
import App from './App';
import { URLS } from './api';

beforeEach(() => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Request an invite' }));
});
afterEach(cleanup);

test('click the invite button on the main page to display the invitation form', async () => {
  let inviteFormModalHeader = null;
  try {
    inviteFormModalHeader = await screen.findByText(/Request an invite/i, { selector: 'h1' });
  } catch (ex) {}

  expect(inviteFormModalHeader).toBeTruthy();
});

describe('validate invite form', () => {
  test('displays three error messages, if all fields empty and click send button', async () => {
    const sendButton = await screen.findByRole('button', { name: 'Send' });
    fireEvent.click(sendButton);

    let errors = [];
    try {
      errors.push(await screen.findByText("'name' is required"));
      errors.push(await screen.findByText("'email' is required"));
      errors.push(await screen.findByText("'comfirm email' is required."));
    } catch (ex) {}

    expect(errors.length).toEqual(3);
  });

  test('displays an error message, when enter less then 2 characters in the "name" field', async () => {
    const nameInput = await screen.findByLabelText('Full Name');
    fireEvent.input(nameInput, { target: { value: 'ab' } });
    let nameInputError = null;
    try {
      nameInputError = await screen.findByText(`\'name\' must be at least 3 characters`);
    } catch (ex) {}

    expect(nameInputError).toBeTruthy();
  });

  test('displays an error message, when enter invalid email address', async () => {
    const emailInput = await screen.findByLabelText('Email');
    fireEvent.input(emailInput, { target: { value: 'test@test' } });
    let emailInputError = null;
    try {
      emailInputError = await screen.findByText(`\'email\' is not a valid email`);
    } catch (ex) {}

    expect(emailInputError).toBeTruthy();
  });

  test('displays en error message, when "confirm email" is not same as the "email"', async () => {
    const emailInput = await screen.findByLabelText('Email');
    const confirmEmailInput = await screen.findByLabelText('Comfirm Email');

    fireEvent.input(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.input(confirmEmailInput, { target: { value: 'test2@test.com' } });

    let confirmEmailInputError = null;
    try {
      confirmEmailInputError = await screen.findByText('\'comfirm email\' is not same as email.');
    } catch (ex) {}

    expect(confirmEmailInputError).toBeTruthy();
  });
});

const server = setupServer(
  rest.post(URLS.INVITE, (req, res, ctx) => {
    const { email } = req.body;

    if (email === 'usedemail@airwallex.com') {
      return res(
        ctx.status(400),
        ctx.json({ errorMessage: 'Bad Request: Email is already in use' }),
      )
    }
    return res(ctx.text('Registered'));
  }),
);

const send = async (values) => {
  await screen.findByText(/Request an invite/i, { selector: 'h1' });

  fireEvent.input(screen.queryByLabelText('Full Name'), { target: { value: values.name } });
  fireEvent.input(screen.queryByLabelText('Email'), { target: { value: values.email } });
  fireEvent.input(screen.queryByLabelText('Comfirm Email'), { target: { value: values.email } });

  fireEvent.click(screen.queryByRole('button', { name: 'Send' }));
};

describe('send invite form', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('invite success and displays Done modal', async () => {
    await send({
      name: 'tester',
      email: 'tester@airwallex.com',
    });

    let okModalHeader = null;
    try {
      okModalHeader = await screen.findByText(/All done!/i, { selector: 'h1' });
    } catch (ex) {}

    expect(okModalHeader).toBeTruthy();
  });

  test('invite failed and displays server error', async () => {
    await send({
      name: 'tester2',
      email: 'usedemail@airwallex.com',
    });

    let errorElement = null;
    try {
      errorElement = await screen.findByTestId('invite-error');
    } catch (ex) {}

    expect(errorElement).toBeTruthy();
  });
});
