// import React, { useState } from "react";
// import "./login.css";
// import { app } from "../../firebase/firebase";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const auth = getAuth(app);
//   return (
//     <div className="login-container">
//       <div class="container">
//         <h1>Login To bill-splitter</h1>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             signInWithEmailAndPassword(auth, email, password);
//           }}
//         >
//           <div className="box">
//             <input
//               type="email"
//               name="email"
//               id="email"
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 console.log(email);
//               }}
//               placeholder="Enter Your E-mail"
//             />
//           </div>

//           <div className="box">
//             <input
//               type="password"
//               name="password"
//               id="password"
//               placeholder="Enter Your Passcode"
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//             />
//           </div>
//           <button type="submit" class="btn">
//             SIGN-IN
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// <div className="login-container">
//   <div className="input-containers">
//     <input type="email" name="email" id="email" className="login-signin" />
//     <input
//       type="password"
//       name="password"
//       id="password"
//       className="login-signin"
//     />
//   </div>
// </div>

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { app } from "../../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const auth = getAuth(app);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signUpRef = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).then(() => {
      navigate("/");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={() => navigate("/")}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
