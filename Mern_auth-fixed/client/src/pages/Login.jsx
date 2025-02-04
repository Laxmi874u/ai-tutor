import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { backendurl, setLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #c2e9fb, #a1c4fd)",
      padding: "20px",
    },
    logo: {
      width: "80px",
      marginBottom: "20px",
      cursor: "pointer",
    },
    formBox: {
      backgroundColor: "#1e293b",
      padding: "20px",
      borderRadius: "8px",
      width: "100%",
      maxWidth: "400px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      color: "#94a3b8",
    },
    title: {
      color: "#fff",
      fontSize: "24px",
      textAlign: "center",
      marginBottom: "10px",
    },
    subtitle: {
      textAlign: "center",
      fontSize: "14px",
      marginBottom: "20px",
    },
    inputGroup: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#2c3a4f",
      borderRadius: "50px",
      padding: "10px 15px",
      marginBottom: "15px",
    },
    input: {
      width: "100%",
      border: "none",
      background: "none",
      color: "#fff",
      fontSize: "14px",
      outline: "none",
    },
    forgotPassword: {
      color: "#7dd3fc",
      fontSize: "12px",
      textAlign: "right",
      cursor: "pointer",
      marginBottom: "20px",
    },
    button: {
      width: "100%",
      padding: "10px 20px",
      background: "linear-gradient(to right, #6366f1, #3730a3)",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      textAlign: "center",
    },
    switch: {
      textAlign: "center",
      fontSize: "12px",
      marginTop: "10px",
    },
    switchLink: {
      color: "#38bdf8",
      cursor: "pointer",
      textDecoration: "underline",
    },
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendurl}/api/auth/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          setLoggedin(true);
          getUserData()
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendurl}/api/auth/login`, {
          email,
          password,
        });

        if (data.success) {
          setLoggedin(true);
          getUserData()
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <img
        onClick={() => navigate("/")}
        src={assets.logo} // Replace with the actual path to your logo
        alt="Logo"
        style={styles.logo}
      />

      <div style={styles.formBox}>
        <h2 style={styles.title}>
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p style={styles.subtitle}>
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div style={styles.inputGroup}>
              <img src={assets.person_icon} alt="Name Icon" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                style={styles.input}
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <img src={assets.mail_icon} alt="Email Icon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email ID"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <img src={assets.lock_icon} alt="Password Icon" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              style={styles.input}
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            style={styles.forgotPassword}
          >
            Forgot password?
          </p>

          <button type="submit" style={styles.button}>
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p style={styles.switch}>
            Already have an account?{" "}
            <span onClick={() => setState("Login")} style={styles.switchLink}>
              Login here
            </span>
          </p>
        ) : (
          <p style={styles.switch}>
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")} style={styles.switchLink}>
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
