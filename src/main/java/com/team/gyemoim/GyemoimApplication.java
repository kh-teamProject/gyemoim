package com.team.gyemoim;

import com.team.gyemoim.config.RedisConnectionChecker;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
@RequiredArgsConstructor
public class GyemoimApplication {

	private final RedisConnectionChecker redisConnectionChecker;

	public static void main(String[] args) {
		SpringApplication.run(GyemoimApplication.class, args);
	}


	@PostConstruct
	public void checkRedisOnStartup() {
		redisConnectionChecker.checkRedisConnection();
	}

}
