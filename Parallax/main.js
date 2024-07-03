const li = [];

async function fetchRandomDogImages() {
  try {

    const getPicture = [];

    for (let i = 0; i < 13; i++) {
      getPicture.push(fetch("https://dog.ceo/api/breeds/image/random"));
    }

    const responses = await Promise.all(getPicture);

    const data = await Promise.all(
      responses.map((response) => response.json())
    );

    for (let i = 1; i <= 12; i++) {
      let id = 'content_image_pic' + i;
      li.push(id);
      document.getElementById(id).style.backgroundImage = `url('${data[i].message}')`;
      console.log(data[i].message);
    }

  } catch (error) {
    console.error("Error fetching random dog images:", error);
  }
}

fetchRandomDogImages()

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
});

document.addEventListener('mousemove', function(event) {
  let hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
  
  if (hoveredElement && hoveredElement.id) {
    console.log('Hovered element ID:', hoveredElement.id);
    document.getElementById(hoveredElement.id).style.opacity = 1;

    for (let i = 0; i < li.length; i++) {
      if (hoveredElement.id == li[i]) {
        continue;
      } else {
        document.getElementById(li[i]).style.opacity = 0.4;
      }
    }
  } else {
    for (let i = 0; i < li.length; i++) {
      document.getElementById(li[i]).style.opacity = 1;
    }
  }
});