package com.example.demo.model;

public class Doctor {
    private Long id;
    private String name;
    private String specialization;
    private String clinicName;
    private String location;
    private String area;
    private int experience;
    private double consultationFee;
    private int rating;
    private int patientStories;
    private boolean availableToday;
    private String profileImage;
    private boolean isAd;
    
    // Constructors
    public Doctor() {}
    
    public Doctor(Long id, String name, String specialization, String clinicName, 
                  String location, String area, int experience, double consultationFee, 
                  int rating, int patientStories, boolean availableToday, 
                  String profileImage, boolean isAd) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.clinicName = clinicName;
        this.location = location;
        this.area = area;
        this.experience = experience;
        this.consultationFee = consultationFee;
        this.rating = rating;
        this.patientStories = patientStories;
        this.availableToday = availableToday;
        this.profileImage = profileImage;
        this.isAd = isAd;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    
    public String getClinicName() { return clinicName; }
    public void setClinicName(String clinicName) { this.clinicName = clinicName; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
    
    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }
    
    public double getConsultationFee() { return consultationFee; }
    public void setConsultationFee(double consultationFee) { this.consultationFee = consultationFee; }
    
    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
    
    public int getPatientStories() { return patientStories; }
    public void setPatientStories(int patientStories) { this.patientStories = patientStories; }
    
    public boolean isAvailableToday() { return availableToday; }
    public void setAvailableToday(boolean availableToday) { this.availableToday = availableToday; }
    
    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }
    
    public boolean isAd() { return isAd; }
    public void setAd(boolean ad) { isAd = ad; }
}