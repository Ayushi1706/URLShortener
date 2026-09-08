package org.spring.linkpulse.services;

import org.spring.linkpulse.dto.CreateLinkRequest;
import org.spring.linkpulse.dto.LinkResponse;
import org.spring.linkpulse.models.Link;
import org.spring.linkpulse.repository.LinkRepository;
import org.spring.linkpulse.util.Base62Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
public class LinkService {
    @Autowired
    private LinkRepository linkRepository;
    @Value("${app.base-url}")
    private String baseUrl;
    public LinkResponse createLink(CreateLinkRequest request) {
        Link link = new Link();
        link.setOriginalUrl(request.url());
        // Temporary unique value so database accepts the first insert
        link.setShortCode(UUID.randomUUID().toString());
        link = linkRepository.save(link);
        link.setShortCode(Base62Encoder.encode(link.getId()));
        linkRepository.save(link);
        String shortUrl = baseUrl + "/" + link.getShortCode();
        return new LinkResponse(shortUrl);
    }

    @Cacheable(value = "links", key = "#shortCode")
    public String getOriginalUrl(String shortCode) {
        Link link = linkRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return link.getOriginalUrl();
    }
    @CacheEvict(value = "links", key = "#shortCode")
    public void evictLinkCache(String shortCode) {
    }
}
