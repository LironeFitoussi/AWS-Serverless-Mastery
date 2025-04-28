aws lambda add-permission \
--function-name "arn:aws:lambda:us-east-1:975050225319:function:api-gateway-stages-get:PROD" \
--source-arn "arn:aws:execute-api:us-east-1:975050225319:nm97xabuhg/*/GET/stage-variables" \
--principal apigateway.amazonaws.com \
--statement-id 5c1e10ed-d46f-4199-93c9-451a10eb3311 \
--action lambda:InvokeFunction