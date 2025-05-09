package http

import (
	_ "embed"
	"net/http"
)

func GetFileServer() http.Handler {
	return http.FileServer(http.Dir("./public"))
}
