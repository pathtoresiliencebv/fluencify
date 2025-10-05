# 🚀 Fluencify - AI Product Image Generator

Een krachtige SaaS applicatie voor het genereren van product afbeeldingen, video's en avatars met behulp van AI technologie.

## ✨ Features

- **🎨 AI Product Image Generation** - Genereer professionele product afbeeldingen
- **🎬 Product Video Creation** - Maak aantrekkelijke product video's
- **👤 Product Avatar Generator** - Creëer unieke product avatars
- **🔐 Firebase Authentication** - Veilige gebruikersbeheer
- **💳 Credits System** - Gebruikers credits systeem
- **☁️ Cloud Storage** - ImageKit integratie voor bestandsopslag
- **📱 Responsive Design** - Werkt op alle apparaten

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL met Drizzle ORM
- **Authentication**: Firebase Auth
- **AI Services**: OpenAI, Replicate
- **Storage**: ImageKit
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn (aanbevolen) of npm
- Firebase project
- Neon database
- OpenAI API key
- Replicate API token
- ImageKit account

### Installation

1. **Clone de repository**
```bash
git clone https://github.com/pathtoresiliencebv/fluencify.git
cd fluencify
```

2. **Installeer dependencies**
```bash
yarn install
# of
npm install
```

3. **Configureer omgevingsvariabelen**
Maak een `.env.local` bestand met de volgende variabelen:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MESURMENT_ID=your_measurement_id

# Database
NEXT_PUBLIC_NEON_DB_CONNECTION_STRING=postgresql://username:password@host/database

# AI Services
OPENAI_KEY=your_openai_api_key
REPLICATE_API_TOKEN=your_replicate_token

# Image Storage
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_URL=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

4. **Database setup**
```bash
npx drizzle-kit push
```

5. **Start development server**
```bash
yarn dev
# of
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 📁 Project Structure

```
fluencify/
├── app/                    # Next.js app directory
│   ├── (routes)/          # Route groups
│   │   ├── app/           # Main app pages
│   │   ├── creative-ai-tools/  # AI tools pages
│   │   └── my-ads/        # User ads management
│   ├── api/               # API routes
│   └── _components/       # Shared components
├── components/            # Reusable UI components
├── configs/              # Configuration files
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
└── public/               # Static assets
```

## 🚀 Deployment

De applicatie is geoptimaliseerd voor deployment op Vercel:

1. **Push naar GitHub** (al gedaan)
2. **Connect met Vercel**
3. **Configureer omgevingsvariabelen** in Vercel dashboard
4. **Deploy automatisch**

## 🤝 Contributing

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 License

Dit project is gelicenseerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

## 🔗 Links

- **Live Demo**: [https://fluencify.vercel.app](https://fluencify.vercel.app)
- **GitHub Repository**: [https://github.com/pathtoresiliencebv/fluencify](https://github.com/pathtoresiliencebv/fluencify)

## 📞 Support

Voor vragen of ondersteuning, open een issue in de GitHub repository.

---

Gemaakt met ❤️ door Path to Resilience BV
