#!/usr/bin/env python
import sys
import warnings

from datetime import datetime

from helloworld2.crew import MedicalDiagnosticCrew

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# This main file is intended to be a way for you to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

def run():
    # """
    # Run the crew.
    # """
    # inputs = {
    # # 'patient_name': 'Maria Rodriguez',
    # # 'age': '72',
    # # 'gender': 'Female',
    # # 'chief_complaint': 'Irregular heartbeat and severe leg swelling',
    # # 'symptoms': 'Palpitations, dizziness, severe bilateral leg edema, orthopnea (3 pillows to sleep), paroxysmal nocturnal dyspnea',
    # # 'vital_signs': 'BP 110/70, HR 135 irregular, RR 24, SpO2 92% on room air, Weight gain 8kg in 2 weeks',
    # # 'brief_history': 'Newly diagnosed atrial fibrillation 3 months ago, non-compliant with anticoagulation, hyperthyroidism',

    # # 'patient_history': 'Hyperthyroidism (Graves disease) for 5yrs, previous TIA 2yrs ago, family history of stroke, irregular medication compliance',
    # # 'physical_exam': 'BP 110/70, irregularly irregular pulse at 135 bpm, bibasilar crackles, 3+ pitting edema bilateral legs, elevated JVD 8cm, S3 gallop, hepatomegaly',
    # # 'ecg_findings': 'Atrial fibrillation with rapid ventricular response (135 bpm), no P waves, narrow QRS complexes, poor R wave progression V1-V4',
    # # 'echo_findings': 'LVEF 30% (severely reduced), dilated left atrium 5.2cm, moderate mitral regurgitation, elevated pulmonary artery pressure 55mmHg',
    # # 'lab_results': 'BNP: 1850 pg/mL (markedly elevated), Troponin: negative, TSH: 0.1 (suppressed), Free T4: elevated, Creatinine: 1.8 mg/dL, INR: 1.1 (not anticoagulated)',
    # # 'other_tests': 'Chest X-ray: cardiomegaly, pulmonary vascular congestion, small bilateral pleural effusions. Holter monitor: persistent AF with RVR',
   


    # # 'obgyn_history': '',
    # # 'gyn_exam': '',
    # # 'ultrasound_findings': '',
    # # 'fetal_monitoring': '',
    # # 'lab_results': '',
    # # 'other_obgyn_tests': ''



    # # 'patient_name': 'Sarah Johnson',
    # # 'age': '32',
    # # 'gender': 'Female',
    # # 'chief_complaint': 'Severe abdominal pain and vaginal bleeding at 28 weeks gestation',
    # # 'symptoms': 'Sudden onset severe lower abdominal pain, bright red vaginal bleeding, uterine contractions, dizziness',
    # # 'vital_signs': 'BP 90/55, HR 115, RR 22, SpO2 97%, Temp 36.8°C',
    # # 'brief_history': 'G2P1, 28 weeks pregnant, previous C-section, no prenatal complications until now',
    
    
    # # 'obgyn_history': 'G2P1, previous C-section 3 years ago for breech presentation, regular prenatal care, no GDM/preeclampsia',
    # # 'gyn_exam': 'Active vaginal bleeding, closed cervix, tender uterus, fetal parts difficult to palpate',
    # # 'ultrasound_findings': 'Placenta previa with complete covering of internal os, retroplacental clot 5x4cm, fetal heart rate 155 bpm with decelerations',
    # # 'fetal_monitoring': 'Category II tracing, baseline 155 bpm, variable decelerations, reduced variability',
    # # 'lab_results': 'Hgb 9.2 g/dL (down from 11.5), platelets 180k, Fibrinogen 250, Type O+, Kleihauer-Betke pending',
    # # 'other_obgyn_tests': 'Estimated blood loss 400mL, continuous fetal monitoring, IV access x2',
    

    # # 'obgyn_history': '',
    # # 'gyn_exam': '',
    # # 'ultrasound_findings': '',
    # # 'fetal_monitoring': '',
    # # 'lab_results': '',
    # # 'other_obgyn_tests': '',

    # # 'patient_history': '',
    # # 'physical_exam': '',
    # # 'ecg_findings': '',
    # # 'echo_findings': '',
    # # 'lab_results': '',
    # # 'other_tests': '',

    # # 'dental_history': '',
    # # 'oral_exam': '',
    # # 'xray_findings': '',
    # # 'photo_findings': '',
    # # 'perio_findings': '',
    # # 'other_dental_tests': '' 
    
    # 'patient_name': 'Robert Chen',
    # 'age': '68',
    # 'gender': 'Male',
    # 'chief_complaint': 'Severe right hip pain and inability to bear weight',
    # 'symptoms': 'Sharp right groin pain, inability to stand or walk, leg externally rotated and shortened, pain with any hip movement',
    # 'vital_signs': 'BP 145/85, HR 110, RR 20, SpO2 96 percent on room air, Temp 37.8°C',
    # 'brief_history': 'Slipped on wet floor at home 3 hours ago, heard a "pop" and immediate pain, osteoporosis diagnosed 5 years ago',
        
    # 'patient_history': 'Osteoporosis for 5 years, hypertension controlled, type 2 diabetes, former smaker (quit 10 years ago), mother had hip fracture at age 75',
    # 'physical_exam': 'Right leg appears shortened and externally rotated, tenderness over right groin, unable to perform active hip movement, severe pain with passive motion, neurovascular intact distally, no open wounds',
    # 'ecg_findings': '',
    # 'echo_findings': '',
    # 'lab_results': 'WBC: 12,000 (mild elevation), CRP: 45 mg/L (elevated), ESR: 65 mm/hr, Hemoglobin: 11.8 g/dL, Creatinine: 1.4 mg/dL, INR: 1.0',
    # 'other_tests': 'X-ray right hip: displaced femoral neck fracture, Garden type IV. CT scan: comminuted femoral neck fracture with 3 fragments, no pelvic involvement. Bone density scan (from 6 months ago): T-score -3.2 at femoral neck',

    # 'dental_history': '',
    # 'oral_exam': '',
    # 'xray_findings': 'Displaced right femoral neck fracture, Garden type IV, 30 degrees of angulation, 2cm shortening',
    # 'photo_findings': '',
    # 'perio_findings': '',
    # 'other_dental_tests': ''
    

    # # 'visual_acuity': 'OD 20/40, OS 20/200',
    # # 'iop_measurements': 'OD 28 mmHg, OS 19 mmHg (Goldmann)',
    # # 'vf_results': 'OD: Superior nasal step defect. OS: General depression.',
    # # 'slitlamp_findings': 'OD: Open angles, C/D ratio 0.7. OS: Closed angle, C/D ratio 0.9.',
    # # 'imaging_and_other_tests': 'OCT reveals thinning of the retinal nerve fiber layer (RNFL) in the left eye.' ,


    # }

    inputs =  {
        'patient_complaint':'I think I broke my leg'
    }

    try:
        
        crew_instance = MedicalDiagnosticCrew()
        
        from crewai import Crew, Process
        
        triage_crew = Crew(
            agents=[crew_instance.general_practitioner()],
            tasks=[crew_instance.triage_task()],
            process=Process.sequential,
            verbose=True
        )
        
        triage_result = triage_crew.kickoff(inputs=inputs)
        
        print("\n" + "="*80)
        print("TRIAGE COMPLETED")
        print("="*80)
        print(triage_result)
        
        triage_text = str(triage_result).upper()
        
        if "CARDIOLOGY" in triage_text:
            print("\n" + "="*80)
            print("REFFERED TO CARDIOLOGY")
            print("="*80)
            

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
            
            result = cardiology_crew.kickoff(inputs=inputs)
            
        elif "DENTISTRY" in triage_text or "DENTAL" in triage_text:
            print("\n" + "="*80)
            print("REFFERED TO DENTISTRY")
            print("="*80)
            

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
            
            result = dentistry_crew.kickoff(inputs=inputs)

        elif "OB" in triage_text or "GYN" in triage_text or "OBSTETRIC" in triage_text or "GYNECOLOG" in triage_text or "OB-GYN" in triage_text:
            print("\n" + "="*80)
            print("REFERRED TO OB-GYN")
            print("="*80)
            
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
            
            result = obgyn_crew.kickoff(inputs=inputs)
        
        elif "OPHTHALMOLOGY" in triage_text or "OPHTHALMO" in triage_text or "EYE" in triage_text:
            print("\n" + "="*80)
            print("REFERRED TO OPHTHALMOLOGY")
            print("="*80)
            
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
            
            result = ophthalmology_crew.kickoff(inputs=inputs)

        elif "ORTHOPAEDIC" in triage_text or "ORTHOPEDIC" in triage_text or "ORTHO" in triage_text:
            print("\n" + "="*80)
            print("REFERRED TO ORTHOPAEDICS")
            print("="*80)
            
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
            
            result = orthopaedic_crew.kickoff(inputs=inputs)

        else:
            print("\n Triage result unclear. Please check triage_decision.md")
            return
        
        print("\n" + "="*80)
        print("DIAGNOSTIC PROCESS COMPLETED")
        print("="*80)
        
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")

if __name__ == "__main__":
    run()
