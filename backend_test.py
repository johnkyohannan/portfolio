#!/usr/bin/env python3
"""
Portfolio Backend API Test Suite
Tests all FastAPI endpoints for the portfolio website
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any

# Backend URL from environment
BACKEND_URL = "http://localhost:8001"
API_BASE = f"{BACKEND_URL}/api"

class PortfolioAPITester:
    def __init__(self):
        self.test_results = []
        self.created_ids = {
            'projects': [],
            'certifications': [],
            'artwork': [],
            'contact': []
        }
    
    def log_test(self, test_name: str, success: bool, message: str, response_data: Any = None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'message': message,
            'response_data': response_data
        })
    
    def test_health_check(self):
        """Test health check endpoint"""
        try:
            response = requests.get(f"{API_BASE}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 'healthy':
                    self.log_test("Health Check", True, f"API is healthy, database: {data.get('database')}")
                else:
                    self.log_test("Health Check", False, f"API unhealthy: {data}")
            else:
                self.log_test("Health Check", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
    
    def test_projects_get(self):
        """Test GET /api/projects"""
        try:
            # Test getting all projects
            response = requests.get(f"{API_BASE}/projects", timeout=10)
            
            if response.status_code == 200:
                projects = response.json()
                self.log_test("GET Projects", True, f"Retrieved {len(projects)} projects")
                
                # Test featured projects filter
                response_featured = requests.get(f"{API_BASE}/projects?featured_only=true", timeout=10)
                if response_featured.status_code == 200:
                    featured_projects = response_featured.json()
                    self.log_test("GET Featured Projects", True, f"Retrieved {len(featured_projects)} featured projects")
                else:
                    self.log_test("GET Featured Projects", False, f"HTTP {response_featured.status_code}")
            else:
                self.log_test("GET Projects", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("GET Projects", False, f"Error: {str(e)}")
    
    def test_projects_post(self):
        """Test POST /api/projects"""
        try:
            project_data = {
                "title": "AI-Powered Image Recognition System",
                "description": "A deep learning model that can classify and detect objects in images using TensorFlow and OpenCV. Features real-time processing and 95% accuracy on test datasets.",
                "technologies": ["Python", "TensorFlow", "OpenCV", "Flask", "Docker"],
                "github_url": "https://github.com/johnyohannan/ai-image-recognition",
                "demo_url": "https://ai-demo.johnyohannan.dev",
                "image_url": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
                "category": "AI/ML",
                "featured": True
            }
            
            response = requests.post(f"{API_BASE}/projects", json=project_data, timeout=10)
            
            if response.status_code == 200:
                created_project = response.json()
                project_id = created_project.get('id')
                if project_id:
                    self.created_ids['projects'].append(project_id)
                    self.log_test("POST Project", True, f"Created project with ID: {project_id}")
                    
                    # Test getting the specific project
                    get_response = requests.get(f"{API_BASE}/projects/{project_id}", timeout=10)
                    if get_response.status_code == 200:
                        self.log_test("GET Project by ID", True, f"Retrieved project: {created_project.get('title')}")
                    else:
                        self.log_test("GET Project by ID", False, f"HTTP {get_response.status_code}")
                else:
                    self.log_test("POST Project", False, "No ID returned in response")
            else:
                self.log_test("POST Project", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("POST Project", False, f"Error: {str(e)}")
    
    def test_certifications_get(self):
        """Test GET /api/certifications"""
        try:
            response = requests.get(f"{API_BASE}/certifications", timeout=10)
            
            if response.status_code == 200:
                certifications = response.json()
                self.log_test("GET Certifications", True, f"Retrieved {len(certifications)} certifications")
            else:
                self.log_test("GET Certifications", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("GET Certifications", False, f"Error: {str(e)}")
    
    def test_certifications_post(self):
        """Test POST /api/certifications"""
        try:
            cert_data = {
                "title": "Machine Learning Specialization",
                "issuer": "Stanford University (Coursera)",
                "date_earned": "2024",
                "credential_id": "ML2024STANFORD",
                "credential_url": "https://coursera.org/verify/specialization/ML2024STANFORD",
                "badge_url": "https://images.credly.com/size/340x340/images/ml-badge.png"
            }
            
            response = requests.post(f"{API_BASE}/certifications", json=cert_data, timeout=10)
            
            if response.status_code == 200:
                created_cert = response.json()
                cert_id = created_cert.get('id')
                if cert_id:
                    self.created_ids['certifications'].append(cert_id)
                    self.log_test("POST Certification", True, f"Created certification: {created_cert.get('title')}")
                else:
                    self.log_test("POST Certification", False, "No ID returned in response")
            else:
                self.log_test("POST Certification", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("POST Certification", False, f"Error: {str(e)}")
    
    def test_artwork_get(self):
        """Test GET /api/artwork"""
        try:
            response = requests.get(f"{API_BASE}/artwork", timeout=10)
            
            if response.status_code == 200:
                artwork = response.json()
                self.log_test("GET Artwork", True, f"Retrieved {len(artwork)} artwork pieces")
            else:
                self.log_test("GET Artwork", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("GET Artwork", False, f"Error: {str(e)}")
    
    def test_artwork_post(self):
        """Test POST /api/artwork"""
        try:
            artwork_data = {
                "title": "Neural Network Visualization",
                "description": "A digital art piece visualizing the layers and connections in a deep neural network, created using Processing and custom algorithms.",
                "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
                "category": "Digital",
                "medium": "Digital Art - Processing",
                "year_created": "2024"
            }
            
            response = requests.post(f"{API_BASE}/artwork", json=artwork_data, timeout=10)
            
            if response.status_code == 200:
                created_artwork = response.json()
                artwork_id = created_artwork.get('id')
                if artwork_id:
                    self.created_ids['artwork'].append(artwork_id)
                    self.log_test("POST Artwork", True, f"Created artwork: {created_artwork.get('title')}")
                else:
                    self.log_test("POST Artwork", False, "No ID returned in response")
            else:
                self.log_test("POST Artwork", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("POST Artwork", False, f"Error: {str(e)}")
    
    def test_about_get(self):
        """Test GET /api/about"""
        try:
            response = requests.get(f"{API_BASE}/about", timeout=10)
            
            if response.status_code == 200:
                about = response.json()
                self.log_test("GET About", True, f"Retrieved about info: {about.get('bio', '')[:50]}...")
            else:
                self.log_test("GET About", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("GET About", False, f"Error: {str(e)}")
    
    def test_about_put(self):
        """Test PUT /api/about"""
        try:
            about_data = {
                "bio": "Passionate AI Developer and Creative Technologist with expertise in machine learning, deep learning, and full-stack development. Currently pursuing advanced studies in artificial intelligence while building innovative projects that bridge technology and creativity.",
                "profile_image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
                "skills": [
                    "Python", "TensorFlow", "PyTorch", "React", "FastAPI", 
                    "MongoDB", "Docker", "AWS", "Machine Learning", "Deep Learning",
                    "Computer Vision", "NLP", "Digital Art", "UI/UX Design"
                ],
                "social_links": {
                    "github": "https://github.com/johnyohannan",
                    "linkedin": "https://linkedin.com/in/johnyohannan",
                    "twitter": "https://twitter.com/johnyohannan",
                    "portfolio": "https://johnyohannan.dev"
                },
                "resume_url": "https://johnyohannan.dev/resume.pdf"
            }
            
            response = requests.put(f"{API_BASE}/about", json=about_data, timeout=10)
            
            if response.status_code == 200:
                updated_about = response.json()
                self.log_test("PUT About", True, f"Updated about info with {len(updated_about.get('skills', []))} skills")
            else:
                self.log_test("PUT About", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("PUT About", False, f"Error: {str(e)}")
    
    def test_contact_post(self):
        """Test POST /api/contact"""
        try:
            contact_data = {
                "name": "Sarah Johnson",
                "email": "sarah.johnson@techcorp.com",
                "subject": "Collaboration Opportunity",
                "message": "Hi John, I came across your portfolio and I'm impressed with your AI projects. We have an exciting machine learning project at TechCorp and would love to discuss a potential collaboration. Could we schedule a call this week?"
            }
            
            response = requests.post(f"{API_BASE}/contact", json=contact_data, timeout=10)
            
            if response.status_code == 200:
                created_message = response.json()
                message_id = created_message.get('id')
                if message_id:
                    self.created_ids['contact'].append(message_id)
                    self.log_test("POST Contact", True, f"Submitted contact message from: {created_message.get('name')}")
                else:
                    self.log_test("POST Contact", False, "No ID returned in response")
            else:
                self.log_test("POST Contact", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("POST Contact", False, f"Error: {str(e)}")
    
    def test_contact_get(self):
        """Test GET /api/contact"""
        try:
            response = requests.get(f"{API_BASE}/contact", timeout=10)
            
            if response.status_code == 200:
                messages = response.json()
                self.log_test("GET Contact Messages", True, f"Retrieved {len(messages)} contact messages")
            else:
                self.log_test("GET Contact Messages", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("GET Contact Messages", False, f"Error: {str(e)}")
    
    def test_error_handling(self):
        """Test error handling for invalid requests"""
        try:
            # Test invalid project ID
            response = requests.get(f"{API_BASE}/projects/invalid-id", timeout=10)
            if response.status_code == 404:
                self.log_test("Error Handling - Invalid Project ID", True, "Correctly returned 404 for invalid project ID")
            else:
                self.log_test("Error Handling - Invalid Project ID", False, f"Expected 404, got {response.status_code}")
            
            # Test invalid POST data
            invalid_project = {"title": ""}  # Missing required fields
            response = requests.post(f"{API_BASE}/projects", json=invalid_project, timeout=10)
            if response.status_code in [400, 422]:
                self.log_test("Error Handling - Invalid POST Data", True, f"Correctly returned {response.status_code} for invalid data")
            else:
                self.log_test("Error Handling - Invalid POST Data", False, f"Expected 400/422, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Error Handling", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Portfolio Backend API Tests")
        print(f"📡 Testing API at: {API_BASE}")
        print("=" * 60)
        
        # Test all endpoints
        self.test_health_check()
        self.test_projects_get()
        self.test_projects_post()
        self.test_certifications_get()
        self.test_certifications_post()
        self.test_artwork_get()
        self.test_artwork_post()
        self.test_about_get()
        self.test_about_put()
        self.test_contact_post()
        self.test_contact_get()
        self.test_error_handling()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"✅ Passed: {passed}/{total}")
        print(f"❌ Failed: {total - passed}/{total}")
        
        if total - passed > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  • {result['test']}: {result['message']}")
        
        print(f"\n📝 Created test data:")
        for category, ids in self.created_ids.items():
            if ids:
                print(f"  • {category}: {len(ids)} items")
        
        return passed == total

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! Backend API is working correctly.")
        sys.exit(0)
    else:
        print("\n⚠️  Some tests failed. Check the output above for details.")
        sys.exit(1)