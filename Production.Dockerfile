

# Production
FROM node:22
WORKDIR /frontend
COPY . .
RUN npm i
RUN npm run release
VOLUME [ "/frontend/release" ]

#CMD ["npm", "run", "preview_docker_release"]

# docker build -f Production.Dockerfile -t frontend .
# docker run -p 8080:8080 frontend

# docker images
# docker ps
# docker exec -it ContainerIDHere bash
# docker system prune