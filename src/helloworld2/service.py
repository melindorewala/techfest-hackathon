"""
Service module for running CrewAI medical diagnostic workflow.
This module extracts the crew running logic from main.py for use in FastAPI.
"""
from crewai import Crew, Process
from helloworld2.crew import MedicalDiagnosticCrew
from typing import Dict, Any, Optional


def run_medical_diagnostic_workflow(patient_complaint: str, additional_inputs: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Run the complete medical diagnostic workflow:
    1. Triage with general practitioner
    2. Route to appropriate specialist based on triage result
    3. Return diagnosis and peer review results
    
    Args:
        patient_complaint: The patient's initial complaint/query
        additional_inputs: Optional additional patient information
        
    Returns:
        Dictionary containing:
        - triage_result: The triage decision
        - specialist_type: The specialist department routed to
        - diagnosis_result: The diagnosis from the specialist
        - peer_review_result: The peer review result
        - status: Success or error status
        - error: Error message if any
    """
    try:
        # Prepare inputs
        inputs = {
            'patient_complaint': patient_complaint
        }
        
        if additional_inputs:
            inputs.update(additional_inputs)
        
        # Initialize crew
        crew_instance = MedicalDiagnosticCrew()
        
        # Step 1: Run triage
        triage_crew = Crew(
            agents=[crew_instance.general_practitioner()],
            tasks=[crew_instance.triage_task()],
            process=Process.sequential,
            verbose=True
        )
        
        triage_result = triage_crew.kickoff(inputs=inputs)
        triage_text = str(triage_result).upper()
        
        result = {
            'triage_result': str(triage_result),
            'specialist_type': None,
            'diagnosis_result': None,
            'peer_review_result': None,
            'status': 'success'
        }
        
        # Step 2: Route to appropriate specialist
        if "CARDIOLOGY" in triage_text:
            result['specialist_type'] = 'CARDIOLOGY'
            
            cardiology_crew = Crew(
                agents=[
                    crew_instance.diagnosing_cardiologist(),
                    crew_instance.peer_review_cardiologist()
                ],
                tasks=[
                    crew_instance.cardiology_diagnosis_task(),
                    crew_instance.cardiology_peer_review_task()
                ],
                process=Process.sequential,
                verbose=True
            )
            
            specialist_result = cardiology_crew.kickoff(inputs=inputs)
            result['diagnosis_result'] = str(specialist_result)
            
        elif "DENTISTRY" in triage_text or "DENTAL" in triage_text:
            result['specialist_type'] = 'DENTISTRY'
            
            dentistry_crew = Crew(
                agents=[
                    crew_instance.diagnosing_dentist(),
                    crew_instance.peer_review_dentist()
                ],
                tasks=[
                    crew_instance.dentistry_diagnosis_task(),
                    crew_instance.dentistry_peer_review_task()
                ],
                process=Process.sequential,
                verbose=True
            )
            
            specialist_result = dentistry_crew.kickoff(inputs=inputs)
            result['diagnosis_result'] = str(specialist_result)
            
        elif "OB" in triage_text or "GYN" in triage_text or "OBSTETRIC" in triage_text or "GYNECOLOG" in triage_text or "OB-GYN" in triage_text:
            result['specialist_type'] = 'OB-GYN'
            
            obgyn_crew = Crew(
                agents=[
                    crew_instance.diagnosing_obgyn(),
                    crew_instance.peer_review_obgyn()
                ],
                tasks=[
                    crew_instance.obgyn_diagnosis_task(),
                    crew_instance.obgyn_peer_review_task()
                ],
                process=Process.sequential,
                verbose=True
            )
            
            specialist_result = obgyn_crew.kickoff(inputs=inputs)
            result['diagnosis_result'] = str(specialist_result)
            
        elif "OPHTHALMOLOGY" in triage_text or "OPHTHALMO" in triage_text or "EYE" in triage_text:
            result['specialist_type'] = 'OPHTHALMOLOGY'
            
            ophthalmology_crew = Crew(
                agents=[
                    crew_instance.diagnosing_ophthalmologist(),
                    crew_instance.peer_review_ophthalmologist()
                ],
                tasks=[
                    crew_instance.ophthalmology_diagnosis_task(),
                    crew_instance.ophthalmology_peer_review_task()
                ],
                process=Process.sequential,
                verbose=True
            )
            
            specialist_result = ophthalmology_crew.kickoff(inputs=inputs)
            result['diagnosis_result'] = str(specialist_result)
            
        elif "ORTHOPAEDIC" in triage_text or "ORTHOPEDIC" in triage_text or "ORTHO" in triage_text:
            result['specialist_type'] = 'ORTHOPAEDICS'
            
            orthopaedic_crew = Crew(
                agents=[
                    crew_instance.diagnosing_orthopaedic(),
                    crew_instance.peer_review_orthopaedic()
                ],
                tasks=[
                    crew_instance.orthopaedic_diagnosis_task(),
                    crew_instance.orthopaedic_peer_review_task()
                ],
                process=Process.sequential,
                verbose=True
            )
            
            specialist_result = orthopaedic_crew.kickoff(inputs=inputs)
            result['diagnosis_result'] = str(specialist_result)
            
        else:
            result['status'] = 'triage_unclear'
            result['error'] = 'Triage result unclear. Please check triage_decision.md'
            return result
        
        return result
        
    except Exception as e:
        return {
            'status': 'error',
            'error': str(e),
            'triage_result': None,
            'specialist_type': None,
            'diagnosis_result': None,
            'peer_review_result': None
        }

