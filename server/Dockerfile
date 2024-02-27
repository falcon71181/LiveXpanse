FROM node:21-slim
WORKDIR /server
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3333
