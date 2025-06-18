import React from "react";
import "./MemberProfile.css";
import Card from "../Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MemberProfile = ({ name,img, skills, projects, technologies }) => {
  return (
    <div className="profileContainer">
      <div className="profileHeader">
        <h1>{name}</h1>
        <img className="card-img" src={img} alt="Foto de perfil de {name}"></img>
      </div>

      <div className="section">
        <h2>Habilidades Principales</h2>
        <ul className="skillList">
          {skills.map((skill, i) => (
            <li key={i} className="skillItem">
              {skill}
            </li>
          ))}
        </ul>
      </div>

 <div className="section">
  <h2>Proyectos Destacados</h2>
  <Swiper 
    modules={[Navigation]}
    slidesPerView={1}
    navigation={true}
    loop={true}
    className="projectCarousel"
  >
    {projects.map((project, i) => (
      <SwiperSlide key={i}>
        <Card
          title={project.title}
          description={project.description}
          image={project.img}
          className="projectCard"
        />
      </SwiperSlide>
    ))}
  
  </Swiper>
</div>


      <div className="section">
        <h2>Tecnologías</h2>
        <div className="techGrid">
          {technologies.map((tech, index) => (
            <div key={index} className="techItem">
              {tech.icon ? (
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="techIcon"
                  onError={(e) => {
                    e.target.src = "/placeholder-tech.png";
                  }}
                />
              ) : (
                <div className="techIconPlaceholder">
                  {tech.name.charAt(0)}
                </div>
              )}
              {/* <span className="techName">{tech.name}</span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;