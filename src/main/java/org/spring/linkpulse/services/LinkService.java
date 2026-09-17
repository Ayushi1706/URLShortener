package org.spring.linkpulse.services;

import org.spring.linkpulse.dto.CreateLinkRequest;
import org.spring.linkpulse.dto.LinkResponse;
import org.spring.linkpulse.exception.AliasAlreadyTakenException;
import org.spring.linkpulse.exception.LinkExpiredException;
import org.spring.linkpulse.exception.LinkNotFoundException;
import org.spring.linkpulse.models.Link;
import org.spring.linkpulse.repository.AnalyticsRepository;
import org.spring.linkpulse.repository.LinkRepository;
import org.spring.linkpulse.util.Base62Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LinkService {
    @Autowired
    private LinkRepository linkRepository;

    @Autowired
    private AnalyticsRepository analyticsRepository;


    @Value("${app.base-url}")
    private String baseUrl;
    public LinkResponse createLink(CreateLinkRequest request) {

        Link link = new Link();

        link.setOriginalUrl(request.url());
        link.setExpiresAt(request.expiresAt());

        if (request.customAlias() != null && !request.customAlias().isBlank()) {

            String alias = request.customAlias().trim();

            if (linkRepository.findByShortCode(alias).isPresent()) {
                throw new AliasAlreadyTakenException(alias);
            }

            link.setShortCode(alias);

            try {
                link = linkRepository.save(link);
            } catch (DataIntegrityViolationException e) {
                throw new AliasAlreadyTakenException(alias);
            }

        } else {

            link.setShortCode(UUID.randomUUID().toString());

            link = linkRepository.save(link);

            link.setShortCode(Base62Encoder.encode(link.getId()));

            link = linkRepository.save(link);
        }

        return new LinkResponse(
                link.getId(),
                link.getShortCode(),
                baseUrl + "/" + link.getShortCode(),
                link.getOriginalUrl(),
                link.getCreatedAt(),
                link.getExpiresAt(),
                0L
        );
    }

    @Cacheable(value = "links", key = "#shortCode")
    public String getOriginalUrl(String shortCode) {
        Link link = linkRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new LinkNotFoundException(shortCode));
        if (link.getExpiresAt() != null && link.getExpiresAt().isBefore(java.time.LocalDateTime.now())) {
            throw new LinkExpiredException(shortCode);
        }
        return link.getOriginalUrl();
    }

    @CacheEvict(value = "links", key = "#shortCode")
    public void evictLinkCache(String shortCode) {
    }

    public List<LinkResponse> getAllLinks(String email) {
        return linkRepository.findAllByOwnerEmail(email)
                .stream()
                .map(link -> new LinkResponse(
                        link.getId(),
                        link.getShortCode(),
                        baseUrl + "/" + link.getShortCode(),
                        link.getOriginalUrl(),
                        link.getCreatedAt(),
                        link.getExpiresAt(),
                        analyticsRepository.countByShortCode(link.getShortCode())
                ))
                .toList();
    }
}
