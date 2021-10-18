function startIdentifyingSound() {
    navigator.mediaDevices.getUserMedia({audio: true});
    classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/IbwiB7g4i/model.json", modelLoaded);
}

function modelLoaded() {
    console.log("model loaded");
    classifier.classify(gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        var green = Math.floor(Math.random()*255);
        var red = Math.floor(Math.random()*255);
        var blue = Math.floor(Math.random()*255);
        document.getElementById("accuracyAndAnimal").style.color = "rgb("+red+", "+green+", "+blue+")";
        document.getElementById("animal").innerHTMl = results[0].label;
        document.getElementById("accuracy").innerHTML = (results[0].confidence*100).toFixed(2) + "%";
        image = document.getElementById("image");
        if(results[0].label == "Background Noise") {
            image.src = "";
        }
        else if(results[0].label == "Cat") {
            image.src = "cat.jpg";
        }
        else if(results[0].label == "Bird") {
            image.src = "bird.jpg";
        }
        else if(results[0].label == "Rabbit") {
            image.src = "rabbit.jpg";
        }
        else {
            image.src = "lion.jpg";
        }
    }
}