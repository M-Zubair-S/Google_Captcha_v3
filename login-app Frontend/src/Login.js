import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./components/Login.css";
import Dashboard from "./components/Dashboard";
import $ from "jquery";
import { Recaptcha } from "react-recaptcha-google";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  //const onChange=()=>{};
  const onChange = (e) => {
    e.preventDefault();
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('6Lcj_IEmAAAAAGCBrSDkrmuCmTOwtrzDXmvlX43e', { action: 'submit' }).then((token) => {
        
        // Add your logic to submit to your backend server here.
        fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: token })
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response
            if (data.success) {
              console.log("valid captcha");
              setVerified(true);
              // reCAPTCHA verification succeeded
              // Perform further actions or submit the form
            } else {
              console.log("Invalid captcha");
              // reCAPTCHA verification failed
              // Handle the error
            }
          })
          .catch(error => {
            // Handle any network or API errors
            console.error('Error occurred while verifying reCAPTCHA:', error);
          });


      });
    });
  };

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const registration = {
      Username: username,
      Password: password,
    };

    $.ajax({
      url: "https://localhost:7274/api/Registration/login", // The URL of your web API endpoint
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(registration),
      success: function (response) {
        if (response === "Valid User") {
          console.log(response);
          navigate("/Dashboard");
        } else {
          alert("Invalid Credential");
        }
      },
      error: function (error) {
        console.error(error); // You can handle the error here
        alert("System Error");
      },
    });
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ReCAPTCHA sitekey="6Lcj_IEmAAAAAGCBrSDkrmuCmTOwtrzDXmvlX43e" onChange={onChange} />
      <button onClick={handleLogin} disabled={!verified}>Login</button>
    </div>
  );
};

export default Login;
