# Document Types for Each Mode

## 1. Default/General Mode
- **Types of Content:**
  - Malaysian current events and news
  - Local customs and traditions
  - Public services information
  - Malaysian geography and places
  - Local food and cuisine
  - Public transportation
  - Common Malaysian phrases
- **Metadata Structure:**
  ```json
  {
    "category": ["news", "culture", "services", "geography", "food"],
    "language": ["en", "ms", "zh", "ta"],
    "region": "state_name",
    "relevance": "timestamp"
  }
  ```

## 2. Creative Mode
- **Types of Content:**
  - Malaysian art forms and styles
  - Local storytelling traditions
  - Pantun and poetry formats
  - Malaysian music and dance
  - Local crafts and techniques
  - Festival decorations
  - Creative writing prompts
- **Metadata Structure:**
  ```json
  {
    "artForm": ["visual", "literary", "performing", "digital"],
    "culturalOrigin": ["malay", "chinese", "indian", "indigenous"],
    "difficulty": ["beginner", "intermediate", "advanced"],
    "materials": ["list_of_materials"]
  }
  ```

## 3. Tutor Mode
- **Types of Content:**
  - Study techniques
  - Exam preparation strategies
  - Subject summaries
  - Practice questions
  - Learning methodologies
  - Memory techniques
  - Time management tips
- **Metadata Structure:**
  ```json
  {
    "subject": "subject_name",
    "level": ["primary", "secondary", "tertiary"],
    "examType": ["upsr", "pt3", "spm", "stpm", "general"],
    "language": ["en", "ms", "zh", "ta"]
  }
  ```

## 4. Coder Mode
- **Types of Content:**
  - Programming tutorials
  - Local tech industry insights
  - Malaysian tech startups
  - Coding best practices
  - Project examples
  - Common programming problems
  - Local developer resources
- **Metadata Structure:**
  ```json
  {
    "language": ["python", "javascript", "java", "etc"],
    "level": ["beginner", "intermediate", "advanced"],
    "topic": ["web", "mobile", "data", "ai"],
    "industry": "relevant_industry"
  }
  ```

## 5. Writer Mode
- **Types of Content:**
  - Writing guidelines
  - Multilingual writing tips
  - Local content creation
  - Blog writing
  - Business writing
  - Academic writing
  - Translation tips
- **Metadata Structure:**
  ```json
  {
    "writeType": ["academic", "creative", "business", "technical"],
    "language": ["en", "ms", "zh", "ta"],
    "audience": ["student", "professional", "general"],
    "format": ["essay", "report", "article", "blog"]
  }
  ```

## 6. Analyst Mode
- **Types of Content:**
  - Malaysian market analysis
  - Local business trends
  - Economic data
  - Industry reports
  - Data visualization
  - Statistical methods
  - Research methodologies
- **Metadata Structure:**
  ```json
  {
    "industry": "industry_name",
    "dataType": ["market", "financial", "social", "economic"],
    "timeframe": "analysis_period",
    "region": "geographic_scope"
  }
  ```

## 7. Gamer Mode
- **Types of Content:**
  - Malaysian gaming scene
  - Local esports events
  - Game strategies
  - Gaming communities
  - Stream setup guides
  - Tournament information
  - Gaming careers
- **Metadata Structure:**
  ```json
  {
    "gameType": ["esports", "mobile", "console", "pc"],
    "genre": ["moba", "fps", "rpg", "etc"],
    "level": ["casual", "competitive", "professional"],
    "platform": ["platform_name"]
  }
  ```

## 8. Designer Mode
- **Types of Content:**
  - Malaysian design trends
  - Local architecture styles
  - Interior design tips
  - Traditional patterns
  - Color theory
  - Design principles
  - Local design tools
- **Metadata Structure:**
  ```json
  {
    "designType": ["graphic", "interior", "architectural", "web"],
    "style": ["modern", "traditional", "fusion"],
    "application": ["residential", "commercial", "digital"],
    "culturalElement": ["cultural_reference"]
  }
  ```

## 9. Education Mode
- **Types of Content:**
  - Malaysian education system
  - Study materials
  - Learning resources
  - Educational institutions
  - Course information
  - Career guidance
  - Scholarship info
- **Metadata Structure:**
  ```json
  {
    "educationLevel": ["primary", "secondary", "tertiary"],
    "stream": ["science", "arts", "technical", "vocational"],
    "institution": "institution_type",
    "qualification": "qualification_type"
  }
  ```

## Document Quality Guidelines
1. Content should be:
   - Accurate and verified
   - Updated regularly
   - Culturally appropriate
   - Multilingual when possible
   - Locally relevant

2. Each document should have:
   - Unique ID
   - Clear title
   - Main content
   - Complete metadata
   - Last updated date
   - Source reference (if applicable)

3. Content length:
   - Minimum: 100 words
   - Maximum: 1000 words
   - Optimal: 250-500 words
