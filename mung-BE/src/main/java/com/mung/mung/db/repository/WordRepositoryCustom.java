package com.mung.mung.db.repository;

import java.util.List;

public interface WordRepositoryCustom {

    List<String> getRandomTitlesByCategory(String category);
}
