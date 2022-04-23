FROM nginx:alpine
EXPOSE 80
WORKDIR /app
RUN apk add --no-cache python2 python3 g++ make nodejs npm py3-pip

RUN npm init -y
RUN npm install vosk --save-dev