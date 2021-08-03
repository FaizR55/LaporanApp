package com.juaracoding.laporan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.laporan.repository.UserRepository;
import com.juaracoding.laporan.entity.User;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/")
	public List<User> getAll() {
		return userRepo.findAll();
	}

	@GetMapping("/login/")
	public User loginUser(@RequestParam("name")String name, @RequestParam("password") String password) {
		return userRepo.findByLogin(name, password);
	}

	@GetMapping("/searchby/{type}/{value}")
	public List<User> getSearchBy(@PathVariable("type")String type, @PathVariable("value") String value) {
		return userRepo.findBySearchBy(type, value);
	}

	@GetMapping("/name/{value}")
	public User getByName(@PathVariable("value") String value) {
		return userRepo.findByName(value);
	}

	@PostMapping("/register/")
	public String addUser(@RequestBody User user) {
		userRepo.save(user);
		return "Insert Berhasil";
	}
	
	@PostMapping("/register/{id}")
	public String updateUser(@PathVariable String id, @RequestBody User user) {
		user.setId(Long.parseLong(id));
		userRepo.save(user);
		return "Update Berhasil";
	}

}
