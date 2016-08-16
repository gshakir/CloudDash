import React, { PropTypes } from 'react'
import { transparentBg } from '../styles'

function LoginForm (props) {
    let keyPlaceHolder = "AWS Access key"
    let secretPlaceHolder = "AWS Secret"
    let keyFormGroup = "form-group"
    let secretFormGroup = "form-group"
    let alertMessage = ""
    let alertType = "alert alert-info"

    if(props.inputError) {
        keyFormGroup += " has-error"
        secretFormGroup += " has-error"
        keyPlaceHolder = "Invalid AWS Access key"
        secretPlaceHolder = "Invalid AWS Secret"
        alertType = "alert alert-warning"
        alertMessage = "Invalid Credentials"
    }

    if (props.loading) {
        alertMessage = "Loading...."
    }

    const inputKey = renderInputElement(props.onUpdateAwsKey, keyPlaceHolder, props.awsKey, keyFormGroup, "text")
    const inputSecret = renderInputElement(props.onUpdateAwsSecret, secretPlaceHolder, props.awsSecret, secretFormGroup, "password")

    const buttonEnabled = props.awsSecret.trim() && props.awsKey.trim()
    const loginButton = renderLoginButton(buttonEnabled)
    const alertBox = renderAlert(alertMessage, alertType)

    return (
        <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
            { alertBox }
            <h1>{props.header}</h1>
            <div className="col-sm-12">
                <form onSubmit={props.onSubmitUser}>
                    { inputKey }
                    { inputSecret}

                    <div className="col-sm-12 alert alert-warning">
                        <label className='checkbox'>
                            <input checked={props.saveCredentialsChecked} 
                                   onChange={props.onSaveCredentials} 
                                   type='checkbox'/>

                                Save Credentials
                        </label>
                        Do not save credentials on a public computer
                    </div>
                    
                    <div className="form-group col-sm-4 col-sm-offset-4">
                        { loginButton }
                    </div>


                </form>
            </div>
        </div>
  )
}

function renderInputElement(onChange, placeholder, value, divClass, type) {
    return (
          <div className={divClass}>
            <input
              className='form-control'
              onChange={onChange}
              placeholder={placeholder}
              type={type}
              value={value} />
          </div>
    );
}

function renderLoginButton(enabled) {
    if(enabled) {
        return (
            <button className="btn btn-block btn-success" type="submit">
                Continue
            </button>
        );
    }
    else {
        return (
            <button className="btn btn-block btn-success" type="submit" disabled>
                Continue
            </button>
        );
    }
}

function renderAlert(message, alertType) {
    if(message.trim()) {
        return (
            <div className={alertType}>
                {message}
            </div>
        );
    }
}

LoginForm.propTypes = {
  onSubmitUser: PropTypes.func.isRequired,
  onUpdateAwsKey: PropTypes.func.isRequired,
  onUpdateAwsSecret: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  awsKey: PropTypes.string.isRequired,
  awsSecret: PropTypes.string.isRequired,
  inputError: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  saveCredentialsChecked: PropTypes.bool.isRequired,
  onSaveCredentials: PropTypes.func.isRequired,
}
export default LoginForm
