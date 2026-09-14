package org.spring.linkpulse.repository;

import org.spring.linkpulse.models.ClickEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalyticsRepository extends JpaRepository<ClickEventEntity, Long> {

    long countByShortCode(String shortCode);

    @Query("SELECT FUNCTION('DATE', c.timestamp), COUNT(c) " +
            "FROM ClickEventEntity c " +
            "WHERE c.shortCode = :shortCode " +
            "GROUP BY FUNCTION('DATE', c.timestamp) " +
            "ORDER BY FUNCTION('DATE', c.timestamp)")
    List<Object[]> countClicksByDay(@Param("shortCode") String shortCode);

    @Query("SELECT c.referrer, COUNT(c) " +
            "FROM ClickEventEntity c " +
            "WHERE c.shortCode = :shortCode " +
            "AND c.referrer IS NOT NULL " +
            "GROUP BY c.referrer " +
            "ORDER BY COUNT(c) DESC")
    List<Object[]> countClicksByReferrer(@Param("shortCode") String shortCode);

    @Query("SELECT c.country, COUNT(c) " +
            "FROM ClickEventEntity c " +
            "WHERE c.shortCode = :shortCode " +
            "AND c.country IS NOT NULL " +
            "GROUP BY c.country " +
            "ORDER BY COUNT(c) DESC")
    List<Object[]> countClicksByCountry(@Param("shortCode") String shortCode);
}