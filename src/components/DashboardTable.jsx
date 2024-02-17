import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const DashboardTable = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [lockerCodes, setLockerCodes] = React.useState([]);
  const [ReservelockerCodes, setReserveLockerCodes] = React.useState([]);
  const [recentLockers, setRecentLockers] = React.useState([]);
  const [reservationId, setReservationId] = React.useState("");
  const [selectedLockerId, setSelectedLockerId] = React.useState(null);

  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  const user_id = user.id;

  useEffect(() => {
    const getLockerCodes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/available_lockers`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("failed to fetch lockers");
        }
        const lockers = await response.json();
        setLockerCodes(lockers.data);
        // console.log(lockers.data);
      } catch (error) {
        console.error("Error fetching lockers: ", error);
      }
    };

    getLockerCodes();
  }, []);

  const getReservedLockerCodes = async (lockerId) => {
    try {
      const reservationData = {
        user_id: user_id,
        locker_id: lockerId,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/reservations/${user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );
      if (!response.ok) {
        throw new Error("failed to create reservations");
      }
      const lockers = await response.json();
      setReserveLockerCodes(lockers.data);
      // console.log(lockers.data);
    } catch (error) {
      console.error("Error fetching reservations: ", error);
    }
  };

  useEffect(() => {
    const getUserReservations = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/reservations/${user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("failed to fetch reservations");
        }
        const reservations = await response.json();
        setRecentLockers(reservations);
      } catch (error) {
        console.error("Error fetching reservations: ", error);
      }
    };

    getUserReservations(user_id);
  }, []);

  const handleReservation = async (lockerCode, id) => {
    setSelectedLockerId(id);
    console.log(selectedLockerId);
    setOpenModal(true);
    getReservedLockerCodes(lockerCode);
    console.log(
      `Reserving locker with the locker code: ${lockerCode} with the id: ${id}`
    );
    try {
      const reservationData = {
        user_id: user_id,
        locker_id: lockerCode,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/create_reservation/${{
          user_id,
        }}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to generate UUID");
      }
      const responseData = await response.json();
      console.log(`Reservation ID: ${reservationId}`);
      setReservationId(responseData.reservation_id);
    } catch (error) {
      console.error("Error creating Unique id", error);
    }
    getReservedLockerCodes(lockerCode);
  };

  const handleClose = async () => {
    setOpenModal(false);
    await fetchUpdatedLockers();
  };

  const fetchUpdatedLockers = async () => {
    try {
      const updatedResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/available_lockers`,
        {
          method: "GET",
        }
      );

      // Check if fetching updated lockers was successful
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated lockers");
      }

      // Update state with updated locker codes
      const updatedLockers = await updatedResponse.json();
      setLockerCodes(updatedLockers.data);
    } catch (error) {
      console.error("Error fetching updated lockers", error);
    }
  };

  return (
    <Box
      sx={{
        fontSize: {
          xs: "12px",
          md: "16px",
          overflowY: "hidden",
        },
      }}
    >
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#E9E9E9",
            padding: "1em",
            width: { md: "28%" },
            borderRadius: "15px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "#121212",
              fontWeight: 600,
              fontSize: "1.42131rem",
            }}
          >
            Available Lockers
          </Typography>
          <Box sx={{ marginTop: "2em" }}>
            {lockerCodes
              .filter((item) => item.reservations === null)
              .map((item) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      location.pathname === "/admin"
                        ? "center"
                        : "space-between",
                    alignItems: "center",
                    margin: "1.5em 0",
                  }}
                  key={item.id}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "1.29206rem", fontWeight: "600" }}
                  >
                    {item.locker_id.toString().padStart(3, "0")}
                  </Typography>
                  <Button
                    onClick={() =>
                      handleReservation(item.locker_id, item.locker_id)
                    }
                    sx={{
                      backgroundColor: "#041526",
                      color: "#FFFFFF",
                      fontSize: "1.29206rem",
                      fontWeight: 600,
                      textTransform: "none",
                      padding: ".2em 1em",
                      borderRadius: "17px",
                      display:
                        location.pathname === "/admin" ? "none" : "block",
                      "&:hover": {
                        backgroundColor: "#041526",
                      },
                    }}
                    disableRipple
                  >
                    Reserve
                  </Button>
                  <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
                          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                          fontWeight: 500,
                        }}
                      >
                        Your Locker Has Been Reserved !
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#fff",
                          fontSize: { xs: "1rem", sm: "1rem", md: "1.25rem" },
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
                          fontSize: { xs: "1rem", sm: "1rem", md: "1.25rem" },
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
                        {reservationId}
                      </Typography>
                      <Button
                        onClick={() => handleClose()}
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
                </Box>
              ))}
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#E9E9E9",
            padding: "1em",
            width: { md: "70%" },
            borderRadius: "15px",
            marginTop: { xs: "2em", md: "0" },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#121212",
              fontWeight: 600,
              fontSize: "1.42131rem",
            }}
          >
            Recent Reservations
          </Typography>
          <Box sx={{ marginTop: "2em" }}>
            <TableContainer sx={{ backgroundColor: "#E9E9E9" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "1.125rem", fontWeight: 500 }}>
                      Locker Code
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.125rem", fontWeight: 500 }}>
                      Time
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.125rem", fontWeight: 500 }}>
                      Date
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.125rem", fontWeight: 500 }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentLockers.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell sx={{ fontSize: "1rem", fontWeight: 400 }}>
                        {row.locker_id.toString().padStart(3, "0")}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 400,
                          color:
                            row.status === "Pending"
                              ? "#FF5003"
                              : row.status === "Ongoing"
                              ? "#0D5B00"
                              : "#DE6944",
                        }}
                      >
                        {new Date(row.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </TableCell>
                      <TableCell sx={{ fontSize: "1rem", fontWeight: 400 }}>
                        {new Date(row.created_at).toISOString().split("T")[0]}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 400,
                          color:
                            row.status === "Ended"
                              ? "#FF5003"
                              : row.status === "Ongoing"
                              ? "#0D5B00"
                              : "#DE6944",
                        }}
                      >
                        {row.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardTable;
