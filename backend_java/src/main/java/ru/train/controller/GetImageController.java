package ru.train.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/image")
@Tag(name = "User Image Controller", description = "Get User Image And resend to Flask server")
public class GetImageController {

    @Value("${flask.server.url}")
    private String flaskServerUrl;

    private final RestTemplate restTemplate;

    public GetImageController() {
        this.restTemplate = new RestTemplate();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Upload an image and resize it to 300x300 pixels",
            description = "This endpoint uploads an image, sends it to a Flask server for resizing, and returns the resized image.",
            requestBody = @RequestBody(content = @Content(mediaType = "multipart/form-data",
                    schema = @Schema(implementation = UploadImageRequest.class))))
    public ResponseEntity<UploadImageResponse> getImage(@RequestPart("image") MultipartFile image) {
        log.info("Get image with name {}", image.getOriginalFilename());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", image.getResource());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<UploadImageResponse> response = restTemplate.postForEntity(flaskServerUrl + "/resize", requestEntity, UploadImageResponse.class);

        return ResponseEntity.ok().body(response.getBody());
    }

    public static class UploadImageRequest {
        @Schema(type = "string", format = "binary", description = "image file to upload")
        public MultipartFile image;
    }

    public static class UploadImageResponse {
        public Map<String, String> mp;
        public List<Box> boxes;
    }

    public static class Box {
        public Coordinates left, right;

        public static class Coordinates {
            public int x, y;
        }
    }
}