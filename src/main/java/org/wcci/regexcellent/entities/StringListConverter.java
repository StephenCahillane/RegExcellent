package org.wcci.regexcellent.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        if (attribute == null) {
            return "";
        }
        try {
            return new ObjectMapper().writeValueAsString(attribute);
        } catch (JsonProcessingException e) {

            e.printStackTrace();
            return "";
        }
    }

    @Override
    public List<String> convertToEntityAttribute(String dbdata) {
        if (dbdata == null) {
            return new ArrayList<String>();
        }
        try {
            return new ObjectMapper().readValue(dbdata, new TypeReference<List<String>>() {
            });
        } catch (JsonMappingException e) {
            
            e.printStackTrace();
            return new ArrayList<String>();
        } catch (JsonProcessingException e) {
            
            e.printStackTrace();
            return new ArrayList<String>();
        }
    }

}
