package com.mung.mung.db.repository;

import com.mung.mung.db.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long>, WordRepositoryCustom {
}
