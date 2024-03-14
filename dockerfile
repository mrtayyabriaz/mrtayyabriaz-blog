FROM node:18.19.0
COPY . .
RUN npm i
EXPOSE 5173
CMD [ "npm","run","dev" ]