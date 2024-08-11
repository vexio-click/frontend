FROM amazonlinux
WORKDIR /frontend
COPY ./release ./release
VOLUME [ "/frontend/release" ]