# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 8000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]


FROM gcc:latest

COPY . /usr/src/cpp_test

WORKDIR /usr/src/cpp_test

# Use g++ for C++ code to link the C++ standard library
RUN g++ -o Test main.cpp

CMD ["./Test"]
