# Fantasy Football AI Assistant

An AI-powered fantasy football management system that provides data-driven recommendations for roster management, lineup optimization, and waiver wire decisions.

## Project Structure

```
fantasy-football-assistant/
├── frontend/           # React web application
├── backend/            # FastAPI server with PostgreSQL
├── scraping/           # Web scraping scripts for player data
├── ai_agent/           # AI model integration and prompt management
├── data/               # Data storage and caching
└── docs/               # Documentation
```

## Features (Planned)

- **Roster Management**: Clean UI for managing your fantasy team
- **AI Recommendations**: Local AI model provides waiver wire and trade suggestions
- **Data Aggregation**: Scrapes multiple sources (ESPN, FantasyPros, NFL.com)
- **Lineup Optimization**: Weekly starting lineup recommendations
- **Real-time Updates**: Injury reports, weather, and news integration

## Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: FastAPI with PostgreSQL
- **Data**: Web scraping with requests + BeautifulSoup
- **AI**: Direct integration with local AI models
- **Database**: PostgreSQL for structured data storage

## Current Status

🚧 **In Development** - Setting up foundational architecture

## Getting Started

### Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your local configuration:
   - Set your AI model API details
   - Configure your PostgreSQL connection
   - Adjust any other local settings

**Note**: Never commit your `.env` file! It contains your personal API keys and local configuration.

### Frontend Development

```bash
cd frontend
npm install
npm start
```

### Backend Setup (Coming Soon)

```bash
cd backend
# Setup instructions will be added
```

## Development Roadmap

1. ✅ UI/UX Design and React Frontend
2. 🔄 **Current**: Roster persistence with PostgreSQL
3. ⏳ Web scraping pipeline
4. ⏳ AI agent integration
5. ⏳ Advanced features and optimization

## Contributing

This is a personal project, but feel free to fork and adapt for your own use!
