import WelcomeSector from "./sectors/WelcomeSector";
import PortfolioSector from "./sectors/PortfolioSector";
import ExperienceSector from "./sectors/ExperienceSector";
import CompetencySector from "./sectors/CompetencySector";
import PersonalSector from "./sectors/PersonalSector";
import ResumeSector from "./sectors/ResumeSector";
import ContactSector from "./sectors/ContactSector";

const Home = () => {
  return (
    <div>

      <div className="sector" id="welcomeSector"><WelcomeSector/></div>
      <div className="sector" id="portfolioSector" style={{"backgroundColor": "rgba(255, 0, 127,0.2)", "justifyContent": "center"}}><PortfolioSector/></div>
      <div className="sector" id="experienceSector" style={{"backgroundColor": "rgba(0, 0, 127,0.2)", "justifyContent": "center"}}><ExperienceSector/></div>
      <div className="sector" id="competencySector" style={{"backgroundColor": "rgba(255, 0, 127,0.2)", "justifyContent": "center"}}><CompetencySector/></div>
      <div className="sector" id="personalSector" style={{"backgroundColor": "rgba(0, 0, 127,0.2)", "justifyContent": "center"}}><PersonalSector/></div>
      <div className="sector" id="resumeSector" style={{"backgroundColor": "rgba(255, 0, 127,0.2)", "justifyContent": "center"}}><ResumeSector/></div>
      <div className="sector" id="contactSector" style={{"backgroundColor": "rgba(0, 0, 127,0.2)", "justifyContent": "center"}}><ContactSector/></div>

    </div>
  );
};

export default Home;