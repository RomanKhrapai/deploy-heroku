FROM node:16

WORKDIR /server

COPY . . 
RUN npm install

EXPOSE 3000

CMD ["node","server"]