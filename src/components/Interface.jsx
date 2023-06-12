const Section = (props) => {
  const { children } = props;

  return <section>{children}</section>;
};

function Interface() {
  return (
    <div className="wrapper">
      <AboutSection />
      <SkillsSection />
      <Section>
        <h1>Projects</h1>
      </Section>
      <ContactSection />
    </div>
  );
}
export default Interface;

const AboutSection = () => {
  return (
    <Section>
      <h1>
        Hi, I'm
        <br />
        <span>Mateusz Melaniuk</span>
      </h1>
      <p>Front-end developer from Poland</p>
      <button>Contact me</button>
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

const ContactSection = () => {
  return (
    <Section>
      <h2>Contact</h2>
    </Section>
  );
};
