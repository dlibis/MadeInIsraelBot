package mw

import (
	"net/http"
	"os"
)

func Cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", os.Getenv("CORS_POLICY"))
		next.ServeHTTP(w, r)
	})
}

// Authentication
// Fetch emails
// Refresh emails
