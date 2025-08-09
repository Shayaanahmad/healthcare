package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {
    
    @Autowired
    private DoctorService doctorService;
    
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchDoctors(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false, defaultValue = "relevance") String sortBy,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String experience) {
        
        List<Doctor> doctors = doctorService.searchDoctors(location, specialization, 
                                                          sortBy, gender, experience);
        long totalCount = doctorService.getTotalCount(location, specialization);
        
        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors);
        response.put("totalCount", totalCount);
        response.put("location", location);
        response.put("specialization", specialization);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/popular-searches")
    public ResponseEntity<List<String>> getPopularSearches() {
        List<String> popularSearches = Arrays.asList(
            "Dermatologist", "Pediatrician", "Gynecologist/Obstetrician", "Other"
        );
        return ResponseEntity.ok(popularSearches);
    }
}