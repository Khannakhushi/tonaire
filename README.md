# 🌬️ Tonaire - Say it your way

**Your AI-powered tone stylist.** Rephrase sentences and generate stylish social posts in any vibe you want: professional, casual, funny, emotional, and more.

![Tonaire](https://img.shields.io/badge/Tonaire-AI%20Tone%20Stylist-purple?style=for-the-badge)

https://tonaire.khyaatikhanna.com/

## ✨ Features

- **🔄 Smart Rephrasing**: Transform any text into the perfect tone for any situation
- **📝 Social Post Generation**: Create engaging content for LinkedIn, Twitter, and Instagram
- **🎛️ Tone Variety**: Professional, funny, emotional, assertive, friendly, and more
- **🌗 Dark/Light Mode**: Beautiful themes that adapt to your preference
- **📋 Copy-to-Clipboard**: Instantly copy generated content
- **🎨 Beautiful UI**: Elegant design with smooth animations

## 🧱 Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS + Shadcn UI
- **AI**: Google Gemini Pro API
- **Backend**: Firebase (optional)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd tonaire
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Google Gemini API (Required for AI generation)
   GEMINI_API_KEY=your_gemini_api_key_here

   # Firebase (Optional - for future features)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Get your Gemini API key**

   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env.local` file

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Brand Identity

- **Name**: Tonaire (tone + air) — sleek, French-inspired, soft power
- **Colors**: Smoky rose, muted gold, dark plum, creamy white
- **Typography**: Cormorant Garamond (headings) + Inter (body)
- **Vibe**: Confident, empowering, sexy, and smooth — like perfume, but for words

## 💡 Usage Examples

### Rephrasing

**Input**: "Just checking on that thing..."
**Output (Professional)**: "I would like to follow up on our previous discussion regarding the project timeline."

### LinkedIn Post

**Input**: "Got an internship at Meta!"
**Output (Empowering)**:

> Every rejection is a redirection. Every setback is a setup for a comeback. Today I'm excited to share that I've landed my dream internship at Meta! 🚀
>
> To everyone still grinding - your breakthrough is coming. Keep pushing. 💪
>
> #MetaIntern #NeverGiveUp #TechJourney #Grateful

### Twitter Post

**Input**: "I passed my coding interview!"
**Output (Funny)**: "My ancestors didn't survive ice ages for me to fail a coding interview 😤💻✅"

### Instagram Caption

**Input**: "First day of internship!"
**Output (Aesthetic)**: "laptop open. dreams loading. ✨💻🤍"

## 🛠️ Development

### Adding New Components

Use Shadcn CLI to add new components:

```bash
npx shadcn@latest add [component-name]
```

### Project Structure

```
tonaire/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── ThemeProvider.tsx # Theme context
│   └── ThemeToggle.tsx   # Dark/light mode toggle
└── lib/                  # Utilities
    ├── firebase.ts       # Firebase config
    └── gemini.ts        # Gemini AI config
```

## 🌟 Future Features

- Chrome extension for rephrasing anywhere
- Gmail + LinkedIn integration
- Custom tone trainer (learn your personal style)
- Analytics dashboard for social posts
- Multi-language support

## 📄 License

This project is licensed under the MIT License.

## 💝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Tonaire** - _Because every word deserves the perfect vibe._ ✨
