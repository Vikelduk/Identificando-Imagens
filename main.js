function setup() {
    canvas = createCanvas(1000, 1000);
    canvas.position(30, 40);

    video = createCapture(VIDEO);
    video.hide();

    classifier = ml5.imageClassifier('MobileNet', modelLoaded);
  }
  
  function modelLoaded()
  {
    console.log("Model Loaded!");
  }
  
  function draw()
  {
    image(video, 0, 0, 450, 450);
    classifier.classify(video, gotResult);
  }
  
  var previousResult = '';
  
  function gotResult(error, results)
  {
    if (error)
    {
      console.error(error);
    }
    else
    {
      if ((results[0].confidence > 0.5) && (previousResult != results[0].label))
      {
        console.log(results);

        previousResult = results[0].label;

        document.getElementById("mobileNet").innerHTML = results[0].label;
        document.getElementById("lens").innerHTML = results[0].label;
      }
    }
  }