# Technical Documentation: Medical Diagnostic AI System

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Architecture & Design Solution](#architecture--design-solution)
4. [Creativity in Design](#creativity-in-design)
5. [Scalability](#scalability)
6. [System Components](#system-components)
7. [Frontend Implementation](#frontend-implementation)
8. [Workflow & Process](#workflow--process)
9. [Configuration Management](#configuration-management)
10. [API Design](#api-design)
11. [Future Enhancements](#future-enhancements)

---

## Overview

This system is an intelligent medical diagnostic platform that leverages multi-agent AI technology to simulate a comprehensive hospital consultation workflow. The system combines the power of Large Language Models (LLMs) with a sophisticated agent orchestration framework to provide triage, specialist diagnosis, and peer review capabilities across multiple medical specialties.

The platform is designed to handle patient complaints, route them to appropriate medical specialists, generate evidence-based diagnoses, and ensure quality through collaborative peer review processes—all while maintaining the structure and rigor of real-world medical practice.

---

## Tech Stack

### Core Framework & Language
- **Python 3.10-3.14**: Modern Python with type hints and async capabilities
- **CrewAI 1.4.1**: Multi-agent orchestration framework that enables collaborative AI agents to work together on complex tasks
- **FastAPI 0.104.0+**: Modern, high-performance web framework for building REST APIs with automatic OpenAPI documentation
- **Uvicorn**: ASGI server for running FastAPI applications with support for async operations

### AI & Machine Learning
- **LiteLLM 1.0.0+**: Unified interface for multiple LLM providers, enabling easy model switching and abstraction
- **Groq/LLaMA 3.3 70B Versatile**: High-performance LLM optimized for inference speed, providing the reasoning capabilities for medical agents
- **Temperature 0.3**: Low temperature setting ensures consistent, deterministic outputs suitable for medical diagnostics

### Data & Configuration
- **Pydantic**: Data validation and settings management using Python type annotations
- **YAML**: Human-readable configuration format for agents and tasks, enabling non-programmers to modify system behavior
- **Python Multipart**: Support for file uploads and form data in API requests

### Frontend Framework & Technologies
- **Next.js 16.0.3**: React-based framework with server-side rendering, API routes, and optimized performance
- **React 19.2.0**: Modern React with concurrent features and improved rendering
- **TypeScript 5**: Type-safe development with enhanced developer experience
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development
- **Framer Motion 12.23.24**: Animation library for smooth, performant UI transitions
- **Lucide React**: Comprehensive icon library for consistent visual design
- **Recharts 3.4.1**: Charting library for data visualization and analytics

### Development & Deployment
- **UV Package Manager**: Fast, modern Python package manager and project manager (replacement for pip/poetry)
- **Hatchling**: Modern Python build backend for packaging
- **npm/Node.js**: Frontend package management and build tooling
- **Git**: Version control for collaborative development

### Architecture Patterns
- **Service Layer Pattern**: Separation of business logic from API endpoints
- **Configuration-Driven Design**: Agents and tasks defined declaratively in YAML
- **Decorator Pattern**: CrewAI's `@agent`, `@task`, and `@crew` decorators for clean code organization
- **Dependency Injection**: LLM and tool configuration injected into agents
- **Component-Based Architecture**: Modular React components for reusable UI elements
- **Custom Hooks Pattern**: Reusable logic extraction (e.g., `useWebSocket` hook)

---

## Architecture & Design Solution

### System Architecture

The system follows a **multi-layered, agent-based architecture** that mirrors real-world medical workflows:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Frontend Layer (Next.js/React)                    │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│  │  Dashboard UI    │  │  Landing Page    │  │  Question Dialog  │ │
│  │  - Query Input   │  │  - Hero Section  │  │  - Interactive    │ │
│  │  - Results View  │  │  - Features      │  │    Consultation   │ │
│  │  - Analytics     │  │  - How It Works  │  │  - WebSocket      │ │
│  │  - History       │  │  - Pricing       │  │    Integration    │ │
│  └────────┬─────────┘  └──────────────────┘  └────────┬─────────┘ │
│           │                                              │            │
│           └──────────────┬──────────────────────────────┘            │
│                          │                                           │
│           ┌──────────────▼──────────────┐                           │
│           │   Next.js API Routes        │                           │
│           │   /api/process-query        │                           │
│           └──────────────┬──────────────┘                           │
└──────────────────────────┼──────────────────────────────────────────┘
                            │
                            │ HTTP/REST + WebSocket
                            │
┌───────────────────────────┼──────────────────────────────────────────┐
│                    Backend API Layer (FastAPI)                       │
│  ┌──────────────┐              ┌──────────────┐                    │
│  │   FastAPI    │              │  WebSocket   │                    │
│  │   REST API   │              │   Server     │                    │
│  │  /process-   │              │  /ws/{id}    │                    │
│  │   query      │              │              │                    │
│  └──────┬───────┘              └──────┬───────┘                    │
└─────────┼──────────────────────────────┼────────────────────────────┘
          │                              │
          └──────────────┬───────────────┘
                         │
┌────────────────────────┼────────────────────────────────────┐
│                    Service Layer                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  run_medical_diagnostic_workflow()                    │   │
│  │  - Orchestrates triage → specialist → peer review   │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┼────────────────────────────────────┘
                         │
┌────────────────────────┼────────────────────────────────────┐
│                    Agent Layer (CrewAI)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Triage     │  │  Specialist  │  │ Peer Review  │     │
│  │   Agent      │→ │   Agents     │→ │   Agents     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Custom Tools: human_input, consult_colleague        │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┼────────────────────────────────────┘
                         │
┌────────────────────────┼────────────────────────────────────┐
│                    LLM Layer                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Groq/LLaMA 3.3 70B (via LiteLLM)                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Separation of Concerns**: Each layer has a distinct responsibility
   - Frontend: User interface, visualization, and user interaction
   - Presentation: API endpoints and WebSocket communication
   - Service: Business logic and workflow orchestration
   - Agent: Domain expertise and reasoning
   - LLM: Language understanding and generation

2. **Modularity**: System components are loosely coupled and can be extended independently
   - Frontend components are reusable and composable
   - Backend services are independent and testable
   - Clear API contracts between frontend and backend

3. **Configuration-Driven**: Behavior is controlled through YAML files, not hardcoded logic

4. **Agent Specialization**: Each agent has a specific role, expertise, and personality

5. **Collaborative Intelligence**: Agents can interact with each other through tools and context sharing

6. **User-Centric Design**: Frontend prioritizes user experience with intuitive interfaces, real-time feedback, and comprehensive data visualization

7. **Real-Time Interactivity**: WebSocket integration enables dynamic, conversational consultations that mirror real doctor-patient interactions

---

## Creativity in Design

### 1. Multi-Agent Medical Simulation

**Innovation**: The system doesn't use a single AI model for diagnosis. Instead, it creates a **virtual hospital** with specialized AI agents that mirror real medical practice:

- **General Practitioner Agent**: Acts as a triage specialist, gathering information and making routing decisions
- **Specialist Agents**: Domain experts (Cardiology, Ophthalmology, Orthopaedics, OB-GYN, Dentistry) with deep knowledge
- **Peer Review Agents**: Quality assurance specialists who validate and refine diagnoses

**Why This Is Creative**: This approach ensures that diagnoses benefit from multiple perspectives, reducing single-point-of-failure risks and improving accuracy through collaborative reasoning.

### 2. Dynamic Routing System

**Innovation**: The system uses **intelligent triage** to dynamically route patients to appropriate specialists based on natural language complaint analysis. The routing logic is flexible and extensible:

```python
# Dynamic routing based on triage output
if "CARDIOLOGY" in triage_text:
    route_to_cardiology()
elif "OPHTHALMOLOGY" in triage_text:
    route_to_ophthalmology()
# ... easily extensible for new specialties
```

**Why This Is Creative**: Unlike static rule-based systems, the routing decision emerges from the AI's understanding of the complaint, making it more natural and adaptable.

### 3. Collaborative Peer Review Mechanism

**Innovation**: The peer review process isn't just validation—it's a **collaborative consultation** where agents can:
- Ask clarifying questions using the `consult_colleague` tool
- Challenge assumptions
- Request additional information
- Provide constructive feedback
- Engage in dialogue to refine diagnoses

**Why This Is Creative**: This simulates real hospital consultations where doctors discuss cases together, leading to better outcomes than isolated decision-making.

### 4. Custom Tools for Agent Interaction

**Innovation**: The system includes custom tools that enable rich agent interactions:

- **`human_input_tool`**: Allows agents to ask follow-up questions during consultations
- **`consult_colleague`**: Enables agents to discuss cases with each other, simulating real medical consultations

**Why This Is Creative**: These tools break the traditional "single-shot" AI interaction model, creating a dynamic, interactive diagnostic process.

### 5. YAML-Based Configuration System

**Innovation**: Agents and tasks are defined in YAML files, allowing:
- Non-programmers to modify agent personalities and behaviors
- Easy addition of new specialties without code changes
- Version control of agent configurations
- A/B testing of different agent configurations

**Why This Is Creative**: This makes the system highly adaptable and allows medical professionals to fine-tune agent behaviors without touching code.

### 6. Dual Interface Design

**Innovation**: The system provides both:
- **CLI Interface** (`main.py`): For development, testing, and batch processing
- **REST API** (`app.py`): For integration with other systems, web applications, and production use

**Why This Is Creative**: This flexibility allows the same core system to serve different use cases—from research to production deployments.

### 7. Context-Aware Task Dependencies

**Innovation**: Tasks are linked through context dependencies, ensuring that:
- Peer review agents have access to the original diagnosis
- Specialists receive triage information
- Information flows naturally through the workflow

**Why This Is Creative**: This creates a coherent narrative thread through the diagnostic process, maintaining continuity and context.

### 8. Structured Output with File Persistence

**Innovation**: Each task automatically saves its output to markdown files:
- `triage_decision.md`
- `cardiology_diagnosis.md`
- `cardiology_peer_review.md`
- etc.

**Why This Is Creative**: This provides audit trails, enables offline review, and supports integration with documentation systems.

---

## Scalability

### Horizontal Scalability

#### 1. **Stateless API Design**
- FastAPI endpoints are stateless, allowing multiple instances to run behind a load balancer
- No shared state between requests enables easy horizontal scaling
- Each request is independent and can be processed by any available instance

#### 2. **Async Processing Capability**
- FastAPI's async support allows handling multiple concurrent requests
- Can be extended with background task queues (Celery, RQ) for long-running diagnostics
- Uvicorn supports multiple worker processes for increased throughput

#### 3. **LLM Provider Abstraction**
- LiteLLM provides a unified interface, allowing easy switching between providers
- Can distribute load across multiple LLM providers
- Supports rate limiting and retry logic for production resilience

### Vertical Scalability

#### 1. **Modular Agent Architecture**
- New medical specialties can be added by:
  - Adding agent definitions to `agents.yaml`
  - Adding task definitions to `tasks.yaml`
  - Adding routing logic to `service.py` and `main.py`
- No changes required to core framework code

#### 2. **Configuration-Driven Extensibility**
- Adding a new specialty requires:
  - 2 agent definitions (diagnosing + peer review)
  - 2 task definitions (diagnosis + peer review)
  - 1 routing condition in service layer
- Total: ~100 lines of YAML + ~10 lines of Python

#### 3. **Service Layer Abstraction**
- Business logic is separated from presentation layer
- Service functions can be reused across CLI, API, and future interfaces (GraphQL, gRPC)
- Easy to add caching, rate limiting, or other middleware

### Performance Scalability

#### 1. **Efficient LLM Usage**
- Uses Groq's optimized inference for fast responses
- Temperature set to 0.3 for deterministic, cacheable outputs
- Can implement response caching for similar queries

#### 2. **Selective Agent Activation**
- Only activates the specialist crew needed for each case
- Triage agent is lightweight and fast
- Avoids unnecessary computation

#### 3. **Parallel Processing Potential**
- Peer review can potentially run in parallel with diagnosis refinement
- Multiple patient cases can be processed concurrently
- Can implement batch processing for multiple cases

### Data Scalability

#### 1. **File-Based Output (Current)**
- Markdown files provide simple persistence
- Easy to migrate to databases (PostgreSQL, MongoDB) when needed
- No database dependency reduces deployment complexity

#### 2. **Structured Data Models**
- Pydantic models ensure type safety and validation
- Easy to serialize to JSON, databases, or message queues
- Supports schema evolution

#### 3. **Knowledge Base Integration Ready**
- CrewAI supports knowledge sources (RAG)
- Can integrate with vector databases (Pinecone, Weaviate) for medical literature
- `knowledge/` directory structure already in place

### Operational Scalability

#### 1. **Health Check Endpoints**
- `/health` endpoint enables monitoring and load balancer health checks
- Can be extended with metrics, logging, and alerting

#### 2. **Error Handling**
- Comprehensive try-catch blocks prevent cascading failures
- Graceful degradation when triage is unclear
- Error messages are user-friendly and actionable

#### 3. **Deployment Flexibility**
- Can run as:
  - Standalone Python script
  - FastAPI service
  - Docker container
  - Kubernetes deployment
  - Serverless function (with modifications)

### Scalability Metrics & Considerations

**Current Capacity** (Single Instance):
- Concurrent requests: Limited by LLM API rate limits
- Response time: ~30-60 seconds per diagnostic workflow
- Throughput: ~1-2 cases per minute (depending on complexity)

**Scalability Paths**:
1. **Short-term**: Add request queuing, implement caching
2. **Medium-term**: Deploy multiple API instances, add database for case history
3. **Long-term**: Implement async processing, add vector database for medical knowledge, integrate with hospital systems

**Bottlenecks**:
- LLM API rate limits (mitigated by provider selection and caching)
- Sequential task processing (can be parallelized for peer review)
- File I/O for output (can be moved to database or object storage)

---

## System Components

### 1. Presentation Layer

#### `app.py` - FastAPI Application
- **Purpose**: REST API interface for the medical diagnostic system
- **Key Features**:
  - CORS middleware for cross-origin requests
  - HTML frontend for testing
  - JSON API endpoints
  - Health check endpoint
- **Endpoints**:
  - `GET /`: Web interface
  - `POST /process-query`: Process patient queries
  - `GET /health`: Health check

#### `src/helloworld2/main.py` - CLI Interface
- **Purpose**: Command-line interface for running diagnostics
- **Key Features**:
  - Direct crew execution
  - Interactive testing
  - Example patient cases in comments
- **Usage**: `crewai run` or `python -m helloworld2.main`

### 2. Service Layer

#### `src/helloworld2/service.py` - Workflow Orchestration
- **Purpose**: Business logic for the diagnostic workflow
- **Key Function**: `run_medical_diagnostic_workflow()`
- **Responsibilities**:
  - Initialize crew instance
  - Execute triage
  - Route to appropriate specialist
  - Execute specialist diagnosis
  - Execute peer review
  - Return structured results
- **Error Handling**: Comprehensive exception handling with structured error responses

### 3. Agent Layer

#### `src/helloworld2/crew.py` - CrewAI Crew Definition
- **Purpose**: Defines all agents, tasks, and tools
- **Key Components**:
  - `MedicalDiagnosticCrew` class: Main crew orchestrator
  - LLM configuration: Groq/LLaMA 3.3 70B with temperature 0.3
  - Agent definitions: 10 specialized medical agents
  - Task definitions: 11 diagnostic and review tasks
  - Custom tools: `human_input_tool`, `consult_colleague`

#### Agent Types:
1. **General Practitioner**: Triage and initial assessment
2. **Specialist Agents** (5 types):
   - Diagnosing Cardiologist
   - Diagnosing Dentist
   - Diagnosing OB-GYN
   - Diagnosing Ophthalmologist
   - Diagnosing Orthopaedic
3. **Peer Review Agents** (5 types):
   - Peer Review Cardiologist
   - Peer Review Dentist
   - Peer Review OB-GYN
   - Peer Review Ophthalmologist
   - Peer Review Orthopaedic

### 4. Configuration Layer

#### `src/helloworld2/config/agents.yaml`
- **Purpose**: Defines agent personalities, roles, goals, and backstories
- **Structure**: Each agent has:
  - `role`: Professional title and responsibilities
  - `goal`: Primary objective
  - `backstory`: Personality, experience, and working style
- **Benefits**: Easy to modify agent behavior without code changes

#### `src/helloworld2/config/tasks.yaml`
- **Purpose**: Defines task descriptions, expected outputs, and context dependencies
- **Structure**: Each task has:
  - `description`: What the agent should do
  - `expected_output`: Format and content requirements
  - `agent`: Which agent performs the task
  - `context`: Dependencies on other tasks
- **Benefits**: Clear task specifications and automatic context passing

### 5. Tools Layer

#### Custom Tools in `crew.py`
- **`human_input_tool`**: Enables agents to ask patients follow-up questions
- **`consult_colleague`**: Enables agents to discuss cases with peer reviewers
- **Purpose**: Facilitate interactive and collaborative workflows

### 6. Frontend Components

#### Dashboard (`src/app/dashboard/page.tsx`)
- **Purpose**: Main user interface for medical consultations
- **Key Features**:
  - **Multi-tab Interface**: Query submission, consultation history, and analytics dashboard
  - **Interactive Query Form**: Symptom input with age/gender fields and optional demo mode
  - **Real-time Results Display**: Comprehensive visualization of diagnostic results
  - **Agent Collaboration Visualization**: Timeline view of agent discussions with confidence scores
  - **Risk Analysis Charts**: Visual representation of risk factors and overall risk assessment
  - **Symptom Timeline**: Progressive chart showing symptom evolution over time
  - **Differential Diagnosis Display**: Ranked list of potential conditions with probability scores
  - **Recommendations Panel**: Prioritized action items with urgency indicators
  - **Confidence Scores**: Breakdown of system confidence across different assessment aspects
  - **WebSocket Integration**: Real-time connection status indicator and interactive question handling

#### Landing Page (`src/app/page.tsx`)
- **Purpose**: Marketing and informational homepage
- **Key Components**:
  - Hero section with value proposition
  - Features showcase highlighting multi-agent collaboration
  - How it works section explaining the consultation flow
  - Pricing section
  - Trust indicators and testimonials

#### Question Dialog (`src/components/QuestionDialog.tsx`)
- **Purpose**: Interactive consultation interface for doctor-patient dialogue
- **Key Features**:
  - Modal dialog for displaying agent questions
  - Text input for patient responses
  - Keyboard shortcuts (Enter to submit, Shift+Enter for new line)
  - Character counter and validation
  - Smooth animations and accessibility features

#### WebSocket Hook (`src/hooks/useWebSocket.ts`)
- **Purpose**: Real-time bidirectional communication with backend
- **Key Features**:
  - Automatic session management with unique session IDs
  - Connection state tracking (connected/disconnected)
  - Automatic reconnection logic with exponential backoff
  - Question reception and response sending
  - Session persistence across page refreshes

#### API Route (`src/app/api/process-query/route.ts`)
- **Purpose**: Next.js API route that proxies requests to backend
- **Key Features**:
  - Session ID validation
  - Error handling and status code management
  - CORS support for cross-origin requests
  - Request/response transformation

### 7. Configuration Management

#### `pyproject.toml`
- **Purpose**: Project metadata and dependencies
- **Key Sections**:
  - Project information
  - Python version requirements (3.10-3.14)
  - Dependencies list
  - Script entry points
  - CrewAI project type declaration

#### `package.json` (Frontend)
- **Purpose**: Frontend project metadata and dependencies
- **Key Sections**:
  - Next.js and React dependencies
  - TypeScript configuration
  - Build and development scripts
  - UI library dependencies (Framer Motion, Recharts, Lucide)

#### `.env` File (not in repo)
- **Purpose**: Environment variables for API keys
- **Required**: `OPENAI_API_KEY` or equivalent for LLM provider

---

## Frontend Implementation

### User Interface Architecture

The frontend is built as a modern, responsive web application using Next.js 16 with React 19, providing a seamless user experience for medical consultations. The architecture follows a component-based design with clear separation of concerns.

### Key Frontend Features

#### 1. Dashboard Interface

The dashboard serves as the primary interface for medical consultations, featuring three main sections:

**Query Tab**:
- Symptom input form with rich text area
- Patient demographic fields (age, gender)
- Real-time form validation
- Quick action buttons (voice input, camera, document upload placeholders)
- Sidebar with health statistics and recent query history
- Connection status indicator for WebSocket

**History Tab**:
- Comprehensive consultation history with filtering options
- Risk level indicators (high/medium/low) with color coding
- Specialist type tags
- Time-based sorting and filtering
- Quick access to previous consultation details

**Analytics Tab**:
- Consultation trends over time with interactive charts
- Specialist distribution visualization
- Risk level distribution analysis
- Key performance metrics (total consultations, average response time, accuracy rate)
- Health insights and recommendations based on consultation patterns

#### 2. Real-Time Interactive Consultation

**WebSocket Integration**:
- Persistent WebSocket connection for bidirectional communication
- Automatic session management with unique session IDs
- Connection state monitoring with visual indicators
- Automatic reconnection on connection loss
- Real-time question delivery from AI agents

**Question Dialog System**:
- Modal interface for displaying agent questions
- Rich text input for patient responses
- Keyboard shortcuts for efficient interaction
- Character limits and validation
- Smooth animations and transitions

#### 3. Comprehensive Results Visualization

**Agent Collaboration Timeline**:
- Visual representation of multi-agent discussions
- Color-coded agent roles (Receptionist, GP, Specialists)
- Confidence scores for each agent contribution
- Timestamp tracking for consultation flow
- Animated timeline with progressive disclosure

**Risk Analysis Dashboard**:
- Overall risk score with color-coded indicators
- Individual risk factor breakdown
- Visual progress bars for each risk component
- Impact descriptions for each factor
- Dynamic color coding (red for high risk, yellow for medium, green for low)

**Symptom Progression Chart**:
- Time-series visualization of symptom severity
- Day-by-day symptom tracking
- Severity scoring (1-10 scale)
- Symptom detail annotations
- Color-coded severity levels

**Differential Diagnosis Panel**:
- Ranked list of potential conditions
- Probability percentages for each diagnosis
- Reasoning explanations for each possibility
- Required tests for confirmation
- Visual probability bars

**Recommendations & Action Plan**:
- Prioritized list of recommendations
- Urgency indicators (urgent/important/follow-up)
- Timeframe specifications
- Color-coded priority levels
- Action buttons for scheduling appointments and downloading reports

**Confidence Scores Breakdown**:
- Multi-aspect confidence assessment
- Individual scores for triage, specialist selection, diagnosis, treatment plan, and urgency
- Reasoning explanations for each score
- Visual progress indicators

#### 4. Landing Page Features

**Hero Section**:
- Compelling value proposition
- Visual representation of virtual hospital concept
- Call-to-action buttons
- Agent flow visualization (Receptionist → GP → Specialists)

**Features Section**:
- Multi-agent collaboration explanation
- Specialist showcase (5 medical specialties)
- Key benefits highlighting
- Consultation flow visualization

**How It Works**:
- Step-by-step consultation process
- Visual agent flow diagram
- Role descriptions for each agent type

**Pricing & Trust Indicators**:
- Transparent pricing information
- Trust badges and certifications
- User testimonials and social proof

### Frontend Technical Implementation

#### State Management

The frontend uses React's built-in state management with hooks:
- `useState` for local component state
- `useWebSocket` custom hook for WebSocket connection management
- Context-free architecture for simplicity and performance

#### Performance Optimizations

- **Next.js Image Optimization**: Automatic image optimization with WebP/AVIF formats
- **Code Splitting**: Automatic route-based code splitting
- **Server-Side Rendering**: Initial page load optimization
- **Framer Motion**: Hardware-accelerated animations
- **Lazy Loading**: Component and image lazy loading

#### Responsive Design

- Mobile-first approach with Tailwind CSS
- Breakpoint-based layouts (sm, md, lg, xl)
- Touch-friendly interface elements
- Adaptive typography and spacing

#### Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management for modals
- Skip-to-content links

#### Security Features

- Security headers configured in Next.js config
- XSS protection through React's built-in escaping
- CSRF protection via SameSite cookies
- Content Security Policy ready
- Referrer policy configuration

### Frontend-Backend Integration

#### API Communication

The frontend communicates with the backend through:
1. **REST API**: Next.js API routes proxy requests to FastAPI backend
2. **WebSocket**: Direct WebSocket connection for real-time interactions
3. **Session Management**: Unique session IDs maintained across both protocols

#### Data Flow

1. User submits query → Next.js API route → FastAPI backend
2. Backend processes query → WebSocket sends questions → Frontend displays dialog
3. User responds → WebSocket sends response → Backend continues processing
4. Backend completes workflow → REST API returns results → Frontend displays comprehensive results

#### Error Handling

- Graceful degradation on API failures
- User-friendly error messages
- Connection retry logic
- Fallback UI states

---

## Workflow & Process

### Diagnostic Workflow

1. **Patient Input**
   - Patient complaint received via frontend dashboard or CLI
   - User enters symptoms through interactive form
   - Additional information (age, gender) can be provided
   - Frontend validates input and sends request to backend via Next.js API route

2. **Triage Phase**
   - General Practitioner agent analyzes complaint
   - May ask follow-up questions using `human_input_tool`
   - Questions sent to frontend via WebSocket connection
   - Question dialog displays in frontend for patient response
   - Patient responds through interactive dialog
   - Determines appropriate specialist department
   - Outputs triage decision to `triage_decision.md`

3. **Routing Decision**
   - System parses triage output
   - Routes to appropriate specialist crew based on keywords:
     - CARDIOLOGY → Cardiology crew
     - OPHTHALMOLOGY → Ophthalmology crew
     - ORTHOPAEDICS → Orthopaedic crew
     - OB-GYN → OB-GYN crew
     - DENTISTRY → Dentistry crew

4. **Specialist Diagnosis**
   - Diagnosing specialist agent receives:
     - Original complaint
     - Triage context
     - Any additional patient information
   - Generates:
     - 3 differential diagnoses (ranked by likelihood)
     - Most probable diagnosis with justification
     - Confidence level
     - Recommended confirmatory tests
     - Critical red flags to monitor
   - Outputs to specialty-specific diagnosis file

5. **Peer Review**
   - Peer review agent receives diagnosis
   - Engages in collaborative discussion using `consult_colleague` tool
   - Asks clarifying questions
   - Challenges assumptions if needed
   - Provides:
     - PASS/FAIL evaluation
     - Strengths and gaps
     - Recommendations
     - Referral decisions if needed
   - Outputs to specialty-specific peer review file

6. **Result Compilation**
   - Service layer compiles all results
   - Returns structured response with:
     - Triage result
     - Specialist type
     - Diagnosis result
     - Peer review result
     - Agent discussions timeline
     - Risk analysis data
     - Symptom timeline
     - Differential diagnosis
     - Recommendations
     - Confidence scores
     - Status and errors

7. **Frontend Display**
   - Results received via REST API response
   - Frontend renders comprehensive visualization:
     - Triage alert with urgency indicators
     - Agent collaboration timeline with animated flow
     - Risk analysis charts and visualizations
     - Symptom progression timeline
     - Differential diagnosis panel with probabilities
     - Prioritized recommendations with action buttons
     - Confidence scores breakdown
   - User can download reports, schedule appointments, or ask follow-up questions

### Process Flow Characteristics

- **Sequential Processing**: Tasks execute in order (triage → diagnosis → review)
- **Context Passing**: Each task receives context from previous tasks
- **Collaborative**: Agents can interact through tools
- **Auditable**: All outputs saved to markdown files
- **Error Resilient**: Graceful handling of unclear triage or errors

---

## Configuration Management

### YAML Configuration Benefits

1. **Human-Readable**: Medical professionals can understand and modify configurations
2. **Version Control**: Changes tracked in Git
3. **No Code Changes**: Add specialties without modifying Python code
4. **A/B Testing**: Easy to test different agent configurations
5. **Internationalization**: Can create language-specific agent personalities

### Adding a New Specialty

**Step 1**: Add agents to `agents.yaml`
```yaml
diagnosing_new_specialty:
  role: Senior New Specialty Specialist
  goal: Generate definitive diagnoses...
  backstory: You are Dr. [Name]...

peer_review_new_specialty:
  role: Peer Review New Specialty Specialist
  goal: Critically evaluate diagnostic reports...
  backstory: You are Dr. [Name]...
```

**Step 2**: Add tasks to `tasks.yaml`
```yaml
new_specialty_diagnosis_task:
  description: You are Dr. [Name]...
  expected_output: Three differential diagnoses...
  agent: diagnosing_new_specialty
  context:
    - triage_task

new_specialty_peer_review_task:
  description: You are Dr. [Name]...
  expected_output: A collaborative peer review...
  agent: peer_review_new_specialty
  context:
    - new_specialty_diagnosis_task
```

**Step 3**: Add agent methods to `crew.py`
```python
@agent
def diagnosing_new_specialty(self) -> Agent:
    return Agent(
        config=self.agents_config['diagnosing_new_specialty'],
        llm=self.llm,
        verbose=True,
        tools=[self.get_human_input, self.consult_colleague]
    )

@agent
def peer_review_new_specialty(self) -> Agent:
    return Agent(
        config=self.agents_config['peer_review_new_specialty'],
        llm=self.llm,
        verbose=True,
        tools=[self.consult_colleague]
    )
```

**Step 4**: Add task methods to `crew.py`
```python
@task
def new_specialty_diagnosis_task(self) -> Task:
    return Task(
        config=self.tasks_config['new_specialty_diagnosis_task'],
        output_file='new_specialty_diagnosis.md'
    )

@task
def new_specialty_peer_review_task(self) -> Task:
    return Task(
        config=self.tasks_config['new_specialty_peer_review_task'],
        output_file='new_specialty_peer_review.md'
    )
```

**Step 5**: Add routing logic to `service.py` and `main.py`
```python
elif "NEW_SPECIALTY" in triage_text:
    result['specialist_type'] = 'NEW_SPECIALTY'
    # ... create crew and execute
```

**Total Effort**: ~200 lines of YAML + ~50 lines of Python

---

## API Design

### RESTful Endpoints

#### Backend Endpoints

##### `POST /process-query`
- **Purpose**: Process patient queries through diagnostic workflow
- **Request Body**:
  ```json
  {
    "query": "patient complaint text",
    "session_id": "session_abc123",
    "use_auto_response": true,
    "additional_info": {
      "age": 45,
      "gender": "male"
    }
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "triage_result": "Triage decision text...",
    "specialist_type": "CARDIOLOGY",
    "diagnosis_result": "Diagnosis text...",
    "peer_review_result": "Peer review text...",
    "agent_discussions": [...],
    "recommendations": [...],
    "risk_analysis": {...},
    "error": null
  }
  ```
- **Error Handling**: Returns 400 for invalid input, 500 for processing errors

##### `GET /health`
- **Purpose**: Health check for monitoring and load balancers
- **Response**:
  ```json
  {
    "status": "healthy",
    "service": "Medical Diagnostic API"
  }
  ```

##### `WebSocket /ws/{session_id}`
- **Purpose**: Real-time bidirectional communication for interactive consultations
- **Message Types**:
  - `question`: Agent sends question to patient
  - `response`: Patient sends response to agent
- **Features**: Session-based, automatic reconnection, persistent connection

#### Frontend API Routes

##### `POST /api/process-query` (Next.js API Route)
- **Purpose**: Proxy endpoint that forwards requests to backend FastAPI service
- **Request**: Same as backend `/process-query`
- **Response**: Passes through backend response
- **Features**: Session ID validation, error handling, CORS support

### API Design Principles

1. **RESTful**: Follows REST conventions
2. **Stateless**: Each request is independent
3. **Structured Responses**: Consistent JSON format
4. **Error Handling**: Clear error messages and HTTP status codes
5. **CORS Support**: Configured for cross-origin requests
6. **Documentation**: Automatic OpenAPI/Swagger docs available at `/docs`

### Future API Enhancements

- **Async Processing**: Background jobs for long-running diagnostics
- **Webhooks**: Notify external systems when diagnostics complete
- **Streaming**: Stream diagnostic progress in real-time
- **Batch Processing**: Process multiple cases in one request
- **Authentication**: API keys or OAuth for production use
- **Rate Limiting**: Prevent abuse and manage costs

---

## Future Enhancements

### Short-Term (1-3 months)

1. **Database Integration**
   - Replace file-based storage with PostgreSQL/MongoDB
   - Store case history, patient records, and diagnostic outcomes
   - Enable analytics and reporting

2. **Caching Layer**
   - Cache LLM responses for similar queries
   - Reduce API costs and improve response times
   - Implement Redis for distributed caching

3. **Enhanced Error Handling**
   - More granular error types
   - Retry logic for transient failures
   - Fallback mechanisms for LLM unavailability

4. **Monitoring & Logging**
   - Structured logging (JSON format)
   - Metrics collection (Prometheus)
   - Distributed tracing (OpenTelemetry)

### Medium-Term (3-6 months)

1. **Knowledge Base Integration**
   - Vector database for medical literature (Pinecone, Weaviate)
   - RAG (Retrieval-Augmented Generation) for evidence-based responses
   - Integration with medical databases (PubMed, clinical guidelines)

2. **Multi-Modal Support**
   - Image analysis for medical imaging (X-rays, CT scans)
   - Voice input for patient complaints
   - Document parsing for medical records

3. **Advanced Agent Capabilities**
   - Memory systems for patient history
   - Learning from feedback loops
   - Specialized tools for medical calculations and risk scoring

4. **Workflow Customization**
   - Configurable workflow steps
   - Conditional routing based on patient data
   - Custom agent chains for specific use cases

### Long-Term (6-12 months)

1. **Federated Learning**
   - Learn from multiple hospital deployments
   - Privacy-preserving model updates
   - Improved accuracy through diverse training data

2. **Real-Time Collaboration**
   - WebSocket support for live consultations
   - Multi-user sessions with human doctors
   - Real-time peer review discussions

3. **Regulatory Compliance**
   - HIPAA compliance for patient data
   - FDA/CE marking considerations
   - Audit trails and compliance reporting

4. **Integration Ecosystem**
   - HL7/FHIR integration for EMR systems
   - Hospital information system (HIS) integration
   - Telemedicine platform connectors

5. **Advanced Analytics**
   - Diagnostic accuracy metrics
   - Outcome tracking and validation
   - Predictive analytics for patient outcomes
   - Population health insights

### Research Directions

1. **Explainability**
   - Detailed reasoning traces
   - Evidence attribution
   - Confidence calibration

2. **Bias Mitigation**
   - Demographic fairness testing
   - Bias detection and correction
   - Diverse training data curation

3. **Continuous Learning**
   - Online learning from new cases
   - Feedback incorporation
   - Model versioning and A/B testing

---

## Conclusion

This medical diagnostic AI system represents a creative application of multi-agent AI technology to healthcare. By combining the CrewAI framework with specialized medical agents, the system creates a virtual hospital environment that mirrors real-world medical practice.

The architecture is designed for scalability, extensibility, and maintainability. The configuration-driven approach allows non-programmers to modify system behavior, while the modular design enables easy addition of new specialties and features.

The system's creativity lies in its collaborative agent design, dynamic routing, and peer review mechanisms—all of which contribute to more accurate and reliable diagnostic outcomes. As the system evolves, it has the potential to become a valuable tool for medical professionals, improving diagnostic accuracy and patient care.

---

## Appendix: Key Files Reference

### Backend Files
- **`app.py`**: FastAPI REST API application
- **`src/helloworld2/main.py`**: CLI interface for running diagnostics
- **`src/helloworld2/service.py`**: Service layer with workflow orchestration
- **`src/helloworld2/crew.py`**: CrewAI crew, agent, and task definitions
- **`src/helloworld2/config/agents.yaml`**: Agent configurations
- **`src/helloworld2/config/tasks.yaml`**: Task configurations
- **`pyproject.toml`**: Project dependencies and metadata
- **`API_README.md`**: API usage documentation
- **`README.md`**: General project documentation

### Frontend Files
- **`src/app/page.tsx`**: Landing page component
- **`src/app/dashboard/page.tsx`**: Main dashboard interface
- **`src/app/api/process-query/route.ts`**: Next.js API route for backend communication
- **`src/app/layout.tsx`**: Root layout with metadata and SEO
- **`src/components/QuestionDialog.tsx`**: Interactive question dialog component
- **`src/hooks/useWebSocket.ts`**: WebSocket connection management hook
- **`src/components/HeroSection.tsx`**: Landing page hero section
- **`src/components/Features.tsx`**: Features showcase component
- **`package.json`**: Frontend dependencies and scripts
- **`next.config.ts`**: Next.js configuration with security headers

