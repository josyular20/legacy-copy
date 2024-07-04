package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"server/src/database"

	"sync"
	"syscall"
	"time"

	"github.com/labstack/echo/v4"

	_ "server/src/docs"
)

// @title Legacy API
// @version 1.0
// @description Backend Server for Legacy App

// @contact.name	David Oduneye and Akshay Dupuguntla
// @contact.email	oduneye.d@northeastern.edu and dupuguntla@northeastern.edu
// @host localhost:8080
// @BasePath /api
func main() {
	e := echo.New()

	db, err := database.InitDB()
	if err != nil {
		log.Fatal("Failed to initialize the database: ", err)
	}

	database.AddRoutes(db, e)
	// godotenv.Load("../.env") TODO:, load env vars

	var wg sync.WaitGroup
	wg.Add(1)

	go func() {
		defer wg.Done()

		if err := e.Start(":8080"); err != nil && err != http.ErrServerClosed {
			fmt.Println("still running server: ", err)
		}
	}()

	// https://echo.labstack.com/cookbook/graceful-shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctx); err != nil {
		fmt.Println("error shutting down server: ", err)
	}

	wg.Wait()
}
