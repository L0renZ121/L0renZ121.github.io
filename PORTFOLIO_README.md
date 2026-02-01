# 🎨 Modern Portfolio Website

A stunning, modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion animations.

## ✨ Features

- **Modern Design**: Glassmorphism UI with beautiful gradients
- **Smooth Animations**: Framer Motion animations throughout
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Eye-friendly dark mode as default
- **Particle Effects**: Animated background with particle network
- **Interactive Components**: Hover effects, scroll animations, and more
- **Fast Performance**: Optimized Next.js static site
- **Custom Domain**: Configured for abhi88.com.np

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React & React Icons
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
components/
├── Navigation.tsx           # Fixed navbar with scroll effects
├── ParticleBackground.tsx   # Canvas particle animation
└── sections/
    ├── Hero.tsx            # Landing section with CTAs
    ├── About.tsx           # About section with feature cards
    ├── Skills.tsx          # Skills with animated progress bars
    ├── Projects.tsx        # Featured projects showcase
    ├── Experience.tsx      # Work experience timeline
    └── Contact.tsx         # Contact form and social links

app/
├── layout.tsx              # Root layout
├── page.tsx                # Main page composition
└── globals.css             # Global styles and animations
```

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
```

## 📦 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions whenever you push to the `main` branch.

### Custom Domain Setup

The domain `abhi88.com.np` is configured in the GitHub Actions workflow. To update it:

1. Modify `CNAME` file in the workflow
2. Update DNS records to point to GitHub Pages
3. Enable custom domain in GitHub repository settings

### Manual Deployment

If needed, you can manually deploy:
```bash
npm run deploy
```

## 🎨 Customization

### Colors
Edit Tailwind config in `tailwind.config.ts` to change the color scheme.

### Content
- **Hero**: Edit `components/sections/Hero.tsx`
- **About**: Edit `components/sections/About.tsx`
- **Skills**: Update the `skills` array in `components/sections/Skills.tsx`
- **Projects**: Update the `projects` array in `components/sections/Projects.tsx`
- **Experience**: Update the `experiences` array in `components/sections/Experience.tsx`
- **Contact**: Edit form handling and social links in `components/sections/Contact.tsx`

### Animations
Custom animations are defined in `app/globals.css`. Adjust animation speeds and effects there.

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

## 🔒 Performance

- Static site generation for optimal performance
- Image optimization disabled for GitHub Pages compatibility
- Minified CSS and JavaScript
- Fast First Contentful Paint

## 📝 License

This project is open source and available for personal use.

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/AA-maker-dev) | [LinkedIn](https://linkedin.com)

---

**Built with ❤️ using Next.js and Tailwind CSS**
