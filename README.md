# Portfolio Template

A full-stack portfolio template built with the MERN stack — works for developers, designers, writers, or anyone who needs a professional online presence.

**[Live Demo →](https://www.yachna.cv/)**

![Preview](https://github.com/user-attachments/assets/0efc7e73-f2f7-4dd2-97bf-7e54169f148e)

---

## Features

- Light / dark mode
- Cmd+K command palette with keyboard shortcuts
- Admin panel — update skills, projects, certifications, and "currently" bar without touching code
- Contact form via Resend (free tier)
- Sound effects (optional, togglable)
- Rate limiting on contact form and admin login
- MongoDB fallbacks — site works even if DB is unreachable

## Tech Stack

React · Vite · Tailwind CSS · Framer Motion · Node.js · Express · MongoDB · Resend · JWT

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- MongoDB (local or [Atlas free tier](https://www.mongodb.com/cloud/atlas))
- [Resend](https://resend.com) account (free, for contact form emails)

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/portfolio-template.git

cd portfolio-template/client && npm install
cd ../server && npm install
```

### 2. Set up environment variables

```bash
# in /client
cp .env.example .env

# in /server
cp .env.example .env
```

Fill in your values. The `.env.example` files in each folder list every variable you need.

> **Generate a JWT secret:**
>
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 3. Run locally

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

Visit `http://localhost:5173`

---

## Customization

Every component has `// CUSTOMIZE:` comments pointing to the exact lines to change — just open the file and follow them.

**Things that aren't obvious from the comments:**

**Skill categories must match in 3 places**
If they don't, skills silently won't show up.

- `client/src/components/Skills.jsx` → `categories` array
- `client/src/pages/admin/AdminSkills.jsx` → `categories` array
- `server/models/Skill.js` → `enum` array

**Admin route — change in 3 files**
Replace `/your-admin-route` everywhere:

- `client/src/App.jsx`
- `client/src/pages/admin/AdminLogin.jsx`
- `client/src/pages/admin/AdminDashboard.jsx`

**Contact form email recipient**
In `server/controllers/contactController.js`, replace `YOUR_EMAIL_ADDRESS` with where you want form submissions delivered.

**Resume**
Drop your resume as `client/public/resume.pdf`. Hero, About, and the command palette all link to it.

**Seed the database (optional)**
Edit `server/seed.js` with your skills and projects, then run it once:

```bash
cd server && node seed.js
```

⚠️ This clears existing data. Only run on a fresh database. After that, use the admin panel.

---

## Project Structure

```
portfolio-template/
├── client/
│   ├── public/             # Favicons, images, resume.pdf, videos/
│   └── src/
│       ├── components/     # Hero, About, Skills, Projects,
│       │                   # Education, Contact, Navbar, Footer,
│       │                   # ProofBar, CommandPalette
│       ├── context/        # ThemeContext
│       ├── hooks/          # useTheme, useSound
│       ├── pages/admin/    # AdminLogin, AdminDashboard,
│       │                   # AdminSkills, AdminProjects,
│       │                   # AdminCertifications, AdminAbout
│       └── utils/          # api.js, adminApi.js
└── server/
    ├── config/             # db.js
    ├── controllers/        # admin, skill, project,
    │                       # certification, contact
    ├── data/               # currently.json (auto-created)
    ├── middleware/         # verifyToken, rateLimiter
    ├── models/             # Skill, Project, Certification, Message
    ├── routes/             # public.js, admin.js
    ├── seed.js
    └── index.js
```

---

## Deploy

**Frontend → [Vercel](https://vercel.com)** (free)

1. Import repo → set root directory to `client`
2. Add env variable: `VITE_API_URL` = your backend URL
3. Deploy

**Backend → [Render](https://render.com)** (free tier)

1. New Web Service → connect repo → set root to `server`
2. Build command: `npm install` · Start command: `npm start`
3. Add all server env variables
4. Set `CLIENT_URL` to your Vercel frontend URL

> After both are live, update `VITE_API_URL` in Vercel and `CLIENT_URL` in Render with the final deployed URLs.

---

## License

[MIT](./LICENSE) — use it, change it, ship it.
