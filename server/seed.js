// ⚠️  WARNING: Running this script will DELETE all existing skills
// and projects from MongoDB and replace them with the data below.
// Only run this once on a fresh database, or when you want to reset.
//
// Run with: node seed.js
// Make sure MONGO_URI is set in your .env file first.

require("dotenv").config();
const mongoose = require("mongoose");
const Skill = require("./models/Skill");
const Project = require("./models/Project");

// CUSTOMIZE: Your skills seed data.
// Run this once to populate MongoDB with your initial skills.
// After that, manage skills from the admin panel.
//
// icon field — two options:
// ─ Devicon class → 'devicon-react-original colored'
//   Browse icons at: https://devicon.dev
// ─ Short text    → 'AWS', 'SQL' (when devicon doesn't have it)
//
// category must match the enum in Skill.js model exactly.

const skills = [
  {
    name: "Skill Name",
    icon: "devicon-YOUR_ICON-plain colored",
    category: "CATEGORY_1",
  },
  {
    name: "Skill Name",
    icon: "YOUR_SHORT_TEXT",
    category: "CATEGORY_2",
  },
  // Add as many skills as needed.
  // Copy from fallbackSkills in Skills.jsx — they should match.
];

// CUSTOMIZE: Your projects seed data.
// Run this once to populate MongoDB with your initial projects.
// After that, manage projects from the admin panel.
//
// Should match fallbackProjects in Projects.jsx —
// copy that array here so the UI and DB stay consistent.
//
// featured: true  → shows as the large featured card (only one)
// featured: false → shows in the grid below
// liveUrl: ''     → hides Live button
// githubUrl: ''   → hides GitHub button
// video: ''       → falls back to image

const projects = [
  {
    title: "PROJECT TITLE",
    description: "Project Description",
    techStack: ["Tech 1", "Tech 2"],
    liveUrl: "YOUR_LIVE_URL",
    githubUrl: "YOUR_GITHUB_URL",
    image: "/your-thumb.png",
    video: "/videos/your-video.mp4",
    featured: true,
    order: 0,
  },
  {
    title: "PROJECT TITLE",
    description: "Project Description",
    techStack: ["Tech 1", "Tech 2"],
    liveUrl: "YOUR_LIVE_URL",
    githubUrl: "YOUR_GITHUB_URL",
    image: "/your-thumb.png",
    video: "",
    featured: false,
    order: 1,
  },
  // Add more projects or delete down to 1 if needed.
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  await Skill.deleteMany({});
  await Project.deleteMany({});
  console.log("Cleared existing data");

  await Skill.insertMany(skills);
  console.log(`Seeded ${skills.length} skills`);

  await Project.insertMany(projects);
  console.log(`Seeded ${projects.length} projects`);

  await mongoose.disconnect();
  console.log("Done");
};

seed().catch(console.error);
