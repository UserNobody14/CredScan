from dotenv import load_dotenv
import os
from langchain_text_splitters import (
    HTMLHeaderTextSplitter,
    RecursiveCharacterTextSplitter,
)
from pymilvus import Collection, connections, CollectionSchema, FieldSchema, DataType
from langchain_community.vectorstores import Milvus
from langchain_community.embeddings import OctoAIEmbeddings
from langchain_community.llms.octoai_endpoint import OctoAIEndpoint
from langchain_core.documents import Document
import uuid

llm = OctoAIEndpoint(
    model_kwargs={
        "model": "mixtral-8x7b-instruct-fp16",
        "max_tokens": 200,
        "presence_penalty": 0,
        "temperature": 0.1,
        "top_p": 0.9,
    }
)
embeddings = OctoAIEmbeddings(endpoint_url="https://text.octoai.run/v1/embeddings")

# connections.connect(alias="default", host="localhost", port="19530")

vector_store = Milvus(
    #     splits,
    embeddings,
    connection_args={"host": "localhost", "port": 19530},
    collection_name="linkedin",
)

load_dotenv()
# OPENAI_API_KEY = os.environ["OPENAI_API_TOKEN"]
OCTOAI_API_TOKEN = os.environ["OCTOAI_API_TOKEN"]

default_info = {
    "name": "John Doe",
    "title": "Software Engineer",
    "location": "San Francisco, CA",
    "connections": 500,
    "summary": "Experienced software engineer with a passion for building great products.",
    "experience": [
        {
            "title": "Software Engineer",
            "company": "Google",
            "dates": "2015 - Present",
            "location": "Mountain View, CA",
            "description": "Worked on various projects to improve search results.",
        },
        {
            "title": "Software Engineer Intern",
            "company": "Facebook",
            "dates": "2014",
            "location": "Menlo Park, CA",
            "description": "Worked on the Messenger app.",
        },
    ],
    "education": [
        {
            "school": "Stanford University",
            "degree": "Bachelor of Science in Computer Science",
            "dates": "2011 - 2015",
        }
    ],
    "skills": ["Python", "Java", "C++", "JavaScript"],
}


def scrape_linkedin(info):
    """
    Scrapes LinkedIn for the given information
    :param info: dictionary of the following items:
        - linkedin_url: URL of the LinkedIn profile
        - unique_id: unique ID of the person
    :return: dictionary of the following items:
        - name: name of the person
        - title: title of the person
        - location: location of the person
        - connections: number of connections
        - summary: summary of the person
        - experience: list of experiences
        - education: list of educations
        - skills: list of skills
    """
    # Code to scrape LinkedIn
    # url = "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)?oauth2_access_token={ACCESS_TOKEN}"
    # response = requests.get(url)
    url = info["linkedin_url"]

    headers_to_split_on = [
        ("h1", "Header 1"),
        ("h2", "Header 2"),
        ("h3", "Header 3"),
        ("h4", "Header 4"),
        ("div", "Divider"),
    ]

    html_splitter = HTMLHeaderTextSplitter(
        headers_to_split_on=headers_to_split_on,
        # metadata=info["unique_id"]
    )

    # for local file use html_splitter.split_text_from_file(<path_to_file>)
    html_header_splits = html_splitter.split_text_from_url(url)
    print(f"Number of splits: {len(html_header_splits)}")
    chunk_size = 1024
    chunk_overlap = 128
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        # metadata={"unique_id": info["unique_id"]},
    )

    # Split
    splits = text_splitter.split_documents(html_header_splits)
    docs = []
    texts = []
    metadatas = []

    my_ids = []
    for split in splits:
        idv = str(uuid.uuid4())
        print(f"Split ID: {idv}")
        my_ids.append(idv)
        texts.append(split.page_content)
        metadatas.append({"unique_id": info["unique_id"]})
        doc = Document(
            id=idv,
            page_content=split.page_content,
            metadata={"unique_id_u": info["unique_id"]},
        )
        docs.append(doc)
    # Search pks (primary keys) using expression
    # expr = "id not in [1,2]"
    # pks = vector_store.get_pks(expr)
    # mr = vector_store.upsert(pks, docs, auto_id=True)
    mr = vector_store.add_texts(texts=texts, metadatas=metadatas, ids=my_ids)
    return mr


def respond_with_info(info):
    # This will only get documents for Harrison
    vector_store.as_retriever(
        search_kwargs={"expr": f'unique_id == "{info["unique_id"]}"'}
    ).invoke("where did i work?")
