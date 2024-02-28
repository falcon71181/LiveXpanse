FROM node:21-slim
WORKDIR /client
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "preview"]
EXPOSE 4173
