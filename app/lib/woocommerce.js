import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const wooCommerce = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_STORE_URL,
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
  version: "wc/v3",
});

const wooCommercetest = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_STORE_URL,
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
  version: "wc-auth/v3/authorize",
});

async function getAllProducts() {
  try {
    const { data } = await wooCommerce.get("products?_expand=variations");

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(id) {
  try {
    const { data } = await wooCommerce.get(`products/${id}?_expand=variations`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductVariations(productId) {
  try {
    const response = await wooCommerce.get(`products/${productId}/variations`, {
      per_page: 100,
    });

    const variations = response.data.map((variation) => {
      // Get the variation's image URLs
      const imageUrls = [
        variation.image?.src || "",
        variation.image?.src || "", // Replace with the actual image properties
        variation.image?.src || "", // Replace with the actual image properties
      ];

      // Return the modified variation object with the desired properties
      return {
        attributes: variation.attributes,
        id: variation.id,
        regularPrice: variation.regular_price,
        salePrice: variation.sale_price,
        imageUrls,
      };
    });
    console.log("variations", variations);

    return variations;
  } catch (error) {
    console.log(error);
  }
}

async function submitRating(productId, data) {}

export {
  wooCommerce,
  getAllProducts,
  getProductById,
  getProductVariations,
  submitRating,
};
