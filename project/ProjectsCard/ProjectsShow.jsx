import "./ProjectsShow.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Projects from "/src/assets/projects.json";
import { FaHtml5, FaNodeJs, FaReact, FaTools } from "react-icons/fa";
import {
  SiFirebase,
  SiFlutter,
  SiKotlin,
  SiMongodb,
  SiPnpm,
  SiPrisma,
  SiSass,
  SiSqlite,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { ImCss3 } from "react-icons/im";
import { DiGit, DiJava, DiJavascript1 } from "react-icons/di";

const ProjectsShow = () => {
  const navigate = useNavigate();
  const { projectID } = useParams();
  const [cardInfo, setCardInfo] = useState(null);

  const logos = {
    NodeJS: <FaNodeJs />,
    MongoDB: <SiMongodb />,
    ExpressJS: <FaNodeJs />,
    ExpressJs: <FaNodeJs />,
    JS: <DiJavascript1 />,
    HTML: <FaHtml5 />,
    CSS: <ImCss3 />,
    Java: <DiJava />,
    Firebase: <SiFirebase />,
    SQLite: <SiSqlite />,
    Retrofit: <FaTools />,
    ReactJS: <FaReact />,
    TypeScript: <SiTypescript />,
    git: <DiGit />,
    pnpm: <SiPnpm />,
    Vite: <SiVite />,
    SCSS: <SiSass />,
    Flutter: <SiFlutter />,
    Prisma: <SiPrisma />,
    Kotlin: <SiKotlin />,
  };

  useEffect(() => {
    try {
      const projectIdInt = parseInt(projectID);
      if (!isNaN(projectIdInt) && projectIdInt >= 0 && projectIdInt < Projects.length) {
        const [info] = Projects.filter((e, i) => i === projectIdInt);
        if (info) {
          setCardInfo(info);
        } else {
          console.error("No such project exist");
          navigate("/projects");
        }
      } else {
        console.error("No such project exist");
        navigate("/projects");
      }
    } catch (err) {
      console.error(err);
    }
  }, [projectID, navigate]);

  // console.log(cardInfo)
  if (!cardInfo) {
    return null;
  }

  return (
    <>
      <div className="projectshow-container">
        <div className="projectsshow-project-title">
          <div className="project-name">
            <h3>{cardInfo.title}</h3>
            {cardInfo.link ? (
              <a
                href={cardInfo.link}
                className="project-status"
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
                className="project-status"
                style={{
                  backgroundColor: cardInfo.Status === "Live" ? "#4a90e2" : "#3CBA54",
                }}
              >
                {cardInfo.Status}
              </span>
            )}
          </div>
          <div className="project-image">
            <img src={cardInfo.logo} alt="logo" />
          </div>
        </div>
        <div className="projectshow-project-description">
          <h3>Description</h3>
          <p>{cardInfo.description}</p>
        </div>
        <div className="projectshow-techstack">
          <h4>Tech Stack</h4>
          <div className="projects-stacks">
            {cardInfo.techStack.map((tech) => {
              return (
                <div className="tech" key={tech}>
                  <div className="techlogo">{logos[tech]}</div>
                  <p>{tech}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="projects-show-bottom">
          <div className="mentors">
            <h4>Mentors</h4>
            <div className="mentor-list">
              {cardInfo.mentors.map((ment) => {
                return <ul key={ment}>{ment}</ul>;
              })}
            </div>
          </div>
          <div className="contributors">
            <h4>Contributors</h4>
            <div className="contributor-list">
              {cardInfo.contributors.map((cont) => {
                return <ul key={cont}>{cont}</ul>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsShow;
