package com.team.gyemoim.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
public class FileUploadConfig {

    /* 파일 업로드 처리를 위한 `MultipartResolver` 와
    * 업로드 경로를 설정하는 빈(Bean) 정의하고 있음. */


    // `upload.path` 라는 속성 값을 가져오기 위해 사용함
    // 해당 속성은 외부 설정 파일 (application.yml) 에서 설정되어야 함
    @Value("${upload.path}")
    private String uploadPath;

    // `MultipartResolver` 생성하는 메서드
    // 파일 업로드 요청을 처리하기 위한 MultipartResolver 를 설정하고 있다.
    @Bean
    public MultipartResolver multipartResolver() {
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        resolver.setMaxUploadSize(10485760);
        return resolver;
    }

    // 업로드된 파일이 저장될 경로를 설정하기 위한 메서드
    // `uploadPath` 변수에 저장된 값 반환
    @Bean
    public String uploadPath() {
        return uploadPath;
    }
}
