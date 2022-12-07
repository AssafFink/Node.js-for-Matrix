# Inherit current image from MySQL image (for latest versions use mysql):
FROM mysql:5.7

# Copy northwind.sql into /docker-entrypoint-initdb.d special folder which executes any script (.sql/.sh/.js/...) only once:
COPY ./northwind.sql /docker-entrypoint-initdb.d
