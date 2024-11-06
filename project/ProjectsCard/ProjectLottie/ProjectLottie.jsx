import React from "react";
import Lottie from "react-lottie";
import "./ProjectLottie.scss";
import animationData from "./roadmap.json";

const ProjectLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div key="avatar_animation" className="animation">
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled={true}
        key="avatar_animation_data"
      />
    </div>
  );
};

export default ProjectLottie;
