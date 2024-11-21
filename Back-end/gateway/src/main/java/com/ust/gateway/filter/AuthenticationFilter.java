package com.ust.gateway.filter;

import jakarta.ws.rs.core.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;


@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator routeValidator;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            if (routeValidator.isSecured.test(exchange.getRequest())) {
                //header contains token or not
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("missing authorization header");
                }
                String authHeaderToken = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
                if (authHeaderToken != null && authHeaderToken.startsWith("Bearer")) {
                    authHeaderToken = authHeaderToken.substring(7);
//                    throw new RuntimeException("invalid authorization header");
                }
                try {
                    RestClient restClient = RestClient.create();
                    restClient.get()
                            .uri("http://localhost:8789/api/auth/token?token=" + authHeaderToken)
                            .retrieve()
                            .body(Boolean.class);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                    throw new RuntimeException("unauthorized access");
                }
            }
            return chain.filter(exchange);
        });

    }

    public static class Config{

    }

}
