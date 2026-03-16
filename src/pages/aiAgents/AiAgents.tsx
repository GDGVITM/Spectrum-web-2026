import EventLayout from "../components/eventLayout/EventLayout";
import AgentBackground from "./AgentBackground";

export default function AiAgents() {
  return (
    <>
      <AgentBackground />
      <EventLayout
        day="DAY 2"
        date="2nd April 2026"
        title="THE AGE OF AI AGENTS"
        tagline="Exploring the frontier of autonomous AI systems."
        type="SPEAKER SESSION"
        accent="#00f2ff"
        overview="Step into the world of autonomous AI — from intelligent assistants to self-governing agents that reason, plan, and execute. This speaker session brings together insights on the latest breakthroughs in AI agent architectures, multi-agent systems, and the future of human-AI collaboration. Whether you're a beginner curious about the AI revolution or a seasoned developer building the next generation of intelligent systems, this session is your gateway to understanding what's next."
        registrationLink="https://forms.gle/Hx1MNjPGbLBG5CR28"
        registrationLabel="RSVP Speaker Session"
        transparentBackground={true}
        eligibility={[
          "Open to all students and attendees — no registration required.",
          "No prior AI/ML experience needed.",
        ]}
      />
    </>
  );
}
