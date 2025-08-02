#!/usr/bin/env python3
"""
Add sample data to the portfolio API for demonstration
"""

import requests
import json

BACKEND_URL = "http://localhost:8001"
API_BASE = f"{BACKEND_URL}/api"

def add_sample_project():
    project_data = {
        "title": "AI-Powered Chatbot",
        "description": "An intelligent chatbot using natural language processing and machine learning to provide helpful responses and automate customer service tasks.",
        "technologies": ["Python", "OpenAI API", "FastAPI", "React"],
        "github_url": "https://github.com/johnyohannan/ai-chatbot",
        "demo_url": "https://chatbot.johnyohannan.dev",
        "image_url": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&q=80",
        "category": "AI/ML",
        "featured": True
    }
    
    response = requests.post(f"{API_BASE}/projects", json=project_data)
    if response.status_code == 200:
        print("✅ Added sample project")
        return response.json()
    else:
        print(f"❌ Failed to add project: {response.text}")
        return None

def add_sample_certification():
    cert_data = {
        "title": "Machine Learning Specialization",
        "issuer": "Stanford University - Coursera",
        "date_earned": "2024",
        "credential_id": "COURSERA_ML_2024",
        "credential_url": "https://coursera.org/verify/specialization/ML2024",
        "badge_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    }
    
    response = requests.post(f"{API_BASE}/certifications", json=cert_data)
    if response.status_code == 200:
        print("✅ Added sample certification")
        return response.json()
    else:
        print(f"❌ Failed to add certification: {response.text}")
        return None

def add_sample_artwork():
    artwork_data = {
        "title": "Neural Network Visualization",
        "description": "Digital art representing the flow of information through a neural network, created using generative algorithms.",
        "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        "category": "Digital",
        "medium": "Digital Art",
        "year_created": "2024"
    }
    
    response = requests.post(f"{API_BASE}/artwork", json=artwork_data)
    if response.status_code == 200:
        print("✅ Added sample artwork")
        return response.json()
    else:
        print(f"❌ Failed to add artwork: {response.text}")
        return None

if __name__ == "__main__":
    print("🚀 Adding sample data to portfolio...")
    
    # Test API health first
    try:
        health = requests.get(f"{API_BASE}/health")
        if health.status_code == 200:
            print("✅ API is healthy")
        else:
            print("❌ API health check failed")
            exit(1)
    except Exception as e:
        print(f"❌ Cannot connect to API: {e}")
        exit(1)
    
    # Add sample data
    add_sample_project()
    add_sample_certification()
    add_sample_artwork()
    
    print("✅ Sample data added successfully!")
    print(f"🌐 Portfolio API is ready at: {API_BASE}")