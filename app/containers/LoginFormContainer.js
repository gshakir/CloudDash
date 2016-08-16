import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { loginFromUI } from '../utils/AwsHelpers'
import { inputNormal } from '../styles'
import { inputRequired } from '../styles'

class LoginFormContainer extends Component {
  constructor () {
    super()
    this.state = {
      awsKey: '',
      awsSecret: '',
      saveCredentialsChecked: false,
      inputError: false,
      loading: false
    }
  }

  inErrorState () {
      this.setState({
          awsKey: '',
          awsSecret: '',
          inputError: true,
          loading: false
      });
  }

  async handleSubmitUser (e) {
    e.preventDefault();
    const  awsKey  = this.state.awsKey.trim()
    const  awsSecret  = this.state.awsSecret.trim()

    console.log("Key and Secret" + awsKey + " " + awsSecret);
    console.log("Stat is " + this.state);
    if (awsKey && awsSecret) {
        console.log("Have both key and secret");

        this.setState({ loading: true });
        loginFromUI(awsKey, awsSecret, this.state.saveCredentialsChecked)
            .then(data => {
                console.log("aws response, data is: ");
                console.log(data);

                if (data) {
                    this.setState({
                        awsKey: '',
                        awsSecret: ''
                    });

                    this.context.router.push({
                        pathname: '/dashboard'
                    })
                }
                else {
                    console.error("No data or error, from AWS")
                    this.inErrorState();
                }
            })
            .catch(error => { 
                console.error("Prompt Container, Exception from AWS")
                console.error(error)
                this.inErrorState();
            });
    }
    else {
        console.log("No Key or Secret" + awsKey + " " + awsSecret);
        inErrorState();
    }
  }


  handleUpdateAwsKey (event) {
    this.setState({
      awsKey: event.target.value,
      inputError: false
    });
  }

  handleUpdateAwsSecret (event) {
    this.setState({
      awsSecret: event.target.value,
      inputError: false
    });
  }

  handleSaveCredentialsCheckBox (event) {
      this.setState({ saveCredentialsChecked: event.target.checked })
      console.log("Save credentials checked");
      console.log(event.target.checked)
  }

  shouldComponentUpdate(nextProps, nextState) {
      //console.log("component should update" + nextState);
      return true;
  }

  componentWillUpdate() {
     // console.log("component will update");
  }

  componentDidUpdate() {
      //console.log("component did update");
  }

  render () {
    //console.log("Render");
    return (
      <LoginForm
        onSubmitUser={(event) => this.handleSubmitUser(event)}
        onUpdateAwsKey={(event) => this.handleUpdateAwsKey(event)}
        onUpdateAwsSecret={(event) => this.handleUpdateAwsSecret(event)}
        onSaveCredentials={(event) => this.handleSaveCredentialsCheckBox(event)}
        saveCredentialsChecked={this.state.saveCredentialsChecked}
        header={this.props.route.header || ''}
        awsKey={this.state.awsKey} 
        awsSecret={this.state.awsSecret}
        loading={this.state.loading}
        inputError={this.state.inputError} />
    )
  }
}

LoginFormContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default LoginFormContainer
