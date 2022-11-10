Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById(camera);

Webcam.attach('camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById('result').innerHTML = "<img id='data_uri_img' src='" + data_uri + "'>"
    })
}

console.log("ml5.js version = ", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6BC2_8Sui/model.json', modelLoaded);

function modelLoaded() {
    console.log("The model has been loaded successfully.")

}

function check() {
    img = document.getElementById("data_uri_img");
    classifier.classify(img, gotResult);
} 

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}