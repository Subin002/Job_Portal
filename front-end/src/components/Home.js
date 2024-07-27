
import React, { useEffect, useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';

function DashBoard() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    fetch('http://localhost:2000/jobs')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredJobs = jobs.filter(job => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      job.companyName.toLowerCase().includes(lowerCaseQuery) ||
      job.role.toLowerCase().includes(lowerCaseQuery) ||
      job.experience.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div>
      <nav>
        <div className="nav__logo">JOB_PORTAL</div>
        <ul className="nav__links">
          <li className="link"><a href="#">Home</a></li>
          <li className="link"><a href="#">Destinations</a></li>
          <li className="link"><a href="#">Pricing</a></li>
          <li className="link"><a href="#">Reviews</a></li>
        </ul>
        <button className="btn">Contact Us</button>
      </nav>
    
      <section className="section__container destination__container">
        <div className="section__header">
          <div>
            <h2 className="section__title">SELECT YOUR INTEREST</h2>
            <p className="section__subtitle">
            Discover Your Dream Job: Our job portal provides tailored job suggestions and an effortless application experience. Start exploring today!
            </p>
          </div>
          <div className="destination__nav">
            <span><i className="ri-arrow-left-s-line"></i></span>
            <span><i className="ri-arrow-right-s-line"></i></span>
          </div>
        </div>
        <div className="search__bar" style={{ margin: '1rem' }}>
          <input style={{ width: '500px', height: '40px', borderRadius: '10px' }}
            type="text"
            placeholder="Search for jobs by title, experience, or company..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="destination__grid">
          {filteredJobs.map((job, index) => (
            <div className="destination__card" key={index}>
              <img src="https://img.freepik.com/free-vector/programmer-working-flat-style_52683-15041.jpg?t=st=1722079593~exp=1722083193~hmac=a047377095fd8ce2e899ecf9ac730b443c15ca14ae8bce9d5aadcb303c257b7d&w=740" alt="destination" />
              <div className="destination__details">
                <p className="destination__title">{job.companyName}</p>
                <p className="destination__subtitle">{job.role}</p>
                <p className="destination__subtitle">{job.experience}</p>
                <p className="destination__subtitle">{job.place}</p>
                <button className="btn" onClick={() => navigate('/apply')}>Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashBoard;