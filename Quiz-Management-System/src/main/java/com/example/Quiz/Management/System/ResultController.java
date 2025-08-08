package com.example.Quiz.Management.System;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitResult(@RequestBody ResultDto resultDto) {
        Result result = new Result();
        result.setScore(resultDto.getScore());
        result.setUserId(resultDto.getUserId());

        resultService.saveResult(result);

        return ResponseEntity.ok("Result submitted successfully");
    }

}


