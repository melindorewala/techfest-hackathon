from crewai import Agent, Crew, Process, Task, LLM
from crewai.tools import tool
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List
# If you want to run a snippet of code before or after the crew starts,
# you can use the @before_kickoff and @after_kickoff decorators
# https://docs.crewai.com/concepts/crews#example-crew-class-with-decorators

@CrewBase
class MedicalDiagnosticCrew():
    """MedicalDiagnosticCrew crew"""

    def __init__(self):
        self.llm = LLM(
            model="groq/llama-3.3-70b-versatile",
            temperature=0.3
        )

    agents: List[BaseAgent]
    tasks: List[Task]

    @tool("human_input_tool")
    def get_human_input(question: str) -> str:
        """
        Tool to get input from the patient during consultation.
        Use this when you need to ask the patient follow-up questions.
        """
        print(f"\n🏥 Doctor: {question}")
        response = input("👤 You: ")
        return response

    @tool("consult_colleague")
    def consult_colleague(question: str, context: str = "") -> str:
        """
        Tool to consult with a colleague (another doctor) about a case.
        Use this when you need to discuss a patient case, ask for second opinions,
        or engage in peer review discussions. This simulates real hospital consultations
        where doctors discuss cases together.
        
        Args:
            question: The question or topic you want to discuss with your colleague
            context: Additional context about the case or your concerns
        """
        # This will be handled by the task context - the other agent will see this
        consultation = f"COLLEAGUE CONSULTATION REQUEST:\nQuestion: {question}\nContext: {context}\n"
        print(f"\n💬 {consultation}")
        return consultation

    

    # Learn more about YAML configuration files here:
    # Agents: https://docs.crewai.com/concepts/agents#yaml-configuration-recommended
    # Tasks: https://docs.crewai.com/concepts/tasks#yaml-configuration-recommended
    
    # If you would like to add tools to your agents, you can learn more about it here:
    # https://docs.crewai.com/concepts/agents#agent-tools
    @agent
    def general_practitioner(self) -> Agent:
        return Agent(
            config=self.agents_config['general_practitioner'],
            llm=self.llm,
            verbose=True,
            tools=[self.get_human_input]
        )

    @agent
    def diagnosing_cardiologist(self) -> Agent:
        return Agent(
            config=self.agents_config['diagnosing_cardiologist'],
            llm=self.llm,
            verbose=True,
            tools=[self.get_human_input, self.consult_colleague]
        )

    @agent
    def peer_review_cardiologist(self) -> Agent:
        return Agent(
            config=self.agents_config['peer_review_cardiologist'],
            llm=self.llm,
            verbose=True,
            tools=[self.consult_colleague]
        )

    @agent
    def diagnosing_dentist(self) -> Agent:
        return Agent(
            config=self.agents_config['diagnosing_dentist'],
            llm=self.llm,
            verbose=True,
            tools=[self.get_human_input, self.consult_colleague]
        )

    @agent
    def peer_review_dentist(self) -> Agent:
        return Agent(
            config=self.agents_config['peer_review_dentist'],
            llm=self.llm,
            verbose=True,
            tools=[self.consult_colleague]
        )
    
    @agent
    def diagnosing_obgyn(self) -> Agent:
        return Agent(
            config=self.agents_config['diagnosing_obgyn'],
            llm=self.llm,
            verbose=True,
            tools=[self.get_human_input, self.consult_colleague]
        )

    @agent
    def peer_review_obgyn(self) -> Agent:
        return Agent(
            config=self.agents_config['peer_review_obgyn'],
            llm=self.llm,
            verbose=True,
            tools=[self.consult_colleague]
        )
    
    @agent
    def diagnosing_ophthalmologist(self) -> Agent:
        return Agent(
            config=self.agents_config['diagnosing_ophthalmologist'],
            llm=self.llm,
            verbose=True,
            tools=[self.get_human_input, self.consult_colleague]
        )

    @agent
    def peer_review_ophthalmologist(self) -> Agent:
        return Agent(
            config=self.agents_config['peer_review_ophthalmologist'],
            llm=self.llm,
            verbose=True,
            tools=[self.consult_colleague]
        )
    
    @agent
    def diagnosing_orthopaedic(self) -> Agent:
        return Agent(
            config=self.agents_config['diagnosing_orthopaedic'],
            llm=self.llm,
            verbose=True,
            tools=[self.get_human_input, self.consult_colleague]
        )

    @agent
    def peer_review_orthopaedic(self) -> Agent:
        return Agent(
            config=self.agents_config['peer_review_orthopaedic'],
            llm=self.llm,
            verbose=True,
            tools=[self.consult_colleague]
        )
    
    # To learn more about structured task outputs,
    # task dependencies, and task callbacks, check out the documentation:
    # https://docs.crewai.com/concepts/tasks#overview-of-a-task
    @task
    def triage_task(self) -> Task:
        return Task(
            config=self.tasks_config['triage_task'],
            output_file='triage_decision.md'
        )

    @task
    def cardiology_diagnosis_task(self) -> Task:
        return Task(
            config=self.tasks_config['cardiology_diagnosis_task'],
            output_file='cardiology_diagnosis.md'
        )

    @task
    def cardiology_peer_review_task(self) -> Task:
        return Task(
            config=self.tasks_config['cardiology_peer_review_task'],
            output_file='cardiology_peer_review.md'
        )

    @task
    def dentistry_diagnosis_task(self) -> Task:
        return Task(
            config=self.tasks_config['dentistry_diagnosis_task'],
            output_file='dentistry_diagnosis.md'
        )

    @task
    def dentistry_peer_review_task(self) -> Task:
        return Task(
            config=self.tasks_config['dentistry_peer_review_task'],
            output_file='dentistry_peer_review.md'
        )
    
    @task
    def obgyn_diagnosis_task(self) -> Task:
        return Task(
            config=self.tasks_config['obgyn_diagnosis_task'],
            output_file='obgyn_diagnosis.md'
        )

    @task
    def obgyn_peer_review_task(self) -> Task:
        return Task(
            config=self.tasks_config['obgyn_peer_review_task'],
            output_file='obgyn_peer_review.md'
        )

    @task
    def ophthalmology_diagnosis_task(self) -> Task:
        return Task(
            config=self.tasks_config['ophthalmology_diagnosis_task'],
            output_file='ophthalmology_diagnosis.md'
        )

    @task
    def ophthalmology_peer_review_task(self) -> Task:
        return Task(
            config=self.tasks_config['ophthalmology_peer_review_task'],
            output_file='ophthalmology_peer_review.md'
        )
    
    @task
    def orthopaedic_diagnosis_task(self) -> Task:
        return Task(
            config=self.tasks_config['orthopaedic_diagnosis_task'],
            output_file='ophthalmology_diagnosis.md'
        )

    @task
    def orthopaedic_peer_review_task(self) -> Task:
        return Task(
            config=self.tasks_config['orthopaedic_peer_review_task'],
            output_file='ophthalmology_peer_review.md'
        )

    @crew
    def crew(self) -> Crew:
        """Creates the Helloworld2 crew"""
        # To learn how to add knowledge sources to your crew, check out the documentation:
        # https://docs.crewai.com/concepts/knowledge#what-is-knowledge

        return Crew(
            agents=self.agents, # Automatically created by the @agent decorator
            tasks=self.tasks, # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
            # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
        )
