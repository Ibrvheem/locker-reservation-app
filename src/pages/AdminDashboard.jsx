import { Box, Typography } from "@mui/material";
import SideHeader from "../components/SideHeader";
import DashboardTable from "../components/DashboardTable";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
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
          <Typography
            variant="h4"
            sx={{
              color: "#002347",
              fontSize: "1.75rem",
              fontWeight: 700,
              margin: "1em 0",
            }}
          >
            Welcome !
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(to right, rgb(252, 175, 68) , rgb(102, 39, 62))",
                padding: "1em 2em",
                width: "24%",
                borderRadius: "5px",
                margin: "1em 0",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600 }}
              >
                Total Lockers
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#0D0D0D", fontSize: "2.25rem", fontWeight: 600 }}
              >
                64
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(to right, rgb(247, 231, 170) , rgb(234, 166, 120))",
                padding: "1em 2em",
                width: "24%",
                borderRadius: "5px",
                margin: "1em 0",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600 }}
              >
                Available Lockers
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#0D0D0D", fontSize: "2.25rem", fontWeight: 600 }}
              >
                30
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(to right, rgb(170, 217, 233) , rgb(154, 120, 160))",
                padding: "1em 2em",
                width: "24%",
                borderRadius: "5px",
                margin: "1em 0",
              }}
            >
              <Link
                to="/reserved"
                style={{
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600 }}
                >
                  Reserved Lockers
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#0D0D0D",
                    fontSize: "2.25rem",
                    fontWeight: 600,
                  }}
                >
                  18
                </Typography>
              </Link>
            </Box>
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(to right, rgb(217, 171, 93) , rgb(218, 106, 94))",
                padding: "1em 2em",
                width: "24%",
                borderRadius: "5px",
                margin: "1em 0",
              }}
            >
              <Link
                to="/pending"
                style={{
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600 }}
                >
                  Pending Requests
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#0D0D0D",
                    fontSize: "2.25rem",
                    fontWeight: 600,
                  }}
                >
                  12
                </Typography>
              </Link>
            </Box>
          </Box>
          <DashboardTable />
        </Box>
      </Box>
    </SideHeader>
  );
};

export default AdminDashboard;
