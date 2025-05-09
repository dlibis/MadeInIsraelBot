package http

import (
	"encoding/json"
	"net/http"
)

func (h *handler) HandleTablesGet(w http.ResponseWriter, r *http.Request) {
	tables, err := h.monday_service.GetBoards()

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, err := json.Marshal(tables)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(res)
}
