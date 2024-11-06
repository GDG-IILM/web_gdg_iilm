import React from "react";
import "./ProjectsCard.scss";
import { Link } from "react-router-dom";
import cardInfo from "/src/assets/projects.json";

function ProjectCard() {
  return (
    <>
      {cardInfo.map((cardInfo, index) => {
        return (
          <div className="project-card-container" key={index}>
            <div className="project-card-header">
              <div className="project-card-project-status-container">
                <h2 className="project-card-project-name">{cardInfo.title}</h2>
                <div className="project-card-project-img-container">
                  <img className="project-card-project-img" src={cardInfo.logo} alt="" />
                </div>
              </div>
            </div>
            <div className="project-status">
              {cardInfo.link ? (
                <a
                  href={cardInfo.link}
                  className="project-card-project-status"
                  style={{
                    backgroundColor: "#4a90e2",
                  }}
                  title={cardInfo.title}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cardInfo.Status}
                </a>
              ) : (
                <span
                  className="project-card-project-status"
                  style={{
                    backgroundColor: cardInfo.Status === "Live" ? "#4a90e2" : "#3CBA54",
                  }}
                >
                  {cardInfo.Status}
                </span>
              )}
              <p className="project-card-content">{cardInfo.description}</p>
            </div>
            <div className="project-card-footer">
              <Link to={`/projects/${index}`}>
                <button className="project-card-details">View Details</button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProjectCard;
