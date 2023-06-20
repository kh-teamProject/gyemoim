package com.team.gyemoim.config;

import com.team.gyemoim.controller.MemberController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.stereotype.Component;

@Component
public class RedisConnectionChecker {

    private final RedisConnectionFactory redisConnectionFactory;

    private final Logger logger = LoggerFactory.getLogger(RedisConnectionChecker.class);

    @Autowired
    public RedisConnectionChecker(RedisConnectionFactory redisConnectionFactory) {
        this.redisConnectionFactory = redisConnectionFactory;
    }

    public void checkRedisConnection() {
        try {
            redisConnectionFactory.getConnection();
            logger.info("Redis 연결 확인: 성공");
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Redis 연결 확인: 실패");
        }
    }
}