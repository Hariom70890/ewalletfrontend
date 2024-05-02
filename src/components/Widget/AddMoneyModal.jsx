import React, { useState, useEffect } from "react";
import "../Modal/SendModal.scss";
import { toast } from "react-toastify";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSelector, useDispatch } from "react-redux";
import {
   addBalance,
   reset,
} from "../../features/transactions/transactionSlice";
import Loader from "../Loader/Loader";

const AddMoneyModal = ({ setAddMoneyModal }) => {
   const dispatch = useDispatch();
   const { isSuccess, isLoading, moneyAdded, isError, message } = useSelector(
      (state) => state.transact
   );
   useEffect(() => {
      if (isError) {
         toast.error(message);
      }
      if (isSuccess) {
         toast.success(moneyAdded.msg);
         setAddMoneyModal(false);
      }
      dispatch(reset());
   }, [isError, message, isSuccess]);

   const addMoneyClose = () => {
      setAddMoneyModal(false);
   };

   const [formData, setFormData] = useState({
      amount: "",
      source: "",
      accountNumber: "",
      ifscCode: "",
      cardNumber: "",
      chequeNumber: "",
   });

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };

   //  console.log(formData)
   const onSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      dispatch(addBalance(formData));
   };

   return (
      <div className="sendmodal">
         <div className="sendModalContainer">
            {isLoading ? (
               <Loader />
            ) : (
               <>
                  <div className="sendModalHeader">
                     <h1>Add Money</h1>
                     <div
                        className="closeIconContainer"
                        onClick={addMoneyClose}
                     >
                        <CloseRoundedIcon className="closeIcon" />
                     </div>
                  </div>
                  <div className="sendModalContent">
                     <section className="sendForm">
                        <form onSubmit={onSubmit}>
                           <div className="formControl">
                              <label htmlFor="amount">Amount</label>
                              <input
                                 type="number"
                                 name="amount"
                                 id="amount"
                                 value={formData.amount}
                                 onChange={onChange}
                                 min="1"
                                 max="100000"
                                 placeholder="₹ 1000"
                                 required
                              />
                           </div>
                           <div className="formControl">
                              <label htmlFor="source">Source</label>
                              <select
                                 name="source"
                                 id="source"
                                 value={formData.source}
                                 onChange={onChange}
                              >
                                 <option value="">
                                    Select the Source of Transfer
                                 </option>
                                 <option value="bankTransfer">
                                    Bank Transfer
                                 </option>
                                 <option value="cheque">Cheque</option>
                                 <option value="card">Card</option>
                              </select>
                           </div>
                           {formData.source === "bankTransfer" && (
                              <>
                                 <div className="formControl">
                                    <label htmlFor="accountNumber">
                                       Account Number
                                    </label>
                                    <input
                                       type="text"
                                       name="accountNumber"
                                       id="accountNumber"
                                       value={formData.accountNumber}
                                       onChange={onChange}
                                       placeholder="Enter Your Account Number (14 digits)"
                                       pattern="\d{14}"
                                       title="Please enter a 14-digit account number"
                                       required
                                    />
                                 </div>
                                 <div className="formControl">
                                    <label htmlFor="ifscCode">IFSC Code</label>
                                    <input
                                       type="text"
                                       name="ifscCode"
                                       id="ifscCode"
                                       value={formData.ifscCode}
                                       onChange={onChange}
                                       placeholder="Enter IFSC Code (11 characters)"
                                       pattern="[A-Za-z]{4}\d{7}"
                                       title="Please enter a valid IFSC code (e.g., ABCD1234567)"
                                       required
                                    />
                                 </div>
                              </>
                           )}
                           {formData.source === "card" && (
                              <div className="formControl">
                                 <label htmlFor="cardNumber">Card Number</label>
                                 <input
                                    type="text"
                                    name="cardNumber"
                                    id="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={onChange}
                                    placeholder="Enter Card Number"
                                    pattern="[0-9]{16}"
                                    title="Please enter a valid 16-digit card number"
                                    required
                                 />
                              </div>
                           )}
                           {formData.source === "cheque" && (
                              <div className="formControl">
                                 <label htmlFor="chequeNumber">
                                    Cheque Number
                                 </label>
                                 <input
                                    type="text"
                                    name="chequeNumber"
                                    id="chequeNumber"
                                    value={formData.chequeNumber}
                                    onChange={onChange}
                                    placeholder="Enter Cheque Number"
                                    pattern="[0-9]{6}"
                                    title="Please enter a valid 6-digit cheque number"
                                    required
                                 />
                              </div>
                           )}

                           <button className="btn" type="submit">
                              Add
                           </button>
                        </form>
                     </section>
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default AddMoneyModal;
