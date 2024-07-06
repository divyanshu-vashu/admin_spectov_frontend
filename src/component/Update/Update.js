import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

const Update = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(-1);
  const [day, setDay] = useState(-1);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/delete/${courses[course]?.courseName}/${day}`);
      alert('Day = `${day}` course deleted');
      window.location.reload();
    } catch (error) {
      console.log(error);
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
        <Link to="/"><button id='nBtn'>Upload</button></Link>
        <Link to="/login"><button id='nBtn' onClick={handleLogout}>Logout</button></Link>
      </div>
      <h1 style={{ textAlign: "center" }}>See Course Data</h1>
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
        <div id='data' className="input-container" style={{ display: 'flex' }}>
          <h2>Video Link :<h4>{courses[course]?.videoLink[day]}</h4></h2>
          <h2>Material Link :<h4>{courses[course]?.materialLink[day]}</h4></h2>
          <button id='btn'  onClick={handleSubmit}>Delete</button>
        </div>
      )}
      {loading && <h1 style={{textAlign:"center"}}>Loading...</h1>}
      {error && <p>Error: {error}</p>}
    </>
  );
}

export default Update;
