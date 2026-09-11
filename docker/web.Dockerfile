# Apache, because cPanel is Apache. This is what lets the container honour the
# repo's real .htaccess rather than an nginx approximation of it.
FROM httpd:2.4

# Enable only what production relies on:
#   rewrite      - the SPA fallback in .htaccess
#   proxy/_http  - stands in for Passenger picking up /api
#   ssl/socache  - the session cookie is Secure, so it needs real TLS to test
RUN sed -i \
      -e 's|^#\(LoadModule rewrite_module .*\)|\1|' \
      -e 's|^#\(LoadModule proxy_module .*\)|\1|' \
      -e 's|^#\(LoadModule proxy_http_module .*\)|\1|' \
      -e 's|^#\(LoadModule ssl_module .*\)|\1|' \
      -e 's|^#\(LoadModule socache_shmcb_module .*\)|\1|' \
      conf/httpd.conf \
 && echo 'Include conf/extra/sthwalo.conf' >> conf/httpd.conf

# Fail the build rather than the run if a module name ever moves.
RUN grep -q '^LoadModule rewrite_module'    conf/httpd.conf \
 && grep -q '^LoadModule proxy_http_module' conf/httpd.conf \
 && grep -q '^LoadModule ssl_module'        conf/httpd.conf
