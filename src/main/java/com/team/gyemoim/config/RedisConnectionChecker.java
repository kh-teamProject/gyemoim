package com.team.gyemoim.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.stereotype.Component;

@Component
public class RedisConnectionChecker {

    private final RedisConnectionFactory redisConnectionFactory;

    @Autowired
    public RedisConnectionChecker(RedisConnectionFactory redisConnectionFactory) {
        this.redisConnectionFactory = redisConnectionFactory;
    }

    public void checkRedisConnection() {
        try {
            redisConnectionFactory.getConnection();
            System.out.println("Redis 연결 확인: 성공");
        } catch (Exception e) {
            System.out.println("Redis 연결 확인: 실패");
            e.printStackTrace();
        }
    }
}