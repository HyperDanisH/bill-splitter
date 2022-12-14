import * as React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "../login/login.css";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const navigate = useNavigate();

//   const auth = getAuth(app);
//   return (
//     <div className="login-container">
//       <div className="container">
//         <h1>Sign In to bill-splitter</h1>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             createUserWithEmailAndPassword(auth, email, password)
//               .then(() => {
//                 updateProfile(auth.currentUser, {
//                   displayName: name,
//                 });
//               })
//               .then((user) => {
//                 navigate("/");
//               });
//           }}
//         >
//           <div className="box">
//             <input
//               type="text"
//               name="text"
//               id="email"
//               onChange={(e) => {
//                 setName(e.target.value);
//               }}
//               placeholder="Enter Your FullName"
//             />
//           </div>
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

// export default SignIn;

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GoSignIn } from "react-icons/go";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import React, { useState } from "react";

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const navigate = useNavigate();

  const auth = getAuth(app);

  const handleSubmit = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: firstName.concat(" ", lastName),
        });
      })
      .then((user) => {
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
            <GoSignIn />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => navigate("/log-in")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
