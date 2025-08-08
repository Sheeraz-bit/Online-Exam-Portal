package com.example.Quiz.Management.System;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	// Get all questions
    @GetMapping("/all")
    public List<User> getAllUser() {
        return userService.getAllUser();
    }
    
    //Sign up
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
    	return userService.registerUser(user);
    }
    
    //Login
    @PostMapping("/login")
    public  User login(@RequestBody LoginRequest request) {
    	return userService.loginUser(request.getEmail(), request.getPassword());
    }
    
    //Check if user is already attempted the exam
    @GetMapping("/attempted/{id}")
    public boolean hasAttempted(@PathVariable Long id) {
    	User user = userService.findById(id);
    	return user != null && user.isAttemptedExam();
    }
    
    
    //update attempted exam
    @PutMapping("/attempted/{id}")
    public void updateAttempted(@PathVariable Long id) {
    	userService.updateAttemptedExam(id, true);
    }
    
}
