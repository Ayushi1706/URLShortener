package org.spring.linkpulse.services;

import org.spring.linkpulse.dto.CreateLinkRequest;
import org.spring.linkpulse.dto.LinkResponse;
import org.spring.linkpulse.models.Link;
import org.spring.linkpulse.repository.LinkRepository;
import org.spring.linkpulse.util.Base62Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
        link = linkRepository.save(link);
        link.setShortCode(Base62Encoder.encode(link.getId()));
        linkRepository.save(link);
        String shortUrl = baseUrl + "/" + link.getShortCode();
        return new LinkResponse(shortUrl);
    }
}
