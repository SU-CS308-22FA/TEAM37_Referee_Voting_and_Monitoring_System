import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { getUserDetails, getallReviewByUserId } from "../../axios";
import { DataGrid,} from "@mui/x-data-grid";
import styles from "./styles.module.css";
import {
  Box,
  useTheme,
} from "@mui/material";

const UserPage = () => {

  let { id } = useParams();
  const theme = useTheme();

  const [user1, setUser] = useState({});
  const [review, setReview] = useState({});
  const handleDelete = () => {
    console.log("inside page")
    console.log(user1._id)

  };

  useEffect(()=>{
    getUserDetails(id).then(res=>{
      setUser(res.user) 
      console.log('inside effect') 
      
    })
    getallReviewByUserId(id).then(res=>{
      setReview(res.review)
    })
      
  },[id])

  const columns1 = [
    
 
    {
      field: 'comment',
      headerName: "Comment",
      flex: 0.3,
      sortable: false,
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

  const handleReview: GridEventListener<'rowClick'> = (
    params,  // GridRowParams
    event,   // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log(params)
    navigate(`/referee/${params.row.referee}`);
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img
          src={user1.imageurl}
          alt="user"
          width="100"
        ></img>
        <h4>{user1.fullname}</h4>
        <p>{user1.nickname}</p>

        <div className={styles.button_div}>
     

            <button stype="button" onClick={handleDelete}>
              Delete
            </button>
          
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.info}>
          <h3>Information</h3>
          <div className={styles.info_data}>
            <div className={styles.data}>
              <h4>Email</h4>
              <p>{user1.email}</p>
              
              <p className={styles.sent_message}>{}</p>
            </div>

            <div className={styles.data}>
              <h4>Nick Name</h4>
              <p>{user1.nickname}</p>
            </div>
          </div>
        </div>

        <div className={styles.projects}>
          <h3>Activities</h3>
          <div className={styles.projects_data}>
            <div className={styles.data}>
              <h4>PLACEHOLDER</h4>
              <p>PLACEHOLDER</p>
            </div>
            <div className={styles.data}>
              <h4>Most Viewed</h4>
              <p>PLACEHOLDER</p>
            </div>
          </div>
        </div>

      </div>
      
    
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
  </div>
  );
};


export default UserPage;
