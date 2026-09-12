package org.spring.linkpulse.repository;

import org.spring.linkpulse.models.ClickEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClickEventRepository extends JpaRepository<ClickEventEntity, Long> {

}
