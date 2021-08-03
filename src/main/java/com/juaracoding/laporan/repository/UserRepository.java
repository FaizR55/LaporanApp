package com.juaracoding.laporan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.juaracoding.laporan.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query(value = "SELECT *\n"
			+ "from user\n"
			+ "Where (CASE "
			+ "WHEN 'name'=:type THEN name LIKE %:value% "
			+ "WHEN 'phone'=:type THEN phone LIKE %:value% "
			+ "WHEN 'address'=:type THEN address LIKE %:value% "
			+ "WHEN 'email'=:type THEN email LIKE %:value% "
			+ "WHEN 'password'=:type THEN password LIKE %:value% "
			+ "END)",nativeQuery=true)
	List<User> findBySearchBy(@Param("type")String type,@Param("value")String value);

	@Query(value="SELECT * from user where name=?1 and password=?2",nativeQuery = true)
	User findByLogin(String name, String password);
	
	User findByName(String name); 

}
