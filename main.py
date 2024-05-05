from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl, validator
from uuid import uuid4

app = FastAPI()

class Profile(BaseModel):
    github_url: HttpUrl
    linkedin_url: HttpUrl

    @validator('github_url')
    def validate_github_url(cls, v):
        if "github.com" not in v.host:
            raise ValueError('The URL must be a valid GitHub profile URL')
        return v

    @validator('linkedin_url')
    def validate_linkedin_url(cls, v):
        if "linkedin.com/in/" not in v.host + v.path:
            raise ValueError('The URL must be a valid LinkedIn profile URL')
        return v

@app.post("/profile/")
async def create_profile(profile: Profile):
    try:
        # Generate a unique UUID for the profile
        profile_id = str(uuid4())
        return {
            "github_url": profile.github_url,
            "linkedin_url": profile.linkedin_url,
            "id": profile_id
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
