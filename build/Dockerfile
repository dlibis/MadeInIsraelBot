FROM alpine:latest AS backend
RUN apk update && apk upgrade --available
RUN apk add --no-cache git make musl-dev go
WORKDIR /src
COPY backend/ .
RUN go mod tidy
RUN go build -o /src/bot

FROM alpine:latest AS release
WORKDIR /app
COPY --from=backend /src/bot .
ENTRYPOINT ["./bot"]