import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import { motion } from "framer-motion";

const Section = (props) => {
  const { children } = props;

  return <section>{children}</section>;
};

function Interface(props) {
  const { setSection } = props;

  return (
    <div className="wrapper">
      <HomeSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
export default Interface;

const HomeSection = (props) => {
  const { setSection } = props;

  return (
    <Section>
      <div className="home">
        <h3>Hi, I'm</h3>
        <h1>
          <span>Mateusz</span>
          <br />
          <span>Melaniuk</span>
        </h1>
        <div className="line"></div>
        <p>Front-end developer from Warsaw, Poland</p>
        <motion.button
          onClick={() => setSection(3)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Contact me<span></span>
        </motion.button>
      </div>
    </Section>
  );
};

const skills = [
  {
    title: "HTML",
    level: 5,
  },
  { title: "CSS", level: 25 },
  { title: "Sass", level: 55 },
  { title: "JavaScript", level: 45 },
  { title: "TypeScript", level: 5 },
  { title: "React", level: 5 },
  { title: "Redux", level: 5 },
  { title: "Three.js", level: 5 },
  { title: "Git", level: 5 },
];

const SkillsSection = () => {
  return (
    <Section>
      <div className="skills">
        <h2>Skills</h2>
        {skills.map((skill, index) => (
          <div key={index} className="skill">
            <h3>{skill.title}</h3>
            <div className="level">
              <div
                className="level-bar"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="about">
        <h2>About</h2>
        <div className="about-fact">
          <p className="icon">✌️</p>
          <p>
            At the age of 16, I had my first touch with programming, and I loved
            it!
          </p>
        </div>
        <div className="about-fact">
          <p className="icon">❤️</p>
          <p>
            I love watching esports tournaments and playing squash on weekends!
          </p>
        </div>
        <div className="about-fact">
          <p className="icon">🚀</p>
          <p>Now I am looking for new challenges to work as a web developer!</p>
        </div>
      </div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="projects">
        <button onClick={previousProject}>← Previous</button>
        <h2>Projects</h2>
        <button onClick={nextProject}>Next →</button>
      </div>
    </Section>
  );
};

const ContactSection = () => {
  return (
    <Section>
      <h2>Contact</h2>
    </Section>
  );
};
