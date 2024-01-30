import {
  Box,
  TextField,
  Typography,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import HalfScreen from "../components/HalfScreen";
import React from "react";
import { ArrowBackIos } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

const Register = () => {
  const [fullname, setFullname] = React.useState("");
  const [regNo, setRegNo] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [callCode, setCallCode] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegistration = () => {
    dispatch(authActions.registered());
    navigate("/dashboard");
  };

  return (
    <HalfScreen>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "2em",
            }}
          >
            <Button
              sx={{
                cursor: "pointer",
                color: "#000",
                textTransform: "none",
                "&:hover": { background: "none" },
              }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIos sx={{ height: "1rem" }} />
              <Typography
                variant="body2"
                sx={{ fontSize: "1rem", fontWeight: 700 }}
              >
                Back
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "3em",
            }}
          >
            <Box sx={{ width: "70%" }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                }}
              >
                <span style={{ color: "#FFA881" }}>Register</span> as a New User
              </Typography>
              <Link
                style={{
                  fontSize: "0.875rem",
                  lineHeight: " 1.6065rem",
                  color: "#565656",
                  textDecoration: "none",
                }}
                to="/login"
              >
                Already an existing user? Login
              </Link>
              <InputLabel
                htmlFor="fullname"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Your fullname
              </InputLabel>
              <TextField
                required
                id="fullname"
                label="Name"
                type="text"
                value={fullname}
                onChange={(event) => {
                  setFullname(event.target.value);
                }}
                sx={{ width: "100%" }}
              />

              <InputLabel
                htmlFor="regNo"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Registration Number
              </InputLabel>
              <TextField
                required
                id="regNo"
                label="Enter your registration number"
                type="text"
                value={regNo}
                onChange={(event) => {
                  setRegNo(event.target.value);
                }}
                sx={{ width: "100%" }}
              />

              <InputLabel
                htmlFor="password"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Create password
              </InputLabel>
              <TextField
                required
                id="password"
                label="Enter password"
                type={showPassword === false ? "password" : "true"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                sx={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Button
                        sx={{
                          textTransform: "none",
                          color: "#4A4A4A",
                          "&:hover": { background: "none" },
                        }}
                        disableRipple
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />

              <InputLabel
                htmlFor="phone"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Phone number
              </InputLabel>
              <TextField
                id="phone"
                type="text"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        variant="standard"
                        value={callCode}
                        onChange={(event) => {
                          setCallCode(event.target.value);
                        }}
                        displayEmpty
                        sx={{
                          color: "primary.darkText",
                          "& .mui-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            display: "none",
                          },
                          ".mui-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
                            color: "none",
                          },
                        }}
                      >
                        <MenuItem value="">+234</MenuItem>
                      </Select>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "100%" }}
              />

              <InputLabel
                htmlFor="email"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Your E-mail
              </InputLabel>
              <TextField
                id="email"
                label="Enter email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                sx={{ width: "100%" }}
              />
              <Button
                sx={{
                  backgroundColor: "#040E18",
                  width: "100%",
                  marginTop: "2em",
                  marginBottom: "4em",
                  padding: "1em",
                  textDecoration: "none",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.918rem",
                  border: "1px solid #040E18",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#040E18",
                  },
                }}
                onClick={handleRegistration}
                disableRipple
              >
                Register Account
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </HalfScreen>
  );
};

export default Register;
