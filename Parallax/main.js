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

document.addEventListener('DOMContentLoaded', () => {
  const controlZone = document.querySelector('.swiper');
  const items = document.querySelectorAll('.swiper-slide');
  const observedIds = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observedIds.add(entry.target.id);
      } else {
        observedIds.delete(entry.target.id);
      }
      updateControlZone();
    });
  }, {
    root: document.querySelector('.swiper'),
    threshold: 0 // trigger as soon as any part is visible
  });

  items.forEach(item => observer.observe(item));

  function updateControlZone() {
    const idsArray = Array.from(observedIds).sort((a, b) => {
      const aIndex = document.getElementById(a).offsetLeft;
      const bIndex = document.getElementById(b).offsetLeft;
      return aIndex - bIndex;
    });

    const limitedIdsArray = idsArray.slice(0, 5);

    // Reset all items' classes first
    items.forEach(item => {
      item.classList.remove('active-1', 'active-2', 'active-3', 'active-4', 'active-5', 'inactive');
    });

    // Apply new classes to the elements in the control zone
    limitedIdsArray.forEach((id, index) => {
      const element = document.getElementById(id);
      element.classList.add('active-' + (index + 1));
    });

    // Apply 'inactive' class to elements not in the control zone
    items.forEach(item => {
      if (!limitedIdsArray.includes(item.id)) {
        item.classList.add('inactive');
      }
    });

    console.log(limitedIdsArray);
  }
});



document.addEventListener('mousemove', function(event) {
  let hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
  
  if (hoveredElement && hoveredElement.id) {
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
