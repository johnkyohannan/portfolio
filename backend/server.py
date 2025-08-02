from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
import uuid
from datetime import datetime
from pymongo import MongoClient
from pymongo.collection import Collection
import certifi

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client.portfolio_db

# Collections
projects_collection = db.projects
certifications_collection = db.certifications
artwork_collection = db.artwork
about_collection = db.about
contact_collection = db.contact

# Pydantic models
class Project(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    category: str  # "AI/ML", "Web", "Mobile", etc.
    featured: bool = False
    created_at: Optional[datetime] = None

class Certification(BaseModel):
    id: Optional[str] = None
    title: str
    issuer: str
    date_earned: str
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None
    badge_url: Optional[str] = None
    created_at: Optional[datetime] = None

class Artwork(BaseModel):
    id: Optional[str] = None
    title: str
    description: Optional[str] = None
    image_url: str
    category: str  # "Digital", "Traditional", "3D", etc.
    medium: Optional[str] = None
    year_created: Optional[str] = None
    created_at: Optional[datetime] = None

class AboutMe(BaseModel):
    id: Optional[str] = None
    bio: str
    profile_image_url: Optional[str] = None
    skills: List[str]
    social_links: Dict[str, str]  # {"github": "url", "linkedin": "url", etc.}
    resume_url: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class ContactMessage(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    created_at: Optional[datetime] = None

# Helper function to convert MongoDB document to dict
def document_to_dict(doc):
    if doc:
        doc['id'] = str(doc.pop('_id', ''))
        return doc
    return None

# Projects endpoints
@app.get("/api/projects", response_model=List[Project])
async def get_projects(featured_only: bool = False):
    """Get all projects or only featured ones"""
    filter_query = {"featured": True} if featured_only else {}
    projects = list(projects_collection.find(filter_query).sort("created_at", -1))
    return [document_to_dict(project) for project in projects]

@app.post("/api/projects", response_model=Project)
async def create_project(project: Project):
    """Create a new project"""
    project_dict = project.dict()
    project_dict['id'] = str(uuid.uuid4())
    project_dict['created_at'] = datetime.utcnow()
    
    result = projects_collection.insert_one(project_dict)
    if result.inserted_id:
        return project_dict
    raise HTTPException(status_code=400, detail="Failed to create project")

@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a specific project by ID"""
    project = projects_collection.find_one({"id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return document_to_dict(project)

# Certifications endpoints
@app.get("/api/certifications", response_model=List[Certification])
async def get_certifications():
    """Get all certifications"""
    certifications = list(certifications_collection.find().sort("date_earned", -1))
    return [document_to_dict(cert) for cert in certifications]

@app.post("/api/certifications", response_model=Certification)
async def create_certification(certification: Certification):
    """Create a new certification"""
    cert_dict = certification.dict()
    cert_dict['id'] = str(uuid.uuid4())
    cert_dict['created_at'] = datetime.utcnow()
    
    result = certifications_collection.insert_one(cert_dict)
    if result.inserted_id:
        return cert_dict
    raise HTTPException(status_code=400, detail="Failed to create certification")

# Artwork endpoints
@app.get("/api/artwork", response_model=List[Artwork])
async def get_artwork():
    """Get all artwork pieces"""
    artwork = list(artwork_collection.find().sort("created_at", -1))
    return [document_to_dict(art) for art in artwork]

@app.post("/api/artwork", response_model=Artwork)
async def create_artwork(artwork: Artwork):
    """Create a new artwork piece"""
    art_dict = artwork.dict()
    art_dict['id'] = str(uuid.uuid4())
    art_dict['created_at'] = datetime.utcnow()
    
    result = artwork_collection.insert_one(art_dict)
    if result.inserted_id:
        return art_dict
    raise HTTPException(status_code=400, detail="Failed to create artwork")

# About Me endpoints
@app.get("/api/about", response_model=AboutMe)
async def get_about():
    """Get about me information"""
    about = about_collection.find_one()
    if not about:
        # Return default about info if none exists
        return AboutMe(
            id="default",
            bio="AI Developer & Creative Technologist passionate about building intelligent systems and creating digital art.",
            skills=["Python", "Machine Learning", "Deep Learning", "React", "FastAPI", "Digital Art"],
            social_links={"github": "", "linkedin": "", "twitter": ""}
        )
    return document_to_dict(about)

@app.put("/api/about", response_model=AboutMe)
async def update_about(about: AboutMe):
    """Update about me information"""
    about_dict = about.dict()
    about_dict['updated_at'] = datetime.utcnow()
    
    existing = about_collection.find_one()
    if existing:
        about_dict['id'] = existing.get('id', str(uuid.uuid4()))
        about_collection.replace_one({"_id": existing["_id"]}, about_dict)
    else:
        about_dict['id'] = str(uuid.uuid4())
        about_dict['created_at'] = datetime.utcnow()
        about_collection.insert_one(about_dict)
    
    return about_dict

# Contact endpoints
@app.post("/api/contact", response_model=ContactMessage)
async def submit_contact(message: ContactMessage):
    """Submit a contact message"""
    message_dict = message.dict()
    message_dict['id'] = str(uuid.uuid4())
    message_dict['created_at'] = datetime.utcnow()
    
    result = contact_collection.insert_one(message_dict)
    if result.inserted_id:
        return message_dict
    raise HTTPException(status_code=400, detail="Failed to submit contact message")

@app.get("/api/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin only)"""
    messages = list(contact_collection.find().sort("created_at", -1))
    return [document_to_dict(msg) for msg in messages]

# Health check
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        client.admin.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)