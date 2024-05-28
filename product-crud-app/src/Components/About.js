import React from 'react';
import './AboutMe.css';

const About = () => {
  return (
    <div className="container">
      <header>
        <h1>About Me</h1>
      </header>
      <section className="profile">
        <img
          src="https://media.licdn.com/dms/image/D4D03AQEF4rqya9vVXw/profile-displayphoto-shrink_800_800/0/1705003981573?e=1722470400&v=beta&t=2q-vKyeD_3LfDQMC9asjSxR495lwzScQ1wXMD9AdDK4"
          alt="Jawad Ahmed"
          className="profile-pic"
        />
        <h2>Jawad Ahmed</h2>
        <p>
          student at Mohammad Ali Jinnah University | SFC | React fundamentals |
          Tailwind fundamentals | .net fundamentals | CSS | HTML 5 | SFCP | PMEC
          | JIRA Fundamentals | Git.
        </p>
      </section>
      <section className="details">
        <h3>Details</h3>
        <p>
          <strong>Location:</strong> PECHS
        </p>
        <p>
          <strong>Profession:</strong> Computer Science Student
        </p>
        <p>
          <strong>Interests:</strong> Software Engineering
        </p>
      </section>
    </div>
  );
};

export default About;
