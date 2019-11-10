import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import Form, {
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form';

import Banner from '../../../Components/Banner';
import * as actions from '../../../store/actions/index';
import { Container } from './styles'; 

const LogginForm = ({onAuth, loading, authRedirectPath, isAuthenticated, error}) => {

  const [isSignup, setSignedUp] = useState(false);

  /**
   * 
   * @param {*} formInputs Contains all the form field values 
   */
  const handleFormSubmit = (formInputs) => {
    onAuth(formInputs, isSignup);
  }

  const handleSwitchLoginSignup = () => {
    setSignedUp(!isSignup);
  }

  const validadePasswordMatch = (value, formProps) => {
    let password;
    if(formProps.ref.current) {
      password = formProps.ref.current[1].value;
    }
    if (value !== password) {
      return 'DONT_MATCH';
    }
    return undefined;
  }

  const validadeUsername = (value, formProps) => {
    if (value.length < 3) {
      return 'TOO_SHORT'
    }

    return undefined;
  }

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect  to ={authRedirectPath}/>
  }

  let authError = null;
  if (error) {
    authError =
      <Banner color="red">
      {error.message}
      </Banner>
  }

  return (
    <div>
      {authRedirect}
      <Container>
        <Form onSubmit={data => handleFormSubmit(data)}>
          {({ formProps }) => (
            <form {...formProps}>
              <Field name="email" label="Your e-mail" isRequired defaultValue="">
                {({ fieldProps, error }) => (
                  <Fragment>
                    <TextField autoComplete="off" {...fieldProps} />
                    {error && (
                      <ErrorMessage>
                        This e-mail is already in use, try another one.
                      </ErrorMessage>
                    )}
                  </Fragment>
                )}
              </Field>
              <Field
                name="password"
                label="Password"
                defaultValue=""
                isRequired
                validate={value => (value.length < 8 ? 'TOO_SHORT' : undefined)}>
                {({ fieldProps, error, valid }) => (
                  <Fragment>
                    <TextField type="password" {...fieldProps}/>
                    {isSignup && !error && !valid && (
                      <HelperMessage>
                        Use 8 or more characters with a mix of letters, numbers and symbols.
                      </HelperMessage>
                    )}
                    {error && (
                      <ErrorMessage>
                        Password needs to be more than 8 characters.
                      </ErrorMessage>
                    )}
                    {isSignup && valid && <ValidMessage>Awesome password!</ValidMessage>}
                  </Fragment>
                )}
              </Field>
              {isSignup && (
                <Fragment>
                  <Field
                  name="confirmPassword"
                  label="Confirm Password"
                  defaultValue=""
                  isRequired
                  validate={value => validadePasswordMatch(value, formProps)}>
                  {({ fieldProps, error, valid, meta }) => (
                    <Fragment>
                      <TextField type="password" {...fieldProps} />
                      {error === 'DONT_MATCH' && (
                        <ErrorMessage>
                          Passwords are not the same 
                        </ErrorMessage>
                      )}
                      {valid && meta.dirty && <ValidMessage>Password confirmed</ValidMessage>}
                    </Fragment>
                  )}
                </Field>
                <Field
                  name="username"
                  label="Username "
                  defaultValue=""
                  isRequired
                  validate={value => validadeUsername(value, formProps)}>
                    {({ fieldProps, error, valid, meta }) => (
                      <Fragment>
                        <TextField autoComplete="off" type="text" {...fieldProps}/>
                        {error === 'TOO_SHORT' && (
                          <ErrorMessage>
                            This username is too short, use at least 3 characters.
                          </ErrorMessage>
                        )}
                        { valid && meta.dirty&& <ValidMessage>Cool username!</ValidMessage>}
                      </Fragment>
                )}
                </Field>
              </Fragment>
              )}            
              <FormFooter>
                <ButtonGroup>
                  <Button appearance="link" onClick={() => handleSwitchLoginSignup()}>Switch to {!isSignup ? 'Sign up' : 'Login'}</Button>
                  <Button appearance="subtle-link">Cancel</Button>
                  <Button type="submit" appearance="primary" isLoading={loading} isDisabled={formProps.ref.isValid}>{isSignup ? 'Sign up' : 'Login'}</Button>
                </ButtonGroup>
              </FormFooter>
            </form>
          )}
        </Form>        
        {authError}
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
      onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogginForm);