import {
   AccountBalanceWalletRounded,
   MonetizationOnRounded,
} from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./Widget.scss";
import AssignmentReturnedRoundedIcon from "@mui/icons-material/AssignmentReturnedRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddMoneyModal from "./AddMoneyModal";
import { USDollar } from "../../pages/utils/helpOptions";
import Loader from "../Loader/Loader";
// import { getAllUsers } from "../../features/auth/authService";
import authService from "../../features/auth/authService";

import { API_URL } from "../../features/constants";
import axios from "axios";
import { fetchCurrentUser } from "../../features/auth/authSlice";
const Widget = ({ type }) => {
   const [openModal, setOpenModal] = useState(false);
   const dispatch = useDispatch();
   const { balance, moneySend, moneyReceived, requestReceived } = useSelector(
      (state) => state.auth.currentUser
   );
   // const streo = useSelector((state) => console.log(state));
   // const [currentUser, setCurrentUser] = useState(null);
   const user = JSON.parse(localStorage.getItem("user"));

   useEffect(() => {
      dispatch(fetchCurrentUser());
   }, [openModal, dispatch]);

   // console.log(currentUser)
   let data;

   switch (type) {
      case "user":
         data = {
            title: "MONEY SEND",
            isMoney: false,
            link: "/transactions",
            isSend: true,
            linkText: "money send to",
            icon: (
               <CompareArrowsRoundedIcon
                  className="icon"
                  style={{
                     color: "crimson",
                     backgroundColor: "rgba(255,0,0,0.2)",
                  }}
               />
            ),
         };
         break;
      case "order":
         data = {
            title: "MONEY RECEIVED",
            isMoney: false,
            link: "/transactions",
            isReceived: true,
            linkText: "money received",
            icon: (
               <AssignmentReturnedRoundedIcon
                  className="icon"
                  style={{
                     color: "goldenrod",
                     backgroundColor: "rgba(218,165,32,0.2)",
                  }}
               />
            ),
         };
         break;
      case "earning":
         data = {
            title: "REQUEST RECEIVED",
            isMoney: true,
            link: "/requests",
            isAnyReq: true,
            linkText: "requests received",
            icon: (
               <AccountBalanceWalletRounded
                  className="icon"
                  style={{
                     color: "purple",
                     backgroundColor: "rgba(128,0,128,0.2)",
                  }}
               />
            ),
         };
         break;
      case "balance":
         data = {
            title: "BALANCE",
            isMoney: true,
            link: "/balance",
            icon: (
               <CurrencyRupeeIcon
                  className="icon"
                  style={{
                     color: "green",
                     backgroundColor: "rgba(0,128,0,0.2)",
                  }}
               />
            ),
            isBalance: true,
            linkText: "add money",
         };
         break;

      default:
         break;
   }

   const addMoney = () => {
      setOpenModal(true);
   };

   return (
      <div className="widget">
         {openModal && <AddMoneyModal setAddMoneyModal={setOpenModal} />}
         <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">
               {data.isSend && moneySend}
               {data.isReceived && moneyReceived}
               {data.isAnyReq && requestReceived}
               {data.isBalance && balance}
            </span>
            {data.link === "/balance" ? (
               <span
                  className="link"
                  style={{ cursor: "pointer" }}
                  onClick={addMoney}
               >
                  add money
               </span>
            ) : (
               <Link to={data.link} className="link">
                  <span>{data.linkText}</span>
               </Link>
            )}
         </div>
         <div className="right">
            <div className="percentage positive">
               <KeyboardArrowUpRoundedIcon />
            </div>
            {data.icon}
         </div>
      </div>
   );
};

export default Widget;
