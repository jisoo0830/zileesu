const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const heroMediaScroll = document.querySelector(".hero__media-scroll");
const heroImage = document.querySelector(".hero__image");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const setMobileHeroStart = () => {
  if (!heroMediaScroll || !heroImage) return;
  if (!window.matchMedia("(max-width: 760px)").matches) return;

  const maxScroll = heroMediaScroll.scrollWidth - heroMediaScroll.clientWidth;
  if (maxScroll <= 0) return;
  heroMediaScroll.scrollLeft = maxScroll * 0.45;
};

if (heroImage) {
  if (heroImage.complete) {
    setMobileHeroStart();
  } else {
    heroImage.addEventListener("load", setMobileHeroStart, { once: true });
  }
  window.addEventListener("orientationchange", () => {
    window.setTimeout(setMobileHeroStart, 260);
  });
}

if (menu && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("is-menu-open", !isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.classList.remove("is-menu-open");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const productData = {
  "fuse-chain": {
    title: "Wearable Fuse Chain",
    price: "KRW 159,000",
    image: "assets/images/look-01.jpg?v=shop-20260612b",
    description:
      "A chain object designed to move between necklace, belt and layered styling without a fixed prescription.",
    detailImages: [
      "assets/images/fuse-detail-01.jpg?v=fuse-20260613b",
      "assets/images/fuse-detail-02.jpg?v=fuse-20260613b",
      "assets/images/fuse-detail-03.jpg?v=fuse-20260613b",
      "assets/images/fuse-detail-04.jpg?v=fuse-20260613b",
      "assets/images/fuse-detail-05.jpg?v=fuse-20260613b",
      "assets/images/fuse-detail-06.jpg?v=fuse-20260613b",
      "assets/images/fuse-detail-07.jpg?v=fuse-20260613b",
      "assets/images/fuse-detail-08.jpg?v=fuse-20260613b",
      "assets/images/fuse-detail-09.jpg?v=fuse-20260613b",
      "assets/images/fuse-detail-10.jpg?v=fuse-20260613b",
      "assets/images/fuse-detail-11.jpg?v=fuse-20260613b",
      "assets/images/fuse-detail-12.jpg?v=fuse-20260613b",
    ],
  },
  "open-ring": {
    title: "WEARABLE OPEN RING",
    price: "KRW 139,000",
    image: "assets/images/open-ring-detail-01.jpg?v=open-ring-20260614",
    description:
      "An open ring form that can be worn across different fingers and gestures as a flexible silver object.",
    detailImages: [
      "assets/images/open-ring-detail-01.jpg?v=open-ring-20260614",
      "assets/images/open-ring-detail-02.jpg?v=open-ring-20260614",
      "assets/images/open-ring-detail-03.jpg?v=open-ring-20260614",
      "assets/images/open-ring-detail-04.jpg?v=open-ring-20260614",
      "assets/images/open-ring-detail-05.jpg?v=open-ring-20260614",
      "assets/images/open-ring-detail-06.jpg?v=open-ring-20260614",
      "assets/images/open-ring-detail-07.jpg?v=open-ring-20260614",
    ],
  },
  "edge-ring": {
    title: "WEARABLE EDGE RING",
    price: "KRW 89,000",
    image: "assets/images/edge-ring-detail-01.jpg?v=edge-ring-20260614",
    description:
      "A sculptural edge ring shaped for shifting positions, stacked styling and expressive hand movement.",
    detailImages: [
      "assets/images/edge-ring-detail-01.jpg?v=edge-ring-20260614",
      "assets/images/edge-ring-detail-02.jpg?v=edge-ring-20260614",
    ],
  },
};

const productModal = document.querySelector("[data-product-modal]");
const productImage = document.querySelector("[data-product-image]");
const productTitle = document.querySelector("[data-product-title]");
const productPrice = document.querySelector("[data-product-price]");
const productDescription = document.querySelector("[data-product-description]");
const productCloseButton = document.querySelector(".product-modal__close");
const productGallery = document.querySelector("[data-product-gallery]");
let lastProductTrigger = null;

const closeProductModal = () => {
  if (!productModal) return;
  productModal.hidden = true;
  document.body.classList.remove("is-product-open");
  if (lastProductTrigger) lastProductTrigger.focus();
};

document.querySelectorAll("[data-product-id]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const product = productData[trigger.dataset.productId];
    if (!product || !productModal) return;

    lastProductTrigger = trigger;
    productTitle.textContent = product.title;
    productPrice.textContent = product.price;
    productDescription.textContent = product.description;
    productImage.src = product.image;
    productImage.alt = `${product.title} product image`;
    if (productGallery) {
      productGallery.innerHTML = "";
      (product.detailImages || []).forEach((src, index) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = src;
        image.alt = `${product.title} detail image ${index + 1}`;
        image.loading = "lazy";
        figure.append(image);
        productGallery.append(figure);
      });
    }
    productModal.hidden = false;
    document.body.classList.add("is-product-open");
    productCloseButton.focus();
  });
});

document.querySelectorAll("[data-product-close]").forEach((item) => {
  item.addEventListener("click", closeProductModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && productModal && !productModal.hidden) {
    closeProductModal();
  }
});
