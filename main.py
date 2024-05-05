from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl, validator
from uuid import uuid4

from extractor.extract import extract_all_safe
from scraper.scraper import scrape_website
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Profile(BaseModel):
    github_url: HttpUrl
    name: str
    linkedin_url: HttpUrl

    @validator("github_url")
    def validate_github_url(cls, v):
        if "github.com" not in v.host:
            raise ValueError("The URL must be a valid GitHub profile URL")
        return v

    @validator("linkedin_url")
    def validate_linkedin_url(cls, v):
        # if "linkedin.com/in/" not in v.host + v.path:
        #     raise ValueError("The URL must be a valid LinkedIn profile URL")
        return v


class ProfileResponse(BaseModel):
    profile_id: str
    name: str
    summary: str
    highlights: list[str]
    strengths: str


@app.post("/profile/", response_model=ProfileResponse)
async def scan_profile(profile: Profile):
    try:
        # Generate a unique UUID for the profile
        profile_id = str(uuid4())
        # Call the scraper function
        gv = scrape_website(
            {"website_url": profile.github_url, "unique_id": profile_id}
        )
        github_info = extract_all_safe(
            {
                "website_url": profile.github_url,
                "unique_id": profile_id,
                "name": profile.name,
            }
        )
        return {
            "profile_id": profile_id,
            "name": github_info["name"],
            "summary": github_info["summary"],
            "highlights": github_info["highlights"],
            "strengths": github_info["strengths"],
        }
        # linkedin_info = scrape_website({
        #     "website_url": profile.linkedin_url,
        #     "unique_id": profile_id
        # })
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
