import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
const Addnewcourse=()=>{
    const [data, setData] = useState({
    courseName: "",
  });
  const [error, setError] = useState("");
 // const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://admin-spectov-backend.onrender.com/api/courses";
      const { data: res } = await axios.post(url, data);
      alert("New Course Added")
      window.location.reload();
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  const handleLogout=()=>{
    localStorage.removeItem("AdminEmail")
  }
    return(
        <>
            <div id='nDiv'>
            <h2>SpectoV</h2>
            <Link to="/"><button id='nBtn'>upload</button></Link>
            <Link to="/all-courses"><button id='nBtn'>See courses</button></Link>
            <Link to="/login"><button id='nBtn' onClick={handleLogout}>Logout</button></Link>
        </div>
        <h1 style={{textAlign:"center"}}>Add new Course</h1>
        <form id='data' className="select-container" onSubmit={handleSubmit}>
            <h2>Course Name :</h2>
            <input type="text" placeholder="Enter course name" className="video-link-input"             name="courseName"
              onChange={handleChange}
              value={data.courseName} required/>
            <button id='btn'>Add</button>
            <h2>{error}</h2>
        </form>
           
        </>
    )
}
export default Addnewcourse;
