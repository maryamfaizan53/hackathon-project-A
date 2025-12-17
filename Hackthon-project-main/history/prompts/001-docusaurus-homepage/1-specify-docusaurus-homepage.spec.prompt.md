---
id: 1
title: Specify Docusaurus Homepage
stage: spec
date: 2025-11-28
surface: agent
model: gemini-pro
feature: 1-docusaurus-homepage
branch: 1-docusaurus-homepage
user: Ahmed
command: /sp.specify
labels: [docusaurus, frontend, homepage]
links:
  spec: "specs/1-docusaurus-homepage/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "specs/1-docusaurus-homepage/spec.md"
  - "specs/1-docusaurus-homepage/checklists/requirements.md"
tests:
  - "none"
---

## Prompt

## Objective
Set up Docusaurus as the frontend framework and create a professional, visually appealing homepage for the Physical AI & Humanoid Robotics textbook with custom CSS styling.

## Prerequisites
- Node.js and npm installed
- Empty project directory ready

## Step 1: Install Docusaurus
```bash
npx create-docusaurus@latest frontend classic --typescript
cd frontend
npm install
```

## Step 2: Clean Up Default Content

### Remove Unnecessary Files
- Delete `src/components/HomepageFeatures/index.tsx` (we'll recreate it)
- Clear content from `src/pages/index.tsx` (we'll rewrite it)
- Remove all example docs from `docs/` folder
- Delete `blog/` folder if not needed

## Step 3: Update Homepage (src/pages/index.tsx)

Create a modern, engaging homepage that introduces the Physical AI & Humanoid Robotics course.

### Required Sections
1. **Hero Section** - Eye-catching title with course tagline
2. **Course Overview** - Brief description of Physical AI and embodied intelligence
3. **Four Main Modules** - Showcasing ROS 2, Gazebo/Unity, NVIDIA Isaac, VLA
4. **Learning Outcomes** - Key skills students will gain
5. **Why Physical AI Matters** - Importance and real-world applications
6. **Hardware Requirements** - Brief overview with links to detailed pages
7. **Call to Action** - Start learning button

### Design Requirements
- Modern, clean layout with smooth scrolling
- Gradient backgrounds for hero section
- Card-based layouts for modules
- Icons or emojis for visual enhancement
- Responsive design (mobile, tablet, desktop)
- Smooth hover effects on interactive elements
- Professional color scheme (blues, purples, teals for tech feel)

## Step 4: Create HomepageFeatures Component (src/components/HomepageFeatures/index.tsx)

### Purpose
Display the four main course modules in an attractive card layout.

### Module Cards Content
1. **Module 1: The Robotic Nervous System (ROS 2)**
   - Icon: 🤖
   - Description: Master middleware for robot control with ROS 2 nodes, topics, and services

2. **Module 2: The Digital Twin (Gazebo & Unity)**
   - Icon: 🎮
   - Description: Build physics simulations and high-fidelity virtual environments

3. **Module 3: The AI-Robot Brain (NVIDIA Isaac)**
   - Icon: 🧠
   - Description: Advanced perception, training, and sim-to-real transfer techniques

4. **Module 4: Vision-Language-Action (VLA)**
   - Icon: 🗣️
   - Description: Integrate voice commands and LLMs for cognitive robot planning

### Card Design Requirements
- Grid layout (2x2 on desktop, 1 column on mobile)
- Subtle shadow effects
- Border or card background with slight transparency
- Hover effects (lift, glow, or scale)
- Title, icon, and description for each module
- "Learn More" link to respective chapter

## Step 5: Custom CSS Styling (src/css/custom.css)

### Color Palette
Define CSS variables for consistent theming:
- **Primary Color**: Deep blue (#1e3a8a or similar)
- **Secondary Color**: Teal/Cyan (#06b6d4)
- **Accent Color**: Purple (#7c3aed)
- **Background**: Light gray or white (#f9fafb)
- **Text Color**: Dark gray (#1f2937)
- **Card Background**: White with subtle shadow

### Typography
- **Headings**: Bold, modern sans-serif font
- **Body Text**: Clean, readable font (16px base)
- **Code Blocks**: Monospace with syntax highlighting

### Layout Sections Styling

#### Hero Section
- Full viewport height (100vh) or near-full
- Gradient background (blue to purple or teal)
- White text for contrast
- Large heading (48-64px)
- Subtitle/tagline (18-24px)
- CTA button with hover effect

#### Features/Modules Section
- Centered container with max-width
- Grid layout with gap between cards
- Each card: padding, rounded corners, box-shadow
- Hover: transform translateY(-5px) and increased shadow

#### Learning Outcomes Section
- Two-column layout (bullet points)
- Icon bullets or checkmarks
- Light background color to differentiate from other sections

#### Why Physical AI Matters Section
- Full-width banner or highlighted box
- Quote-style design or emphasis box
- Different background color (light accent)

#### Hardware Requirements Section
- Quick overview grid or table
-- Icons for workstation, edge kit, robot
- "See Full Details" link to dedicated hardware page

### Responsive Design
- Desktop: Multi-column layouts, larger text
- Tablet: Adjust columns (2 columns instead of 3-4)
- Mobile: Single column, stacked sections, smaller text

### Animation and Effects
- Smooth scroll behavior
- Fade-in animations for sections on scroll (optional)
- Button hover effects (color change, scale)
- Card hover effects (shadow, lift)

## Step 6: Navigation and Footer

### Navbar Configuration (docusaurus.config.js)
- Logo: Textbook title or icon
- Links: Home, Docs (Chapters), Hardware, About
- Search bar (if plugin installed)
- GitHub repo link

### Footer
- Copyright notice
- Links: Panaversity, GitHub, Contact
- Social media icons (if applicable)

## Step 7: Additional Styling Polish

### Code Blocks
- Syntax highlighting theme (dark or light)
- Copy button for code snippets
- Line numbers for longer code

### Tables
- Bordered, striped rows for readability
- Responsive (horizontal scroll on mobile)

### Blockquotes
- Left border accent color
- Italic text or distinct background

### Images and Diagrams
- Centered with captions
- Responsive width (max 100%)
- Rounded corners or subtle shadow

## Visual Hierarchy Principles
- Use font sizes to establish hierarchy (h1 > h2 > h3 > body)
- Whitespace: generous padding/margin between sections
- Contrast: dark text on light backgrounds, light text on dark/gradient
- Consistency: reuse color palette, spacing values, font styles

## Expected Outcome
A polished, professional homepage that:
- Clearly introduces the Physical AI course
- Engages visitors with modern design
- Makes navigation intuitive
- Works seamlessly across all devices
- Sets the tone for a high-quality educational resource

## Testing Checklist
- [ ] Homepage loads without errors
- [ ] All sections display correctly
- [ ] Responsive on mobile, tablet, desktop
- [ ] Hover effects work smoothly
- [ ] Links navigate to correct pages
- [ ] No console errors or warnings
- [ ] CSS styles apply consistently

## Response snapshot

All steps are complete. The feature `1-docusaurus-homepage` has been specified.

**Branch:** `1-docusaurus-homepage`
**Spec File:** `specs/1-docusaurus-homepage/spec.md`
**Checklist:** `specs/1-docusaurus-homepage/checklists/requirements.md`

The specification is complete and validated. No clarifications are needed. The project is ready for the next phase: `/sp.plan`.

## Outcome

- ✅ Impact: Created a new feature specification, branch, and quality checklist.
- 🧪 Tests: No tests were run.
- 📁 Files: Created `specs/1-docusaurus-homepage/spec.md` and `specs/1-docusaurus-homepage/checklists/requirements.md`.
- 🔁 Next prompts: `/sp.plan`
- 🧠 Reflection: The process was smooth. The detailed user prompt allowed for a comprehensive specification without needing clarification. The script failure was a minor setback that was easily handled manually.

## Evaluation notes (flywheel)

- Failure modes observed: The `create-new-feature.ps1` script failed to handle the multiline feature description argument correctly.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Improve the argument parsing in the `create-new-feature.ps1` script.
