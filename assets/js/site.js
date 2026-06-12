const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

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
    price: "KRW 139,000",
    image: "assets/images/look-01.jpg?v=shop-20260612b",
    description:
      "A chain object designed to move between necklace, belt and layered styling without a fixed prescription.",
  },
  "open-ring": {
    title: "WEARABLE OPEN RING",
    price: "KRW 89,000",
    image: "assets/images/look-02.jpg?v=shop-20260612b",
    description:
      "An open ring form that can be worn across different fingers and gestures as a flexible silver object.",
  },
  "edge-ring": {
    title: "WEARABLE EDGE RING",
    price: "KRW 92,000",
    image: "assets/images/look-03.jpg?v=shop-20260612b",
    description:
      "A sculptural edge ring shaped for shifting positions, stacked styling and expressive hand movement.",
  },
};

const productModal = document.querySelector("[data-product-modal]");
const productImage = document.querySelector("[data-product-image]");
const productTitle = document.querySelector("[data-product-title]");
const productPrice = document.querySelector("[data-product-price]");
const productDescription = document.querySelector("[data-product-description]");
const productCloseButton = document.querySelector(".product-modal__close");
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
