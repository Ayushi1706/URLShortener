package org.spring.linkpulse.services;

import org.spring.linkpulse.dto.CreateLinkRequest;
import org.spring.linkpulse.dto.LinkResponse;
import org.spring.linkpulse.exception.AliasAlreadyTakenException;
import org.spring.linkpulse.exception.LinkNotFoundException;
import org.spring.linkpulse.models.Link;
import org.spring.linkpulse.repository.LinkRepository;
import org.spring.linkpulse.util.Base62Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;


@Service
public class LinkService {
    @Autowired
    private LinkRepository linkRepository;

    @Value("${app.base-url}")
    private String baseUrl;
    public LinkResponse createLink(CreateLinkRequest request) {
        Link link = new Link();
        link.setOriginalUrl(request.url());

        if (request.customAlias() != null && !request.customAlias().isBlank()) {
            if (linkRepository.findByShortCode(request.customAlias()).isPresent()) {
                throw new AliasAlreadyTakenException(request.customAlias());
            }
            link.setShortCode(request.customAlias());
            linkRepository.save(link);
        } else {
            link = linkRepository.save(link);
            link.setShortCode(Base62Encoder.encode(link.getId()));
            linkRepository.save(link);
        }

        return new LinkResponse(baseUrl + "/" + link.getShortCode());
    }

    @Cacheable(value = "links", key = "#shortCode")
    public String getOriginalUrl(String shortCode) {
        Link link = linkRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new LinkNotFoundException(shortCode));
        return link.getOriginalUrl();
    }
    @CacheEvict(value = "links", key = "#shortCode")
    public void evictLinkCache(String shortCode) {
    }
}
