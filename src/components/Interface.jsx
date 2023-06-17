import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";

const Section = (props) => {
  const { children } = props;

  return <section>{children}</section>;
};

function Interface(props) {
  const { setSection } = props;

  return (
    <div className="wrapper">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
export default Interface;

const AboutSection = (props) => {
  const { setSection } = props;

  return (
    <Section>
      <h1>
        Hi, I'm
        <br />
        <span>Mateusz Melaniuk</span>
      </h1>
      <p>Front-end developer from Poland</p>
      <button onClick={() => setSection(3)}>Contact me</button>
    </Section>
  );
};

const SkillsSection = () => {
  return (
    <Section>
      <h2>Skills</h2>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Redux</li>
        <li>Git</li>
      </ul>
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
