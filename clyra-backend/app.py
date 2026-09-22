"""
FastAPI application for Medical Diagnostic CrewAI system.
Provides REST API endpoints for patient queries and medical diagnostics.
"""
import sys
from pathlib import Path

# Add src directory to Python path to allow imports
project_root = Path(__file__).parent
src_path = project_root / "src"
if str(src_path) not in sys.path:
    sys.path.insert(0, str(src_path))

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any
import uvicorn

from helloworld2.service import run_medical_diagnostic_workflow

app = FastAPI(
    title="Medical Diagnostic API",
    description="API for medical diagnostic queries using CrewAI",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PatientQueryRequest(BaseModel):
    """Request model for patient queries."""
    query: str
    additional_info: Optional[Dict[str, Any]] = None


class QueryResponse(BaseModel):
    """Response model for query processing."""
    status: str
    triage_result: Optional[str] = None
    specialist_type: Optional[str] = None
    diagnosis_result: Optional[str] = None
    peer_review_result: Optional[str] = None
    error: Optional[str] = None


@app.get("/", response_class=HTMLResponse)
async def root():
    """Serve a simple HTML frontend for testing."""
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Medical Diagnostic System</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #2c3e50;
                text-align: center;
            }
            .form-group {
                margin-bottom: 20px;
            }
            label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                color: #34495e;
            }
            textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 14px;
                min-height: 100px;
                box-sizing: border-box;
            }
            button {
                background-color: #3498db;
                color: white;
                padding: 12px 30px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                width: 100%;
            }
            button:hover {
                background-color: #2980b9;
            }
            button:disabled {
                background-color: #95a5a6;
                cursor: not-allowed;
            }
            .result {
                margin-top: 30px;
                padding: 20px;
                background-color: #ecf0f1;
                border-radius: 5px;
                display: none;
            }
            .result h2 {
                color: #2c3e50;
                margin-top: 0;
            }
            .result-section {
                margin-bottom: 20px;
                padding: 15px;
                background: white;
                border-radius: 5px;
                border-left: 4px solid #3498db;
            }
            .result-section h3 {
                color: #34495e;
                margin-top: 0;
            }
            .result-section pre {
                white-space: pre-wrap;
                word-wrap: break-word;
                background: #f8f9fa;
                padding: 10px;
                border-radius: 3px;
            }
            .loading {
                text-align: center;
                color: #7f8c8d;
                display: none;
            }
            .error {
                background-color: #e74c3c;
                color: white;
                padding: 15px;
                border-radius: 5px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🏥 Medical Diagnostic System</h1>
            <p style="text-align: center; color: #7f8c8d;">Enter your medical complaint or query below</p>
            
            <form id="queryForm">
                <div class="form-group">
                    <label for="query">Patient Complaint/Query:</label>
                    <textarea id="query" name="query" placeholder="e.g., my legs hurt, chest pain, vision problems..." required></textarea>
                </div>
                <button type="submit" id="submitBtn">Submit Query</button>
            </form>
            
            <div class="loading" id="loading">
                <p>Processing your query... This may take a moment.</p>
            </div>
            
            <div class="result" id="result">
                <h2>Diagnostic Results</h2>
                <div id="resultContent"></div>
            </div>
        </div>
        
        <script>
            document.getElementById('queryForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const query = document.getElementById('query').value;
                const submitBtn = document.getElementById('submitBtn');
                const loading = document.getElementById('loading');
                const result = document.getElementById('result');
                const resultContent = document.getElementById('resultContent');
                
                // Disable button and show loading
                submitBtn.disabled = true;
                loading.style.display = 'block';
                result.style.display = 'none';
                
                try {
                    const response = await fetch('/process-query', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ query: query })
                    });
                    
                    const data = await response.json();
                    
                    if (!response.ok) {
                        throw new Error(data.detail || 'An error occurred');
                    }
                    
                    // Display results
                    let html = '';
                    
                    if (data.triage_result) {
                        html += '<div class="result-section"><h3>📋 Triage Result</h3><pre>' + 
                               escapeHtml(data.triage_result) + '</pre></div>';
                    }
                    
                    if (data.specialist_type) {
                        html += '<div class="result-section"><h3>👨‍⚕️ Specialist Department</h3><p><strong>' + 
                               escapeHtml(data.specialist_type) + '</strong></p></div>';
                    }
                    
                    if (data.diagnosis_result) {
                        html += '<div class="result-section"><h3>🔬 Diagnosis</h3><pre>' + 
                               escapeHtml(data.diagnosis_result) + '</pre></div>';
                    }
                    
                    if (data.error) {
                        html += '<div class="error"><strong>Error:</strong> ' + escapeHtml(data.error) + '</div>';
                    }
                    
                    resultContent.innerHTML = html;
                    result.style.display = 'block';
                    
                } catch (error) {
                    resultContent.innerHTML = '<div class="error"><strong>Error:</strong> ' + 
                                             escapeHtml(error.message) + '</div>';
                    result.style.display = 'block';
                } finally {
                    submitBtn.disabled = false;
                    loading.style.display = 'none';
                }
            });
            
            function escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
        </script>
    </body>
    </html>
    """
    return html_content


@app.post("/process-query", response_model=QueryResponse)
async def process_query(request: PatientQueryRequest):
    """
    Process a patient query through the medical diagnostic workflow.
    
    This endpoint:
    1. Runs triage with a general practitioner
    2. Routes to appropriate specialist based on triage result
    3. Returns diagnosis and peer review results
    """
    try:
        if not request.query or not request.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        # Run the medical diagnostic workflow
        result = run_medical_diagnostic_workflow(
            patient_complaint=request.query,
            additional_inputs=request.additional_info
        )
        
        if result['status'] == 'error':
            raise HTTPException(status_code=500, detail=result.get('error', 'Unknown error occurred'))
        
        return QueryResponse(
            status=result['status'],
            triage_result=result.get('triage_result'),
            specialist_type=result.get('specialist_type'),
            diagnosis_result=result.get('diagnosis_result'),
            peer_review_result=result.get('peer_review_result'),
            error=result.get('error')
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "Medical Diagnostic API"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
