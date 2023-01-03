import styles from "./styles.module.css";
import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import React from "react";
import { fetchReferee, fetchReview} from "../../axios";
import FlexBetween from "./components/FlexBetween";
import Header from "./components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid,} from "@mui/x-data-grid";

//import { useGetDashboardQuery } from "state/api";
import StatBox from "./components/StatBox";
const HomePage = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    googleLogout();
    window.location.reload();
  };
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const data = 3;
 
  const [data1, setData] = useState([]);
  useEffect(()=>{
    fetchReferee().then(res=>{
      setData(res)
    })
  },[])
  console.log(data1);


  const columns = [
    {
      field: "name",
      headerName: "Name of the Referee",
      flex: 1,
    },
    {
      field: 'averagerating',
      headerName: "Rating of the Referee",
      flex: 1,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
  ];
  const handleOnCellClick = (params) => {
    console.log("test");
  };
  const handleEvent: GridEventListener<'rowClick'> = (
    params,  // GridRowParams
    event,   // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log(params)
  }
  return (

      <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Home Page" subtitle="Welcome to System" />

        <Box>
          <IconButton
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          size = 'large' onClick={handleLogout} >
            <LogoutIcon fontSize="medium" />
            LogOut
          </IconButton>

        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          value={1}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={ !data1}
            getRowId={(row) => row._id}
            rows={(data1 && data1) || []}
            columns={columns}
            rowsPerPageOptions={[5, 10, 100]}
            //onCellClick={handleOnCellClick(params: 	GridRowId)}
            onRowClick = {handleEvent}
            
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
         
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
