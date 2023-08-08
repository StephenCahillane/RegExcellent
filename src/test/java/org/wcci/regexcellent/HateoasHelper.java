package org.wcci.regexcellent;

import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.Option;

import net.minidev.json.JSONArray;

public class HateoasHelper {
        final private static Logger logger = LoggerFactory.getLogger(HateoasHelper.class);

        protected <T> T extractObject(final Class<T> classType, final MvcResult postResult)
                        throws JsonProcessingException, UnsupportedEncodingException {
                return new ObjectMapper().readValue(
                                postResult.getResponse().getContentAsString(),
                                classType);
        }

        protected String extractLink(final MvcResult mvcResult, final String relation)
                        throws UnsupportedEncodingException {
                return JsonPath
                                .parse(mvcResult.getResponse().getContentAsString())
                                .read("_links." + relation + ".href");
        }

        protected String extractSelfLink(final MvcResult mvcResult) throws UnsupportedEncodingException {
                return extractLink(mvcResult, "self");
        }

        protected <T> List<T> extractEmbeddedList(final MvcResult mvcResult, final String field,
                        final Class<T> classType)
                        throws JsonProcessingException, UnsupportedEncodingException {
                final JSONArray jsonArray = JsonPath
                                .using(Configuration.builder().options(Option.SUPPRESS_EXCEPTIONS).build())
                                .parse(mvcResult.getResponse().getContentAsString())
                                .read("$._embedded." + field);

                if (jsonArray == null)
                        return Collections.emptyList();

                return jsonArray
                                .stream()
                                .map((j) -> {
                                        try {
                                                return (new ObjectMapper().readValue(j.toString(), classType));
                                        } catch (JsonProcessingException e) {
                                                logger.warn("Caught for " + j, e);
                                                return null;
                                        }
                                }).collect(Collectors.toList());
        }
}


