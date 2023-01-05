import styles from "./styles.module.css";
import { googleLogout } from "@react-oauth/google";
import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchReferee, getallReview} from "../../axios";
import FlexBetween from "./components/FlexBetween";
import Header from "./components/Header";
import ReactDOM from 'react-dom';
import { useNavigate} from "react-router-dom";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  LightModeOutlined,
  DarkModeOutlined,
  SettingsOutlined
} from "@mui/icons-material";
import  LogoutIcon from '@mui/icons-material/Logout';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { DataGrid,} from "@mui/x-data-grid";
import Scoreboard from './scoreBoard';

const HomePage = () => {


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    googleLogout();
    window.location.reload();
  };
  const handleMode = () => {

    //console.log(theme.palette.mode);
    if(theme.palette.mode === "dark"){
      localStorage.setItem("mode", "light");
      theme.palette.mode = "light";
      //console.log(theme.palette.mode);
      
    }
    else{
      localStorage.setItem("mode", "dark");
      theme.palette.mode = "dark";
      //console.log(theme.palette.mode);
    }
   
  };

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const data = 3;
 
  const [referee, setReferee] = useState([]);
  useEffect(()=>{
    fetchReferee().then(res=>{
      setReferee(res)
    })
  },[])
  const [review, setReview] = useState([]);
  useEffect(()=>{
    getallReview().then(res=>{
      setReview(res)
      
    })
  },[])


  const columns = [
    {
      field: "imageurl",
      headerName: "Photo",
      flex: 0.3,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: 'averagerating',
      headerName: "Rating out of 5",
      flex: 0.5,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
  ];
  const columns1 = [
    
    {
      field: "writtenBy",
      headerName: "From",
      flex: 0.3,
    },
    {
      field: 'comment',
      headerName: "Comment",
      flex: 0.3,
      sortable: false,
    },
    {
      field: "week",
      headerName: "Week",
      flex: 0.3, 
    },
    {
      field: "likecount",
      headerName: "Likes",
      flex: 0.3, 
      type: Number,
    },
    {
      field: "dislikecount",
      headerName: "Dislikes",
      flex: 0.3, 
      type: Number,
    },
  ];

  const navigate = useNavigate();

  const handleReferee: GridEventListener<'rowClick'> = (
    params,  // GridRowParams
    event,   // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log(params)
    navigate(`/referee/${params.id}`);
  }
  const handleReview: GridEventListener<'rowClick'> = (
    params,  // GridRowParams
    event,   // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log(params)
    navigate(`/user/${params.row.user}`);
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

          <IconButton onClick={() => handleMode()}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
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
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Empty Space for upcoming updates
          </Typography>
         
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Updates coming soon!!!
          </Typography>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
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
            loading={ !review}
            getRowId={(row) => row._id}
            rows={(review && review) || []}
            columns={columns1}
            rowsPerPageOptions={[50, 100, 150]}
            initialState={{
              sorting: {
                sortModel: [{ field: 'likecount', sort: 'desc' }],
              },
            }} 
            onRowClick = {handleReview}
            
          />
        </Box>

        {/* ROW 2 */}
        
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          Empty Space for upcoming updates
          </Typography>
         
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Updates coming soon!!!
          </Typography>
        </Box>
    
        <Box
          gridColumn="span 4"
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
            loading={ !referee}
            getRowId={(row) => row._id}
            rows={(referee && referee) || []}
            columns={columns}
            rowsPerPageOptions={[5, 10, 100]}
            initialState={{
              pagination: {
                pageSize: 5,
              },}}
              rowHeight={85}
              
            onRowClick = {handleReferee}
            
          />
        </Box>
      
      </Box>
    </Box>
  );
};
//ReactDOM.render(<HomePage />, document.getElementById('root'));
export default HomePage;
