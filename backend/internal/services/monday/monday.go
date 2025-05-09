package monday

import (
	"context"
	"net/http"
	"os"

	graphql "github.com/hasura/go-graphql-client"
)

type MondayService struct {
	client *graphql.Client
}

func NewMondayService() MondayService {
	return MondayService{
		client: graphql.NewClient("https://api.monday.com/v2", nil).
			WithRequestModifier(func(r *http.Request) {
				r.Header.Set("Authorization", os.Getenv("MONDAY_API_TOKEN"))
				r.Header.Set("Content-Type", os.Getenv("application/json"))
			}),
	}
}

type Board struct {
	Name    string
	Id      string
	Columns []struct {
		Title string
		Id    string
	}
	Views []struct {
		Name string
		Id   string
	}
}

func (ms *MondayService) GetBoards() ([]Board, error) {
	var query struct {
		Boards []Board
	}

	err := ms.client.Query(context.Background(), &query, nil)
	if err != nil {
		return []Board{}, err
	}

	return query.Boards, nil
}
