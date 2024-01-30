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
import { useNavigate } from "react-router-dom";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const EditProfile = () => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [callCode, setCallCode] = React.useState("");
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);

  const navigate = useNavigate();

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
                <span style={{ color: "#FFA881" }}>Edit</span> Your Profile
              </Typography>
              <InputLabel
                htmlFor="oldPassword"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Enter old password
              </InputLabel>
              <TextField
                required
                id="oldPassword"
                label="Enter old password"
                type={showOldPassword === false ? "password" : "true"}
                value={oldPassword}
                onChange={(event) => {
                  setOldPassword(event.target.value);
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
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? "Hide" : "Show"}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />

              <InputLabel
                htmlFor="newPassword"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Enter new password
              </InputLabel>
              <TextField
                required
                id="newPassword"
                label="Enter new password"
                type={showNewPassword === false ? "password" : "true"}
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
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
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? "Hide" : "Show"}
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
                disableRipple
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </HalfScreen>
  );
};

export default EditProfile;
