import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./Navbar.scss";
import Avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserImage } from "../../features/upload/uploadSlice";

const Navbar = () => {
   const { name, image, isAdmin } = useSelector((state) => state.auth.user);
   const temp = useSelector((ad) => console.log(ad.upload));
   // console.log(image)
const dispatch = useDispatch()
   useEffect( () =>
   {
      getUserImage(dispatch)
   },[])

   return (
      <div className="navbar">
         <div className="wrapper">
            <div className="search">
               {/* <input type="text" placeholder="search..." />
               <SearchRoundedIcon className="icon" /> */}
            </div>
            <div className="items">
               <div className="item">
                  {image ? (
                     <img src={image} alt={name} className="avatar" />
                  ) : (
                     <img src={Avatar} alt="avatar" className="avatar" />
                  )}
               </div>

               <div className="item admin">
                  <h2>{name}</h2>
                  <Link to={isAdmin ? "/users" : "#"}>
                     <p>{isAdmin && "Admin"}</p>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
