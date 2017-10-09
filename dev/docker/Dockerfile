FROM node:8.4

# RUN apt-get update && apt-get install -y apt-transport-https
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# RUN echo deb http://ftp.debian.org/debian jessie-backports main >> /etc/apt/sources.list
# RUN apt-get upgrade -y

# RUN apt-get update && apt-get -t jessie-backports install -y --force-yes ffmpeg
# RUN apt-get update && apt-get install -y yarn sox

# Install latest chrome (dev) package.
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - &&\
#     sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' &&\
#     apt-get update && apt-get install -y google-chrome-unstable

# Uncomment to skip the chromium download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
#     browser.launch({executablePath: 'google-chrome-unstable'})
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

WORKDIR /app/

COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install

COPY ./docker-entry.sh ./
RUN chmod +x ./docker-entry.sh

COPY ./ ./

ENTRYPOINT ["./docker-entry.sh"]
