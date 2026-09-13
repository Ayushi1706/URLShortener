package org.spring.linkpulse.services;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.model.CountryResponse;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;

@Service
@Slf4j
public class GeoLocationService {

    private DatabaseReader databaseReader;

    @PostConstruct
    public void init() throws IOException {
        InputStream database = getClass().getResourceAsStream("/geoip/GeoLite2-Country.mmdb");
        databaseReader = new DatabaseReader.Builder(database).build();
    }

    public String getCountry(String ipAddress) {
        try {
            InetAddress ip = InetAddress.getByName(ipAddress);
            CountryResponse response = databaseReader.country(ip);
            return response.getCountry().getIsoCode(); // e.g. "US", "IN"
        } catch (Exception e) {
            log.warn("Could not resolve country for IP {}: {}", ipAddress, e.getMessage());
            return "UNKNOWN";
        }
    }
}