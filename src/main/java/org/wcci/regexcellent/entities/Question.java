package org.wcci.regexcellent.entities;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Question {

    final private static Logger logger = LoggerFactory.getLogger(Question.class);

    @Id
    @GeneratedValue
    private long QuestionId;

    private String name;
    private String description;
    private String matchWordsString;
    private String exclusionWordsString;

    public Question(){
    }

    public Question(String name){
        this.name = name;
    }

    public long getQuestionId() {
        return QuestionId;
    }

    public void setQuestionId(long QuestionId) {
        this.QuestionId = QuestionId;
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

    public List<String> getMatchWords() {
        return parseMatchWords();
    }

    public void setMatchWords(List<String> matchWords) {
        saveMatchWords(matchWords);
    }

    public List<String> getExclusionWords() {
        return parseExclusionWords();
    }

    public void setExclusionWords(List<String> exclusionWords) {
        saveExclusionWords(exclusionWords);
    }

    public List<String> parseMatchWords(){
        if(this.matchWordsString == null) return new ArrayList<>();
        try{
            return new ObjectMapper().readValue(this.matchWordsString, new TypeReference<List<String>>(){});
        } catch (Exception e) {
            logger.warn("Unable to parse match words " + this.matchWordsString);
            return new ArrayList<String>();
        }
    }

    public void saveMatchWords(List<String> matchWords){
        try{
            this.matchWordsString = new ObjectMapper().writeValueAsString(matchWords);
        } catch (JsonProcessingException e) {
            logger.warn("Unable to serialize match words: " + matchWords.toString());
        }
    }

    public List<String> parseExclusionWords(){
        if(this.exclusionWordsString == null) return new ArrayList<>();
        try{
            return new ObjectMapper().readValue(this.exclusionWordsString, new TypeReference<List<String>>(){});
        } catch (Exception e) {
            logger.warn("Unable to parse exclusion words " + this.exclusionWordsString);
            return new ArrayList<String>();
        }
    }

    public void saveExclusionWords(List<String> matchWords){
        try{
            this.exclusionWordsString = new ObjectMapper().writeValueAsString(matchWords);
        } catch (JsonProcessingException e) {
            logger.warn("Unable to serialize match words: " + matchWords.toString());
        }
    }

}
