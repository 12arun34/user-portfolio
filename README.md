# Arun Kumar - Portfolio Website

A dynamic and interactive portfolio website showcasing my skills, projects, and experience.this is arun-dev changes . THis is second changes.

## Features

- 🎨 **Dynamic Project Cards** - Expandable project details with "View More" functionality
- ⚡ **Animated Typing Effect** - Rotating text animation in hero section
- 📊 **Animated Skill Bars** - Progress bars showing proficiency levels
- 📱 **Responsive Design** - Mobile-friendly with smooth animations
- 🌙 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 📝 **Interactive Contact Form** - Real-time validation and feedback
- 🎯 **Scroll Animations** - Fade-in effects and active navigation
- 🖱️ **Interactive Effects** - 3D card tilt, custom cursor, hover animations

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS with animations and responsive design
- **Deployment**: Render.com

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open http://localhost:3000 in your browser

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
HOST=localhost
NODE_ENV=development
```

## Deployment on Render

This application is configured for deployment on Render.com with:

- Proper host binding (0.0.0.0)
- Health check endpoint at `/health`
- Increased timeout values for stability
- Graceful shutdown handling

### Render Configuration

- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 14.0.0 or higher

## Project Structure

```
user-portfolio/
├── public/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styles with animations
│   ├── script.js           # Interactive JavaScript
│   └── images/             # Static assets
├── routes/
│   └── contact.js          # Contact form API
├── utils/
│   └── db.js               # Database utilities
├── server.js               # Express server
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Contact

- **Email**: arunkumar.aesl@gmail.com
- **LinkedIn**: [Arun Kumar](https://www.linkedin.com/in/arun-kumar-38a91a230)
- **GitHub**: [12arun34](https://github.com/12arun34)

## License

MIT Licenses - feel free to use this template for your own portfolio!
