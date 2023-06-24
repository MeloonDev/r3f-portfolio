import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import { motion } from "framer-motion";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { BsGithub, BsLinkedin, BsTwitter, BsPinterest } from "react-icons/bs";

const Section = (props) => {
  const { children } = props;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      {children}
    </motion.section>
  );
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
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.5, delay: 1.3 }}
          viewport={{ once: true }}
        >
          <span>Mateusz</span>
          <br />
          <span>Melaniuk</span>
        </motion.h1>
        <motion.div
          className="line"
          initial={{ width: 0 }}
          whileInView={{
            width: "50px",
          }}
          transition={{ duration: 0.2, delay: 2.3 }}
          viewport={{ once: true }}
        ></motion.div>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.5, delay: 2.6 }}
          viewport={{ once: true }}
        >
          Front-end developer from Warsaw, Poland
        </motion.p>
        <motion.button
          onClick={() => setSection(3)}
          initial={{ scale: 0 }}
          whileInView={{
            scale: 1,
          }}
          transition={{ duration: 0.3, delay: 2.9 }}
          viewport={{ once: true }}
        >
          Contact me<span></span>
        </motion.button>
      </div>
    </Section>
  );
};

const skills = [
  { title: "HTML / CSS", level: 95 },
  { title: "JavaScript", level: 85 },
  { title: "React", level: 75 },
  { title: "TypeScript", level: 60 },
  { title: "Three.js / React Three Fiber", level: 55 },
  { title: "3D modelling", level: 45 },
  { title: "Photoshop / Drawing", level: 40 },
];

const SkillsSection = () => {
  return (
    <Section>
      <div className="skills">
        <h2>Skills</h2>
        {skills.map((skill, index) => (
          <div key={index} className="skill">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 + index * 0.2 }}
            >
              {skill.title}
            </motion.h3>
            <motion.div
              className="level"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 + index * 0.2 }}
            >
              <motion.div
                className="level-bar"
                style={{ width: `${skill.level}%` }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 + index * 0.2 }}
              ></motion.div>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="about">
        <h2>About me!</h2>
        <div className="about-fact">
          <motion.p
            className="icon"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            ✌️
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            At the age of 16, I had my first touch with programming, and I loved
            it!
          </motion.p>
        </div>
        <div className="about-fact">
          <motion.p
            className="icon"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 + 0.2 }}
          >
            ❤️
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 + 0.2 }}
          >
            I love watching esports tournaments and playing squash on weekends!
          </motion.p>
        </div>
        <div className="about-fact">
          <motion.p
            className="icon"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 + 0.4 }}
          >
            🚀
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 + 0.4 }}
          >
            Now I am looking for new challenges to work as a web developer!
          </motion.p>
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
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mdu5gbq",
        "template_pgt3qmq",
        form.current,
        "_uLanPuVnzmwx_kr4"
      )
      .then(
        (result) => {
          alert("Message sent!");
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <Section>
      <div className="contact">
        <h2>Contact me 👋</h2>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Name:" required />
          <input type="email" name="email" placeholder="Email:" required />
          <textarea name="message" placeholder="Message:" required />
          <div className="wrapper">
            <div className="socials">
              <a href="https://github.com/MeloonDev" target="_blank">
                <BsGithub />
              </a>
              <a href="https://github.com/MeloonDev" target="_blank">
                <BsLinkedin />
              </a>
              <a href="https://github.com/MeloonDev" target="_blank">
                <BsTwitter />
              </a>
              <a href="https://github.com/MeloonDev" target="_blank">
                <BsPinterest />
              </a>
            </div>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </Section>
  );
};
