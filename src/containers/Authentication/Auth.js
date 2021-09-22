import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        eletype: "input",
        eleconfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          pattern: new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
          ),
        },
        valid: false,
        istouched: false,
      },
      password: {
        eletype: "input",
        eleconfig: {
          type: "password",
          placeholder: "PASSWORD",
        },
        value: "",
        validation: {
          required: true,
          minlength: 7,
        },
        valid: false,
        istouched: false,
      },
    },
    isSignUp: true,
  };

  OnChangeHandler = (event, id) => {
    let updatedform = { ...this.state.controls };
    let updatedformdeep = {
      ...updatedform[id],
      value: event.target.value,
      istouched: true,
    };
    updatedformdeep.valid = this.formvalidity(
      updatedformdeep.value,
      updatedformdeep.validation
    );
    updatedform[id] = updatedformdeep;
    this.setState({ controls: updatedform });
  };

  formvalidity = (value, rules) => {
    let isvalid = true;
    if (rules.required) {
      isvalid = value.trim() !== "";
    }
    if (rules.minlength) {
      isvalid = value.length > rules.minlength;
    }

    if (rules.pattern) {
      isvalid = rules.pattern.test(value);
    }

    return isvalid;
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.formsubmit(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchLoginHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  render() {
    // console.log(this.props.ingredients);
    let form = [];
    for (let key in this.state.controls) {
      form.push({
        id: key,
        contents: this.state.controls[key],
      });
    }
    let AuthRedirect = null;
    let ingredientlength = [];
    for (let key in this.props.ingredients) {
      ingredientlength.push(this.props.ingredients[key]);
    }

    // console.log(ingredientlength.reduce((cur, val) => cur + val, 0));
    if (this.props.isAuthenticated) {
      if (ingredientlength.reduce((cur, val) => cur + val, 0))
        AuthRedirect = <Redirect to="/checkout" />;
      else AuthRedirect = <Redirect to="/" />;
    }
    let loader = (
      <div className={classes.Auth}>
        {AuthRedirect}
        <form onSubmit={(event) => this.onFormSubmit(event)}>
          {form.map((content) => (
            <Input
              key={content.id}
              eletype={content.contents.eletype}
              eleconfig={content.contents.eleconfig}
              value={content.contents.value}
              changed={(event) => this.OnChangeHandler(event, content.id)}
              validation={!content.contents.valid} //true for being invalid!
              istouched={content.contents.istouched}
            />
          ))}
          <Button BtnType="Success">
            {this.state.isSignUp ? "SIGN-UP" : "LOG-IN"}
          </Button>
        </form>
        <Button BtnType="Danger" clicked={this.switchLoginHandler}>
          SWITCH TO {this.state.isSignUp ? "LOG-IN" : "SIGN-UP"}
        </Button>
      </div>
    );
    if (this.props.loading) loader = <Spinner />;

    return (
      <div>
        {this.props.error ? (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            {this.props.error}
          </p>
        ) : null}
        {loader}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    loading: state.Auth.loading,
    error: state.Auth.error,
    isAuthenticated: state.Auth.token !== null,
    ingredients: state.BurgerBuilder.ingredients,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    formsubmit: (email, password, authType) =>
      dispatch(actions.onAuth(email, password, authType)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Auth);
