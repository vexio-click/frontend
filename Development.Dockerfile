# Development
# if you are using WSL2/Hyper-v (windows host) hot-reload will work only from container-internal editor, or like vs-code WSL editort
# this issue is because file system events are not shared between windows and linux inside WSL/Hyper-v!
# Docker supports WSL and Hyper-v (there is selection on install screen)
# Podman only WSL
# you can config usePolling vite option to update files without events by timer or linux-connected vs-code] or just run Podman/Docker under linux or WSL-connected editor like WSL vscode
FROM node:22
WORKDIR /frontend
VOLUME [ "/frontend", "/frontend/node_modules" ]
EXPOSE 8080
CMD npm i; npm run dev_docker
# docker build -f Development.Dockerfile -t dev-frontend .
# docker run -p 8080:8080 -v C:\Users\Vector\Desktop\site\frontend:/frontend dev-frontend

# docker images
# docker ps
# docker exec -it ContainerIDHere bash
# docker system prune