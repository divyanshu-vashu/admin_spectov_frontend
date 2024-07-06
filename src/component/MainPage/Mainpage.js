import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './mainpage.css'; 
import axios from 'axios';

const Mainpage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(-1);
  const [day, setDay] = useState(-1);

  const [data,setData]=useState({
    courseName:"",
    day:"",
    vl:"",
    ml:""
  })

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://admin-spectov-backend.onrender.com/api/all');
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
    setDay(-1); 
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    data.courseName=`${courses[`${course}`]?.courseName}`
    data.day=`${day}`
    try {
      console.log(data)

      const url=`http://localhost:4000/api/add`;
      const { data: res } = await axios.put(url, data);

      console.log(res.message)
     // await axios.put();
      alert('Upload Successful.');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const days = Array.from({ length: 65 }, (_, i) => i + 1);

  const isDataVisible = course >= 0 && day >= 0;
  const handleLogout=()=>{
    localStorage.removeItem("AdminEmail")
  }
  return (
    <>
      <div id='nDiv'>
        <h2>SpectoV</h2>
        <Link to="/add-course"><button id='nBtn'>Add new courses</button></Link>
        <Link to="/all-courses"><button id='nBtn'>See course</button></Link>
        <Link to="/login"><button id='nBtn' onClick={handleLogout}>Logout</button></Link>
      </div>
      <h1 style={{ textAlign: "center" }}>Upload/Update Course Data</h1>
      <div className="select-container">
        <h2>Courses: </h2>
        <select id='course' className="course-select" onChange={handleCourseChange} value={course}>
          <option value="-1">--select--</option>
          {courses.map((course, index) => (
            <option key={index} value={index}>{course.courseName}</option>
          ))}
        </select>
        <h2>Days: </h2>
        <select id='day' className="day-select" onChange={handleDayChange} value={day}>
          <option value="-1">--select--</option>
          {days.map(day => (
            <option key={day} value={day - 1}>Day {day}</option>
          ))}
        </select>
      </div>
      {isDataVisible && (
        <form id='data' className="input-container" onSubmit={handleSubmit}>
          <h2>Video Link :</h2>
          <input
            type='text'
            placeholder='Course Video Link'
            className="video-link-input"
            name="vl"
            value={data.vl}
            onChange={handleChange}
            required
          />
          <h2>Material Link :</h2>
          <input
            type='text'
            placeholder='Course Material Link'
            className="material-link-input"
            name="ml"
            value={data.ml}
            onChange={handleChange}
            required
          />
          <button id='btn' type="submit">Submit</button>
        </form>
      )}
      {loading && <h1 style={{textAlign:"center"}}>Loading...</h1>}
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default Mainpage;
