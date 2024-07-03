let before;
let main;
let after;

async function fetchRandomDogImages() {
    try {
      const responses = await Promise.all([
        fetch("https://dog.ceo/api/breeds/image/random"),
        fetch("https://dog.ceo/api/breeds/image/random"),
        fetch("https://dog.ceo/api/breeds/image/random"),
      ]);
  
      const data = await Promise.all(
        responses.map((response) => response.json())
      );
  
      const [activeData, nextData, prevData] = data;
      console.log(activeData.message);

      let pic1 = document.getElementById('content_image_pic1');
      let pic2 = document.getElementById('content_image_pic2');
      let pic3 = document.getElementById('content_image_pic3');
      let out = document.getElementById('content_background');

      before = prevData.message;
      main = activeData.message;
      after = nextData.message;

      pic1.style.backgroundImage = `url('${before}')`;
      pic2.style.backgroundImage = `url('${main}')`;
      pic3.style.backgroundImage = `url('${after}')`;
      out.style.backgroundImage = `url('${main}')`;
    } catch (error) {
      console.error("Error fetching random dog images:", error);
    }
  }

fetchRandomDogImages();

function scrollPre() {
    const li = [before, main, after];
    let element = li.pop();
    li.unshift(element);

    document.getElementById('content_image_pic1').style.backgroundImage = `url('${li[0]}')`;
    document.getElementById('content_image_pic2').style.backgroundImage = `url('${li[1]}')`;
    document.getElementById('content_image_pic3').style.backgroundImage = `url('${li[2]}')`;

    before = li[0];
    main = li[1];
    after = li[2];

    document.getElementById('content_background').style.backgroundImage = `url('${main}')`;

    console.log('clicked');
}

function scrollNext() {
    const li = [before, main, after];
    let element = li.shift();
    li.push(element);

    document.getElementById('content_image_pic1').style.backgroundImage = `url('${li[0]}')`;
    document.getElementById('content_image_pic2').style.backgroundImage = `url('${li[1]}')`;
    document.getElementById('content_image_pic3').style.backgroundImage = `url('${li[2]}')`;

    before = li[0];
    main = li[1];
    after = li[2];

    document.getElementById('content_background').style.backgroundImage = `url('${main}')`;
    console.log('clicked');
}

document.querySelector('.content_image_left').addEventListener('mouseenter', function() {
    document.getElementById('content_image_pic2').style.transform = 'rotateY(-10deg)';
});

document.querySelector('.content_image_left').addEventListener('mouseleave', function() {
    document.getElementById('content_image_pic2').style.transform = 'rotateY(0deg)';
});


document.querySelector('.content_image_right').addEventListener('mouseenter', function() {
    document.getElementById('content_image_pic2').style.transform = 'rotateY(10deg)';
});

document.querySelector('.content_image_right').addEventListener('mouseleave', function() {
    document.getElementById('content_image_pic2').style.transform = 'rotateY(0deg)';
});

