# ⚡ Prompt Forge

<div align="center">

**The Intelligent System Prompt Engineer for AI Developers**

Generate highly optimized, model-specific system prompts for 28+ LLMs — entirely in your browser.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white&style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

[Features](#-features) • [Quick Start](#-quick-start) • [Supported Models](#-supported-models) • [Contributing](#-contributing)

</div>

---

## 🚀 Why Prompt Forge?

Crafting effective system prompts is time-consuming and requires deep knowledge of each LLM's specific tokenization, quirks, and instruction-following capabilities. 

**Prompt Forge** solves this by automatically generating optimized prompts tailored to your specific model, use case, and language — **all without sending your data to a server.**

- ⏱️ **Save Time:** Stop tweaking prompts manually. Get production-ready instructions in seconds.
- 🧠 **Model-Aware:** Uses specific syntax and instruction patterns for GPT-4, Claude 3.5, Llama 3, and more.
- 🔒 **Privacy First:** Zero data collection. 100% client-side processing.
- 🌍 **Multilingual:** Native support for English, Italian, French, and German.

---

## ✨ Features

### 🎯 Model-Specific Optimization
Each of the **28+ supported models** has a unique instruction strategy. We don't just copy-paste; we optimize syntax to leverage specific model architecture strengths.

### 🛠️ Four Powerful Use Cases
| Use Case | Description |
|----------|-------------|
| **👨‍💻 Coding Assistant** | Generate prompts for specific languages, frameworks, and expertise levels. |
| **✍️ Content Writing** | Craft prompts for blogs, emails, and copy with precise tone and audience targeting. |
| **📊 Data Analysis** | Build analytical prompts for SWOT analysis, strategic insights, and reporting. |
| **🎭 Persona/Roleplay** | Create consistent, character-driven prompts for simulations and scenarios. |

### ⚡ Pre-Built Templates
Jump-start your workflow with production-ready templates:
*   React Component Generator
*   Python API Builder
*   Cold Email Specialist
*   Tech Interview Simulator

### 🎨 Developer Experience
*   **Dark/Light Mode:** System preference detection with a beautiful UI.
*   **Persistent State:** Your settings, themes, and draft prompts are saved locally.
*   **Responsive:** Fully optimized for desktop and mobile workflows.

---

## 🤖 Supported Models

Prompt Forge supports **28 models** across **9 providers**, including the latest bleeding-edge releases:

| Provider | Models |
|----------|--------|
| **OpenAI** | GPT-4o, GPT-4.1, GPT-4.5 (Orion), GPT-5, o3-mini |
| **Anthropic** | Claude 3.5 Sonnet, Claude 3 Opus, Claude 4 (Opus/Sonnet) |
| **Google** | Gemini 1.5 Pro, Gemini 2.5 Pro, Gemini 3 Pro |
| **Meta** | Llama 3 (70B), Llama 3.3, Llama 4 (Scout/Behemoth) |
| **xAI** | Grok 1.5, Grok 3, Grok 4 |
| **DeepSeek** | DeepSeek 3.1, DeepSeek R1 |
| **Mistral** | Mistral Large, Mistral Medium 3 |
| **Qwen** | Qwen 2.5 72B, Qwen 3 |

---

## ⚡ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lorenzofornara/PromptForge.git
   cd PromptForge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Support

**Development:**
```bash
docker-compose -f docker-compose-dev.yml up
# Access at http://localhost:3072
```

**Production:**
```bash
docker-compose -f docker-compose.yml up
```

---

## 📂 Project Structure

```
PromptForge/
├── public/              # Static assets
├── src/
│   ├── components/      # React UI components
│   ├── hooks/           # Custom React hooks (persistence, theme)
│   ├── services/        # Prompt generation logic & Model configs
│   ├── translations/    # i18n files (EN, IT, FR, DE)
│   ├── types/           # TypeScript definitions
│   ├── App.tsx          # Main application entry
│   └── main.tsx         # DOM rendering
├── docker-compose.yml   # Production Docker config
└── package.json         # Project dependencies
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ by [Lorenzo Fornara](https://github.com/lorenzofornara)

</div>