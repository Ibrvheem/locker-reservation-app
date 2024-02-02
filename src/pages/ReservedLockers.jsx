import {
  Autocomplete,
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SideHeader from "../components/SideHeader";
import { ArrowBackIos } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const ReservedLockers = () => {
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleReservation = (code, id) => {
    setOpen(id);
    console.log(
      `Reserving locker with the locker code: ${code} and with the id: ${id}`
    );
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [lockerCodes, setLockerCodes] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    const getLockerCodes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/lockers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("failed to fetch lockers");
        }
        const lockers = await response.json();
        setLockerCodes(lockers);
      } catch (error) {
        console.error("Error fetching lockers: ", error);
      }
    };
    getLockerCodes();
  }, []);

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getSearchedItems = () => {
    const filteredItems = lockerCodes.filter((item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const rearrangedItems = filteredItems.sort(
      (a, b) =>
        a.code.toLowerCase().indexOf(searchQuery.toLowerCase()) -
        b.code.toLowerCase().indexOf(searchQuery.toLowerCase())
    );
    return rearrangedItems;
  };

  return (
    <SideHeader>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "98%" }}>
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h4"
              sx={{
                color: "#002347",
                fontSize: "1.75rem",
                fontWeight: 700,
                margin: "1em 0",
                marginRight: "3em",
              }}
            >
              Reserved Lockers
            </Typography>
            <Autocomplete
              sx={{ borderRadius: "50px", width: "50%" }}
              freeSolo
              disableClearable
              options={lockerCodes.map((item) => item.code)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for a locker"
                  onChange={handleSearchChange}
                  InputProps={{
                    type: "search",
                  }}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer
              sx={{
                backgroundColor: "#E9E9E9",
                width: "80%",
                borderRadius: "15px",
              }}
            >
              <Table>
                <TableHead
                  sx={{
                    width: "100%",
                  }}
                >
                  <TableRow>
                    <TableCell
                      sx={{
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      Locker Code
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      Reservation ID
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    width: "100%",
                  }}
                >
                  {getSearchedItems().map((item) => (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      key={item.id}
                    >
                      <TableCell
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 400,
                          textAlign: "center",
                        }}
                      >
                        {item.code}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "#041526",
                          textAlign: "center",
                        }}
                      >
                        {item.reservation_id}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 400,
                          textAlign: "center",
                        }}
                      >
                        <Button
                          onClick={() => handleReservation(item.code, item.id)}
                          sx={{
                            backgroundColor:
                              location.pathname === "/pending"
                                ? "#0D5B00"
                                : "#DD0000",
                            color: "#FFFFFF",
                            fontSize: "1.29206rem",
                            fontWeight: 600,
                            textTransform: "none",
                            padding: ".2em 1em",
                            borderRadius: "17px",
                            "&:hover": {
                              backgroundColor:
                                location.pathname === "/pending"
                                  ? "#0D5B00"
                                  : "#DD0000",
                            },
                          }}
                          disableRipple
                        >
                          {location.pathname === "/pending"
                            ? "Confirm"
                            : "Checkout"}
                        </Button>
                        <Modal open={open === item.id} onClose={handleClose}>
                          <Box
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: 700,
                              bgcolor: "#040E18",
                              boxShadow: 24,
                              p: 4,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              borderRadius: "50px",
                            }}
                          >
                            <Typography
                              variant="h4"
                              sx={{
                                color: "#fff",
                                fontSize: "2rem",
                                fontWeight: 500,
                              }}
                            >
                              Your Locker Has Been Reserved !
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                fontWeight: 400,
                                width: "55%",
                                textAlign: "center",
                                margin: ".5em 0",
                              }}
                            >
                              You have 15 minutes till your reservation ends
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                fontWeight: 500,
                                textAlign: "center",
                              }}
                            >
                              Use the code below to access your locker
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#0D5B00",
                                fontSize: "1.25rem",
                                fontWeight: 600,
                                textAlign: "center",
                                margin: "2em 0",
                              }}
                            >
                              {item.reservation_id}
                            </Typography>
                            <Button
                              onClick={handleClose}
                              sx={{
                                color: "#040E18",
                                backgroundColor: "#fff",
                                fontSize: "1.19906rem",
                                fontWeight: 600,
                                textTransform: "none",
                                padding: ".3em 6em",
                                borderRadius: "10px",
                                "&:hover": { backgroundColor: "#fff" },
                              }}
                              disableRipple
                            >
                              Continue
                            </Button>
                          </Box>
                        </Modal>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </SideHeader>
  );
};

export default ReservedLockers;
