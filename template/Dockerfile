FROM keymetrics/pm2:latest

# Bundle APP files
COPY . .

# Show current folder structure in logs
RUN ls -al -R

# Install Python and build tools like make, g++
# Then run install and remove build tools
# Borrowed from https://github.com/felixbuenemann/vips-alpine/blob/master/Dockerfile
ARG VIPS_VERSION=8.5.9
RUN apk add --no-cache openssl
RUN wget -O- https://github.com/jcupitt/libvips/releases/download/v${VIPS_VERSION}/vips-${VIPS_VERSION}.tar.gz | tar xzC /tmp \
    && apk update \
    && apk upgrade \
    && apk add \
    zlib libxml2 glib gobject-introspection \
    libjpeg-turbo libexif lcms2 fftw giflib libpng \
    libwebp orc tiff poppler-glib librsvg libgsf openexr \
    && apk add --virtual vips-dependencies build-base \
    zlib-dev libxml2-dev glib-dev gobject-introspection-dev \
    libjpeg-turbo-dev libexif-dev lcms2-dev fftw-dev giflib-dev libpng-dev \
    libwebp-dev orc-dev tiff-dev poppler-dev librsvg-dev libgsf-dev openexr-dev \
    py-gobject3-dev \
    && cd /tmp/vips-${VIPS_VERSION} \
    && ./configure --prefix=/usr \
                   --without-python \
                   --disable-static \
                   --disable-dependency-tracking \
                   --enable-silent-rules \
    && make -s install-strip \
    && cd $OLDPWD \
    && rm -rf /tmp/vips-${VIPS_VERSION} \
    && apk del --purge vips-dependencies \
    && rm -rf /var/cache/apk/*
RUN apk add --no-cache --update python2
RUN apk add --no-cache --update alpine-sdk && \
    yarn install --production && \
    apk del alpine-sdk

CMD [ "pm2-docker", "start", "ecosystem.json" ]
