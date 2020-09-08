#!/bin/bash

# This script shows a command line way to demonstrate our API in action. Of
# course one could also work with that using a GUI tool like Postman; or use
# automated tests.

set -e

API=http://localhost:3000
JSON=(-H "Content-Type: application/json")

echo should be Server is listening:
curl $API/
echo

echo How many balls on yahoo.com?
curl $API/word?word=ball
echo
echo

echo is York mentioned more on yahoo or google?
curl $API/word/most?word=York
echo
echo

echo Start with no favorites:
curl $API/favorites
echo
echo

echo add one to the default category:
curl -X PUT "${JSON[@]}" -d '{"name":"Wiki","url":"https://www.wikipedia.org/"}' $API/favorites
echo
echo

echo add one to the social category:
curl -X PUT "${JSON[@]}" -d '{"name":"Twitter","url":"twitter.com"}' $API/favorites?category=social
echo
echo

echo Should see both favorites:
curl $API/favorites
echo
echo
