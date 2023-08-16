package com.mung.mung.db.repository;

import com.mung.mung.db.entity.Dance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DanceRepository extends JpaRepository<Dance, Long>, DanceRepositoryCustom {
    Dance findByDanceId(long danceId);


}
