import { useEffect, useState } from "react";
import "./Admin.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, getusers } from "../../features/auth/authSlice";
import { verify, verifyReset } from "../../features/verify/verifySlice";
import Loader from "../../components/Loader/Loader";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
   getReceivedTransactions,
   getSendTransactions,
   getTransactions,
} from "../../features/transactions/transactionSlice";

const Admin = () => {
   const dispatch = useDispatch();
   const { users, isLoading } = useSelector((state) => state.auth);
   const { verifySuccess } = useSelector((state) => state.verify);
   const [openDialog, setOpenDialog] = useState(false);
   // const [selectedUser, setSelectedUser] = useState(null);

   const selectedUser = useSelector((state) => state.auth.currentUserById);
   const transaction = useSelector((ste) => ste.transact.transactions);

   //  console.log(transaction);
   useEffect(() => {
      dispatch(getusers());
      if (verifySuccess) {
         dispatch(verifyReset());
      }
   }, [dispatch, verifySuccess]);

   const singlePage = (user) => {
      Promise.all([
         dispatch(getUserById(user._id)),
         dispatch(getTransactions(user._id)),
      ]).then(() => {
         setOpenDialog(true);
      });
   };

   const UserDetailsDialog = () => {
      return (
         <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            maxWidth="md"
         >
            <DialogTitle>User Details</DialogTitle>
            <DialogContent>
               {selectedUser && (
                  <TableContainer component={Paper}>
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableCell>Sender</TableCell>
                              <TableCell>Receiver</TableCell>
                              <TableCell>Amount</TableCell>
                              <TableCell>Date</TableCell>
                           </TableRow>
                        </TableHead>
                        {/* Table Body */}
                        <tbody>
                           {transaction?.map((transaction) => (
                              <TableRow key={transaction._id}>
                                 <TableCell
                                    className={
                                       transaction.sender.name ===
                                       selectedUser.name
                                          ? "highlight"
                                          : ""
                                    }
                                 >
                                    {transaction.sender.name}
                                 </TableCell>
                                 <TableCell
                                    className={
                                       transaction.receiver.name ===
                                       selectedUser.name
                                          ? "highlight"
                                          : ""
                                    }
                                 >
                                    {transaction.receiver.name}
                                 </TableCell>
                                 <TableCell>₹{transaction.amount}</TableCell>
                                 <TableCell>
                                    {formatDate(transaction.createdAt)}
                                 </TableCell>
                              </TableRow>
                           ))}
                        </tbody>
                     </Table>
                  </TableContainer>
               )}
            </DialogContent>
         </Dialog>
      );
   };

   return (
      <div className="list">
         <Sidebar />
         <div className="listContainer">
            <Navbar />
            <div className="usersList">
               <h1>users </h1>
               <div className="usersListContainer">
                  {isLoading ? (
                     <Loader />
                  ) : (
                     <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                           <TableHead>
                              <TableRow>
                                 <TableCell className="tableCell tableHead">
                                    Acc No:
                                 </TableCell>
                                 <TableCell className="tableCell tableHead">
                                    Name
                                 </TableCell>
                                 <TableCell className="tableCell tableHead">
                                    Email
                                 </TableCell>
                                 <TableCell className="tableCell tableHead">
                                    Phone
                                 </TableCell>

                                 <TableCell className="tableCell tableHead">
                                    More
                                 </TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {users.map((user) => (
                                 <TableRow key={user._id}>
                                    <TableCell className="tableCell">
                                       {user._id}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                       <div className="cellWrapper">
                                          <img
                                             src={user.image}
                                             alt={user.name}
                                             className="image"
                                          />
                                          {user.name}
                                       </div>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                       {user.email}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                       {user.phone}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                       <button
                                          className="verifyBtn"
                                          onClick={() => singlePage(user)}
                                       >
                                          Read More
                                       </button>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                  )}
               </div>
            </div>
            <UserDetailsDialog />
         </div>
      </div>
   );
};

const formatDate = (isoString) => {
   const date = new Date(isoString);

   // Format the date
   const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
   }).format(date);

   return formattedDate;
};

export default Admin;
