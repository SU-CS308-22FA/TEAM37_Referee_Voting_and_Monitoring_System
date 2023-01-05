import { useState,useEffect } from "react";
import React from "react";
import { fetchReferee, requestUsers} from "../../axios";
import FlexBetween from "./FlexBetween";
import Header from "./Header"
import { useNavigate} from "react-router-dom";
// import styles from "./styles.module.css";
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
import RefereeList from "./RefereeList";
import Card from 'react-bootstrap/Card';
import UserList from "./userList";
const AdminPanel = () => {
  const theme = useTheme();
  //test for bug
  const [referee, setReferee] = useState([]);
  const [filteredreferee, setfilteredreferee] = useState([]);
  const [searchtext, setSearchtext] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    requestUsers().then(res=>{
      setUsers(res.user)     
    })
  },[])
  console.log(users)
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const handleNavigate: GridEventListener<'rowClick'> = (
    params,  // GridRowParams
    event,   // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log(params)
    //navigate(`/profile/${params.id}`);
  }
  const handleSearch= (e)=>{
    e.preventDefault()
    
    let filtered;
    if (searchtext !=='') {
      setIsSearch(true)
      filtered = referee.filter(o => o.name.toLowerCase().includes(searchtext.toLowerCase()));
     
      setfilteredreferee(filtered)
    }
    

  }
  const handleResetSearch= (e)=>{
    e.preventDefault()
    setIsSearch(false)
setSearchtext('')
  }

  useEffect(()=>{
    fetchReferee().then(res=>{
      setReferee(res)
    })
  },[])

  const columns = [
 
    {
      field: "fullname",
      headerName: "FULL NAME",
      flex: 0.3,
    },
    {
      field: 'email',
      headerName: "E-MAIL",
      flex: 0.3,
      sortable: false,
    },
    {
      field: "userType",
      headerName: "TYPE",
      flex: 0.3, 
    },
    {
      field: "nickname",
      headerName: "Nickname",
      flex: 0.3, 
      type: String,
    },
    {
      field: "verified",
      headerName: "Verification",
      flex: 0.3, 
      type: Boolean,
    },

  ];
  const columns2=[    {
    
    headerName: "Update",
    flex: 0.3, 
  },{
    
    headerName: "Delete",
    flex: 0.3, 
  },];
  return (
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
      <Header title="ADMIN PANEL" />
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
           <Box
          gridColumn="span 7"
          gridRow="span 8"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Referee List
          </Typography>
         
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            <>
                <div className="container mt-5 mt-lg-1 referee-container">
                  
                  <div className="col-md-12 ref-search">
                  <div className="search-wrapper">
                  <input type="text" placeholder="Search by name.." value={searchtext} onChange={(e)=>setSearchtext(e.target.value)} />
                  <button onClick={handleSearch}>search</button>
                  </div>
                  <span className="reeset" onClick={handleResetSearch}>
                    Reset Search
                  </span>
                  </div>
                  <div className="">
          <div className="row mt-4">

          {isSearch?   <RefereeList referee={filteredreferee}/> :
            <RefereeList referee={referee}/>}     
          </div>
                  </div>
                </div>
              </>
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
            loading={ !users}
            getRowId={(row) => row._id}
            rows={(users && users) || []}
            columns={columns}
            rowsPerPageOptions={[50, 100, 150]}
            initialState={{
              sorting: {
                sortModel: [{ field: 'nickname', sort: 'desc' }],
              },
            }}
            onRowClick = {handleNavigate}                      
          />                                      
            <Box>
              <Typography>
              <UserList users={users}/>
              </Typography>
            </Box>
        </Box>
      </Box>
              
              
    </Box>)
};

export default AdminPanel
