# FastAPI Medical Diagnostic API

This FastAPI application provides a REST API interface for the CrewAI Medical Diagnostic system.

## Setup

1. Install dependencies:
```bash
uv pip install -e .
```

Or if using uv directly:
```bash
uv sync
```

2. Make sure you have your API keys set up in your `.env` file (as per the main README).

## Running the Server

### Option 1: Direct Python execution
```bash
python app.py
```

### Option 2: Using uvicorn directly
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Option 3: Using the FastAPI CLI
```bash
fastapi dev app.py
```

## API Endpoints

### 1. Web Interface
- **GET** `/` - Returns a simple HTML frontend for testing

### 2. Process Query
- **POST** `/process-query` - Process a patient query through the medical diagnostic workflow

**Request Body:**
```json
{
  "query": "my legs hurt",
  "additional_info": {
    "age": "45",
    "gender": "Male"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "triage_result": "...",
  "specialist_type": "ORTHOPAEDICS",
  "diagnosis_result": "...",
  "peer_review_result": null,
  "error": null
}
```

### 3. Health Check
- **GET** `/health` - Health check endpoint

## Usage Examples

### Using curl:
```bash
curl -X POST "http://localhost:8000/process-query" \
  -H "Content-Type: application/json" \
  -d '{"query": "I have chest pain and shortness of breath"}'
```

### Using Python requests:
```python
import requests

response = requests.post(
    "http://localhost:8000/process-query",
    json={"query": "my legs hurt"}
)
print(response.json())
```

### Using the Web Interface:
1. Start the server
2. Open your browser to `http://localhost:8000`
3. Enter your query in the form
4. Click "Submit Query"
5. View the results

## Architecture

- `app.py` - FastAPI application with endpoints
- `src/helloworld2/service.py` - Service layer that wraps the CrewAI workflow
- `src/helloworld2/crew.py` - CrewAI crew definitions
- `src/helloworld2/main.py` - Original CLI interface (still works)

The service layer extracts the crew running logic from `main.py` and makes it reusable for the API.

## Notes

- The API processes queries synchronously, which may take some time depending on the complexity
- For production use, consider implementing async processing with background tasks
- The `get_human_input` tool in the crew may not work as expected in API context (it uses `input()`)
- CORS is currently set to allow all origins - restrict this in production

