package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type body struct {
	Message string `json:"message"`
}

// Handler is the Lambda function handler
func Handler(ctx context.Context, request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	log.Println("Lambda request", request.RequestContext.RequestID)
	Dynamo()

	if request.RawPath == "" || request.RawPath == "/" {
		return ReturnIndex()
	}

	b, _ := json.Marshal(body{Message: "hello world"})

	return events.APIGatewayV2HTTPResponse{
		Body:       string(b),
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}

func ReturnIndex() (events.APIGatewayV2HTTPResponse, error) {
	// b, err := os.ReadFile("templates/index.html")
	// if err != nil {
	// 	return events.APIGatewayV2HTTPResponse{StatusCode: 500}, err
	// }

	return events.APIGatewayV2HTTPResponse{
		Body:       Frontend(),
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "text/html"},
	}, nil
}

func Dynamo() {

	cfg, err := config.LoadDefaultConfig(context.Background(),
		config.WithRegion("us-east-1"),
		config.WithSharedConfigProfile("coby"),
	)

	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	// Using the Config value, create the DynamoDB client
	svc := dynamodb.NewFromConfig(cfg)

	// Build the request with its input parameters
	resp, err := svc.ListTables(context.TODO(), &dynamodb.ListTablesInput{
		Limit: aws.Int32(5),
	})
	log.Println(err)
	log.Println(resp)
}

func main() {
	lambda.Start(Handler)
}
