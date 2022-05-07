# Required pre-installs
ffmpeg

sox (windows/osx)

ALSA (linux)

# After install 
Download https://alphacephei.com/vosk/models/vosk-model-en-us-daanzu-20200905.zip and unzip it to ```<top level directory>/Listener/model```

# Run
call ```npm start``` from the top level directory to start

## Docker Build Stuff
docker volume create mirror-vol

docker build -t magic-mirror .

docker run -v hello --name magic-mirror -dp 8080:80 magic-mirror

docker exec -it magic-mirror sh