from scraper import llm
from scraper import vector_db

from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

from langchain.prompts import ChatPromptTemplate

vector_store = vector_db.vector_store

template = """You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
Question: {question} 
Context: {context} 
Answer:"""
prompt = ChatPromptTemplate.from_template(template)


def extract_github_summary(info):
    # This will only get documents for Harrison
    profile_id = info["unique_id"]
    retriever = vector_store.as_retriever(
        search_kwargs={"expr": f'unique_id == "{profile_id}"'}
    )
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm.llm
        | StrOutputParser()
    )
    return chain.invoke("Summarize the experience of the person in the given context.")


def extract_github_highlight(info):
    # This will only get documents for Harrison
    profile_id = info["unique_id"]
    retriever = vector_store.as_retriever(
        search_kwargs={"expr": f'unique_id == "{profile_id}"'}
    )
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm.llm
        | StrOutputParser()
    )
    return chain.invoke(
        "Highlight the key achievements of the person in the given context."
    )


def extract_github_name(info):
    # This will only get documents for Harrison
    profile_id = info["unique_id"]
    retriever = vector_store.as_retriever(
        search_kwargs={"expr": f'unique_id == "{profile_id}"'}
    )
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm.llm
        | StrOutputParser()
    )
    return chain.invoke("What is the name of the person in the given context.")


def extract_github_strengths(info):
    # This will only get documents for Harrison
    profile_id = info["unique_id"]
    retriever = vector_store.as_retriever(
        search_kwargs={"expr": f'unique_id == "{profile_id}"'}
    )
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm.llm
        | StrOutputParser()
    )
    return chain.invoke("What are the strengths of the person in the given context.")


def extract_all_safe(info):
    try:
        return {
            "summary": extract_github_summary(info),
            "highlights": extract_github_highlight(info),
            "name": info["name"] or extract_github_name(info),
            "strengths": extract_github_strengths(info),
        }
    except Exception as e:
        print(e)
        return {
            "summary": "I don't know.",
            "highlights": "I don't know.",
            "name": "I don't know.",
            "strengths": "I don't know.",
        }
