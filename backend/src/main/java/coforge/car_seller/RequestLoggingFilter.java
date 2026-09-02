package coforge.car_seller;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/** Logs every request's arrival and departure, with total duration.
 *  Applies automatically to every endpoint — chat, catalog admin, and
 *  whatever gets added later (like the shortlist endpoint) — no
 *  per-controller code needed. */
@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String method = request.getMethod();
        String path = request.getRequestURI();
        long start = System.currentTimeMillis();

        log.info("→ Received {} {}", method, path);

        try {
            filterChain.doFilter(request, response);
        } finally {
            long durationMs = System.currentTimeMillis() - start;
            log.info("← Sent {} {} — status {} in {}ms", method, path, response.getStatus(), durationMs);
        }
    }
}