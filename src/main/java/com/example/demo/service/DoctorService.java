package com.example.demo.service;

import com.example.demo.model.*;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DoctorService {
    
    private List<Doctor> doctors;
    
    public DoctorService() {
        initializeDoctors();
    }
    
    private void initializeDoctors() {
        doctors = Arrays.asList(
            new Doctor(1L, "Aesthetic Heart Dermatology & Cardiology Clinic", "Dermatologist", 
                      "Aesthetic Heart Dermatology & Cardiology Clinic", "JP Nagar, Bangalore", 
                      "Jayanagar", 12, 800.0, 97, 159, true, "clinic-logo.jpg", true),
            
            new Doctor(2L, "Dr. Sheelavathi Natraj", "Dermatologist", 
                      "Sapphire Skin And Aesthetics Clinic", "JP Nagar, Bangalore", 
                      "JP Nagar", 21, 800.0, 94, 1506, true, "doctor-profile.jpg", false),
            
            new Doctor(3L, "Dr. Rajesh Kumar", "Dermatologist", 
                      "SkinCare Clinic", "JP Nagar, Bangalore", 
                      "JP Nagar", 15, 600.0, 92, 856, true, "doctor-profile2.jpg", false),
            
            new Doctor(4L, "Dr. Priya Sharma", "Dermatologist", 
                      "Glow Dermatology Center", "JP Nagar, Bangalore", 
                      "Banashankari", 8, 500.0, 89, 432, false, "doctor-profile3.jpg", false),
            
            new Doctor(5L, "Dr. Amit Patel", "Dermatologist", 
                      "Clear Skin Clinic", "JP Nagar, Bangalore", 
                      "Koramangala", 18, 750.0, 95, 1200, true, "doctor-profile4.jpg", false)
        );
    }
    
    public List<Doctor> searchDoctors(String location, String specialization, 
                                    String sortBy, String gender, String experience) {
        List<Doctor> filteredDoctors = doctors.stream()
            .filter(doctor -> location == null || location.isEmpty() || 
                    doctor.getLocation().toLowerCase().contains(location.toLowerCase()))
            .filter(doctor -> specialization == null || specialization.isEmpty() || 
                    doctor.getSpecialization().toLowerCase().contains(specialization.toLowerCase()))
            .collect(Collectors.toList());
        
        // Sort by relevance (default), experience, or rating
        if ("experience".equals(sortBy)) {
            filteredDoctors.sort((d1, d2) -> Integer.compare(d2.getExperience(), d1.getExperience()));
        } else if ("rating".equals(sortBy)) {
            filteredDoctors.sort((d1, d2) -> Integer.compare(d2.getRating(), d1.getRating()));
        }
        
        return filteredDoctors;
    }
    
    public long getTotalCount(String location, String specialization) {
        return searchDoctors(location, specialization, null, null, null).size();
    }
}