package org.wcci.regexcellent.entities;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Question {

    final private static Logger logger = LoggerFactory.getLogger(Question.class);

    @Id
    @GeneratedValue
    private long questionId;

    private String name;
    

    @Column(length=65535)
    private String description;


    @Column(length=65535)
    @Convert(converter = StringListConverter.class)
    private List<String> matchWords;
    
    @Convert(converter = StringListConverter.class)
    @Column(length=65535)
    private List<String> exclusionWords;

    private String hint;

    public Question(){
    }

    public Question(String name) {
        this.name = name;
    }


    public long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(long questionId) {
        this.questionId = questionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    public List<String> getMatchWords() {
        return matchWords;
    }

    public void setMatchWords(List<String> matchWords) {
        this.matchWords = matchWords;
    }

    public List<String> getExclusionWords() {
        return exclusionWords;
    }

    public void setExclusionWords(List<String> exclusionWords) {
        this.exclusionWords = exclusionWords;
    }
}
