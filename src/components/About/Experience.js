import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

function Experience() {
  const experiences = [
    {
      company: "Sopra Steria",
      logo: "https://business.udemy.com/wp-content/uploads/2021/06/sopra-steria-logo.png",
      roles: [
        {
          title: "Senior Software Engineer",
          type: "Full-time",
          duration: "August 2025 - Present",
          months: "4 months",
          location: "Bangalore, Karnataka, India",  
          workType: "Hybrid",
          description: "Working in the Aeroline Unit for client Airbus on the Aircraft Cabin program, developing and managing microservices using AWS (SQS/SNS).",
          skills: ["Node.js", "Microservices", "AWS", "SQS", "SNS", "JavaScript", "TypeScript", "Docker", "Kubernetes", "CI/CD", "Agile", "REST APIs"]
        }
      ]
    },
    {
      company: "mFilterlt",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU5JzWwMtIU4EdpE53xG5RU_RBNFk6GXWo3g&s",
      overallDuration: "3 years 8 months",
      location: "Noida, Uttar Pradesh, India",
      workType: "On-site",
      roles: [
        {
          title: "Senior Software Engineer",
          type: "Full-time",
          duration: "April 2025 - August 2025",
          months: "5 months",
          description: "Developed multiple end-to-end products using React and Next.js with a micro-frontend and component-based architecture to ensure a smooth and scalable user experience. Built backend services using Node.js and Express.js.",
          skills: ["Product Development", "Ownership", "React", "Next.js", "Node.js", "Express.js", "Micro-frontend", "Component Architecture", "JavaScript", "TypeScript"]
        },
        {
          title: "Software Engineer",
          type: "Full-time",
          duration: "May 2022 - April 2025",
          months: "3 years",
          description: "Developed and maintained web applications using React.js and Next.js. Worked on building scalable frontend solutions and integrating with backend APIs.",
          skills: ["React.js", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "REST APIs", "Git", "Agile", "Redux", "Webpack", "Jest"]
        },
        {
          title: "Research And Development Intern",
          type: "Internship",
          duration: "January 2022 - May 2022",
          months: "5 months",
          description: "Worked on research and development projects, learning and implementing new technologies and contributing to product development.",
          skills: ["Research", "Development", "JavaScript", "React", "Problem Solving"]
        }
      ]
    }
  ];

  return (
    <Container style={{ paddingTop: "50px", paddingBottom: "50px" }}>
      <h1 className="project-heading">
        <strong className="purple">Experience</strong>
      </h1>
      <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <Col md={10}>
          {experiences.map((exp, companyIndex) => (
            <Card 
              key={companyIndex} 
              style={{ 
                marginBottom: "30px",
                backgroundColor: "rgba(30, 25, 45, 0.85)",
                border: "1px solid rgba(199, 112, 240, 0.3)",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(119, 53, 136, 0.3)",
                backdropFilter: "blur(10px)"
              }}
            >
              <Card.Body style={{ padding: "30px" }}>
                <div style={{ 
                  marginBottom: "25px",
                  paddingBottom: "20px",
                  borderBottom: "2px solid rgba(199, 112, 240, 0.2)"
                }}>
                  <h3 style={{ 
                    color: "#c770f0", 
                    marginBottom: "15px", 
                    display: "flex", 
                    alignItems: "center",
                    fontSize: "1.5em",
                    fontWeight: "600"
                  }}>
                    {exp.logo && (
                      <img 
                        src={exp.logo} 
                        alt={exp.company} 
                        style={{ 
                          width: "50px", 
                          height: "50px", 
                          marginRight: "15px",
                          objectFit: "contain",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          padding: "5px",
                          borderRadius: "8px"
                        }} 
                      />
                    )}
                    <FaBriefcase style={{ marginRight: "10px" }} />
                    {exp.company}
                  </h3>
                  {exp.overallDuration && (
                    <p style={{ 
                      color: "#d4c4e8", 
                      fontSize: "1em", 
                      marginBottom: "8px",
                      backgroundColor: "rgba(199, 112, 240, 0.15)",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      display: "inline-block"
                    }}>
                      <strong>Overall Duration:</strong> {exp.overallDuration}
                    </p>
                  )}
                  <p style={{ 
                    color: "#d4c4e8", 
                    fontSize: "0.95em",
                    marginTop: "10px"
                  }}>
                    <FaMapMarkerAlt style={{ marginRight: "8px", color: "#c770f0" }} />
                    {exp.location} <span style={{ color: "#c770f0" }}>({exp.workType})</span>
                  </p>
                </div>
                
                {exp.roles.map((role, roleIndex) => (
                  <div 
                    key={roleIndex} 
                    style={{ 
                      marginBottom: roleIndex < exp.roles.length - 1 ? "30px" : "0",
                      paddingBottom: roleIndex < exp.roles.length - 1 ? "30px" : "0",
                      borderBottom: roleIndex < exp.roles.length - 1 ? "1px solid rgba(199, 112, 240, 0.2)" : "none",
                      backgroundColor: roleIndex < exp.roles.length - 1 ? "rgba(199, 112, 240, 0.05)" : "transparent",
                      padding: roleIndex < exp.roles.length - 1 ? "20px" : "0",
                      borderRadius: "10px",
                      marginLeft: roleIndex < exp.roles.length - 1 ? "-10px" : "0",
                      marginRight: roleIndex < exp.roles.length - 1 ? "-10px" : "0"
                    }}
                  >
                    <h4 style={{ 
                      color: "#ffffff", 
                      marginBottom: "15px",
                      fontSize: "1.3em",
                      fontWeight: "600"
                    }}>
                      {role.title}
                    </h4>
                    <div style={{ 
                      marginBottom: "15px", 
                      fontSize: "0.95em", 
                      color: "#d4c4e8",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "15px"
                    }}>
                      <span style={{
                        backgroundColor: "rgba(199, 112, 240, 0.2)",
                        padding: "6px 12px",
                        borderRadius: "6px"
                      }}>
                        <strong style={{ color: "#c770f0" }}>Type:</strong> {role.type}
                      </span>
                      <span style={{
                        backgroundColor: "rgba(199, 112, 240, 0.2)",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center"
                      }}>
                        <FaCalendarAlt style={{ marginRight: "6px", color: "#c770f0" }} />
                        <strong style={{ color: "#c770f0" }}>Duration:</strong> {role.duration} <span style={{ color: "#d4c4e8" }}>({role.months})</span>
                      </span>
                    </div>
                    {role.description && (
                      <p style={{ 
                        textAlign: "justify", 
                        marginBottom: "15px", 
                        color: "#e8e0f0",
                        lineHeight: "1.7",
                        fontSize: "1em"
                      }}>
                        {role.description}
                      </p>
                    )}
                    {role.skills && role.skills.length > 0 && (
                      <div style={{ 
                        marginTop: "15px",
                        padding: "12px",
                        backgroundColor: "rgba(199, 112, 240, 0.1)",
                        borderRadius: "8px",
                        border: "1px solid rgba(199, 112, 240, 0.2)"
                      }}>
                        <strong style={{ color: "#c770f0", fontSize: "1em" }}>Skills: </strong>
                        <span style={{ color: "#d4c4e8" }}>
                          {role.skills.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Experience;

